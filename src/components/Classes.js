import React, {useEffect, useState} from 'react';
import axios from "axios";
import {BaseUrl} from "./constants";
import {Link} from "react-router-dom";
import ClassCourseName from "./ClassCourseName";

function Classes() {

    const [classes, setClasses] = useState([]);
    const [token] = useState(localStorage.getItem("token"));

    useEffect(() => {

        axios.get(BaseUrl + "/api/classes")
            .then((response) => {
                setClasses(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    return (
        <>
            {token ? (
                <div>
                    <Link to={"/CreateClass"} className={"btn btn-primary"}>Create a Class</Link>
                    {classes.map(cla =>
                        <p><Link to={"/ClassDetail"} state={{class_id: cla.id}}
                                 key={cla.id}>{cla.number} - <ClassCourseName course_id={cla.course}/></Link></p>
                    )}
                </div>
            ) : (
                <p>Unauthorized Access</p>
            )}
        </>
    );
}

export default Classes;