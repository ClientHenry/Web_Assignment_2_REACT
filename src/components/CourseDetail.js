import React, {Fragment, useEffect, useState} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {BaseUrl} from "./constants";

function CourseDetail() {
    const location = useLocation();
    const course_id = location.state.course_id;
    const [course, setCourse] = useState({});
    const navigate = useNavigate();
    const [token] = useState(localStorage.getItem("token"));

    useEffect(() => {

        axios.get(BaseUrl + "/api/courses/" + course_id)
            .then((response) => {
                setCourse(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [course_id]);

    function deleteCourse(event) {

        if (window.confirm("Are you sure you want to delete this course?"))

            axios.delete(BaseUrl + "/api/courses/" + course_id, {
                headers: {
                    "Authorization": "Token " + token
                }
            }).then((res) => {
                alert("Course deleted successfully");
                navigate('/Courses');
            }).catch(error => {
                console.log(error);
            });
    }


    return (
        <>
            {token ? (
                <div>
                    <p>Code: {course.code}</p>
                    <p>Name: {course.name}</p>
                    <Link to={"/UpdateCourse"} state={{course_id: course_id}}
                          className={"btn btn-primary"}>Update</Link>
                    <button className={"btn btn-danger"} onClick={deleteCourse}>Delete</button>
                </div>
            ) : (
                <p>Unauthorized Access</p>
            )}
        </>
    );
}

export default CourseDetail;