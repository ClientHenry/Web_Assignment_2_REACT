import React, {useEffect, useState} from 'react';
import axios from "axios";
import {BaseUrl} from "./constants";
import {Link} from "react-router-dom";
import ClassCourseName from "./ClassCourseName";

function GradeBookLecturer(props) {

    const[classes, setClasses] = useState([]);
    const [token] = useState(localStorage.getItem("token"));
    useEffect(() => {
        axios.get(BaseUrl + "/api/grade/lecturers", {
            headers: {
                'Authorization': 'Token b6fe753e6ac7cdfc3d96f8a00f1e199420e12b9f'
            }
        })
            .then((response) => {

                setClasses(response.data);

            })
            .catch((error) => {
                console.log(error);
            })
    }, [token]);


    return (
        <>
            {token ? (
                <div>

                    {classes.map(cla =>
                        <p><Link to={"/GradeBookLecturerClassDetail"} state={{class_id: cla.id}}
                                 key={cla.id}>{cla.number} - <ClassCourseName course_id={cla.course}/></Link></p>
                    )}
                </div>
            ) : (
                <p>Unauthorized Access</p>
            )}
        </>
    );
}

export default GradeBookLecturer;