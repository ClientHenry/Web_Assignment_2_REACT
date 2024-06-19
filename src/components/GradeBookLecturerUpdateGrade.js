import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {BaseUrl} from "./constants";

function GradeBookLecturerUpdateGrade(props) {
     const navigate = useNavigate();
    const [token] = useState(localStorage.getItem("token"));
    const location = useLocation();
    const enrollment_id = location.state.enrollment_id;
    const [enrollment, setEnrollment] = useState({});

    const [grade, setGrade] = useState('');

    useEffect(() => {
        axios.get(BaseUrl + '/api/enrollments/' + enrollment_id)
            .then((response) => {
                 setEnrollment(response.data);
                 setGrade(response.data.grade);

            })
            .catch((error) => {
                console.log(error);
            });
    }, [enrollment_id]);

    function updateGrade() {

        const data = {
           grade
        };
        axios.patch(BaseUrl + '/api/enrollments/' + enrollment_id + "/", data, {
            headers: {
                "Authorization": "Token " + token
            }
        }).then((res) => {

             navigate(-1);
        }).catch(error => {
            console.log(error);
        })
    }

 function gradeHandler(e) {
        setGrade(e.target.value);
    }

    return (
        <>
            {token ? (
                <div>
                    <p>
                        Number: {enrollment.studentID}
                    </p>
                    <p>
                        Grade: <input type={"number"} id={"grade"} value={grade} onChange={gradeHandler}/>
                    </p>

                    <button onClick={updateGrade}>Submit</button>
                </div>

            ) : (
                <p>Unauthorized Access</p>
            )}
        </>
    );
}

export default GradeBookLecturerUpdateGrade;