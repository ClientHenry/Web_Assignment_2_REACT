import React, {Fragment, useEffect, useState} from 'react';
import axios from "axios";
import {BaseUrl} from "../constants";

function ClassCourseName(props) {

    const [courseName, setCourseName] = useState("");
    const [token] = useState(localStorage.getItem("token"));

    useEffect(() => {
        axios.get(BaseUrl + "/api/courses/" + props.course_id, {
            headers: {
                'Authorization': `Token ${token}`
            }
        })
            .then((response) => {
                setCourseName(response.data.name);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [props.course_id, token]);

    return (
        <Fragment>
            {courseName}
        </Fragment>);
}

export default ClassCourseName;