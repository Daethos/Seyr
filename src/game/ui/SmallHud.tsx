import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { setShowDialog, setShowPlayer } from '../reducers/gameState';
import { useCallback, useEffect, useState } from 'react';
import { Player } from '../../components/GameCompiler/GameStore';
import StoryJournal from './StoryJournal';
import ToastAlert from '../../components/ToastAlert/ToastAlert';
import MultiChat from './MultiChat';
import { getSocketInstance } from '../../sagas/socketManager';
import { setShowChat } from '../reducers/phaserState';

interface Props {
    ascean: Player;
    dialogTag: boolean;
};

const SmallHud = ({ ascean, dialogTag }: Props) => {
    const dispatch = useDispatch();
    const phaser = useSelector((state: any) => state.phaser);
    const socket = getSocketInstance();
    const user = useSelector((state: any) => state.user.user);
    const showPlayer = useSelector((state: any) => state.game.showPlayer);
    const showDialog = useSelector((state: any) => state.game.showDialog);
    const [experience, setExperience] = useState<number>(ascean.experience);
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

    function checkChat() {
        console.log(phaser.showChat, 'Show Chat?')
        dispatch(setShowChat(!phaser.showChat));
    };

    return (
        <div id='ui-hud'>
            <div style={{ position: 'absolute', marginTop: '-10%', left: '2.5%', width: '25%' }}>
            <ToastAlert error={experienceAlert} setError={setExperienceAlert} story={experienceGained} />
            </div>
            <Button variant='outline' style={{ color: '#fdf6d8', fontWeight: 400, fontVariant: 'small-caps' }} className='ascean-ui' onClick={() => dispatch(setShowPlayer(!showPlayer))}>
                <h3 style={{ fontSize: '12px', textAlign: 'center' }}>{ascean.name}</h3>
            </Button>
            { phaser.gameChange && phaser.showChat && (
                <Button variant='' style={{ color: '#fdf6d8', fontWeight: 400, fontVariant: 'small-caps', fontSize: '12px', marginTop: '-0.75%' }} className='ascean-ui' onClick={() => dispatch(setShowChat(!phaser.showChat))}>
                    Chat
                </Button>
            )}
            { ascean?.journal.entries.length > 0 && (
                <StoryJournal ascean={ascean} />
                ) }
            { dialogTag && (
                <Button variant='' className='ascean-ui' onClick={() => dispatch(setShowDialog(!showDialog))}>
                    <h3 style={{ color: '#fdf6d8', fontWeight: 400, fontVariant: 'small-caps', fontSize: '12px', textAlign: 'center' }}>Dialog!</h3>
                </Button>
            ) }
            { phaser.showChat && (
                <MultiChat ascean={ascean} socket={socket} user={user} />
            ) }
        </div>
    );
};

export default SmallHud;