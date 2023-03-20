import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import LootDrop from '../components/GameCompiler/LootDrop';
import MerchantTable from '../components/GameCompiler/MerchantTable';
import Loading from '../components/Loading/Loading';
import * as eqpAPI from '../utils/equipmentApi';
import * as questAPI from '../utils/questApi';
import { ACTIONS } from '../components/GameCompiler/CombatStore';
import ToastAlert from '../components/ToastAlert/ToastAlert';
import { GAME_ACTIONS, ENEMY_ENEMIES, QUESTS, getQuests } from '../components/GameCompiler/GameStore';


const DialogButtons = ({ options, setIntent }: { options: any, setIntent: any }) => {
    const filteredOptions = Object.keys(options).filter((option: any) => option !== 'defeat' && option !== 'victory' && option !== 'taunt' && option !== 'praise' && option !== 'greeting');
    const buttons = filteredOptions.map((o: any, i: number) => {
        return (
            <div key={i}>
            <Button variant='' onClick={() => setIntent(o)} style={{ color: 'green', fontVariant: 'small-caps', fontWeight: 550 }} className='dialog-buttons'>{o}</Button>
            </div>
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
};

const ProvincialWhispersButtons = ({ options, handleRegion }: { options: any, handleRegion: any }) => {
    console.log(options, 'The Options');
    const buttons = Object.keys(options).map((o: any, i: number) => {
        console.log(o, 'Options in ProvincialWhispersButtons');
        return (
            <Button variant='' key={i} onClick={() => handleRegion(o)} style={{ color: 'green', fontVariant: 'small-caps', fontWeight: 550, fontSize: 9 + 'px' }}>{o}</Button>
        )
    });
    return <>{buttons}</>;
};

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
    lootDropTwo: any;
    itemSaved: boolean;
    dispatch: any;
    state: any;
    deleteEquipment: (eqp: any) => Promise<void>;
    merchantEquipment: any;
    generateWorld: (mapName: string) => Promise<void>;
    mapState: any;
    mapDispatch: any;
    currentIntent: any;
    clearOpponent: () => Promise<void>;
    gameDispatch: React.Dispatch<any>;
};

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


const DialogBox = ({ state, dispatch, gameDispatch, mapState, mapDispatch, clearOpponent, currentIntent, ascean, enemy, npc, dialog, generateWorld, merchantEquipment, deleteEquipment, getOpponent, playerWin, computerWin, resetAscean, winStreak, loseStreak, highScore, lootDrop, lootDropTwo, itemSaved }: Props) => {
    const [combatAction, setCombatAction] = useState<any | null>('actions');
    const [localWhispers, setLocalWhispers] = useState<any>({});
    const [showQuest, setShowQuest] = useState<boolean>(false);
    const regionInformation = {
        Astralands: "Good one, those Ashtre have quite the mouth on them I hear yet never heard. Perhaps you'll be able to catch their whispers.", 
        Kingdom: "The King, Mathyus Caderyn II, has been away from his court as of late, his son Dorien sitting the throne--though constant feathers aid his communication when abroad. Despite its unification, groans have increased with disparate and slow recovery from the century long war only having quelled for 7 years prior, with select places receiving abundance of aid over others, the discernment itself seeming weighed in favor of longstanding allies. As the King reaches further East to establish peaceable connections with the Soverains, it leads one to speculate on the disposition of those houses already under his kingship.", 
        Soverains: "The Soverain-Eulex, Garrick Myelle, is throwing a week's long feast for the coming manhood of his son, Relien Myelle. It is his last surviving son, others perishing in the Kingdom-Soverain War, and his daughter being wed off to the Kingdom as part of a truce. It has been wondered whether the boy can live up to the immense fortune and luck of his father, whom started not long ago as a would-be trader lord, slowly building roads and connectivitiy throughout the Soverains during the war, a wild boon during the war economically--its enhancement of intra-provincial aid notwithstanding.", 
        Fangs: "Word has spread that the growing settlement and peaceable futures of provinces has caused the chaotic stability of mercenary life in the Fangs to decouple from the consistent pattern of war occurring throughout the land for centuries. Some have been accepting work which brings them far and away from their homelands, by whom and for what purpose remains to be recorded. The Fang Lords themselves have outstretched their lands to incorporate better agriculture, with some of the more inland mercenaries providing a challenge as they wish to graze the land as any animal would. What do you believe?", 
        Licivitas: "The Ascean, General Peroumes, is avoiding the prospect of coming back to Lor without cause of the authority of both the First Lorian and the Dae it seems. Much criticism of his prolonged campaign among the optimate fall to whipsers on the shoulders of the adoring populare, tales of his commentaries reaching further than the Good Lorian's word, its been said. The Cragorean, enemies in the current war against Licivitas, despite their fewer numbers and armament, have proved ruthless in their willingness to defy Licivitan conquest. What do you make of that growing sentiment?", 
        Firelands: "The Ghosthawk of Greyrock, Theogeni Spiras, has not been seen as of late--his wife's health has been failing worse. He has been leaning on his administration housed with devoted, a strong change from the previous Protectorate, the Ashfyres and their adherence to Fyer, tradition that has persisted since written word. Peculiar, the man, once wildly famed from his crowning at the Ascea in 130, to overthrowing the longstanding Fyerslord, Laveous Ashfyre. The last vestige of their lineage, Searous Ashfyre, has been left in a fragile position, and many are curious as to the future of the Firelands. What do you think?", 
        Sedyrus: "The Sedyren Sun, Cyrian Shyne, has reached an agreement with a lesser Quor'ator to betrothe his firstborn son to one of their daughters, hoping to stem general unrest from the cooling tempers of various families being uprooted of the Quor'eite, who lost a surprise war against their neighboring Sedyreal some decades past--the province solidifying after centuries of a Sedyrus/Quor'eia split into Sedyrus. Would you believe those that say this will leads toward a more peaceful future?", 
        Isles: "The Alluring Isles is its own world, gigantic and terrifying despite its grandeur isolated by strange tides. The land itself a shade of this world, yet what can allow a man to travel a fortnight here, and a day there? I've heard about the size of the animals that stalk those jungles and swim in the waters, hard to believe anyone can sustain themselves there. Would you wish to see this place?",
    };
    const [province, setProvince] = useState<keyof typeof regionInformation>('Astralands');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>({ title: '', content: '' });
    const [quest, setQuest] = useState<any>({});
    const [questModalShow, setQuestModalShow] = useState<boolean>(false);

    useEffect(() => {
        console.log(ascean.quests, "Ascean")
        let enemyQuests = getQuests(enemy?.name);
        let newQuest = enemyQuests[Math.floor(Math.random() * enemyQuests.length)];
        setLocalWhispers(enemyQuests);
        setShowQuest(true);
        return () => {
        } 
    }, [enemy]);


    
    useEffect(() => {
        console.log(localWhispers, "Local Whisper")
    }, [localWhispers]);

    const handleCurrentQuest = (currentQuest: any) => {
        let quest = {
            player: ascean,
            giver: enemy,
            title: currentQuest.title,
            description: currentQuest.description,
            details: {
                isBounty: currentQuest.isBounty,
                bounty: {
                    name: ENEMY_ENEMIES[enemy?.name as keyof typeof ENEMY_ENEMIES][Math.floor(Math.random() * ENEMY_ENEMIES[enemy?.name as keyof typeof ENEMY_ENEMIES].length)],
                    bounty: Math.floor(Math.random() * 3) + 2, // 2-4
                },
                isTimed: currentQuest.isBounty,
                timer: ascean?.level + Math.floor(Math.random() * 3) + 1, // 1-3
                isGiver: enemy?.name,
            },
        };
        setQuest(quest);
        setQuestModalShow(true);
    };

    const handleCombatAction = (options: any, action: string) => {
        setCombatAction(action);
    };
    const handleRegion = (region: keyof Region) => {
        setProvince(region);
    };
    const handleIntent = (intent: string) => {
        gameDispatch({ type: GAME_ACTIONS.SET_CURRENT_INTENT, payload: intent });
    };
    const engageCombat = async () => {
        await checkingLoot();
        dispatch({
            type: ACTIONS.SET_DUEL,
            payload: ''
        });
    };

    const clearDuel = async () => {
        try {
            await checkingLoot();
            await clearOpponent();

        } catch (err: any) {
            console.log(err.message, "Error Clearing Duel");
        };
    };

    const checkReset = async () => {
        await checkingLoot();
        await resetAscean();
    };

    const checkOpponent = async () => {
        await checkingLoot();
        await getOpponent();
    };

    const getLoot = async (type: string) => {
        if (merchantEquipment.length > 0) {
            const deleteResponse = await eqpAPI.deleteEquipment(merchantEquipment);
            console.log(deleteResponse, 'Delete Response!');
        }
        try {
            let response: any;
            setLoading(true);
            if (type === 'weapon') {
                response = await eqpAPI.getWeaponEquipment(ascean?.level);
            } else if (type === 'armor') {
                response = await eqpAPI.getArmorEquipment(ascean?.level);
            } else if (type === 'jewelry') {
                response = await eqpAPI.getJewelryEquipment(ascean?.level);
            } else if (type === 'general') {
                response = await eqpAPI.getMerchantEquipment(ascean?.level);
            } else if (type === 'cloth') {
                response = await eqpAPI.getClothEquipment(ascean?.level);
            }
            gameDispatch({ type: GAME_ACTIONS.SET_MERCHANT_EQUIPMENT, payload: response.data })
            setLoading(false);
        } catch (err) {
            console.log(err, 'Error Getting Loot!');
        };
    };

    const checkingLoot = async () => {
        if (merchantEquipment.length > 0) {
            await deleteEquipment(merchantEquipment);
            gameDispatch({ type: GAME_ACTIONS.SET_MERCHANT_EQUIPMENT, payload: [] });
        };
        if (lootDrop !== null) {
            await deleteEquipment([lootDrop]);
            gameDispatch({ type: GAME_ACTIONS.CLEAR_LOOTDROP, payload: lootDrop });
        };
        if (lootDropTwo !== null) {
            await deleteEquipment([lootDropTwo]);
            gameDispatch({ type: GAME_ACTIONS.CLEAR_LOOTDROP, payload: lootDropTwo });
        };
    };

    function checkUniqueQuest () {
        let thisQuest = getQuests(enemy?.name);
        let newQuest = thisQuest[Math.floor(Math.random() * thisQuest.length)];
        let uniqueQuest = ascean?.quests.some((q: any) => q.title === newQuest.title);
        return uniqueQuest;
    }

    const getQuest = async (newQuest: any) => {
        try {
            setShowQuest(false);
            let uniqueQuest = ascean?.quests.some((q: any) => q.title === newQuest.title);
            console.log(uniqueQuest, "Unique QUest ?")
            if (uniqueQuest) {
                setError({ title: `Unique Quest`, content: `You already possess knowledge of ${newQuest.title}, given to you by ${newQuest.giver.name}.` });
                return;
            };
            const response = await questAPI.createQuest(newQuest);
            console.log(response, "Quest Response");
            setQuest(response);
            setQuestModalShow(false);
            gameDispatch({ type: GAME_ACTIONS.SAVE_QUEST, payload: true });
        } catch (err: any) {
            console.log(err, "Error Getting Quest");
        };
    };

    if (loading) {
        return (
            <Loading Combat={true} />
        );
    };
    return (
        <>
        <Modal show={questModalShow} onHide={() => setQuestModalShow(false)} centered id='modal-weapon'>
            <Modal.Header closeButton closeVariant='white' style={{ textAlign: 'center', fontSize: "20px" }}>{quest.title}</Modal.Header>
            <Modal.Body style={{ textAlign: 'center', color: "#fdf6d8" }}>
                {quest?.description}<br /><br />
                Quest Giver: {quest?.giver?.name}<br />
                { quest?.details?.isBounty ? (
                    <>
                    Bounty: ({quest?.details?.bounty?.bounty}) {quest?.details?.bounty?.name} <br />
                    Timer: {quest?.details?.timer - ascean?.level} {quest?.details?.bounty?.timer === 1 ? 'Month' : 'Months'}<br />
                    </>
                ) : ( "" ) }
                <br />
                <Button variant='' style={{ color: "green", fontSize: "20px" }} onClick={() => getQuest(quest)}>Accept {quest?.title}?</Button>
            </Modal.Body>
        </Modal>
        <div className='dialog-box'>
            <div className='dialog-text'>
            <ToastAlert error={error} setError={setError} />
            <img src={process.env.PUBLIC_URL + `/images/` + enemy.origin + '-' + enemy.sex + '.jpg'} alt={enemy.name} style={{ width: "15vw", borderRadius: "50%", border: "2px solid purple" }} />
            {' '}{enemy.name} (Level {enemy.level})<br />
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
                        "Congratulations {ascean.name}, you were fated this win. This is all I have to offer, if it pleases you." <br /><br /> 

                        { lootDrop?._id && lootDropTwo?._id ?
                            <>
                                <LootDrop lootDrop={lootDrop}  ascean={ascean} itemSaved={itemSaved} gameDispatch={gameDispatch} />
                                <LootDrop lootDrop={lootDropTwo} ascean={ascean} itemSaved={itemSaved} gameDispatch={gameDispatch} />
                            </>
                        : lootDrop?._id ?
                        <LootDrop lootDrop={lootDrop}  ascean={ascean} itemSaved={itemSaved} gameDispatch={gameDispatch} />
                        : lootDropTwo?._id ?
                        <LootDrop lootDrop={lootDropTwo} ascean={ascean} itemSaved={itemSaved} gameDispatch={gameDispatch} />
                        : '' }
                            {/* <Button variant='' style={{ color: 'green', fontVariant: 'small-caps', outline: 'none' }} onClick={checkReset}>Refresh Your Duel With {npc}.</Button> */}
                            <p style={{ color: 'orangered' }}>
                            You Win. Hot Streak: {winStreak} Hi-Score: {highScore}
                            </p>
                        </> 
                    : computerWin ? 
                    <>
                            "{ascean.name}, surely this was a jest? Come now, you disrespect me with such play."
                            <p style = {{ color: 'dodgerblue' }}>
                            <br /> 
                            You Lose. Cold Streak: {loseStreak} Hi-Score ({highScore})
                            </p>
                        </> 
                    :
                    <>
                            "{ascean.name} is it? Very well, you don't seem much for talking either, shall we then?"<br />
                            <Button variant='' style={{ color: 'gold', fontVariant: 'small-caps', outline: 'none' }} onClick={engageCombat}>Engage with {npc}?</Button>
                        </> 
                : currentIntent === 'conditions' ?
                    <>
                        "This portion has not yet been written. Here you will be able to evaluate the conditions you have with said individual, disposition, quests, and the like."
                    </>
                : currentIntent === 'farewell' ?
                    <>
                    { playerWin ?
                        <>
                        "Go now, {ascean.name}, and find better pastures."<br />
                        <Button variant='' style={{ color: 'green', fontVariant: 'small-caps', outline: 'none' }} onClick={() => clearDuel()}>Seek those pastures and leave your lesser to their pity.</Button>
                        </>
                    : computerWin ?
                    <>
                        "Seek refuge {ascean.name}, your frailty wears on my caer."<br />
                        <Button variant='' style={{ color: 'teal', fontVariant: 'small-caps', outline: 'none' }} onClick={() => clearDuel()}>Feign scamperping away to hide shame and wounds.</Button>
                        </>
                    : 
                    <>
                        { enemy?.level > ascean?.level && enemy?.name !== 'Traveling General Merchant' ?
                            <>
                            "You may not be ready, {ascean?.name}, yet time has tethered us here. Come now, prepare."
                            <br />
                            {/* <Button variant='' style={{ color: 'teal', fontVariant: 'small-caps', outline: 'none' }} onClick={() => clearDuel()}>Take the advice and keep moving.</Button> */}
                            <Button variant='' style={{ color: 'red', fontVariant: 'small-caps', outline: 'none' }} onClick={engageCombat}>Prepare to strike {npc}?</Button>
                            </>
                        : enemy?.name !== 'Traveling General Merchant' ?
                        <>
                            "Where do you think you're going, {ascean?.name}? You think this is a game?"
                            <br />
                            <Button variant='' style={{ color: 'red', fontVariant: 'small-caps', outline: 'none' }} onClick={engageCombat}>Engage with {npc}?</Button>
                            </>
                        : 
                        <> 
                            "Well, {ascean?.name}, I suppose you've got better things to do. I'll be around if you happen to find yourself in need of supply."
                            <br />
                            <Button variant='' style={{ color: 'teal', fontVariant: 'small-caps', outline: 'none' }} onClick={() => clearDuel()}>Take the advice and keep moving.</Button>
                            </>
                        }

                        {/* 
                        "Perhaps we'll meet again, {ascean.name}."<br />
                        <Button variant='' style={{ color: 'yellow', fontVariant: 'small-caps', outline: 'none' }} onClick={checkOpponent}>Seek A New Duelist Instead</Button> 
                        */}
                        </>
                    }
                    </>
                : currentIntent === 'localLore' ?
                <>
                        "This has not been written yet."
                    </>
                : currentIntent === 'localWhispers' ?
                    <>
                        "Well if you want to know, you'll have to click the button."
                        <br />
                        { showQuest ?
                            localWhispers ?
                                localWhispers.map((whisper: any, index: number) => {
                                    return (
                                        <div key={index}>
                                        <Button variant='' style={{ color: 'green', fontVariant: 'small-caps', outline: 'none' }} onClick={() => handleCurrentQuest(whisper)}>{whisper.title}</Button>
                                        </div>
                                )})
                            : ''
                        : '' }
                    </>
                : currentIntent === 'persuasion' ?
                <>
                        "This has not been written yet."
                    </>
                : currentIntent === 'services' ?
                <>
                        "Greetings, chance meeting you here. I've been traveling these lands for some time now, and it's good to see those with a mind for wander. I have some items you have find of you here on your adventures, if it interests you."
                        <br /><br />
                        <img src={process.env.PUBLIC_URL + '/images/gold-full.png'} alt="Gold Stack" /> {ascean.currency.gold} <img src={process.env.PUBLIC_URL + '/images/silver-full.png'} alt="Silver Stack" /> {ascean.currency.silver}
                        <br /><br />
                        <Button variant='' style={{ color: 'green', fontVariant: 'small-caps', outline: 'none' }} onClick={() => getLoot('general')}>See the merchant's wares.</Button>
                        <br />
                        { merchantEquipment?.length > 0 ?
                            <MerchantTable table={merchantEquipment} gameDispatch={gameDispatch} ascean={ascean} error={error} setError={setError} />
                        : '' }
                    </>
                : currentIntent === 'provincialWhispers' ?
                <>
                    {
                        playerWin ?
                        <>
                        "There's concern in places all over, despite what has been said about steadying tides of war amongst the more civilized. Of where are you inquiring?"<br />
                        <ProvincialWhispersButtons options={regionInformation} handleRegion={handleRegion}  />
                        <div style={{ color: 'gold', fontSize: 12 + 'px' }}>
                            "{regionInformation[province]}"
                        </div>
                        </>
                        : computerWin ?
                        <>"I guess those whipspers must wait another day."</>
                        : <>"What is it you wish to hear? If you can best me I will tell you what I know in earnest."</>
                    }
                    </>
                : currentIntent === 'worldLore' ?
                <>
                        "This has not been written yet."
                    </>
                : '' }
            </div>
            <div className='dialog-options'>
                <DialogButtons options={dialog} setIntent={handleIntent} />
            </div>
        </div>
        </>
    );
};

export default DialogBox;