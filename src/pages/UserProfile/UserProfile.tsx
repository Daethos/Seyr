import './UserProfile.css';
import React, { useEffect, useState } from 'react';
import Loading from '../../components/Loading/Loading';
import Container from 'react-bootstrap/Container';
import * as asceanAPI from '../../utils/asceanApi';
import * as friendAPI from '../../utils/friendApi';
import FriendsCard from '../../components/FriendsCard/FriendsCard';
import SolaAscean from '../../components/SolaAscean/SolaAscean'
import SearchCard from '../../components/SearchCard/SearchCard'

interface UserProps {
    loggedUser: any;
    setUser: React.Dispatch<any>;
    handleSignUpOrLogin: () => any;
    handleLogout: () => void;
}

const UserProfile = ({ loggedUser, setUser, handleSignUpOrLogin, handleLogout }: UserProps) => {

const [asceanVaEsai, setAsceanVaEsai] = useState<any>([]);
const [loading, setLoading] = useState<boolean>(false);
const [friendRequest, setFriendRequest] = useState<boolean>(false)
const [friendDecline, setFriendDecline] = useState<boolean>(false)
const [friendState, setFriendState] = useState<any>([])

useEffect(() => {
  getAscean();
}, [])

async function getAscean() {
  try {
    const response = await asceanAPI.getAllAscean();
    console.log(response.data, '<- the response in Get All Ascean');
    setAsceanVaEsai([...response.data])
  } catch (err) {
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


async function sendFriendRequest(friend: any) {
  try {
      const response = await friendAPI.friendAccept(loggedUser._id, friend)
      console.log(response, '<- Response in Friend Request')
      setFriendRequest(true)
  } catch (err: any) {
      setFriendRequest(true)
      console.log(err.message, '<- Error handling Friend Request')
  }
}

async function declineFriendRequest(friend: any) {
  console.log('Declining: ', friend.target.value,' in USER PROFILE!')
  try {
      const response = await friendAPI.friendDecline(loggedUser._id, friend.target.value)
      console.log(response, '<- Response in Friend Request')
      setFriendDecline(true)
      friends();
  } catch (err: any) {
      setFriendDecline(true)
      console.log(err.message, '<- Error handling Friend Request')
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
      <h3 className='text-white'>New Friend Requests!</h3>
      {
        loggedUser?.friends 
        ? <FriendsCard loggedUser={loggedUser} sendFriendRequest={sendFriendRequest} declineFriendRequest={declineFriendRequest} />
        : ''
      }
      <SearchCard ascean={asceanVaEsai} communityFeed={false} key={asceanVaEsai._id} />
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