import { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'

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
}

const GameActions = ({ handleAction, handleCounter, handleInitiate, currentAction, currentCounter, combatData, setCombatData, currentWeapon, setWeaponOrder, weapons }: Props) => {
  const [displayedAction, setDisplayedAction] = useState<any>([])
  const counters = ['attack', 'counter', 'dodge', 'posture', 'roll']
  useEffect(() => {
    console.log('Displaying new action: ', currentAction)
    if (currentAction === 'counter') {
      setDisplayedAction(currentAction.charAt(0).toUpperCase() + currentAction.slice(1) + ': ' + currentCounter.charAt(0).toUpperCase() + currentCounter.slice(1))
    } else {
      setDisplayedAction(currentAction.charAt(0).toUpperCase() + currentAction.slice(1))
    }
  }, [currentAction, currentCounter])

  useEffect(() => {
    console.log('Displaying new weapon ', currentWeapon.name)
    setDisplayedAction(`Main Weapon: ${currentWeapon.name}`)
  }, [currentWeapon])
  return (
    <>
    <textarea className='action-reader' value={displayedAction} readOnly></textarea>
      <select name="Attacks" id="attack-options" style={{ color: 'purple' }} value={combatData.weapons[0]} onChange={setWeaponOrder}>
        <option value="">Weapon Order</option>
        {
        weapons ?
        weapons?.map((weapon: any, index: number) => { return ( <option value={weapon?.name} key={index} >{weapon?.name}</option> ) } )
        : ''
        }
      </select>
    <div className="action-buttons">
      <button value='attack' onClick={handleAction} className='btn btn-outline' id='action-button'>Attack</button>
      <select onChange={handleCounter} className='btn btn-outline' id='action-button'>
        <option>Counter</option>
        {counters.map((counter: string, index: number) => ( 
          <option value={counter} key={index}>{counter.charAt(0).toUpperCase() + counter.slice(1)}</option> 
        ))}
      </select>
      <button value='dodge' onClick={handleAction} className='btn btn-outline' id='action-button'>Dodge</button>
      <button value='posture' onClick={handleAction} className='btn btn-outline' id='action-button'>Posture</button>
      <button value='roll' onClick={handleAction} className='btn btn-outline' id='action-button'>Roll</button>
      <Form onSubmit={handleInitiate} style={{ float: 'right' }}>                
          <button value='initiate' type='submit' className='btn btn-outline text-info' id='action-button'>Initiate</button>
      </Form>
    </div>
    </>
  )
}

export default GameActions