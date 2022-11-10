import { useEffect, useState, useCallback } from 'react'

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
    emergencyText: any[] | (() => any[]);
}

const GameCombatText = ({ user, ascean, emergencyText, playerActionText, computerActionText, playerSpecialText, computerSpecialText, playerAction, computerAction, playerCombatText, computerCombatText, combatData }: Props) => {
    
    const [combatText, setCombatText] = useState<any>({})
    let textBoxArea = document.querySelector('.text-box');
    const textBox = document.getElementById('console') as HTMLInputElement;
    const actionOrder: { [key: string]: any } = {
        attack: 1,
        counter: 5,
        dodge: 4,
        posture: 2,
        roll: 3
    }

  return (
    <div id="textarea">
        <textarea 
            className="text-box" id="console" 
            value={
                playerActionText + `\n` + computerActionText + `\n` +
                playerSpecialText + `\n` + computerSpecialText + `\n` +
                    // playerSpecialText ? playerSpecialText : ''  + 
                    // computerSpecialText ? computerSpecialText + `\n` : '' + 
                playerCombatText + `\n` +  computerCombatText + `\n` +
                emergencyText
            } 
            readOnly>
        </textarea>
    </div>
  )
}

export default GameCombatText