import { right } from '@popperjs/core';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

interface Props {
    inventory: any;
}

const Inventory = ({ inventory }: Props) => {

    const inventoryPopover = (
        <Popover className="text-info" id="popover">
            <Popover.Header id="popover-header" className="" as="h2">{inventory?.name} <span id="popover-image"><img src={process.env.PUBLIC_URL + inventory.imgURL} /></span></Popover.Header>
            <Popover.Body id="popover-body" className="">
                {
                    inventory?.grip ?
                    <>
                {inventory?.type} [{inventory?.grip}] <br />
                {inventory?.attack_type} [{inventory?.damage_type?.[0]}{inventory?.damage_type?.[1] ? ' / ' + inventory?.damage_type[1] : '' }]  <br />
                    </>
                    : ''
                }
                {inventory?.constitution > 0 ? 'CON: +' + inventory?.constitution + ' ' : ''}
                {inventory?.strength > 0 ? 'STR: +' + inventory?.strength + ' ' : ''}
                {inventory?.agility > 0 ? 'AGI: +' + inventory?.agility + ' ' : ''}
                {inventory?.achre > 0 ? 'ACH: +' + inventory?.achre + ' ' : ''}
                {inventory?.caeren > 0 ? 'CAER: +' + inventory?.caeren + ' ' : ''}
                {inventory?.kyosir > 0 ? 'KYO: +' + inventory?.kyosir + ' ' : ''}<br />
                Damage: {inventory?.physical_damage} Physical | {inventory?.magical_damage} Magical <br />
                {
                    inventory?.physical_defense ?
                    <>
                    Defense: {inventory?.physical_defense} Physical | {inventory?.magical_defense} Magical <br />
                    </>
                    : ''
                }
                {
                    inventory?.physical_penetration ?
                    <>
                    Penetration: {inventory?.physical_penetration} Physical | {inventory?.magical_penetration} Magical <br />
                    </>
                    : ''
                }
                Critical Chance: {inventory?.critical_chance}% <br />
                Critical Damage: {inventory?.critical_damage}x <br />
                Dodge Timer: {inventory?.dodge}s <br />
                Roll Chance: {inventory?.roll}% <br />
                {
                    inventory?.influences ?
                    <>
                Influence: {inventory?.influences} <br />
                    </>
                    : ''
                }
                <br />
                {inventory?.rarity}
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
        float: right,
        background: 'black',
        border: getBorderStyle(inventory?.rarity)
    }

    return (
        <OverlayTrigger trigger="click" placement="auto-start" overlay={inventoryPopover}>
            <Button variant="" className="popover mt-4 mb-1" style={getItemStyle}><img src={process.env.PUBLIC_URL + inventory.imgURL} /></Button>
        </OverlayTrigger>
    )
}

export default Inventory