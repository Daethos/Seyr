//TODO:FIXME: Maybe create a faithServices.js file to handle all the faith related functions?
//TODO:FIXME: Remake effect into a new class perhaps with getters and setters for the properties?

// What needs to be sent to be dynamic? 
// combatData, statusEffects (combatData.playerEffects), player (combatData.player), enemy (combatData.opponent)
// weapon (combatData.weapons[0]), faith (combatData.weapons[0].influences[0] (( Not Necessary)) ), prayer (combatData.playerBlessing i.e. 'Heal' 'Debuff')
// attributes (combatData.player_attributes), style, behavior = These are now generated via the prayer arg


class StatusEffect {
    constructor(combatData, player, enemy, weapon, attributes, prayer) {
        // May have to juggle the order of these args and the order of the properties and how they are derived. Not sure
        this.name = this.setName(weapon.influences[0]);
        this.deity = weapon.influences[0];
        this.weapon = weapon.name;
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
    }
    static getDeity() {
        return this.deity;
    }
    getEffect() {
        return this.effect;
    }
    getDuration() {
        return this.duration;
    }
    getTick() {
        return this.tick;
    }
    getPrayer() {
        return this.prayer;
    }
    getIntensity() {
        return this.intensity;
    }
    getActiveStacks() {
        return this.activeStacks;
    }
    getEffect() {
        return this.effect;
    }
    getDescription() {
        return this.description;
    }
    getImgURL() {
        return this.imgURL;
    }

    
    setName(deity) {
        return this.name = `Gift of ${deity}`;
    }
    setDebuffTarget(data, player, prayer) {
        if (prayer !== 'Debuff') return null;
        if (player.name === data.player.name) {
            return this.debuffTarget = data.computer_weapons[0].name;
        } else {
            return this.debuffTarget = data.weapons[0].name;
        }
    }
    setDuration(player) {
        let duration = Math.floor(player.level / 3 + 1) > 6 ? 6 : Math.floor(player.level / 3 + 1);
        return this.duration = duration;
    }
    setTick(combatData) {
        return this.tick = {
            start: combatData.combatRound,
            end: combatData.combatRound + this.duration,
        };
    }
    setRefreshes(prayer) {
        return this.refreshes = prayer === 'Heal' || prayer === 'Debuff' ? true : false;
    }
    setStacks(prayer) {
        return this.stacks = prayer === 'Buff' || prayer === 'Damage' ? true : false;
    }
    setIntensity(weapon, deity, attributes, player) {
        let attribute = 0;
        let type = '';

        if (deity === 'Achreo' || deity === 'Astra' || deity === "Quor'ei" || deity === "Senari") {
            attribute = attributes.totalAchre + weapon.achre;
            type = 'achre';
        } else if (deity === "Ahn've" || deity === "Cambire" || deity === "Fyer" || deity === "Nyrolus") {
            attribute = attributes.totalCaeren + weapon.caeren;
            type = 'caeren';
        } else if (deity === "Kyn'gi" || deity === "Se'dyro" || deity === "Ma'anre") {
            attribute = attributes.totalAgility + weapon.agility;
            type = 'agility';
        } else if (deity === "Ilios" || deity === "Se'vas" || deity === "Tshaer") {
            attribute = attributes.totalStrength + weapon.strength;
            type = 'strength';
        } else if (deity === "Chiomyr" || deity === "Kyrisos" || deity === "Shrygei") {
            attribute = attributes.totalKyosir + weapon.kyosir;
            type = 'kyosir';
        } else if (deity === "Lilos" || deity === "Kyr'na") {
            attribute = attributes.totalConstitution + weapon.constitution;
            type = 'constitution';
        } else if (deity === "Daethos" || deity === "Rahvre") {
            attribute = (attributes.totalAchre + weapon.achre + attributes.totalCaeren + weapon.caeren) / 2;
            type = 'daethic';
        }

        return this.intensity = {
            initial: attribute,
            value: attribute,
            magnitude: player.level / 100,
            governance: type,
        };
        
    }
    static updateEffectStack(statusEffect, combatData, player, weapon, attributes, prayer) {
        console.log(statusEffect, 'Status Effect in Update Effect Stack');

        let intensity = {
            initial: statusEffect.intensity.initial,
            value: statusEffect.intensity.value,
            magnitude: statusEffect.intensity.magnitude,
        };

        console.log(intensity, 'Status Effect in Update Effect Stack');
        // This Is What Creates The Effect
        let playerIntensity = intensity.value * intensity.magnitude;

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
            healing: playerIntensity,
            damage: playerIntensity,
            buff: playerIntensity,
            debuff: playerIntensity,
        };
        let potentialModifiers = {};
        let realizedModifiers = {};

        let playerDamage = combatData.player.name === player.name ? combatData.realized_player_damage : combatData.realized_computer_damage;
        let playerFaith = combatData.player.name === player.name ? combatData.player.faith : combatData.computer.faith;
        let playerMastery = combatData.player.name === player.name ? combatData.player.mastery : combatData.computer.mastery;
        let weaponInfluence = weapon.influences[0];

        // So setting up the intensity and modifiers, I can filter which ones are relevant to the weapon's influence.
        switch(weapon.influences[0]) {
            case "Daethos": {
                potentialModifiers.physical_damage = effectModifiers.physical_damage / 2;
                potentialModifiers.magical_damage = effectModifiers.magical_damage / 2;

                potentialModifiers.damage = playerDamage / 2;
                potentialModifiers.healing = playerDamage / 2;
                break;
            }
            case "Achreo": {
                potentialModifiers.physical_damage = effectModifiers.physical_damage / 2;
                potentialModifiers.magical_damage = effectModifiers.magical_damage / 2;
                potentialModifiers.critical_chance = effectModifiers.critical_chance / 2;
                potentialModifiers.critical_damage = effectModifiers.critical_damage / 2;

                potentialModifiers.damage = effectModifiers.damage;
                potentialModifiers.healing = effectModifiers.healing;
                break;
            }
            case "Ahn've": {
                potentialModifiers.critical_damage = effectModifiers.critical_damage / 2;
                potentialModifiers.dodge = effectModifiers.dodge / 2;

                potentialModifiers.damage = playerDamage;
                potentialModifiers.healing = effectModifiers.healing;
                break;
            }
            case "Astra": {
                potentialModifiers.critical_chance = effectModifiers.critical_chance;
                potentialModifiers.critical_damage = effectModifiers.critical_damage / 2;
                potentialModifiers.roll = effectModifiers.roll / 2;

                potentialModifiers.damage = effectModifiers.damage;
                potentialModifiers.healing = effectModifiers.healing;
                break;
            }
            case "Cambire": {
                potentialModifiers.critical_chance = effectModifiers.critical_chance / 2;
                potentialModifiers.roll = effectModifiers.roll / 2;
                potentialModifiers.magical_damage = effectModifiers.magical_damage / 2;

                potentialModifiers.damage = playerDamage;
                potentialModifiers.healing = effectModifiers.healing;
                break;
            }
            case "Chiomyr": {
                potentialModifiers.physical_penetration = effectModifiers.physical_penetration;
                potentialModifiers.magical_penetration = effectModifiers.magical_penetration;
                potentialModifiers.critical_chance = effectModifiers.critical_chance;

                potentialModifiers.damage = effectModifiers.damage;
                potentialModifiers.healing = effectModifiers.healing;
                break;
            }
            case "Fyer": {
                potentialModifiers.critical_chance = effectModifiers.critical_chance / 2;
                potentialModifiers.critical_damage = effectModifiers.critical_damage;
            
                potentialModifiers.damage = effectModifiers.damage;
                potentialModifiers.healing = effectModifiers.healing;
                break;
            }
            case "Ilios": {
                potentialModifiers.physical_penetration = effectModifiers.physical_penetration / 2;
                potentialModifiers.magical_penetration = effectModifiers.magical_penetration / 2;
                potentialModifiers.physicalDefenseModifier = effectModifiers.physicalDefenseModifier / 4;
                potentialModifiers.magicalDefenseModifier = effectModifiers.magicalDefenseModifier / 4;
                potentialModifiers.physicalPosture = effectModifiers.physicalPosture / 4;
                potentialModifiers.magicalPosture = effectModifiers.magicalPosture / 4;

                potentialModifiers.damage = effectModifiers.damage;
                potentialModifiers.healing = playerDamage / 2;
                break;
            }
            case "Kyn'gi": {
                potentialModifiers.critical_chance = effectModifiers.critical_chance;
                potentialModifiers.roll = effectModifiers.roll;

                potentialModifiers.damage = effectModifiers.damage;
                potentialModifiers.healing = effectModifiers.healing;
                break;
            }
            case "Kyrisos": {
                potentialModifiers.physicalDefenseModifier = effectModifiers.physicalDefenseModifier;
                potentialModifiers.magicalDefenseModifier = effectModifiers.magicalDefenseModifier;
                potentialModifiers.roll = effectModifiers.roll;
            
                potentialModifiers.damage = effectModifiers.damage;
                potentialModifiers.healing = effectModifiers.healing;
                break;
            }
            case "Kyr'na": {
                potentialModifiers.magical_damage = effectModifiers.magical_damage;
                potentialModifiers.magical_penetration = effectModifiers.magical_penetration;
                
                potentialModifiers.damage = effectModifiers.damage * 2;
                potentialModifiers.healing = effectModifiers.healing;
                break;
            }
            case "Lilos": {
                potentialModifiers.physical_penetration = effectModifiers.physical_penetration;
                potentialModifiers.physical_damage = effectModifiers.physical_damage;

                potentialModifiers.healing = effectModifiers.healing * 2;
                potentialModifiers.damage = effectModifiers.damage;
                break;
            }
            case "Ma'anre": {
                potentialModifiers.roll = effectModifiers.roll / 2;
                potentialModifiers.dodge = effectModifiers.dodge / 2;
                potentialModifiers.critical_chance = effectModifiers.critical_chance / 2;
                potentialModifiers.critical_damage = effectModifiers.critical_damage / 2;

                potentialModifiers.damage = playerDamage / 2;
                potentialModifiers.healing = effectModifiers.healing;
                break;
            }
            case "Nyrolus": {
                potentialModifiers.physicalDefenseModifier = effectModifiers.physicalDefenseModifier / 2;
                potentialModifiers.magicalDefenseModifier = effectModifiers.magicalDefenseModifier;
                potentialModifiers.physicalPosture = effectModifiers.physicalPosture / 2;
                potentialModifiers.magicalPosture = effectModifiers.magicalPosture;

                potentialModifiers.damage = effectModifiers.damage;
                potentialModifiers.healing = effectModifiers.healing;
                break;
            }
            case "Quor'ei": {
                potentialModifiers.physicalDefenseModifier = effectModifiers.physicalDefenseModifier;
                potentialModifiers.magicalDefenseModifier = effectModifiers.magicalDefenseModifier / 2;
                potentialModifiers.physicalPosture = effectModifiers.physicalPosture;
                potentialModifiers.magicalPosture = effectModifiers.magicalPosture / 2;

                potentialModifiers.damage = effectModifiers.damage;
                potentialModifiers.healing = effectModifiers.healing;
                break;
            }
            case "Rahvre": {
                potentialModifiers.magical_damage = effectModifiers.magical_damage;
                potentialModifiers.magical_penetration = effectModifiers.magical_penetration;

                potentialModifiers.damage = effectModifiers.damage;
                potentialModifiers.healing = effectModifiers.healing;
                break;
            }
            case "Senari": {
                potentialModifiers.roll = effectModifiers.roll;
                potentialModifiers.dodge = effectModifiers.dodge;

                potentialModifiers.damage = effectModifiers.damage;
                potentialModifiers.healing = effectModifiers.healing;
                break;
            }
            case "Se'dyro": {
                potentialModifiers.critical_chance = effectModifiers.critical_chance;
                potentialModifiers.physical_penetration = effectModifiers.physical_penetration / 2;
                potentialModifiers.magical_penetration = effectModifiers.magical_penetration / 2;

                potentialModifiers.damage = playerDamage;
                potentialModifiers.healing = playerDamage / 2;
                break;
            }
            case "Se'vas": {
                potentialModifiers.critical_chance = effectModifiers.critical_chance;
                potentialModifiers.critical_damage = effectModifiers.critical_damage;

                potentialModifiers.damage = effectModifiers.damage;
                potentialModifiers.healing = effectModifiers.healing;
                break;
            }
            case "Shrygei": {
                potentialModifiers.physical_penetration = effectModifiers.physical_penetration;
                potentialModifiers.magical_penetration = effectModifiers.magical_penetration;

                potentialModifiers.damage = effectModifiers.damage;
                potentialModifiers.healing = effectModifiers.healing;
                break;
            }
            case "Tshaer": {
                potentialModifiers.physical_damage = effectModifiers.physical_damage;
                potentialModifiers.physical_penetration = effectModifiers.physical_penetration;

                potentialModifiers.damage = effectModifiers.damage;
                potentialModifiers.healing = effectModifiers.healing;
                break;
            }
            default: {
                break;
            }
        }
        console.log(prayer, 'This is the prayer')
        // Make the functions for the various status effects
        switch (prayer) {
            case "Buff": {
                return this.effect = StatusEffect.updateBuff(combatData, player, weapon, potentialModifiers, realizedModifiers);
            }
            case "Damage": {
                return this.effect = StatusEffect.updateDamage(combatData, player, weapon, potentialModifiers, realizedModifiers);
            }
            case "Debuff": {
                return this.effect = StatusEffect.updateDebuff(combatData, player, weapon, potentialModifiers, realizedModifiers);
            }
            case "Heal": {
                return this.effect = StatusEffect.updateHeal(combatData, player, weapon, potentialModifiers, realizedModifiers);
            }
        }

        console.log(realizedModifiers, 'Realized Modifiers From Set Effect');

        return this.effect = realizedModifiers;
    }

    static updateBuff(combatData, player, weapon, potentialModifiers, realizedModifiers) {

        realizedModifiers.physicalDefenseModifier = potentialModifiers.physicalDefenseModifier ? Math.round(potentialModifiers.physicalDefenseModifier) : 0;
        realizedModifiers.magicalDefenseModifier = potentialModifiers.magicalDefenseModifier ? Math.round(potentialModifiers.magicalDefenseModifier) : 0;
        realizedModifiers.physicalPosture = potentialModifiers.physicalPosture ? Math.round(potentialModifiers.physicalPosture) : 0;
        realizedModifiers.magicalPosture = potentialModifiers.magicalPosture ? Math.round(potentialModifiers.magicalPosture) : 0;
        realizedModifiers.roll = potentialModifiers.roll ? Math.round(potentialModifiers.roll) : 0;
        realizedModifiers.dodge = potentialModifiers.dodge ? Math.round(potentialModifiers.dodge) : 0;
        realizedModifiers.critical_chance = potentialModifiers.critical_chance ? Math.round(potentialModifiers.critical_chance) : 0;
        realizedModifiers.critical_damage = potentialModifiers.critical_damage ? Math.round(potentialModifiers.critical_damage) : 0;
        realizedModifiers.physical_penetration = potentialModifiers.physical_penetration ? Math.round(potentialModifiers.physical_penetration) : 0;
        realizedModifiers.magical_penetration = potentialModifiers.magical_penetration ? Math.round(potentialModifiers.magical_penetration) : 0;
        realizedModifiers.physical_damage = potentialModifiers.physical_damage ? Math.round(potentialModifiers.physical_damage) : 0;
        realizedModifiers.magical_damage = potentialModifiers.magical_damage ? Math.round(potentialModifiers.magical_damage) : 0;
        
        let cleanSlate = {};
        for (let key in realizedModifiers) {
            if (realizedModifiers[key] !== 0) {
                cleanSlate[key] = realizedModifiers[key];
            }
        }
        
        console.log(cleanSlate, 'Realized Modifiers From Buff');
        return cleanSlate;
    }

    static updateDamage(combatData, player, weapon, potentialModifiers, realizedModifiers) {
        realizedModifiers.damage = potentialModifiers.damage * 10;
    
        return realizedModifiers;
    }
    static updateDebuff(combatData, player, weapon, potentialModifiers, realizedModifiers) {
        
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
            }
        }
        
        console.log(cleanSlate, 'Realized Modifiers From De-Buff');
        return cleanSlate;
    }
    static updateHeal(combatData, player, weapon, potentialModifiers, realizedModifiers) {
        realizedModifiers.healing = potentialModifiers.healing * 10;
    
        return realizedModifiers;
    }

    setActiveStacks(intensity) {
        return this.activeStacks = intensity.value / intensity.initial; // Value is the cumulative stacking of the initial intensity. Initial is the base intensity.
    }

    setEffect(combatData, player, weapon, attributes, prayer) {
        let intensity = {};
        intensity = this.setIntensity(weapon, weapon.influences[0], attributes, player)
        console.log(intensity, 'Status Effect in setEffect');
        // This Is What Creates The Effect
        let playerIntensity = intensity.value * intensity.magnitude;

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
            healing: playerIntensity,
            damage: playerIntensity,
            buff: playerIntensity,
            debuff: playerIntensity,
        };
        let potentialModifiers = {};
        let realizedModifiers = {};

        let playerDamage = combatData.player.name === player.name ? combatData.realized_player_damage : combatData.realized_computer_damage;
        let playerFaith = combatData.player.name === player.name ? combatData.player.faith : combatData.computer.faith;
        let playerMastery = combatData.player.name === player.name ? combatData.player.mastery : combatData.computer.mastery;
        let weaponInfluence = weapon.influences[0];

        // switch (intensity.intensity.governance) {
        //     case 'constitution': {
        //         effectModifiers.physical_damage = playerIntensity / 4;
        //         effectModifiers.magical_damage = playerIntensity / 4;
        //         effectModifiers.physicalDefenseModifier = playerIntensity;
        //         effectModifiers.magicalDefenseModifier = playerIntensity;
        //         effectModifiers.critical_damage = playerIntensity / 20;
        //         effectModifiers.critical_chance = playerIntensity / 4;
        //         break;
        //     }
        //     case 'strength': {
        //         effectModifiers.physical_damage = playerIntensity;
        //         effectModifiers.critical_chance = playerIntensity / 2;
        //         effectModifiers.critical_damage = playerIntensity / 10;
        //         effectModifiers.physical_penetration = playerIntensity / 2;
        //         effectModifiers.magical_penetration = playerIntensity / 8;
        //         effectModifiers.physicalDefenseModifier = playerIntensity;
        //         effectModifiers.magicalDefenseModifier = playerIntensity / 4;
        //         break;
        //     }
        //     case 'agility': {
        //         effectModifiers.physical_damage = playerIntensity / 2;
        //         effectModifiers.critical_chance = playerIntensity;
        //         effectModifiers.critical_damage = playerIntensity / 20;
        //         effectModifiers.dodge = playerIntensity / 2;
        //         effectModifiers.roll = playerIntensity / 2;
        //         effectModifiers.physical_penetration = playerIntensity;
        //         effectModifiers.physicalDefenseModifier = playerIntensity / 4;
        //         break;
        //     }
        //     case 'achre': {
        //         effectModifiers.magical_damage = playerIntensity / 2;
        //         effectModifiers.critical_chance = playerIntensity;
        //         effectModifiers.critical_damage = playerIntensity / 20;
        //         effectModifiers.magical_penetration = playerIntensity;
        //         effectModifiers.physical_penetration = playerIntensity / 2;
        //         effectModifiers.dodge = playerIntensity / 2;
        //         effectModifiers.roll = playerIntensity / 2;
        //         effectModifiers.magicalDefenseModifier = playerIntensity / 4;
        //         effectModifiers.physicalDefenseModifier = playerIntensity / 4;
        //         effectModifiers.physicalPosture = playerIntensity / 2;
        //         effectModifiers.magicalPosture = playerIntensity / 2;
        //         break;
        //     }
        //     case 'caeren': {
        //         effectModifiers.magical_damage = playerIntensity;
        //         effectModifiers.critical_chance = playerIntensity / 2;
        //         effectModifiers.critical_damage = playerIntensity / 10;
        //         effectModifiers.magical_penetration = playerIntensity / 2;
        //         effectModifiers.magicalDefenseModifier = playerIntensity;
        //         effectModifiers.physical_penetration = playerIntensity / 4;
        //         effectModifiers.physicalDefenseModifier = playerIntensity / 2;
        //         break;
        //     }
        //     case 'kyosir': {
        //         effectModifiers.physical_penetration = playerIntensity;
        //         effectModifiers.magical_penetration = playerIntensity;
        //         effectModifiers.physicalDefenseModifier = playerIntensity;
        //         effectModifiers.magicalDefenseModifier = playerIntensity;
        //         effectModifiers.critical_chance = playerIntensity / 2;
        //         effectModifiers.roll = playerIntensity / 2;
        //         effectModifiers.dodge = playerIntensity / 2;
        //         break;
        //     }
        //     case 'daethic': {
        //         effectModifiers.physical_damage = playerIntensity / 2;
        //         effectModifiers.magical_damage = playerIntensity / 2;
        //         effectModifiers.physical_penetration = playerIntensity / 2;
        //         effectModifiers.magical_penetration = playerIntensity / 2;
        //         effectModifiers.physicalDefenseModifier = playerIntensity / 2;
        //         effectModifiers.magicalDefenseModifier = playerIntensity / 2;
        //         effectModifiers.physicalPosture = playerIntensity / 2;
        //         effectModifiers.magicalPosture = playerIntensity / 2;
        //         effectModifiers.critical_chance = playerIntensity / 2;
        //         effectModifiers.critical_damage = playerIntensity / 20;
        //         effectModifiers.dodge = playerIntensity / 2;
        //         effectModifiers.roll = playerIntensity / 2;
        //         break;
        //     }
        //     default: {
        //         break;
        //     }
        // }


        // So setting up the intensity and modifiers, I can filter which ones are relevant to the weapon's influence.
        switch(weapon.influences[0]) {
            case "Daethos": {
                potentialModifiers.physical_damage = effectModifiers.physical_damage / 2;
                potentialModifiers.magical_damage = effectModifiers.magical_damage / 2;

                potentialModifiers.damage = playerDamage / 2;
                potentialModifiers.healing = playerDamage / 2;
                break;
            }
            case "Achreo": {
                potentialModifiers.physical_damage = effectModifiers.physical_damage / 2;
                potentialModifiers.magical_damage = effectModifiers.magical_damage / 2;
                potentialModifiers.critical_chance = effectModifiers.critical_chance / 2;
                potentialModifiers.critical_damage = effectModifiers.critical_damage / 2;

                potentialModifiers.damage = effectModifiers.damage;
                potentialModifiers.healing = effectModifiers.healing;
                break;
            }
            case "Ahn've": {
                potentialModifiers.critical_damage = effectModifiers.critical_damage / 2;
                potentialModifiers.dodge = effectModifiers.dodge / 2;

                potentialModifiers.damage = playerDamage;
                potentialModifiers.healing = effectModifiers.healing;
                break;
            }
            case "Astra": {
                potentialModifiers.critical_chance = effectModifiers.critical_chance;
                potentialModifiers.critical_damage = effectModifiers.critical_damage / 2;
                potentialModifiers.roll = effectModifiers.roll / 2;

                potentialModifiers.damage = effectModifiers.damage;
                potentialModifiers.healing = effectModifiers.healing;
                break;
            }
            case "Cambire": {
                potentialModifiers.critical_chance = effectModifiers.critical_chance / 2;
                potentialModifiers.roll = effectModifiers.roll / 2;
                potentialModifiers.magical_damage = effectModifiers.magical_damage / 2;

                potentialModifiers.damage = playerDamage;
                potentialModifiers.healing = effectModifiers.healing;
                break;
            }
            case "Chiomyr": {
                potentialModifiers.physical_penetration = effectModifiers.physical_penetration;
                potentialModifiers.magical_penetration = effectModifiers.magical_penetration;
                potentialModifiers.critical_chance = effectModifiers.critical_chance;

                potentialModifiers.damage = effectModifiers.damage;
                potentialModifiers.healing = effectModifiers.healing;
                break;
            }
            case "Fyer": {
                potentialModifiers.critical_chance = effectModifiers.critical_chance / 2;
                potentialModifiers.critical_damage = effectModifiers.critical_damage;
            
                potentialModifiers.damage = effectModifiers.damage;
                potentialModifiers.healing = effectModifiers.healing;
                break;
            }
            case "Ilios": {
                potentialModifiers.physical_penetration = effectModifiers.physical_penetration / 2;
                potentialModifiers.magical_penetration = effectModifiers.magical_penetration / 2;
                potentialModifiers.physicalDefenseModifier = effectModifiers.physicalDefenseModifier / 4;
                potentialModifiers.magicalDefenseModifier = effectModifiers.magicalDefenseModifier / 4;
                potentialModifiers.physicalPosture = effectModifiers.physicalPosture / 4;
                potentialModifiers.magicalPosture = effectModifiers.magicalPosture / 4;

                potentialModifiers.damage = effectModifiers.damage;
                potentialModifiers.healing = playerDamage / 2;
                break;
            }
            case "Kyn'gi": {
                potentialModifiers.critical_chance = effectModifiers.critical_chance;
                potentialModifiers.roll = effectModifiers.roll;

                potentialModifiers.damage = effectModifiers.damage;
                potentialModifiers.healing = effectModifiers.healing;
                break;
            }
            case "Kyrisos": {
                potentialModifiers.physicalDefenseModifier = effectModifiers.physicalDefenseModifier;
                potentialModifiers.magicalDefenseModifier = effectModifiers.magicalDefenseModifier;
                potentialModifiers.roll = effectModifiers.roll;
            
                potentialModifiers.damage = effectModifiers.damage;
                potentialModifiers.healing = effectModifiers.healing;
                break;
            }
            case "Kyr'na": {
                potentialModifiers.magical_damage = effectModifiers.magical_damage;
                potentialModifiers.magical_penetration = effectModifiers.magical_penetration;
                
                potentialModifiers.damage = effectModifiers.damage * 2;
                potentialModifiers.healing = effectModifiers.healing;
                break;
            }
            case "Lilos": {
                potentialModifiers.physical_penetration = effectModifiers.physical_penetration;
                potentialModifiers.physical_damage = effectModifiers.physical_damage;

                potentialModifiers.healing = effectModifiers.healing * 2;
                potentialModifiers.damage = effectModifiers.damage;
                break;
            }
            case "Ma'anre": {
                potentialModifiers.roll = effectModifiers.roll / 2;
                potentialModifiers.dodge = effectModifiers.dodge / 2;
                potentialModifiers.critical_chance = effectModifiers.critical_chance / 2;
                potentialModifiers.critical_damage = effectModifiers.critical_damage / 2;

                potentialModifiers.damage = playerDamage / 2;
                potentialModifiers.healing = effectModifiers.healing;
                break;
            }
            case "Nyrolus": {
                potentialModifiers.physicalDefenseModifier = effectModifiers.physicalDefenseModifier / 2;
                potentialModifiers.magicalDefenseModifier = effectModifiers.magicalDefenseModifier;
                potentialModifiers.physicalPosture = effectModifiers.physicalPosture / 2;
                potentialModifiers.magicalPosture = effectModifiers.magicalPosture;

                potentialModifiers.damage = effectModifiers.damage;
                potentialModifiers.healing = effectModifiers.healing;
                break;
            }
            case "Quor'ei": {
                potentialModifiers.physicalDefenseModifier = effectModifiers.physicalDefenseModifier;
                potentialModifiers.magicalDefenseModifier = effectModifiers.magicalDefenseModifier / 2;
                potentialModifiers.physicalPosture = effectModifiers.physicalPosture;
                potentialModifiers.magicalPosture = effectModifiers.magicalPosture / 2;

                potentialModifiers.damage = effectModifiers.damage;
                potentialModifiers.healing = effectModifiers.healing;
                break;
            }
            case "Rahvre": {
                potentialModifiers.magical_damage = effectModifiers.magical_damage;
                potentialModifiers.magical_penetration = effectModifiers.magical_penetration;

                potentialModifiers.damage = effectModifiers.damage;
                potentialModifiers.healing = effectModifiers.healing;
                break;
            }
            case "Senari": {
                potentialModifiers.roll = effectModifiers.roll;
                potentialModifiers.dodge = effectModifiers.dodge;

                potentialModifiers.damage = effectModifiers.damage;
                potentialModifiers.healing = effectModifiers.healing;
                break;
            }
            case "Se'dyro": {
                potentialModifiers.critical_chance = effectModifiers.critical_chance;
                potentialModifiers.physical_penetration = effectModifiers.physical_penetration / 2;
                potentialModifiers.magical_penetration = effectModifiers.magical_penetration / 2;

                potentialModifiers.damage = playerDamage;
                potentialModifiers.healing = playerDamage / 2;
                break;
            }
            case "Se'vas": {
                potentialModifiers.critical_chance = effectModifiers.critical_chance;
                potentialModifiers.critical_damage = effectModifiers.critical_damage;

                potentialModifiers.damage = effectModifiers.damage;
                potentialModifiers.healing = effectModifiers.healing;
                break;
            }
            case "Shrygei": {
                potentialModifiers.physical_penetration = effectModifiers.physical_penetration;
                potentialModifiers.magical_penetration = effectModifiers.magical_penetration;

                potentialModifiers.damage = effectModifiers.damage;
                potentialModifiers.healing = effectModifiers.healing;
                break;
            }
            case "Tshaer": {
                potentialModifiers.physical_damage = effectModifiers.physical_damage;
                potentialModifiers.physical_penetration = effectModifiers.physical_penetration;

                potentialModifiers.damage = effectModifiers.damage;
                potentialModifiers.healing = effectModifiers.healing;
                break;
            }
            default: {
                break;
            }
        }
        console.log(prayer, 'This is the prayer')
        // Make the functions for the various status effects
        switch (prayer) {
            case "Buff": {
                return this.effect = this.buff(combatData, player, weapon, potentialModifiers, realizedModifiers);
            }
            case "Damage": {
                return this.effect = this.damage(combatData, player, weapon, potentialModifiers, realizedModifiers);
            }
            case "Debuff": {
                return this.effect = this.debuff(combatData, player, weapon, potentialModifiers, realizedModifiers);
            }
            case "Heal": {
                return this.effect = this.heal(combatData, player, weapon, potentialModifiers, realizedModifiers);
            }
        }

        console.log(realizedModifiers, 'Realized Modifiers From Set Effect')
        return this.effect = realizedModifiers;
    }

    

    buff(combatData, player, weapon, potentialModifiers, realizedModifiers) {

        realizedModifiers.physicalDefenseModifier = potentialModifiers.physicalDefenseModifier ? Math.round(potentialModifiers.physicalDefenseModifier) : 0;
        realizedModifiers.magicalDefenseModifier = potentialModifiers.magicalDefenseModifier ? Math.round(potentialModifiers.magicalDefenseModifier) : 0;
        realizedModifiers.physicalPosture = potentialModifiers.physicalPosture ? Math.round(potentialModifiers.physicalPosture) : 0;
        realizedModifiers.magicalPosture = potentialModifiers.magicalPosture ? Math.round(potentialModifiers.magicalPosture) : 0;
        realizedModifiers.roll = potentialModifiers.roll ? Math.round(potentialModifiers.roll) : 0;
        realizedModifiers.dodge = potentialModifiers.dodge ? Math.round(potentialModifiers.dodge) : 0;
        realizedModifiers.critical_chance = potentialModifiers.critical_chance ? Math.round(potentialModifiers.critical_chance) : 0;
        realizedModifiers.critical_damage = potentialModifiers.critical_damage ? Math.round(potentialModifiers.critical_damage) : 0;
        realizedModifiers.physical_penetration = potentialModifiers.physical_penetration ? Math.round(potentialModifiers.physical_penetration) : 0;
        realizedModifiers.magical_penetration = potentialModifiers.magical_penetration ? Math.round(potentialModifiers.magical_penetration) : 0;
        realizedModifiers.physical_damage = potentialModifiers.physical_damage ? Math.round(potentialModifiers.physical_damage) : 0;
        realizedModifiers.magical_damage = potentialModifiers.magical_damage ? Math.round(potentialModifiers.magical_damage) : 0;
        
        let cleanSlate = {};
        for (let key in realizedModifiers) {
            if (realizedModifiers[key] !== 0) {
                cleanSlate[key] = realizedModifiers[key];
            }
        }
        
        console.log(cleanSlate, 'Realized Modifiers From Buff');
        return cleanSlate;
    }
    damage(combatData, player, weapon, potentialModifiers, realizedModifiers) {
        realizedModifiers.damage = potentialModifiers.damage * 10;
    
        return realizedModifiers;
    }
    debuff(combatData, player, weapon, potentialModifiers, realizedModifiers) {
        
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
            }
        }
        
        console.log(cleanSlate, 'Realized Modifiers From De-Buff');
        return cleanSlate;
    }
    heal(combatData, player, weapon, potentialModifiers, realizedModifiers) {
        realizedModifiers.healing = potentialModifiers.healing * 10;
    
        return realizedModifiers;
    }

    setDescription(combatData, player, enemy, weapon, attributes, prayer) {
        console.log('Did we make it here?')
        let intensity = {};
        intensity = this.setIntensity(weapon, weapon.influences[0], attributes, player);
        let duration = this.setDuration(player);
        const article = ['a','e','i','o','u'].includes(weapon.name[0].toLowerCase()) ? "an" : "a";
        let description = `${weapon.influences[0]} has channeled a gift through their sigil, ${article} ${weapon.name}, ${prayer === 'Debuff' ? `cursing ${enemy.name}` : prayer === 'Heal' ? `renewing you for ${intensity.value * intensity.magnitude * 10}` : prayer === 'Damage' ? `damaging ${enemy.name} for ${intensity.value * intensity.magnitude * 10}` : `blessing ${player.name}`} for ${duration} combat rounds.`;
        
        return this.description = description;
    }
    setImgURL(weap) {
        return this.imgURL = weap.imgURL;
    }


}

const checkStatus = (combatData, effects) => {
    // Create an array to store expired effects
    const expiredEffects = [];

    // Iterate through each effect
    effects.forEach((effect) => {
        // Check if the effect's endTick is equal to the current combat round
        if (effect.endTick === combatData.combatRound) {
            // If it is, add the effect to the expiredEffects array
            expiredEffects.push(effect);
        }
    });

    // Iterate through the expiredEffects array
    expiredEffects.forEach((expiredEffect) => {
        // Find the index of the expired effect in the effects array
        const index = effects.indexOf(expiredEffect);
        // Remove the expired effect from the effects array
        effects.splice(index, 1);
    });

    // Return the updated effects array
    return effects;
};

const faithFinder = async (combatData, statusEffect) => { // The influence will add a chance to have a special effect occur
    if (combatData.player_win === true || combatData.computer_win === true) {
        return
    }
    
    let faith_number = Math.floor(Math.random() * 101);
    let faith_number_two = Math.floor(Math.random() * 101);
    let faith_check = Math.floor(Math.random() * 101);
    let computer_faith_number = Math.floor(Math.random() * 101);
    let computer_faith_number_two = Math.floor(Math.random() * 101);
    let faith_mod_one = 0;
    let faith_mod_two = 0;
    let computer_faith_mod_one = 0;
    let computer_faith_mod_two = 0;

    combatData.weapons[0].critical_chance = Number(combatData.weapons[0].critical_chance);
    combatData.weapons[0].critical_damage = Number(combatData.weapons[0].critical_damage);

    combatData.weapons[1].critical_chance = Number(combatData.weapons[1].critical_chance);
    combatData.weapons[1].critical_damage = Number(combatData.weapons[1].critical_damage);

    combatData.computer_weapons[0].critical_chance = Number(combatData.computer_weapons[0].critical_chance);
    combatData.computer_weapons[0].critical_damage = Number(combatData.computer_weapons[0].critical_damage);

    combatData.computer_weapons[1].critical_chance = Number(combatData.computer_weapons[1].critical_chance);
    combatData.computer_weapons[1].critical_damage = Number(combatData.computer_weapons[1].critical_damage);


    // console.log(combatData.weapons[0].magical_penetration, typeof(combatData.weapons[0].magical_penetration))
    // console.log(combatData.weapons[0].physical_penetration, typeof(combatData.weapons[0].physical_penetration))
    // console.log(combatData.weapons[0].roll, typeof(combatData.weapons[0].roll))
    // console.log(combatData.weapons[0].dodge, typeof(combatData.weapons[0].dodge))
    if (combatData.player.faith === 'devoted' && combatData.weapons[0].influences[0] === 'Daethos') {
        faith_number += 5;
        faith_number_two += 5;
        faith_mod_one += 5;
        faith_mod_two += 5;
    }
    if (combatData.player.faith === 'adherent' && combatData.weapons[0].influences[0] !== 'Daethos') {
        faith_number += 5;
        faith_number_two += 5;
        faith_mod_one += 5;
        faith_mod_two += 5;
    }
    if (combatData.weapons[0].influences[0] === combatData.player.amulet.influences[0]) {
        faith_number += 3;
        faith_mod_one += 3;
    }
    if (combatData.weapons[1].influences[0] === combatData.player.amulet.influences[0]) {
        faith_number_two += 3;
        faith_mod_two += 3;
    }
    if (combatData.computer_weapons[0].influences[0] === combatData.computer.amulet.influences[0]) {
        computer_faith_number += 3;
        computer_faith_mod_one += 3;
    }
    if (combatData.computer_weapons[1].influences[0] === combatData.computer.amulet.influences[0]) {
        computer_faith_number_two += 3;
        computer_faith_mod_two += 3;
    }
    if (combatData.weapons[0].influences[0] === combatData.player.trinket.influences[0]) {
        faith_number += 3;
        faith_mod_one += 3;
    }
    if (combatData.weapons[1].influences[0] === combatData.player.trinket.influences[0]) {
        faith_number_two += 3;
        faith_mod_two += 3;
    }
    if (combatData.computer_weapons[0].influences[0] === combatData.computer.trinket.influences[0]) {
        computer_faith_number += 3;
        computer_faith_mod_one += 3;
    }
    if (combatData.computer_weapons[1].influences[0] === combatData.computer.trinket.influences[0]) {
        computer_faith_number_two += 3;
        computer_faith_mod_two += 3;
    }


    if (combatData.computer.faith === 'devoted' && combatData.computer_weapons[0].influences[0] === 'Daethos') {
        computer_faith_number += 5;
        computer_faith_number_two += 5;
        computer_faith_mod_one += 5;
        computer_faith_mod_two += 5;
    }
    if (combatData.computer.faith === 'adherent' && combatData.computer_weapons[0].influences[0] !== 'Daethos') {
        computer_faith_number += 5;
        computer_faith_number_two += 5;
        computer_faith_mod_one += 5;
        computer_faith_mod_two += 5;
    }
    // console.log(combatData.weapons[0].influences[0], combatData.weapons[1].influences[0])
    console.log(combatData.player.name, `'s Faith #`, faith_number, `Faith #2`, faith_number_two, `Dual Wielding?`, combatData.dual_wielding)
    console.log(combatData.player.name, `'s Faith Mod #`, faith_mod_one, `Faith Mod #2`, faith_mod_two, `Dual Wielding?`, combatData.dual_wielding)

    // console.log(combatData.computer_weapons[0].influences[0], combatData.computer_weapons[1].influences[0])
    console.log(combatData.computer.name, `'s Faith #`, computer_faith_number, `Faith #2`, computer_faith_number_two, `Dual Wielding?`, combatData.dual_wielding)
    console.log(combatData.computer.name, `'s Faith Mod #`, computer_faith_mod_one, `Faith Mod #2`, computer_faith_mod_two, `Dual Wielding?`, combatData.dual_wielding)


    // if (faith_number > 85) let statusEffect = new StatusEffect();

    if (faith_number > 85) {
        combatData.religious_success = true;
        if (combatData.weapons[0].influences[0] === 'Daethos') { // God
            console.log('Daethos!')
            let daethos = (combatData.player_attributes.totalAchre + combatData.weapons[0].achre + combatData.player_attributes.totalCaeren + combatData.weapons[0].caeren);
            daethos = Math.round(daethos * (combatData.player.level / 10));
            combatData.current_player_health += combatData.realized_player_damage / 2;
            combatData.new_player_health += combatData.realized_player_damage / 2;
            combatData.player_influence_description = 
                `Daethos wraps through your Caer, ${combatData.weapons[0].name} healing you for ${Math.round(combatData.realized_player_damage / 2)}. A faint echo of Caeren lingers for ${daethos} Righteously Spooky Damage.`    
            combatData.new_player_health += daethos;
            combatData.new_computer_health -= daethos;
            if (combatData.new_player_health > 0) {
                combatData.computer_win = false;
            }
            combatData.current_player_health += daethos;
            combatData.current_computer_health -= daethos;
            if (combatData.current_computer_health < 0) {
                combatData.current_computer_health = 0;
            }
            if (combatData.new_computer_health < 0) {
                combatData.new_computer_health = 0;
            }
            let daethosBlessing = new StatusEffect(combatData, combatData.playerEffects, combatData.player, combatData.computer, weapons[0], combatData.player.faith, combatData.player.governance, combatData.player_attributes.totalAchre, 'refreshes', 'defensive');
// const statusEffect = new StatusEffect(combatData, combatData.playerEffects, combatData.player, combatdata.computer, weapons[0], combatData.player.faith e.g. 'Achreo', governance, combatData.player_attributes.totalAchre, style="Choice", behavior="Choice");

    }
        if (combatData.weapons[0].influences[0] === 'Achreo') { // Wild
            console.log('Achreo!')
            // combatData.weapons[0].critical_chance = Number(combatData.weapons[0].critical_chance + 1);
            let achreo = (combatData.player_attributes.totalAchre + combatData.weapons[0].achre)
            achreo = Math.round(achreo * (combatData.player.level / 10));
            combatData.new_player_health += achreo
            combatData.current_player_health += achreo
            if (combatData.new_player_health > 0) {
                combatData.computer_win = false;
            }
            combatData.player_influence_description = 
                `Your Caer stirs Achreo, to his own surprise and soft as whispers he grants renewal of ${achreo}.`
            combatData.weapons[0].physical_damage += 2;
            combatData.weapons[0].magical_damage += 2;
            combatData.weapons[0].critical_chance += 2;
            combatData.weapons[0].critical_damage += 0.2;
        }
        if (combatData.weapons[0].influences[0] === "Ahn've") { // Wind
            let ahnve = (combatData.player_attributes.totalCaeren + combatData.weapons[0].caeren)
            ahnve = Math.round(ahnve * combatData.player.level / 10);
            combatData.new_player_health += ahnve;
            combatData.current_player_health += ahnve;
            console.log("Ahn've!")
            combatData.player_influence_description = 
                `Your Caer ushers forth Ahn've, a devastating storm posseses you to attack ${combatData.computer.name} for ${Math.round(combatData.realized_player_damage)} more damage.`
            if (combatData.realized_player_damage < 0) {
                combatData.realized_player_damage = 0;
            }
            combatData.new_computer_health = combatData.current_computer_health - combatData.realized_player_damage;
            combatData.current_computer_health = combatData.new_computer_health; // Added to persist health totals?

            if (combatData.new_computer_health <= 0 || combatData.current_computer_health <= 0) {
                combatData.new_computer_health = 0;
                combatData.player_win = true;
            }
        }
        if (combatData.weapons[0].influences[0] === 'Astra') { // Lightning
            let astra = (combatData.player_attributes.totalAchre + combatData.weapons[0].achre)
            astra = Math.round(astra * combatData.player.level / 10);
            console.log("Astra!")
            combatData.player_influence_description = 
                `Your Caer ushers forth the favor of Astra's Lightning, quickening you.`
            combatData.weapons[0].critical_chance += 4;
            combatData.weapons[0].roll += 2;
            combatData.weapons[0].critical_damage += 0.1;
            combatData.new_player_health += astra
            combatData.current_player_health += astra
            if (combatData.new_player_health > 0) {
                combatData.computer_win = false;
            }
        }
        if (combatData.weapons[0].influences[0] === 'Cambire') { // Potential
            console.log("Cambire!")
            let cambire = combatData.player_attributes.totalCaeren + combatData.weapons[0].caeren;
            cambire = Math.round(cambire * combatData.player.level / 10);
            combatData.new_player_health += cambire;
            combatData.current_player_health += cambire;
            combatData.player_influence_description = 
                `Your Caer ushers forth the Chance of Cambire, warping back to attack ${combatData.computer.name} for ${Math.round(combatData.realized_player_damage)} more damage, gifting ${cambire}.`
            if (combatData.realized_player_damage < 0) {
                combatData.realized_player_damage = 0;
            }
            combatData.new_computer_health = combatData.current_computer_health - combatData.realized_player_damage;
            combatData.current_computer_health = combatData.new_computer_health; // Added to persist health totals?

            if (combatData.new_computer_health <= 0 || combatData.current_computer_health <= 0) {
                combatData.new_computer_health = 0;
                combatData.player_win = true;
            }    
        }
        if (combatData.weapons[0].influences[0] === 'Chiomyr') { // Humor
            let chiomyr = (combatData.player_attributes.totalKyosir + combatData.weapons[0].kyosir);
            chiomyr = Math.round(chiomyr * combatData.player.level / 10);
            combatData.new_player_health += chiomyr;
            combatData.current_player_health += chiomyr;
            combatData.player_influence_description = 
                `Your Caer causes a faint cackle to fade around you.`
            console.log("Chiomyr!")
            combatData.weapons[0].physical_penetration += 3;
            combatData.weapons[0].magical_penetration += 3;
            if (combatData.new_player_health > 0) {
                combatData.computer_win = false;
            }
        }
        if (combatData.weapons[0].influences[0] === 'Fyer') { // Fire
            console.log("Fyer!")
            let fyer = (combatData.player_attributes.totalCaeren + combatData.weapons[0].caeren);
            fyer = Math.round(fyer * combatData.player.level / 10);
            combatData.player_influence_description = 
                `Your Caer ushers forth the favor of Fyer igniting through you.`
            combatData.weapons[0].critical_chance += 1;
            combatData.weapons[0].critical_damage += 0.9;
            combatData.new_player_health += fyer;
            combatData.current_player_health += fyer;  
            if (combatData.new_player_health > 0) {
                combatData.computer_win = false;
            }
        }
        if (combatData.weapons[0].influences[0] === 'Ilios') { // Sun
            let ilios = combatData.realized_player_damage / 2;
            combatData.new_player_health += ilios;
            combatData.current_player_health += ilios;
            console.log("Ilios!")
            combatData.player_influence_description = 
                `The Hush of Ilios bursts into you through your ${combatData.weapons[0].name}, his brilliance radiating for ${Math.round(ilios)}.`   
            combatData.weapons[0].magical_penetration += 2;
            combatData.weapons[0].physical_penetration += 2;
            combatData.player_defense.physicalDefenseModifier += 1;
            combatData.player_defense.magicalDefenseModifier += 1;
            combatData.player_defense.physicalPosture += 1;
            combatData.player_defense.magicalPosture += 1;
            if (combatData.new_player_health > 0) {
                combatData.computer_win = false;
            }
        }
        if (combatData.weapons[0].influences[0] === "Kyn'gi") { // Hunt
            console.log("Kyn'gi!")
            let kyngi = (combatData.player_attributes.totalAgility + combatData.weapons[0].agility);
            kyngi = Math.round(kyngi * combatData.player.level / 10);
            combatData.player_influence_description = 
                `Your keening Caer shrieks into Kyn'gi, his blessing emboldening the Hunt and healing you for ${kyngi}.`
            combatData.weapons[0].roll += 3;
            combatData.weapons[0].critical_chance += 3;
            combatData.new_player_health += kyngi;
            combatData.current_player_health += kyngi;
            if (combatData.new_player_health > 0) {
                combatData.computer_win = false;
            }
        }
        if (combatData.weapons[0].influences[0] === "Kyrisos") { // Gold
            let kyrisos = (combatData.player_attributes.totalKyosir + combatData.weapons[0].kyosir);
            kyrisos = Math.round(kyrisos * combatData.player.level / 10);
            combatData.new_player_health += kyrisos;
            combatData.current_player_health += kyrisos;
            console.log("Kyrisos!")
            combatData.player_influence_description = 
                `The Caer of Kyrisos imbues you with Kyosir!`
            combatData.player_attributes.kyosirMod += 4;
            if (combatData.new_player_health > 0) {
                combatData.computer_win = false;
            }
        }
        if (combatData.weapons[0].influences[0] === "Kyr'na") { // Time
            console.log("Kyr'na!")
            let kyrna = (combatData.player_attributes.totalAchre + combatData.weapons[0].achre);
            kyrna = Math.round(kyrna * combatData.player.level / 10);
            combatData.player_influence_description = 
                `Kyr'na withers ${combatData.computer.name}, brittling their Caer for ${kyrna} Damage.`
            combatData.new_computer_health -= kyrna;
            combatData.current_computer_health -= kyrna;
            if (combatData.current_computer_health < 0) {
                combatData.current_computer_health = 0;
            }
            if (combatData.new_computer_health < 0) {
                combatData.new_computer_health = 0;
            }
        }
        if (combatData.weapons[0].influences[0] === "Lilos") { // Life
            console.log("Lilos!")
            let lilos = (combatData.player_attributes.totalCaeren + combatData.weapons[0].caeren);
            lilos = Math.round(lilos * combatData.player.level / 5);
            combatData.player_influence_description = 
                `Lilos breathes her Cear into ${combatData.player.name}, healing you for ${lilos}.`
            combatData.new_player_health += lilos;
            combatData.current_player_health += lilos;
            if (combatData.new_player_health > 0) {
                combatData.computer_win = false;
            }
        }
        if (combatData.weapons[0].influences[0] === "Ma'anre") { // Moon
            let maanre = combatData.realized_player_damage / 2;
            combatData.new_player_health += maanre;
            combatData.current_player_health += maanre;
            console.log("Ma'anre!")
            combatData.player_influence_description = 
                `Ma'anre wraps her tendrils about your ${combatData.weapons[0].name}, changing your perception of this world, its peculiarity resonating for ${Math.round(maanre)}.` 
            combatData.weapons[0].roll += 2;
            combatData.weapons[0].dodge -= 2;
            combatData.weapons[0].critical_chance += 2;
            combatData.weapons[0].critical_damage += 0.2;
            if (combatData.new_player_health > 0) {
                combatData.computer_win = false;
            }
        }
        if (combatData.weapons[0].influences[0] === "Nyrolus") { // Water
            console.log("Nyrolus!")
            let nyrolus = (combatData.player_attributes.totalCaeren + combatData.weapons[0].caeren)
            nyrolus = Math.round(nyrolus * combatData.player.level / 10);
            combatData.player_influence_description = 
                `Your mercurial weapon intrigues Nyrolus, swarming you in their Caer for ${nyrolus}.`
            combatData.player_defense.physicalDefenseModifier += 2;
            combatData.player_defense.magicalDefenseModifier += 2;
            combatData.player_defense.physicalPosture += 2;
            combatData.player_defense.magicalPosture += 2;
            combatData.new_player_health += nyrolus
            combatData.current_player_health += nyrolus
            if (combatData.new_player_health > 0) {
                combatData.computer_win = false;
            }
        }
        if (combatData.weapons[0].influences[0] === "Quor'ei") { // Earth
            console.log("Quor'ei!")
            let quorei = (combatData.player_attributes.totalAchre + combatData.weapons[0].achre)
            quorei = Math.round(quorei * combatData.player.level / 10);
            combatData.player_influence_description = 
                `Your resolve beckons with the favor of your Quor'ei, steeling you in their Caer for ${quorei}.`
            combatData.player_defense.physicalDefenseModifier += 2;
            combatData.player_defense.magicalDefenseModifier += 2;
            combatData.player_defense.physicalPosture += 2;
            combatData.player_defense.magicalPosture += 2;
            combatData.new_player_health += quorei
            combatData.current_player_health += quorei
            if (combatData.new_player_health > 0) {
                combatData.computer_win = false;
            }
        }
        if (combatData.weapons[0].influences[0] === "Rahvre") { // Dreams
            let rahvre = (combatData.player_attributes.totalCaeren + combatData.weapons[0].caeren)
            rahvre = Math.round(rahvre * combatData.player.level / 10);
            console.log("Rahvre!")
            combatData.player_influence_description = 
            `Your calming Caer reaches its tendrils to Rahvre, intertwining you.`
            combatData.weapons[0].magical_damage += 5;
            combatData.new_player_health += rahvre
            combatData.current_player_health += rahvre
            if (combatData.new_player_health > 0) {
                combatData.computer_win = false;
            }
        }
        if (combatData.weapons[0].influences[0] === "Senari") { // Wisdom
            console.log("Senari!")
            combatData.player_influence_description = 
                `Your calm swirls with the favor of Senari, holding you in her Caer.`
            combatData.weapons[0].roll += 3;
            combatData.weapons[0].dodge -= 3;
        }
        if (combatData.weapons[0].influences[0] === "Se'dyro") { // Iron
            let sedyro = (combatData.player_attributes.totalAgility + combatData.weapons[0].agility);
            sedyro = Math.round(sedyro * combatData.player.level / 10);
            combatData.new_player_health += sedyro
            combatData.current_player_health += sedyro
            console.log("Se'dyro!")
            combatData.player_influence_description = 
                `The Caer of Se'dyro sings into your ${combatData.weapons[0].name}, causing it to frenzy for ${Math.round(combatData.realized_player_damage)} more damage!`    
            if (combatData.realized_player_damage < 0) {
                combatData.realized_player_damage = 0;
            }
            combatData.new_computer_health = combatData.current_computer_health - combatData.realized_player_damage;
            combatData.current_computer_health = combatData.new_computer_health; // Added to persist health totals?

            if (combatData.new_computer_health <= 0 || combatData.current_computer_health <= 0) {
                combatData.new_computer_health = 0;
                combatData.player_win = true;
            }
        }
        if (combatData.weapons[0].influences[0] === "Se'vas") { // War
            console.log("Se'vas!")
            let sevas = (combatData.player_attributes.totalStrength + combatData.weapons[0].strength);
            sevas = Math.round(sevas * combatData.player.level / 10);
            combatData.player_influence_description = 
                `The Caer of Se'vas scorns your ${combatData.weapons[0].name}, scarring it with a beauty reinvigorating you for ${sevas}.` 
            combatData.weapons[0].critical_chance += 3;
            combatData.weapons[0].critical_damage += 0.3;
            combatData.new_player_health += sevas
            combatData.current_player_health += sevas
            if (combatData.new_player_health > 0) {
                combatData.computer_win = false;
            }
        }
        if (combatData.weapons[0].influences[0] === "Shrygei") { // Song
            let shrygei = combatData.player_attributes.totalAchre + combatData.weapons[0].achre + combatData.player_attributes.totalCaeren + combatData.weapons[0].caeren + combatData.player_attributes.totalConstitution;
            combatData.player_influence_description =
                `The Song of Shry'gei shrieks itself through your ${combatData.weapons[0].name}, the resplendence renews you for ${shrygei}`
            combatData.weapons[0].magical_penetration += 3
            combatData.weapons[0].physical_penetration += 3
            combatData.new_player_health += shrygei
            combatData.current_player_health += shrygei
            if (combatData.new_player_health > 0) {
                combatData.computer_win = false;
            }
        }
        if (combatData.weapons[0].influences[0] === "Tshaer") { // Animal
            console.log("Tshaer!")
            let tshaer = (combatData.player_attributes.totalStrength + combatData.weapons[0].strength);
            tshaer = Math.round(tshaer * combatData.player.level / 10);
            combatData.player_influence_description = 
                `Your fervor unleashes the bestial nature of Tshaer within you for ${tshaer}.`
            combatData.weapons[0].physical_damage += 5;
            combatData.new_player_health += tshaer
            combatData.current_player_health += tshaer
            if (combatData.new_player_health > 0) {
                combatData.computer_win = false;
            }
        }
    }
    if (combatData.dual_wielding === true) {
        if (faith_number_two > 85) {
            combatData.religious_success = true;
            if (combatData.weapons[1].influences[0] === 'Daethos') { // God
                console.log("Daethos!")
                let daethos = (combatData.player_attributes.totalAchre + combatData.weapons[1].achre + combatData.player_attributes.totalCaeren + combatData.weapons[1].caeren);
                daethos = Math.round(daethos * (combatData.player.level / 10));
                combatData.new_player_health += combatData.realized_player_damage / 2;
                combatData.current_player_health += combatData.realized_player_damage / 2;
                combatData.player_influence_description_two = 
                    `Daethos wraps through your Caer, ${combatData.weapons[1].name} healing you for ${Math.round(combatData.realized_player_damage / 2)}. A faint echo of Caeren lingers for ${daethos} Righteously Spooky Damage.`    
                combatData.new_player_health += daethos;
                combatData.new_computer_health -= daethos;
                combatData.current_player_health += daethos;
                combatData.current_computer_health -= daethos;
                if (combatData.current_computer_health < 0) {
                    combatData.current_computer_health = 0;
                }
                if (combatData.new_computer_health < 0) {
                    combatData.new_computer_health = 0;
                }
                if (combatData.new_player_health > 0) {
                    combatData.computer_win = false;
                }
        }
            if (combatData.weapons[1].influences[0] === 'Achreo') { // Wild
                console.log("Achreo!");
                let achreo = (combatData.player_attributes.totalAchre + combatData.weapons[1].achre);
                achreo = Math.round(achreo * (combatData.player.level / 10));
                combatData.new_player_health += achreo;
                combatData.current_player_health += achreo;
                combatData.player_influence_description_two = 
                    `Your Caer stirs Achreo, to his own surprise and soft as whispers he grants renewal of ${achreo}.`
                combatData.weapons[1].physical_damage += 2;
                combatData.weapons[1].magical_damage += 2;
                combatData.weapons[1].critical_chance += 2;
                combatData.weapons[1].critical_damage += 0.2;
                if (combatData.new_player_health > 0) {
                    combatData.computer_win = false;
                }
            }
            if (combatData.weapons[1].influences[0] === "Ahn've") { // Wind
                let ahnve = (combatData.player_attributes.totalCaeren + combatData.weapons[1].caeren);
                ahnve = Math.round(ahnve * combatData.player.level / 10);
                combatData.new_player_health += ahnve;
                combatData.current_player_health += ahnve;
                console.log("Ahn've!")
                combatData.player_influence_description_two = 
                    `Your Caer ushers forth Ahn've, a devastating storm posseses you to attack ${combatData.computer.name} for ${Math.round(combatData.realized_player_damage)} more damage.`

                // await attackCompiler(combatData, player_action)
                if (combatData.realized_player_damage < 0) {
                    combatData.realized_player_damage = 0;
                }
                combatData.new_computer_health = combatData.current_computer_health - combatData.realized_player_damage;
                combatData.current_computer_health = combatData.new_computer_health; // Added to persist health totals?

                if (combatData.new_computer_health <= 0 || combatData.current_computer_health <= 0) {
                    combatData.new_computer_health = 0;
                    combatData.player_win = true;
                }
            }
            if (combatData.weapons[1].influences[0] === 'Astra') { // Lightning
                let astra = (combatData.player_attributes.totalAchre + combatData.weapons[1].achre);
                astra = Math.round(astra * combatData.player.level / 10);
                combatData.player_influence_description_two = 
                    `Your Caer ushers forth the favor of Astra's Lightning, quickening you.`
                combatData.weapons[1].critical_chance += 4;
                combatData.weapons[1].roll += 2;
                combatData.weapons[1].critical_damage += 0.1;
                combatData.new_player_health += astra;
                combatData.current_player_health += astra;
                if (combatData.new_player_health > 0) {
                    combatData.computer_win = false;
                }
            }
            if (combatData.weapons[1].influences[0] === 'Cambire') { // Potential
                let cambire = combatData.player_attributes.totalCaeren + combatData.weapons[0].caeren;
                cambire = Math.round(cambire * combatData.player.level / 10);
                combatData.new_player_health += cambire;
                combatData.current_player_health += cambire;
                combatData.player_influence_description_two = 
                    `Your Caer ushers forth the Chance of Cambire, warping back to attack ${combatData.computer.name} for ${Math.round(combatData.realized_player_damage)} more damage, gifting ${cambire}.`
                // await attackCompiler(combatData, player_action)
                if (combatData.realized_player_damage < 0) {
                    combatData.realized_player_damage = 0;
                }
                combatData.new_computer_health = combatData.current_computer_health - combatData.realized_player_damage;
                combatData.current_computer_health = combatData.new_computer_health; // Added to persist health totals?

                if (combatData.new_computer_health <= 0 || combatData.current_computer_health <= 0) {
                    combatData.new_computer_health = 0;
                    combatData.player_win = true;
                }
            }
            if (combatData.weapons[1].influences[0] === 'Chiomyr') { // Humor
                let chiomyr = (combatData.player_attributes.totalKyosir + combatData.weapons[1].kyosir);
                chiomyr = Math.round(chiomyr * combatData.player.level / 10);
                combatData.new_player_health += chiomyr;
                combatData.current_player_health += chiomyr;
                combatData.weapons[1].physical_penetration += 3;
                combatData.weapons[1].magical_penetration += 3;
                if (combatData.new_player_health > 0) {
                    combatData.computer_win = false;
                }
            }
            if (combatData.weapons[1].influences[0] === 'Fyer') { // Fire
                let fyer = (combatData.player_attributes.totalCaeren + combatData.weapons[1].caeren);
                fyer = Math.round(fyer * combatData.player.level / 10);
                combatData.player_influence_description_two = 
                    `Your Caer ushers forth the favor of Fyer igniting through you.`
                combatData.weapons[1].critical_chance += 1;
                combatData.weapons[1].critical_damage += 0.9;
                combatData.new_player_health += fyer;
                combatData.current_player_health += fyer;  
                if (combatData.new_player_health > 0) {
                    combatData.computer_win = false;
                }
            }
            if (combatData.weapons[1].influences[0] === 'Ilios') { // Sun
                let ilios = combatData.realized_player_damage / 2;
                combatData.new_player_health += ilios;
                combatData.current_player_health += ilios;
                combatData.player_influence_description_two = 
                    `The Hush of Ilios bursts into you through your ${combatData.weapons[1].name}, his brilliance radiating for ${Math.round(ilios)}.`
                combatData.weapons[1].magical_penetration += 2;
                combatData.weapons[1].physical_penetration += 2;
                combatData.player_defense.physicalDefenseModifier += 1;
                combatData.player_defense.magicalDefenseModifier += 1;
                combatData.player_defense.physicalPosture += 1;
                combatData.player_defense.magicalPosture += 1;
                if (combatData.new_player_health > 0) {
                    combatData.computer_win = false;
                }
            }
            if (combatData.weapons[1].influences[0] === "Kyn'gi") { // Hunt
                let kyngi = (combatData.player_attributes.totalAgility + combatData.weapons[1].agility);
                kyngi = Math.round(kyngi * combatData.player.level / 10);
                combatData.player_influence_description_two = 
                    `Your keen Caer shrieks into Kyn'gi, his blessing emboldening the Hunt and healing you for ${kyngi}.`
                combatData.weapons[1].roll += 3;
                combatData.weapons[1].critical_chance += 3;
                combatData.new_player_health += kyngi;
                combatData.current_player_health += kyngi;
                if (combatData.new_player_health > 0) {
                    combatData.computer_win = false;
                }
            }
            if (combatData.weapons[1].influences[0] === "Kyrisos") { // Gold
                let kyrisos = (combatData.player_attributes.totalKyosir + combatData.weapons[1].kyosir);
                kyrisos = Math.round(kyrisos * combatData.player.level / 10);
                combatData.new_player_health += kyrisos;
                combatData.current_player_health += kyrisos;
                combatData.player_influence_description_two = 
                    `The Caer of Kyrisos imbues you with Kyosir!`
                combatData.player_attributes.kyosirMod += 4;
                if (combatData.new_player_health > 0) {
                    combatData.computer_win = false;
                }
            }
            if (combatData.weapons[1].influences[0] === "Kyr'na") { // Time
                let kyrna = (combatData.player_attributes.totalAchre + combatData.weapons[1].achre);
                kyrna = Math.round(kyrna * combatData.player.level / 10);
                combatData.player_influence_description_two = 
                    `Kyr'na withers ${combatData.computer.name}, brittling their Caer for ${kyrna} Damage.`
                combatData.new_computer_health -= kyrna;
                combatData.current_computer_health -= kyrna;
                if (combatData.current_computer_health < 0) {
                    combatData.current_computer_health = 0;
                }
                if (combatData.new_computer_health < 0) {
                    combatData.new_computer_health = 0;
                }
            }
            if (combatData.weapons[1].influences[0] === "Lilos") { // Life
                let lilos = (combatData.player_attributes.totalCaeren + combatData.weapons[1].caeren);
                lilos = Math.round(lilos * combatData.player.level / 5);
                combatData.player_influence_description_two = 
                    `Lilos breathes her Caer into ${combatData.player.name}, healing you for ${lilos}.`;
                combatData.new_player_health += lilos;
                combatData.current_player_health += lilos;
                if (combatData.new_player_health > 0) {
                    combatData.computer_win = false;
                }
            }
            if (combatData.weapons[1].influences[0] === "Ma'anre") { // Moon
                let maanre = combatData.realized_player_damage / 2;
                combatData.new_player_health += maanre;
                combatData.current_player_health += maanre;
                combatData.player_influence_description_two = 
                    `Ma'anre wraps her tendrils about your ${combatData.weapons[1].name}, changing your perception of this world, its peculiarity resonating for ${Math.round(maanre)}.`; 
                combatData.weapons[1].roll += 2;
                combatData.weapons[1].dodge -= 2;
                combatData.weapons[1].critical_chance += 2;
                combatData.weapons[1].critical_damage += 0.2;
                if (combatData.new_player_health > 0) {
                    combatData.computer_win = false;
                }
            }
            if (combatData.weapons[1].influences[0] === "Nyrolus") { // Water
                let nyrolus = (combatData.player_attributes.totalCaeren + combatData.weapons[1].caeren);
                nyrolus = Math.round(nyrolus * combatData.player.level / 10);
                combatData.player_influence_description_two = 
                    `Your mercurial weapon intrigues Nyrolus, swarming you in their Caer for ${nyrolus}.`;
                combatData.player_defense.physicalDefenseModifier += 2;
                combatData.player_defense.magicalDefenseModifier += 2;
                combatData.player_defense.physicalPosture += 2;
                combatData.player_defense.magicalPosture += 2;
                combatData.new_player_health += nyrolus
                combatData.current_player_health += nyrolus
                if (combatData.new_player_health > 0) {
                    combatData.computer_win = false;
                }
            }
            if (combatData.weapons[1].influences[0] === "Quor'ei") { // Earth
                console.log("Quor'ei W2")
                let quorei = (combatData.player_attributes.totalAchre + combatData.weapons[1].achre)
                quorei = Math.round(quorei * combatData.player.level / 10);
                combatData.player_influence_description_two = 
                    `Your resolve beckons with the favor of your Quor'ei, steeling you in their Caer for ${quorei}.`
                combatData.player_defense.physicalDefenseModifier += 2;
                combatData.player_defense.magicalDefenseModifier += 2;
                combatData.player_defense.physicalPosture += 2;
                combatData.player_defense.magicalPosture += 2;
                combatData.new_player_health += quorei
                combatData.current_player_health += quorei
                if (combatData.new_player_health > 0) {
                    combatData.computer_win = false;
                }
            }
            if (combatData.weapons[1].influences[0] === "Rahvre") { // Dreams
                let rahvre = (combatData.player_attributes.totalCaeren + combatData.weapons[1].caeren)
                rahvre = Math.round(rahvre * combatData.player.level / 10);
                combatData.player_influence_description_two = 
                `Your calming Caer reaches its tendrils to Rahvre, intertwining you for ${rahvre}.`
                combatData.weapons[1].magical_damage += 5;
                combatData.new_player_health += rahvre
                combatData.current_player_health += rahvre
                if (combatData.new_player_health > 0) {
                    combatData.computer_win = false;
                }
            }
            if (combatData.weapons[1].influences[0] === "Senari") { // Wisdom
                combatData.player_influence_description_two = 
                    `Your calm swirls with the favor of Senari, holding you in her Caer.`
                combatData.weapons[1].roll += 3;
                combatData.weapons[1].dodge -= 3;
            }
            if (combatData.weapons[1].influences[0] === "Se'dyro") { // Iron
                let sedyro = (combatData.player_attributes.totalAgility + combatData.weapons[1].agility)
                sedyro = Math.round(sedyro * combatData.player.level / 10);
                combatData.new_player_health += sedyro
                combatData.current_player_health += sedyro
                combatData.player_influence_description_two = 
                    `The Caer of Se'dyro sings into your ${combatData.weapons[1].name}, causing it to frenzy for ${Math.round(combatData.realized_player_damage)} more damage!`    

                // await attackCompiler(combatData, player_action)
                if (combatData.realized_player_damage < 0) {
                    combatData.realized_player_damage = 0;
                }
                combatData.new_computer_health = combatData.current_computer_health - combatData.realized_player_damage;
                combatData.current_computer_health = combatData.new_computer_health; // Added to persist health totals?

                if (combatData.new_computer_health <= 0 || combatData.current_computer_health <= 0) {
                    combatData.new_computer_health = 0;
                    combatData.player_win = true;
                }
            }
            if (combatData.weapons[1].influences[0] === "Se'vas") { // War
                let sevas = (combatData.player_attributes.totalStrength + combatData.weapons[1].strength);
                sevas = Math.round(sevas * combatData.player.level / 10);
                combatData.player_influence_description_two = 
                    `The Caer of Se'vas scorns your ${combatData.weapons[1].name}, scarring it with a beauty reinvigorating you for ${sevas}.` 
                combatData.weapons[1].critical_chance += 3;
                combatData.weapons[1].critical_damage += 0.3;
                combatData.new_player_health += sevas
                combatData.current_player_health += sevas
                if (combatData.new_player_health > 0) {
                    combatData.computer_win = false;
                }
            }
            if (combatData.weapons[1].influences[0] === "Shrygei") { // Song
                let shrygei = combatData.player_attributes.totalAchre + combatData.weapons[1].achre + combatData.player_attributes.totalCaeren + combatData.weapons[0].caeren + combatData.player_attributes.totalConstitution;
                combatData.player_influence_description_two =
                `The Song of Shry'gei shrieks itself through your ${combatData.weapons[1].name}, the resplendence renews you for ${shrygei}`
                combatData.weapons[1].magical_penetration += 3
                combatData.weapons[1].physical_penetration += 3
                combatData.new_player_health += shrygei
                combatData.current_player_health += shrygei
                if (combatData.new_player_health > 0) {
                    combatData.computer_win = false;
                }
            }
            if (combatData.weapons[1].influences[0] === "Tshaer") { // Animal
                let tshaer = (combatData.player_attributes.totalStrength + combatData.weapons[1].strength);
                tshaer = Math.round(tshaer * combatData.player.level / 10);
                combatData.player_influence_description_two = 
                    `Your Caer unleashes the bestial nature of Tshaer within you for ${tshaer}.`
                combatData.weapons[1].physical_damage += 5;
                combatData.new_player_health += tshaer
                combatData.current_player_health += tshaer
                if (combatData.new_player_health > 0) {
                    combatData.computer_win = false;
                }
            }
        }
    }

    if (computer_faith_number > 85) {
        combatData.computer_religious_success = true;
        if (combatData.computer_weapons[0].influences[0] === 'Daethos') { // God
            console.log('Daethos!')
            let daethos = (combatData.computer_attributes.totalAchre + combatData.computer_attributes.totalCaeren);
            daethos = Math.round(daethos * combatData.computer.level / 10);
            combatData.new_computer_health += combatData.realized_computer_damage;
            combatData.current_computer_health += combatData.realized_computer_damage;
            combatData.computer_influence_description = 
                `Daethos wraps through ${combatData.computer.name}'s Caer, ${combatData.computer_weapons[0].name} healing them for ${Math.round(combatData.realized_computer_damage)}. A faint echo of Caeren lingers for ${daethos} Righteously Spooky Damage.`    
            combatData.new_computer_health += daethos;
            combatData.new_player_health -= daethos;
            combatData.current_computer_health += daethos;
            combatData.current_player_health -= daethos;
            
            if (combatData.current_player_health < 0) {
                combatData.current_player_health = 0;
            }
            if (combatData.new_player_health < 0) {
                combatData.new_player_health = 0;
            }
            if (combatData.new_computer_health > 0) {
                combatData.player_win = false;
            }
    }
        if (combatData.computer_weapons[0].influences[0] === 'Achreo') { // Wild
            console.log('Achreo!')
            let achreo = (combatData.computer_attributes.totalAchre + combatData.computer_weapons[0].achre);
            achreo = Math.round(achreo * combatData.computer.level / 10);
            combatData.new_computer_health += achreo;
            combatData.current_computer_health += achreo;
            // combatData.computer_weapons[0].critical_chance = Number(combatData.computer_weapons[0].critical_chance + 1);
            combatData.computer_influence_description = 
                `${combatData.computer.name}'s Caer stirs Achreo, much to his own surprise and soft as whispers he grants renewal of ${achreo}.`
            combatData.computer_weapons[0].physical_damage += 2;
            combatData.computer_weapons[0].magical_damage += 2;
            combatData.computer_weapons[0].critical_chance += 2;
            combatData.computer_weapons[0].critical_damage += 0.2;
            if (combatData.new_computer_health > 0) {
                combatData.player_win = false;
            }
        }
        if (combatData.computer_weapons[0].influences[0] === "Ahn've") { // Wind
            console.log("Ahn've!")
            let ahnve = (combatData.computer_attributes.totalCaeren + combatData.computer_weapons[0].caeren);
            ahnve = Math.round(ahnve * combatData.computer.level / 10);
            combatData.new_computer_health += ahnve;
            combatData.current_computer_health += ahnve;
            combatData.computer_influence_description = 
                `${combatData.computer.name}'s Caer ushers forth Ahn've, a devastating storm posseses them for ${Math.round(combatData.realized_computer_damage)} more damage. The surge renews ${combatData.computer.name} for ${ahnve}.`
            // player_action = 'attack';
            // await attackCompiler(combatData, player_action)
            if (combatData.realized_computer_damage < 0) {
                    combatData.realized_computer_damage = 0;
                }
                combatData.new_player_health = combatData.current_player_health - combatData.realized_computer_damage;
                combatData.current_player_health = combatData.new_player_health; // Added to persist health totals?

                if (combatData.new_player_health < 0 || combatData.current_player_health <= 0) {
                    combatData.new_player_health = 0;
                    combatData.computer_win = true;
                }
        }
        if (combatData.computer_weapons[0].influences[0] === 'Astra') { // Lightning
            let achreo = combatData.computer_attributes.totalAchre + combatData.computer_weapons[0].achre;
            achreo = Math.round(achreo * combatData.computer.level / 10);
            combatData.new_computer_health += achreo
            combatData.current_computer_health += achreo
            combatData.computer_weapons[0].critical_damage += 0.1;
            console.log("Astra!")
            combatData.computer_influence_description = 
                `${combatData.computer.name}'s Caer ushers forth the favor of Astra's Lightning, quickening them.`
            combatData.computer_weapons[0].critical_chance += 4;
            combatData.computer_weapons[0].roll += 2;
            if (combatData.new_computer_health > 0) {
                combatData.player_win = false;
            }
        }
        if (combatData.computer_weapons[0].influences[0] === 'Cambire') { // Potential
            let cambire = combatData.computer_attributes.totalCaeren + combatData.computer_weapons[0].caeren;
            cambire = Math.round(cambire * combatData.computer.level / 10);
            console.log("Cambire!")
            combatData.computer_influence_description = 
                `${combatData.computer.name}'s Caer ushers forth the Chance of Cambire, warping back to damage ${combatData.player.name} for ${Math.round(combatData.realized_computer_damage)}, gifting ${cambire}.`
            if (combatData.realized_computer_damage < 0) {
                    combatData.realized_computer_damage = 0;
                }
            combatData.new_player_health = combatData.current_player_health - combatData.realized_computer_damage;
            combatData.current_player_health = combatData.new_player_health; // Added to persist health totals?

            if (combatData.new_player_health < 0 || combatData.current_player_health <= 0) {
                combatData.new_player_health = 0;
                combatData.computer_win = true;
            }    
        }
        if (combatData.computer_weapons[0].influences[0] === 'Chiomyr') { // Humor
            let chiomyr = combatData.computer_attributes.totalKyosir + combatData.computer_weapons[0].kyosir;
            chiomyr = Math.round(chiomyr * combatData.computer.level / 10);
            combatData.new_computer_health += chiomyr;
            combatData.current_computer_health += chiomyr;
            console.log("Chiomyr!")
            combatData.computer_weapons[0].physical_penetration += 3;
            combatData.computer_weapons[0].magical_penetration += 3;
            if (combatData.new_computer_health > 0) {
                combatData.player_win = false;
            }
        }
        if (combatData.computer_weapons[0].influences[0] === 'Fyer') { // Fire
            console.log("Fyer!")
            let fyer = combatData.computer_attributes.totalCaeren + combatData.computer_weapons[0].caeren;
            fyer = Math.round(fyer * combatData.computer.level / 10);
            combatData.new_computer_health += fyer;
            combatData.current_computer_health += fyer;
            combatData.computer_influence_description = 
                `${combatData.computer.name}'s Caer ushers forth the favor of Fyer igniting through them.`
            combatData.computer_weapons[0].critical_damage += 0.9;
            combatData.computer_weapons[0].critical_chance += 1;
            if (combatData.new_computer_health > 0) {
                combatData.player_win = false;
            }
        }
        if (combatData.computer_weapons[0].influences[0] === 'Ilios') { // Sun
            console.log("Ilios!")
            let ilios = combatData.realized_computer_damage;
            combatData.new_computer_health += ilios;
            combatData.current_computer_health += ilios;
            combatData.computer_influence_description = 
                `The Hush of Ilios bursts into ${combatData.computer.name} through their ${combatData.computer_weapons[0].name}, his brilliance radiating for ${Math.round(ilios)}.`
            player_action = 'attack';   
            combatData.computer_weapons[0].magical_penetration += 2;
            combatData.computer_weapons[0].physical_penetration += 2;
            combatData.player_defense.physicalDefenseModifier += 1;
            combatData.player_defense.magicalDefenseModifier += 1;
            combatData.player_defense.physicalPosture += 1;
            combatData.player_defense.magicalPosture += 1;
            if (combatData.new_computer_health > 0) {
                combatData.player_win = false;
            }
        }
        if (combatData.computer_weapons[0].influences[0] === "Kyn'gi") { // Hunt
            let kyngi = combatData.computer_attributes.totalAgility + combatData.computer_weapons[0].agility;
            kyngi = Math.round(kyngi * combatData.computer.level / 10);
            combatData.new_computer_health += kyngi
            combatData.current_computer_health += kyngi
            console.log("Kyn'gi!")
            combatData.computer_influence_description = 
                `${combatData.computer.name}'s keening Caer shrieks into Kyn'gi, emboldening the Hunt.`
            combatData.computer_weapons[0].roll += 3;
            combatData.computer_weapons[0].critical_chance += 3;
            if (combatData.new_computer_health > 0) {
                combatData.player_win = false;
            }
        }
        if (combatData.computer_weapons[0].influences[0] === "Kyrisos") { // Gold
            let kyrisos = combatData.computer_attributes.totalKyosir + combatData.computer_weapons[0].kyosir;
            kyrisos = Math.round(kyrisos * combatData.computer.level / 10);
            combatData.new_computer_health += kyrisos;
            combatData.current_computer_health += kyrisos;
            console.log("Kyrisos!")
            combatData.computer_influence_description = 
                `The Caer of Kyrisos imbues ${combatData.computer.name}'s with Kyosir!`
            combatData.computer_attributes.kyosirMod += 3;
            if (combatData.new_computer_health > 0) {
                combatData.player_win = false;
            }
        }
        if (combatData.computer_weapons[0].influences[0] === "Kyr'na") { // Time
            console.log("Kyr'na!")
            let kyrna = combatData.computer_attributes.totalAchre + combatData.computer_weapons[0].achre;
            kyrna = Math.round(kyrna * combatData.computer.level / 10);
            combatData.computer_influence_description = 
                `Kyr'na withers you, brittling your Caer for ${kyrna} Damage.`
            combatData.new_player_health -= kyrna;
            combatData.current_player_health -= kyrna;
            if (combatData.current_player_health < 0) {
                combatData.current_player_health = 0;
            }
            if (combatData.new_player_health < 0) {
                combatData.new_player_health = 0;
            }
        }
        if (combatData.computer_weapons[0].influences[0] === "Lilos") { // Life
            console.log("Lilos!")
            let lilos = combatData.computer_attributes.totalCaeren + combatData.computer_weapons[0].caeren;
            lilos = Math.round(lilos * combatData.computer.level / 5);
            combatData.computer_influence_description = 
                `Lilos breathes her Cear into ${combatData.computer.name}, healing ${combatData.computer.name} for ${lilos}.`
            combatData.new_computer_health += lilos;
            combatData.current_computer_health += lilos;
            if (combatData.new_computer_health > 0) {
                combatData.player_win = false;
            }
        }
        if (combatData.computer_weapons[0].influences[0] === "Ma'anre") { // Moon
            let maanre = combatData.realized_computer_damage;
            combatData.new_computer_health += maanre;
            combatData.current_computer_health += maanre;
            console.log("Ma'anre!")
            combatData.computer_influence_description = 
                `Ma'anre wraps her tendrils about ${combatData.computer.name}'s ${combatData.computer_weapons[0].name}, changing their perception of this world, its peculiarity resonating for ${Math.round(maanre)}.` 
            combatData.computer_weapons[0].roll += 2;
            combatData.computer_weapons[0].dodge -= 2;
            combatData.computer_weapons[0].critical_chance += 2;
            combatData.computer_weapons[0].critical_damage += 0.2;
            if (combatData.new_computer_health > 0) {
                combatData.player_win = false;
            }
        }
        if (combatData.computer_weapons[0].influences[0] === "Nyrolus") { // Water
            console.log("Nyrolus!")
            let nyrolus = (combatData.computer_attributes.totalCaeren + combatData.computer_weapons[0].caeren);
            nyrolus = Math.round(nyrolus * combatData.computer.level / 10);
            combatData.computer_influence_description = 
                `${combatData.computer.name}'s mercurial weapon intrigues Nyrolus, swarming them in their Caer for ${nyrolus}.`
            combatData.computer_defense.physicalDefenseModifier += 2;
            combatData.computer_defense.magicalDefenseModifier += 2;
            combatData.computer_defense.physicalPosture += 2;
            combatData.computer_defense.magicalPosture += 2;
            combatData.new_computer_health += nyrolus;
            combatData.current_computer_health += nyrolus;
            if (combatData.new_computer_health > 0) {
                combatData.player_win = false;
            }
        }
        if (combatData.computer_weapons[0].influences[0] === "Quor'ei") { // Earth
            console.log("Quor'ei!")
            let quorei = combatData.computer_attributes.totalAchre + combatData.computer_weapons[0].achre;
            quorei = Math.round(quorei * combatData.computer.level / 10);
            combatData.computer_influence_description = 
                `${combatData.computer.name}'s resolve beckons with the favor of your Quor'ei, steeling them in their Caer for ${quorei}.`
            combatData.computer_defense.physicalDefenseModifier += 2;
            combatData.computer_defense.magicalDefenseModifier += 2;
            combatData.computer_defense.physicalPosture += 2;
            combatData.computer_defense.magicalPosture += 2;
            combatData.new_computer_health += quorei;
            combatData.current_computer_health += quorei;    
            if (combatData.new_computer_health > 0) {
                combatData.player_win = false;
            }
        }
        if (combatData.computer_weapons[0].influences[0] === "Rahvre") { // Dreams
            let rahvre = combatData.computer_attributes.totalCaeren + combatData.computer_weapons[0].caeren;
            rahvre = Math.round(rahvre * combatData.computer.level / 10);
            combatData.new_computer_health += rahvre
            combatData.current_computer_health += rahvre
            console.log("Rahvre!")
            combatData.computer_influence_description = 
            `${combatData.computer.name}'s calming Caer reaches its tendrils to Rahvre, intertwining them.`
            combatData.computer_weapons[0].magical_damage += 5;
            if (combatData.new_computer_health > 0) {
                combatData.player_win = false;
            }
        }
        if (combatData.computer_weapons[0].influences[0] === "Senari") { // Wisdom
            console.log("Senari!")
            combatData.computer_influence_description = 
                `${combatData.computer.name}'s calm swirls with the favor of Senari, holding them in her Caer.`
            combatData.computer_weapons[0].roll += 3;
            combatData.computer_weapons[0].dodge -= 3;
        }
        if (combatData.computer_weapons[0].influences[0] === "Se'dyro") { // Iron
            let sedyro = (combatData.computer_attributes.totalAgility + combatData.computer_weapons[0].agility);
            sedyro = Math.round(sedyro * combatData.computer.level / 10);
            combatData.new_computer_health += sedyro;
            combatData.current_computer_health += sedyro;
            console.log("Se'dyro!");
            combatData.computer_influence_description = 
                `The Caer of Se'dyro sings into their ${combatData.computer_weapons[0].name}, causing it to frenzy for ${Math.round(combatData.realized_computer_damage)} more damage!`    
            player_action = 'attack';
            // await attackCompiler(combatData, player_action)
            if (combatData.realized_computer_damage < 0) {
                    combatData.realized_computer_damage = 0;
                }
            combatData.new_player_health = combatData.current_player_health - combatData.realized_computer_damage;
            combatData.current_player_health = combatData.new_player_health; // Added to persist health totals?

            if (combatData.new_player_health < 0 || combatData.current_player_health <= 0) {
                combatData.new_player_health = 0;
                combatData.computer_win = true;
            }
        }
        if (combatData.computer_weapons[0].influences[0] === "Se'vas") { // War
            let sevas = combatData.computer_attributes.totalStrength + combatData.computer_weapons[0].strength;
            sevas = Math.round(sevas * combatData.computer.level / 10);
            combatData.new_computer_health += sevas
            combatData.current_computer_health += sevas
            console.log("Se'vas!")
            combatData.computer_influence_description = 
                `The Caer of Se'vas scorns their ${combatData.computer_weapons[0].name}, scarring it with the beauty of war.` 
            combatData.computer_weapons[0].critical_chance += 3;
            combatData.computer_weapons[0].critical_damage += 0.3;
            if (combatData.new_computer_health > 0) {
                combatData.player_win = false;
            }
        }
        if (combatData.computer_weapons[0].influences[0] === "Shrygei") { // Song
            let shrygei = combatData.computer_attributes.totalAchre + combatData.computer_attributes.totalCaeren + combatData.computer_attributes.totalConstitution;
            shrygei = Math.round(shrygei * combatData.computer.level / 10);
            combatData.computer_influence_description =
            `The Song of Shry'gei shrieks itself through ${combatData.computer.name}'s ${combatData.computer_weapons[0].name}, the resplendence renews them for ${shrygei}`
                combatData.computer_weapons[0].magical_penetration += 2
                combatData.computer_weapons[0].physical_penetration += 2
                combatData.new_computer_health += shrygei
                combatData.current_computer_health += shrygei
                if (combatData.new_computer_health > 0) {
                    combatData.player_win = false;
                }
        }
        if (combatData.computer_weapons[0].influences[0] === "Tshaer") { // Animal
            let tshaer = combatData.computer_attributes.totalStrength + combatData.computer_weapons[0].strength;
            tshaer = Math.round(tshaer * combatData.computer.level / 10);
            combatData.new_computer_health += tshaer
            combatData.current_computer_health += tshaer
            console.log("Tshaer!")
            combatData.computer_influence_description = 
                `${combatData.computer.name}'s fervor unleashes the bestial nature of Tshaer within them.`
            combatData.computer_weapons[0].physical_damage += 5;
            if (combatData.new_computer_health > 0) {
                combatData.player_win = false;
            }
        }
    }
    if (combatData.computer_dual_wielding === true) {
        if (computer_faith_number_two > 85) {
            combatData.computer_religious_success = true;
            if (combatData.computer_weapons[1].influences[0] === 'Daethos') { // God
                console.log("Daethos!")
                let daethos = (combatData.computer_attributes.totalAchre + combatData.computer_attributes.totalCaeren);
                daethos = Math.round(daethos * combatData.computer.level / 10);
                combatData.new_computer_health += combatData.realized_computer_damage;
                combatData.current_computer_health += combatData.realized_computer_damage;
                combatData.computer_influence_description_two = 
                    `Daethos wraps through ${combatData.computer.name}'s Caer, ${combatData.computer_weapons[1].name} healing them for ${Math.round(combatData.realized_computer_damage)}. A faint echo of Caeren lingers for ${daethos} Righteously Spooky Damage.`    
                combatData.new_computer_health += daethos;
                combatData.new_player_health -= daethos;
                combatData.current_computer_health += daethos;
                combatData.current_player_health -= daethos;
                if (combatData.current_player_health < 0) {
                    combatData.current_player_health = 0;
                }
                if (combatData.new_player_health < 0) {
                    combatData.new_player_health = 0;
                }
                if (combatData.new_computer_health > 0) {
                    combatData.player_win = false;
                }
        }
            if (combatData.computer_weapons[1].influences[0] === 'Achreo') { // Wild
                let achreo = (combatData.computer_attributes.totalAchre + combatData.computer_weapons[1].achre);
                achreo = Math.round(achreo * combatData.computer.level / 10);
                combatData.new_computer_health += achreo;
                combatData.current_computer_health += achreo;
                console.log("Achreo!");
                combatData.computer_influence_description_two = 
                    `${combatData.computer.name}'s Caer stirs Achreo, much to his own surprise, renewing them for ${achreo}.`
                combatData.computer_weapons[1].physical_damage += 2;
                combatData.computer_weapons[1].magical_damage += 2;
                combatData.computer_weapons[1].critical_chance += 2;
                combatData.computer_weapons[1].critical_damage += 0.2;
                if (combatData.new_computer_health > 0) {
                    combatData.player_win = false;
                }
            }
            if (combatData.computer_weapons[1].influences[0] === "Ahn've") { // Wind
                let ahnve = (combatData.computer_attributes.totalCaeren + combatData.computer_weapons[1].caeren);
                ahnve = Math.round(ahnve * combatData.computer.level / 10);
                combatData.new_computer_health += ahnve;
                combatData.current_computer_health += ahnve;
                console.log("Ahn've!")
                combatData.computer_influence_description_two = 
                    `${combatData.computer.name}'s Caer ushers forth Ahn've, a devastating storm posseses them for ${Math.round(combatData.realized_computer_damage)} more damage. The surge renews ${combatData.computer.name} for ${ahnve}.`
                player_action = 'attack';
                // await attackCompiler(combatData, player_action)
                if (combatData.realized_computer_damage < 0) {
                    combatData.realized_computer_damage = 0;
                }
                combatData.new_player_health = combatData.current_player_health - combatData.realized_computer_damage;
                combatData.current_player_health = combatData.new_player_health; // Added to persist health totals?

                if (combatData.new_player_health < 0 || combatData.current_player_health <= 0) {
                    combatData.new_player_health = 0;
                    combatData.computer_win = true;
                }
            }
            if (combatData.computer_weapons[1].influences[0] === 'Astra') { // Lightning
                let astra = combatData.computer_attributes.totalAchre + combatData.computer_weapons[1].achre;
                astra = Math.round(astra * combatData.computer.level / 10);
                combatData.new_computer_health += astra
                combatData.current_computer_health += astra
                combatData.computer_influence_description_two = 
                    `${combatData.computer.name}'s Caer ushers forth the favor of Astra's Lightning, quickening them.`
                combatData.computer_weapons[1].critical_chance += 4;
                combatData.computer_weapons[1].roll += 2;
                combatData.computer_weapons[1].critical_damage += 0.1;
                if (combatData.new_computer_health > 0) {
                    combatData.player_win = false;
                }
            }
            if (combatData.computer_weapons[1].influences[0] === 'Cambire') { // Potential
                let cambire = combatData.computer_attributes.totalCaeren + combatData.computer_weapons[1].caeren;
                cambire = Math.round(cambire * combatData.computer.level / 10);
                combatData.new_computer_health += cambire;
                combatData.current_computer_health += cambire;
                combatData.computer_influence_description_two = 
                    `${combatData.computer.name}'s Caer ushers forth the Chance of Cambire, warping back to damage ${combatData.player.name} for ${Math.round(combatData.realized_computer_damage)}.`
                player_action = 'attack';
                // await attackCompiler(combatData, player_action)
                if (combatData.realized_computer_damage < 0) {
                    combatData.realized_computer_damage = 0;
                }
                combatData.new_player_health = combatData.current_player_health - combatData.realized_computer_damage;
                combatData.current_player_health = combatData.new_player_health; // Added to persist health totals?

                if (combatData.new_player_health < 0 || combatData.current_player_health <= 0) {
                    combatData.new_player_health = 0;
                    combatData.computer_win = true;
                }    
            }
            if (combatData.computer_weapons[1].influences[0] === 'Chiomyr') { // Humor
                let chiomyr = combatData.computer_attributes.totalKyosir + combatData.computer_weapons[1].kyosir;
                chiomyr = Math.round(chiomyr * combatData.computer.level / 10); 
                combatData.new_computer_health += chiomyr;
                combatData.current_computer_health += chiomyr;
                combatData.computer_weapons[1].physical_penetration += 3;
                combatData.computer_weapons[1].magical_penetration += 3;
            }
            if (combatData.computer_weapons[1].influences[0] === 'Fyer') { // Fire
                let fyer = combatData.computer_attributes.totalCaeren + combatData.computer_weapons[1].caeren;
                fyer = Math.round(fyer * combatData.computer.level / 10);
                combatData.new_computer_health += fyer;
                combatData.current_computer_health += fyer;
                combatData.computer_influence_description_two = 
                    `${combatData.computer.name}'s Caer ushers forth the favor of Fyer igniting through them.`;
                combatData.computer_weapons[1].critical_damage += 0.9;
                combatData.computer_weapons[1].critical_chance += 1;
            }
            if (combatData.computer_weapons[1].influences[0] === 'Ilios') { // Sun
                let ilios = combatData.realized_computer_damage;
                combatData.new_computer_health += ilios;
                combatData.current_computer_health += ilios;
                combatData.computer_influence_description_two = 
                    `The Hush of Ilios bursts into ${combatData.computer.name} through their ${combatData.computer_weapons[1].name}, his brilliance radiating for ${Math.round(ilios)}.`
                player_action = 'attack';   
                combatData.computer_weapons[1].magical_penetration += 2;
                combatData.computer_weapons[1].physical_penetration += 2;
                combatData.player_defense.physicalDefenseModifier += 1;
                combatData.player_defense.magicalDefenseModifier += 1;
                combatData.player_defense.physicalPosture += 1;
                combatData.player_defense.magicalPosture += 1;
            }
            if (combatData.computer_weapons[1].influences[0] === "Kyn'gi") { // Hunt
                let kyngi = combatData.computer_attributes.totalAgility + combatData.computer_weapons[1].agility;
                kyngi = Math.round(kyngi * combatData.computer.level / 10);
                combatData.new_computer_health += kyngi
                combatData.current_computer_health += kyngi
                combatData.computer_influence_description_two = 
                    `${combatData.computer.name}'s keen Caer shrieks into Kyn'gi, emboldening the Hunt.`
                combatData.computer_weapons[1].roll += 3;
                combatData.computer_weapons[1].critical_chance += 3;
            }
            if (combatData.computer_weapons[1].influences[0] === "Kyrisos") { // Gold
                let kyrisos = combatData.computer_attributes.totalKyosir + combatData.computer_weapons[1].kyosir;
                kyrisos = Math.round(kyrisos * combatData.computer.level / 10);
                combatData.new_computer_health += kyrisos;
                combatData.current_computer_health += kyrisos;
                combatData.computer_influence_description_two = 
                    `The Caer of Kyrisos imbues ${combatData.computer.name}'s with Kyosir!`
                combatData.computer_attributes.kyosirMod += 3;
            }
            if (combatData.computer_weapons[1].influences[0] === "Kyr'na") { // Time
                let kyrna = combatData.computer_attributes.totalAchre + combatData.computer_weapons[1].achre;
                kyrna = Math.round(kyrna * combatData.computer.level / 10);
                combatData.computer_influence_description_two = 
                    `Kyr'na withers you, brittling your Caer for ${kyrna} Damage.`
                combatData.new_player_health -= kyrna;
                combatData.current_player_health -= kyrna;
                if (combatData.current_player_health < 0) {
                    combatData.current_player_health = 0;
                }
                if (combatData.new_player_health < 0) {
                    combatData.new_player_health = 0;
                }
            }
            if (combatData.computer_weapons[1].influences[0] === "Lilos") { // Life
                let lilos = combatData.computer_attributes.totalCaeren + combatData.computer_weapons[1].caeren;
                lilos = Math.round(lilos * combatData.computer.level / 10);
                combatData.computer_influence_description_two = 
                    `Lilos breathes her Caer into ${combatData.computer.name}, healing them for ${lilos}.`
                combatData.new_computer_health += lilos;
                combatData.current_computer_health += lilos;
            }
            if (combatData.computer_weapons[1].influences[0] === "Ma'anre") { // Moon
                let maanre = combatData.realized_computer_damage;
                combatData.new_computer_health += maanre;
                combatData.current_computer_health += maanre;
                combatData.computer_influence_description_two = 
                    `Ma'anre wraps her tendrils about ${combatData.computer.name}'s ${combatData.computer_weapons[1].name}, changing their perception of this world, its peculiarity resonating for ${Math.round(maanre)}.` 
                combatData.computer_weapons[1].roll += 2;
                combatData.computer_weapons[1].dodge -= 2;
                combatData.computer_weapons[1].critical_chance += 2;
                combatData.computer_weapons[1].critical_damage += 0.2;
            }
            if (combatData.computer_weapons[1].influences[0] === "Nyrolus") { // Water
                let nyrolus = (combatData.computer_attributes.totalCaeren + combatData.computer_weapons[1].caeren);
                nyrolus = Math.round(nyrolus * combatData.computer.level / 10);
                combatData.computer_influence_description_two = 
                    `${combatData.computer.name}'s mercurial weapon intrigues Nyrolus, swarming them in their Caer for ${nyrolus}.`
                combatData.computer_defense.physicalDefenseModifier += 2;
                combatData.computer_defense.magicalDefenseModifier += 2;
                combatData.computer_defense.physicalPosture += 2;
                combatData.computer_defense.magicalPosture += 2;
                combatData.new_computer_health += nyrolus
                combatData.current_computer_health += nyrolus
            }
            if (combatData.computer_weapons[1].influences[0] === "Quor'ei") { // Earth
                let quorei = combatData.computer_attributes.totalAchre + combatData.computer_weapons[1].achre;
                quorei = Math.round(quorei * combatData.computer.level / 10);
                combatData.computer_influence_description_two = 
                    `${combatData.computer.name}'s resolve beckons with the favor of your Quor'ei, steeling them in their Caer for ${quorei}.`
                combatData.computer_defense.physicalDefenseModifier += 2;
                combatData.computer_defense.magicalDefenseModifier += 2;
                combatData.computer_defense.physicalPosture += 2;
                combatData.computer_defense.magicalPosture += 2;
                combatData.new_computer_health += quorei
                combatData.current_computer_health += quorei
            }
            if (combatData.computer_weapons[1].influences[0] === "Rahvre") { // Dreams
                let rahvre = combatData.computer_attributes.totalCaeren + combatData.computer_weapons[1].caeren;
                rahvre = Math.round(rahvre * combatData.computer.level / 10);
                combatData.new_computer_health += rahvre
                combatData.current_computer_health += rahvre
                combatData.computer_influence_description_two = 
                `${combatData.computer.name}'s calming Caer reaches its tendrils to Rahvre, intertwining them.`
            combatData.computer_weapons[1].magical_damage += 5;
            }
            if (combatData.computer_weapons[1].influences[0] === "Senari") { // Wisdom
                combatData.computer_influence_description_two = 
                    `${combatData.computer.name}'s calm swirls with the favor of Senari, holding them in her Caer.`
                combatData.computer_weapons[1].roll += 3;
                combatData.computer_weapons[1].dodge -= 3;
            }
            if (combatData.computer_weapons[1].influences[0] === "Se'dyro") { // Iron
                let sedyro = (combatData.computer_attributes.totalAgility + combatData.computer_weapons[1].agility);
                sedyro = Math.round(sedyro * combatData.computer.level / 10);
                combatData.new_computer_health += sedyro
                combatData.current_computer_health += sedyro
                combatData.computer_influence_description_two = 
                    `The Caer of Se'dyro sings into their ${combatData.computer_weapons[1].name}, causing it to frenzy for ${Math.round(combatData.realized_computer_damage)} more damage!`    
                player_action = 'attack';
                // await attackCompiler(combatData, player_action)
                if (combatData.realized_computer_damage < 0) {
                    combatData.realized_computer_damage = 0;
                }
                combatData.new_player_health = combatData.current_player_health - combatData.realized_computer_damage;
                combatData.current_player_health = combatData.new_player_health; // Added to persist health totals?

                if (combatData.new_player_health <= 0 || combatData.current_player_health <= 0) {
                    combatData.new_player_health = 0;
                    combatData.computer_win = true;
                }
            }
            if (combatData.computer_weapons[1].influences[0] === "Se'vas") { // War
                let sevas = combatData.computer_attributes.totalStrength + combatData.computer_weapons[1].strength;
                sevas = Math.round(sevas * combatData.computer.level / 10);
                combatData.new_computer_health += sevas
                combatData.current_computer_health += sevas
                combatData.computer_influence_description_two = 
                    `The Caer of Se'vas scorns their ${combatData.computer_weapons[1].name}, scarring it with the beauty of war.` 
                combatData.computer_weapons[1].critical_chance += 3;
                combatData.computer_weapons[1].critical_damage += 0.3;
            }
            if (combatData.computer_weapons[1].influences[0] === "Shrygei") { // Song
                let shrygei = combatData.computer_attributes.totalAchre + combatData.computer_attributes.totalCaeren + combatData.computer_attributes.totalConstitution;
                shrygei = Math.round(shrygei * combatData.computer.level / 10);
                combatData.computer_influence_description_two =
                `The Song of Shry'gei shrieks itself through ${combatData.computer.name}'s ${combatData.computer_weapons[1].name}, the resplendence renews them for ${shrygei}`
                    combatData.computer_weapons[1].magical_penetration += 2
                    combatData.computer_weapons[1].physical_penetration += 2
                    combatData.new_computer_health += shrygei
                    combatData.current_computer_health += shrygei
            }
            if (combatData.computer_weapons[1].influences[0] === "Tshaer") { // Animal
                let tshaer = combatData.computer_attributes.totalStrength + combatData.computer_weapons[1].strength;
                tshaer = Math.round(tshaer * combatData.computer.level / 10);
                combatData.new_computer_health += tshaer
                combatData.current_computer_health += tshaer
                combatData.computer_influence_description_two = 
                    `${combatData.computer.name}'s Caer unleashes the bestial nature of Tshaer within them.`
                combatData.computer_weapons[1].physical_damage += 5;
            }
        }
    }

    combatData.weapons[0].critical_chance = combatData.weapons[0].critical_chance.toFixed(2);
    combatData.weapons[0].critical_damage = combatData.weapons[0].critical_damage.toFixed(2);
    combatData.weapons[1].critical_chance = combatData.weapons[1].critical_chance.toFixed(2);
    combatData.weapons[1].critical_damage = combatData.weapons[1].critical_damage.toFixed(2);
    combatData.computer_weapons[0].critical_chance = combatData.computer_weapons[0].critical_chance.toFixed(2);
    combatData.computer_weapons[0].critical_damage = combatData.computer_weapons[0].critical_damage.toFixed(2);
    combatData.computer_weapons[1].critical_chance = combatData.computer_weapons[1].critical_chance.toFixed(2);
    combatData.computer_weapons[1].critical_damage = combatData.computer_weapons[1].critical_damage.toFixed(2);

    combatData.weapons[0].critical_chance = Number(combatData.weapons[0].critical_chance);
    combatData.weapons[0].critical_damage = Number(combatData.weapons[0].critical_damage);
    combatData.weapons[1].critical_chance = Number(combatData.weapons[1].critical_chance);
    combatData.weapons[1].critical_damage = Number(combatData.weapons[1].critical_damage);
    combatData.computer_weapons[0].critical_chance = Number(combatData.computer_weapons[0].critical_chance);
    combatData.computer_weapons[0].critical_damage = Number(combatData.computer_weapons[0].critical_damage);
    combatData.computer_weapons[1].critical_chance = Number(combatData.computer_weapons[1].critical_chance);
    combatData.computer_weapons[1].critical_damage = Number(combatData.computer_weapons[1].critical_damage);



    if (combatData.new_player_health > 0) {
        combatData.computer_win = false;
    }
    if (combatData.new_computer_health > 0) {
        combatData.player_win = false;
    }

    return {
        combatData, 
        statusEffect
    }
}

module.exports = StatusEffect 