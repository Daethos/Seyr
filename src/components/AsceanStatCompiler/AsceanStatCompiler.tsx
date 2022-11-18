import { useEffect, useState } from 'react'
import * as asceanAPI from '../../utils/asceanApi'
import Loading from '../Loading/Loading'

interface Props {
    ascean: any;
    communityFocus: boolean;
}

const AsceanStatCompiler = ({ ascean, communityFocus }: Props) => {
    const [loading, setLoading] = useState<boolean>(false);
    
    const [asceanState, setAsceanState] = useState<any>(ascean)
    const [weaponOne, setWeaponOne] = useState<any>({})
    const [weaponTwo, setWeaponTwo] = useState<any>({})
    const [weaponThree, setWeaponThree] = useState<any>({})

    const [physicalDefense, setPhysicalDefense] = useState<number>(0)
    const [magicalDefense, setMagicalDefense] = useState<number>(0)
    const [physicalPosture, setPhysicalPosture] = useState<number>(0)
    const [magicalPosture, setMagicalPosture] = useState<number>(0)

    const [attributes, setAttributes] = useState<any>([])
    const [defense, setDefense] = useState<any>([])

    useEffect(() => {
      asceanStatCompiler()
    //   console.log(typeof ((weaponOne.physical_penetration)))
    }, [])
    

    async function asceanStatCompiler() {
        setLoading(true)
        try {
            const response = await asceanAPI.getAsceanStats(ascean._id)
            //console.log(response.data.data.attributes, 'Response Compiling Stats')
            setWeaponOne(response.data.data.combat_weapon_one)
            setWeaponTwo(response.data.data.combat_weapon_two)
            setWeaponThree(response.data.data.combat_weapon_three)
            setDefense(response.data.data.defense)
            setAttributes(response.data.data.attributes)
            setPhysicalDefense(response.data.data.defense.physicalDefenseModifier)
            setMagicalDefense(response.data.data.defense.magicalDefenseModifier)
            setPhysicalPosture(response.data.data.defense.physicalPosture)
            setMagicalPosture(response.data.data.defense.magicalPosture)
            setLoading(false)
        } catch (err: any) {
            setLoading(false)
            console.log(err.message, 'Error Compiling Ascean Stats')
        }
    }

    if (loading) {
        return (
            <Loading NavBar={true} />
        )
    }

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
    { 
    communityFocus ?
    <svg height="5" width="100%" className="tapered-rule my-1">
        <polyline points="0,0 400,2.5 0,5"></polyline>
    </svg>
    : <svg height="5" width="100%" className="tapered-rule my-1">
        <polyline points="0,0 550,2.5 0,5"></polyline>
    </svg>
    }
    {
        weaponOne
        ?
    <div className="property-line">
    <h4>{weaponOne?.name} [{weaponOne?.type}]</h4><br /> 
    <h4>{Math.round(weaponOne?.physical_damage)}</h4><p> Physical /</p> <h4> {Math.round(weaponOne?.magical_damage)}</h4> <p>Magical Damage</p><br />
    <h4>Attack Type:</h4> <p>{weaponOne?.attack_type} [{weaponOne?.damage_type?.[0]}{weaponOne?.damage_type?.[1] ? ' / ' + weaponOne.damage_type[1] : '' }]</p><br />
    <h4>Critical:</h4>  <p>+{((weaponOne?.critical_chance))}% / x{weaponOne?.critical_damage} Damage </p><br />
    <h4>Dodge:</h4>  <p>+{weaponOne?.dodge}s Timer </p><br />
    <h4>Penetration:</h4>  <p>+{weaponOne?.magical_penetration} Mag /  +{weaponOne?.physical_penetration} Phys</p><br />
    <h4>Roll:</h4>  <p>+{weaponOne?.roll}% </p>
    </div>
        : ''
    }

   { 
    communityFocus ?
    <svg height="5" width="100%" className="tapered-rule my-1">
        <polyline points="0,0 400,2.5 0,5"></polyline>
    </svg>
    : <svg height="5" width="100%" className="tapered-rule my-1">
        <polyline points="0,0 550,2.5 0,5"></polyline>
    </svg>
    }

    {
        weaponTwo
        ?
    <div className="property-line">
    <h4>{weaponTwo?.name} [{weaponTwo?.type}]</h4><br />
    <h4> {Math.round(weaponTwo?.physical_damage)}</h4> <p> Physical /</p> <h4>{Math.round(weaponTwo?.magical_damage)}</h4> <p>Magical Damage</p><br />
    <h4>Attack Type:</h4> <p>{weaponTwo?.attack_type} [{weaponTwo?.damage_type?.[0]}{weaponTwo?.damage_type?.[1] ? ' / ' + weaponTwo.damage_type[1] : ''}]</p><br />
    <h4>Critical:</h4>  <p>+{((weaponTwo?.critical_chance))}% / x{weaponTwo?.critical_damage} Damage </p><br />
    <h4>Dodge:</h4>  <p>+{weaponTwo?.dodge}s Timer </p><br />
    <h4>Penetration:</h4>  <p>+{weaponTwo?.magical_penetration} Mag /  +{weaponTwo?.physical_penetration} Phys</p><br />
    <h4>Roll:</h4>  <p>+{weaponTwo?.roll}% </p><br />
    </div>
        : ''
    }
    { 
    communityFocus ?
    <svg height="5" width="100%" className="tapered-rule my-1">
        <polyline points="0,0 400,2.5 0,5"></polyline>
    </svg>
    : <svg height="5" width="100%" className="tapered-rule my-1">
        <polyline points="0,0 550,2.5 0,5"></polyline>
    </svg>
    }
    {
        weaponThree
        ?
    <div className="property-line">
    <h4>{weaponThree?.name} [{weaponThree?.type}]</h4><br /> 
    <h4> {Math.round(weaponThree?.physical_damage)}</h4> <p> Physical /</p> <h4>{Math.round(weaponThree?.magical_damage)}</h4> <p>Magical Damage</p> <br />
    <h4>Attack Type:</h4> <p>{weaponThree?.attack_type} [{weaponThree?.damage_type?.[0]}{weaponThree?.damage_type?.[1] ? ' / ' + weaponThree.damage_type[1] : '' }]</p><br />
    <h4>Critical:</h4>  <p>+{((weaponThree?.critical_chance))}% / x{weaponThree?.critical_damage} Damage </p><br />
    <h4>Dodge:</h4>  <p>+{weaponThree?.dodge}s Timer </p><br />
    <h4>Penetration:</h4>  <p>+{weaponThree?.magical_penetration} Mag /  +{weaponThree?.physical_penetration} Phys</p><br />
    <h4>Roll:</h4>  <p>+{weaponThree?.roll}% </p>
    </div>
        : ''
    }
    </>
  )
}

export default AsceanStatCompiler