import React, {useEffect, useState} from 'react';
import axios from "axios";
import {BaseUrl} from "../constants";
import {Link} from "react-router-dom";

function Lecturers() {

    const [lecturers, setLecturers] = useState([]);
    const [token] = useState(localStorage.getItem("token"));
    const [error, setError] = useState(null);

    useEffect(() => {

        if (!token) {
            setError('Unauthorized Access');
            return;
        }
        axios.get(BaseUrl + "/api/lecturers", {
            headers: {
                'Authorization': `Token ${token}`
            }
        })
            .then((response) => {
                setLecturers(response.data);
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
                    <Link to={"/CreateLecturer"} className={"btn btn-primary"}>Create a Lecturer</Link>
                    {lecturers.map(lecturer =>
                        <p>
                            <Link to={"/LecturerDetail"} state={{lecturer_id: lecturer.id}} key={lecturer.id}>
                                {lecturer.firstname} {lecturer.lastname}
                            </Link>
                        </p>
                    )}
                </div>
            )}
        </>
    );
}

export default Lecturers;