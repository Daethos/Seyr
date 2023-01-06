import { useState, useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';

enum Intent {
    GREETING = "greeting",
    CHALLENGE = "challenge",
    DEFEAT = "defeat",
    FAREWELL = "farewell",
    VICTORY = "victory",
    TAUNT = "taunt",
    PRAISE = "praise",
    LOCAL_LORE = "localLore",
    LOCAL_WHISPERS = "localWhispers",
    PERSUASION_REQUEST = "persuasionRequest",
    PERSUASION_OFFER = "persuasionOffer",
    PERSUASION_ACCEPTANCE = "persuasionAcceptance",
    PERSUASION_REJECTION = "persuasionRejection",
}

const DialogButtons = ({ options, setIntent }: { options: any, setIntent: any }) => {
    const filteredOptions = Object.keys(options).filter((option: any) => option !== 'defeat' && option !== 'victory' && option !== 'taunt' && option !== 'praise' && option !== 'greeting');
    const buttons = filteredOptions.map((o: any, i: number) => {
        return (
            <Button variant='' key={i} onClick={() => setIntent(o)} style={{ color: 'green', fontVariant: 'small-caps', fontWeight: 550, fontSize: 8 + 'px' }}>{o}</Button>
        )
    });
    return <>{buttons}</>;
  };
  
  

interface Props {
    npc: any;
    dialog: [];
    setCombatEngaged: React.Dispatch<React.SetStateAction<boolean>>;
    getOpponent: () => Promise<void>;
    setGameIsLive: React.Dispatch<React.SetStateAction<boolean>>;
    playerWin: boolean;
    computerWin: boolean;
    resetAscean: () => Promise<void>;
    winStreak: number;
    loseStreak: number;
    highScore: number;
}


const DialogBox = ({ npc, dialog, setCombatEngaged, getOpponent, setGameIsLive, playerWin, computerWin, resetAscean, winStreak, loseStreak, highScore }: Props) => {
    const [currentIntent, setCurrentIntent] = useState<any | null>(null)
    const handleIntent = (intent: string) => {
        setCurrentIntent(intent);
    };
    const engageCombat = () => {
        setCombatEngaged(true);
        setGameIsLive(true);
    }

    useEffect(() => {
        console.log(currentIntent);
    }, [currentIntent]);

    
    return (
        <div className='dialog-box'>
            <div className='dialog-text'>
                <br /><br /><br />
            {
                playerWin 
                ? <>
                You Win. Hot Streak: {winStreak} Hi-Score ({highScore})<br /> 
                <Button variant='' style={{ color: 'green', fontVariant: 'small-caps' }} onClick={resetAscean}>Refresh Duel With {npc}</Button>
                <Button variant='' style={{ color: 'green', fontVariant: 'small-caps' }} onClick={getOpponent}>Seek New Duelist For More Experience</Button>
                </> 
                : computerWin 
                ? <>
                You Lose. Cold Streak: {loseStreak} Hi-Score ({highScore})<br /> 
                <Button variant='' style={{ color: 'red', fontVariant: 'small-caps' }} onClick={resetAscean}>Reduel {npc} To Win Back Your Honor?</Button>
                <Button variant='' style={{ color: 'red', fontVariant: 'small-caps' }} onClick={getOpponent}>Another Day, New Duelist.</Button>
                </> 
                :
                <>
                <Button variant='' style={{ color: 'yellow', fontVariant: 'small-caps' }} onClick={engageCombat}>Duel {npc}?</Button>
                <Button variant='' style={{ color: 'yellow', fontVariant: 'small-caps' }} onClick={getOpponent}>Seek New Duelist</Button>
                </> 
            }
            </div>
            <div className='dialog-options'>
                <DialogButtons options={dialog} setIntent={handleIntent} />
            </div>
        </div>
    );
}

export default DialogBox;