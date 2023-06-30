import React, { useState, useEffect, useRef } from 'react'
import * as asceanAPI from '../utils/asceanApi';
import * as eqpAPI from '../utils/equipmentApi';
import ToastAlert from '../components/ToastAlert/ToastAlert';
import Overlay from 'react-bootstrap/Overlay';
import Button from 'react-bootstrap/Button';
import MerchantTable from '../components/GameCompiler/MerchantTable';
import Inventory from '../components/GameCompiler/Inventory';
import DialogTree, { getNodesForNPC, npcIds } from '../components/GameCompiler/DialogNode';
import Currency from '../components/GameCompiler/Currency';
import { ACTIONS, CombatData } from '../components/GameCompiler/CombatStore';
import { GAME_ACTIONS, GameData } from '../components/GameCompiler/GameStore';

const DialogButtons = ({ options, setIntent }: { options: any, setIntent: any }) => {
    const filteredOptions = Object.keys(options).filter((option: any) => option !== 'defeat' && option !== 'victory' && option !== 'taunt' && option !== 'praise' && option !== 'greeting');
    const buttons = filteredOptions.map((o: any, i: number) => {
        return (
            <div key={i}>
                <Button variant='' className='dialog-buttons' onClick={() => setIntent(o)} style={{ color: 'green', fontVariant: 'small-caps', fontWeight: 550 }}>{o}</Button>
            </div>
        );
    });
    return <>{buttons}</>;
};

interface StoryDialogProps {
    state: CombatData;
    dispatch: React.Dispatch<any>;
    gameState: GameData;
    gameDispatch: React.Dispatch<any>;
    deleteEquipment: (equipment: any[]) => Promise<void>;
}

export const StoryDialog = ({ state, dispatch, gameState, gameDispatch, deleteEquipment }: StoryDialogProps) => {
    const [error, setError] = useState<any>({ title: '', content: '' });
    const targetRef = useRef(null);
    const [upgradeItems, setUpgradeItems] = useState<any | null>(null);

    useEffect(() => {
        if (gameState.player.inventory.length > 2) {
            const matchedItem = canUpgrade(gameState.player.inventory);
            if (matchedItem) {
                setUpgradeItems(matchedItem);
            } else {
                setUpgradeItems(null);
            };
        };
    }, [gameState.player.inventory]);

    const canUpgrade = (inventory: any[]) => {
        const itemGroups: Record<string, any[]> = {};
        inventory.forEach(item => {
            const key = `${item?.name}-${item?.rarity}`;
            itemGroups[key] = itemGroups[key] || [];
            itemGroups[key].push(item);
        });
        const matches = [];
        for (const key in itemGroups) {
            if (itemGroups.hasOwnProperty(key)) {
                const items = itemGroups[key];
                if (items.length >= 3) { 
                    matches.push(items[0]);
                };
            };
        };
        return matches.length > 0 ? matches : null;
    };

    const checkingLoot = async () => {
        if (gameState.merchantEquipment.length > 0) {
            await deleteEquipment(gameState.merchantEquipment);
            gameDispatch({ type: GAME_ACTIONS.SET_MERCHANT_EQUIPMENT, payload: [] });
        };
    };

    const handleIntent = (intent: string) => gameDispatch({ type: GAME_ACTIONS.SET_CURRENT_INTENT, payload: intent });

    const engageCombat = async () => {
        await checkingLoot();
        dispatch({ type: ACTIONS.SET_DUEL, payload: '' });
    };

    const refillFlask = async () => {
        try {
            const response = await asceanAPI.restoreFirewater(state.player._id);
            console.log(response, 'Response Refilling Flask');
            dispatch({ type: ACTIONS.SET_EXPERIENCE, payload: response });
            gameDispatch({ type: GAME_ACTIONS.SET_EXPERIENCE, payload: response });
        } catch (err: any) {
            console.log(err, "Error Refilling Flask");
        };
    };

    const getLoot = async (type: string) => {
        if (gameState?.merchantEquipment.length > 0) await eqpAPI.deleteEquipment(gameState?.merchantEquipment);
        try {
            let response: any;
            if (type === 'physical-weapon') {
                response = await eqpAPI.getPhysicalWeaponEquipment(state.player.level);
            } else if (type === 'magical-weapon') {
                response = await eqpAPI.getMagicalWeaponEquipment(state.player.level);
            } else if (type === 'armor') {
                response = await eqpAPI.getArmorEquipment(state.player.level);
            } else if (type === 'jewelry') {
                response = await eqpAPI.getJewelryEquipment(state.player.level);
            } else if (type === 'general') {
                response = await eqpAPI.getMerchantEquipment(state.player.level);
            } else if (type === 'cloth') {
                response = await eqpAPI.getClothEquipment(state.player.level);
            };
            console.log(response.data, 'Response!');
            gameDispatch({ type: GAME_ACTIONS.SET_MERCHANT_EQUIPMENT, payload: response.data })
        } catch (err) {
            console.log(err, 'Error Getting Loot!');
        };
    };

    return (
        <div className='dialog-box' style={{ width: "60%", top: "75%", height: "40%", border: "3px solid #2A0134", zIndex: 9999 }}>
            <div className='dialog-text mx-2' style={{ width: "100%" }}> 
            <DialogTree gameState={gameState} gameDispatch={gameDispatch} engageCombat={engageCombat} getLoot={getLoot} refillFlask={refillFlask} state={state} ascean={state.player} enemy={gameState.opponent} dialogNodes={getNodesForNPC(npcIds[state.npcType])} />
            <Currency ascean={gameState.player} />
            { gameState?.merchantEquipment.length > 0 ?
                <MerchantTable dispatch={dispatch} table={gameState.merchantEquipment} gameDispatch={gameDispatch} gameState={gameState} ascean={state.player} error={error} setError={setError} />
            : ( '' ) }
            { state.npcType === 'Blacksmith' ? (
                <>
                <img src={process.env.PUBLIC_URL + `/images/` + 'Ashtre' + '-' + 'Man' + '.jpg'} alt="Merchant" className='dialog-picture' style={{ borderRadius: "50%", border: "2px solid purple" }} />
                    {' '}Blacksmith
                    <br />
                    "You've come for forging? I only handle chiomic quality and above. Check my rates and hand me anything you think worth's it. Elsewise I trade with the Armorer if you want to find what I've made already."
                    <br /><br />
                    Hanging on the wall is a list of prices for the various items you can forge. The prices are based on the quality. <br />
                    <p style={{ color: "green", fontSize: "20px", marginBottom: "-1px", fontWeight: 700 }}>Kyn'gian: 1g</p> 
                    <p style={{ color: "blue", fontSize: "20px", marginBottom: "-1px", fontWeight: 700 }}>Senic: 3g</p>
                    <p style={{ color: "purple", fontSize: "20px", marginBottom: "-1px", fontWeight: 700 }}>Kyris: 12g</p>
                    <p style={{ color: "darkorange", fontSize: "20px", marginBottom: "-1px", fontWeight: 700 }}>Sedyrus: 60g</p>
                    <br />
                    <Currency ascean={gameState.player} />
                    { upgradeItems ?
                        <>
                        {upgradeItems.map((item: any, index: number) => {
                            return (
                                <Inventory key={index} inventory={item} bag={gameState.player.inventory} gameState={gameState} gameDispatch={gameDispatch} ascean={state.player} blacksmith={true} index={index} />
                            )
                        })}
                        </>
                    : '' }
                    <br />
                </>
            ) : ( '' ) }
            </div>
            {/* <div className='dialog-options'>
                <DialogButtons options={gameState.dialog} setIntent={handleIntent} />
            </div> */}
        </div>
    );
};