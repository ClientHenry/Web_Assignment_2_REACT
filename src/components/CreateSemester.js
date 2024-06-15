import React from 'react';
import axios from "axios";
import {BaseUrl} from "./constants";

function CreateSemester(props) {

    const[token, setToken] = React.useState(null);
    const[hasToken, setHasToken] = React.useState(false);

    React.useEffect(() => {
        const token = localStorage.getItem("token");
        if(token) {
            setToken(token);
            setHasToken(true);
        }
    }, []);

    function createSemester() {

        let login_token = localStorage.getItem("token");
       let data = {
           "year": document.getElementById("year").value,
           "semester": document.getElementById("semester").value
       }

       axios.post(BaseUrl+"/api/semesters/", data, {
           headers: {
               "Authorization": "Token " + login_token
           }
       }).then((res) => {
          alert("Semester created successfully");
       }).catch(error=>{
           console.log(error);
       })

    }


    return (
        <div>
            <p>
                Year: <input type={"number"} id={"year"}/>
            </p>
            <p>
                Semester: <select id={"semester"}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                </select>
            </p>
            <p>
                <button onClick={createSemester}>Submit</button>

            </p>

        </div>
    );
}

export default CreateSemester;