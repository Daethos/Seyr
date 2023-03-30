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
import Inventory from './Inventory';

const CityButtons = ({ options, setOptions }: { options: any, setOptions: any }) => {
    // const filteredOptions = Object.keys(options).filter((option: any) => option !== 'defeat' && option !== 'victory' && option !== 'taunt' && option !== 'praise' && option !== 'greeting');
    const buttons = Object.keys(options).map((o: any, i: number) => {
        return (
            <div key={i}>
            <Button variant='' onClick={() => setOptions(o)} className='dialog-buttons' style={{ fontWeight: 550 }}>{o}</Button>
            </div>
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
    'Mystic Gallery': 'Mystic Gallery',
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
    gameState: any;
}

const CityBox = ({ state, dispatch, gameDispatch, mapState, ascean, enemy, clearOpponent, cityOption, merchantEquipment, inventory, getOpponent, resetAscean, deleteEquipment, gameState }: CityProps) => {
    const [error, setError] = useState<any>({ title: '', content: '' });
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [loadingContent, setLoadingContent] = useState<string>('');
    const targetRef = useRef(null);
    const [upgradeItems, setUpgradeItems] = useState<any | null>(null);

    useEffect(() => {
        console.log(inventory, "Inventory");
        if (inventory.length > 2) {
            const matchedItem = canUpgrade(inventory);
            if (matchedItem) {
                setUpgradeItems(matchedItem);
            } else {
                setUpgradeItems(null);
            };
        };
    }, [inventory]);

    const canUpgrade = (inventory: any[]) => {
        const itemGroups: Record<string, any[]> = {};
      
        inventory.forEach(item => {
            const key = `${item.name}-${item.rarity}`;
            itemGroups[key] = itemGroups[key] || [];
            itemGroups[key].push(item);
        });
      
        const matches = [];
      
        for (const key in itemGroups) {
            if (itemGroups.hasOwnProperty(key)) {
                const items = itemGroups[key];
                if (items.length >= 3) { 
                    matches.push(items[0]);
                };
            };
        };
      
        return matches.length > 0 ? matches : null;
    };
      
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
            gameDispatch({ type: GAME_ACTIONS.SET_FIREWATER, payload: response.firewater });
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
        };
        try {
            let response: any;
            setLoading(true);
            if (type === 'physical-weapon') {
                response = await eqpAPI.getPhysicalWeaponEquipment(ascean?.level);
            } else if (type === 'magical-weapon') {
                response = await eqpAPI.getMagicalWeaponEquipment(ascean?.level);
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

    if (loading) {
        return (
            <Loading Combat={true} />
        );
    };

    return (
        <div className='dialog-box'>
            <div className='dialog-text'>
                <ToastAlert error={error} setError={setError} />
            { cityOption === 'Alchemist' ?
                <>
                    <img src={process.env.PUBLIC_URL + `/images/` + 'Fyers' + '-' + 'Man' + '.jpg'} alt='Fyersman' className='dialog-picture' style={{ borderRadius: "50%", border: "2px solid purple" }} />
                    {' '}Alchemist
                    <br />   
                    "Hmm." The Alchemist's eyes scatter about your presence, eyeing {ascean?.firewater?.charges} swigs left of your Fyervas Firewater before tapping on on a pipe, its sound wrapping round and through the room to its end, a quaint, little spigot with a grated catch on the floor.{' '}
                    <br /><br />
                    "If you're needing potions of amusement and might I'm setting up craft now. Fill up your flask meanwhile, I'll need you alive for patronage."
                    <br /><br />
                    <Button variant='' className='dialog-buttons inner' style={{ color: 'blueviolet' }} onClick={refillFlask}>Walk over and refill your firewater?</Button>
                </>
            : cityOption === 'Armorer' ?
                <>
                    <img src={process.env.PUBLIC_URL + `/images/` + 'Notheo' + '-' + 'Man' + '.jpg'} alt='Notheon' className='dialog-picture' style={{ borderRadius: "50%", border: "2px solid purple" }} />
                    {' '}Armorer
                    <br />
                    "Hello there, see what the local blacksmith has been supplying for the city."
                    <br /><br />
                    <img src={process.env.PUBLIC_URL + '/images/gold-full.png'} alt="Gold Stack" /> {ascean.currency.gold} <img src={process.env.PUBLIC_URL + '/images/silver-full.png'} alt="Silver Stack" /> {ascean.currency.silver} 
                    <br /><br />
                    <Button variant='' className='dialog-buttons inner' onClick={() => getLoot('armor')}>See the various armor available.</Button>
                    <br />
                    { merchantEquipment?.length > 0 ?
                        <MerchantTable table={merchantEquipment} gameDispatch={gameDispatch}  ascean={ascean} error={error} setError={setError} />
                    : '' }
                </>
            : cityOption === 'Bank' ?
                <>
                    <img src={process.env.PUBLIC_URL + `/images/` + "Li'ivi" + '-' + 'Man' + '.jpg'} alt="Merchant" className='dialog-picture' style={{ borderRadius: "50%", border: "2px solid purple" }} />
                    {' '}Banker
                    <br />
                    "This is the bank, where you can deposit and withdraw your gold, silver, and inventory items. This feature is not yet available, though when it is I imagine you'll be in need, as loss of life and limb and may lead toward a levitivity most unwanted."
                </>
            : cityOption === 'Blacksmith' ?
                <>
                    <img src={process.env.PUBLIC_URL + `/images/` + 'Ashtre' + '-' + 'Man' + '.jpg'} alt="Merchant" className='dialog-picture' style={{ borderRadius: "50%", border: "2px solid purple" }} />
                    {' '}Blacksmith
                    <br />
                    "You've come for forging? I only handle chiomic quality and above. Check my rates and hand me anything you think worth's it. Elsewise I trade with the Armorer if you want to find what I've made already."
                    <br /><br />
                    Hanging on the wall is a list of prices for the various items you can forge. The prices are based on the quality. <br />
                    <p style={{ color: "green", fontSize: "20px", marginBottom: "-1px", fontWeight: 700 }}>Kyn'gian: 1g</p> 
                    <p style={{ color: "blue", fontSize: "20px", marginBottom: "-1px", fontWeight: 700 }}>Senic: 3g</p>
                    <p style={{ color: "purple", fontSize: "20px", marginBottom: "-1px", fontWeight: 700 }}>Kyris: 12g</p>
                    <p style={{ color: "darkorange", fontSize: "20px", marginBottom: "-1px", fontWeight: 700 }}>Sedyrus: 60g</p>
                    <br />
                    <img src={process.env.PUBLIC_URL + '/images/gold-full.png'} alt="Gold Stack" /> {ascean.currency.gold} <img src={process.env.PUBLIC_URL + '/images/silver-full.png'} alt="Silver Stack" /> {ascean.currency.silver}
                    <br /><br />
                    { upgradeItems ?
                        <>
                        {upgradeItems.map((item: any, index: number) => {
                            return (
                                <Inventory key={index} inventory={item} bag={inventory} gameDispatch={gameDispatch} ascean={ascean} blacksmith={true} index={index} />
                            )
                        })}
                        </>
                    : '' }
                    <br />
                </>
            : cityOption === 'Innkeep' ?
                <>
                    <img src={process.env.PUBLIC_URL + `/images/` + 'Nothos' + '-' + 'Woman' + '.jpg'} alt="Merchant" className='dialog-picture' style={{ borderRadius: "50%", border: "2px solid purple" }} />
                    {' '}Innkeeper
                    <br />
                    "Welcome to the inn, you can rest here for a small fee if you feel you need the downtime. Simply 20s a night (Free at the moment)."
                    <br /><br />
                    <img src={process.env.PUBLIC_URL + '/images/gold-full.png'} alt="Gold Stack" /> {ascean.currency.gold} <img src={process.env.PUBLIC_URL + '/images/silver-full.png'} alt="Silver Stack" /> {ascean.currency.silver} 
                    <br /><br />
                    <Button variant='' className='dialog-buttons inner' onClick={() => handleRest()}>Rest for 1 Night.</Button>
                </>
            : cityOption === 'Jeweler' ?
                <>
                    <img src={process.env.PUBLIC_URL + `/images/` + "Quor'eite" + '-' + 'Woman' + '.jpg'} alt="Merchant" className='dialog-picture' style={{ borderRadius: "50%", border: "2px solid purple" }} />
                    {' '}Jeweler
                    <br />
                    "Greetings there, have a gander at the glint."
                    <br /><br />
                    <img src={process.env.PUBLIC_URL + '/images/gold-full.png'} alt="Gold Stack" /> {ascean.currency.gold} <img src={process.env.PUBLIC_URL + '/images/silver-full.png'} alt="Silver Stack" /> {ascean.currency.silver}
                    <br /><br />
                    { ascean?.level < 4 ?
                        `"Oh dear, you don't seem quite ready yet, come back in a while and perhaps."`
                    :
                        <Button variant='' className='dialog-buttons inner' onClick={() => getLoot('jewelry')}>See such bejeweled spectacles.</Button>
                    }
                    <br />
                    { merchantEquipment?.length > 0 ?
                        <MerchantTable table={merchantEquipment} gameDispatch={gameDispatch} ascean={ascean} error={error} setError={setError} />
                    : '' }
                </>
            : cityOption === 'Merchant' ?
                <>
                    <img src={process.env.PUBLIC_URL + `/images/` + "Li'ivi" + '-' + 'Woman' + '.jpg'} alt="Merchant" className='dialog-picture' style={{ borderRadius: "50%", border: "2px solid purple" }} />
                    {' '}General Merchant
                    <br />
                    "Feast your eyes for your belly and pursestrings."
                    <br /><br />
                    <img src={process.env.PUBLIC_URL + '/images/gold-full.png'} alt="Gold Stack" /> {ascean.currency.gold} <img src={process.env.PUBLIC_URL + '/images/silver-full.png'} alt="Silver Stack" /> {ascean.currency.silver}
                    <br /><br />
                    <Button variant='' className='dialog-buttons inner' onClick={() => getLoot('general')}>See the merchant's wares.</Button>
                    <br />
                    { merchantEquipment?.length > 0 ?
                        <MerchantTable table={merchantEquipment} gameDispatch={gameDispatch} ascean={ascean} error={error} setError={setError} />
                    : '' }
                </>
            : cityOption === 'Tailor' ?
                <>
                    <img src={process.env.PUBLIC_URL + `/images/` + 'Fyers' + '-' + 'Woman' + '.jpg'} alt="Merchant" className='dialog-picture' style={{ borderRadius: "50%", border: "2px solid purple" }} />
                    {' '}Tailor
                    <br />
                    "Have an eye for softer garb? You've come proper, then."
                    <br /><br />
                    <img src={process.env.PUBLIC_URL + '/images/gold-full.png'} alt="Gold Stack" /> {ascean.currency.gold} <img src={process.env.PUBLIC_URL + '/images/silver-full.png'} alt="Silver Stack" /> {ascean.currency.silver}
                    <br /><br />
                    <Button variant='' className='dialog-buttons inner' onClick={() => getLoot('cloth')}>See the cloth wares.</Button>
                    <br />
                    { merchantEquipment?.length > 0 ?
                        <MerchantTable table={merchantEquipment} gameDispatch={gameDispatch} ascean={ascean} error={error} setError={setError} />
                    : '' }
                </>
            : cityOption === 'Dueling Grounds' ?
                <>
                    { enemy ?
                        <>
                            <img src={process.env.PUBLIC_URL + `/images/` + enemy.origin + '-' + enemy.sex + '.jpg'} alt={enemy.name} className='dialog-picture' style={{ borderRadius: "50%", border: "2px solid purple" }} />
                            {' '}{enemy.name} (Level {enemy.level})<br />
                        </>
                    : ''
                    }
                    { state?.player_win ?
                        <>
                            "You are a breath of fresh air around these parts, I'm honored to have been bested by you."
                            <br />
                            <Button variant='' className='dialog-buttons inner' onClick={checkReset}>Challenge them to a duel once more.</Button>
                            <br />
                            <Button variant='' className='dialog-buttons inner' onClick={checkOpponent}>Seek other, stronger opponents to test your skills.</Button>
                        </>
                    : state?.computer_win ?
                        <> 
                            "You seemed a little eager there, perhaps you ought to sit the next one out and watch the others. I'm sure you'll learn something."
                            <br />
                            <Button variant='' className='dialog-buttons inner' onClick={checkReset}>Challenge them to a duel once more.</Button>
                            <br />
                            <Button variant='' className='dialog-buttons inner' onClick={checkOpponent}>Find an easier opponent, hopefully.</Button>
                        </>
                    :
                        <>
                            Ahh the dueling grounds, packged dirt and trampled grass stained with blood and sweat of past duels litter the area. 
                            Seems a few folk have been testing themselves and are loitering about, hungry for another bout. 
                            <br />
                            { enemy ?
                                <>
                                    <br />
                                    <Button variant='' className='dialog-buttons inner' onClick={engageCombat}>Initiate the duel with {enemy?.name}</Button>
                                    <br />
                                    <Button variant='' className='dialog-buttons inner' style={{ color: 'yellow' }} onClick={checkOpponent}>Step toward another duelist instead.</Button>
                                </>
                            : 
                                <Button variant='' className='dialog-buttons inner' style={{ color: 'yellow' }} onClick={checkOpponent}>Step toward a duelist and challenge them.</Button>
                            }
                        </>
                    }
                </>
            : cityOption === 'Mystic Gallery' ?
                <>  
                    <img src={process.env.PUBLIC_URL + `/images/` + 'Nothos' + '-' + 'Woman' + '.jpg'} alt="Merchant" className='dialog-picture' style={{ borderRadius: "50%", border: "2px solid purple" }} />
                    {' '}Seer
                    <br />
                    "I imagine you know why you've come, {ascean.name}."
                    <br /><br />
                    <img src={process.env.PUBLIC_URL + '/images/gold-full.png'} alt="Gold Stack" /> {ascean.currency.gold} <img src={process.env.PUBLIC_URL + '/images/silver-full.png'} alt="Silver Stack" /> {ascean.currency.silver}
                    <br /><br />
                    <Button variant='' className='dialog-buttons inner' onClick={() => getLoot('magical-weapon')}>See the mystic weapons available.</Button>
                    <br />
                    { merchantEquipment?.length > 0 ?
                        <MerchantTable table={merchantEquipment} gameDispatch={gameDispatch} ascean={ascean} error={error} setError={setError} />
                    : '' }
                </>
            : cityOption === 'Weapons Gallery' ?
                <>
                    <img src={process.env.PUBLIC_URL + `/images/` + 'Notheo' + '-' + 'Man' + '.jpg'} alt="Merchant" className='dialog-picture' style={{ borderRadius: "50%", border: "2px solid purple" }} />
                    {' '}Weaponsmith
                    <br />
                    "The finest armaments fresh off the forge from our talented smith."
                    <br /><br />
                    <img src={process.env.PUBLIC_URL + '/images/gold-full.png'} alt="Gold Stack" /> {ascean.currency.gold} <img src={process.env.PUBLIC_URL + '/images/silver-full.png'} alt="Silver Stack" /> {ascean.currency.silver}
                    <br /><br />
                    <Button variant='' className='dialog-buttons inner' onClick={() => getLoot('physical-weapon')}>See the martial weapons available.</Button>
                    <br />
                    { merchantEquipment?.length > 0 ?
                        <MerchantTable table={merchantEquipment} gameDispatch={gameDispatch} ascean={ascean} error={error} setError={setError} />
                    : '' }
                </>
            : cityOption === 'Guild Hall' ?
                <>
                    <img src={process.env.PUBLIC_URL + `/images/` + 'Fyers' + '-' + 'Man' + '.jpg'} alt="Merchant" className='dialog-picture' style={{ borderRadius: "50%", border: "2px solid purple" }} />
                    {' '}Adecian (Stonemason)
                    <br />
                    "This is the Guild Hall. At the moment it is not a feature available. Concerning guild history; over time, the reach of Daethos and its most fierce preacher Lorian changed the minds of many across the land, showing the Ancient's hand in bloodshed of endless humans in their sacrificial war. 
                    <br /><br />
                    "In many places, outspoken adherence is met with disdain and even violence, as it is seen as absurd and shameful to uphold reverence for those beings who used much of this world and its people in their struggle against each other.
                    Currently, much worship appears clandestine, and many are used as avatars and symbols of craftsmen and merchants. <br /><br /> "Here, you can find those who suit your needs whether achreon or caerenic."
                </>
            : cityOption === 'Museum' ?    
                <>
                    <img src={process.env.PUBLIC_URL + `/images/` + 'Fyers' + '-' + 'Man' + '.jpg'} alt="Merchant" className='dialog-picture' style={{ borderRadius: "50%", border: "2px solid purple" }} />
                    {' '}Nyren (Observational Sage)
                    <br />
                    "This is a small post of the Sages. At the moment it is not a feature available. The Sages are a group of scholars who've been trained since children to study this world and its fascinations, in observation, notation, and machination. 
                    Much can be learned from simple conversations, if you so happen to catch them in the wild. Many belong to the Museum in Licivitas, though some are negotiated to aid in the provinces."
                </>
            : cityOption === 'Daeth' ?
                <>    
                    <img src={process.env.PUBLIC_URL + `/images/` + "Li'ivi" + '-' + 'Man' + '.jpg'} alt="Merchant" className='dialog-picture' style={{ borderRadius: "50%", border: "2px solid purple" }} />
                    {' '}Daestra (Lower Priest)
                    <br />
                    "This is the place of reverence and worship for Daethos. At the moment it is not a feature available. 
                    <br /><br />
                    "Daeth's are smaller, local temples that are often built in most cities of Licivitas, though some newer ones have been seen in the outer reaches of this world. 
                    These sources of faith for the devoted find themselves burgeoning during prayer and service, spreading their influence to many who have lost guidance from their Ancient's teachings."
                    <br /><br />
                    <Button variant='' className='dialog-buttons inner' onClick={() => handleRest()}>Rest for 1 Night.</Button>
        
                </>
            : '' }
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
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgba(0, 0, 0, 0.65)',
                zIndex: 9999,
            }}>
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