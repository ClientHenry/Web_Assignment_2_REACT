import React, {useEffect, useState} from 'react';
import axios from "axios";
import {BaseUrl} from "../constants";

function ClassComponentSemester() {

    const [semesters, setSemesters] = useState([]);
    const [token] = useState(localStorage.getItem("token"));

    useEffect(() => {
        axios.get(`${BaseUrl}/api/semesters`, {
            headers: {
                'Authorization': `Token ${token}`
            }
        })
            .then((response) => {
                setSemesters(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [token]);

    return (
        <>
            {semesters.map((semester) => (
                <option key={semester.id} value={semester.id}>
                    {semester.year} {semester.semester}
                </option>
            ))}
        </>
    );
}

export default ClassComponentSemester;