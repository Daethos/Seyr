import { useState, useRef, useEffect } from 'react';
import Overlay from 'react-bootstrap/Overlay';
import Button from 'react-bootstrap/Button';


interface CombatProps {
    ascean: any;
    enemy: any;
    loadingCombatOverlay: boolean;
    setLoadingCombatOverlay: React.Dispatch<React.SetStateAction<boolean>>;
    combatResolved: boolean;
    setCombatResolved: React.Dispatch<React.SetStateAction<boolean>>;
    playerAction: string;
    computerAction: string;
    playerDamageTotal: number;
    computerDamageTotal: number;
    playerCritical: boolean;
    computerCritical: boolean;
    rollSuccess: boolean;
    computerRollSuccess: boolean;
    counterSuccess: boolean;
    computerCounterSuccess: boolean;
    playerWin: boolean;
    computerWin: boolean;
    combatOverlayText: string;
    setCombatOverlayText: React.Dispatch<React.SetStateAction<string>>;
};

const CombatOverlay = ({ ascean, enemy, playerWin, computerWin, loadingCombatOverlay, setLoadingCombatOverlay, combatOverlayText, setCombatOverlayText, combatResolved, setCombatResolved, playerAction, computerAction, playerDamageTotal, computerDamageTotal, playerCritical, computerCritical, rollSuccess, computerRollSuccess, counterSuccess, computerCounterSuccess }: CombatProps) => {
    const overlayRef = useRef(null);
    const pArticle = ['a', 'e', 'i', 'o', 'u'].includes(playerAction.charAt(0).toLowerCase()) ? 'an' : 'a';
    const cArticle = ['a', 'e', 'i', 'o', 'u'].includes(computerAction.charAt(0).toLowerCase()) ? 'an' : 'a';
    useEffect(() => {
        if (combatResolved) {
            console.log("Combat Resolved, closing Overlay")
            setTimeout(() => {
                setLoadingCombatOverlay(false);
                setCombatResolved(false);
                setCombatOverlayText('');
            }, 3000);
        };
    }, [combatResolved]);

    const critStyle = {
        color: 'red',
        fontSize: 32 + 'px',
    };

    const rollStyle = {
        color: 'green',
        fontSize: 32 + 'px',
    };

    const getStyle = () => {
        if (playerCritical) {
            return critStyle;
        } else if (rollSuccess || counterSuccess) {
            return rollStyle;
        } else {
            return {};
        };
    };

    const getEnemyStyle = () => {
        if (computerCritical) {
            return critStyle;
        } else if (computerRollSuccess || computerCounterSuccess) {
            return rollStyle;
        } else {
            return {};
        };
    };

    return (
        <Overlay target={overlayRef} show={loadingCombatOverlay}>
            <div
            className='d-flex align-items-center justify-content-center'
            style={{
                position: 'fixed',
                top: "37.5vh",
                left: 0,
                width: '100%',
                height: '20%',
                display: '',
                backgroundColor: 'rgba(0, 0, 0, 0)',
                zIndex: 9999,
                // border: "0.2em solid purple"
            }}
            >
            <h5 className='overlay-content-combat' style={ loadingCombatOverlay ? { animation: "fade 1s ease-in 0.5s forwards" } : { animation: "" } }>
                {
                    playerWin ?
                    <p style={getStyle()}>{ascean?.name} Wins with {pArticle} {playerAction.charAt(0).toUpperCase() + playerAction.slice(1)}, dealing {Math.round(playerDamageTotal)} Damage!
                    <br />
                    {combatOverlayText}
                    </p> 
                    : computerWin ?
                    <p style={getEnemyStyle()}>{enemy?.name} Wins with {cArticle} {computerAction.charAt(0).toUpperCase() + computerAction.slice(1)}, dealing {Math.round(computerDamageTotal)} Damage!
                    <br />
                    {combatOverlayText}
                    </p>
                    : null
                }
            </h5>
            </div>
        </Overlay>
    );
};

export default CombatOverlay;