import './GameCompiler.css';
import { useState } from 'react';

interface Props {
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
    combatEngaged: boolean;
    combatRound: number;
    spectator?: boolean;
};

const GameAnimations = ({ spectator, rollSuccess, computerRollSuccess, counterSuccess, computerCounterSuccess, playerAction, computerAction, playerDamageTotal, computerDamageTotal, playerCritical, computerCritical }: Props) => {
    const [visibility, setVisibility] = useState<boolean>(true);
    const critStyle = {
        color: 'red',
        fontSize: '32px',
    };

    const rollStyle = {
        color: 'green',
        fontSize: '32px',
    };

    return (
        <>
         { playerCritical ? 
            <div className="player pulse" style={critStyle} id={ spectator ? 'player-animation-spec' : 'player-animation'}>
                {playerAction.charAt(0).toUpperCase() + playerAction.slice(1)}
                <br />
                { playerDamageTotal > 0 ? '-' + Math.round(playerDamageTotal) + (visibility ? `\n[You]` : '') : ''}
            </div>
        : rollSuccess || counterSuccess ?
            <div className="player pulse" style={rollStyle} id={ spectator ? 'player-animation-spec' : 'player-animation'}>
                {playerAction.charAt(0).toUpperCase() + playerAction.slice(1)}
                <br />
                { playerDamageTotal > 0 ?  '-' + Math.round(playerDamageTotal) + (visibility ? `\n[You]` : '') : ''}
            </div>
        :
            <div className="player pulse" id={ spectator ? 'player-animation-spec' : 'player-animation'}>
                {playerAction.charAt(0).toUpperCase() + playerAction.slice(1)}
            <br />
                {playerDamageTotal > 0 ? '-' + Math.round(playerDamageTotal) + (visibility ? `\n[You]` : '') : ''}
            </div>
        }
        <br />
        { computerCritical ?
            <div className="computer hidden" style={critStyle} id={spectator ? 'computer-animation-spec' : 'computer-animation'}>
                {computerAction.charAt(0).toUpperCase() + computerAction.slice(1)}
                <br />
                { computerDamageTotal > 0 ? '-' + Math.round(computerDamageTotal) + (visibility ? `\n[Enemy]` : '') : ''}
            </div>
        : computerRollSuccess || computerCounterSuccess ?
            <div className="computer hidden" style={rollStyle} id={spectator ? 'computer-animation-spec' : 'computer-animation'}>
                {computerAction.charAt(0).toUpperCase() + computerAction.slice(1)}
                <br />
                { computerDamageTotal > 0 ? '-' + Math.round(computerDamageTotal) + (visibility ? `\n[Enemy]` : '') : ''}
            </div> 
        :
            <div className="computer hidden" id={spectator ? 'computer-animation-spec' : 'computer-animation'}>
                {computerAction.charAt(0).toUpperCase() + computerAction.slice(1)}
                <br />
                {computerDamageTotal > 0 ? '-' + Math.round(computerDamageTotal) + (visibility ? `\n[Enemy]` : '') : ''}
            </div>
        }
        </>
    );
};

export default GameAnimations;