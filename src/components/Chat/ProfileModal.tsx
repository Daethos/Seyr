import { Link } from 'react-router-dom';

interface Props {
  user: any;
}

const ProfileModal = ({ user }: Props) => {

  return (
    <>
    <Link to={`/${user.username}`}>
    <img src={user.photoUrl} alt={user.username} style={{ marginLeft: 5 + '%', float: 'left', width: 75 + 'px', height: 75 + 'px', borderRadius: 50 + '%' }} />
    </Link>
    {' '}
    <p style={{ color: '#fdf6d8', fontSize: 40 + 'px', marginTop: 0 + '%' }}>
    {user.username.charAt(0).toUpperCase() + user.username.slice(1)}
    </p>
    
    </>
  )
}

export default ProfileModal