import React, { useEffect, useState, useCallback } from 'react'
import Loading from '../../components/Loading/Loading'; 
import * as messageAPI from '../../utils/messageApi'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
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
        <Form onSubmit={handleSubmit}>
        <InputGroup className="mb-3" id="chat-input" size="lg">
            <Form.Control
            className='stat-block wide'
            name='message'
            placeholder='Warning! There is No Profanity Filter!'
            aria-label="Large"
            value={messageDraft.message}
            onChange={handleChange}
            />
        </InputGroup>
        </Form>
        </>
    )
}

export default FormMessage