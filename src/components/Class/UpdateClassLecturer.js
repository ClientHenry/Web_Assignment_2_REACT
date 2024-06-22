import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {BaseUrl} from "../constants";
import ClassComponentLecturer from "../ClassComponentLecturer";

function UpdateClassLecturer(props) {

    const navigate = useNavigate();
    const [token] = useState(localStorage.getItem("token"));
    const location = useLocation();
    const class_id = location.state.class_id;
    const [lecturer, setLecturer] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {

        if (!token) {
            setError('Unauthorized Access');
            return;
        }
        axios.get(BaseUrl + "/api/classes/" + class_id, {
            headers: {
                'Authorization': `Token ${token}`
            }
        })
            .then((response) => {
                setLecturer(response.data.lecturer);
            })
            .catch((error) => {
                setError('Unauthorized Access');
            });
    }, [class_id, token]);

    function updateLecturer() {

        const data = {
            lecturer
        };
        axios.patch(BaseUrl + "/api/classes/" + class_id + "/", data, {
            headers: {
                "Authorization": "Token " + token
            }
        }).then((res) => {
            alert("Class updated successfully");
            navigate('/Classes');
        }).catch(error => {
            alert("Class updated failed");
        })
    }

    function lecturerHandler(e) {
        setLecturer(e.target.value);
    }

    return (
        <>
            {error ? (
                <p>{error}</p>
            ) : (
                <div>
                    <p>
                        Lecturer:
                        <select name="lecturer" value={lecturer} onChange={lecturerHandler}>
                            <option value="">Null</option>
                            <ClassComponentLecturer/>
                        </select>
                    </p>
                    <p>
                        <button onClick={updateLecturer}>Submit</button>
                    </p>
                </div>
            )}
        </>
    );
}

export default UpdateClassLecturer;