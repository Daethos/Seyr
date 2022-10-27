import './EquipmentCard.css';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

interface TrinketProps {
    trinket: any;
    index: any;
    userProfile: boolean;
}

const TrinketsCard = ({ trinket, index, userProfile }: TrinketProps) => {
    const trinketPopover = (
        <Popover className="text-info" id="popover">
            <Popover.Header id="popover-header" className="" as="h3">{trinket.name} <span id="popover-image"><img src={process.env.PUBLIC_URL + trinket.imgURL} /></span></Popover.Header>
            <Popover.Body id="popover-body" className="">
                {trinket.constitution > 0 ? 'CON: +' + trinket.constitution + ' ' : ''}
                {trinket.strength > 0 ? 'STR: +' + trinket.strength + ' ' : ''}
                {trinket.agility > 0 ? 'AGI: +' + trinket.agility + ' ' : ''}
                {trinket.achre > 0 ? 'ACH: +' + trinket.achre + ' ' : ''}
                {trinket.caeren > 0 ? 'CAER: +' + trinket.caeren + ' ' : ''}
                {trinket.kyosir > 0 ? 'KYO: +' + trinket.kyosir + ' ' : ''}
                <br />
                Physical Defense: +{trinket.physical_resistance}% <br />
                Magical Defense: +{trinket.magical_resistance}% <br />
                Physical Damage: {trinket.physical_damage}x <br />
                Magical Damage: {trinket.magical_damage}x <br />
                Critical Chance: +{trinket.critical_chance}% <br />
                Critical Damage: {trinket.critical_damage}x <br />
                Dodge Timer: +{trinket.dodge}s <br />
                Roll Chance: +{trinket.roll}% <br />
                Influences: {trinket.influences}
            </Popover.Body>
        </Popover>
    )
  return (
    <OverlayTrigger trigger="click" placement="auto-start" overlay={trinketPopover}>
        <Button variant="outline-danger" className="m-3 p-4 eqp-popover">{trinket.name}</Button>
    </OverlayTrigger>
  )
}

export default TrinketsCard