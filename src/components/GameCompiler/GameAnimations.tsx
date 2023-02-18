import './GameCompiler.css';

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
};

const GameAnimations = ({ combatEngaged, combatRound, rollSuccess, computerRollSuccess, counterSuccess, computerCounterSuccess, playerAction, computerAction, playerDamageTotal, computerDamageTotal, playerCritical, computerCritical }: Props) => {
    const critStyle = {
        color: 'red',
        fontSize: 32 + 'px',
    };

    const rollStyle = {
        color: 'green',
        fontSize: 32 + 'px',
    };

    return (
        <>
         { playerCritical ? 
            <div className="player pulse" style={critStyle} id='player-animation'>
                {combatEngaged ? playerAction.charAt(0).toUpperCase() + playerAction.slice(1) : ''}
                <br />
                {combatEngaged && playerDamageTotal > 0 ? '-' + Math.round(playerDamageTotal) + `\n[You]` : ''}
            </div>
        : rollSuccess || counterSuccess ?
            <div className="player pulse" style={rollStyle} id='player-animation'>
                {combatEngaged ? playerAction.charAt(0).toUpperCase() + playerAction.slice(1) : ''}
                <br />
                {combatEngaged && playerDamageTotal > 0 ?  '-' + Math.round(playerDamageTotal) + `\n[You]` : ''}
            </div>
        :
            <div className="player pulse" id='player-animation'>
                {combatEngaged ? playerAction.charAt(0).toUpperCase() + playerAction.slice(1) : ''}
            <br />
                {combatEngaged ? combatRound === 1 ? '' : playerDamageTotal > 0 ? '-' + Math.round(playerDamageTotal) + `\n[You]` : '(Failure)\n[You]' : ''}
            </div>
        }
        <br />
        { computerCritical ?
            <div className="computer hidden" style={critStyle} id='computer-animation'>
                {combatEngaged ? computerAction.charAt(0).toUpperCase() + computerAction.slice(1) : ''}
                <br />
                {combatEngaged && computerDamageTotal > 0 ? combatRound === 1 ? '' : '-' + Math.round(computerDamageTotal) + `\n[Enemy]` : ''}
            </div>
        : computerRollSuccess || computerCounterSuccess ?
            <div className="computer hidden" style={rollStyle} id='computer-animation'>
                {combatEngaged ? computerAction.charAt(0).toUpperCase() + computerAction.slice(1) : ''}
                <br />
                {combatEngaged && computerDamageTotal > 0 ? '-' + Math.round(computerDamageTotal) + `\n[Enemy]` : ''}
            </div> 
        :
            <div className="computer hidden" id='computer-animation'>
                {combatEngaged ? computerAction.charAt(0).toUpperCase() + computerAction.slice(1) : ''}
                <br />
                {combatEngaged ? combatRound === 1 ? '' : computerDamageTotal > 0 ? '-' + Math.round(computerDamageTotal) + `\n[Enemy]` : '(Failure)\n[Enemy]' : ''}
            </div>
        }
        </>
    );
};

export default GameAnimations;