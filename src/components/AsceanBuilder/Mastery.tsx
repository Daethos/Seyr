import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';

interface Props {
  asceanState?: any;
  setAsceanState?: React.Dispatch<any>;
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
    setAsceanState!({
        ...asceanState,
        'mastery': origin.target.value,
    })
}
  return (
    <>
    <div className="actions">
      <h3>Attribute Mastery</h3>
      <Form.Select value={asceanState.mastery} onChange={handleMastery} className="mt-4">
        <option>Armor Selection Here</option>
          {masteryState.map((mastery: any, index: number) => {
              return (
                  <option value={mastery.name} key={index}>{mastery.name}</option>
              )
          })}
      </Form.Select>
    </div>
    </>
  )
}

export default Mastery