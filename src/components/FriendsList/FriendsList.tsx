import './FriendsList.css';
import { Link } from "react-router-dom";

interface Props {
    user: any;
    friend: any
    handleClose: () => void;
};

const FriendsList = ({ user, friend, handleClose }: Props) => {
    return (
        <div className="friend-block mb-3">
        <div className="">
            <Link to={'/Messages/' + friend.userId._id} className='btn' onClick={handleClose}>
            <span id="friend-card" className=''><h3 style={{ fontWeight: 500, fontSize: 25 + 'px', color: 'purple', fontVariant: 'small-caps' }}>
            <img 
                src={friend.userId.photoUrl} 
                alt={friend.username} 
                style={{ 
                    textDecoration: 'none', 
                    marginLeft: 30 + 'px',
                    marginRight: 30 + 'px' 
                }} 
                className="friend-pic"
            />
            <u>{friend.username.charAt(0).toUpperCase() + friend.username.slice(1)}</u></h3>
            </span> 
        </Link>
        </div>
        </div>
    );
};

export default FriendsList;