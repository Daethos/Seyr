import { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Mastery from '../AsceanBuilder/Mastery';
import Attributes from './Attributes';
import Faith from '../AsceanBuilder/Faith';
import { useDispatch } from 'react-redux';
import { getAsceanLevelUpFetch } from '../../game/reducers/gameState';

interface Props {
    asceanState?: any;
    levelUpAscean?: any;
    story?: boolean;
};

const LevelUpModal = ({ asceanState, levelUpAscean, story }: Props) => {
    const [levelUpModalShow, setLevelUpModalShow] = useState<boolean>(false);
    const dispatch = useDispatch();
    const finishLevelUp = async (): Promise<void> => {
        setLevelUpModalShow(false);
        if (!story) await levelUpAscean(asceanState);
        if (story) await levelUp(asceanState);
    };

    const levelUp = async (vaEsai: any): Promise<void> => {
        try {
            console.log(vaEsai, 'Leveling Up');
            dispatch(getAsceanLevelUpFetch(vaEsai)); 
        } catch (err: any) {
            console.log(err.message, 'Error Leveling Up');
        };
    };

    return (
        <>            
        <Modal show={levelUpModalShow} style={{ zIndex: 9999, top: story ? '-25%' : '0', transform: story ? "scale(0.65)" : "", overflowY: 'auto' }} onHide={() => setLevelUpModalShow(false)} centered backdrop="static">
            <Modal.Body style={{ color: 'orangered', fontWeight: 400, fontVariant: 'small-caps', fontSize: '25px', maxHeight: '55vh', overflowY: 'auto' }}>
            <h3 style={{ fontSize: '20px', textAlign: 'center' }} className=''>Congratulations {asceanState.ascean.name}, You Can Now Level Up To {asceanState.ascean.level + 1}!!</h3>
            <Mastery asceanState={asceanState} />
            { asceanState.level % 2 !== 0 ? (
                <Attributes asceanState={asceanState} />                
            ) : ( '' ) }
            <Faith asceanState={asceanState} />
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