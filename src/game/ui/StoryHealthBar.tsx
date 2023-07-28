import { useState, useEffect } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';

interface GameProps {
    totalPlayerHealth: number;
    currentPlayerHealth: number;
};

const StoryHealthBar = ({ totalPlayerHealth, currentPlayerHealth }: GameProps) => {
    const [playerHealthPercentage, setPlayerHealthPercentage] = useState<number>(0);

    useEffect(() => {
        setPlayerHealthPercentage(Math.round((currentPlayerHealth/totalPlayerHealth) * 100));
    }, [currentPlayerHealth, totalPlayerHealth]);  

    return (
        <>
        <ProgressBar variant="info" id='story-health' now={playerHealthPercentage} />
        <div className="story-progress">
            <p className='story-progress-text'>{`${Math.round(currentPlayerHealth)} / ${totalPlayerHealth} [${playerHealthPercentage}%]`}</p>
        </div>
        </>
    );
};

export default StoryHealthBar;