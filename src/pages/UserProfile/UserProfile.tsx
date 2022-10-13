import './UserProfile.css';
import React, { useEffect, useState } from 'react';
import Loading from '../../components/Loading/Loading';
import Container from 'react-bootstrap/Container';
import * as asceanAPI from '../../utils/asceanApi';
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

useEffect(() => {
  getAscean();
}, [])

async function getAscean() {
  try {
    const response = await asceanAPI.getAllAscean();
    console.log(response, '<- the response in Get All Ascean');
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

if (loading) {
  return (
  <>
      <Loading />
  </>
  );
}
  return (
    <Container>
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