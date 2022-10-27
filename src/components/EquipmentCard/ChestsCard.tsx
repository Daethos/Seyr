import './EquipmentCard.css';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

interface ChestProps {
    chest: any;
    index: any;
    userProfile: boolean;
}

const ChestsCard = ({ chest, index, userProfile }: ChestProps) => {
    const chestPopover = (
        <Popover className="text-info" id="popover">
            <Popover.Header id="popover-header" className="" as="h3">{chest.name} <span id="popover-image"><img src={process.env.PUBLIC_URL + chest.imgURL} /></span></Popover.Header>
            <Popover.Body id="popover-body" className="">
                {chest.constitution > 0 ? 'CON: +' + chest.constitution + ' ' : ''}
                {chest.strength > 0 ? 'STR: +' + chest.strength + ' ' : ''}
                {chest.agility > 0 ? 'AGI: +' + chest.agility + ' ' : ''}
                {chest.achre > 0 ? 'ACH: +' + chest.achre + ' ' : ''}
                {chest.caeren > 0 ? 'CAER: +' + chest.caeren + ' ' : ''}
                {chest.kyosir > 0 ? 'KYO: +' + chest.kyosir + ' ' : ''}
                <br />
                {chest.type}<br />
                Physical Defense: +{chest.physical_resistance}% <br />
                Magical Defense: +{chest.magical_resistance}% <br />
                Physical Damage: {chest.physical_damage}x <br />
                Magical Damage: {chest.magical_damage}x <br />
                Critical Chance: +{chest.critical_chance}% <br />
                Critical Damage: {chest.critical_damage}x <br />
                Dodge Timer: +{chest.dodge}s <br />
                Roll Chance: +{chest.roll}% <br />
            </Popover.Body>
        </Popover>
    )
  return (
    <OverlayTrigger trigger="click" placement="auto-start" overlay={chestPopover}>
        <Button variant="outline-danger"  className="m-3 p-4 eqp-popover">{chest.name}</Button>
    </OverlayTrigger>
  )
}

export default ChestsCard