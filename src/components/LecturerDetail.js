import React, {Fragment, useEffect, useState} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {BaseUrl} from "./constants";

function LecturerDetail() {
    const location = useLocation();
    const lecturer_id = location.state.lecturer_id;
    const [lecturer, setLecturer] = useState({});
    const navigate = useNavigate();
    const [token] = useState(localStorage.getItem("token"));
    const [error, setError] = useState(null);

    useEffect(() => {

        if (!token) {
            setError('Unauthorized Access');
            return;
        }
        axios.get(BaseUrl + "/api/lecturers/" + lecturer_id, {
            headers: {
                'Authorization': `Token ${token}`
            }
        })
            .then((response) => {
                setLecturer(response.data);
            })
            .catch((error) => {
                setError('Unauthorized Access');
            });
    }, [lecturer_id, token]);

    function deleteLecturer(event) {

        if (window.confirm("Are you sure you want to delete this lecturer?"))
            axios.delete(BaseUrl + "/api/lecturers/" + lecturer_id, {
                headers: {
                    "Authorization": "Token " + token
                }
            }).then((res) => {
                alert("Lecturer deleted successfully");
                navigate('/Lecturers');
            }).catch(error => {
                alert("Lecturer deleted failed");
            });
    }


    return (
        <>
            {error ? (
                <p>{error}</p>
            ) : (
                <div>
                    <p>Staff ID: {lecturer.staffID}</p>
                    <p>First Name: {lecturer.firstname}</p>
                    <p>Last Name: {lecturer.lastname}</p>
                    <p>Email: {lecturer.email}</p>
                    <p>DOB: {lecturer.DOB}</p>
                    <Link to={"/UpdateLecturer"} state={{lecturer_id: lecturer_id}}
                          className={"btn btn-primary"}>Update</Link>
                    <button className={"btn btn-danger"} onClick={deleteLecturer}>Delete</button>
                </div>
            )}
        </>
    );
}

export default LecturerDetail;