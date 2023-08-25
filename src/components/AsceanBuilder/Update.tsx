import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

interface Props {
    ascean?: any;
    symbol: JSX.Element;
};

const Update = ({ ascean, symbol }: Props) => {
    const [updateModalShow, setUpdateModalShow] = useState<boolean>(false);
    return (
        <>
        <Button variant="outline" style={{ color: 'blueviolet', marginLeft: '-8px', float: 'right' }} className='' onClick={() => setUpdateModalShow(true)}>{symbol}</Button>
        <Modal show={updateModalShow} onHide={() => setUpdateModalShow(false)} centered aria-labelledby="contained-modal-title-vcenter" id="modal-update">
        <Modal.Body id="modal-update" className="equipment-modal" style={{ color: "gold" }}>
            Do you wish to Update {ascean.name} ?
            <Link to={{ pathname: `/edit/${ascean._id}` }}>
            <button 
            className="btn" 
            value={ascean._id} 
            style={{ color: '#fdf6d8', fontWeight: 400, fontVariant: 'small-caps', fontSize: '25px' }}>
                <h3><>Edit </>
                <img 
                src={process.env.PUBLIC_URL + '/images/' + ascean.origin + '-' + ascean.sex + '.jpg'} 
                alt={ascean.origin + ascean.sex} 
                style={{ width: '100px', height: '100px', borderRadius: '50%', border: '2px solid purple' }}
                /> 
                <> {ascean.name}</>
                </h3>
            </button>
                </Link>
        </Modal.Body>
        </Modal>
        </>
    );
};

export default Update;