import { useState, useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import LootDrop from '../components/GameCompiler/LootDrop';
import * as eqpAPI from '../utils/equipmentApi';

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
            <Button variant='' key={i} onClick={() => setIntent(o)} style={{ color: 'green', fontVariant: 'small-caps', fontWeight: 550, fontSize: 9 + 'px' }}>{o}</Button>
        )
    });
    return <>{buttons}</>;
};
  
const CombatDialogButtons = ({ options, handleCombatAction }: { options: any, handleCombatAction: any }) => {
    console.log(options, 'o');
    const buttons = Object.keys(options).map((o: any, i: number) => {
        return (
            <Button variant='' key={i} onClick={() => handleCombatAction('actions', o)} style={{ color: 'green', fontVariant: 'small-caps', fontWeight: 550, fontSize: 9 + 'px' }}>{o}</Button>
        )
    });
    return <>{buttons}</>;
}

interface Props {
    ascean: any;
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
    lootDrop: any;
    setLootDrop: React.Dispatch<React.SetStateAction<any>>;
    itemSaved: boolean;
    setItemSaved: React.Dispatch<React.SetStateAction<boolean>>;
}


const DialogBox = ({ ascean, npc, dialog, setCombatEngaged, getOpponent, setGameIsLive, playerWin, computerWin, resetAscean, winStreak, loseStreak, highScore, lootDrop, setLootDrop, itemSaved, setItemSaved }: Props) => {
    const [currentIntent, setCurrentIntent] = useState<any | null>('challenge');
    const [combatAction, setCombatAction] = useState<any | null>('actions');
    const handleCombatAction = (options: any, action: string) => {
        console.log(options, action, 'Action')
        setCombatAction(action);
    }
    const handleIntent = (intent: string) => {
        setCurrentIntent(intent);
    };
    const engageCombat = () => {
        setCombatEngaged(true);
        setGameIsLive(true);
    }
    const getLoot = async () => {
        try {
            const response = await eqpAPI.getLootDrop(2);
            console.log(response.data[0], 'Response!');
            setLootDrop(response.data[0]);
            setItemSaved(false);
        } catch (err) {
            console.log(err, 'Error!')
        }
    }

    useEffect(() => {
        console.log(currentIntent);
    }, [currentIntent]);

    
    return (
        <div className='dialog-box'>
            <div className='dialog-text'>
                {
                    currentIntent === 'combat' ?
                    <>
                        Combat
                        <>
                        <div style={{ fontSize: '12px', whiteSpace: 'pre-wrap' }}>
                        {dialog[currentIntent][combatAction]}
                        </div>
                        <CombatDialogButtons options={dialog[currentIntent]} handleCombatAction={handleCombatAction}  />
                        </>
                    </>
                    : currentIntent === 'challenge' ?
                        playerWin 
                        ? <>
                        You Win. Hot Streak: {winStreak} Hi-Score ({highScore})<br /> 
                        {
                        lootDrop?._id ?  
                        <LootDrop lootDrop={lootDrop} setLootDrop={setLootDrop} ascean={ascean} itemSaved={itemSaved} setItemSaved={setItemSaved} />
                        : ''
                        }
                        <Button variant='' style={{ color: 'green', fontVariant: 'small-caps' }} onClick={resetAscean}>Refresh Duel With {npc}</Button>
                        <Button variant='' style={{ color: 'green', fontVariant: 'small-caps' }} onClick={getOpponent}>Seek New Duelist For More Experience</Button>
                        </> 
                        : computerWin 
                        ? <>
                        You Lose. Cold Streak: {loseStreak} Hi-Score ({highScore})<br /> 
                        <Button variant='' style={{ color: 'red', fontVariant: 'small-caps' }} onClick={resetAscean}>Reduel {npc} To Win Back Your Honor?</Button>
                        <Button variant='' style={{ color: 'teal', fontVariant: 'small-caps' }} onClick={getOpponent}>Another Day, New Duelist.</Button>
                        </> 
                        :
                        <>
                        <Button variant='' style={{ color: 'yellow', fontVariant: 'small-caps' }} onClick={engageCombat}>Duel {npc}?</Button>
                        <Button variant='' style={{ color: 'yellow', fontVariant: 'small-caps' }} onClick={getOpponent}>Seek New Duelist</Button>
                        {/* <Button variant ='' style={{ color: 'blue', fontVariant: 'small-caps' }} onClick={getLoot}>Get Loot</Button> */}
                        {
                            lootDrop?._id ?
                            <LootDrop lootDrop={lootDrop} setLootDrop={setLootDrop} ascean={ascean} itemSaved={itemSaved} setItemSaved={setItemSaved} />
                            : ''
                        }
                        {/* {
                        lootDrop?.name !== '' ?  
                        <LootDrop lootDrop={lootDrop} ascean={ascean} />
                        : ''} */}
                        </> 
                    : currentIntent === 'conditions' ?
                    <>
                        Conditions
                    </>
                    : ''
                }
            </div>
            <div className='dialog-options'>
                <DialogButtons options={dialog} setIntent={handleIntent} />
            </div>
        </div>
    );
}

export default DialogBox;