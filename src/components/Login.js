import React, {Fragment, useEffect, useState} from 'react';
import axios from "axios";
import {BaseUrl} from "./constants";
import {useNavigate} from "react-router-dom";


function Login(props) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState(null);
    const [hasToken, setHasToken] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            setToken(savedToken);
            setHasToken(true);
        }
    }, [token]);

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

                console.log(JSON.stringify(response.data));
                setToken(response.data);
                setHasToken(true);
                // set token to data
                localStorage.setItem("token", response.data.token);
                alert(response.data.token);
                // reload page
                //  props.history.push('/');
                navigate("/");
                window.location.reload();


            })
            .catch((error) => {
                console.log(error);
            });

    }


    function logout() {
        let loginToken = localStorage.getItem("token");
        axios.get(BaseUrl + '/auth/logout', {
                headers: {
                    'Authorization': 'Token ' + loginToken
                }
            }
        ).then((response) => {
            console.log(response);
            localStorage.removeItem("token");
            setToken(null);
            setHasToken(false);
            navigate("/");
            window.location.reload();
        }).catch((error) => {
            console.log(error);
        })
    }


    return (
        <div>
            {hasToken ?
                <Fragment>
                    <button className={"btn btn-warning"} onClick={logout}>Logout</button>


                </Fragment>
                :
                <Fragment>
                    <p>Username: <input className={"form-control"} name={"username"} onChange={usernameHandler}/></p>
                    <p>Password: <input className={"form-control"} name={"password"} type={"password"}
                                        onChange={passwordHandler}/></p>
                    <p>
                        <button className={"btn btn-primary"} onClick={login}>Login</button>
                    </p>

                </Fragment>
            }


        </div>
    );
}

export default Login;