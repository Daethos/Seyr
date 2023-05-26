import { useEffect, useState } from 'react'
import * as asceanAPI from '../../utils/asceanApi'
import Loading from '../Loading/Loading'
import { Equipment } from '../GameCompiler/GameStore';

interface Props {
    ascean: any;
    communityFocus?: boolean;
};

const AsceanStatCompiler = ({ ascean, communityFocus }: Props) => {
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
    }, [])
    

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
            console.log(typeof response.data.data.combat_weapon_one.physical_damage, 'Physical Damage ONE', 
                        typeof response.data.data.combat_weapon_one.magical_damage, 'Magical Damage ONE',
                        typeof response.data.data.combat_weapon_two.physical_damage, 'Physical Damage TWO',
                        typeof response.data.data.combat_weapon_one.magical_damage, 'Magical Damage TWO',
                        typeof response.data.data.combat_weapon_three.physical_damage, 'Physical Damage THREE',
                        typeof response.data.data.combat_weapon_one.magical_damage, 'Magical Damage THREE'
                        )
            setLoading(false);
        } catch (err: any) {
            setLoading(false);
            console.log(err.message, 'Error Compiling Ascean Stats');
        }
    }

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
        { communityFocus ?
            <svg height="5" width="100%" className="tapered-rule my-1">
                <polyline points="0,0 400,2.5 0,5"></polyline>
            </svg>
        : 
            <svg height="5" width="100%" className="tapered-rule my-1">
                <polyline points="0,0 400,2.5 0,5"></polyline>
            </svg>
        }
        { weaponOne ?
            <>
            <div className="property-line">
            <h4>{weaponOne?.name} [{weaponOne?.type}]</h4><br /> 
            <h4 style={{ color: "gold" }}>{Math.round(Number(weaponOne?.physical_damage))}</h4><p> Physical /</p> <h4 style={{ color: "gold" }}>{Math.round(Number(weaponOne?.magical_damage))}</h4> <p>Magical Damage</p><br />
            <h4>Attack Type:</h4> <p>{weaponOne?.attack_type} [{weaponOne?.damage_type?.[0]}{weaponOne?.damage_type?.[1] ? ' / ' + weaponOne.damage_type[1] : '' }]</p><br />
            <h4>Critical:</h4>  <p>{((weaponOne?.critical_chance))}% / x{weaponOne?.critical_damage} Damage </p><br />
            <h4>Dodge:</h4>  <p>{weaponOne?.dodge}s Timer </p><br />
            <h4>Penetration:</h4>  <p>{weaponOne?.magical_penetration} Mag / {weaponOne?.physical_penetration} Phys</p><br />
            <h4>Roll:</h4>  <p>{weaponOne?.roll}% </p>
            </div>
            <svg height="5" width="100%" className="tapered-rule my-1">
                <polyline points="0,0 400,2.5 0,5"></polyline>
            </svg>
            </>
        : '' }

        { weaponTwo && weaponTwo?.name !== 'Empty Weapon Slot' ?
            <>
            <div className="property-line">
            <h4>{weaponTwo?.name} [{weaponTwo?.type}]</h4><br />
            <h4 style={{ color: "gold" }}>{Math.round(Number(weaponTwo?.physical_damage))}</h4> <p> Physical /</p> <h4 style={{ color: "gold" }}>{Math.round(Number(weaponTwo?.magical_damage))}</h4> <p>Magical Damage</p><br />
            <h4>Attack Type:</h4> <p>{weaponTwo?.attack_type} [{weaponTwo?.damage_type?.[0]}{weaponTwo?.damage_type?.[1] ? ' / ' + weaponTwo.damage_type[1] : ''}]</p><br />
            <h4>Critical:</h4>  <p>{((weaponTwo?.critical_chance))}% / x{weaponTwo?.critical_damage} Damage </p><br />
            <h4>Dodge:</h4>  <p>{weaponTwo?.dodge}s Timer </p><br />
            <h4>Penetration:</h4>  <p>{weaponTwo?.magical_penetration} Mag / {weaponTwo?.physical_penetration} Phys</p><br />
            <h4>Roll:</h4>  <p>{weaponTwo?.roll}% </p><br />
            </div>
            <svg height="5" width="100%" className="tapered-rule my-1">
            <polyline points="0,0 400,2.5 0,5"></polyline>
            </svg>
            </>
        : '' }
        { weaponThree && weaponThree?.name !== 'Empty Weapon Slot' ?
            <>
            <div className="property-line">
            <h4>{weaponThree?.name} [{weaponThree?.type}]</h4><br /> 
            <h4 style={{ color: "gold" }}>{Math.round(Number(weaponThree?.physical_damage))}</h4> <p> Physical /</p> <h4 style={{ color: "gold" }}>{Math.round(Number(weaponThree?.magical_damage))}</h4> <p>Magical Damage</p> <br />
            <h4>Attack Type:</h4> <p>{weaponThree?.attack_type} [{weaponThree?.damage_type?.[0]}{weaponThree?.damage_type?.[1] ? ' / ' + weaponThree.damage_type[1] : '' }]</p><br />
            <h4>Critical:</h4>  <p>{((weaponThree?.critical_chance))}% / x{weaponThree?.critical_damage} Damage </p><br />
            <h4>Dodge:</h4>  <p>{weaponThree?.dodge}s Timer </p><br />
            <h4>Penetration:</h4>  <p>{weaponThree?.magical_penetration} Mag / {weaponThree?.physical_penetration} Phys</p><br />
            <h4>Roll:</h4>  <p>{weaponThree?.roll}% </p>
            </div>
            <svg height="5" width="100%" className="tapered-rule mt-3">
                <polyline points="0,0 400,2.5 0,5"></polyline>
            </svg>
            </>
        : '' }
        </>
    );
};

export default AsceanStatCompiler;