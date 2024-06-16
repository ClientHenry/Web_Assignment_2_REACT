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

function App() {
    return (
        <div className="App">
            <NavBar/>

            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/Semesters" element={<Semesters/>}/>
                <Route path={"/SemesterDetail"} element={<SemesterDetail/>}/>
                <Route path={"/CreateSemester"} element={<CreateSemester/>}/>
                <Route path={"/Login"} element={<Login/>}/>
                <Route path={"/UpdateSemester"} element={<UpdateSemester/>}/>
                <Route path="/Students" element={<Students/>}/>
                <Route path={"/CreateStudent"} element={<CreateStudent/>}/>
                 <Route path={"/StudentDetail"} element={<StudentDetail/>}/>
                 <Route path={"/UpdateStudent"} element={<UpdateStudent/>}/>
            </Routes>
        </div>
    );
}

export default App;
