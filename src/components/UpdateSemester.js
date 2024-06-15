import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {BaseUrl} from "./constants";

function UpdateSemester(props) {

    const location = useLocation();
    const semester_id = location.state.semester_id;
    const [semester, setSemester] = useState({});
    const[year, setYear] = useState("");
    const[sem, setSem] = useState("");

  const navigate = useNavigate();


    useEffect(() => {
        axios.get(BaseUrl + "/api/semesters/" + semester_id)
            .then((response) => {
                setSemester(response.data);
                setYear(response.data.year);
                setSem(response.data.semester);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
function updateSemester() {
     let login_token = localStorage.getItem("token");
       let data = {
           year: year,
           semester: sem
       }

       axios.patch(BaseUrl+"/api/semesters/" + semester_id +"/", data, {
           headers: {
               "Authorization": "Token " + login_token
           }
       }).then((res) => {
          alert("Semester updated successfully");

       }).catch(error=>{
           console.log(error);
       })
}

function yearHandler(e) {
    setYear(e.target.value);
}
function semHandler(e) {
    setSem(e.target.value);
}


    return (
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
    );
}

export default UpdateSemester;