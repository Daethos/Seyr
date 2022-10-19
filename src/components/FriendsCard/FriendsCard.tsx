import React, { useEffect, useState } from 'react';
import * as friendAPI from '../../utils/friendApi'
import Loading from '../Loading/Loading'
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import FriendPopover from '../FriendPopover/FriendPopover';

interface Props {
    loggedUser: any;
    acceptFriendRequest: any;
    declineFriendRequest: any;
    friendState: any;
}

const FriendsCard = ({ loggedUser, acceptFriendRequest, declineFriendRequest, friendState }: Props) => {
    const [requestState, setRequestState] = useState<any>(loggedUser.requests)
    const [friendAscean, setFriendAscean] = useState<any>([])
    const [loading, setLoading] = useState<boolean>(false)

    if (loading) {
        return (
        <>
            <Loading />
        </>
        );
      }

    return (
        <div className='text-white'>
            {
                friendState
                ? 
                    friendState.map((friend: any) => {

                        return (
                        <>
                            <FriendPopover 
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

export default FriendsCard