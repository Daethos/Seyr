import formatDistanceToNow from 'date-fns/formatDistanceToNow';

interface Props {
    friend: any;
    message: any;
};

const FriendMessageCard = ({ friend, message }: Props) => {
  return (
    <>
    { message.username === friend.username ? 
      <>
      <span 
        className="friend-message" 
        style={{color: 'red'}}>[{formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}] 
        {' '}
        {message.message}
      </span>
      </>
    : '' }
    </>
  );
};

export default FriendMessageCard;