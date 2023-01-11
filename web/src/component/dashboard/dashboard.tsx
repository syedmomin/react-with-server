import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GameCards from "./gamecards/gamecards";
import MainNavbar from "./navbar/navbar";
import DigitalWatch from "./digitalwatch/digitalwatch";
import Calculator from "./calculator/calculator";
import TodoList from "./todo/todolist";

function Dashboard() {
    return (
        <>
            <Router>
                <MainNavbar />
                <div className="container">
                <Routes>
                    <Route path="/" element={<GameCards />} />
                    <Route path="/watch" element={<DigitalWatch />} />
                    <Route path="/calculator" element={<Calculator />} />
                    <Route path="/todo" element={<TodoList />} />
                </Routes>
                </div>
            </Router>
        </>
    )

}
export default Dashboard;