import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {BaseUrl} from "../constants";
import ClassComponentSemester from "../MiddleComponents/ClassComponentSemester";
import ClassComponentCourse from "../MiddleComponents/ClassComponentCourse";


function UpdateClass(props) {

    const navigate = useNavigate();
    const [token] = useState(localStorage.getItem("token"));
    const location = useLocation();
    const class_id = location.state.class_id;
    const [number, setNumber] = useState('');
    const [semester, setSemester] = useState('');
    const [course, setCourse] = useState('');
    const [lecturer, setLecturer] = useState('');
    const [students, setStudents] = useState([]);
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
                setNumber(response.data.number);
                setCourse(response.data.course);
                setSemester(response.data.semester);
                setLecturer(response.data.lecturer);
                setStudents(response.data.students);
            })
            .catch((error) => {
                setError('Unauthorized Access');
            });
    }, [class_id, token]);

    function updateClass() {

        const data = {
            number,
            semester,
            course,
            lecturer,
            students,
        };
        axios.patch(BaseUrl + "/api/classes/" + class_id + "/", data, {
            headers: {
                "Authorization": "Token " + token
            }
        }).then((res) => {
            alert("Class updated successfully");
            navigate(-1);
        }).catch(error => {
            alert("Class updated failed");
        })
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        switch (name) {
            case 'number':
                setNumber(value);
                break;
            case 'semester':
                setSemester(value);
                break;
            case 'course':
                setCourse(value);
                break;
            default:
                break;
        }
    };

    return (
        <>
            {error ? (
                <p>{error}</p>
            ) : (
                <div>
                    <p>
                        Number: <input type="number" name="number" value={number} onChange={handleChange}/>
                    </p>
                    <p>
                        Semester:
                        <select name="semester" value={semester} onChange={handleChange}>
                            <ClassComponentSemester/>
                        </select>
                    </p>
                    <p>
                        Course:
                        <select name="course" value={course} onChange={handleChange}>
                            <ClassComponentCourse/>
                        </select>
                    </p>
                    <button onClick={updateClass}>Submit</button>
                </div>
            )}
        </>
    );
}

export default UpdateClass;