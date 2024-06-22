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
                // <div>
                //     <p>Number: {cla.number}</p>
                //     <p>Semester: <ClassSemesterName semester_id={cla.semester}/></p>
                //     <p>Course: <ClassCourseName course_id={cla.course}/></p>
                //     <p>Lecturer: <ClassLecturerName lecturer_id={cla.lecturer}/></p>
                //     <p>Students:
                //         {cla.students && cla.students.length > 0 ? (
                //             cla.students.map(student => (
                //                 <ClassStudentsName key={student} student_id={student}/>
                //             ))
                //         ) : 'N/A'}
                //     </p>
                //     <Link to={"/UpdateClass"} state={{class_id: class_id}} className={"btn btn-primary"}>Update</Link>
                //     <Link to={"/UpdateClassLecturer"} state={{class_id: class_id}} className={"btn btn-primary"}>Update Lecturer</Link>
                //     <Link to={"/UpdateClassStudent"} state={{class_id: class_id}} className={"btn btn-primary"}>Update Student</Link>
                //
                //     <button className={"btn btn-danger"} onClick={deleteClass}>Delete</button>
                // </div>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Class Details</h5>
                        <p><strong>Number:</strong> {cla.number}</p>
                        <p><strong>Semester:</strong> <ClassSemesterName semester_id={cla.semester}/></p>
                        <p><strong>Course:</strong> <ClassCourseName course_id={cla.course}/></p>
                        <p><strong>Lecturer:</strong> <ClassLecturerName lecturer_id={cla.lecturer}/></p>
                        <p><strong>Students:</strong> {cla.students && cla.students.length > 0 ? (
                            cla.students.map(student => (
                                <ClassStudentsName key={student} student_id={student}/>
                            ))
                        ) : 'N/A'}</p>

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
                </div>


            )}
        </>
    );
}

export default ClassDetail;