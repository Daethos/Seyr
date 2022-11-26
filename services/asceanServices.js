const { create } = require('../models/ascean');
const Ascean = require('../models/ascean');
const User = require('../models/user');

// ================================== HELPER CONSTANTS =================================== \\

const attributeStats = {}

// ================================== HELPER FUNCTIONS =================================== \\

const attributeCompiler = async (ascean) => {

    const newAttributes = await Object.create(attributeStats);
        
    newAttributes.rawConstitution =  Math.round((ascean.constitution + (ascean?.origin === "Notheo" || ascean?.origin === 'Nothos' ? 2 : 0)) * (ascean?.mastery === 'Constitution' ? 1.1 : 1));
    newAttributes.rawStrength =  Math.round(((ascean?.strength + (ascean?.origin === 'Sedyreal' || ascean?.origin === 'Ashtre' ? 2 : 0) + (ascean?.origin === "Li'ivi" ? 1 : 0)) + (ascean?.sex === 'Man' ? 2 : 0)) * (ascean?.mastery === 'Strength' ? 1.15 : 1));
    newAttributes.rawAgility =  Math.round(((ascean?.agility + (ascean?.origin === "Quor'eite" || ascean?.origin === 'Ashtre' ? 2 : 0) + (ascean?.origin === "Li'ivi" ? 1 : 0))) * (ascean?.mastery === 'Agility' ? 1.15 : 1));
    newAttributes.rawAchre =  Math.round(((ascean?.achre + (ascean?.origin === 'Notheo' || ascean?.origin === 'Fyers' ? 2 : 0) + (ascean?.origin === "Li'ivi" ? 1 : 0)) + (ascean?.sex === 'Man' ? 2 : 0)) * (ascean?.mastery === 'Achre' ? 1.15 : 1));
    newAttributes.rawCaeren =  Math.round(((ascean?.caeren + (ascean?.origin === 'Nothos' || ascean?.origin === 'Sedyreal' ? 2 : 0) + (ascean?.origin === "Li'ivi" ? 1 : 0)) + (ascean?.sex === 'Woman' ? 2 : 0)) * (ascean?.mastery === 'Caeren' ? 1.15 : 1));
    newAttributes.rawKyosir =  Math.round(((ascean?.kyosir + (ascean?.origin === "Fyers" || ascean?.origin === "Quor'eite" ? 2 : 0) + (ascean?.origin === "Li'ivi" ? 1 : 0)) + (ascean?.sex === 'Woman' ? 2 : 0)) * (ascean.mastery === 'Kyosir' ? 1.15 : 1));

    // // Total Attributes
    newAttributes.totalStrength = newAttributes.rawStrength + ascean?.shield?.strength + ascean?.helmet?.strength + ascean?.chest?.strength + ascean?.legs?.strength + ascean?.ring_one?.strength + ascean?.ring_two?.strength + ascean?.amulet?.strength + ascean?.trinket?.strength;
    newAttributes.totalAgility = newAttributes.rawAgility + ascean?.shield?.agility + ascean?.helmet?.agility + ascean?.chest?.agility + ascean?.legs?.agility + ascean?.ring_one?.agility + ascean?.ring_two?.agility + ascean?.amulet?.agility + ascean?.trinket?.agility;
    newAttributes.totalConstitution = newAttributes.rawConstitution + ascean?.shield?.constitution + ascean?.helmet?.constitution + ascean?.chest?.constitution + ascean?.legs?.constitution + ascean?.ring_one?.constitution + ascean?.ring_two?.constitution + ascean?.amulet?.constitution + ascean?.trinket?.constitution;
    newAttributes.totalAchre = newAttributes.rawAchre + ascean?.shield?.achre + ascean?.helmet?.achre + ascean?.chest?.achre + ascean?.legs?.achre + ascean?.ring_one?.achre + ascean?.ring_two?.achre + ascean?.amulet?.achre + ascean?.trinket?.achre;
    newAttributes.totalCaeren = newAttributes.rawCaeren + ascean?.shield?.caeren + ascean?.helmet?.caeren + ascean?.chest?.caeren + ascean?.legs?.caeren + ascean?.ring_one?.caeren + ascean?.ring_two?.caeren + ascean?.amulet?.caeren + ascean?.trinket?.caeren;
    newAttributes.totalKyosir = newAttributes.rawKyosir + ascean?.shield?.kyosir + ascean?.helmet?.kyosir + ascean?.chest?.kyosir + ascean?.legs?.kyosir + ascean?.ring_one?.kyosir + ascean?.ring_two?.kyosir + ascean?.amulet?.kyosir + ascean?.trinket?.kyosir;
        
    // Attribute Modifier
    newAttributes.strengthMod =  Math.floor((newAttributes.totalStrength - 10) / 2);
    newAttributes.agilityMod =  Math.floor((newAttributes.totalAgility - 10) / 2);
    newAttributes.constitutionMod =  Math.floor((newAttributes.totalConstitution - 10) / 2);
    newAttributes.achreMod =  Math.floor((newAttributes.totalAchre - 10) / 2);
    newAttributes.caerenMod =  Math.floor((newAttributes.totalCaeren - 10) / 2);
    newAttributes.kyosirMod =  Math.floor((newAttributes.totalKyosir - 10) / 2);
    
    // Equipment Attributes
    newAttributes.equipStrength = newAttributes.totalStrength - newAttributes.rawStrength;
    newAttributes.equipConstitution = newAttributes.totalConstitution - newAttributes.rawConstitution;
    newAttributes.equipAgility = newAttributes.totalAgility - newAttributes.rawAgility;
    newAttributes.equipAchre = newAttributes.totalAchre - newAttributes.rawAchre;
    newAttributes.equipCaeren = newAttributes.totalCaeren - newAttributes.rawCaeren;
    newAttributes.equipKyosir = newAttributes.totalKyosir - newAttributes.rawKyosir;

    newAttributes.healthTotal = ((newAttributes.totalConstitution * 15) + ((newAttributes.constitutionMod + newAttributes.caerenMod) * 15));
    newAttributes.initiative = 10 + ((newAttributes.agilityMod + newAttributes.achreMod) / 2)

    return (
        newAttributes
    )
}
  
async function originCompiler(weapon, ascean) { 
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
    }
    if (ascean.origin === "Quorieite") {
        weapon.dodge -= 3;
        weapon.roll += 3;
    }
    if (ascean.origin === "Sedyreal") {

    }
}

async function gripCompiler(weapon, attributes) { 
    if (weapon.grip === 'One Hand') {
        weapon.physical_damage += (((weapon.agility / 2)) + attributes.agilityMod) + ((weapon.strength / 4) + attributes.strengthMod / 2);
        weapon.magical_damage += (weapon.achre / 2) + (weapon.caeren / 4) + attributes.achreMod + (attributes.caerenMod / 2);
    }
    if (weapon.type === 'Bow') {
        weapon.physical_damage += (((weapon.agility / 2)) + attributes.agilityMod) + ((weapon.strength / 2) + attributes.strengthMod);
        weapon.magical_damage += (weapon.achre / 2) + (weapon.caeren / 2) + attributes.achreMod + (attributes.caerenMod);
    }  
    if (weapon.grip === 'Two Hand' && weapon.type !== 'Bow') {
        weapon.physical_damage += (weapon.strength / 2) + attributes.strengthMod + (weapon.agility / 4) + (attributes.agilityMod / 2);
        weapon.magical_damage += ((weapon.achre / 4) + weapon.caeren + (attributes.achreMod / 2)) + attributes.caerenMod;
    }
    console.log(weapon.physical_damage, weapon.magical_damage, 'Damage After Attributes')
}

async function penetrationCompiler(weapon, attributes, combatStats) { 
    weapon.magical_penetration += combatStats.penetrationMagical + attributes.kyosirMod + (weapon.kyosir / 2);
    weapon.physical_penetration += combatStats.penetrationPhysical + attributes.kyosirMod + (weapon.kyosir / 2);
}

async function critCompiler(weapon, attributes, combatStats) { 
    weapon.critical_chance += combatStats.criticalChance + ((attributes.agilityMod + attributes.achreMod + ((weapon.agility + weapon.achre) / 2)) / 2);
    weapon.critical_damage += (combatStats.criticalDamage / 10) + ((attributes.constitutionMod + attributes.strengthMod + attributes.caerenMod + ((weapon.constitution + weapon.strength + weapon.caeren) / 2)) / 25);
    weapon.critical_chance = weapon.critical_chance.toFixed(2)
    weapon.critical_damage = weapon.critical_damage.toFixed(2)
}

async function faithCompiler(weapon, ascean) { 
    if (ascean.faith === 'adherent') {
        if (weapon.damage_type?.[0] === 'Earth' || weapon.damage_type?.[0] === 'Wild' || weapon.damage_type?.[0] === 'Fire' || weapon.damage_type?.[0] === 'Frost' || weapon.damage_type?.[0] === 'Lightning' || weapon.damage_type?.[0] === 'Wind') {
            weapon.magical_damage *= 1.05;
            weapon.critical_chance += 2;
        }
        if (weapon.type === 'Bow' || weapon.type === 'Greataxe' || weapon.type === 'Greatmace') {
            weapon.physical_damage *= 1.05;
        }
        if (weapon.type === 'Greatsword' || weapon.type === 'Polearm') {
            weapon.physical_damage *= 1.03;
            weapon.magical_damage *= 1.03;
        }
        if (weapon.type === 'Axe' || weapon.type === 'Mace' || weapon.type === 'Curved Sword' || weapon.type === 'Dagger') {
            weapon.physical_damage *= 1.03;
            weapon.critical_chance += 2;
        }
        if (weapon.grip === 'Two Hand') {
            weapon.physical_damage *= 1.03;
            weapon.magical_damage *= 1.03;
            weapon.critical_chancee += 2
        }
        weapon.critical_chance *= 1.05;
        weapon.critical_chance = weapon.critical_chance.toFixed(2)
        weapon.roll += 2;
    }
    if (ascean.faith === 'devoted') {
        if (weapon.damage_type?.[0] === 'Wild' || weapon.damage_type?.[0] === 'Righteous' || weapon.damage_type?.[0] === 'Spooky' || weapon.damage_type?.[0] === 'Sorcery') {
            weapon.physical_damage *= 1.05;
            weapon.magical_damage *= 1.05;
        }
        if (weapon.type === 'Short Sword' || weapon.type === 'Long Sword' || weapon.type === 'Curved Sword' || weapon.type === 'Dagger' || weapon.type === 'Scythe' || weapon.type === 'Polearm') {
            weapon.physical_damage *= 1.03;
            weapon.magical_damage *= 1.03;
            weapon.critical_damage *= 1.03;
        }
        if (weapon.grip === 'One Hand') {
            weapon.physical_damage *= 1.03;
            weapon.magical_damage *= 1.03;
            weapon.critical_damage *= 1.03;
        }
        weapon.critical_damage *= 1.05;
        weapon.critical_damage = weapon.critical_damage.toFixed(2)
        weapon.dodge -= 2;

    }
}

// =============================== COMPILER FUNCTIONS ================================== \\

const weaponCompiler = async (weapon, ascean, attributes, combatStats) => { 
    const weaponOne = {
        name: weapon.name,
        type: weapon.type,
        grip: weapon.grip,
        attack_type: weapon.attack_type,
        damage_type: weapon.damage_type,
        physical_damage: weapon.physical_damage,
        magical_damage: weapon.magical_damage,
        physical_penetration: weapon.physical_penetration,
        magical_penetration: weapon.magical_penetration,
        critical_chance: weapon.critical_chance,
        critical_damage: weapon.critical_damage,
        dodge: weapon.dodge,
        roll: weapon.roll,
        constitution: weapon.constitution,
        strength: weapon.strength,
        agility: weapon.agility,
        achre: weapon.achre,
        caeren: weapon.caeren,
        kyosir: weapon.kyosir,
        influences: weapon.influences,
        imgURL: weapon.imgURL,
    }
    originCompiler(weaponOne, ascean)
    gripCompiler(weaponOne, attributes)
    penetrationCompiler(weaponOne, attributes, combatStats)
    critCompiler(weaponOne, attributes, combatStats)
    faithCompiler(weaponOne, ascean)
    weaponOne.dodge += (20 + (combatStats.dodgeCombat * 2));
    weaponOne.roll += combatStats.rollCombat;
    console.log(weaponOne.physical_damage, combatStats.damagePhysical, 'Crit Damage After Compiling')
    weaponOne.physical_damage = Math.round(weaponOne.physical_damage * combatStats.damagePhysical);
    weaponOne.magical_damage = Math.round(weaponOne.magical_damage * combatStats.damageMagical);
    return weaponOne
}

const defenseCompiler = async (ascean, attributes, combatStats) => { 
    const defense = {
        physicalDefenseModifier: ascean.helmet.physical_resistance + ascean.chest.physical_resistance + ascean.legs.physical_resistance + ascean.ring_one.physical_resistance + ascean.ring_two.physical_resistance + ascean.amulet.physical_resistance + ascean.trinket.physical_resistance 
            + Math.round(((attributes.constitutionMod + attributes.strengthMod + attributes.kyosirMod) / 4)) 
            + combatStats.originPhysDef, // Need to create these in the backend as well
        
        magicalDefenseModifier: ascean.helmet.magical_resistance + ascean.chest.magical_resistance + ascean.legs.magical_resistance + ascean.ring_one.magical_resistance + ascean.ring_two.magical_resistance + ascean.amulet.magical_resistance + ascean.trinket.magical_resistance 
            + Math.round(((attributes.constitutionMod + attributes.caerenMod + attributes.kyosirMod) / 4)) 
            + combatStats.originMagDef,

        physicalPosture: combatStats.defensePhysical + ascean.shield.physical_resistance,
        magicalPosture: combatStats.defenseMagical + ascean.shield.magical_resistance,
    }


    return defense
}

// ================================== CONTROLLER - SERVICE ================================= \\


const asceanCompiler = async (ascean) => {
    //console.log(ascean,'Ascean in the Service Compiler')
    try {
        const attributes = await attributeCompiler(ascean);
        const physicalDamageModifier = ascean.helmet.physical_damage * ascean.chest.physical_damage * ascean.legs.physical_damage * ascean.ring_one.physical_damage * ascean.ring_two.physical_damage * ascean.amulet.physical_damage * ascean.trinket.physical_damage;
        const magicalDamageModifier = ascean.helmet.magical_damage * ascean.chest.magical_damage * ascean.legs.magical_damage * ascean.ring_one.magical_damage * ascean.ring_two.magical_damage * ascean.amulet.magical_damage * ascean.trinket.magical_damage;
        const critChanceModifier = ascean.helmet.critical_chance + ascean.chest.critical_chance + ascean.legs.critical_chance + ascean.ring_one.critical_chance + ascean.ring_two.critical_chance + ascean.amulet.critical_chance + ascean.trinket.critical_chance;
        const critDamageModifier = ascean.helmet.critical_damage * ascean.chest.critical_damage * ascean.legs.critical_damage * ascean.ring_one.critical_damage * ascean.ring_two.critical_damage * ascean.amulet.critical_damage * ascean.trinket.critical_damage;
        const dodgeModifier = ascean.shield.dodge + ascean.helmet.dodge + ascean.chest.dodge + ascean.legs.dodge + ascean.ring_one.dodge + ascean.ring_two.dodge + ascean.amulet.dodge + ascean.trinket.dodge - Math.round(((attributes.agilityMod + attributes.achreMod) / 2));
        const rollModifier = ascean.shield.roll + ascean.helmet.roll + ascean.chest.roll + ascean.legs.roll + ascean.ring_one.roll + ascean.ring_two.roll + ascean.amulet.roll + ascean.trinket.roll + Math.round(((attributes.agilityMod + attributes.achreMod) / 2));
        const originPhysPenMod = (ascean.origin === 'Fyers' || ascean.origin === 'Notheo' ? 3 : 0)
        const originMagPenMod = (ascean.origin === 'Fyers' || ascean.origin === 'Nothos' ? 3 : 0)
        const physicalPenetration = ascean.ring_one.physical_penetration + ascean.ring_two.physical_penetration + ascean.amulet.physical_penetration + ascean.trinket.physical_penetration + originPhysPenMod;
        const magicalPenetration = ascean.ring_one.magical_penetration + ascean.ring_two.magical_penetration + ascean.amulet.magical_penetration + ascean.trinket.magical_penetration + originMagPenMod;
        const originPhysDefMod = (ascean.origin === 'Sedyreal' || ascean.origin === 'Nothos' ? 3 : 0);
        const originMagDefMod = (ascean.origin === 'Sedyreal' || ascean.origin === 'Notheo' ? 3 : 0);
        const physicalDefenseModifier = ascean.helmet.physical_resistance + ascean.chest.physical_resistance + ascean.legs.physical_resistance + ascean.ring_one.physical_resistance + ascean.ring_two.physical_resistance + ascean.amulet.physical_resistance + ascean.trinket.physical_resistance + Math.round(((attributes.constitutionMod + attributes.strengthMod + attributes.kyosirMod) / 4)) + originPhysDefMod;
        const magicalDefenseModifier = ascean.helmet.magical_resistance + ascean.chest.magical_resistance + ascean.legs.magical_resistance + ascean.ring_one.magical_resistance + ascean.ring_two.magical_resistance + ascean.amulet.magical_resistance + ascean.trinket.magical_resistance + Math.round(((attributes.constitutionMod + attributes.caerenMod + attributes.kyosirMod) / 4)) + originMagDefMod;
    
        // console.log(critDamageModifier, '<- Crit Damage Modifier w/ Base EQP')

        const combatStats = {
            combatAttributes: attributes,
            damagePhysical: physicalDamageModifier,
            damageMagical: magicalDamageModifier,
            criticalChance: critChanceModifier,
            criticalDamage: critDamageModifier,
            dodgeCombat: dodgeModifier,
            rollCombat: rollModifier,
            penetrationPhysical: physicalPenetration,
            penetrationMagical: magicalPenetration,
            defensePhysical: physicalDefenseModifier,
            defenseMagical: magicalDefenseModifier,
            originPhysDef: originPhysDefMod,
            originMagDef: originMagDefMod

        }
        //console.log(combatStats, 'Are the combat stats loaded?')
        const combat_weapon_one = await weaponCompiler(ascean.weapon_one, ascean, attributes, combatStats)
        const combat_weapon_two = await weaponCompiler(ascean.weapon_two, ascean, attributes, combatStats)
        const combat_weapon_three = await weaponCompiler(ascean.weapon_three, ascean, attributes, combatStats)
        const defense = await defenseCompiler(ascean, attributes, combatStats)
        // console.log(physicalDamageModifier, magicalDamageModifier, 'Did the weapon compile?')
        return {
    
            data: {
                ascean,
                attributes,
                combat_weapon_one,
                combat_weapon_two,
                combat_weapon_three,
                defense,
            }
        }

    } catch (err) {
        res.status(400).json({ err });
    }


}

module.exports = {
    asceanCompiler
}