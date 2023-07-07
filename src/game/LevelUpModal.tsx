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
    story?: boolean;
};

const LevelUpModal = ({ asceanState, setAsceanState, levelUpAscean, story }: Props) => {
    const [levelUpModalShow, setLevelUpModalShow] = useState<boolean>(false);

    const finishLevelUp = () => {
        setLevelUpModalShow(false);
        levelUpAscean(asceanState);
    };

    const storyLevelStyle = {
        
    };
    //, overflowY: 'auto'
    return (
        <>            
        <Modal show={levelUpModalShow} style={{ zIndex: 9999, top: story ? '-25%' : '0', transform: story ? "scale(0.65)" : "", overflowY: 'auto' }} onHide={() => setLevelUpModalShow(false)} centered backdrop="static">
            <Modal.Body style={{ color: 'orangered', fontWeight: 400, fontVariant: 'small-caps', fontSize: '25px', height: '65vh', overflowY: 'auto' }}>
            <h3 style={{ fontSize: 20 + 'px', textAlign: 'center', color: '' }} className=''>Congratulations {asceanState.ascean.name}, You Can Now Level Up To {asceanState.ascean.level + 1}!!</h3>
            <Mastery asceanState={asceanState} setAsceanState={setAsceanState} />
            { asceanState.level % 2 !== 0 ? (
                    <Attributes asceanState={asceanState} setAsceanState={setAsceanState} />
            ) : ( '' ) }
            <Faith asceanState={asceanState} setAsceanState={setAsceanState} />
            <Button variant='outline-warning' 
            onClick={finishLevelUp}
            className='mt-5'
            style={{ 
                float: 'right',
                fontWeight: 550, 
                fontVariant: 'small-caps', 
                color: 'green', 
                fontSize: '15px',
                border: '2px solid green' 
            }}>
                Level Up
            </Button>
            </Modal.Body>
        </Modal>
        <Button variant='outline' id={story ? 'story-levelup' : 'level-up'} onClick={() => setLevelUpModalShow(true)}>
            <h3 className={story ? 'story-levelup' : 'level-up'}>Level++</h3>
        </Button>
        </>
    );
};

export default LevelUpModal;