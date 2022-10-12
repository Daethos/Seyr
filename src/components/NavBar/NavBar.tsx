import React from 'react'
import './NavBar.css'
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import userService from '../../utils/userService';

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
            <Link to="/Ascean" className="text-info btn btn-lg btn-outline-black">Ascean</Link>
            &nbsp;&nbsp;
            <NavDropdown title="Community" className="text-info btn btn-lg btn-outline-black" id="basic-nav-dropdown">
                <NavDropdown.Item className="text-primary btn btn-lg"><Link to="/Forums" className="text-info btn btn-lg btn-outline-black">Forums</Link></NavDropdown.Item>
                <NavDropdown.Item className="text-primary btn btn-lg"><Link to="/Friends" className="text-info btn btn-lg btn-outline-black">Friends</Link></NavDropdown.Item>
                <NavDropdown.Item className="text-primary btn btn-lg"><Link to="/CommunityFeed" className="text-info btn btn-lg btn-outline-black">Feed</Link></NavDropdown.Item>
            </NavDropdown>
            &nbsp;&nbsp;
            <NavDropdown title="Equipment" className="text-info btn btn-lg btn-outline-black" id="basic-nav-dropdown">
                <NavDropdown.Item className="text-primary btn btn-lg"><Link to="/Weapons" className="text-info btn btn-lg btn-outline-black">Weapons</Link></NavDropdown.Item>
                <NavDropdown.Item className="text-primary btn btn-lg"><Link to="/Spells" className="text-info btn btn-lg btn-outline-black">Spells</Link></NavDropdown.Item>
                <NavDropdown.Item className="text-success btn btn-lg"><Link to="/Shields" className="text-info btn btn-lg btn-outline-black">Shields</Link></NavDropdown.Item>
                <NavDropdown.Item className="text-success btn btn-lg"><Link to="/Helmets" className="text-info btn btn-lg btn-outline-black">Helmets</Link></NavDropdown.Item>
                <NavDropdown.Item className="text-success btn btn-lg"><Link to="/Chests" className="text-info btn btn-lg btn-outline-black">Chests</Link></NavDropdown.Item>
                <NavDropdown.Item className="text-success btn btn-lg"><Link to="/Legs" className="text-info btn btn-lg btn-outline-black">Legs</Link></NavDropdown.Item>
                <NavDropdown.Item className="text-success btn btn-lg"><Link to="/Rings" className="text-info btn btn-lg btn-outline-black">Rings</Link></NavDropdown.Item>
                <NavDropdown.Item className="text-success btn btn-lg"><Link to="/Amulets" className="text-info btn btn-lg btn-outline-black">Amulets</Link></NavDropdown.Item>
                <NavDropdown.Item className="text-success btn btn-lg"><Link to="/Trinkets" className="text-info btn btn-lg btn-outline-black">Trinkets</Link></NavDropdown.Item>
            </NavDropdown>
            {   user 
            ? <Link to="" onClick={handleLogout} className="text-warning btn btn-lg btn-outline-black">Log Out</Link>
            : <Link to="/login" className="text-success btn btn-lg btn-outline-black">Log In</Link>
            }
        </Navbar.Collapse>
            </Container>
        </Navbar>

    )
}

export default NavBar