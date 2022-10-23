import React, { useEffect, useState } from 'react';
import Loading from '../../components/Loading/Loading';
import * as friendAPI from '../../utils/friendApi';
import RequestsCarousel from '../../components/RequestsCarousel/RequestsCarousel'
import Carousel from 'react-bootstrap/Carousel';

interface Props {
    user: any;
}

const NavBarRequests = ({ user }: Props) => {
    const [requestState, setRequestState] = useState<object[]>([])
    const [friendRequest, setFriendRequest] = useState<boolean>(false)
    const [friendDecline, setFriendDecline] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false);
    const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: React.SetStateAction<number>, e: any) => {
      setIndex(selectedIndex);
  };

  async function acceptFriendRequest(friend: object) {
    setFriendRequest(false)
    try {
      console.log(friend, '<- Did you make it over to accept as a friend?')
      const response = await friendAPI.friendAccept(user._id, friend)
      console.log(response.data, '<- Newly Forged Friend')
      console.log(response.you, '<- Checking you out to see your removed request')
      setFriendRequest(true)
    } catch (err: any) {
        setFriendRequest(true)
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
        friendStatus();
    } catch (err: any) {
        setFriendDecline(true)
        console.log(err.message, '<- Error handling Friend Decline')
    }
  }

  useEffect(() => {
    friendStatus();
  }, [friendDecline, friendRequest])

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
      requestState.length > 0
      ? 
      <Carousel activeIndex={index} onSelect={handleSelect} className="nav-carousel carousel-fade hover" indicators={false}>
      {
      requestState.map((request: any, index: any) => {
          return (
            <Carousel.Item className="d-block w-100">
              <RequestsCarousel 
                loggedUser={user}
                request={request}
                key={index}
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