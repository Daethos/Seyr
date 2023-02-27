import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import * as asceanAPI from '../../utils/asceanApi';

interface Props {
    lootDrop: any;
    setLootDrop: React.Dispatch<React.SetStateAction<any>>;
    ascean: any;
    itemSaved: boolean;
    setItemSaved: React.Dispatch<React.SetStateAction<boolean>>;
};

const LootDrop = ({ lootDrop, setLootDrop, ascean, itemSaved, setItemSaved }: Props) => {
    const [saveSetting, setSaveSetting] = useState({
        ascean: ascean,
        lootDrop: lootDrop
    });
    const article = ['a','e','i','o','u'].includes(lootDrop?.name?.[0]) ? "an" : "a";
    useEffect(() => {
        setSaveSetting({
            ascean: ascean,
            lootDrop: lootDrop
        });
    }, [lootDrop]);
    
    const saveItem = async () => {
        try {
            const res = await asceanAPI.saveToInventory(saveSetting);
            console.log(res, 'Saved Item to Inventory!');
            setLootDrop(null);
            setItemSaved(true);
        } catch (err: any) {
            console.log(err.message, 'Error Saving Item to Inventory!');
        };
    };

    const lootDropPopover = (
        <Popover className="text-info" id="popover" style={{ zIndex: 9999 }}>
            <Popover.Header id="popover-header" className="" as="h2">{lootDrop?.name} <span id="popover-image"><img src={process.env.PUBLIC_URL + lootDrop.imgURL} alt={lootDrop?.name} /></span></Popover.Header>
            <Popover.Body id="popover-body" className="">
                {
                    lootDrop?.type && lootDrop?.grip ?
                    <>
                {lootDrop?.type} [{lootDrop?.grip}] <br />
                {lootDrop?.attack_type} [{lootDrop?.damage_type?.[0]}{lootDrop?.damage_type?.[1] ? ' / ' + lootDrop?.damage_type[1] : '' }{lootDrop?.damage_type?.[2] ? ' / ' + lootDrop?.damage_type[2] : '' }]  <br />
                    </>
                    : lootDrop?.type ? <>{lootDrop?.type} <br /></> : ''
                }
                {lootDrop?.constitution > 0 ? 'Con: +' + lootDrop?.constitution + ' ' : ''}
                {lootDrop?.strength > 0 ? 'Str: +' + lootDrop?.strength + ' ' : ''}
                {lootDrop?.agility > 0 ? 'Agi: +' + lootDrop?.agility + ' ' : ''}
                {lootDrop?.achre > 0 ? 'Ach: +' + lootDrop?.achre + ' ' : ''}
                {lootDrop?.caeren > 0 ? 'Caer: +' + lootDrop?.caeren + ' ' : ''}
                {lootDrop?.kyosir > 0 ? 'Kyo: +' + lootDrop?.kyosir + ' ' : ''}<br />
                Damage: {lootDrop?.physical_damage} Phys | {lootDrop?.magical_damage} Magi <br />
                {
                    lootDrop?.physical_resistance || lootDrop?.magical_resistance ?
                    <>
                    Defense: {lootDrop?.physical_resistance} Phys | {lootDrop?.magical_resistance} Magi <br />
                    </>
                    : ''
                }
                {
                    lootDrop?.physical_penetration || lootDrop?.magical_resistance ?
                    <>
                    Penetration: {lootDrop?.physical_penetration} Phys | {lootDrop?.magical_penetration} Magi <br />
                    </>
                    : ''
                }
                Critical Chance: {lootDrop?.critical_chance}% <br />
                Critical Damage: {lootDrop?.critical_damage}x <br />
                Dodge Timer: {lootDrop?.dodge}s <br />
                Roll Chance: {lootDrop?.roll}% <br />
                {
                    lootDrop?.influences?.length > 0 ?
                    <>
                Influence: {lootDrop?.influences} <br />
                    </>
                    : ''
                }
                <br />
                {lootDrop?.rarity}
                {
                    itemSaved ?
                    ""
                    :
                    <Button variant='' style={{ color: 'green', fontWeight: 600, float: 'right', marginTop: -3 + '%', fontSize: 18 + 'px', marginRight: -5 + '%' }} onClick={saveItem}>Save</Button>
                }
            </Popover.Body>
        </Popover>
    );

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
        };
    };

    const getItemStyle = {
        background: 'black',
        border: getBorderStyle(lootDrop?.rarity)
    };

    return (
        <div>
        You have found {article} {lootDrop?.name}. <br />
        <OverlayTrigger trigger="click" rootClose placement="auto-start" overlay={lootDropPopover}>
            <Button variant=""  className="m-3 p-2" style={getItemStyle}><img src={process.env.PUBLIC_URL + lootDrop.imgURL} alt={lootDrop?.name} /></Button>
        </OverlayTrigger>
        </div>
    );
};

export default LootDrop;