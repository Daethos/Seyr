import { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import HostScene from '../../game/scenes/HostScene';
import { useDispatch, useSelector } from 'react-redux';
import { getGameFetch } from '../../game/reducers/gameState';
import EventEmitter from '../../game/phaser/EventEmitter';
import { getPhaserAssets, setPhaserGameChange } from '../../game/reducers/phaserState';

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
        const fetchData = async (): Promise<void> => {
            try {
                dispatch(getPhaserAssets());
                dispatch(getGameFetch(asceanID));
                setTimeout(() => dispatch(setPhaserGameChange(true)), 1000);
            } catch (err: any) {
                console.log(err.message, '<- Error in Getting an Ascean for Solo Gameplay')
            };
        };  
        fetchData(); 
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