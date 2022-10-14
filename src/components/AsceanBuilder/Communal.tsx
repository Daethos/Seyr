import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form';

interface Props {
  editState: any;
  setEditState: any;
}

const Communal = ({ editState, setEditState }: Props) => {
  function handleVisibility(e: { target: { name: any; value: any; }; }) {
    const { name, value }  = e.target;
    console.log(name, value, '<- Name and Value in Visibility / Shareable Handler')
    editState[name] = value;
    setEditState({...editState})
    console.log(editState)
  }
  return (
    <> 
    <div className='actions'>
    <h3>Communal Visibility</h3></div>
        <Form.Select onChange={handleVisibility} name="visibility" className="my-3">
            <option value={editState.visibility}>Select Preference</option>
            <option value="public" label="Public">public</option>
            <option value="private" label="Private">private</option>
        </Form.Select>
        <div className='actions'>
    <h3>Communal Sharibility</h3></div>
        <Form.Select onChange={handleVisibility} name="shareable" className="my-3">
            <option value={editState?.shareable}>Select Preference</option>
            <option value="public" label="Public">public</option>
            <option value="private" label="Private">private</option>
        </Form.Select>
        </>
  )
}

export default Communal