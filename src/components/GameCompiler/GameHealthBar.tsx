import React, { useState, useEffect, useRef } from 'react'
import './GameCompiler.css'
import ProgressBar from 'react-bootstrap/ProgressBar';
import Button from 'react-bootstrap/Button'
import Loading from '../Loading/Loading';

interface GameProps {
    totalPlayerHealth: number;
    currentPlayerHealth: number;
}

const GameHealthBar = ({ totalPlayerHealth, currentPlayerHealth }: GameProps) => {
    const [playerHealthPercentage, setPlayerHealthPercentage] = useState<number>(0)
    const [loading, setLoading] = useState(true);
    const playerCanvasRef = useRef(null);
    const computerCanvasRef = useRef(null);

    useEffect(() => {
        updatePlayerHealthPercentage();
    }, [currentPlayerHealth])

    const updatePlayerHealthPercentage = async () => {
        try {
            console.log(currentPlayerHealth)
            setPlayerHealthPercentage(Math.round(currentPlayerHealth/totalPlayerHealth) * 100)
            setLoading(false)
        } catch (err: any) {
            console.log(err.message, 'Error updating Health Percentage')
        }
    } 
    
    
    if (loading) {
        return (
        <>
            <Loading NavBar={true} />
        </>
        );
    }

    return (
        <>
        {/* <canvas ref={computerCanvasRef} /> */}

        {/* <canvas ref={playerRef} /> */}

        <ProgressBar variant="success" id="player-health" now={playerHealthPercentage} label={`${currentPlayerHealth}/${totalPlayerHealth}[${playerHealthPercentage}%]`} />
        </>
    )
}

export default GameHealthBar