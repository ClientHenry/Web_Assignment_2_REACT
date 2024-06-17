import React, {useEffect, useState} from 'react';
import axios from "axios";
import {BaseUrl} from "./constants";

function ClassComponentLecturer({ onChange }) {

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
                <option key={lecturer.id} value={lecturer.id} onClick={() => onChange(lecturer.id)}>
                    {lecturer.firstname}
                </option>
            ))}
        </>
    );
}

export default ClassComponentLecturer;