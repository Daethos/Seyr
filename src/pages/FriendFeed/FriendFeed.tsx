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
  const [ascean, setAsceans] = useState<any>([])
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

  const [searchText, setSearchText] = useState<string>('');
    const [allAscean, setAllAscean] = useState<any>(ascean);

    async function filterAscean(results: any) {
        console.log(results, '<- Results in filtering the Ascean')
        console.log(results.length, '<- The amount of search results!')
        let finalResults = [];
            for (let i = 0; i < results.length; i++){
                if (finalResults.length < ascean.length) {
                        finalResults.push(results[i])
                }        
        }
        setAllAscean(finalResults)
    }

    function displayResults() {
        let views = [];
        for (let i = 0; i < allAscean.length; i++) {
            views.push(
                <CommunityAscean ascean={allAscean[i]} key={allAscean[i]._id} />
            )
        }
        return (views)
    }

    function handleChange(e: any) {
        e.preventDefault()
        setSearchText(e.target.value);
    }

    useEffect(() => {
        setAllAscean([]);
        if (searchText === '') {
            setAllAscean([]);
            return
        }
        const filteredResults = ascean.filter((a: any) => a['index'].includes(searchText))        
        filterAscean(filteredResults)
        console.log(searchText, '<- the changing search text')
    }, [searchText, ascean])

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
        <Col md={{span: 8, offset: 2}} className="my-5">
            <InputGroup className="bg-black">
            <InputGroup.Text className="bg-black">
            <img 
                src={loggedUser.photoUrl} 
                alt="User" 
                style={{maxWidth: 5 + 'vw', maxHeight: 5 + 'vh'}}
            />
            </InputGroup.Text>
            <Form.Control 
                className="headerSearchInput bg-black text-white" 
                placeholder="Names Are Case Sensitive, Beware!" 
                type="text" value={searchText} 
                onChange={handleChange}
            />
            </InputGroup>
            </Col>
            {
                ascean.length > 0
                ? <>{displayResults()}</>
                : ''
            }
        </Row>
      <Row className="justify-content-center my-5">
        {
          ascean.map((asc: any, index: any) => {
            return (
              asc.map((a: any, index: any) => 
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