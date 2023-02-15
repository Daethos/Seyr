import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

interface Props {
    setPrayerBlessing: any;
    setDamageType: any;
    damageType: any;
    setWeaponOrder: any;
    prayers: any;
    weapons: any;
    state: any;
};

const CombatSettingModal = ({ state, damageType, setDamageType, setPrayerBlessing, setWeaponOrder, prayers, weapons }: Props) => {

    const [combatModalShow, setCombatModalShow] = useState<boolean>(false);

    return (
        <>
        <Modal show={combatModalShow} onHide={() => setCombatModalShow(false)} centered id='modal-weapon'>
        <Modal.Header closeButton closeVariant='white' style={{ textAlign: 'center' }}>Settings For Weapons, Damage, Prayer</Modal.Header>
        <Modal.Body id='weapon-modal'>
            <p style={{ color: 'gold' }}>Current Main Weapon: {state.weapons[0].name}</p>
            <Form.Select name="Attacks" className='combat-settings' value={state.weapons[0].name} onChange={setWeaponOrder}>
            { weapons ?
                weapons?.map((weapon: any, index: number) => { return ( <option value={weapon?.name} key={index} >{weapon?.name}</option> ) } )
            : ''}
            </Form.Select><br />
            <p style={{ color: 'gold' }}>Current Damage Style: {state.player_damage_type}</p>
            <Form.Select name="Damage" className='combat-settings' value={state.player_damage_type} onChange={setDamageType}>
            { damageType ?
                damageType.map((damage: string, index: number) => { return ( <option value={damage} key={index} >{damage}</option> ) } )
            : '' }
            </Form.Select><br />
            <p style={{ color: 'gold' }}>Current Prayer: {state.playerBlessing}</p>
            <Form.Select name="Prayer" className='combat-settings' value={state.playerBlessing} onChange={setPrayerBlessing}>
            {prayers.map((prayer: string, index: number) => {
                return ( <option key={index} value={prayer}>{prayer}</option> )
            })}
            </Form.Select><br />
        </Modal.Body>
        </Modal>
        <Button variant='' id='attack-options' onClick={() => setCombatModalShow(true)}>Combat Settings</Button>
        </>
    );
};

export default CombatSettingModal;