import React from 'react'
import './NavBar.css'
import { Link, NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import userService from '../../utils/userService';
import * as friendAPI from '../../utils/friendApi';
import { Nav } from 'react-bootstrap';

interface NavProps {
    user: any;
    setUser: React.Dispatch<any>;
    handleLogout: () => void;
}

const NavBar = ({ user, setUser, handleLogout }: NavProps) => {



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
        </Navbar.Collapse>
            </Container>
        </Navbar>

    )
}

export default NavBar