interface Props {
    user: any;
    ascean: any;
    playerCombatText: string;
    computerCombatText: string;
    playerActionText: string;
    computerActionText: string;
    playerAction: any;
    computerAction: any;
    combatData: any;
    playerSpecialText: string;
    computerSpecialText: string;
    playerReligiousText: string;
    computerReligiousText: string;
    playerReligiousTextTwo: string;
    computerReligiousTextTwo: string;
    playerDeathText: string;
    computerDeathText: string;
    emergencyText: any[] | (() => any[]);
};

const PvPCombatText = ({ user, ascean, emergencyText, playerDeathText, computerDeathText, playerReligiousText, computerReligiousText, playerReligiousTextTwo, computerReligiousTextTwo, playerActionText, computerActionText, playerSpecialText, computerSpecialText, playerAction, computerAction, playerCombatText, computerCombatText, combatData }: Props) => {
    
    return (
        <div id="textarea">
            <textarea 
                className="text-box" id="console" 
                value={
                    emergencyText + `\n` +
                    playerActionText + `\n` + 
                    computerActionText + `\n` +
                    playerSpecialText + `\n` + 
                    computerSpecialText + `\n` +
                    playerCombatText + `\n` +  
                    computerCombatText + `\n` +
                    playerReligiousText + `\n` + 
                    playerReligiousTextTwo + `\n` +
                    computerReligiousText + `\n` + 
                    computerReligiousTextTwo + `\n` +
                    playerDeathText + `\n` +  
                    computerDeathText + `\n` +
                    emergencyText
                } 
                readOnly>
            </textarea>
        </div>
    );
};

export default PvPCombatText;