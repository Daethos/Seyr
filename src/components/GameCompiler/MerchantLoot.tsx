import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import * as asceanAPI from '../../utils/asceanApi';
import Loading from '../Loading/Loading';

interface Props {
    item: any;
    ascean: any;
    itemPurchased: boolean;
    setItemPurchased: React.Dispatch<React.SetStateAction<boolean>>;
}

const MerchantLoot = ({ item, ascean, itemPurchased, setItemPurchased }: Props) => {
    console.log(item, 'Did We Make it Here Even?')
    const [thisItemPurchased, setThisItemPurchased] = useState(false);
    const [purchaseSetting, setPurchaseSetting] = useState({
        ascean: ascean,
        item: item,
        cost: { silver: 0, gold: 0 }
    });
    useEffect(() => {
    //   setPurchaseSetting({
    //     ascean: ascean,
    //     item: item,
    //     // cost: { silver: 0, gold: 0 } 
    //     cost: 
    // })
    determineCost(ascean, item.rarity, item.type)
    }, [item])

    const determineCost = async ( ascean: any, rarity: string, type: string ) => {
        try {
            let cost = { silver: 0, gold: 0 };
            switch (rarity) {
                case 'Common': {
                    cost = {
                        silver: Math.floor(Math.random() * 25) + 1,
                        gold: 0
                    }
                    break;
                }
                case 'Uncommon': {
                    cost = {
                        silver: Math.floor(Math.random() * 25) + 25,
                        gold: Math.floor(Math.random() * 2)
                    }
                    break;
                }
                case 'Rare': {
                    cost = {
                        silver: Math.floor(Math.random() * 25) + 50,
                        gold: Math.floor(Math.random() * 5) + 1
                    }
                    break;
                }
                case 'Epic': {
                    cost = {
                        silver: Math.floor(Math.random() * 50) + 50,
                        gold: Math.floor(Math.random() * 10) + 10
                    }
                    break;
                }
            }

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
            }
            cost.silver = Math.floor(cost.silver);
            cost.gold = Math.floor(cost.gold);
            console.log(cost, 'How Much Does This Cost?')
            setPurchaseSetting({
                ascean: ascean,
                item: item,
                cost: cost
            });
        } catch (err: any) {
            console.log(err.message, 'Error Determining Cost!');
        }
    }

    const purchaseItem = async () => {
        let asceanTotal = 0;
        asceanTotal = ascean.currency.silver + (ascean.currency.gold * 100);
        let costTotal = 0;
        costTotal = purchaseSetting.cost.silver + (purchaseSetting.cost.gold * 100);
        if (asceanTotal < costTotal) {
            console.log('Not Enough Money!');
            //TODO:FIXME: Add Toast Message Here
            return
        }
        try {
            const res = await asceanAPI.purchaseToInventory(purchaseSetting);
            console.log(res, 'Purchased Item!');
            setItemPurchased(!itemPurchased);
            setThisItemPurchased(true);
        } catch (err: any) {
            console.log(err.message, 'Error Purchasing Item!');
        }
    }
    
    const merchantItemPopover = (
        <Popover className="text-info" id="popover">
            <Popover.Header id="popover-header" className="" as="h2">{item?.name} <span id="popover-image"><img src={process.env.PUBLIC_URL + item.imgURL} alt={item?.name} /></span></Popover.Header>
            <Popover.Body id="popover-body" className="">
                {
                    item?.type && item?.grip ?
                    <>
                {item?.type} [{item?.grip}] <br />
                {item?.attack_type} [{item?.damage_type?.[0]}{item?.damage_type?.[1] ? ' / ' + item?.damage_type[1] : '' }]  <br />
                    </>
                    : item?.type ? <>{item?.type} <br /></> : ''
                }
                {item?.constitution > 0 ? 'CON: +' + item?.constitution + ' ' : ''}
                {item?.strength > 0 ? 'STR: +' + item?.strength + ' ' : ''}
                {item?.agility > 0 ? 'AGI: +' + item?.agility + ' ' : ''}
                {item?.achre > 0 ? 'ACH: +' + item?.achre + ' ' : ''}
                {item?.caeren > 0 ? 'CAER: +' + item?.caeren + ' ' : ''}
                {item?.kyosir > 0 ? 'KYO: +' + item?.kyosir + ' ' : ''}<br />
                Damage: {item?.physical_damage} Physical | {item?.magical_damage} Magical <br />
                {
                    item?.physical_resistance ?
                    <>
                    Defense: {item?.physical_resistance} Physical | {item?.magical_resistance} Magical <br />
                    </>
                    : ''
                }
                {
                    item?.physical_penetration ?
                    <>
                    Penetration: {item?.physical_penetration} Physical | {item?.magical_penetration} Magical <br />
                    </>
                    : ''
                }
                Critical Chance: {item?.critical_chance}% <br />
                Critical Damage: {item?.critical_damage}x <br />
                Dodge Timer: {item?.dodge}s <br />
                Roll Chance: {item?.roll}% <br />
                {
                    item?.influences ?
                    <>
                Influence: {item?.influences} <br />
                    </>
                    : ''
                }
                <br />
                {item?.rarity}
                <br />
                
                {
                    thisItemPurchased ?
                    ""
                    :
                    <>
                    Price:{' '} 
                    {purchaseSetting?.cost?.gold}g{' '}
                    {purchaseSetting?.cost?.silver}s{' '}
                    <Button variant='' style={{ color: 'green', fontWeight: 600, float: 'right', marginTop: -4 + '%', fontSize: 18 + 'px', marginRight: -5 + '%' }} onClick={purchaseItem}>Purchase</Button>
                    </>
                }
            </Popover.Body>
        </Popover>
    )

    function getBorderStyle(rarity: string) {
        switch (rarity) {
            case 'Common':
                return '2px solid white';
            case 'Uncommon':
                return '2px solid green';
            case 'Rare':
                return '2px solid blue';
            case 'Epic':
                return '2px solid purple';
            case 'Legendary':
                return '2px solid orange';
            default:
                return '2px solid grey';
        }
    }

    const getItemStyle = {
        background: 'black',
        border: getBorderStyle(item?.rarity)
    }
    
    return (
        <>
            <OverlayTrigger trigger="click" placement="auto-start" overlay={merchantItemPopover}>
                <Button variant=""  className="m-3 p-2" style={getItemStyle}><img src={process.env.PUBLIC_URL + item.imgURL} alt={item?.name} /></Button>
            </OverlayTrigger>
        </>
    )
}

export default MerchantLoot