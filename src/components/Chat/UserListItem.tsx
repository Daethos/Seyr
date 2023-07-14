import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

interface Props {
    user: any;
    accessChat: any;
};

const UserListItem = ({ user, accessChat }: Props) => {

    return (
        <div className='friend-block my-3' style={{ justifyContent: 'center', display: 'flex' }}>
            <h3 style={{ fontWeight: 500, fontSize: '25px', color: 'purple', fontVariant: 'small-caps', marginTop: '2%' }}>
            <Link to={`/${user.username}`}>
                <img 
                    src={user.photoUrl} 
                    alt={user.username} 
                    style={{ 
                        maxWidth: '75px', 
                        height: '75px',
                        borderRadius: '50%', 
                        float: 'left',
                    }} 
                    className="friend-pic"
                />
            </Link>
            <span id='user-card'>
            <Button onClick={accessChat} variant="" size="lg" style={{ fontWeight: 500, fontSize: 25 + 'px', color: '#fdf6d8', fontVariant: 'small-caps' }}>
                <u>{user.username.charAt(0).toUpperCase() + user.username.slice(1)}</u>
                <p style={{ fontSize: 14 + 'px' }}>{user.email}</p>
            </Button>
            </span>
            </h3>
        </div>
    );
};

export default UserListItem;