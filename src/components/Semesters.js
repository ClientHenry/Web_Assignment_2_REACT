import React, {useEffect, useState} from 'react';
import axios from "axios";
import {BaseUrl} from "./constants";
import {Link} from "react-router-dom";

function Semesters() {

    const [semesters, setSemesters] = useState([]);
    const [token] = useState(localStorage.getItem("token"));

    useEffect(() => {

        axios.get(BaseUrl + "/api/semesters")
            .then((response) => {
                setSemesters(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    return (
        <>
            {token ? (
                <div>
                    <Link to={"/CreateSemester"} className={"btn btn-primary"}>Create a Semester</Link>
                    {semesters.map(semester =>
                        <p><Link to={"/SemesterDetail"} state={{semester_id: semester.id}}
                                 key={semester.id}>{semester.year} - {semester.semester}</Link></p>
                    )}
                </div>
            ) : (
                <p>Unauthorized Access</p>
            )}
        </>
    );
}

export default Semesters;