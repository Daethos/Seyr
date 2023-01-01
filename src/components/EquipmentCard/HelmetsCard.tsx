import './EquipmentCard.css';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

interface HelmetProps {
    helmet: any;
    index: any;
    userProfile: boolean;
}

const HelmetsCard = ({ helmet, index, userProfile }: HelmetProps) => {
    const helmetPopover = (
        <Popover className="text-info" id="popover">
            <Popover.Header id="popover-header" className="" as="h3">{helmet.name} <span id="popover-image"><img src={process.env.PUBLIC_URL + helmet.imgURL} /></span></Popover.Header>
            <Popover.Body id="popover-body" className="">
                {helmet.constitution > 0 ? 'CON: +' + helmet.constitution + ' ' : ''}
                {helmet.strength > 0 ? 'STR: +' + helmet.strength + ' ' : ''}
                {helmet.agility > 0 ? 'AGI: +' + helmet.agility + ' ' : ''}
                {helmet.achre > 0 ? 'ACH: +' + helmet.achre + ' ' : ''}
                {helmet.caeren > 0 ? 'CAER: +' + helmet.caeren + ' ' : ''}
                {helmet.kyosir > 0 ? 'KYO: +' + helmet.kyosir + ' ' : ''}
                <br />
                {helmet.type}<br />
                Physical Defense: +{helmet.physical_resistance}% <br />
                Magical Defense: +{helmet.magical_resistance}% <br />
                Physical Damage: {helmet.physical_damage}x <br />
                Magical Damage: {helmet.magical_damage}x <br />
                Critical Chance: +{helmet.critical_chance}% <br />
                Critical Damage: {helmet.critical_damage}x <br />
                Dodge Timer: +{helmet.dodge}s <br />
                Roll Chance: +{helmet.roll}% <br /><br />
                {helmet.rarity}
            </Popover.Body>
        </Popover>
    )
  return (
    <OverlayTrigger trigger="click" placement="auto-start" overlay={helmetPopover}>
        <Button variant="outline-danger"  className="m-3 p-4 eqp-popover">{helmet.name}</Button>
    </OverlayTrigger>
  )
}

export default HelmetsCard