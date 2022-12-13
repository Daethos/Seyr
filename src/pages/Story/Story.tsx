import { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom';
import * as asceanAPI from '../../utils/asceanApi';  
import Loading from '../../components/Loading/Loading';
import TileMap from '../../components/Story/TileMap'
import Phaser from "phaser";
import PhaserMatterCollisionPlugin from 'phaser-matter-collision-plugin';
import VirtualJoystickPlugin from 'phaser3-rex-plugins/plugins/virtualjoystick-plugin.js';
import { calculateGameSize } from '../../game/utility';
import MainScene from '../../scenes/MainScene';
const { width, height, multiplier } = calculateGameSize();

interface Props {
    user: any;
}

const Story = ({ user }: Props) => {
    const { asceanID } = useParams();
    const [loading, setLoading] = useState(true);
    const [ascean, setAscean] = useState<any>({});
    const [weaponOne, setWeaponOne] = useState<any>({});
    const [weaponTwo, setWeaponTwo] = useState<any>({});
    const [weaponThree, setWeaponThree] = useState<any>({});
    const [totalPlayerHealth, setTotalPlayerHealth] = useState<number>(0);
    const [currentPlayerHealth, setCurrentPlayerHealth] = useState<number>(-5)
    const [attributes, setAttributes] = useState<any>([]);
    const [playerDefense, setPlayerDefense] = useState<any>([]);

    const config = {
        type: Phaser.AUTO,
        // orientation: 'LANDSCAPE',
        parent: 'story-game',
        width: 1024,
        height: 1024,
        scene: [MainScene],
        scale: {
            zoom: 1,
        },
        physics: {
            default: 'matter',
            matter: {
                debug: true,
                gravity: { y: 0 },
            }
        },
        plugins: {
            global: [{
                key: 'rexVirtualJoystick',
                plugin: VirtualJoystickPlugin,
                start: true
            }],
            scene: [
                {
                    plugin: PhaserMatterCollisionPlugin,
                    key: 'matterCollision',
                    mapping: 'matterCollision'
                }
            ],
            src: [
                'VirtualJoysticks/plugin/src/Pad.js',
                'VirtualJoysticks/plugin/src/Stick.js',
                'VirtualJoysticks/plugin/src/Button.js',
                'VirtualJoysticks/plugin/src/DPad.js',
            ],
        },
        backgroundColor: '#000',
    };

    const getAscean = useCallback(async () => {
        try {
            const game = new Phaser.Game(config);
            const response = await asceanAPI.getOneAscean(asceanID);
            setAscean(response.data);
            const stats = await asceanAPI.getAsceanStats(asceanID);
            setWeaponOne(stats.data.data.combat_weapon_one)
            setWeaponTwo(stats.data.data.combat_weapon_two)
            setWeaponThree(stats.data.data.combat_weapon_three)
            setPlayerDefense(stats.data.data.defense)
            setAttributes(stats.data.data.attributes)
            setTotalPlayerHealth(stats.data.data.attributes.healthTotal)
            setCurrentPlayerHealth(stats.data.data.attributes.healthTotal)
            setLoading(false)
        } catch (err: any) {
            setLoading(false)
            console.log(err.message, 'Error Getting Ascean')
        }
    }, [asceanID])

    useEffect(() => {
        getAscean();
    }, [asceanID, getAscean])

    // This will be I guess the 'AsceanScene' that will be the Player Character UI pop-up to toggle.
    //<GameAscean ascean={ascean} player={true} totalPlayerHealth={totalPlayerHealth} opponentStatCompiler={opponentStatCompiler} combatData={combatData} undefined={undefined} setUndefined={setUndefined} undefinedComputer={undefinedComputer} setUndefinedComputer={setUndefinedComputer} combatDataCompiler={combatDataCompiler} currentPlayerHealth={currentPlayerHealth} loading={loadingAscean} />


    // TODO:FIXME: Use stock models underneath the three frames of armor so they're not invisible, properly


    // useEffect(() => {
    //     const game = new Phaser.Game({
    //         type: Phaser.AUTO,
    //         // orientation: 'LANDSCAPE',
    //         parent: 'story-game',
    //         width: 512,
    //         height: 512,
    //         scene: [MainScene],
    //         scale: {
    //             zoom: 1,
    //         },
    //         physics: {
    //             default: 'matter',
    //             matter: {
    //                 debug: true,
    //                 gravity: { y: 0 },
    //             }
    //         },
    //         plugins: {
    //             scene: [
    //                 {
    //                     plugin: PhaserMatterCollisionPlugin,
    //                     key: 'matterCollision',
    //                     mapping: 'matterCollision'
    //                 }
    //             ]
    //         },
    //         backgroundColor: '#000',
    //     });

    //     // let isClicking = false;
      
    // }, [])
    
        
    return (
        <>
        <div id='story-game' style={{ textAlign: 'center' }} className='my-5'>
        </div>
        </>
    )
}

export default Story