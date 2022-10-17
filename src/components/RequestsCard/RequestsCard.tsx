import React, { useEffect, useState } from 'react';
import * as friendAPI from '../../utils/friendApi'
import Loading from '../Loading/Loading'
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import RequestPopover from '../RequestPopover/RequestPopover';

interface Props {
    loggedUser: any;
    acceptFriendRequest: any;
    declineFriendRequest: any;
    requestState: any;
}

const RequestsCard = ({ loggedUser, acceptFriendRequest, declineFriendRequest, requestState }: Props) => {
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