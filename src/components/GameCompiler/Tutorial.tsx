import { useCallback, useEffect, useState } from 'react'
import { GAME_ACTIONS, Player } from './GameStore';
import * as asceanAPI from '../../utils/asceanApi';
import Button from 'react-bootstrap/Button';
import { shakeScreen } from './CombatStore';
import Typewriter from './Typewriter';

interface TutorialProps {
    player: any;
    gameDispatch: React.Dispatch<any>;
    setTutorialContent: React.Dispatch<any>;
    firstBoot?: boolean;
    firstCity?: boolean;
    firstCombat?: boolean;
    firstQuest?: boolean;
    firstShop?: boolean;
    firstInventory?: boolean;
    firstLoot?: boolean;
    firstMovement?: boolean;
    firstLevelUp?: boolean;
    firstDeath?: boolean;
    firstPhenomena?: boolean;
};

const Tutorial = ({ player, gameDispatch, firstBoot, firstCity, firstCombat, firstDeath, firstInventory, firstLevelUp, firstLoot, firstMovement, firstQuest, firstShop, firstPhenomena, setTutorialContent }: TutorialProps) => {
    console.log(player, "Tutorial Triggering");
    const [typewriterString, setTypewriterString] = useState<string>('');
    function performAction(actionName: string) {
        console.log(actionName, "Action Name of Perform Action Function")
        const actionFunction = actions[actionName as keyof typeof actions];
        if (actionFunction) {
          actionFunction();
        };
    };
    const actions = {
        rebukePlayer: () => rebukePlayer(),
        blessPlayer: () => blessPlayer(),
    };

    useEffect(() => {
        if (firstPhenomena) {
            setTypewriterString(
                `<h6 className='typewriterContainer' key='phenomena'>
                <Button variant='' className='button' data-function-name='blessPlayer'>
                <img src=${player?.faith === 'adherent' ? '/images/achreo-rising.png' : player?.faith === 'devoted' ? '/images/daethos-forming.png' : process.env.PUBLIC_URL + '/images/' + player.origin + '-' + player.sex + '.jpg'} alt=${player.faith}  className=${'godBorder'+player.mastery} />
                </Button>
                <br />
                ${ player?.faith === 'adherent' ? (
                    `<p className='adherentText'>You feel the presence of... ^750 ${highestFaith()}^1000?</p>`
                ) : player?.faith === 'devoted' ? (
                    `<p className='devotedText'>You feel the presence of... ^750 ${highestFaith()}^1000?</p>`
                ) : (
                    '<p>You feel the presence of an overwhelming power...</p>'
                ) } <br />
            
                A tendril swirls soothing about your senses, its sweetness teasing as hush soon possesses. <br /><br />
                Writhing, it warps to wrap round you, seething, forms of shade shimmer to dance upon your being. <br /><br />
                Yet perchance you seek to twist ${player.faith === 'adherent' ? 'adherence' : 'devotion'} in its seams, To taste its ${player.mastery} burning the resin of your dreams. <br /><br />
            
                <p className='${player.faith === 'adherent' ? 'adherentText' : player?.faith === 'devoted' ? 'devotedText' : 'otherText'}'>You become attuned to a halt and paltry whisper, ringing, it stretches your soft edges, serenity begging you hither.</p>
                <p className='whisperText'>
                "Who are you?" 
                </p>
                <p className='journeyText'>
                    [If you wish to peer into the land of Hush and Tendril and begin a journey of yourself and what you mean to this world, click upon the avatar. You may rebuke this ^500 calling.] 
                </p>
                <Button variant='' className='rebukeButton' data-function-name='rebukePlayer'>X</Button>
                </h6>`
                );
            };
    }, []);
    const completeTutorial = async (tutorial: string, ascean: string) => {
        const data = { ascean, tutorial };
        const response = await asceanAPI.saveTutorial(data);
        console.log(response, tutorial, "Tutorial Complete");
        setTutorialContent(null);
        gameDispatch({ type: GAME_ACTIONS.SET_TUTORIAL, payload: response.tutorial });
    };
    const blessPlayer = async () => {
        try {
            gameDispatch({ type: GAME_ACTIONS.LOADING_OVERLAY, payload: true });
            shakeScreen({ duration: 1500, intensity: 1.5});
            if (player.faith === 'devoted') {
                gameDispatch({ type: GAME_ACTIONS.SET_OVERLAY_CONTENT, payload: `"Would you perform me sympathies, \n\n Should you feel these hands of slate, \n\n That which wrap the world to seize, \n\n Of its own sin to orchestrate?"` });
            } else if (player.faith === 'adherent') {
                gameDispatch({ type: GAME_ACTIONS.SET_OVERLAY_CONTENT, payload: `Bled and dried into the ground, its lives were not their own it found, \n\n And still it watches with eyes free, perching on its Ancient tree. \n\n Pondering why its form's forgot, and what this tether with you has wrought.` });
            } else {
                gameDispatch({ type: GAME_ACTIONS.SET_OVERLAY_CONTENT, payload: `You may not be one for the Ancients or so-called God of this world, yet an undeniable surge courses through you. \n\n Care for whom and what you befriend, ${player.name}.` })
            };
            const response = await asceanAPI.blessAscean(player._id);
            const entry = {
                title: 'Who am I?',
                body: `You felt the presence of... ${highestFaith()}? \n\n You become attuned to a halt and paltry whisper, ringing, it stretches your soft edges, serenity begging you hither. \n\n "Who are you?"`,
                footnote: `Seems you've been blessed by ${highestFaith()}, or some greater mimicry of it. It asked who you were, how would it not know?`,
                date: Date.now(),
                location: 'Unknown',
                coordinates: {
                    x: 0,
                    y: 0,
                },
            };
            const data = {
                asceanID: player._id,
                entry,
            };
            const journalResponse = await asceanAPI.saveJournalEntry(data);
            console.log(journalResponse, "Journal Response");
            gameDispatch({ type: GAME_ACTIONS.SET_JOURNAL, payload: journalResponse.journal });

            gameDispatch({ type: GAME_ACTIONS.SET_ASCEAN_ATTRIBUTES, payload: response });
            gameDispatch({ type: GAME_ACTIONS.SET_STORY_CONTENT, payload: `You cannot discern the nature of this phenomena, yet propose to learn into your curiosity or perchance conviction? A journey to the discovery of yourself awaits, ${player.name}.` });
                        
            console.log(response, "Blessing Player");
            await completeTutorial('firstPhenomena', player._id);
            gameDispatch({ type: GAME_ACTIONS.SET_PLAYER_BLESSING, payload: true });
            setTimeout(() => gameDispatch({ type: GAME_ACTIONS.LOADING_OVERLAY, payload: false }), 10000);
        } catch (err: any) {
            console.log(err, '%c <- You have an error in blessing a player', 'color: red')
        };
    };
    const rebukePlayer = async () => {
        try {
            gameDispatch({ type: GAME_ACTIONS.LOADING_OVERLAY, payload: true });
            shakeScreen({ duration: 1500, intensity: 1.5});
            if (player.faith === 'none') gameDispatch({ type: GAME_ACTIONS.SET_OVERLAY_CONTENT, payload: `You have no faith, and thus no god to rebuke. You're uncertain of what attempted contact, and sought no part of it.` });
            if (player.faith === 'adherent') gameDispatch({ type: GAME_ACTIONS.SET_OVERLAY_CONTENT, payload: `"Bleating and ceaseless, your caer it persists, \n\n To never waver, with no Ancient’s favor, \n\n To unabashedly exist."` });
            if (player.faith === 'devoted') gameDispatch({ type: GAME_ACTIONS.SET_OVERLAY_CONTENT, payload: `"These soft and fatal songs we sing, \n\n Fearfully."` });
            const response = await asceanAPI.curseAscean(player._id);
            gameDispatch({ type: GAME_ACTIONS.SET_FIREWATER, payload: response.firewater });
            gameDispatch({ type: GAME_ACTIONS.SET_STATISTICS, payload: response.statistics });
            const entry = {
                title: 'Who am I?',
                body: `You felt the presence of... ${highestFaith()}? \n\n You become attuned to a halt and paltry whisper, ringing, it stretches your soft edges, serenity begging you hither. \n\n "Who are you?"`,
                footnote: `Some mimicry of ${highestFaith()} asked who you were, as though the true incarnation would not know? Careful of what you rebuke, ${player.name}.`,
                date: Date.now(),
                location: 'Unknown',
                coordinates: {
                    x: 0,
                    y: 0,
                },
            };
            const data = {
                asceanID: player._id,
                entry,
            };
            const journalResponse = await asceanAPI.saveJournalEntry(data);
            console.log(journalResponse, "Journal Response");
            gameDispatch({ type: GAME_ACTIONS.SET_JOURNAL, payload: journalResponse.journal });

            gameDispatch({ type: GAME_ACTIONS.SET_STORY_CONTENT, payload: `You cannot discern the nature of this phenomena, yet propose to learn into your caution or perchance cynicism? A journey to the discovery of this presence awaits, ${player.name}.` });
            await completeTutorial('firstPhenomena', player._id);
            setTimeout(() => gameDispatch({ type: GAME_ACTIONS.LOADING_OVERLAY, payload: false }), 10000);
        } catch (err: any) {
            console.log(err, '%c <- You have an error in rebuking a player', 'color: red');
        };
    };
    const highestFaith = () => {
        const influences = [player.weapon_one.influences[0], player.weapon_two.influences[0], player.weapon_three.influences[0], player.amulet.influences[0], player.trinket.influences[0]];
        const faithsCount = influences.reduce((acc: any, faith: any) => {
            if (acc[faith]) acc[faith]++;
            else acc[faith] = 1;
            return acc;
        }, {});
        const faithsArray = Object.entries(faithsCount).filter((faith: any) => faith[0] !== '');
        const highestFaith = faithsArray.reduce((acc: any, faith: any) => {
            if (acc[1] < faith[1]) acc = faith;
            return acc;
        }, faithsArray[0]);
        return highestFaith[0];
    };
    const faithBorder = (mastery: string) => {
        switch (mastery) {
            case 'Constitution':
                return {
                    maxWidth: "50vw",
                    border: '2px solid white',
                    boxShadow: '0 0 2em white',
                };
            case 'Strength':
                return {
                    maxWidth: "50vw",
                    border: '2px solid red',
                    boxShadow: '0 0 2em red',
                };
            case 'Agility':
                return {
                    maxWidth: "50vw",
                    border: '2px solid green',
                    boxShadow: '0 0 2em green',
                };
            case 'Achre':
                return {
                    maxWidth: "50vw",
                    border: '2px solid blue',
                    boxShadow: '0 0 2em blue',
                };
            case 'Caeren':
                return {
                    maxWidth: "50vw",
                    border: '2px solid purple',
                    boxShadow: '0 0 2em purple',
                };
            case 'Kyosir':
                return {
                    maxWidth: "50vw",
                    border: '2px solid gold',
                    boxShadow: '0 0 2em gold',
                };
        };
    };
    return (
        <div className='d-flex align-items-center justify-content-center'
        style={{
          position: 'fixed',
          top: firstPhenomena ? 0 : '17.5%',
          left: 0,
          width: '100%',
          height: firstPhenomena ? '100vh' : '45vh',
          backgroundColor: 'rgba(0, 0, 0, 1)',
          zIndex: 9999, 
          border: "0.2em solid purple",
          color: "#fdf6d8",
          overflow: 'scroll',
        }}>
            { firstBoot ? (
                <h6 className='overlay-content' style={{ animation: "fade 1s ease-in 0.5s forwards" }}>
                <br /><br />
                Welcome to the Ascea, {player.name}. Below explains the general premise and gameplay loop which is a work in progress.<br /><br />
                </h6>
            ) : ( '' ) }
            { firstCity ? (
                <h6 className='overlay-content' style={{ animation: "fade 1s ease-in 0.5s forwards", marginTop: "25%", width: "99%" }}>
                Welcome to your first city, {player.name}. Various services and shops can be found to aid you in your journey.<br /><br />
                <p style={{ color: '#fdf6d8' }}>
                You can click on the [ City ] button that appears when you are in* a city, enabling multiple vendors selling specified equipment, and various services to heal and replenish your firewater. Much of the city's content is in framework and
                conceptual, as--like much of this game, the final design is uncertain. 
                </p>
                *Noted by the 'Content' on the StoryBox, in addition the map's purple tiles and changing background.
                <br /><br />
                <Button variant='' style={{ float: "right", fontSize: "24px", zIndex: 9999, marginLeft: "90vw", marginTop: "2.5vw", color: "red" }} onClick={() => completeTutorial('firstCity', player._id)}>X</Button>
                </h6>
            ) : ( '' ) }
            { firstCombat ? (
                <h6 className='overlay-content' style={{ animation: "fade 1s ease-in 0.5s forwards", marginTop: "75%", width: "99%" }}>
                Welcome to your first combat encounter, {player.name}. Below explains the series of actions in conception and execution.<br /><br />
                <p style={{ color: '#fdf6d8' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 512 512">
                <path d="M311.313 25.625l-23 10.656-29.532 123.032 60.814-111.968-8.28-21.72zM59.625 50.03c11.448 76.937 48.43 141.423 100.188 195.75 14.133-9.564 28.405-19.384 42.718-29.405-22.156-27.314-37.85-56.204-43.593-86.28-34.214-26.492-67.613-53.376-99.312-80.064zm390.47.032C419.178 76.1 386.64 102.33 353.31 128.22c-10.333 58.234-58.087 112.074-118.218 158.624-65.433 50.654-146.56 92.934-215.28 121.406l-.002 32.78c93.65-34.132 195.55-81.378 276.875-146.592C375.72 231.06 435.014 151.375 450.095 50.063zm-236.158 9.344l-8.5 27.813 40.688 73.06-6.875-85.31-25.313-15.564zm114.688 87.813C223.39 227.47 112.257 302.862 19.812 355.905V388c65.917-27.914 142.58-68.51 203.844-115.938 49.83-38.574 88.822-81.513 104.97-124.843zm-144.563 2.155c7.35 18.89 19.03 37.68 34 56.063 7.03-4.98 14.056-10.03 21.094-15.094-18.444-13.456-36.863-27.12-55.094-40.97zM352.656 269.72c-9.573 9.472-19.58 18.588-29.906 27.405 54.914 37.294 117.228 69.156 171.906 92.156V358.19c-43.86-24.988-92.103-55.13-142-88.47zm-44.906 39.81c-11.65 9.32-23.696 18.253-36.03 26.845C342.046 381.51 421.05 416.15 494.655 442.75v-33.22c-58.858-24.223-127.1-58.727-186.906-100zm-58.625 52.033l-46.188 78.25 7.813 23.593 27.75-11.344 10.625-90.5zm15.844.812L316.343 467l36.47 10.28-3.533-31.967-84.31-82.938z"></path>
                </svg>{' '}
                Combat - When you wish to attack, choose one of the actions* and hit initiate. You and your opponents actions are chosen anonymously and resolve simultaneously, from a set priority of actions coupled with initiative. Certain actions, if successful, may cancel out the opponents or otherwise.<br /><br />
                *recorded for confirmation in the combat reader window
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
                <br />
                <p style={{ color: 'gold' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 32 32">
                <path d="M27.026 8.969c0.743-0.896 1.226-2.154 1.226-3.562 0-2.543-1.512-4.65-3.448-4.902-0.129-0.020-0.267 0-0.399 0-0.791 0-1.527 0.305-2.139 0.827l-21.218 1.536 19.521 1.414v0.744c-0.004 0.068-0.007 0.136-0.009 0.205l-19.512 1.413 19.515 1.413v0.949l-19.515 1.413 17.355 1.257v0.262c-0.127 0.324-0.237 0.667-0.333 1.023l-17.023 1.233 16.231 1.175v1.219l-16.231 1.175 16.26 1.177v1.42l-16.26 1.177 18.883 1.367v1.040l-18.883 1.367 19.358 1.402v0.971l-19.358 1.401 19.633 1.422 0.047 0.72h7.096l0.741-9.947h2.793c0-4.765-0.305-11.554-4.332-12.312zM21.202 8.102c0.001 0.002 0.002 0.005 0.004 0.007l-0.064-0.011 0.061 0.004z"></path>
                </svg>{" "}
                Dodge - A high priority action that is effectively 100% avoidance, provided you and your opponent are not performing the same move, which comes down to initiative. The attributes affecting dodge timers also dictate whose performs faster. Go figure?
                </p>
                <br />
                <p style={{ color: '#fdf6d8' }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="20" height="20" viewBox="0 0 511.701 511.701">
                <path d="M505.813,445.48l-7.757-7.757c-7.1-7.1-18.21-7.714-26.078-1.937l-87.424-87.424    c6.656-10.982,11.349-23.074,13.773-35.849c1.493-7.851-0.606-15.804-5.751-21.82c-5.052-5.897-12.39-9.114-20.173-8.892    c-8.064,0.265-15.249,4.352-19.763,10.505l-36.446-36.446L478.881,93.164c0.845-0.845,1.502-1.852,1.929-2.961l30.319-78.592    c1.212-3.149,0.461-6.716-1.929-9.105c-2.389-2.389-5.973-3.149-9.105-1.929l-78.583,30.319c-1.118,0.427-2.125,1.092-2.97,1.929    L255.854,195.521L93.158,32.825c-0.845-0.836-1.852-1.502-2.961-1.929L11.605,0.577C8.464-0.643,4.889,0.116,2.5,2.506    c-2.389,2.389-3.14,5.956-1.929,9.105L30.89,90.203c0.427,1.109,1.084,2.116,1.929,2.961L195.515,255.86l-36.454,36.446    c-4.514-6.153-11.699-10.24-19.763-10.505c-7.842-0.239-15.121,2.995-20.164,8.892c-5.154,6.016-7.253,13.969-5.76,21.82    c2.415,12.749,7.108,24.815,13.79,35.831l-87.441,87.441c-7.868-5.768-18.97-5.163-26.078,1.937l-7.748,7.757    c-7.842,7.842-7.842,20.608,0,28.45l31.881,31.881c3.925,3.925,9.079,5.888,14.234,5.888c5.146,0,10.3-1.963,14.225-5.888    l7.748-7.748c7.108-7.108,7.706-18.21,1.946-26.078l87.236-87.236c11.588,7.177,24.465,12.169,38.127,14.677    c1.485,0.273,2.97,0.401,4.454,0.401c5.837,0,11.537-2.082,16.128-5.973c5.931-5.043,9.259-12.399,9.105-20.216    c-0.162-8.721-4.736-16.469-11.622-20.941l36.497-36.497l36.497,36.497c-6.895,4.471-11.469,12.228-11.631,20.983    c-0.145,7.774,3.174,15.13,9.105,20.173c4.599,3.891,10.3,5.973,16.137,5.973c1.476,0,2.97-0.128,4.454-0.401    c13.662-2.509,26.539-7.501,38.118-14.677l87.236,87.236c-2.526,3.43-3.942,7.518-3.942,11.853c0,5.376,2.091,10.428,5.888,14.225    l7.748,7.748c3.925,3.925,9.079,5.888,14.234,5.888c5.146,0,10.3-1.963,14.225-5.888l31.88-31.872    c3.797-3.806,5.897-8.858,5.897-14.234C511.701,454.329,509.601,449.268,505.813,445.48z M64.076,459.705L52.01,447.63    l84.949-84.958l6.272,6.272l0.077,0.085c0.017,0.017,0.043,0.034,0.06,0.051l5.666,5.666L64.076,459.705z M429.337,46.171    l58.94-22.733l-22.741,58.931L304.127,243.794l-12.075-12.075l149.12-149.112c3.328-3.336,3.328-8.738,0-12.066    c-3.337-3.337-8.738-3.337-12.066,0l-149.12,149.111l-12.066-12.066L429.337,46.171z M201.446,346.467    c-3.524-1.246-6.852-2.876-10.061-4.736c-1.161-0.691-2.313-1.391-3.43-2.159c-0.888-0.597-1.775-1.203-2.628-1.852    c-2.099-1.604-4.156-3.285-6.084-5.171c-1.792-1.818-3.388-3.763-4.907-5.76c-0.777-1.033-1.493-2.099-2.193-3.183    c-0.572-0.853-1.109-1.732-1.63-2.611c-0.888-1.536-1.749-3.089-2.483-4.702c-0.068-0.137-0.12-0.282-0.179-0.418    c-0.87-1.929-1.647-3.908-2.295-5.931l42.027-42.018l36.198,36.207L201.446,346.467z M70.536,82.608    c-3.337-3.336-3.337-8.738,0-12.066c3.328-3.337,8.73-3.337,12.066,0l230.63,230.63c3.337,3.336,3.337,8.738,0,12.066    c-1.664,1.673-3.849,2.5-6.033,2.5c-2.185,0-4.369-0.828-6.033-2.5L70.536,82.608z M381.559,309.33    c-3.388,17.86-11.964,34.176-24.917,47.309l-0.367,0.375c-13.175,13.141-30.549,22.246-48.947,25.626    c-3.063,0.572-5.367-0.887-6.451-1.801c-2.014-1.707-3.14-4.207-3.089-6.878c0.068-4.011,2.816-7.407,6.528-8.09    c1.886-0.341,3.703-0.973,5.555-1.468c0.068-0.017,0.128-0.009,0.196-0.026c0.12-0.034,0.222-0.085,0.341-0.119    c2.85-0.777,5.641-1.707,8.388-2.825c0.742-0.299,1.468-0.64,2.193-0.956c2.21-0.99,4.403-1.997,6.528-3.2    c1.638-0.905,3.2-1.963,4.779-2.995c1.289-0.853,2.603-1.621,3.857-2.56c2.901-2.15,5.7-4.489,8.346-7.083l0.085-0.085    c0.008-0.008,0.017-0.008,0.026-0.026c0.162-0.154,0.282-0.341,0.435-0.503c2.295-2.372,4.437-4.864,6.383-7.501    c1.51-2.014,2.773-4.156,4.053-6.289c0.452-0.751,0.964-1.451,1.382-2.219c1.493-2.697,2.739-5.495,3.883-8.346    c0.094-0.247,0.222-0.486,0.316-0.734c1.143-2.97,2.048-6.007,2.799-9.105c0.034-0.162,0.102-0.307,0.137-0.469    c0.017-0.043,0.009-0.094,0.017-0.145c0.29-1.237,0.725-2.415,0.947-3.669c0.657-3.746,4.019-6.562,7.996-6.69    c0.094-0.009,0.196-0.009,0.29-0.009c3.337,0,5.41,1.826,6.357,2.935C381.371,303.843,382.079,306.6,381.559,309.33z     M493.738,461.864l-31.881,31.881c-1.195,1.186-3.14,1.195-4.318,0l-7.757-7.748c-0.777-0.777-0.887-1.69-0.887-2.159    c0-0.469,0.111-1.382,0.896-2.159l3.866-3.874l24.141-24.132l3.874-3.883c0.597-0.589,1.382-0.888,2.159-0.888    c0.785,0,1.562,0.299,2.159,0.888l7.748,7.757c0.777,0.777,0.896,1.681,0.896,2.159    C494.634,460.174,494.515,461.087,493.738,461.864z"></path>
                </svg>{' '}
                Initiate - Solidifying your choice of action, this triggers the combat resolution for the respective round, and reset attacks for the next. 
                </p>
                <br />
                <p style={{ color: '#fdf6d8' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 512 512">
                <path d="M261.094 16.03l-18.688.032.063 33.282c-15.95.64-31.854 3.145-47.595 7.53l-10.22-33.28-17.874 5.468 10.345 33.594c-12.496 4.636-24.867 10.44-37.03 17.438l-19.126-30.5-15.814 9.906 19.063 30.47c-10.68 7.15-21.16 15.22-31.44 24.218L66.907 90.124l-12.75 13.688 24.875 23.124c-2.465 2.406-4.937 4.83-7.374 7.344l-6.28 6.5 6.28 6.5c54.467 56.233 116.508 85.097 178.906 85.095 62.4-.002 124.43-28.87 178.907-85.094l6.28-6.5-6.28-6.5c-2.38-2.455-4.782-4.835-7.19-7.186l25-23.28-12.717-13.69-26.032 24.22c-9.15-8.024-18.462-15.315-27.936-21.875l19.312-30.782-15.812-9.938-19.188 30.594c-12.823-7.665-25.888-14.007-39.094-19.03l10.313-33.533-17.875-5.468-10.156 33.063c-15.513-4.467-31.21-7.082-46.938-7.906l-.062-33.44zM250.53 70.25c39.147 0 70.69 31.51 70.69 70.656s-31.543 70.688-70.69 70.688c-39.145 0-70.655-31.542-70.655-70.688 0-39.145 31.51-70.656 70.656-70.656zm64.69 9.063c32.377 11.564 64.16 31.955 94.28 61.468-30.015 29.402-61.683 49.757-93.938 61.345 15.08-16.01 24.344-37.562 24.344-61.22 0-23.838-9.4-45.545-24.687-61.593zm-129.408.03c-15.27 16.045-24.656 37.74-24.656 61.563 0 23.64 9.25 45.18 24.313 61.188-32.218-11.596-63.837-31.944-93.814-61.313 30.092-29.474 61.823-49.863 94.156-61.436zm64.75 10.813c-27.99 0-50.687 22.696-50.687 50.688 0 27.99 22.696 50.656 50.688 50.656 27.99 0 50.687-22.667 50.687-50.656 0-27.992-22.696-50.688-50.688-50.688zm78.875 146.406c-25.884 9.117-52.37 13.72-78.875 13.72-16.853 0-33.69-1.897-50.375-5.595l59.594 51.125-93.686 2.5L419.53 492.188l-85.81-144.375 71.53-.718-75.813-110.53z"></path>
                </svg>{' '}
                Invoke - Your Mastery and Adherence or Devotion dictate what you can perform in an instant, a potentially life altering choice. As you grow, so too does your ability to sway chance.
                </p>
                <p style={{ color: 'gold', fontSize: 25 + 'px' }}>Good luck, and have fun!</p>
                And don't forget, if you need to refer to this once more, it'll be available in your settings.
                <Button variant='' style={{ float: "right", fontSize: "24px", zIndex: 9999, marginLeft: "90vw", color: "red" }} onClick={() => completeTutorial('firstCombat', player._id)}>X</Button>
                </h6> 
            ) : ( '' ) }
            { firstDeath ? (
                <h6 className='overlay-content' style={{ animation: "fade 1s ease-in 0.5s forwards", marginTop: "25%", width: "99%" }}> 
                    Welcome to your first death, {player.name}! If you are reading this, it ain't hardcore so never fear.<br /><br />
                    <p style={{ color: '#fdf6d8' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="24" height="24" viewBox="0 0 436.028 436.028">
                    <path d="M416.242,385.134c-4.974-2.112-10.893-4.122-17.701-6.02c5.432-17.537,33.617-26.237,33.919-26.329    c2.023-0.605,3.448-2.416,3.56-4.525c0.111-2.109-1.113-4.061-3.06-4.876c-24.541-10.283-48.866-7.254-59.377-5.133    c-0.322-5.05,0.156-12.962,1.022-19.423c0.203-1.523-0.305-3.056-1.378-4.156c-1.072-1.099-2.591-1.644-4.119-1.479    c-5.784,0.63-11.288,2.605-16.462,5.85v-215.96c0-2.761-2.238-5-5-5h-30.842c-3.337-39.962-46.371-71.685-98.79-71.685    s-95.453,31.723-98.79,71.685H88.382c-2.761,0-5,2.239-5,5v215.949c-5.173-3.245-10.678-5.209-16.462-5.838    c-1.529-0.165-3.047,0.38-4.12,1.479c-1.073,1.1-1.581,2.633-1.377,4.156c0.865,6.461,1.343,14.373,1.021,19.423    c-10.511-2.121-34.838-5.149-59.376,5.133c-1.951,0.817-3.173,2.774-3.058,4.885c0.116,2.112,1.55,3.923,3.578,4.522    c0.307,0.091,28.666,8.685,33.949,26.309c-6.83,1.903-12.766,3.917-17.751,6.034C6.472,390.788,0,397.165,0,404.63    c0,1.326,0.527,2.598,1.464,3.536c0.938,0.938,2.209,1.464,3.536,1.464h426.027c1.326,0,2.598-0.527,3.535-1.464    c0.938-0.938,1.465-2.209,1.465-3.536C436.027,397.165,429.556,390.788,416.242,385.134z M352.646,331.53    c3.577-3.22,7.351-5.543,11.282-6.949c-0.583,6.89-0.931,16.656,1.089,21.625c0.969,2.385,3.592,3.644,6.057,2.91    c0.247-0.073,21.458-6.21,45.456-0.567c-10.343,5.183-23.664,14.299-27.693,28.081c-5.916-1.397-12.352-2.725-19.315-3.976    c-5.396-0.969-11.033-1.878-16.876-2.729V331.53z M93.382,108.082h30.634c2.761,0,5-2.239,5-5    c0-36.77,39.924-66.685,88.998-66.685c49.073,0,88.998,29.915,88.998,66.685c0,2.761,2.238,5,5,5h30.634v260.47    c-3.538-0.457-7.14-0.894-10.809-1.309V124.394c0-2.761-2.238-5-5-5h-28.378v-6.418c0-16.842-8.72-33.665-23.924-46.153    C259.153,54.188,239.08,47.23,218.014,47.23c-21.066,0-41.139,6.958-56.522,19.593c-15.204,12.489-23.924,29.311-23.924,46.153    v6.418H109.19c-2.761,0-5,2.239-5,5v242.848c-3.669,0.415-7.271,0.853-10.809,1.309V108.082z M293.459,129.394h28.378V366.18    c-31.427-3.14-66.918-4.811-103.823-4.811c-36.906,0-72.397,1.671-103.823,4.811V129.394h28.378c2.761,0,5-2.239,5-5v-11.418    c0-29.697,32.918-55.747,70.445-55.747c37.527,0,70.445,26.05,70.445,55.747v11.418    C288.459,127.156,290.697,129.394,293.459,129.394z M19.604,348.531c23.887-5.56,45.107,0.513,45.35,0.585    c2.466,0.734,5.088-0.525,6.057-2.91c2.02-4.968,1.672-14.734,1.089-21.625c3.932,1.406,7.705,3.73,11.282,6.951v38.393    c-5.843,0.852-11.48,1.76-16.875,2.729c-6.943,1.247-13.362,2.571-19.265,3.964C43.297,362.787,29.984,353.693,19.604,348.531z     M13.881,399.63c6.489-4.793,22.138-11.341,54.393-17.134c39.95-7.176,93.128-11.128,149.74-11.128s109.79,3.952,149.739,11.128    c32.256,5.793,47.905,12.342,54.393,17.134H13.881z"></path>
                    <path d="M296.211,220.087H139.816c-2.761,0-5-2.239-5-5v-48.659c0-2.761,2.239-5,5-5h156.395c2.762,0,5,2.239,5,5v48.659     C301.211,217.848,298.973,220.087,296.211,220.087z M144.816,210.087h146.395v-38.659H144.816V210.087z"></path>
                    </svg>{' '}
                    Death - At the moment this is not heavily designed for punishment, as it's a prototype and not all consequences need to be dialed in at the moment. For now, you simply must find a way to regain your health: drinking Fyervas Firewater, resting at an Inn in a City, praying in Combat, refreshing your browser, etc.
                    </p>
                    Future Concerns to Mull Around: Experience loss, inventory loss, attribute degradation, etc.
                <Button variant='' style={{ float: "right", fontSize: "24px", zIndex: 9999, marginLeft: "90vw", color: "red" }} onClick={() => completeTutorial('firstDeath', player._id)}>X</Button>
                </h6> 
            ) : ( '') }
            { firstInventory ? (
                <h6 className='overlay-content' style={{ animation: "fade 1s ease-in 0.5s forwards", marginTop: "75%", width: "99%" }}>
                    Welcome again, {player.name}, it appears you've opened your inventory with an item for the first time!<br /><br />
                    <p style={{ color: '#fdf6d8' }}>
                    Inventory - Here you are able to view item statistics, and inspect for use in various ways. If you are of the mind, you may even be able to find a way to tinker with them.
                    </p>
                    Equip - This will swap items of the same oritentation once chosen and selected.
                    <p style={{ color: '#fdf6d8' }}>
                    Sedyrist - If you're of the ability, you may be able to find a way to tinker with your items to curious effect.
                    </p>
                    Remove - This will remove the item from your inventory, and permanently destroy it.<br /><br />
                    <br /><br />
                    <p style={{ color: '#fdf6d8' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 512 512">
                    <path d="M29.438 59.375c-3.948.032-7.903.093-11.875.188 4.333 2.772 8.685 5.483 13.062 8.124C126.162 123.92 230.69 151.4 340.5 180.594c.022.006.04.025.063.03.02.006.043-.004.062 0 1.87.498 3.72 1.003 5.594 1.5l.155-.53c.947.078 1.91.125 2.875.125 4.26 0 8.34-.767 12.125-2.19l-12.5 46.595 18.063 4.813L383 170.968c25.828 1.312 50.508 6.867 74.28 15.845-1.065 11.948 2.73 21.82 9.814 23.718 8.71 2.335 19.136-8.313 23.28-23.78 1.27-4.742 1.78-9.366 1.657-13.594l.345-1.28c-.136-.008-.27-.025-.406-.032-.56-8.924-4.116-15.77-9.876-17.313-6.808-1.823-14.666 4.304-19.75 14.44-25.275-3.725-49.624-10.894-72.47-23.69l16.345-60.968-18.033-4.843-12.093 45.155c-3.24-3.908-7.318-7.1-11.938-9.313l.094-.374C250.12 83.98 144.89 58.446 29.437 59.374zm161.25 44.25c55.52-.002 105.272 12.492 159.656 27.03 8.536.55 15.094 7.463 15.094 16.157 0 9.06-7.127 16.22-16.188 16.22-2.4 0-4.653-.5-6.688-1.407-56.172-15.04-109.352-27.786-157.406-57.97 1.85-.027 3.694-.03 5.53-.03zm-46.22 164.25v20.344H55.532c15.996 38.806 51.258 65.428 88.94 74.28v32.97h58.56c-12.115 30.534-33.527 55.682-58.5 77.592h-25.436v18.72h284.344v-18.72H376c-28.728-21.894-50.024-47.016-61.594-77.593h63.656V366.31c19.75-6.995 39.5-19.54 59.25-36.718-19.806-17.518-39.235-27.25-59.25-31.938v-29.78H144.47z"></path>
                    </svg>{' '}- The inventory itself can be changed with dragging and dropping your items to realign them as you see fit. This allows you to save the position of your inventory.
                    </p>
                <Button variant='' style={{ float: "right", fontSize: "24px", zIndex: 9999, marginLeft: "90vw", color: "red" }} onClick={() => completeTutorial('firstInventory', player._id)}>X</Button>
                </h6>
            ) : ( '') }
            { firstLevelUp ? (
                <h6 className='overlay-content' style={{ animation: "fade 1s ease-in 0.5s forwards", width: "99%", marginTop: "75%" }}>
                    <br /><br /><br /><br />
                    Welcome {player.name} to your first level up!
                    <br /><br />
                    <p style={{ color: '#fdf6d8' }}>
                    <svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" fill="currentColor" viewBox="0 0 1000 1000">
                    <path transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)" d="M6619.3,4995c-12.4-8.2-37.1-65.9-53.5-127.7c-16.5-61.8-37.1-111.2-47.4-109.1c-420.1,80.3-747.5,90.6-883.4,28.8c-109.1-49.4-142.1-90.6-185.3-236.8c-74.1-238.9-271.8-471.5-492.1-578.6c-300.6-144.1-617.7-156.5-1165.5-43.2c-436.5,90.6-803.1,127.7-978.1,98.8l-123.5-20.6l164.7-2.1c255.3-6.2,455.1-49.4,776.3-173c325.3-125.6,570.4-199.7,661-199.7c115.3,0,30.9-37.1-115.3-51.5c-187.4-18.5-374.8,10.3-716.6,105c-152.4,41.2-345.9,78.2-463.3,88.5c-205.9,18.5-267.7,14.4-160.6-8.2c187.4-41.2,442.7-123.5,615.7-197.7c304.7-129.7,527.1-168.8,947.2-168.8c796.9,2,1079,173,1120.2,683.6c8.2,96.8,26.8,197.7,39.1,220.3c59.7,113.3,317.1,117.4,628,12.4c100.9-32.9,185.3-65.9,189.4-70c8.2-8.2-947.2-3183.4-961.6-3197.8c-4.1-6.2-133.8,41.2-288.3,105c-220.3,90.6-284.2,125.6-302.7,166.8c-14.4,28.8-20.6,53.5-18.5,55.6c4.1,2.1,45.3,22.7,94.7,43.2c177.1,76.2,313,275.9,313,455.1c0,55.6-4.1,57.7-298.6,103c-123.6,18.5-232.7,41.2-243,47.4c-8.2,8.2,59.7,70,150.3,135.9c90.6,67.9,162.7,131.8,158.6,144.1c-2.1,10.3-68,51.5-144.1,90.6c-121.5,61.8-160.6,70-288.3,70c-551.9,0-766-566.3-352.1-930.7c53.5-47.4,105-84.4,115.3-84.4c28.8,0-2.1-133.8-111.2-471.5c-80.3-247.1-100.9-333.6-90.6-395.4c14.4-86.5,12.4-88.5-164.7-111.2l-103-12.4l26.8-220.3c74.1-591,348-1142.8,722.7-1455.8c193.6-162.7,500.4-310.9,745.4-360.4c313-63.8,337.7-61.8,492.1,76.2c107.1,96.8,127.7,107.1,115.3,65.9c-26.8-92.7-152.4-348-224.5-457.1c-88.5-133.8-257.4-306.8-282.1-290.3c-10.3,6.2-18.5,51.5-18.5,100.9c0,100.9-74.1,360.4-103,360.4c-10.3,0-24.7-35-30.9-78.2c-22.7-131.8-32.9-152.4-131.8-257.4c-84.4-92.7-313-261.5-354.2-261.5c-16.5,0-18.5,12.4-59.7,253.3c-14.4,76.2-30.9,138-39.1,138s-30.9-30.9-49.4-70c-18.5-39.1-80.3-109.1-140-156.5c-121.5-94.7-385-257.4-399.5-243c-4.1,4.1,14.4,67.9,45.3,140c123.5,306.8,111.2,539.5-37.1,784.5c-142.1,236.8-173,426.2-113.3,683.6l26.8,117.4l-94.7-53.5c-665.1-385-838.1-976-516.8-1770.8c24.7-59.7,16.5-80.3-234.7-539.5c-142.1-263.6-259.5-483.9-259.5-490.1s131.8-230.6,290.3-496.3l290.3-483.9l-12.4-142.1l-14.4-142.1h288.3c160.6,0,290.3,6.2,290.3,12.3c0,6.2-39.1,78.3-86.5,158.6c-78.2,133.8-490.1,1011-490.1,1044c0,6.2,49.4,28.8,111.2,47.4c269.7,86.5,553.9,337.7,827.8,733.1c4.1,4.1,278,74.1,609.5,156.5c640.4,160.6,984.3,267.7,1334.3,416c333.6,142.1,683.6,341.8,825.7,473.6l53.6,49.4l407.7-84.4c224.5-45.3,413.9-86.5,418-90.6c4.1-6.2-47.4-90.6-115.3-191.5l-123.5-185.3l216.2-96.8c117.4-53.5,218.3-94.7,222.4-90.6c8.2,8.3,195.6,704.2,189.4,708.3c-2.1,2.1-189.4,113.3-415.9,245c-226.5,133.8-420.1,249.2-430.4,257.4c-8.2,10.3,12.4,59.7,49.4,113.3c90.6,131.8,195.6,368.6,224.5,500.4c39.1,185.3,14.4,654.8-37.1,710.4c-8.2,8.2-82.4-12.4-162.7-47.4c-284.2-121.5-467.4-152.4-873.1-154.4c-199.7,0-368.6,4.1-374.8,10.3c-4.1,6.2-16.5,59.7-24.7,121.5c-14.4,107.1-12.4,109.1,30.9,94.7c76.2-22.6,599.2-16.5,743.3,8.2c263.6,47.4,597.1,179.2,597.1,236.8c0,96.8-47.4,156.5-179.1,222.4c-255.3,125.6-434.5,358.3-444.8,574.5c-4.1,80.3,4.1,111.2,30.9,129.7c61.8,39.1,107.1-8.2,121.5-127.7c28.8-232.7,212.1-399.5,586.9-537.4c164.7-59.7,269.8-148.3,296.5-247.1c28.8-113.3,103-140,253.3-96.8c267.7,78.3,288.3,222.4,92.7,654.8c-78.2,175-80.3,185.3-59.7,298.6c47.4,255.3,18.5,383-154.4,658.9l-96.8,156.5l61.8,210l61.8,212.1l-140,22.7c-203.9,32.9-591,28.8-766-10.3c-457.1-100.9-842.2-440.6-1039.9-920.4c-78.2-183.3-162.7-471.5-181.2-611.6c-8.2-55.6-20.6-103-28.8-103s-47.4,59.7-84.4,133.8c-43.3,80.3-80.3,129.7-94.7,123.5c-14.4-4.1-26.8,4.1-26.8,18.5c0,16.5,55.6,308.9,121.5,652.8c67.9,343.9,222.4,1130.5,341.8,1748.2c119.4,617.7,230.6,1190.2,247.1,1274.6c22.6,113.3,24.7,158.6,8.3,179.2C6687.3,5015.6,6656.4,5017.6,6619.3,4995z M8180.1,1471.8c70-72.1,76.2-140,16.5-216.2c-86.5-109.1-286.2-43.2-286.2,94.7C7910.4,1517.1,8064.8,1585.1,8180.1,1471.8z M5929.5,436.1c205.9-630.1,100.9-1202.5-290.3-1579.3l-94.7-92.7l-158.6,35C4875.2-1089.7,4473.7-669.7,4309-74.6c-61.8,220.3-63.8,216.2,90.6,253.3c243,59.7,469.5,203.9,568.3,362.4c28.8,47.4,30.9,47.4,111.2,12.4c129.7-57.7,415.9-51.5,597.1,14.4c80.3,28.8,154.4,53.5,166.8,55.6C5855.4,623.5,5894.5,539,5929.5,436.1z"></path>
                    <path transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)" d="M3596.5,2511.7c-127.7-57.7-263.6-208-306.8-335.6c-20.6-59.7-32.9-166.8-32.9-288.3c0-339.8-59.7-385-374.8-280c-59.7,18.5-45.3-94.7,22.7-205.9c88.6-135.9,205.9-210,339.8-208c203.9,4.1,366.5,117.4,420.1,296.5c12.4,39.1,28.8,156.5,37.1,257.4c14.4,193.6,41.2,265.6,109.1,288.3c24.7,6.2,45.3,39.1,55.6,78.2c18.5,90.6,59.7,164.7,133.8,251.2c53.5,61.8,59.7,78.2,37.1,105C3954.8,2571.4,3761.2,2589.9,3596.5,2511.7z"></path>
                    <path transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)" d="M1341.8-109.6c-28.8-4.1-119.4-28.8-201.8-51.5c-156.5-45.3-160.6-61.8-16.5-86.5c105-20.6,282.1-98.9,372.7-168.9c41.2-30.9,98.8-98.8,129.7-150.3c49.4-82.4,55.6-115.3,53.5-259.5c0-133.8-12.4-191.5-61.8-308.9c-51.5-125.6-59.7-168.8-59.7-339.7c0-175,8.2-210,65.9-331.5c129.7-278,315-411.8,593-426.3c243-12.3,459.2,70,737.2,280c88.5,68,96.8,82.4,96.8,160.6c0,80.3,28.8,263.6,53.5,341.8c8.2,28.8-4.1,28.8-119.4-8.2c-189.4-59.7-422.1-72.1-508.6-28.8c-109.1,57.6-135.9,148.3-105,366.5c35,245,18.5,473.6-43.2,603.3c-127.7,269.8-418,426.3-780.4,420.1C1463.3-99.3,1370.6-105.5,1341.8-109.6z"></path>
                    <path transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)" d="M8620.8-496.7c-10.3-4.1-148.3-37.1-302.7-72.1c-205.9-47.4-284.2-74.1-284.2-96.8c0-57.6-103-337.7-154.4-418c-28.8-45.3-51.5-86.5-51.5-92.7s49.4,14.4,109.1,43.3c57.7,30.9,191.5,94.7,294.5,142.1l189.4,88.5l98.8-88.5l100.9-88.5l-80.3-166.8c-45.3-90.6-74.1-173-65.9-181.2c8.2-8.2,105-74.1,214.1-144.1c148.3-94.7,203.9-119.4,214.2-100.9c39.1,72.1,78.2,284.2,78.2,434.5c0,152.4-6.2,181.2-82.4,337.7c-65.9,133.8-243,422.1-255.3,411.8C8641.4-488.5,8633.1-492.6,8620.8-496.7z"></path>
                    <path transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)" d="M5037.9-2842.1c-181.2-49.4-352.1-94.7-380.9-100.9c-45.3-10.3-57.7-30.9-78.2-133.9c-24.7-121.5-140-380.9-238.9-535.4c-28.8-47.4-53.5-88.5-53.5-94.7c0-6.2,821.6-741.3,914.2-817.5c37.1-30.9,37.1-37.1,6.2-131.8c-20.6-55.6-35-107.1-35-117.4c0-8.2,115.3-16.5,255.3-16.5h257.4l-49.4,144.2c-47.4,135.9-70,166.8-444.8,570.4L4797-3647.2l57.7,41.2c123.5,84.4,313,294.4,383,422.1c65.9,115.3,160.6,364.5,160.6,415.9C5398.3-2745.3,5412.7-2743.2,5037.9-2842.1z"></path>
                    </svg>{' '}
                    Leveling - As you are able to defeat opponents of various qualities, you invariably gain experience, which allows you to level. Leveling has several consequences, gaining strength in yourself and the utilization of your equipment's quality.
                    </p>
                    Every second level, you receive 4 attribute points to distribute and increase the capability of {player.name} in grand and impercetable ways. Leveling also regains your health back to 100%, and resets your current weapon line-up.
                    <br /><br />
                    <p style={{ color: '#fdf6d8' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 512 512">
                    <path d="M29.438 59.375c-3.948.032-7.903.093-11.875.188 4.333 2.772 8.685 5.483 13.062 8.124C126.162 123.92 230.69 151.4 340.5 180.594c.022.006.04.025.063.03.02.006.043-.004.062 0 1.87.498 3.72 1.003 5.594 1.5l.155-.53c.947.078 1.91.125 2.875.125 4.26 0 8.34-.767 12.125-2.19l-12.5 46.595 18.063 4.813L383 170.968c25.828 1.312 50.508 6.867 74.28 15.845-1.065 11.948 2.73 21.82 9.814 23.718 8.71 2.335 19.136-8.313 23.28-23.78 1.27-4.742 1.78-9.366 1.657-13.594l.345-1.28c-.136-.008-.27-.025-.406-.032-.56-8.924-4.116-15.77-9.876-17.313-6.808-1.823-14.666 4.304-19.75 14.44-25.275-3.725-49.624-10.894-72.47-23.69l16.345-60.968-18.033-4.843-12.093 45.155c-3.24-3.908-7.318-7.1-11.938-9.313l.094-.374C250.12 83.98 144.89 58.446 29.437 59.374zm161.25 44.25c55.52-.002 105.272 12.492 159.656 27.03 8.536.55 15.094 7.463 15.094 16.157 0 9.06-7.127 16.22-16.188 16.22-2.4 0-4.653-.5-6.688-1.407-56.172-15.04-109.352-27.786-157.406-57.97 1.85-.027 3.694-.03 5.53-.03zm-46.22 164.25v20.344H55.532c15.996 38.806 51.258 65.428 88.94 74.28v32.97h58.56c-12.115 30.534-33.527 55.682-58.5 77.592h-25.436v18.72h284.344v-18.72H376c-28.728-21.894-50.024-47.016-61.594-77.593h63.656V366.31c19.75-6.995 39.5-19.54 59.25-36.718-19.806-17.518-39.235-27.25-59.25-31.938v-29.78H144.47z"></path>
                    </svg>{' '}
                    Gear - Common and Uncommon quality scale with leveling, yet Rare and Epic are refined to a degree that even a novice would feel its improvement.
                    </p>
                    Common - Scales to level 4.<br /><br />
                    Uncommon - Scales to level 8. (Req. Level 4)<br /><br />
                    Rare - No Scaling ATM. (Req. Level 6)<br /><br />
                    Epic - No Scaling. (Req. Level 12)
                <Button variant='' style={{ float: "right", fontSize: "24px", zIndex: 9999, marginLeft: "90vw", color: "red" }} onClick={() => completeTutorial('firstLevelUp', player._id)}>X</Button>
                </h6>
            ) : ( '') }
            { firstLoot ? (
                <h6 className='overlay-content' style={{ animation: "fade 1s ease-in 0.5s forwards", marginTop: "25%", width: "99%"}}>
                    Congratulations {player.name} on your first piece of equipment you've come across.
                    <br /><br />
                    <p style={{ color: '#fdf6d8' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 512 512">
                    <path d="M29.438 59.375c-3.948.032-7.903.093-11.875.188 4.333 2.772 8.685 5.483 13.062 8.124C126.162 123.92 230.69 151.4 340.5 180.594c.022.006.04.025.063.03.02.006.043-.004.062 0 1.87.498 3.72 1.003 5.594 1.5l.155-.53c.947.078 1.91.125 2.875.125 4.26 0 8.34-.767 12.125-2.19l-12.5 46.595 18.063 4.813L383 170.968c25.828 1.312 50.508 6.867 74.28 15.845-1.065 11.948 2.73 21.82 9.814 23.718 8.71 2.335 19.136-8.313 23.28-23.78 1.27-4.742 1.78-9.366 1.657-13.594l.345-1.28c-.136-.008-.27-.025-.406-.032-.56-8.924-4.116-15.77-9.876-17.313-6.808-1.823-14.666 4.304-19.75 14.44-25.275-3.725-49.624-10.894-72.47-23.69l16.345-60.968-18.033-4.843-12.093 45.155c-3.24-3.908-7.318-7.1-11.938-9.313l.094-.374C250.12 83.98 144.89 58.446 29.437 59.374zm161.25 44.25c55.52-.002 105.272 12.492 159.656 27.03 8.536.55 15.094 7.463 15.094 16.157 0 9.06-7.127 16.22-16.188 16.22-2.4 0-4.653-.5-6.688-1.407-56.172-15.04-109.352-27.786-157.406-57.97 1.85-.027 3.694-.03 5.53-.03zm-46.22 164.25v20.344H55.532c15.996 38.806 51.258 65.428 88.94 74.28v32.97h58.56c-12.115 30.534-33.527 55.682-58.5 77.592h-25.436v18.72h284.344v-18.72H376c-28.728-21.894-50.024-47.016-61.594-77.593h63.656V366.31c19.75-6.995 39.5-19.54 59.25-36.718-19.806-17.518-39.235-27.25-59.25-31.938v-29.78H144.47z"></path>
                    </svg>{' '}
                    Loot - Equipment and its improvement is paramount to your success as you gain power to combat tougher enemies. No item is unique and can be held and worn in multiplicity. You can also use your gear to craft higher quality items. Common and Uncommon quality scale with leveling, yet Rare and Epic are refined to a degree that even a novice would feel its improvement.
                    </p>
                    If you wish to keep the item, inspect the gear itself and click 'save' in order to add it into your inventory. If you do not and exit the conversation, it will be lost forever.
                <Button variant='' style={{ float: "right", fontSize: "24px", zIndex: 9999, marginLeft: "90vw", color: "red" }} onClick={() => completeTutorial('firstLoot', player._id)}>X</Button>
                </h6>
            ) : ( '' ) }
            { firstMovement ? (
                <h6 className='overlay-content' style={{ animation: "fade 1s ease-in 0.5s forwards", width: "99%", marginTop: "75%" }}>First Move
                <Button variant='' style={{ float: "right", fontSize: "24px", zIndex: 9999, marginLeft: "90vw", color: "red" }} onClick={() => completeTutorial('firstMovement', player._id)}>X</Button>
                </h6>
            ) : ( '' ) }

            { firstPhenomena ? (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Typewriter stringText={typewriterString} styling={{ overflowY: 'auto' }} performAction={performAction} />
                </div>
            ) : ( '' ) }

            { firstQuest ? (
                <h6 className='overlay-content' style={{ animation: "fade 1s ease-in 0.5s forwards", marginTop: "25%" }}>First Quest
                <Button variant='' style={{ float: "right", fontSize: "24px", zIndex: 9999, marginLeft: "90vw", color: "red" }} onClick={() => completeTutorial('firstQuest', player._id)}>X</Button>
                </h6>
            ) : ( '' ) }
            { firstShop ? (
                <h6 className='overlay-content' style={{ animation: "fade 1s ease-in 0.5s forwards" }}>First Shop
                <Button variant='' style={{ float: "right", fontSize: "24px", zIndex: 9999, marginLeft: "90vw", color: "red" }} onClick={() => completeTutorial('firstShop', player._id)}>X</Button>
                </h6>
            ) : ( '' ) }
            { !firstBoot && !firstPhenomena && !firstCity && !firstCombat && !firstDeath && !firstInventory && !firstLevelUp && !firstLoot && !firstMovement && !firstQuest && !firstShop && 
                <h6 className='overlay-content' style={{ animation: "fade 1s ease-in 0.5s forwards" }}>Nothing to see here!
                <Button variant='' style={{ float: "right", fontSize: "24px", zIndex: 9999, marginLeft: "90vw", color: "red" }} onClick={() => completeTutorial('', player._id)}>X</Button>
                </h6> 
            }
        </div>
    );
};

export default Tutorial;