import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TopBarHeader from "./topbar/topbar";
import GameCards from "./gamecards/gamecards";
import Crossword from "./crossword/crossword";
import MainNavbar from "./navbar/navbar";
function Dashboard() {
    const mainMenu = [
        {
            text: "CrossWords",
            url: "crossword",
            component: <Crossword />
        },
    ];
    return (
        <>
            <Router>
                {/* {mainMenu.map(mainMenu => (
                    <TopBarHeader

                     text={mainMenu.text} url={mainMenu.url}
                     
                     />
                ))} */}
                <div className="container">
                    <Routes>
                        <GameCards />
                    </Routes>
                </div>
            </Router>
            {/* <Route path={mainMenu.url} element={mainMenu.component} /> */}
            {/* <MainNavbar/> */}
        </>
    )

}
export default Dashboard;