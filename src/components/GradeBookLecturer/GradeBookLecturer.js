import React, {useEffect, useState} from 'react';
import axios from "axios";
import {BaseUrl} from "../constants";
import {Link} from "react-router-dom";

function GradeBookLecturer(props) {

    const [classes, setClasses] = useState([]);
    const [token] = useState(localStorage.getItem("token"));
    const [error, setError] = useState(null);

    useEffect(() => {

        if (!token) {
            setError('Unauthorized Access');
            return;
        }
        axios.get(BaseUrl + "/api/grade/lecturers", {
            headers: {
                'Authorization': 'Token ' + token
            }
        })
            .then((response) => {

                setClasses(response.data);

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
                            <th>Class ID</th>
                            <th>Class Name</th>
                        </tr>
                        </thead>
                        <tbody>
                        {classes.map(cla => (
                            <tr key={cla.id}>
                                <td>
                                    <Link to={"/GradeBookLecturerClassDetail"} state={{class_id: cla.id}}>
                                        {cla.number}
                                    </Link>
                                </td>
                                <td>{cla.courseName}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

            )}
        </>
    );
}

export default GradeBookLecturer;