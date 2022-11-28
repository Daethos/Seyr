import './UserProfile.css';
import React, { useEffect, useState } from 'react';
import Loading from '../../components/Loading/Loading';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image'
import * as asceanAPI from '../../utils/asceanApi';
import SolaAscean from '../../components/SolaAscean/SolaAscean'
import SearchCard from '../../components/SearchCard/SearchCard'

interface UserProps {
    loggedUser: any;
}

const UserProfile = ({ loggedUser }: UserProps) => {

  const [asceanVaEsai, setAsceanVaEsai] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

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

  if (loading) {
    return (
    <>
        <Loading />
    </>
    );
  }

  return (

    <Container>
      {/* <Image src={loggedUser.photoUrl} alt={loggedUser.username} roundedCircle style={{ width: 100 + 'px', height: 100 + 'px' }} /> */}
      <SearchCard ascean={asceanVaEsai} loggedUser={loggedUser} key={loggedUser._id} userProfile={true} />
        {
          asceanVaEsai.length > 0
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
          : 
          <p className='' style={{ textAlign: 'center', color: '#fdf6d8' }}>
            No Characters? No worries ^_^ <br />
            Here's a Quick Overview of the NavBar to Catch You Up<br />
            
            Castle: Home<br />
            Knight: New Character<br />
            Quill: Edit Character<br />
            Practice Target: Computer Arena<br />
            Scroll: Home<br />
            Chat Bubbles: Direct Messages<br />
            Double-Axes: PvP Arena<br />
          </p>
        }
    </Container>
  )
}

export default UserProfile