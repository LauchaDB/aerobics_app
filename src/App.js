import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Menu from "./components/Menu";
import Home from "./pages/Home";
import CustomTraining from "./pages/CustomTraining";
import Landing from "./pages/Landing";
import "./styles.css";

function App() {
    return (
        <Router>
            <div className="container">
                <Routes>
                    <Route path="/aerobics-app" element={<Landing />} />
                    <Route path="/" element={<Landing />} />
                    <Route path="/aerobics-app/intermitentes" element={<Landing />} />
                    <Route path="/intermitentes" element={
                        <div>
                            <Menu />
                            <Home />
                        </div>
                    } />
                    <Route path="/custom-training" element={
                        <div>
                            <Menu />
                            <CustomTraining />
                        </div>
                    } />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
