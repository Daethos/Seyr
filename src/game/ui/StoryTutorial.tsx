import { useEffect, useState } from 'react'
import * as asceanAPI from '../../utils/asceanApi';
import Button from 'react-bootstrap/Button';
import { setAttributes, setFirewater, setJournal, setTutorial, setTutorialContent } from '../../game/reducers/gameState';
import dialogWindow from '../../game/images/dialog_window.png';
import { shakeScreen } from '../../components/GameCompiler/CombatStore';
import Typewriter from '../../components/GameCompiler/Typewriter';
import { CombatSettings, InventorySettings, TacticSettings } from '../../components/GameCompiler/SettingConcerns';

interface TutorialProps {
    player: any;
    dispatch: React.Dispatch<any>;
    tutorial: string;
};

const Tutorial = ({ player, dispatch, tutorial }: TutorialProps) => { 
    const [typewriterString, setTypewriterString] = useState<string>('');
    function performAction(actionName: string) {
        console.log(actionName, "Action Name of Perform Action Function")
        const actionFunction = actions[actionName as keyof typeof actions];
        if (actionFunction) {
            actionFunction();
        };
    };
    const actions = {
        rebukePlayer: (): Promise<void> => rebukePlayer(),
        blessPlayer: (): Promise<void> => blessPlayer(),
    };

    useEffect(() => {
        if (tutorial === 'firstPhenomena') {
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
            
                <p className='${player.faith === 'adherent' ? 'adherentText' : player?.faith === 'devoted' ? 'devotedText' : 'otherText'}'>You become attuned to a halt and paltry whisper, it rings and stretches your soft edges, serenity begging you hither.</p>
                <p className='whisperText'>
                ^500 "Who are you?" 
                </p>
                <p className='journeyText'>
                    [If you wish to peer into the land of Hush and Tendril and begin a journey of yourself and what you mean to this world, click upon the avatar. You may rebuke this ^500 calling.] 
                </p>
                <Button variant='' className='rebukeButton' data-function-name='rebukePlayer'>X</Button>
                </h6>`
                );
            };
    }, []);
    const completeTutorial = async (tutorial: string, ascean: string): Promise<void> => {
        const data = { ascean, tutorial };
        const res = await asceanAPI.saveTutorial(data);
        dispatch(setTutorial(res.tutorial));
        dispatch(setTutorialContent(null));
    };
    const blessPlayer = async (): Promise<void> => {
        try {
            shakeScreen({ duration: 1500, intensity: 1.5});
            const response = await asceanAPI.blessAscean(player._id);
            const entry = {
                title: 'Who am I?',
                body: `You felt the presence of... ${highestFaith()}? \n\n You become attuned to a halt and paltry whisper, ringing, it stretches your soft edges, serenity begging you hither. \n\n "Who are you?"`,
                footnote: `Seems you've been blessed by ${highestFaith()}, or some greater mimicry of it. It asked who you were, how would it not know?`,
                date: Date.now(),
                location: 'Unknown',
                coordinates: { x: 0, y: 0 },
            };
            const data = { asceanID: player._id, entry };
            const res = await asceanAPI.saveJournalEntry(data); 
            dispatch(setJournal(res.journal));
            dispatch(setAttributes(response));
            await completeTutorial('firstPhenomena', player._id);
            dispatch(setTutorialContent(null));
        } catch (err: any) {
            console.log(err, '%c <- You have an error in blessing a player', 'color: red')
        };
    };
    const rebukePlayer = async (): Promise<void> => {
        try {
            shakeScreen({ duration: 1500, intensity: 1.5});
            const response = await asceanAPI.curseAscean(player._id);
            const entry = {
                title: 'Who am I?',
                body: `You felt the presence of... ${highestFaith()}? \n\n You become attuned to a halt and paltry whisper, ringing, it stretches your soft edges, serenity begging you hither. \n\n "Who are you?"`,
                footnote: `Some mimicry of ${highestFaith()} asked who you were, as though the true incarnation would not know? Careful of what you rebuke, ${player.name}.`,
                date: Date.now(),
                location: 'Unknown',
                coordinates: { x: 0, y: 0 },
            };
            const data = { asceanID: player._id, entry };
            const res = await asceanAPI.saveJournalEntry(data);
            dispatch(setJournal(res.journal));
            dispatch(setAttributes(response));
            dispatch(setFirewater(response.firewater)); 
            await completeTutorial('firstPhenomena', player._id);
            dispatch(setTutorialContent(null));
        } catch (err: any) {
            console.log(err, '%c <- You have an error in rebuking a player', 'color: red');
        };
    };

    const highestFaith = () => {
        const influences = [player.weapon_one.influences[0], player.weapon_two.influences[0], player.weapon_three.influences[0], player.amulet.influences[0], player.trinket.influences[0]];
        const faithsCount = influences.reduce((acc: any, faith: any) => {
            if (acc[faith]) { acc[faith]++; } else { acc[faith] = 1; };
            return acc;
        }, {});
        const faithsArray = Object.entries(faithsCount).filter((faith: any) => faith[0] !== '');
        const highestFaith = faithsArray.reduce((acc: any, faith: any) => {
            if (acc[1] < faith[1]) acc = faith;
            return acc;
        }, faithsArray[0]);
        return highestFaith[0];
    };

    return (
        <div className='d-flex align-items-center justify-content-center' style={{
          position: 'absolute', top: 0, left: 0,
          width: '100%', height: '100%', // tutorial === 'firstPhenomena' ? '100vh' : 
          zIndex: 99999,  color: "#fdf6d8" }}>
            <img src={dialogWindow} alt='Dialog Window' style={{ transform: "scale(1.5)" }} />
            { tutorial === 'firstBoot' ? (
                <h6 className='overlay-content' style={{ animation: "fade 1s ease-in 0.5s forwards" }}>
                Welcome to the Ascea, {player.name}. Below explains the general premise and gameplay loop which is a work in progress.<br /><br />
                </h6>
            ) : ( '' ) }
            { tutorial === 'firstCity' ? (
                <h6 className='overlay-content' style={{ animation: "fade 1s ease-in 0.5s forwards", width: "65%" }}>
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
            { tutorial === 'firstCombat' ? (
                <h6 className='overlay-content' style={{ animation: "fade 1s ease-in 0.5s forwards", marginTop: "75%", width: "65%" }}>
                Welcome to your first combat encounter, {player.name}. Below explains the series of actions in conception and execution.<br /><br />
                <CombatSettings />
                <TacticSettings />
                <p style={{ color: 'gold', fontSize: 25 + 'px' }}>Good luck, and have fun!</p>
                And don't forget, if you need to refer to this once more, it'll be available in your settings.
                <Button variant='' style={{ float: "right", fontSize: "24px", zIndex: 9999, marginLeft: "90vw", color: "red" }} onClick={() => completeTutorial('firstCombat', player._id)}>X</Button>
                </h6> 
            ) : ( '' ) }
            { tutorial === 'firstDeath' ? (
                <h6 className='overlay-content' style={{ animation: "fade 1s ease-in 0.5s forwards", width: "65%" }}> 
                    Welcome to your first death, {player.name}!<br /><br />
                    <p style={{ color: '#fdf6d8' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="24" height="24" viewBox="0 0 436.028 436.028">
                    <path d="M416.242,385.134c-4.974-2.112-10.893-4.122-17.701-6.02c5.432-17.537,33.617-26.237,33.919-26.329    c2.023-0.605,3.448-2.416,3.56-4.525c0.111-2.109-1.113-4.061-3.06-4.876c-24.541-10.283-48.866-7.254-59.377-5.133    c-0.322-5.05,0.156-12.962,1.022-19.423c0.203-1.523-0.305-3.056-1.378-4.156c-1.072-1.099-2.591-1.644-4.119-1.479    c-5.784,0.63-11.288,2.605-16.462,5.85v-215.96c0-2.761-2.238-5-5-5h-30.842c-3.337-39.962-46.371-71.685-98.79-71.685    s-95.453,31.723-98.79,71.685H88.382c-2.761,0-5,2.239-5,5v215.949c-5.173-3.245-10.678-5.209-16.462-5.838    c-1.529-0.165-3.047,0.38-4.12,1.479c-1.073,1.1-1.581,2.633-1.377,4.156c0.865,6.461,1.343,14.373,1.021,19.423    c-10.511-2.121-34.838-5.149-59.376,5.133c-1.951,0.817-3.173,2.774-3.058,4.885c0.116,2.112,1.55,3.923,3.578,4.522    c0.307,0.091,28.666,8.685,33.949,26.309c-6.83,1.903-12.766,3.917-17.751,6.034C6.472,390.788,0,397.165,0,404.63    c0,1.326,0.527,2.598,1.464,3.536c0.938,0.938,2.209,1.464,3.536,1.464h426.027c1.326,0,2.598-0.527,3.535-1.464    c0.938-0.938,1.465-2.209,1.465-3.536C436.027,397.165,429.556,390.788,416.242,385.134z M352.646,331.53    c3.577-3.22,7.351-5.543,11.282-6.949c-0.583,6.89-0.931,16.656,1.089,21.625c0.969,2.385,3.592,3.644,6.057,2.91    c0.247-0.073,21.458-6.21,45.456-0.567c-10.343,5.183-23.664,14.299-27.693,28.081c-5.916-1.397-12.352-2.725-19.315-3.976    c-5.396-0.969-11.033-1.878-16.876-2.729V331.53z M93.382,108.082h30.634c2.761,0,5-2.239,5-5    c0-36.77,39.924-66.685,88.998-66.685c49.073,0,88.998,29.915,88.998,66.685c0,2.761,2.238,5,5,5h30.634v260.47    c-3.538-0.457-7.14-0.894-10.809-1.309V124.394c0-2.761-2.238-5-5-5h-28.378v-6.418c0-16.842-8.72-33.665-23.924-46.153    C259.153,54.188,239.08,47.23,218.014,47.23c-21.066,0-41.139,6.958-56.522,19.593c-15.204,12.489-23.924,29.311-23.924,46.153    v6.418H109.19c-2.761,0-5,2.239-5,5v242.848c-3.669,0.415-7.271,0.853-10.809,1.309V108.082z M293.459,129.394h28.378V366.18    c-31.427-3.14-66.918-4.811-103.823-4.811c-36.906,0-72.397,1.671-103.823,4.811V129.394h28.378c2.761,0,5-2.239,5-5v-11.418    c0-29.697,32.918-55.747,70.445-55.747c37.527,0,70.445,26.05,70.445,55.747v11.418    C288.459,127.156,290.697,129.394,293.459,129.394z M19.604,348.531c23.887-5.56,45.107,0.513,45.35,0.585    c2.466,0.734,5.088-0.525,6.057-2.91c2.02-4.968,1.672-14.734,1.089-21.625c3.932,1.406,7.705,3.73,11.282,6.951v38.393    c-5.843,0.852-11.48,1.76-16.875,2.729c-6.943,1.247-13.362,2.571-19.265,3.964C43.297,362.787,29.984,353.693,19.604,348.531z     M13.881,399.63c6.489-4.793,22.138-11.341,54.393-17.134c39.95-7.176,93.128-11.128,149.74-11.128s109.79,3.952,149.739,11.128    c32.256,5.793,47.905,12.342,54.393,17.134H13.881z"></path>
                    <path d="M296.211,220.087H139.816c-2.761,0-5-2.239-5-5v-48.659c0-2.761,2.239-5,5-5h156.395c2.762,0,5,2.239,5,5v48.659     C301.211,217.848,298.973,220.087,296.211,220.087z M144.816,210.087h146.395v-38.659H144.816V210.087z"></path>
                    </svg>{' '}
                    Death - At the moment this is not designed for punishment; it's a prototype and not all consequences are dialed. For now, you simply must find a way to regain your health: drinking Fyervas Firewater, resting at an inn in a city, praying in combat, etc.
                    </p>
                    Future Concerns to Mull Around: Experience loss, inventory loss, attribute degradation, etc.
                <Button variant='' style={{ float: "right", fontSize: "24px", zIndex: 9999, marginLeft: "90vw", color: "red" }} onClick={() => completeTutorial('firstDeath', player._id)}>X</Button>
                </h6> 
            ) : ( '') }
            { tutorial === 'firstInventory' ? (
                <h6 className='overlay-content' style={{ animation: "fade 1s ease-in 0.5s forwards", width: "65%" }}>
                    Welcome again, {player.name}, it appears you've opened your inventory with an item for the first time!<br /><br />
                    <InventorySettings />
                    <Button variant='' style={{ float: "right", fontSize: "24px", zIndex: 9999, marginLeft: "90vw", color: "red" }} onClick={() => completeTutorial('firstInventory', player._id)}>X</Button>
                </h6>
            ) : ( '') }
            { tutorial === 'firstLevelUp' ? (
                <h6 className='overlay-content' style={{ animation: "fade 1s ease-in 0.5s forwards", width: "65%" }}>
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
            { tutorial === 'firstLoot' ? (
                <h6 className='overlay-content' style={{ animation: "fade 1s ease-in 0.5s forwards", width: "65%"}}>
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
            { tutorial === 'firstPhenomena' ? (
                <Typewriter stringText={typewriterString} styling={{ position: 'absolute', overflowY: 'auto', opacity: 1, width: '65%', maxHeight: '300px', margin: '0 auto', zIndex: 99999, scrollbarWidth: 'none' }} performAction={performAction} />
            ) : ( '' ) } 
            { tutorial === 'firstShop' ? (
                <h6 className='overlay-content' style={{ animation: "fade 1s ease-in 0.5s forwards" }}>First Shop
                <Button variant='' style={{ float: "right", fontSize: "24px", zIndex: 9999, marginLeft: "90vw", color: "red" }} onClick={() => completeTutorial('firstShop', player._id)}>X</Button>
                </h6>
            ) : ( '' ) }
            { !tutorial && (
                <h6 className='overlay-content' style={{ animation: "fade 1s ease-in 0.5s forwards" }}>Nothing to see here!
                    <Button variant='' style={{ float: "right", fontSize: "24px", zIndex: 9999, marginLeft: "90vw", color: "red" }} onClick={() => completeTutorial('', player._id)}>X</Button>
                </h6> 
            ) }
        </div>
    );
};

export default Tutorial;