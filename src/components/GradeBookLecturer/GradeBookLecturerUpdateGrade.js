import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {BaseUrl} from "../constants";

function GradeBookLecturerUpdateGrade(props) {
    const navigate = useNavigate();
    const [token] = useState(localStorage.getItem("token"));
    const location = useLocation();
    const enrollment_id = location.state.enrollment_id;
    const [enrollment, setEnrollment] = useState({});
    const [grade, setGrade] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {

        if (!token) {
            setError('Unauthorized Access');
            return;
        }
        axios.get(BaseUrl + '/api/enrollments/' + enrollment_id, {
            headers: {
                'Authorization': 'Token ' + token
            }
        })
            .then((response) => {
                setEnrollment(response.data);
                setGrade(response.data.grade);

            })
            .catch((error) => {
                setError('Unauthorized Access');
            });
    }, [enrollment_id, token]);

    function updateGrade() {

        const data = {
            grade
        };
        axios.patch(BaseUrl + '/api/enrollments/' + enrollment_id + "/", data, {
            headers: {
                "Authorization": "Token " + token
            }
        }).then((res) => {
            alert("Grade updated successfully");
            navigate(-1);
        }).catch(error => {
            alert("Grade updated failed");
        })
    }

    function gradeHandler(e) {
        setGrade(e.target.value);
    }

    return (
        <>
            {error ? (
                <p>{error}</p>
            ) : (
                <div>
                    <p>
                        <strong>{enrollment.studentFirstName} {enrollment.studentLastName}</strong>
                    </p>
                    <p>
                        Grade: <input type={"number"} id={"grade"} value={grade} onChange={gradeHandler}/>
                    </p>

                    <button className="btn btn-primary" onClick={updateGrade}>Submit</button>
                </div>

            )}
        </>
    );
}

export default GradeBookLecturerUpdateGrade;