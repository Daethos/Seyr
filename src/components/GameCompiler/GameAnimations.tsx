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
}

const GameAnimations = ({ sleep, playerAction, computerAction, playerDamageTotal, computerDamageTotal, combatInitiated, setCombatInitiated }: Props) => {
    const computerDamage = document.querySelector('.computer');
    const playerDamage = document.querySelector('.player');

    // const btnHideComputerDamage = document.querySelector('.btn-hide-computer');
    // const btnPulsePlayerDamage = document.querySelector('.btn-pulse-player');

    // btnHideComputerDamage?.addEventListener('click', () => {
    //     console.log('Toggling Hidden Class')
    //     computerDamage?.classList.toggle('hidden');
    // });


    // btnPulsePlayerDamage?.addEventListener('click', () => {
    //     console.log('Toggling Pulsing Class')
    //     playerDamage?.classList.toggle('pulse');
    // })

    // async function combatTextScroll() {
    //     try {
    //         await sleep(250)
    //         computerDamage?.classList.toggle('hidden');
    //         playerDamage?.classList.toggle('pulse');
    //         await sleep(3000)
    //         computerDamage?.classList.toggle('hidden');
    //         playerDamage?.classList.toggle('pulse');
    //         setCombatInitiated(false)
    //     } catch (err: any) {
    //         console.log(err.message, 'Error Scrolling Combat Text')
    //     }
    // }
    
    // if (combatInitiated) {
    //     console.log('Combat Initiated!')
    //     combatTextScroll()
    // }

    return (
        <>
        <div className="computer hidden">
            {computerAction.charAt(0).toUpperCase() + computerAction.slice(1)}
            <br />
            {computerDamageTotal > 0 ? '-' + Math.round(computerDamageTotal) : ''}
        </div>

        {/* <button className="btn-hide-computer">Hide Computer Damage</button> */}
        
        <br />
        
        <div className="player pulse">
            {playerAction.charAt(0).toUpperCase() + playerAction.slice(1)}
            <br />
            {playerDamageTotal > 0 ? '-' + Math.round(playerDamageTotal) : ''}
        </div>
            {/* <button className="btn-pulse-player">Hide Player Damage</button> */}
        </>
    )
}

export default GameAnimations