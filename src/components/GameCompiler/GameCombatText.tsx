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
    combatRoundText: string | number;
    spectator?: boolean;
};

const GameCombatText = ({ spectator, emergencyText, combatRoundText, playerDeathText, computerDeathText, playerReligiousText, computerReligiousText, playerReligiousTextTwo, computerReligiousTextTwo, playerActionText, computerActionText, playerSpecialText, computerSpecialText, playerCombatText, computerCombatText }: Props) => {
    const text = () => {
        let result = "";
        if (emergencyText) result += emergencyText + "\n";
        if (playerActionText) result += playerActionText + "\n";
        if (computerActionText) result += computerActionText + "\n";
        if (playerSpecialText) result += playerSpecialText + "\n";
        if (computerSpecialText) result += computerSpecialText + "\n";
        if (playerCombatText) result += playerCombatText + "\n";
        if (computerCombatText) result += computerCombatText + "\n";
        if (playerReligiousText) result += playerReligiousText + "\n";
        if (playerReligiousTextTwo) result += playerReligiousTextTwo + "\n";
        if (computerReligiousText) result += computerReligiousText + "\n";
        if (computerReligiousTextTwo) result += computerReligiousTextTwo + "\n";
        if (playerDeathText) result += playerDeathText + "\n";
        if (computerDeathText) result += computerDeathText + "\n";
        if (combatRoundText) result += `Combat Round: ${combatRoundText} \n`;
        return result;
    };
    return (
        <div id={spectator ? 'spectator-textarea' : "textarea"}>
            <textarea 
                className="text-box" id="console" 
                value={text()}
                readOnly>
            </textarea>
        </div>
    );
};

export default GameCombatText;