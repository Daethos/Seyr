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
}

const FriendsCard = ({ loggedUser, acceptFriendRequest, declineFriendRequest }: Props) => {
    const [friendState, setFriendState] = useState<any>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        friends();
    }, [])

    async function friends() {
        setLoading(true);
        try {
            const response = await friendAPI.getAllFriends(loggedUser._id)
            console.log(loggedUser, '<- The logged user getting his friends')
            console.log(response.data.friends, '<- Response in Getting All Friends')
            setLoading(false)
            setFriendState(response.data.friends)
        } catch (err: any) {
            setLoading(false)
            console.log(err.message, '<- Error Fetch Friends in Friend Card')
        }
    }

    

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
                ? friendState.map((friend: any) => {
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