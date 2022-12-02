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
    roll_success: boolean;
    computer_roll_success: boolean;
    counterSuccess: boolean;
    computerCounterSuccess: boolean;
}

const GameAnimations = ({ sleep, roll_success, computer_roll_success, counterSuccess, computerCounterSuccess, playerAction, computerAction, playerDamageTotal, computerDamageTotal, playerCritical, computerCritical, combatInitiated, setCombatInitiated }: Props) => {

    const critStyle = {
        backgroundColor: 'red',
        fontSize: 32 + 'px',
    }

    const rollStyle = {
        backgroundColor: 'green',
        fontSize: 28 + 'px',
    }

    return (
        <>
        {
            computerCritical 
            ?
                <div className="computer hidden" style={critStyle} id='computer-animation'>
                    {computerAction.charAt(0).toUpperCase() + computerAction.slice(1)}
                    <br />
                    {computerDamageTotal > 0 ? '-' + Math.round(computerDamageTotal) : ''}
                </div>
            :
                computer_roll_success || computerCounterSuccess
                ?
                    <div className="computer hidden" style={rollStyle} id='computer-animation'>
                        {computerAction.charAt(0).toUpperCase() + computerAction.slice(1)}
                        <br />
                        {computerDamageTotal > 0 ? '-' + Math.round(computerDamageTotal) : ''}
                    </div> 
                :
                    <div className="computer hidden" id='computer-animation'>
                        {computerAction.charAt(0).toUpperCase() + computerAction.slice(1)}
                        <br />
                        {computerDamageTotal > 0 ? '-' + Math.round(computerDamageTotal) : ''}
                    </div>
        }
        
        <br />
        
        {
            playerCritical 
            ? 
                <div className="player pulse" style={critStyle} id='player-animation'>
                    {playerAction.charAt(0).toUpperCase() + playerAction.slice(1)}
                    <br />
                    {playerDamageTotal > 0 ? '-' + Math.round(playerDamageTotal) : ''}
                </div>
            : 
                roll_success || counterSuccess
                ?
                    <div className="player pulse" style={rollStyle} id='player-animation'>
                        {playerAction.charAt(0).toUpperCase() + playerAction.slice(1)}
                        <br />
                        {playerDamageTotal > 0 ? '-' + Math.round(playerDamageTotal) : ''}
                    </div>
                :
                    <div className="player pulse" id='player-animation'>
                    {playerAction.charAt(0).toUpperCase() + playerAction.slice(1)}
                    <br />
                        {playerDamageTotal > 0 ? '-' + Math.round(playerDamageTotal) : ''}
                    </div>
        }
        </>
    )
}

export default GameAnimations