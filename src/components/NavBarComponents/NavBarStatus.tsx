import React, { useEffect, useState } from 'react';
import * as friendAPI from '../../utils/friendApi';
import NavBarFriends from './NavBarFriends';
import NavBarRequests from './NavBarRequests';

interface Props {
    user: any;
    relayStatus: boolean;
    setRelayStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavBarStatus = ({ user, setRelayStatus }: Props) => {
    const [friendAccept, setFriendAccept] = useState<boolean>(false)
    const [friendDecline, setFriendDecline] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false);
    const [friendState, setFriendState] = useState<any[]>([])
    const [requestState, setRequestState] = useState<object[]>([])


    useEffect(() => {
        friends();
      }, [])
    
    async function friends() {
      try {
          const response = await friendAPI.getAllFriends(user._id)
          setFriendState(response.data.user.friends)
          setLoading(false)
      } catch (err: any) {
          setLoading(false)
          console.log(err.message, '<- Error Fetch Friends in Friend Card')
      }
    }

    useEffect(() => {
        friendStatus();
      }, [])
  
      async function friendStatus() {
        setLoading(true);
        try {
          const response = await friendAPI.getAllRequests(user._id)
          setRequestState(response.data.requests)
          setLoading(false);
        } catch (err: any) {
          setLoading(false);
          console.log(err.message, '<- Error Finding Status')
        }
      }

      async function acceptFriendRequest(friend: object) {
        setFriendAccept(false)
        try {
          console.log(friend, '<- Did you make it over to accept as a friend in acceptFriendRequest?')
          const response = await friendAPI.friendAccept(user._id, friend)
          console.log(response.data, '<- Newly Forged Friend')
          console.log(response.you, '<- Checking you out to see your removed request')
          setFriendAccept(true)
          setRelayStatus(true)
        } catch (err: any) {
            console.log(err.message, '<- Error handling Friend Request')
        }
      }
    
      async function declineFriendRequest(friend: any) {
        setFriendDecline(false)
        console.log('Declining: ', friend.target.value,' in USER PROFILE!')
        try {
            const response = await friendAPI.friendDecline(user._id, friend.target.value)
            console.log(response, '<- Response in Friend Decline')
            setFriendDecline(true)
        } catch (err: any) {
            setFriendDecline(true)
            console.log(err.message, '<- Error handling Friend Decline')
        }
      }

    return (
        <>
        <NavBarFriends user={user} friendAccept={friendAccept} setFriendAccept={setFriendAccept} friendState={friendState} />
        <NavBarRequests user={user} requestState={requestState} friendDecline={friendDecline} friendAccept={friendAccept} acceptFriendRequest={acceptFriendRequest} declineFriendRequest={declineFriendRequest} />
        </>
    )
}

export default NavBarStatus