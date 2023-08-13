import { useState, useEffect } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';

interface GameProps {
    totalPlayerHealth: number;
    newPlayerHealth: number;
};

const StoryHealthBar = ({ totalPlayerHealth, newPlayerHealth }: GameProps) => {
    const [playerHealthPercentage, setPlayerHealthPercentage] = useState<number>(0);

    useEffect(() => {
        setPlayerHealthPercentage(Math.round((newPlayerHealth/totalPlayerHealth) * 100));
    }, [newPlayerHealth, totalPlayerHealth]);  

    return (
        <>
        <ProgressBar variant="info" id='story-health' now={playerHealthPercentage} />
        <div className="story-progress">
            <p className='story-progress-text'>{`${Math.round(newPlayerHealth)} / ${totalPlayerHealth} [${playerHealthPercentage}%]`}</p>
        </div>
        </>
    );
};

export default StoryHealthBar;