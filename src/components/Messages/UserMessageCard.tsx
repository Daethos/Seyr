import formatDistanceToNow from 'date-fns/formatDistanceToNow'

interface Props {
    user: any;
    message: any;
}

const UserMessageCard = ({ user, message }: Props) => {
  return (
    <>
    { message.username === user.username ? 
      <span className="user-message" style={{color: 'blue'}}>
        [{formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}]
        {' '} 
        {message.message}
      </span>
    : '' }
    </>
  )
}

export default UserMessageCard