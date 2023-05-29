import { useEffect, useState } from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar';
import playerHealthbar from './images/player-healthbar.png';

interface CombatUIProps {
    currentPlayerHealth: number; 
    totalPlayerHealth: number;
};

const CombatUI = ({ currentPlayerHealth, totalPlayerHealth }: CombatUIProps) => {
    const [playerHealthPercentage, setPlayerHealthPercentage] = useState<number>(0);

    useEffect(() => {
        updatePlayerHealthPercentage();
    }, [currentPlayerHealth]);

    const updatePlayerHealthPercentage = async () => {
        try {
            const newHealthPercentage = Math.round((currentPlayerHealth/totalPlayerHealth) * 100);
            setPlayerHealthPercentage(newHealthPercentage);
        } catch (err: any) {
            console.log(err.message, 'Error updating Health Percentage')
        };
    };

    return (
        <div style={{ position: "relative", transform: "scale(1.25)", display: "grid", gridRowStart: 7 }}>
            <img src={playerHealthbar} alt="Health Bar" style={{ position: "absolute", width: '125px', height: '35px', marginTop: "57.5%", marginLeft: "12.5%" }} />
            <ProgressBar 
                variant="info"
                now={playerHealthPercentage}
                style={{ position: "absolute", marginTop: "58.75%", marginLeft: "13.5%", width: "106px", height: "15px", backgroundColor: "red" }} 
            />
            <p className='' style={{ position: "absolute", color: "#fdf6d8", textShadow: "1px 1px 1px black", marginTop: "58.5%", marginLeft: "12.5%", width: "13vw", fontSize: "12px", textAlign: "center", fontFamily: "Cinzel", fontWeight: 700 }}>
                {`${Math.round(currentPlayerHealth)} / ${totalPlayerHealth} [${playerHealthPercentage}%]`}
            </p>
        </div>
    );
};

export default CombatUI;