import React, { useEffect, useState } from 'react';
import axios from "axios";
import { BaseUrl } from "./constants";

function ClassComponentCourse({ onChange }) {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        axios.get(`${BaseUrl}/api/courses`)
            .then((response) => {
                setCourses(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <>
            {courses.map((course) => (
                <option key={course.id} value={course.id} onClick={() => onChange(course.id)}>
                    {course.name}
                </option>
            ))}
        </>
    );
}

export default ClassComponentCourse;