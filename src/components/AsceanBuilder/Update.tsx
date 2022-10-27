import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom'

interface Props {
    ascean?: any;
    NavBar: boolean;
}

const Update = ({ ascean, NavBar }: Props) => {
    const [updateModalShow, setUpdateModalShow] = React.useState<boolean>(false)
  return (
    <>
    {
        NavBar
        ? <Button variant="outline" 
        className="my-1 text-info" 
        size="lg" 
        style={{ fontWeight: 400, fontVariant: 'small-caps' }}
        >{ascean.name}</Button>

        : <Button variant="outline" 
        className="my-2" 
        size="lg" 
        style={{ color: 'blue', fontWeight: 400, fontVariant: 'small-caps', fontSize: 25 + 'px' }}
        onClick={() => setUpdateModalShow(true)}
        >Update {ascean.name}</Button>
        
    }
    
    <Modal 
        show={updateModalShow}
        onHide={() => setUpdateModalShow(false)}
        centered
        
        aria-labelledby="contained-modal-title-vcenter"
        id="modal-update"
        >
            {/* <Modal.Header closeButton>
                <Modal.Title >
                Weapons & Spells
                </Modal.Title>
            </Modal.Header> */}
    <Modal.Body id="modal-update" className="equipment-modal">
        Do you wish to Update {ascean.name} ?
        <Link to={{ pathname: `/edit/${ascean._id}` }}>
        <button 
        className="btn" 
        value={ascean._id} 
        style={{ color: 'blue', fontWeight: 400, fontVariant: 'small-caps', fontSize: 25 + 'px' }}>
            Update {ascean.name}
        </button>
            </Link>
    </Modal.Body>
    </Modal>
    </>
  )
}

export default Update