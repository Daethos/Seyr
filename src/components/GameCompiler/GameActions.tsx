import { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'

interface Props {
    handleAction: (action: any) => void;
    handleInitiate: (e: { preventDefault: () => void; }) => Promise<void>;
    currentAction: string;
    combatData: any;
    setCombatData: (value: any) => void;
    currentWeapon: any;
    setWeaponOrder: any;
    weapons: any;
}

const GameActions = ({ handleAction, handleInitiate, currentAction, combatData, setCombatData, currentWeapon, setWeaponOrder, weapons }: Props) => {
  const [displayedAction, setDisplayedAction] = useState<any>([])
  useEffect(() => {
    console.log('Displaying new action: ', currentAction)
    setDisplayedAction(currentAction.charAt(0).toUpperCase() + currentAction.slice(1))
  }, [currentAction])

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
      <button value='counter' onClick={handleAction} className='btn btn-outline' id='action-button'>Counter</button>
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