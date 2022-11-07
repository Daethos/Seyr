import { isDisabled } from '@testing-library/user-event/dist/utils';
import { useEffect, useState } from 'react'
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
    actionBarStatus: boolean;
    setActionBarStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

const GameActions = ({ setDodgeStatus, actionBarStatus, setActionBarStatus, handleAction, handleCounter, handleInitiate, sleep, currentAction, currentCounter, combatData, setCombatData, currentWeapon, setWeaponOrder, weapons, dodgeStatus }: Props) => {
  const [displayedAction, setDisplayedAction] = useState<any>([])
  const counters = ['attack', 'counter', 'dodge', 'posture', 'roll']
  useEffect(() => {
    console.log('Displaying new action: ', currentAction)
    if (currentAction === 'counter') {
      setDisplayedAction(currentAction.charAt(0).toUpperCase() + currentAction.slice(1) + ': ' + currentCounter.charAt(0).toUpperCase() + currentCounter.slice(1))
    } else {
      setDisplayedAction(currentAction.charAt(0).toUpperCase() + currentAction.slice(1))
      setCombatData({ ...combatData, 'counter_guess': '' })
    }
  }, [currentAction, currentCounter])

  useEffect(() => {
    console.log('Displaying new weapon ', currentWeapon.name)
    setDisplayedAction(`Main Weapon: ${currentWeapon.name}`)
  }, [currentWeapon])


  const dodgeButton = document.querySelector('#dodge-button');
  const actionButton = document.querySelector('#action-button')

  async function hideDodge() {
    try {
      // await sleep(250)
      dodgeButton?.classList.add('hide');
      console.log('Dodge Timer: ', 40 + combatData.weapons[0].dodge, ' seconds')
      await sleep(40000 + combatData.weapons[0].dodge)
      dodgeButton?.classList.remove('hide')
      setDodgeStatus(false)
    } catch (err: any) {
      console.log(err.message, 'Error Hiding Action Bar')
  }
  }
  async function hideInitiate() {
    try {
      // await sleep(250)
      actionButton?.classList.add('hide');
      await sleep(3500)
      actionButton?.classList.remove('hide')
      setActionBarStatus(false)
      setCombatData({ ...combatData, 'action': '' })
    } catch (err: any) {
      console.log(err.message, 'Error Hiding Action Bar')
  }
  }
  if (dodgeStatus) {
    console.log('Dodge Hiding')
    hideDodge()
  }

  if (actionBarStatus) {
    console.log('Initiate Hiding')
    hideInitiate()
    // actionBar?.classList.toggle('hide')
    // setActionBarStatus(false)
  }
  return (
    <>
    <textarea className='action-reader' value={displayedAction} readOnly></textarea>
      <select name="Attacks" id="attack-options" value={combatData.weapons[0]} onChange={setWeaponOrder}>
        <option value="">Weapon Order</option>
        {
        weapons ?
        weapons?.map((weapon: any, index: number) => { return ( <option value={weapon?.name} key={index} >{weapon?.name}</option> ) } )
        : ''
        }
      </select>
    <div className="actionButtons">
      <Form onSubmit={handleInitiate} style={{ float: 'right' }}>                
          <button value='initiate' type='submit' className='btn btn-outline ' id='initiate-button'>Initiate</button>
      </Form>
      <button value='attack' onClick={handleAction} className='btn btn-outline' id='action-button'>Attack</button>
      <select onChange={handleCounter} className='btn btn-outline' id='action-button'>
        <option>Counter</option>
        {counters.map((counter: string, index: number) => ( 
          <option value={counter} key={index}>{counter.charAt(0).toUpperCase() + counter.slice(1)}</option> 
        ))}
      </select>
      <button value='dodge' onClick={handleAction} className='btn btn-outline' id='dodge-button'
      // disabled={dodgeStatus ? true : false}
      >Dodge</button>
      <button value='posture' onClick={handleAction} className='btn btn-outline' id='action-button'>Posture</button>
      <button value='roll' onClick={handleAction} className='btn btn-outline' id='action-button'>Roll</button>
    </div>
    </>
  )
}

export default GameActions