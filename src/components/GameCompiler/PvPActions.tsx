import { isDisabled } from '@testing-library/user-event/dist/utils';
import { useEffect, useState, useRef } from 'react'
import Form from 'react-bootstrap/Form'
import './GameCompiler.css'

interface Props {
    handleAction: (action: any) => void;
    handleCounter: (action: any) => void;
    handleInitiate: (e: { preventDefault: () => void; }) => Promise<void>;
    currentAction: string;
    currentCounter: string;
    combatData: any;
    setCombatData: (value: any) => void;
    currentWeapon: any;
    setWeaponOrder: any;
    weapons: any;
    dodgeStatus: boolean;
    setDodgeStatus: React.Dispatch<React.SetStateAction<boolean>>;
    sleep: (ms: number) => Promise<unknown>;
    actionStatus: boolean;
    setActionStatus: React.Dispatch<React.SetStateAction<boolean>>;
    setEmergencyText: React.Dispatch<React.SetStateAction<any[]>>;
    PvP?: boolean;
    yourData: any;
    enemyData: any;
    combatInitiated: boolean;
    setCombatInitiated: React.Dispatch<React.SetStateAction<boolean>>;
}

const PvPActions = ({ setDodgeStatus, setEmergencyText, PvP, yourData, enemyData, actionStatus, setActionStatus, handleAction, handleCounter, handleInitiate, combatInitiated, setCombatInitiated, sleep, currentAction, currentCounter, combatData, setCombatData, currentWeapon, setWeaponOrder, weapons, dodgeStatus }: Props) => {
    const [displayedAction, setDisplayedAction] = useState<any>([])
    const counters = ['attack', 'counter', 'dodge', 'posture', 'roll']
    const dropdownRef = useRef<HTMLSelectElement | null>(null);
    useEffect(() => {
        // console.log('Displaying new action: ', currentAction)
        if (currentAction === 'counter') {
        setDisplayedAction(currentAction.charAt(0).toUpperCase() + currentAction.slice(1) + ': ' + currentCounter.charAt(0).toUpperCase() + currentCounter.slice(1))
        } else {
        setDisplayedAction(currentAction.charAt(0).toUpperCase() + currentAction.slice(1))
        setCombatData({ ...combatData, 'counter_guess': '' })
        }
    }, [currentAction, currentCounter])

    useEffect(() => {
        // console.log('Displaying new weapon ', currentWeapon?.name)
        setDisplayedAction(`Main Weapon: ${currentWeapon?.name}`)
    }, [currentWeapon])

    useEffect(() => {
        if (combatInitiated) {
            if (dropdownRef.current) {
                dropdownRef!.current.selectedIndex = 0;
                console.log('Resetting counter dropdown to "none"')
            }
            setCombatInitiated(false);
        }
    }, [combatInitiated])

    useEffect(() => {

        const dodgeTimer = setTimeout(() => {
        setDodgeStatus(false);
        }, (yourData.player === 1 ? combatData.player_one_weapons[0].dodge * 1000 : combatData.player_two_weapons[0].dodge * 1000))
        return () => clearTimeout(dodgeTimer)
    }, [dodgeStatus])

    useEffect(() => {
        // actionButton?.classList.add('hide');
        // actionButton?.classList.remove('hide')
        const initiateTimer = setTimeout(() => {
            
        setActionStatus(false)
        }, 4000)
        return () => clearTimeout(initiateTimer);
    }, [actionStatus])
    
    return (
        <>
        <textarea className='action-reader' value={displayedAction} readOnly></textarea>
        <select name="Attacks" id="attack-options" value={PvP ? combatData.player_one_weapons[0] : combatData.weapons[0]} onChange={setWeaponOrder}>
            <option value="">Weapon Order</option>
            {
            weapons ?
            weapons?.map((weapon: any, index: number) => { return ( <option value={weapon?.name} key={index} >{weapon?.name}</option> ) } )
            : ''
            }
        </select>
        <div className="actionButtons">
        <Form onSubmit={handleInitiate} style={{ float: 'right' }}>                
            <button value='initiate' type='submit' className='btn btn-outline ' disabled={actionStatus ? true : false} id='initiate-button'>Initiate</button>
        </Form>
        <button value='attack' onClick={handleAction} className='btn btn-outline' id='action-button'>Attack</button>
        <select onChange={handleCounter} defaultValue='Counter' className='btn btn-outline' id='action-button' ref={dropdownRef}>
            <option>Counter</option>
            {counters.map((counter: string, index: number) => ( 
            <option value={counter} key={index}>{counter.charAt(0).toUpperCase() + counter.slice(1)}</option> 
            ))}
        </select>
        <button value='dodge' onClick={handleAction} disabled={dodgeStatus ? true : false} className='btn btn-outline' id='dodge-button'>Dodge</button>
        <button value='posture' onClick={handleAction} className='btn btn-outline' id='action-button'>Posture</button>
        <button value='roll' onClick={handleAction} className='btn btn-outline' id='action-button'>Roll</button>
        </div>
        </>
    )
}

export default PvPActions