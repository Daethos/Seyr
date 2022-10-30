import { useEffect, useState, useCallback } from 'react'

interface Props {
    user: any;
    ascean: any;
}

const GameCombatText = ({ user, ascean }: Props) => {
    const [combatText, setCombatText] = useState<any>([])
    let textBoxArea = document.querySelector('.text-box');
    const textBox = document.getElementById('console') as HTMLInputElement;

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

    // useEffect(() => {
    //     textBoxScroll();
    // }, [])

    // useEffect(() => {
    //     chatInterval()
    // }, [combatText])

    const chatInterval = async () => { setInterval(chatTestTwo, 5000) }
    
    const chatTestTwo = async () => { setCombatText([`Welcome ${user?.username}, `  + `${ascean?.name}\n`, ...combatText]) }
    
    function sleep(ms: number) {
        return new Promise(
            resolve => setTimeout(resolve, ms)
        )
    }

  return (
    <>
        <textarea className="text-box" id="console" value={combatText} readOnly></textarea>
    </>
  )
}

export default GameCombatText