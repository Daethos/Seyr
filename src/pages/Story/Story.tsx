import { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import HostScene from '../../game/scenes/HostScene';
import { useDispatch, useSelector } from 'react-redux';
import { getGameFetch } from '../../game/reducers/gameState';
import EventEmitter from '../../game/phaser/EventEmitter';
import { getPhaserAssets } from '../../game/reducers/phaserState';
import gameManager from '../../game/scenes/Game';

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
    const dispatch = useDispatch();
    const gameChange = useSelector((state: any) => state.phaser.gameChange); 

    useEffect(() => {
        async function fetchData(): Promise<void> {
            try {
                dispatch(getGameFetch(asceanID));
                dispatch(getPhaserAssets());
            } catch (err: any) {
                console.log(err.message, '<- Error in Getting an Ascean for Solo Gameplay')
            };
        };
        fetchData(); 
        return () => gameManager.destroyGame(asceanID!);
    }, [asceanID, dispatch]); 

    return (
        <div>
        { gameChange && ( 
            <HostScene /> 
        ) }
        </div>
    );
};

export default Story;