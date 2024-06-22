import React, {useEffect, useState} from 'react';
import axios from "axios";
import {BaseUrl} from "../constants";

function GradeBookStudent(props) {

    const [enrollments, setEnrollments] = useState([]);
    const [token] = useState(localStorage.getItem("token"));
    const [error, setError] = useState(null);

    useEffect(() => {

        if (!token) {
            setError('Unauthorized Access');
            return;
        }
        axios.get(BaseUrl + "/api/grade/students/", {
            headers: {
                'Authorization': 'Token ' + token
            }
        })
            .then((response) => {
                setEnrollments(response.data);
            })
            .catch((error) => {
                setError('Unauthorized Access');
            })
    }, [token]);

    return (
        <>
            {error ? (
                <p>{error}</p>
            ) : (
                <div>
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Class ID/Course Name</th>
                            <th>Grade</th>
                        </tr>
                        </thead>
                        <tbody>
                        {enrollments.map(enrollment => (
                            <tr key={enrollment.id}>
                                <td>{enrollment.classNumber} / {enrollment.courseName}</td>
                                <td>{enrollment.grade}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
}

export default GradeBookStudent;