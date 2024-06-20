import React, {Fragment, useEffect, useState} from 'react';
import {BaseUrl} from "./constants";
import axios from "axios";

function ClassLecturerName(props) {

    const [firstName, setFirstName] = useState(" ");
    const [lastName, setLastName] = useState(" ");
    const [token] = useState(localStorage.getItem("token"));

    useEffect(() => {
        axios.get(BaseUrl + "/api/lecturers/" + props.lecturer_id, {
            headers: {
                'Authorization': `Token ${token}`
            }
        })
            .then((response) => {
                setFirstName(response.data.firstname);
                setLastName(response.data.lastname);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [props.lecturer_id, token]);

    return (
        <Fragment>{firstName} {lastName}</Fragment>
    );
}

export default ClassLecturerName;