import React, {useEffect, useState} from 'react';
import axios from "axios";
import {BaseUrl} from "./constants";
import {Link} from "react-router-dom";

function Semesters(props) {
    const [semesters, setSemesters] = useState([]);
    const [hasToken, setHasToken] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setHasToken(true);
        }
    }, []);
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
        <div>
            {/*{hasToken?*/}
                <Link to={"/CreateSemester"} className={"btn btn-primary"}>Create a Semester</Link>

            {/*    :*/}
            {/*""}*/}
                {semesters.map(semester=>
                <p><Link to={"/SemesterDetail"} state={{semester_id:semester.id}} key={semester.id}>{semester.year} - {semester.semester}</Link></p>
            )}
        </div>
     );
}

export default Semesters;