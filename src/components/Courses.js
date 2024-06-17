import React, {useEffect, useState} from 'react';
import axios from "axios";
import {BaseUrl} from "./constants";
import {Link} from "react-router-dom";

function Courses() {

    const [courses, setCourses] = useState([]);
    const [token] = useState(localStorage.getItem("token"));

    useEffect(() => {

        axios.get(BaseUrl + "/api/courses")
            .then((response) => {
                setCourses(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    return (
        <>
            {token ? (
                <div>
                    <Link to={"/CreateCourse"} className={"btn btn-primary"}>Create a Course</Link>
                    {courses.map(course =>
                        <p><Link to={"/CourseDetail"} state={{course_id: course.id}}
                                 key={course.id}>{course.code} - {course.name}</Link></p>
                    )}
                </div>
            ) : (
                <p>Unauthorized Access</p>
            )}
        </>
    );
}

export default Courses;