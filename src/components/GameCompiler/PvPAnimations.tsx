import './GameCompiler.css';

interface Props {
    playerAction: string;
    computerAction: string;
    playerDamageTotal: number;
    computerDamageTotal: number;
    playerCritical: boolean;
    computerCritical: boolean;
    roll_success: boolean;
    computer_roll_success: boolean;
    counterSuccess: boolean;
    computerCounterSuccess: boolean;
};

const PVPAnimations = ({ roll_success, computer_roll_success, counterSuccess, computerCounterSuccess, playerAction, computerAction, playerDamageTotal, computerDamageTotal, playerCritical, computerCritical }: Props) => {
    const critStyle = { backgroundColor: 'red', fontSize: 32 + 'px', };
    const rollStyle = { backgroundColor: 'green', fontSize: 28 + 'px', };

    return (
        <>
        { computerCritical ? (
            <div className="computer hidden" style={critStyle} >
                {computerAction.charAt(0).toUpperCase() + computerAction.slice(1)}
                <br />
                {computerDamageTotal > 0 ? ( '-' + Math.round(computerDamageTotal) ) : ( '' ) }
            </div>
        ) : computer_roll_success || computerCounterSuccess ? (
            <div className="computer hidden" style={rollStyle} >
                {computerAction.charAt(0).toUpperCase() + computerAction.slice(1)}
                <br />
                {computerDamageTotal > 0 ? ( '-' + Math.round(computerDamageTotal) ) : ( '' ) }
            </div> 
        ) : ( 
            <div className="computer hidden" >
                {computerAction.charAt(0).toUpperCase() + computerAction.slice(1)}
                <br />
                {computerDamageTotal > 0 ? ( '-' + Math.round(computerDamageTotal) ) : ( '' ) }
            </div>
        ) }
        
        <br />
        
        { playerCritical ? (
            <div className="player pulse" style={critStyle}>
                {playerAction.charAt(0).toUpperCase() + playerAction.slice(1)}
                <br />
                {playerDamageTotal > 0 ? '-' + Math.round(playerDamageTotal) : ''}
            </div>
        ) : roll_success || counterSuccess ? (
            <div className="player pulse" style={rollStyle}>
                {playerAction.charAt(0).toUpperCase() + playerAction.slice(1)}
                <br />
                {playerDamageTotal > 0 ? '-' + Math.round(playerDamageTotal) : ''}
            </div>
        ) : (
            <div className="player pulse">
                {playerAction.charAt(0).toUpperCase() + playerAction.slice(1)}
                <br />
                {playerDamageTotal > 0 ? '-' + Math.round(playerDamageTotal) : ''}
            </div>
        ) }
        </>
    );
};

export default PVPAnimations;