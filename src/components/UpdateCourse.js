import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {BaseUrl} from "./constants";

function UpdateCourse() {

    const location = useLocation();
    const course_id = location.state.course_id;
    const [, setCourse] = useState({});
    const [code, setCode] = useState("");
    const [name, setName] = useState("");
    const navigate = useNavigate();
    const [token] = useState(localStorage.getItem("token"));

    useEffect(() => {
        axios.get(BaseUrl + "/api/courses/" + course_id)
            .then((response) => {
                setCourse(response.data);
                setCode(response.data.code);
                setName(response.data.name);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [course_id]);

    function updateCourse() {

        let data = {
            code: code,
            name: name
        }
        axios.patch(BaseUrl + "/api/courses/" + course_id + "/", data, {
            headers: {
                "Authorization": "Token " + token
            }
        }).then((res) => {
            alert("Course updated successfully");
            navigate('/Courses');
        }).catch(error => {
            console.log(error);
        })
    }

    function codeHandler(e) {
        setCode(e.target.value);
    }

    function nameHandler(e) {
        setName(e.target.value);
    }

    return (
        <>
            {token ? (
                <div>
                    <p>
                        Code: <input type={"number"} id={"code"} value={code} onChange={codeHandler}/>
                    </p>
                    <p>
                        Name: <input type={"text"} id={"name"} value={name} onChange={nameHandler}/>
                    </p>
                    <p>
                        <button onClick={updateCourse}>Submit</button>
                    </p>
                </div>
            ) : (
                <p>Unauthorized Access</p>
            )}
        </>
    );
}

export default UpdateCourse;