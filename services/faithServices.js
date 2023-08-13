const EFFECT = {
    BASE: 1.1,
    LOW: 1.15,
    MEDIUM: 1.25,
    HIGH: 1.5,
    CRITICAL: 2,
    FANTASTIC: 2.5,
    TIPPITY: 10,
    BIPPITY: 15,
    TOP: 100,
    DURATION_MODIFIER: 3,
    DURATION_MAX: 6
};

class StatusEffect {
    constructor(combatData, player, enemy, weapon, attributes, prayer) {
        this.name = this.setName(weapon.influences[0]);
        this.playerName = player.name;
        this.enemyName = enemy.name;
        this.deity = weapon.influences[0];
        this.weapon = weapon.name;
        this.special = this.setSpecial(prayer);
        this.debuffTarget = this.setDebuffTarget(combatData, player, prayer);
        this.duration = this.setDuration(player);
        this.tick = this.setTick(combatData);
        this.intensity = this.setIntensity(weapon, weapon.influences[0], attributes, player);
        this.refreshes = this.setRefreshes(prayer);
        this.stacks = this.setStacks(prayer);
        this.activeStacks = 1;
        this.activeRefreshes = 0;
        this.prayer = prayer;
        this.effect = this.setEffect(combatData, player, weapon, attributes, prayer);
        this.description = this.setDescription(combatData, player, enemy, weapon, attributes, prayer);
        this.imgURL = this.setImgURL(weapon);
        this.startTime = combatData.combatTimer;
        this.endTime = this.startTime + (this.duration * EFFECT.DURATION_MODIFIER);
        this.id = this.setID();
    };

    setID = () => {
        let id = this.name + '_' + this.startTime + '_' + this.endTime;
        return id;
    };
    setSpecial = (prayer) => {
        const specials = ['Avarice', 'Denial', 'Dispel', 'Silence'];
        return specials.includes(prayer) ? true : false;
    };

    static buff(potentialModifiers, realizedModifiers) {
        realizedModifiers.physicalDefenseModifier = potentialModifiers.physicalDefenseModifier ? Math.round(potentialModifiers.physicalDefenseModifier * 100) / 100 : 0;
        realizedModifiers.magicalDefenseModifier = potentialModifiers.magicalDefenseModifier ? Math.round(potentialModifiers.magicalDefenseModifier * 100) / 100 : 0;
        realizedModifiers.physicalPosture = potentialModifiers.physicalPosture ? Math.round(potentialModifiers.physicalPosture * 100) / 100 : 0;
        realizedModifiers.magicalPosture = potentialModifiers.magicalPosture ? Math.round(potentialModifiers.magicalPosture * 100) / 100 : 0;
        realizedModifiers.roll = potentialModifiers.roll ? Math.round(potentialModifiers.roll * 100) / 100 : 0;
        realizedModifiers.dodge = potentialModifiers.dodge ? Math.round(potentialModifiers.dodge * 100) / 100 : 0;
        realizedModifiers.critical_chance = potentialModifiers.critical_chance ? Math.round(potentialModifiers.critical_chance * 100) / 100 : 0;
        realizedModifiers.critical_damage = potentialModifiers.critical_damage ? Math.round(potentialModifiers.critical_damage * 100) / 100 : 0;
        realizedModifiers.physical_penetration = potentialModifiers.physical_penetration ? Math.round(potentialModifiers.physical_penetration * 100) / 100 : 0;
        realizedModifiers.magical_penetration = potentialModifiers.magical_penetration ? Math.round(potentialModifiers.magical_penetration * 100) / 100 : 0;
        realizedModifiers.physical_damage = potentialModifiers.physical_damage ? Math.round(potentialModifiers.physical_damage * 100) / 100 : 0;
        realizedModifiers.magical_damage = potentialModifiers.magical_damage ? Math.round(potentialModifiers.magical_damage * 100) / 100 : 0;
        
        let cleanSlate = {};
        for (let key in realizedModifiers) {
            if (realizedModifiers[key] !== 0) {
                cleanSlate[key] = realizedModifiers[key];
            };
        };
        return cleanSlate;
    };
    static damage(potentialModifiers, realizedModifiers) {
        realizedModifiers.damage = potentialModifiers.damage;
        return realizedModifiers;
    };
    static debuff(potentialModifiers, realizedModifiers) {
        realizedModifiers.physicalDefenseModifier = potentialModifiers.physicalDefenseModifier ? Math.round(potentialModifiers.physicalDefenseModifier * 100) / 100 : 0;
        realizedModifiers.magicalDefenseModifier = potentialModifiers.magicalDefenseModifier ? Math.round(potentialModifiers.magicalDefenseModifier * 100) / 100 : 0;
        realizedModifiers.physicalPosture = potentialModifiers.physicalPosture ? Math.round(potentialModifiers.physicalPosture * 100) / 100 : 0;
        realizedModifiers.magicalPosture = potentialModifiers.magicalPosture ? Math.round(potentialModifiers.magicalPosture * 100) / 100 : 0;
        realizedModifiers.roll = potentialModifiers.roll ? Math.round(potentialModifiers.roll * 100) / 100 : 0;
        realizedModifiers.dodge = potentialModifiers.dodge ? Math.round(potentialModifiers.dodge * 100) / 100 : 0;
        realizedModifiers.critical_chance = potentialModifiers.critical_chance ? Math.round(potentialModifiers.critical_chance * 100) / 100 : 0;
        realizedModifiers.critical_damage = potentialModifiers.critical_damage ? Math.round(potentialModifiers.critical_damage * 100) / 100 : 0;
        realizedModifiers.physical_penetration = potentialModifiers.physical_penetration ? Math.round(potentialModifiers.physical_penetration * 100) / 100 : 0;
        realizedModifiers.magical_penetration = potentialModifiers.magical_penetration ? Math.round(potentialModifiers.magical_penetration * 100) / 100 : 0;
        realizedModifiers.physical_damage = potentialModifiers.physical_damage ? Math.round(potentialModifiers.physical_damage * 100) / 100 : 0;
        realizedModifiers.magical_damage = potentialModifiers.magical_damage ? Math.round(potentialModifiers.magical_damage * 100) / 100 : 0;
    
        let cleanSlate = {};
        for (let key in realizedModifiers) {
            if (realizedModifiers[key] !== 0) {
                cleanSlate[key] = realizedModifiers[key];
            };
        };
        return cleanSlate;
    };
    static heal(potentialModifiers, realizedModifiers) {
        realizedModifiers.healing = potentialModifiers.healing;
        return realizedModifiers;
    };
    static getDeity = () => {
        return this.deity;
    };
    static setModifiers = (weapon, potentialModifiers, playerDamage, effectModifiers) => {
        switch(weapon.influences[0]) {
            case "Daethos": {
                potentialModifiers.physical_damage = playerDamage / EFFECT.TIPPITY;
                potentialModifiers.magical_damage = playerDamage / EFFECT.TIPPITY;
                potentialModifiers.physical_penetration = playerDamage / EFFECT.TIPPITY;
                potentialModifiers.magical_penetration = playerDamage / EFFECT.TIPPITY;

                potentialModifiers.damage = playerDamage;
                potentialModifiers.healing = playerDamage;
                break;
            };
            case "Achreo": {
                potentialModifiers.physical_damage = playerDamage / EFFECT.TIPPITY;
                potentialModifiers.magical_damage = playerDamage / EFFECT.TIPPITY;
                potentialModifiers.critical_chance = playerDamage / EFFECT.TIPPITY;
                potentialModifiers.critical_damage = playerDamage / EFFECT.TOP;

                potentialModifiers.damage = playerDamage;
                potentialModifiers.healing = playerDamage * EFFECT.MEDIUM;
                break;
            };
            case "Ahn've": {
                potentialModifiers.critical_damage = effectModifiers.critical_damage * EFFECT.LOW;
                potentialModifiers.dodge = effectModifiers.dodge * EFFECT.LOW;

                potentialModifiers.damage = playerDamage;
                potentialModifiers.healing = effectModifiers.healing;
                break;
            };
            case "Astra": {
                potentialModifiers.critical_chance = effectModifiers.critical_chance;
                potentialModifiers.critical_damage = effectModifiers.critical_damage / EFFECT.HIGH;
                potentialModifiers.roll = effectModifiers.roll;

                potentialModifiers.damage = effectModifiers.damage;
                potentialModifiers.healing = effectModifiers.healing;
                break;
            };
            case "Cambire": {
                potentialModifiers.critical_chance = effectModifiers.critical_chance;
                potentialModifiers.roll = effectModifiers.roll;
                potentialModifiers.magical_damage = effectModifiers.magical_damage;

                potentialModifiers.damage = playerDamage;
                potentialModifiers.healing = effectModifiers.healing;
                break;
            };
            case "Chiomyr": {
                potentialModifiers.physical_penetration = effectModifiers.physical_penetration;
                potentialModifiers.magical_penetration = effectModifiers.magical_penetration;
                potentialModifiers.critical_chance = effectModifiers.critical_chance;

                potentialModifiers.damage = playerDamage * EFFECT.HIGH;
                potentialModifiers.healing = effectModifiers.healing;
                break;
            };
            case "Fyer": {
                potentialModifiers.critical_chance = effectModifiers.critical_chance / EFFECT.CRITICAL;
                potentialModifiers.critical_damage = effectModifiers.critical_damage * EFFECT.BASE;
            
                potentialModifiers.damage = effectModifiers.damage;
                potentialModifiers.healing = effectModifiers.healing;
                break;
            };
            case "Ilios": {
                potentialModifiers.physical_penetration = effectModifiers.physical_penetration / EFFECT.HIGH;
                potentialModifiers.magical_penetration = effectModifiers.magical_penetration / EFFECT.HIGH;
                potentialModifiers.physicalDefenseModifier = effectModifiers.physicalDefenseModifier / EFFECT.HIGH;
                potentialModifiers.magicalDefenseModifier = effectModifiers.magicalDefenseModifier / EFFECT.HIGH;
                potentialModifiers.physicalPosture = effectModifiers.physicalPosture / EFFECT.HIGH;
                potentialModifiers.magicalPosture = effectModifiers.magicalPosture / EFFECT.HIGH;

                potentialModifiers.damage = playerDamage;
                potentialModifiers.healing = playerDamage * EFFECT.MEDIUM;
                break;
            };
            case "Kyn'gi": {
                potentialModifiers.critical_chance = effectModifiers.critical_chance * EFFECT.LOW;
                potentialModifiers.roll = effectModifiers.roll * EFFECT.LOW;

                potentialModifiers.damage = effectModifiers.damage;
                potentialModifiers.healing = effectModifiers.healing;
                break;
            };
            case "Kyrisos": {
                potentialModifiers.physicalDefenseModifier = effectModifiers.physicalDefenseModifier;
                potentialModifiers.magicalDefenseModifier = effectModifiers.magicalDefenseModifier;
                potentialModifiers.roll = effectModifiers.roll;
            
                potentialModifiers.damage = effectModifiers.damage;
                potentialModifiers.healing = playerDamage * EFFECT.HIGH;
                break;
            };
            case "Kyr'na": {
                potentialModifiers.magical_damage = effectModifiers.magical_damage;
                potentialModifiers.magical_penetration = effectModifiers.magical_penetration;
                
                potentialModifiers.damage = effectModifiers.damage * EFFECT.FANTASTIC;
                potentialModifiers.healing = effectModifiers.healing * EFFECT.MEDIUM;
                break;
            };
            case "Lilos": {
                potentialModifiers.physical_penetration = effectModifiers.physical_penetration;
                potentialModifiers.physical_damage = effectModifiers.physical_damage;

                potentialModifiers.healing = effectModifiers.healing * EFFECT.FANTASTIC;
                potentialModifiers.damage = effectModifiers.damage * EFFECT.MEDIUM;
                break;
            };
            case "Ma'anre": {
                potentialModifiers.roll = effectModifiers.roll / EFFECT.MEDIUM;
                potentialModifiers.dodge = effectModifiers.dodge / EFFECT.MEDIUM;
                potentialModifiers.critical_chance = effectModifiers.critical_chance / EFFECT.MEDIUM;
                potentialModifiers.critical_damage = effectModifiers.critical_damage / EFFECT.MEDIUM;

                potentialModifiers.damage = playerDamage * EFFECT.MEDIUM;
                potentialModifiers.healing = playerDamage;
                break;
            };
            case "Nyrolus": {
                potentialModifiers.physicalDefenseModifier = effectModifiers.physicalDefenseModifier / EFFECT.MEDIUM;
                potentialModifiers.magicalDefenseModifier = effectModifiers.magicalDefenseModifier;
                potentialModifiers.physicalPosture = effectModifiers.physicalPosture / EFFECT.MEDIUM;
                potentialModifiers.magicalPosture = effectModifiers.magicalPosture;

                potentialModifiers.damage = effectModifiers.damage;
                potentialModifiers.healing = effectModifiers.healing * EFFECT.HIGH;
                break;
            };
            case "Quor'ei": {
                potentialModifiers.physicalDefenseModifier = effectModifiers.physicalDefenseModifier;
                potentialModifiers.magicalDefenseModifier = effectModifiers.magicalDefenseModifier / EFFECT.MEDIUM;
                potentialModifiers.physicalPosture = effectModifiers.physicalPosture;
                potentialModifiers.magicalPosture = effectModifiers.magicalPosture / EFFECT.MEDIUM;

                potentialModifiers.damage = effectModifiers.damage;
                potentialModifiers.healing = effectModifiers.healing * EFFECT.HIGH;
                break;
            };
            case "Rahvre": {
                potentialModifiers.magical_damage = effectModifiers.magical_damage;
                potentialModifiers.magical_penetration = effectModifiers.magical_penetration;
                potentialModifiers.critical_damage = effectModifiers.critical_damage / EFFECT.HIGH;

                potentialModifiers.damage = effectModifiers.damage;
                potentialModifiers.healing = effectModifiers.healing;
                break;
            };
            case "Senari": {
                potentialModifiers.critical_chance = effectModifiers.critical_chance / EFFECT.CRITICAL;
                potentialModifiers.roll = effectModifiers.roll;
                potentialModifiers.dodge = effectModifiers.dodge;

                potentialModifiers.damage = effectModifiers.damage;
                potentialModifiers.healing = effectModifiers.healing;
                break;
            };
            case "Se'dyro": {
                potentialModifiers.critical_chance = effectModifiers.critical_chance;
                potentialModifiers.physical_penetration = effectModifiers.physical_penetration;
                potentialModifiers.magical_penetration = effectModifiers.magical_penetration;

                potentialModifiers.damage = playerDamage;
                potentialModifiers.healing = playerDamage;
                break;
            };
            case "Se'vas": {
                potentialModifiers.critical_chance = effectModifiers.critical_chance * EFFECT.BASE;
                potentialModifiers.critical_damage = effectModifiers.critical_damage * EFFECT.BASE;

                potentialModifiers.damage = effectModifiers.damage;
                potentialModifiers.healing = effectModifiers.healing;
                break;
            };
            case "Shrygei": {
                potentialModifiers.physical_penetration = effectModifiers.physical_penetration * EFFECT.BASE;
                potentialModifiers.magical_penetration = effectModifiers.magical_penetration * EFFECT.BASE;

                potentialModifiers.damage = effectModifiers.damage;
                potentialModifiers.healing = effectModifiers.healing;
                break;
            };
            case "Tshaer": {
                potentialModifiers.physical_damage = effectModifiers.physical_damage;
                potentialModifiers.physical_penetration = effectModifiers.physical_penetration;
                potentialModifiers.critical_chance = effectModifiers.critical_chance;

                potentialModifiers.damage = effectModifiers.damage;
                potentialModifiers.healing = effectModifiers.healing;
                break;
            };
            default: {
                break;
            };
        };
        return potentialModifiers;
    };
    static updateEffectStack(statusEffect, combatData, player, weapon) {
        let updatedEffect = statusEffect;
        updatedEffect.tick.end += 2;
        updatedEffect.endTime += EFFECT.DURATION_MAX;
        updatedEffect.activeStacks += 1;
        let playerIntensity = updatedEffect.intensity.initial * updatedEffect.intensity.magnitude;
        let isEnemy = combatData.computer === undefined ? combatData.enemy : combatData.computer;
        let playerFaith = combatData.player.name === player.name ? combatData.player.faith : isEnemy.faith;
        if ((weapon.influences[0] === 'Daethos' && playerFaith === 'devoted') || (weapon.influences[0] !== 'Daethos' && playerFaith === 'adherent')) {
            playerIntensity *= EFFECT.LOW;
        };
        updatedEffect.intensity.value += playerIntensity;
        let effectModifiers = {
            physical_damage: playerIntensity,
            magical_damage: playerIntensity,
            physical_penetration: playerIntensity,
            magical_penetration: playerIntensity,
            critical_chance: playerIntensity,
            critical_damage: playerIntensity / EFFECT.TIPPITY,
            physicalDefenseModifier: playerIntensity,
            magicalDefenseModifier: playerIntensity,
            physicalPosture: playerIntensity,
            magicalPosture: playerIntensity,
            dodge: playerIntensity,
            roll: playerIntensity,
            constitution: playerIntensity,
            strength: playerIntensity,
            agility: playerIntensity,
            achre: playerIntensity,
            caeren: playerIntensity,
            kyosir: playerIntensity,
            healing: playerIntensity * EFFECT.BIPPITY,
            damage: playerIntensity * EFFECT.BIPPITY,
            buff: playerIntensity,
            debuff: playerIntensity,
        };
        let potentialModifiers = {};
        let realizedModifiers = {};
        let enemyDamage = combatData.computer === undefined ? combatData.realized_enemy_damage : combatData.realizedComputerDamage;
        let playerDamage = combatData.player.name === player.name ? combatData.realizedPlayerDamage : enemyDamage;

        playerDamage = effectModifiers.damage; 
        potentialModifiers = StatusEffect.setModifiers(weapon, potentialModifiers, playerDamage, effectModifiers); 

        switch (updatedEffect.prayer) {
            case "Buff": {
                realizedModifiers = StatusEffect.buff(potentialModifiers, realizedModifiers);
                break;
            };
            case "Damage": {
                realizedModifiers = StatusEffect.damage(potentialModifiers, realizedModifiers);
                realizedModifiers.damage *= updatedEffect.activeStacks;
                break;
            };
            default:
                break;
        };

        updatedEffect.effect = realizedModifiers;
        return updatedEffect;
    };

    setActiveStacks(intensity) {
        return this.activeStacks = intensity.value / intensity.initial; // Value is the cumulative stacking of the initial intensity. Initial is the base intensity.
    };
    setDebuffTarget(data, player, prayer) {
        if (prayer !== 'Debuff') return null;
        let enemyWeapon = data.computerWeapons === undefined ? data.enemy_weapons[0].name : data.computerWeapons[0].name;
        if (player.name === data.player.name) {
            return this.debuffTarget = enemyWeapon;
        } else {
            return this.debuffTarget = data.weapons[0].name;
        };
    };
    setDuration(player) {
        let duration = Math.floor(player.level / EFFECT.DURATION_MODIFIER + 1) > EFFECT.DURATION_MAX ? EFFECT.DURATION_MAX : Math.floor(player.level / EFFECT.DURATION_MODIFIER + 1);
        return this.duration = duration;
    };
    setImgURL = (weap) => {
        return this.imgURL = weap.imgURL;
    };
    setIntensity(weapon, deity, attributes, player) {
        let attribute = 0;
        let type = '';
        if (deity === 'Achreo' || deity === 'Astra' || deity === "Quor'ei" || deity === "Senari") {
            if (weapon.grip === 'One Hand' || weapon.type === 'Bow') {
                type = 'Achre';
                attribute = (attributes.totalAchre + weapon.achre) * (player.mastery === type ? 1.5 : 1.25);
            } else {
                type = 'Caeren';
                attribute = attributes.totalCaeren + weapon.caeren * (player.mastery === type ? 1.25 : 1);
            };
        } else if (deity === "Ahn've" || deity === "Cambire" || deity === "Fyer" || deity === "Nyrolus") {
            if (weapon.grip === 'One Hand') {
                type = 'Achre';
                attribute = attributes.totalAchre + weapon.achre * (player.mastery === type ? 1.25 : 1);
            } else {
                type = 'Caeren';
                attribute = (attributes.totalCaeren + weapon.caeren) * (player.mastery === type ? 1.5 : 1.25);
            };
        } else if (deity === "Kyn'gi" || deity === "Se'dyro" || deity === "Ma'anre") {
            if (weapon.grip === 'One Hand' || weapon.type === 'Bow') {
                type = 'Agility';
                attribute = (attributes.totalAgility + weapon.agility) * (player.mastery === type ? 1.5 : 1.25);
            } else {
                type = 'Strength';
                attribute = attributes.totalStrength + weapon.strength * (player.mastery === type ? 1.25 : 1);
            };
        } else if (deity === "Ilios" || deity === "Se'vas" || deity === "Tshaer") {
            if (weapon.grip === 'One Hand') {
                type = 'Agility';
                attribute = attributes.totalAgility + weapon.agility * (player.mastery === type ? 1.25 : 1);
            } else {
                type = 'Strength';
                attribute = (attributes.totalStrength + weapon.strength) * (player.mastery === type ? 1.5 : 1.25);
            };
        } else if (deity === "Chiomyr" || deity === "Kyrisos" || deity === "Shrygei") {
            type = 'Kyosir';
            attribute = (attributes.totalKyosir + weapon.kyosir) * (player.mastery === type ? 1.5 : 1.25);
        } else if (deity === "Lilos" || deity === "Kyr'na" || deity === "Rahvre") {
            type = 'Constitution';
            attribute = (attributes.totalConstitution) * (player.mastery === type ? 2 : 1.5);
        } else if (deity === "Daethos") {
            if (weapon.grip === 'One Hand' || weapon.type === 'Bow') {
                type = 'daethic';
                attribute = (attributes.totalAchre + weapon.achre + attributes.totalAgility + weapon.agility) / (player.mastery === 'Achre' || player.mastery === 'Agility' ? 1 : 1.5);
            } else {
                type = 'daethic';
                attribute = (attributes.totalStrength + weapon.strength + attributes.totalCaeren + weapon.caeren) / (player.mastery === 'Caeren' || player.mastery === 'Strength' ? 1 : 1.5);
            };
        };
        attribute = Math.round(attribute * 100) / 100;
        return this.intensity = {
            initial: attribute,
            value: attribute,
            magnitude: player.level / 120,
            governance: type,
        };
    };
    setName(deity) {
        return this.name = `Gift of ${deity}`;
    };
    setTick(combatData) {
        return this.tick = {
            start: combatData.combatRound,
            end: combatData.combatRound + this.duration,
        };
    };
    setRefreshes(prayer) {
        return this.refreshes = prayer === 'Heal' || prayer === 'Debuff' || prayer === 'Avarice' || prayer === 'Denial' || prayer === 'Dispel' || prayer === 'Silence' ? true : false;
    };
    setStacks(prayer) {
        return this.stacks = prayer === 'Buff' || prayer === 'Damage' ? true : false;
    };

    setEffect(combatData, player, weapon, attributes, prayer) {
        if (this.setSpecial(prayer)) return;
        let intensity = {};
        intensity = this.setIntensity(weapon, weapon.influences[0], attributes, player)
        let playerIntensity = intensity.value * intensity.magnitude;

        let enemyFaith = combatData.computer === undefined ? combatData.enemy : combatData.computer;
        let playerFaith = combatData.player.name === player.name ? combatData.player.faith : enemyFaith.faith;
        if (weapon.influences[0] === 'Daethos' && playerFaith === 'devoted') {
            playerIntensity *= EFFECT.LOW;
        };
        if (weapon.influences[0] !== 'Daethos' && playerFaith === 'adherent') {
            playerIntensity *= EFFECT.LOW;
        };
        let effectModifiers = {
            physical_damage: playerIntensity,
            magical_damage: playerIntensity,
            physical_penetration: playerIntensity,
            magical_penetration: playerIntensity,
            critical_chance: playerIntensity,
            critical_damage: playerIntensity / 10,
            physicalDefenseModifier: playerIntensity,
            magicalDefenseModifier: playerIntensity,
            physicalPosture: playerIntensity,
            magicalPosture: playerIntensity,
            dodge: playerIntensity,
            roll: playerIntensity,
            constitution: playerIntensity,
            strength: playerIntensity,
            agility: playerIntensity,
            achre: playerIntensity,
            caeren: playerIntensity,
            kyosir: playerIntensity,
            healing: playerIntensity * 15,
            damage: playerIntensity * 15,
            buff: playerIntensity,
            debuff: playerIntensity,
        };
        let potentialModifiers = {};
        let realizedModifiers = {};

        let enemyDamage = combatData.computer === undefined ? combatData.realized_enemy_damage : combatData.realizedComputerDamage;
        let playerDamage = combatData.player.name === player.name ? combatData.realizedPlayerDamage : enemyDamage;
        playerDamage = effectModifiers.damage; 
        potentialModifiers = StatusEffect.setModifiers(weapon, potentialModifiers, playerDamage, effectModifiers);

        switch (prayer) {
            case "Buff": {
                return this.effect = StatusEffect.buff(potentialModifiers, realizedModifiers);
            };
            case "Damage": {
                return this.effect = StatusEffect.damage(potentialModifiers, realizedModifiers);
            };
            case "Debuff": {
                return this.effect = StatusEffect.debuff(potentialModifiers, realizedModifiers);
            };
            case "Heal": {
                return this.effect = StatusEffect.heal(potentialModifiers, realizedModifiers);
            };
        };
        return this.effect = realizedModifiers;
    }; 
    setDescription(combatData, player, enemy, weapon, attributes, prayer) {
        let duration = this.setDuration(player);
        let effect = this.setEffect(combatData, player, weapon, attributes, prayer);
        const article = ['a','e','i','o','u'].includes(weapon.name[0].toLowerCase()) ? "an" : "a";
        if (this.setSpecial(prayer)) {
            return this.description = `${weapon.influences[0]} has channeled an old, lost prayer through their sigil, ${article} ${weapon.name}.`
        };
        let description = `${weapon.influences[0]} has channeled a gift through their sigil, ${article} ${weapon.name}, ${prayer === 'Debuff' ? `cursing ${enemy.name}` : prayer === 'Heal' ? `renewing ${player.name} for ${Math.round(effect.healing * 0.33)} per round` : prayer === 'Damage' ? `damaging ${enemy.name} for ${Math.round(effect.damage * 0.33)} per tick` : `blessing ${player.name}`} for ${duration} combat rounds [Initial].`;
        return this.description = description;
    };

};

module.exports = StatusEffect;