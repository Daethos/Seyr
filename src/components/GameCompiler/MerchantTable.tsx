import { useEffect, useState } from 'react';
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
};

const MerchantTable = ({ table, ascean, error, setError, gameDispatch, gameState }: Props) => {
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
    const stealItem = async (purchaseSetting: { ascean: Ascean, item: Equipment, cost: { silver: number, gold: number } }) => {
        try {
            const res = await asceanAPI.purchaseToInventory(purchaseSetting);
            console.log(res, 'Stole Item!');
            gameDispatch({ type: GAME_ACTIONS.ITEM_SAVED, payload: true });
            gameDispatch({
                type: GAME_ACTIONS.SET_MERCHANT_EQUIPMENT,
                payload: table.filter((i: any) => i._id !== purchaseSetting.item._id)
            });
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