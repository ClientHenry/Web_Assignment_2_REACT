import logo from './logo.svg';
import './App.css';
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import {Route, Routes} from "react-router-dom";
import Semesters from "./components/Semesters";
import SemesterDetail from "./components/SemesterDetail";
import CreateSemester from "./components/CreateSemester";
import Login from "./components/Login";
import UpdateSemester from "./components/UpdateSemester";

function App() {
    return (
        <div className="App">
            <NavBar/>

            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/semesters" element={<Semesters/>}/>
                <Route path={"SemesterDetail"} element={<SemesterDetail/>}/>
                <Route path={"CreateSemester"} element={<CreateSemester/>}/>
                <Route path={"/login"} element={<Login/>}/>
                <Route path={"UpdateSemester"} element={<UpdateSemester/>}/>
            </Routes>
        </div>
    );
}

export default App;
