import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {BaseUrl} from "../constants";

function UpdateStudent() {

    const location = useLocation();
    const student_id = location.state.student_id;
    // const [, setStudent] = useState({});
    const [studentID, setStudentID] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [DOB, setDOB] = useState("");
    const navigate = useNavigate();
    const [token] = useState(localStorage.getItem("token"));
    const [error, setError] = useState(null);

    useEffect(() => {

        if (!token) {
            setError('Unauthorized Access');
            return;
        }
        axios.get(BaseUrl + "/api/students/" + student_id, {
            headers: {
                'Authorization': `Token ${token}`
            }
        })
            .then((response) => {
                // setStudent(response.data);
                setStudentID(response.data.studentID);
                setFirstname(response.data.firstname);
                setLastname(response.data.lastname);
                setEmail(response.data.email);
                setDOB(response.data.DOB);
            })
            .catch((error) => {
                setError('Unauthorized Access');
            });
    }, [student_id, token]);

    function updateStudent() {

        let data = {
            studentID: studentID,
            firstname: firstname,
            lastname: lastname,
            email: email,
            DOB: DOB,
        }
        axios.patch(BaseUrl + "/api/students/" + student_id + "/", data, {
            headers: {
                "Authorization": "Token " + token
            }
        }).then((res) => {
            alert("Student updated successfully");
            navigate(-1);
        }).catch(error => {
            alert("Student updated failed");
        })
    }

    function studentIDHandler(e) {
        setStudentID(e.target.value);
    }

    function firstnameHandler(e) {
        setFirstname(e.target.value);
    }

    function lastnameHandler(e) {
        setLastname(e.target.value);
    }

    function emailHandler(e) {
        setEmail(e.target.value);
    }

    function DOBHandler(e) {
        setDOB(e.target.value);
    }

    return (
        <>
            {error ? (
                <p>{error}</p>
            ) : (
                <div>
                    <p>
                        Student ID: <input type={"number"} id={"studentID"} value={studentID}
                                           onChange={studentIDHandler}/>
                    </p>
                    <p>
                        First Name: <input type={"text"} id={"firstname"} value={firstname}
                                           onChange={firstnameHandler}/>
                    </p>
                    <p>
                        Last Name: <input type={"text"} id={"lastname"} value={lastname} onChange={lastnameHandler}/>
                    </p>
                    <p>
                        Email: <input type={"email"} id={"email"} value={email} onChange={emailHandler}/>
                    </p>
                    <p>
                        DOB: <input type={"date"} id={"DOB"} value={DOB} onChange={DOBHandler}/>
                    </p>
                    <p>
                        <button onClick={updateStudent}>Submit</button>
                    </p>
                </div>
            )}
        </>
    );
}

export default UpdateStudent;