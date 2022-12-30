import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import FaithCard from '../FaithCard/FaithCard';

interface Props {
    asceanState: any;
    setAsceanState: React.Dispatch<any>;
    faithModalShow?: boolean;
    setFaithModalShow?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Faith = ({ asceanState, setAsceanState, faithModalShow, setFaithModalShow }: Props) => {
    const adherentID = document.getElementById('adherentID');
    const devotedID = document.getElementById('devotedID'); 
    const [faithState, setFaithState] = useState([
        {
            name: 'Ancients',
            origin: "The Ancients were figures of fantastic might existing before historical recording of time, commanding worshipers of all peoples of this world.          These godlike beings interacted with humans at their leisure, whether distantly ala Achreo of the Wild, or heavily involved in the daily lives of their worshipersers: Ilios of the Sun, and Ma'anre of the Moon. Some time a thousand years past, a great war between the Ancients--heavily involing humans broke out and wiped out the majority of both. It's unknown at this time who remains, and in what form they may be existing.",
            worshipers: 'adherent',
            iconography: '/images/achreo-rising.png'
        },
        {
            name: 'Daethos',
            origin: "Founded by Laetrois Ath'Shaorah, mythic general during the War of the Ancients. Of unknown origin, Laetrois and his army of soliders descended from obscure lands in the nothren'eas, seen as a force entering in the later stages of the war against both armies led by Ilios and Ma'anre, respectively. Seen as saving humanity, the death of the general during the aftermath of the war led to his faithful companion, the Good Lorian to establish the Seyr in the City of Lor, later codifying the oratory nature of its principles in the Daethica.",
            worshipers: 'devoted',
            iconography: '/images/daethos-forming.png'
        }
    ])
    function handleFaith(faith: any) {
        console.log(faith.target.value, '<- the faith value being handled?')
        setAsceanState({
            ...asceanState,
            'faith': faith.target.value,
        })
    }

    

  return (
    <><div className="actions">
    <h3>Faith</h3>
    <div className="edit-eqp-button">
    {faithState.map((faith: any, index: number) => {
            return (
                <FaithCard 
                    faith={faith} 
                    key={index} 
                />
        )})}
    </div>
    <div className="property-block">
    <Form.Select value={asceanState.faith} onChange={handleFaith}>
        <option>None</option>
        {faithState.map((faith: any, index: number) => {
            return (
                <option value={faith.worshipers} key={index}>{faith.name}</option>
            )
        })}
    </Form.Select>
    </div>



    </div>
</>
  )
}

export default Faith