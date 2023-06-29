import LootDrop from '../components/GameCompiler/LootDrop';
import { GameData } from '../components/GameCompiler/GameStore';
import { CombatData } from '../components/GameCompiler/CombatStore';
import playerPortrait from './images/player-portrait.png';

interface LootDropUIProps {
    gameState: GameData;
    gameDispatch: any;
    state: CombatData;
};

export const LootDropUI = ({ gameState, gameDispatch, state }: LootDropUIProps) => {
    return (
        <div style={{ 
            position: "absolute", 
            top: "515px", 
            left: "275px", 
            zIndex: 0,  
            height: "120px",
            width: "400px",  
            fontSize: "16px",
            borderRadius: "3px",
            border: "3px solid #2A0134",
            boxShadow: "2px 2px 2px black",
            overflow: "auto",
            scrollbarWidth: "none",
            backgroundColor: "black",
            color: "#fdf6d8",
            textAlign: "center", 
        }}>
            {/* <img src ={playerPortrait} alt="Player Portrait" style={{ position: "absolute", width: '400px', height: '135px', top: "-10px", left: "-25px"  }} /> */}
            
            { gameState?.showLootOne && gameState?.showLootTwo && gameState?.lootDrop && gameState?.lootDropTwo ? (
            <div style={{ display: "inline-block" }}>
            <LootDrop story={true} lootDrop={gameState.lootDrop}  ascean={state.player} itemSaved={gameState.itemSaved} gameDispatch={gameDispatch} />
            <LootDrop story={true} lootDrop={gameState.lootDropTwo} ascean={state.player} itemSaved={gameState.itemSaved} gameDispatch={gameDispatch} />
            </div>
        ) : gameState?.showLootOne && gameState?.lootDrop ? (
            <LootDrop story={true} lootDrop={gameState.lootDrop}  ascean={state.player} itemSaved={gameState.itemSaved} gameDispatch={gameDispatch} />
        ) : gameState?.showLootTwo && gameState?.lootDropTwo ? (
            <LootDrop story={true} lootDrop={gameState.lootDropTwo} ascean={state.player} itemSaved={gameState.itemSaved} gameDispatch={gameDispatch} />
        ) : ( '' ) }
        </div>
    );
};