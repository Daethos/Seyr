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
        /><br />
        <p>The Ancients were figures of fantastic might existing before historical recording of time, commanding worship of all peoples of this world. 
            These godlike beings interacted with humans at their leisure, whether distantly ala Achreo of the Wild, or heavily involved in the daily lives
            of their worshipers: Ilios of the Sun, and Ma'anre of the Moon. Some time a thousand years past, a great war between the Ancients--heavily involing
            humans broke out and wiped out the majority of both. It's unknown at this time who remains, and in what form they may be existing. </p>
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
        /><br />
        <p>Founded by Laetrois Ath'Shaorah, mythic general during the War of the Ancients. Of unknown origin, Laetrois and his army of soliders descended from
            obscure lands in the nothren'eas, seen as a force entering in the later stages of the war against both armies led by Ilios and Ma'anre, respectively.
            Seen as saving humanity, the death of the general during the aftermath of the war led to his faithful companion, the Good Lorian to establish
            the Seyr in the City of Lor, later codifying the oratory nature of its principles in the Daethica.
        </p>
    </div>
</>
  )
}

export default Faith