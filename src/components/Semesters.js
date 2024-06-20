import React, {useEffect, useState} from 'react';
import axios from "axios";
import {BaseUrl} from "./constants";
import {Link} from "react-router-dom";

function Semesters() {

    const [semesters, setSemesters] = useState([]);
    const [token] = useState(localStorage.getItem("token"));
    const [error, setError] = useState(null);

    useEffect(() => {

        if (!token) {
            setError('Unauthorized Access');
            return;
        }

        axios.get(BaseUrl + "/api/semesters", {
            headers: {
                'Authorization': `Token ${token}`
            }
        })
            .then((response) => {
                setSemesters(response.data);
            })
            .catch(() => {
                setError('Unauthorized Access');
            });
    }, [token]);

    return (
        <>
            {error ? (
                <p>{error}</p>
            ) : (
                <div>
                    <Link to={"/CreateSemester"} className={"btn btn-primary"}>Create a Semester</Link>
                    {semesters.map(semester =>
                        <p key={semester.id}>
                            <Link to={"/SemesterDetail"} state={{semester_id: semester.id}}>
                                {semester.year} - {semester.semester}
                            </Link>
                        </p>
                    )}
                </div>
            )}
        </>
    );
}

export default Semesters;