import LootDrop from '../../components/GameCompiler/LootDrop';
import { GAME_ACTIONS, GameData } from '../../components/GameCompiler/GameStore';
import { CombatData } from '../../components/GameCompiler/CombatStore';
import { useEffect, useState } from 'react';

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
        <div style={{ 
            position: "absolute", 
            top: "380px", 
            left: "275px", 
            zIndex: 9999,  
            height: "120px",
            width: "400px",  
            fontSize: "16px",
            borderRadius: "3px",
            border: "4px solid #2A0134",
            boxShadow: "2px 2px 2px black",
            overflow: "auto",
            scrollbarWidth: "none",
            backgroundColor: "black",
            color: "#fdf6d8",
            textAlign: "center", 
        }}> 
            <div style={{ display: 'inline-block' }}>
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