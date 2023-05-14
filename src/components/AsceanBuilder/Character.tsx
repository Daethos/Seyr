import React from 'react'
import Form from 'react-bootstrap/Form';

interface Props {
    asceanState: any;
    setAsceanState: React.Dispatch<any>;
};

const Character = ({ asceanState, setAsceanState }: Props) => {
    function handleChange(e: { target: { name: any; value: any; }; }) {
        console.log('Name:', e.target.name, 'Value:', e.target.value)
        setAsceanState({
            ...asceanState,
            [e.target.name]: e.target.value,
        })
    }
    return (
        <>
        <div className="actions">
            <h3>Character</h3>
        </div>
        <div className="top-stats">
            <div className="property-line first">
            <h4>Name  
            <Form.Control 
                name="name" 
                placeholder="Enter Name Here"
                value={asceanState.name}
                onChange={handleChange} 
            />
            </h4>
            </div>
            <div className="property-line last">
            <h4>Description 
            <Form.Control 
                name="description" 
                placeholder="What are they like?"
                value={asceanState.description}
                onChange={handleChange} 
            />
            </h4>
            </div>
        </div>
        </>
    );
};

export default Character;