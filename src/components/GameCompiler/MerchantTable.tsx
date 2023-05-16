import React, { useEffect, useState } from 'react';
import { Ascean, Equipment, GAME_ACTIONS, GameData } from './GameStore';
import MerchantLoot from './MerchantLoot';
import Row from 'react-bootstrap/Row';
import * as asceanAPI from '../../utils/asceanApi';

interface Props {
    table: any;
    ascean: any;
    error: any;
    setError: any;
    gameDispatch: React.Dispatch<any>;
    gameState: GameData;
    dispatch: React.Dispatch<any>;
};

const MerchantTable = ({ table, ascean, error, setError, gameDispatch, gameState, dispatch }: Props) => {
    const [thievery, setThievery] = useState<boolean>(false);
    const [thieveryTraits, setThieveryTraits] = useState<any>({});
    useEffect(() => {
        checkThievery();
    }, []);
    const checkThievery = async () => {
        const traits = {
            primary: gameState?.primary,
            secondary: gameState?.secondary,
            tertiary: gameState?.tertiary,
        };
        const thieveryTraits = ["Ma'anreic"];
        const matchingTraits = Object.values(traits).filter(trait => thieveryTraits.includes(trait.name));
        if (matchingTraits.length === 0) {
            setThievery(false);
            return;
        };
        setThievery(true);
        setThieveryTraits(matchingTraits);
    };
    const checkStatisticalValue = (rarity: string) => {
        switch (rarity) {
            case 'Common': {
                return 10;
            };
            case 'Uncommon': {
                return 100;
            };
            case 'Rare': {
                return 400;
            };
            case 'Epic': {
                return 1200;
            };
            case 'Legendary': {
                return 12000;
            };
            default: {
                return 0;
            };
        };
    };
    const getFine = (rarity: string) => {
        switch (rarity) {
            case 'Common': {
                return '5 silver';
            };
            case 'Uncommon': {
                return '50 silver';
            };
            case 'Rare': {
                return '2 gold';
            };
            case 'Epic': {
                return '6 gold';
            };
            case 'Legendary': {
                return '120 gold';
            };
            default: {
                return 0;
            };
        };
    };
    const stealItem = async (purchaseSetting: { ascean: Ascean, item: Equipment, cost: { silver: number, gold: number } }) => {
        try {
            const weight = {
                Common: 0,
                Uncommon: 5,
                Rare: 10,
                Epic: 25,
                Legendary: 50,
            }
            const chance = Math.floor(Math.random() * 100) + 1 + weight[purchaseSetting.item.rarity as keyof typeof weight];
            const successChance = ascean.agility + ascean.achre;
            console.log(successChance, 'Success Chance', chance, 'Chance');
            if (chance > successChance) { // Failure
                const statistic = {
                    asceanID: ascean._id, 
                    successes: 0,
                    failures: 1,
                    total: 1,
                    totalValue: 0,
                };
                const fineCost = getFine(purchaseSetting.item.rarity); 
                gameDispatch({ 
                    type: GAME_ACTIONS.SET_STORY_CONTENT, 
                    payload: `You were caught stealing. The merchant protested your censure, and simply have been fined ${fineCost}. \n\n The item has been pulled from the table.` 
                });
                const response = await asceanAPI.recordThievery(statistic);
                console.log(response, "Thievery Failure Response Recorded");
                gameDispatch({
                    type: GAME_ACTIONS.SET_MERCHANT_EQUIPMENT,
                    payload: table.filter((i: any) => i._id !== purchaseSetting.item._id)
                });
                const fine = await asceanAPI.asceanTax({ tax: checkStatisticalValue(purchaseSetting.item.rarity), id: ascean._id });
                setTimeout(() => {
                    gameDispatch({ type: GAME_ACTIONS.SET_STATISTICS, payload: response });
                    dispatch({ type: 'SET_CURRENCY', payload: fine });
                    gameDispatch({ type: GAME_ACTIONS.SET_PLAYER_CURRENCY, payload: fine });
                    setThievery(false);
                }, 1500);
                return;
            };
            const res = await asceanAPI.purchaseToInventory(purchaseSetting);
            console.log(res, 'Stole Item!');
            gameDispatch({ type: GAME_ACTIONS.ITEM_SAVED, payload: true });
            gameDispatch({
                type: GAME_ACTIONS.SET_MERCHANT_EQUIPMENT,
                payload: table.filter((i: any) => i._id !== purchaseSetting.item._id)
            });

            const statistic = {
                asceanID: ascean._id, 
                successes: 1,
                failures: 0,
                total: 1,
                totalValue: checkStatisticalValue(purchaseSetting.item.rarity),
            };
            const response = await asceanAPI.recordThievery(statistic);
            console.log(response, "Thievery Success Response Recorded");
            gameDispatch({ type: GAME_ACTIONS.SET_STATISTICS, payload: response });
            setThievery(false);
        } catch (err: any) {
            console.log(err.message, 'Error Stealing Item!');
            setError({
                title: 'Theft Error',
                content: err.message
            });
        };
    };
    return (
        <Row>
        { table.map((item: any, index: number) => {
            return (
                <MerchantLoot item={item} table={table} ascean={ascean} error={error} setError={setError} key={index} thievery={thievery} gameDispatch={gameDispatch} gameState={gameState} stealItem={stealItem} />
            )
        }) }
        </Row>
    );
};

export default MerchantTable;