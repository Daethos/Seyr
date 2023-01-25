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

                potentialModifiers.damage = playerDamage / 4;
                potentialModifiers.healing = playerDamage / 4;
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

                potentialModifiers.damage = playerDamage / 3;
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

                potentialModifiers.damage = playerDamage / 3;
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

                potentialModifiers.damage = playerDamage / 8;
                potentialModifiers.healing = playerDamage / 4;
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

                potentialModifiers.damage = playerDamage / 4;
                potentialModifiers.healing = playerDamage / 8;
                break;
            }
            case "Nyrolus": {
                potentialModifiers.physicalDefenseModifier = effectModifiers.physicalDefenseModifier / 2;
                potentialModifiers.magicalDefenseModifier = effectModifiers.magicalDefenseModifier;
                potentialModifiers.physicalPosture = effectModifiers.physicalPosture / 2;
                potentialModifiers.magicalPosture = effectModifiers.magicalPosture;

                potentialModifiers.damage = effectModifiers.damage;
                potentialModifiers.healing = effectModifiers.healing * 1.5;
                break;
            }
            case "Quor'ei": {
                potentialModifiers.physicalDefenseModifier = effectModifiers.physicalDefenseModifier;
                potentialModifiers.magicalDefenseModifier = effectModifiers.magicalDefenseModifier / 2;
                potentialModifiers.physicalPosture = effectModifiers.physicalPosture;
                potentialModifiers.magicalPosture = effectModifiers.magicalPosture / 2;

                potentialModifiers.damage = effectModifiers.damage;
                potentialModifiers.healing = effectModifiers.healing * 1.5;
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
                potentialModifiers.critical_chance = effectModifiers.critical_chance / 2;
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

                potentialModifiers.damage = playerDamage / 4;
                potentialModifiers.healing = playerDamage / 4;
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
            if (weapon.grip === 'One Hand') {
                attribute = (attributes.totalAchre + weapon.achre) * 1.25;
                type = 'achre';
            } else {
                attribute = attributes.totalCaeren + weapon.caeren;
                type = 'caeren';
            }
        } else if (deity === "Ahn've" || deity === "Cambire" || deity === "Fyer" || deity === "Nyrolus") {
            if (weapon.grip === 'One Hand') {
                attribute = attributes.totalAchre + weapon.achre;
                type = 'achre';
            } else {
                attribute = (attributes.totalCaeren + weapon.caeren) * 1.25;
                type = 'caeren';
            }
        } else if (deity === "Kyn'gi" || deity === "Se'dyro" || deity === "Ma'anre") {
            if (weapon.grip === 'One Hand' || weapon.type === 'Bow') {
                attribute = (attributes.totalAgility + weapon.agility) * 1.25;
                type = 'agility';
            } else {
                attribute = attributes.totalStrength + weapon.strength;
                type = 'strength';
            }
        } else if (deity === "Ilios" || deity === "Se'vas" || deity === "Tshaer") {
            if (weapon.grip === 'One Hand') {
                attribute = attributes.totalAgility + weapon.agility;
                type = 'agility';
            } else {
                attribute = (attributes.totalStrength + weapon.strength) * 1.25;
                type = 'strength';
            }
        } else if (deity === "Chiomyr" || deity === "Kyrisos" || deity === "Shrygei") {
            attribute = (attributes.totalKyosir + weapon.kyosir) * 1.25;
            type = 'kyosir';
        } else if (deity === "Lilos" || deity === "Kyr'na" || deity === "Rahvre") {
            attribute = (attributes.totalConstitution + weapon.constitution) * 1.5;
            type = 'constitution';
        } else if (deity === "Daethos") {
            if (weapon.grip === 'One Hand' || weapon.type === 'Bow') {
                attribute = (attributes.totalAchre + weapon.achre + attributes.totalAgility + weapon.agility) / 1.5;
                type = 'daethic';
            } else {
                attribute = (attributes.totalStrength + weapon.strength + attributes.totalCaeren + weapon.caeren) / 1.5;
                type = 'daethic';
            }
        }

        return this.intensity = {
            initial: attribute,
            value: attribute,
            magnitude: player.level / 100,
            governance: type,
        };
        
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

        // So setting up the intensity and modifiers, I can filter which ones are relevant to the weapon's influence.
        switch(weapon.influences[0]) {
            case "Daethos": {
                potentialModifiers.physical_damage = effectModifiers.physical_damage / 2;
                potentialModifiers.magical_damage = effectModifiers.magical_damage / 2;

                potentialModifiers.damage = playerDamage / 4;
                potentialModifiers.healing = playerDamage / 4;
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

                potentialModifiers.damage = playerDamage / 3;
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

                potentialModifiers.damage = playerDamage / 3;
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

                potentialModifiers.damage = playerDamage / 8;
                potentialModifiers.healing = playerDamage / 4;
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

                potentialModifiers.damage = playerDamage / 4;
                potentialModifiers.healing = playerDamage / 8;
                break;
            }
            case "Nyrolus": {
                potentialModifiers.physicalDefenseModifier = effectModifiers.physicalDefenseModifier / 2;
                potentialModifiers.magicalDefenseModifier = effectModifiers.magicalDefenseModifier;
                potentialModifiers.physicalPosture = effectModifiers.physicalPosture / 2;
                potentialModifiers.magicalPosture = effectModifiers.magicalPosture;

                potentialModifiers.damage = effectModifiers.damage;
                potentialModifiers.healing = effectModifiers.healing * 1.5;
                break;
            }
            case "Quor'ei": {
                potentialModifiers.physicalDefenseModifier = effectModifiers.physicalDefenseModifier;
                potentialModifiers.magicalDefenseModifier = effectModifiers.magicalDefenseModifier / 2;
                potentialModifiers.physicalPosture = effectModifiers.physicalPosture;
                potentialModifiers.magicalPosture = effectModifiers.magicalPosture / 2;

                potentialModifiers.damage = effectModifiers.damage;
                potentialModifiers.healing = effectModifiers.healing * 1.5;
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
                potentialModifiers.critical_chance = effectModifiers.critical_chance / 2;
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

                potentialModifiers.damage = playerDamage / 4;
                potentialModifiers.healing = playerDamage / 4;
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
        let description = `${weapon.influences[0]} has channeled a gift through their sigil, ${article} ${weapon.name}, ${prayer === 'Debuff' ? `cursing ${enemy.name}` : prayer === 'Heal' ? `renewing ${player.name} with a factor of ${intensity.value * intensity.magnitude * 10}` : prayer === 'Damage' ? `damaging ${enemy.name} to a factor of ${intensity.value * intensity.magnitude * 10}` : `blessing ${player.name}`} for ${duration} combat rounds.`;
        
        return this.description = description;
    }
    setImgURL(weap) {
        return this.imgURL = weap.imgURL;
    }


}

module.exports = StatusEffect 