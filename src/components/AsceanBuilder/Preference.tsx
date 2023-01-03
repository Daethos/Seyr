import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';

interface Props {
  asceanState?: any;
  setAsceanState?: React.Dispatch<any>;
}

const Preference = ({ asceanState, setAsceanState }: Props) => {
  const [preferenceState, setPreferenceState] = useState<any[]>([
    {
      name: 'Plate-Mail'
    },
    {
      name: 'Chain-Mail'
    },
    {
      name: 'Leather-Mail'
    },
    {
      name: 'Leather-Cloth'
    },
  ]);

  function handlePreference(origin: any) {
    console.log(origin.target.value, '<- the preference value being handled?')
    setAsceanState!({
        ...asceanState,
        'preference': origin.target.value,
    })
}
  return (
    <>
    <div className="actions">
      <h3>Armor Preference</h3>
      <Form.Select value={asceanState.preference} onChange={handlePreference} className="mt-4">
        <option>Armor Selections Here</option>
          {preferenceState.map((preference: any, index: number) => {
              return (
                  <option value={preference.name} key={index}>{preference.name}</option>
              )
          })}
      </Form.Select>
    </div>
    </>
  )
}

export default Preference