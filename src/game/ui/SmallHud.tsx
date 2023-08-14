import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { setShowDialog, setShowPlayer } from '../reducers/gameState';
import { useCallback, useEffect, useState } from 'react';
import { Player } from '../../components/GameCompiler/GameStore';
import StoryJournal from './StoryJournal';
import ToastAlert from '../../components/ToastAlert/ToastAlert';

interface Props {
    ascean: Player;
    dialogTag: boolean;
};

const SmallHud = ({ ascean, dialogTag }: Props) => {
    const dispatch = useDispatch();
    const showPlayer = useSelector((state: any) => state.game.showPlayer);
    const showDialog = useSelector((state: any) => state.game.showDialog);
    const [experience, setExperience] = useState<number>(0);
    const [experienceAlert, setExperienceAlert] = useState({ title: '', content: '' });
    const [experienceGained, setExperienceGained] = useState<boolean>(false);
    const expCallback = useCallback(() => {
        if (ascean.experience > experience) {
            setExperienceAlert({ title: 'Experience Gained', content: `You've gained ${ascean.experience - experience} experience!` });
            setExperienceGained(true);
        } else if (ascean.experience < experience) {
            setExperienceAlert({ title: 'Experience Lost', content: `You've lost ${experience - ascean.experience} experience!` });
            setExperienceGained(false);    
        };
        setExperience(ascean.experience);
    } , [ascean.experience, experience]);
    
    useEffect(() => {
        expCallback();
    }, [ascean.experience, expCallback, experience]);
    return (
        <div id='ui-hud'>
            <div style={{ position: 'absolute', marginTop: '-10%', left: '2.5%', width: '25%' }}>
            <ToastAlert error={experienceAlert} setError={setExperienceAlert} story={experienceGained} />
            </div>
            <Button variant='outline' style={{ color: '#fdf6d8', fontWeight: 400, fontVariant: 'small-caps' }} className='ascean-ui' onClick={() => dispatch(setShowPlayer(!showPlayer))}>
                <h3 style={{ fontSize: '12px', textAlign: 'center' }}>{ascean.name}</h3>
            </Button>
            { ascean?.journal.entries.length > 0 && (
                <StoryJournal ascean={ascean} />
            ) }
            { dialogTag && (
                <Button variant='' className='ascean-ui' onClick={() => dispatch(setShowDialog(!showDialog))}>
                    <h3 style={{ color: '#fdf6d8', fontWeight: 400, fontVariant: 'small-caps', fontSize: '12px', textAlign: 'center' }}>Dialog!</h3>
                </Button>
            ) }
        </div>
    );
};

export default SmallHud;