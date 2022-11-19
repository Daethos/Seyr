import { useState, useEffect } from 'react'
import './GameCompiler.css'
import ProgressBar from 'react-bootstrap/ProgressBar';
import Loading from '../Loading/Loading';

interface GameProps {
    totalPlayerHealth: number;
    currentPlayerHealth: number;
}

const GameHealthBar = ({ totalPlayerHealth, currentPlayerHealth }: GameProps) => {
    const [playerHealthPercentage, setPlayerHealthPercentage] = useState<number>(0)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        updatePlayerHealthPercentage();
    }, [currentPlayerHealth])

    const updatePlayerHealthPercentage = async () => {
        setLoading(true)
        try {
            const newHealthPercentage = Math.round((currentPlayerHealth/totalPlayerHealth) * 100);
            setPlayerHealthPercentage(newHealthPercentage)
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
        <div className='mb-4'>

        <ProgressBar 
            variant="success" 
            id="player-health" 
            now={playerHealthPercentage} 
        />
        <div className="progress">
            <p className='progress-text'>
                {`${Math.round(currentPlayerHealth)} / ${totalPlayerHealth} [${playerHealthPercentage}%]`}
            </p>
        </div>
        </div>
    )
}

export default GameHealthBar