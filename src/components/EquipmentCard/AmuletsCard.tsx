import './EquipmentCard.css';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

interface AmuletProps {
    amulet: any;
    index: any;
    userProfile: boolean;
}

const AmuletsCard = ({ amulet, index, userProfile }: AmuletProps) => {
    const amuletPopover = (
        <Popover className="text-info" id="popover">
            <Popover.Header id="popover-header" className="" as="h3">{amulet.name} <span id="popover-image"><img src={process.env.PUBLIC_URL + amulet.imgURL} /></span></Popover.Header>
            <Popover.Body id="popover-body" className="">
                {amulet.constitution > 0 ? 'CON: +' + amulet.constitution + ' ' : ''}
                {amulet.strength > 0 ? 'STR: +' + amulet.strength + ' ' : ''}
                {amulet.agility > 0 ? 'AGI: +' + amulet.agility + ' ' : ''}
                {amulet.achre > 0 ? 'ACH: +' + amulet.achre + ' ' : ''}
                {amulet.caeren > 0 ? 'CAER: +' + amulet.caeren + ' ' : ''}
                {amulet.kyosir > 0 ? 'KYO: +' + amulet.kyosir + ' ' : ''}
                <br />
                Physical Defense: +{amulet.physical_resistance}% <br />
                Magical Defense: +{amulet.magical_resistance}% <br />
                Physical Damage: {amulet.physical_damage}x <br />
                Magical Damage: {amulet.magical_damage}x <br />
                Critical Chance: +{amulet.critical_chance}% <br />
                Critical Damage: {amulet.critical_damage}x <br />
                Dodge Timer: +{amulet.dodge}s <br />
                Roll Chance: +{amulet.roll}% <br />
                Influences: {amulet.influences} <br /><br />
                {amulet.rarity}
            </Popover.Body>
        </Popover>
    )
  return (
    <OverlayTrigger trigger="click" placement="auto-start" overlay={amuletPopover}>
        <Button variant="outline-danger"  className="m-3 p-4 eqp-popover">{amulet.name}</Button>
    </OverlayTrigger>
  )
}

export default AmuletsCard