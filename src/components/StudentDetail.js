import React, {Fragment, useEffect, useState} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {BaseUrl} from "./constants";

function StudentDetail() {
    const location = useLocation();
    const student_id = location.state.student_id;
    const [student, setStudent] = useState({});
    const navigate = useNavigate();
    const [token] = useState(localStorage.getItem("token"));

    useEffect(() => {

        axios.get(BaseUrl + "/api/students/" + student_id)
            .then((response) => {
                setStudent(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [student_id]);

    function deleteStudent(event) {

        if (window.confirm("Are you sure you want to delete this student?"))

            axios.delete(BaseUrl + "/api/students/" + student_id, {
                headers: {
                    "Authorization": "Token " + token
                }
            }).then((res) => {
                alert("Student deleted successfully");
                navigate('/Students');
            }).catch(error => {
                console.log(error);
            });
    }


    return (
        <>
            {token ? (
                <div>
                    <p>Student ID: {student.studentID}</p>
                    <p>First Name: {student.firstname}</p>
                    <p>Last Name: {student.lastname}</p>
                    <p>Email: {student.email}</p>
                    <p>DOB: {student.DOB}</p>
                    <Link to={"/UpdateStudent"} state={{student_id: student_id}}
                          className={"btn btn-primary"}>Update</Link>
                    <button className={"btn btn-danger"} onClick={deleteStudent}>Delete</button>
                </div>
            ) : (
                <p>Unauthorized Access</p>
            )}
        </>
    );
}

export default StudentDetail;