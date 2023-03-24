import { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

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
  }
  return (
    <>
    <Button variant="outline" 
            className="" 
            style={hardcoreStyle}
            onClick={() => setAsceaModalShow(true)}
        ><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 32 32">
        <path d="M11.868 23.416l17.041-17.041 2.167-5.432-5.432 2.167-17.041 17.041zM3.036 19.562l0-0-0-0zM5.703 16.895l-2.667 2.667 3.73 3.73-5.878 5.878 1.932 1.932 5.878-5.878 3.733 3.733 2.667-2.667c-3.934-2.271-7.149-5.505-9.395-9.395zM9.052 12.062l3.774 3.496 2.361-2.361-1.97-1.825 1.943-1.799-13.913-8.336 9.746 9.028zM22.964 20.4l-3.947-3.657-2.361 2.361 2.297 2.128-1.81 1.676 13.913 8.336-9.9-9.171z"></path>
        </svg></Button>
    <Modal 
        show={asceaModalShow}
        onHide={() => setAsceaModalShow(false)}
        centered
        aria-labelledby="contained-modal-title-vcenter"
        id="modal-delete"
    >
    <Modal.Body id="modal-delete" className="equipment-modal" style={{ color: "gold" }}>
        Do you wish to enter the Ascea with {ascean.name} ?
        <Nav.Link as={NavLink} to={'/Hardcore/' + ascean._id}
            style={{ color: 'gold' }} 
            className='btn btn-lg btn-outline-black mb-1 update-links'>
            <h3><>Ascea </>
            <img 
            src={process.env.PUBLIC_URL + '/images/' + ascean.origin + '-' + ascean.sex + '.jpg'} 
            alt={ascean.origin + ascean.sex} 
            style={{ width: 100 + 'px', height: 100 + 'px', borderRadius: 50 + '%', border: 2 + 'px solid purple' }}
            /> 
            <> {ascean.name}</>
            </h3>
        </Nav.Link>
    </Modal.Body>
    </Modal>
    </>
  );
};

export default Ascea;