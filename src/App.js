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
import UpdateClass from "./components/UpdateClass";
import GradeBookLecturer from "./components/GradeBookLecturer";
import GradeBookStudent from "./components/GradeBookStudent";
import GradeBookLecturerClassDetail from "./components/GradeBookLecturerClassDetail";
import GradeBookLecturerUpdateGrade from "./components/GradeBookLecturerUpdateGrade";


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
                <Route path={"/UpdateClass"} element={<UpdateClass/>}/>
                <Route path={"/GradeBookLecturer"} element={<GradeBookLecturer/>}/>
                <Route path={"/GradeBookLecturerClassDetail"} element={<GradeBookLecturerClassDetail/>}/>
                <Route path={"/GradeBookLecturerUpdateGrade"} element={<GradeBookLecturerUpdateGrade/>}/>
                <Route path={'/GradeBookStudent'} element={<GradeBookStudent/>}/>


            </Routes>
        </div>
    );
}

export default App;
