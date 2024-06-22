import React, {useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import axios from "axios";
import {BaseUrl} from "../constants";

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
    axios.post(BaseUrl + "/email/" + class_id, null,{
        headers: {
            "Authorization": `Token ${token}`
        }
    })
    .then((response) => {
        alert("Student notified successfully");
        alert(enrollments[0].id);
    })
    .catch((error) => {
        alert("Student notification failed");
        alert(token)
    });
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
                        </div>
                    ))}
                    <button className={"btn btn-danger"} onClick={notifyStudent}>Notify Student</button>
                </div>
            )}
        </>
    );
}

export default GradeBookLecturerClassDetail;