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

const Ascea = ({ ascean }: Props) => {
  const [asceaModalShow, setAsceaModalShow] = useState<boolean>(false);
  const hardcoreStyle = {
      color: "red",
      fontWeight: 600,
      marginLeft: "1%",
      fontFamily: "Cinzel",
      fontSize: "1.5rem",
      display: "inline-block",
  };
  return (
    <>
    <Button variant="outline" style={hardcoreStyle} onClick={() => setAsceaModalShow(true)}>
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 32 32">
        <path d="M11.868 23.416l17.041-17.041 2.167-5.432-5.432 2.167-17.041 17.041zM3.036 19.562l0-0-0-0zM5.703 16.895l-2.667 2.667 3.73 3.73-5.878 5.878 1.932 1.932 5.878-5.878 3.733 3.733 2.667-2.667c-3.934-2.271-7.149-5.505-9.395-9.395zM9.052 12.062l3.774 3.496 2.361-2.361-1.97-1.825 1.943-1.799-13.913-8.336 9.746 9.028zM22.964 20.4l-3.947-3.657-2.361 2.361 2.297 2.128-1.81 1.676 13.913 8.336-9.9-9.171z"></path>
      </svg></Button>
    <Modal show={asceaModalShow} style={{ fontFamily: "Cinzel" }} onHide={() => setAsceaModalShow(false)} centered aria-labelledby="contained-modal-title-vcenter" id="modal-delete">
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
    <Modal.Body id="modal-delete" className="equipment-modal" style={{ color: "gold" }}>
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
      <Nav.Link as={NavLink} to={'/Hardcore/' + ascean._id}
          style={{ color: ascean.hardcore ? 'red' : 'blue', fontSize: "32px", fontWeight: 900, textShadow: "1px 1px 1px purple" }} 
          className='btn btn-lg btn-outline-black mb-1 update-links'>
          Play the Ascea's Arena Instantly as {ascean.name}
      </Nav.Link>
    </Modal.Body>
    </Modal>
    </>
  );
};

export default Ascea;