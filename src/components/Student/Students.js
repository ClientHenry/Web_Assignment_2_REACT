import React, {useEffect, useState} from 'react';
import axios from "axios";
import {BaseUrl} from "../constants";
import {Link} from "react-router-dom";

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

    return (
        <>
            {error ? (
                <p>{error}</p>
            ) : (
                <div>
                    <Link to={"/CreateStudent"} className={"btn btn-primary"}>Create a Student</Link>
                      <Link to={"/UploadFile"} className={"btn btn-primary"}>Upload File</Link>
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