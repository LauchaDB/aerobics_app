import React, { useState, useEffect } from "react";

function IntervalForm({ onSubmit, intervals, totalTime, onClear, isConfigured }) {
    const [localIntervals, setLocalIntervals] = useState([""]);
    const [localTotalTime, setLocalTotalTime] = useState("");

    useEffect(() => {
        setLocalIntervals(intervals.length ? intervals.map(String) : [""]);
        setLocalTotalTime(totalTime ? String(totalTime / 60) : "");
    }, [intervals, totalTime]);

    const handleIntervalChange = (index, value) => {
        const newIntervals = [...localIntervals];
        newIntervals[index] = value;
        setLocalIntervals(newIntervals);
    };

    const addInterval = () => {
        setLocalIntervals([...localIntervals, ""]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const parsedIntervals = localIntervals.map(Number).filter(n => n > 0);
        const parsedTotalTime = Number(localTotalTime) * 60;

        if (parsedIntervals.length > 0 && parsedTotalTime > 0) {
            onSubmit(parsedIntervals, parsedTotalTime);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Configurar Intervalos</h3>
            <div>
                {localIntervals.map((interval, index) => (
                    <div>
                        <label>Tiempo {index + 1} (seg): </label>
                        <input
                            key={index}
                            type="number"
                            placeholder={`Tiempo ${index + 1} (s)`}
                            value={interval}
                            onChange={(e) => handleIntervalChange(index, e.target.value)}
                            disabled={isConfigured}
                        />
                    </div>
                ))}
                <button hidden={isConfigured} type="button" onClick={addInterval} style={{marginBottom: '3%'}}>
                    Agregar Intervalo
                </button>
            </div>

            <div>
                <label>Tiempo total (min): </label>
                <input
                    type="number"
                    placeholder="Tiempo total (min)"
                    value={localTotalTime}
                    onChange={(e) => setLocalTotalTime(e.target.value)}
                    disabled={isConfigured}
                />
            </div>
                <button hidden={isConfigured} type="submit" style={{backgroundColor: "green"}}>
                    Configurar
                </button>
            <div>
                <button hidden={isConfigured} type="button" onClick={onClear} style={{backgroundColor: "red"}}>
                    Limpiar Todo
                </button>
            </div>

        </form>
    );
}

export default IntervalForm;
