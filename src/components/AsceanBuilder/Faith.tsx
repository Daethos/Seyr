import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import FormCheck from 'react-bootstrap/FormCheck'

interface Props {
    asceanState: any;
    setAsceanState: React.Dispatch<any>;
}

const Faith = ({ asceanState, setAsceanState }: Props) => {
    const adherentID = document.getElementById('adherentID');
    const devotedID = document.getElementById('devotedID'); 
    function handleFaith(e: { target: { name: any; value: any; checked: boolean; }; }) {
        console.log(e.target.name, '(', e.target.value, ')')
        console.log(e.target.checked, '<- Checked?')
        setAsceanState({
            ...asceanState,
            [e.target.name]: e.target.value,
        })
        if (e.target.value === 'adherent' && e.target.checked === true) {
            devotedID!.style.display = 'none';
            setAsceanState({
                ...asceanState,
                [e.target.name]: e.target.value,
            })
        }
        if (e.target.value === 'adherent' && e.target.checked === false) {
            devotedID!.style.display = 'inline-block';
            setAsceanState({
                ...asceanState,
                [e.target.name]: 'none',
            })
        }
        if (e.target.value === 'devoted' && e.target.checked === true) {
            adherentID!.style.display = 'none';
            setAsceanState({
                ...asceanState,
                [e.target.name]: e.target.value,
            })
        }
        if (e.target.value === 'devoted' && e.target.checked === false) {
            adherentID!.style.display = 'inline-block';
            setAsceanState({
                ...asceanState,
                [e.target.name]: 'none',
            })
        }
        console.log(asceanState)
    }
  return (
    <><
        div className="actions">
    <h3>Faith</h3>
    </div>
    <div className="property-line first">
        <h4>Adherence</h4>
        <p id="adherence"> Worshiper of the Ancients{' '}</p>
        <FormCheck.Input 
            aria-describedby='adherence' 
            isValid={asceanState.adherent}
            name="faith"
            id="adherentID" 
            value='adherent' 
            onChange={handleFaith}
        />
    </div>
    <div className="property-line first">
        <h4>Devotion</h4>
        <p> Worshiper of Daethos{' '}</p>
        <FormCheck.Input
            aria-describedby='devoted' 
            isValid={asceanState.devoted}
            name="faith"
            id="devotedID" 
            value='devoted' 
            onChange={handleFaith} 
        />
    </div>
</>
  )
}

export default Faith