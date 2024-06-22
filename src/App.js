import './App.css';
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import {Route, Routes} from "react-router-dom";
import Semesters from "./components/Semester/Semesters";
import SemesterDetail from "./components/Semester/SemesterDetail";
import CreateSemester from "./components/Semester/CreateSemester";
import Login from "./components/Login";
import UpdateSemester from "./components/Semester/UpdateSemester";
import Students from "./components/Student/Students";
import CreateStudent from "./components/Student/CreateStudent";
import StudentDetail from "./components/Student/StudentDetail";
import UpdateStudent from "./components/Student/UpdateStudent";
import LecturerDetail from "./components/Lecturer/LecturerDetail";
import UpdateLecturer from "./components/Lecturer/UpdateLecturer";
import CreateLecturer from "./components/Lecturer/CreateLecturer";
import Lecturers from "./components/Lecturer/Lecturers";
import Courses from "./components/Course/Courses";
import CreateCourse from "./components/Course/CreateCourse";
import CourseDetail from "./components/Course/CourseDetail";
import UpdateCourse from "./components/Course/UpdateCourse";
import Classes from "./components/Class/Classes";
import ClassDetail from "./components/Class/ClassDetail";
import CreateClass from "./components/Class/CreateClass";
import UpdateClass from "./components/Class/UpdateClass";
import GradeBookLecturer from "./components/GradeBookLecturer/GradeBookLecturer";
import GradeBookStudent from "./components/GradeBookStudent/GradeBookStudent";
import GradeBookLecturerClassDetail from "./components/GradeBookLecturer/GradeBookLecturerClassDetail";
import GradeBookLecturerUpdateGrade from "./components/GradeBookLecturer/GradeBookLecturerUpdateGrade";
import UpdateClassLecturer from "./components/Class/UpdateClassLecturer";
import UpdateClassStudent from "./components/Class/UpdateClassStudent";
import UploadFile from "./components/UploadFile";


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
                <Route path={"/UploadFile"} element={<UploadFile/>}/>
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
                <Route path={"/UpdateClassLecturer"} element={<UpdateClassLecturer/>}/>
                <Route path={"/UpdateClassStudent"} element={<UpdateClassStudent/>}/>
                <Route path={"/GradeBookLecturer"} element={<GradeBookLecturer/>}/>
                <Route path={"/GradeBookLecturerClassDetail"} element={<GradeBookLecturerClassDetail/>}/>
                <Route path={"/GradeBookLecturerUpdateGrade"} element={<GradeBookLecturerUpdateGrade/>}/>
                <Route path={'/GradeBookStudent'} element={<GradeBookStudent/>}/>
            </Routes>
        </div>
    );
}

export default App;
