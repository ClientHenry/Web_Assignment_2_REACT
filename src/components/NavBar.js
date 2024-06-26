import React, {useState} from 'react';
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function NavBar() {

    const [token] = useState(localStorage.getItem('token'));
    const hasToken = !!token;

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
                                <li><Link className="nav-link active" aria-current="page" to="/GradeBookStudent">
                                    Student
                                </Link></li>

                                <li><Link className="nav-link active" aria-current="page" to="/GradeBookLecturer">
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
                                <li><Link className="nav-link active" aria-current="page" to="/Classes">
                                    Class
                                </Link></li>
                                <li><Link className="nav-link active" aria-current="page" to="/Lecturers">
                                    Lecturer
                                </Link></li>
                                <li><Link className="nav-link active" aria-current="page" to="/Students">
                                    Student
                                </Link></li>
                                <li><Link className="nav-link active" aria-current="page" to="/Courses">
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