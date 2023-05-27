import React from 'react';
import Form from 'react-bootstrap/Form';

interface AccordionProps {
    accordionState: string;
    accordionChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const AccordionForm = ({ accordionState, accordionChange }: AccordionProps) => { 
    return (
        <>
        <p style={{ color: '#fdf6d8', textAlign: 'center' }}>
        Character View Scale
        </p>
        <Form.Select value={accordionState} onChange={accordionChange}>
            <option>Tight</option>
            <option>Lean</option>
            <option>Half</option>
            <option>Full</option>
        </Form.Select>
        </>
    );
};

export default AccordionForm;