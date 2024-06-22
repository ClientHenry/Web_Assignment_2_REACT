import React, {useEffect, useState} from 'react';
import axios from "axios";
import {BaseUrl} from "../constants";
import {Link} from "react-router-dom";

function Courses() {

    const [courses, setCourses] = useState([]);
    const [token] = useState(localStorage.getItem("token"));
    const [error, setError] = useState(null);

    useEffect(() => {

        if (!token) {
            setError('Unauthorized Access');
            return;
        }
        axios.get(BaseUrl + "/api/courses", {
            headers: {
                'Authorization': `Token ${token}`
            }
        })
            .then((response) => {
                setCourses(response.data);
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
                    <Link to={"/CreateCourse"} className={"btn btn-primary"}>Create a Course</Link>
                    <p></p>
                    {courses.map(course =>
                        <p><Link to={"/CourseDetail"} state={{course_id: course.id}}
                                 key={course.id}>{course.code} - {course.name}</Link></p>
                    )}
                </div>
            )}
        </>
    );
}

export default Courses;