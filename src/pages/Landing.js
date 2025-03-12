import React from 'react';
import { useNavigate } from 'react-router-dom';

function Landing() {
    const navigate = useNavigate();

    return (
        <div className="landing-page">
            <h1>Bienvenido a Aerobics App</h1>
            <div className="landing-options">
                <div 
                    className="landing-option" 
                    onClick={() => navigate('/intermitentes')}
                >
                    <h2>Intermitentes</h2>
                    <p>Entrenamiento con intervalos predefinidos</p>
                </div>
                <div 
                    className="landing-option" 
                    onClick={() => navigate('/custom-training')}
                >
                    <h2>Entrenamiento Personalizado</h2>
                    <p>Crea tu propio entrenamiento personalizado</p>
                </div>
            </div>
            <style>
                {`
                .landing-page {
                    text-align: center;
                    padding: 2rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    background: linear-gradient(135deg, #6366f1 0%, #3b82f6 100%);
                    color: white;
                }
                .landing-options {
                    display: flex;
                    gap: 2.5rem;
                    margin-top: 3rem;
                    flex-wrap: wrap;
                    justify-content: center;
                    perspective: 1000px;
                }
                .landing-option {
                    background: rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(10px);
                    padding: 2.5rem;
                    border-radius: 20px;
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
                    cursor: pointer;
                    transition: all 0.4s ease;
                    width: 320px;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    transform-style: preserve-3d;
                }
                .landing-option:hover {
                    transform: translateY(-10px) rotateX(5deg);
                    background: rgba(255, 255, 255, 0.2);
                    box-shadow: 0 15px 45px rgba(0, 0, 0, 0.2);
                }
                .landing-option h2 {
                    color: white;
                    margin-bottom: 1.5rem;
                    font-size: 1.8rem;
                    font-weight: 600;
                    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
                .landing-option p {
                    color: rgba(255, 255, 255, 0.9);
                    font-size: 1.1rem;
                    line-height: 1.6;
                }
                h1 {
                    font-size: 3rem;
                    margin-bottom: 2rem;
                    font-weight: 700;
                    text-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    animation: fadeInDown 1s ease-out;
                }
                @keyframes fadeInDown {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                @media (max-width: 768px) {
                    .landing-options {
                        flex-direction: column;
                        gap: 1.5rem;
                        padding: 0 1rem;
                    }
                    .landing-option {
                        width: 100%;
                        max-width: 320px;
                    }
                    h1 {
                        font-size: 2.2rem;
                        padding: 0 1rem;
                    }
                }
                `}
            </style>
        </div>
    );
}

export default Landing;