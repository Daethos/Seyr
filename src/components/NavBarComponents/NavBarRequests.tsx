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

interface Props {
    user: any;
    requestState: any;
    acceptFriendRequest: any;
    declineFriendRequest: any;
    // handleSubmit: any;
    friendAccept: boolean;
    friendDecline: boolean;
}

const NavBarRequests = ({ user, requestState, acceptFriendRequest, declineFriendRequest, friendAccept, friendDecline }: Props) => {
    // const [friendAccept, setFriendAccept] = useState<boolean>(false)
    // const [friendDecline, setFriendDecline] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false);
    // const [friendState, setFriendState] = useState<any[]>([])
    const [requestStatus, setRequestStatus] = useState<any>(requestState)
    // const [show, setShow] = useState(false);
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    const [index, setIndex] = useState(0);

  //   useEffect(() => {
  //     friends();
  //   }, [])
  
  // async function friends() {
  //   setLoading(true);
  //   try {
  //       const response = await friendAPI.getAllFriends(user._id)
  //       setFriendState(response.data.user.friends)
  //       setLoading(false)
  //   } catch (err: any) {
  //       setLoading(false)
  //       console.log(err.message, '<- Error Fetch Friends in Friend Card')
  //   }
  // }

    useEffect(() => {
      friendStatus();
    }, [friendDecline, friendAccept])

    async function friendStatus() {
      setLoading(true);
      try {
        const response = await friendAPI.getAllRequests(user._id)
        console.log(response.data.requests, '<- Finding out REques Frenship Status!')
        setRequestStatus(response.data.requests)
        setLoading(false);
      } catch (err: any) {
        setLoading(false);
        console.log(err.message, '<- Error Finding Status')
      }
    }

    useEffect(() => {
      const interval = setInterval(() => {
  
          // friends();
          friendStatus();
      }, 60000);
      return () => clearInterval(interval);
    }, []);

    const handleSelect = (selectedIndex: React.SetStateAction<number>, e: any) => {
        setIndex(selectedIndex);
    };

  //   async function acceptFriendRequest(friend: object) {
  //     setFriendAccept(false)
  //     try {
  //       console.log(friend, '<- Did you make it over to accept as a friend?')
  //       const response = await friendAPI.friendAccept(user._id, friend)
  //       console.log(response.data, '<- Newly Forged Friend')
  //       console.log(response.you, '<- Checking you out to see your removed request')
  //       setFriendAccept(true)
  //     } catch (err: any) {
  //         console.log(err.message, '<- Error handling Friend Request')
  //     }
  //   }
  
  //   async function declineFriendRequest(friend: any) {
  //     setFriendDecline(false)
  //     console.log('Declining: ', friend.target.value,' in USER PROFILE!')
  //     try {
  //         const response = await friendAPI.friendDecline(user._id, friend.target.value)
  //         console.log(response, '<- Response in Friend Decline')
  //         setFriendDecline(true)
  //         //friendStatus();
  //     } catch (err: any) {
  //         setFriendDecline(true)
  //         console.log(err.message, '<- Error handling Friend Decline')
  //     }
  //   }

  //   function handleSubmit(e: { preventDefault: () => void; }) {
  //     e.preventDefault();
  //     console.log('Editing underway!')
  //     async function asceanVaEsai() {
  //         try {
  //             acceptFriendRequest(requestState)
  //         } catch (err: any) {
  //             console.log(err.message, '<- Error initiating Ascean Edit')
  //         }
  //     }
  //     asceanVaEsai();
  // }
  
    if (loading) {
      return (
      <>
          <Loading NavBar={true} />
      </>
      );
    }

    return (
      <>
      {
        requestStatus.length > 0
        ? 
        <Carousel activeIndex={index} onSelect={handleSelect} className="nav-carousel carousel-fade hover req-car" indicators={false}>
        {
        requestStatus.map((request: any, index: any) => {
            return (
              <Carousel.Item className="d-block w-100" id="" key={index}>
                <RequestsCarousel 
                  loggedUser={user}
                  request={request}
                  key={request._id}
                  acceptFriendRequest={acceptFriendRequest} 
                  declineFriendRequest={declineFriendRequest}
                  // handleSubmit={handleSubmit}
                />
              </Carousel.Item>
            )
        })
        }
        </Carousel>
        : ''
      }
      </>
    )
}

export default NavBarRequests