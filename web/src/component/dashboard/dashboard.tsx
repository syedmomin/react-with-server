import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './dashboard.css'
import Home from "./home/home";
import MainNavbar from "./navbar/navbar";
import DigitalWatch from "./digitalwatch/digitalwatch";
import Calculator from "./calculator/calculator";
import TodoList from "./todo/todolist";
import GameCards from "./gamecards/gamecards";

export default function Dashboard() {
    return (
        <>
            <div className="homePage">
                <Router>
                    <MainNavbar />
                    <div className="container">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/watch" element={<DigitalWatch />} />
                            <Route path="/calculator" element={<Calculator />} />
                            <Route path="/todo" element={<TodoList />} />
                            <Route path="/game" element={<GameCards />} />
                        </Routes>
                    </div>
                </Router>
            </div>
        </>
    )

}