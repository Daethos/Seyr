import './UserProfile.css';
import React, { useEffect, useState } from 'react';
import Loading from '../../components/Loading/Loading';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Carousel from 'react-bootstrap/Carousel';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import * as asceanAPI from '../../utils/asceanApi';
import SolaAscean from '../../components/SolaAscean/SolaAscean'

interface UserProps {
    loggedUser: any;
    setUser: React.Dispatch<any>;
    handleSignUpOrLogin: () => any;
    handleLogout: () => void;
}

const UserProfile = ({ loggedUser, setUser, handleSignUpOrLogin, handleLogout }: UserProps) => {
const [asceanVaEsai, setAsceanVaEsai] = useState<any[]>([]);
const [loading, setLoading] = useState<boolean>(false);
const [userProfile, setUserProfile] = useState<boolean>(true);

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

if (loading) {
  return (
  <>
      <Loading />
  </>
  );
}
  return (
    <Container>
        {
          asceanVaEsai
          ? asceanVaEsai.map((ascean) => {
            return (
              <SolaAscean
                ascean={ascean}
                key={ascean._id}
                userProfile={userProfile}
              />
            )
          })
          : 'No Characters? No worries! Just hit the Ascean tab to create a new character ^_^'
        }
    </Container>
  )
}

export default UserProfile