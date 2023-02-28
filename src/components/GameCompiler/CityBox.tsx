import { useState, useEffect, useRef } from 'react';
import * as asceanAPI from '../../utils/asceanApi';
import * as eqpAPI from '../../utils/equipmentApi';
import Loading from '../Loading/Loading';
import ToastAlert from '../ToastAlert/ToastAlert'
import Overlay from 'react-bootstrap/Overlay';
import Button from 'react-bootstrap/Button';
import MerchantTable from './MerchantTable';
import { ACTIONS } from './CombatStore';
import { GAME_ACTIONS } from './GameStore';

const CityButtons = ({ options, setOptions }: { options: any, setOptions: any }) => {
    // const filteredOptions = Object.keys(options).filter((option: any) => option !== 'defeat' && option !== 'victory' && option !== 'taunt' && option !== 'praise' && option !== 'greeting');
    const buttons = Object.keys(options).map((o: any, i: number) => {
        return (
            <Button variant='' key={i} onClick={() => setOptions(o)} style={{ color: 'green', fontVariant: 'small-caps', fontWeight: 550, fontSize: 9 + 'px' }}>{o}</Button>
        )
    });
    return <>{buttons}</>;
};


const CITY_OPTIONS = {
    'Alchemist': 'Alchemist',
    'Armorer': 'Armorer',
    'Bank': 'Bank',
    'Blacksmith': 'Blacksmith',
    'Daeth': 'Daeth',
    'Dueling Grounds': 'Dueling Grounds',
    'Guild Hall': 'Guild Hall',
    'Innkeep': 'Innkeep',
    'Jeweler': 'Jeweler',
    'Merchant': 'Merchant',
    'Museum': 'Museum',
    'Tailor': 'Tailor',
    'Weapons Gallery': 'Weapons Gallery',
};


interface CityProps {
    state: any;
    dispatch: any;
    mapState: any;
    ascean: any;
    enemy: any;
    cityOption: any;
    merchantEquipment: any;
    inventory: any;
    getOpponent: () => Promise<void>;
    resetAscean: () => Promise<void>;
    deleteEquipment: (eqp: any) => Promise<void>;
    clearOpponent: () => Promise<void>;
    gameDispatch: React.Dispatch<any>;
}

const CityBox = ({ state, dispatch, gameDispatch, mapState, ascean, enemy, clearOpponent, cityOption, merchantEquipment, inventory, getOpponent, resetAscean, deleteEquipment }: CityProps) => {
    const [error, setError] = useState<any>({ title: '', content: '' });
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [loadingContent, setLoadingContent] = useState<string>('');
    const targetRef = useRef(null);
    const [upgradeItem, setUpgradeItem] = useState<any | null>({});

    // function canUpgrade(inventory: any[]): any | undefined {
    //     const matches = inventory.filter((item, index, arr) =>
    //       arr.findIndex(i => i.name === item.name && i.rarity === item.rarity) !== index
    //     );
    //     if (matches.length > 3) {
    //       return matches[0];
    //     };
    // };
      
    // const matchedItem = canUpgrade(inventory);
    // if (matchedItem) {
    //     setUpgradeItem(matchedItem);
    // };
      

    const handleCityOption = async (option: string) => {
        console.log(option, 'Option Clicked');
        await checkingLoot();
        if (enemy) await clearOpponent();
        gameDispatch({ type: GAME_ACTIONS.SET_CITY_OPTION, payload: option });
    };

    const engageCombat = async () => {
        await checkingLoot();
        dispatch({
            type: ACTIONS.SET_DUEL,
            payload: ''
        });
    };

    const clearDuel = async () => {
        await checkingLoot();
        await clearOpponent();
    };

    const checkReset = async () => {
        await checkingLoot();
        await resetAscean();
    };

    const checkOpponent = async () => {
        await checkingLoot();
        await getOpponent();
    };

    const refillFlask = async () => {
        try {
            const response = await asceanAPI.restoreFirewater(ascean._id);
            console.log(response, 'Response Refilling Flask');
            gameDispatch({ type: GAME_ACTIONS.EQP_SWAP, payload: true });
        } catch (err: any) {
            console.log(err, "Error Refilling Flask");
        };
    };

    const handleRest = async () => {
        dispatch ({ type: ACTIONS.PLAYER_REST, payload: 100 });
    };

    const checkingLoot = async () => {
        console.log(merchantEquipment.length, 'Merchant Equipment')
        if (merchantEquipment.length > 0) {
            await deleteEquipment(merchantEquipment);
            gameDispatch({ type: GAME_ACTIONS.SET_MERCHANT_EQUIPMENT, payload: [] });
        };
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
            console.log(response.data, 'Response!');
            gameDispatch({ type: GAME_ACTIONS.SET_MERCHANT_EQUIPMENT, payload: response.data })
            setLoading(false);
        } catch (err) {
            console.log(err, 'Error Getting Loot!');
        };
    };

    async function handleUpgradeItem() {
        try {
            setIsLoading(true);
            setLoadingContent(`Forging 3 ${inventory?.name}'s Into 1 Of Greater Quality`);
            const matches = inventory.filter((item: { name: string; rarity: string; }) => item.name === inventory.name && item.rarity === inventory.rarity);
            console.log(matches, '<- What are the matches?');
            const data = {
                asceanID: ascean._id,
                upgradeID: inventory._id,
                upgradeName: inventory.name,
                upgradeType: inventory.itemType,
                currentRarity: inventory.rarity,
                inventoryType: checkInventory(inventory),
                upgradeMatches: matches,
            };
            const response = await eqpAPI.upgradeEquipment(data);
            console.log(response, '<- This is the response from handleUpgradeItem');
            gameDispatch({ type: GAME_ACTIONS.REMOVE_ITEM, payload: true });
        } catch (err: any) {
            console.log(err.message, '<- Error upgrading item');
        };
    };

    async function checkInventory(item: any) {
        try {
            let type: string = '';
            if (item?.grip) {
                return type = 'weapon';
            };
            if (item?.name.includes('Hood') || item?.name.includes('Helm') || item?.name.includes('Mask')) {
                return type = 'helmet';
            };
            if (item?.name.includes('Cuirass') || item?.name.includes('Robes') || item?.name.includes('Armor')) {
                return type = 'chest';
            };
            if (item?.name.includes('Greaves') || item?.name.includes('Pants') || item?.name.includes('Legs')) {
                return type = 'legs';
            };
            if (item?.name.includes('Amulet') || item?.name.includes('Necklace')) {
                return type = 'amulet';
            };
            if (item?.name.includes('Ring')) {
                return type = 'ring';
            };
            if (item?.name.includes('Trinket')) {
                return type = 'trinket';
            };
            if (item?.type.includes('Shield')) {
                return type = 'shield';
            };
        } catch (err: any) {
            console.log(err.message, '<- This is the error in checkInventory');
        };
    };

    const getRarityColor = (rarity: string) => {
        switch (rarity) {
            case 'Common':
                return '2px 2px 2px white';
            case 'Uncommon':
                return '2px 2px 2px green';
            case 'Rare':
                return '2px 2px 2px blue';
            case 'Epic':
                return '2px 2px 2px purple';
            case 'Legendary':
                return '2px 2px 2px darkorange';
            default:
                return '2px 2px 2px grey';
        };
    };

    const getHigherRarityColor = (rarity: string) => {
        switch (rarity) {
            case 'Common':
                return '2px 2px 2px green';
            case 'Uncommon':
                return '2px 2px 2px blue';
            case 'Rare':
                return '2px 2px 2px purple';
            case 'Epic':
                return '2px 2px 2px darkorange';
            default:
                return '2px 2px 2px white';
        };
    };

    const getRarity = {
        border: getRarityColor(inventory?.rarity),
        borderShadow: "1px 1px 1px black"
    };

    const getHigherRarity = {
        border: getHigherRarityColor(inventory?.rarity),
        borderShadow: "1px 1px 1px black"
    };

    if (loading) {
        return (
            <Loading Combat={true} />
        )
    };

    return (
        <div className='dialog-box'>
            <div className='dialog-text'>
                <ToastAlert error={error} setError={setError} />
            {
                cityOption === 'Alchemist' ?
                <>
                    "Hmm." The Alchemist's eyes scatter about your presence, eyeing {ascean?.firewater?.charges} swigs left of your Fyervas Firewater before tapping on on a pipe, its sound wrapping round and through the room to its end, a quaint, little spigot with a grated catch on the floor.{' '}
                    "If you're needing potions of amusement and might I'm setting up craft now. Fill up your flask meanwhile, I'll need you alive for patronage."
                    <br /><br />
                    <Button variant='' style={{ color: 'blueviolet', fontVariant: 'small-caps', outline: 'none' }} onClick={refillFlask}>Walk over and refill your firewater?</Button>
                </>
                : cityOption === 'Armorer' ?
                <>
                    "Hello there, see what the local blacksmith has been supplying for the city."
                    <br /><br />
                    <img src={process.env.PUBLIC_URL + '/images/gold-full.png'} alt="Gold Stack" /> {ascean.currency.gold} <img src={process.env.PUBLIC_URL + '/images/silver-full.png'} alt="Silver Stack" /> {ascean.currency.silver} 
                    <br /><br />
                    <Button variant='' style={{ color: 'green', fontVariant: 'small-caps', outline: 'none' }} onClick={() => getLoot('armor')}>See the various armor available.</Button>
                    <br />
                    { merchantEquipment?.length > 0 ?
                        <MerchantTable table={merchantEquipment} gameDispatch={gameDispatch}  ascean={ascean} error={error} setError={setError} />
                    : '' }
                </>
                : cityOption === 'Bank' ?
                <>
                    "This is the bank, where you can deposit and withdraw your gold, silver, and inventory items. This feature is not yet available."
                </>
                : cityOption === 'Blacksmith' ?
                <>
                    "You've come for forging? Elsewise I trade with the Armorer if you want to find what I've made already."
                    {/* <br />
                    <img src={process.env.PUBLIC_URL + '/images/gold-full.png'} alt="Gold Stack" /> {ascean.currency.gold} <img src={process.env.PUBLIC_URL + '/images/silver-full.png'} alt="Silver Stack" /> {ascean.currency.silver} */}
                    {/* Drag and Drop Feature to select (3) of the same item name / rarity in order to forge them. It'll light up and be the new inventory forge mechanic instead as the new option */}
                    <br />
                    {/* {
                        upgradeItem ?
                        <Button variant='outline' ref={targetRef} className='' style={{ color: 'gold', fontWeight: 600 }} onClick={() => handleUpgradeItem()}>
                            Forge: (3) <img src={process.env.PUBLIC_URL + upgradeItem?.imgURL} alt={upgradeItem?.name} style={getRarity} /> =&gt; <img src={process.env.PUBLIC_URL + upgradeItem?.imgURL} alt={upgradeItem?.name} style={getHigherRarity} />
                        </Button>
                        : ''    
                    } */}
                    {/* { canUpgrade(inventory) ? <Button variant='outline' ref={targetRef} className='' style={{ color: 'gold', fontWeight: 600 }} onClick={() => handleUpgradeItem()}>
                        Forge: (3) <img src={process.env.PUBLIC_URL + upgradeItem?.imgURL} alt={upgradeItem?.name} style={getRarity} /> =&gt; <img src={process.env.PUBLIC_URL + upgradeItem?.imgURL} alt={upgradeItem?.name} style={getHigherRarity} />
                    </Button> : '' } */}
                    {/* <Button variant='' style={{ color: 'green', fontVariant: 'small-caps', outline: 'none' }} onClick={() => handleUpgradeItem()}>Forge Upgrade.</Button> */}
                    <br />
                </>
                : cityOption === 'Innkeep' ?
                <>
                    "Welcome to the inn, you can rest here for a small fee if you feel you need the downtime. Simply 20s a night (Free at the moment)."
                    <br /><br />
                    <img src={process.env.PUBLIC_URL + '/images/gold-full.png'} alt="Gold Stack" /> {ascean.currency.gold} <img src={process.env.PUBLIC_URL + '/images/silver-full.png'} alt="Silver Stack" /> {ascean.currency.silver} 
                    <br /><br />
                    <Button variant='' style={{ color: 'green', fontVariant: 'small-caps', outline: 'none' }} onClick={() => handleRest()}>Rest for 1 Night.</Button>
                </>
                : cityOption === 'Jeweler' ?
                <>
                    "Greetings there, have a gander at the glint."
                    <br /><br />
                    <img src={process.env.PUBLIC_URL + '/images/gold-full.png'} alt="Gold Stack" /> {ascean.currency.gold} <img src={process.env.PUBLIC_URL + '/images/silver-full.png'} alt="Silver Stack" /> {ascean.currency.silver}
                    <br /><br />
                    {
                        ascean?.level < 4 ?
                        "Oh dear, you don't seem quite ready yet, come back in a while and perhaps."
                    :
                        <Button variant='' style={{ color: 'green', fontVariant: 'small-caps', outline: 'none' }} onClick={() => getLoot('jewelry')}>See such bejeweled spectacles.</Button>
                    }
                    <br />
                    { merchantEquipment?.length > 0 ?
                        <MerchantTable table={merchantEquipment} gameDispatch={gameDispatch} ascean={ascean} error={error} setError={setError} />
                    : '' }
                </>
                : cityOption === 'Merchant' ?
                <>
                    "Feast your eyes for your belly and pursestrings."
                    <br /><br />
                    <img src={process.env.PUBLIC_URL + '/images/gold-full.png'} alt="Gold Stack" /> {ascean.currency.gold} <img src={process.env.PUBLIC_URL + '/images/silver-full.png'} alt="Silver Stack" /> {ascean.currency.silver}
                    <br /><br />
                    <Button variant='' style={{ color: 'green', fontVariant: 'small-caps', outline: 'none' }} onClick={() => getLoot('general')}>See the merchant's wares.</Button>
                    <br />
                    { merchantEquipment?.length > 0 ?
                        <MerchantTable table={merchantEquipment} gameDispatch={gameDispatch} ascean={ascean} error={error} setError={setError} />
                    : '' }
                </>
                : cityOption === 'Tailor' ?
                <>
                    "Have an eye for softer garb? You've come proper, then."
                    <br /><br />
                    <img src={process.env.PUBLIC_URL + '/images/gold-full.png'} alt="Gold Stack" /> {ascean.currency.gold} <img src={process.env.PUBLIC_URL + '/images/silver-full.png'} alt="Silver Stack" /> {ascean.currency.silver}
                    <br /><br />
                    <Button variant='' style={{ color: 'green', fontVariant: 'small-caps', outline: 'none' }} onClick={() => getLoot('cloth')}>See the cloth wares and weapons.</Button>
                    <br />
                    { merchantEquipment?.length > 0 ?
                        <MerchantTable table={merchantEquipment} gameDispatch={gameDispatch} ascean={ascean} error={error} setError={setError} />
                    : '' }
                </>
                : cityOption === 'Dueling Grounds' ?
                <>
                    { enemy ?
                        <>
                            <img src={process.env.PUBLIC_URL + `/images/` + enemy.origin + '-' + enemy.sex + '.jpg'} alt={enemy.name} style={{ width: "15vw", borderRadius: "50%", border: "2px solid purple" }} />
                            {' '}{enemy.name} (Level {enemy.level})<br />
                        </>
                    : ''
                    }
                    { state?.player_win ?
                        <>
                            "You are a breath of fresh air around these parts, I'm honored to have been bested by you."
                            <br />
                            <Button variant='' style={{ color: 'green', fontVariant: 'small-caps', outline: 'none' }} onClick={checkReset}>Challenge them to a duel once more.</Button>
                            <br />
                            <Button variant='' style={{ color: 'green', fontVariant: 'small-caps', outline: 'none' }} onClick={checkOpponent}>Seek other, stronger opponents to test your skills.</Button>
                        </>
                    : state?.computer_win ?
                        <> 
                            "You seemed a little eager there, perhaps you ought to sit the next one out and watch the others. I'm sure you'll learn something."
                            <br />
                            <Button variant='' style={{ color: 'green', fontVariant: 'small-caps', outline: 'none' }} onClick={checkReset}>Challenge them to a duel once more.</Button>
                            <br />
                            <Button variant='' style={{ color: 'green', fontVariant: 'small-caps', outline: 'none' }} onClick={checkOpponent}>Find an easier opponent, hopefully.</Button>
                        </>
                    :
                        <>
                            Ahh the dueling grounds, packged dirt and trampled grass stained with blood and sweat of past duels litter the area. 
                            Seems a few folk have been testing themselves and are loitering about, hungry for another bout. 
                            <br />
                            {
                                enemy ?
                                <>
                                <br />
                                <Button variant='' style={{ color: 'green', fontVariant: 'small-caps', outline: 'none' }} onClick={engageCombat}>Initiate the duel with {enemy?.name}</Button>
                                <br />
                                <Button variant='' style={{ color: 'yellow', fontVariant: 'small-caps', outline: 'none' }} onClick={checkOpponent}>Step toward another duelist instead.</Button>
                                </>
                            : 
                                <Button variant='' style={{ color: 'yellow', fontVariant: 'small-caps', outline: 'none' }} onClick={checkOpponent}>Step toward a duelist and challenge them.</Button>
                            }
                        </>
                    }
                </>
                : cityOption === 'Weapons Gallery' ?
                <>
                    "The finest armaments fresh off the forge from our talented smith."
                    <br /><br />
                    <img src={process.env.PUBLIC_URL + '/images/gold-full.png'} alt="Gold Stack" /> {ascean.currency.gold} <img src={process.env.PUBLIC_URL + '/images/silver-full.png'} alt="Silver Stack" /> {ascean.currency.silver}
                    <br /><br />
                    <Button variant='' style={{ color: 'green', fontVariant: 'small-caps', outline: 'none' }} onClick={() => getLoot('weapon')}>See the various weapons available.</Button>
                    <br />
                    { merchantEquipment?.length > 0 ?
                        <MerchantTable table={merchantEquipment} gameDispatch={gameDispatch} ascean={ascean} error={error} setError={setError} />
                    : '' }
                </>
                : cityOption === 'Guild Hall' ?
                <>
                "This is the Guild Hall. At the moment it is not a feature available."
                </>
                : cityOption === 'Museum' ?
                <>
                "This is a small post of the Sages. At the moment it is not a feature available."
                </>
                : cityOption === 'Daeth' ?
                <>
                "This is the place of reverence and worship for Daethos. At the moment it is not a feature available."
                </>
                : ''
            }
            </div>
            <div className='dialog-options'>
                <CityButtons options={CITY_OPTIONS} setOptions={handleCityOption} />
            </div>

            <Overlay target={targetRef} show={isLoading}>
            <div
            className='d-flex align-items-center justify-content-center'
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.65)',
                zIndex: 9999,
            }}
            >
                <h1 style={{ color: 'gold', fontVariant: 'small-caps', textAlign: 'center', fontSize: 36 + 'px', textShadow: '1px 1px 1px goldenrod', fontWeight: 600,
                }}>
                {loadingContent}
                </h1>
            </div>
            </Overlay>
        </div>
    )
}

export default CityBox