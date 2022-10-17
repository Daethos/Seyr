import React, { useEffect, useState } from 'react'

interface Props {
    ascean: any;
    communityFeed: any;
    communityFocus: any;
}

const AsceanStatCompiler = ({ ascean, communityFeed, communityFocus }: Props) => {
    
    const totalStrength = ascean.strength + ascean.shield.strength + ascean.helmet.strength + ascean.chest.strength + ascean.legs.strength + ascean.ring_one.strength + ascean.ring_two.strength + ascean.amulet.strength + ascean.trinket.strength;
    const totalAgility = ascean.agility + ascean.shield.agility + ascean.helmet.agility + ascean.chest.agility + ascean.legs.agility + ascean.ring_one.agility + ascean.ring_two.agility + ascean.amulet.agility + ascean.trinket.agility;
    const totalConstitution = ascean.constitution + ascean.shield.constitution + ascean.helmet.constitution + ascean.chest.constitution + ascean.legs.constitution + ascean.ring_one.constitution + ascean.ring_two.constitution + ascean.amulet.constitution + ascean.trinket.constitution;
    const totalAchre = ascean.achre + ascean.shield.achre + ascean.helmet.achre + ascean.chest.achre + ascean.legs.achre + ascean.ring_one.achre + ascean.ring_two.achre + ascean.amulet.achre + ascean.trinket.achre;
    const totalCaeren = ascean.caeren + ascean.shield.caeren + ascean.helmet.caeren + ascean.chest.caeren + ascean.legs.caeren + ascean.ring_one.caeren + ascean.ring_two.caeren + ascean.amulet.caeren + ascean.trinket.caeren;
    const strengthMod = Math.floor((totalStrength - 10) / 2);
    const agilityMod = Math.floor((totalAgility - 10) / 2);
    const constitutionMod = Math.floor((totalConstitution - 10) / 2);
    const achreMod = Math.floor((totalAchre - 10) / 2);
    const caerenMod = Math.floor((totalCaeren - 10) / 2);
    const physicalDamageModifer = ascean.helmet.physical_damage * ascean.chest.physical_damage * ascean.legs.physical_damage * ascean.ring_one.physical_damage * ascean.ring_two.physical_damage * ascean.amulet.physical_damage * ascean.trinket.physical_damage;
    const magicalDamageModifer = ascean.helmet.magical_damage * ascean.chest.magical_damage * ascean.legs.magical_damage * ascean.ring_one.magical_damage * ascean.ring_two.magical_damage * ascean.amulet.magical_damage * ascean.trinket.magical_damage;
    const critChanceModifer = ascean.helmet.critical_chance + ascean.chest.critical_chance + ascean.legs.critical_chance + ascean.ring_one.critical_chance + ascean.ring_two.critical_chance + ascean.amulet.critical_chance + ascean.trinket.critical_chance;
    const critDamageModifer = ascean.helmet.critical_damage * ascean.chest.critical_damage * ascean.legs.critical_damage * ascean.ring_one.critical_damage * ascean.ring_two.critical_damage * ascean.amulet.critical_damage * ascean.trinket.critical_damage;
    const dodgeMofier = ascean.shield.dodge + ascean.helmet.dodge + ascean.chest.dodge + ascean.legs.dodge + ascean.ring_one.dodge + ascean.ring_two.dodge + ascean.amulet.dodge + ascean.trinket.dodge;
    const rollMofier = ascean.shield.roll + ascean.helmet.roll + ascean.chest.roll + ascean.legs.roll + ascean.ring_one.roll + ascean.ring_two.roll + ascean.amulet.roll + ascean.trinket.roll;
    
    const [asceanState, setAsceanState] = useState<any>(ascean)
    const [healthState, setHealthState] = useState<number>(totalConstitution * 2)
    const [weaponOne, setWeaponOne] = useState<any>({})
    const [weaponTwo, setWeaponTwo] = useState<any>({})
    const [weaponThree, setWeaponThree] = useState<any>({})

    const physicalDefenseModifer = ascean.helmet.physical_resistance + ascean.chest.physical_resistance + ascean.legs.physical_resistance + ascean.ring_one.physical_resistance + ascean.ring_two.physical_resistance + ascean.amulet.physical_resistance + ascean.trinket.physical_resistance;
    const magicalDefenseModifer = ascean.helmet.magical_resistance + ascean.chest.magical_resistance + ascean.legs.magical_resistance + ascean.ring_one.magical_resistance + ascean.ring_two.magical_resistance + ascean.amulet.magical_resistance + ascean.trinket.magical_resistance;
    const [physicalDefense, setPhysicalDefense] = useState<number>(0)
    const [magicalDefense, setMagicalDefense] = useState<number>(0)
    const [physicalPosture, setPhysicalPosture] = useState<number>(0)
    const [magicalPosture, setMagicalPosture] = useState<number>(0)

    // FIXME: Con: DEF - MAG - HEALTH - POSTURE
    // FIXME: Str: CRIT DAM, PHYS DAM, POSTURE
    // FIXME: Agi: CRIT %, DODGE, PHYS DAM, ROLL 
    // FIXME: Ach: SPELL DAM, SPELL CRIT DAM, SPELL CRIT %, DODGE, ROLL 
    // FIXME: Caer: SPELL DAM, DEF, HEALTH, POSTURE, 
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
        let defense = physicalDefenseModifer;
        //console.log('Physical Defense: ', defense)
        setPhysicalDefense(defense);
        setPhysicalPosture(defense + asceanState.shield.physical_resistance);
    }

    async function magicalDefenseCompiler() {
        let defense = magicalDefenseModifer;
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

    // useEffect(() => {
    //     faithCompiler(weapon);
    // }, [])

    async function faithCompiler(weapon: any) {
        if (asceanState.faith === 'adherent') {
            if (weapon.damage_type?.[0] === 'Earth' || weapon.damage_type?.[0] === 'Fire' || weapon.damage_type?.[0] === 'Frost' || weapon.damage_type?.[0] === 'Lightning' || weapon.damage_type?.[0] === 'Wind') {
                weapon.magical_damage *= 1.1;
                weapon.critical_chance += 3;
            }
            if (weapon.type === 'Bow' || weapon.type === 'Greataxe' || weapon.type === 'Greatsword' || weapon.type === 'Greatmace') {
                weapon.physical_damage *= 1.15;
            }
            if (weapon.type === 'Axe' || weapon.type === 'Mace') {
                weapon.physical_damage *= 1.05;
            }
            if (weapon.grip === 'Two Hand') {
                weapon.physical_damage *= 1.1;
                weapon.magical_damage *= 1.1;
                weapon.critical_damage *= 1.1
            }
            weapon.critical_chance *= 1.1;
            weapon.roll += 3;

        }
        if (asceanState.faith === 'devoted') {
            if (weapon.damage_type?.[0] === 'Faith' || weapon.damage_type?.[0] === 'Spooky' || weapon.damage_type?.[0] === 'Sorcery') {
                weapon.physical_damage *= 1.1;
                weapon.magical_damage *= 1.1;
            }
            if (weapon.type === 'Short Sword' || weapon.type === 'Dagger' || weapon.type === 'Scythe' || weapon.type === 'Polearm') {
                weapon.physical_damage *= 1.1;
                weapon.magical_damage *= 1.1;
                weapon.critical_damage *= 1.1;
            }
            if (weapon.grip === 'One Hand') {
                weapon.physical_damage *= 1.05;
                weapon.magical_damage *= 1.05;
                weapon.critical_chance *= 1.1;
            }
            weapon.critical_damage *= 1.1;
            weapon.dodge -= 3;

        }
        return weapon
    }

    async function weaponOneCompiler() {
        let weapon = asceanState.weapon_one;
        if (weapon.grip === 'One Hand') {
            weapon.physical_damage += weapon.agility + weapon.strength + (agilityMod * 1.5) + (strengthMod / 2);
            weapon.magical_damage += weapon.achre + weapon.caeren + achreMod + caerenMod;
        } else {
            weapon.physical_damage += weapon.agility + weapon.strength + (strengthMod * 2) + (agilityMod / 2);
            weapon.magical_damage += weapon.caeren + (caerenMod * 1.5);
        }
        weapon.physical_damage *= physicalDamageModifer;
        weapon.magical_damage *= magicalDamageModifer;
        weapon.critical_chance += critChanceModifer;
        weapon.critical_damage *= critDamageModifer;
        weapon.dodge += dodgeMofier;
        weapon.roll += rollMofier;

        faithCompiler(weapon)

        setWeaponOne(weapon)
    }

    async function weaponTwoCompiler() {
        let weapon = asceanState.weapon_two;
        if (weapon.grip === 'One Hand') {
            weapon.physical_damage += weapon.agility + weapon.strength + (agilityMod * 1.5) + (strengthMod / 2);
            weapon.magical_damage += weapon.achre + weapon.caeren + achreMod + caerenMod;
        } else {
            weapon.physical_damage += weapon.agility + weapon.strength + (strengthMod * 2) + (agilityMod / 2);
            weapon.magical_damage += weapon.caeren + (caerenMod * 1.5);
        }
        weapon.physical_damage *= physicalDamageModifer;
        weapon.magical_damage *= magicalDamageModifer;
        weapon.critical_chance += critChanceModifer;
        weapon.critical_damage *= critDamageModifer;
        weapon.dodge += dodgeMofier;
        weapon.roll += rollMofier;
        //console.log(weapon.damage_type, '<- What is your damage type?')
        faithCompiler(weapon)
        setWeaponTwo(weapon)
    }
    async function weaponThreeCompiler() {
        let weapon = asceanState.weapon_three;
        if (weapon.grip === 'One Hand') {
            weapon.physical_damage += weapon.agility + weapon.strength + (agilityMod * 1.5) + (strengthMod / 2);
            weapon.magical_damage += weapon.achre + weapon.caeren + achreMod + caerenMod;
        } else {
            weapon.physical_damage += weapon.agility + weapon.strength + (strengthMod * 2) + (agilityMod / 2);
            weapon.magical_damage += weapon.caeren + (caerenMod * 1.5);
        }
        weapon.physical_damage *= physicalDamageModifer;
        weapon.magical_damage *= magicalDamageModifer;
        weapon.critical_chance += critChanceModifer;
        weapon.critical_damage *= critDamageModifer;
        weapon.dodge += dodgeMofier;
        weapon.roll += rollMofier;
        //console.log(weapon.damage_type, '<- What is your damage type?')
        faithCompiler(weapon)
        setWeaponThree(weapon)
        //console.log(critChanceModifer)
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
    <h4>Physical / Magical Defense: </h4> <p>{physicalDefense}% [{physicalPosture}% Postured] / {magicalDefense}% [{magicalPosture}% Postured]</p>
    </div>
    { 
    communityFocus ?
    <svg height="5" width="100%" className="tapered-rule my-1">
        <polyline points="0,0 400,2.5 0,5"></polyline>
    </svg>
    : <svg height="5" width="100%" className="tapered-rule my-1">
        <polyline points="0,0 800,2.5 0,5"></polyline>
    </svg>
    }
    <div className="property-line">
    <h4>{weaponOne.name} [{weaponOne.type}]</h4><br /> 
    <h4>{Math.round(weaponOne.physical_damage)}</h4><p> Physical /</p> <h4> {Math.round(weaponOne.magical_damage)}</h4> <p>Magical Damage</p><br />
    <h4>Attack Type:</h4> <p>{weaponOne.attack_type} [{weaponOne?.damage_type?.[0]} {weaponOne?.damage_type?.[1] ? '/ ' + weaponOne.damage_type[1] : '' }]</p><br />
    <h4>Critical:</h4>  <p>+{Math.round(weaponOne.critical_chance)}% / x{Math.round(weaponOne.critical_damage)} Damage </p><br />
    <h4>Dodge:</h4>  <p>+{weaponOne.dodge}s Timer </p><br />
    <h4>Roll:</h4>  <p>+{weaponOne.roll}% </p>
    </div>

   { 
    communityFocus ?
    <svg height="5" width="100%" className="tapered-rule my-1">
        <polyline points="0,0 400,2.5 0,5"></polyline>
    </svg>
    : <svg height="5" width="100%" className="tapered-rule my-1">
        <polyline points="0,0 800,2.5 0,5"></polyline>
    </svg>
    }

    <div className="property-line">
    <h4>{weaponTwo.name} [{weaponTwo.type}]</h4><br />
    <h4> {Math.round(weaponTwo.physical_damage)}</h4> <p> Physical /</p> <h4>{Math.round(weaponTwo.magical_damage)}</h4> <p>Magical Damage</p><br />
    <h4>Attack Type:</h4> <p>{weaponTwo.attack_type} [ {weaponTwo?.damage_type?.[0]} {weaponTwo?.damage_type?.[1] ? '/ ' + weaponTwo.damage_type[1] : ''}]</p><br />
    <h4>Critical:</h4>  <p>+{Math.round(weaponTwo.critical_chance)}% / x{Math.round(weaponTwo.critical_damage)} Damage </p><br />
    <h4>Dodge:</h4>  <p>+{weaponTwo.dodge}s Timer </p><br />
    <h4>Roll:</h4>  <p>+{weaponTwo.roll}% </p><br />
    </div>
    { 
    communityFocus ?
    <svg height="5" width="100%" className="tapered-rule my-1">
        <polyline points="0,0 400,2.5 0,5"></polyline>
    </svg>
    : <svg height="5" width="100%" className="tapered-rule my-1">
        <polyline points="0,0 800,2.5 0,5"></polyline>
    </svg>
    }
    <div className="property-line">
    <h4>{weaponThree.name} [{weaponThree.type}]</h4><br /> 
    <h4> {Math.round(weaponThree.physical_damage)}</h4> <p> Physical /</p> <h4>{Math.round(weaponThree.magical_damage)}</h4> <p>Magical Damage</p> <br />
    <h4>Attack Type:</h4> <p>{weaponThree.attack_type} [{weaponThree?.damage_type?.[0]} {weaponThree?.damage_type?.[1] ? '/ ' + weaponThree.damage_type[1] : '' }]</p><br />
    <h4>Critical:</h4>  <p>+{Math.round(weaponThree.critical_chance)}% / x{Math.round(weaponThree.critical_damage)} Damage </p><br />
    <h4>Dodge:</h4>  <p>+{weaponThree.dodge}s Timer </p><br />
    <h4>Roll:</h4>  <p>+{weaponThree.roll}% </p>
    </div>
    </>
  )
}

export default AsceanStatCompiler