import React, {useState} from 'react';
import axios from "axios";
import {BaseUrl} from "./constants";
import {useNavigate} from "react-router-dom";

function CreateStudent() {

    const navigate = useNavigate();
    const [token] = useState(localStorage.getItem("token"));
    function createStudent() {

        let data = {
            "studentID": document.getElementById("studentID").value,
            "firstname": document.getElementById("firstname").value,
            "lastname": document.getElementById("lastname").value,
            "email": document.getElementById("email").value,
            "DOB": document.getElementById("DOB").value
        }
        axios.post(BaseUrl + "/api/students/", data, {
            headers: {
                "Authorization": "Token " + token
            }
        }).then((res) => {
            alert("Student created successfully");
            navigate('/Students');
        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <>
            {token ? (
                <div>
                    <p>
                        Student ID: <input type={"number"} id={"studentID"}/>
                    </p>
                    <p>
                        First Name: <input type={"text"} id={"firstname"}/>
                    </p>
                    <p>
                        Last Name: <input type={"text"} id={"lastname"}/>
                    </p>
                    <p>
                        Email: <input type={"email"} id={"email"}/>
                    </p>
                    <p>
                        DOB: <input type={"date"} id={"DOB"}/>
                    </p>
                    <p>
                        <button onClick={createStudent}>Submit</button>
                    </p>
                </div>
            ) : (
                <p>Unauthorized Access</p>
            )}
        </>
    );
}

export default CreateStudent;