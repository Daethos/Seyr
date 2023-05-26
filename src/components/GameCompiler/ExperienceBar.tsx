import { useState, useEffect } from 'react';
import './GameCompiler.css';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Loading from '../Loading/Loading';

interface GameProps {
    totalExperience: number;
    currentExperience: number;
    story?: boolean;
    spectator?: boolean;
};

const ExperienceBar = ({ totalExperience, currentExperience, story, spectator }: GameProps) => {
    const [playerXPPercentage, setPlayerXPPercentage] = useState<number>(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        updateExperience();
    }, [currentExperience]);

    const updateExperience = async () => {
        setLoading(true);
        try {
            const newExperiencePercentage = Math.round((currentExperience/totalExperience) * 100);
            setPlayerXPPercentage(newExperiencePercentage);
            setLoading(false);
        } catch (err: any) {
            console.log(err.message, 'Error updating Health Percentage');
        };
    };
    
    if (loading) {
        return (
            <Loading NavBar={true} />
        );
    };

    return (
        <div className={spectator ? 'my-4' : 'mb-4'}>
        <ProgressBar 
            variant="warning" 
            id={story ? 'story-xp' : 'player-xp'} 
            now={playerXPPercentage} 
        />
            <div className="progressxp">
            <p className={story ? 'story-progressxp-text' : 'progressxp-text'}>
                {`${Math.round(currentExperience)} / ${totalExperience} [${playerXPPercentage}%]`}
            </p>
            </div>
        </div>
    );
};

export default ExperienceBar;