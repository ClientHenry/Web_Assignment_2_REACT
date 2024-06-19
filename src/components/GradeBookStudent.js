import React, {useEffect, useState} from 'react';
import axios from "axios";
import {BaseUrl} from "./constants";
import {Link} from "react-router-dom";
import ClassCourseName from "./ClassCourseName";

function GradeBookStudent(props) {

    const [enrollments, setEnrollments] = useState([]);
    const [token] = useState(localStorage.getItem("token"));

    useEffect(() => {

        axios.get(BaseUrl + "/api/grade/students/",{
             headers: {
                    'Authorization': 'Token ' + token
                }
        })
            .then((response) => {
                setEnrollments(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [token]);

    return (
        <>
            {token ? (
                <div>
                    {enrollments.map(enrollment =>

                       <p key={enrollment.id}>{enrollment.classID} - {enrollment.grade}</p>

                    )}

                </div>
            ) : (
                <p>Unauthorized Access</p>
            )}
        </>
    );
}

export default GradeBookStudent;