import React, {useEffect, useState} from 'react';
import axios from "axios";
import {BaseUrl} from "./constants";
import {Link} from "react-router-dom";

function Lecturers() {

    const [lecturers, setLecturers] = useState([]);
    const [token] = useState(localStorage.getItem("token"));

    useEffect(() => {

        axios.get(BaseUrl + "/api/lecturers")
            .then((response) => {
                setLecturers(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    return (
        <>
            {token ? (
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
            ) : (
                <p>Unauthorized Access</p>
            )}
        </>
    );
}

export default Lecturers;