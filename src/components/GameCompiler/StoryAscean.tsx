import AsceanImageCard from '../AsceanImageCard/AsceanImageCard';
import Loading from '../Loading/Loading';
import StoryHealthBar from './StoryHealthBar';
import LevelUpModal from '../../game/LevelUpModal';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion'; 
import Form from 'react-bootstrap/Form';
import ExperienceBar from './ExperienceBar';
import { useEffect, useState } from 'react';
import PhaserInventoryBag from '../../game/PhaserInventoryBag';
import { GAME_ACTIONS, GameData } from './GameStore';
import statPng from '../../game/images/newStats.png';
import Inventory from './Inventory';
import AsceanAttributeCompiler from '../AsceanAttributeCompiler/AsceanAttributeCompiler';
import * as settingsAPI from '../../utils/settingsApi';
import * as asceanAPI from '../../utils/asceanApi';
import { useNavigate } from 'react-router-dom';
import Firewater from './Firewater';

interface Props {
    ascean: any;
    state: any;
    dispatch: React.Dispatch<any>;
    loading: boolean;
    gameState: GameData;
    gameDispatch: React.Dispatch<any>;
    asceanState: any;
    setAsceanState: any;
    levelUpAscean: any;
    damaged?: boolean;
    asceanViews: string;
};

const StoryAscean = ({ ascean, state, dispatch, loading, asceanState, setAsceanState, levelUpAscean, damaged, gameState, gameDispatch, asceanViews }: Props) => {
    const [savingInventory, setSavingInventory] = useState(false);
    const [currentSetting, setCurrentSetting] = useState<string>('Actions');
    const [currentCharacter, setCurrentCharacter] = useState('Traits');
    const [playerTraitWrapper, setPlayerTraitWrapper] = useState<any>({});
    const [dragAndDropInventory, setDragAndDropInventory] = useState(gameState.player.inventory);
    const navigate = useNavigate();
    const [highlighted, setHighlighted] = useState({
        item: null,
        comparing: false,
    });
    const CHARACTERS = {
        STATISTICS: 'Statistics',
        TRAITS: 'Traits',
    }

    const VIEWS = {
        CHARACTER: 'Character',
        INVENTORY: 'Inventory',
        SETTINGS: 'Settings',
    };
    const SETTINGS = {
        ACTIONS: 'Actions',
        INVENTORY: 'Inventory',
        GENERAL: 'General',
        TACTICS: 'Tactics',
    };

    useEffect(() => {
        console.log(asceanState)
    }, [asceanState]);

    useEffect(() => {
        playerTraits();
        console.log(ascean.statistics, "Stats!")
    }, [ascean]);

    useEffect(() => {
        setDragAndDropInventory(gameState.player.inventory);
    }, [gameState.player.inventory]);

    const saveInventory = async (inventory: any) => {
        try {
            setSavingInventory(true);
            const flattenedInventory = inventory.map((item: any) => item._id);
            const data = { ascean: ascean._id, inventory: flattenedInventory };
            await asceanAPI.saveAsceanInventory(data);
            gameDispatch({ type: GAME_ACTIONS.REPOSITION_INVENTORY, payload: true });
            setSavingInventory(false);
        } catch (err: any) {
            console.log(err, "Error Saving Inventory");
        };
    };

    const playerTraits = async () => {
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
            'primary': await fetchTrait(gameState.primary.name),
            'secondary': await fetchTrait(gameState.secondary.name),
            'tertiary': await fetchTrait(gameState.tertiary.name)
        });
    };

    const saveGameSettings = async () => {
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
            console.log(err, "Error Saving Map Settings")
        };
    };

    function handleVolumeChange(e: React.ChangeEvent<HTMLInputElement>) {
        let volume = parseFloat(e.target.value);
        gameDispatch({ type: GAME_ACTIONS.SET_VOLUME, payload: volume });
    }; 

    const handleSettingChange = (e: any) => {
        setCurrentSetting(e.target.value);
    };

    const handleCharacterChange = (e: any) => setCurrentCharacter(e.target.value);

    const createCharacterInfo = (character: string) => {
        switch (character) {
            case CHARACTERS.STATISTICS:
                const highestDeity = Object.entries(ascean?.statistics?.combat?.deities as { [key: string]: number }).reduce((a, b) => a[1] > b[1] ? a : b);
                const highestPrayer = Object.entries(ascean?.statistics?.combat?.prayers as { [key: string]: number }).reduce((a, b) => a[1] > b[1] ? a : b);
                const highestMastery = Object.entries(ascean?.statistics?.mastery as { [key: string]: number }).reduce((a, b) => a[1] > b[1] ? a : b);
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
                    <>
                        <p style={{ color: 'gold' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 512 512">
                        <path d="M311.313 25.625l-23 10.656-29.532 123.032 60.814-111.968-8.28-21.72zM59.625 50.03c11.448 76.937 48.43 141.423 100.188 195.75 14.133-9.564 28.405-19.384 42.718-29.405-22.156-27.314-37.85-56.204-43.593-86.28-34.214-26.492-67.613-53.376-99.312-80.064zm390.47.032C419.178 76.1 386.64 102.33 353.31 128.22c-10.333 58.234-58.087 112.074-118.218 158.624-65.433 50.654-146.56 92.934-215.28 121.406l-.002 32.78c93.65-34.132 195.55-81.378 276.875-146.592C375.72 231.06 435.014 151.375 450.095 50.063zm-236.158 9.344l-8.5 27.813 40.688 73.06-6.875-85.31-25.313-15.564zm114.688 87.813C223.39 227.47 112.257 302.862 19.812 355.905V388c65.917-27.914 142.58-68.51 203.844-115.938 49.83-38.574 88.822-81.513 104.97-124.843zm-144.563 2.155c7.35 18.89 19.03 37.68 34 56.063 7.03-4.98 14.056-10.03 21.094-15.094-18.444-13.456-36.863-27.12-55.094-40.97zM352.656 269.72c-9.573 9.472-19.58 18.588-29.906 27.405 54.914 37.294 117.228 69.156 171.906 92.156V358.19c-43.86-24.988-92.103-55.13-142-88.47zm-44.906 39.81c-11.65 9.32-23.696 18.253-36.03 26.845C342.046 381.51 421.05 416.15 494.655 442.75v-33.22c-58.858-24.223-127.1-58.727-186.906-100zm-58.625 52.033l-46.188 78.25 7.813 23.593 27.75-11.344 10.625-90.5zm15.844.812L316.343 467l36.47 10.28-3.533-31.967-84.31-82.938z"></path>
                        </svg>{' '}
                        Combat - When you wish to attack, choose one of the actions* and hit initiate. You and your opponents actions are chosen anonymously and resolve simultaneously, from a set priority of actions coupled with initiative. Certain actions, if successful, may cancel out the opponents or otherwise.<br /><br />
                        *recorded for confirmation in the combat reader window </p>
                        <br />
                        <p style={{ color: '#fdf6d8' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 512 512">
                        <path d="M261.094 16.03l-18.688.032.063 33.282c-15.95.64-31.854 3.145-47.595 7.53l-10.22-33.28-17.874 5.468 10.345 33.594c-12.496 4.636-24.867 10.44-37.03 17.438l-19.126-30.5-15.814 9.906 19.063 30.47c-10.68 7.15-21.16 15.22-31.44 24.218L66.907 90.124l-12.75 13.688 24.875 23.124c-2.465 2.406-4.937 4.83-7.374 7.344l-6.28 6.5 6.28 6.5c54.467 56.233 116.508 85.097 178.906 85.095 62.4-.002 124.43-28.87 178.907-85.094l6.28-6.5-6.28-6.5c-2.38-2.455-4.782-4.835-7.19-7.186l25-23.28-12.717-13.69-26.032 24.22c-9.15-8.024-18.462-15.315-27.936-21.875l19.312-30.782-15.812-9.938-19.188 30.594c-12.823-7.665-25.888-14.007-39.094-19.03l10.313-33.533-17.875-5.468-10.156 33.063c-15.513-4.467-31.21-7.082-46.938-7.906l-.062-33.44zM250.53 70.25c39.147 0 70.69 31.51 70.69 70.656s-31.543 70.688-70.69 70.688c-39.145 0-70.655-31.542-70.655-70.688 0-39.145 31.51-70.656 70.656-70.656zm64.69 9.063c32.377 11.564 64.16 31.955 94.28 61.468-30.015 29.402-61.683 49.757-93.938 61.345 15.08-16.01 24.344-37.562 24.344-61.22 0-23.838-9.4-45.545-24.687-61.593zm-129.408.03c-15.27 16.045-24.656 37.74-24.656 61.563 0 23.64 9.25 45.18 24.313 61.188-32.218-11.596-63.837-31.944-93.814-61.313 30.092-29.474 61.823-49.863 94.156-61.436zm64.75 10.813c-27.99 0-50.687 22.696-50.687 50.688 0 27.99 22.696 50.656 50.688 50.656 27.99 0 50.687-22.667 50.687-50.656 0-27.992-22.696-50.688-50.688-50.688zm78.875 146.406c-25.884 9.117-52.37 13.72-78.875 13.72-16.853 0-33.69-1.897-50.375-5.595l59.594 51.125-93.686 2.5L419.53 492.188l-85.81-144.375 71.53-.718-75.813-110.53z"></path>
                        </svg>{' '}
                        Invoke - Your Mastery and Adherence or Devotion dictate what you can perform in an instant, a potentially damaging or life saving decision. As you grow, so too does your ability to sway chance.
                        </p>
                        <br />
                        <p style={{ color: 'gold' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 512 512">
                        <path d="M45.95 14.553c-19.38.81-30.594 11.357-30.282 30.283l19.768 30.78c4.43-1.213 9.36-3.838 14.248-7.335l42.474 59.935c-17.018 20.83-31.258 44.44-42.71 70.836l26.55 26.552c11.275-23.6 24.634-44.826 39.918-63.864l210.82 297.475 166.807 33.213L460.33 325.62 162.78 114.745c19.907-16.108 41.842-29.91 65.652-41.578l-26.553-26.55c-27.206 11.803-51.442 26.576-72.735 44.292L69.39 48.56c3.443-4.823 6.062-9.735 7.342-14.242l-30.78-19.765zm400.84 86.933v.008l.003-.008h-.002zm0 .008l-28.028 124.97-25.116-80.593-18.105 70.667-26.862-49.64-.584 57.818 128.484 91.69 15.184 87.017-1.168-186.885-34.457 39.713-9.346-154.756zm-300.95 27.98l222.224 196.368 25.645 66.75-66.75-25.645L130.6 144.734c4.91-5.278 9.995-10.36 15.238-15.26zm32.305 196.274v.004h.005l-.005-.004zm.005.004l28.028 22.775-36.21 4.088 57.82 19.272-105.706 4.09 115.05 27.45L136.1 422.114l127.316 25.696-67.164 43.803 208.494 1.752-87.017-15.185-104.54-150.676-35.037-1.752z"></path>
                        </svg>{' '}
                        Attack - A focused attack concentrating your offensive might into extraordinary potential, unleashing dual wield techniques if you are of the competence and orientation. 
                        </p>
                        <br />
                        <p style={{ color: '#fdf6d8' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 56.821 56.821">
                        <path d="M33.824,25.852c-3.307-1.56-6.611-3.119-9.917-4.679c-0.055-0.042-0.108-0.084-0.166-0.123    c-0.682-0.451-1.402-0.623-2.1-0.579c-0.17-0.046-0.346-0.079-0.531-0.079H9.882c-1.128,0-2.042,0.914-2.042,2.042    c0,1.127,0.914,2.042,2.042,2.042h5.121L0.001,34.79l5.612,3c-1.632,1.777-3.294,3.529-4.974,5.264    c-1.866,1.928,0.766,5.221,2.654,3.27c2.071-2.141,4.122-4.301,6.13-6.5l6.438,3.438l0.707-3.569    c1.818,2.002,2.945,4.479,3.581,7.53c0.553,2.658,4.686,1.845,4.132-0.815c-0.997-4.789-3.116-8.732-6.738-11.572    c0.168-0.154,0.327-0.324,0.475-0.506c2.236-2.76,4.47-5.521,6.705-8.279c2.587,1.221,5.175,2.441,7.763,3.662    C34.871,30.835,36.178,26.962,33.824,25.852z"></path>
                        <path d="M23.805,19.747c2.016,0.261,3.863-1.161,4.124-3.177l-7.3-0.946    C20.367,17.64,21.789,19.486,23.805,19.747z"></path>
                        <path d="M38.471,27.234c-0.287-1.164-1.336-2.293-2.588-2.517v5.343c1.252,0.225,2.301-0.863,2.588-2.027    h18.35v-0.799H38.471z"></path>
                        <path d="M17.922,9.397c0.065,0.161,0.12,0.309,0.246,0.434c0.125,0.125,0.293,0.169,0.474,0.174    c-0.121,0.357-0.135,0.722,0.15,0.976s0.613,0.185,0.911,0c0.07,0.324,0.18,0.635,0.369,0.882c0.055,0.07,0.116,0.128,0.179,0.177    c0.048,0.187,0.084,0.376,0.115,0.565c-0.427,0.161-0.756,0.54-0.819,1.022c-0.093,0.699,0.399,1.339,1.099,1.432l8.325,1.098    c0.697,0.092,6.194-2.808,2.588-4.033c-1.405-0.478-3.051-0.412-4.619-0.187c-0.28-0.265-0.655-0.43-1.07-0.43h-2.676    c-0.757,0-1.387,0.541-1.529,1.257c-0.1-0.013-0.193-0.032-0.271-0.062c-0.036-0.282-0.086-0.561-0.156-0.835    c0.01-0.011,0.018-0.021,0.027-0.035c0.259-0.377,0.167-0.973,0.061-1.38c-0.174-0.67-0.626-1.257-1.151-1.69    c-0.1-0.083-0.207-0.117-0.31-0.12c-0.261-0.195-0.507-0.412-0.806-0.546c-0.402-0.181-0.822-0.151-1.239-0.049    c-0.297,0.073-0.467,0.499-0.274,0.748C17.696,8.985,17.844,9.2,17.922,9.397z"></path>
                        </svg>{' '}
                        Counter - Your opponent, whether man or machine, will change its preference of attacks based on their own abilitiy and yours, in addition to your preference of actions. Successfully countering the specific action of the enemy rewards an attack thricefold in power.
                        </p>
                        <br />
                        <p style={{ color: 'gold' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 512 512">
                        <path d="M48.906 19.656v10.782c0 103.173 10.53 206.07 41.313 289.53 30.78 83.463 82.763 148.094 164.53 170.563l2.188.626 2.25-.5c89.686-19.12 142.322-84.028 171.187-168.344 28.865-84.315 35.406-188.656 35.406-291.875v-10.78l-10.655 1.53C323.26 39.954 191.452 40 59.595 21.188l-10.69-1.53zM67.75 41.03c63.242 8.536 126.495 12.792 189.75 12.782v184.532h174.78c-4.905 27.572-11.31 53.747-19.592 77.937-27.348 79.884-73.757 137.33-155.157 155.564-.008-.003-.02.003-.03 0v-233.5H86.53c-12.87-60.99-18.277-128.81-18.78-197.313z"></path>
                        </svg>{' '}
                        Posture - This low priority attack focuses on leaning into your stalwart nature, accepting the fate of a strike while using your shield's defense as an additional bulwark. 
                        </p>
                        <br />
                        <p style={{ color: '#fdf6d8' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 512 512">
                        <path d="M454.609,111.204L280.557,6.804C272.992,2.268,264.503,0,255.999,0c-8.507,0-16.995,2.268-24.557,6.796   L57.391,111.204c-5.346,3.202-9.917,7.369-13.556,12.192l207.904,124.708c2.622,1.575,5.9,1.575,8.519,0L468.16,123.396   C464.524,118.573,459.951,114.406,454.609,111.204z M157.711,130.313c-10.96,7.611-28.456,7.422-39.081-0.452   c-10.618-7.859-10.342-20.413,0.618-28.031c10.964-7.626,28.46-7.422,39.081,0.438C168.95,110.134,168.674,122.68,157.711,130.313z    M274.159,131.021c-10.594,7.362-27.496,7.166-37.762-0.429c-10.263-7.596-9.992-19.727,0.599-27.089   c10.591-7.362,27.492-7.174,37.759,0.43C285.018,111.528,284.75,123.659,274.159,131.021z M391.908,132.702   c-10.964,7.618-28.461,7.414-39.085-0.444c-10.617-7.86-10.343-20.42,0.621-28.046c10.957-7.61,28.456-7.422,39.078,0.452   C403.147,112.523,402.868,125.076,391.908,132.702z"></path>
                        <path d="M246.136,258.366L38.007,133.523c-2.46,5.802-3.798,12.117-3.798,18.62v208.084   c0,16.773,8.797,32.311,23.182,40.946l174.051,104.392c5.829,3.497,12.204,5.629,18.714,6.435V265.464   C250.156,262.556,248.63,259.858,246.136,258.366z M75.845,369.736c-12.056-6.57-21.829-21.671-21.829-33.727   c0-12.056,9.773-16.502,21.829-9.932c12.056,6.571,21.826,21.671,21.826,33.728C97.671,371.861,87.901,376.307,75.845,369.736z    M75.845,247.87c-12.056-6.579-21.829-21.679-21.829-33.728c0-12.056,9.773-16.502,21.829-9.931   c12.056,6.57,21.826,21.671,21.826,33.728C97.671,249.987,87.901,254.44,75.845,247.87z M197.715,436.158   c-12.052-6.57-21.826-21.671-21.826-33.728c0-12.048,9.773-16.494,21.826-9.924c12.056,6.571,21.826,21.671,21.826,33.72   C219.541,438.284,209.771,442.729,197.715,436.158z M197.715,314.292c-12.052-6.571-21.826-21.671-21.826-33.728   s9.773-16.502,21.826-9.931c12.056,6.57,21.826,21.671,21.826,33.727C219.541,316.417,209.771,320.862,197.715,314.292z"></path>
                        <path d="M473.993,133.523l-208.13,124.843c-2.494,1.492-4.02,4.19-4.02,7.099V512   c6.511-0.806,12.886-2.938,18.714-6.435l174.052-104.392c14.38-8.635,23.182-24.173,23.182-40.946V152.142   C477.791,145.64,476.453,139.325,473.993,133.523z M370.478,355.11c-19.287,10.512-34.922,3.398-34.922-15.892   c0-19.282,15.635-43.447,34.922-53.951c19.293-10.519,34.925-3.406,34.925,15.884C405.403,320.434,389.771,344.598,370.478,355.11z   "></path>
                        </svg>{" "}
                        Roll - This gambles fate with your weapon's roll chance. It's risk/reward as your ability to do heightened damage and avoiding an attack is offset by performing reduced damage as a result of your stilted stunt. 
                        </p>
                    </>
                );
            case SETTINGS.INVENTORY:
                return (
                    <>
                    <p style={{ color: '#fdf6d8' }}>
                    Loot - Equipment and its improvement is paramount to your success as you gain power to combat tougher enemies. No item is unique and can be held and worn in multiplicity. You can also use your gear to craft higher quality items. Common and Uncommon quality scale with leveling, yet Rare and Epic are refined to a degree that even a novice would feel its improvement.
                    </p><br />
                    <p style={{ color: 'gold' }}>
                    Inventory - Here you are able to view item statistics, and inspect for use in various ways. If you are of the mind, you may even be able to find a way to tinker with them.
                    </p><br />
                    <p style={{ color: '#fdf6d8' }}>
                    Remove - This will remove the item from your inventory, and permanently destroy it.
                    </p>
                    <br />
                    <p style={{ color: 'gold' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 512 512">
                    <path d="M29.438 59.375c-3.948.032-7.903.093-11.875.188 4.333 2.772 8.685 5.483 13.062 8.124C126.162 123.92 230.69 151.4 340.5 180.594c.022.006.04.025.063.03.02.006.043-.004.062 0 1.87.498 3.72 1.003 5.594 1.5l.155-.53c.947.078 1.91.125 2.875.125 4.26 0 8.34-.767 12.125-2.19l-12.5 46.595 18.063 4.813L383 170.968c25.828 1.312 50.508 6.867 74.28 15.845-1.065 11.948 2.73 21.82 9.814 23.718 8.71 2.335 19.136-8.313 23.28-23.78 1.27-4.742 1.78-9.366 1.657-13.594l.345-1.28c-.136-.008-.27-.025-.406-.032-.56-8.924-4.116-15.77-9.876-17.313-6.808-1.823-14.666 4.304-19.75 14.44-25.275-3.725-49.624-10.894-72.47-23.69l16.345-60.968-18.033-4.843-12.093 45.155c-3.24-3.908-7.318-7.1-11.938-9.313l.094-.374C250.12 83.98 144.89 58.446 29.437 59.374zm161.25 44.25c55.52-.002 105.272 12.492 159.656 27.03 8.536.55 15.094 7.463 15.094 16.157 0 9.06-7.127 16.22-16.188 16.22-2.4 0-4.653-.5-6.688-1.407-56.172-15.04-109.352-27.786-157.406-57.97 1.85-.027 3.694-.03 5.53-.03zm-46.22 164.25v20.344H55.532c15.996 38.806 51.258 65.428 88.94 74.28v32.97h58.56c-12.115 30.534-33.527 55.682-58.5 77.592h-25.436v18.72h284.344v-18.72H376c-28.728-21.894-50.024-47.016-61.594-77.593h63.656V366.31c19.75-6.995 39.5-19.54 59.25-36.718-19.806-17.518-39.235-27.25-59.25-31.938v-29.78H144.47z"></path>
                    </svg>{' '}- The inventory itself can be changed with dragging and dropping your items to realign them as you see fit. This allows you to save the position of your inventory.
                    </p>
                    </>
                );
            case SETTINGS.GENERAL:
                return (
                    <>
                    <p style={{ color: 'gold' }}>
                    <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" width="28" height="28" viewBox="0 0 1000 1000">
                    <path transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)" d="M4251.8,4993.3c-85-27-174.1-78.8-217.6-126.4c-82.9-93.3-201-165.8-273.6-165.8c-82.9,0-161.7,72.5-182.4,165.8c-29,134.7-107.8,107.8-167.9-56c-66.3-190.7-10.4-366.8,151.3-476.7c184.4-120.2,304.7-109.8,538.9,47.7c76.7,53.9,209.3,132.6,294.3,178.2c130.6,70.5,174.1,85,279.8,85c70.5,0,147.1-10.4,174.1-24.9c41.5-22.8,45.6-20.7,45.6,26.9c0,130.6-126.4,277.7-286,331.6C4508.8,5014,4340.9,5020.2,4251.8,4993.3z"></path>
                    <path transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)" d="M3014.5,4576.7c-85-35.2-116.1-109.8-99.5-246.6c14.5-120.2,12.4-124.4-37.3-136.8c-26.9-8.3-97.4-4.2-155.4,6.2l-105.7,18.7l33.2-64.3c18.6-35.2,82.9-116.1,145.1-180.3c223.8-234.2,588.6-323.3,922.3-221.8c116.1,33.1,277.7,184.5,292.2,269.4c8.3,37.3,18.7,89.1,26.9,114l12.4,47.7l-97.4-43.5c-126.4-56-310.9-72.5-414.5-39.4c-153.4,51.8-342,273.6-342,404.1c0,37.3-14.5,58-53.9,72.5C3078.8,4601.6,3074.6,4601.6,3014.5,4576.7z"></path>
                    <path transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)" d="M4513,4506.3c-124.4-45.6-223.8-138.9-292.2-271.5c-56-109.8-62.2-140.9-62.2-319.2c0-225.9,31.1-310.9,136.8-364.8c33.2-18.6,93.3-82.9,132.6-145.1c93.3-143,172-172,375.1-138.9c147.2,24.9,188.6,51.8,277.7,180.3c111.9,161.7,159.6,474.6,103.6,677.7c-33.1,120.2-147.1,269.4-252.8,333.7C4815.5,4531.1,4635.2,4551.8,4513,4506.3z M5068.4,4149.8c49.7-103.6,62.2-308.8,29-420.7c-43.5-143-68.4-145.1-257-37.3c-161.7,93.3-344,159.6-437.3,159.6c-41.5,0-47.7,10.4-47.7,89.1v89.1l161.7,24.9c107.8,16.6,203.1,47.7,294.3,95.3C4987.6,4243,5022.8,4243,5068.4,4149.8z"></path>
                    <path transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)" d="M4253.9,3196.4c-47.7-68.4-49.7-76.7-18.7-128.5c39.4-68.4,252.8-215.5,371-252.9c82.9-29,91.2-26.9,217.6,39.4c147.1,76.7,298.4,211.4,298.4,265.3c0,20.7-18.7,60.1-41.5,89.1l-39.4,51.8l-47.7-45.6c-157.5-149.2-480.8-147.1-638.3,4.2l-51.8,49.7L4253.9,3196.4z"></path>
                    <path transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)" d="M3858,3026.5c-97.4-29-178.2-53.9-180.3-53.9c-6.2-4.2,217.6-1900.5,223.8-1906.7c6.2-4.2,594.8-244.6,675.6-275.7c22.8-8.3,26.9,170,24.9,918.1v930.5l-167.9,80.8c-180.3,85-337.8,223.8-360.6,310.9c-6.2,29-18.7,53.9-26.9,51.8C4040.4,3080.4,3955.5,3055.5,3858,3026.5z"></path>
                    <path transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)" d="M5230,2983c-58-93.3-252.8-246.6-402.1-315l-58-24.9v-930.6c0-509.8,6.2-928.5,16.6-926.4c8.3,0,159.6,64.2,335.8,138.8c269.4,118.1,321.2,147.1,317.1,180.3c-41.5,352.3-60.1,1268.4-33.1,1550.2l12.4,143l118.1-14.5c111.9-12.4,120.2-10.4,130.6,35.2c18.7,66.3,18.7,161.7-2.1,161.7c-8.3,0-95.3,22.8-194.8,49.7l-178.2,49.7L5230,2983z"></path>
                    <path transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)" d="M3447.7,2518.7l-109.8-240.4l53.9-232.1c29-126.4,51.8-234.2,51.8-238.3c0-4.1,56-35.2,126.4-70.5l124.4-64.3l-10.4,68.4c-6.2,37.3-35.2,273.6-66.3,524.3c-29,250.8-53.9,464.2-58,474.6C3557.5,2750.8,3507.8,2651.4,3447.7,2518.7z"></path>
                    <path transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)" d="M6705.7,2688.7c-18.7-31.1-234.2-134.7-360.6-174.1c-68.4-20.7-221.8-41.5-383.4-49.7l-269.4-12.4l6.2-362.7C5729.5,361.2,6108.8-915.4,6685-1218c109.8-56,116.1-58,182.4-24.9c335.8,161.7,625.9,713,771,1467.3c95.3,493.3,120.2,791.7,130.6,1556.5l10.4,719.2l-213.5-10.4c-273.6-12.4-470.5,26.9-688.1,136.8C6790.6,2670,6711.9,2699,6705.7,2688.7z M6937.8,2180.9c82.9-26.9,199-53.9,259.1-60.1c62.2-6.2,134.7-16.6,161.7-22.8l49.7-10.4l-14.5-418.6C7362.7,757.1,7257,98,7072.5-364.1c-74.6-186.5-240.4-447.7-281.9-447.7c-47.7,0-217.6,259.1-304.7,460.1C6280.8,125,6148.2,817.2,6096.3,1693.9c-22.8,391.7-22.8,395.8,85,395.8c76.7,0,354.4,74.6,458,122.3c49.7,20.7,103.6,35.2,120.2,29S6857,2207.8,6937.8,2180.9z"></path>
                    <path transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)" d="M3165.8,1894.9c-64.2-147.1-66.3-149.2-8.3-325.4l43.5-138.9l172-45.6c93.3-24.9,180.3-39.4,190.7-33.2c31.1,18.7,76.7,163.7,53.9,172c-10.4,4.1-82.9,41.4-163.7,85l-145.1,76.7l-33.2,134.7C3225.9,2027.5,3225.9,2027.5,3165.8,1894.9z"></path>
                    <path transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)" d="M2755.5,1111.5c-319.2-526.4-294.3-495.3-333.7-416.6c-39.4,72.5-82.9,95.3-116.1,62.2c-31.1-31.1-29-49.8,20.7-172l45.6-107.8l-68.4-109.9c-138.9-225.9-39.4-416.6,199-383.4c80.8,10.4,89.1,6.2,111.9-51.8c14.5-33.2,22.8-64.3,18.7-66.3c-4.1-4.1-99.5-47.7-209.3-97.4c-169.9-74.6-203.1-97.4-203.1-134.7c0-26.9,14.5-58,31.1-72.5c26.9-22.8,62.2-12.4,201,49.7c93.3,41.5,176.2,68.4,184.4,60.1c8.3-8.3,385.5-851.8,837.3-1871.5c451.8-1019.7,845.6-1894.3,872.5-1941.9c72.5-126.4,298.4-420.7,321.2-420.7c31.1,0,20.7,124.3-31.1,352.3c-43.5,190.7-157.5,464.3-880.8,2093.2c-456,1032.1-831.1,1888.1-835.2,1904.6c-4.1,18.6,58,56,170,107.8c147.1,64.2,178.2,87,182.4,130.6c12.4,101.5-51.8,101.5-275.6,0c-114-49.7-215.5-89.1-228-82.9c-12.4,4.2-37.3,45.6-56,91.2l-31.1,82.9L3085,647.2c456,603.1,439.4,534.7,153.4,603.1c-143,35.2-153.4,41.4-180.3,111.9c-16.6,41.4-37.3,91.2-45.6,111.9C3002.1,1501.1,2939.9,1414.1,2755.5,1111.5z"></path>
                    <path transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)" d="M3810.4,879.4c-6.2-14.5-101.6-149.2-211.4-298.4c-228-308.8-225.9-298.5-47.7-433.2C3713,25.5,3789.7-7.7,3940.9-18c74.6-4.1,209.3-29,300.5-51.8c230-62.2,574.1-62.2,824.8,0c101.6,24.9,221.8,45.6,269.4,45.6c89.1,0,211.4,29,261.2,60.1c22.8,14.5,20.7,47.7-14.5,201c-24.9,101.5-60.1,288.1-78.8,412.4c-20.7,126.4-37.3,230-39.4,234.2c-6.2,6.2-654.9-263.2-669.4-275.6c-4.2-4.2,26.9-22.8,68.4-43.5c43.5-18.7,105.7-74.6,138.9-120.2c78.7-105.7,147.1-263.2,126.4-283.9c-8.3-8.3-95.3-31.1-192.7-51.8c-263.2-51.8-725.4-12.4-725.4,62.2c0,82.9,215.5,346.1,339.9,416.6c29,16.6-35.2,49.7-333.7,172c-203.1,82.9-375.1,149.2-381.3,149.2C3827,908.4,3816.6,895.9,3810.4,879.4z"></path>
                    <path transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)" d="M3495.4-154.8c-89.1-540.9-114-708.8-103.6-739.9c10.4-33.2,33.2-39.4,155.4-37.3c178.2,2.1,290.2-49.7,420.7-188.6l93.3-99.5l157.5,416.6c87,232.1,157.5,429,157.5,441.4c0,47.7-217.6,116.1-416.6,130.6c-161.7,12.4-223.8,26.9-327.5,78.7l-124.4,62.2L3495.4-154.8z"></path>
                    <path transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)" d="M5578.2-194.2c-76.7-26.9-161.7-41.4-259.1-41.4c-118.1,2.1-176.2-10.4-304.7-64.2c-89.1-37.3-161.7-76.7-161.7-87.1c0-18.6,184.5-493.3,302.6-775.1l29-70.5l82.9,95.3c47.7,51.8,134.7,120.2,196.9,151.3c97.4,47.7,132.6,53.9,259.1,45.6c78.8-4.1,145.1-2.1,145.1,4.2c0,16.6-122.3,686-134.7,742C5721.2-140.3,5723.3-140.3,5578.2-194.2z"></path>
                    <path transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)" d="M3514-1097.8c-16.6-10.4,24.9-126.4,134.7-371c87.1-194.8,161.7-360.6,170-366.8c6.2-6.2,45.6,85,89.1,203.1l78.8,215.5l-64.2,93.3c-82.9,120.2-172,194.8-267.4,221.8C3563.7-1077.1,3545.1-1077.1,3514-1097.8z"></path>
                    <path transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)" d="M5520.2-1137.2c-68.4-33.2-182.4-157.5-230-250.8c-26.9-49.8,2.1-145.1,126.4-439.4l41.5-93.3l29,72.5c43.5,103.6,128.5,184.5,217.6,207.3c74.6,20.7,124.3,12.4,275.7-51.8c31.1-14.5,35.2-8.3,26.9,22.8c-6.2,20.7-26.9,124.4-45.6,225.9c-53.9,308.8-49.7,296.4-118.1,319.2C5750.2-1091.6,5599-1097.8,5520.2-1137.2z"></path>
                    <path transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)" d="M3124.4-2339.3c-6.2-20.7-91.2-451.8-188.6-957.5l-178.2-918.1l-163.7-184.4c-176.2-194.8-199-252.9-132.6-346.1c53.9-78.8,130.6-58,385.5,101.5c128.5,80.8,244.6,159.6,259.1,172c20.7,20.7,441.4,1566.8,447.7,1651.8c0,18.6-33.1,114-78.8,211.4c-60.1,134.7-89.1,180.3-118.1,180.3c-49.7,0-116.1,33.2-176.2,87.1C3138.9-2301.9,3136.8-2301.9,3124.4-2339.3z"></path>
                    <path transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)" d="M6098.4-2343.4c-53.9-99.5-275.6-138.9-429-74.6c-74.6,31.1-74.6,31.1-62.2-18.6c39.4-157.5,555.4-1956.5,569.9-1991.7c10.4-22.8,140.9-116.1,290.2-205.2c246.6-147.1,277.7-161.7,323.3-140.9c66.3,31.1,103.6,109.8,85,182.4c-8.3,31.1-87,130.6-172,219.7l-157.5,161.7L6343-3265.7c-111.9,520.2-207.2,951.3-213.5,955.4C6125.4-2304,6110.9-2320.6,6098.4-2343.4z"></path>
                    </svg>{' '}
                    Character - Your character is completely accessible with realized potential of your character's ability, equipment, and faith. You are able to manipulate which weapon(s) you wish to strike with, and how you want to if the weapon allows the concept.
                    </p>
                    <br />
                    <p style={{ color: '#fdf6d8' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 512 512">
                    <path d="M29.438 59.375c-3.948.032-7.903.093-11.875.188 4.333 2.772 8.685 5.483 13.062 8.124C126.162 123.92 230.69 151.4 340.5 180.594c.022.006.04.025.063.03.02.006.043-.004.062 0 1.87.498 3.72 1.003 5.594 1.5l.155-.53c.947.078 1.91.125 2.875.125 4.26 0 8.34-.767 12.125-2.19l-12.5 46.595 18.063 4.813L383 170.968c25.828 1.312 50.508 6.867 74.28 15.845-1.065 11.948 2.73 21.82 9.814 23.718 8.71 2.335 19.136-8.313 23.28-23.78 1.27-4.742 1.78-9.366 1.657-13.594l.345-1.28c-.136-.008-.27-.025-.406-.032-.56-8.924-4.116-15.77-9.876-17.313-6.808-1.823-14.666 4.304-19.75 14.44-25.275-3.725-49.624-10.894-72.47-23.69l16.345-60.968-18.033-4.843-12.093 45.155c-3.24-3.908-7.318-7.1-11.938-9.313l.094-.374C250.12 83.98 144.89 58.446 29.437 59.374zm161.25 44.25c55.52-.002 105.272 12.492 159.656 27.03 8.536.55 15.094 7.463 15.094 16.157 0 9.06-7.127 16.22-16.188 16.22-2.4 0-4.653-.5-6.688-1.407-56.172-15.04-109.352-27.786-157.406-57.97 1.85-.027 3.694-.03 5.53-.03zm-46.22 164.25v20.344H55.532c15.996 38.806 51.258 65.428 88.94 74.28v32.97h58.56c-12.115 30.534-33.527 55.682-58.5 77.592h-25.436v18.72h284.344v-18.72H376c-28.728-21.894-50.024-47.016-61.594-77.593h63.656V366.31c19.75-6.995 39.5-19.54 59.25-36.718-19.806-17.518-39.235-27.25-59.25-31.938v-29.78H144.47z"></path>
                    </svg>{' '}
                    Gear - Your gear and its improvement is paramount to your success as you gain power and fight tougher enemies. No item is unique and can be held and worn in multiplicity. You can also use your gear to craft higher quality items. Common and Uncommon quality scale with leveling, yet Rare and Epic are refined to a degree that even a novice would feel its improvement.
                    </p>
                    <br />
                    <p style={{ color: 'gold' }}>
                    <svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" fill="currentColor" viewBox="0 0 1000 1000">
                    <path transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)" d="M6619.3,4995c-12.4-8.2-37.1-65.9-53.5-127.7c-16.5-61.8-37.1-111.2-47.4-109.1c-420.1,80.3-747.5,90.6-883.4,28.8c-109.1-49.4-142.1-90.6-185.3-236.8c-74.1-238.9-271.8-471.5-492.1-578.6c-300.6-144.1-617.7-156.5-1165.5-43.2c-436.5,90.6-803.1,127.7-978.1,98.8l-123.5-20.6l164.7-2.1c255.3-6.2,455.1-49.4,776.3-173c325.3-125.6,570.4-199.7,661-199.7c115.3,0,30.9-37.1-115.3-51.5c-187.4-18.5-374.8,10.3-716.6,105c-152.4,41.2-345.9,78.2-463.3,88.5c-205.9,18.5-267.7,14.4-160.6-8.2c187.4-41.2,442.7-123.5,615.7-197.7c304.7-129.7,527.1-168.8,947.2-168.8c796.9,2,1079,173,1120.2,683.6c8.2,96.8,26.8,197.7,39.1,220.3c59.7,113.3,317.1,117.4,628,12.4c100.9-32.9,185.3-65.9,189.4-70c8.2-8.2-947.2-3183.4-961.6-3197.8c-4.1-6.2-133.8,41.2-288.3,105c-220.3,90.6-284.2,125.6-302.7,166.8c-14.4,28.8-20.6,53.5-18.5,55.6c4.1,2.1,45.3,22.7,94.7,43.2c177.1,76.2,313,275.9,313,455.1c0,55.6-4.1,57.7-298.6,103c-123.6,18.5-232.7,41.2-243,47.4c-8.2,8.2,59.7,70,150.3,135.9c90.6,67.9,162.7,131.8,158.6,144.1c-2.1,10.3-68,51.5-144.1,90.6c-121.5,61.8-160.6,70-288.3,70c-551.9,0-766-566.3-352.1-930.7c53.5-47.4,105-84.4,115.3-84.4c28.8,0-2.1-133.8-111.2-471.5c-80.3-247.1-100.9-333.6-90.6-395.4c14.4-86.5,12.4-88.5-164.7-111.2l-103-12.4l26.8-220.3c74.1-591,348-1142.8,722.7-1455.8c193.6-162.7,500.4-310.9,745.4-360.4c313-63.8,337.7-61.8,492.1,76.2c107.1,96.8,127.7,107.1,115.3,65.9c-26.8-92.7-152.4-348-224.5-457.1c-88.5-133.8-257.4-306.8-282.1-290.3c-10.3,6.2-18.5,51.5-18.5,100.9c0,100.9-74.1,360.4-103,360.4c-10.3,0-24.7-35-30.9-78.2c-22.7-131.8-32.9-152.4-131.8-257.4c-84.4-92.7-313-261.5-354.2-261.5c-16.5,0-18.5,12.4-59.7,253.3c-14.4,76.2-30.9,138-39.1,138s-30.9-30.9-49.4-70c-18.5-39.1-80.3-109.1-140-156.5c-121.5-94.7-385-257.4-399.5-243c-4.1,4.1,14.4,67.9,45.3,140c123.5,306.8,111.2,539.5-37.1,784.5c-142.1,236.8-173,426.2-113.3,683.6l26.8,117.4l-94.7-53.5c-665.1-385-838.1-976-516.8-1770.8c24.7-59.7,16.5-80.3-234.7-539.5c-142.1-263.6-259.5-483.9-259.5-490.1s131.8-230.6,290.3-496.3l290.3-483.9l-12.4-142.1l-14.4-142.1h288.3c160.6,0,290.3,6.2,290.3,12.3c0,6.2-39.1,78.3-86.5,158.6c-78.2,133.8-490.1,1011-490.1,1044c0,6.2,49.4,28.8,111.2,47.4c269.7,86.5,553.9,337.7,827.8,733.1c4.1,4.1,278,74.1,609.5,156.5c640.4,160.6,984.3,267.7,1334.3,416c333.6,142.1,683.6,341.8,825.7,473.6l53.6,49.4l407.7-84.4c224.5-45.3,413.9-86.5,418-90.6c4.1-6.2-47.4-90.6-115.3-191.5l-123.5-185.3l216.2-96.8c117.4-53.5,218.3-94.7,222.4-90.6c8.2,8.3,195.6,704.2,189.4,708.3c-2.1,2.1-189.4,113.3-415.9,245c-226.5,133.8-420.1,249.2-430.4,257.4c-8.2,10.3,12.4,59.7,49.4,113.3c90.6,131.8,195.6,368.6,224.5,500.4c39.1,185.3,14.4,654.8-37.1,710.4c-8.2,8.2-82.4-12.4-162.7-47.4c-284.2-121.5-467.4-152.4-873.1-154.4c-199.7,0-368.6,4.1-374.8,10.3c-4.1,6.2-16.5,59.7-24.7,121.5c-14.4,107.1-12.4,109.1,30.9,94.7c76.2-22.6,599.2-16.5,743.3,8.2c263.6,47.4,597.1,179.2,597.1,236.8c0,96.8-47.4,156.5-179.1,222.4c-255.3,125.6-434.5,358.3-444.8,574.5c-4.1,80.3,4.1,111.2,30.9,129.7c61.8,39.1,107.1-8.2,121.5-127.7c28.8-232.7,212.1-399.5,586.9-537.4c164.7-59.7,269.8-148.3,296.5-247.1c28.8-113.3,103-140,253.3-96.8c267.7,78.3,288.3,222.4,92.7,654.8c-78.2,175-80.3,185.3-59.7,298.6c47.4,255.3,18.5,383-154.4,658.9l-96.8,156.5l61.8,210l61.8,212.1l-140,22.7c-203.9,32.9-591,28.8-766-10.3c-457.1-100.9-842.2-440.6-1039.9-920.4c-78.2-183.3-162.7-471.5-181.2-611.6c-8.2-55.6-20.6-103-28.8-103s-47.4,59.7-84.4,133.8c-43.3,80.3-80.3,129.7-94.7,123.5c-14.4-4.1-26.8,4.1-26.8,18.5c0,16.5,55.6,308.9,121.5,652.8c67.9,343.9,222.4,1130.5,341.8,1748.2c119.4,617.7,230.6,1190.2,247.1,1274.6c22.6,113.3,24.7,158.6,8.3,179.2C6687.3,5015.6,6656.4,5017.6,6619.3,4995z M8180.1,1471.8c70-72.1,76.2-140,16.5-216.2c-86.5-109.1-286.2-43.2-286.2,94.7C7910.4,1517.1,8064.8,1585.1,8180.1,1471.8z M5929.5,436.1c205.9-630.1,100.9-1202.5-290.3-1579.3l-94.7-92.7l-158.6,35C4875.2-1089.7,4473.7-669.7,4309-74.6c-61.8,220.3-63.8,216.2,90.6,253.3c243,59.7,469.5,203.9,568.3,362.4c28.8,47.4,30.9,47.4,111.2,12.4c129.7-57.7,415.9-51.5,597.1,14.4c80.3,28.8,154.4,53.5,166.8,55.6C5855.4,623.5,5894.5,539,5929.5,436.1z"></path>
                    <path transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)" d="M3596.5,2511.7c-127.7-57.7-263.6-208-306.8-335.6c-20.6-59.7-32.9-166.8-32.9-288.3c0-339.8-59.7-385-374.8-280c-59.7,18.5-45.3-94.7,22.7-205.9c88.6-135.9,205.9-210,339.8-208c203.9,4.1,366.5,117.4,420.1,296.5c12.4,39.1,28.8,156.5,37.1,257.4c14.4,193.6,41.2,265.6,109.1,288.3c24.7,6.2,45.3,39.1,55.6,78.2c18.5,90.6,59.7,164.7,133.8,251.2c53.5,61.8,59.7,78.2,37.1,105C3954.8,2571.4,3761.2,2589.9,3596.5,2511.7z"></path>
                    <path transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)" d="M1341.8-109.6c-28.8-4.1-119.4-28.8-201.8-51.5c-156.5-45.3-160.6-61.8-16.5-86.5c105-20.6,282.1-98.9,372.7-168.9c41.2-30.9,98.8-98.8,129.7-150.3c49.4-82.4,55.6-115.3,53.5-259.5c0-133.8-12.4-191.5-61.8-308.9c-51.5-125.6-59.7-168.8-59.7-339.7c0-175,8.2-210,65.9-331.5c129.7-278,315-411.8,593-426.3c243-12.3,459.2,70,737.2,280c88.5,68,96.8,82.4,96.8,160.6c0,80.3,28.8,263.6,53.5,341.8c8.2,28.8-4.1,28.8-119.4-8.2c-189.4-59.7-422.1-72.1-508.6-28.8c-109.1,57.6-135.9,148.3-105,366.5c35,245,18.5,473.6-43.2,603.3c-127.7,269.8-418,426.3-780.4,420.1C1463.3-99.3,1370.6-105.5,1341.8-109.6z"></path>
                    <path transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)" d="M8620.8-496.7c-10.3-4.1-148.3-37.1-302.7-72.1c-205.9-47.4-284.2-74.1-284.2-96.8c0-57.6-103-337.7-154.4-418c-28.8-45.3-51.5-86.5-51.5-92.7s49.4,14.4,109.1,43.3c57.7,30.9,191.5,94.7,294.5,142.1l189.4,88.5l98.8-88.5l100.9-88.5l-80.3-166.8c-45.3-90.6-74.1-173-65.9-181.2c8.2-8.2,105-74.1,214.1-144.1c148.3-94.7,203.9-119.4,214.2-100.9c39.1,72.1,78.2,284.2,78.2,434.5c0,152.4-6.2,181.2-82.4,337.7c-65.9,133.8-243,422.1-255.3,411.8C8641.4-488.5,8633.1-492.6,8620.8-496.7z"></path>
                    <path transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)" d="M5037.9-2842.1c-181.2-49.4-352.1-94.7-380.9-100.9c-45.3-10.3-57.7-30.9-78.2-133.9c-24.7-121.5-140-380.9-238.9-535.4c-28.8-47.4-53.5-88.5-53.5-94.7c0-6.2,821.6-741.3,914.2-817.5c37.1-30.9,37.1-37.1,6.2-131.8c-20.6-55.6-35-107.1-35-117.4c0-8.2,115.3-16.5,255.3-16.5h257.4l-49.4,144.2c-47.4,135.9-70,166.8-444.8,570.4L4797-3647.2l57.7,41.2c123.5,84.4,313,294.4,383,422.1c65.9,115.3,160.6,364.5,160.6,415.9C5398.3-2745.3,5412.7-2743.2,5037.9-2842.1z"></path>
                    </svg>{' '}
                    Leveling - As you are able to defeat opponents of various qualities, you invariably gain experience, which allows you to level. Leveling has several consequences, gaining strength in yourself and the utilization of your equipment's quality. You also gain 4 points to add to your attributes at every even level.
                    <br /><br />
                    Common - Scales to level 4.<br /><br />
                    Uncommon - Scales to level 8. (Req. Level 4)<br /><br />
                    Rare - No Scaling ATM. (Req. Level 6)<br /><br />
                    Epic - No Scaling. (Req. Level 12)
                    </p>
                    <br />
                    <p style={{ color: '#fdf6d8' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 32 32">
                    <path d="M20,28h2v1H10v-1h2l1-3h6L20,28z M31,3v21H1V3H31z M29,5H3v17h26V5z M28,21H4V6h24V21z M7,10h8V9  H7V10z M11,17H7v1h4V17z M19,15h-9v1h9V15z M19,13h-9v1h9V13z M20,11H10v1h10V11z"></path>
                    </svg>{' '}
                    Progression - And this is the developer trying to keep you informed and updated. Currently I am working on the framework of how the game will technically function i.e. combat, equipment, leveling, and scaling. I don't have a roadmap nor have I looked up how people actually work through game development stem to sternum but I'm hammering out what I can recollect from myriad gameplay seems to be necessary for the game itself to be fun and functional. So it's gameplay first to make sure anyone would trouble themself to play the thing, story connectivity-vignettes to somewhat storyboard for myself the actual game conceptually, then the phaser canvas to give what is generally static gameplay (however much I can add to the 'life' of the game I will continue to do so) and transform it into an interconnected world where the PvP and ability to communicate would be more amusing and enjoyable. If you are reading this, I appreciate you humoring me. Thank you.
                    </p>
                    </>
                );
            case SETTINGS.TACTICS:
                return (
                    <>
                    <p style={{ color: 'gold' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 32 32">
                    <path d="M11.868 23.416l17.041-17.041 2.167-5.432-5.432 2.167-17.041 17.041zM3.036 19.562l0-0-0-0zM5.703 16.895l-2.667 2.667 3.73 3.73-5.878 5.878 1.932 1.932 5.878-5.878 3.733 3.733 2.667-2.667c-3.934-2.271-7.149-5.505-9.395-9.395zM9.052 12.062l3.774 3.496 2.361-2.361-1.97-1.825 1.943-1.799-13.913-8.336 9.746 9.028zM22.964 20.4l-3.947-3.657-2.361 2.361 2.297 2.128-1.81 1.676 13.913 8.336-9.9-9.171z"></path>
                    </svg>{' '}
                    Weapons - This dropdown allows you to toggle between your equipped weapons in order to choose the best option for the current situation. Overtime, the layering of your weapons can augment your combat effectiveness, such as dual wielding.
                    </p>
                    <br />
                    <p style={{ color: '#fdf6d8' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 32 32">
                    <path d="M30.926 1.41c-0 0-0 0-0 0s0-0 0-0l-0.004 0.003c-2.822 2.407-5.452 4.555-7.189 5.954-1.15-0.854-2.508-1.444-3.983-1.681l-3.515-3.77 1.316 3.682c-0.077 0.006-0.154 0.013-0.231 0.021l-5.4-4.296 1.88 4.054-7.397-3.971 3.697 4.854-7.733-4.632 6.367 8.404-5.394-3.077 4.348 5.579-2.564-1.004 4.091 4.392c0.172 1.312 0.623 2.536 1.29 3.612l-0.446 0.396-1.753-1.977-3.627 3.217 2.009 2.266-3.049 2.704-0.663-0.263 0.15 0.718-2.258 2.003c-0.232 1.546 0.669 2.583 2.293 2.585l0.779-0.691 0.108 0.518 3.883-3.169-0.693-0.275 1.743-1.546 1.94 2.187 3.627-3.217-1.679-1.893 0.644-0.572c1.39 0.851 3.024 1.342 4.773 1.342 5.054 0 9.15-4.097 9.15-9.15 0-1.353-0.294-2.638-0.821-3.793l2.745-2.447c2.369-2.101 1.89-3.789 1.567-7.070z"></path>
                    </svg>{' '}
                    Damage Types - Depending on the main weapon you have equipped (in slot 1), it can offer a variety of ways to damage your enemies, from slashing, piercing, blunt, and more. Each weapon has a different damage type, and each type has a different effect on the enemy. For example, piercing weapons are great for cutting through lighter armors, while blunt weapons are great for crushing heavier armors.
                    </p>
                    <br />
                    <p style={{ color: 'gold' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 512.004 512.004">
                    <path d="M438.059,257.965c-9.593-9.593-15.469-22.324-16.548-35.849l-1.207-15.153c-3.218-40.387-20.768-78.408-49.416-107.057    L322.699,51.72c-3.253-3.253-8.528-3.253-11.78,0c-10.807,10.807-16.249,24.973-16.341,39.168l-82.001-82    c-11.852-11.852-31.135-11.852-42.988,0c-3.494,3.494-5.95,7.637-7.384,12.044l-0.486-0.486    c-11.851-11.852-31.135-11.852-42.988,0c-5.741,5.741-8.903,13.374-8.903,21.494c0,0.227,0.011,0.451,0.017,0.676    c-0.36-0.012-0.721-0.027-1.083-0.027c-8.12,0-15.752,3.162-21.493,8.903s-8.903,13.374-8.903,21.493s3.162,15.752,8.903,21.495    l5.168,5.168c-4.406,1.434-8.549,3.89-12.044,7.384c-11.851,11.852-11.851,31.136,0,42.988l12.422,12.422    c-4.485,1.464-8.596,3.966-12.028,7.398c-5.741,5.741-8.903,13.375-8.903,21.495c0,8.12,3.162,15.752,8.903,21.494L204.37,336.413    c12.493,12.494,29.05,20.385,46.622,22.22c2.059,0.215,4.098,0.549,6.114,0.973c-10.967,23.129-21.132,40.389-28.805,52.152    c-4.866,7.459-9.153,13.379-12.607,17.862c-6.595-20.898-18.235-61.26-20.997-93.742c-0.39-4.584-4.411-7.976-9.005-7.595    c-4.584,0.39-7.983,4.422-7.595,9.005c3.787,44.546,22.692,100.86,26.02,110.511v10.894h-7.775c-4.6,0-8.33,3.73-8.33,8.33    c0,4.6,3.73,8.33,8.33,8.33h7.775v28.322c0,4.6,3.73,8.33,8.33,8.33c4.6,0,8.33-3.73,8.33-8.33v-28.322h7.775    c4.6,0,8.33-3.73,8.33-8.33c0-4.6-3.73-8.33-8.33-8.33h-7.775v-9.024c7.084-7.903,28.397-33.915,52.105-84.394    c5.38,2.824,10.345,6.452,14.683,10.789l15.99,15.991c1.626,1.627,3.758,2.44,5.89,2.44s4.264-0.813,5.89-2.44    c3.253-3.253,3.253-8.526,0-11.78l-15.99-15.991c-5.763-5.763-12.399-10.532-19.594-14.195c2.955-6.785,5.931-13.956,8.902-21.511    c11.445,2.421,22.06,8.124,30.374,16.44l15.99,15.991c1.626,1.627,3.758,2.44,5.89,2.44s4.264-0.813,5.89-2.44    c3.253-3.253,3.253-8.526,0-11.78l-15.99-15.991c-9.997-9.998-22.602-17.039-36.244-20.397    c23.268-65.831,28.869-135.074,30.188-168.212l12.602,12.601c1.626,1.626,3.758,2.44,5.89,2.44c2.131,0,4.264-0.813,5.89-2.44    c3.253-3.253,3.253-8.528,0-11.78l-8.069-8.069c-0.002-0.002-0.003-0.003-0.006-0.006l-18.36-18.36    c-7.414-7.414-11.496-17.27-11.496-27.754c0-7.65,2.174-14.966,6.229-21.241l41.674,41.674c25.85,25.85,41.686,60.157,44.589,96.6    l1.207,15.153c1.392,17.469,8.983,33.915,21.375,46.305c1.626,1.627,3.758,2.44,5.89,2.44s4.264-0.813,5.89-2.44    C441.312,266.493,441.312,261.218,438.059,257.965z M99.052,63.273c2.593-2.594,6.043-4.024,9.713-4.024    c3.67,0,7.119,1.429,9.714,4.024l5.351,5.351c-4.379,1.437-8.495,3.885-11.972,7.36c-3.451,3.451-5.962,7.588-7.422,12.101    l-5.386-5.386c-2.594-2.594-4.024-6.044-4.024-9.714S96.457,65.866,99.052,63.273z M92.176,138.239    c-5.357-5.357-5.357-14.071,0-19.428c5.356-5.356,14.07-5.356,19.428,0l0.001,0.001c0.242,0.242,0.499,0.461,0.761,0.666    l11.93,11.93c-4.406,1.434-8.549,3.89-12.044,7.384c-3.451,3.451-5.961,7.587-7.422,12.099L92.176,138.239z M277.885,309.999    c-11.404-2.433-21.98-8.128-30.27-16.418l-53.328-53.328c-3.252-3.253-8.526-3.253-11.78,0s-3.253,8.526,0,11.78l53.328,53.328    c9.947,9.948,22.475,16.964,36.036,20.343c-2.583,6.46-5.165,12.611-7.721,18.449c-3.741-0.974-7.556-1.689-11.426-2.094    c-13.785-1.439-26.773-7.63-36.574-17.431L92.568,201.045c-2.594-2.594-4.024-6.044-4.024-9.714s1.429-7.119,4.024-9.714    c2.593-2.594,6.043-4.024,9.713-4.024s7.119,1.429,9.714,4.024l0.002,0.002c0.241,0.242,0.498,0.46,0.76,0.665l48.094,48.094    c1.626,1.626,3.758,2.44,5.89,2.44s4.264-0.813,5.89-2.44c3.253-3.253,3.253-8.528,0-11.78l-48.6-48.6    c-2.594-2.594-4.024-6.044-4.024-9.714c0-3.67,1.429-7.119,4.024-9.714c5.357-5.356,14.072-5.354,19.428,0    c0.001,0.001,0.002,0.002,0.003,0.003l68.29,68.29c1.626,1.627,3.758,2.44,5.89,2.44c2.131,0,4.264-0.813,5.89-2.44    c3.253-3.253,3.253-8.528,0-11.78l-99.892-99.893c-2.594-2.593-4.024-6.043-4.024-9.713c0-3.67,1.429-7.119,4.024-9.714    c5.356-5.356,14.071-5.357,19.428,0l93.362,93.362c1.626,1.626,3.758,2.44,5.89,2.44s4.264-0.813,5.89-2.44    c3.253-3.253,3.253-8.528,0-11.78L130.514,51.653c-2.594-2.594-4.024-6.044-4.024-9.714c0-3.67,1.429-7.119,4.024-9.714    c5.357-5.356,14.072-5.354,19.428,0l122.774,122.773c3.253,3.253,8.528,3.253,11.78,0c3.253-3.253,3.253-8.528,0-11.78    L181.372,40.096c-5.356-5.356-5.356-14.071,0-19.428c5.357-5.354,14.071-5.356,19.428,0l107.673,107.673    C308.311,146.144,306.02,232.138,277.885,309.999z"></path>
                    </svg>{' '}
                    Prayers - Based on your weapon of choice, in addition to various choices of your character, you may be able to invoke the power of the Ancients or Daethos themself. Prayers are powerful abilities that can be used in combat, to provide powerful blessings and curses, to heal yourself, or to damage your enemies. Myriad concerns weight the effectiveness of a prayer.
                    </p>
                    </>
                );
            default:
                return ('');
        };
    };

    const returnHome = () => navigate('/');

    if (loading) {
        return (
            <Loading Combat={true} />
        );
    };
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
            <Firewater state={state} dispatch={dispatch} gameState={gameState} gameDispatch={gameDispatch} />
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
                <option value="General">General</option>
                <option value="Inventory">Inventory</option>
                <option value="Tactics">Tactics</option>
            </Form.Select>
            </>
        ) : ( '' ) }
        <div className="story-block" style={{ zIndex: 9999 }}>
            <div className='story-ascean'> 
                { asceanState.experience === asceanState.experienceNeeded ? (
                    <LevelUpModal asceanState={asceanState} setAsceanState={setAsceanState} levelUpAscean={levelUpAscean} story={true} />
                ) : ( '' ) } 
                <div style={{ textAlign: 'center', color: "#fdf6d8" }}>
                    {state.player.name}
                </div>
                <div style={{ textAlign: "center", marginBottom: "15%" }}>
                    <StoryHealthBar totalPlayerHealth={state.player_health} currentPlayerHealth={state.new_player_health} />
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
                    loading={loading}
                    damage={damaged}
                    key={ascean._id}
                    story={true}
                />
                <ExperienceBar totalExperience={ascean.level * 1000} currentExperience={ascean.experience} story={true} />
            </div>
        </div>
        <div style={{ position: "absolute", color: "#fdf6d8", textAlign: "center", width: "27%", height: "55%", left: "350px", top: "22.5%", fontSize: "12px", padding: "0.5%", overflow: "scroll", scrollbarWidth: "none", zIndex: 9999 }}>
            { asceanViews === VIEWS.CHARACTER ? (
                <div style={{ display: "inline" }}>
                    <span id="popover-spec-image"><img src={process.env.PUBLIC_URL + '/images/' + state.player.origin + '-' + state.player.sex + '.jpg'} alt="Origin Culture Here" id="origin-pic" /></span>
                    <div className='creature-heading'>
                        <h2 style={{ fontSize: "14px", color: "gold" }}>{state.player.description}</h2>
                    </div>
                    <div className='property-line' style={{ fontSize: '12px' }}>
                        Level: <p style={{ color: "gold" }}>{state.player.level}</p><br />
                        {state.player?.currency?.silver ? <>Silver: <p style={{ color: "gold" }}>{state.player.currency.silver}</p> Gold: <p style={{ color: "gold" }}>{state.player.currency.gold} <br /></p></> : '' }
                        Mastery: <p style={{ color: "gold" }}>{state.player.mastery}</p><br />
                        Magical Defense: <p style={{ color: "gold" }}>{state.player_defense.magicalDefenseModifier}% / [{state.player_defense.magicalPosture}%]</p><br />
                        Physical Defense: <p style={{ color: "gold" }}>{state.player_defense.physicalDefenseModifier}% / [{state.player_defense.physicalPosture}%]</p><br />
                        Initiative: <p style={{ color: "gold" }}>{state.player_attributes.initiative}</p>
                    </div>
                    <AsceanAttributeCompiler ascean={state.player} story={true} />
                </div>
            ) : asceanViews === VIEWS.INVENTORY ? (
                <>
                { highlighted.comparing ? (
                    <Inventory gameState={gameState} gameDispatch={gameDispatch} bag={gameState.player.inventory} inventory={highlighted.item} ascean={ascean} index={0} compare={true} story={true} />
                ) : ( '' ) }
                </> 
            ) : asceanViews === VIEWS.SETTINGS ? (
                <div style={{ justifyContent: "center", alignItems: "center", height: "100%" }}>
                    <h5 style={{ color: 'gold', marginLeft: 'auto' }}>
                        Gameplay Controls
                    <Button variant='' onClick={saveGameSettings} style={{ position: 'absolute', top: '-5px' }}>
                        <span style={{ float: "right", color: "gold", fontSize: "10px" }}>{ loading ? ( <Loading Combat={true} /> ) : ( 'Save' ) }</span>
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
        <div style={{ position: "absolute", color: "#fdf6d8", textAlign: "center", width: "27%", height: "54.5%", left: "635px", top: "22.5%", fontSize: "12px", overflow: 'auto', scrollbarWidth: 'none' }}>
            { asceanViews === VIEWS.CHARACTER ? (
                <div style={{ height: "100%", padding: '0.25rem' }}> 
                    {createCharacterInfo(currentCharacter)}
                </div>
            ) : asceanViews === VIEWS.INVENTORY ? (
                <PhaserInventoryBag setDragAndDropInventory={setDragAndDropInventory} dragAndDropInventory={dragAndDropInventory} highlighted={highlighted} setHighlighted={setHighlighted} gameState={gameState} gameDispatch={gameDispatch} ascean={gameState.player} /> 
            ) : asceanViews === VIEWS.SETTINGS ? (
                <div className='p-2' style={{ overflowY: "scroll", scrollbarWidth: "none", height: "100%" }}>{createSettingInfo(currentSetting)}</div>
            ) : ( '' ) }
        </div>
        </div>
    );
};

export default StoryAscean;