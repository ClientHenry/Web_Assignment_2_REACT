import React, {useState} from 'react';
import axios from "axios";
import {BaseUrl} from "../constants";
import {useNavigate} from "react-router-dom";

function CreateLecturer() {

    const navigate = useNavigate();
    const [token] = useState(localStorage.getItem("token"));

    function createLecturer() {

        let data = {
            "staffID": document.getElementById("staffID").value,
            "firstname": document.getElementById("firstname").value,
            "lastname": document.getElementById("lastname").value,
            "email": document.getElementById("email").value,
            "DOB": document.getElementById("DOB").value
        }
        axios.post(BaseUrl + "/api/lecturers/", data, {
            headers: {
                "Authorization": "Token " + token
            }
        }).then((res) => {
            alert("Lecturer created successfully");
            navigate('/Lecturers');
        }).catch(error => {
            alert("Lecturer created failed");
        })
    }

    return (
        <div>
            <p>
                Staff ID: <input type={"number"} id={"staffID"}/>
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
                <button onClick={createLecturer}>Submit</button>
            </p>
        </div>
    );
}

export default CreateLecturer;