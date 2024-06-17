import React, {useState} from 'react';
import axios from "axios";
import {BaseUrl} from "./constants";
import {useNavigate} from "react-router-dom";

function CreateCourse() {

    const navigate = useNavigate();
    const [token] = useState(localStorage.getItem("token"));
    function createCourse() {

        let data = {
            "code": document.getElementById("code").value,
            "name": document.getElementById("name").value
        }
        axios.post(BaseUrl + "/api/courses/", data, {
            headers: {
                "Authorization": "Token " + token
            }
        }).then((res) => {
            alert("Course created successfully");
            navigate('/Courses');
        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <>
            {token ? (
                <div>
                    <p>
                        Code: <input type={"number"} id={"code"}/>
                    </p>
                    <p>
                        Name: <input type={"text"} id={"name"}/>
                    </p>
                    <p>
                        <button onClick={createCourse}>Submit</button>
                    </p>
                </div>
            ) : (
                <p>Unauthorized Access</p>
            )}
        </>
    );
}

export default CreateCourse;