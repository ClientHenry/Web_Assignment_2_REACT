import React, {Fragment, useEffect, useState} from 'react';
import axios from "axios";
import {BaseUrl} from "./constants";

function ClassSemesterName(props) {

    const [semesterYear, setSemesterYear] = useState(" ");
    const [semesterSemester, setSemesterSemester] = useState(" ");

    useEffect(() => {
        axios.get(BaseUrl + "/api/semesters/" + props.semester_id)
            .then((response) => {
                setSemesterYear(response.data.year);
                setSemesterSemester(response.data.semester);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [props.semester_id]);

    return (
        <Fragment>
            {semesterYear} {semesterSemester}
        </Fragment>
    );

}

export default ClassSemesterName;