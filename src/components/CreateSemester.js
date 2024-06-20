import React, {useState} from 'react';
import axios from "axios";
import {BaseUrl} from "./constants";
import {useNavigate} from "react-router-dom";

function CreateSemester() {

    const navigate = useNavigate();
    const [token] = useState(localStorage.getItem("token"));

    function createSemester() {

        let data = {
            "year": document.getElementById("year").value,
            "semester": document.getElementById("semester").value
        }
        axios.post(BaseUrl + "/api/semesters/", data, {
            headers: {
                "Authorization": "Token " + token
            }
        }).then((res) => {
            alert("Semester created successfully");
            navigate('/Semesters');
        }).catch(error => {
            alert("Semester created failed");
        })
    }

    return (
        <div>
            <p>
                Year: <input type={"number"} id={"year"}/>
            </p>
            <p>
                Semester: <select id={"semester"}>
                <option value="1">1</option>
                <option value="2">2</option>
            </select>
            </p>
            <p>
                <button onClick={createSemester}>Submit</button>
            </p>
        </div>
    );
}

export default CreateSemester;