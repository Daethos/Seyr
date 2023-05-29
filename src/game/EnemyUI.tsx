import { useEffect, useState } from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar';
import enemyHealthBar from './images/enemy-healthbar.png';

interface EnemyUIProps {
    currentEnemyHealth: number; 
    totalEnemyHealth: number;
};

const EnemyUI = ({ currentEnemyHealth, totalEnemyHealth }: EnemyUIProps) => {
    const [playerHealthPercentage, setPlayerHealthPercentage] = useState<number>(0);

    useEffect(() => {
        updatePlayerHealthPercentage();
    }, [currentEnemyHealth]);

    const updatePlayerHealthPercentage = async () => {
        try {
            const newHealthPercentage = Math.round((currentEnemyHealth/totalEnemyHealth) * 100);
            setPlayerHealthPercentage(newHealthPercentage);
        } catch (err: any) {
            console.log(err.message, 'Error updating Health Percentage');
        };
    };

    return (
        <div style={{ position: "relative", marginTop: "70%", marginLeft: "800px", transform: "scale(1.25)" }}>
            <img src={enemyHealthBar} alt="Health Bar" style={{ position: "absolute", width: '125px', height: '35px', zIndex: 4 }} />
            <ProgressBar 
                variant="info"
                now={playerHealthPercentage}
                style={{ position: "absolute", marginLeft: "9px", marginTop: "58.75%", width: "106px", height: "15px", zIndex: 2, backgroundColor: "red" }} 
            />
            <p className='' style={{ position: "absolute", color: "#fdf6d8", textShadow: "1px 1px 1px black", marginTop: "8px", width: "13vw", fontSize: "12px", zIndex: 6, textAlign: "center", fontFamily: "Cinzel", fontWeight: 700 }}>
                {`${Math.round(currentEnemyHealth)} / ${totalEnemyHealth} [${playerHealthPercentage}%]`}
            </p>
        </div>
    );
};

export default EnemyUI;