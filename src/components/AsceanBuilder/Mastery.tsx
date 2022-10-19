import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

interface Props {
  asceanState?: any;
  setAsceanState?: any;
}

const Mastery = ({ asceanState, setAsceanState }: Props) => {
  const [masteryState, setMasteryState] = useState<any[]>([
    {
      name: 'Constitution'
    },
    {
      name: 'Strength'
    },
    {
      name: 'Agility'
    },
    {
      name: 'Achre'
    },
    {
      name: 'Caeren'
    },
    {
      name: 'Kyosir'
    },
  ])

  function handleMastery(origin: any) {
    console.log(origin.target.value, '<- the origin value being handled?')
    setAsceanState({
        ...asceanState,
        'mastery': origin.target.value,
    })
}
  return (
    <>
    <div className="actions">
      <h3>Attribute Mastery</h3>
      <Form.Select value={asceanState.mastery} onChange={handleMastery} className="mt-4">
        <option>Origin Selection Here</option>
          {masteryState.map((mastery: any) => {
              return (
                  <option value={mastery.name}>{mastery.name}</option>
              )
          })}
      </Form.Select>
    </div>
    </>
  )
}

export default Mastery