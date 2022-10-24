import './UserProfile.css';
import React, { useEffect, useState } from 'react';
import Loading from '../../components/Loading/Loading';
import Container from 'react-bootstrap/Container';
import Carousel from 'react-bootstrap/Carousel';
import * as asceanAPI from '../../utils/asceanApi';
import * as friendAPI from '../../utils/friendApi';
import FriendsCard from '../../components/FriendsCard/FriendsCard';
import RequestsCard from '../../components/RequestsCarousel/RequestsCarousel'
import SolaAscean from '../../components/SolaAscean/SolaAscean'
import SearchCard from '../../components/SearchCard/SearchCard'
import FriendsCarousel from '../../components/FriendsCarousel/FriendsCarousel'

interface UserProps {
    loggedUser: any;
}

const UserProfile = ({ loggedUser }: UserProps) => {

  const [asceanVaEsai, setAsceanVaEsai] = useState<any>([]);
  const [asceanFren, setAsceanFren] = useState<any>([])
  const [completeFriend, setCompleteFriend] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(false);
  const [friendRequest, setFriendRequest] = useState<boolean>(false)
  const [friendDecline, setFriendDecline] = useState<boolean>(false)
  const [friendState, setFriendState] = useState<any[]>([])
  const [requestState, setRequestState] = useState<object[]>([])
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: React.SetStateAction<number>, e: any) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    getAscean();
  }, [])

  async function getAscean() {
    setLoading(true)
    try {
      const response = await asceanAPI.getAllAscean();
      console.log(response.data, '<- the response in Get All Ascean');
      setAsceanVaEsai([...response.data.reverse()])
      setLoading(false)
    } catch (err) {
      setLoading(false)
      console.log(err);
    }
  }

  async function deleteAscean(ascean: any) {
    ascean.preventDefault();
    console.log(ascean.target.value, '<- What are you in here?')
    asceanAPI.deleteAscean(ascean.target.value)
    getAscean();
  }

  useEffect(() => {
    friends();
  }, [friendRequest])

  async function friends() {
    setLoading(true);
    try {
        const response = await friendAPI.getAllFriends(loggedUser._id)
        setFriendState(response.data.user.friends)
        //console.log(response.data, '<- All Your Frens!')
        setAsceanFren(response.data.asceans)
        setCompleteFriend(response.data)
        //setLoading(false)
    } catch (err: any) {
        setLoading(false)
        console.log(err.message, '<- Error Fetch Friends in Friend Card')
    }
  }


  async function acceptFriendRequest(friend: object) {
    setFriendRequest(false)
    try {
      console.log(friend, '<- Did you make it over to accept as a friend?')
      const response = await friendAPI.friendAccept(loggedUser._id, friend)
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
        const response = await friendAPI.friendDecline(loggedUser._id, friend.target.value)
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
      const response = await friendAPI.getAllRequests(loggedUser._id)
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
        <Loading />
    </>
    );
  }

  return (

    <Container>
      <SearchCard ascean={asceanVaEsai} loggedUser={loggedUser} key={loggedUser._id}  />
        {
          asceanVaEsai
          ? asceanVaEsai.map((ascean: { _id: React.Key | null | undefined; }) => {
            return (
              <SolaAscean
                ascean={ascean}
                key={ascean._id}
                userProfile={true}
                deleteAscean={deleteAscean}
              />
            )
          })
          : 'No Characters? No worries! Just hit the Ascean tab to create a new character ^_^'
        }
    </Container>
  )
}

export default UserProfile