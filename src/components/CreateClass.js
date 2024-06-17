// CreateClass.jsx
import React, { useState } from 'react';
import axios from "axios";
import { BaseUrl } from "./constants";
import { useNavigate } from "react-router-dom";
import ClassComponentSemester from "./ClassComponentSemester";
import ClassComponentCourse from "./ClassComponentCourse";
import ClassComponentLecturer from "./ClassComponentLecturer";

function CreateClass() {
    const navigate = useNavigate();
    const [token] = useState(localStorage.getItem("token"));
    const [number, setNumber] = useState('');
    const [semester, setSemester] = useState('');
    const [course, setCourse] = useState('');
    const [lecturer, setLecturer] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'number':
                setNumber(value);
                alert(number);
                break;
            case 'semester':
                setSemester(value);
                break;
            case 'course':
                setCourse(value);
                break;
            case 'lecturer':
                setLecturer(value);
                break;
            default:
                break;
        }
    };

    const createClass = () => {
        const data = {
            number,
            semester,
            course,
            lecturer
        };
        axios.post(`${BaseUrl}/api/classes/`, data, {
            headers: {
                "Authorization": `Token ${token}`
            }
        })
        .then((res) => {
            alert("Class created successfully");
            navigate('/Classes');
        })
        .catch(error => {
            console.log(error);
        });
    };

    return (
        <>
            {token ? (
                <div>
                    <p>
                        Number: <input type="number" name="number" value={number} onChange={handleChange} />
                    </p>
                    <p>
                        Semester:
                        <select name="semester" value={semester} onChange={handleChange}>
                            <option value="">Select a semester</option>
                            <ClassComponentSemester onChange={(semesterId) => setSemester(semesterId)} />
                        </select>
                    </p>
                    <p>
                        Course:
                        <select name="course" value={course} onChange={handleChange}>
                            <option value="">Select a course</option>
                            <ClassComponentCourse onChange={(courseId) => setCourse(courseId)} />
                        </select>
                    </p>
                    <p>
                        Lecturer:
                        <select name="lecturer" value={lecturer} onChange={handleChange}>
                            <option value="">Select a lecturer</option>
                            <ClassComponentLecturer onChange={(lecturerId) => setLecturer(lecturerId)} />
                        </select>
                    </p>
                    <p>
                        <button onClick={createClass}>Submit</button>
                    </p>
                </div>
            ) : (
                <p>Unauthorized Access</p>
            )}
        </>
    );
}

export default CreateClass;