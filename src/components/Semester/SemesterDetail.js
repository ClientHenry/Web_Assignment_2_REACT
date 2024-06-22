import React, {Fragment, useEffect, useState} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {BaseUrl} from "../constants";

function SemesterDetail() {

    const location = useLocation();
    const semester_id = location.state.semester_id;
    const [semester, setSemester] = useState({});
    const navigate = useNavigate();
    const [token] = useState(localStorage.getItem("token"));
    const [error, setError] = useState(null);

    useEffect(() => {

        if (!token) {
            setError('Unauthorized Access');
            return;
        }

        axios.get(BaseUrl + "/api/semesters/" + semester_id, {
            headers: {
                'Authorization': `Token ${token}`
            }
        })
            .then((response) => {
                setSemester(response.data);
            })
            .catch((error) => {
                setError('Unauthorized Access');
            });
    }, [token, semester_id]);

    function deleteSemester(event) {

        if (window.confirm("Are you sure you want to delete this semester?"))

            axios.delete(BaseUrl + "/api/semesters/" + semester_id, {
                headers: {
                    "Authorization": "Token " + token
                }
            }).then((res) => {
                alert("Semester deleted successfully");
                navigate('/Semesters');
            }).catch(error => {
                alert("Semester deleted failed");
            });
    }

    return (
        <>
            {error ? (
                <p>{error}</p>
            ) : (
                <div>
                    <p>Year: {semester.year}</p>
                    <p>Semester: {semester.semester}</p>
                    <Link to={"/UpdateSemester"} state={{semester_id: semester_id}}
                          className={"btn btn-primary"}>Update</Link>
                    <button className={"btn btn-danger"} onClick={deleteSemester}>Delete</button>
                </div>
            )}
        </>
    );
}

export default SemesterDetail;