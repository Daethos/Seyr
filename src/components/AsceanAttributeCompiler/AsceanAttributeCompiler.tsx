import { useEffect, useState } from 'react'
import * as asceanAPI from '../../utils/asceanApi'
import Loading from '../Loading/Loading'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

interface Props {
    ascean: any;
}

const AsceanAttributeCompiler = ({ ascean }: Props) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [attributes, setAttributes] = useState<any>([])

    useEffect(() => {
        asceanAttributeCompiler()
      }, [])

    async function asceanAttributeCompiler() {
        setLoading(true)
        try {
            const response = await asceanAPI.getAsceanStats(ascean._id)
            setAttributes(response.data.data.attributes)
            setLoading(false)
        } catch (err: any) {
            setLoading(false)
            console.log(err.message, 'Error Compiling Ascean Stats')
        }
    }

    const constitutionPopover = (
        <Popover id='popover'>
            <Popover.Header id='popover-header'>Constitution</Popover.Header>
            <Popover.Body id='popover-body'>
            <p style={{ fontStyle: 'italic' }}>
                The determination of several factors within combat is based on your Constitution. Overall your health is most weighted by your Constitution, 
                in addition toward being able to augment higher thresholds of endurance, like the quality of your critical attacks and ability to absord damage.
            </p>
            <p> Increases Health, Defense, Posturing, Crit Damage, its Mastery Pervasive</p>
            </Popover.Body>
        </Popover>
    )
    const strengthPopover = (
        <Popover id='popover'>
            <Popover.Header id='popover-header'>Strength</Popover.Header>
            <Popover.Body id='popover-body'>
            <p style={{ fontStyle: 'italic' }}>
                The physical power you possess, weighing heavily into your abliity to deal and receive physical damage with brutality.
            </p>
            <p> Increases Crit Damage, Physical Damage, Posturing, Affects Dual-Wielding Two-Hand Weapons</p>
            </Popover.Body>
        </Popover>
    )
    const agilityPopover = (
        <Popover id='popover'>
            <Popover.Header id='popover-header'>Agility</Popover.Header>
            <Popover.Body id='popover-body'>
            <p style={{ fontStyle: 'italic' }}>
                The physical clarity you possess, weighing heavily into your abliity to mitigate and perform physical damage with finesse.
            </p>
            <p> Increases Crit Damage, Dodge, Phys Damage, Roll, Affects Dual-Wielding One-Hand Weapons</p>
            </Popover.Body>
        </Popover>
    )
    const achrePopover = (
        <Popover id='popover'>
            <Popover.Header id='popover-header'>Achre</Popover.Header>
            <Popover.Body id='popover-body'>
            <p style={{ fontStyle: 'italic' }}>
            Of Achreo, the Wild Ancient.<br /><br />
            Synonymous with being an Arbiter, they are measured by the quality of their Achre: discernment, poise, sagacity, and existence above error.</p>
            <br /><br />
            <p>Increases Crit Change, Dodge, Roll, Spell Damage, Affects Dual-Wielding One-Hand Spells</p>
            </Popover.Body>
        </Popover>
    )
    const caerenPopover = (
        <Popover id='popover'>
            <Popover.Header id='popover-header'>Caeren</Popover.Header>
            <Popover.Body id='popover-body'>
            <p style={{ fontStyle: 'italic' }}>
            Of Cambire, the Ancient of Potential, lingering essence and manifestation.<br /><br />
            An idealized person or thing. A specter or phantom. Inspired from Ancient Greek's Eidolon.<br />
            <br /> The Caer (Informal, Colloquial): Synonymous to 'the will.'
            </p>
            <br /><br />
            <p>Increases Crit Damage, Defense, Health, Spell Damage, Affects Dual-Wielding Two-Hand Spells</p>
            </Popover.Body>
        </Popover>
    )
    const kyosirPopover = (
        <Popover id='popover'>
            <Popover.Header id='popover-header'>Kyosir</Popover.Header>
            <Popover.Body id='popover-body'>
            <p style={{ fontStyle: 'italic' }}>
            Compulsion concocted through the Gold Veins of Kyrisos mixed with blood and phlegm of Chiomyr, Ancient of Humor.
            A charisma that warps those regardless of their caer, capable of quelling the most quality strikes, granting a sure smile shearing shields.
            </p>
            <br /><br />
            <p>Increases Myriad Defenses, Penetration, its Mastery Pervasive</p>
            </Popover.Body>
        </Popover>
    )

    if (loading) {
        return (
            <Loading NavBar={true} />
        )
    }
    return (
        <>
        {/* <div className="actions">
            <h3>Attributes</h3>
        </div> */}
        <div className="abilities">
        <div className="ability-strength">
            <OverlayTrigger trigger='click' rootClose placement='auto-start' overlay={constitutionPopover}>
            <h4>CON</h4>
            </OverlayTrigger>
                <p className="mt-2" id="con-box">{attributes.totalConstitution}<br /> ({attributes.rawConstitution} + {attributes.equipConstitution})</p>
                <p className="" id="">[ {attributes.totalConstitution < 10 ? '- ' + attributes.constitutionMod : '+ ' + attributes.constitutionMod} ]</p>
        </div>
        <div className="ability-dexterity">
            <OverlayTrigger trigger='click' rootClose placement='auto-start' overlay={strengthPopover}>
            <h4>STR</h4>
            </OverlayTrigger>    
            <p className="mt-2" id="str-box">{attributes.totalStrength}<br /> ({attributes.rawStrength} + {attributes.equipStrength})</p>
            <p className="" id="">[ {attributes.totalStrength < 10 ? '- ' + attributes.strengthMod : '+ ' + attributes.strengthMod} ]</p>
        </div>
        <div className="ability-constitution">
            <OverlayTrigger trigger='click' rootClose placement='auto-start' overlay={agilityPopover}>
            <h4>AGI</h4>
            </OverlayTrigger>
            <p className="mt-2" id="">{attributes.totalAgility}<br /> ({attributes.rawAgility} + {attributes.equipAgility})</p>
            <p className="" id="">[ {attributes.totalAgility < 10 ? '- ' + attributes.agilityMod : '+ ' + attributes.agilityMod} ]</p>
            
        </div>
        <div className="ability-intelligence">
            <OverlayTrigger trigger='click' rootClose placement='auto-start' overlay={achrePopover}>
            <h4>ACH</h4>
             </OverlayTrigger>
            <p className="mt-2" id="ach-box">{attributes.totalAchre}<br /> ({attributes.rawAchre} + {attributes.equipAchre})</p>
            <p className="" id="">[ {attributes.totalAchre < 10 ? '- ' + attributes.achreMod : '+ ' + attributes.achreMod} ]</p>
            
        </div>
        <div className="ability-wisdom">
            <OverlayTrigger trigger='click' rootClose placement='auto-start' overlay={caerenPopover}>
            <h4>CAER</h4>
            </OverlayTrigger>
            <p className="mt-2" id="caer-box">{attributes.totalCaeren}<br /> ({attributes.rawCaeren} + {attributes.equipCaeren})</p>
            <p className="" id="">[ {attributes.totalCaeren < 10 ? '- ' + attributes.caerenMod : '+ ' + attributes.caerenMod} ]</p>
        </div>
        <div className="ability-wisdom">
            <OverlayTrigger trigger='click' rootClose placement='auto-start' overlay={kyosirPopover}>
            <h4>KYO</h4>
            </OverlayTrigger>
            <p className="mt-2" id="kyo-box">{attributes.totalKyosir}<br /> ({attributes.rawKyosir} + {attributes.equipKyosir})</p>
            <p className="" id="">[ {attributes.totalKyosir < 10 ? '- ' + attributes.kyosirMod : '+ ' + attributes.kyosirMod} ]</p>
        </div>
        </div>
        </>
    )
}

export default AsceanAttributeCompiler