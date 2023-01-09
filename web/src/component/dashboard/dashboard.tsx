import TopBarHeader from "./topbar/topbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function Dashboard() {

    return (
            <>
            <Router>
                <TopBarHeader />

                <div className="container">
                <Routes>
                <Route path="/" element="hkhk" />
                </Routes>
                    <h1 className="mt-4">Simple Sidebar</h1>
                    <p>The starting state of the menu will appear collapsed on smaller screens, and will appear non-collapsed on larger screens. When toggled using the button below, the menu will change.</p>
                    <p>
                        Make sure to keep all page content within the
                        <code>#page-content-wrapper</code>
                        . The top navbar is optional, and just for demonstration. Just create an element with the
                        <code>#sidebarToggle</code>
                        ID which will toggle the menu when clicked.
                    </p>
                </div>
                </Router>
            </>
    )

}
export default Dashboard;