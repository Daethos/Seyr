import { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import AsceanImageCard from '../AsceanImageCard/AsceanImageCard';
import AsceanAttributeCompiler from '../AsceanAttributeCompiler/AsceanAttributeCompiler';

interface Props {
    ascean?: any;
};

const Play = ({ ascean }: Props) => {
    const [playModalShow, setPlayModalShow] = useState<boolean>(false);

    return (
        <>
        <Button variant="outline" 
                className="" 
                style={{ color: ascean?.hardcore ? 'red' : 'blue', marginLeft: -14 + 'px', fontWeight: 600 }}
                onClick={() => setPlayModalShow(true)}
            ><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 479.276 479.276">
            <path d="M394.053,365.606l-17.806-28.036l17.278-19.482c1.297-1.463,1.721-3.504,1.112-5.362s-2.158-3.253-4.069-3.664  l-90.554-19.486l30.577-6.753c0.822-0.181,1.605-0.535,2.277-1.077c1.292-1.044,2.044-2.617,2.044-4.279v-54.117  c0-2.592-1.809-4.832-4.343-5.377l-48.174-10.366V165.75h7.132c9.997,0,18.13-8.133,18.13-18.13s-8.133-18.13-18.13-18.13h-21.765  V29.428c6.737-1.416,11.813-7.402,11.813-14.554C279.574,6.672,272.902,0,264.7,0h-50.126C206.373,0,199.7,6.672,199.7,14.874  c0,7.152,5.075,13.138,11.813,14.554v100.061h-21.765c-9.997,0-18.13,8.133-18.13,18.13s8.133,18.13,18.13,18.13h7.127v23.454  L91.023,166.426c-2.167-0.468-4.403,0.414-5.67,2.233c-1.267,1.819-1.318,4.221-0.129,6.092l17.806,28.036l-17.278,19.483  c-1.297,1.463-1.721,3.504-1.112,5.362s2.158,3.253,4.069,3.664l90.554,19.486l-30.582,6.742c-0.821,0.181-1.601,0.546-2.272,1.088  c-1.292,1.044-2.044,2.617-2.044,4.279v54.117c0,2.592,1.809,4.832,4.343,5.377l48.167,10.365v84.676  c0,1.079,0.317,2.134,0.912,3.034l37.26,56.35c1.019,1.54,2.742,2.466,4.588,2.466s3.569-0.926,4.588-2.466l37.26-56.35  c0.595-0.9,0.912-1.955,0.912-3.034v-66.274l105.858,22.779c0.386,0.083,0.773,0.124,1.158,0.124c1.774,0,3.471-0.861,4.512-2.357  C395.191,369.879,395.242,367.478,394.053,365.606z M196.871,267.38l-21.157-4.553l21.157-4.658V267.38z M207.871,256.939  l26.264,5.652v12.809l-26.264-5.652V256.939z M245.135,264.957l26.256,5.65v12.809l-26.256-5.65V264.957z M282.391,272.974  l21.171,4.556l-21.171,4.664V272.974z M271.395,205.239l-26.26-5.651V165.75h26.26V205.239z M256.762,85.118h-34.249V74.119h34.249  V85.118z M256.762,63.119h-34.249V52.12h34.249V63.119z M256.762,41.12h-34.249V29.748h34.249V41.12z M222.513,96.118h34.249v10.999  h-34.249V96.118z M214.574,11H264.7c2.136,0,3.874,1.738,3.874,3.874s-1.738,3.874-3.874,3.874h-2.438h-45.249h-2.438  c-2.136,0-3.874-1.738-3.874-3.874S212.438,11,214.574,11z M222.513,118.117h34.249v11.372h-34.249V118.117z M182.618,147.62  c0-3.932,3.198-7.13,7.13-7.13h99.779c3.932,0,7.13,3.199,7.13,7.13s-3.199,7.13-7.13,7.13h-99.779  C185.816,154.75,182.618,151.551,182.618,147.62z M207.875,165.75h26.26v31.472l-26.26-5.651V165.75z M114.009,206.986  c1.628-1.835,1.843-4.527,0.528-6.598l-12.985-20.445l222.36,47.848v42.865l-223.683-48.133L114.009,206.986z M207.875,335.117  l26.26,5.651v114.719l-26.26-39.714V335.117z M271.395,415.772l-26.26,39.714V343.135l26.26,5.651V415.772z M155.365,312.566  v-42.865l223.682,48.133l-13.779,15.537c-1.628,1.835-1.843,4.527-0.528,6.598l12.985,20.445L155.365,312.566z"></path>
        </svg></Button>
        <Modal 
            show={playModalShow}
            onHide={() => setPlayModalShow(false)}
            centered
            aria-labelledby="contained-modal-title-vcenter"
            id="modal-delete"
            style={{ fontFamily: "Cinzel" }}
        >
        <Modal.Header style={{ fontSize: "28px", color: "gold" }}>
           {ascean.name}
           <span style={{ float: "right" }}>
            <img
            className='dialog-picture' 
            src={process.env.PUBLIC_URL + '/images/' + ascean.origin + '-' + ascean.sex + '.jpg'} 
            alt={ascean.origin + ascean.sex} 
            style={{ borderRadius: 50 + '%', border: '2px solid gold', boxShadow: '0 0 10px gold' }}
            /> 
            </span>
        </Modal.Header>
        <Modal.Body id="modal-delete" className="equipment-modal" style={{ color: "#fdf6d8" }}>
            <div className='creature-heading'>
                <h2 style={{ fontSize: "18px", color: "gold" }}>{ascean.description}</h2>
            </div>
            Level: {ascean.level}<br />
            Experience: {ascean.experience} / {ascean.level * 1000}<br />
            Mastery: {ascean.mastery}<br />
            <AsceanAttributeCompiler ascean={ascean} />
            <AsceanImageCard 
                weapon_one={ascean.weapon_one}
                weapon_two={ascean.weapon_two}
                weapon_three={ascean.weapon_three}
                shield={ascean.shield}
                helmet={ascean.helmet}
                chest={ascean.chest}
                legs={ascean.legs}
                amulet={ascean.amulet}
                ring_one={ascean.ring_one}
                ring_two={ascean.ring_two}
                trinket={ascean.trinket}
                key={ascean._id} 
            />
        <Nav.Link as={NavLink} to={'/Game/Solo/' + ascean._id} style={{ color: ascean.hardcore ? 'red' : 'blue', fontSize: "32px", fontWeight: 900, textShadow: "1px 1px 1px purple" }} className='btn btn-lg btn-outline-black mb-1 update-links'>
            Play as {ascean.name}
        </Nav.Link>
        </Modal.Body>
        </Modal>
        </>
    );
};

export default Play;