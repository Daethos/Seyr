import { useState, useEffect, useRef, Suspense } from 'react';
import Button from 'react-bootstrap/Button';
import Inventory from '../components/GameCompiler/Inventory';
import LootDrop from '../components/GameCompiler/LootDrop';
import MerchantLoot from '../components/GameCompiler/MerchantLoot';
import MerchantTable from '../components/GameCompiler/MerchantTable';
import Loading from '../components/Loading/Loading';
import * as eqpAPI from '../utils/equipmentApi';
// const MerchantLoot = lazy(() => import('../components/GameCompiler/MerchantLoot'));


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
    enemy: any;
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


const DialogBox = ({ ascean, enemy, npc, dialog, setCombatEngaged, getOpponent, setGameIsLive, playerWin, computerWin, resetAscean, winStreak, loseStreak, highScore, lootDrop, setLootDrop, lootDropTwo, setLootDropTwo, itemSaved, setItemSaved }: Props) => {
    const [currentIntent, setCurrentIntent] = useState<any | null>('challenge');
    const [combatAction, setCombatAction] = useState<any | null>('actions');
    const [merchantEquipment, setMerchantEquipment] = useState<any>([]);
    const [loading, setLoading] = useState(false);
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
            setLoading(true);
            const response = await eqpAPI.getMerchantEquipment(enemy.level);
            console.log(response.data, 'Response!');
            setMerchantEquipment(response.data);
            setItemSaved(false);
            setLoading(false);
        } catch (err) {
            console.log(err, 'Error!')
        }
    }

    useEffect(() => {
        if (merchantEquipment.length === 0) return;
        console.log(merchantEquipment, 'merchantEquipment variable in DialogBox.tsx');
    }, [merchantEquipment])
    

    useEffect(() => {
        console.log(currentIntent);
    }, [currentIntent]);

    //TODO:FIXME: Note to self, make a Trader or Services type player, and create new dialog type, not Opponent, but the aforementioned name. With different options, some quests, with services, can trade or create items for the player.

    if (loading) {
        return (
            <Loading Combat={true} />
        )
    }
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
                        <Button variant='' style={{ color: 'green', fontVariant: 'small-caps' }} onClick={getLoot}>Merchant Trader Equipment</Button>
                        <br />
                        {
                            merchantEquipment?.length > 0 ?
                            <MerchantTable table={merchantEquipment} ascean={ascean} itemPurchased={itemSaved} setItemPurchased={setItemSaved} />
                            
                            : ''
                        }
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

// function lazy(arg0: () => Promise<typeof import("../components/GameCompiler/MerchantLoot")>) {
//     throw new Error('Function not implemented.');
// }
