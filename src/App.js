import './App.css';
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import {Route, Routes} from "react-router-dom";
import Semesters from "./components/Semesters";
import SemesterDetail from "./components/SemesterDetail";
import CreateSemester from "./components/CreateSemester";
import Login from "./components/Login";
import UpdateSemester from "./components/UpdateSemester";
import Students from "./components/Students";
import CreateStudent from "./components/CreateStudent";
import StudentDetail from "./components/StudentDetail";
import UpdateStudent from "./components/UpdateStudent";
import LecturerDetail from "./components/LecturerDetail";
import UpdateLecturer from "./components/UpdateLecturer";
import CreateLecturer from "./components/CreateLecturer";
import Lecturers from "./components/Lecturers";
import Courses from "./components/Courses";
import CreateCourse from "./components/CreateCourse";
import CourseDetail from "./components/CourseDetail";
import UpdateCourse from "./components/UpdateCourse";
import Classes from "./components/Classes";
import ClassDetail from "./components/ClassDetail";
import CreateClass from "./components/CreateClass";
import ClassComponentSemester from "./components/ClassComponentSemester";
import ClassComponentCourse from "./components/ClassComponentCourse";


function App() {
    return (
        <div className="App">
            <NavBar/>

            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path={"/Login"} element={<Login/>}/>
                <Route path="/Semesters" element={<Semesters/>}/>
                <Route path={"/SemesterDetail"} element={<SemesterDetail/>}/>
                <Route path={"/CreateSemester"} element={<CreateSemester/>}/>
                <Route path={"/UpdateSemester"} element={<UpdateSemester/>}/>
                <Route path="/Students" element={<Students/>}/>
                <Route path={"/CreateStudent"} element={<CreateStudent/>}/>
                <Route path={"/StudentDetail"} element={<StudentDetail/>}/>
                <Route path={"/UpdateStudent"} element={<UpdateStudent/>}/>
                <Route path="/Lecturers" element={<Lecturers/>}/>
                <Route path={"/CreateLecturer"} element={<CreateLecturer/>}/>
                <Route path={"/LecturerDetail"} element={<LecturerDetail/>}/>
                <Route path={"/UpdateLecturer"} element={<UpdateLecturer/>}/>
                <Route path="/Courses" element={<Courses/>}/>
                <Route path={"/CreateCourse"} element={<CreateCourse/>}/>
                <Route path={"/CourseDetail"} element={<CourseDetail/>}/>
                <Route path={"/UpdateCourse"} element={<UpdateCourse/>}/>
                <Route path="/Classes" element={<Classes/>}/>
                  <Route path={"/ClassDetail"} element={<ClassDetail/>}/>
                 <Route path={"/CreateClass"} element={<CreateClass/>}/>
                    <Route path="/ClassComponentSemester" element={<ClassComponentSemester/>}/>
                  <Route path="/ClassComponentCourse" element={<ClassComponentCourse/>}/>
            </Routes>
        </div>
    );
}

export default App;
