import FriendPopover from '../FriendPopover/FriendPopover';

interface Props {
    friendState: any;
};

const FriendsCard = ({ friendState }: Props) => {

    return (
        <div className='text-white'>
        { friendState ? 
            friendState.map((friend: any) => {
                return (
                    <FriendPopover friend={friend} key={friend.userId} />
            )})
        : '' }
        </div>
    );
};

export default FriendsCard;