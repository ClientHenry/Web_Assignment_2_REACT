import React, {useEffect, useState} from 'react';
import axios from "axios";
import {BaseUrl} from "./constants";

function ClassComponentSemester({ onChange }) {

     const [semesters, setSemesters] = useState([]);

    useEffect(() => {
        axios.get(`${BaseUrl}/api/semesters`)
            .then((response) => {
                setSemesters(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <>
            {semesters.map((semester) => (
                <option key={semester.id} value={semester.id} onClick={() => onChange(semester.id)}>
                    {semester.year}
                </option>
            ))}
        </>
    );
}

export default ClassComponentSemester;