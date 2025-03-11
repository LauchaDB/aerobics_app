import React from "react";
import Menu from "./components/Menu";
import Home from "./pages/Home";
import "./styles.css";

function App() {
  return (
      <div className="container">
        <Menu />
        <Home />
      </div>
  );
}

export default App;