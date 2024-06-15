import React, {Fragment, useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import axios from "axios";
import {BaseUrl} from "./constants";

function SemesterDetail(props) {
    const location = useLocation();
    const semester_id = location.state.semester_id;
    // this usestate is a object not array
    const [semester, setSemester] = useState({});

    const [, setToken] = React.useState(null);
    const [, setHasToken] = React.useState(false);
    React.useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setToken(token);
            setHasToken(true);
        }
    }, []);


    useEffect(() => {

        axios.get(BaseUrl + "/api/semesters/" + semester_id)
            .then((response) => {
                setSemester(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [semester]);


    function deleteSemester(event) {
        let semester_id = event.target.value;
        let login_token = localStorage.getItem("token");
        axios.delete(BaseUrl + "/api/semesters/" + semester_id, {
            headers: {
                "Authorization": "Token " + login_token
            }
        }).then((res) => {
            alert("Semester deleted successfully");


        }).catch(error => {
            console.log(error);
        })
    }


    return (
        <div>

            <p>Year: {semester.year}</p>
            <p>Semester: {semester.semester}</p>
            <Fragment>
            <Link to={"/UpdateSemester"} state={{semester_id: semester.id}} className={"btn btn-primary"}>Update</Link>
                <button value={semester.id} className={"btn btn-danger"} onClick={deleteSemester}>Delete</button>
            </Fragment>


        </div>
    );
}

export default SemesterDetail;