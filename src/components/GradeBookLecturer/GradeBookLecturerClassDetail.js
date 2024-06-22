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
        axios.post(BaseUrl + "/email/" + class_id, null, {
            headers: {
                "Authorization": `Token ${token}`
            }
        })
            .then((response) => {
                alert("Student notified successfully");
                const {emails_sent_to} = response.data;
                alert(`Emails sent to: ${emails_sent_to.join(', ')}`);
            })
            .catch((error) => {
                alert("Student notification failed");
            });
    }


    return (
        <>
            {error ? (
                <p>{error}</p>
            ) : (
                <div>
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Grade</th>
                            <th>Update</th>
                        </tr>
                        </thead>
                        <tbody>
                        {enrollments.map(enrollment => (
                            <tr key={enrollment.id}>
                                <td>{enrollment.studentFirstName} {enrollment.studentLastName}</td>
                                <td>{enrollment.grade}</td>
                                <td>
                                    <Link to={"/GradeBookLecturerUpdateGrade"} state={{enrollment_id: enrollment.id}}>
                                        Update
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <button className={"btn btn-danger"} onClick={notifyStudent}>Notify Student</button>
                </div>
            )}
        </>
    );
}

export default GradeBookLecturerClassDetail;