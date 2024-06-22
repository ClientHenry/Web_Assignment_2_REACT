import React, {useEffect, useState} from 'react';
import axios from "axios";
import {BaseUrl} from "../constants";
import {Link} from "react-router-dom";
import ClassCourseName from "../MiddleComponents/ClassCourseName";

function Classes() {

    const [classes, setClasses] = useState([]);
    const [token] = useState(localStorage.getItem("token"));
    const [error, setError] = useState(null);

    useEffect(() => {

        if (!token) {
            setError('Unauthorized Access');
            return;
        }
        axios.get(BaseUrl + "/api/classes", {
            headers: {
                'Authorization': `Token ${token}`
            }
        })
            .then((response) => {
                setClasses(response.data);
            })
            .catch((error) => {
                setError('Unauthorized Access');
            })
    }, [token]);

    return (
        <>
            {error ? (
                <p>{error}</p>
            ) : (
                <div>
                    <Link to={"/CreateClass"} className={"btn btn-primary"}>Create a Class</Link>
                    <p></p>
                    {classes.map(cla =>
                        <p><Link to={"/ClassDetail"} state={{class_id: cla.id}}
                                 key={cla.id}>{cla.number} - <ClassCourseName course_id={cla.course}/></Link></p>
                    )}
                </div>
            )}
        </>
    );
}

export default Classes;