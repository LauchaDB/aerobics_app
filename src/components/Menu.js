import React from "react";
import { Link } from "react-router-dom";

function Menu() {
    return (
        <nav className="menu">
            <h1>Aerobics App</h1>
            <ul>
                <li><Link to="/">Intermitentes</Link></li>
                <li><Link to="/custom-training">Entrenamiento Custom</Link></li>
            </ul>
        </nav>
    );
}

export default Menu;
