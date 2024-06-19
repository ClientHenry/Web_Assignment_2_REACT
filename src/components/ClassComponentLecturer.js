import React, {useEffect, useState} from 'react';
import axios from "axios";
import {BaseUrl} from "./constants";

function ClassComponentLecturer() {

    const [lecturers, setLecturers] = useState([]);

    useEffect(() => {
        axios.get(`${BaseUrl}/api/lecturers`)
            .then((response) => {
                setLecturers(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <>
            {lecturers.map((lecturer) => (
                <option key={lecturer.id} value={lecturer.id}>
                    {lecturer.firstname} {lecturer.lastname}
                </option>
            ))}
        </>
    );
}

export default ClassComponentLecturer;