import React, { useEffect, useState } from 'react';
import './NavBar.css'
import { Link, NavLink } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import userService from '../../utils/userService';
import * as friendAPI from '../../utils/friendApi';
import FriendsCarousel from '../../components/FriendsCarousel/FriendsCarousel'
import RequestsCard from '../../components/RequestsCard/RequestsCard'
import { Nav } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';

interface NavProps {
    user: any;
    setUser: React.Dispatch<any>;
    handleLogout: () => void;
}

const NavBar = ({ user, setUser, handleLogout }: NavProps) => {

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
            <Link to="/Ascean" className="text-info btn btn-lg btn-outline-black">New Ascean</Link>
            &nbsp;&nbsp;
            <NavDropdown title="Community" className="text-info btn btn-lg btn-outline-black" id="basic-nav-dropdown">
                <Nav.Link as={NavLink} to='/CommunityFeed' className="text-info btn btn-lg community-button">Feed</Nav.Link>
                <Nav.Link as={NavLink} to='/Forums' className="text-info btn btn-lg community-button">Forums</Nav.Link>
                <Nav.Link as={NavLink} to='/Friends' className="text-info btn btn-lg community-button">Friends</Nav.Link>
            </NavDropdown>
            &nbsp;&nbsp;
            <NavDropdown title="Equipment" className="text-info btn btn-lg btn-outline-black" id="basic-nav-dropdown">
                <Nav.Link as={NavLink} to='/Weapons' className="text-info btn btn-lg equipment-button">Weapons & Spells</Nav.Link>
                <Nav.Link as={NavLink} to='/Shields' className="text-info btn btn-lg equipment-button">Shields & Walls</Nav.Link>
                <Nav.Link as={NavLink} to='/Helmets' className="text-info btn btn-lg equipment-button">Helmets & Hoods</Nav.Link>
                <Nav.Link as={NavLink} to='/Chests' className="text-info btn btn-lg equipment-button">Cuirasses & Robes</Nav.Link>
                <Nav.Link as={NavLink} to='/Legs' className="text-info btn btn-lg equipment-button">Greaves & Pants</Nav.Link>
                <Nav.Link as={NavLink} to='/Rings' className="text-info btn btn-lg equipment-button">Rings</Nav.Link>
                <Nav.Link as={NavLink} to='/Trinkets' className="text-info btn btn-lg equipment-button">Trinkets</Nav.Link>
            </NavDropdown>
            <span className="logging-button">
            {   user 
            ? <Link to="" onClick={handleLogout} className="text-warning btn btn-lg btn-outline-black">Log Out</Link>
            : <Link to="/login" className="text-success btn btn-lg btn-outline-black">Log In</Link>
            }
            </span>
            {
        friendState
        ? 
        <Carousel activeIndex={index} onSelect={handleSelect} className="nav-carousel carousel-fade hover" indicators={false}>
        {
        friendState.map((fren: any) => {
          return (
            <Carousel.Item>
            <FriendsCarousel user={user} key={user._id} fren={fren}/>
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
        <RequestsCard 
          loggedUser={user}
          requestState={requestState}
          acceptFriendRequest={acceptFriendRequest} 
          declineFriendRequest={declineFriendRequest}

        />
        : <h5 className='text-info'> No New Friend Requests</h5>
      }
        </Navbar.Collapse>
            </Container>
        </Navbar>

    )
}

export default NavBar