import LootDrop from '../../components/GameCompiler/LootDrop';
import { GAME_ACTIONS, GameData } from '../../components/GameCompiler/GameStore';
import { CombatData } from '../../components/GameCompiler/CombatStore';
import { useEffect, useState } from 'react';
import logWindow from '../images/log_window.png';

interface LootDropUIProps {
    gameState: GameData;
    gameDispatch: any;
    state: CombatData;
};

export const LootDropUI = ({ gameState, gameDispatch, state }: LootDropUIProps) => {
    const [visibleLoot, setVisibleLoot] = useState<any[]>([]);
    useEffect(() => {
        const visible = gameState.lootDrops?.filter((lootDrop: any) => gameState.showLootIds.includes(lootDrop._id));
        if (visible.length === 0) gameDispatch({ type: GAME_ACTIONS.CLEAR_SHOW_LOOT_ONE, payload: false });
        setVisibleLoot(visible);
    }, [gameState.showLootIds, gameState.lootDrops]);
    return (
        <div className='story-loot'>
        <img src={logWindow} alt='Log Window' style={{ position: 'absolute' }} />
            <div style={{ display: 'inline-block', position: 'absolute' }} className='story-loot-scroll'>
                { visibleLoot.length > 0 ? (
                    visibleLoot.map((lootDrop: any, index: number) => { 
                        return (
                            <LootDrop key={index} story={true} lootDrop={lootDrop} ascean={state.player} itemSaved={gameState.itemSaved} gameDispatch={gameDispatch} />
                        );
                     })
                ) : ( '' ) }
            </div> 
        </div>
    );
};