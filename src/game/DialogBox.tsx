import { useState, useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Inventory from '../components/GameCompiler/Inventory';
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
    lootDropTwo: any;
    setLootDropTwo: React.Dispatch<React.SetStateAction<any>>;
    itemSaved: boolean;
    setItemSaved: React.Dispatch<React.SetStateAction<boolean>>;
}


const DialogBox = ({ ascean, npc, dialog, setCombatEngaged, getOpponent, setGameIsLive, playerWin, computerWin, resetAscean, winStreak, loseStreak, highScore, lootDrop, setLootDrop, lootDropTwo, setLootDropTwo, itemSaved, setItemSaved }: Props) => {
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
            const response = await eqpAPI.getLootDrop(4);
            console.log(response.data[0], 'Response!');
            setLootDrop(response.data[0]);

            let roll = Math.floor(Math.random() * 100) + 1;
            if (roll <= 25) {
                const responseTwo = await eqpAPI.getLootDrop(20);
                console.log(responseTwo.data[0], 'Response Two!');
                setLootDropTwo(responseTwo.data[0]);
            } else {
                setLootDropTwo(null);
            }

            
            setItemSaved(false);
            setItemSaved(false);
        } catch (err) {
            console.log(err, 'Error!')
        }
    }



    useEffect(() => {
        console.log(currentIntent);
    }, [currentIntent]);

    //TODO:FIXME: Note to self, make a Trader or Services type player, and create new dialog type, not Opponent, but the aforementioned name. With different options, some quests, with services, can trade or create items for the player.

    
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
                        <p style={{ color: 'orangered' }}>
                        You Win. Hot Streak: {winStreak} Hi-Score ({highScore})<br /> 
                        </p>
                        "Well check you out, {ascean.name}, you've won the duel. Congratulations" <br /> <br /> 
                        {/* <Button variant ='' style={{ color: 'blue', fontVariant: 'small-caps' }} onClick={getLoot}>Get Loot</Button> */}

                        {
                            lootDrop?._id && lootDropTwo?._id ?
                            <>
                            <LootDrop lootDrop={lootDrop} setLootDrop={setLootDrop} ascean={ascean} itemSaved={itemSaved} setItemSaved={setItemSaved} />
                            <LootDrop lootDrop={lootDropTwo} setLootDrop={setLootDropTwo} ascean={ascean} itemSaved={itemSaved} setItemSaved={setItemSaved} />
                            </>
                            : lootDrop?._id ?
                            <LootDrop lootDrop={lootDrop} setLootDrop={setLootDrop} ascean={ascean} itemSaved={itemSaved} setItemSaved={setItemSaved} />
                            : lootDropTwo?._id ?
                            <LootDrop lootDrop={lootDropTwo} setLootDrop={setLootDropTwo} ascean={ascean} itemSaved={itemSaved} setItemSaved={setItemSaved} />
                            : ''
                        }
                        <Button variant='' style={{ color: 'green', fontVariant: 'small-caps' }} onClick={resetAscean}>Refresh Your Duel With {npc}.</Button>
                        </> 
                        : computerWin 
                        ? <>
                        <p style = {{ color: 'dodgerblue' }}>
                        You Lose. Cold Streak: {loseStreak} Hi-Score ({highScore})<br /> 
                        </p>
                        "Well now, {ascean.name}, can't say no one expected this, did we? Tell you what, we can keep at this till you bear luck's fortune."
                        <Button variant='' style={{ color: 'red', fontVariant: 'small-caps' }} onClick={resetAscean}>Reduel {npc} To Win Back Your Honor?</Button>
                        </> 
                        :
                        <>
                        "Oh is that why you're here, goodness. Very well, {ascean.name}. Shall we?"<br />
                        <Button variant='' style={{ color: 'yellow', fontVariant: 'small-caps' }} onClick={engageCombat}>Commence Duel with {npc}?</Button>
                        {/* <Button variant ='' style={{ color: 'blue', fontVariant: 'small-caps' }} onClick={getLoot}>Get Loot</Button>

                        {
                            lootDrop?._id && lootDropTwo?._id ?
                            <>
                            <LootDrop lootDrop={lootDrop} setLootDrop={setLootDrop} ascean={ascean} itemSaved={itemSaved} setItemSaved={setItemSaved} />
                            <LootDrop lootDrop={lootDropTwo} setLootDrop={setLootDropTwo} ascean={ascean} itemSaved={itemSaved} setItemSaved={setItemSaved} />
                            </>
                            : lootDrop?._id ?
                            <LootDrop lootDrop={lootDrop} setLootDrop={setLootDrop} ascean={ascean} itemSaved={itemSaved} setItemSaved={setItemSaved} />
                            : lootDropTwo?._id ?
                            <LootDrop lootDrop={lootDropTwo} setLootDrop={setLootDropTwo} ascean={ascean} itemSaved={itemSaved} setItemSaved={setItemSaved} />
                            : ''
                        } */}
                        {/* {
                        lootDrop?.name !== '' ?  
                        <LootDrop lootDrop={lootDrop} setLootDrop={setLootDrop} ascean={ascean} itemSaved={itemSaved} setItemSaved={setItemSaved}  />
                        : ''} */}
                        </> 
                    : currentIntent === 'conditions' ?
                    <>
                        Conditions
                        <br />


                    </>
                    : currentIntent === 'farewell' ?
                    <>
                        <br />
                        {
                            playerWin ?
                            <>
                            "Perhaps it's for the best. May you seek a worthy opponent, {ascean.name}."<br />
                            <Button variant='' style={{ color: 'green', fontVariant: 'small-caps' }} onClick={getOpponent}>Seek A New Potential Duelist For More Experience</Button>
                            </>
                            : computerWin ?
                            <>
                            "Take care {ascean.name}, and seek aid. You do not look well."<br />
                            <Button variant='' style={{ color: 'teal', fontVariant: 'small-caps' }} onClick={getOpponent}>Meh, Another Day, New Duelist.</Button>
                            </>
                            : 
                            <>
                            "Perhaps we'll meet again, {ascean.name}."<br />
                        <Button variant='' style={{ color: 'yellow', fontVariant: 'small-caps' }} onClick={getOpponent}>Seek A New Duelist Instead</Button>
                            </>
                        }
                    </>
                    : currentIntent === 'localLore' ?

                    <>
                        Local Lore
                    </>
                    : currentIntent === 'localWhispers' ?
                    <>
                        Local Whispers
                    </>
                    : currentIntent === 'persuasion' ?
                    <>
                        Persuasion
                    </>
                    : currentIntent === 'services' ?
                    <>
                        Services
                    </>
                    : currentIntent === 'provincialWhispers' ?
                    <>
                        Provincial Whispers
                    </>
                    : currentIntent === 'worldLore' ?
                    <>
                        World Lore
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