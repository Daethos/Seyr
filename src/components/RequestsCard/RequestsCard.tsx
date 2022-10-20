import React, { useState } from 'react';
import Loading from '../Loading/Loading'
import RequestPopover from '../RequestPopover/RequestPopover';

interface Props {
    loggedUser: any;
    acceptFriendRequest: (friend: object) => Promise<void>;
    declineFriendRequest: (friend: any) => Promise<void>;
    requestState: object[];
}

const RequestsCard = ({ loggedUser, acceptFriendRequest, declineFriendRequest, requestState }: Props) => {
    const [loading, setLoading] = useState<boolean>(false)

    if (loading) {
        return (
            <Loading />
        );
    }

    return (
        <div className='text-white'>
            {
                requestState
                ? 
                requestState.map((friend: any) => {
                    console.log(friend, '<- The friend request')
                    return (
                       <>
                        <RequestPopover 
                            friend={friend} 
                            loggedUser={loggedUser} 
                            acceptFriendRequest={acceptFriendRequest} 
                            declineFriendRequest={declineFriendRequest}
                            key={friend.userId} 
                        />
                       </>
                    )
                })
                : ''
            }
        </div>
    )
}

export default RequestsCard