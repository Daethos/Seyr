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
}

const LootDrop = ({ lootDrop, setLootDrop, ascean, itemSaved, setItemSaved }: Props) => {
    const [saveSetting, setSaveSetting] = useState({
        ascean: ascean,
        lootDrop: lootDrop
    })

    useEffect(() => {
        setSaveSetting({
            ascean: ascean,
            lootDrop: lootDrop
        });
    }, [lootDrop])

    const saveItem = async () => {
        try {
            const res = await asceanAPI.saveToInventory(saveSetting);
            console.log(res, 'Saved Item to Inventory!');
            setLootDrop(null);
            setItemSaved(true);
        } catch (err: any) {
            console.log(err.message, 'Error Saving Item to Inventory!');
        }
    }

    const lootDropPopover = (
        <Popover className="text-info" id="popover">
            <Popover.Header id="popover-header" className="" as="h2">{lootDrop?.name} <span id="popover-image"><img src={process.env.PUBLIC_URL + lootDrop.imgURL} /></span></Popover.Header>
            <Popover.Body id="popover-body" className="">
                {
                    lootDrop?.grip ?
                    <>
                {lootDrop?.type} [{lootDrop?.grip}] <br />
                {lootDrop?.attack_type} [{lootDrop?.damage_type?.[0]}{lootDrop?.damage_type?.[1] ? ' / ' + lootDrop?.damage_type[1] : '' }]  <br />
                    </>
                    : ''
                }
                {lootDrop?.constitution > 0 ? 'CON: +' + lootDrop?.constitution + ' ' : ''}
                {lootDrop?.strength > 0 ? 'STR: +' + lootDrop?.strength + ' ' : ''}
                {lootDrop?.agility > 0 ? 'AGI: +' + lootDrop?.agility + ' ' : ''}
                {lootDrop?.achre > 0 ? 'ACH: +' + lootDrop?.achre + ' ' : ''}
                {lootDrop?.caeren > 0 ? 'CAER: +' + lootDrop?.caeren + ' ' : ''}
                {lootDrop?.kyosir > 0 ? 'KYO: +' + lootDrop?.kyosir + ' ' : ''}<br />
                Damage: {lootDrop?.physical_damage} Physical | {lootDrop?.magical_damage} Magical <br />
                {
                    lootDrop?.physical_defense ?
                    <>
                    Defense: {lootDrop?.physical_defense} Physical | {lootDrop?.magical_defense} Magical <br />
                    </>
                    : ''
                }
                {
                    lootDrop?.physical_penetration ?
                    <>
                    Penetration: {lootDrop?.physical_penetration} Physical | {lootDrop?.magical_penetration} Magical <br />
                    </>
                    : ''
                }
                Critical Chance: {lootDrop?.critical_chance}% <br />
                Critical Damage: {lootDrop?.critical_damage}x <br />
                Dodge Timer: {lootDrop?.dodge}s <br />
                Roll Chance: {lootDrop?.roll}% <br />
                {
                    lootDrop?.influences ?
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
                    <Button variant='' style={{ color: 'green', fontWeight: 550, float: 'right' }} onClick={saveItem}>Save</Button>
                }
            </Popover.Body>
        </Popover>
    )

    return (
        <OverlayTrigger trigger="click" placement="auto-start" overlay={lootDropPopover}>
            <Button variant="outline-danger"  className="m-3 p-4 eqp-popover">{lootDrop?.name}</Button>
        </OverlayTrigger>
    )
}

export default LootDrop