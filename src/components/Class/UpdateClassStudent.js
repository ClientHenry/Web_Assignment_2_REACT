import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {BaseUrl} from "../constants";
import ClassComponentStudent from "../MiddleComponents/ClassComponentStudent";

function UpdateClassStudent(props) {

    const navigate = useNavigate();
    const [token] = useState(localStorage.getItem("token"));
    const location = useLocation();
    const class_id = location.state.class_id;
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
                // setStudents(response.data.students.map(student => student.id));
                setStudents(response.data.students);
            })
            .catch((error) => {
                setError('Unauthorized Access');
            });
    }, [class_id, token]);

    function updateStudents() {

        const data = {

            students: students
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
            alert(students);
        })
    }

    function studentsHandler(e) {

        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
        if (selectedOptions.includes("")) {
            setStudents([]); // 如果选择了 "None" 选项，则将 students 更新为空数组
        } else {
            setStudents(selectedOptions);
        }
    }

    return (
        <>
            {error ? (
                <p>{error}</p>
            ) : (
                <div>
                    <p>
                        Students:
                        <select name="students" multiple value={students} onChange={studentsHandler}>
                            <option value="">None</option>
                            <ClassComponentStudent/>
                        </select>
                    </p>
                    <p>
                        <button onClick={updateStudents}>Submit</button>
                    </p>
                </div>
            )}
        </>
    );
}

export default UpdateClassStudent;
