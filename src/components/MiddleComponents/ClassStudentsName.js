import React, {Fragment, useEffect, useState} from 'react';
import axios from "axios";
import {BaseUrl} from "../constants";

function ClassStudentsName(props) {

    const [firstName, setFirstName] = useState(" ");
    const [lastName, setLastName] = useState(" ");
    const [token] = useState(localStorage.getItem("token"));

    useEffect(() => {
        axios.get(BaseUrl + "/api/students/" + props.student_id, {
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
    }, [props.student_id, token]);

    return (

        <Fragment>
            {firstName} {lastName},
        </Fragment>
    );
}

export default ClassStudentsName;