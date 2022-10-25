import React, { useEffect, useState } from 'react';
import { Nav } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Loading from '../../components/Loading/Loading';
import * as friendAPI from '../../utils/friendApi';
import RequestsCarousel from '../../components/RequestsCarousel/RequestsCarousel'
import Carousel from 'react-bootstrap/Carousel';
import FriendsList from '../FriendsList/FriendsList';
import NavBarFriends from './NavBarFriends';
import NavBarRequests from './NavBarRequests';
import NavBarMessages from './NavBarMessages';

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
    // const [show, setShow] = useState(false);
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    const [index, setIndex] = useState(0);


    useEffect(() => {
        friends();
      }, [])
    
    async function friends() {
      //setLoading(true);
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
          console.log(response.data.requests, '<- Finding out REques Frenship Status!')
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
          console.log(friend, '<- Did you make it over to accept as a friend?')
          const response = await friendAPI.friendAccept(user._id, friend)
          console.log(response.data, '<- Newly Forged Friend')
          console.log(response.you, '<- Checking you out to see your removed request')
          setFriendAccept(true)
          setRelayStatus(true)
        //   setFriendState()
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
            //friendStatus();
        } catch (err: any) {
            setFriendDecline(true)
            console.log(err.message, '<- Error handling Friend Decline')
        }
      }
  
      function handleSubmit(e: { preventDefault: () => void; }) {
        e.preventDefault();
        console.log('Editing underway!')
        async function asceanVaEsai() {
            try {
                acceptFriendRequest(requestState)
            } catch (err: any) {
                console.log(err.message, '<- Error initiating Ascean Edit')
            }
        }
        asceanVaEsai();
    }

    return (
        <>
        <NavBarFriends user={user} friendAccept={friendAccept} setFriendAccept={setFriendAccept} friendState={friendState} />
        <NavBarRequests user={user} requestState={requestState} friendDecline={friendDecline} friendAccept={friendAccept} acceptFriendRequest={acceptFriendRequest} declineFriendRequest={declineFriendRequest} handleSubmit={handleSubmit} />
        </>
    )
}

export default NavBarStatus