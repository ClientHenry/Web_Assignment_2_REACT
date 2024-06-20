import React, {Fragment, useEffect, useState} from 'react';
import axios from "axios";
import {BaseUrl} from "./constants";

function ClassSemesterName(props) {

    const [semesterYear, setSemesterYear] = useState(" ");
    const [semesterSemester, setSemesterSemester] = useState(" ");
    const [token] = useState(localStorage.getItem("token"));

    useEffect(() => {
        axios.get(BaseUrl + "/api/semesters/" + props.semester_id, {
            headers: {
                'Authorization': `Token ${token}`
            }
        })
            .then((response) => {
                setSemesterYear(response.data.year);
                setSemesterSemester(response.data.semester);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [props.semester_id, token]);

    return (
        <Fragment>
            {semesterYear} {semesterSemester}
        </Fragment>
    );

}

export default ClassSemesterName;