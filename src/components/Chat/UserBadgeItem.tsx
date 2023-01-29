import Button from 'react-bootstrap/Button'

interface Props {
    user: any;
    handleFunction: any;
}

const UserBadgeItem = ({ user, handleFunction }: Props) => {
  return (
    <Button variant='outline-info' className='m-1' onClick={handleFunction}>{user.username.charAt(0).toUpperCase() + user.username.slice(1)} <b>X</b></Button>
  )
}

export default UserBadgeItem