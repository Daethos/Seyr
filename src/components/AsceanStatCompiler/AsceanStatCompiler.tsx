import React, { useEffect, useState } from 'react'

interface Props {
    ascean: any;
    communityFeed: any;
    communityFocus: any;
}

const AsceanStatCompiler = ({ ascean, communityFeed, communityFocus }: Props) => {
    let totalStrength: number = 0
    let totalAgility: number = 0
    let totalConstitution: number = 0
    let totalAchre: number = 0
    let totalCaeren: number =0

    if (ascean.origin === "Ashtre") {
        totalStrength += 2;
        totalAgility += 2;
    }
    if (ascean.origin === "Fyers") {
        totalAchre += 2;
        totalCaeren += 2;
    }
    if (ascean.origin === "Li'ivi") {
        totalStrength += 1;
        totalAgility += 1;
        totalAchre += 1;
        totalCaeren += 1;
    }
    if (ascean.origin === "Notheo") {
        totalConstitution *= 2;
        totalAchre += 2;
    }
    if (ascean.origin === "Nothos") {
        totalConstitution += 2;
        totalCaeren += 2;
    }
    if (ascean.origin === "Quorieite") {
         totalAgility += 2;
         totalAchre += 2;
    }
    if (ascean.origin === "Sedyreal") {
        totalStrength += 2;
        totalCaeren += 2;
    }
    totalStrength= ascean.strength + ascean.shield.strength + ascean.helmet.strength + ascean.chest.strength + ascean.legs.strength + ascean.ring_one.strength + ascean.ring_two.strength + ascean.amulet.strength + ascean.trinket.strength;
    totalAgility= ascean.agility + ascean.shield.agility + ascean.helmet.agility + ascean.chest.agility + ascean.legs.agility + ascean.ring_one.agility + ascean.ring_two.agility + ascean.amulet.agility + ascean.trinket.agility;
    totalConstitution = ascean.constitution + ascean.shield.constitution + ascean.helmet.constitution + ascean.chest.constitution + ascean.legs.constitution + ascean.ring_one.constitution + ascean.ring_two.constitution + ascean.amulet.constitution + ascean.trinket.constitution;
    totalAchre = ascean.achre + ascean.shield.achre + ascean.helmet.achre + ascean.chest.achre + ascean.legs.achre + ascean.ring_one.achre + ascean.ring_two.achre + ascean.amulet.achre + ascean.trinket.achre;
    totalCaeren = ascean.caeren + ascean.shield.caeren + ascean.helmet.caeren + ascean.chest.caeren + ascean.legs.caeren + ascean.ring_one.caeren + ascean.ring_two.caeren + ascean.amulet.caeren + ascean.trinket.caeren;
    const strengthMod: number = Math.floor((totalStrength - 10) / 2);
    const agilityMod: number = Math.floor((totalAgility - 10) / 2);
    const constitutionMod: number = Math.floor((totalConstitution - 10) / 2);
    const achreMod: number = Math.floor((totalAchre - 10) / 2);
    const caerenMod: number = Math.floor((totalCaeren - 10) / 2);
    const physicalDamageModifier: number = ascean.helmet.physical_damage * ascean.chest.physical_damage * ascean.legs.physical_damage * ascean.ring_one.physical_damage * ascean.ring_two.physical_damage * ascean.amulet.physical_damage * ascean.trinket.physical_damage;
    const magicalDamageModifier: number = ascean.helmet.magical_damage * ascean.chest.magical_damage * ascean.legs.magical_damage * ascean.ring_one.magical_damage * ascean.ring_two.magical_damage * ascean.amulet.magical_damage * ascean.trinket.magical_damage;
    const critChanceModifier: number = ascean.helmet.critical_chance + ascean.chest.critical_chance + ascean.legs.critical_chance + ascean.ring_one.critical_chance + ascean.ring_two.critical_chance + ascean.amulet.critical_chance + ascean.trinket.critical_chance;
    const critDamageModifier: number = ascean.helmet.critical_damage * ascean.chest.critical_damage * ascean.legs.critical_damage * ascean.ring_one.critical_damage * ascean.ring_two.critical_damage * ascean.amulet.critical_damage * ascean.trinket.critical_damage;
    const dodgeModifier: number = ascean.shield.dodge + ascean.helmet.dodge + ascean.chest.dodge + ascean.legs.dodge + ascean.ring_one.dodge + ascean.ring_two.dodge + ascean.amulet.dodge + ascean.trinket.dodge - Math.round(((agilityMod + achreMod) / 2));
    const rollModifier: number = ascean.shield.roll + ascean.helmet.roll + ascean.chest.roll + ascean.legs.roll + ascean.ring_one.roll + ascean.ring_two.roll + ascean.amulet.roll + ascean.trinket.roll + Math.round(((agilityMod + achreMod) / 2));
    const physicalPenetration: number = ascean.ring_one.physical_penetration + ascean.ring_two.physical_penetration + ascean.amulet.physical_penetration + ascean.trinket.physical_penetration;
    const magicalPenetration: number = ascean.ring_one.magical_penetration + ascean.ring_two.magical_penetration + ascean.amulet.magical_penetration + ascean.trinket.magical_penetration;;


    const [asceanState, setAsceanState] = useState<any>(ascean)
    const [healthState, setHealthState] = useState<number>(totalConstitution * 3)
    const [weaponOne, setWeaponOne] = useState<any>({})
    const [weaponTwo, setWeaponTwo] = useState<any>({})
    const [weaponThree, setWeaponThree] = useState<any>({})

    const physicalDefenseModifier = ascean.helmet.physical_resistance + ascean.chest.physical_resistance + ascean.legs.physical_resistance + ascean.ring_one.physical_resistance + ascean.ring_two.physical_resistance + ascean.amulet.physical_resistance + ascean.trinket.physical_resistance + Math.round(((constitutionMod + caerenMod) / 2));
    const magicalDefenseModifier = ascean.helmet.magical_resistance + ascean.chest.magical_resistance + ascean.legs.magical_resistance + ascean.ring_one.magical_resistance + ascean.ring_two.magical_resistance + ascean.amulet.magical_resistance + ascean.trinket.magical_resistance + Math.round(((constitutionMod + caerenMod) / 2));
    const [physicalDefense, setPhysicalDefense] = useState<number>(0)
    const [magicalDefense, setMagicalDefense] = useState<number>(0)
    const [physicalPosture, setPhysicalPosture] = useState<number>(0)
    const [magicalPosture, setMagicalPosture] = useState<number>(0)

    useEffect(() => {
      healthCompiler()
    }, [])

    useEffect(() => {
        weaponOneCompiler()
    }, [])

    useEffect(() => {
        weaponTwoCompiler()
    }, [])

    useEffect(() => {
        weaponThreeCompiler()
    }, [])

    useEffect(() => {
        physicalDefenseCompiler()
    }, [])

    useEffect(() => {
        magicalDefenseCompiler()
    }, [])

    async function physicalDefenseCompiler() {
        let defense = physicalDefenseModifier;
        //console.log('Physical Defense: ', defense)
        setPhysicalDefense(defense);
        setPhysicalPosture(defense + asceanState.shield.physical_resistance);
    }

    async function magicalDefenseCompiler() {
        let defense = magicalDefenseModifier;
        //console.log('Magical Defense: ', defense)
        setMagicalDefense(defense);
        setMagicalPosture(defense + asceanState.shield.magical_resistance);
    }

    async function healthCompiler() {
        let health = healthState;
        health += (constitutionMod + caerenMod) * 2;
        setHealthState(health)
        //console.log(health, '<- Health Total!')
    }


    async function faithCompiler(weapon: any) {
        if (asceanState.faith === 'adherent') {
            if (weapon.damage_type?.[0] === 'Earth' || weapon.damage_type?.[0] === 'Fire' || weapon.damage_type?.[0] === 'Frost' || weapon.damage_type?.[0] === 'Lightning' || weapon.damage_type?.[0] === 'Wind') {
                weapon.magical_damage *= 1.07;
                weapon.critical_chance += 2;
            }
            if (weapon.type === 'Bow' || weapon.type === 'Greataxe' || weapon.type === 'Greatsword' || weapon.type === 'Greatmace') {
                weapon.physical_damage *= 1.1;
            }
            if (weapon.type === 'Axe' || weapon.type === 'Mace') {
                weapon.physical_damage *= 1.03;
            }
            if (weapon.grip === 'Two Hand') {
                weapon.physical_damage *= 1.07;
                weapon.magical_damage *= 1.07;
                weapon.critical_damage *= 1.07
            }
            weapon.critical_chance *= 1.07;
            weapon.roll += 2;

        }
        if (asceanState.faith === 'devoted') {
            if (weapon.damage_type?.[0] === 'Faith' || weapon.damage_type?.[0] === 'Spooky' || weapon.damage_type?.[0] === 'Sorcery') {
                weapon.physical_damage *= 1.07;
                weapon.magical_damage *= 1.07;
            }
            if (weapon.type === 'Short Sword' || weapon.type === 'Dagger' || weapon.type === 'Scythe' || weapon.type === 'Polearm') {
                weapon.physical_damage *= 1.07;
                weapon.magical_damage *= 1.07;
                weapon.critical_damage *= 1.07;
            }
            if (weapon.grip === 'One Hand') {
                weapon.physical_damage *= 1.03;
                weapon.magical_damage *= 1.03;
                weapon.critical_chance *= 1.07;
            }
            weapon.critical_damage *= 1.07;
            weapon.dodge -= 2;

        }
        return weapon
    }

    async function gripCompiler(weapon: any) {
        if (weapon.grip === 'One Hand') {
            weapon.physical_damage += weapon.agility + weapon.strength + (agilityMod * 1.5) + (strengthMod / 2);
            weapon.magical_damage += weapon.achre + weapon.caeren + achreMod + caerenMod;
        } else {
            weapon.physical_damage += weapon.agility + weapon.strength + (strengthMod * 2) + (agilityMod);
            weapon.magical_damage += weapon.achre + weapon.caeren + (achreMod * 1.5) +  (caerenMod * 1.5);
        }
    }

    async function penetrationCompiler(weapon: any) {
        weapon.magical_penetration += magicalPenetration;
        weapon.physical_penetration += physicalPenetration;
        console.log(weapon)
    }

    async function critCompiler(weapon: any) {
        weapon.critical_chance += critChanceModifier + ((agilityMod + achreMod) / 2);
        weapon.critical_damage *= critDamageModifier + ((constitutionMod + strengthMod + caerenMod) / 10);
    }

    async function originCompiler(weapon: any) {
        if (ascean.origin === "Ashtre") {
            weapon.critical_chance += 3;
            weapon.physical_damage *= 1.03;
        }
        if (ascean.origin === "Fyers") {
            weapon.magical_penetration += 3;
            weapon.physical_penetration += 3;
        }
        if (ascean.origin === "Li'ivi") {
            weapon.magical_penetration += 1;
            weapon.physical_penetration += 1;
            weapon.magical_damage *= 1.01;
            weapon.physical_damage *= 1.01;
            weapon.critical_chance += 1;
            weapon.dodge -= 1;
            weapon.roll += 1;
        }
        if (ascean.origin === "Notheo") {
            weapon.physical_damage *= 1.03;
            weapon.physical_penetration += 3;
        }
        if (ascean.origin === "Nothos") {
            weapon.magical_penetration += 3;
            weapon.magical_damage *= 1.03;
            // weapon.physical_resistance += 3;
        }
        if (ascean.origin === "Quorieite") {
            weapon.dodge -= 3;
            weapon.roll += 3;
        }
        if (ascean.origin === "Sedyreal") {
            // weapon.magical_resistance += 3;
            // weapon.physical_resistance += 3;
        }
    }

    async function weaponOneCompiler() {
        let weapon = asceanState.weapon_one;
        originCompiler(weapon)
        gripCompiler(weapon)
        penetrationCompiler(weapon)
        weapon.physical_damage *= physicalDamageModifier;
        weapon.magical_damage *= magicalDamageModifier;
        critCompiler(weapon)
        weapon.dodge += dodgeModifier;
        weapon.roll += rollModifier;

        faithCompiler(weapon)
        setWeaponOne(weapon)
    }

    async function weaponTwoCompiler() {

        let weapon = asceanState.weapon_two;
        originCompiler(weapon)
        gripCompiler(weapon)
        penetrationCompiler(weapon)
        weapon.physical_damage *= physicalDamageModifier;
        weapon.magical_damage *= magicalDamageModifier;
        critCompiler(weapon)
        weapon.dodge += dodgeModifier;
        weapon.roll += rollModifier;

        faithCompiler(weapon)
        setWeaponTwo(weapon)
    }
    async function weaponThreeCompiler() {

        let weapon = asceanState.weapon_three;
        originCompiler(weapon)
        gripCompiler(weapon)
        penetrationCompiler(weapon)
        weapon.physical_damage *= physicalDamageModifier;
        weapon.magical_damage *= magicalDamageModifier;
        critCompiler(weapon)
        weapon.dodge += dodgeModifier;
        weapon.roll += rollModifier;

        faithCompiler(weapon)
        setWeaponThree(weapon)
    }

    return (
    <>
    <div className="actions">
    <h3>Combat Statistics</h3>
    </div>
    <div className="property-line">
    <h4>Health: </h4> <p>{healthState}</p>
    </div>
    <div className="property-line">
    <h4>Magical Defense: </h4> <p>{magicalDefense}% [{magicalPosture}% Postured]</p>
    </div>
    <div className="property-line last">
    <h4>Physical Defense: </h4> <p>{physicalDefense}% [{physicalPosture}% Postured]</p>
    </div>
    { 
    communityFocus ?
    <svg height="5" width="100%" className="tapered-rule my-1">
        <polyline points="0,0 400,2.5 0,5"></polyline>
    </svg>
    : <svg height="5" width="100%" className="tapered-rule my-1">
        <polyline points="0,0 600,2.5 0,5"></polyline>
    </svg>
    }
    <div className="property-line">
    <h4>{weaponOne.name} [{weaponOne.type}]</h4><br /> 
    <h4>{Math.round(weaponOne.physical_damage)}</h4><p> Physical /</p> <h4> {Math.round(weaponOne.magical_damage)}</h4> <p>Magical Damage</p><br />
    <h4>Attack Type:</h4> <p>{weaponOne.attack_type} [{weaponOne?.damage_type?.[0]} {weaponOne?.damage_type?.[1] ? '/ ' + weaponOne.damage_type[1] : '' }]</p><br />
    <h4>Critical:</h4>  <p>+{Math.round(weaponOne.critical_chance)}% / x{weaponOne.critical_damage?.toFixed(2)} Damage </p><br />
    <h4>Dodge:</h4>  <p>+{weaponOne.dodge}s Timer </p><br />
    <h4>Penetration:</h4>  <p>+{weaponOne.magical_penetration} Mag /  +{weaponOne.physical_penetration} Phys</p><br />
    <h4>Roll:</h4>  <p>+{weaponOne.roll}% </p>
    </div>

   { 
    communityFocus ?
    <svg height="5" width="100%" className="tapered-rule my-1">
        <polyline points="0,0 400,2.5 0,5"></polyline>
    </svg>
    : <svg height="5" width="100%" className="tapered-rule my-1">
        <polyline points="0,0 600,2.5 0,5"></polyline>
    </svg>
    }

    <div className="property-line">
    <h4>{weaponTwo.name} [{weaponTwo.type}]</h4><br />
    <h4> {Math.round(weaponTwo.physical_damage)}</h4> <p> Physical /</p> <h4>{Math.round(weaponTwo.magical_damage)}</h4> <p>Magical Damage</p><br />
    <h4>Attack Type:</h4> <p>{weaponTwo.attack_type} [ {weaponTwo?.damage_type?.[0]} {weaponTwo?.damage_type?.[1] ? '/ ' + weaponTwo.damage_type[1] : ''}]</p><br />
    <h4>Critical:</h4>  <p>+{Math.round(weaponTwo.critical_chance)}% / x{weaponTwo.critical_damage?.toFixed(2)} Damage </p><br />
    <h4>Dodge:</h4>  <p>+{weaponTwo.dodge}s Timer </p><br />
    <h4>Penetration:</h4>  <p>+{weaponTwo.magical_penetration} Mag /  +{weaponTwo.physical_penetration} Phys</p><br />
    <h4>Roll:</h4>  <p>+{weaponTwo.roll}% </p><br />
    </div>
    { 
    communityFocus ?
    <svg height="5" width="100%" className="tapered-rule my-1">
        <polyline points="0,0 400,2.5 0,5"></polyline>
    </svg>
    : <svg height="5" width="100%" className="tapered-rule my-1">
        <polyline points="0,0 600,2.5 0,5"></polyline>
    </svg>
    }
    <div className="property-line">
    <h4>{weaponThree.name} [{weaponThree.type}]</h4><br /> 
    <h4> {Math.round(weaponThree.physical_damage)}</h4> <p> Physical /</p> <h4>{Math.round(weaponThree.magical_damage)}</h4> <p>Magical Damage</p> <br />
    <h4>Attack Type:</h4> <p>{weaponThree.attack_type} [{weaponThree?.damage_type?.[0]} {weaponThree?.damage_type?.[1] ? '/ ' + weaponThree.damage_type[1] : '' }]</p><br />
    <h4>Critical:</h4>  <p>+{Math.round(weaponThree.critical_chance)}% / x{weaponThree.critical_damage?.toFixed(2)} Damage </p><br />
    <h4>Dodge:</h4>  <p>+{weaponThree.dodge}s Timer </p><br />
    <h4>Penetration:</h4>  <p>+{weaponThree.magical_penetration} Mag /  +{weaponThree.physical_penetration} Phys</p><br />
    <h4>Roll:</h4>  <p>+{weaponThree.roll}% </p>
    </div>
    </>
  )
}

export default AsceanStatCompiler