import React, { useEffect, useState } from 'react';
import './NavBar.css'
import { Link, NavLink } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import userService from '../../utils/userService';
import * as asceanAPI from '../../utils/asceanApi';
import * as friendAPI from '../../utils/friendApi';
import SolaAscean from '../../components/SolaAscean/SolaAscean'
import FriendsCarousel from '../../components/FriendsCarousel/FriendsCarousel'
import RequestsCarousel from '../RequestsCarousel/RequestsCarousel'
import { Nav } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import Update from '../AsceanBuilder/Update';

interface NavProps {
    user: any;
    setUser: React.Dispatch<any>;
    handleLogout: () => void;
}

const NavBar = ({ user, setUser, handleLogout }: NavProps) => {

  const [asceanVaEsai, setAsceanVaEsai] = useState<any>([]);
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
    setLoading(true);
    try {
      const response = await asceanAPI.getAllAscean();
      console.log(response.data, '<- the response in Get All Ascean');
      setAsceanVaEsai([...response.data.reverse()])
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
      friends();
    }, [friendRequest])
  
  async function friends() {
    setLoading(true);
    try {
        const response = await friendAPI.getAllFriends(user._id)
        setLoading(false)
        setFriendState(response.data.user.friends)
    } catch (err: any) {
        setLoading(false)
        console.log(err.message, '<- Error Fetch Friends in Friend Card')
    }
  }

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
        <Loading />
    </>
    );
  }

  return (

      <Navbar className="" expand="md" id="navbar">
          <Container fluid>
          <Link to="/" className="nav-item">
              <img src={user?.photoUrl} alt={user?.photoUrl} id="nav-pic" />
          </Link>
          <Navbar.Toggle type="button" aria-controls="basic-navbar-nav" className="" />
          <Navbar.Collapse id="basic-navbar-nav" className="links">
          &nbsp;&nbsp;
          <NavDropdown title="Characters" className="text-info btn btn-lg btn-outline-black" id="basic-nav-dropdown">
              <Nav.Link as={NavLink} to='/Ascean' style={{ fontWeight: 400, fontVariant: 'small-caps', fontSize: 23 + 'px' }} className="text-info btn btn-lg btn-outline-black">Create Ascean</Nav.Link>
              <ul>
              <NavDropdown title="Update" className="text-info btn btn-lg btn-outline-black" id="submenu-nav-dropdown">
                {asceanVaEsai.map((ascean: any, index: number) => (<Nav.Link as={NavLink} to={'/edit/' + ascean._id} className='text-info btn btn-lg btn-outline-black mb-1'>{ascean.name}</Nav.Link>))}
              </NavDropdown>
              </ul>
          </NavDropdown>
          {/* &nbsp;&nbsp;
          <Link to="/Ascean" className="text-info btn btn-lg btn-outline-black">New Ascean</Link> */}
          &nbsp;&nbsp;
          <NavDropdown title="Feed" className="text-info btn btn-lg btn-outline-black" id="basic-nav-dropdown">
              <Nav.Link as={NavLink} to='/CommunityFeed' style={{ fontWeight: 400, fontVariant: 'small-caps', fontSize: 23 + 'px' }} className="text-info btn btn-lg community-button">Community</Nav.Link>
              {/* <Nav.Link as={NavLink} to='/Forums' style={{ fontWeight: 400, fontVariant: 'small-caps', fontSize: 23 + 'px' }} className="text-info btn btn-lg community-button">Forums</Nav.Link> */}
              <Nav.Link as={NavLink} to='/Friends' style={{ fontWeight: 400, fontVariant: 'small-caps', fontSize: 23 + 'px' }} className="text-info btn btn-lg community-button">Friends</Nav.Link>
          </NavDropdown>
          &nbsp;&nbsp;
          {
      friendState
      ? 
      <Carousel activeIndex={index} onSelect={handleSelect} className="nav-carousel carousel-fade hover" indicators={false}>
      {
      friendState.map((fren: any, index: any) => {
        return (
          <Carousel.Item className="d-block w-100">
          <FriendsCarousel user={user} key={index} fren={fren}/>
          </Carousel.Item>
        )
      })
      }
      </Carousel>

      : ''
    }
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
    <span className="logging-button">
          {   user 
          ? <Link to="" onClick={handleLogout} className="text-warning btn btn-lg btn-outline-black">Log Out</Link>
          : <Link to="/login" className="text-success btn btn-lg btn-outline-black">Log In</Link>
          }
          </span>
      </Navbar.Collapse>
          </Container>
      </Navbar>

  )
}

export default NavBar