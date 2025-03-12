import React, { useState, useRef, useEffect } from "react";
import {useNavigate} from "react-router-dom";

function CustomTraining() {
    const [workouts, setWorkouts] = useState([]);
    const [totalTime, setTotalTime] = useState(0);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [activityIndex, setActivityIndex] = useState(0);
    const [running, setRunning] = useState(false);
    const [finished, setFinished] = useState(false);
    const [audioEnabled, setAudioEnabled] = useState(false);
    const beepRef = useRef(null);
    const finishRef = useRef(null);
    const [showModal, setShowModal] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        beepRef.current = new Audio(`${process.env.PUBLIC_URL}/beep.mp3`);
        beepRef.current.load();
        finishRef.current = new Audio(`${process.env.PUBLIC_URL}/finish.mp3`);
        finishRef.current.load();
    }, []);

    const addWorkout = (name, minutes, seconds) => {
        const totalSeconds = minutes * 60 + seconds;
        if (name && totalSeconds > 0) {
            setWorkouts([...workouts, { name, duration: totalSeconds }]);
            setTotalTime((prevTotal) => prevTotal + totalSeconds);
        }
    };

    const toggleTraining = () => {
        if (workouts.length === 0) return;

        if (!audioEnabled) {
            const confirmAudio = window.confirm("¿Quieres habilitar el sonido?");
            setAudioEnabled(confirmAudio);
        }

        if (running) {
            setRunning(false); // Pausar
        } else {
            if (finished) {
                setElapsedTime(0);
                setActivityIndex(0);
                setFinished(false);
            }
            setRunning(true);
        }
    };

    const resetTraining = () => {
        setRunning(false);
        setFinished(false);
        setElapsedTime(0);
        setActivityIndex(0);
        setWorkouts([]);
        setTotalTime(0);
    };

    const enableAudioCustomTraining = () => {
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

    useEffect(() => {
        if (running && workouts.length > 0) {
            const interval = setInterval(() => {
                setElapsedTime((prevTime) => {
                    const newTime = prevTime + 1;

                    if (newTime >= totalTime) {
                        clearInterval(interval);
                        setRunning(false);
                        setFinished(true);
                        if (audioEnabled) {
                            finishRef.current.currentTime = 0;
                            finishRef.current.play().catch(err => console.error("Error al reproducir sonido:", err));
                        }
                        return totalTime;
                    }

                    let accumulatedTime = 0;
                    let newActivityIndex = 0;

                    for (let i = 0; i < workouts.length; i++) {
                        accumulatedTime += workouts[i].duration;
                        if (newTime < accumulatedTime) {
                            newActivityIndex = i;
                            break;
                        }
                    }

                    if (newActivityIndex !== activityIndex) {
                        setActivityIndex(newActivityIndex);
                        if (audioEnabled) {
                            beepRef.current.currentTime = 0;
                            beepRef.current.play().catch(err => console.error("Error al reproducir sonido:", err));
                        }
                    }

                    return newTime;
                });
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [running, elapsedTime, activityIndex, audioEnabled, workouts]);

    const formatDuration = (seconds) => {
        if (seconds < 60) {
            return `${seconds} seg`;
        }
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        if (remainingSeconds === 0) {
            return `${minutes} min`;
        }
        return `${minutes} min ${remainingSeconds} seg`;
    };

    return (
        <div className="custom-training">
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
            {showModal && (
                <div className="modal" style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(0, 0, 0, 0.8)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <div className="modal-content" style={{
                        background: 'white',
                        padding: '20px',
                        borderRadius: '10px',
                        textAlign: 'center'
                    }}>
                        <h2>Permitir Sonido</h2>
                        <p>Debes tocar el botón para habilitar el sonido.</p>
                        <button 
                            onClick={enableAudioCustomTraining}
                            style={{
                                padding: '10px 20px',
                                marginTop: '10px',
                                fontSize: '16px',
                                cursor: 'pointer'
                            }}
                        >
                            Habilitar Sonido
                        </button>
                    </div>
                </div>
            )}
            <h2>Entrenamiento Personalizado</h2>

            <div className="workout-form">
                <input type="text" id="workoutName" placeholder="Nombre del ejercicio" disabled={running}/>
                <input type="number" id="minutes" placeholder="Min" min="0" disabled={running}/>
                <input type="number" id="seconds" placeholder="Seg" min="0" disabled={running}/>
                <button
                    onClick={() => {
                        const name = document.getElementById("workoutName").value;
                        const minutes = parseInt(document.getElementById("minutes").value) || 0;
                        const seconds = parseInt(document.getElementById("seconds").value) || 0;
                        addWorkout(name, minutes, seconds);
                        document.getElementById("workoutName").value = '';
                        document.getElementById("minutes").value = '';
                        document.getElementById("seconds").value = '';
                    }}
                    style={{visibility: running ? "hidden" : "visible"}}
                >
                    Agregar
                </button>
            </div>

            <ul className="workout-list">
                {workouts.map((workout, index) => (
                    <li key={index}>{formatDuration(workout.duration)} - {workout.name}</li>
                ))}
            </ul>

            {workouts.length > 0 && (
                <button onClick={toggleTraining}>
                    {running ? "Pausar" : finished ? "Reiniciar" : "Iniciar"}
                </button>
            )}

            {finished && (
                <button onClick={resetTraining} style={{marginTop: "10px", backgroundColor: "red", color: "white"}}>
                    Limpiar Todo
                </button>
            )}

            {running || finished ? (
                <div className="training-display">
                    <h3>{finished ? "Entrenamiento Finalizado" : `Ejercicio en curso: ${workouts[activityIndex]?.name}`}</h3>
                    <h1>{Math.floor(elapsedTime / 60)}:{String(elapsedTime % 60).padStart(2, "0")}</h1>
                </div>
            ) : null}

            <style>
                {`
                .custom-training {
                    text-align: center;
                    padding: 20px;
                }
                .workout-form input {
                    margin: 5px;
                    padding: 8px;
                }
                .workout-form button {
                    margin: 5px;
                    padding: 8px;
                    cursor: pointer;
                }
                .training-display {
                    margin-top: 20px;
                }
                `}
            </style>
        </div>
    );
}

export default CustomTraining;
