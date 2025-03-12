import React, { useState } from "react";
import Timer from "../components/Timer";
import { useNavigate } from "react-router-dom";

function Home() {
    const [intervals, setIntervals] = useState([]);
    const [totalTime, setTotalTime] = useState(0);
    const navigate = useNavigate();

    return (
        <div className="home">
            <button 
                onClick={() => navigate('/')} 
                className="back-button"
                style={{
                    padding: '10px 20px',
                    backgroundColor: 'rgba(95, 95, 95, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '8px',
                    color: 'black',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    backdropFilter: 'blur(10px)',
                    fontSize: '1rem'
                }}
            >
                ← Volver al Inicio
            </button>
            <h2>Intervalos Aeróbicos</h2>
            <Timer intervals={intervals} totalTime={totalTime} />
        </div>
    );
}

export default Home;
