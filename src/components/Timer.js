import React, { useState, useEffect, useRef } from "react";
import IntervalForm from "./IntervalForm";

function Timer() {
    const [intervals, setIntervals] = useState([]);
    const [totalTime, setTotalTime] = useState(0);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [running, setRunning] = useState(false);
    const [audioEnabled, setAudioEnabled] = useState(false);
    const [showModal, setShowModal] = useState(true);
    const [isConfigured, setIsConfigured] = useState(false); // Controla la visibilidad del temporizador
    const intervalRef = useRef(null);
    const beepRef = useRef(null);
    const finishRef = useRef(null);

    useEffect(() => {
        beepRef.current = new Audio("/beep.wav");
        finishRef.current = new Audio("/finish.wav");
        beepRef.current.load();
        finishRef.current.load();
    }, []);

    useEffect(() => {
        if (running) {
            intervalRef.current = setInterval(() => {
                setTimeElapsed(prevTime => {
                    const newTime = prevTime + 1;

                    if (newTime >= totalTime) {
                        clearInterval(intervalRef.current);
                        playFinishSound();
                        return totalTime;
                    }

                    if (intervals.length > 0) {
                        const cycleTime = intervals.reduce((acc, val) => acc + val, 0);
                        let accumulated = 0;

                        for (const interval of intervals) {
                            accumulated += interval;
                            if (newTime % cycleTime === accumulated % cycleTime) {
                                playBeepSound();
                                break;
                            }
                        }
                    }

                    return newTime;
                });
            }, 1000);
        } else {
            clearInterval(intervalRef.current);
        }

        return () => clearInterval(intervalRef.current);
    }, [running]);

    useEffect(() => {
        if (timeElapsed >= totalTime) {
            setRunning(false);
        }
    }, [timeElapsed, totalTime]);

    const handleConfigure = (newIntervals, newTotalTime) => {
        setIntervals(newIntervals);
        setTotalTime(newTotalTime);
        setTimeElapsed(0);
        setIsConfigured(true); // Se habilita el temporizador
    };

    const handleClear = () => {
        setIntervals([]);
        setTotalTime(0);
        setTimeElapsed(0);
        setRunning(false);
        setIsConfigured(false); // Volver a la configuración inicial
    };

    const playBeepSound = () => {
        if (!audioEnabled || !beepRef.current) return;
        beepRef.current.currentTime = 0;
        beepRef.current.play().catch(err => console.error("Error al reproducir sonido:", err));
    };

    const enableAudio = () => {
        if (!audioEnabled) {
            Promise.all([
                beepRef.current.play().catch(err => console.error("Error al activar beep:", err)),
                finishRef.current.play().catch(err => console.error("Error al activar finish:", err))
            ]).then(() => {
                setAudioEnabled(true);
                setShowModal(false);
            }).catch(err => console.error("Error al activar sonido en móviles:", err));
        } else {
            setShowModal(false);
        }
    };

    const playFinishSound = () => {
        if (!audioEnabled || !finishRef.current) return;
        finishRef.current.currentTime = 0;
        finishRef.current.play().catch(() => {
            setTimeout(() => {
                finishRef.current.play().catch(err => console.error("Error al reintentar sonido de finalización:", err));
            }, 500);
        });
    };

    return (
        <div className="timer">
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Permitir Sonido</h2>
                        <p>Debes tocar el botón para habilitar el sonido.</p>
                        <button onClick={enableAudio}>Habilitar Sonido</button>
                    </div>
                </div>
            )}

            {/* Formulario de configuración */}
            <IntervalForm
                onSubmit={handleConfigure}
                onClear={handleClear}
                intervals={intervals}
                totalTime={totalTime}
                isConfigured={isConfigured}
            />

            {/* Solo mostrar el temporizador si se ha configurado */}
            {isConfigured && (
                <>
                    <h3>Tiempo Transcurrido: {Math.floor(timeElapsed / 60)}:{String(timeElapsed % 60).padStart(2, "0")}</h3>
                    <div>
                        <button className={running ? "pausar" : "iniciar"} onClick={() => setRunning(!running)} disabled={timeElapsed >= totalTime}>
                            {running ? "Pausar" : "Iniciar"}
                        </button>
                    </div>
                    <button onClick={handleClear} style={{ backgroundColor: "darkgray" }}>
                        Limpiar Todo
                    </button>
                </>
            )}

            <style>
                {`
                .modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.8);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .modal-content {
                    background: white;
                    padding: 20px;
                    border-radius: 10px;
                    text-align: center;
                }
                button {
                    padding: 10px 20px;
                    margin-top: 10px;
                    font-size: 16px;
                    cursor: pointer;
                }
                `}
            </style>
        </div>
    );
}

export default Timer;
