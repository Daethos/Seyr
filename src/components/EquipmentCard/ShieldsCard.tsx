import './EquipmentCard.css';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

interface ShieldProps {
    shield: any;
    index: any;
    userProfile: boolean;
}

const ShieldsCard = ({ shield, index, userProfile }: ShieldProps) => {
    const shieldPopover = (
        <Popover className="text-info" id="popover">
            <Popover.Header id="popover-header" className="" as="h3">{shield.name} <span id="popover-image"><img src={process.env.PUBLIC_URL + shield.imgURL} alt={shield.name} /></span></Popover.Header>
            <Popover.Body id="popover-body" className="">
                {shield.constitution > 0 ? 'CON: +' + shield.constitution + ' ' : ''}
                {shield.strength > 0 ? 'STR: +' + shield.strength + ' ' : ''}
                {shield.agility > 0 ? 'AGI: +' + shield.agility + ' ' : ''}
                {shield.achre > 0 ? 'ACH: +' + shield.achre + ' ' : ''}
                {shield.caeren > 0 ? 'CAER: +' + shield.caeren + ' ' : ''}
                {shield.kyosir > 0 ? 'KYO: +' + shield.kyosir + ' ' : ''}
                <br />
                {shield.type}<br />
                Physical Defense: +{shield.physical_resistance}% <br />
                Magical Defense: +{shield.magical_resistance}% <br />
                Physical Damage: {shield.physical_damage}x <br />
                Magical Damage: {shield.magical_damage}x <br />
                Critical Chance: +{shield.critical_chance}% <br />
                Critical Damage: {shield.critical_damage}x <br />
                Dodge Timer: +{shield.dodge}s <br />
                Roll Chance: +{shield.roll}% <br /><br />
                {shield.rarity}
            </Popover.Body>
        </Popover>
    )
  return (
    <OverlayTrigger trigger="click" placement="auto-start" overlay={shieldPopover}>
        <Button variant="outline-danger" className="m-3 p-4 eqp-popover">{shield.name}</Button>
    </OverlayTrigger>
  )
}

export default ShieldsCard