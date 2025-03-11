import React, { useState } from "react";
import Timer from "../components/Timer";

function Home() {
    const [intervals, setIntervals] = useState([]);
    const [totalTime, setTotalTime] = useState(0);

    return (
        <div className="home">
            <h2>Intervalos Aeróbicos</h2>
            <Timer intervals={intervals} totalTime={totalTime} />
        </div>
    );
}

export default Home;
