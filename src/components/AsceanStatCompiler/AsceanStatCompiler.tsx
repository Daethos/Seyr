import { useEffect, useState } from 'react'
import * as asceanAPI from '../../utils/asceanApi'
import Loading from '../Loading/Loading'
import { Equipment } from '../GameCompiler/GameStore';

interface Weapon { weapon: Equipment };
const WeaponCard = ({ weapon }: Weapon) => {
    return (
        <>
            <div className="property-line">
            <h4>{weapon?.name} [{weapon?.type}]</h4><br /> 
            <h4 style={{ color: "gold" }}>{Math.round(Number(weapon?.physical_damage))}</h4><p> Physical /</p> <h4 style={{ color: "gold" }}>{Math.round(Number(weapon?.magical_damage))}</h4> <p>Magical Damage</p><br />
            <h4>Attack Type:</h4> <p>{weapon?.attack_type} [{weapon?.damage_type?.[0]}{weapon?.damage_type?.[1] ? ' / ' + weapon.damage_type[1] : '' }]</p><br />
            <h4>Critical:</h4>  <p>{((weapon?.critical_chance))}% / x{weapon?.critical_damage} Damage </p><br />
            <h4>Dodge:</h4>  <p>{weapon?.dodge}s Timer </p><br />
            <h4>Penetration:</h4>  <p>{weapon?.magical_penetration} Mag / {weapon?.physical_penetration} Phys</p><br />
            <h4>Roll:</h4>  <p>{weapon?.roll}% </p>
            </div>
            <svg height="5" width="100%" className="tapered-rule my-1">
                <polyline points="0,0 400,2.5 0,5"></polyline>
            </svg>
        </>
    );
};

interface Props {
    ascean: any;
};

const AsceanStatCompiler = ({ ascean }: Props) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [weaponOne, setWeaponOne] = useState<Equipment | null>(null);
    const [weaponTwo, setWeaponTwo] = useState<Equipment | null>(null);
    const [weaponThree, setWeaponThree] = useState<Equipment | null>(null);
    const [physicalDefense, setPhysicalDefense] = useState<number>(0);
    const [magicalDefense, setMagicalDefense] = useState<number>(0);
    const [physicalPosture, setPhysicalPosture] = useState<number>(0);
    const [magicalPosture, setMagicalPosture] = useState<number>(0);

    const [attributes, setAttributes] = useState<any>([]);

    useEffect(() => {
      asceanStatCompiler();
    }, [ascean]);

    async function asceanStatCompiler() {
        setLoading(true);
        try {
            const response = await asceanAPI.getAsceanStats(ascean._id);
            setWeaponOne(response.data.data.combat_weapon_one);
            setWeaponTwo(response.data.data.combat_weapon_two);
            setWeaponThree(response.data.data.combat_weapon_three);
            setAttributes(response.data.data.attributes);
            setPhysicalDefense(response.data.data.defense.physicalDefenseModifier);
            setMagicalDefense(response.data.data.defense.magicalDefenseModifier);
            setPhysicalPosture(response.data.data.defense.physicalPosture);
            setMagicalPosture(response.data.data.defense.magicalPosture);
            setLoading(false);
        } catch (err: any) {
            setLoading(false);
            console.log(err.message, 'Error Compiling Ascean Stats');
        };
    };

    if (loading) {
        return (
            <Loading NavBar={true} />
        );
    };

    return (
        <>
        <div className="actions">
            <h3>Combat Statistics</h3>
        </div>
        <div className="property-line" style={{ marginTop: -15 + 'px' }}>
            <h4>Health: </h4> <p>{attributes.healthTotal}</p>
        </div>
        <div className="property-line">
            <h4>Magical Defense: </h4> <p>{magicalDefense}% [{magicalPosture}% Postured]</p>
        </div>
        <div className="property-line">
            <h4>Physical Defense: </h4> <p>{physicalDefense}% [{physicalPosture}% Postured]</p>
        </div>
        <div className="property-line last">
            <h4>Initiative: </h4> <p>{attributes.initiative}</p>
        </div> 
        <svg height="5" width="100%" className="tapered-rule my-1">
            <polyline points="0,0 400,2.5 0,5"></polyline>
        </svg> 
        { weaponOne ? (
            <WeaponCard weapon={weaponOne} />
        ) : ( '' ) } 
        { weaponTwo && weaponTwo?.name !== 'Empty Weapon Slot' ? (
            <WeaponCard weapon={weaponTwo} />
        ) : ( '' ) }
        { weaponThree && weaponThree?.name !== 'Empty Weapon Slot' ? (
            <WeaponCard weapon={weaponThree} />
        ) : ( '' ) }
        </>
    );
};

export default AsceanStatCompiler;