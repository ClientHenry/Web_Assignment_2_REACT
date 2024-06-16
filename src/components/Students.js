import React, {useEffect, useState} from 'react';
import axios from "axios";
import {BaseUrl} from "./constants";
import {Link} from "react-router-dom";

function Students() {

    const [students, setStudents] = useState([]);
    const [token] = useState(localStorage.getItem("token"));

    useEffect(() => {

        axios.get(BaseUrl + "/api/students")
            .then((response) => {
                setStudents(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    return (
        <>
            {token ? (
                <div>
                    <Link to={"/CreateStudent"} className={"btn btn-primary"}>Create a Student</Link>
                    {students.map(student =>
                        <p>
                            <Link to={"/StudentDetail"} state={{student_id: student.id}} key={student.id}>
                                {student.firstname} {student.lastname}
                            </Link>
                        </p>
                    )}
                </div>
            ) : (
                <p>Unauthorized Access</p>
            )}
        </>
    );
}

export default Students;