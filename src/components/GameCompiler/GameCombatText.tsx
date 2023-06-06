import { useEffect, useState } from "react";

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
    story?: boolean;
};

const GameCombatText = ({ story, spectator, emergencyText, combatRoundText, playerDeathText, computerDeathText, playerReligiousText, computerReligiousText, playerReligiousTextTwo, computerReligiousTextTwo, playerActionText, computerActionText, playerSpecialText, computerSpecialText, playerCombatText, computerCombatText }: Props) => {
    const [combatText, setCombatText] = useState<any>('');
    const [combatRound, setCombatRound] = useState<number>(0);
    // useEffect(() => {
    //     if (Number(combatRoundText) > combatRound) {
    //         text();
    //     };
    // }, [combatRoundText, combatRound]);
 
    const storyStyle = {
        height: "80px",
        width: "450px",  
        fontSize: "12px",
        borderRadius: "3px",
        border: "2px solid purple"
    };

    const text = () => {
        let result = "";
        if (emergencyText && !story) result += emergencyText + "\n";
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
        // setCombatText((prevText: any) => prevText + result + "\n");
        // setCombatRound(Number(combatRoundText));
        return result;
    };
    return (
        <div id={spectator ? 'spectator-textarea' : story ? "" : "textarea"}>
            <textarea 
                style={story ? storyStyle : {}}
                className={story ? "" : "text-box"} id="console" 
                value={text()}
                readOnly>
            </textarea>
        </div>
    );
};

export default GameCombatText;