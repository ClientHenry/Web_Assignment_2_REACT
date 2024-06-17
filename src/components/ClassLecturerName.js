import React, {Fragment, useEffect, useState} from 'react';
import {BaseUrl} from "./constants";
import axios from "axios";

function ClassLecturerName(props) {

    const [firstName, setFirstName] = useState(" ");
    const [lastName, setLastName] = useState(" ");

    useEffect(() => {
        axios.get(BaseUrl + "/api/lecturers/" + props.lecturer_id)
            .then((response) => {
                setFirstName(response.data.firstname);
                setLastName(response.data.lastname);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [props.lecturer_id]);

    return (
        <Fragment>{firstName} {lastName}</Fragment>
    );
}

export default ClassLecturerName;