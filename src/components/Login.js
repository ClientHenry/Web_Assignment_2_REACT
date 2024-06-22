import React, {Fragment, useState} from 'react';
import axios from "axios";
import {BaseUrl} from "./constants";
import {useNavigate} from "react-router-dom";


function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token] = useState(localStorage.getItem("token"));
    const navigate = useNavigate();

    function passwordHandler(event) {
        setPassword(event.target.value);
    }

    function usernameHandler(event) {
        setUsername(event.target.value);
    }

    function login() {

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: BaseUrl + '/auth/',
            headers: {},
            data: {
                username: username,
                password: password
            }
        };

        axios.request(config)
            .then((response) => {
                localStorage.setItem("token", response.data.token);
                window.alert("Login Successful");
                navigate("/");
                window.location.reload();
            })
            .catch((error) => {
                window.alert("Login Failed. Please check your username and password");
            });
    }

    function logout() {

        axios.get(BaseUrl + '/auth/logout', {
                headers: {
                    'Authorization': 'Token ' + token
                }
            }
        ).then((response) => {
            localStorage.removeItem("token");
            window.alert("Logout Successful");
            navigate("/");
            window.location.reload();
        }).catch((error) => {
            window.alert("Logout Failed");
        })
    }

    return (

        <div className="container">
            {token ?
                <div className="logout-section">
                    <button className="btn btn-warning" onClick={logout}>Logout</button>
                </div>
                :
                <div className="login-section">
                    <p>
                        <label htmlFor="username">Username:</label>
                        <input className="form-control" id="username" name="username" onChange={usernameHandler}/>
                    </p>
                    <p>
                        <label htmlFor="password">Password:</label>
                        <input className="form-control" id="password" name="password" type="password"
                               onChange={passwordHandler}/>
                    </p>
                    <p>
                        <button className="btn btn-primary" onClick={login}>Login</button>
                    </p>
                </div>
            }
        </div>

    );
}

export default Login;