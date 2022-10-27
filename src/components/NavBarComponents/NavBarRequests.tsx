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
    const [loading, setLoading] = useState<boolean>(false);
    const [requestStatus, setRequestStatus] = useState<any>(requestState)
    const [index, setIndex] = useState(0);

    useEffect(() => {
      friendStatus();
    }, [friendDecline, friendAccept])

    async function friendStatus() {
      setLoading(true);
      try {
        const response = await friendAPI.getAllRequests(user._id)
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