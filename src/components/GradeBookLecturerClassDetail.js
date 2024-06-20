import React, {useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import axios from "axios";
import {BaseUrl} from "./constants";

function GradeBookLecturerClassDetail(props) {

    const location = useLocation();
    const class_id = location.state.class_id;
    const [enrollments, setEnrollments] = useState([]);
    const [token] = useState(localStorage.getItem("token"));
    const [error, setError] = useState(null);

    useEffect(() => {

        if (!token) {
            setError('Unauthorized Access');
            return;
        }
        axios.get(BaseUrl + "/api/grade/lecturers/" + class_id, {
            headers: {
                'Authorization': 'Token ' + token
            }
        })
            .then((response) => {
                setEnrollments(response.data);
            })
            .catch((error) => {
                setError('Unauthorized Access');
            });
    }, [class_id, token]);

    function notifyStudent() {
        alert("Student notified successfully");
    }


    return (
        <>
            {error ? (
                <p>{error}</p>
            ) : (
                <div>
                    {enrollments.map(enrollment => (
                        <div key={enrollment.id}>
                            <p>{enrollment.studentFirstName} {enrollment.studentLastName} -- {enrollment.grade}</p>
                            <Link to={"/GradeBookLecturerUpdateGrade"} state={{enrollment_id: enrollment.id}}
                                  className={"btn btn-primary"}>Update</Link>
                            <button className={"btn btn-danger"} onClick={notifyStudent}>Notify Student</button>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}

export default GradeBookLecturerClassDetail;