import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {BaseUrl} from "../constants";

function UpdateLecturer() {

    const location = useLocation();
    const lecturer_id = location.state.lecturer_id;
    const [, setLecturer] = useState({});
    const [staffID, setStaffID] = useState("");
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
        axios.get(BaseUrl + "/api/lecturers/" + lecturer_id, {
            headers: {
                'Authorization': `Token ${token}`
            }
        })
            .then((response) => {
                setLecturer(response.data);
                setStaffID(response.data.staffID);
                setFirstname(response.data.firstname);
                setLastname(response.data.lastname);
                setEmail(response.data.email);
                setDOB(response.data.DOB);
            })
            .catch((error) => {
                setError('Unauthorized Access');
            });
    }, [lecturer_id, token]);

    function updateLecturer() {

        let data = {
            staffID: staffID,
            firstname: firstname,
            lastname: lastname,
            email: email,
            DOB: DOB,
        }
        axios.patch(BaseUrl + "/api/lecturers/" + lecturer_id + "/", data, {
            headers: {
                "Authorization": "Token " + token
            }
        }).then((res) => {
            alert("Lecturer updated successfully");
            navigate(-1);
        }).catch(error => {
            alert("Lecturer updated failed");
        })
    }

    function staffIDHandler(e) {
        setStaffID(e.target.value);
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
                        Staff ID: <input type={"number"} id={"staffID"} value={staffID}
                                         onChange={staffIDHandler}/>
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
                        <button onClick={updateLecturer}>Submit</button>
                    </p>
                </div>
            )}
        </>
    );
}

export default UpdateLecturer;