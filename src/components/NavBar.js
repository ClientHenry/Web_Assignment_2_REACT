import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function NavBar() {
    const [token, setToken] = useState(null);

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            setToken(savedToken);
        }
    }, []);


    const hasToken = !!token; // 将 hasToken 计算属性化


    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">GradeBook</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        {hasToken ? (
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to={"/login"}>
                                    Logout
                                </Link>
                            </li>
                        ) : (
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to={"/login"}>
                                    Login
                                </Link>
                            </li>
                        )}

                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button"
                               data-bs-toggle="dropdown" aria-expanded="false">
                                GradeBook
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <li><Link className="nav-link active" aria-current="page" to="/semesters">
                                    Student
                                </Link></li>

                                <li><Link className="nav-link active" aria-current="page" to="/semesters">
                                    Lecturer
                                </Link></li>

                            </ul>
                        </li>


                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button"
                               data-bs-toggle="dropdown" aria-expanded="false">
                                Admin
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <li><Link className="nav-link active" aria-current="page" to="/semesters">
                                    Class
                                </Link></li>

                                <li><Link className="nav-link active" aria-current="page" to="/Semesters">
                                    Lecturer
                                </Link></li>
                                <li><Link className="nav-link active" aria-current="page" to="/Students">
                                    Student
                                </Link></li>
                                <li><Link className="nav-link active" aria-current="page" to="/semesters">
                                    Course
                                </Link></li>
                                <li><Link className="nav-link active" aria-current="page" to="/Semesters">
                                    Semester
                                </Link></li>

                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;