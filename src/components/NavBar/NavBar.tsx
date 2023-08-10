import { useState } from 'react';
import './NavBar.css'
import { Link, NavLink, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal';
import Navbar from 'react-bootstrap/Navbar';
import { Nav } from 'react-bootstrap';
import UserModal from '../UserModal/UserModal';
import { User } from '../../pages/App/App';

interface NavProps {
    user: User;
    handleLogout: () => void;
};

const NavBar = ({ user, handleLogout }: NavProps) => {
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<boolean>(true);
  const location = useLocation();

  return (
    <Navbar className="" expand="xxl" expanded={expanded} id="navbar" style={location.pathname.startsWith('/Solo') || location.pathname.startsWith(`/Hardcore`) || location.pathname.startsWith(`/GamePvPLobby`) || location.pathname.startsWith(`/Story`) ? { display: 'none' } : {}}>
      <Container fluid>
      <Button className="nav-item" variant='' onClick={() => setModalShow(true)}>
          <img src={user?.photoUrl} alt={user?.photoUrl} id="nav-pic" />
      </Button>
      <Modal show={modalShow} onHide={() => setModalShow(false)} centered>
      <Modal.Body>
      <UserModal user={user} />
      </Modal.Body>
      </Modal>
      <Link to="/" className="nav-item text-info" style={{ marginLeft: -30 + 'px', marginTop: -4.5 + 'px' }}>
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 512 512">
        <path d="M196.267,187.733h8.533v76.8c0,4.71,3.823,8.533,8.533,8.533c4.71,0,8.533-3.823,8.533-8.533v-76.8h68.267v76.8     c0,4.71,3.814,8.533,8.533,8.533s8.533-3.823,8.533-8.533v-76.8h8.533c4.719,0,8.533-3.823,8.533-8.533s-3.814-8.533-8.533-8.533     H196.267c-4.71,0-8.533,3.823-8.533,8.533S191.556,187.733,196.267,187.733z"></path>
        <path d="M21.786,220.962c4.224,2.125,9.344,0.401,11.443-3.814l26.505-53.001v49.186c0,4.71,3.823,8.533,8.533,8.533     s8.533-3.823,8.533-8.533v-49.186l26.496,53.001c1.502,2.995,4.514,4.719,7.646,4.719c1.28,0,2.586-0.29,3.806-0.905     c4.215-2.108,5.931-7.228,3.814-11.443l-42.658-85.333c-0.367-0.742-0.853-1.374-1.408-1.92     c-1.553-1.698-3.746-2.799-6.229-2.799s-4.676,1.101-6.238,2.799c-0.546,0.546-1.033,1.178-1.399,1.92l-42.667,85.333     C15.855,213.734,17.57,218.854,21.786,220.962z"></path>
        <path d="M247.467,230.4v17.067c0,4.71,3.823,8.533,8.533,8.533s8.533-3.823,8.533-8.533V230.4c0-4.71-3.823-8.533-8.533-8.533     S247.467,225.69,247.467,230.4z"></path>
        <path d="M209.519,152.704c4.216,2.108,9.336,0.384,11.443-3.823l26.505-53.001v49.186c0,4.71,3.823,8.533,8.533,8.533     s8.533-3.823,8.533-8.533V95.881l26.496,53.001c1.502,2.995,4.514,4.719,7.646,4.719c1.28,0,2.586-0.29,3.806-0.896     c4.216-2.116,5.931-7.236,3.823-11.452l-41.771-83.533V17.067H307.2v17.067h-25.6c-4.719,0-8.533,3.823-8.533,8.533     c0,4.71,3.814,8.533,8.533,8.533h34.133c4.719,0,8.533-3.823,8.533-8.533V8.533c0-4.71-3.814-8.533-8.533-8.533H256     c-4.71,0-8.533,3.823-8.533,8.533v49.186l-41.771,83.533C203.588,145.468,205.303,150.588,209.519,152.704z"></path>
        <path d="M443.733,358.4c-4.719,0-8.533,3.823-8.533,8.533V384c0,4.71,3.814,8.533,8.533,8.533c4.719,0,8.533-3.823,8.533-8.533     v-17.067C452.267,362.223,448.452,358.4,443.733,358.4z"></path>
        <path d="M397.252,220.962c4.215,2.116,9.335,0.401,11.452-3.814l26.496-53.001v49.186c0,4.71,3.814,8.533,8.533,8.533     c4.719,0,8.533-3.823,8.533-8.533v-49.186l26.496,53.001c1.502,2.995,4.514,4.719,7.646,4.719c1.28,0,2.586-0.29,3.806-0.905     c4.216-2.108,5.931-7.228,3.814-11.443l-42.667-85.333c-0.358-0.734-0.836-1.374-1.399-1.92     c-1.553-1.698-3.738-2.799-6.229-2.799c-2.492,0-4.676,1.101-6.229,2.799c-0.563,0.546-1.041,1.186-1.408,1.92l-42.667,85.333     C391.322,213.734,393.037,218.854,397.252,220.962z"></path>
        <path d="M384,256h8.533v8.533c0,4.71,3.814,8.533,8.533,8.533c4.719,0,8.533-3.823,8.533-8.533V256h68.267v170.667     c0,4.71,3.814,8.533,8.533,8.533s8.533-3.823,8.533-8.533V256h8.533c4.719,0,8.533-3.823,8.533-8.533s-3.814-8.533-8.533-8.533     H384c-4.719,0-8.533,3.823-8.533,8.533S379.281,256,384,256z"></path>
        <path d="M452.267,298.667c0-4.71-3.814-8.533-8.533-8.533c-4.719,0-8.533,3.823-8.533,8.533v17.067     c0,4.71,3.814,8.533,8.533,8.533c4.719,0,8.533-3.823,8.533-8.533V298.667z"></path>
        <path d="M375.467,332.8v-25.6h17.067v119.467c0,4.71,3.814,8.533,8.533,8.533c4.719,0,8.533-3.823,8.533-8.533v-128     c0-4.71-3.814-8.533-8.533-8.533h-34.133c-4.719,0-8.533,3.823-8.533,8.533v25.6h-34.133v-25.6c0-4.71-3.814-8.533-8.533-8.533     H281.6c-4.719,0-8.533,3.823-8.533,8.533v25.6h-34.133v-25.6c0-4.71-3.823-8.533-8.533-8.533h-34.133     c-4.71,0-8.533,3.823-8.533,8.533v25.6H153.6v-25.6c0-4.71-3.823-8.533-8.533-8.533h-34.133c-4.71,0-8.533,3.823-8.533,8.533v128     c0,4.71,3.823,8.533,8.533,8.533s8.533-3.823,8.533-8.533V307.2h17.067v25.6c0,4.71,3.823,8.533,8.533,8.533h51.2     c4.71,0,8.533-3.823,8.533-8.533v-25.6h17.067v25.6c0,4.71,3.823,8.533,8.533,8.533h51.2c4.719,0,8.533-3.823,8.533-8.533v-25.6     H307.2v25.6c0,4.71,3.814,8.533,8.533,8.533h51.2C371.652,341.333,375.467,337.51,375.467,332.8z"></path>
        <path d="M494.933,452.267c-3.106,0-6.025,0.836-8.533,2.296c-5.018-2.918-12.049-2.918-17.067,0     c-5.018-2.918-12.049-2.918-17.067,0c-5.018-2.918-12.049-2.918-17.067,0c-5.018-2.918-12.049-2.918-17.067,0     c-5.018-2.918-12.049-2.918-17.067,0c-5.018-2.918-12.049-2.918-17.067,0c-5.018-2.918-12.049-2.918-17.067,0     c-5.018-2.918-12.049-2.918-17.067,0c-2.509-1.459-5.427-2.296-8.533-2.296c-9.412,0-17.067,7.654-17.067,17.067v34.133     c0,4.71,3.814,8.533,8.533,8.533h170.667c4.719,0,8.533-3.823,8.533-8.533v-34.133C512,459.921,504.337,452.267,494.933,452.267z      M494.933,494.933h-153.6v-25.6c0,4.71,3.814,8.533,8.533,8.533s8.533-3.823,8.533-8.533c0,4.71,3.814,8.533,8.533,8.533     s8.533-3.823,8.533-8.533c0,4.71,3.814,8.533,8.533,8.533c4.719,0,8.533-3.823,8.533-8.533c0,4.71,3.814,8.533,8.533,8.533     c4.719,0,8.533-3.823,8.533-8.533c0,4.71,3.814,8.533,8.533,8.533s8.533-3.823,8.533-8.533c0,4.71,3.814,8.533,8.533,8.533     s8.533-3.823,8.533-8.533c0,4.71,3.814,8.533,8.533,8.533c4.719,0,8.533-3.823,8.533-8.533c0,4.71,3.814,8.533,8.533,8.533     s8.533-3.823,8.533-8.533c0,4.71,3.814,8.533,8.533,8.533s8.533-3.823,8.533-8.533V494.933z"></path>
        <path d="M256,375.467c-28.237,0-51.2,22.963-51.2,51.2v76.8c0,4.71,3.823,8.533,8.533,8.533h85.333     c4.719,0,8.533-3.823,8.533-8.533v-76.8C307.2,398.43,284.237,375.467,256,375.467z M290.133,494.933h-68.267v-17.067h68.267     V494.933z M290.133,460.8h-68.267v-17.067h68.267V460.8z M221.867,426.667c0-18.825,15.309-34.133,34.133-34.133     c18.825,0,34.133,15.309,34.133,34.133H221.867z"></path>
        <path d="M170.667,452.267c-3.106,0-6.025,0.836-8.533,2.296c-5.026-2.918-12.041-2.918-17.067,0     c-5.026-2.918-12.041-2.918-17.067,0c-5.026-2.918-12.041-2.918-17.067,0c-5.026-2.918-12.041-2.918-17.067,0     c-5.026-2.918-12.041-2.918-17.067,0c-5.026-2.918-12.041-2.918-17.067,0c-5.026-2.918-12.041-2.918-17.067,0     c-5.026-2.918-12.041-2.918-17.067,0c-2.509-1.459-5.427-2.296-8.533-2.296C7.654,452.267,0,459.921,0,469.333v34.133     C0,508.177,3.823,512,8.533,512H179.2c4.71,0,8.533-3.823,8.533-8.533v-34.133C187.733,459.921,180.079,452.267,170.667,452.267z      M170.667,494.933h-153.6v-25.6c0,4.71,3.823,8.533,8.533,8.533c4.71,0,8.533-3.823,8.533-8.533c0,4.71,3.823,8.533,8.533,8.533     c4.71,0,8.533-3.823,8.533-8.533c0,4.71,3.823,8.533,8.533,8.533s8.533-3.823,8.533-8.533c0,4.71,3.823,8.533,8.533,8.533     s8.533-3.823,8.533-8.533c0,4.71,3.823,8.533,8.533,8.533c4.71,0,8.533-3.823,8.533-8.533c0,4.71,3.823,8.533,8.533,8.533     s8.533-3.823,8.533-8.533c0,4.71,3.823,8.533,8.533,8.533s8.533-3.823,8.533-8.533c0,4.71,3.823,8.533,8.533,8.533     c4.71,0,8.533-3.823,8.533-8.533c0,4.71,3.823,8.533,8.533,8.533c4.71,0,8.533-3.823,8.533-8.533V494.933z"></path>
        <path d="M8.533,256h8.533v179.2c0,4.71,3.823,8.533,8.533,8.533c4.71,0,8.533-3.823,8.533-8.533V256H102.4v8.533     c0,4.71,3.823,8.533,8.533,8.533s8.533-3.823,8.533-8.533V256H128c4.71,0,8.533-3.823,8.533-8.533s-3.823-8.533-8.533-8.533     H8.533c-4.71,0-8.533,3.823-8.533,8.533S3.823,256,8.533,256z"></path>
        <path d="M76.8,298.667c0-4.71-3.823-8.533-8.533-8.533s-8.533,3.823-8.533,8.533v17.067c0,4.71,3.823,8.533,8.533,8.533     s8.533-3.823,8.533-8.533V298.667z"></path>
        <path d="M68.267,358.4c-4.71,0-8.533,3.823-8.533,8.533V384c0,4.71,3.823,8.533,8.533,8.533S76.8,388.71,76.8,384v-17.067     C76.8,362.223,72.977,358.4,68.267,358.4z"></path>
      </svg>
      </Link>
      <Nav.Link as={NavLink} to='/Ascean' style={{ marginLeft: -25 + 'px', marginTop: -4 + 'px' }}
      className="text-info btn btn-lg btn-outline-black link-header">
      <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" viewBox="0 0 440.95 440.95">
        <path d="M322.009,139.414c1.449,0,2.869-0.59,3.89-1.61c1.02-1.03,1.61-2.44,1.61-3.89s-0.591-2.87-1.61-3.89   c-1.021-1.02-2.44-1.61-3.89-1.61c-1.45,0-2.86,0.59-3.891,1.61c-1.02,1.02-1.609,2.44-1.609,3.89s0.59,2.86,1.609,3.89   C319.148,138.824,320.568,139.414,322.009,139.414z"></path>
        <path d="M219.448,120.104c0.35,0.06,0.69,0.1,1.03,0.1c2.59,0,4.899-1.84,5.399-4.48c0.57-2.99-1.399-5.87-4.38-6.43   c-2.99-0.56-5.86,1.4-6.43,4.38C214.508,116.664,216.468,119.534,219.448,120.104z"></path>
        <path d="M179.858,127.884c0.34,0,0.68-0.03,1.03-0.1c2.98-0.56,4.94-3.44,4.38-6.42c-0.57-2.99-3.45-4.95-6.43-4.38   c-2.99,0.56-4.95,3.44-4.38,6.42C174.958,126.044,177.268,127.884,179.858,127.884z"></path>
        <path d="M200.158,124.044c0.34,0,0.69-0.03,1.03-0.1c2.99-0.56,4.95-3.44,4.38-6.43c-0.56-2.98-3.44-4.94-6.42-4.38   c-2.99,0.57-4.95,3.44-4.39,6.43C195.258,122.204,197.568,124.044,200.158,124.044z"></path>
        <path d="M280.368,131.634c0.351,0.06,0.69,0.09,1.03,0.09c2.59,0,4.899-1.84,5.399-4.47c0.57-2.99-1.399-5.87-4.38-6.43   c-2.979-0.57-5.859,1.4-6.43,4.38C275.428,128.194,277.388,131.064,280.368,131.634z"></path>
        <path d="M260.068,127.784c0.34,0.07,0.69,0.1,1.03,0.1c2.59,0,4.899-1.84,5.39-4.48c0.57-2.98-1.39-5.86-4.38-6.42   c-2.98-0.57-5.86,1.39-6.42,4.38C255.118,124.344,257.078,127.224,260.068,127.784z"></path>
        <path d="M300.678,135.474c0.35,0.07,0.689,0.1,1.029,0.1c2.59,0,4.9-1.84,5.4-4.48c0.56-2.99-1.4-5.86-4.38-6.43   c-2.99-0.56-5.86,1.4-6.431,4.38C295.738,132.034,297.698,134.904,300.678,135.474z"></path>
        <path d="M239.759,123.944c0.35,0.07,0.689,0.1,1.029,0.1c2.59,0,4.9-1.84,5.4-4.48c0.56-2.99-1.4-5.86-4.38-6.43   c-2.99-0.56-5.87,1.4-6.431,4.38C234.808,120.504,236.778,123.384,239.759,123.944z"></path>
        <path d="M139.238,135.564c0.34,0,0.68-0.03,1.03-0.09c2.99-0.57,4.95-3.44,4.38-6.43c-0.56-2.98-3.44-4.94-6.42-4.38   c-2.99,0.57-4.95,3.44-4.39,6.43C134.338,133.734,136.648,135.564,139.238,135.564z"></path>
        <path d="M159.548,131.724c0.34,0,0.68-0.03,1.03-0.09c2.98-0.57,4.94-3.45,4.38-6.43c-0.57-2.99-3.44-4.95-6.43-4.38   c-2.98,0.56-4.94,3.44-4.38,6.42C154.648,129.884,156.958,131.724,159.548,131.724z"></path>
        <path d="M118.938,139.414c1.45,0,2.87-0.59,3.89-1.61c1.02-1.03,1.61-2.44,1.61-3.89s-0.59-2.87-1.61-3.89s-2.44-1.61-3.89-1.61   c-1.45,0-2.86,0.59-3.89,1.61c-1.02,1.02-1.61,2.44-1.61,3.89s0.59,2.86,1.61,3.89   C116.078,138.824,117.488,139.414,118.938,139.414z"></path>
        <path d="M211.482,196.985c-1.261-1.045-2.922-1.472-4.531-1.169l-25,4.73c-2.597,0.492-4.478,2.761-4.478,5.404v126.33   c0,1.842,0.922,3.562,2.457,4.581l25,16.61c0.918,0.61,1.979,0.919,3.044,0.919c0.891,0,1.785-0.216,2.599-0.653   c1.786-0.958,2.901-2.82,2.901-4.847V201.22C213.473,199.582,212.743,198.03,211.482,196.985z M202.473,338.633l-14-9.302V210.507   l14-2.649V338.633z"></path>
        <path d="M161.482,206.435c-1.261-1.045-2.924-1.472-4.531-1.169l-25,4.73c-2.597,0.492-4.478,2.761-4.478,5.404v83.67   c0,1.842,0.922,3.562,2.457,4.581l25,16.61c0.918,0.61,1.979,0.919,3.044,0.919c0.891,0,1.785-0.216,2.599-0.653   c1.786-0.958,2.901-2.82,2.901-4.847V210.67C163.473,209.032,162.743,207.48,161.482,206.435z M152.473,305.423l-14-9.302v-76.164   l14-2.649V305.423z"></path>
        <path d="M230.375,353.737c0.813,0.437,1.707,0.653,2.599,0.653c1.063,0,2.125-0.309,3.044-0.919l25-16.61   c1.534-1.02,2.456-2.739,2.456-4.581V205.95c0-2.643-1.88-4.913-4.478-5.404l-25-4.73c-1.605-0.302-3.27,0.124-4.531,1.169   c-1.262,1.045-1.991,2.598-1.991,4.235v147.67C227.473,350.917,228.588,352.779,230.375,353.737z M238.473,207.858l14,2.649   v118.824l-14,9.302V207.858z"></path>
        <path d="M280.375,320.527c0.813,0.437,1.707,0.653,2.599,0.653c1.063,0,2.125-0.309,3.044-0.919l25-16.61   c1.534-1.02,2.456-2.739,2.456-4.581V215.4c0-2.643-1.88-4.913-4.478-5.404l-25-4.73c-1.609-0.303-3.271,0.124-4.531,1.169   c-1.262,1.045-1.991,2.598-1.991,4.235v105.01C277.473,317.707,278.588,319.569,280.375,320.527z M288.473,217.308l14,2.649v76.164   l-14,9.302V217.308z"></path>
        <path d="M325.717,287.99c0.112,0.007,0.225,0.01,0.335,0.01c2.887,0,5.31-2.25,5.485-5.17l3.424-57   c0.182-3.032-2.128-5.638-5.16-5.82c-3.045-0.185-5.638,2.129-5.82,5.161l-3.424,57   C320.375,285.202,322.684,287.808,325.717,287.99z"></path>
        <path d="M116.967,225.171c-0.183-3.033-2.809-5.34-5.82-5.161c-3.032,0.182-5.343,2.788-5.161,5.82l3.424,57   c0.176,2.92,2.598,5.17,5.485,5.17c0.111,0,0.223-0.003,0.334-0.01c3.032-0.182,5.343-2.788,5.161-5.82L116.967,225.171z"></path>
        <path d="M371.723,377.538c-0.354-1.867-1.646-3.419-3.418-4.104l-2.786-1.079c-22.789-8.841-37.782-29.921-38.765-54.154   l6.272-4.166c9.205-6.115,15.35-15.899,16.859-26.846l15.962-115.726c0.348-2.517-1.074-4.943-3.439-5.872   c-2.367-0.928-5.059-0.115-6.515,1.966l-1.015,1.45c-4.583-24.231-14.943-48.922-29.897-70.815   c-18.745-27.441-43.218-47.879-68.909-57.551c-10.379-3.907-19.049-12.109-23.788-22.502L225.48,3.218   C224.587,1.258,222.631,0,220.476,0s-4.11,1.258-5.004,3.218l-6.803,14.92c-4.739,10.394-13.41,18.595-23.788,22.502   c-25.694,9.672-50.169,30.112-68.914,57.556c-14.955,21.895-25.313,46.587-29.894,70.818l-1.02-1.457   c-1.458-2.082-4.152-2.893-6.515-1.966c-2.365,0.928-3.787,3.355-3.439,5.872l15.962,115.726   c1.509,10.946,7.654,20.73,16.859,26.846l6.275,4.169c-0.983,24.228-15.977,45.307-38.761,54.15l-2.79,1.08   c-1.772,0.686-3.064,2.238-3.418,4.104s0.281,3.784,1.679,5.071c40.871,37.622,93.989,58.341,149.57,58.341   c55.582,0,108.7-20.719,149.57-58.341C371.443,381.322,372.078,379.405,371.723,377.538z M252.197,50.937   c23.596,8.882,46.219,27.868,63.7,53.46c0.104,0.152,0.201,0.309,0.305,0.461c-18.741,2.106-37.656-4.652-50.82-18.546l-0.49-0.517   c-1.772-1.872-4.612-2.26-6.822-0.933c-5.66,3.395-12.414,3.918-18.528,1.436c-6.115-2.483-10.592-7.567-12.282-13.947   l-1.283-4.843V29.486C232.236,39.268,241.485,46.904,252.197,50.937z M188.756,50.936c10.712-4.032,19.96-11.667,26.221-21.449   v38.02l-1.283,4.844c-1.69,6.38-6.167,11.464-12.283,13.947c-6.116,2.483-12.869,1.959-18.529-1.436   c-2.212-1.327-5.05-0.939-6.824,0.935l-0.488,0.516c-13.163,13.895-32.081,20.654-50.823,18.546   c0.103-0.151,0.199-0.306,0.302-0.457C142.532,78.806,165.157,59.818,188.756,50.936z M118.333,115.008   c22.674,4.253,46.146-2.719,62.814-18.707c7.75,3.32,16.431,3.426,24.403,0.188c6.286-2.552,11.439-6.902,14.927-12.443   c3.487,5.541,8.641,9.89,14.927,12.443c7.974,3.238,16.655,3.132,24.403-0.188c13.451,12.902,31.333,19.937,49.651,19.937   c4.38,0,8.786-0.406,13.162-1.227c12.562,21.327,20.64,44.687,23.108,67.069l-8.796,12.566l-27.041-5.116v-15.957   c0-2.643-1.88-4.913-4.478-5.404l-83.92-15.88c-0.676-0.128-1.37-0.128-2.046,0l-83.91,15.88c-2.597,0.492-4.477,2.761-4.477,5.404   v15.956l-27.046,5.117l-8.789-12.555C97.69,159.705,105.769,136.34,118.333,115.008z M298.89,187.449l-77.395-14.642   c-0.675-0.128-1.369-0.128-2.045,0l-77.391,14.641v-9.318l78.41-14.839l78.42,14.839V187.449z M101.958,285.686l-12.849-93.152   l7.931,11.33c1.24,1.772,3.405,2.652,5.528,2.25l117.905-22.306l117.904,22.306c2.126,0.401,4.288-0.478,5.528-2.25l7.932-11.33   l-12.849,93.152c-1.079,7.823-5.471,14.816-12.049,19.187l-106.467,70.725l-106.466-70.725   C107.428,300.502,103.037,293.509,101.958,285.686z M220.475,429.95c-49.918,0-97.747-17.589-135.632-49.703   c21.888-10.587,36.674-31.193,39.787-55.112l92.801,61.647c0.922,0.613,1.983,0.919,3.043,0.919s2.121-0.306,3.043-0.919   l92.804-61.65c3.111,23.923,17.895,44.53,39.787,55.115C318.222,412.361,270.393,429.95,220.475,429.95z"></path>
      </svg>
      </Nav.Link> 
      <Nav.Link as={NavLink} to='/CommunityFeed'
      style={{ marginLeft: -25 + 'px', marginTop: -1 + 'px' }}
        className="text-info btn btn-lg btn-outline-black link-header">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 464.06 464.06">
        <path d="M401.824,133.379c3.038,0,5.5-2.462,5.5-5.5v-8.87h21.826c3.038,0,5.5-2.462,5.5-5.5v-10.72h23.91   c3.038,0,5.5-2.462,5.5-5.5v-21.32c0-3.038-2.462-5.5-5.5-5.5h-23.91v-10.72c0-3.038-2.462-5.5-5.5-5.5h-21.826v-8.866   c0-3.038-2.462-5.5-5.5-5.5H62.243c-3.038,0-5.5,2.462-5.5,5.5v8.866H34.92c-3.038,0-5.5,2.462-5.5,5.5v10.72H5.5   c-3.038,0-5.5,2.462-5.5,5.5v21.32c0,3.038,2.462,5.5,5.5,5.5h23.92v10.72c0,3.038,2.462,5.5,5.5,5.5h21.823v8.87   c0,3.038,2.462,5.5,5.5,5.5h3.212v197.302h-3.212c-3.038,0-5.5,2.462-5.5,5.5v8.866H34.92c-3.038,0-5.5,2.462-5.5,5.5v10.72H5.5   c-3.038,0-5.5,2.462-5.5,5.5v21.32c0,3.038,2.462,5.5,5.5,5.5h23.92v10.72c0,3.038,2.462,5.5,5.5,5.5h21.823v8.87   c0,3.038,2.462,5.5,5.5,5.5h339.581c3.038,0,5.5-2.462,5.5-5.5v-8.87h21.826c3.038,0,5.5-2.462,5.5-5.5v-10.72h23.91   c3.038,0,5.5-2.462,5.5-5.5v-21.32c0-3.038-2.462-5.5-5.5-5.5h-23.91v-10.72c0-3.038-2.462-5.5-5.5-5.5h-21.826v-8.866   c0-3.038-2.462-5.5-5.5-5.5h-3.213V133.379H401.824z M453.06,81.469v10.32h-18.41v-10.32H453.06z M11,91.789v-10.32h18.42v10.32H11   z M40.42,108.009v-42.76h16.323v42.76H40.42z M11,382.587v-10.32h18.42v10.32H11z M40.42,398.807v-42.76h16.323v42.76H40.42z    M453.06,372.267v10.32h-18.41v-10.32H453.06z M423.65,65.249v42.76h-16.326v-42.76H423.65z M67.743,50.883h328.581v71.496H67.743   V50.883z M396.324,413.177H67.743v-71.496h328.581V413.177z M423.65,356.047v42.76h-16.326v-42.76H423.65z M387.611,330.681H76.456   V133.379h311.156V330.681z"></path>
        <path d="M156.14,166.379h100c3.038,0,5.5-2.462,5.5-5.5s-2.462-5.5-5.5-5.5h-100c-3.038,0-5.5,2.462-5.5,5.5   S153.103,166.379,156.14,166.379z"></path>
        <path d="M280.64,166.379h72.89c3.038,0,5.5-2.462,5.5-5.5s-2.462-5.5-5.5-5.5h-72.89c-3.038,0-5.5,2.462-5.5,5.5   S277.603,166.379,280.64,166.379z"></path>
        <path d="M110.54,166.379h21.1c3.038,0,5.5-2.462,5.5-5.5s-2.462-5.5-5.5-5.5h-21.1c-3.038,0-5.5,2.462-5.5,5.5   S107.502,166.379,110.54,166.379z"></path>
        <path d="M353.53,179.129H210.64c-3.038,0-5.5,2.462-5.5,5.5s2.462,5.5,5.5,5.5h142.89c3.038,0,5.5-2.462,5.5-5.5   S356.568,179.129,353.53,179.129z"></path>
        <path d="M110.54,190.129h75.6c3.038,0,5.5-2.462,5.5-5.5s-2.462-5.5-5.5-5.5h-75.6c-3.038,0-5.5,2.462-5.5,5.5   S107.502,190.129,110.54,190.129z"></path>
        <path d="M353.53,202.879h-96.89c-3.038,0-5.5,2.462-5.5,5.5s2.462,5.5,5.5,5.5h96.89c3.038,0,5.5-2.462,5.5-5.5   S356.568,202.879,353.53,202.879z"></path>
        <path d="M110.54,213.879h121.6c3.038,0,5.5-2.462,5.5-5.5s-2.462-5.5-5.5-5.5h-121.6c-3.038,0-5.5,2.462-5.5,5.5   S107.502,213.879,110.54,213.879z"></path>
        <path d="M308.64,232.119c0-3.038-2.462-5.5-5.5-5.5h-123.5c-3.038,0-5.5,2.462-5.5,5.5s2.462,5.5,5.5,5.5h123.5   C306.178,237.619,308.64,235.157,308.64,232.119z"></path>
        <path d="M353.53,226.619h-25.89c-3.038,0-5.5,2.462-5.5,5.5s2.462,5.5,5.5,5.5h25.89c3.038,0,5.5-2.462,5.5-5.5   S356.568,226.619,353.53,226.619z"></path>
        <path d="M110.54,237.619h44.6c3.038,0,5.5-2.462,5.5-5.5s-2.462-5.5-5.5-5.5h-44.6c-3.038,0-5.5,2.462-5.5,5.5   S107.502,237.619,110.54,237.619z"></path>
        <path d="M353.53,250.369h-87.39c-3.038,0-5.5,2.462-5.5,5.5s2.462,5.5,5.5,5.5h87.39c3.038,0,5.5-2.462,5.5-5.5   S356.568,250.369,353.53,250.369z"></path>
        <path d="M110.54,261.369h131.1c3.038,0,5.5-2.462,5.5-5.5s-2.462-5.5-5.5-5.5h-131.1c-3.038,0-5.5,2.462-5.5,5.5   S107.502,261.369,110.54,261.369z"></path>
        <path d="M353.53,274.119H160.64c-3.038,0-5.5,2.462-5.5,5.5s2.462,5.5,5.5,5.5h192.89c3.038,0,5.5-2.462,5.5-5.5   S356.568,274.119,353.53,274.119z"></path>
        <path d="M110.54,285.119h25.6c3.038,0,5.5-2.462,5.5-5.5s-2.462-5.5-5.5-5.5h-25.6c-3.038,0-5.5,2.462-5.5,5.5   S107.502,285.119,110.54,285.119z"></path>
        <path d="M353.53,297.869h-42.39c-3.038,0-5.5,2.462-5.5,5.5s2.462,5.5,5.5,5.5h42.39c3.038,0,5.5-2.462,5.5-5.5   S356.568,297.869,353.53,297.869z"></path>
        <path d="M110.54,308.869h176.1c3.038,0,5.5-2.462,5.5-5.5s-2.462-5.5-5.5-5.5h-176.1c-3.038,0-5.5,2.462-5.5,5.5   S107.502,308.869,110.54,308.869z"></path>
        <path d="M368.82,68.53h15.213c3.038,0,5.5-2.462,5.5-5.5s-2.462-5.5-5.5-5.5H368.82c-3.038,0-5.5,2.462-5.5,5.5   S365.783,68.53,368.82,68.53z"></path>
        <path d="M223.034,68.53H343.82c3.038,0,5.5-2.462,5.5-5.5s-2.462-5.5-5.5-5.5H223.034c-3.038,0-5.5,2.462-5.5,5.5   S219.996,68.53,223.034,68.53z"></path>
        <path d="M241.034,395.53H229.82c-3.038,0-5.5,2.462-5.5,5.5s2.462,5.5,5.5,5.5h11.213c3.038,0,5.5-2.462,5.5-5.5   S244.071,395.53,241.034,395.53z"></path>
        <path d="M208.82,395.53H80.034c-3.038,0-5.5,2.462-5.5,5.5s2.462,5.5,5.5,5.5H208.82c3.038,0,5.5-2.462,5.5-5.5   S211.857,395.53,208.82,395.53z"></path>
        </svg>
      </Nav.Link>{' '}
      <Nav.Link as={NavLink} to='/ChatLobby'
      style={{ marginLeft: -20 + 'px', marginTop: -0 + 'px' }}
        className="text-info btn btn-lg btn-outline-black link-header">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 512 512">
            <path d="M76.8,409.6c-4.71,0-8.533,3.823-8.533,8.533s3.823,8.533,8.533,8.533h34.133c4.71,0,8.533-3.823,8.533-8.533     s-3.823-8.533-8.533-8.533H76.8z"></path>
            <path d="M332.8,273.067H39.526C17.732,273.067,0,292.207,0,315.733v153.6C0,492.86,17.732,512,39.526,512h207.488     c22.972,0,43.119-19.934,43.119-42.709v-93.858c-0.026-4.702-3.84-8.499-8.533-8.499h-0.043c-4.71,0.026-8.516,3.866-8.491,8.576     v93.824c0,14.421-14.003,25.6-26.052,25.6H39.526c-12.382,0-22.46-11.486-22.46-25.6v-153.6c0-14.114,10.078-25.6,22.46-25.6     h272.768l-53.367,53.717c-3.319,3.345-3.302,8.747,0.043,12.066c3.345,3.328,8.747,3.311,12.066-0.034l67.814-68.267     c2.432-2.449,3.149-6.11,1.826-9.293C339.362,275.14,336.247,273.067,332.8,273.067z"></path>
            <path d="M187.733,366.933c0-4.71-3.823-8.533-8.533-8.533H76.8c-4.71,0-8.533,3.823-8.533,8.533s3.823,8.533,8.533,8.533h102.4     C183.91,375.467,187.733,371.644,187.733,366.933z"></path>
            <path d="M8.866,100.292c1.63,16.401,8.755,30.839,9.096,31.522c7.74,15.471,19.43,38.852,58.837,38.852     s51.098-23.381,58.829-38.852c0.35-0.683,7.484-15.121,9.105-31.522c5.282-2.901,8.866-8.525,8.866-14.959V68.267     c0-6.306-3.439-11.819-8.533-14.771V51.2c0-28.237-22.963-51.2-51.2-51.2H59.733c-28.237,0-51.2,22.963-51.2,51.2v2.295     C3.439,56.448,0,61.961,0,68.267v17.067C0,91.767,3.584,97.391,8.866,100.292z M17.067,68.267c4.71,0,8.533-3.823,8.533-8.533     V51.2c0-18.825,15.309-34.133,34.133-34.133h34.133C112.691,17.067,128,32.375,128,51.2v8.533c0,4.71,3.823,8.533,8.533,8.533     v17.067c-4.71,0-8.533,3.823-8.533,8.533c0,14.763-7.561,30.174-7.637,30.319C111.488,141.952,103.646,153.6,76.8,153.6     c-26.854,0-34.688-11.648-43.563-29.406c-0.077-0.154-7.637-15.565-7.637-30.327c0-4.71-3.823-8.533-8.533-8.533V68.267z"></path>
            <path d="M93.867,85.333h8.533c4.71,0,8.533-3.823,8.533-8.533s-3.823-8.533-8.533-8.533h-8.533c-4.71,0-8.533,3.823-8.533,8.533     S89.156,85.333,93.867,85.333z"></path>
            <path d="M51.2,85.333h8.533c4.71,0,8.533-3.823,8.533-8.533s-3.823-8.533-8.533-8.533H51.2c-4.71,0-8.533,3.823-8.533,8.533     S46.49,85.333,51.2,85.333z"></path>
            <path d="M298.667,153.6H332.8c4.719,0,8.533-3.823,8.533-8.533c0-4.71-3.814-8.533-8.533-8.533h-34.133     c-4.719,0-8.533,3.823-8.533,8.533C290.133,149.777,293.948,153.6,298.667,153.6z"></path>
            <path d="M401.067,85.333h-102.4c-4.719,0-8.533,3.823-8.533,8.533c0,4.71,3.814,8.533,8.533,8.533h102.4     c4.719,0,8.533-3.823,8.533-8.533C409.6,89.156,405.786,85.333,401.067,85.333z"></path>
            <path d="M469.325,0H179.2c-3.447,0-6.562,2.082-7.885,5.265c-1.323,3.191-0.589,6.861,1.852,9.301l68.275,68.267     c3.337,3.337,8.73,3.337,12.066,0s3.337-8.73,0-12.066l-53.7-53.7h269.517c14.114,0,25.609,11.486,25.609,25.6v153.6     c0,14.114-11.494,25.6-25.609,25.6h-204.8c-14.114,0-25.591-11.486-25.591-25.6V102.4c0-4.71-3.823-8.533-8.533-8.533     s-8.533,3.823-8.533,8.533v93.867c0,23.526,19.14,42.667,42.658,42.667h204.8c23.526,0,42.675-19.14,42.675-42.667v-153.6     C512,19.14,492.851,0,469.325,0z"></path>
            <path d="M358.4,145.067c0,4.71,3.814,8.533,8.533,8.533H435.2c4.719,0,8.533-3.823,8.533-8.533c0-4.71-3.814-8.533-8.533-8.533     h-68.267C362.214,136.533,358.4,140.356,358.4,145.067z"></path>
            <path d="M460.8,341.333h-8.533c-4.719,0-8.533,3.823-8.533,8.533s3.814,8.533,8.533,8.533h8.533c4.719,0,8.533-3.823,8.533-8.533     S465.519,341.333,460.8,341.333z"></path>
            <path d="M418.133,341.333H409.6c-4.719,0-8.533,3.823-8.533,8.533s3.814,8.533,8.533,8.533h8.533     c4.719,0,8.533-3.823,8.533-8.533S422.852,341.333,418.133,341.333z"></path>
            <path d="M145.067,426.667h68.267c4.71,0,8.533-3.823,8.533-8.533s-3.823-8.533-8.533-8.533h-68.267     c-4.71,0-8.533,3.823-8.533,8.533S140.356,426.667,145.067,426.667z"></path>
            <path d="M503.467,326.562v-2.295c0-28.237-22.963-51.2-51.2-51.2h-34.133c-28.237,0-51.2,22.963-51.2,51.2v2.295     c-5.103,2.953-8.533,8.465-8.533,14.771V358.4c0,6.434,3.584,12.058,8.858,14.959c1.63,16.401,8.764,30.839,9.105,31.522     c7.74,15.471,19.43,38.852,58.837,38.852s51.098-23.381,58.829-38.852c0.35-0.683,7.484-15.121,9.114-31.522     c5.274-2.901,8.858-8.525,8.858-14.959v-17.067C512,335.027,508.57,329.515,503.467,326.562z M494.933,358.4     c-4.719,0-8.533,3.823-8.533,8.533c0,14.763-7.561,30.174-7.637,30.319c-8.875,17.766-16.708,29.414-43.563,29.414     c-26.854,0-34.688-11.648-43.563-29.406c-0.077-0.154-7.637-15.565-7.637-30.327c0-4.71-3.814-8.533-8.533-8.533v-17.067     c4.719,0,8.533-3.823,8.533-8.533v-8.533c0-18.825,15.309-34.133,34.133-34.133h34.133c18.825,0,34.133,15.309,34.133,34.133     v8.533c0,4.71,3.814,8.533,8.533,8.533V358.4z"></path>
          </svg>
      </Nav.Link>{' '}
      {/* <Nav.Link as={NavLink} to='/GamePvPLobby' style={{ marginLeft: -20 + 'px', marginTop: -1 + 'px' }} className="text-info btn btn-lg btn-outline-black link-header">
        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" x="0px" y="0px" viewBox="0 0 503.845 503.845" >
          <path d="M497.708,83.501c-2.812-3.282-7.646-3.911-11.197-1.427c-41.438,29.008-58.334,28.563-78.512,16.921l-7.269-4.197    l4.188-7.269c2.325-4.02,0.948-9.149-3.072-11.465l-11.524-6.656l26.288-7.05c4.474-1.2,7.134-5.8,5.934-10.274L410.256,6.223    c-1.183-4.482-5.791-7.134-10.274-5.934l-45.862,12.288c-4.482,1.192-7.134,5.8-5.934,10.274l7.042,26.297l-11.533-6.656    c-1.93-1.116-4.23-1.418-6.362-0.839c-2.149,0.571-3.987,1.981-5.103,3.911l-4.197,7.269l-16.569-9.577    c-5.28-3.038-11.415-3.844-17.333-2.275c-5.892,1.578-10.811,5.363-13.858,10.643l-9.678,16.762    c-3.987,6.916-4.062,15.536-0.185,22.494l17.475,31.484l-1.821,3.156c-2.317,4.02-0.94,9.149,3.072,11.465l7.269,4.197    l-44.485,77.052l-44.485-77.052l7.26-4.197c4.02-2.317,5.397-7.445,3.08-11.465l-1.83-3.156l17.484-31.475    c3.878-6.967,3.802-15.587-0.185-22.503l-9.678-16.762c-3.047-5.279-7.965-9.065-13.858-10.643    c-5.909-1.57-12.061-0.764-17.332,2.275l-16.577,9.577l-4.188-7.269c-1.116-1.93-2.955-3.341-5.103-3.911    c-2.149-0.579-4.44-0.277-6.371,0.839l-11.524,6.656l7.042-26.297c1.2-4.474-1.46-9.082-5.934-10.274L103.862,0.289    c-4.474-1.2-9.082,1.452-10.274,5.934L81.301,52.085c-1.2,4.474,1.46,9.073,5.934,10.274l26.288,7.05l-11.524,6.656    c-4.02,2.317-5.397,7.445-3.08,11.465l4.197,7.269l-7.269,4.197c-20.169,11.658-37.091,12.095-78.512-16.921    c-3.55-2.484-8.385-1.855-11.197,1.427c-2.166,2.543-20.069,26.792,19.271,94.93c34.019,58.93,61.02,64.369,69.825,64.369    c1.377,0,2.3-0.134,2.753-0.218c4.247-0.789,7.202-4.675,6.832-8.981c-4.373-50.033,8.108-57.243,28.798-69.187l7.277-4.197    l4.188,7.269c1.116,1.93,2.955,3.341,5.103,3.911c0.713,0.193,1.444,0.285,2.174,0.285c1.452,0,2.904-0.378,4.197-1.125    l7.26-4.188l59.031,102.232l-30.695,53.156l-31.878,8.545c-4.474,1.2-7.134,5.8-5.934,10.282l8.31,31.031l-56.866,98.514    c-4.7,8.158-1.897,18.617,6.253,23.325l14.034,8.1c2.627,1.519,5.557,2.291,8.511,2.291c1.486,0,2.98-0.193,4.449-0.588    c4.407-1.183,8.091-4.012,10.366-7.957l56.874-98.497l31.039-8.318c4.474-1.2,7.126-5.8,5.934-10.282l-8.091-30.2l16.77-29.041    l16.77,29.041l-8.091,30.2c-1.192,4.482,1.461,9.082,5.934,10.282l31.031,8.318l56.882,98.489    c2.275,3.953,5.959,6.782,10.366,7.965c1.469,0.395,2.963,0.588,4.44,0.588c2.963,0,5.892-0.772,8.519-2.291l14.034-8.1    c8.15-4.709,10.953-15.167,6.253-23.334l-56.874-98.505l8.318-31.031c1.192-4.482-1.461-9.082-5.934-10.282l-31.887-8.545    l-30.686-53.156l59.031-102.232l7.26,4.188c1.293,0.747,2.736,1.125,4.197,1.125c0.73,0,1.46-0.092,2.174-0.285    c2.149-0.571,3.987-1.981,5.095-3.911l4.197-7.269l7.277,4.197c20.681,11.944,33.171,19.154,28.798,69.187    c-0.378,4.306,2.585,8.192,6.832,8.981c0.445,0.084,1.377,0.218,2.753,0.218c8.805,0,35.806-5.439,69.825-64.369    C517.776,110.293,499.873,86.044,497.708,83.501z M99.682,48.316l7.949-29.646l29.646,7.949l-7.949,29.646L99.682,48.316z     M177.229,139.234l-14.537,8.393l-0.008,0.008l-7.252,4.188l-18.885-32.709l-14.689-25.441c0,0,0-0.008-0.008-0.008l-4.188-7.26    l43.604-25.18l17.609,30.493l20.161,34.925L177.229,139.234z M134.859,486.915c-0.067,0.117-0.269,0.185-0.394,0.101    l-14.143-8.503l54.406-94.242l14.546,8.393L134.859,486.915z M285.127,351.512l23.065-13.312l22.922,6.144l-6.136,22.931    l-11.533,6.656l-11.533,6.656l-22.922-6.144L285.127,351.512z M264.043,264.397c0,0-0.008,0-0.008,0.008l-19.38,33.574    c-0.008,0-0.008,0.008-0.008,0.008l-21.261,36.83l-14.537-8.393l49.286-85.37l1.058-1.83v-0.008l51.754-89.642l14.537,8.402    L264.043,264.397z M381.987,93.666v0.008l-14.689,25.441l-18.885,32.709l-7.252-4.188l-0.008-0.008l-14.546-8.393l-21.798-12.59    l20.161-34.925l17.609-30.493l43.604,25.18L381.987,93.666z M374.509,56.264l-7.94-29.646l29.646-7.949l7.949,29.646    L374.509,56.264z">
        </path>
      </svg>
      </Nav.Link> */}

      <span className="logging-button" style={{ float: 'right', marginRight: -12 + '%' }}>
      <Link to="" onClick={handleLogout} className="text-warning btn btn-lg btn-outline-black link-header">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-power" viewBox="0 0 16 16">
          <path d="M7.5 1v7h1V1h-1z"/>
          <path d="M3 8.812a4.999 4.999 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812z"/>
        </svg>
      </Link>
      </span>
    <Navbar.Toggle type="button" aria-controls="basic-navbar-nav" className="" style={{ color: 'purple' }} onClick={() => setExpanded(!expanded)} />
      </Container>
    </Navbar>
  );
};

export default NavBar;