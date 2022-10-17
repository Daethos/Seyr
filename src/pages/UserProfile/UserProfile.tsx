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
  const [friendNames, setFriendNames] = useState<any>([])
  const [friendStatusMutual, setFriendStatusMutual] = useState<any>([])
  const [friendStatusRequest, setFriendStatusRequest] = useState<any>([])

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
        setLoading(false)
        setFriendState(response.data.friends)
    } catch (err: any) {
        setLoading(false)
        console.log(err.message, '<- Error Fetch Friends in Friend Card')
    }
  }

  async function acceptFriendRequest(friend: any) {
    try {
      console.log(friend, '<- Did you make it over to accept as a friend?')
      const response = await friendAPI.friendAccept(loggedUser._id, friend)
      console.log(response.data, '<- Response in Friend Request')
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
        console.log(response, '<- Response in Friend Decline')
        setFriendDecline(true)
        friends();
    } catch (err: any) {
        setFriendDecline(true)
        console.log(err.message, '<- Error handling Friend Decline')
    }
  }

  async function fetchFriendNames() {
    
    let frens: any = [];
    friendState.find((userId: any) => { 
      console.log(userId.username, '<- Fren Reques??')
      frens.push(userId.username)
    })
    return (
      frens
    )
  }

  useEffect(() => {
    friendStatus();
  }, [])

  async function friendStatus() {
    setLoading(true);
    try {
      const responseArray = await Promise.all(friendNames?.map(async (name: string) => friendAPI.friendStatus(name)))
      console.log(responseArray, '<- Finding out Frenship Status!')
      responseArray.map(async (response) => {
        console.log(response, '<- If you are their Fren, you are here!')
        //await Promise.all(
          friendNames?.map(async (name: any, index: any) => {
          console.log(name, '<- Which name is getting checked?', index, '<- And the Index')

            console.log(response.user?.username, '<- Who are you?!')

          if (response?.data?.username === loggedUser?.username) {
            setFriendStatusMutual([...friendStatusMutual, response.user?.username])
            console.log(friendStatusMutual, '<- Who are the mutuals? In Internal Log')
          } 

          if (!response.data) {
            setFriendStatusRequest([...friendStatusRequest, response.user?.username])
            console.log(friendStatusRequest, '<- Who are the requests? In Internal Log')
          }

         })

        console.log(friendStatusMutual, '<- Who are the mutuals? In External Log')
        console.log(friendStatusRequest, '<- Who are the requests? In External Log')
      })
      // setLoading(false);
    } catch (err: any) {
      setLoading(false);
      console.log(err.message, '<- Error Finding Status')
    }
  }

  useEffect(() => {
    findYourRequests();
  }, [])

 

  async function findYourRequests() {
    setLoading(true);
    try {
      const response = await fetchFriendNames()
      console.log(response, '<- Fetching Friend Requests');
      setFriendNames(response)
      console.log(friendNames, '<- Names of Potential Friends')
      // const yourSelf = await friendStatus()
      // console.log(yourSelf, '<- You there, buddy?')
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      console.log(err.message, '<- Error Finding Requests')
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
        ? <FriendsCard loggedUser={loggedUser} acceptFriendRequest={acceptFriendRequest} declineFriendRequest={declineFriendRequest} />
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