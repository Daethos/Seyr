import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import * as eqpAPI from '../../utils/equipmentApi';
import HostScene from '../../game/scenes/HostScene';
import { useDispatch, useSelector } from 'react-redux';
import { getGameFetch, setGameChange } from '../../game/reducers/gameState';
import EventEmitter from '../../game/phaser/EventEmitter';

export const usePhaserEvent = (event: string, callback: any) => {
    useEffect(() => {
        EventEmitter.on(event, callback);
        return () => {
            EventEmitter.off(event, callback);
        };
    }, [event, callback]);
}; 

export const useKeyEvent = (event: string, callback: any) => {
    useEffect(() => { 
        const eventListener = (event: Event) => callback(event);
        window.addEventListener(event, eventListener);
        return () => {
            window.removeEventListener(event, eventListener);
        };
    }, [event, callback]);
}; 

const Story = () => {
    const { asceanID } = useParams();
    const [assets, setAssets] = useState([]);
    const dispatch = useDispatch();
    const gameChange = useSelector((state: any) => state.game.gameChange); 

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            try {
                dispatch(getGameFetch(asceanID));
                const assetResponse = await eqpAPI.index();
                const sanitizedAssets = await sanitizeAssets(assetResponse.data);
                setAssets(sanitizedAssets);
                dispatch(setGameChange(true));
            } catch (err: any) {
                console.log(err.message, '<- Error in Getting an Ascean for Solo Gameplay')
            };
        }; 
        fetchData(); 
    }, [asceanID, dispatch]); 

    const sanitizeAssets = async (assets: any): Promise<[]> => {
        const fields = ['weapons', 'shields', 'helmets', 'chests', 'legs', 'rings', 'amulets', 'trinkets'];
        const newAssets: any = [];
        const imageSprite = async (url: string): Promise<string> => url.split('/')[2].split('.')[0];

        await Promise.all(fields.map(async (field: string) => {
            await Promise.all(assets[field].map(async (item: any) => {
                const sprite = await imageSprite(item.imgURL);
                newAssets.push({
                    sprite: sprite,
                    imgURL: item.imgURL,
                });
            })); 
        })); 
        return newAssets;
    }; 
        
    return (
        <div>
        { gameChange && ( 
            <HostScene assets={assets} setAssets={setAssets} /> 
        ) }
        </div>
    );
};

export default Story;