import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

interface RingProps {
    ring?: any;
    ring_one?: any;
    ring_two?: any;
    index: any;
    userProfile: boolean;
}

const RingsCard = ({ ring, index, ring_one, ring_two, userProfile }: RingProps) => {
    const ringPopover = (
        <Popover className="text-info" id="popover">
            <Popover.Header id="popover-header" className="" as="h3">{ring.name} <span id="popover-image"><img src={process.env.PUBLIC_URL + ring.imgURL} /></span></Popover.Header>
            <Popover.Body id="popover-body" className="">
                {ring.constitution > 0 ? 'CON: +' + ring.constitution + ' ' : ''}
                {ring.strength > 0 ? 'STR: +' + ring.strength + ' ' : ''}
                {ring.agility > 0 ? 'AGI: +' + ring.agility + ' ' : ''}
                {ring.achre > 0 ? 'ACH: +' + ring.achre + ' ' : ''}
                {ring.caeren > 0 ? 'CAER: +' + ring.caeren + ' ' : ''}
                {ring.kyosir > 0 ? 'KYO: +' + ring.kyosir + ' ' : ''}
                <br />
                Physical Defense: +{ring.physical_resistance}% <br />
                Magical Defense: +{ring.magical_resistance}% <br />
                Physical Damage: {ring.physical_damage}x <br />
                Magical Damage: {ring.magical_damage}x <br />
                Critical Chance: +{ring.critical_chance}% <br />
                Critical Damage: {ring.critical_damage}x <br />
                Dodge Timer: +{ring.dodge}s <br />
                Roll Chance: +{ring.roll}% <br /><br />
                {ring.rarity}
            </Popover.Body>
        </Popover>
    )
    const ringOnePopover = (
        <Popover className="text-info" id="popover">
            <Popover.Header id="popover-header" className="" as="h3">{ring_one.name} <span id="popover-image"><img src={process.env.PUBLIC_URL + ring_one.imgURL} /></span></Popover.Header>
            <Popover.Body id="popover-body" className="">
                {ring_one.constitution > 0 ? 'CON: +' + ring_one.constitution + ' ' : ''}
                {ring_one.strength > 0 ? 'STR: +' + ring_one.strength + ' ' : ''}
                {ring_one.agility > 0 ? 'AGI: +' + ring_one.agility + ' ' : ''}
                {ring_one.achre > 0 ? 'ACH: +' + ring_one.achre + ' ' : ''}
                {ring_one.caeren > 0 ? 'CAER: +' + ring_one.caeren + ' ' : ''}
                {ring_one.kyosir > 0 ? 'KYO: +' + ring_one.kyosir + ' ' : ''}
                <br />
                Physical Defense: +{ring_one.physical_resistance}% <br />
                Magical Defense: +{ring_one.magical_resistance}% <br />
                Physical Damage: {ring_one.physical_damage}x <br />
                Magical Damage: {ring_one.magical_damage}x <br />
                Critical Chance: +{ring_one.critical_chance}% <br />
                Critical Damage: {ring_one.critical_damage}x <br />
                Dodge Timer: +{ring_one.dodge}s <br />
                Roll Chance: +{ring_one.roll}% <br /><br />
                {ring_one.rarity}
            </Popover.Body>
        </Popover>
    )
    const ringTwoPopover = (
        <Popover className="text-info" id="popover">
            <Popover.Header id="popover-header" className="" as="h3">{ring_two.name} <span id="popover-image"><img src={process.env.PUBLIC_URL + ring_two.imgURL} /></span></Popover.Header>
            <Popover.Body id="popover-body" className="">
                {ring_two.constitution > 0 ? 'CON: +' + ring_two.constitution + ' ' : ''}
                {ring_two.strength > 0 ? 'STR: +' + ring_two.strength + ' ' : ''}
                {ring_two.agility > 0 ? 'AGI: +' + ring_two.agility + ' ' : ''}
                {ring_two.achre > 0 ? 'ACH: +' + ring_two.achre + ' ' : ''}
                {ring_two.caeren > 0 ? 'CAER: +' + ring_two.caeren + ' ' : ''}
                {ring_two.kyosir > 0 ? 'KYO: +' + ring_two.kyosir + ' ' : ''}
                <br />
                Physical Defense: +{ring_two.physical_resistance}% <br />
                Magical Defense: +{ring_two.magical_resistance}% <br />
                Physical Damage: {ring_two.physical_damage}x <br />
                Magical Damage: {ring_two.magical_damage}x <br />
                Critical Chance: +{ring_two.critical_chance}% <br />
                Critical Damage: {ring_two.critical_damage}x <br />
                Dodge Timer: +{ring_two.dodge}s <br />
                Roll Chance: +{ring_two.roll}% <br /><br />
                {ring_two.rarity}
            </Popover.Body>
        </Popover>
    )
  return (
    <>
    {
        userProfile
        ?
        <>
        <OverlayTrigger trigger="click" placement="auto-start" overlay={ringOnePopover}>
            <Button variant="outline-danger" className="m-3 p-4 eqp-popover">{ring_one.name}</Button>
        </OverlayTrigger>
        <OverlayTrigger trigger="click" placement="auto-start" overlay={ringTwoPopover}>
            <Button variant="outline-danger" className="m-3 p-4 eqp-popover">{ring_two.name}</Button>
        </OverlayTrigger>
        </>
        :
        <OverlayTrigger trigger="click" placement="auto-start" overlay={ringPopover}>
            <Button variant="outline-danger" className="m-3 p-4 eqp-popover">{ring.name}</Button>
        </OverlayTrigger>
    }
    </>
  )
}

export default RingsCard