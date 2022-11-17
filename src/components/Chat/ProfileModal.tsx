import { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';

interface Props {
  user: any;
}

const ProfileModal = ({ user }: Props) => {

  const [loading, setLoading] = useState<boolean>(false)

  return (
    <>
    <Link to={`/${user.username}`}>
    <img src={user.photoUrl} alt={user.username} style={{ marginLeft: 5 + '%', float: 'left', width: 75 + 'px', height: 75 + 'px', borderRadius: 50 + '%' }} />
    </Link>
    <p style={{ color: '#fdf6d8' }}>
    {user.username}<br />
    {user.email}
    </p>
    
    </>
  )
}

export default ProfileModal