import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import LootDrop from '../components/GameCompiler/LootDrop';
import MerchantTable from '../components/GameCompiler/MerchantTable';
import Loading from '../components/Loading/Loading';
import * as eqpAPI from '../utils/equipmentApi';
import { ACTIONS } from '../components/GameCompiler/CombatStore';
import ToastAlert from '../components/ToastAlert/ToastAlert';


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
    const buttons = Object.keys(options).map((o: any, i: number) => {
        return (
            <Button variant='' key={i} onClick={() => handleCombatAction('actions', o)} style={{ color: 'green', fontVariant: 'small-caps', fontWeight: 550, fontSize: 9 + 'px' }}>{o}</Button>
        )
    });
    return <>{buttons}</>;
}

const ProvincialWhispersButtons = ({ options, handleRegion }: { options: any, handleRegion: any }) => {
    console.log(options, 'The Options');
    const buttons = Object.keys(options).map((o: any, i: number) => {
        console.log(o, 'Options in ProvincialWhispersButtons');
        return (
            <Button variant='' key={i} onClick={() => handleRegion(o)} style={{ color: 'green', fontVariant: 'small-caps', fontWeight: 550, fontSize: 9 + 'px' }}>{o}</Button>
        )
    });
    return <>{buttons}</>;
}

interface Props {
    ascean: any;
    enemy: any;
    npc: any;
    dialog: [];
    getOpponent: () => Promise<void>;
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
    dispatch: any;
    state: any;
    checkLoot: boolean;
    setCheckLoot: React.Dispatch<React.SetStateAction<boolean>>;
    deleteEquipment: (eqp: any) => Promise<void>;
    merchantEquipment: any;
    setMerchantEquipment: React.Dispatch<React.SetStateAction<any>>;
}

interface Region { 
    Astralands: string;
    Kingdom: string;
    Soverains: string;
    Fangs: string;
    Licivitas: string;
    Firelands: string;
    Sedyrus: string;
    Isles: string; 
};


const DialogBox = ({ state, dispatch, ascean, enemy, npc, dialog, checkLoot, setCheckLoot, merchantEquipment, setMerchantEquipment, deleteEquipment, getOpponent, playerWin, computerWin, resetAscean, winStreak, loseStreak, highScore, lootDrop, setLootDrop, lootDropTwo, setLootDropTwo, itemSaved, setItemSaved }: Props) => {
    const [currentIntent, setCurrentIntent] = useState<any | null>('challenge');
    const [combatAction, setCombatAction] = useState<any | null>('actions');
    const regionInformation = {
        Astralands: "Good one, those Ashtre have quite the mouth on them I hear yet never heard. Perhaps you'll be able to catch their whispers.", 
        Kingdom: "The King, Mathyus Caderyn II, has been away from his court as of late, his son Dorien sitting the throne--though constant feathers aid his communication when abroad. Despite its unification, groans have increased with disparate and slow recovery from the century long war only having quelled for 7 years prior, with select places receiving abundance of aid over others, the discernment itself seeming weighed in favor of longstanding allies. As the King reaches further East to establish peaceable connections with the Soverains, it leads one to speculate on the disposition of those houses already under his kingship.", 
        Soverains: "The Soverain-Eulex, Garrick Myelle, is throwing a week's long feast for the coming manhood of his son, Relien Myelle. It is his last surviving son, others perishing in the Kingdom-Soverain War, and his daughter being wed off to the Kingdom as part of a truce. It has been wondered whether the boy can live up to the immense fortune and luck of his father, whom started not long ago as a would-be trader lord, slowly building roads and connectivitiy throughout the Soverains during the war, a wild boon during the war economically--its enhancement of intra-provincial aid notwithstanding.", 
        Fangs: "Word has spread that the growing settlement and peaceable futures of provinces has caused the chaotic stability of mercenary life in the Fangs to decouple from the consistent pattern of war occurring throughout the land for centuries. Some have been accepting work which brings them far and away from their homelands, by whom and for what purpose remainds to be recorded. The Fang Lords themselves have outstretched their lands to incorporate better agriculture, with some of the more inland mercenaries providing a challenge as they wish to graze the land as any animal would. What do you believe?", 
        Licivitas: "The Ascean, General Peroumes, is avoiding the prospect of coming back to Lor without cause of the authority of both the First Lorian and the Dae it seems. Much criticism of his prolonged campaign among the optimate fall to whipsers on the shoulders of the adoring populare, tales of his word and commentaries reaching further than the Good Lorian's word, its been said. The Cragorean, enemies in the current war against Licivitas, despite their fewer numbers and armament, have proved ruthless in their willingness to defy Licivitan conquest. What do you make of that growing sentiment?", 
        Firelands: "The Ghosthawk of Greyrock, Theogeni Spiras, has not been seen as of late--his wife's health has been failing worse. He has been leaning on his administration housed with devoted, a strong change from the previous Protectorate, the Ashfyres and their adherence to Fyer, tradition that has persisted since written word. Peculiar, the man, once wildly famed from his crowning at the Ascea in 130, to overthrowing the longstanding Fyerslord, Laveous Ashfyre. The last vestige of their lineage, Searous Ashfyre, has been left in a fragile position, and many are curious as to the future of the Firelands. What do you think?", 
        Sedyrus: "The Sedyren Sun, Cyrian Shyne, has reached an agreement with a lesser Quor'ator to betrothe his firstborn son to one of their daughters, hoping to stem general unrest from the cooling tempers of verious families being uprooted of the Quor'eite, who lost a surprise war against their neighboring Sedyreal some decades past--the province solidifying after centuries of a Sedyrus/Quor'eia split into Sedyrus. Would you believe those that say this will leads toward a more peaceful future?", 
        Isles: "The Alluring Isles is its own world, gigantic and terrifying despite its grandeur isolated by strange tides. The land itself a shade of this world, yet what can allow a man to travel a fortnight here, and a day there? I've heard about the size of the animals that stalk those jungles and swim in the waters, hard to believe anyone can sustain themselves there. Would you wish to see this place?",
    };
    const [province, setProvince] = useState<keyof typeof regionInformation>('Astralands');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>({ title: '', content: '' });

    const handleCombatAction = (options: any, action: string) => {
        console.log(options, action, 'Action')
        setCombatAction(action);
    }
    const handleRegion = (region: keyof Region) => {
        console.log(region, 'What are you ?')
        setProvince(region);
    }
    const handleIntent = (intent: string) => {
        setCurrentIntent(intent);
    };
    const engageCombat = async () => {
        await checkingLoot();
        dispatch({
            type: ACTIONS.SET_DUEL,
            payload: ''
        });
    };

    const checkReset = async () => {
        await checkingLoot();
        await resetAscean();
    };

    const checkOpponent = async () => {
        await checkingLoot();
        await getOpponent();
    };

    const checkingLoot = async () => {
        console.log(merchantEquipment.length, lootDrop, lootDropTwo, 'Merchant Equipment')
        if (merchantEquipment.length > 0) {
            await deleteEquipment(merchantEquipment);
            setMerchantEquipment([]);
        };
        if (lootDrop !== null) {
            await deleteEquipment([lootDrop]);
            setLootDrop(null);
        };
        if (lootDropTwo !== null) {
            await deleteEquipment([lootDropTwo]);
            setLootDropTwo(null);
        };
    };

    const getLoot = async () => {
        if (merchantEquipment.length > 0) {
            const deleteResponse = await eqpAPI.deleteEquipment(merchantEquipment);
            console.log(deleteResponse, 'Delete Response!');
        }
        try {
            setLoading(true);
            const response = await eqpAPI.getMerchantEquipment(enemy.level);
            console.log(response.data, 'Response!');
            setMerchantEquipment(response.data);
            setItemSaved(false);
            setLoading(false);
        } catch (err) {
            console.log(err, 'Error Getting Loot!');
        };
    };

    useEffect(() => {
        if (merchantEquipment.length === 0) return;
        console.log(merchantEquipment, 'merchantEquipment variable in DialogBox.tsx');
    }, [merchantEquipment]);

    useEffect(() => {
        console.log(currentIntent);
    }, [currentIntent]);

    //TODO:FIXME: Note to self, make a Trader or Services type player, and create new dialog type, not Opponent, but the aforementioned name. With different options, some quests, with services, can trade or create items for the player.

    if (loading) {
        return (
            <Loading Combat={true} />
        )
    };
    return (
        <div className='dialog-box'>
            <div className='dialog-text'>
            <ToastAlert error={error} setError={setError} />
                { currentIntent === 'combat' ?
                    <>
                        <CombatDialogButtons options={dialog[currentIntent]} handleCombatAction={handleCombatAction}  />
                        <div style={{ fontSize: '12px', whiteSpace: 'pre-wrap', color: 'gold' }}>
                            {dialog[currentIntent][combatAction]}
                        </div>
                    </>
                : currentIntent === 'challenge' ?
                    playerWin ? 
                        <>
                            <p style={{ color: 'orangered' }}>
                            You Win. Hot Streak: {winStreak} Hi-Score ({highScore})<br /> 
                            </p>
                            "Well check you out, {ascean.name}, you've won the duel. Congratulations" <br /> <br /> 
                        { lootDrop?._id && lootDropTwo?._id ?
                            <>
                                <LootDrop lootDrop={lootDrop} setLootDrop={setLootDrop} ascean={ascean} itemSaved={itemSaved} setItemSaved={setItemSaved} />
                                <LootDrop lootDrop={lootDropTwo} setLootDrop={setLootDropTwo} ascean={ascean} itemSaved={itemSaved} setItemSaved={setItemSaved} />
                            </>
                        : lootDrop?._id ?
                            <LootDrop lootDrop={lootDrop} setLootDrop={setLootDrop} ascean={ascean} itemSaved={itemSaved} setItemSaved={setItemSaved} />
                        : lootDropTwo?._id ?
                            <LootDrop lootDrop={lootDropTwo} setLootDrop={setLootDropTwo} ascean={ascean} itemSaved={itemSaved} setItemSaved={setItemSaved} />
                        : '' }
                            <Button variant='' style={{ color: 'green', fontVariant: 'small-caps' }} onClick={checkReset}>Refresh Your Duel With {npc}.</Button>
                        </> 
                    : computerWin ? 
                        <>
                            <p style = {{ color: 'dodgerblue' }}>
                            You Lose. Cold Streak: {loseStreak} Hi-Score ({highScore})<br /> 
                            </p>
                            "Well now, {ascean.name}, can't say no one expected this, did we? Tell you what, we can keep at this till you bear luck's fortune."
                            <Button variant='' style={{ color: 'red', fontVariant: 'small-caps' }} onClick={checkReset}>Reduel {npc} To Win Back Your Honor?</Button>
                        </> 
                    :
                        <>
                            "Oh is that why you're here, goodness. Very well, {ascean.name}. Shall we?"<br />
                            <Button variant='' style={{ color: 'yellow', fontVariant: 'small-caps' }} onClick={engageCombat}>Commence Duel with {npc}?</Button>
                        </> 
                : currentIntent === 'conditions' ?
                    <>
                        This will spontaneously create hot, fresh piecs of equipment right out the oven for your amusement and purchase.
                        <br />
                        <Button variant='' style={{ color: 'green', fontVariant: 'small-caps' }} onClick={getLoot}>Generate Merchant Trader Equipment</Button>
                        <br />
                        { merchantEquipment?.length > 0 ?
                            <MerchantTable table={merchantEquipment} setMerchantEquipment={setMerchantEquipment} ascean={ascean} itemPurchased={itemSaved} setItemPurchased={setItemSaved} error={error} setError={setError} />
                        : '' }
                    </>
                : currentIntent === 'farewell' ?
                    <>
                    <br />
                    { playerWin ?
                        <>
                        "Perhaps it's for the best. May you seek a worthy opponent, {ascean.name}."<br />
                        <Button variant='' style={{ color: 'green', fontVariant: 'small-caps' }} onClick={checkOpponent}>Seek A New Potential Duelist For More Experience</Button>
                        </>
                    : computerWin ?
                        <>
                        "Take care {ascean.name}, and seek aid. You do not look well."<br />
                        <Button variant='' style={{ color: 'teal', fontVariant: 'small-caps' }} onClick={checkOpponent}>Meh, Another Day, New Duelist.</Button>
                        </>
                    : 
                        <>
                        "Perhaps we'll meet again, {ascean.name}."<br />
                        <Button variant='' style={{ color: 'yellow', fontVariant: 'small-caps' }} onClick={checkOpponent}>Seek A New Duelist Instead</Button>
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
                        "There's concern in places all over, despite what has been said about steadying tides of war amongst the more civilized. Of where are you inquiring?"<br />
                        <ProvincialWhispersButtons options={regionInformation} handleRegion={handleRegion}  />
                        <div style={{ color: 'gold', fontSize: 12 + 'px' }}>
                        {regionInformation[province]}
                        </div>
                    </>
                : currentIntent === 'worldLore' ?
                    <>
                        World Lore
                    </>
                : '' }
            </div>
            <div className='dialog-options'>
                <DialogButtons options={dialog} setIntent={handleIntent} />
            </div>
        </div>
    );
};

export default DialogBox;