import React from 'react'
import './GameCompiler.css'

interface Props {
    playerAction: string;
    computerAction: string;
    playerDamageTotal: number;
    computerDamageTotal: number;
    combatInitiated: boolean;
    setCombatInitiated: React.Dispatch<React.SetStateAction<boolean>>;
    sleep: (ms: number) => Promise<unknown>;
    playerCritical: boolean;
    computerCritical: boolean;
}

const GameAnimations = ({ sleep, playerAction, computerAction, playerDamageTotal, computerDamageTotal, playerCritical, computerCritical, combatInitiated, setCombatInitiated }: Props) => {

    const critStyle = {
        backgroundColor: 'red',
        fontSize: 32 + 'px',
    }

    return (
        <>
        {
            computerCritical 
            ?
                <div className="computer hidden" style={critStyle} >
                    {computerAction.charAt(0).toUpperCase() + computerAction.slice(1)}
                    <br />
                    {computerDamageTotal > 0 ? '-' + Math.round(computerDamageTotal) : ''}
                </div>
            :
                <div className="computer hidden" >
                    {computerAction.charAt(0).toUpperCase() + computerAction.slice(1)}
                    <br />
                    {computerDamageTotal > 0 ? '-' + Math.round(computerDamageTotal) : ''}
                </div>
        }
        
        <br />
        
        {
            playerCritical 
            ? 
                <div className="player pulse" style={critStyle}>
                    {playerAction.charAt(0).toUpperCase() + playerAction.slice(1)}
                    <br />
                    {playerDamageTotal > 0 ? '-' + Math.round(playerDamageTotal) : ''}
                </div>
            : 
            <div 
            className="player pulse"
            >
            {playerAction.charAt(0).toUpperCase() + playerAction.slice(1)}
            <br />
                {playerDamageTotal > 0 ? '-' + Math.round(playerDamageTotal) : ''}
            </div>
        }
        </>
    )
}

export default GameAnimations