import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

interface Props {
    ascean?: any;
    deleteAscean?: any;
}

const Delete = ({ ascean, deleteAscean }: Props) => {
    const [deleteModalShow, setDeleteModalShow] = React.useState<boolean>(false)
  return (
    <>
    <Button variant="outline" 
            className="my-2" 
            size="lg" 
            style={{ color: 'red', fontWeight: 400, fontVariant: 'small-caps', fontSize: 25 + 'px' }}
            onClick={() => setDeleteModalShow(true)}
        >Delete {ascean.name}</Button>
    <Modal 
        show={deleteModalShow}
        onHide={() => setDeleteModalShow(false)}
        centered
        aria-labelledby="contained-modal-title-vcenter"
        id="modal-delete"
    >
    <Modal.Body id="modal-delete" className="equipment-modal">
        Do you wish to Delete {ascean.name} ?
        <button 
            className="btn" 
            value={ascean._id} 
            onClick={deleteAscean}
            style={{ color: 'red', fontWeight: 400, fontVariant: 'small-caps', fontSize: 25 + 'px' }}>
                Delete {ascean.name}
        </button>
    </Modal.Body>
    </Modal>
    </>
  )
}

export default Delete