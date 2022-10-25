import React, { useEffect, useState } from 'react';
import './NavBar.css'
import { Link, NavLink } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Accordion from 'react-bootstrap/Accordion';
import userService from '../../utils/userService';
import * as asceanAPI from '../../utils/asceanApi';
import * as friendAPI from '../../utils/friendApi';
import SolaAscean from '../../components/SolaAscean/SolaAscean'
import FriendsCarousel from '../../components/FriendsCarousel/FriendsCarousel'
import RequestsCarousel from '../RequestsCarousel/RequestsCarousel'
import { Nav } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import Update from '../AsceanBuilder/Update';
import NavBarFriends from '../NavBarComponents/NavBarFriends';
import NavBarRequests from '../NavBarComponents/NavBarRequests';
import FriendsList from '../../components/FriendsList/FriendsList';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import NavBarStatus from '../NavBarComponents/NavBarStatus';
import NavBarMessages from '../NavBarComponents/NavBarMessages';

interface NavProps {
    user: any;
    setUser: React.Dispatch<any>;
    handleLogout: () => void;
}

const NavBar = ({ user, setUser, handleLogout }: NavProps) => {

  const [asceanVaEsai, setAsceanVaEsai] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [relayStatus, setRelayStatus] = useState<boolean>(false)
  // const [friendAccept, setFriendAccept] = useState<boolean>(false)
  // const [friendDecline, setFriendDecline] = useState<boolean>(false)
  // const [friendState, setFriendState] = useState<any[]>([])
  
  const [requestStatus, setRequestStatus] = useState<boolean>(false)

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect(() => {
    getAscean();
  }, [])

  async function getAscean() {
    setLoading(true);
    try {
      const response = await asceanAPI.getAllAscean();
      console.log(response.data, '<- the response in Get All Ascean');
      setAsceanVaEsai([...response.data.reverse()])
      setLoading(false)
    } catch (err) {
      console.log(err);
    }
  }

  // useEffect(() => {
  //     friends();
  //   }, [])
  
  // async function friends() {
  //   setLoading(true);
  //   try {
  //       const response = await friendAPI.getAllFriends(user._id)
  //       setFriendState(response.data.user.friends)
  //       setLoading(false)
  //   } catch (err: any) {
  //       setLoading(false)
  //       console.log(err.message, '<- Error Fetch Friends in Friend Card')
  //   }
  // }

  // useEffect(() => {
  //   friendStatus();
  // }, [friendDecline, friendAccept])

  // async function friendStatus() {
  //   setLoading(true);
  //   try {
  //     const response = await friendAPI.getAllRequests(user._id)
  //     console.log(response.data.requests, '<- Finding out REques Frenship Status!')
  //     setRequestState(response.data.requests)
  //     setLoading(false);
  //   } catch (err: any) {
  //     setLoading(false);
  //     console.log(err.message, '<- Error Finding Status')
  //   }
  // }

  useEffect(() => {
    const interval = setInterval(() => {

        // friends();
        // friendStatus();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // async function acceptFriendRequest(friend: object) {
  //   setFriendAccept(false)
  //   try {
  //     console.log(friend, '<- Did you make it over to accept as a friend?')
  //     const response = await friendAPI.friendAccept(user._id, friend)
  //     console.log(response.data, '<- Newly Forged Friend')
  //     console.log(response.you, '<- Checking you out to see your removed request')
  //     setFriendAccept(true)
  //   } catch (err: any) {
  //       console.log(err.message, '<- Error handling Friend Request')
  //   }
  // }

  // async function declineFriendRequest(friend: any) {
  //   setFriendDecline(false)
  //   console.log('Declining: ', friend.target.value,' in USER PROFILE!')
  //   try {
  //       const response = await friendAPI.friendDecline(user._id, friend.target.value)
  //       console.log(response, '<- Response in Friend Decline')
  //       setFriendDecline(true)
  //       //friendStatus();
  //   } catch (err: any) {
  //       setFriendDecline(true)
  //       console.log(err.message, '<- Error handling Friend Decline')
  //   }
  // }

//   function handleSubmit(e: { preventDefault: () => void; }) {
//     e.preventDefault();
//     console.log('Editing underway!')
//     async function asceanVaEsai() {
//         try {
//             acceptFriendRequest(requestState)
//         } catch (err: any) {
//             console.log(err.message, '<- Error initiating Ascean Edit')
//         }
//     }
//     asceanVaEsai();
// }

  if (loading) {
    return (
    <>
        <Loading NavBar={true} />
    </>
    );
  }

  return (

      <Navbar className="" expand="xxl" id="navbar">
          <Container fluid>
          <Link to="/" className="nav-item">
              <img src={user?.photoUrl} alt={user?.photoUrl} id="nav-pic" />
          </Link>
          <Navbar.Toggle type="button" aria-controls="basic-navbar-nav" className="" />
          <Navbar.Collapse id="basic-navbar-nav" className="links">
              <Nav.Link as={NavLink} to='/Ascean' 
              className="text-info btn btn-lg btn-outline-black link-header">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-file-earmark-person-fill" viewBox="0 0 16 16">
                <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm2 5.755V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-.245S4 12 8 12s5 1.755 5 1.755z"/>
              </svg>
              </Nav.Link>
              <NavDropdown title={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-file-earmark-person" viewBox="0 0 16 16">
                <path d="M11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2v9.255S12 12 8 12s-5 1.755-5 1.755V2a1 1 0 0 1 1-1h5.5v2z"/>
              </svg>} className="text-info btn btn-lg btn-outline-black link-header" id="submenu-nav-dropdown" >
                {asceanVaEsai.map((ascean: any, index: number) => 
                  (<Nav.Link as={NavLink} to={'/edit/' + ascean._id} key={index} 
                    className='text-info btn btn-lg btn-outline-black mb-1'
                    
                  >
                    {ascean.name}
                  </Nav.Link>))}
              </NavDropdown>

              <Nav.Link as={NavLink} to='/CommunityFeed'
                className="text-info btn btn-lg btn-outline-black link-header">
                  {/* Community  */}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-collection" viewBox="0 0 16 16">
                  <path d="M2.5 3.5a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-11zm2-2a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6v7zm1.5.5A.5.5 0 0 1 1 13V6a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-13z"/>
                </svg>
              </Nav.Link>{' '}
              {/* <Nav.Link as={NavLink} to='/Forums' style={{ fontWeight: 400, fontVariant: 'small-caps', fontSize: 23 + 'px' }} className="text-info btn btn-lg community-button">Forums</Nav.Link> */}
              <Nav.Link as={NavLink} to='/Friends'  className="text-info btn btn-lg btn-outline-black link-header">
                {/* Friend{' '} */}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-collection-fill" viewBox="0 0 16 16">
                <path d="M0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6v7zM2 3a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 0-1h-11A.5.5 0 0 0 2 3zm2-2a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7A.5.5 0 0 0 4 1z"/>
              </svg>
              </Nav.Link>
        <NavBarMessages user={user} relayStatus={relayStatus} setRelayStatus={setRelayStatus} />

          <span className="logging-button">
          {   user 
          ? <Link to="" onClick={handleLogout} className="text-warning btn btn-lg btn-outline-black link-header">Log Out</Link>
          : <Link to="/login" className="text-success btn btn-lg btn-outline-black">Log In</Link>
        }
          </span>
        <NavBarStatus user={user} relayStatus={relayStatus} setRelayStatus={setRelayStatus} />
          
          {/* <NavDropdown title="Feed" className="text-info btn btn-lg btn-outline-black link-header" id="basic-nav-dropdown">
              <Nav.Link as={NavLink} to='/CommunityFeed' style={{ fontWeight: 400, fontVariant: 'small-caps', fontSize: 23 + 'px' }} className="text-info btn btn-lg community-button">Community</Nav.Link>
              
              <Nav.Link as={NavLink} to='/Friends' style={{ fontWeight: 400, fontVariant: 'small-caps', fontSize: 23 + 'px' }} className="text-info btn btn-lg community-button">Friends</Nav.Link>
          </NavDropdown> */}
          {/* <NavBarFriends user={user} /> */}

          
      </Navbar.Collapse>
          </Container>
      </Navbar>

  )
}

export default NavBar