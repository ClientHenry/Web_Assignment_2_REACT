import React, {useEffect, useState} from 'react';
import axios from "axios";
import {BaseUrl} from "../constants";
import {Link} from "react-router-dom";
import * as XLSX from "xlsx";

function Students() {

    const [students, setStudents] = useState([]);
    const [token] = useState(localStorage.getItem("token"));
    const [error, setError] = useState(null);

    useEffect(() => {

        if (!token) {
            setError('Unauthorized Access');
            return;
        }
        axios.get(BaseUrl + "/api/students", {
            headers: {
                'Authorization': `Token ${token}`
            }
        })
            .then((response) => {
                setStudents(response.data);
            })
            .catch((error) => {
                setError('Unauthorized Access');
            })
    }, [token]);

    function handleFileUpload(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, {type: 'array'});
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet);

                const formattedData = jsonData.map(row => ({
                    studentID: row.studentID,
                    firstName: row.firstname,
                    lastName: row.lastname,
                    email: row.email,
                    DOB: new Date(row.DOB).toISOString().split('T')[0]
                }));

                axios.post(BaseUrl + "/bulk_create_students/", {students: formattedData}, {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                })
                    .then(response => {
                        console.log("Bulk upload successful:", response.data);
                        alert("Students uploaded successfully");
                        window.location.reload();
                    })
                    .catch(error => {
                        console.error("Error in bulk upload:", error);
                        alert("Error uploading students. Please try again.");
                    });
            } catch (error) {
                console.error("Error parsing file:", error);
                alert("Error parsing the Excel file. Please check the file format.");
            }
        };
        reader.readAsArrayBuffer(file);
    }

    return (
        <>
            {error ? (
                <p>{error}</p>
            ) : (
                <div>
                    <Link to={"/CreateStudent"} className={"btn btn-primary"}>Create a Student</Link>

                    <input
                        type="file"
                        accept=".xlsx, .xls"
                        onChange={handleFileUpload}
                        style={{display: 'none'}}
                        id="file-upload"
                    />
                    <label htmlFor="file-upload" className="btn btn-secondary">
                        Bulk Upload Students
                    </label>

                    <p></p>
                    {students.map(student =>
                        <p>
                            <Link to={"/StudentDetail"} state={{student_id: student.id}} key={student.id}>
                                {student.firstname} {student.lastname}
                            </Link>
                        </p>
                    )}
                </div>

            )}
        </>
    );
}

export default Students;