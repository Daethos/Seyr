import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { setShowDialog } from '../reducers/gameState';
import { Player } from '../../components/GameCompiler/GameStore';
import StoryJournal from './StoryJournal';

interface Props {
    ascean: Player;
    setShowPlayer: React.Dispatch<React.SetStateAction<boolean>>;
    dialogTag: boolean;
};

const SmallHud = ({ ascean, setShowPlayer, dialogTag }: Props) => {
    const dispatch = useDispatch();
    const showDialog = useSelector((state: any) => state.game.showDialog);
    return (
        <div id='ui-hud'>
            <Button variant='outline' style={{ color: '#fdf6d8', fontWeight: 400, fontVariant: 'small-caps' }} className='ascean-ui' onClick={() => setShowPlayer((prev: boolean) => !prev)}>
                <h3 style={{ fontSize: '12px', textAlign: 'center' }}>{ascean.name}</h3>
            </Button>
            { ascean?.journal.entries.length > 0 ? (
                <StoryJournal ascean={ascean} />
            ) : ( '' ) }
            { dialogTag ? (
                <Button variant='' className='ascean-ui' onClick={() => dispatch(setShowDialog(!showDialog))}>
                    <h3 style={{ color: '#fdf6d8', fontWeight: 400, fontVariant: 'small-caps', fontSize: '12px', textAlign: 'center' }}>Dialog!</h3>
                </Button>
            ) : ( '' ) }
        </div>
    );
};

export default SmallHud;