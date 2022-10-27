import { useEffect, useState } from 'react'
import * as asceanAPI from '../../utils/asceanApi'
import Loading from '../Loading/Loading'

interface Props {
    ascean: any;
    communityFocus: boolean;
}

const AsceanStatCompiler = ({ ascean, communityFocus }: Props) => {
    const [loading, setLoading] = useState<boolean>(false);
    
    const displayConstitution: number = Math.round((ascean?.constitution + (ascean?.origin === "Notheo" || ascean?.origin === 'Nothos' ? 2 : 0)) * (ascean?.mastery === 'Constitution' ? 1.1 : 1))
    const displayStrength: number = Math.round((ascean?.strength + (ascean?.origin === 'Sedyreal' || ascean?.origin === 'Ashtre' ? 2 : 0) + (ascean?.origin === "Li'ivi" ? 1 : 0)) + (ascean?.sex === 'Man' ? 2 : 0) * (ascean?.mastery === 'Strength' ? 1.15 : 1))
    const displayAgility: number = Math.round((ascean?.agility + (ascean?.origin === "Quor'eite" || ascean?.origin === 'Ashtre' ? 2 : 0) + (ascean?.origin === "Li'ivi" ? 1 : 0)) * (ascean?.mastery === 'Agility' ? 1.15 : 1))
    const displayAchre: number = Math.round((ascean?.achre + (ascean?.origin === 'Notheo' || ascean?.origin === 'Fyers' ? 2 : 0) + (ascean?.origin === "Li'ivi" ? 1 : 0)) + (ascean?.sex === 'Man' ? 2 : 0) * (ascean?.mastery === 'Achre' ? 1.15 : 1))
    const displayCaeren: number = Math.round((ascean?.caeren + (ascean?.origin === 'Nothos' || ascean?.origin === 'Sedyreal' ? 2 : 0) + (ascean?.origin === "Li'ivi" ? 1 : 0)) + (ascean?.sex === 'Woman' ? 2 : 0) * (ascean?.mastery === 'Caeren' ? 1.15 : 1))
    const displayKyosir: number = Math.round((ascean?.kyosir + (ascean?.origin === "Fyers" || ascean?.origin === "Quor'eite" ? 2 : 0) + (ascean?.origin === "Li'ivi" ? 1 : 0)) + (ascean?.sex === 'Woman' ? 2 : 0) * (ascean.mastery === 'Kyosir' ? 1.15 : 1))

    const totalStrength: number = displayStrength + ascean?.shield?.strength + ascean?.helmet?.strength + ascean?.chest?.strength + ascean?.legs?.strength + ascean?.ring_one?.strength + ascean?.ring_two?.strength + ascean?.amulet?.strength + ascean?.trinket?.strength;
    const totalAgility: number = displayAgility + ascean?.shield?.agility + ascean?.helmet?.agility + ascean?.chest?.agility + ascean?.legs?.agility + ascean?.ring_one?.agility + ascean?.ring_two?.agility + ascean?.amulet?.agility + ascean?.trinket?.agility;
    const totalConstitution: number = displayConstitution + ascean?.shield?.constitution + ascean?.helmet?.constitution + ascean?.chest?.constitution + ascean?.legs?.constitution + ascean?.ring_one?.constitution + ascean?.ring_two?.constitution + ascean?.amulet?.constitution + ascean?.trinket?.constitution;
    const totalAchre: number = displayAchre + ascean?.shield?.achre + ascean?.helmet?.achre + ascean?.chest?.achre + ascean?.legs?.achre + ascean?.ring_one?.achre + ascean?.ring_two?.achre + ascean?.amulet?.achre + ascean?.trinket?.achre;
    const totalCaeren: number = displayCaeren + ascean?.shield?.caeren + ascean?.helmet?.caeren + ascean?.chest?.caeren + ascean?.legs?.caeren + ascean?.ring_one?.caeren + ascean?.ring_two?.caeren + ascean?.amulet?.caeren + ascean?.trinket?.caeren;
    const totalKyosir: number = displayKyosir + ascean?.shield?.kyosir + ascean?.helmet?.kyosir + ascean?.chest?.kyosir + ascean?.legs?.kyosir + ascean?.ring_one?.kyosir + ascean?.ring_two?.kyosir + ascean?.amulet?.kyosir + ascean?.trinket?.kyosir;

    const strengthMod: number = Math.floor((totalStrength - 10) / 2);
    const agilityMod: number = Math.floor((totalAgility - 10) / 2);
    const constitutionMod: number = Math.floor((totalConstitution - 10) / 2);
    const achreMod: number = Math.floor((totalAchre - 10) / 2);
    const caerenMod: number = Math.floor((totalCaeren - 10) / 2);
    const kyosirMod: number = Math.floor((totalKyosir - 10) / 2);

    const physicalDamageModifier: number = ascean.helmet.physical_damage * ascean.chest.physical_damage * ascean.legs.physical_damage * ascean.ring_one.physical_damage * ascean.ring_two.physical_damage * ascean.amulet.physical_damage * ascean.trinket.physical_damage;
    const magicalDamageModifier: number = ascean.helmet.magical_damage * ascean.chest.magical_damage * ascean.legs.magical_damage * ascean.ring_one.magical_damage * ascean.ring_two.magical_damage * ascean.amulet.magical_damage * ascean.trinket.magical_damage;
    const critChanceModifier: number = ascean.helmet.critical_chance + ascean.chest.critical_chance + ascean.legs.critical_chance + ascean.ring_one.critical_chance + ascean.ring_two.critical_chance + ascean.amulet.critical_chance + ascean.trinket.critical_chance;
    const critDamageModifier: number = ascean.helmet.critical_damage * ascean.chest.critical_damage * ascean.legs.critical_damage * ascean.ring_one.critical_damage * ascean.ring_two.critical_damage * ascean.amulet.critical_damage * ascean.trinket.critical_damage;
    const dodgeModifier: number = ascean.shield.dodge + ascean.helmet.dodge + ascean.chest.dodge + ascean.legs.dodge + ascean.ring_one.dodge + ascean.ring_two.dodge + ascean.amulet.dodge + ascean.trinket.dodge - Math.round(((agilityMod + achreMod) / 2));
    const rollModifier: number = ascean.shield.roll + ascean.helmet.roll + ascean.chest.roll + ascean.legs.roll + ascean.ring_one.roll + ascean.ring_two.roll + ascean.amulet.roll + ascean.trinket.roll + Math.round(((agilityMod + achreMod) / 2));
    
    const originPhysPenMod: number = (ascean.origin === 'Fyers' || ascean.origin === 'Notheo' ? 3 : 0)
    const originMagPenMod: number = (ascean.origin === 'Fyers' || ascean.origin === 'Nothos' ? 3 : 0)
    const physicalPenetration: number = ascean.ring_one.physical_penetration + ascean.ring_two.physical_penetration + ascean.amulet.physical_penetration + ascean.trinket.physical_penetration + originPhysPenMod;
    const magicalPenetration: number = ascean.ring_one.magical_penetration + ascean.ring_two.magical_penetration + ascean.amulet.magical_penetration + ascean.trinket.magical_penetration + originMagPenMod;

    const healthTotal: number = (totalConstitution * 3) + ((constitutionMod + caerenMod) * 2);
    const initiative: number = 10 + ((agilityMod + achreMod) / 2);

    const [asceanState, setAsceanState] = useState<any>(ascean)
    const [weaponOne, setWeaponOne] = useState<any>({})
    const [weaponTwo, setWeaponTwo] = useState<any>({})
    const [weaponThree, setWeaponThree] = useState<any>({})
    const [weaponOneCompiled, setWeaponOneCompiled] = useState<boolean>(false)
    const [weaponTwoCompiled, setWeaponTwoCompiled] = useState<boolean>(false)
    const [weaponThreeCompiled, setWeaponThreeCompiled] = useState<boolean>(false)

    const originPhysDefMod: number = (ascean.origin === 'Sedyreal' || ascean.origin === 'Nothos' ? 3 : 0);
    const originMagDefMod: number = (ascean.origin === 'Sedyreal' || ascean.origin === 'Notheo' ? 3 : 0);

    const physicalDefenseModifier: number = ascean.helmet.physical_resistance + ascean.chest.physical_resistance + ascean.legs.physical_resistance + ascean.ring_one.physical_resistance + ascean.ring_two.physical_resistance + ascean.amulet.physical_resistance + ascean.trinket.physical_resistance + Math.round(((constitutionMod + caerenMod + kyosirMod) / 2)) + originPhysDefMod;
    
    const magicalDefenseModifier: number = ascean.helmet.magical_resistance + ascean.chest.magical_resistance + ascean.legs.magical_resistance + ascean.ring_one.magical_resistance + ascean.ring_two.magical_resistance + ascean.amulet.magical_resistance + ascean.trinket.magical_resistance + Math.round(((constitutionMod + caerenMod + kyosirMod) / 2)) + originMagDefMod;
    
    const [physicalDefense, setPhysicalDefense] = useState<number>(0)
    const [magicalDefense, setMagicalDefense] = useState<number>(0)
    const [physicalPosture, setPhysicalPosture] = useState<number>(0)
    const [magicalPosture, setMagicalPosture] = useState<number>(0)

    const [attributes, setAttributes] = useState<any>([])
    const [defense, setDefense] = useState<any>([])

    useEffect(() => {
      asceanStatCompiler()
    }, [])
    

    async function asceanStatCompiler() {
        setLoading(true)
        try {
            const response = await asceanAPI.getAsceanStats(ascean._id)
            console.log(response.data.data.attributes, 'Response Compiling Stats')
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
    <button className='btn btn-outline' onClick={asceanStatCompiler} style={{ fontSize: 25 + 'px', fontWeight: 400, color: 'red' }}>Console Stats</button>
    </div>
    <div className="property-line" style={{ marginTop: -15 + 'px' }}>
    <h4>Health: </h4> <p>{healthTotal}</p>
    </div>
    <div className="property-line">
    <h4>Magical Defense: </h4> <p>{magicalDefense}% [{magicalPosture}% Postured]</p>
    </div>
    <div className="property-line">
    <h4>Physical Defense: </h4> <p>{physicalDefense}% [{physicalPosture}% Postured]</p>
    </div>
    <div className="property-line last">
    <h4>Initiative: </h4> <p>{initiative}</p>
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
    <h4>Critical:</h4>  <p>+{Math.round(weaponOne?.critical_chance)}% / x{weaponOne?.critical_damage?.toFixed(2)} Damage </p><br />
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
    <h4>Critical:</h4>  <p>+{Math.round(weaponTwo?.critical_chance)}% / x{weaponTwo?.critical_damage?.toFixed(2)} Damage </p><br />
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
    <h4>Critical:</h4>  <p>+{Math.round(weaponThree?.critical_chance)}% / x{weaponThree?.critical_damage?.toFixed(2)} Damage </p><br />
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