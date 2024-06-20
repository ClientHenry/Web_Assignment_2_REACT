import React, {useEffect, useState} from 'react';
import axios from "axios";
import {BaseUrl} from "./constants";

function ClassComponentStudent(props) {

    const [students, setStudents] = useState([]);
    const [token] = useState(localStorage.getItem("token"));

    useEffect(() => {
        axios.get(`${BaseUrl}/api/students`, {
            headers: {
                'Authorization': `Token ${token}`
            }
        })
            .then((response) => {
                setStudents(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [token]);

    return (
        <>
            {students.map((student) => (
                <option key={student.id} value={student.id}>
                    {student.firstname} {student.lastname}
                </option>
            ))}
        </>
    );
}

export default ClassComponentStudent;