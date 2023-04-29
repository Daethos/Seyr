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
        <div className='friend-block my-3' style={{ height: 125 + 'px', display: 'flex' }}>
            <h3 style={{ fontWeight: 500, fontSize: 24 + 'px', color: 'purple', fontVariant: 'small-caps', marginTop: 5 + '%' }}>
            <img
                src={process.env.PUBLIC_URL + '/images/' + ascean.origin + '-' + ascean.sex + '.jpg'}
                alt={ascean.name + ', ' + ascean.origin + ' ' + ascean.sex}
                style={{
                    textDecoration: 'none',
                    marginLeft: 25 + '%',
                }}
                className="friend-pic"
            />
            </h3>
            <span id='user-card' style={{ float: 'right', marginTop: 2.5 + '%', marginLeft: 10 + '%' }}>
            <Button onClick={fetch} variant="" size="lg" style={{ fontWeight: 500, fontSize: 18 + 'px', color: '#fdf6d8', fontVariant: 'small-caps' }}>
                <p>{ascean.name.charAt(0).toUpperCase() + ascean.name.slice(1)}</p>
                <p style={{ fontSize: 14 + 'px' }}>Level: {ascean.level} High Score: {ascean.high_score}</p>
            </Button>
            </span>
        </div>
    );
};

export default AsceanListItem;