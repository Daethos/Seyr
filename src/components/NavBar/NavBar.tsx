import React, { useEffect, useState } from 'react';
import './NavBar.css'
import { Link, NavLink } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import * as asceanAPI from '../../utils/asceanApi';
import { Nav } from 'react-bootstrap';
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

  useEffect(() => {
    getAscean();
  }, [])

  async function getAscean() {
    setLoading(true);
    try {
      const response = await asceanAPI.getAllAscean();
      // console.log(response.data, '<- the response in Get All Ascean');
      setAsceanVaEsai([...response.data.reverse()])
      setLoading(false)
    } catch (err) {
      console.log(err);
    }
  }

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
              <Nav.Link as={NavLink} to='/Ascean' 
              className="text-info btn btn-lg btn-outline-black link-header">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-file-earmark-person-fill" viewBox="0 0 16 16">
                <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm2 5.755V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-.245S4 12 8 12s5 1.755 5 1.755z"/>
              </svg>
              </Nav.Link>
              <NavDropdown 
                title={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-file-earmark-person" viewBox="0 0 16 16">
                  <path d="M11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                  <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2v9.255S12 12 8 12s-5 1.755-5 1.755V2a1 1 0 0 1 1-1h5.5v2z"/>
                </svg>} className="text-info btn btn-lg btn-outline-black link-header" id="submenu-nav-dropdown" >
                {asceanVaEsai.map((ascean: any, index: number) => 
                  (<Nav.Link as={NavLink} to={'/edit/' + ascean._id} key={index} className='text-info btn btn-lg btn-outline-black mb-1 update-links'>
                    <img src={process.env.PUBLIC_URL + '/images/' + ascean.origin + '-' + ascean.sex + '.jpg'} alt={ascean.origin + ascean.sex} id="update-pic" /> {ascean.name}
                  </Nav.Link>))}
              </NavDropdown>

              <Nav.Link as={NavLink} to='/CommunityFeed'
              style={{ color: 'purple' }}
                className="text-info btn btn-lg btn-outline-black link-header">
                  {/* Community  */}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-collection" viewBox="0 0 16 16">
                  <path d="M2.5 3.5a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-11zm2-2a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6v7zm1.5.5A.5.5 0 0 1 1 13V6a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-13z"/>
                </svg>
              </Nav.Link>{' '}
              {/* <Nav.Link as={NavLink} to='/Forums' style={{ fontWeight: 400, fontVariant: 'small-caps', fontSize: 23 + 'px' }} className="text-info btn btn-lg community-button">Forums</Nav.Link> */}
              <Nav.Link as={NavLink} to='/Friends' style={{ color: 'purple' }} className="text-info btn btn-lg btn-outline-black link-header">
                {/* Friend{' '} */}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-collection-fill" viewBox="0 0 16 16">
                <path d="M0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6v7zM2 3a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 0-1h-11A.5.5 0 0 0 2 3zm2-2a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7A.5.5 0 0 0 4 1z"/>
              </svg>
              </Nav.Link>
        <NavBarMessages user={user} relayStatus={relayStatus} setRelayStatus={setRelayStatus} />

          <span className="logging-button">
          <Link to="" onClick={handleLogout} className="text-warning btn btn-lg btn-outline-black link-header">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-power" viewBox="0 0 16 16">
              <path d="M7.5 1v7h1V1h-1z"/>
              <path d="M3 8.812a4.999 4.999 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812z"/>
            </svg>
          </Link>
          </span>
                    <Navbar.Toggle type="button" aria-controls="basic-navbar-nav" className="" style={{ color: 'purple' }} />
                    <Navbar.Collapse id="basic-navbar-nav" className="collapse-button" style={{ color: 'purple' }}>
        <NavBarStatus user={user} relayStatus={relayStatus} setRelayStatus={setRelayStatus} />
          
      </Navbar.Collapse>
          </Container>
      </Navbar>

  )
}

export default NavBar