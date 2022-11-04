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
}

const GameCombatText = ({ user, ascean, playerActionText, computerActionText, playerSpecialText, computerSpecialText, playerAction, computerAction, playerCombatText, computerCombatText, combatData }: Props) => {
    console.log(playerCombatText, computerCombatText);
    
    const [combatText, setCombatText] = useState<any>({
        playerActionText, computerActionText, playerSpecialText, computerSpecialText, playerCombatText, computerCombatText
    })
    let textBoxArea = document.querySelector('.text-box');
    const textBox = document.getElementById('console') as HTMLInputElement;
    const actionOrder: { [key: string]: any } = {
        attack: 1,
        counter: 5,
        dodge: 4,
        posture: 2,
        roll: 3
    }
    let areaText = textBox?.value;
    let startScroll: any;
    let stopScroll: any;
    function textBoxScroll() {
        if (!startScroll) {
        startScroll = setInterval(textScroll, 2000);
        return
        }
    }

    function textScroll() {
        areaText += Math.random() + '\n';
        textBox!.scrollTop = textBox!.scrollHeight;
        return
    }

    function stopTextScroll() {
        clearInterval(startScroll);
        startScroll = null;
        return
    }

    useEffect(() => {
        updateCombatText();
        // textBoxScroll();
    }, [playerCombatText, computerCombatText])

    // useEffect(() => {
    //     chatInterval()
    // }, [combatText])

    const updateCombatText = async () => {
        console.log(actionOrder[playerAction], actionOrder[computerAction]);
        const playerOrder: number = actionOrder[playerAction];
        const computerOrder: number = actionOrder[computerAction];
        setCombatText({
            playerActionText, computerActionText, playerSpecialText, computerSpecialText, playerCombatText, computerCombatText
        })
        // if (playerOrder > computerOrder) {
        //     setCombatText({
        //         playerCombatText, computerCombatText
        //     })
        // } else if (playerOrder === computerOrder) {
        //     if (combatData.player_attributes.initiative > combatData.computer_attributes.initiative) {
        //         setCombatText({
        //             playerCombatText,
        //             computerCombatText,
        //             ...combatText
        //         })
        //     }
        // } else {
        //     setCombatText({
        //         computerCombatText,
        //         playerCombatText,
        //         ...combatText
        //     })
        // }
    }

    const chatInterval = async () => { setInterval(chatTestTwo, 5000) }
    
    const chatTestTwo = async () => { setCombatText([`Welcome ${user?.username}, `  + `${ascean?.name}\n`, ...combatText]) }
    
    function sleep(ms: number) {
        return new Promise(
            resolve => setTimeout(resolve, ms)
        )
    }

  return (
    <div id="textarea">
        <textarea 
            className="text-box" id="console" 
            value={
                playerActionText + `\n` + computerActionText + `\n` +
                    // playerSpecialText ? playerSpecialText : ''  + 
                    // computerSpecialText ? computerSpecialText + `\n` : '' + 
                playerCombatText + `\n` +  computerCombatText
            } 
            readOnly>
        </textarea>
    </div>
  )
}

export default GameCombatText