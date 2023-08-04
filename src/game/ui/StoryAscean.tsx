import AsceanImageCard from '../../components/AsceanImageCard/AsceanImageCard';
import Loading from '../../components/Loading/Loading';
import StoryHealthBar from './StoryHealthBar';
import LevelUpModal from '../../components/GameCompiler/LevelUpModal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ExperienceBar from '../../components/GameCompiler/ExperienceBar';
import { useEffect, useState } from 'react';
import PhaserInventoryBag from './PhaserInventoryBag';
import statPng from '../../game/images/newStats.png';
import Inventory from '../../components/GameCompiler/Inventory';
import AsceanAttributeCompiler from '../../components/AsceanAttributeCompiler/AsceanAttributeCompiler';
import * as settingsAPI from '../../utils/settingsApi';
import * as asceanAPI from '../../utils/asceanApi';
import { useNavigate } from 'react-router-dom';
import Firewater from '../../components/GameCompiler/Firewater';
import { useDispatch, useSelector } from 'react-redux';
import { getOnlyInventoryFetch, setAsceanState, setTutorialContent, setVolume } from '../reducers/gameState';
import { Player } from '../../components/GameCompiler/GameStore';
import {CombatSettings, GeneralSettings, InventorySettings, TacticSettings, ControlSettings} from '../../components/GameCompiler/SettingConcerns';
import { CombatData } from '../../components/GameCompiler/CombatStore';

export const viewCycleMap = {
    Character: 'Inventory',
    Inventory: 'Settings',
    Settings: 'Character'
};
const CHARACTERS = {
    STATISTICS: 'Statistics',
    TRAITS: 'Traits',
};
const VIEWS = {
    CHARACTER: 'Character',
    INVENTORY: 'Inventory',
    SETTINGS: 'Settings',
};
const SETTINGS = {
    ACTIONS: 'Actions',
    CONTROL: 'Control',
    INVENTORY: 'Inventory',
    GENERAL: 'General',
    TACTICS: 'Tactics',
};

interface Props {
    ascean: Player;
    asceanViews: string;
};

const StoryAscean = ({ ascean, asceanViews }: Props) => {
    const dispatch = useDispatch();
    const asceanState = useSelector((state: any) => state.game.asceanState);
    const gameState = useSelector((state: any) => state.game);
    const state = useSelector((state: any) => state.combat) as CombatData;
    const navigate = useNavigate();
    const [savingInventory, setSavingInventory] = useState(false);
    const [currentSetting, setCurrentSetting] = useState<string>('Control');
    const [currentCharacter, setCurrentCharacter] = useState('Statistics');
    const [playerTraitWrapper, setPlayerTraitWrapper] = useState<any>({});
    const [dragAndDropInventory, setDragAndDropInventory] = useState(ascean.inventory);
    const [highlighted, setHighlighted] = useState({ item: null as any, comparing: false });

    useEffect(() => {
        playerTraits();
    }, [ascean]);

    useEffect(() => {
        console.log("Checking Relevant Views");
        if (ascean.tutorial.firstInventory && ascean.inventory.length && asceanViews === 'Inventory') dispatch(setTutorialContent('firstInventory'));
    }, [ascean.tutorial, asceanViews, dispatch]);

    useEffect(() => {
        setDragAndDropInventory(ascean.inventory);
        checkHighlight();
    }, [ascean.inventory]);

    const checkHighlight = (): void => {
        if (highlighted?.item) {
            const item = ascean.inventory.find((item: any) => item._id === highlighted?.item?._id);
            if (!item) setHighlighted({ item: null, comparing: false });
        };
    };

    const saveInventory = async (inventory: any): Promise<void> => {
        try {
            setSavingInventory(true);
            const flattenedInventory = inventory.map((item: any) => item._id);
            const data = { ascean: ascean._id, inventory: flattenedInventory };
            await asceanAPI.saveAsceanInventory(data);
            dispatch(getOnlyInventoryFetch(ascean._id));
            setSavingInventory(false);
        } catch (err: any) {
            console.log(err, "Error Saving Inventory");
        };
    };

    const playerTraits = async (): Promise<void> => {
        const fetchTrait = async (trait: string) => {
            switch (trait) {
                case "Arbituous":
                    return {
                        name: "Arbituous",
                        traitOneName: "Luckout",
                        traitOneDescription: "Convince the enemy through rhetoric to cease hostility.",
                        traitTwoName: "Persuasion",
                        traitTwoDescription: "Use knowledge of Ley Law to deter enemies from aggression."
                    };
                case "Astral":
                    return {
                        name: "Astral",
                        traitOneName: "Impermanence",
                        traitOneDescription: "Perform combat maneuvers that are impossible to follow, and thus impossible to counter.",
                        traitTwoName: "Pursuit",
                        traitTwoDescription: "Force encounters, even with enemies that would normally avoid you."
                    };
                case "Cambiren":
                    return {
                        name: "Cambiren",
                        traitOneName: "Caerenicism",
                        traitOneDescription: "Your caer doubles up on attacks.",
                        traitTwoName: "Mini-Game",
                        traitTwoDescription: "You can disarm and evoke your enemy's caer into a battle of its own."
                    };
                case "Chiomic":
                    return {
                        name: "Choimic",
                        traitOneName: "Luckout",
                        traitOneDescription: "Invoke the Ancient Chiomyr, reducing the enemy to a broken mind of mockery.",
                        traitTwoName: "Persuasion",
                        traitTwoDescription: "Cause bouts of confusion and disorientation in the enemy."
                    };
                case "Fyeran":
                    return {
                        name: "Fyeran",
                        traitOneName: "Persuasion",
                        traitOneDescription: "You can convince those who see this world with peculiarity.",
                        traitTwoName: "Seer",
                        traitTwoDescription: "Your next attack is Fyers."
                    };
                case "Kyn'gian":
                    return {
                        name: "Kyn'gian",
                        traitOneName: "Avoidance",
                        traitOneDescription: "You can avoid most encounters.",
                        traitTwoName: "Endurance",
                        traitTwoDescription: "You are able to recover your health over time."
                    };
                case "Kyr'naic":
                    return {
                        name: "Kyr'naic",
                        traitOneName: "Luckout",
                        traitOneDescription: "Convince the enemy to acquiesce, giving their life to the Aenservaesai.",
                        traitTwoName: "Persuasion",
                        traitTwoDescription: "Cause the enemy to embrace the hush and tendril."
                    };
                case "Ilian":
                    return {
                        name: "Ilian",
                        traitOneName: "Heroism",
                        traitOneDescription: "You exude a nature that touches others inexplicably.",
                        traitTwoName: "Persuasion",
                        traitTwoDescription: "The weight of your words can sway the minds of others."
                    };
                case "Lilosian":
                    return {
                        name: "Lilosian",
                        traitOneName: "Luckout",
                        traitOneDescription: "Convince the enemy to profess their follies and willow.",
                        traitTwoName: "Persuasion",
                        traitTwoDescription: "Speak to your enemy's faith and stay their hand."
                    };
                case "Ma'anreic":
                    return {
                        name: "Ma'anreic",
                        traitOneName: "Negation",
                        traitOneDescription: "You can negate the armor of your enemy.",
                        traitTwoName: "Thievery",
                        traitTwoDescription: "You can steal items from anyone and anywhere."
                    };
                case "Sedyrist":
                    return {
                        name: "Sedyrist",
                        traitOneName: "Investigative",
                        traitOneDescription: "You have a knack for piecing together peculiarities.",
                        traitTwoName: "Tinkerer",
                        traitTwoDescription: "You can deconstruct and reconstruct armor and weapons."
                    };
                case "Se'van":
                    return {
                        name: "Se'van",
                        traitOneName: "Berserk",
                        traitOneDescription: "Your attacks grow stronger for each successive form of damage received.",
                        traitTwoName: "Mini-Game",
                        traitTwoDescription: "Grip your enemy in a vice of your own design."
                    };
                case "Shaorahi":
                    return {
                        name: "Shaorahi",
                        traitOneName: "Conviction",
                        traitOneDescription: "Your attacks grow stronger the more you realize them.",
                        traitTwoName: "Persuasion",
                        traitTwoDescription: "You can put the enemy in awe of your power, and have them cease their assault."
                    };
                case "Shrygeian":
                    return {
                        name: "Shrygeian",
                        traitOneName: "Knavery",
                        traitOneDescription: "Your explorations are amusing.",
                        traitTwoName: "Mini-Game",
                        traitTwoDescription: "You can duel the enemy."
                    };
                case "Tshaeral":
                    return {
                        name: "Tshaeral",
                        traitOneName: "Mini-Game",
                        traitOneDescription: "Your caer is imbued with tshaeral desire, a hunger to devour the world.",
                        traitTwoName: "Persuasion",
                        traitTwoDescription: "Your nature has a way of wilting the caer of your enemies."
                    };
                default: 
                    return {};
            };
        };
        setPlayerTraitWrapper({
            'primary': await fetchTrait(gameState.traits.primary.name),
            'secondary': await fetchTrait(gameState.traits.secondary.name),
            'tertiary': await fetchTrait(gameState.traits.tertiary.name)
        });
    };

    const saveGameSettings = async (): Promise<void> => {
        try {
            const settings = {
                mapMode: gameState.mapMode,
                joystickSpeed: gameState.joystickSpeed,
                soundEffectVolume: gameState.soundEffectVolume,
                timeLeft: gameState.timeLeft,
                moveTimer: gameState.moveTimer,
                shake: gameState.shake,
                canvasPosition: gameState.canvasPosition,
                canvasHeight: gameState.canvasHeight,
                canvasWidth: gameState.canvasWidth,
                vibrationTime: gameState.vibrationTime,
            };
            await settingsAPI.updateSettings(settings);
        } catch (err: any) {
            console.log(err, "Error Saving Game Settings");
        };
    };
    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => dispatch(setVolume(parseFloat(e.target.value)));
    const handleSettingChange = (e: any): void => setCurrentSetting(e.target.value); 
    const handleCharacterChange = (e: any): void => setCurrentCharacter(e.target.value);

    const createCharacterInfo = (character: string) => {
        switch (character) {
            case CHARACTERS.STATISTICS:
                const highestDeity = Object.entries(ascean?.statistics?.combat?.deities as { [key: string]: number }).reduce((a, b) => a?.[1] > b?.[1] ? a : b);
                const highestPrayer = Object.entries(ascean?.statistics?.combat?.prayers as { [key: string]: number }).reduce((a, b) => a?.[1] > b?.[1] ? a : b);
                let highestMastery = Object.entries(ascean?.statistics?.mastery as { [key: string]: number }).reduce((a, b) => a[1] > b[1] ? a : b);
                if (highestMastery?.[1] === 0) highestMastery = [ascean?.mastery, 0];
                return (
                    <>
                        <h6 style={{ color: '#fdf6d8', fontWeight: 600, textShadow: '2px 2px 2px purple' }}>Attacks</h6>
                        Magical: <p style={{ color: 'gold', display: 'inline' }}>{ascean?.statistics?.combat?.attacks?.magical}</p><br />
                        Physical: <p style={{ color: 'gold', display: 'inline' }}>{ascean?.statistics?.combat?.attacks?.physical}</p><br />
                        Highest Damage: <p style={{ color: 'gold', display: 'inline' }}>{Math.round(ascean?.statistics?.combat?.attacks?.total)}</p><br /><br />
                        <h6 style={{ color: '#fdf6d8', fontWeight: 600, textShadow: '2px 2px 2px purple' }}>Combat</h6>
                        Mastery: <p style={{ color: 'gold', display: 'inline' }}>{highestMastery[0].charAt(0).toUpperCase() + highestMastery[0].slice(1)} - {highestMastery[1]}</p><br />
                        Wins / Losses: <p style={{ color: 'gold', display: 'inline' }}>{ascean?.statistics?.combat?.wins} / {ascean?.statistics?.combat?.losses}</p><br /><br />
                        <h6 style={{ color: '#fdf6d8', fontWeight: 600, textShadow: '2px 2px 2px purple' }}>Prayers</h6>
                        Consumed / Invoked: <p style={{ color: 'gold', display: 'inline' }}>{ascean?.statistics?.combat?.actions?.consumes} / {ascean?.statistics?.combat?.actions?.prayers} </p><br />
                        Highest Prayer: <p style={{ color: 'gold', display: 'inline' }}>{highestPrayer[0].charAt(0).toUpperCase() + highestPrayer[0].slice(1)} - {highestPrayer[1]}</p><br />
                        Favored Deity: <p style={{ color: 'gold', display: 'inline' }}>{highestDeity[0]}</p><br />
                        Blessings: <p style={{ color: 'gold', display: 'inline' }}>{highestDeity[1]}</p>
                    </>
                );
            case CHARACTERS.TRAITS:
                return (
                    <>
                        <h6 style={{ color: '#fdf6d8', fontWeight: 600, textShadow: '2px 2px 2px purple' }}>{playerTraitWrapper?.primary?.name}</h6>
                            <p>{playerTraitWrapper?.primary?.traitOneName} - {playerTraitWrapper?.primary?.traitOneDescription}</p>
                            <p>{playerTraitWrapper?.primary?.traitTwoName} - {playerTraitWrapper?.primary?.traitTwoDescription}</p>
                        <h6 style={{ color: '#fdf6d8', fontWeight: 600, textShadow: '2px 2px 2px purple' }}>{playerTraitWrapper?.secondary?.name}</h6>
                            <p>{playerTraitWrapper?.secondary?.traitOneName} - {playerTraitWrapper?.secondary?.traitOneDescription}</p>
                            <p>{playerTraitWrapper?.secondary?.traitTwoName} - {playerTraitWrapper?.secondary?.traitTwoDescription}</p>
                        <h6 style={{ color: '#fdf6d8', fontWeight: 600, textShadow: '2px 2px 2px purple' }}>{playerTraitWrapper?.tertiary?.name}</h6>
                            <p>{playerTraitWrapper?.tertiary?.traitOneName} - {playerTraitWrapper?.tertiary?.traitOneDescription}</p>
                            <p>{playerTraitWrapper?.tertiary?.traitTwoName} - {playerTraitWrapper?.tertiary?.traitTwoDescription}</p>
                    </>
                );
            default:
                return ('');
        };
    };

    const createSettingInfo = (setting: string) => {
        switch (setting) {
            case SETTINGS.ACTIONS:
                return (
                    <CombatSettings /> 
                );
            case SETTINGS.INVENTORY:
                return (
                    <InventorySettings />
                );
            case SETTINGS.GENERAL:
                return (
                    <GeneralSettings />
                );
            case SETTINGS.TACTICS:
                return (
                    <TacticSettings />
                );
            case SETTINGS.CONTROL:
                return (
                    <ControlSettings />
                );
            default:
                return ('');
        };
    };

    const returnHome = () => navigate('/');

    return (
        <div style={{ zIndex: 9999 }}>
        <img src ={statPng} alt="Player Portrait" style={{ position: "absolute" }} />
        { asceanViews === VIEWS.CHARACTER ? (
            <>
            <h3 className='story-menu-heading'>
            Character
            </h3>
            <Form.Select value={currentCharacter} onChange={handleCharacterChange} style={{ position: "absolute", width: "25%", left: "67.5%", top: "11%", background: "black", color: "#fdf6d8", borderColor: "#fdf6d8", textAlign: "center", paddingRight: '0.75rem' }}>
                <option value="Statistics">Statistics</option>
                <option value="Traits">Traits</option> 
            </Form.Select>
            </>
        ) : asceanViews === VIEWS.INVENTORY ? (
            <>
            <h3 className='story-menu-heading'>
            Inventory
            </h3> 
            <Firewater story={true} />
            <div className='story-save-inventory-outer'>
                <Button size='sm' onClick={() => saveInventory(dragAndDropInventory)} variant='' className='story-save-inventory'>
                { savingInventory ? ( 
                    <Loading NavBar={true} /> 
                ) : ( 
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 512 512">
                        <path d="M29.438 59.375c-3.948.032-7.903.093-11.875.188 4.333 2.772 8.685 5.483 13.062 8.124C126.162 123.92 230.69 151.4 340.5 180.594c.022.006.04.025.063.03.02.006.043-.004.062 0 1.87.498 3.72 1.003 5.594 1.5l.155-.53c.947.078 1.91.125 2.875.125 4.26 0 8.34-.767 12.125-2.19l-12.5 46.595 18.063 4.813L383 170.968c25.828 1.312 50.508 6.867 74.28 15.845-1.065 11.948 2.73 21.82 9.814 23.718 8.71 2.335 19.136-8.313 23.28-23.78 1.27-4.742 1.78-9.366 1.657-13.594l.345-1.28c-.136-.008-.27-.025-.406-.032-.56-8.924-4.116-15.77-9.876-17.313-6.808-1.823-14.666 4.304-19.75 14.44-25.275-3.725-49.624-10.894-72.47-23.69l16.345-60.968-18.033-4.843-12.093 45.155c-3.24-3.908-7.318-7.1-11.938-9.313l.094-.374C250.12 83.98 144.89 58.446 29.437 59.374zm161.25 44.25c55.52-.002 105.272 12.492 159.656 27.03 8.536.55 15.094 7.463 15.094 16.157 0 9.06-7.127 16.22-16.188 16.22-2.4 0-4.653-.5-6.688-1.407-56.172-15.04-109.352-27.786-157.406-57.97 1.85-.027 3.694-.03 5.53-.03zm-46.22 164.25v20.344H55.532c15.996 38.806 51.258 65.428 88.94 74.28v32.97h58.56c-12.115 30.534-33.527 55.682-58.5 77.592h-25.436v18.72h284.344v-18.72H376c-28.728-21.894-50.024-47.016-61.594-77.593h63.656V366.31c19.75-6.995 39.5-19.54 59.25-36.718-19.806-17.518-39.235-27.25-59.25-31.938v-29.78H144.47z"></path>
                    </svg>
                ) }
                </Button>
            </div>
            </>
        ) : asceanViews === VIEWS.SETTINGS ? (
            <>
            <h3 className='story-menu-heading'>
            Settings
            </h3>
            <Form.Select value={currentSetting} onChange={handleSettingChange} style={{ position: "absolute", width: "25%", left: "67.5%", top: "11%", background: "black", color: "#fdf6d8", borderColor: "#fdf6d8", textAlign: "center", paddingRight: '0.75rem' }}>
                <option value="Actions">Actions</option> 
                <option value="Control">Control</option>
                <option value="General">General</option>
                <option value="Inventory">Inventory</option>
                <option value="Tactics">Tactics</option>
            </Form.Select>
            </>
        ) : ( '' ) }
        <div className="story-block" style={{ zIndex: 9999, fontFamily: "Cinzel", }}>
            <div className='story-ascean'> 
                { ascean.experience === ascean.level * 1000 ? (
                    <LevelUpModal asceanState={asceanState} setAsceanState={setAsceanState} story={true} />
                ) : ( '' ) } 
                <div style={{ textAlign: 'center', color: "#fdf6d8", width: '96%' }}>
                    {state.player.name}
                </div>
                <div style={{ textAlign: "center", marginBottom: "15%" }}>
                    <StoryHealthBar totalPlayerHealth={state.playerHealth} currentPlayerHealth={state.newPlayerHealth} />
                </div>
                <AsceanImageCard
                    weapon_one={state.weapons[0]}
                    weapon_two={state.weapons[1]}
                    weapon_three={state.weapons[2]}
                    shield={ascean.shield}
                    helmet={ascean.helmet}
                    chest={ascean.chest}
                    legs={ascean.legs}
                    amulet={ascean.amulet}
                    ring_one={ascean.ring_one}
                    ring_two={ascean.ring_two}
                    trinket={ascean.trinket}
                    gameDisplay={true}
                    loading={false}
                    damage={state.playerDamaged}
                    key={ascean._id}
                    story={true}
                />
                <ExperienceBar totalExperience={ascean.level * 1000} currentExperience={ascean.experience} story={true} />
            </div>
        </div>
        <div className='story-window-two'>
            { asceanViews === VIEWS.CHARACTER ? (
                <div style={{ display: "inline" }}>
                    <span id="popover-spec-image"><img src={process.env.PUBLIC_URL + '/images/' + state.player.origin + '-' + state.player.sex + '.jpg'} alt="Origin Culture Here" id="origin-pic" /></span>
                    <div className='creature-heading'>
                        <h2 style={{ fontSize: "14px", color: "gold" }}>{state.player.description}</h2>
                    </div>
                    <div className='property-line' style={{ fontSize: '12px' }}>
                        Level: <p style={{ color: "gold" }}>{state.player.level}</p><br />
                        {ascean.currency?.silver ? <>Silver: <p style={{ color: "gold" }}>{ascean.currency.silver}</p> Gold: <p style={{ color: "gold" }}>{ascean.currency.gold} <br /></p></> : '' }
                        Mastery: <p style={{ color: "gold" }}>{state.player.mastery}</p><br />
                        Magical Defense: <p style={{ color: "gold" }}>{state.playerDefense.magicalDefenseModifier}% / [{state.playerDefense.magicalPosture}%]</p><br />
                        Physical Defense: <p style={{ color: "gold" }}>{state.playerDefense.physicalDefenseModifier}% / [{state.playerDefense.physicalPosture}%]</p><br />
                        Initiative: <p style={{ color: "gold" }}>{state.playerAttributes.initiative}</p>
                    </div>
                    <AsceanAttributeCompiler ascean={state.player} story={true} />
                </div>
            ) : asceanViews === VIEWS.INVENTORY ? (
                <>
                { highlighted.comparing ? (
                    <Inventory bag={ascean.inventory} inventory={highlighted.item} ascean={ascean} index={0} compare={true} story={true} />
                ) : ( '' ) }
                </> 
            ) : asceanViews === VIEWS.SETTINGS ? (
                <div style={{ justifyContent: "center", alignItems: "center", height: "100%" }}>
                    <h5 style={{ color: 'gold', marginLeft: 'auto' }}>
                        Gameplay Controls
                    <Button variant='' onClick={saveGameSettings} style={{ position: 'absolute', top: '-5px' }}>
                        <span style={{ float: "right", color: "gold", fontSize: "10px" }}>Save</span>
                    </Button>
                    </h5>
                    <br />
                    <h6>
                        <span style={{ float: "left" }}></span>
                        Sound Volume ({gameState.soundEffectVolume})
                        <span style={{ float: "right" }}></span>
                    </h6>
                    <Form.Range value={gameState.soundEffectVolume} onChange={handleVolumeChange} min={0} max={1} step={0.1} /><br />
                    
                    <Button variant='' style={{ color: 'gold', marginTop: '80%' }} onClick={returnHome}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-return-left" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z"/>
                    </svg> Return Home</Button>
                </div>
            ) : ( '' ) }
        </div>
        <div className='story-window-three'>
            { asceanViews === VIEWS.CHARACTER ? (
                <div style={{ height: "100%", padding: '0.25rem' }}> 
                    {createCharacterInfo(currentCharacter)}
                </div>
            ) : asceanViews === VIEWS.INVENTORY ? (
                <PhaserInventoryBag setDragAndDropInventory={setDragAndDropInventory} dragAndDropInventory={dragAndDropInventory} highlighted={highlighted} setHighlighted={setHighlighted} /> 
            ) : asceanViews === VIEWS.SETTINGS ? (
                <div className='p-2' style={{ overflowY: "scroll", scrollbarWidth: "none", height: "100%" }}>{createSettingInfo(currentSetting)}</div>
            ) : ( '' ) }
        </div>
        </div>
    );
};

export default StoryAscean;