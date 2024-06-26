import React, {Fragment, useEffect, useState} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {BaseUrl} from "../constants";
import ClassSemesterName from "../MiddleComponents/ClassSemesterName";
import ClassLecturerName from "../MiddleComponents/ClassLecturerName";
import ClassCourseName from "../MiddleComponents/ClassCourseName";
import ClassStudentsName from "../MiddleComponents/ClassStudentsName";

function ClassDetail() {
    const location = useLocation();
    const class_id = location.state.class_id;
    const [cla, setCla] = useState({});
    const navigate = useNavigate();
    const [token] = useState(localStorage.getItem("token"));
    const [error, setError] = useState(null);

    useEffect(() => {

        if (!token) {
            setError('Unauthorized Access');
            return;
        }
        axios.get(BaseUrl + "/api/classes/" + class_id, {
            headers: {
                'Authorization': `Token ${token}`
            }
        })
            .then((response) => {
                setCla(response.data);
            })
            .catch((error) => {
                setError('Unauthorized Access');
            });
    }, [class_id, token]);

    function deleteClass(event) {

        if (window.confirm("Are you sure you want to delete this class?"))
            axios.delete(BaseUrl + "/api/classes/" + class_id, {
                headers: {
                    "Authorization": "Token " + token
                }
            }).then((res) => {
                alert("Class deleted successfully");
                navigate('/Classes');
            }).catch(error => {
                alert("Class deleted failed");
            });
    }

    return (
        <>
            {error ? (
                <p>{error}</p>
            ) : (
                <div>
                    <p>Number: {cla.number}</p>
                    <p>Semester: <ClassSemesterName semester_id={cla.semester}/></p>
                    <p>Course: <ClassCourseName course_id={cla.course}/></p>
                    <p>Lecturer: <ClassLecturerName lecturer_id={cla.lecturer}/></p>
                    <p>Students:
                        {cla.students && cla.students.length > 0 ? (
                            cla.students.map(student => (
                                <ClassStudentsName key={student} student_id={student}/>
                            ))
                        ) : 'N/A'}
                    </p>

                    <div className="btn-group" role="group">
                        <Link to={"/UpdateClass"} state={{class_id: class_id}} className={"btn btn-primary mr-2"}>Update
                            Class</Link>
                        <Link to={"/UpdateClassLecturer"} state={{class_id: class_id}}
                              className={"btn btn-success mr-2"}>Update Lecturer</Link>
                        <Link to={"/UpdateClassStudent"} state={{class_id: class_id}}
                              className={"btn btn-info mr-2"}>Update Student</Link>
                        <button className={"btn btn-danger"} onClick={deleteClass}>Delete</button>
                    </div>
                </div>

            )}
        </>
    );
}

export default ClassDetail;