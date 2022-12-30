import { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Mastery from '../components/AsceanBuilder/Mastery';
import Attributes from './LevelUp/Attributes';
import Faith from '../components/AsceanBuilder/Faith';

interface Props {
    asceanState?: any;
    setAsceanState: React.Dispatch<any>;
    levelUpAscean?: any;
}

const LevelUpModal = ({ asceanState, setAsceanState, levelUpAscean }: Props) => {
    const [levelUpModalShow, setLevelUpModalShow] = useState<boolean>(false);

    return (
        <>            
        <Modal show={levelUpModalShow} onHide={() => setLevelUpModalShow(false)} centered>
            <Modal.Body style={{ color: 'orangered', fontWeight: 400, fontVariant: 'small-caps', fontSize: 25 + 'px', height: 65 + 'vh', overflowY: 'auto' }}>
            <h3 style={{ fontSize: 20 + 'px', textAlign: 'center', color: '' }} className=''>Congratulations {asceanState.ascean.name}, You Can Now Level Up To {asceanState.ascean.level + 1}!</h3>
            <Mastery asceanState={asceanState} setAsceanState={setAsceanState} />
            <Attributes asceanState={asceanState} setAsceanState={setAsceanState} />
            <Faith asceanState={asceanState} setAsceanState={setAsceanState} />
            <Button variant='outline-warning' 
            onClick={() => levelUpAscean(asceanState)}
            className='mt-5'
            style={{ 
                float: 'right',
                fontWeight: 550, 
                fontVariant: 'small-caps', 
                color: 'green', 
                fontSize: 15 + 'px',
                border: 2 + 'px' + ' solid ' + 'green' 
            }}>
                Level Up
            </Button>
            </Modal.Body>
        </Modal>
        <Button variant='outline' style={{ }} id='level-up' onClick={() => setLevelUpModalShow(true)}>
            <h3 style={{ fontSize: 12 + 'px', textAlign: 'center', color: '' }} className=''>Level++!</h3>
        </Button>
        </>
  )
}

export default LevelUpModal