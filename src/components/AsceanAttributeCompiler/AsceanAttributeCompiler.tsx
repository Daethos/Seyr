import { useEffect, useState, useCallback } from 'react';
import * as asceanAPI from '../../utils/asceanApi';
import Loading from '../Loading/Loading';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { Player } from '../GameCompiler/GameStore';

interface Props {
    ascean: Player;
    story?: boolean;
    stats?: any;
};

const AsceanAttributeCompiler = ({ ascean, story, stats }: Props) => {
    const [attributes, setAttributes] = useState<any>({});

    const compile = useCallback(async (): Promise<void> => {
        try {
            const res = await asceanAPI.getAsceanStats(ascean._id);
            setAttributes(res.data.data.attributes);
        } catch (err: any) {
            console.log(err.message, 'Error Compiling Ascean Stats')
        };
    }, [ascean]);

    useEffect(() => {
        if (stats) {
            setAttributes(stats);
            return;
        };
        compile();
    }, [ascean, compile]);

    const constitutionPopover = (
        <Popover id='popover'>
            <Popover.Header id='popover-header'>Constitution</Popover.Header>
            <Popover.Body id='popover-body'>
            <p style={{ fontStyle: 'italic', color: 'gold' }}>
                The determination of several factors within combat is based on your Constitution. Overall your health is most weighted by your Constitution, 
                in addition toward being able to augment higher thresholds of endurance, like the quality of your critical attacks and ability to absorb damage.
            </p><br />
            <p> Increases Health, Defenses, Posturing, Crit Damage, and Stamina--its Mastery Pervasive</p>
            </Popover.Body>
        </Popover>
    );
    const strengthPopover = (
        <Popover id='popover'>
            <Popover.Header id='popover-header'>Strength</Popover.Header>
            <Popover.Body id='popover-body'>
            <p style={{ fontStyle: 'italic', color: 'gold' }}>
                The physical power you possess, weighing heavily into your abliity to deal and receive physical damage with brutality.
            </p><br />
            <p> Increases Crit Damage, Physical Damage, Defense, and all Posturing. Affects Dual-Wielding Two-Hand Weapons</p>
            </Popover.Body>
        </Popover>
    );
    const agilityPopover = (
        <Popover id='popover'>
            <Popover.Header id='popover-header'>Agility</Popover.Header>
            <Popover.Body id='popover-body'>
            <p style={{ fontStyle: 'italic', color: 'gold' }}>
                The physical clarity you possess, weighing heavily into your abliity to mitigate and perform physical damage with finesse.
            </p><br />
            <p> Increases Phys Crit Chance, Phys Damage, Dodge, Roll, and Stamina. Affects Dual-Wielding One-Hand Weapons</p>
            </Popover.Body>
        </Popover>
    );
    const achrePopover = (
        <Popover id='popover'>
            <Popover.Header id='popover-header'>Achre</Popover.Header>
            <Popover.Body id='popover-body'>
            <p style={{ fontStyle: 'italic', color: 'gold' }}>
            Of Achreo, the Wild Ancient.<br /><br />
            (/ɑːkər/): Synonymous with being an Arbiter, they are measured by the quality of their Achre: discernment, poise, sagacity, and existence above error.</p>
            <br />
            <p>Increases Magi Crit Chance, Magi Damage, Dodge, Critical Posture, and Roll. Affects Dual-Wielding One-Hand Spells</p>
            </Popover.Body>
        </Popover>
    );
    const caerenPopover = (
        <Popover id='popover'>
            <Popover.Header id='popover-header'>Caeren</Popover.Header>
            <Popover.Body id='popover-body'>
            <p style={{ fontStyle: 'italic', color: 'gold' }}>
            Of Cambire, the Ancient of Potential, lingering essence and manifestation.<br /><br />
            (/'sɛərən/): An idealized person or thing. A specter or phantom. Eidolon.<br />
            <br /> The Caer (Informal, Colloquial): Synonymous to 'the will.'
            </p>
            <br />
            <p>Increases Crit Damage, Defense, Health, Magi Damage, and Stamina. Affects Dual-Wielding Two-Hand Spells</p>
            </Popover.Body>
        </Popover>
    );
    const kyosirPopover = (
        <Popover id='popover'>
            <Popover.Header id='popover-header'>Kyosir</Popover.Header>
            <Popover.Body id='popover-body'>
            <p style={{ fontStyle: 'italic', color: 'gold' }}>
            Of Ancients Otherwise.<br /><br />
            (/kaɪəsɪə(ɹ)/): Compulsion concocted through the golden veins of Kyrisos with bile and phlegm of Chiomyr.<br /><br />
            A charisma that warps those regardless of their caer, shearing their shields while capable of quelling their most quality strikes.
            </p>
            <br />
            <p>Increases Myriad Defense and Penetration--its Mastery Pervasive</p>
            </Popover.Body>
        </Popover>
    );

    const storyH4 = {
        fontSize: story ? '12px' : '',
        color: story ? '#fdf6d8' : '',
        marginBottom: story ? '-9%' : '',
    };

    const storyP = {
        color: 'gold',   
        fontSize: story ? '12.5px' : '',
    };

    return (
        <div className="abilities" style={{ fontSize: story ? '10px' : '', marginTop: story ? '-2.5%' : '' }}>
        <div className="ability-strength" style={{ width: story ? '27.5%' : '' }}>
            <OverlayTrigger trigger='click' rootClose placement='auto-start' overlay={constitutionPopover}>
            <h4 style={storyH4}>Con</h4>
            </OverlayTrigger>
                <p style={storyP} className="mt-2" id="con-box">{attributes.totalConstitution}<br /> ({attributes.rawConstitution} + {attributes.equipConstitution})</p>
        </div>
        <div className="ability-dexterity" style={{ width: story ? '27.5%' : '' }}>
            <OverlayTrigger trigger='click' rootClose placement='auto-start' overlay={strengthPopover}>
            <h4 style={storyH4}>Str</h4>
            </OverlayTrigger>    
            <p style={storyP} className="mt-2" id="str-box">{attributes.totalStrength}<br /> ({attributes.rawStrength} + {attributes.equipStrength})</p>
        </div>
        <div className="ability-constitution" style={{ width: story ? '27.5%' : '' }}>
            <OverlayTrigger trigger='click' rootClose placement='auto-start' overlay={agilityPopover}>
            <h4 style={storyH4}>Agi</h4>
            </OverlayTrigger>
            <p style={storyP} className="mt-2" id="">{attributes.totalAgility}<br /> ({attributes.rawAgility} + {attributes.equipAgility})</p>
            
        </div>{ story ? <br /> : '' }
        <div className="ability-intelligence" style={{ width: story ? '27.5%' : '' }}>
            <OverlayTrigger trigger='click' rootClose placement='auto-start' overlay={achrePopover}>
            <h4 style={storyH4}>Ach</h4>
             </OverlayTrigger>
            <p style={storyP} className="mt-2" id="ach-box">{attributes.totalAchre}<br /> [{attributes.rawAchre} + {attributes.equipAchre}]</p>
            
        </div>
        <div className="ability-wisdom" style={{ width: story ? '27.5%' : '' }}>
            <OverlayTrigger trigger='click' rootClose placement='auto-start' overlay={caerenPopover}>
            <h4 style={storyH4}>Caer</h4>
            </OverlayTrigger>
            <p style={storyP} className="mt-2" id="caer-box">{attributes.totalCaeren}<br /> ({attributes.rawCaeren} + {attributes.equipCaeren})</p>
        </div>
        <div className="ability-wisdom" style={{ width: story ? '27.5%' : '' }}>
            <OverlayTrigger trigger='click' rootClose placement='auto-start' overlay={kyosirPopover}>
            <h4 style={storyH4}>Kyo</h4>
            </OverlayTrigger>
            <p style={storyP} className="mt-2" id="kyo-box">{attributes.totalKyosir}<br /> ({attributes.rawKyosir} + {attributes.equipKyosir})</p>
        </div>
        </div>
    );
};

export default AsceanAttributeCompiler;