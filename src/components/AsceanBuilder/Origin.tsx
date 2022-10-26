import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import OriginsCard from '../OriginsCard/OriginsCard'

interface Props {
    asceanState?: any;
    setAsceanState?: any;
    originModalShow?: boolean;
    setOriginModalShow?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Origin = ({ asceanState, setAsceanState, originModalShow, setOriginModalShow }: Props) => {
    const [originState, setOriginState] = useState<any[]>([
        {
            name: "Ashtre",
            bio: "A hard people from an inhospitable land to the East in the Astralands, many are ashen from tempest weather. Martial and religious--monotheistic in nature to Astra, the Lightning Ancient, their governance forms of their leaders in a tetrarchy shored by commerce and law. Laconic and mistrusting, few outsiders get to know these folk, drawing further tension from being the only civilization not to collapse during the Shattering in the War of the Ancients a millenia prior.",
            index: 'ashtre',
            bonus: '+2 STR, +2 AGI, +3% Crit, +3% Phys Dam',
            imgUrl: '/images/Ashtre-Man.jpg'
        },
        {
            name: "Fyers",
            bio: "Fair folk from the Firelands, these people enjoy mild weather and bountiful harvest, leaving themselves to leisure time in pursuit of broad body and mind, often advancing both fields in competition and technology. The Fyers Lord Protectorate Theogeni Spiras, the Ghost Hawk of Greyrock, came to govern the land, siezing power after civil warring against House Ashfyre whose lineage held the title for centuries. To note, also a former Ascean in 130 AE.",
            index: 'fyers',
            bonus: '+2 ACH, +2 KYO, +3% Mag Pen, +3% Phys Pen',
            imgUrl: '/images/Fyers-Woman.jpg'
        },
        {
            name: "Li'ivi",
            bio: "In the centralands of Licivitas live a keen and practical people whose ambition and drive has helped economically enhance and ensnare the other cultures. Whether bartering or brokering, peacemaking or warring, a Li'ivi excels. The One Above, Daethos, is founded and worshiped at the Seyr in its oldest city, Lor, and while not a theocracy, heavily leans on its teachings for guidance. Its governance is currently run by a loose-affiliate of city-states. Highest general Evrio Lorian Peroumes, current va'Esai, is waging a 10 years long war in the Northren border against the monstrous Cragore.",
            index: "li'ivi",
            bonus: '+1 STR, +1 AGI, +1 ACH, +1 CAER, +1 KYO, +1% Crit, +1% Roll, -1s Dodge, +1% Phys Dam, +1% Mag Dam, +1% Mag Pen, +1% Phys Pen',
            imgUrl: "/images/Li'ivi-Woman.jpg"
        },
        {
            name: "Notheo",
            bio: "Northren folk inhabiting the west, as it stands the Daethic Kingdom (formerly Achreon). Only kingdom in the land with blessing of the Seyr, Mathyus Caderyn II has reigned for almost 25 years, a former Ascean in 120 AE. Recent warring against their brethren to the east in the Soverains has ceased since the last Ascea in 140 AE, culminating in the marriage of his son and the daughter of a Soverain.",
            index: "noth'eo",
            bonus: '+2 CON, +2 ACH, +3% Phys Dam, +3% Phys Pen, +3% Mag Def',
            imgUrl: '/images/Notheo-Man.jpg'
        },
        {
            name: "Nothos",
            bio: "The Soverain people of the nothren'eas have kept to their own culturally and spiritually, passionately rejecting advances of the Daethic word with blood and bile. As the name states, this tentative collection of Soverains form a coalition in name only, having banded together to stop encroachment of King Caderyn after having seen many short-sighted 'lords' succumbing to the Arctic Fox--as the King came to be known for successfully sieging a tundra stronghold inside a single winter.",
            index: "noth'os",
            bonus: '+2 CON, +2 CAER, +3% Mag Dam, +3% Mag Pen, +3% Phys Def',
            imgUrl: '/images/Nothos-Woman.jpg'
        },
        {
            name: "Quor'eite",
            bio: "Relaxed folk of the southernmost tip of the land, they owed much of their pleasure in life to the hospitable regions affording luxurious living and supply, thus Quor'ei, the Ancient of Earth, garnerning the most appreciation. This became disrupted during the invasion of the Sedyreal post-Sedyren War agianst Licivitas, culminating in the loss of life for many Quor'eite, many losing faith and seeking the word of Daethos as a means to calm their spirit.",
            index: "quor'eite",
            bonus: '+2 AGI, +2 KYO, -3s Dodge, +3% Roll',
            imgUrl: "/images/Quor'eite-Man.jpg"
        },
        {
            name: "Sedyreal",
            bio: "Southron people living in the further temperate and wild jungles that await someone adventurous enough to travel south of Licivitas by land, it lies home to a festive people that find a fluidity to their lives in love of celebration for triumph of life's hardships, and curbing the penchant to show this excitement with love of warfare. Having lost territory to the elements and the Li'ivi in the hard fought double-sided loss in the Sedyrus Mountains, they've moved further south and took their frustrations out on the neighboring Quor'eite, taking over and displacing the peoples to claim full territories.",
            index: 'sedyreal',
            bonus: '+2 STR, +2 CAER, +3% Mag Def, +3% Phys Def',
            imgUrl: '/images/Sedyreal-Man.jpg'
        }
    ])
    function handleOrigin(origin: any) {
        console.log(origin.target.value, '<- the origin value being handled?')
        setAsceanState({
            ...asceanState,
            'origin': origin.target.value,
        })
    }
  return (
    <>
    <div className="actions">
        <h3>Race-Culture Origins</h3>
        <div className="edit-eqp-button">
        <Button variant="outline" 
            className="my-2" 
            size="lg" 
            style={{ color: 'orangered', fontWeight: 400, fontVariant: 'small-caps', fontSize: 25 + 'px' }}
            onClick={() => setOriginModalShow!(true)}
        >Origins</Button>
        <Modal 
            show={originModalShow}
            onHide={() => setOriginModalShow!(false)}
            centered
            
            aria-labelledby="contained-modal-title-vcenter"
            id="modal-weapon"
            >
                {/* <Modal.Header closeButton>
                    <Modal.Title >
                    Weapons & Spells
                    </Modal.Title>
                </Modal.Header> */}
        <Modal.Body id="modal-weapon" className="equipment-modal">
        {originState.map((origin: any, index: any) => {
            return (
                <OriginsCard 
                    origin={origin} 
                    key={origin.index} 
                />
        )})}
        </Modal.Body>
        </Modal>
        
    </div>
    <div className="property-block">
    <Form.Select value={asceanState.origin}  onChange={handleOrigin}>
        <option>Origin Selection Here</option>
        {originState.map((origin: any) => {
            return (
                <option value={origin.name} key={origin.index}>{origin.name}</option>
            )
        })}
    </Form.Select>
    </div>
    </div>
    </>
  )
}

export default Origin