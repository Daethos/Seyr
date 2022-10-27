
interface Props {
    friend: any;
    message: any;
}

const FriendMessageCard = ({ friend, message }: Props) => {
  return (
    <>
    {
        message.username === friend.username
        ? <><span className="friend-message" style={{color: 'red'}}>[{message.createdAt.substring(11, 16)}] {message.message}
        
        </span></>
        : ''
    }
    </>
  )
}

export default FriendMessageCard