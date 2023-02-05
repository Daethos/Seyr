const { create } = require('../models/ascean');
const Ascean = require('../models/ascean');
const User = require('../models/user');

// ================================== HELPER CONSTANTS =================================== \\

const attributeStats = {}

// ================================== HELPER FUNCTIONS =================================== \\

const attributeCompiler = async (ascean, rarities) => {

    const newAttributes = await Object.create(attributeStats);

    let itemRarity = {
        helmCon: ascean.helmet.constitution * rarities.helmet,
        helmStr: ascean.helmet.strength * rarities.helmet,
        helmAgi: ascean.helmet.agility * rarities.helmet,
        helmAch: ascean.helmet.achre * rarities.helmet,
        helmCae: ascean.helmet.caeren * rarities.helmet,
        helmKyo: ascean.helmet.kyosir * rarities.helmet,
        chestCon: ascean.chest.constitution * rarities.chest,
        chestStr: ascean.chest.strength * rarities.chest,
        chestAgi: ascean.chest.agility * rarities.chest,
        chestAch: ascean.chest.achre * rarities.chest,
        chestCae: ascean.chest.caeren * rarities.chest,
        chestKyo: ascean.chest.kyosir * rarities.chest,
        legsCon: ascean.legs.constitution * rarities.legs,
        legsStr: ascean.legs.strength * rarities.legs,
        legsAgi: ascean.legs.agility * rarities.legs,
        legsAch: ascean.legs.achre * rarities.legs,
        legsCae: ascean.legs.caeren * rarities.legs,
        legsKyo: ascean.legs.kyosir * rarities.legs,
        ringOneCon: ascean.ring_one.constitution * rarities.ring_one,
        ringOneStr: ascean.ring_one.strength * rarities.ring_one,
        ringOneAgi: ascean.ring_one.agility * rarities.ring_one,
        ringOneAch: ascean.ring_one.achre * rarities.ring_one,
        ringOneCae: ascean.ring_one.caeren * rarities.ring_one,
        ringOneKyo: ascean.ring_one.kyosir * rarities.ring_one,
        ringTwoCon: ascean.ring_two.constitution * rarities.ring_two,
        ringTwoStr: ascean.ring_two.strength * rarities.ring_two,
        ringTwoAgi: ascean.ring_two.agility * rarities.ring_two,
        ringTwoAch: ascean.ring_two.achre * rarities.ring_two,
        ringTwoCae: ascean.ring_two.caeren * rarities.ring_two,
        ringTwoKyo: ascean.ring_two.kyosir * rarities.ring_two,
        amuletCon: ascean.amulet.constitution * rarities.amulet,
        amuletStr: ascean.amulet.strength * rarities.amulet,
        amuletAgi: ascean.amulet.agility * rarities.amulet,
        amuletAch: ascean.amulet.achre * rarities.amulet,
        amuletCae: ascean.amulet.caeren * rarities.amulet,
        amuletKyo: ascean.amulet.kyosir * rarities.amulet,
        shieldCon: ascean.shield.constitution * rarities.shield,
        shieldStr: ascean.shield.strength * rarities.shield,
        shieldAgi: ascean.shield.agility * rarities.shield,
        shieldAch: ascean.shield.achre * rarities.shield,
        shieldCae: ascean.shield.caeren * rarities.shield,
        shieldKyo: ascean.shield.kyosir * rarities.shield,
        trinketCon: ascean.trinket.constitution * rarities.trinket,
        trinketStr: ascean.trinket.strength * rarities.trinket,
        trinketAgi: ascean.trinket.agility * rarities.trinket,
        trinketAch: ascean.trinket.achre * rarities.trinket,
        trinketCae: ascean.trinket.caeren * rarities.trinket,
        trinketKyo: ascean.trinket.kyosir * rarities.trinket,
    }
    // console.log(itemRarity, 'Item Rarity Compiling')
        
    newAttributes.rawConstitution =  Math.round((ascean.constitution + (ascean?.origin === "Notheo" || ascean?.origin === 'Nothos' ? 2 : 0)) * (ascean?.mastery === 'Constitution' ? 1.1 : 1));
    newAttributes.rawStrength =  Math.round(((ascean?.strength + (ascean?.origin === 'Sedyreal' || ascean?.origin === 'Ashtre' ? 2 : 0) + (ascean?.origin === "Li'ivi" ? 1 : 0)) + (ascean?.sex === 'Man' ? 2 : 0)) * (ascean?.mastery === 'Strength' ? 1.15 : 1));
    newAttributes.rawAgility =  Math.round(((ascean?.agility + (ascean?.origin === "Quor'eite" || ascean?.origin === 'Ashtre' ? 2 : 0) + (ascean?.origin === "Li'ivi" ? 1 : 0))) * (ascean?.mastery === 'Agility' ? 1.15 : 1));
    newAttributes.rawAchre =  Math.round(((ascean?.achre + (ascean?.origin === 'Notheo' || ascean?.origin === 'Fyers' ? 2 : 0) + (ascean?.origin === "Li'ivi" ? 1 : 0)) + (ascean?.sex === 'Man' ? 2 : 0)) * (ascean?.mastery === 'Achre' ? 1.15 : 1));
    newAttributes.rawCaeren =  Math.round(((ascean?.caeren + (ascean?.origin === 'Nothos' || ascean?.origin === 'Sedyreal' ? 2 : 0) + (ascean?.origin === "Li'ivi" ? 1 : 0)) + (ascean?.sex === 'Woman' ? 2 : 0)) * (ascean?.mastery === 'Caeren' ? 1.15 : 1));
    newAttributes.rawKyosir =  Math.round(((ascean?.kyosir + (ascean?.origin === "Fyers" || ascean?.origin === "Quor'eite" ? 2 : 0) + (ascean?.origin === "Li'ivi" ? 1 : 0)) + (ascean?.sex === 'Woman' ? 2 : 0)) * (ascean.mastery === 'Kyosir' ? 1.15 : 1));

    // // Total Attributes
    newAttributes.totalStrength = newAttributes.rawStrength + itemRarity.shieldStr + itemRarity.helmStr + itemRarity.chestStr + itemRarity.legsStr + itemRarity.ringOneStr + itemRarity.ringTwoStr + itemRarity.amuletStr + itemRarity.trinketStr;
    newAttributes.totalAgility = newAttributes.rawAgility + itemRarity.shieldAgi + itemRarity.helmAgi + itemRarity.chestAgi + itemRarity.legsAgi + itemRarity.ringOneAgi + itemRarity.ringTwoAgi + itemRarity.amuletAgi + itemRarity.trinketAgi;
    newAttributes.totalConstitution = newAttributes.rawConstitution + itemRarity.shieldCon + itemRarity.helmCon + itemRarity.chestCon + itemRarity.legsCon + itemRarity.ringOneCon + itemRarity.ringTwoCon + itemRarity.amuletCon + itemRarity.trinketCon;
    newAttributes.totalAchre = newAttributes.rawAchre + itemRarity.shieldAch + itemRarity.helmAch + itemRarity.chestAch + itemRarity.legsAch + itemRarity.ringOneAch + itemRarity.ringTwoAch + itemRarity.amuletAch + itemRarity.trinketAch;
    newAttributes.totalCaeren = newAttributes.rawCaeren + itemRarity.shieldCae + itemRarity.helmCae + itemRarity.chestCae + itemRarity.legsCae + itemRarity.ringOneCae + itemRarity.ringTwoCae + itemRarity.amuletCae + itemRarity.trinketCae;
    newAttributes.totalKyosir = newAttributes.rawKyosir + itemRarity.shieldKyo + itemRarity.helmKyo + itemRarity.chestKyo + itemRarity.legsKyo + itemRarity.ringOneKyo + itemRarity.ringTwoKyo + itemRarity.amuletKyo + itemRarity.trinketKyo;
    
    newAttributes.totalStrength = Math.round(newAttributes.totalStrength);
    newAttributes.totalAgility = Math.round(newAttributes.totalAgility);
    newAttributes.totalConstitution = Math.round(newAttributes.totalConstitution);
    newAttributes.totalAchre = Math.round(newAttributes.totalAchre);
    newAttributes.totalCaeren = Math.round(newAttributes.totalCaeren);
    newAttributes.totalKyosir = Math.round(newAttributes.totalKyosir);

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

    newAttributes.healthTotal = 15 + ((newAttributes.totalConstitution * ascean.level) + ((newAttributes.constitutionMod + Math.round((newAttributes.caerenMod + newAttributes.strengthMod) / 4)) * ascean.level));
    newAttributes.initiative = 10 + ((newAttributes.agilityMod + newAttributes.achreMod) / 2)

    return (
        newAttributes
    )
}
  
async function originCompiler(weapon, ascean) { 
    if (ascean.origin === "Ashtre") {
        weapon.critical_chance += 3;
        weapon.physical_damage *= 1.03;
        weapon.critical_damage *= 1.03;
    }
    if (ascean.origin === "Fyers") {
        weapon.magical_penetration += 3;
        weapon.physical_penetration += 3;
        weapon.roll += 3;
    }
    if (ascean.origin === "Li'ivi") {
        weapon.magical_penetration += 1;
        weapon.physical_penetration += 1;
        weapon.magical_damage *= 1.01;
        weapon.physical_damage *= 1.01;
        weapon.critical_chance += 1;
        weapon.critical_damage *= 1.01;
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
    if (ascean.origin === "Quor'eite") {
        weapon.dodge -= 3;
        weapon.roll += 3;
        weapon.critical_chance += 3;
    }
    if (ascean.origin === "Sedyreal") {
        weapon.critical_damage *= 1.03;
    }
}

async function gripCompiler(weapon, attributes, ascean) {
    // console.log(((weapon.agility / 2) + attributes.agilityMod) + ((weapon.strength / 4) + attributes.strengthMod / 2), 'One Hand Physical Damage');
    // console.log((weapon.achre / 2) + (weapon.caeren / 4) + attributes.achreMod + (attributes.caerenMod / 2), 'One Hand Magical Damage');
    // console.log(((weapon.agility / 2) + attributes.agilityMod) + ((weapon.strength / 2) + attributes.strengthMod), 'Bow Physical Damage');
    // console.log((weapon.achre / 2) + (weapon.caeren / 2) + attributes.achreMod + (attributes.caerenMod), 'Bow Magical Damage');
    // console.log((weapon.strength / 2) + attributes.strengthMod + (weapon.agility / 4) + (attributes.agilityMod / 2), 'Two Hand Physical Damage');
    // console.log((weapon.achre / 2) + (weapon.caeren / 2) + attributes.achreMod + (attributes.caerenMod), 'Two Hand Magical Damage');
    
    // if (weapon.physical_damage === 0) {
    //     weapon.physical_damage = 1;
    // }
    // if (weapon.magical_damage === 0) {
    //     weapon.magical_damage = 1;
    // }

    if (weapon.grip === 'One Hand') {
        weapon.physical_damage += ((((weapon.agility / 2)) + attributes.agilityMod) + ((weapon.strength / 8) + attributes.strengthMod / 3));
        weapon.magical_damage += ((weapon.achre / 2) + (weapon.caeren / 8) + attributes.achreMod + (attributes.caerenMod / 3));

        weapon.physical_damage *= 1 + ((((weapon.agility / 2)) + attributes.agilityMod) + ((weapon.strength / 8) + attributes.strengthMod / 3)) / (100 + (20 / ascean.level));
        weapon.magical_damage *= 1 + ((weapon.achre / 2) + (weapon.caeren / 8) + attributes.achreMod + (attributes.caerenMod / 3)) / (100 + (20 / ascean.level));
    }
    if (weapon.type === 'Bow') {
        weapon.physical_damage += ((weapon.agility / 2) + attributes.agilityMod + (weapon.strength / 8) + (attributes.strengthMod / 3));
        weapon.magical_damage += ((weapon.achre / 2) + (weapon.caeren / 8) + attributes.achreMod + (attributes.caerenMod / 3));

        weapon.physical_damage *= 1 + ((((weapon.agility / 4)) + attributes.agilityMod) + ((weapon.strength / 12) + attributes.strengthMod)) / (100 + (20 / ascean.level));
        weapon.magical_damage *= 1 + ((weapon.achre / 4) + (weapon.caeren / 12) + attributes.achreMod + (attributes.caerenMod / 3)) / (100 + (20 / ascean.level));
    }  
    if (weapon.grip === 'Two Hand' && weapon.type !== 'Bow') {
        weapon.physical_damage += ((weapon.strength / 2) + attributes.strengthMod + (weapon.agility / 8) + (attributes.agilityMod / 3));
        weapon.magical_damage += ((weapon.achre / 8) + (weapon.caeren / 2) + (attributes.achreMod / 3) + (attributes.caerenMod));

        weapon.physical_damage *= 1 + ((weapon.strength / 2) + attributes.strengthMod + (weapon.agility / 8) + (attributes.agilityMod / 3)) / (100 + (20 / ascean.level));
        weapon.magical_damage *= 1 + (((weapon.achre / 8) + (weapon.caeren / 2) + (attributes.achreMod / 3)) + attributes.caerenMod) / (100 + (20 / ascean.level));
    }
    console.log(weapon.physical_damage, weapon.magical_damage, 'Damage After Attributes')
}

async function penetrationCompiler(weapon, attributes, combatStats) { 
    weapon.magical_penetration += Math.round(combatStats.penetrationMagical + attributes.kyosirMod + (weapon.kyosir / 2));
    weapon.physical_penetration += Math.round(combatStats.penetrationPhysical + attributes.kyosirMod + (weapon.kyosir / 2));
}

async function critCompiler(weapon, attributes, combatStats) { 
    weapon.critical_chance += combatStats.criticalChance + ((attributes.agilityMod + attributes.achreMod + ((weapon.agility + weapon.achre) / 2)) / 3);
    weapon.critical_damage += (combatStats.criticalDamage / 10) + ((attributes.constitutionMod + attributes.strengthMod + attributes.caerenMod + ((weapon.constitution + weapon.strength + weapon.caeren) / 2)) / 50);
    // weapon.critical_chance = weapon.critical_chance.toFixed(2);
    // weapon.critical_damage = weapon.critical_damage.toFixed(2);
    // weapon.critical_chance = Number(weapon.critical_chance);
    // weapon.critical_damage = Number(weapon.critical_damage);
    weapon.critical_chance = Math.round(weapon.critical_chance * 100) / 100;
    weapon.critical_damage = Math.round(weapon.critical_damage * 100) / 100;
}

async function faithCompiler(weapon, ascean) { 
    if (ascean.faith === 'adherent') {
        if (weapon.damage_type?.[0] === 'Earth' || weapon.damage_type?.[0] === 'Wild' || weapon.damage_type?.[0] === 'Fire' || weapon.damage_type?.[0] === 'Frost' || weapon.damage_type?.[0] === 'Lightning' || weapon.damage_type?.[0] === 'Wind') {
            weapon.magical_damage *= 1.075;
            weapon.critical_chance += 3;
        }
        if (weapon.type === 'Bow' || weapon.type === 'Greataxe' || weapon.type === 'Greatmace') {
            weapon.physical_damage *= 1.075;
        }
        if (weapon.type === 'Greatsword' || weapon.type === 'Polearm') {
            weapon.physical_damage *= 1.05;
            weapon.magical_damage *= 1.05;
        }
        if (weapon.type === 'Axe' || weapon.type === 'Mace' || weapon.type === 'Curved Sword' || weapon.type === 'Dagger' || weapon.type === 'Long Sword') {
            weapon.physical_damage *= 1.05;
            weapon.critical_chance += 3;
        }
        if (weapon.grip === 'Two Hand') {
            weapon.physical_damage *= 1.05;
            weapon.magical_damage *= 1.05;
            weapon.critical_chance += 3
        }
        weapon.critical_chance *= 1.075;
        // weapon.critical_chance = weapon.critical_chance.toFixed(2)
        weapon.roll += 3;
    }
    if (ascean.faith === 'devoted') {
        if (weapon.damage_type?.[0] === 'Wild' || weapon.damage_type?.[0] === 'Righteous' || weapon.damage_type?.[0] === 'Spooky' || weapon.damage_type?.[0] === 'Sorcery') {
            weapon.physical_damage *= 1.075;
            weapon.magical_damage *= 1.075;
            weapon.critical_damage *= 1.025;
        }
        if (weapon.type === 'Short Sword' || weapon.type === 'Long Sword' || weapon.type === 'Curved Sword' || weapon.type === 'Dagger' || weapon.type === 'Scythe' || weapon.type === 'Polearm') {
            weapon.physical_damage *= 1.05;
            weapon.magical_damage *= 1.05;
            weapon.critical_damage *= 1.05;
        }
        if (weapon.grip === 'One Hand' || weapon.type === 'Bow') {
            weapon.physical_damage *= 1.05;
            weapon.magical_damage *= 1.05;
            weapon.critical_damage *= 1.05;
        }
        weapon.critical_damage *= 1.075;
        // weapon.critical_damage = weapon.critical_damage.toFixed(2)
        weapon.dodge -= 3;

    }
    weapon.critical_chance = Math.round(weapon.critical_chance * 100) / 100;
    weapon.critical_damage = Math.round(weapon.critical_damage * 100) / 100;
    // weapon.critical_chance = Number(weapon.critical_chance);
    // weapon.critical_damage = Number(weapon.critical_damage);
}

// =============================== COMPILER FUNCTIONS ================================== \\

const weaponCompiler = async (weapon, ascean, attributes, combatStats, rarity) => { 
    const weaponOne = {
        name: weapon.name,
        type: weapon.type,
        rarity: weapon.rarity,
        grip: weapon.grip,
        attack_type: weapon.attack_type,
        damage_type: weapon.damage_type,
        physical_damage: (weapon.physical_damage * rarity),
        magical_damage: (weapon.magical_damage * rarity),
        physical_penetration: (weapon.physical_penetration * rarity),
        magical_penetration: (weapon.magical_penetration * rarity),
        critical_chance: (weapon.critical_chance * rarity),
        critical_damage: (weapon.critical_damage),
        dodge: (weapon.dodge),
        roll: (weapon.roll * rarity),
        constitution: (weapon.constitution * rarity),
        strength: (weapon.strength * rarity),
        agility: (weapon.agility * rarity),
        achre: (weapon.achre * rarity),
        caeren: (weapon.caeren * rarity),
        kyosir: (weapon.kyosir * rarity),
        influences: weapon.influences,
        imgURL: weapon.imgURL,
    }
    originCompiler(weaponOne, ascean);
    gripCompiler(weaponOne, attributes, ascean);
    penetrationCompiler(weaponOne, attributes, combatStats);
    critCompiler(weaponOne, attributes, combatStats);
    faithCompiler(weaponOne, ascean);
    weaponOne.dodge += (40 + (combatStats.dodgeCombat * 1.5));
    weaponOne.roll += combatStats.rollCombat;
    // console.log(weaponOne.magical_damage,  weaponOne.physical_damage, 'Damage Before Weapon Multiplier');
    // console.log(combatStats.damageMagical, combatStats.damagePhysical, 'Damage Multiplier After Compiling');
    weaponOne.physical_damage = Math.round(weaponOne.physical_damage * combatStats.damagePhysical);
    weaponOne.magical_damage = Math.round(weaponOne.magical_damage * combatStats.damageMagical);
    return weaponOne
}

const defenseCompiler = async (ascean, attributes, combatStats, rarities) => { 
    const defense = {
        physicalDefenseModifier: 
            Math.round((ascean.helmet.physical_resistance * rarities.helmet) + (ascean.chest.physical_resistance * rarities.chest) + (ascean.legs.physical_resistance * rarities.legs) + 
            (ascean.ring_one.physical_resistance * rarities.ring_one) + (ascean.ring_two.physical_resistance * rarities.ring_two) + (ascean.amulet.physical_resistance * rarities.amulet) + (ascean.trinket.physical_resistance * rarities.trinket) 
            + Math.round(((attributes.constitutionMod + attributes.strengthMod + attributes.kyosirMod) / 8)) 
            + combatStats.originPhysDef), // Need to create these in the backend as well
        
        magicalDefenseModifier: 
            Math.round((ascean.helmet.magical_resistance * rarities.helmet) + (ascean.chest.magical_resistance * rarities.chest) + (ascean.legs.magical_resistance * rarities.legs) + 
           (ascean.ring_one.magical_resistance * rarities.ring_one) + (ascean.ring_two.magical_resistance * rarities.ring_two) + (ascean.amulet.magical_resistance * rarities.amulet) + (ascean.trinket.magical_resistance * rarities.trinket) 
            + Math.round(((attributes.constitutionMod + attributes.caerenMod + attributes.kyosirMod) / 8)) 
            + combatStats.originMagDef),

        physicalPosture: combatStats.defensePhysical + Math.round(ascean.shield.physical_resistance * rarities.shield),
        magicalPosture: combatStats.defenseMagical + Math.round(ascean.shield.magical_resistance * rarities.shield),
    }

    return defense
}

const coefficientCompiler = async (ascean, item) => {
    // console.log(item.rarity, 'Item Rarity In Coefficient Compiler')
    let coefficient = 0;
    switch (item.rarity) {
        case 'Common':
            coefficient = ascean.level / 4;
            break;
        case 'Uncommon':
            coefficient = ascean.level / 8;
            break;
        case 'Rare':
            coefficient = 1;
            // coefficient = ascean.level / 12;
            break;
        case 'Epic':
            coefficient = 1;
            // coefficient = ascean.level / 20;
            break;
        case 'Legendary':
            coefficient = ascean.level / 20;
            break;
    }
    if (coefficient > 1) {
        if (coefficient > 2) {
            coefficient = 1.5;
        } else {
            coefficient = 1;
        }
    }
    // coefficient = 1;
    // console.log(ascean.name, item.name, coefficient, 'coefficient Compiler')
    return coefficient
}

const rarityCompiler = async (ascean) => {
    // console.log(ascean.legs, 'Ascean Legs in Rarity Compiler')
    let rarities = {};
    try {
        const helmetCoefficient = await coefficientCompiler(ascean, ascean.helmet);
        const chestCoefficient = await coefficientCompiler(ascean, ascean.chest);
        const legsCoefficient = await coefficientCompiler(ascean, ascean.legs);
        const ringOneCoefficient = await coefficientCompiler(ascean, ascean.ring_one);
        const ringTwoCoefficient = await coefficientCompiler(ascean, ascean.ring_two);
        const amuletCoefficient = await coefficientCompiler(ascean, ascean.amulet);
        const trinketCoefficient = await coefficientCompiler(ascean, ascean.trinket);
        const shieldCoefficient = await coefficientCompiler(ascean, ascean.shield);
        const weaponOneCoefficient = await coefficientCompiler(ascean, ascean.weapon_one);
        const weaponTwoCoefficient = await coefficientCompiler(ascean, ascean.weapon_two);
        const WeaponThreeCoefficient = await coefficientCompiler(ascean, ascean.weapon_three);
        
        rarities = {
            helmet: helmetCoefficient,
            chest: chestCoefficient,
            legs: legsCoefficient,
            ring_one: ringOneCoefficient,
            ring_two: ringTwoCoefficient,
            amulet: amuletCoefficient,
            trinket: trinketCoefficient,
            shield: shieldCoefficient,
            weapon_one: weaponOneCoefficient,
            weapon_two: weaponTwoCoefficient,
            weapon_three: WeaponThreeCoefficient,
        }

        return rarities

    } catch (err) {
        console.log(err, 'Rarity Compiler Error');
    }
    
}

// ================================== CONTROLLER - SERVICE ================================= \\


const asceanCompiler = async (ascean) => {
    //console.log(ascean,'Ascean in the Service Compiler')

    try {
        const rarities = await rarityCompiler(ascean);
        const attributes = await attributeCompiler(ascean, rarities);
        const physicalDamageModifier = ascean.helmet.physical_damage * ascean.chest.physical_damage * ascean.legs.physical_damage * ascean.ring_one.physical_damage * ascean.ring_two.physical_damage * ascean.amulet.physical_damage * ascean.trinket.physical_damage;
        const magicalDamageModifier = ascean.helmet.magical_damage * ascean.chest.magical_damage * ascean.legs.magical_damage * ascean.ring_one.magical_damage * ascean.ring_two.magical_damage * ascean.amulet.magical_damage * ascean.trinket.magical_damage;
        const critChanceModifier = 
            (ascean.helmet.critical_chance * rarities.helmet) + (ascean.chest.critical_chance * rarities.chest) + (ascean.legs.critical_chance * rarities.legs) + 
            (ascean.ring_one.critical_chance * rarities.ring_one) + (ascean.ring_two.critical_chance * rarities.ring_two) + (ascean.amulet.critical_chance * rarities.amulet) + (ascean.trinket.critical_chance * rarities.trinket);
        const critDamageModifier = 
            (ascean.helmet.critical_damage * rarities.helmet) * (ascean.chest.critical_damage * rarities.chest) * (ascean.legs.critical_damage * rarities.legs) * 
            (ascean.ring_one.critical_damage * rarities.ring_one) * (ascean.ring_two.critical_damage * rarities.ring_two) * (ascean.amulet.critical_damage * rarities.amulet) * (ascean.trinket.critical_damage * rarities.trinket);
        const dodgeModifier = 
            Math.round((ascean.shield.dodge * rarities.shield) + (ascean.helmet.dodge * rarities.helmet) + (ascean.chest.dodge * rarities.chest) + (ascean.legs.dodge * rarities.legs) + 
            (ascean.ring_one.dodge * rarities.ring_one) + (ascean.ring_two.dodge * rarities.ring_two) + (ascean.amulet.dodge * rarities.amulet) + (ascean.trinket.dodge * rarities.trinket) - Math.round(((attributes.agilityMod + attributes.achreMod) / 3)));
        const rollModifier = 
            Math.round((ascean.shield.roll * rarities.shield) + (ascean.helmet.roll * rarities.helmet) + (ascean.chest.roll * rarities.chest) + (ascean.legs.roll * rarities.legs) + 
            (ascean.ring_one.roll * rarities.ring_one) + (ascean.ring_two.roll * rarities.ring_two) + (ascean.amulet.roll * rarities.amulet) + (ascean.trinket.roll * rarities.trinket) + 
            Math.round(((attributes.agilityMod + attributes.achreMod) / 3)));
        const originPhysPenMod = (ascean.origin === 'Fyers' || ascean.origin === 'Notheo' ? 3 : 0)
        const originMagPenMod = (ascean.origin === 'Fyers' || ascean.origin === 'Nothos' ? 3 : 0)
        const physicalPenetration = 
            (ascean.ring_one.physical_penetration * rarities.ring_one) + (ascean.ring_two.physical_penetration * rarities.ring_two) + (ascean.amulet.physical_penetration * rarities.amulet) + (ascean.trinket.physical_penetration * rarities.trinket) + originPhysPenMod;
        const magicalPenetration = 
            (ascean.ring_one.magical_penetration * rarities.ring_one) + (ascean.ring_two.magical_penetration * rarities.ring_two) + (ascean.amulet.magical_penetration * rarities.amulet) + (ascean.trinket.magical_penetration * rarities.trinket) + originMagPenMod;
        const originPhysDefMod = (ascean.origin === 'Sedyreal' || ascean.origin === 'Nothos' ? 3 : 0);
        const originMagDefMod = (ascean.origin === 'Sedyreal' || ascean.origin === 'Notheo' ? 3 : 0);
        const physicalDefenseModifier = 
            Math.round((ascean.helmet.physical_resistance * rarities.helmet) + (ascean.chest.physical_resistance * rarities.chest) + (ascean.legs.physical_resistance * rarities.legs) + 
            (ascean.ring_one.physical_resistance * rarities.ring_one) + (ascean.ring_two.physical_resistance * rarities.ring_two) + (ascean.amulet.physical_resistance * rarities.amulet) + (ascean.trinket.physical_resistance * rarities.trinket) + 
            Math.round(((attributes.constitutionMod + attributes.strengthMod + attributes.kyosirMod) / 8)) + originPhysDefMod);
        const magicalDefenseModifier = 
            Math.round((ascean.helmet.magical_resistance * rarities.helmet) + (ascean.chest.magical_resistance * rarities.chest) + (ascean.legs.magical_resistance * rarities.legs) + 
            (ascean.ring_one.magical_resistance * rarities.ring_one) + (ascean.ring_two.magical_resistance * rarities.ring_two) + (ascean.amulet.magical_resistance * rarities.amulet) + (ascean.trinket.magical_resistance * rarities.trinket) + 
            Math.round(((attributes.constitutionMod + attributes.caerenMod + attributes.kyosirMod) / 8)) + originMagDefMod);
    
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
        const combat_weapon_one = await weaponCompiler(ascean.weapon_one, ascean, attributes, combatStats, rarities.weapon_one)
        const combat_weapon_two = await weaponCompiler(ascean.weapon_two, ascean, attributes, combatStats, rarities.weapon_two)
        const combat_weapon_three = await weaponCompiler(ascean.weapon_three, ascean, attributes, combatStats, rarities.weapon_three)
        const defense = await defenseCompiler(ascean, attributes, combatStats, rarities)
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