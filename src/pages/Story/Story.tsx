import { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom';
import './Story.css'
import * as asceanAPI from '../../utils/asceanApi';  
import Loading from '../../components/Loading/Loading';
import TileMap from '../../components/Story/TileMap'
import Phaser from "phaser";

import { calculateGameSize } from '../../game/utility';
import MainScene from '../../scenes/MainScene';
import HostScene from '../../game/sceneComponents/HostScene';
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

    

    const getAscean = useCallback(async () => {
        try {
            // const game = new Phaser.Game(config);
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
            console.log(stats, 'The Ascean Returned!')
            setLoading(false)
        } catch (err: any) {
            setLoading(false)
            console.log(err.message, 'Error Getting Ascean')
        }
    }, [asceanID])

    useEffect(() => {
        getAscean();
    }, [asceanID, getAscean])

    // TODO:FIXME: Use stock models underneath the three frames of armor so they're not invisible, properly

    
    if (loading) {
        return (
            <Loading NavBar={true} />
        )
    }
        
    return (
        <>
        <HostScene 
            user={user} ascean={ascean} 
            weaponOne={weaponOne} weaponTwo={weaponTwo} weaponThree={weaponThree} 
            totalPlayerHealth={totalPlayerHealth} currentPlayerHealth={currentPlayerHealth} 
            attributes={attributes} playerDefense={playerDefense}
        />
        <div id='story-game' style={{ textAlign: 'center' }} className='my-5'>
        </div>
        </>
    )
}

export default Story