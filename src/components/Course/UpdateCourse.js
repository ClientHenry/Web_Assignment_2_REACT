import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {BaseUrl} from "../constants";

function UpdateCourse() {

    const location = useLocation();
    const course_id = location.state.course_id;
    const [, setCourse] = useState({});
    const [code, setCode] = useState("");
    const [name, setName] = useState("");
    const navigate = useNavigate();
    const [token] = useState(localStorage.getItem("token"));
    const [error, setError] = useState(null);

    useEffect(() => {

        if (!token) {
            setError('Unauthorized Access');
            return;
        }
        axios.get(BaseUrl + "/api/courses/" + course_id, {
            headers: {
                'Authorization': `Token ${token}`
            }
        })
            .then((response) => {
                setCourse(response.data);
                setCode(response.data.code);
                setName(response.data.name);
            })
            .catch((error) => {
                setError('Unauthorized Access');
            });
    }, [course_id, token]);

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
                navigate(-1);
        }).catch(error => {
            alert("Course updated failed");
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
            {error ? (
                <p>{error}</p>
            ) : (
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
            )}
        </>
    );
}

export default UpdateCourse;