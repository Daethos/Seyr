import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { Ascean, Equipment, GAME_ACTIONS } from './GameStore';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import * as asceanAPI from '../../utils/asceanApi';
import Col  from 'react-bootstrap/Col';
import { getOnlyInventoryFetch, getPurchaseFetch, setMerchantEquipment } from '../../game/reducers/gameState';
import { useDispatch } from 'react-redux';
import { getBorderStyle } from '../../game/ui/ItemPopover';
import useGameSounds from './Sounds';

interface Props {
    item: Equipment;
    ascean: any;
    error: object;
    setError: React.Dispatch<React.SetStateAction<object>>;
    table?: any;
    gameDispatch?: React.Dispatch<any>;
    stealItem: (purchaseSetting: {
        ascean: Ascean;
        item: Equipment;
        cost: {
            silver: number;
            gold: number;
        };
    }) => Promise<void>;
    thievery: boolean;
};

const MerchantLoot = ({ item, ascean, error, setError, table, gameDispatch, stealItem, thievery }: Props) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { playTransaction } = useGameSounds(0.3);

    const [purchaseSetting, setPurchaseSetting] = useState({
        ascean: ascean,
        item: item,
        cost: { silver: 0, gold: 0 }
    });
    
    useEffect(() => {
        determineCost(ascean, item?.rarity, item?.type);
    }, [item]);

    const determineCost = async ( ascean: any, rarity: string, type: string ) => {
        try {
            let cost = { silver: 0, gold: 0 };
            if (location.pathname.startsWith('/GameAdmin')) {
                return setPurchaseSetting({
                    ascean: ascean,
                    item: item,
                    cost: cost
                });
            };
            switch (rarity) {
                case 'Common': {
                    cost = {
                        silver: Math.floor(Math.random() * 30) + 1,
                        gold: 0
                    };
                    break;
                };
                case 'Uncommon': {
                    cost = {
                        silver: Math.floor(Math.random() * 35) + 15,
                        gold: Math.floor(Math.random() * 2) + 1
                    };
                    break;
                };
                case 'Rare': {
                    cost = {
                        silver: Math.floor(Math.random() * 50) + 25,
                        gold: Math.floor(Math.random() * 6) + 2
                    };
                    break;
                };
                case 'Epic': {
                    cost = {
                        silver: Math.floor(Math.random() * 50) + 50,
                        gold: Math.floor(Math.random() * 12) + 12
                    };
                    break;
                };
            };

            if (type === 'Weapon') {
                cost.silver = cost.silver * 1.25;
                cost.gold = cost.gold * 1.25;
            } else if (type === 'Shield') {
                cost.silver = cost.silver * 1.15;
                cost.gold = cost.gold * 1.15; 
            } else if (type === 'Chest') {
                cost.silver = cost.silver * 1;
                cost.gold = cost.gold * 1;
            } else if (type === 'Helmet') {
                cost.silver = cost.silver * 1;
                cost.gold = cost.gold * 1;
            } else if (type === 'Legs') {
                cost.silver = cost.silver * 1;
                cost.gold = cost.gold * 1;
            } else if (type === 'Amulet') {
                cost.silver = cost.silver * 1.1;
                cost.gold = cost.gold * 1.1;
            } else if (type === 'Ring') {
                cost.silver = cost.silver * 1.1;
                cost.gold = cost.gold * 1.1;
            } else if (type === 'Trinket') {
                cost.silver = cost.silver * 1.1;
                cost.gold = cost.gold * 1.1;
            };
            cost.silver = Math.floor(cost.silver);
            cost.gold = Math.floor(cost.gold);
            console.log(cost, 'How Much Does This Cost?');
            setPurchaseSetting({
                ascean: ascean,
                item: item,
                cost: cost
            });
        } catch (err: any) {
            console.log(err.message, 'Error Determining Cost!');
        };
    };

    const purchaseItem = async (): Promise<void> => {
        let asceanTotal = 0;
        let costTotal = 0;
        asceanTotal = ascean.currency.silver + (ascean.currency.gold * 100);
        costTotal = purchaseSetting.cost.silver + (purchaseSetting.cost.gold * 100);
        if (asceanTotal < costTotal) {
            setError({
                title: 'Transaction User Error',
                content: `You do not have enough money (${asceanTotal} total wealth), to purchase this: ${item.name}, at ${costTotal}.`
            });
            return;
        };
        try {
            playTransaction();
            if (gameDispatch) {
                const res = await asceanAPI.purchaseToInventory(purchaseSetting);
                console.log(res, 'Purchased Item!');
                gameDispatch({ type: GAME_ACTIONS.ITEM_SAVED, payload: true });
                gameDispatch({
                    type: GAME_ACTIONS.SET_MERCHANT_EQUIPMENT,
                    payload: table.filter((i: any) => i._id !== item._id)
                });
            } else { // Phaser
                dispatch(getPurchaseFetch(purchaseSetting));
                dispatch(setMerchantEquipment(table.filter((i: any) => i._id !== item._id)));
                setTimeout(() => {
                    dispatch(getOnlyInventoryFetch(ascean._id));
                }, 250);
            };
        } catch (err: any) {
            console.log(err.message, 'Error Purchasing Item!');
            setError({
                title: 'Transaction Error',
                content: err.message
            });
        };
    };
    
    const merchantItemPopover = (
        <Popover className="text-info" id="popover">
            <Popover.Header id="popover-header" className="" as="h2">{item?.name} <span id="popover-image"><img src={process.env.PUBLIC_URL + item?.imgURL} alt={item?.name} /></span></Popover.Header>
            <Popover.Body id="popover-body" className="">
                { item?.type && item?.grip ? (
                    <>
                    {item?.type} [{item?.grip}] <br />
                    {item?.attack_type} [{item?.damage_type?.[0]}{item?.damage_type?.[1] ? ' / ' + item?.damage_type[1] : '' }{item?.damage_type?.[2] ? ' / ' + item?.damage_type[2] : '' }]  <br />
                    </>
                ) : item?.type ? (
                    <>{item?.type} <br /></> 
                ) : ( '' ) }
                {item?.constitution > 0 ? 'CON: +' + item?.constitution + ' ' : ''}
                {item?.strength > 0 ? 'STR: +' + item?.strength + ' ' : ''}
                {item?.agility > 0 ? 'AGI: +' + item?.agility + ' ' : ''}
                {item?.achre > 0 ? 'ACH: +' + item?.achre + ' ' : ''}
                {item?.caeren > 0 ? 'CAER: +' + item?.caeren + ' ' : ''}
                {item?.kyosir > 0 ? 'KYO: +' + item?.kyosir + ' ' : ''}<br />
                Damage: {item?.physical_damage} Physical | {item?.magical_damage} Magical <br />
                { item?.physical_resistance || item?.magical_resistance ? (
                    <>
                    Defense: {item?.physical_resistance} Physical | {item?.magical_resistance} Magical <br />
                    </>
                ) : ( '' ) }
                { item?.physical_penetration || item?.magical_penetration ? (
                    <>
                    Penetration: {item?.physical_penetration} Physical | {item?.magical_penetration} Magical <br />
                    </>
                ) : ( '' ) }
                Critical Chance: {item?.critical_chance}% <br />
                Critical Damage: {item?.critical_damage}x <br />
                Dodge Timer: {item?.dodge}s <br />
                Roll Chance: {item?.roll}% <br />
                { item?.influences ? (
                    <>
                    Influence: {item?.influences} <br />
                    </>
                ) : ( '' ) }
                <br />
                {item?.rarity}
                <br />
                <>
                Price:{' '} 
                {purchaseSetting?.cost?.gold}g{' '}
                {purchaseSetting?.cost?.silver}s{' '}
                <Button variant='' style={{ color: 'green', fontWeight: 600, float: 'right', marginTop: '-4%', fontSize: '18px', marginRight: '-5%' }} onClick={purchaseItem}>Purchase</Button>
                { thievery ? (
                    <>
                    <br />
                    <Button variant='' style={{ color: 'red', fontWeight: 600, fontSize: '18px', marginLeft: '72.5%' }} onClick={() => stealItem({ ascean: ascean, item: item, cost: { silver: 0, gold: 0 } })}>Steal</Button>
                    </>
                ) : ( '' ) }
                </>
            </Popover.Body>
        </Popover>
    );

    const getItemStyle = {
        background: 'black',
        border: '2px solid ' + getBorderStyle(item?.rarity)
    };
    
    return (
        <Col>
            <OverlayTrigger trigger="click" rootClose placement="auto-start" overlay={merchantItemPopover}>
                <Button variant="" className="my-3 mx-2 p-2" style={getItemStyle}><img src={process.env.PUBLIC_URL + item?.imgURL} alt={item?.name} /></Button>
            </OverlayTrigger>
            <p style={{ fontSize: "11px", marginTop: "-14px" }}>
            {purchaseSetting?.cost?.gold ? `${purchaseSetting.cost.gold}g${' '}` : ''}
            {purchaseSetting?.cost?.silver ? `${purchaseSetting.cost.silver}s${' '}` : ''}
            </p>
        </Col>
    );
};

export default MerchantLoot;