import LootDrop from '../../components/GameCompiler/LootDrop';
import { useEffect, useState } from 'react';
import logWindow from '../images/log_window.png';
import { useDispatch, useSelector } from 'react-redux';
import { setShowLootOne } from '../reducers/gameState';


export const LootDropUI = () => {
    const dispatch = useDispatch();
    const gameState = useSelector((state: any) => state.game);
    const [visibleLoot, setVisibleLoot] = useState<any[]>([]);
    useEffect(() => {
        const visible = gameState.lootDrops?.filter((lootDrop: any) => gameState.showLootIds.includes(lootDrop._id));
        if (visible.length === 0) dispatch(setShowLootOne(false));
            // gameDispatch({ type: GAME_ACTIONS.CLEAR_SHOW_LOOT_ONE, payload: false });
        setVisibleLoot(visible);
    }, [gameState.showLootIds, gameState.lootDrops]);
    return (
        <div className='story-loot'>
        <img src={logWindow} alt='Log Window' style={{ position: 'absolute' }} />
            <div style={{ display: 'inline-block', position: 'absolute' }} className='story-loot-scroll'>
                { visibleLoot.length > 0 ? (
                    visibleLoot.map((lootDrop: any, index: number) => { 
                        return (
                            <LootDrop key={index} story={true} lootDrop={lootDrop} ascean={gameState.player} />
                        );
                     })
                ) : ( '' ) }
            </div> 
        </div>
    );
};