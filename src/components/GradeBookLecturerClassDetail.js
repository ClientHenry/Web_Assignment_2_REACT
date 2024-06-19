import React, {useEffect, useState} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {BaseUrl} from "./constants";

function GradeBookLecturerClassDetail(props) {

    const location = useLocation();
    const class_id = location.state.class_id;
    const [enrollments, setEnrollments] = useState([]);
    const [token] = useState(localStorage.getItem("token"));

    useEffect(() => {

        axios.get(BaseUrl + "/api/grade/lecturers/" + class_id)
            .then((response) => {
                setEnrollments(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [class_id]);



  return (
    <>
        {token ? (
            <div>
                {enrollments.map(enrollment => (
                    <div key={enrollment.id}>
                        <p>{enrollment.studentID} - {enrollment.grade}</p>
                           <Link to={"/GradeBookLecturerUpdateGrade"} state={{enrollment_id: enrollment.id}}
                          className={"btn btn-primary"}>Update</Link>

                    </div>
                ))}
            </div>
        ) : (
            <p>Unauthorized Access</p>
        )}
    </>
);

}

export default GradeBookLecturerClassDetail;