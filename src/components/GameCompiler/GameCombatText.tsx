interface Props {
    playerCombatText: string;
    computerCombatText: string;
    playerActionText: string;
    computerActionText: string;
    playerSpecialText: string;
    computerSpecialText: string;
    playerReligiousText: string;
    computerReligiousText: string;
    playerReligiousTextTwo: string;
    computerReligiousTextTwo: string;
    playerDeathText: string;
    computerDeathText: string;
    emergencyText: any[] | (() => any[]);
}

const GameCombatText = ({ emergencyText, playerDeathText, computerDeathText, playerReligiousText, computerReligiousText, playerReligiousTextTwo, computerReligiousTextTwo, playerActionText, computerActionText, playerSpecialText, computerSpecialText, playerCombatText, computerCombatText }: Props) => {
    
    return (
        <div id="textarea">
            <textarea 
                className="text-box" id="console" 
                value={
                    emergencyText + `\n` +
                    playerActionText + `\n` + computerActionText + `\n` +
                    playerSpecialText + `\n` + computerSpecialText + `\n` +
                    playerCombatText + `\n` +  computerCombatText + `\n` +
                    playerReligiousText + `\n` + playerReligiousTextTwo + `\n` +
                    computerReligiousText + `\n` + computerReligiousTextTwo + `\n` +
                    playerDeathText + `\n` +  computerDeathText + `\n` +
                    emergencyText
                } 
                readOnly>
            </textarea>
        </div>
    )
}

export default GameCombatText