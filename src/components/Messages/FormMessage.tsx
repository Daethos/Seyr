import React, { useEffect, useState, useCallback } from 'react'
import Loading from '../../components/Loading/Loading'; 
import * as messageAPI from '../../utils/messageApi'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import InputGroup from 'react-bootstrap/InputGroup';

interface Props {
    user: any;
    friendProfile: any;
    friendID: string | undefined;
    handleChange: any;
    handleSubmit: any
    messageDraft: any;
}

const FormMessage = ({ user, friendProfile, friendID, handleChange, handleSubmit, messageDraft }: Props) => {
      
    return (
        <>
        
        <Form onSubmit={handleSubmit} id="chat-form" className=''>
        <InputGroup className="" id="chat-input" size="lg">
            {/* <FloatingLabel label={`Text ${friendProfile.username.charAt(0).toUpperCase()} ${friendProfile.username.slice(1)}`}> */}

            <Form.Control
            as="textarea"
            style={{ maxHeight: 50 + 'px' }}
            className='stat-block wide'
            name='message'
            placeholder={'Text ' + friendProfile.username.charAt(0).toUpperCase() + friendProfile.username.slice(1) + '!'}
            aria-label="Large"
            value={messageDraft.message}
            onChange={handleChange}
            />
            {/* </FloatingLabel> */}
        <Button type="submit" variant="" className="text-success">Submit</Button>
        </InputGroup>
        </Form>
        </>
    )
}

export default FormMessage