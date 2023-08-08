const StatusEffect = require('./faithServices.js');

// ====================================== HELPERS ====================================== \\

const roundToTwoDecimals = (num) => {
    const roundedNum = Number(num.toFixed(2));
    if (roundedNum.toString().match(/\.\d{3,}$/)) {
        return parseFloat(roundedNum);
    };
    return roundedNum;
};

const damageTypeCompiler = async (damageType, enemy, weapon, physicalDamage, magicalDamage) => {
    if (damageType === 'Blunt' || damageType === 'Fire' || damageType === 'Earth' || damageType === 'Spooky') {
        if (weapon.attack_type === 'Physical') {
            if (enemy.helmet.type === 'Plate-Mail') {
                physicalDamage *= 1.15;
            };
            if (enemy.helmet.type === 'Chain-Mail') {
                physicalDamage *= 1.08;
            };
            if (enemy.helmet.type === 'Leather-Mail') {
                physicalDamage *= 0.92;
            };
            if (enemy.helmet.type === 'Leather-Cloth') {
                physicalDamage *= 0.85;
            };
            if (enemy.chest.type === 'Plate-Mail') {
                physicalDamage *= 1.1;
            };
            if (enemy.chest.type === 'Chain-Mail') {
                physicalDamage *= 1.05;
            };
            if (enemy.chest.type === 'Leather-Mail') {
                physicalDamage *= 0.95;
            };
            if (enemy.chest.type === 'Leather-Cloth') {
                physicalDamage *= 0.9;
            };
            if (enemy.legs.type === 'Plate-Mail') {
                physicalDamage *= 1.05;
            };
            if (enemy.legs.type === 'Chain-Mail') {
                physicalDamage *= 1.03;
            };
            if (enemy.legs.type === 'Leather-Mail') {
                physicalDamage *= 0.97;
            };
            if (enemy.legs.type === 'Leather-Cloth') {
                physicalDamage *= 0.95;
            };
        };
        if (weapon.attack_type === 'Magic') {
            if (enemy.helmet.type === 'Plate-Mail') {
                magicalDamage *= 1.15;
            };
            if (enemy.helmet.type === 'Chain-Mail') {
                magicalDamage *= 1.08;
            };
            if (enemy.helmet.type === 'Leather-Mail') {
                magicalDamage *= 0.92;
            };
            if (enemy.helmet.type === 'Leather-Cloth') {
                magicalDamage *= 0.85;
            };
            if (enemy.chest.type === 'Plate-Mail') {
                magicalDamage *= 1.1;
            };
            if (enemy.chest.type === 'Chain-Mail') {
                magicalDamage *= 1.05;
            };
            if (enemy.chest.type === 'Leather-Mail') {
                magicalDamage *= 0.95;
            };
            if (enemy.chest.type === 'Leather-Cloth') {
                magicalDamage *= 0.9;
            };
            if (enemy.legs.type === 'Plate-Mail') {
                magicalDamage *= 1.05;
            };
            if (enemy.legs.type === 'Chain-Mail') {
                magicalDamage *= 1.03;
            };
            if (enemy.legs.type === 'Leather-Mail') {
                magicalDamage *= 0.97;
            };
            if (enemy.legs.type === 'Leather-Cloth') {
                magicalDamage *= 0.95;
            };
        };
    };
    if (damageType === 'Pierce' || damageType === 'Lightning' || damageType === 'Frost' || damageType === 'Righteous') {
        if (weapon.attack_type === 'Physical') {
            if (enemy.helmet.type === 'Plate-Mail') {
                physicalDamage *= 0.85;
            };
            if (enemy.helmet.type === 'Chain-Mail') {
                physicalDamage *= 0.92;
            };
            if (enemy.helmet.type === 'Leather-Mail') {
                physicalDamage *= 1.08;
            };
            if (enemy.helmet.type === 'Leather-Cloth') {
                physicalDamage *= 1.15;
            };
            if (enemy.chest.type === 'Plate-Mail') {
                physicalDamage *= 0.9;
            };
            if (enemy.chest.type === 'Chain-Mail') {
                physicalDamage *= 0.95;
            };
            if (enemy.chest.type === 'Leather-Mail') {
                physicalDamage *= 1.05;
            };
            if (enemy.chest.type === 'Leather-Cloth') {
                physicalDamage *= 1.1;
            };
            if (enemy.legs.type === 'Plate-Mail') {
                physicalDamage *= 0.95;
            };
            if (enemy.legs.type === 'Chain-Mail') {
                physicalDamage *= 0.97;
            };
            if (enemy.legs.type === 'Leather-Mail') {
                physicalDamage *= 1.03;
            };
            if (enemy.legs.type === 'Leather-Cloth') {
                physicalDamage *= 1.05;
            };
        };
        if (weapon.attack_type === 'Magic') {
            if (enemy.helmet.type === 'Plate-Mail') {
                magicalDamage *= 0.85;
            };
            if (enemy.helmet.type === 'Chain-Mail') {
                magicalDamage *= 0.92;
            };
            if (enemy.helmet.type === 'Leather-Mail') {
                magicalDamage *= 1.08;
            };
            if (enemy.helmet.type === 'Leather-Cloth') {
                magicalDamage *= 1.15;
            };
            if (enemy.chest.type === 'Plate-Mail') {
                magicalDamage *= 0.9;
            };
            if (enemy.chest.type === 'Chain-Mail') {
                magicalDamage *= 0.95;
            };
            if (enemy.chest.type === 'Leather-Mail') {
                magicalDamage *= 1.05;
            };
            if (enemy.chest.type === 'Leather-Cloth') {
                magicalDamage *= 1.1;
            };
            if (enemy.legs.type === 'Plate-Mail') {
                magicalDamage *= 0.95;
            };
            if (enemy.legs.type === 'Chain-Mail') {
                magicalDamage *= 0.97;
            };
            if (enemy.legs.type === 'Leather-Mail') {
                magicalDamage *= 1.03;
            };
            if (enemy.legs.type === 'Leather-Cloth') {
                magicalDamage *= 1.05;
            };
        };
    };
    if (damageType === 'Slash' || damageType === 'Wind' || damageType === 'Sorcery' || damageType === 'Wild') {
        if (weapon.attack_type === 'Physical') {
            if (enemy.helmet.type === 'Plate-Mail') {
                physicalDamage *= 0.9 + Math.random() * 0.15;
            };
            if (enemy.helmet.type === 'Chain-Mail') {
                physicalDamage *= 0.925 + Math.random() * 0.15;
            };
            if (enemy.helmet.type === 'Leather-Mail') {
                physicalDamage *= 0.95 + Math.random() * 0.15;
            };
            if (enemy.helmet.type === 'Leather-Cloth') {
                physicalDamage *= 0.975 + Math.random() * 0.15;
            };
    
            if (enemy.chest.type === 'Plate-Mail') {
                physicalDamage *= 0.9 + Math.random() * 0.15;
            };
            if (enemy.chest.type === 'Chain-Mail') {
                physicalDamage *= 0.925 + Math.random() * 0.15;
            };
            if (enemy.chest.type === 'Leather-Mail') {
                physicalDamage *= 0.95 + Math.random() * 0.15;
            };
            if (enemy.chest.type === 'Leather-Cloth') {
                physicalDamage *= 0.975 + Math.random() * 0.15;
            };
    
            if (enemy.legs.type === 'Plate-Mail') {
                physicalDamage *= 0.9 + Math.random() * 0.15;
            };
            if (enemy.legs.type === 'Chain-Mail') {
                physicalDamage *= 0.925 + Math.random() * 0.15;
            };
            if (enemy.legs.type === 'Leather-Mail') {
                physicalDamage *= 0.95 + Math.random() * 0.15;
            };
            if (enemy.legs.type === 'Leather-Cloth') {
                physicalDamage *= 0.975 + Math.random() * 0.15;
            };
        };
        if (weapon.attack_type === 'Magic') {
            if (enemy.helmet.type === 'Plate-Mail') {
                magicalDamage *= 0.925 + Math.random() * 0.15;
            };
            if (enemy.helmet.type === 'Chain-Mail') {
                magicalDamage *= 0.925 + Math.random() * 0.15;
            };
            if (enemy.helmet.type === 'Leather-Mail') {
                magicalDamage *= 0.925 + Math.random() * 0.15;
            };
            if (enemy.helmet.type === 'Leather-Cloth') {
                magicalDamage *= 0.925 + Math.random() * 0.15;
            };
            if (enemy.chest.type === 'Plate-Mail') {
                magicalDamage *= 0.925 + Math.random() * 0.15;
            };
            if (enemy.chest.type === 'Chain-Mail') {
                magicalDamage *= 0.925 + Math.random() * 0.15;
            };
            if (enemy.chest.type === 'Leather-Mail') {
                magicalDamage *= 0.925 + Math.random() * 0.15;
            };
            if (enemy.chest.type === 'Leather-Cloth') {
                magicalDamage *= 0.925 + Math.random() * 0.15;
            };
            if (enemy.legs.type === 'Plate-Mail') {
                magicalDamage *= 0.925 + Math.random() * 0.15;
            };
            if (enemy.legs.type === 'Chain-Mail') {
                magicalDamage *= 0.925 + Math.random() * 0.15;
            };
            if (enemy.legs.type === 'Leather-Mail') {
                magicalDamage *= 0.925 + Math.random() * 0.15;
            };
            if (enemy.legs.type === 'Leather-Cloth') {
                magicalDamage *= 0.925 + Math.random() * 0.15;
            };
        };
    };
    return { physicalDamage, magicalDamage };
};

const criticalCompiler = async (player, critChance, critClearance, weapon, physicalDamage, magicalDamage, weather, glancingBlow, criticalSuccess) => {
    if (weather === 'Alluring Isles') critChance -= 10;
    if (weather === 'Astralands') critChance += 10;
    if (weather === 'Kingdom') critChance += 5;
    if (critChance >= critClearance) {
        physicalDamage *= weapon.critical_damage;
        magicalDamage *= weapon.critical_damage;
        criticalSuccess = true;
    };
    if (critClearance > critChance + player.level + 80) {
        physicalDamage *= 0.1;
        magicalDamage *= 0.1;
        glancingBlow = true;
    } else if (critClearance > critChance + player.level + 75) {
        physicalDamage *= 0.15;
        magicalDamage *= 0.15;
        glancingBlow = true;
    } else if (critClearance > critChance + player.level + 70) {
        physicalDamage *= 0.2;
        magicalDamage *= 0.2;
        glancingBlow = true;
    } else if (critClearance > critChance + player.level + 65) {
        physicalDamage *= 0.25;
        magicalDamage *= 0.25;
        glancingBlow = true;
    } else if (critClearance > critChance + player.level + 60) {
        physicalDamage *= 0.3;
        magicalDamage *= 0.3;
        glancingBlow = true;
    } else if (critClearance > critChance + player.level + 55) {
        physicalDamage *= 0.35;
        magicalDamage *= 0.35;
        glancingBlow = true;
    } else if (critClearance > critChance + player.level + 50) {
        physicalDamage *= 0.4;
        magicalDamage *= 0.4;
        glancingBlow = true;
    } else if (critClearance > critChance + player.level + 45) {
        physicalDamage *= 0.45;
        magicalDamage *= 0.45;
        glancingBlow = true;
    } else if (critClearance > critChance + player.level + 40) {
        physicalDamage *= 0.5;
        magicalDamage *= 0.5;
        glancingBlow = true;
    } else if (critClearance > critChance + player.level + 35) {
        physicalDamage *= 0.55;
        magicalDamage *= 0.55;
        glancingBlow = true;
    } else if (critClearance > critChance + player.level + 30) {
        physicalDamage *= 0.6;
        magicalDamage *= 0.6;
        glancingBlow = true;
    } else if (critClearance > critChance + player.level + 25) {
        physicalDamage *= 0.65;
        magicalDamage *= 0.65;
        glancingBlow = true;
    } else if (critClearance > critChance + player.level + 20) {
        physicalDamage *= 0.7;
        magicalDamage *= 0.7;
        glancingBlow = true;
    }
    // else if (critClearance > critChance + 20) {
    //     physicalDamage *= 0.8;
    //     magicalDamage *= 0.8;
    //     glancingBlow = true;
    // } else if (critClearance > critChance + 10) {
    //     physicalDamage *= 0.9;
    //     magicalDamage *= 0.9;
    //     glancingBlow = true;
    // }
    return { criticalSuccess, glancingBlow, physicalDamage, magicalDamage };
}; 

const phaserActionConcerns =  (action) => {
    console.log(action, "Action In Concern");
    if (action === 'attack' || action === 'posture' || action === 'roll') {
        return true;
    };
    return false;
};

const phaserSuccessConcerns = (counterSuccess, rollSuccess, computerCounterSuccess, computerRollSuccess) => {
    console.log(counterSuccess, rollSuccess, computerCounterSuccess, computerRollSuccess, "Success Concerns");
    if (counterSuccess || rollSuccess || computerCounterSuccess || computerRollSuccess) {
        return true;
    };
    return false;
};

const weatherEffectCheck = async (weapon, magDam, physDam, weather, critical) => {
    let magicalDamage = magDam;
    let physicalDamage = physDam;
    switch (weather) {
        case 'Alluring Isles':
            if (weapon.type === 'Bow' || weapon.type === 'Greatbow') {
                physicalDamage *= 1.1;
                magicalDamage *= 1.1;
            };
            break;
        case 'Astralands':
            magicalDamage *= 1.1;
            physicalDamage *= 1.1;
            break;
        case 'Fangs': 
            if (weapon.attack_type === 'Physical') {
                if (weapon.type !== 'Bow' && weapon.type !== 'Greatbow') {
                    physicalDamage *= 1.1; // +10% Physical Melee Damage
                } else {
                    physicalDamage *= 0.9; // -10% Physical Ranged Damage
                };
            } else {
                if (weapon.damage_type === 'Fire' || weapon.damage_type === 'Frost' || weapon.damage_type === 'Earth' || weapon.damage_type === 'Wind' || weapon.damage_type === 'Lightning' || weapon.damage_type === 'Wild') {
                    magicalDamage *= 1.1; // +10% Magical Damage
                };
            };
            if (weapon.influences[0] !== 'Daethos') {
                magicalDamage *= 1.1; // +10% Magical Damage
            };
            break;
        case 'Firelands':
            physicalDamage *= 1.1;
            magicalDamage *= 1.1;
            if (critical) {
                magicalDamage *= 1.25;
                physicalDamage *= 1.25;
            };
            break;
        case 'Kingdom':
            physicalDamage *= 1.1;
            if (weapon.influences[0] !== 'Daethos') {
                magicalDamage *= 1.1;
                physicalDamage *= 1.1;
            };
            break;
        case 'Licivitas':
            if (weapon.influences[0] === 'Daethos') {
                magicalDamage *= 1.15;
                physicalDamage *= 1.15;
            };
            if (critical) {
                magicalDamage *= 1.25;
                physicalDamage *= 1.25;
            };
            break;
        case 'Sedyrus':
            magicalDamage *= 1.1;
            if (weapon.influences[0] !== 'Daethos') {
                magicalDamage *= 1.1;
                physicalDamage *= 1.1;
            };
            if (weapon.type === 'Bow' || weapon.type === 'Greatbow') {
                physicalDamage *= 1.1;
                magicalDamage *= 1.1;
            };
            if (critical) {
                magicalDamage *= 1.1;
                physicalDamage *= 1.1;
            };
            break;
        case 'Soverains':
            magicalDamage *= 1.1;
            if (weapon.influences[0] !== 'Daethos') {
                magicalDamage *= 1.1;
                physicalDamage *= 1.1;
            };
            break;
        default:
            break;
    };
    return { magicalDamage, physicalDamage };
};

const statusEffectCheck = async (combatData) => {
    combatData.playerEffects = combatData.playerEffects.filter(effect => {
        const matchingWeapon = combatData.weapons.find(weapon => weapon.name === effect.weapon);
        const matchingWeaponIndex = combatData.weapons.indexOf(matchingWeapon);
        const matchingDebuffTarget = combatData.computerWeapons.find(weapon => weapon.name === effect.debuffTarget);
        const matchingDebuffTargetIndex = combatData.computerWeapons.indexOf(matchingDebuffTarget);
        if ((effect.tick.end === combatData.combatRound || combatData.playerWin === true || combatData.computerWin === true) && effect.enemyName === combatData.computer.name) { // The Effect Expires, Now checking for Nmae too
            if (effect.prayer === 'Buff') { // Reverses the Buff Effect to the magnitude of the stack to the proper weapon
                for (let key in effect.effect) {
                    if (key in combatData.weapons[matchingWeaponIndex]) {
                        if (key !== 'dodge') {
                            combatData.weapons[matchingWeaponIndex][key] -= effect.effect[key] * effect.activeStacks;
                            combatData.weapons[matchingWeaponIndex][key] = roundToTwoDecimals(combatData.weapons[matchingWeaponIndex][key]);
                        } else {
                            combatData.weapons[matchingWeaponIndex][key] += effect.effect[key] * effect.activeStacks;
                            combatData.weapons[matchingWeaponIndex][key] = roundToTwoDecimals(combatData.weapons[matchingWeaponIndex][key]);
                        };
                    };
                    if (key in combatData.playerDefense) {
                        combatData.playerDefense[key] -= effect.effect[key] * effect.activeStacks;
                        combatData.playerDefense[key] = roundToTwoDecimals(combatData.playerDefense[key]);
                    };
                };
            };
            if (effect.prayer === 'Debuff') { // Revereses the Debuff Effect to the proper weapon
                for (let key in effect.effect) {
                    if (matchingDebuffTargetIndex === -1) return false;
                    if (key in combatData.computerWeapons[matchingDebuffTargetIndex]) {
                        if (key !== 'dodge') {
                            combatData.computerWeapons[matchingDebuffTargetIndex][key] += effect.effect[key] * effect.activeStacks;
                            combatData.computerWeapons[matchingDebuffTargetIndex][key] = roundToTwoDecimals(combatData.computerWeapons[matchingDebuffTargetIndex][key]);
                        } else {
                            combatData.computerWeapons[matchingDebuffTargetIndex][key] -= effect.effect[key] * effect.activeStacks;
                            combatData.computerWeapons[matchingDebuffTargetIndex][key] = roundToTwoDecimals(combatData.computerWeapons[matchingDebuffTargetIndex][key]);
                        };
                    };
                    if (key in combatData.computerDefense) {
                        combatData.computerDefense[key] += effect.effect[key] * effect.activeStacks;
                        combatData.computerDefense[key] = roundToTwoDecimals(combatData.computerDefense[key]);
                    };
                };
            };
            return false;
        } else { // The Effect Persists
            switch (effect.prayer) {
                case 'Buff': { // Buffs are applied on the first tick, and if found via existingEffect proc, they have already been enhanced by the stack.
                    if (effect.activeStacks === 1 && effect.tick.start === combatData.combatRound) {
                        for (let key in effect.effect) {
                            if (effect.effect[key] && key !== 'dodge') {
                                let modifiedValue = effect.effect[key] + combatData.weapons[matchingWeaponIndex][key];
                                modifiedValue = roundToTwoDecimals(modifiedValue);
                                combatData.weapons[matchingWeaponIndex][key] = modifiedValue;
                            } else {
                                let modifiedValue = combatData.weapons[matchingWeaponIndex][key] - effect.effect[key];
                                modifiedValue = roundToTwoDecimals(modifiedValue);
                                combatData.weapons[matchingWeaponIndex][key] = modifiedValue;
                            };
                        };
                        for (let key in combatData.playerDefense) {
                            if (effect.effect[key]) {
                                let modifiedValue = effect.effect[key] + combatData.playerDefense[key];
                                modifiedValue = roundToTwoDecimals(modifiedValue);
                                combatData.playerDefense[key] = modifiedValue;
                            };
                        };
                    };
                    break;
                };
                case 'Debuff': { // Debuffs are applied on the first tick, so they don't need to be reapplied every tick. Refreshes, Not Stackable. Will test for Balance
                    if (effect.activeRefreshes === 0 && effect.tick.start === combatData.combatRound) {
                        effect.debuffTarget = combatData.computerWeapons[0].name;
                        for (let key in effect.effect) {
                            if (effect.effect[key] && key !== 'dodge') {
                                // combatData.computerWeapons[0][key] -= effect.effect[key];
                                let modifiedValue = combatData.computerWeapons[0][key] - effect.effect[key];
                                modifiedValue = roundToTwoDecimals(modifiedValue);
                                combatData.computerWeapons[0][key] = modifiedValue;
                            } else {
                                // combatData.computerWeapons[0][key] += effect.effect[key];
                                let modifiedValue = effect.effect[key] + combatData.computerWeapons[0][key];
                                modifiedValue = roundToTwoDecimals(modifiedValue);
                                combatData.computerWeapons[0][key] = modifiedValue;
                            };
                        };
                        for (let key in combatData.computerDefense) { // Buff
                            if (effect.effect[key]) {
                                // combatData.computerDefense[key] -= effect.effect[key];
                                let modifiedValue = combatData.computerDefense[key] - effect.effect[key];
                                modifiedValue = roundToTwoDecimals(modifiedValue);
                                combatData.computerDefense[key] = modifiedValue;
                            };
                        };
                    };
                    break;
                };
                case 'Damage': { // Damage Ticks, 33% of the Damage/Tick (Round), Can Stack and experience the enhanced damage if procced this round, Testing if Stacking is Balanced
                    combatData.newComputerHealth -= effect.effect.damage * 0.33;
                    combatData.currentComputerHealth -= effect.effect.damage * 0.33;

                    if (combatData.currentComputerHealth < 0 || combatData.newComputerHealth < 0) {
                        combatData.newComputerHealth = 0;
                        combatData.currentComputerHealth = 0;
                        combatData.computerWin = false;
                        combatData.playerWin = true;
                    };
                    break;
                };
                case 'Heal': { // Heal Ticks, 33% of the Heal/Tick (Round), Can Refresh, Testing if Stacking is Balanced
                    combatData.newPlayerHealth += effect.effect.healing * 0.33;
                    combatData.currentPlayerHealth += effect.effect.healing * 0.33;

                    if (combatData.currentPlayerHealth > 0 || combatData.newPlayerHealth > 0) {
                        combatData.computerWin = false;
                    };
                    break;
                };

            };
            return true;
        };
    });

    combatData.computerEffects = combatData.computerEffects.filter(effect => {
        const matchingWeapon = combatData.computerWeapons.find(weapon => weapon.name === effect.weapon);
        const matchingWeaponIndex = combatData.computerWeapons.indexOf(matchingWeapon);
        const matchingDebuffTarget = combatData.weapons.find(weapon => weapon.name === effect.debuffTarget);
        const matchingDebuffTargetIndex = combatData.weapons.indexOf(matchingDebuffTarget);
        if (effect.tick.end === combatData.combatRound || combatData.playerWin === true || combatData.computerWin === true) { // The Effect Expires
            if (effect.prayer === 'Buff') { // Reverses the Buff Effect to the magnitude of the stack to the proper weapon
                for (let key in effect.effect) {
                    if (effect.effect[key] && key !== 'dodge') {
                        combatData.computerWeapons[matchingWeaponIndex][key] -= effect.effect[key] * effect.activeStacks;
                        combatData.computerWeapons[matchingWeaponIndex][key] = roundToTwoDecimals(combatData.computerWeapons[matchingWeaponIndex][key]);
                    } else {
                        combatData.computerWeapons[matchingWeaponIndex][key] += effect.effect[key] * effect.activeStacks;
                        combatData.computerWeapons[matchingWeaponIndex][key] = roundToTwoDecimals(combatData.computerWeapons[matchingWeaponIndex][key]);
                    };
                };
                for (let key in combatData.computerDefense) {
                    if (effect.effect[key]) {
                        combatData.computerDefense[key] -= effect.effect[key] * effect.activeStacks;
                        combatData.computerDefense[key] = roundToTwoDecimals(combatData.computerDefense[key]);
                    };
                };
            };
            if (effect.prayer === 'Debuff') { // Revereses the Debuff Effect to the proper weapon
                for (let key in effect.effect) {
                    if (effect.effect[key] && key !== 'dodge') {
                        combatData.weapons[matchingDebuffTargetIndex][key] += effect.effect[key];
                        combatData.weapons[matchingDebuffTargetIndex][key] = roundToTwoDecimals(combatData.weapons[matchingDebuffTargetIndex][key]);
                    } else {
                        combatData.weapons[matchingDebuffTargetIndex][key] -= effect.effect[key];
                        combatData.weapons[matchingDebuffTargetIndex][key] = roundToTwoDecimals(combatData.weapons[matchingDebuffTargetIndex][key]);
                    };
                };
                for (let key in combatData.playerDefense) {
                    if (effect.effect[key]) {
                        combatData.playerDefense[key] += effect.effect[key];
                        combatData.playerDefense[key] = roundToTwoDecimals(combatData.playerDefense[key]);
                    };
                };
            };
            return false;
        } else { // The Effect Persists
            switch (effect.prayer) {
                case 'Buff': { // Buffs are applied
                    if (effect.activeStacks === 1 && effect.tick.start === combatData.combatRound) {
                        for (let key in effect.effect) {
                            if (effect.effect[key] && key !== 'dodge') { 
                                let modifiedValue = effect.effect[key] + combatData.computerWeapons[matchingWeaponIndex][key];
                                modifiedValue = roundToTwoDecimals(modifiedValue);
                                combatData.computerWeapons[matchingWeaponIndex][key] = modifiedValue;
                            } else {
                                let modifiedValue = effect.effect[key] - combatData.computerWeapons[matchingWeaponIndex][key];
                                modifiedValue = roundToTwoDecimals(modifiedValue);
                                combatData.computerWeapons[matchingWeaponIndex][key] = modifiedValue;
                            };
                        };
                        for (let key in combatData.computerDefense) {
                            let modifiedValue = effect.effect[key] + combatData.computerDefense[key];
                            modifiedValue = roundToTwoDecimals(modifiedValue);
                            combatData.computerDefense[key] = modifiedValue;
                        };
                    };
                    break;
                };
                case 'Debuff': { // Debuffs are applied on the first tick, so they don't need to be reapplied every tick. Refreshes, Not Stackable. Will test for Balance
                    if (effect.activeRefreshes === 0 && effect.tick.start === combatData.combatRound) {
                        effect.debuffTarget = combatData.weapons[0].name;
                        for (let key in effect.effect) {
                            if (effect.effect[key] && key !== 'dodge') {
                                let modifiedValue = combatData.weapons[0][key] - effect.effect[key];
                                modifiedValue = roundToTwoDecimals(modifiedValue);
                                combatData.weapons[0][key] = modifiedValue;
                            } else {
                                let modifiedValue = effect.effect[key] + combatData.weapons[0][key];
                                modifiedValue = roundToTwoDecimals(modifiedValue);
                                combatData.weapons[0][key] = modifiedValue;
                            };
                        };
                        for (let key in combatData.playerDefense) { // Buff
                            if (effect.effect[key]) {
                                let modifiedValue = combatData.playerDefense[key] - effect.effect[key];
                                modifiedValue = roundToTwoDecimals(modifiedValue);
                                combatData.playerDefense[key] = modifiedValue;
                            };
                        };
                    };
                    break;
                };
                case 'Damage': { // Damage Ticks, 33% of the Damage/Tick (Round), Can Stack and experience the enhanced damage if procced this round, Testing if Stacking is Balanced
                    combatData.newPlayerHealth -= effect.effect.damage * 0.33;
                    combatData.currentPlayerHealth -= effect.effect.damage * 0.33;
                    if (combatData.currentPlayerHealth < 0 || combatData.newPlayerHealth < 0) {
                        combatData.newPlayerHealth = 0;
                        combatData.currentPlayerHealth = 0;
                        combatData.playerWin = false;
                        combatData.computerWin = true;
                    };
                    break;
                };
                case 'Heal': { // Heal Ticks, 33% of the Heal/Tick (Round), Can Refresh, Testing if Stacking is Balanced
                    combatData.newComputerHealth += effect.effect.healing * 0.33;
                    combatData.currentComputerHealth += effect.effect.healing * 0.33;
                    if (combatData.currentComputerHealth > 0 || combatData.newComputerHealth > 0) {
                        combatData.playerWin = false;
                    };
                    break;
                };
            };
        };
        return true;
    });

    if (combatData.newPlayerHealth > 0) {
        combatData.computerWin = false;
    };
    if (combatData.newComputerHealth > 0) {
        combatData.playerWin = false;
    };
    return combatData;
};

const faithModCompiler = async (player, faithOne, weaponOne, faithTwo, weaponTwo, amuletInfluence, trinketInfluence) => {
    if (player.faith === 'devoted' && weaponOne.influences[0] === 'Daethos') faithOne += 5;
    if (player.faith === 'adherent' && weaponOne.influences[0] !== 'Daethos') faithOne += 5;
    if (player.faith === 'devoted' && weaponTwo.influences[0] === 'Daethos') faithTwo += 5;
    if (player.faith === 'adherent' && weaponTwo.influences[0] !== 'Daethos') faithTwo += 5;
    
    const addRarity = async (rarity, faith) => {
        switch (rarity) {
            case 'Common': {
                faith += 1;
                break;
            };
            case 'Uncommon': {
                faith += 2;
                break;
            };
            case 'Rare': {
                faith += 3;
                break;
            };
            case 'Epic': {
                faith += 5;
                break;
            };
            case 'Legendary': {
                faith += 10;
            };
            default: {
                faith += 0;
                break;
            };
        };
        return faith;
    };

    faithOne = await addRarity(weaponOne.rarity, faithOne);
    faithTwo = await addRarity(weaponTwo.rarity, faithTwo); 
    if (weaponOne.influences[0] === amuletInfluence) {
        faithOne = await addRarity(player.amulet.rarity, faithOne); 
    };
    if (weaponTwo.influences[0] === amuletInfluence) {
        faithTwo = await addRarity(player.amulet.rarity, faithTwo); 
    }; 
    if (weaponOne.influences[0] === trinketInfluence) {
        faithOne = await addRarity(player.trinket.rarity, faithOne); 
    };
    if (weaponTwo.influences[0] === trinketInfluence) {
        faithTwo = await addRarity(player.trinket.rarity, faithTwo); 
    };
    return { faithOne, faithTwo };
};

const faithFinder = async (combatData) => { // The influence will add a chance to have a special effect occur
    if (combatData.playerWin === true || combatData.computerWin === true || combatData.playerBlessing === '') return;
    
    let faithNumber = Math.floor(Math.random() * 101);
    let faithNumberTwo = Math.floor(Math.random() * 101); 
    let computerFaithNumber = Math.floor(Math.random() * 101);
    let computerFaithNumberTwo = Math.floor(Math.random() * 101);

    combatData.weapons[0].critical_chance = Number(combatData.weapons[0].critical_chance);
    combatData.weapons[0].critical_damage = Number(combatData.weapons[0].critical_damage);

    combatData.weapons[1].critical_chance = Number(combatData.weapons[1].critical_chance);
    combatData.weapons[1].critical_damage = Number(combatData.weapons[1].critical_damage);

    combatData.computerWeapons[0].critical_chance = Number(combatData.computerWeapons[0].critical_chance);
    combatData.computerWeapons[0].critical_damage = Number(combatData.computerWeapons[0].critical_damage);

    combatData.computerWeapons[1].critical_chance = Number(combatData.computerWeapons[1].critical_chance);
    combatData.computerWeapons[1].critical_damage = Number(combatData.computerWeapons[1].critical_damage);

    const playerFaith = await faithModCompiler(combatData.player, faithNumber, combatData.weapons[0], faithNumberTwo, combatData.weapons[1], combatData.player.amulet.influences[0], combatData.player.trinket.influences[0]);
    faithNumber = playerFaith.faithOne;
    faithNumberTwo = playerFaith.faithTwo;

    const computerFaith = await faithModCompiler(combatData.computer, computerFaithNumber, combatData.computerWeapons[0], computerFaithNumberTwo, combatData.computerWeapons[1], combatData.computer.amulet.influences[0], combatData.computer.trinket.influences[0]);
    computerFaithNumber = computerFaith.faithOne;
    computerFaithNumberTwo = computerFaith.faithTwo;

    if (faithNumber > 90) { 
        combatData.actionData.push('prayer');
        combatData.prayerData.push(combatData.playerBlessing);
        combatData.deityData.push(combatData.weapons[0].influences[0]);
        combatData.religiousSuccess = true;
        let existingEffect = combatData.playerEffects.find(effect => effect.name === `Gift of ${combatData.weapons[0].influences[0]}` && effect.prayer === combatData.playerBlessing);   
        if (!existingEffect) {
            existingEffect = new StatusEffect(combatData, combatData.player, combatData.computer, combatData.weapons[0], combatData.playerAttributes, combatData.playerBlessing);
            combatData.playerEffects.push(existingEffect);
            if (existingEffect.prayer === 'Dispel') {
                if (combatData.computerEffects.length > 0) await computerDispel(combatData); 
                combatData.playerEffects.pop();
            };
            combatData.playerInfluenceDescription = existingEffect.description;
        } else if (existingEffect.stacks) { // If the effect already exists and it stacks, update the endTick and intensity, for Damage and Buffs
            existingEffect.tick.end += 2;
            existingEffect.endTime += 6;
            existingEffect.activeStacks += 1;
            existingEffect.effect = StatusEffect.updateEffectStack(existingEffect, combatData, combatData.player, combatData.weapons[0], combatData.playerAttributes, combatData.playerBlessing);
            combatData.playerInfluenceDescription = `${existingEffect.description} Stacked ${existingEffect.activeStacks} times.`;
            switch (existingEffect.prayer) {
                case 'Buff': {
                    for (let key in existingEffect.effect) {
                        if (existingEffect.effect[key] && key !== 'dodge') {
                            let modifiedValue = existingEffect.effect[key] + combatData.weapons[0][key];
                            modifiedValue = roundToTwoDecimals(modifiedValue);
                            combatData.weapons[0][key] = modifiedValue;
                        } else {
                            let modifiedValue = existingEffect.effect[key] - combatData.weapons[0][key];
                            modifiedValue = roundToTwoDecimals(modifiedValue);
                            combatData.weapons[0][key] = modifiedValue;
                        };
                    };
                    for (let key in combatData.playerDefense) {
                        if (existingEffect.effect[key]) {
                            let modifiedValue = existingEffect.effect[key] + combatData.playerDefense[key];
                            modifiedValue = roundToTwoDecimals(modifiedValue);
                            combatData.playerDefense[key] = modifiedValue;
                        };
                    };
                    break;
                };
                case 'Damage': {
                    existingEffect.effect.damage = Math.round(existingEffect.effect.damage * existingEffect.activeStacks);
                    break;
                };
            };
        } else if (existingEffect.refreshes) {
            existingEffect.duration = Math.floor(combatData.player.level / 3 + 1) > 6 ? 6 : Math.floor(combatData.player.level / 3 + 1);
            existingEffect.tick.end += existingEffect.duration + 1;
            existingEffect.endTime += (existingEffect.duration + 1) * 3;
            existingEffect.activeRefreshes += 1;
            combatData.playerInfluenceDescription = `${existingEffect.description} Refreshed ${existingEffect.activeRefreshes} time(s) for ${existingEffect.duration + 1} round(s).`;
        };
    };
    if (combatData.dualWielding === true) {
        if (faithNumberTwo > 90) { 
            combatData.actionData.push('prayer');
            combatData.prayerData.push(combatData.playerBlessing);
            combatData.deityData.push(combatData.weapons[1].influences[0]);
            combatData.religiousSuccess = true;
            let existingEffect = combatData.playerEffects.find(effect => effect.name === `Gift of ${combatData.weapons[1].influences[0]}` && effect.prayer === combatData.playerBlessing);   
            if (!existingEffect) {
                existingEffect = new StatusEffect(combatData, combatData.player, combatData.computer, combatData.weapons[1], combatData.playerAttributes, combatData.playerBlessing);
                combatData.playerEffects.push(existingEffect);
                if (existingEffect.prayer === 'Dispel') {
                    if (combatData.computerEffects.length > 0) await computerDispel(combatData); 
                    combatData.playerEffects.pop();
                };
                combatData.playerInfluenceDescriptionTwo = existingEffect.description;
            } else if (existingEffect.stacks) { // If the effect already exists and it stacks, update the endTick and intensity, for Damage and Buffs
                existingEffect.tick.end += 2;
                existingEffect.endTime += 6;
                existingEffect.activeStacks += 1;
                existingEffect.effect = StatusEffect.updateEffectStack(existingEffect, combatData, combatData.player, combatData.weapons[1], combatData.playerAttributes, combatData.playerBlessing);
                combatData.playerInfluenceDescriptionTwo = `${existingEffect.description} Stacked ${existingEffect.activeStacks} times.`;
                switch (existingEffect.prayer) {
                    case 'Buff': {
                        for (let key in existingEffect.effect) {
                            if (existingEffect.effect[key] && key !== 'dodge') {
                                let modifiedValue = existingEffect.effect[key] + combatData.weapons[1][key];
                                modifiedValue = roundToTwoDecimals(modifiedValue);
                                combatData.weapons[1][key] = modifiedValue;
                            } else {
                                let modifiedValue = existingEffect.effect[key] - combatData.weapons[1][key];
                                modifiedValue = roundToTwoDecimals(modifiedValue);
                                combatData.weapons[1][key] = modifiedValue;
                            };
                        };
                        for (let key in combatData.playerDefense) {
                            if (existingEffect.effect[key]) {
                                let modifiedValue = existingEffect.effect[key] + combatData.playerDefense[key];
                                modifiedValue = roundToTwoDecimals(modifiedValue);
                                combatData.playerDefense[key] = modifiedValue;
                            };
                        };
                        break;
                    };
                    case 'Damage': {
                        existingEffect.effect.damage = Math.round(existingEffect.effect.damage * existingEffect.activeStacks);
                        break;
                    };
                };
            } else if (existingEffect.refreshes) {
                existingEffect.duration = Math.floor(combatData.player.level / 3 + 1) > 6 ? 6 : Math.floor(combatData.player.level / 3 + 1);
                existingEffect.tick.end += existingEffect.duration + 1;
                existingEffect.endTime += (existingEffect.duration + 1) * 3;
                existingEffect.activeRefreshes += 1;
                combatData.playerInfluenceDescriptionTwo = `${existingEffect.description} Refreshed ${existingEffect.activeRefreshes} time(s) for ${existingEffect.duration + 1} round(s).`;
            };
        };
    };

    if (!combatData.playerEffects.find(effect => effect.prayer === 'Silence')) {
        if (computerFaithNumber > 90) {
            combatData.computerReligiousSuccess = true;
            let existingEffect = combatData.computerEffects.find(effect => effect.name === `Gift of ${combatData.computerWeapons[0].influences[0]}` && effect.prayer === combatData.computerBlessing);   
            if (!existingEffect) {
                existingEffect = new StatusEffect(combatData, combatData.computer, combatData.player, combatData.computerWeapons[0], combatData.computerAttributes, combatData.computerBlessing);
                combatData.computerEffects.push(existingEffect);
                combatData.computerInfluenceDescription = existingEffect.description;
            } else if (existingEffect.stacks) { // If the effect already exists and it stacks, update the endTick and intensity, for Damage and Buffs
                existingEffect.tick.end += 2;
                existingEffect.endTime += 6;
                existingEffect.activeStacks += 1;
                existingEffect.effect = StatusEffect.updateEffectStack(existingEffect, combatData, combatData.computer, combatData.computerWeapons[0], combatData.computerAttributes, combatData.computerBlessing);
                combatData.computerInfluenceDescription = `${existingEffect.description} Stacked ${existingEffect.activeStacks} times.`;
                switch (existingEffect.prayer) {
                    case 'Buff': {
                        for (let key in existingEffect.effect) {
                            if (existingEffect.effect[key] && key !== 'dodge') {
                                let modifiedValue = existingEffect.effect[key] + combatData.computerWeapons[0][key];
                                modifiedValue = roundToTwoDecimals(modifiedValue);
                                combatData.computerWeapons[0][key] = modifiedValue;
                            } else {
                                let modifiedValue = existingEffect.effect[key] - combatData.computerWeapons[0][key];
                                modifiedValue = roundToTwoDecimals(modifiedValue);
                                combatData.computerWeapons[0][key] = modifiedValue;
                            };
                        };
                        for (let key in combatData.computerDefense) {
                            if (existingEffect.effect[key]) {
                                let modifiedValue = existingEffect.effect[key] + combatData.computerDefense[key];
                                modifiedValue = roundToTwoDecimals(modifiedValue);
                                combatData.computerDefense[key] = modifiedValue;
                            };
                        };
                        break;
                    };
                    case 'Damage': {
                        existingEffect.effect.damage = Math.round(existingEffect.effect.damage * existingEffect.activeStacks);
                        break;
                    };
                };
            } else if (existingEffect.refreshes) {
                existingEffect.duration = Math.floor(combatData.computer.level / 3 + 1) > 6 ? 6 : Math.floor(combatData.computer.level / 3 + 1);
                existingEffect.tick.end += existingEffect.duration + 1;
                existingEffect.endTime += (existingEffect.duration + 1) * 3;
                existingEffect.activeRefreshes += 1;
                combatData.computerInfluenceDescription = `${existingEffect.description} Refreshed ${existingEffect.activeRefreshes} time(s) for ${existingEffect.duration + 1} round(s).`;
            };    
        };
        if (combatData.computerDualWielding === true) {
            if (computerFaithNumberTwo > 90) {
                combatData.computerReligiousSuccess = true;
                let existingEffect = combatData.computerEffects.find(effect => effect.name === `Gift of ${combatData.computerWeapons[1].influences[0]}` && effect.prayer === combatData.computerBlessing);   
                if (!existingEffect) {
                    existingEffect = new StatusEffect(combatData, combatData.computer, combatData.player, combatData.computerWeapons[1], combatData.computerAttributes, combatData.computerBlessing);
                    combatData.computerEffects.push(existingEffect);
                    combatData.computerInfluenceDescriptionTwo = existingEffect.description;
                } else if (existingEffect.stacks) { // If the effect already exists and it stacks, update the endTick and intensity, for Damage and Buffs
                    existingEffect.tick.end += 2;
                    existingEffect.endTime += 6;
                    existingEffect.activeStacks += 1;
                    existingEffect.effect = StatusEffect.updateEffectStack(existingEffect, combatData, combatData.computer, combatData.computerWeapons[1], combatData.computerAttributes, combatData.computerBlessing);
                    combatData.computerInfluenceDescriptionTwo = `${existingEffect.description} Stacked ${existingEffect.activeStacks} times.`;
                    switch (existingEffect.prayer) {
                        case 'Buff': {
                            for (let key in existingEffect.effect) {
                                if (existingEffect.effect[key] && key !== 'dodge') {
                                    let modifiedValue = existingEffect.effect[key] + combatData.computerWeapons[1][key];
                                    modifiedValue = roundToTwoDecimals(modifiedValue);
                                    combatData.computerWeapons[1][key] = modifiedValue;
                                } else {
                                    let modifiedValue = existingEffect.effect[key] - combatData.computerWeapons[1][key];
                                    modifiedValue = roundToTwoDecimals(modifiedValue);
                                    combatData.computerWeapons[1][key] = modifiedValue;
                                };
                            };
                            for (let key in combatData.computerDefense) {
                                if (existingEffect.effect[key]) {
                                    let modifiedValue = existingEffect.effect[key] + combatData.computerDefense[key];
                                    modifiedValue = roundToTwoDecimals(modifiedValue);
                                    combatData.computerDefense[key] = modifiedValue;
                                };
                            };
                            break;
                        };
                        case 'Damage': {
                            existingEffect.effect.damage = Math.round(existingEffect.effect.damage * existingEffect.activeStacks);
                            break;
                        };
                    };
                } else if (existingEffect.refreshes) {
                    existingEffect.duration = Math.floor(combatData.computer.level / 3 + 1) > 6 ? 6 : Math.floor(combatData.computer.level / 3 + 1);
                    existingEffect.tick.end += existingEffect.duration + 1;
                    existingEffect.endTime += (existingEffect.duration + 1) * 3;
                    existingEffect.activeRefreshes += 1;
                    combatData.computerInfluenceDescriptionTwo = `${existingEffect.description} Refreshed ${existingEffect.activeRefreshes} time(s) for ${existingEffect.duration + 1} round(s).`;
                };    
            };
        };
    };

    return combatData;
};

// ================================= COMPUTER COMPILER FUNCTIONS ================================== \\

const computerActionCompiler = async (newData, playerAction, computerAction, computerCounter) => {
    if (newData.sessionRound > 50) {
        newData.sessionRound = 0;
        newData.attackWeight = 0;
        newData.counterWeight = 0;
        newData.dodgeWeight = 0;
        newData.postureWeight = 0;
        newData.rollWeight = 0;
        newData.counterAttackWeight = 0;
        newData.counterCounterWeight = 0;
        newData.counterDodgeWeight = 0;
        newData.counterPostureWeight = 0;
        newData.counterRollWeight = 0;
    };
    
    const computerActions = {
        attack: 50 + newData.attackWeight,
        counter: 10 + newData.counterWeight,
        dodge: 10 + newData.dodgeWeight,
        posture: 15 + newData.postureWeight,
        roll: 15 + newData.rollWeight,
        counterAttack: 20 + newData.counterAttackWeight,
        counterCounter: 20 + newData.counterCounterWeight,
        counterDodge: 20 + newData.counterDodgeWeight,
        counterPosture: 20 + newData.counterPostureWeight,
        counterRoll: 20 + newData.counterRollWeight,
        rollRating: newData.computerWeapons[0].roll,
        armorRating: (newData.computerDefense.physicalPosture + newData.computerDefense.magicalPosture)  /  4,
    };

    if (playerAction === 'attack') { 
        if (computerActions.rollRating > computerActions.armorRating) {
            newData.rollWeight += 1.5;
            newData.postureWeight += 0.5;
        } else {
            newData.postureWeight += 1.5;
            newData.rollWeight += 0.5;
        };
        // newData.rollWeight += 1;
        // newData.postureWeight += 1;
        newData.counterWeight += 1;
        newData.attackWeight -= 3;
        newData.counterAttackWeight += 4;
        newData.counterCounterWeight -= 1;
        newData.counterDodgeWeight -= 1;
        newData.counterPostureWeight -= 1;
        newData.counterRollWeight -= 1;
    };
    if (playerAction === 'counter') { 
        newData.counterWeight += 3;
        // newData.dodgeWeight += 2;
        newData.attackWeight -= 1;
        newData.postureWeight -= 1;
        newData.rollWeight -= 1;
        newData.counterCounterWeight += 2;
        newData.counterAttackWeight -= 1;
        newData.counterDodgeWeight -= 1;
    };
    if (playerAction === 'dodge') { 
        // newData.counterWeight += 2;
        // newData.dodgeWeight -= 2;
        newData.counterDodgeWeight += 4;
        newData.counterAttackWeight -= 1;
        newData.counterCounterWeight -= 1;
        newData.counterPostureWeight -= 1;
        newData.counterRollWeight -= 1;
    };
    if (playerAction === 'posture') { 
        newData.attackWeight += 2;  
        newData.postureWeight -= 3;
        newData.counterWeight += 1;
        newData.counterPostureWeight += 3;
        newData.counterRollWeight -= 2;
        newData.counterAttackWeight -= 1;
    };

    if (playerAction === 'roll') { 
        newData.attackWeight += 2;  
        newData.rollWeight -= 3;
        newData.counterWeight += 1;
        newData.counterRollWeight += 3;
        newData.counterPostureWeight -= 2;
        newData.counterAttackWeight -= 1;
    };

    if (newData.phaser) return newData;

    let actionNumber = Math.floor(Math.random() * 101);
    if (actionNumber > (100 - computerActions.attack)) {
        computerAction = 'attack';
    } else if (actionNumber > (100 - computerActions.attack - computerActions.counter)) {
        computerAction = 'counter';
    } else if (actionNumber > (100 - computerActions.attack - computerActions.counter - computerActions.dodge)) {
        computerAction = 'dodge';
    } else if (actionNumber > (100 - computerActions.attack - computerActions.counter - computerActions.dodge - computerActions.posture)) {
        computerAction = 'posture';
    } else {
        computerAction = 'roll';
    };

    if (computerAction === 'counter') {
        let counterNumber = Math.floor(Math.random() * 101);
        if (counterNumber > (100 - computerActions.counterAttack)) {
            computerCounter = 'attack';
        } else if (counterNumber > (100 - computerActions.counterAttack - computerActions.counterCounter)) {
            computerCounter = 'counter';
        } else if (counterNumber > (100 - computerActions.counterAttack - computerActions.counterCounter - computerActions.counterDodge)) {
            computerCounter = 'dodge';
        } else if (counterNumber > (100 - computerActions.counterAttack - computerActions.counterCounter - computerActions.counterDodge - computerActions.counterPosture)) {
            computerCounter = 'posture';
        } else {
            computerCounter = 'roll';
        };
        newData.counterWeight -= 3;
        newData.attackWeight += 1;  
        newData.postureWeight += 1;
        newData.rollWeight += 1;
    };
    newData.computerAction = computerAction;
    newData.computerCounterGuess = computerCounter;
    return newData;
};

const computerDualWieldCompiler = async (combatData, playerPhysicalDefenseMultiplier, playerMagicalDefenseMultiplier) => { // Triggers if 40+ Str/Caer for 2h, 1h + Agi/Achre Mastery and 2nd weapon is 1h
    const computer = combatData.computer;
    const weapons = combatData.computerWeapons;

    let computerWeaponOnePhysicalDamage = weapons[0].physical_damage;
    let computerWeaponOneMagicalDamage = weapons[0].magical_damage;
    let computerWeaponTwoOhysicalDamage = weapons[1].physical_damage;
    let computerWeaponTwoMagicalDamage = weapons[1].magical_damage;
    let computerWeaponOneTotalDamage;
    let computerWeaponTwoTotalDamage;
    let firstWeaponCrit = false;
    let secondWeaponCrit = false;

    const weapOneClearance = Math.floor(Math.random() * 101);
    const weapTwoClearance = Math.floor(Math.random() * 101);
    let weapOneCrit = combatData.computerWeapons[0].critical_chance;
    let weapTwoCrit = combatData.computerWeapons[1].critical_chance;
    weapOneCrit -= combatData.playerAttributes.kyosirMod;
    weapTwoCrit -= combatData.playerAttributes.kyosirMod;
    const resultOne = await criticalCompiler(combatData.computer, weapOneCrit, weapOneClearance, combatData.computerWeapons[0], computerWeaponOnePhysicalDamage, computerWeaponOneMagicalDamage, combatData.weather, combatData.computerGlancingBlow, combatData.computerCriticalSuccess);
    combatData.computerGlancingBlow = resultOne.glancingBlow;
    combatData.computerCriticalSuccess = resultOne.criticalSuccess;
    computerWeaponOnePhysicalDamage = resultOne.physicalDamage;
    computerWeaponOneMagicalDamage = resultOne.magicalDamage;
    if (weapOneCrit >= weapOneClearance) {
        firstWeaponCrit = true;
    };
    const resultTwo = await criticalCompiler(combatData.computer, weapTwoCrit, weapTwoClearance, combatData.computerWeapons[1], computerWeaponTwoOhysicalDamage, computerWeaponTwoMagicalDamage, combatData.weather, combatData.computerGlancingBlow, combatData.computerCriticalSuccess);
    combatData.computerGlancingBlow = resultTwo.glancingBlow;
    combatData.computerCriticalSuccess = resultTwo.criticalSuccess;
    computerWeaponTwoOhysicalDamage = resultTwo.physicalDamage;
    computerWeaponTwoMagicalDamage = resultTwo.magicalDamage;
    if (weapTwoCrit >= weapTwoClearance) {
        secondWeaponCrit = true;
    };
    
    computerWeaponOnePhysicalDamage *= 1 - ((1 - playerPhysicalDefenseMultiplier) * (1 - (weapons[0].physical_penetration / 100 )));
    computerWeaponOneMagicalDamage *= 1 - ((1 - playerMagicalDefenseMultiplier) * (1 - (weapons[0].magical_penetration  / 100 )));

    computerWeaponTwoOhysicalDamage *= 1 - ((1 - playerPhysicalDefenseMultiplier) * (1 - (weapons[1].physical_penetration / 100 )));
    computerWeaponTwoMagicalDamage *= 1 - ((1 - playerMagicalDefenseMultiplier) * (1 - (weapons[1].magical_penetration / 100 )));

    const damageType = await damageTypeCompiler(combatData.computerDamageType, combatData.player, weapons[0], computerWeaponOnePhysicalDamage, computerWeaponOneMagicalDamage);
    computerWeaponOnePhysicalDamage = damageType.physicalDamage;
    computerWeaponOneMagicalDamage = damageType.magicalDamage;

    const damageTypeTwo = await damageTypeCompiler(combatData.computerDamageType, combatData.player, weapons[1], computerWeaponTwoOhysicalDamage, computerWeaponTwoMagicalDamage);
    computerWeaponTwoOhysicalDamage = damageTypeTwo.physicalDamage;
    computerWeaponTwoMagicalDamage = damageTypeTwo.magicalDamage;

    // =============== WEATHER EFFECTS ================ \\
    const weatherResult = await weatherEffectCheck(weapons[0], computerWeaponOneMagicalDamage, computerWeaponOnePhysicalDamage, combatData.weather, firstWeaponCrit);
    computerWeaponOnePhysicalDamage = weatherResult.physicalDamage;
    computerWeaponOneMagicalDamage = weatherResult.magicalDamage;

    const weatherResultTwo = await weatherEffectCheck(weapons[1], computerWeaponTwoMagicalDamage, computerWeaponTwoOhysicalDamage, combatData.weather, secondWeaponCrit);
    computerWeaponTwoOhysicalDamage = weatherResultTwo.physicalDamage;
    computerWeaponTwoMagicalDamage = weatherResultTwo.magicalDamage;
    // =============== WEATHER EFFECTS ================ \\

    computerWeaponOneTotalDamage = computerWeaponOnePhysicalDamage + computerWeaponOneMagicalDamage;
    computerWeaponTwoTotalDamage = computerWeaponTwoOhysicalDamage + computerWeaponTwoMagicalDamage;

    combatData.realizedComputerDamage = computerWeaponOneTotalDamage + computerWeaponTwoTotalDamage;
    if (combatData.realizedComputerDamage < 0) {
        combatData.realizedComputerDamage = 0;
    };

    let strength = combatData.computerAttributes.totalStrength + combatData.computerWeapons[0].strength  + combatData.computerWeapons[1].strength;
    let agility = combatData.computerAttributes.totalAgility + combatData.computerWeapons[0].agility  + combatData.computerWeapons[1].agility;
    let achre = combatData.computerAttributes.totalAchre + combatData.computerWeapons[0].achre  + combatData.computerWeapons[1].achre;
    let caeren = combatData.computerAttributes.totalCaeren + combatData.computerWeapons[0].caeren  + combatData.computerWeapons[1].caeren;

    if (combatData.computerWeapons[0].grip === 'One Hand') {
        if (combatData.computerWeapons[0].attack_type === 'Physical') {
            combatData.realizedComputerDamage *= (agility / 100)
        } else {
            combatData.realizedComputerDamage *= (achre / 100)
        };
    };

    if (combatData.computerWeapons[0].grip === 'Two Hand') {
        if (combatData.computerWeapons[0].attack_type === 'Physical') {
            combatData.realizedComputerDamage *= (strength / 150) 
        } else {
            combatData.realizedComputerDamage *= (caeren / 150)
        };
    };

    if (combatData.action === 'attack') {
        combatData.realizedComputerDamage *= 1.1;
    };
    if (combatData.action === 'posture') {
        combatData.realizedComputerDamage *= 0.95;
    };
    if (combatData.prayerData.includes('Avarice')) {
        combatData.realizedComputerDamage *= 1.1;
    };
    // ================== PHASER EFFECTS ================== \\
    if (combatData.isStalwart) {
        combatData.realizedComputerDamage *= 0.85;
    };
    if (combatData.isCaerenic) {
        combatData.realizedComputerDamage *= 1.25;
    };

    combatData.newPlayerHealth = combatData.currentPlayerHealth - combatData.realizedComputerDamage;
    combatData.currentPlayerHealth = combatData.newPlayerHealth; // Added to persist health totals?

    if (combatData.newPlayerHealth < 0 || combatData.currentPlayerHealth <= 0) {
        if (combatData.playerEffects.find(effect => effect.prayer === 'Denial')) {
            combatData.newPlayerHealth = 1;
            combatData.playerEffects = combatData.playerEffects.filter(effect => effect.prayer !== 'Denial');
        } else {
            combatData.newPlayerHealth = 0;
            combatData.computerWin = true;
        };
    };
    
    combatData.computerActionDescription = 
        `${computer.name} dual-wield attacks you with ${weapons[0].name} and ${weapons[1].name} for ${Math.round(combatData.realizedComputerDamage)} ${combatData.computerDamageType} and ${weapons[1].damage_type[0] ? weapons[1].damage_type[0] : ''}${weapons[1].damage_type[1] ? ' / ' + weapons[1].damage_type[1] : ''} ${firstWeaponCrit === true && secondWeaponCrit === true ? 'Critical Strike Damage' : firstWeaponCrit === true || secondWeaponCrit === true ? 'Partial Crit Damage' : combatData.computerGlancingBlow === true ? 'Damage (Glancing)' : 'Damage'}.`    
    
    return combatData;
};

const computerAttackCompiler = async (combatData, computerAction) => {
    if (combatData.playerWin === true) { return }
    let computerPhysicalDamage = combatData.computerWeapons[0].physical_damage;
    let computerMagicalDamage = combatData.computerWeapons[0].magical_damage;
    let computerTotalDamage;

    let playerPhysicalDefenseMultiplier = 1 - (combatData.playerDefense.physicalDefenseModifier / 100);
    let playerMagicalDefenseMultiplier = 1 - (combatData.playerDefense.magicalDefenseModifier / 100);

    if ((combatData.action === 'posture' || combatData.isStalwart) && combatData.computerCounterSuccess !== true && combatData.computerRollSuccess !== true) {
        playerPhysicalDefenseMultiplier = 1 - (combatData.playerDefense.physicalPosture / 100);
        playerMagicalDefenseMultiplier = 1 - (combatData.playerDefense.magicalPosture / 100);
    };
    if (combatData.computerAction === 'attack') {
        if (combatData.computerWeapons[0].grip === 'One Hand') {
            if (combatData.computerWeapons[0].attack_type === 'Physical') {
                if (combatData.computer.mastery === 'Agility' || combatData.computer.mastery === 'Constitution') {
                    if (combatData.computerAttributes.totalAgility + combatData.computerWeapons[0].agility + combatData.computerWeapons[1].agility >= 50) {
                        if (combatData.computerWeapons[1].grip === 'One Hand') { // If you're Focusing Attack + 1h + Agi Mastery + 1h in Second Slot
                           combatData.computerDualWielding = true;
                            await computerDualWieldCompiler(combatData, playerPhysicalDefenseMultiplier, playerMagicalDefenseMultiplier)
                            return combatData
                        } else {
                            computerPhysicalDamage *= 1.3;
                            computerMagicalDamage *= 1.15;
                        };
                    } else {
                        computerPhysicalDamage *= 1.3;
                        computerMagicalDamage *= 1.15;
                    };
                } else {
                    computerPhysicalDamage *= 1.1;
                    computerMagicalDamage *= 1.1;
                };
            };
            if (combatData.computerWeapons[0].attack_type === 'Magic') {
                if (combatData.computer.mastery === 'Achre' || combatData.computer.mastery === 'Kyosir') {
                    if (combatData.computerAttributes.totalAchre + combatData.computerWeapons[0].achre + combatData.computerWeapons[1].achre >= 50) {
                        if (combatData.computerWeapons[1].grip === 'One Hand') { // Might be a dual-wield compiler instead to take the rest of it
                            combatData.computerDualWielding = true;
                            await computerDualWieldCompiler(combatData, playerPhysicalDefenseMultiplier, playerMagicalDefenseMultiplier)
                            return combatData
                        } else {
                            computerPhysicalDamage *= 1.15;
                            computerMagicalDamage *= 1.3;
                        };
                    } else {
                        computerPhysicalDamage *= 1.15;
                        computerMagicalDamage *= 1.3;
                    };
                } else {
                    computerPhysicalDamage *= 1.1;
                    computerMagicalDamage *= 1.1;
                };
            };
        };
        if (combatData.computerWeapons[0].grip === 'Two Hand') {
            if (combatData.computerWeapons[0].attack_type === 'Physical' && combatData.computerWeapons[0].type !== 'Bow') {
                if (combatData.computer.mastery === 'Strength' || combatData.computer.mastery === 'Constitution') {
                    if (combatData.computerAttributes.totalStrength + combatData.computerWeapons[0].strength + combatData.computerWeapons[1].strength >= 75) { // Might be a dual-wield compiler instead to take the rest of it
                        if (combatData.computerWeapons[1].type !== 'Bow') {
                            combatData.computerDualWielding = true;
                            await computerDualWieldCompiler(combatData, playerPhysicalDefenseMultiplier, playerMagicalDefenseMultiplier)
                            return combatData
                        } else { // Less than 50 Srength 
                            computerPhysicalDamage *= 1.3;
                            computerMagicalDamage *= 1.15;
                        };
                    } else { // Less than 50 Srength 
                        computerPhysicalDamage *= 1.3;
                        computerMagicalDamage *= 1.15;
                    };
                } else {
                    computerPhysicalDamage *= 1.1;
                    computerMagicalDamage *= 1.1;
                };
            };
            if (combatData.computerWeapons[0].attack_type === 'Magic') {
                if (combatData.computer.mastery === 'Caeren' || combatData.computer.mastery === 'Kyosir') {
                    if (combatData.computerAttributes.totalCaeren + combatData.computerWeapons[0].caeren + combatData.computerWeapons[1].caeren >= 75) {
                        if (combatData.computerWeapons[1].type !== 'Bow') {
                            combatData.computerDualWielding = true;
                            await computerDualWieldCompiler(combatData, playerPhysicalDefenseMultiplier, playerMagicalDefenseMultiplier)
                            return combatData;
                        } else {
                            computerPhysicalDamage *= 1.15;
                            computerMagicalDamage *= 1.3;
                        };
                    } else {
                        computerPhysicalDamage *= 1.15;
                        computerMagicalDamage *= 1.3;
                    };
                } else {
                    computerPhysicalDamage *= 1.1;
                    computerMagicalDamage *= 1.1;
                };
            };
            if (combatData.computerWeapons[0].type === 'Bow') {
                if (combatData.computer.mastery === 'Agility' || combatData.computer.mastery === 'Achre' || combatData.computer.mastery === 'Kyosir' || combatData.computer.mastery === 'Constitution') {
                    computerPhysicalDamage *= 1.4;
                    computerMagicalDamage *= 1.4;
                } else {
                    computerPhysicalDamage *= 1.1;
                    computerMagicalDamage *= 1.1;
                };
            };
        };
    };

    if (computerAction === 'counter') {
        if (combatData.computerCounterSuccess === true) {
            computerPhysicalDamage *= 3;
            computerMagicalDamage *= 3;    
        } else {
            computerPhysicalDamage *= 0.9;
            computerMagicalDamage *= 0.9;
        };
    };

    if (computerAction === 'dodge') {
        computerPhysicalDamage *= 0.9;
        computerMagicalDamage *= 0.9;
    };

    if (computerAction === 'roll' ) {
        if (combatData.computerRollSuccess === true) {
            computerPhysicalDamage *= 1.15;
            computerMagicalDamage *= 1.15;
        } else {
            computerPhysicalDamage *= 0.95;
            computerMagicalDamage *= 0.95;
        };
    };

    const criticalClearance = Math.floor(Math.random() * 101);
    let criticalChance = combatData.computerWeapons[0].critical_chance;
    criticalChance -= combatData.playerAttributes.kyosirMod;
    if (combatData.weather === 'Astralands') criticalChance += 10;

    const criticalResult = await criticalCompiler(combatData.computer, criticalChance, criticalClearance, combatData.computerWeapons[0], computerPhysicalDamage, computerMagicalDamage, combatData.weather, combatData.computerGlancingBlow, combatData.computerCriticalSuccess);
    combatData.computerGlancingBlow = criticalResult.glancingBlow;
    combatData.computerCriticalSuccess = criticalResult.criticalSuccess;
    computerPhysicalDamage = criticalResult.physicalDamage;
    computerMagicalDamage = criticalResult.magicalDamage;

    computerPhysicalDamage *= 1 - ((1 - playerPhysicalDefenseMultiplier) * (1 - (combatData.computerWeapons[0].physical_penetration / 100)));
    computerMagicalDamage *= 1 - ((1 - playerMagicalDefenseMultiplier) * (1 - (combatData.computerWeapons[0].magical_penetration / 100)));

    const damageType = await damageTypeCompiler(combatData.computerDamageType, combatData.player, combatData.computerWeapons[0], computerPhysicalDamage, computerMagicalDamage);
    computerPhysicalDamage = damageType.physicalDamage;
    computerMagicalDamage = damageType.magicalDamage;

    const weatherResult = await weatherEffectCheck(combatData.computerWeapons[0], computerMagicalDamage, computerPhysicalDamage, combatData.weather, combatData.computerCriticalSuccess);
    computerPhysicalDamage = weatherResult.physicalDamage;
    computerMagicalDamage = weatherResult.magicalDamage; 

    computerTotalDamage = computerPhysicalDamage + computerMagicalDamage;
    if (computerTotalDamage < 0) {
        computerTotalDamage = 0;
    };
    combatData.realizedComputerDamage = computerTotalDamage;

    if (combatData.action === 'attack') {
        combatData.realizedComputerDamage *= 1.1;
    };
    if (combatData.action === 'posture') {
        combatData.realizedComputerDamage *= 0.95;
    };

    if (combatData.prayerData.includes('Avarice')) {
        combatData.realizedComputerDamage *= 1.1;
    };

    // =============== PHASER EFFECTS ================ \\
    if (combatData.isStalwart) {
        combatData.realizedComputerDamage *= 0.85;
    };
    if (combatData.isCaerenic) {
        combatData.realizedComputerDamage *= 1.25;
    };

    combatData.newPlayerHealth = combatData.currentPlayerHealth - combatData.realizedComputerDamage;
    combatData.currentPlayerHealth = combatData.newPlayerHealth; // Added to persist health totals?

    combatData.computerActionDescription = 
        `${combatData.computer.name} attacks you with their ${combatData.computerWeapons[0].name} for ${Math.round(computerTotalDamage)} ${combatData.computerDamageType} ${combatData.computerCriticalSuccess === true ? 'Critical Strike Damage' : combatData.computerGlancingBlow === true ? 'Damage (Glancing)' : 'Damage'}.`    

    if (combatData.newPlayerHealth < 0 || combatData.currentPlayerHealth <= 0) {
        if (combatData.playerEffects.find(effect => effect.prayer === 'Denial')) {
            combatData.newPlayerHealth = 1;
            combatData.playerEffects = combatData.playerEffects.filter(effect => effect.prayer !== 'Denial');
        } else {
            combatData.newPlayerHealth = 0;
            combatData.computerWin = true;
        };
    };

    if (combatData.newPlayerHealth > 0) {
        combatData.computerWin = false;
    };

    if (combatData.newComputerHealth > 0) {
        combatData.playerWin = false;
    };
    return combatData;
}; 
    
const computerRollCompiler = async (combatData, playerAction, computerAction) => {
    const computerRoll = combatData.computerWeapons[0].roll;
    let rollCatch = Math.floor(Math.random() * 101) + combatData.playerAttributes.kyosirMod;
    if (combatData.weather === 'Alluring Isles') {
        computerRoll -= 10;
    };
    if (combatData.weather === 'Kingdom' || combatData.weather === 'Sedyrus') {
        computerRoll -= 5;
    };
    if (combatData.weather === 'Fangs' || combatData.weather === 'Roll') {
        computerRoll += 5;
    };
    if (computerRoll > rollCatch) {
        combatData.computerRollSuccess = true;
        combatData.computerSpecialDescription = `${combatData.computer.name} successfully rolls against you, avoiding your ${playerAction === 'attack' ? 'Focused' : playerAction.charAt(0).toUpperCase() + playerAction.slice(1) } Attack.`
        await computerAttackCompiler(combatData, computerAction)
    } else {
        combatData.computerSpecialDescription = `${combatData.computer.name} fails to roll against your ${  playerAction === 'attack' ? 'Focused' : playerAction.charAt(0).toUpperCase() + playerAction.slice(1) } Attack.`
        return combatData
    };
    return combatData;
};

// ================================== PLAYER COMPILER FUNCTIONS ====================================== \\

const dualWieldCompiler = async (combatData) => { // Triggers if 40+ Str/Caer for 2h, 1h + Agi/Achre Mastery and 2nd weapon is 1h
    const computer = combatData.computer;
    const weapons = combatData.weapons;

    let playerWeaponOnePhysicalDamage = combatData.weapons[0].physical_damage;
    let playerWeaponOneMagicalDamage = combatData.weapons[0].magical_damage;
    let playerWeaponTwoPhysicalDamage = combatData.weapons[1].physical_damage;
    let playerWeaponTwoMagicalDamage = combatData.weapons[1].magical_damage;
    let playerWeaponOneTotalDamage;
    let playerWeaponTwoTotalDamage;
    let firstWeaponCrit = false;
    let secondWeaponCrit = false;
    
    let computerPhysicalDefenseMultiplier = 1 - (combatData.computerDefense.physicalDefenseModifier / 100);
    let computerMagicalDefenseMultiplier = 1 - (combatData.computerDefense.magicalDefenseModifier / 100);

    const weapOneClearance = Math.floor(Math.random() * 10100) / 100;
    const weapTwoClearance = Math.floor(Math.random() * 10100) / 100;
    let weapOneCrit = combatData.weapons[0].critical_chance;
    let weapTwoCrit = combatData.weapons[1].critical_chance;
    weapOneCrit -= combatData.computerAttributes.kyosirMod;
    weapTwoCrit -= combatData.computerAttributes.kyosirMod;
    const resultOne = await criticalCompiler(combatData.player, weapOneCrit, weapOneClearance, combatData.weapons[0], playerWeaponOnePhysicalDamage, playerWeaponOneMagicalDamage, combatData.weather, combatData.glancingBlow, combatData.criticalSuccess);
    combatData.criticalSuccess = resultOne.criticalSuccess;
    combatData.glancingBlow = resultOne.glancingBlow;
    playerWeaponOnePhysicalDamage = resultOne.physicalDamage;
    playerWeaponOneMagicalDamage = resultOne.magicalDamage;
    if (weapOneCrit >= weapOneClearance) {
        firstWeaponCrit = true;
    };
    const resultTwo = await criticalCompiler(combatData.player, weapTwoCrit, weapTwoClearance, combatData.weapons[1], playerWeaponTwoPhysicalDamage, playerWeaponTwoMagicalDamage, combatData.weather, combatData.glancingBlow, combatData.criticalSuccess);
    combatData.criticalSuccess = resultTwo.criticalSuccess;
    combatData.glancingBlow = resultTwo.glancingBlow;
    playerWeaponTwoPhysicalDamage = resultTwo.physicalDamage;
    playerWeaponTwoMagicalDamage = resultTwo.magicalDamage;
    if (weapTwoCrit >= weapTwoClearance) {
        secondWeaponCrit = true;
    };

    playerWeaponOnePhysicalDamage *= 1 - ((1 - computerPhysicalDefenseMultiplier) * (1 - (weapons[0].physical_penetration / 100)));
    playerWeaponOneMagicalDamage *= 1 - ((1 - computerMagicalDefenseMultiplier) * (1 - (weapons[0].magical_penetration / 100)));

    playerWeaponTwoPhysicalDamage *= 1 - ((1 - computerPhysicalDefenseMultiplier) * (1 - (weapons[1].physical_penetration / 100)));
    playerWeaponTwoMagicalDamage *= 1 - ((1 - computerMagicalDefenseMultiplier) * (1 - (weapons[1].magical_penetration / 100)));

    const damageType = await damageTypeCompiler(combatData.playerDamageType, combatData.computer, weapons[0], playerWeaponOnePhysicalDamage, playerWeaponOneMagicalDamage);
    playerWeaponOnePhysicalDamage = damageType.physicalDamage;
    playerWeaponOneMagicalDamage = damageType.magicalDamage;

    const damageTypeTwo = await damageTypeCompiler(combatData.playerDamageType, combatData.computer, weapons[1], playerWeaponTwoPhysicalDamage, playerWeaponTwoMagicalDamage);
    playerWeaponTwoPhysicalDamage = damageTypeTwo.physicalDamage;
    playerWeaponTwoMagicalDamage = damageTypeTwo.magicalDamage;

    const weatherResult = await weatherEffectCheck(combatData.weapons[0], playerWeaponOneMagicalDamage, playerWeaponOnePhysicalDamage, combatData.weather, firstWeaponCrit);
    playerWeaponOnePhysicalDamage = weatherResult.physicalDamage;
    playerWeaponOneMagicalDamage = weatherResult.magicalDamage;

    const weatherResultTwo = await weatherEffectCheck(combatData.weapons[1], playerWeaponTwoMagicalDamage, playerWeaponTwoPhysicalDamage, combatData.weather, secondWeaponCrit);
    playerWeaponTwoPhysicalDamage = weatherResultTwo.physicalDamage;
    playerWeaponTwoMagicalDamage = weatherResultTwo.magicalDamage;

    playerWeaponOneTotalDamage = playerWeaponOnePhysicalDamage + playerWeaponOneMagicalDamage;
    playerWeaponTwoTotalDamage = playerWeaponTwoPhysicalDamage + playerWeaponTwoMagicalDamage;

    combatData.realizedPlayerDamage = playerWeaponOneTotalDamage + playerWeaponTwoTotalDamage;
    if (combatData.realizedPlayerDamage < 0) {
        combatData.realizedPlayerDamage = 0;
    };

    let strength = combatData.playerAttributes.totalStrength + combatData.weapons[0].strength  + combatData.weapons[1].strength;
    let agility = combatData.playerAttributes.totalAgility + combatData.weapons[0].agility  + combatData.weapons[1].agility;
    let achre = combatData.playerAttributes.totalAchre + combatData.weapons[0].achre + combatData.weapons[1].achre;
    let caeren = combatData.playerAttributes.totalCaeren + combatData.weapons[0].caeren  + combatData.weapons[1].caeren;

    if (combatData.weapons[0].grip === 'One Hand') {
        if (combatData.weapons[0].attack_type === 'Physical') {
            combatData.realizedPlayerDamage *= (agility / 100)
        } else {
            combatData.realizedPlayerDamage *= (achre / 100)
        };
    };

    if (combatData.weapons[0].grip === 'Two Hand') {
        if (combatData.weapons[0].attack_type === 'Physical') {
            combatData.realizedPlayerDamage *= (strength / 150) 
        } else {
            combatData.realizedPlayerDamage *= (caeren / 150)
        };
    };

    if (combatData.computerAction === 'attack') {
        combatData.realizedPlayerDamage *= 1.1;
    };
    if (combatData.computerAction === 'posture') {
        combatData.realizedPlayerDamage *= 0.95;
    };
    if (combatData.isCaerenic) {
        combatData.realizedPlayerDamage *= 1.15;
    };

    combatData.newComputerHealth = combatData.currentComputerHealth - combatData.realizedPlayerDamage;
    combatData.currentComputerHealth = combatData.newComputerHealth; // Added to persist health totals?

    if (combatData.newComputerHealth <= 0 || combatData.currentComputerHealth <= 0) {
        combatData.newComputerHealth = 0;
        combatData.playerWin = true;
    };
  
    // ==================== STATISTIC LOGIC ====================
    combatData.typeAttackData.push(combatData.weapons[0].attack_type, combatData.weapons[1].attack_type);
    combatData.typeDamageData.push(combatData.playerDamageType);
    combatData.totalDamageData = combatData.realizedPlayerDamage > combatData.totalDamageData ? combatData.realizedPlayerDamage : combatData.totalDamageData;
    // ==================== STATISTIC LOGIC ====================
    
    combatData.playerActionDescription = 
        `You dual-wield attack ${computer.name} with ${weapons[0].name} and ${weapons[1].name} for ${Math.round(combatData.realizedPlayerDamage)} ${combatData.playerDamageType} and ${weapons[1].damage_type[0] ? weapons[1].damage_type[0] : ''} ${firstWeaponCrit === true && secondWeaponCrit === true ? 'Critical Strike Damage' : firstWeaponCrit === true || secondWeaponCrit === true ? 'Partial Crit Damage' : combatData.glancingBlow === true ? 'Damage (Glancing)' : 'Damage'}.`    
    return (
        combatData
    );
};
    
const attackCompiler = async (combatData, playerAction) => {
    if (combatData.computerWin === true) return;
    let playerPhysicalDamage = combatData.weapons[0].physical_damage;
    let playerMagicalDamage = combatData.weapons[0].magical_damage;
    let playerTotalDamage;

    let computerPhysicalDefenseMultiplier = 1 - (combatData.computerDefense.physicalDefenseModifier / 100);
    let computerMagicalDefenseMultiplier = 1 - (combatData.computerDefense.magicalDefenseModifier / 100);
    
    // This is for Opponent's who are Posturing
    if (combatData.computerAction === 'posture' && !combatData.counterSuccess && !combatData.rollSuccess) {
        computerPhysicalDefenseMultiplier = 1 - (combatData.computerDefense.physicalPosture / 100);
        computerMagicalDefenseMultiplier = 1 - (combatData.computerDefense.magicalPosture / 100);
    };

    // This is for the Focused Attack Action i.e. you chose to Attack over adding a defensive component
    if (combatData.action === 'attack') {
        if (combatData.weapons[0].grip === 'One Hand') {
            if (combatData.weapons[0].attack_type === 'Physical') {
                if (combatData.player.mastery === 'Agility' || combatData.player.mastery === 'Constitution') {
                    if (combatData.playerAttributes.totalAgility + combatData.weapons[0].agility + combatData.weapons[1].agility >= 50) {
                        if (combatData.weapons[1].grip === 'One Hand') { // If you're Focusing Attack + 1h + Agi Mastery + 1h in Second Slot
                            combatData.dualWielding = true;
                            await dualWieldCompiler(combatData);
                            return combatData
                        } else {
                            playerPhysicalDamage *= 1.3;
                            playerMagicalDamage *= 1.15;
                        };
                    } else {
                        playerPhysicalDamage *= 1.3;
                        playerMagicalDamage *= 1.15;
                    };
                } else {
                    playerPhysicalDamage *= 1.1;
                    playerMagicalDamage *= 1.1;
                };
            };
            if (combatData.weapons[0].attack_type === 'Magic') {
                if (combatData.player.mastery === 'Achre' || combatData.player.mastery === 'Kyosir') {
                    if (combatData.playerAttributes.totalAchre + combatData.weapons[0].achre + combatData.weapons[0].achre + combatData.weapons[1].achre >= 50) {
                        if (combatData.weapons[1].grip === 'One Hand') { // Might be a dual-wield compiler instead to take the rest of it
                            combatData.dualWielding = true;
                            await dualWieldCompiler(combatData)
                            return combatData
                        } else {
                            playerPhysicalDamage *= 1.15;
                            playerMagicalDamage *= 1.3;
                        };
                    } else {
                        playerPhysicalDamage *= 1.15;
                        playerMagicalDamage *= 1.3;
                    };
                } else {
                    playerPhysicalDamage *= 1.1;
                    playerMagicalDamage *= 1.1;
                };
            };
        };
        if (combatData.weapons[0].grip === 'Two Hand') { // Weapon is TWO HAND
            if (combatData.weapons[0].attack_type === 'Physical' && combatData.weapons[0].type !== 'Bow') {
                if (combatData.player.mastery === 'Strength' || combatData.player.mastery === 'Constitution') {
                    if (combatData.playerAttributes.totalStrength + combatData.weapons[0].strength  + combatData.weapons[1].strength >= 75) { // Might be a dual-wield compiler instead to take the rest of it
                        if (combatData.weapons[1].type !== 'Bow') {
                            combatData.dualWielding = true;
                            await dualWieldCompiler(combatData)
                            return combatData
                        } else { // Less than 40 Srength 
                            playerPhysicalDamage *= 1.3;
                            playerMagicalDamage *= 1.15;
                        };
                    } else { // Less than 40 Srength 
                        playerPhysicalDamage *= 1.3;
                        playerMagicalDamage *= 1.15;
                    };
                } else {
                    playerPhysicalDamage *= 1.1;
                    playerMagicalDamage *= 1.1;
                };
            };
            if (combatData.weapons[0].attack_type === 'Magic') {
                if (combatData.player.mastery === 'Caeren' || combatData.player.mastery === 'Kyosir') {
                    if (combatData.playerAttributes.totalCaeren + combatData.weapons[0].caeren + combatData.weapons[1].caeren >= 75) {
                        if (combatData.weapons[1].type !== 'Bow') {
                            combatData.dualWielding = true;
                            await dualWieldCompiler(combatData)
                            return combatData
                        } else {
                            playerPhysicalDamage *= 1.15;
                            playerMagicalDamage *= 1.3;
                        }
                    } else {
                        playerPhysicalDamage *= 1.15;
                        playerMagicalDamage *= 1.3;
                    };
                } else {
                    playerPhysicalDamage *= 1.1;
                    playerMagicalDamage *= 1.1;
                };
            };
            if (combatData.weapons[0].type === 'Bow') {
                if (combatData.player.mastery === 'Agility' || combatData.player.mastery === 'Achre' || combatData.player.mastery === 'Kyosir' || combatData.player.mastery === 'Constitution') {
                    playerPhysicalDamage *= 1.4;
                    playerMagicalDamage *= 1.4;
                } else {
                    playerPhysicalDamage *= 1.1;
                    playerMagicalDamage *= 1.1;
                };
            };
        }; 
    };

    // Checking For Player Actions
    if (playerAction === 'counter') {
        if (combatData.counterSuccess) {
            playerPhysicalDamage *= 3;
            playerMagicalDamage *= 3;
        } else {
            playerPhysicalDamage *= 0.9;
            playerMagicalDamage *= 0.9;
        };
    };

    if (playerAction === 'dodge') {
        playerPhysicalDamage *= 0.9;
        playerMagicalDamage *= 0.9;
    };

    if (playerAction === 'roll' ) {
        if (combatData.rollSuccess) {
            playerPhysicalDamage *= 1.15;
            playerMagicalDamage *= 1.15;
        } else {
            playerPhysicalDamage *= 0.95;
            playerMagicalDamage *= 0.95;
        };
    };

    const criticalClearance = Math.floor(Math.random() * 10100) / 100;
    let criticalChance = combatData.weapons[0].critical_chance;
    criticalChance -= combatData.computerAttributes.kyosirMod;
    if (combatData.weather === 'Astralands') criticalChance += 10;
    if (combatData.weather === 'Astralands' && combatData.weapons[0].influences[0] === 'Astra') criticalChance += 10;
    const criticalResult = await criticalCompiler(combatData.player, criticalChance, criticalClearance, combatData.weapons[0], playerPhysicalDamage, playerMagicalDamage, combatData.weather, combatData.glancingBlow, combatData.criticalSuccess);

    combatData.criticalSuccess = criticalResult.criticalSuccess;
    combatData.glancingBlow = criticalResult.glancingBlow;
    playerPhysicalDamage = criticalResult.physicalDamage;
    playerMagicalDamage = criticalResult.magicalDamage;

    // If you made it here, your basic attack now resolves itself
    playerPhysicalDamage *= 1 - ((1 - computerPhysicalDefenseMultiplier) * (1 - (combatData.weapons[0].physical_penetration / 100)));
    playerMagicalDamage *=1 - ((1 - computerMagicalDefenseMultiplier) * (1 - (combatData.weapons[0].magical_penetration / 100)));

    const damageType = await damageTypeCompiler(combatData.playerDamageType, combatData.computer, combatData.weapons[0], playerPhysicalDamage, playerMagicalDamage);
    playerPhysicalDamage = damageType.physicalDamage;
    playerMagicalDamage = damageType.magicalDamage;

    const weatherResult = await weatherEffectCheck(combatData.weapons[0], playerMagicalDamage, playerPhysicalDamage, combatData.weather, combatData.criticalSuccess);
    playerPhysicalDamage = weatherResult.physicalDamage;
    playerMagicalDamage = weatherResult.magicalDamage;

    playerTotalDamage = playerPhysicalDamage + playerMagicalDamage;
    if (playerTotalDamage < 0) {
        playerTotalDamage = 0;
    };
    combatData.realizedPlayerDamage = playerTotalDamage;

    if (combatData.computerAction === 'attack') {
        combatData.realizedPlayerDamage *= 1.1;
    };
    if (combatData.isCaerenic) {
        combatData.realizedPlayerDamage *= 1.15;
    };

    combatData.newComputerHealth = combatData.currentComputerHealth - combatData.realizedPlayerDamage;
    combatData.currentComputerHealth = combatData.newComputerHealth; // Added to persist health totals?

    // ==================== STATISTIC LOGIC ====================
    combatData.typeAttackData.push(combatData.weapons[0].attack_type);
    combatData.typeDamageData.push(combatData.playerDamageType);
    combatData.totalDamageData = combatData.realizedPlayerDamage > combatData.totalDamageData ? combatData.realizedPlayerDamage : combatData.totalDamageData;
    // ==================== STATISTIC LOGIC ====================

    combatData.playerActionDescription = 
        `You attack ${combatData.computer.name} with your ${combatData.weapons[0].name} for ${Math.round(playerTotalDamage)} ${combatData.playerDamageType} ${combatData.criticalSuccess === true ? 'Critical Strike Damage' : combatData.glancingBlow === true ? 'Damage (Glancing)' : 'Damage'}.`    

    if (combatData.newComputerHealth <= 0 || combatData.currentComputerHealth <= 0) {
        combatData.newComputerHealth = 0;
        combatData.playerWin = true;
    };

    return combatData;
};

const playerRollCompiler = async (combatData, playerAction, computerAction) => { 
    const playerRoll = combatData.weapons[0].roll;
    let rollCatch = Math.floor(Math.random() * 101) + combatData.computerAttributes.kyosirMod;
    if (combatData.weather === 'Alluring Isles') {
        playerRoll -= 10;
    };
    if (combatData.weather === 'Kingdom' || combatData.weather === 'Sedyrus') {
        playerRoll -= 5;
    };
    if (combatData.weather === 'Fangs' || combatData.weather === 'Roll') {
        playerRoll += 5;
    };
    if (playerRoll > rollCatch) {
        combatData.rollSuccess = true;
        combatData.playerSpecialDescription = 
                `You successfully roll against ${combatData.computer.name}, avoiding their ${ computerAction === 'attack' ? 'Focused' : computerAction.charAt(0).toUpperCase() + computerAction.slice(1) } Attack.`;
        await attackCompiler(combatData, playerAction);
    } else {
        combatData.playerSpecialDescription =
        `You failed to roll against ${combatData.computer.name}'s ${ computerAction === 'attack' ? 'Focused' : computerAction.charAt(0).toUpperCase() + computerAction.slice(1) } Attack.`
         
    };
    return (
        combatData
    );
};

// ================================== COMBAT COMPILER FUNCTIONS ====================================== \\

const doubleRollCompiler = async (combatData, playerInitiative, computerInitiative, playerAction, computerAction) => {
    const playerRoll = combatData.weapons[0].roll;
    const computerRoll = combatData.computerWeapons[0].roll;
    let rollCatch = Math.floor(Math.random() * 101) + combatData.computerAttributes.kyosirMod;
    if (combatData.weather === 'Alluring Isles') {
        playerRoll -= 10;
        computerRoll -= 10;
    };
    if (combatData.weather === 'Kingdom' || combatData.weather === 'Sedyrus') {
        playerRoll -= 5;
        computerRoll -= 5;
    };
    if (combatData.weather === 'Fangs' || combatData.weather === 'Roll') {
        playerRoll += 5;
        computerRoll += 5;
    };
    if (playerInitiative > computerInitiative) { // You have Higher Initiative
        if (playerRoll > rollCatch) { // The Player Succeeds the Roll
            combatData.playerSpecialDescription = 
                `You successfully roll against ${combatData.computer.name}, avoiding their ${combatData.computerAction.charAt(0).toUpperCase() + combatData.computerAction.slice(1)} Attack`;
            await attackCompiler(combatData, playerAction);
        } else if (computerRoll > rollCatch) { // The Player Fails the Roll and the Computer Succeeds
            combatData.playerSpecialDescription = 
                `You failed to roll against ${combatData.computer.name}'s ${combatData.computerAction.charAt(0).toUpperCase() + combatData.computerAction.slice(1)} Attack`;
            combatData.computerSpecialDescription = 
                `${combatData.computer.name} successfully rolls against you, avoiding your ${combatData.playerAction.charAt(0).toUpperCase() + combatData.playerAction.slice(1)} Attack`;
            await computerAttackCompiler(combatData, computerAction);
        } else { // Neither Player nor Computer Succeed
            combatData.playerSpecialDescription = 
                `You failed to roll against ${combatData.computer.name}'s ${combatData.computerAction.charAt(0).toUpperCase() + combatData.computerAction.slice(1)} Attack`;
            combatData.computerSpecialDescription = 
                `${combatData.computer.name} fails to roll against your ${combatData.playerAction.charAt(0).toUpperCase() + combatData.playerAction.slice(1)} Attack`;
            await attackCompiler(combatData, playerAction);
            await computerAttackCompiler(combatData, computerAction);
        }
    } else { // The Computer has Higher Initiative
        if (computerRoll > rollCatch) { // The Computer Succeeds the Roll
            combatData.computerSpecialDescription = 
                `${combatData.computer.name} successfully rolls against you, avoiding your ${combatData.playerAction.charAt(0).toUpperCase() + combatData.playerAction.slice(1)} Attack`;
            await computerAttackCompiler(combatData, computerAction);
        } else if (playerRoll > rollCatch) { // The Computer Fails the Roll and the Player Succeeds
            combatData.computerSpecialDescription = 
                `${combatData.computer.name} fails to roll against your ${combatData.playerAction.charAt(0).toUpperCase() + combatData.playerAction.slice(1)} Attack`;
            combatData.playerSpecialDescription = 
                `You successfully roll against ${combatData.computer.name}, avoiding their ${combatData.computerAction.charAt(0).toUpperCase() + combatData.computerAction.slice(1)} Attack`;
            await attackCompiler(combatData, playerAction);
        } else { // Neither Computer nor Player Succeed
            combatData.computerSpecialDescription = 
                `${combatData.computer.name} fails to roll against your ${combatData.playerAction.charAt(0).toUpperCase() + combatData.playerAction.slice(1)} Attack`;
            combatData.playerSpecialDescription = 
                `You failed to roll against ${combatData.computer.name}'s ${combatData.computerAction.charAt(0).toUpperCase() + combatData.computerAction.slice(1)} Attack`;
            await computerAttackCompiler(combatData, computerAction);
            await attackCompiler(combatData, playerAction);
        };
    };
    return (
        combatData
    );
};

const actionSplitter = async (combatData) => {
    let newData = await newDataCompiler(combatData);
    newData.actionData.push(newData.action);
    const playerInitiative = newData.playerAttributes.initiative;
    const computerInitiative = newData.computerAttributes.initiative;
    let playerAction = newData.action;
    const playerCounter = newData.counterGuess;
    let computerCounter = newData.computerCounterGuess;
    let computerAction = newData.computerAction;

    if (playerAction === '' && !newData.phaser) {
        let possibleChoices = ['attack', 'posture', 'roll'];
        let postureRating = ((combatData.playerDefense.physicalPosture + combatData.playerDefense.magicalPosture) / 4) + 5;
        let rollRating = combatData.weapons[0].roll;
        let posture = 'posture';
        let roll = 'roll';

        if (rollRating >= 100) {
            possibleChoices.push(roll);
        } else  if (postureRating >= 100) {
            possibleChoices.push(posture);
        } else if (postureRating >= rollRating) { 
            possibleChoices.push(posture);
        } else { 
            possibleChoices.push(roll);
        };
        let newChoice = Math.floor(Math.random() * possibleChoices.length);
        newData.action = possibleChoices[newChoice];
        newData.playerAction = possibleChoices[newChoice];
        playerAction = possibleChoices[newChoice];
    };
    await computerWeaponMaker(newData);

    await computerActionCompiler(newData, playerAction, computerAction, computerCounter);
    computerCounter = newData.computerCounterGuess;
    computerAction = newData.computerAction;

    newData.computerStartDescription = 
        `${newData.computer.name} sets to ${computerAction === '' ? 'defend' : computerAction.charAt(0).toUpperCase() + computerAction.slice(1)}${computerCounter ? '-' + computerCounter.charAt(0).toUpperCase() + computerCounter.slice(1) : ''} against you.`

    newData.playerStartDescription = 
        `You attempt to ${playerAction === '' ? 'defend' : playerAction.charAt(0).toUpperCase() + playerAction.slice(1)}${playerCounter ? '-' + playerCounter.charAt(0).toUpperCase() + playerCounter.slice(1) : ''} against ${newData.computer.name}.`
    
    // If both Player and Computer Counter -> Counter [Fastest Resolution]
    if (playerAction === 'counter' && computerAction === 'counter') { // This is if COUNTER: 'ACTION' Is the Same for Both
        if (playerCounter === computerCounter && playerCounter === 'counter') {
            if (playerInitiative > computerInitiative) {
                newData.counterSuccess = true;
                newData.playerSpecialDescription = 
                    `You successfully Countered ${newData.computer.name}'s Counter-Counter! Absolutely Brutal`;
                await attackCompiler(newData, playerAction);
                await faithFinder(newData); 
                await statusEffectCheck(newData);
                newData.combatRound += 1;
                newData.sessionRound += 1;
                return newData
            } else {
                newData.computerCounterSuccess = true;
                newData.computerSpecialDescription = 
                    `${newData.computer.name} successfully Countered your Counter-Counter! Absolutely Brutal`
                await computerAttackCompiler(newData, computerAction);
                await faithFinder(newData);

                await statusEffectCheck(newData);
                newData.combatRound += 1;
                newData.sessionRound += 1;
                return newData
            };
        };
        // If the Player Guesses Right and the Computer Guesses Wrong
        if (playerCounter === computerAction && computerCounter !== playerAction) {
            newData.counterSuccess = true;
            newData.playerSpecialDescription = 
                `You successfully Countered ${newData.computer.name}'s Counter-${computerCounter.charAt(0).toUpperCase() + computerCounter.slice(1)}! Absolutely Brutal`
            await attackCompiler(newData, playerAction)
            await faithFinder(newData);
            await statusEffectCheck(newData);
            newData.combatRound += 1;
            newData.sessionRound += 1;
            return newData;
        };
    
        // If the Computer Guesses Right and the Player Guesses Wrong
        if (computerCounter === playerAction && playerCounter !== computerAction) {
            newData.computerCounterSuccess = true;
            newData.computerSpecialDescription = 
                `${newData.computer.name} successfully Countered your Counter-${playerCounter.charAt(0).toUpperCase() + playerCounter.slice(1)}! Absolutely Brutal`
            await computerAttackCompiler(newData, computerAction);
            await faithFinder(newData);
            await statusEffectCheck(newData);
            newData.combatRound += 1;
            newData.sessionRound += 1;
            return newData;
        } ;
    
        if (playerCounter !== computerAction && computerCounter !== playerAction) {
            newData.playerSpecialDescription = 
                `You failed to Counter ${newData.computer.name}'s Counter! Heartbreaking`
            newData.computerSpecialDescription = 
                `${newData.computer.name} fails to Counter your Counter! Heartbreaking`
                if (playerInitiative > computerInitiative) {
                    await attackCompiler(newData, playerAction);
                    await computerAttackCompiler(newData, computerAction);
                } else {
                    await computerAttackCompiler(newData, computerAction);
                    await attackCompiler(newData, playerAction);
                };
        };
    };

    if (playerAction === 'counter' && computerAction !== 'counter') {
        if (playerCounter === computerAction) {
            newData.counterSuccess = true;
            newData.playerSpecialDescription = 
                `You successfully Countered ${newData.computer.name}'s ${ newData.computerAction === 'attack' ? 'Focused' : newData.computerAction.charAt(0).toUpperCase() + newData.computerAction.slice(1) } Attack.`
            await attackCompiler(newData, playerAction);
            await faithFinder(newData);
            await statusEffectCheck(newData);
            newData.combatRound += 1;
            newData.sessionRound += 1;
            return newData
        } else {
            newData.playerSpecialDescription = 
                `You failed to Counter ${newData.computer.name}'s ${ newData.computerAction === 'attack' ? 'Focused' : newData.computerAction.charAt(0).toUpperCase() + newData.computerAction.slice(1) } Attack. Heartbreaking!`
        };
    };

    if (computerAction === 'counter' && playerAction !== 'counter') {
        if (computerCounter === playerAction) {
            newData.computerCounterSuccess = true;
            newData.computerSpecialDescription = 
                `${newData.computer.name} successfully Countered your ${ newData.action === 'attack' ? 'Focused' : newData.action.charAt(0).toUpperCase() + newData.action.slice(1) } Attack.`
            await computerAttackCompiler(newData, computerAction);
            await faithFinder(newData);
            await statusEffectCheck(newData);
            newData.combatRound += 1;
            newData.sessionRound += 1;
            return newData
        } else {
            newData.computerSpecialDescription = 
                `${newData.computer.name} fails to Counter your ${ newData.action === 'attack' ? 'Focused' : newData.action.charAt(0).toUpperCase() + newData.action.slice(1) } Attack. Heartbreaking!`
        };
    };
    
    if (playerAction === 'dodge' && computerAction === 'dodge') { // If both choose Dodge
        if (playerInitiative > computerInitiative) {
            newData.playerSpecialDescription = 
                `You successfully Dodge ${newData.computer.name}'s ${  newData.computerAction === 'attack' ? 'Focused' : newData.computerAction.charAt(0).toUpperCase() + newData.computerAction.slice(1) } Attack`
            await attackCompiler(newData, playerAction);
        } else {
            `${newData.computer.name} successfully Dodges your ${  newData.action === 'attack' ? 'Focused' : newData.action.charAt(0).toUpperCase() + newData.action.slice(1) } Attack`
            await computerAttackCompiler(newData, computerAction);
        };
    };

    // If the Player Dodges and the Computer does not *Counter or Dodge  *Checked for success
    if (playerAction === 'dodge' && computerAction !== 'dodge') {
        newData.playerSpecialDescription = 
            `You successfully Dodge ${newData.computer.name}'s ${ newData.computerAction === 'attack' ? 'Focused' : newData.computerAction.charAt(0).toUpperCase() + newData.computerAction.slice(1) } Attack`
        await attackCompiler(newData, playerAction);
        await faithFinder(newData);
        await statusEffectCheck(newData);
        newData.combatRound += 1;
        newData.sessionRound += 1;
        return newData;
    };

    // If the Computer Dodges and the Player does not *Counter or Dodge *Checked for success
    if (computerAction === 'dodge' && playerAction !== 'dodge') {
        `${newData.computer.name} successfully Dodges your ${ newData.action === 'attack' ? 'Focused' : newData.action.charAt(0).toUpperCase() + newData.action.slice(1) } Attack`
        await computerAttackCompiler(newData, computerAction);
        await faithFinder(newData);
        await statusEffectCheck(newData);
        newData.combatRound += 1;
        newData.sessionRound += 1;
        return newData;
    };

    if (playerAction === 'roll' && computerAction === 'roll') { // If both choose Roll
        await doubleRollCompiler(newData, playerInitiative, computerInitiative, playerAction, computerAction);
    };

    if (playerAction === 'roll' && computerAction !== 'roll') {
        await playerRollCompiler(newData, playerAction, computerAction);
        if (newData.rollSuccess === true) {
            await faithFinder(newData);
            await statusEffectCheck(newData);
            newData.combatRound += 1;
            newData.sessionRound += 1;
            return newData;
        };
    };

    if (computerAction === 'roll' && playerAction !== 'roll') {
        await computerRollCompiler(newData, playerAction, computerAction);
        if (newData.computerRollSuccess === true) {
            await faithFinder(newData);
            await statusEffectCheck(newData);
            newData.combatRound += 1;
            newData.sessionRound += 1;
            return newData;
        };
    };

    if (playerAction === 'attack' || playerAction === 'posture' || computerAction === 'attack' || computerAction === 'posture') { // If both choose Attack
        if (playerInitiative > computerInitiative) {
            if (playerAction !== '') await attackCompiler(newData, playerAction);
            if (computerAction !== '') await computerAttackCompiler(newData, computerAction);
        } else {
            if (computerAction !== '') await computerAttackCompiler(newData, computerAction);
            if (playerAction !== '') await attackCompiler(newData, playerAction);
        };
    };

    await faithFinder(newData);
    await statusEffectCheck(newData);
    
    if (newData.playerWin === true) {
        newData.computerDeathDescription = 
        `${newData.computer.name} has been defeated. Hail ${newData.player.name}, you have won.`;
    };
    if (newData.computerWin === true) {
        newData.playerDeathDescription = 
        `You have been defeated. Hail ${newData.computer.name}, they have won.`;
    };
    if (newData.playerWin === true || newData.computerWin === true) {
        await statusEffectCheck(newData);
    };

    newData.combatRound += 1;
    newData.sessionRound += 1;

    return newData;
};

const computerWeaponMaker = async (combatData) => {
    let defenseTypes = {
        "Leather-Cloth": 0,
        "Leather-Mail": 0,
        "Chain-Mail": 0,
        "Plate-Mail": 0,
    };
    let armorWeights = {
        "helmet": 2,
        "chest": 1.5,
        "legs": 1,
    };
    defenseTypes[combatData.player.helmet.type] += armorWeights.helmet;
    defenseTypes[combatData.player.chest.type] += armorWeights.chest;
    defenseTypes[combatData.player.legs.type] += armorWeights.legs;
    const sortedDefenses = Object.entries(defenseTypes)
        .sort((a, b) => b[1] - a[1]) // Sort based on the values in descending order
        .map(([type, weight]) => ({ type, weight })); // Convert back to an array of objects
    
    let strongTypes = {
        "Leather-Cloth": ["Frost", "Lightning", "Righteous", "Pierce"],
        "Leather-Mail": ["Pierce", "Slash", "Wind", "Sorcery", "Wild"],
        "Chain-Mail": ["Blunt", "Slash", "Sorcery", "Wind", "Wild"],
        "Plate-Mail": ["Blunt", "Earth", "Fire", "Spooky"],
    };
    let computerTypes = {
        0: [],
        1: [],
        2: [],
    };
    combatData.computerWeapons.forEach(async (weapon, index) => {
        weapon.damage_type.forEach(async (type, typeIndex) => {
            if (strongTypes[sortedDefenses[0].type].includes(type)) {
                computerTypes[index].push({ type, rank: 1 });
            } else if (strongTypes[sortedDefenses[1].type].includes(type)) {
                computerTypes[index].push({ type, rank: 2 });
            } else if (strongTypes[sortedDefenses[2].type].includes(type)) {
                computerTypes[index].push({ type, rank: 3 });
            } else if (strongTypes[sortedDefenses[3].type].includes(type)) {
                computerTypes[index].push({ type, rank: 4 });
            };
        });      
    });

    for (let rank = 1; rank <= 4; rank++) {
        if (computerTypes[0].length && computerTypes[0].find(type => type.rank === rank)) {
            if (rank === 1) {
                combatData.computerDamageType = computerTypes[0].sort((a, b) => a.rank - b.rank)[0].type;
            } else {
                combatData.computerDamageType = computerTypes[0][Math.floor(Math.random() * computerTypes[0].length)].type;
            };
            break;
        } else if (computerTypes[1].length && computerTypes[1].find(type => type.rank === rank)) {
            combatData.computerWeapons = [combatData.computerWeapons[1], combatData.computerWeapons[0], combatData.computerWeapons[2]];
            combatData.computerDamageType = computerTypes[1][Math.floor(Math.random() * computerTypes[1].length)].type;
            break;
        } else if (computerTypes[2].length && computerTypes[2].find(type => type.rank === rank)) {
            combatData.computerWeapons = [combatData.computerWeapons[2], combatData.computerWeapons[0], combatData.computerWeapons[1]];
            combatData.computerDamageType = computerTypes[2][Math.floor(Math.random() * computerTypes[2].length)].type;
            break;
        };
    };

    let prayers = ['Buff', 'Damage', 'Debuff', 'Heal'];
    let newPrayer = Math.floor(Math.random() * prayers.length);
    combatData.computerBlessing = prayers[newPrayer];

    return combatData;
};

const phaserDualActionSplitter = async (combatData) => {
    let newData = await newDataCompiler(combatData);
    newData.actionData.push(newData.action);
    const playerInitiative = newData.playerAttributes.initiative;
    const computerInitiative = newData.computerAttributes.initiative;
    const playerAction = newData.action;
    const playerCounter = newData.counterGuess;
    const computerAction = newData.computerAction;
    const computerCounter = newData.computerCounterGuess;

    await computerWeaponMaker(newData);
    await computerActionCompiler(newData, playerAction, computerAction, computerCounter);

    newData.computerStartDescription = 
        `${newData.computer.name} sets to ${computerAction === '' ? 'defend' : computerAction.charAt(0).toUpperCase() + computerAction.slice(1)}${computerCounter ? '-' + computerCounter.charAt(0).toUpperCase() + computerCounter.slice(1) : ''} against you.`

    newData.playerStartDescription = 
        `You attempt to ${playerAction === '' ? 'defend' : playerAction.charAt(0).toUpperCase() + playerAction.slice(1)}${playerCounter ? '-' + playerCounter.charAt(0).toUpperCase() + playerCounter.slice(1) : ''} against ${newData.computer.name}.`
    
    if (playerAction === 'counter' && computerAction === 'counter') { 
        if (playerCounter === computerCounter && playerCounter === 'counter') {
            if (playerInitiative > computerInitiative) {
                newData.counterSuccess = true;
                newData.playerSpecialDescription = `You successfully Countered ${newData.computer.name}'s Counter-Counter! Absolutely Brutal`;
            } else {
                newData.computerCounterSuccess = true;
                newData.computerSpecialDescription = `${newData.computer.name} successfully Countered your Counter-Counter! Absolutely Brutal`; 
            };
            return newData;
        };
        if (playerCounter === computerAction && computerCounter !== playerAction) {
            newData.counterSuccess = true;
            newData.playerSpecialDescription = `You successfully Countered ${newData.computer.name}'s Counter-${computerCounter.charAt(0).toUpperCase() + computerCounter.slice(1)}! Absolutely Brutal`;
            return newData; 
        };
    
        if (computerCounter === playerAction && playerCounter !== computerAction) {
            newData.computerCounterSuccess = true;
            newData.computerSpecialDescription = `${newData.computer.name} successfully Countered your Counter-${playerCounter.charAt(0).toUpperCase() + playerCounter.slice(1)}! Absolutely Brutal`;
            return newData; 
        };
    
        if (playerCounter !== computerAction && computerCounter !== playerAction) {
            newData.playerSpecialDescription = `You failed to Counter ${newData.computer.name}'s Counter! Heartbreaking`;
            newData.computerSpecialDescription = `${newData.computer.name} fails to Counter your Counter! Heartbreaking`;
            return newData;
        };
    };

    if (playerAction === 'counter' && computerAction !== 'counter') {
        if (playerCounter === computerAction) {
            newData.counterSuccess = true;
            newData.playerSpecialDescription = `You successfully Countered ${newData.computer.name}'s ${ computerAction === 'attack' ? 'Focused' : computerAction.charAt(0).toUpperCase() + computerAction.slice(1) } Attack.`;
            return newData;
        } else {
            newData.playerSpecialDescription = 
                `You failed to Counter ${newData.computer.name}'s ${ computerAction === 'attack' ? 'Focused' : computerAction.charAt(0).toUpperCase() + computerAction.slice(1) } Attack. Heartbreaking!`;
        };
    };

    if (computerAction === 'counter' && playerAction !== 'counter') {
        if (computerCounter === playerAction) {
            newData.computerCounterSuccess = true;
            newData.computerSpecialDescription = `${newData.computer.name} successfully Countered your ${ newData.action === 'attack' ? 'Focused' : playerAction.charAt(0).toUpperCase() + playerAction.slice(1) } Attack.`;
            return newData;    
        } else {
            newData.computerSpecialDescription = `${newData.computer.name} fails to Counter your ${ playerAction === 'attack' ? 'Focused' : playerAction.charAt(0).toUpperCase() + playerAction.slice(1) } Attack. Heartbreaking!`;
        };
    };

    if (playerAction === 'roll' && computerAction === 'roll') { // If both choose Roll
        await doubleRollCompiler(newData, playerInitiative, computerInitiative, playerAction, computerAction);
        return newData;
    };

    if (playerAction === 'roll' && computerAction !== 'roll') {
        await playerRollCompiler(newData, playerAction, computerAction);
    };

    if (computerAction === 'roll' && playerAction !== 'roll') {
        await computerRollCompiler(newData, playerAction, computerAction);
    };

    if (phaserSuccessConcerns(newData.counterSuccess, newData.rollSuccess, newData.computerCounterSuccess, newData.computerRollSuccess) === false) { // If both choose Attack
        if (playerInitiative > computerInitiative) {
            if (phaserActionConcerns(newData.action)) await attackCompiler(newData, playerAction);
            if (phaserActionConcerns(newData.computerAction)) await computerAttackCompiler(newData, computerAction);
        } else {
            if (phaserActionConcerns(newData.computerAction)) await computerAttackCompiler(newData, computerAction);
            if (phaserActionConcerns(newData.action)) await attackCompiler(newData, playerAction);
        };
    };

    return newData;
};

const phaserActionSplitter = async (combatData) => {
    let cleanData = await newDataCompiler(combatData);
    let changes = { ...cleanData };
    const playerActionLive = cleanData.action !== '' ? true : false;
    const computerActionLive = cleanData.computerAction !== '' ? true : false;
    if (playerActionLive && computerActionLive) {
        console.log("Dual Actions");
        cleanData = await phaserDualActionSplitter(cleanData);
        changes = {
            ...changes,
            'playerSpecialDescription': cleanData.playerSpecialDescription,
            'playerStartDescription': cleanData.playerStartDescription,
            'playerInfluenceDescription': cleanData.playerInfluenceDescription,
            'playerInfluenceDescriptionTwo': cleanData.playerInfluenceDescriptionTwo,
            'playerActionDescription': cleanData.playerActionDescription,
            'realizedPlayerDamage': cleanData.realizedPlayerDamage,
            'counterSuccess': cleanData.counterSuccess,
            'rollSuccess': cleanData.rollSuccess,
            'criticalSuccess': cleanData.criticalSuccess,
            'religiousSuccess': cleanData.religiousSuccess,
            'glancingBlow': cleanData.glancingBlow,
            'dualWielding': cleanData.dualWielding,

            'computerSpecialDescription': cleanData.computerSpecialDescription,
            'computerStartDescription': cleanData.computerStartDescription,
            'computerInfluenceDescription': cleanData.computerInfluenceDescription,
            'computerInfluenceDescriptionTwo': cleanData.computerInfluenceDescriptionTwo,
            'computerActionDescription': cleanData.computerActionDescription,
            'realizedComputerDamage': cleanData.realizedComputerDamage,
            'computerDamageType': cleanData.computerDamageType,
            'computerCounterSuccess': cleanData.computerCounterSuccess,
            'computerRollSuccess': cleanData.computerRollSuccess,
            'computerCriticalSuccess': cleanData.computerCriticalSuccess,
            'computerReligiousSuccess': cleanData.computerReligiousSuccess,
            'computerGlancingBlow': cleanData.computerGlancingBlow,
            'computerDualWielding': cleanData.computerDualWielding, 
        };
    } else if (playerActionLive && !computerActionLive) {
        console.log(cleanData.player.name, "Player Attacking");
        await computerActionCompiler(cleanData, cleanData.action, cleanData.computerAction, cleanData.computerCounterGuess);
        await attackCompiler(cleanData, cleanData.action);
        changes = {
            ...changes,
            'playerSpecialDescription': cleanData.playerSpecialDescription,
            'playerStartDescription': cleanData.playerStartDescription,
            'playerInfluenceDescription': cleanData.playerInfluenceDescription,
            'playerInfluenceDescriptionTwo': cleanData.playerInfluenceDescriptionTwo,
            'playerActionDescription': cleanData.playerActionDescription,
            'realizedPlayerDamage': cleanData.realizedPlayerDamage,
            'potentialPlayerDamage': cleanData.potentialPlayerDamage,
            'counterSuccess': cleanData.counterSuccess,
            'rollSuccess': cleanData.rollSuccess,
            'criticalSuccess': cleanData.criticalSuccess,
            'religiousSuccess': cleanData.religiousSuccess,
            'glancingBlow': cleanData.glancingBlow,
            'dualWielding': cleanData.dualWielding,
        };
    } else if (!playerActionLive && computerActionLive) {
        console.log(cleanData.computer.name, "Computer Attacking");
        await computerWeaponMaker(cleanData);
        await computerAttackCompiler(cleanData, cleanData.computerAction);
        changes = {
            ...changes,
            'computerSpecialDescription': cleanData.computerSpecialDescription,
            'computerStartDescription': cleanData.computerStartDescription,
            'computerInfluenceDescription': cleanData.computerInfluenceDescription,
            'computerInfluenceDescriptionTwo': cleanData.computerInfluenceDescriptionTwo,
            'computerActionDescription': cleanData.computerActionDescription,
            'realizedComputerDamage': cleanData.realizedComputerDamage,
            'potentialComputerDamage': cleanData.potentialComputerDamage,
            'computerDamageType': cleanData.computerDamageType,
            'computerCounterSuccess': cleanData.computerCounterSuccess,
            'computerRollSuccess': cleanData.computerRollSuccess,
            'computerCriticalSuccess': cleanData.computerCriticalSuccess,
            'computerReligiousSuccess': cleanData.computerReligiousSuccess,
            'computerGlancingBlow': cleanData.computerGlancingBlow,
            'computerDualWielding': cleanData.computerDualWielding,    
        };
    };
    await faithFinder(cleanData);
    
    if (cleanData.playerWin === true) cleanData.computerDeathDescription = `${cleanData.computer.name} has been defeated. Hail ${cleanData.player.name}, you have won.`;
    if (cleanData.computerWin === true) cleanData.playerDeathDescription = `You have been defeated. Hail ${cleanData.computer.name}, they have won.`;
    
    cleanData.action = '';
    cleanData.computerAction = '';
    cleanData.combatRound += 1;
    cleanData.sessionRound += 1;

    if (cleanData.playerWin === true || cleanData.computerWin === true) await statusEffectCheck(cleanData);

    changes = {
        ...changes,
        'action': cleanData.action,
        'computerAction': cleanData.computerAction,
        'combatRound': cleanData.combatRound,
        'sessionRound': cleanData.sessionRound,
        'playerDamaged': cleanData.realizedComputerDamage > 0,
        'computerDamaged': cleanData.realizedPlayerDamage > 0,
        
        'newPlayerHealth': cleanData.newPlayerHealth,
        'currentPlayerHealth': cleanData.currentPlayerHealth,
        'playerDefense': cleanData.playerDefense,
        'playerEffects': cleanData.playerEffects,
        'weapons': cleanData.weapons,
        
        'newComputerHealth': cleanData.newComputerHealth,
        'currentComputerHealth': cleanData.currentComputerHealth,
        'computerDefense': cleanData.computerDefense,
        'computerEffects': cleanData.computerEffects,
        'computerWeapons': cleanData.computerWeapons,
        
        'actionData': cleanData.actionData,
        'typeAttackData': cleanData.typeAttackData,
        'typeDamageData': cleanData.typeDamageData,
        'deityData': cleanData.deityData,
        'prayerData': cleanData.prayerData,

        'attackWeight': cleanData.attackWeight,
        'counterWeight': cleanData.counterWeight,
        'dodgeWeight': cleanData.dodgeWeight,
        'postureWeight': cleanData.postureWeight,
        'rollWeight': cleanData.rollWeight,
        'counterAttackWeight': cleanData.counterAttackWeight,
        'counterCounterWeight': cleanData.counterCounterWeight,
        'counterDodgeWeight': cleanData.counterDodgeWeight,
        'counterPostureWeight': cleanData.counterPostureWeight,
        'counterRollWeight': cleanData.counterRollWeight,

        'playerDeathDescription': cleanData.playerDeathDescription,
        'computerDeathDescription': cleanData.computerDeathDescription,
        'playerWin': cleanData.playerWin,
        'computerWin': cleanData.computerWin,
    };
    return changes;
};

const newDataCompiler = async (combatData) => {
    const newData = {
        player: combatData.player, // The player's Ascean
        action: combatData.action, // The player's action
        playerAction: combatData.action,
        counterGuess: combatData.counterGuess, // The action chosen believed to be 
        playerHealth: combatData.playerHealth, // Current Player Health
        weaponOne: combatData.weaponOne, // Clean Slate of Weapon One
        weaponTwo: combatData.weaponTwo, // Clean Slate of Weapon Two
        weaponThree: combatData.weaponThree, // Clean Slate of Weapon Three
        weapons: combatData.weapons, // Array of 3 Weapons in current affect and order
        playerDamageType: combatData.playerDamageType,
        playerDefense: combatData.playerDefense, // Posseses Base + Postured Defenses
        playerAttributes: combatData.playerAttributes, // Possesses compiled Attributes, Initiative
        playerDefenseDefault: combatData.playerDefenseDefault, // Possesses Base Defenses
        computer: combatData.computer, // Computer Enemy
        computerHealth: combatData.computerHealth,
        computerAttributes: combatData.computerAttributes, // Possesses compiled Attributes, Initiative
        computerDefense: combatData.computerDefense, // Posseses Base + Postured Defenses
        computerDefenseDefault: combatData.computerDefenseDefault, // Possesses Base Defenses
        computerAction: combatData.computerAction, // Action Chosen By Computer
        computerCounterGuess: combatData.computerCounterGuess, // Comp's Counter Guess if Action === 'Counter'
        computerWeapons: combatData.computerWeapons,  // All 3 Weapons
        computerDamageType: combatData.computerDamageType,
        potentialPlayerDamage: 0, // All the Damage that is possible on hit for a player
        potentialComputerDamage: 0, // All the Damage that is possible on hit for a computer
        realizedPlayerDamage: 0, // Player Damage - Computer Defenses
        realizedComputerDamage: 0, // Computer Damage - Player Defenses
        playerDamaged: false,
        computerDamaged: false,
        playerStartDescription: '',
        computerStartDescription: '',
        playerSpecialDescription: '',
        computerSpecialDescription: '',
        playerActionDescription: '', 
        computerActionDescription: '',
        playerInfluenceDescription: '',
        computerInfluenceDescription: '',
        playerInfluenceDescriptionTwo: '',
        computerInfluenceDescriptionTwo: '',
        playerDeathDescription: '',
        computerDeathDescription: '',
        currentPlayerHealth: combatData.newPlayerHealth, // New player health post-combat action
        currentComputerHealth: combatData.newComputerHealth, // New computer health post-combat action
        newPlayerHealth: combatData.newPlayerHealth, // New player health post-combat action
        newComputerHealth: combatData.newComputerHealth, // New computer health post-combat action
        attackWeight: combatData.attackWeight,
        counterWeight: combatData.counterWeight,
        dodgeWeight: combatData.dodgeWeight,
        postureWeight: combatData.postureWeight,
        rollWeight: combatData.rollWeight,
        counterAttackWeight: combatData.counterAttackWeight,
        counterCounterWeight: combatData.counterCounterWeight,
        counterDodgeWeight: combatData.counterDodgeWeight,
        counterPostureWeight: combatData.counterPostureWeight,
        counterRollWeight: combatData.counterRollWeight,
        religiousSuccess: false,
        computerReligiousSuccess: false,
        dualWielding: false,
        computerDualWielding: false,
        rollSuccess: false,
        counterSuccess: false,
        computerRollSuccess: false,
        computerCounterSuccess: false,
        playerWin: false,
        playerLuckout: false,
        playerTrait: combatData.playerTrait,
        enemyPersuaded: false,
        computerWin: false,
        criticalSuccess: false,
        computerCriticalSuccess: false,
        glancingBlow: false,
        computerGlancingBlow: false,
        combatRound: combatData.combatRound,
        sessionRound: combatData.sessionRound,
        playerEffects: combatData.playerEffects,
        computerEffects: combatData.computerEffects,
        playerBlessing: combatData.playerBlessing,
        computerBlessing: combatData.computerBlessing,
        prayerSacrifice: combatData.prayerSacrifice,
        prayerSacrificeName: combatData.prayerSacrificeName,
        enemyPrayerConsumed: combatData.enemyPrayerConsumed,
        combatInitiated: combatData.combatInitiated,
        actionStatus: combatData.actionStatus,
        gameIsLive: combatData.gameIsLive,
        combatEngaged: combatData.combatEngaged,
        dodgeStatus: combatData.dodgeStatus,
        instantStatus: combatData.instantStatus,
        highScore: combatData.highScore,
        winStreak: combatData.winStreak,
        loseStreak: combatData.loseStreak,
        actionData: combatData.actionData,
        typeAttackData: combatData.typeAttackData,
        typeDamageData: combatData.typeDamageData,
        totalDamageData: combatData.totalDamageData,
        prayerData: combatData.prayerData,
        deityData: combatData.deityData,
        weather: combatData.weather,
        phaser: combatData.phaser,
        enemyID: combatData.enemyID,
        combatTimer: combatData.combatTimer,
        isCaerenic: combatData.isCaerenic,
        isStalwart: combatData.isStalwart,
        npcType: combatData.npcType,
        persuasionScenario: combatData.persuasionScenario,
        luckoutScenario: combatData.luckoutScenario,
        isEnemy: combatData.isEnemy,
        isAggressive: combatData.isAggressive,
        startedAggressive: combatData.startedAggressive,
        soundEffects: combatData.soundEffects,
    };
    return newData;
};

const computerDispel = async (combatData) => {
    const effect = combatData.computerEffects.pop();
    const matchingWeapon = combatData.computerWeapons.find(weapon => weapon.name === effect.weapon);
    const matchingWeaponIndex = combatData.computerWeapons.indexOf(matchingWeapon);
    const matchingDebuffTarget = combatData.weapons.find(weapon => weapon.name === effect.debuffTarget);
    const matchingDebuffTargetIndex = combatData.weapons.indexOf(matchingDebuffTarget);
    if (effect.prayer === 'Buff') { // Reverses the Buff Effect to the magnitude of the stack to the proper weapon
        for (let key in effect.effect) {
            if (effect.effect[key] && key !== 'dodge') {
                combatData.computerWeapons[matchingWeaponIndex][key] -= effect.effect[key] * effect.activeStacks;
                combatData.computerWeapons[matchingWeaponIndex][key] = roundToTwoDecimals(combatData.computerWeapons[matchingWeaponIndex][key]);
            } else {
                combatData.computerWeapons[matchingWeaponIndex][key] += effect.effect[key] * effect.activeStacks;
                combatData.computerWeapons[matchingWeaponIndex][key] = roundToTwoDecimals(combatData.computerWeapons[matchingWeaponIndex][key]);
            };
        };
        for (let key in combatData.computerDefense) {
            if (effect.effect[key]) {
                combatData.computerDefense[key] -= effect.effect[key] * effect.activeStacks;
                combatData.computerDefense[key] = roundToTwoDecimals(combatData.computerDefense[key]);
            };
        };
    };
    if (effect.prayer === 'Debuff') { // Revereses the Debuff Effect to the proper weapon
        for (let key in effect.effect) {
            if (effect.effect[key] && key !== 'dodge') {
                combatData.weapons[matchingDebuffTargetIndex][key] += effect.effect[key];
                combatData.weapons[matchingDebuffTargetIndex][key] = roundToTwoDecimals(combatData.weapons[matchingDebuffTargetIndex][key]);
            } else {
                combatData.weapons[matchingDebuffTargetIndex][key] -= effect.effect[key];
                combatData.weapons[matchingDebuffTargetIndex][key] = roundToTwoDecimals(combatData.weapons[matchingDebuffTargetIndex][key]);
            };
        };
        for (let key in combatData.playerDefense) {
            if (effect.effect[key]) {
                combatData.playerDefense[key] += effect.effect[key];
                combatData.playerDefense[key] = roundToTwoDecimals(combatData.playerDefense[key]);
            };
        };
    };
    return combatData;
};

// ================================== ACTION - SPLITTERS ===================================== \\

const prayerSplitter = async (combatData, prayer) => {
    let originalPrayer = combatData.playerBlessing;
    combatData.playerBlessing = prayer === '' ? 'Buff' : prayer;

    combatData.prayerData.push(prayer);
    combatData.deityData.push(combatData.weapons[0].influences[0]);

    let existingEffect = combatData.playerEffects.find(effect => effect.name === `Gift of ${combatData.weapons[0].influences[0]}` && effect.prayer === combatData.playerBlessing 
        && effect.enemyName === combatData.computer.name // Added For Phaser ??
    );   
    if (!existingEffect) {
        existingEffect = new StatusEffect(combatData, combatData.player, combatData.computer, combatData.weapons[0], combatData.playerAttributes, combatData.playerBlessing);
        combatData.playerEffects.push(existingEffect);
        if (existingEffect.prayer === 'Dispel') {
            if (combatData.computerEffects.length > 0) await computerDispel(combatData);
            combatData.playerEffects.pop();
        };
        combatData.playerInfluenceDescription = existingEffect.description;
    } else if (existingEffect.stacks) { // If the effect already exists and it stacks, update the endTick and intensity, for Damage and Buffs
        existingEffect.tick.end += 2;
        existingEffect.activeStacks += 1;
        existingEffect.effect = StatusEffect.updateEffectStack(existingEffect, combatData, combatData.player, combatData.weapons[0], combatData.playerAttributes, combatData.playerBlessing);
        combatData.playerInfluenceDescription = `${existingEffect.description} Stacked ${existingEffect.activeStacks} times.`;
        switch (existingEffect.prayer) {
            case 'Buff': {
                for (let key in existingEffect.effect) {
                    if (existingEffect.effect[key] && key !== 'dodge') {
                        let modifiedValue = combatData.weapons[0][key] + existingEffect.effect[key];
                        modifiedValue = roundToTwoDecimals(modifiedValue);
                        // console.log(modifiedValue, 'modifiedValue');
                        combatData.weapons[0][key] = modifiedValue;
                    } else {
                        let modifiedValue = combatData.weapons[0][key] - existingEffect.effect[key];
                        modifiedValue = roundToTwoDecimals(modifiedValue);
                        combatData.weapons[0][key] = modifiedValue;
                    };
                };
                for (let key in combatData.playerDefense) {
                    if (existingEffect.effect[key]) {
                        let modifiedValue = combatData.playerDefense[key] + existingEffect.effect[key];
                        modifiedValue = roundToTwoDecimals(modifiedValue);
                        combatData.playerDefense[key] = modifiedValue;
                    };
                };
                break;
            };
            case 'Damage': {
                existingEffect.effect.damage = Math.round(existingEffect.effect.damage * existingEffect.activeStacks);
                break;
            };
        };
    } else if (existingEffect.refreshes) {
        existingEffect.duration = Math.floor(combatData.player.level / 3 + 1) > 6 ? 6 : Math.floor(combatData.player.level / 3 + 1);
        existingEffect.tick.end += existingEffect.duration + 1;
        existingEffect.activeRefreshes += 1;
        combatData.playerInfluenceDescription = `${existingEffect.description} Refreshed ${existingEffect.activeRefreshes} time(s) for ${existingEffect.duration + 1} round(s).`;
    };
    combatData.playerBlessing = originalPrayer;
    return combatData;
};

const instantDamageSplitter = async (combatData, mastery) => {
    let damage = combatData.player[mastery] * 0.5 + combatData.player.level;
    combatData.realizedPlayerDamage = damage;
    combatData.newComputerHealth = combatData.currentComputerHealth - combatData.realizedPlayerDamage;
    combatData.currentComputerHealth = combatData.newComputerHealth; 
    combatData.computerDamaged = true;
    combatData.playerAction = 'invoke';
    combatData.playerActionDescription = `You attack ${combatData.computer.name}'s Caeren with your ${combatData.player.mastery}'s Invocation of ${combatData.weapons[0].influences[0]} for ${Math.round(damage)} Pure Damage.`;    
};

const instantActionSplitter = async (combatData) => {
    switch (combatData.player.mastery) {
        case 'Constitution':
            await prayerSplitter(combatData, 'Heal');
            await prayerSplitter(combatData, 'Buff');
            break;
        case 'Strength':
            await prayerSplitter(combatData, combatData.playerBlessing);
            await instantDamageSplitter(combatData, 'strength');
            break;
        case 'Agility':
            await prayerSplitter(combatData, combatData.playerBlessing);
            await instantDamageSplitter(combatData, 'agility');
            break;
        case 'Achre':
            await prayerSplitter(combatData, combatData.playerBlessing);
            await instantDamageSplitter(combatData, 'achre');
            break;
        case 'Caeren':
            await prayerSplitter(combatData, combatData.playerBlessing);
            await instantDamageSplitter(combatData, 'caeren');
            break;
        case 'Kyosir':
            await prayerSplitter(combatData, 'Damage');
            await prayerSplitter(combatData, 'Debuff');
            break;
        };

    await instantEffectCheck(combatData);
    combatData.actionData.push('invoke'); 
        
    if (combatData.newComputerHealth <= 0 || combatData.currentComputerHealth <= 0) {
        combatData.newComputerHealth = 0;
        combatData.playerWin = true;
    };
    if (combatData.playerWin) await statusEffectCheck(combatData);
    const changes = {
        'actionData': combatData.actionData,
        'deityData': combatData.deityData,
        'prayerData': combatData.prayerData,

        'weapons': combatData.weapons,
        'computerWeapons': combatData.computerWeapons,
        'playerEffects': combatData.playerEffects,
        'computerEffects': combatData.computerEffects,
        'playerDefense': combatData.playerDefense,
        'computerDefense': combatData.computerDefense,

        'newPlayerHealth': combatData.newPlayerHealth,
        'newComputerHealth': combatData.newComputerHealth,
        'currentPlayerHealth': combatData.currentPlayerHealth,
        'currentComputerHealth': combatData.currentComputerHealth,
        
        'realizedPlayerDamage': combatData.realizedPlayerDamage,
        'computerDamaged': combatData.computerDamaged,
        'playerWin': combatData.playerWin,
        'playerActionDescription': combatData.playerActionDescription,
        'playerInfluenceDescription': combatData.playerInfluenceDescription,
    };
    return changes;
};

const instantEffectCheck = async (combatData) => {
    combatData.playerEffects = combatData.playerEffects.filter(effect => {
        if (effect.tick.start !== combatData.combatRound || effect.enemyName !== combatData.computer.name) return true;
        const matchingWeapon = combatData.weapons.find(weapon => weapon.name === effect.weapon);
        const matchingWeaponIndex = combatData.weapons.indexOf(matchingWeapon);
            switch (effect.prayer) {
                case 'Buff': { // Buffs are applied on the first tick, and if found via existingEffect proc, they have already been enhanced by the stack.
                    if (effect.activeStacks === 1) {
                        for (let key in effect.effect) {
                            if (effect.effect[key] && key !== 'dodge') {
                                // combatData.weapons[matchingWeaponIndex][key] += effect.effect[key];
                                let modifiedValue = effect.effect[key] + combatData.weapons[matchingWeaponIndex][key];
                                modifiedValue = roundToTwoDecimals(modifiedValue);
                                combatData.weapons[matchingWeaponIndex][key] = modifiedValue;
                            } else {
                                // combatData.weapons[matchingWeaponIndex][key] -= effect.effect[key];
                                let modifiedValue = combatData.weapons[matchingWeaponIndex][key] - effect.effect[key];
                                modifiedValue = roundToTwoDecimals(modifiedValue);
                                combatData.weapons[matchingWeaponIndex][key] = modifiedValue;
                            };
                        };
                        for (let key in combatData.playerDefense) {
                            if (effect.effect[key]) {
                                combatData.playerDefense[key] += effect.effect[key];
                                combatData.playerDefense[key] = roundToTwoDecimals(combatData.playerDefense[key]);
                            }; 
                        };
                    };
                    break;
                };
                case 'Debuff': { // Debuffs are applied on the first tick, so they don't need to be reapplied every tick. Refreshes, Not Stackable. Will test for Balance
                    if (effect.activeRefreshes === 0) {
                        effect.debuffTarget = combatData.computerWeapons[0].name;
                        for (let key in effect.effect) {
                            if (effect.effect[key] && key !== 'dodge') {
                                combatData.computerWeapons[0][key] -= effect.effect[key];
                                combatData.computerWeapons[0][key] = roundToTwoDecimals(combatData.computerWeapons[0][key]);
                            } else {
                                combatData.computerWeapons[0][key] += effect.effect[key];
                                combatData.computerWeapons[0][key] = roundToTwoDecimals(combatData.computerWeapons[0][key]);
                            };
                        };
                        for (let key in combatData.computerDefense) { // Buff
                            if (effect.effect[key]) {
                                combatData.computerDefense[key] -= effect.effect[key];
                                combatData.computerDefense[key] = roundToTwoDecimals(combatData.computerDefense[key]);
                            };
                        };
                    };
                    break;
                };
                case 'Damage': { // Damage Ticks, 33% of the Damage/Tick (Round), Can Stack and experience the enhanced damage if procced this round, Testing if Stacking is Balanced
                    combatData.newComputerHealth -= effect.effect.damage * 0.33;
                    combatData.currentComputerHealth -= effect.effect.damage * 0.33;

                    if (combatData.currentComputerHealth < 0 || combatData.newComputerHealth < 0) {
                        combatData.newComputerHealth = 0;
                        combatData.currentComputerHealth = 0;
                        combatData.computerWin = false;
                        combatData.playerWin = true;
                    };
                    break;
                };
                case 'Heal': { // Heal Ticks, 33% of the Heal/Tick (Round), Can Refresh, Testing if Stacking is Balanced
                    combatData.newPlayerHealth += effect.effect.healing * 0.33;
                    combatData.currentPlayerHealth += effect.effect.healing * 0.33;

                    if (combatData.currentPlayerHealth > 0 || combatData.newPlayerHealth > 0) {
                        combatData.computerWin = false;
                    };
                    break;
                };
            };
        return true;
    });
};

const consumePrayerSplitter = async (combatData) => {
    console.log(combatData.prayerSacrifice, combatData.prayerSacrificeName, "Prayer Sacrifice"); 
    if (combatData.prayerSacrifice === '') combatData.prayerSacrifice = combatData.playerEffects[0].prayer;
    if (combatData.prayerSacrificeName === '') combatData.prayerSacrificeName = combatData.playerEffects[0].name;
    combatData.actionData.push('consume');
    combatData.prayerData.push(combatData.prayerSacrifice);

    combatData.playerEffects = combatData.playerEffects.filter(effect => {
        const matchingWeapon = combatData.weapons.find(weapon => weapon.name === effect.weapon);
        const matchingWeaponIndex = combatData.weapons.indexOf(matchingWeapon);
        const matchingDebuffTarget = combatData.computerWeapons.find(weapon => weapon.name === effect.debuffTarget);
        const matchingDebuffTargetIndex = combatData.computerWeapons.indexOf(matchingDebuffTarget);
        if (effect.prayer !== combatData.prayerSacrifice || effect.name !== combatData.prayerSacrificeName || effect.enemyName !== combatData.computer.name) return true;
        switch (combatData.prayerSacrifice) {
            case 'Heal':
                // console.log("Healing for :", effect.effect.healing * 0.165);
                combatData.newPlayerHealth += effect.effect.healing * 0.165;
                combatData.currentPlayerHealth += effect.effect.healing * 0.165;
                if (combatData.currentPlayerHealth > 0 || combatData.newPlayerHealth > 0) {
                    combatData.computerWin = false;
                };
                break;
            case 'Buff':
                combatData.newComputerHealth = combatData.currentComputerHealth - (combatData.realizedPlayerDamage * 0.5);
                combatData.currentComputerHealth = combatData.newComputerHealth; // Added to persist health totals?
            
                combatData.playerActionDescription = 
                    `${combatData.weapons[0].influences[0]}'s Tendrils serenade ${combatData.computer.name}, echoing ${Math.round(combatData.realizedPlayerDamage * 0.5)} more damage.`    
            
                if (combatData.newComputerHealth <= 0 || combatData.currentComputerHealth <= 0) {
                    combatData.newComputerHealth = 0;
                    combatData.playerWin = true;
                };
                for (let key in effect.effect) {
                    if (key in combatData.weapons[matchingWeaponIndex]) {
                        if (key !== 'dodge') {
                            combatData.weapons[matchingWeaponIndex][key] -= effect.effect[key] * effect.activeStacks;
                            combatData.weapons[matchingWeaponIndex][key] = roundToTwoDecimals(combatData.weapons[matchingWeaponIndex][key]);
                        } else {
                            combatData.weapons[matchingWeaponIndex][key] += effect.effect[key] * effect.activeStacks;
                            combatData.weapons[matchingWeaponIndex][key] = roundToTwoDecimals(combatData.weapons[matchingWeaponIndex][key]);
                        };
                    };
                    if (key in combatData.playerDefense) {
                        combatData.playerDefense[key] -= effect.effect[key] * effect.activeStacks;
                        combatData.playerDefense[key] = roundToTwoDecimals(combatData.playerDefense[key]);
                    };
                };
                break;
            case 'Damage':
                combatData.newComputerHealth -= effect.effect.damage * 0.165;
                combatData.currentComputerHealth -= effect.effect.damage * 0.165;
                if (combatData.newComputerHealth <= 0 || combatData.currentComputerHealth <= 0) {
                    combatData.newComputerHealth = 0;
                    combatData.playerWin = true;
                };

                break;
            case 'Debuff':
                combatData.newComputerHealth = combatData.currentComputerHealth - (combatData.realizedComputerDamage * 0.5);
                combatData.currentComputerHealth = combatData.newComputerHealth; // Added to persist health totals?
                combatData.playerActionDescription = 
                    `The Hush of ${combatData.weapons[0].influences[0]} wracks ${combatData.computer.name}, wearing for ${Math.round(combatData.realizedComputerDamage * 0.5)} more damage.`    
            
                if (combatData.newComputerHealth <= 0 || combatData.currentComputerHealth <= 0) {
                    combatData.newComputerHealth = 0;
                    combatData.playerWin = true;
                };

                for (let key in effect.effect) {
                    if (matchingDebuffTargetIndex === -1) return false;
                    if (key in combatData.computerWeapons[matchingDebuffTargetIndex]) {
                        if (key !== 'dodge') {
                            combatData.computerWeapons[matchingDebuffTargetIndex][key] += effect.effect[key] * effect.activeStacks;
                            combatData.computerWeapons[matchingDebuffTargetIndex][key] = roundToTwoDecimals(combatData.computerWeapons[matchingDebuffTargetIndex][key]);
                        } else {
                            combatData.computerWeapons[matchingDebuffTargetIndex][key] -= effect.effect[key] * effect.activeStacks;
                            combatData.computerWeapons[matchingDebuffTargetIndex][key] = roundToTwoDecimals(combatData.computerWeapons[matchingDebuffTargetIndex][key]);
                        };
                    };
                    if (key in combatData.computerDefense) {
                        combatData.computerDefense[key] += effect.effect[key] * effect.activeStacks;
                        combatData.computerDefense[key] = roundToTwoDecimals(combatData.computerDefense[key]);
                    };
                };
                break;
            default: break;
        };
        return false;
    });
    if (combatData.prayerSacrifice !== 'Heal') {
        if (combatData.realizedPlayerDamage > 0) {
            combatData.computerDamaged = true;
        };
    };
    combatData.playerAction = 'prayer';
    combatData.prayerSacrifice = '';
    combatData.prayerSacrificeName = '';
    combatData.action = '';

    if (combatData.playerWin === true) await statusEffectCheck(combatData);

    const changes = {
        'actionData': combatData.actionData,
        'prayerData': combatData.prayerData,

        'playerEffects': combatData.playerEffects,
        'computerEffects': combatData.computerEffects,
        'weapons': combatData.weapons,
        'computerWeapons': combatData.computerWeapons,
        'playerDefense': combatData.playerDefense,
        'computerDefense': combatData.computerDefense,

        'newPlayerHealth': combatData.newPlayerHealth,
        'currentPlayerHealth': combatData.currentPlayerHealth,
        'newComputerHealth': combatData.newComputerHealth,
        'currentComputerHealth': combatData.currentComputerHealth,

        'playerWin': combatData.playerWin,
        'playerActionDescription': combatData.playerActionDescription,
        'prayerSacrifice': combatData.prayerSacrifice,
        'prayerSacrificeName': combatData.prayerSacrificeName,
        
        'computerDamaged': combatData.computerDamaged,
        'realizedPlayerDamage': combatData.realizedPlayerDamage,
        'action': combatData.action,
        'playerAction': combatData.playerAction,
    };

    return changes;
};

const phaserEffectTickSplitter = async (data) => { 
    let { combatData, effect, effectTimer } = data;
    if (effect.playerName === combatData.player.name) { 
        switch (effect.prayer) { 
            case 'Damage': { // Damage Ticks, 33% of the Damage/Tick (Round), Can Stack and experience the enhanced damage if procced this round, Testing if Stacking is Balanced
                combatData.newComputerHealth -= effect.effect.damage * 0.33;
                combatData.currentComputerHealth -= effect.effect.damage * 0.33; 
                if (combatData.currentComputerHealth < 0 || combatData.newComputerHealth < 0) {
                    combatData.newComputerHealth = 0;
                    combatData.currentComputerHealth = 0;
                    combatData.computerWin = false;
                    combatData.playerWin = true;
                };
                if (combatData.combatTimer >= effect.endTime || effectTimer === 0) {
                    combatData.playerEffects = combatData.playerEffects.filter(playerEffect => playerEffect.id !== effect.id);
                };
                break;
            };
            case 'Heal': { // Heal Ticks, 33% of the Heal/Tick (Round), Can Refresh, Testing if Stacking is Balanced
                combatData.newPlayerHealth += effect.effect.healing * 0.33;
                combatData.currentPlayerHealth += effect.effect.healing * 0.33;
                if (combatData.currentPlayerHealth > 0 || combatData.newPlayerHealth > 0) {
                    combatData.computerWin = false;
                };
                if (combatData.combatTimer >= effect.endTime || effectTimer === 0) {
                    combatData.playerEffects = combatData.playerEffects.filter(playerEffect => playerEffect.id !== effect.id);
                };
                break;
            };
        };  
    } else if (effect.playerName === combatData.computer.name) {
        switch (effect.prayer) {
            case 'Damage': {
                combatData.newPlayerHealth -= effect.effect.damage * 0.33;
                combatData.currentPlayerHealth -= effect.effect.damage * 0.33;
                if (combatData.currentPlayerHealth < 0 || combatData.newPlayerHealth < 0) {
                    if (combatData.playerEffects.find(effect => effect.prayer === 'Denial')) {
                        combatData.newPlayerHealth = 1;
                        combatData.playerEffects = combatData.playerEffects = combatData.playerEffects.filter(effect => effect.prayer !== 'Denial');
                    } else {
                        combatData.newPlayerHealth = 0;
                        combatData.currentPlayerHealth = 0;
                        combatData.computerWin = true;
                        combatData.playerWin = false;
                    };
                };
                if (combatData.combatTimer >= effect.endTime || effectTimer === 0) {
                    combatData.computerEffects = combatData.computerEffects.filter(computerEffect => computerEffect.id !== effect.id);
                };
                break;
            };
            case 'Heal': {
                combatData.newComputerHealth += effect.effect.healing * 0.33;
                combatData.currentComputerHealth += effect.effect.healing * 0.33;
                if (combatData.currentComputerHealth > 0 || combatData.newComputerHealth > 0) {
                    combatData.playerWin = false;
                };
                if (combatData.combatTimer >= effect.endTime || effectTimer === 0) {
                    combatData.computerEffects = combatData.computerEffects.filter(computerEffect => computerEffect.id !== effect.id);
                };
                break;
            };
        };
    };

    if (combatData.playerWin === true || combatData.computerWin === true) await statusEffectCheck(combatData);

    const changes = {
        'actionData': combatData.actionData,
        'prayerData': combatData.prayerData,

        'playerEffects': combatData.playerEffects,
        'computerEffects': combatData.computerEffects,
        'weapons': combatData.weapons,
        'computerWeapons': combatData.computerWeapons,
        'playerDefense': combatData.playerDefense,
        'computerDefense': combatData.computerDefense,

        'newPlayerHealth': combatData.newPlayerHealth,
        'currentPlayerHealth': combatData.currentPlayerHealth,
        'newComputerHealth': combatData.newComputerHealth,
        'currentComputerHealth': combatData.currentComputerHealth,

        'playerWin': combatData.playerWin,
        'computerWin': combatData.computerWin,
    };
    return changes;
};

// ================================= CONTROLLER - SERVICE ===================================== \\

const actionCompiler = async (combatData) => {
    try {
        let res = await actionSplitter(combatData);
        if (res.realizedComputerDamage > 0) res.playerDamaged = true;
        if (res.realizedPlayerDamage > 0) res.computerDamaged = true;
        if (res.playerWin || res.computerWin) await statusEffectCheck(res);
        return res;
    } catch (err) {
        console.log(err, 'Error in the Action Compiler of Game Services');
        res.status(400).json({ err })
    };
};

const instantActionCompiler = async (combatData) => {
    try {
        const res = await instantActionSplitter(combatData);
        return res;
    } catch (err) {
        console.log(err, 'Error in the Instant Action Compiler of Game Services');
        res.status(400).json({ err })
    };
};

const consumePrayer = async (combatData) => {
    try {
        const res = await consumePrayerSplitter(combatData);
        return res;
    } catch (err) {
        console.log(err, 'Error in the Consume Prayer of Game Services');
        res.status(400).json({ err })
    };
};

const phaserActionCompiler = async (combatData) => {
    try {
        const res = await phaserActionSplitter(combatData);
        return res;
    } catch (err) {
        console.log(err, 'Error in the Phaser Action Compiler of Game Services');
        res.status(400).json({ err });
    };
};

const phaserEffectTick = async (data) => {
    try {
        const res = await phaserEffectTickSplitter(data);
        return res;
    } catch (err) {
        console.log(err, 'Error in the Phaser Effect Tick of Game Services');
        res.status(400).json({ err });
    };
};

module.exports = {
    actionCompiler,
    instantActionCompiler,
    consumePrayer,
    phaserActionCompiler,
    phaserEffectTick
};