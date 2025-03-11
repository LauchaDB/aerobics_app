import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Menu from "./components/Menu";
import Home from "./pages/Home";
import CustomTraining from "./pages/CustomTraining";
import "./styles.css";

function App() {
    return (
        <Router>
            <div className="container">
                <Menu />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/custom-training" element={<CustomTraining />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
