import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {BaseUrl} from "./constants";

function UpdateSemester() {

    const location = useLocation();
    const semester_id = location.state.semester_id;
    const [, setSemester] = useState({});
    const [year, setYear] = useState("");
    const [sem, setSem] = useState("");
    const navigate = useNavigate();
    const [token] = useState(localStorage.getItem("token"));
    const [error, setError] = useState(null);

    useEffect(() => {

        if (!token) {
            setError('Unauthorized Access');
            return;
        }
        axios.get(BaseUrl + "/api/semesters/" + semester_id, {
            headers: {
                'Authorization': `Token ${token}`
            }
        })
            .then((response) => {
                setSemester(response.data);
                setYear(response.data.year);
                setSem(response.data.semester);
            })
            .catch((error) => {
                setError('Unauthorized Access');
            });
    }, [token, semester_id]);

    function updateSemester() {

        let data = {
            year: year,
            semester: sem
        }
        axios.patch(BaseUrl + "/api/semesters/" + semester_id + "/", data, {
            headers: {
                "Authorization": "Token " + token
            }
        }).then((res) => {
            alert("Semester updated successfully");
            navigate('/Semesters');
        }).catch(error => {
            alert("Semester updated failed");
        })
    }

    function yearHandler(e) {
        setYear(e.target.value);
    }

    function semHandler(e) {
        setSem(e.target.value);
    }

    return (
        <>
            {error ? (
                <p>{error}</p>
            ) : (
                <div>
                    <p>
                        Year: <input type={"number"} id={"year"} value={year} onChange={yearHandler}/>
                    </p>
                    <p>
                        Semester: <select id={"semester"} value={sem} onChange={semHandler}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </select>
                    </p>
                    <p>
                        <button onClick={updateSemester}>Submit</button>
                    </p>
                </div>
            )}
        </>
    );
}

export default UpdateSemester;