import { Ascean, ACTIONS, Action, GameAdminData } from '../../pages/GameAdmin/GameAdmin';
import Button from 'react-bootstrap/Button';

interface Props {
    ascean: Ascean;
    state: GameAdminData;
    dispatch: React.Dispatch<Action>;
    fetch: any;
};

const AsceanListItem = ({ ascean, state, dispatch, fetch }: Props) => {
    return (
        <div className='friend-block my-3' style={{ height: '150px', display: 'flex', justifyContent: 'center' }}>
            <img
                src={process.env.PUBLIC_URL + '/images/' + ascean.origin + '-' + ascean.sex + '.jpg'}
                alt={ascean.name + ', ' + ascean.origin + ' ' + ascean.sex}
                style={{ 
                    maxWidth: '25%', 
                    borderRadius: '50%', 
                }}
                className="friend-pic"
            />
            <span id='user-card' style={{ marginLeft: '10%', marginTop: '2.5%' }}>
            <Button onClick={fetch} variant="" size="lg" style={{ fontWeight: 500, fontSize: '18px', color: '#fdf6d8', fontVariant: 'small-caps' }}>
                <p>{ascean.name}</p>
                <p style={{ fontSize: '14px' }}>Level: {ascean.level} High Score: {ascean.high_score}</p>
            </Button>
            </span>
        </div>
    );
};

export default AsceanListItem;