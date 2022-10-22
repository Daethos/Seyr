import './FriendFeed.css'
import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Loading from '../../components/Loading/Loading'; 
import * as friendAPI from '../../utils/friendApi';
import * as communityAPI from '../../utils/communityApi'
import * as feelingAPI from '../../utils/feelingApi'
import CommunityAscean from '../../components/CommunityAscean/CommunityAscean'
import CommunitySearch from '../../components/CommunitySearch/CommunitySearch'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

interface FriendProps {
  loggedUser: any;
}

const FriendFeed = ({ loggedUser }: FriendProps) => {
  const [asceans, setAsceans] = useState<any>([])
  const [completeFriend, setCompleteFriend] = useState<any>([])
  const [friendState, setFriendState] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    friends();
  }, [])

  async function friends() {
    setLoading(true);
    try {
        const response = await friendAPI.getAllFriends(loggedUser._id)
        
        setFriendState(response.data.user.friends)
        //console.log(response.data, '<- Data in Friend Feed!')
        setAsceans(response.data.asceans)
        setCompleteFriend(response.data)
        setLoading(false)
    } catch (err: any) {
        setLoading(false)
        console.log(err.message, '<- Error Fetch Friends in Friend Card')
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
    <Container fluid>
      <Row className="justify-content-center my-5">
        {
          asceans.map((ascean: any, index: any) => {
            return (
              ascean.map((a: any, index: any) => 
              (
                <CommunityAscean
                    ascean={a}
                    key={a._id}
                    loggedUser={loggedUser}
                />
              )
            )
            )
            
          })
        }
      </Row>
    </Container>
  )
}

export default FriendFeed