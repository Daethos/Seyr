const StatusEffect = require('./faithServices.js');

function roundToTwoDecimals(num) {
    const roundedNum = Number(num.toFixed(2));
    console.log(num, roundedNum, "num, roundedNum");
    if (roundedNum.toString().match(/\.\d{3,}$/)) {
        return parseFloat(roundedNum);
    };
    return roundedNum;
};

const statusEffectCheck = async (combatData) => {
    combatData.playerEffects = combatData.playerEffects.filter(effect => {
        const matchingWeapon = combatData.weapons.find(weapon => weapon.name === effect.weapon);
        const matchingWeaponIndex = combatData.weapons.indexOf(matchingWeapon);
        const matchingDebuffTarget = combatData.enemy_weapons.find(weapon => weapon.name === effect.debuffTarget);
        const matchingDebuffTargetIndex = combatData.enemy_weapons.indexOf(matchingDebuffTarget);
        if (effect.tick.end === combatData.combatRound || combatData.player_win === true || combatData.enemy_win === true) { // The Effect Expires
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
                    if (key in combatData.player_defense) {
                        combatData.player_defense[key] -= effect.effect[key] * effect.activeStacks;
                        combatData.player_defense[key] = roundToTwoDecimals(combatData.player_defense[key]);
                    };
                };
            }
            if (effect.prayer === 'Debuff') { // Revereses the Debuff Effect to the proper weapon
                for (let key in effect.effect) {
                    if (key in combatData.enemy_weapons[matchingDebuffTargetIndex]) {
                        if (key !== 'dodge') {
                            combatData.enemy_weapons[matchingDebuffTargetIndex][key] += effect.effect[key] * effect.activeStacks;
                            combatData.enemy_weapons[matchingDebuffTargetIndex][key] = roundToTwoDecimals(combatData.enemy_weapons[matchingDebuffTargetIndex][key]);
                        } else {
                            combatData.enemy_weapons[matchingDebuffTargetIndex][key] -= effect.effect[key] * effect.activeStacks;
                            combatData.enemy_weapons[matchingDebuffTargetIndex][key] = roundToTwoDecimals(combatData.enemy_weapons[matchingDebuffTargetIndex][key]);
                        };
                    };
                    if (key in combatData.enemy_defense) {
                        combatData.enemy_defense[key] += effect.effect[key] * effect.activeStacks;
                        combatData.enemy_defense[key] = roundToTwoDecimals(combatData.enemy_defense[key]);
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
                                combatData.weapons[matchingWeaponIndex][key] += effect.effect[key];
                                combatData.weapons[matchingWeaponIndex][key] = roundToTwoDecimals(combatData.weapons[matchingWeaponIndex][key]);
                            } else {
                                combatData.weapons[matchingWeaponIndex][key] -= effect.effect[key];
                                combatData.weapons[matchingWeaponIndex][key] = roundToTwoDecimals(combatData.weapons[matchingWeaponIndex][key]);
                            };
                        };
                        for (let key in combatData.player_defense) {
                            if (effect.effect[key]) {
                                combatData.player_defense[key] += effect.effect[key];
                                combatData.player_defense[key] = roundToTwoDecimals(combatData.player_defense[key]);
                            }; 
                        };
                    };
                    break;
                };
                case 'Debuff': { // Debuffs are applied on the first tick, so they don't need to be reapplied every tick. Refreshes, Not Stackable. Will test for Balance
                    if (effect.activeRefreshes === 0 && effect.tick.start === combatData.combatRound) {
                        effect.debuffTarget = combatData.enemy_weapons[0].name;
                        for (let key in effect.effect) {
                            if (effect.effect[key] && key !== 'dodge') {
                                combatData.enemy_weapons[0][key] -= effect.effect[key];
                                combatData.enemy_weapons[0][key] = roundToTwoDecimals(combatData.enemy_weapons[0][key]);
                            } else {
                                combatData.enemy_weapons[0][key] += effect.effect[key];
                                combatData.enemy_weapons[0][key] = roundToTwoDecimals(combatData.enemy_weapons[0][key]);
                            };
                        };
                        for (let key in combatData.enemy_defense) { // Buff
                            if (effect.effect[key]) {
                                combatData.enemy_defense[key] -= effect.effect[key];
                                combatData.enemy_defense[key] = roundToTwoDecimals(combatData.enemy_defense[key]);
                            };
                        };
                    };
                    break;
                };
                case 'Damage': { // Damage Ticks, 33% of the Damage/Tick (Round), Can Stack and experience the enhanced damage if procced this round, Testing if Stacking is Balanced
                    combatData.new_enemy_health -= effect.effect.damage * 0.33;
                    combatData.current_enemy_health -= effect.effect.damage * 0.33;

                    if (combatData.current_enemy_health < 0 || combatData.new_enemy_health < 0) {
                        combatData.new_enemy_health = 0;
                        combatData.current_enemy_health = 0;
                        combatData.enemy_win = false;
                        combatData.player_win = true;
                    };
                    break;
                };
                case 'Heal': { // Heal Ticks, 33% of the Heal/Tick (Round), Can Refresh, Testing if Stacking is Balanced
                    combatData.new_player_health += effect.effect.healing * 0.33;
                    combatData.current_player_health += effect.effect.healing * 0.33;

                    if (combatData.current_player_health > 0 || combatData.new_player_health > 0) {
                        combatData.enemy_win = false;
                    };
                    break;
                };
            };
            return true;
        };
    });

    combatData.enemyEffects = combatData.enemyEffects.filter(effect => {
        const matchingWeapon = combatData.enemy_weapons.find(weapon => weapon.name === effect.weapon);
        const matchingWeaponIndex = combatData.enemy_weapons.indexOf(matchingWeapon);
        const matchingDebuffTarget = combatData.weapons.find(weapon => weapon.name === effect.debuffTarget);
        const matchingDebuffTargetIndex = combatData.weapons.indexOf(matchingDebuffTarget);
        if (effect.tick.end === combatData.combatRound || combatData.player_win === true || combatData.enemy_win === true) { // The Effect Expires
            if (effect.prayer === 'Buff') { // Reverses the Buff Effect to the magnitude of the stack to the proper weapon
                for (let key in effect.effect) {
                    if (effect.effect[key] && key !== 'dodge') {
                        combatData.enemy_weapons[matchingWeaponIndex][key] -= effect.effect[key] * effect.activeStacks;
                        combatData.enemy_weapons[matchingWeaponIndex][key] = roundToTwoDecimals(combatData.enemy_weapons[matchingWeaponIndex][key]);
                    } else {
                        combatData.enemy_weapons[matchingWeaponIndex][key] += effect.effect[key] * effect.activeStacks;
                        combatData.enemy_weapons[matchingWeaponIndex][key] = roundToTwoDecimals(combatData.enemy_weapons[matchingWeaponIndex][key]);
                    };
                };
                for (let key in combatData.enemy_defense) {
                    if (effect.effect[key]) {
                        combatData.enemy_defense[key] -= effect.effect[key] * effect.activeStacks;
                        combatData.enemy_defense[key] = roundToTwoDecimals(combatData.enemy_defense[key]);
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
                for (let key in combatData.player_defense) {
                    if (effect.effect[key]) {
                        combatData.player_defense[key] += effect.effect[key];
                        combatData.player_defense[key] = roundToTwoDecimals(combatData.player_defense[key]);
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
                                combatData.enemy_weapons[matchingWeaponIndex][key] += effect.effect[key];
                                combatData.enemy_weapons[matchingWeaponIndex][key] = roundToTwoDecimals(combatData.enemy_weapons[matchingWeaponIndex][key]);
                            } else {
                                combatData.enemy_weapons[matchingWeaponIndex][key] -= effect.effect[key];
                                combatData.enemy_weapons[matchingWeaponIndex][key] = roundToTwoDecimals(combatData.enemy_weapons[matchingWeaponIndex][key]);
                            };
                        };
                        for (let key in combatData.enemy_defense) {
                            if (effect.effect[key]) {
                                combatData.enemy_defense[key] += effect.effect[key];
                                combatData.enemy_defense[key] = roundToTwoDecimals(combatData.enemy_defense[key]);
                            };
                        };
                    };
                    break;
                };
                case 'Debuff': { // Debuffs are applied on the first tick, so they don't need to be reapplied every tick. Refreshes, Not Stackable. Will test for Balance
                    if (effect.activeRefreshes === 0 && effect.tick.start === combatData.combatRound) {
                        effect.debuffTarget = combatData.weapons[0].name;
                        for (let key in effect.effect) {
                            if (effect.effect[key] && key !== 'dodge') {
                                combatData.weapons[0][key] -= effect.effect[key];
                                combatData.weapons[0][key] = roundToTwoDecimals(combatData.weapons[0][key]);
                            } else {
                                combatData.weapons[0][key] += effect.effect[key];
                                combatData.weapons[0][key] = roundToTwoDecimals(combatData.weapons[0][key]);
                            };
                        };
                        for (let key in combatData.player_defense) { // Buff
                            if (effect.effect[key]) {
                                combatData.player_defense[key] -= effect.effect[key];
                                combatData.player_defense[key] = roundToTwoDecimals(combatData.player_defense[key]);
                            };
                        };
                    };
                    break;
                };
                case 'Damage': { // Damage Ticks, 33% of the Damage/Tick (Round), Can Stack and experience the enhanced damage if procced this round, Testing if Stacking is Balanced
                    combatData.new_player_health -= effect.effect.damage * 0.33;
                    combatData.current_player_health -= effect.effect.damage * 0.33;

                    if (combatData.current_player_health < 0 || combatData.new_player_health < 0) {
                        combatData.new_player_health = 0;
                        combatData.current_player_health = 0;
                        combatData.player_win = false;
                        combatData.enemy_win = true;
                    };
                    break;
                };
                case 'Heal': { // Heal Ticks, 33% of the Heal/Tick (Round), Can Refresh, Testing if Stacking is Balanced
                    combatData.new_enemy_health += effect.effect.healing * 0.33;
                    combatData.current_enemy_health += effect.effect.healing * 0.33;

                    if (combatData.current_enemy_health > 0 || combatData.new_enemy_health > 0) {
                        combatData.player_win = false;
                    };
                    break;
                };
            };
        };
        return true;
    });

    if (combatData.new_player_health > 0) {
        combatData.enemy_win = false;
    };
    if (combatData.new_enemy_health > 0) {
        combatData.player_win = false;
    };
    return combatData;
};

const faithFinder = async (combatData, player_action, enemy_action) => { // The influence will add a chance to have a special effect occur
    if (combatData.player_win === true || combatData.enemy_win === true) {
        return
    };
    
    let faith_number = Math.floor(Math.random() * 101);
    let faith_number_two = Math.floor(Math.random() * 101);
    let faith_check = Math.floor(Math.random() * 101);
    let enemy_faith_number = Math.floor(Math.random() * 101);
    let enemy_faith_number_two = Math.floor(Math.random() * 101);
    let faith_mod_one = 0;
    let faith_mod_two = 0;
    let enemy_faith_mod_one = 0;
    let enemy_faith_mod_two = 0;

    combatData.weapons[0].critical_chance = Number(combatData.weapons[0].critical_chance);
    combatData.weapons[0].critical_damage = Number(combatData.weapons[0].critical_damage);

    combatData.weapons[1].critical_chance = Number(combatData.weapons[1].critical_chance);
    combatData.weapons[1].critical_damage = Number(combatData.weapons[1].critical_damage);

    combatData.enemy_weapons[0].critical_chance = Number(combatData.enemy_weapons[0].critical_chance);
    combatData.enemy_weapons[0].critical_damage = Number(combatData.enemy_weapons[0].critical_damage);

    combatData.enemy_weapons[1].critical_chance = Number(combatData.enemy_weapons[1].critical_chance);
    combatData.enemy_weapons[1].critical_damage = Number(combatData.enemy_weapons[1].critical_damage);

    if (combatData.player.faith === 'devoted' && combatData.weapons[0].influences[0] === 'Daethos') {
        faith_number += 5;
        faith_number_two += 5;
        faith_mod_one += 5;
        faith_mod_two += 5;
    };
    if (combatData.player.faith === 'adherent' && combatData.weapons[0].influences[0] !== 'Daethos') {
        faith_number += 5;
        faith_number_two += 5;
        faith_mod_one += 5;
        faith_mod_two += 5;
    };

    switch (combatData.weapons[0].rarity) {
        case 'Common': {
            faith_number += 1;
            faith_mod_one += 1;
            break;
        };
        case 'Uncommon': {
            faith_number += 2;
            faith_mod_one += 2;
            break;
        };
        case 'Rare': {
            faith_number += 3;
            faith_mod_one += 3;
            break;
        };
        case 'Epic': {
            faith_number += 5;
            faith_mod_one += 5;
            break;
        };
        case 'Legendary': {
            faith_number += 10;
            faith_mod_one += 10;
        };
        default: {
            faith_number += 0;
            faith_mod_one += 0;
            break;
        };
    };
    switch (combatData.weapons[1].rarity) {
        case 'Common': {
            faith_number_two += 1;
            faith_mod_two += 1;
            break;
        };
        case 'Uncommon': {
            faith_number_two += 2;
            faith_mod_two += 2;
            break;
        };
        case 'Rare': {
            faith_number_two += 3;
            faith_mod_two += 3;
            break;
        };
        case 'Epic': {
            faith_number_two += 5;
            faith_mod_two += 5;
            break;
        };
        case 'Legendary': {
            faith_number_two += 10;
            faith_mod_two += 10;
        };
        default: {
            faith_number_two += 0;
            faith_mod_two += 0;
            break;
        };
    };
    switch (combatData.enemy_weapons[0].rarity) {
        case 'Common': {
            enemy_faith_number += 1;
            enemy_faith_mod_one += 1;
            break;
        };
        case 'Uncommon': {
            enemy_faith_number += 2;
            enemy_faith_mod_one += 2;
            break;
        };
        case 'Rare': {
            enemy_faith_number += 3;
            enemy_faith_mod_one += 3;
            break;
        };
        case 'Epic': {
            enemy_faith_number += 5;
            enemy_faith_mod_one += 5;
            break;
        };
        case 'Legendary': {
            enemy_faith_number += 10;
            enemy_faith_mod_one += 10;
        };
        default: {
            enemy_faith_number += 0;
            enemy_faith_mod_one += 0;
            break;
        };
    };
    switch (combatData.enemy_weapons[1].rarity) {
        case 'Common': {
            enemy_faith_number_two += 1;
            enemy_faith_mod_two += 1;
            break;
        };
        case 'Uncommon': {
            enemy_faith_number_two += 2;
            enemy_faith_mod_two += 2;
            break;
        };
        case 'Rare': {
            enemy_faith_number_two += 3;
            enemy_faith_mod_two += 3;
            break;
        };
        case 'Epic': {
            enemy_faith_number_two += 5;
            enemy_faith_mod_two += 5;
            break;
        };
        case 'Legendary': {
            enemy_faith_number_two += 10;
            enemy_faith_mod_two += 10;
        };
        default: {
            enemy_faith_number_two += 0;
            enemy_faith_mod_two += 0;
            break;
        };
    };

    if (combatData.weapons[0].influences[0] === combatData.player.amulet.influences[0]) {
        if (combatData.player.amulet.rarity === 'Common') {
            faith_number += 1;
            faith_mod_one += 1;
        } else if (combatData.player.amulet.rarity === 'Uncommon') {
            faith_number += 2;
            faith_mod_one += 2;
        } else if (combatData.player.amulet.rarity === 'Rare') {
            faith_number += 3;
            faith_mod_one += 3;
        } else if (combatData.player.amulet.rarity === 'Epic') {
            faith_number += 5;
            faith_mod_one +=5;
        };
    };
    if (combatData.weapons[1].influences[0] === combatData.player.amulet.influences[0]) {
        if (combatData.player.amulet.rarity === 'Common') {
            faith_number_two += 1;
            faith_mod_two += 1;
        } else if (combatData.player.amulet.rarity === 'Uncommon') {
            faith_number_two += 2;
            faith_mod_two += 2;
        } else if (combatData.player.amulet.rarity === 'Rare') {
            faith_number_two += 3;
            faith_mod_two += 3;
        } else if (combatData.player.amulet.rarity === 'Epic') {
            faith_number_two += 5;
            faith_mod_two +=5;
        }
    }
    if (combatData.enemy_weapons[0].influences[0] === combatData.enemy.amulet.influences[0]) {
        if (combatData.enemy.amulet.rarity === 'Common') {
            enemy_faith_number += 1;
            enemy_faith_mod_one += 1;
        } else if (combatData.enemy.amulet.rarity === 'Uncommon') {
            enemy_faith_number += 2;
            enemy_faith_mod_one += 2;
        } else if (combatData.enemy.amulet.rarity === 'Rare') {
            enemy_faith_number += 3;
            enemy_faith_mod_one += 3;
        } else if (combatData.enemy.amulet.rarity === 'Epic') {
            enemy_faith_number += 5;
            enemy_faith_mod_one +=5;
        };
    };
    if (combatData.enemy_weapons[1].influences[0] === combatData.enemy.amulet.influences[0]) {
        if (combatData.enemy.amulet.rarity === 'Common') {
            enemy_faith_number_two += 1;
            enemy_faith_mod_two += 1;
        } else if (combatData.enemy.amulet.rarity === 'Uncommon') {
            enemy_faith_number_two += 2;
            enemy_faith_mod_two += 2;
        } else if (combatData.enemy.amulet.rarity === 'Rare') {
            enemy_faith_number_two += 3;
            enemy_faith_mod_two += 3;
        } else if (combatData.enemy.amulet.rarity === 'Epic') {
            enemy_faith_number_two += 5;
            enemy_faith_mod_two +=5;
        };
    };
    if (combatData.weapons[0].influences[0] === combatData.player.trinket.influences[0]) {
        if (combatData.player.amulet.rarity === 'Common') {
            faith_number += 1;
            faith_mod_one += 1;
        } else if (combatData.player.amulet.rarity === 'Uncommon') {
            faith_number += 2;
            faith_mod_one += 2;
        } else if (combatData.player.amulet.rarity === 'Rare') {
            faith_number += 3;
            faith_mod_one += 3;
        } else if (combatData.player.amulet.rarity === 'Epic') {
            faith_number += 5;
            faith_mod_one +=5;
        };
    };
    if (combatData.weapons[1].influences[0] === combatData.player.trinket.influences[0]) {
        if (combatData.player.amulet.rarity === 'Common') {
            faith_number_two += 1;
            faith_mod_two += 1;
        } else if (combatData.player.amulet.rarity === 'Uncommon') {
            faith_number_two += 2;
            faith_mod_two += 2;
        } else if (combatData.player.amulet.rarity === 'Rare') {
            faith_number_two += 3;
            faith_mod_two += 3;
        } else if (combatData.player.amulet.rarity === 'Epic') {
            faith_number_two += 5;
            faith_mod_two +=5;
        };
    };
    if (combatData.enemy_weapons[0].influences[0] === combatData.enemy.trinket.influences[0]) {
        if (combatData.enemy.amulet.rarity === 'Common') {
            enemy_faith_number += 1;
            enemy_faith_mod_one += 1;
        } else if (combatData.enemy.amulet.rarity === 'Uncommon') {
            enemy_faith_number += 2;
            enemy_faith_mod_one += 2;
        } else if (combatData.enemy.amulet.rarity === 'Rare') {
            enemy_faith_number += 3;
            enemy_faith_mod_one += 3;
        } else if (combatData.enemy.amulet.rarity === 'Epic') {
            enemy_faith_number += 5;
            enemy_faith_mod_one +=5;
        };
    };
    if (combatData.enemy_weapons[1].influences[0] === combatData.enemy.trinket.influences[0]) {
        if (combatData.enemy.amulet.rarity === 'Common') {
            enemy_faith_number_two += 1;
            enemy_faith_mod_two += 1;
        } else if (combatData.enemy.amulet.rarity === 'Uncommon') {
            enemy_faith_number_two += 2;
            enemy_faith_mod_two += 2;
        } else if (combatData.enemy.amulet.rarity === 'Rare') {
            enemy_faith_number_two += 3;
            enemy_faith_mod_two += 3;
        } else if (combatData.enemy.amulet.rarity === 'Epic') {
            enemy_faith_number_two += 5;
            enemy_faith_mod_two +=5;
        };
    };


    if (combatData.enemy.faith === 'devoted' && combatData.enemy_weapons[0].influences[0] === 'Daethos') {
        enemy_faith_number += 5;
        enemy_faith_number_two += 5;
        enemy_faith_mod_one += 5;
        enemy_faith_mod_two += 5;
    };
    if (combatData.enemy.faith === 'adherent' && combatData.enemy_weapons[0].influences[0] !== 'Daethos') {
        enemy_faith_number += 5;
        enemy_faith_number_two += 5;
        enemy_faith_mod_one += 5;
        enemy_faith_mod_two += 5;
    };

    if (faith_number > 90) {
        combatData.religious_success = true;
        let existingEffect = combatData.playerEffects.find(effect => effect.name === `Gift of ${combatData.weapons[0].influences[0]}` && effect.prayer === combatData.playerBlessing);   
        if (!existingEffect) {
            existingEffect = new StatusEffect(combatData, combatData.player, combatData.enemy, combatData.weapons[0], combatData.player_attributes, combatData.playerBlessing);
            combatData.playerEffects.push(existingEffect);
            combatData.player_influence_description = existingEffect.description;
        } else if (existingEffect.stacks) { // If the effect already exists and it stacks, update the endTick and intensity, for Damage and Buffs
            existingEffect.tick.end += 2;
            existingEffect.activeStacks += 1;
            existingEffect.effect = StatusEffect.updateEffectStack(existingEffect, combatData, combatData.player, combatData.weapons[0], combatData.player_attributes, combatData.playerBlessing);
            combatData.player_influence_description = `${existingEffect.description} Stacked ${existingEffect.activeStacks} times.`;
            switch (existingEffect.prayer) {
                case 'Buff': {
                    for (let key in existingEffect.effect) {
                        if (existingEffect.effect[key] && key !== 'dodge') {
                            combatData.weapons[0][key] += existingEffect.effect[key];
                            combatData.weapons[0][key] = roundToTwoDecimals(combatData.weapons[0][key]);
                        } else {
                            combatData.weapons[0][key] -= existingEffect.effect[key];
                            combatData.weapons[0][key] = roundToTwoDecimals(combatData.weapons[0][key]);
                        };
                    };
                    for (let key in combatData.player_defense) {
                        if (existingEffect.effect[key]) {
                            combatData.player_defense[key] += existingEffect.effect[key];
                            combatData.player_defense[key] = roundToTwoDecimals(combatData.player_defense[key]);
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
            combatData.player_influence_description = `${existingEffect.description} Refreshed ${existingEffect.activeRefreshes} time(s) for ${existingEffect.duration + 1} round(s).`;
        };
    };
    if (combatData.dual_wielding === true) {
        if (faith_number_two > 90) {
            combatData.religious_success = true;
            let existingEffect = combatData.playerEffects.find(effect => effect.name === `Gift of ${combatData.weapons[1].influences[0]}` && effect.prayer === combatData.playerBlessing);   
            if (!existingEffect) {
                existingEffect = new StatusEffect(combatData, combatData.player, combatData.enemy, combatData.weapons[1], combatData.player_attributes, combatData.playerBlessing);
                combatData.playerEffects.push(existingEffect);
                combatData.player_influence_description_two = existingEffect.description;
            } else if (existingEffect.stacks) { // If the effect already exists and it stacks, update the endTick and intensity, for Damage and Buffs
                existingEffect.tick.end += 2;
                existingEffect.activeStacks += 1;
                existingEffect.effect = StatusEffect.updateEffectStack(existingEffect, combatData, combatData.player, combatData.weapons[1], combatData.player_attributes, combatData.playerBlessing);
                combatData.player_influence_description_two = `${existingEffect.description} Stacked ${existingEffect.activeStacks} times.`;
                switch (existingEffect.prayer) {
                    case 'Buff': {
                        for (let key in existingEffect.effect) {
                            if (existingEffect.effect[key] && key !== 'dodge') {
                                combatData.weapons[1][key] += existingEffect.effect[key];
                                combatData.weapons[1][key] = roundToTwoDecimals(combatData.weapons[1][key]);
                            } else {
                                combatData.weapons[1][key] -= existingEffect.effect[key];
                                combatData.weapons[1][key] = roundToTwoDecimals(combatData.weapons[1][key]);
                            };
                        };
                        for (let key in combatData.player_defense) {
                            if (existingEffect.effect[key]) {
                                combatData.player_defense[key] += existingEffect.effect[key];
                                combatData.player_defense[key] = roundToTwoDecimals(combatData.player_defense[key]);
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
                combatData.player_influence_description_two = `${existingEffect.description} Refreshed ${existingEffect.activeRefreshes} time(s) for ${existingEffect.duration + 1} round(s).`;
            };
        };
    };
    if (enemy_faith_number > 90) {
        combatData.enemy_religious_success = true;
        let existingEffect = combatData.enemyEffects.find(effect => effect.name === `Gift of ${combatData.enemy_weapons[0].influences[0]}` && effect.prayer === combatData.enemyBlessing);   
        if (!existingEffect) {
            existingEffect = new StatusEffect(combatData, combatData.enemy, combatData.player, combatData.enemy_weapons[0], combatData.enemy_attributes, combatData.enemyBlessing);
            combatData.enemyEffects.push(existingEffect);
            combatData.enemy_influence_description = existingEffect.description;
        } else if (existingEffect.stacks) { // If the effect already exists and it stacks, update the endTick and intensity, for Damage and Buffs
            existingEffect.tick.end += 2;
            existingEffect.activeStacks += 1;
            existingEffect.effect = StatusEffect.updateEffectStack(existingEffect, combatData, combatData.enemy, combatData.enemy_weapons[0], combatData.enemy_attributes, combatData.enemyBlessing);
            combatData.enemy_influence_description = `${existingEffect.description} Stacked ${existingEffect.activeStacks} times.`;
            switch (existingEffect.prayer) {
                case 'Buff': {
                    for (let key in existingEffect.effect) {
                        if (existingEffect.effect[key] && key !== 'dodge') {
                            combatData.enemy_weapons[0][key] += existingEffect.effect[key];
                        } else {
                            combatData.enemy_weapons[0][key] -= existingEffect.effect[key];
                        };
                        combatData.enemy_weapons[0][key] = roundToTwoDecimals(combatData.enemy_weapons[0][key]);
                    };
                    for (let key in combatData.enemy_defense) {
                        if (existingEffect.effect[key]) {
                            combatData.enemy_defense[key] += existingEffect.effect[key];
                            combatData.enemy_defense[key] = roundToTwoDecimals(combatData.enemy_defense[key]);
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
            existingEffect.duration = Math.floor(combatData.enemy.level / 3 + 1) > 6 ? 6 : Math.floor(combatData.enemy.level / 3 + 1);
            existingEffect.tick.end += existingEffect.duration + 1;
            existingEffect.activeRefreshes += 1;
            combatData.enemy_influence_description = `${existingEffect.description} Refreshed ${existingEffect.activeRefreshes} time(s) for ${existingEffect.duration + 1} round(s).`;
        };
    };
    if (combatData.enemy_dual_wielding === true) {
        if (enemy_faith_number_two > 90) {
            combatData.enemy_religious_success = true;
            let existingEffect = combatData.enemyEffects.find(effect => effect.name === `Gift of ${combatData.enemy_weapons[1].influences[0]}` && effect.prayer === combatData.enemyBlessing);   
            if (!existingEffect) {
                existingEffect = new StatusEffect(combatData, combatData.enemy, combatData.player, combatData.enemy_weapons[1], combatData.enemy_attributes, combatData.enemyBlessing);
                combatData.enemyEffects.push(existingEffect);
                combatData.enemy_influence_description_two = existingEffect.description;
            } else if (existingEffect.stacks) { // If the effect already exists and it stacks, update the endTick and intensity, for Damage and Buffs
                existingEffect.tick.end += 2;
                existingEffect.activeStacks += 1;
                existingEffect.effect = StatusEffect.updateEffectStack(existingEffect, combatData, combatData.enemy, combatData.enemy_weapons[1], combatData.enemy_attributes, combatData.enemyBlessing);
                combatData.enemy_influence_description_two = `${existingEffect.description} Stacked ${existingEffect.activeStacks} times.`;
                switch (existingEffect.prayer) {
                    case 'Buff': {
                        for (let key in existingEffect.effect) {
                            if (existingEffect.effect[key] && key !== 'dodge') {
                                combatData.enemy_weapons[1][key] += existingEffect.effect[key];
                            } else {
                                combatData.enemy_weapons[1][key] -= existingEffect.effect[key];
                            };
                            combatData.enemy_weapons[1][key] = roundToTwoDecimals(combatData.enemy_weapons[1][key]);
                        };
                        for (let key in combatData.enemy_defense) {
                            if (existingEffect.effect[key]) {
                                combatData.enemy_defense[key] += existingEffect.effect[key];
                                combatData.enemy_defense[key] = roundToTwoDecimals(combatData.enemy_defense[key]);
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
                existingEffect.duration = Math.floor(combatData.enemy.level / 3 + 1) > 6 ? 6 : Math.floor(combatData.enemy.level / 3 + 1);
                existingEffect.tick.end += existingEffect.duration + 1;
                existingEffect.activeRefreshes += 1;
                combatData.enemy_influence_description_two = `${existingEffect.description} Refreshed ${existingEffect.activeRefreshes} time(s) for ${existingEffect.duration + 1} round(s).`;
            };
        };
    };

    return combatData;
};

// ================================= enemy COMPILER FUNCTIONS ================================== \\

const enemyActionCompiler = async (newData, player_action, enemy_action, enemy_counter) => {

    if (newData.sessionRound > 50) {
        newData.sessionRound = 0;
        newData.attack_weight = 0;
        newData.counter_weight = 0;
        newData.dodge_weight = 0;
        newData.posture_weight = 0;
        newData.roll_weight = 0;
        newData.counter_attack_weight = 0;
        newData.counter_counter_weight = 0;
        newData.counter_dodge_weight = 0;
        newData.counter_posture_weight = 0;
        newData.counter_roll_weight = 0;
    };
    
    const enemyActions = {
        attack: 50 + newData.attack_weight,
        counter: 10 + newData.counter_weight,
        dodge: 10 + newData.dodge_weight,
        posture: 15 + newData.posture_weight,
        roll: 15 + newData.roll_weight,
        counter_attack: 20 + newData.counter_attack_weight,
        counter_counter: 20 + newData.counter_counter_weight,
        counter_dodge: 20 + newData.counter_dodge_weight,
        counter_posture: 20 + newData.counter_posture_weight,
        counter_roll: 20 + newData.counter_roll_weight,
        roll_rating: newData.enemy_weapons[0].roll,
        armor_rating: (newData.enemy_defense.physicalPosture + newData.enemy_defense.magicalPosture)  /  4,
    };

    if (player_action === 'attack') { 
        if (enemyActions.roll_rating > enemyActions.armor_rating) {
            newData.roll_weight += 1.5;
            newData.posture_weight += 0.5;
        } else {
            newData.posture_weight += 1.5;
            newData.roll_weight += 0.5;
        };
        // newData.roll_weight += 1;
        // newData.posture_weight += 1;
        newData.counter_weight += 1;
        newData.attack_weight -= 3;
        newData.counter_attack_weight += 4;
        newData.counter_counter_weight -= 1;
        newData.counter_dodge_weight -= 1;
        newData.counter_posture_weight -= 1;
        newData.counter_roll_weight -= 1;
    }
    if (player_action === 'counter') { 
        newData.counter_weight += 3;
        // newData.dodge_weight += 2;
        newData.attack_weight -= 1;
        newData.posture_weight -= 1;
        newData.roll_weight -= 1;
        newData.counter_counter_weight += 2;
        newData.counter_attack_weight -= 1;
        newData.counter_dodge_weight -= 1;
    };
    if (player_action === 'dodge') { 
        // newData.counter_weight += 2;
        // newData.dodge_weight -= 2;
        newData.counter_dodge_weight += 4;
        newData.counter_attack_weight -= 1;
        newData.counter_counter_weight -= 1;
        newData.counter_posture_weight -= 1;
        newData.counter_roll_weight -= 1;
    };
    if (player_action === 'posture') { 
        newData.attack_weight += 2;  
        newData.posture_weight -= 3;
        newData.counter_weight += 1;
        newData.counter_posture_weight += 3;
        newData.counter_roll_weight -= 2;
        newData.counter_attack_weight -= 1;
    };

    if (player_action === 'roll') { 
        newData.attack_weight += 2;  
        newData.roll_weight -= 3;
        newData.counter_weight += 1;
        newData.counter_roll_weight += 3;
        newData.counter_posture_weight -= 2;
        newData.counter_attack_weight -= 1;
    };

    let actionNumber = Math.floor(Math.random() * 101);
    if (actionNumber > (100 - enemyActions.attack)) {
        enemy_action = 'attack';
    } else if (actionNumber > (100 - enemyActions.attack - enemyActions.counter)) {
        enemy_action = 'counter';
    } else if (actionNumber > (100 - enemyActions.attack - enemyActions.counter - enemyActions.dodge)) {
        enemy_action = 'dodge';
    } else if (actionNumber > (100 - enemyActions.attack - enemyActions.counter - enemyActions.dodge - enemyActions.posture)) {
        enemy_action = 'posture';
    } else {
        enemy_action = 'roll';
    };

    if (enemy_action === 'counter') {
        let counterNumber = Math.floor(Math.random() * 101);
        if (counterNumber > (100 - enemyActions.counter_attack)) {
            enemy_counter = 'attack';
        } else if (counterNumber > (100 - enemyActions.counter_attack - enemyActions.counter_counter)) {
            enemy_counter = 'counter';
        } else if (counterNumber > (100 - enemyActions.counter_attack - enemyActions.counter_counter - enemyActions.counter_dodge)) {
            enemy_counter = 'dodge';
        } else if (counterNumber > (100 - enemyActions.counter_attack - enemyActions.counter_counter - enemyActions.counter_dodge - enemyActions.counter_posture)) {
            enemy_counter = 'posture';
        } else {
            enemy_counter = 'roll';
        };
        newData.counter_weight -= 3;
        newData.attack_weight += 1;  
        newData.posture_weight += 1;
        newData.roll_weight += 1;
    }
    newData.enemy_action = enemy_action;
    newData.enemy_counter_guess = enemy_counter;

    return (
        newData
    );
};

const enemyDualWieldCompiler = async (combatData, player_physical_defense_multiplier, player_magical_defense_multiplier) => { // Triggers if 40+ Str/Caer for 2h, 1h + Agi/Achre Mastery and 2nd weapon is 1h
    const player = combatData.player;
    const enemy = combatData.enemy;
    const weapons = combatData.enemy_weapons;

    let enemy_weapon_one_physical_damage = weapons[0].physical_damage;
    let enemy_weapon_one_magical_damage = weapons[0].magical_damage;
    let enemy_weapon_two_physical_damage = weapons[1].physical_damage;
    let enemy_weapon_two_magical_damage = weapons[1].magical_damage;
    let enemy_weapon_one_total_damage;
    let enemy_weapon_two_total_damage;
    let firstWeaponCrit = false;
    let secondWeaponCrit = false;

    const weapOneClearance = Math.floor(Math.random() * 101);
    const weapTwoClearance = Math.floor(Math.random() * 101);
    let weapOneCrit = combatData.enemy_weapons[0].critical_chance;
    let weapTwoCrit = combatData.enemy_weapons[1].critical_chance;
    weapOneCrit -= combatData.player_attributes.kyosirMod;
    weapTwoCrit -= combatData.player_attributes.kyosirMod;
    const resultOne = await enemyCriticalCompiler(combatData, weapOneCrit, weapOneClearance, combatData.enemy_weapons[0], enemy_weapon_one_physical_damage, enemy_weapon_one_magical_damage);
    combatData = resultOne.combatData;
    enemy_weapon_one_physical_damage = resultOne.enemy_physical_damage;
    enemy_weapon_one_magical_damage = resultOne.enemy_magical_damage;
    if (weapOneCrit >= weapOneClearance) {
        firstWeaponCrit = true;
    };
    const resultTwo = await enemyCriticalCompiler(combatData, weapTwoCrit, weapTwoClearance, combatData.enemy_weapons[1], enemy_weapon_two_physical_damage, enemy_weapon_two_magical_damage);
    combatData = resultTwo.combatData;
    enemy_weapon_two_physical_damage = resultTwo.enemy_physical_damage;
    enemy_weapon_two_magical_damage = resultTwo.enemy_magical_damage;
    if (weapTwoCrit >= weapTwoClearance) {
        secondWeaponCrit = true;
    };

    enemy_weapon_one_physical_damage *= 1 - ((1 - player_physical_defense_multiplier) * (1 - (weapons[0].physical_penetration / 100 )));
    enemy_weapon_one_magical_damage *= 1 - ((1 - player_magical_defense_multiplier) * (1 - (weapons[0].magical_penetration  / 100 )));

    enemy_weapon_two_physical_damage *= 1 - ((1 - player_physical_defense_multiplier) * (1 - (weapons[1].physical_penetration / 100 )));
    enemy_weapon_two_magical_damage *= 1 - ((1 - player_magical_defense_multiplier) * (1 - (weapons[1].magical_penetration / 100 )));

    const damageType = await enemyDamageTypeCompiter(combatData, weapons[0], enemy_weapon_one_physical_damage, enemy_weapon_one_magical_damage);
    enemy_weapon_one_physical_damage = damageType.enemy_physical_damage;
    enemy_weapon_one_magical_damage = damageType.enemy_magical_damage;

    const damageTypeTwo = await enemyDamageTypeCompiter(combatData, weapons[1], enemy_weapon_two_physical_damage, enemy_weapon_two_magical_damage);
    enemy_weapon_two_physical_damage = damageTypeTwo.enemy_physical_damage;
    enemy_weapon_two_magical_damage = damageTypeTwo.enemy_magical_damage;

    enemy_weapon_one_total_damage = enemy_weapon_one_physical_damage + enemy_weapon_one_magical_damage;
    enemy_weapon_two_total_damage = enemy_weapon_two_physical_damage + enemy_weapon_two_magical_damage;


    combatData.realized_enemy_damage = enemy_weapon_one_total_damage + enemy_weapon_two_total_damage;
    if (combatData.realized_enemy_damage < 0) {
        combatData.realized_enemy_damage = 0;
    }

    let strength = combatData.enemy_attributes.totalStrength + combatData.enemy_weapons[0].strength  + combatData.enemy_weapons[1].strength;
    let agility = combatData.enemy_attributes.totalAgility + combatData.enemy_weapons[0].agility  + combatData.enemy_weapons[1].agility;
    let achre = combatData.enemy_attributes.totalAchre + combatData.enemy_weapons[0].achre  + combatData.enemy_weapons[1].achre;
    let caeren = combatData.enemy_attributes.totalCaeren + combatData.enemy_weapons[0].caeren  + combatData.enemy_weapons[1].caeren;

    if (combatData.enemy_weapons[0].grip === 'One Hand') {
        if (combatData.enemy_weapons[0].attack_type === 'Physical') {
            combatData.realized_enemy_damage *= (agility / 100)
        } else {
            combatData.realized_enemy_damage *= (achre / 100)
        };
    };

    if (combatData.enemy_weapons[0].grip === 'Two Hand') {
        if (combatData.enemy_weapons[0].attack_type === 'Physical') {
            combatData.realized_enemy_damage *= (strength / 150) 
        } else {
            combatData.realized_enemy_damage *= (caeren / 150)
        };
    };

    if (combatData.action === 'attack') {
        combatData.realized_enemy_damage *= 1.1;
    };
    if (combatData.action === 'posture') {
        combatData.realized_enemy_damage *= 0.95;
    };

    combatData.new_player_health = combatData.current_player_health - combatData.realized_enemy_damage;
    combatData.current_player_health = combatData.new_player_health; // Added to persist health totals?

    if (combatData.new_player_health < 0 || combatData.current_player_health <= 0) {
        combatData.new_player_health = 0;
        combatData.enemy_win = true;
    }
    
    combatData.enemy_action_description = 
        `${enemy.name} dual-wield attacks ${combatData.player.name} with ${weapons[0].name} and ${weapons[1].name} for ${Math.round(combatData.realized_enemy_damage)} ${combatData.enemy_damage_type} and ${weapons[1].damage_type[0] ? weapons[1].damage_type[0] : ''}${weapons[1].damage_type[1] ? ' / ' + weapons[1].damage_type[1] : ''} ${firstWeaponCrit === true && secondWeaponCrit === true ? 'Critical Strike Damage' : firstWeaponCrit === true || secondWeaponCrit === true ? 'Partial Crit Damage' : combatData.enemy_glancing_blow === true ? 'Damage (Glancing)' : 'Damage'}.`    
    return (
        combatData
    );
};

const enemyAttackCompiler = async (combatData, enemy_action) => {
    if (combatData.player_win === true) { return }
    let enemy_physical_damage = combatData.enemy_weapons[0].physical_damage;
    let enemy_magical_damage = combatData.enemy_weapons[0].magical_damage;
    let enemy_total_damage;

    let player_physical_defense_multiplier = 1 - (combatData.player_defense.physicalDefenseModifier / 100);
    let player_magical_defense_multiplier = 1 - (combatData.player_defense.magicalDefenseModifier / 100);

    // This is for Players's who are Posturing
    if (combatData.action === 'posture' && combatData.enemy_counter_success !== true && combatData.enemy_roll_success !== true) {
        player_physical_defense_multiplier = 1 - (combatData.player_defense.physicalPosture / 100);
        player_magical_defense_multiplier = 1 - (combatData.player_defense.magicalPosture / 100);
    };

    if (combatData.enemy_action === 'attack') {
        if (combatData.enemy_weapons[0].grip === 'One Hand') {
            if (combatData.enemy_weapons[0].attack_type === 'Physical') {
                if (combatData.enemy.mastery === 'Agility' || combatData.enemy.mastery === 'Constitution') {
                    if (combatData.enemy_attributes.totalAgility + combatData.enemy_weapons[0].agility + combatData.enemy_weapons[1].agility >= 50) {
                        if (combatData.enemy_weapons[1].grip === 'One Hand') { // If you're Focusing Attack + 1h + Agi Mastery + 1h in Second Slot
                           combatData.enemy_dual_wielding = true;
                            await enemyDualWieldCompiler(combatData, player_physical_defense_multiplier, player_magical_defense_multiplier)
                            return combatData;
                        } else {
                            enemy_physical_damage *= 1.3;
                            enemy_magical_damage *= 1.15;
                        };
                    } else {
                        enemy_physical_damage *= 1.3;
                        enemy_magical_damage *= 1.15;
                    };
                } else {
                    enemy_physical_damage *= 1.1;
                    enemy_magical_damage *= 1.1;
                };
            };
            if (combatData.enemy_weapons[0].attack_type === 'Magic') {
                if (combatData.enemy.mastery === 'Achre' || combatData.enemy.mastery === 'Kyosir') {
                    if (combatData.enemy_attributes.totalAchre + combatData.enemy_weapons[0].achre + combatData.enemy_weapons[1].achre >= 50) {
                        if (combatData.enemy_weapons[1].grip === 'One Hand') { // Might be a dual-wield compiler instead to take the rest of it
                            combatData.enemy_dual_wielding = true;
                            await enemyDualWieldCompiler(combatData, player_physical_defense_multiplier, player_magical_defense_multiplier)
                            return combatData
                        } else {
                            enemy_physical_damage *= 1.15;
                            enemy_magical_damage *= 1.3;
                        };
                    } else {
                        enemy_physical_damage *= 1.15;
                        enemy_magical_damage *= 1.3;
                    };
                } else {
                    enemy_physical_damage *= 1.1;
                    enemy_magical_damage *= 1.1;
                };
            };
        };
        if (combatData.enemy_weapons[0].grip === 'Two Hand') {
            if (combatData.enemy_weapons[0].attack_type === 'Physical' && combatData.enemy_weapons[0].type !== 'Bow') {
                if (combatData.enemy.mastery === 'Strength' || combatData.enemy.mastery === 'Constitution') {
                    if (combatData.enemy_attributes.totalStrength + combatData.enemy_weapons[0].strength + combatData.enemy_weapons[1].strength >= 75) { // Might be a dual-wield compiler instead to take the rest of it
                        if (combatData.enemy_weapons[1].type !== 'Bow') {
                            combatData.enemy_dual_wielding = true;
                            await enemyDualWieldCompiler(combatData, player_physical_defense_multiplier, player_magical_defense_multiplier)
                            return combatData
                        } else { // Less than 50 Srength 
                            enemy_physical_damage *= 1.3;
                            enemy_magical_damage *= 1.15;
                        };
                    } else { // Less than 50 Srength 
                        enemy_physical_damage *= 1.3;
                        enemy_magical_damage *= 1.15;
                    };
                } else {
                    enemy_physical_damage *= 1.1;
                    enemy_magical_damage *= 1.1;
                };
            };
            if (combatData.enemy_weapons[0].attack_type === 'Magic') {
                if (combatData.enemy.mastery === 'Caeren' || combatData.enemy.mastery === 'Kyosir') {
                    if (combatData.enemy_attributes.totalCaeren + combatData.enemy_weapons[0].caeren + combatData.enemy_weapons[1].caeren >= 75) {
                        if (combatData.enemy_weapons[1].type !== 'Bow') {
                            combatData.enemy_dual_wielding = true;
                            await enemyDualWieldCompiler(combatData, player_physical_defense_multiplier, player_magical_defense_multiplier)
                            return combatData
                        } else {
                            enemy_physical_damage *= 1.15;
                            enemy_magical_damage *= 1.3;
                        };
                    } else {
                        enemy_physical_damage *= 1.15;
                        enemy_magical_damage *= 1.3;
                    };
                } else {
                    enemy_physical_damage *= 1.1;
                    enemy_magical_damage *= 1.1;
                };
            };
            if (combatData.enemy_weapons[0].type === 'Bow') {
                if (combatData.enemy.mastery === 'Agility' || combatData.enemy.mastery === 'Achre' || combatData.enemy.mastery === 'Kyosir' || combatData.enemy.mastery === 'Constitution') {
                    enemy_physical_damage *= 1.4;
                    enemy_magical_damage *= 1.4;
                } else {
                    enemy_physical_damage *= 1.1;
                    enemy_magical_damage *= 1.1;
                };
            };
        };
    }; 

    if (enemy_action === 'counter') {
        if (combatData.enemy_counter_success === true) {
            enemy_physical_damage *= 3;
            enemy_magical_damage *= 3;    
        } else {
            enemy_physical_damage *= 0.9;
            enemy_magical_damage *= 0.9;
        };
    };

    if (enemy_action === 'dodge') {
        enemy_physical_damage *= 0.9;
        enemy_magical_damage *= 0.9;
    };

    if (enemy_action === 'roll' ) {
        if (combatData.enemy_roll_success === true) {
            enemy_physical_damage *= 1.15;
            enemy_magical_damage *= 1.15;
        } else {
            enemy_physical_damage *= 0.95;
            enemy_magical_damage *= 0.95;
        };
    };

    const criticalClearance = Math.floor(Math.random() * 101);
    let criticalChance = combatData.enemy_weapons[0].critical_chance;
    criticalChance -= combatData.player_attributes.kyosirMod;
    if (combatData.weather === 'Astralands') criticalChance += 10;
    const criticalResult = await enemyCriticalCompiler(combatData, criticalChance, criticalClearance, combatData.enemy_weapons[0], enemy_physical_damage, enemy_magical_damage)
    combatData = criticalResult.combatData;
    enemy_physical_damage = criticalResult.enemy_physical_damage;
    enemy_magical_damage = criticalResult.enemy_magical_damage;

    // If you made it here, your basic attack now resolves itself
    enemy_physical_damage *= 1 - ((1 - player_physical_defense_multiplier) * (1 - (combatData.enemy_weapons[0].physical_penetration / 100)));
    enemy_magical_damage *= 1 - ((1 - player_magical_defense_multiplier) * (1 - (combatData.enemy_weapons[0].magical_penetration / 100)));

    const damageType = await enemyDamageTypeCompiter(combatData, combatData.enemy_weapons[0], enemy_physical_damage, enemy_magical_damage);
    enemy_physical_damage = damageType.enemy_physical_damage;
    enemy_magical_damage = damageType.enemy_magical_damage;

    enemy_total_damage = enemy_physical_damage + enemy_magical_damage;
    if (enemy_total_damage < 0) {
        enemy_total_damage = 0;
    }
    combatData.realized_enemy_damage = enemy_total_damage;

    if (combatData.action === 'attack') {
        combatData.realized_enemy_damage *= 1.1;
    };
    if (combatData.action === 'posture') {
        combatData.realized_enemy_damage *= 0.95;
    };

    combatData.new_player_health = combatData.current_player_health - combatData.realized_enemy_damage;
    combatData.current_player_health = combatData.new_player_health; // Added to persist health totals?

    combatData.enemy_action_description = 
        `${combatData.enemy.name} attacks ${combatData.player.name} with their ${combatData.enemy_weapons[0].name} for ${Math.round(enemy_total_damage)} ${combatData.enemy_damage_type} ${combatData.enemy_critical_success === true ? 'Critical Strike Damage' : combatData.enemy_glancing_blow === true ? 'Damage (Glancing)' : 'Damage'}.`    

    if (combatData.new_player_health < 0 || combatData.current_player_health <= 0) {
        combatData.new_player_health = 0;
        combatData.enemy_win = true;
    }

    if (combatData.new_player_health > 0) {
        combatData.enemy_win = false;
    }

    if (combatData.new_enemy_health > 0) {
        combatData.player_win = false;
    }

    // console.log(enemy_total_damage, 'Total enemy Damage')

    return (
        combatData
    )
}

const enemyDamageTypeCompiter = async (combatData, weapon, enemy_physical_damage, enemy_magical_damage) => {
    if (combatData.enemy_damage_type === 'Blunt' || combatData.enemy_damage_type === 'Fire' || combatData.enemy_damage_type === 'Earth' || combatData.enemy_damage_type === 'Spooky') {
        if (weapon.attack_type === 'Physical') {
            if (combatData.player.helmet.type === 'Plate-Mail') {
                enemy_physical_damage *= 1.15;
            }
            if (combatData.player.helmet.type === 'Chain-Mail') {
                enemy_physical_damage *= 1.08;
            }
            if (combatData.player.helmet.type === 'Leather-Mail') {
                enemy_physical_damage *= 0.92;
            }
            if (combatData.player.helmet.type === 'Leather-Cloth') {
                enemy_physical_damage *= 0.85;
            }
            if (combatData.player.chest.type === 'Plate-Mail') {
                enemy_physical_damage *= 1.1;
            }
            if (combatData.player.chest.type === 'Chain-Mail') {
                enemy_physical_damage *= 1.05;
            }
            if (combatData.player.chest.type === 'Leather-Mail') {
                enemy_physical_damage *= 0.95;
            }
            if (combatData.player.chest.type === 'Leather-Cloth') {
                enemy_physical_damage *= 0.9;
            }
            if (combatData.player.legs.type === 'Plate-Mail') {
                enemy_physical_damage *= 1.05;
            }
            if (combatData.player.legs.type === 'Chain-Mail') {
                enemy_physical_damage *= 1.03;
            }
            if (combatData.player.legs.type === 'Leather-Mail') {
                enemy_physical_damage *= 0.97;
            }
            if (combatData.player.legs.type === 'Leather-Cloth') {
                enemy_physical_damage *= 0.95;
            }
        }
        if (weapon.attack_type === 'Magic') {
            if (combatData.player.helmet.type === 'Plate-Mail') {
                enemy_magical_damage *= 1.15;
            }
            if (combatData.player.helmet.type === 'Chain-Mail') {
                enemy_magical_damage *= 1.08;
            }
            if (combatData.player.helmet.type === 'Leather-Mail') {
                enemy_magical_damage *= 0.92;
            }
            if (combatData.player.helmet.type === 'Leather-Cloth') {
                enemy_magical_damage *= 0.85;
            }
            if (combatData.player.chest.type === 'Plate-Mail') {
                enemy_magical_damage *= 1.1;
            }
            if (combatData.player.chest.type === 'Chain-Mail') {
                enemy_magical_damage *= 1.05;
            }
            if (combatData.player.chest.type === 'Leather-Mail') {
                enemy_magical_damage *= 0.95;
            }
            if (combatData.player.chest.type === 'Leather-Cloth') {
                enemy_magical_damage *= 0.9;
            }
            if (combatData.player.legs.type === 'Plate-Mail') {
                enemy_magical_damage *= 1.05;
            }
            if (combatData.player.legs.type === 'Chain-Mail') {
                enemy_magical_damage *= 1.03;
            }
            if (combatData.player.legs.type === 'Leather-Mail') {
                enemy_magical_damage *= 0.97;
            }
            if (combatData.player.legs.type === 'Leather-Cloth') {
                enemy_magical_damage *= 0.95;
            }
        }
    }
    if (combatData.enemy_damage_type === 'Pierce' || combatData.enemy_damage_type === 'Lightning' || combatData.enemy_damage_type === 'Frost' || combatData.enemy_damage_type === 'Righteous') {
        if (weapon.attack_type === 'Physical') {
            if (combatData.player.helmet.type === 'Plate-Mail') {
                enemy_physical_damage *= 0.85;
            }
            if (combatData.player.helmet.type === 'Chain-Mail') {
                enemy_physical_damage *= 0.92;
            }
            if (combatData.player.helmet.type === 'Leather-Mail') {
                enemy_physical_damage *= 1.08;
            }
            if (combatData.player.helmet.type === 'Leather-Cloth') {
                enemy_physical_damage *= 1.15;
            }
            if (combatData.player.chest.type === 'Plate-Mail') {
                enemy_physical_damage *= 0.9;
            }
            if (combatData.player.chest.type === 'Chain-Mail') {
                enemy_physical_damage *= 0.95;
            }
            if (combatData.player.chest.type === 'Leather-Mail') {
                enemy_physical_damage *= 1.05;
            }
            if (combatData.player.chest.type === 'Leather-Cloth') {
                enemy_physical_damage *= 1.1;
            }
            if (combatData.player.legs.type === 'Plate-Mail') {
                enemy_physical_damage *= 0.95;
            }   
            if (combatData.player.legs.type === 'Chain-Mail') {
                enemy_physical_damage *= 0.97;
            }
            if (combatData.player.legs.type === 'Leather-Mail') {
                enemy_physical_damage *= 1.03;
            }
            if (combatData.player.legs.type === 'Leather-Cloth') {
                enemy_physical_damage *= 1.05;
            }
        }
        if (weapon.attack_type === 'Magic') {
            if (combatData.player.helmet.type === 'Plate-Mail') {
                enemy_magical_damage *= 0.85;
            }
            if (combatData.player.helmet.type === 'Chain-Mail') {
                enemy_magical_damage *= 0.92;
            }
            if (combatData.player.helmet.type === 'Leather-Mail') {
                enemy_magical_damage *= 1.08;
            }
            if (combatData.player.helmet.type === 'Leather-Cloth') {
                enemy_magical_damage *= 1.15;
            }
            if (combatData.player.chest.type === 'Plate-Mail') {
                enemy_magical_damage *= 0.9;
            }
            if (combatData.player.chest.type === 'Chain-Mail') {
                enemy_magical_damage *= 0.95;
            }
            if (combatData.player.chest.type === 'Leather-Mail') {
                enemy_magical_damage *= 1.05;
            }
            if (combatData.player.chest.type === 'Leather-Cloth') {
                enemy_magical_damage *= 1.1;
            }
            if (combatData.player.legs.type === 'Plate-Mail') {
                enemy_magical_damage *= 0.95;
            }   
            if (combatData.player.legs.type === 'Chain-Mail') {
                enemy_magical_damage *= 0.97;
            }
            if (combatData.player.legs.type === 'Leather-Mail') {
                enemy_magical_damage *= 1.03;
            }
            if (combatData.player.legs.type === 'Leather-Cloth') {
                enemy_magical_damage *= 1.05;
            }
        }
    }
    if (combatData.enemy_damage_type === 'Slash' || combatData.enemy_damage_type === 'Wind' || combatData.enemy_damage_type === 'Sorcery' || combatData.enemy_damage_type === 'Wild') {
        if (weapon.attack_type === 'Physical') {
            if (combatData.player.helmet.type === 'Plate-Mail') {
                enemy_physical_damage *= 0.925 + Math.random() * 0.15;
            }
            if (combatData.player.helmet.type === 'Chain-Mail') {
                enemy_physical_damage *= 0.925 + Math.random() * 0.15;
            }   
            if (combatData.player.helmet.type === 'Leather-Mail') {
                enemy_physical_damage *= 0.925 + Math.random() * 0.15;
            }
            if (combatData.player.helmet.type === 'Leather-Cloth') {
                enemy_physical_damage *= 0.925 + Math.random() * 0.15;
            }
    
            if (combatData.player.chest.type === 'Plate-Mail') {
                enemy_physical_damage *= 0.925 + Math.random() * 0.15;
            }
            if (combatData.player.chest.type === 'Chain-Mail') {
                enemy_physical_damage *= 0.925 + Math.random() * 0.15;
            }
            if (combatData.player.chest.type === 'Leather-Mail') {
                enemy_physical_damage *= 0.925 + Math.random() * 0.15;
            }
            if (combatData.player.chest.type === 'Leather-Cloth') {
                enemy_physical_damage *= 0.925 + Math.random() * 0.15;
            }
    
            if (combatData.player.legs.type === 'Plate-Mail') {
                enemy_physical_damage *= 0.925 + Math.random() * 0.15;
            }
            if (combatData.player.legs.type === 'Chain-Mail') {
                enemy_physical_damage *= 0.925 + Math.random() * 0.15;
            }
            if (combatData.player.legs.type === 'Leather-Mail') {
                enemy_physical_damage *= 0.925 + Math.random() * 0.15;
            }
            if (combatData.player.legs.type === 'Leather-Cloth') {
                enemy_physical_damage *= 0.925 + Math.random() * 0.15;
            }
        }
        if (weapon.attack_type === 'Magic') {
            if (combatData.player.helmet.type === 'Plate-Mail') {
                enemy_magical_damage *= 0.925 + Math.random() * 0.15;
            }
            if (combatData.player.helmet.type === 'Chain-Mail') {
                enemy_magical_damage *= 0.925 + Math.random() * 0.15;
            }   
            if (combatData.player.helmet.type === 'Leather-Mail') {
                enemy_magical_damage *= 0.925 + Math.random() * 0.15;
            }
            if (combatData.player.helmet.type === 'Leather-Cloth') {
                enemy_magical_damage *= 0.925 + Math.random() * 0.15;
            }
            if (combatData.player.chest.type === 'Plate-Mail') {
                enemy_magical_damage *= 0.925 + Math.random() * 0.15;
            }
            if (combatData.player.chest.type === 'Chain-Mail') {
                enemy_magical_damage *= 0.925 + Math.random() * 0.15;
            }
            if (combatData.player.chest.type === 'Leather-Mail') {
                enemy_magical_damage *= 0.925 + Math.random() * 0.15;
            }
            if (combatData.player.chest.type === 'Leather-Cloth') {
                enemy_magical_damage *= 0.925 + Math.random() * 0.15;
            }
            if (combatData.player.legs.type === 'Plate-Mail') {
                enemy_magical_damage *= 0.925 + Math.random() * 0.15;
            }
            if (combatData.player.legs.type === 'Chain-Mail') {
                enemy_magical_damage *= 0.925 + Math.random() * 0.15;
            }
            if (combatData.player.legs.type === 'Leather-Mail') {
                enemy_magical_damage *= 0.925 + Math.random() * 0.15;
            }
            if (combatData.player.legs.type === 'Leather-Cloth') {
                enemy_magical_damage *= 0.925 + Math.random() * 0.15;
            }
        }
    }
    return {
        combatData,
        enemy_physical_damage,
        enemy_magical_damage
    }
}

const enemyCriticalCompiler = async (combatData, critChance, critClearance, weapon, enemy_physical_damage, enemy_magical_damage) => {
    if (critChance >= critClearance) {
        enemy_physical_damage *= weapon.critical_damage;
        enemy_magical_damage *= weapon.critical_damage;
        combatData.enemy_critical_success = true;
    }
    if (critClearance > critChance + combatData.enemy.level + 80) {
        enemy_physical_damage *= 0.1;
        enemy_magical_damage *= 0.1;
        combatData.enemy_glancing_blow = true;
    } else if (critClearance > critChance + combatData.enemy.level + 75) {
        enemy_physical_damage *= 0.15;
        enemy_magical_damage *= 0.15;
        combatData.enemy_glancing_blow = true;
    } else if (critClearance > critChance + combatData.enemy.level + 70) {
        enemy_physical_damage *= 0.2;
        enemy_magical_damage *= 0.2;
        combatData.enemy_glancing_blow = true;
    } else if (critClearance > critChance + combatData.enemy.level + 65) {
        enemy_physical_damage *= 0.25;
        enemy_magical_damage *= 0.25;
        combatData.enemy_glancing_blow = true;
    } else if (critClearance > critChance + combatData.enemy.level + 60) {
        enemy_physical_damage *= 0.3;
        enemy_magical_damage *= 0.3;
        combatData.enemy_glancing_blow = true;
    } else if (critClearance > critChance + combatData.enemy.level + 55) {
        enemy_physical_damage *= 0.35;
        enemy_magical_damage *= 0.35;
        combatData.enemy_glancing_blow = true;
    } else if (critClearance > critChance + combatData.enemy.level + 50) {
        enemy_physical_damage *= 0.4;
        enemy_magical_damage *= 0.4;
        combatData.enemy_glancing_blow = true;
    } else if (critClearance > critChance + combatData.enemy.level + 45) {
        enemy_physical_damage *= 0.45;
        enemy_magical_damage *= 0.45;
        combatData.enemy_glancing_blow = true;
    } else if (critClearance > critChance + combatData.enemy.level + 40) {
        enemy_physical_damage *= 0.5;
        enemy_magical_damage *= 0.5;
        combatData.enemy_glancing_blow = true;
    } else if (critClearance > critChance + combatData.enemy.level + 35) {
        enemy_physical_damage *= 0.55;
        enemy_magical_damage *= 0.55;
        combatData.enemy_glancing_blow = true;
    } else if (critClearance > critChance + combatData.enemy.level + 30) {
        enemy_physical_damage *= 0.6;
        enemy_magical_damage *= 0.6;
        combatData.enemy_glancing_blow = true;
    } else if (critClearance > critChance + combatData.enemy.level + 25) {
        enemy_physical_damage *= 0.65;
        enemy_magical_damage *= 0.65;
        combatData.enemy_glancing_blow = true;
    } else if (critClearance > critChance + combatData.enemy.level + 20) {
        enemy_physical_damage *= 0.7;
        enemy_magical_damage *= 0.7;
        combatData.enemy_glancing_blow = true;
    } 
    // else if (critClearance > critChance + 20) {
    //     enemy_physical_damage *= 0.8;
    //     enemy_magical_damage *= 0.8;
    //     combatData.enemy_glancing_blow = true;
    // } 
    // else if (critClearance > critChance + 10) {
    //     enemy_physical_damage *= 0.9;
    //     enemy_magical_damage *= 0.9;
    //     combatData.enemy_glancing_blow = true;
    // }
    return {
        combatData,
        enemy_physical_damage,
        enemy_magical_damage
    }
}

const enemyCounterCompiler = async (combatData, player_action, enemy_action) => {
    enemy_action = 'attack';
    await attackCompiler(combatData, enemy_action);
    return {
        combatData,
        enemy_action
    }
}
    
const enemyRollCompiler = async (combatData, player_initiative, enemy_initiative, player_action, enemy_action) => {
    const enemy_roll = combatData.enemy_weapons[0].roll;
    let roll_catch = Math.floor(Math.random() * 101) + combatData.player_attributes.kyosirMod;
    // console.log(enemy_roll, 'enemy Roll %', roll_catch, 'Roll # To Beat')
    if (enemy_roll > roll_catch) {
        combatData.enemy_roll_success = true;
        combatData.enemy_special_description = 
                `${combatData.enemy.name} successfully rolls against you, avoiding your ${  player_action === 'attack' ? 'Focused' : player_action.charAt(0).toUpperCase() + player_action.slice(1) } Attack.`
        await enemyAttackCompiler(combatData, enemy_action)
    } else {
        combatData.enemy_special_description = 
            `${combatData.enemy.name} fails to roll against your ${  player_action === 'attack' ? 'Focused' : player_action.charAt(0).toUpperCase() + player_action.slice(1) } Attack.`
        return combatData
    }
    return (
        combatData
    )
}

// ================================== PLAYER COMPILER FUNCTIONS ====================================== \\

const dualWieldCompiler = async (combatData) => { // Triggers if 40+ Str/Caer for 2h, 1h + Agi/Achre Mastery and 2nd weapon is 1h
    const enemy = combatData.enemy;
    const weapons = combatData.weapons;

    let player_weapon_one_physical_damage = combatData.weapons[0].physical_damage;
    let player_weapon_one_magical_damage = combatData.weapons[0].magical_damage;
    let player_weapon_two_physical_damage = combatData.weapons[1].physical_damage;
    let player_weapon_two_magical_damage = combatData.weapons[1].magical_damage;
    let player_weapon_one_total_damage;
    let player_weapon_two_total_damage;
    let firstWeaponCrit = false;
    let secondWeaponCrit = false;
    
    let enemy_physical_defense_multiplier = 1 - (combatData.enemy_defense.physicalDefenseModifier / 100);
    let enemy_magical_defense_multiplier = 1 - (combatData.enemy_defense.magicalDefenseModifier / 100);

    const weapOneClearance = Math.floor(Math.random() * 10100) / 100;
    const weapTwoClearance = Math.floor(Math.random() * 10100) / 100;
    let weapOneCrit = combatData.weapons[0].critical_chance;
    let weapTwoCrit = combatData.weapons[1].critical_chance;
    weapOneCrit -= combatData.enemy_attributes.kyosirMod;
    weapTwoCrit -= combatData.enemy_attributes.kyosirMod;
    const resultOne = await criticalCompiler(combatData, weapOneCrit, weapOneClearance, combatData.weapons[0], player_weapon_one_physical_damage, player_weapon_one_magical_damage);
    combatData = resultOne.combatData;
    player_weapon_one_physical_damage = resultOne.player_physical_damage;
    player_weapon_one_magical_damage = resultOne.player_magical_damage;
    if (weapOneCrit >= weapOneClearance) {
        firstWeaponCrit = true;
    }
    const resultTwo = await criticalCompiler(combatData, weapTwoCrit, weapTwoClearance, combatData.weapons[1], player_weapon_two_physical_damage, player_weapon_two_magical_damage);
    combatData = resultTwo.combatData;
    player_weapon_two_physical_damage = resultTwo.player_physical_damage;
    player_weapon_two_magical_damage = resultTwo.player_magical_damage;
    if (weapTwoCrit >= weapTwoClearance) {
        secondWeaponCrit = true;
    }

    player_weapon_one_physical_damage *= 1 - ((1 - enemy_physical_defense_multiplier) * (1 - (weapons[0].physical_penetration / 100)));
    player_weapon_one_magical_damage *= 1 - ((1 - enemy_magical_defense_multiplier) * (1 - (weapons[0].magical_penetration / 100)));

    player_weapon_two_physical_damage *= 1 - ((1 - enemy_physical_defense_multiplier) * (1 - (weapons[1].physical_penetration / 100)));
    player_weapon_two_magical_damage *= 1 - ((1 - enemy_magical_defense_multiplier) * (1 - (weapons[1].magical_penetration / 100)));

    // console.log('Attack Compiler Pre-Damage Type Multiplier', player_weapon_one_physical_damage, player_weapon_one_magical_damage)

    const damageType = await damageTypeCompiler(combatData, weapons[0], player_weapon_one_physical_damage, player_weapon_one_magical_damage);
    player_weapon_one_physical_damage = damageType.player_physical_damage;
    player_weapon_one_magical_damage = damageType.player_magical_damage;

    const damageTypeTwo = await damageTypeCompiler(combatData, weapons[1], player_weapon_two_physical_damage, player_weapon_two_magical_damage);
    player_weapon_two_physical_damage = damageTypeTwo.player_physical_damage;
    player_weapon_two_magical_damage = damageTypeTwo.player_magical_damage;

    // console.log('Attack Compiler Post-Damage Type Multiplier', player_weapon_one_physical_damage, player_weapon_one_magical_damage)

    player_weapon_one_total_damage = player_weapon_one_physical_damage + player_weapon_one_magical_damage;
    player_weapon_two_total_damage = player_weapon_two_physical_damage + player_weapon_two_magical_damage;

    combatData.realized_player_damage = player_weapon_one_total_damage + player_weapon_two_total_damage;
    if (combatData.realized_player_damage < 0) {
        combatData.realized_player_damage = 0;
    }

    let strength = combatData.player_attributes.totalStrength + combatData.weapons[0].strength  + combatData.weapons[1].strength;
    let agility = combatData.player_attributes.totalAgility + combatData.weapons[0].agility  + combatData.weapons[1].agility;
    let achre = combatData.player_attributes.totalAchre + combatData.weapons[0].achre + combatData.weapons[1].achre;
    let caeren = combatData.player_attributes.totalCaeren + combatData.weapons[0].caeren  + combatData.weapons[1].caeren;

    if (combatData.weapons[0].grip === 'One Hand') {
        if (combatData.weapons[0].attack_type === 'Physical') {
            combatData.realized_player_damage *= (agility / 100)
        } else {
            combatData.realized_player_damage *= (achre / 100)
        }
    }

    if (combatData.weapons[0].grip === 'Two Hand') {
        if (combatData.weapons[0].attack_type === 'Physical') {
            combatData.realized_player_damage *= (strength / 150) 
        } else {
            combatData.realized_player_damage *= (caeren / 150)
        }
    }

    if (combatData.enemy_action === 'attack') {
        combatData.realized_player_damage *= 1.1;
    };
    if (combatData.enemy_action === 'posture') {
        combatData.realized_player_damage *= 0.95;
    };

    combatData.new_enemy_health = combatData.current_enemy_health - combatData.realized_player_damage;
    combatData.current_enemy_health = combatData.new_enemy_health; // Added to persist health totals?

    if (combatData.new_enemy_health <= 0 || combatData.current_enemy_health <= 0) {
        combatData.new_enemy_health = 0;
        combatData.player_win = true;
    }
    
    combatData.player_action_description = 
        `${combatData.player.name} dual-wield attacks ${enemy.name} with ${weapons[0].name} and ${weapons[1].name} for ${Math.round(combatData.realized_player_damage)} ${combatData.player_damage_type} and ${weapons[1].damage_type[0] ? weapons[1].damage_type[0] : ''} ${firstWeaponCrit === true && secondWeaponCrit === true ? 'Critical Strike Damage' : firstWeaponCrit === true || secondWeaponCrit === true ? 'Partial Crit Damage' : combatData.glancing_blow === true ? 'Damage (Glancing)' : 'Damage'}.`    
    return (
        combatData
    )
}
    
const attackCompiler = async (combatData, player_action) => {
    if (combatData.enemy_win === true) { return }
    let player_physical_damage = combatData.weapons[0].physical_damage;
    let player_magical_damage = combatData.weapons[0].magical_damage;
    let player_total_damage;

    let enemy_physical_defense_multiplier = 1 - (combatData.enemy_defense.physicalDefenseModifier / 100);
    let enemy_magical_defense_multiplier = 1 - (combatData.enemy_defense.magicalDefenseModifier / 100);
    
    // This is for Opponent's who are Posturing
    if (combatData.enemy_action === 'posture' && combatData.counter_success !== true && combatData.roll_success !== true) {
        enemy_physical_defense_multiplier = 1 - (combatData.enemy_defense.physicalPosture / 100);
        enemy_magical_defense_multiplier = 1 - (combatData.enemy_defense.magicalPosture / 100);
    };

    // This is for the Focused Attack Action i.e. you chose to Attack over adding a defensive component
    if (combatData.action === 'attack') {
        if (combatData.weapons[0].grip === 'One Hand') {
            if (combatData.weapons[0].attack_type === 'Physical') {
                if (combatData.player.mastery === 'Agility' || combatData.player.mastery === 'Constitution') {
                    if (combatData.player_attributes.totalAgility + combatData.weapons[0].agility + combatData.weapons[1].agility >= 50) {
                        if (combatData.weapons[1].grip === 'One Hand') { // If you're Focusing Attack + 1h + Agi Mastery + 1h in Second Slot
                            combatData.dual_wielding = true;
                            await dualWieldCompiler(combatData);
                            return combatData
                        } else {
                            player_physical_damage *= 1.3;
                            player_magical_damage *= 1.15;
                        };
                    } else {
                        player_physical_damage *= 1.3;
                        player_magical_damage *= 1.15;
                    };
                } else {
                    player_physical_damage *= 1.1;
                    player_magical_damage *= 1.1;
                };
            };
            if (combatData.weapons[0].attack_type === 'Magic') {
                if (combatData.player.mastery === 'Achre' || combatData.player.mastery === 'Kyosir') {
                    if (combatData.player_attributes.totalAchre + combatData.weapons[0].achre + combatData.weapons[0].achre + combatData.weapons[1].achre >= 50) {
                        if (combatData.weapons[1].grip === 'One Hand') { // Might be a dual-wield compiler instead to take the rest of it
                            combatData.dual_wielding = true;
                            await dualWieldCompiler(combatData)
                            return combatData
                        } else {
                            player_physical_damage *= 1.15;
                            player_magical_damage *= 1.3;
                        };
                    } else {
                        player_physical_damage *= 1.15;
                        player_magical_damage *= 1.3;
                    };
                } else {
                    player_physical_damage *= 1.1;
                    player_magical_damage *= 1.1;
                };
            };
        };
        if (combatData.weapons[0].grip === 'Two Hand') { // Weapon is TWO HAND
            if (combatData.weapons[0].attack_type === 'Physical' && combatData.weapons[0].type !== 'Bow') {
                if (combatData.player.mastery === 'Strength' || combatData.player.mastery === 'Constitution') {
                    if (combatData.player_attributes.totalStrength + combatData.weapons[0].strength  + combatData.weapons[1].strength >= 75) { // Might be a dual-wield compiler instead to take the rest of it
                        if (combatData.weapons[1].type !== 'Bow') {
                            combatData.dual_wielding = true;
                            await dualWieldCompiler(combatData)
                            return combatData
                        } else { // Less than 40 Srength 
                            player_physical_damage *= 1.3;
                            player_magical_damage *= 1.15;
                        };
                    } else { // Less than 40 Srength 
                        player_physical_damage *= 1.3;
                        player_magical_damage *= 1.15;
                    };
                } else {
                    player_physical_damage *= 1.1;
                    player_magical_damage *= 1.1;
                };
            };
            if (combatData.weapons[0].attack_type === 'Magic') {
                if (combatData.player.mastery === 'Caeren' || combatData.player.mastery === 'Kyosir') {
                    if (combatData.player_attributes.totalCaeren + combatData.weapons[0].caeren + combatData.weapons[1].caeren >= 75) {
                        if (combatData.weapons[1].type !== 'Bow') {
                            combatData.dual_wielding = true;
                            await dualWieldCompiler(combatData)
                            return combatData
                        } else {
                            player_physical_damage *= 1.15;
                            player_magical_damage *= 1.3;
                        }
                    } else {
                        player_physical_damage *= 1.15;
                        player_magical_damage *= 1.3;
                    };
                } else {
                    player_physical_damage *= 1.1;
                    player_magical_damage *= 1.1;
                };
            };
            if (combatData.weapons[0].type === 'Bow') {
                if (combatData.player.mastery === 'Agility' || combatData.player.mastery === 'Achre' || combatData.player.mastery === 'Kyosir' || combatData.player.mastery === 'Constitution') {
                    player_physical_damage *= 1.4;
                    player_magical_damage *= 1.4;
                } else {
                    player_physical_damage *= 1.1;
                    player_magical_damage *= 1.1;
                };
            };
        }; 
    };

    // Checking For Player Actions
    if (player_action === 'counter') {
        if (combatData.counter_success === true) {
            player_physical_damage *= 3;
            player_magical_damage *= 3;
        } else {
            player_physical_damage *= 0.9;
            player_magical_damage *= 0.9;
        };
    };

    if (player_action === 'dodge') {
        player_physical_damage *= 0.9;
        player_magical_damage *= 0.9;
    };

    if (player_action === 'roll' ) {
        if (combatData.roll_success === true) {
            player_physical_damage *= 1.15;
            player_magical_damage *= 1.15;
        } else {
            player_physical_damage *= 0.95;
            player_magical_damage *= 0.95;
        };
    };

    // This is for Critical Strikes
    const criticalClearance = Math.floor(Math.random() * 10100) / 100;
    let criticalChance = combatData.weapons[0].critical_chance;
    criticalChance -= combatData.enemy_attributes.kyosirMod;
    if (combatData.weather === 'Astralands') criticalChance += 10;
    if (combatData.weather === 'Astralands' && combatData.weapons[0].influences[0] === 'Astra') criticalChance += 10;
    // console.log('Critical Chance', criticalChance, 'Critical Clearance', criticalClearance)
    const criticalResult = await criticalCompiler(combatData, criticalChance, criticalClearance, combatData.weapons[0], player_physical_damage, player_magical_damage);
    // console.log('Results for [Crit] [Glancing] [Phys Dam] [Mag Dam]', criticalResult.combatData.critical_success, criticalResult.combatData.glancing_blow, criticalResult.player_physical_damage, criticalResult.player_magical_damage)

    combatData = criticalResult.combatData;
    player_physical_damage = criticalResult.player_physical_damage;
    player_magical_damage = criticalResult.player_magical_damage;

    // If you made it here, your basic attack now resolves itself
    player_physical_damage *= 1 - ((1 - enemy_physical_defense_multiplier) * (1 - (combatData.weapons[0].physical_penetration / 100)));
    player_magical_damage *=1 - ((1 - enemy_magical_defense_multiplier) * (1 - (combatData.weapons[0].magical_penetration / 100)));

    // console.log('Attack Compiler Pre-Damage Type Multiplier', player_physical_damage, player_magical_damage)
    const damageType = await damageTypeCompiler(combatData, combatData.weapons[0], player_physical_damage, player_magical_damage);
    player_physical_damage = damageType.player_physical_damage;
    player_magical_damage = damageType.player_magical_damage;

    // if (combatData.weather === 'Firelands') {
    //     player_physical_damage *= 1.1;
    // }
    // if (combatData.weather === 'Astralands' || combatData.weather === 'Firelands' || combatData.weather === 'Soverains') {
    //     player_magical_damage *= 1.1;
    // }
    // if (combatData.weather === 'Soverains') {
    //     player_physical_damage *= 0.9;
    // }

    // console.log('Attack Compiler Post-Damage Type Multiplier', player_physical_damage, player_magical_damage)

    // console.log(1 - ((1 - enemy_physical_defense_multiplier) * (1 - (combatData.weapons[0].physical_penetration / 100))), 
    // 1 - enemy_physical_defense_multiplier, 1 - (combatData.weapons[0].physical_penetration / 100), 
    // 'Combined Physical Defense Mitigation, enemy Physical Defense, Player Weapon Physical Penetration')

    player_total_damage = player_physical_damage + player_magical_damage;
    if (player_total_damage < 0) {
        player_total_damage = 0;
    }
    combatData.realized_player_damage = player_total_damage;

    if (combatData.enemy_action === 'attack') {
        combatData.realized_player_damage *= 1.1;
    };

    combatData.new_enemy_health = combatData.current_enemy_health - combatData.realized_player_damage;
    combatData.current_enemy_health = combatData.new_enemy_health; // Added to persist health totals?

    combatData.player_action_description = 
        `${combatData.player.name} attacks ${combatData.enemy.name} with their ${combatData.weapons[0].name} for ${Math.round(player_total_damage)} ${combatData.player_damage_type} ${combatData.critical_success === true ? 'Critical Strike Damage' : combatData.glancing_blow === true ? 'Damage (Glancing)' : 'Damage'}.`    

    if (combatData.new_enemy_health <= 0 || combatData.current_enemy_health <= 0) {
        combatData.new_enemy_health = 0;
        combatData.player_win = true;
    };

    return combatData;
};

const damageTypeCompiler = async (combatData, weapon, player_physical_damage, player_magical_damage) => {
    // console.log('Damage Type Compiler Firing', player_physical_damage, player_magical_damage);
    if (combatData.player_damage_type === 'Blunt' || combatData.player_damage_type === 'Fire' || combatData.player_damage_type === 'Earth' || combatData.player_damage_type === 'Spooky') {
        if (weapon.attack_type === 'Physical') {
            if (combatData.enemy.helmet.type === 'Plate-Mail') {
                player_physical_damage *= 1.15;
            }
            if (combatData.enemy.helmet.type === 'Chain-Mail') {
                player_physical_damage *= 1.08;
            }
            if (combatData.enemy.helmet.type === 'Leather-Mail') {
                player_physical_damage *= 0.92;
            }
            if (combatData.enemy.helmet.type === 'Leather-Cloth') {
                player_physical_damage *= 0.85;
            }
            if (combatData.enemy.chest.type === 'Plate-Mail') {
                player_physical_damage *= 1.1;
            }
            if (combatData.enemy.chest.type === 'Chain-Mail') {
                player_physical_damage *= 1.05;
            }
            if (combatData.enemy.chest.type === 'Leather-Mail') {
                player_physical_damage *= 0.95;
            }
            if (combatData.enemy.chest.type === 'Leather-Cloth') {
                player_physical_damage *= 0.9;
            }
            if (combatData.enemy.legs.type === 'Plate-Mail') {
                player_physical_damage *= 1.05;
            }
            if (combatData.enemy.legs.type === 'Chain-Mail') {
                player_physical_damage *= 1.03;
            }
            if (combatData.enemy.legs.type === 'Leather-Mail') {
                player_physical_damage *= 0.97;
            }
            if (combatData.enemy.legs.type === 'Leather-Cloth') {
                player_physical_damage *= 0.95;
            }
        }
        if (weapon.attack_type === 'Magic') {
            if (combatData.enemy.helmet.type === 'Plate-Mail') {
                player_magical_damage *= 1.15;
            }
            if (combatData.enemy.helmet.type === 'Chain-Mail') {
                player_magical_damage *= 1.08;
            }
            if (combatData.enemy.helmet.type === 'Leather-Mail') {
                player_magical_damage *= 0.92;
            }
            if (combatData.enemy.helmet.type === 'Leather-Cloth') {
                player_magical_damage *= 0.85;
            }
            if (combatData.enemy.chest.type === 'Plate-Mail') {
                player_magical_damage *= 1.1;
            }
            if (combatData.enemy.chest.type === 'Chain-Mail') {
                player_magical_damage *= 1.05;
            }
            if (combatData.enemy.chest.type === 'Leather-Mail') {
                player_magical_damage *= 0.95;
            }
            if (combatData.enemy.chest.type === 'Leather-Cloth') {
                player_magical_damage *= 0.9;
            }
            if (combatData.enemy.legs.type === 'Plate-Mail') {
                player_magical_damage *= 1.05;
            }
            if (combatData.enemy.legs.type === 'Chain-Mail') {
                player_magical_damage *= 1.03;
            }
            if (combatData.enemy.legs.type === 'Leather-Mail') {
                player_magical_damage *= 0.97;
            }
            if (combatData.enemy.legs.type === 'Leather-Cloth') {
                player_magical_damage *= 0.95;
            }
        }
    }
    if (combatData.player_damage_type === 'Pierce' || combatData.player_damage_type === 'Lightning' || combatData.player_damage_type === 'Frost' || combatData.player_damage_type === 'Righteous') {
        if (weapon.attack_type === 'Physical') {
            if (combatData.enemy.helmet.type === 'Plate-Mail') {
                player_physical_damage *= 0.85;
            }
            if (combatData.enemy.helmet.type === 'Chain-Mail') {
                player_physical_damage *= 0.92;
            }
            if (combatData.enemy.helmet.type === 'Leather-Mail') {
                player_physical_damage *= 1.08;
            }
            if (combatData.enemy.helmet.type === 'Leather-Cloth') {
                player_physical_damage *= 1.15;
            }
            if (combatData.enemy.chest.type === 'Plate-Mail') {
                player_physical_damage *= 0.9;
            }
            if (combatData.enemy.chest.type === 'Chain-Mail') {
                player_physical_damage *= 0.95;
            }
            if (combatData.enemy.chest.type === 'Leather-Mail') {
                player_physical_damage *= 1.05;
            }
            if (combatData.enemy.chest.type === 'Leather-Cloth') {
                player_physical_damage *= 1.1;
            }
            if (combatData.enemy.legs.type === 'Plate-Mail') {
                player_physical_damage *= 0.95;
            }   
            if (combatData.enemy.legs.type === 'Chain-Mail') {
                player_physical_damage *= 0.97;
            }
            if (combatData.enemy.legs.type === 'Leather-Mail') {
                player_physical_damage *= 1.03;
            }
            if (combatData.enemy.legs.type === 'Leather-Cloth') {
                player_physical_damage *= 1.05;
            }
        }
        if (weapon.attack_type === 'Magic') {
            if (combatData.enemy.helmet.type === 'Plate-Mail') {
                player_magical_damage *= 0.85;
            }
            if (combatData.enemy.helmet.type === 'Chain-Mail') {
                player_magical_damage *= 0.92;
            }
            if (combatData.enemy.helmet.type === 'Leather-Mail') {
                player_magical_damage *= 1.08;
            }
            if (combatData.enemy.helmet.type === 'Leather-Cloth') {
                player_magical_damage *= 1.15;
            }
            if (combatData.enemy.chest.type === 'Plate-Mail') {
                player_magical_damage *= 0.9;
            }
            if (combatData.enemy.chest.type === 'Chain-Mail') {
                player_magical_damage *= 0.95;
            }
            if (combatData.enemy.chest.type === 'Leather-Mail') {
                player_magical_damage *= 1.05;
            }
            if (combatData.enemy.chest.type === 'Leather-Cloth') {
                player_magical_damage *= 1.1;
            }
            if (combatData.enemy.legs.type === 'Plate-Mail') {
                player_magical_damage *= 0.95;
            }   
            if (combatData.enemy.legs.type === 'Chain-Mail') {
                player_magical_damage *= 0.97;
            }
            if (combatData.enemy.legs.type === 'Leather-Mail') {
                player_magical_damage *= 1.03;
            }
            if (combatData.enemy.legs.type === 'Leather-Cloth') {
                player_magical_damage *= 1.05;
            }
        }
        
    }
    if (combatData.player_damage_type === 'Slash' || combatData.player_damage_type === 'Wind' || combatData.player_damage_type === 'Sorcery' || combatData.player_damage_type === 'Wild') {

        if (weapon.attack_type === 'Physical') {
            if (combatData.enemy.helmet.type === 'Plate-Mail') {
                player_physical_damage *= 0.9 + Math.random() * 0.15;
            }
            if (combatData.enemy.helmet.type === 'Chain-Mail') {
                player_physical_damage *= 0.925 + Math.random() * 0.15;
            }   
            if (combatData.enemy.helmet.type === 'Leather-Mail') {
                player_physical_damage *= 0.95 + Math.random() * 0.15;
            }
            if (combatData.enemy.helmet.type === 'Leather-Cloth') {
                player_physical_damage *= 0.975 + Math.random() * 0.15;
            }
    
            if (combatData.enemy.chest.type === 'Plate-Mail') {
                player_physical_damage *= 0.9 + Math.random() * 0.15;
            }
            if (combatData.enemy.chest.type === 'Chain-Mail') {
                player_physical_damage *= 0.925 + Math.random() * 0.15;
            }
            if (combatData.enemy.chest.type === 'Leather-Mail') {
                player_physical_damage *= 0.95 + Math.random() * 0.15;
            }
            if (combatData.enemy.chest.type === 'Leather-Cloth') {
                player_physical_damage *= 0.975 + Math.random() * 0.15;
            }
    
            if (combatData.enemy.legs.type === 'Plate-Mail') {
                player_physical_damage *= 0.9 + Math.random() * 0.15;
            }
            if (combatData.enemy.legs.type === 'Chain-Mail') {
                player_physical_damage *= 0.925 + Math.random() * 0.15;
            }
            if (combatData.enemy.legs.type === 'Leather-Mail') {
                player_physical_damage *= 0.95 + Math.random() * 0.15;
            }
            if (combatData.enemy.legs.type === 'Leather-Cloth') {
                player_physical_damage *= 0.975 + Math.random() * 0.15;
            }
        }
        if (weapon.attack_type === 'Magic') {
            if (combatData.enemy.helmet.type === 'Plate-Mail') {
                player_magical_damage *= 0.925 + Math.random() * 0.15;
            }
            if (combatData.enemy.helmet.type === 'Chain-Mail') {
                player_magical_damage *= 0.925 + Math.random() * 0.15;
            }   
            if (combatData.enemy.helmet.type === 'Leather-Mail') {
                player_magical_damage *= 0.925 + Math.random() * 0.15;
            }
            if (combatData.enemy.helmet.type === 'Leather-Cloth') {
                player_magical_damage *= 0.925 + Math.random() * 0.15;
            }
            if (combatData.enemy.chest.type === 'Plate-Mail') {
                player_magical_damage *= 0.925 + Math.random() * 0.15;
            }
            if (combatData.enemy.chest.type === 'Chain-Mail') {
                player_magical_damage *= 0.925 + Math.random() * 0.15;
            }
            if (combatData.enemy.chest.type === 'Leather-Mail') {
                player_magical_damage *= 0.925 + Math.random() * 0.15;
            }
            if (combatData.enemy.chest.type === 'Leather-Cloth') {
                player_magical_damage *= 0.925 + Math.random() * 0.15;
            }
            if (combatData.enemy.legs.type === 'Plate-Mail') {
                player_magical_damage *= 0.925 + Math.random() * 0.15;
            }
            if (combatData.enemy.legs.type === 'Chain-Mail') {
                player_magical_damage *= 0.925 + Math.random() * 0.15;
            }
            if (combatData.enemy.legs.type === 'Leather-Mail') {
                player_magical_damage *= 0.925 + Math.random() * 0.15;
            }
            if (combatData.enemy.legs.type === 'Leather-Cloth') {
                player_magical_damage *= 0.925 + Math.random() * 0.15;
            }
        }

        
    }
    return {
        combatData,
        player_physical_damage,
        player_magical_damage
    };
};

const criticalCompiler = async (combatData, critChance, critClearance, weapon, player_physical_damage, player_magical_damage) => {
    let num = critClearance;
    num = (critClearance * 100) / 100; 
    console.log(critChance, critClearance, 'Crit Chance and Clearance');
    if (critChance >= critClearance) {
        player_physical_damage *= weapon.critical_damage;
        player_magical_damage *= weapon.critical_damage;
        combatData.critical_success = true;
    };
    if (critClearance > critChance + combatData.player.level + 80) {
        player_physical_damage *= 0.1;
        player_magical_damage *= 0.1;
        combatData.glancing_blow = true;
    } else if (critClearance > critChance + combatData.player.level + 75) {
        player_physical_damage *= 0.15;
        player_magical_damage *= 0.15;
        combatData.glancing_blow = true;
    } else if (critClearance > critChance + combatData.player.level + 70) {
        player_physical_damage *= 0.2;
        player_magical_damage *= 0.2;
        combatData.glancing_blow = true;
    } else if (critClearance > critChance + combatData.player.level + 65) {
        player_physical_damage *= 0.25;
        player_magical_damage *= 0.25;
        combatData.glancing_blow = true;
    } else if (critClearance > critChance + combatData.player.level + 60) {
        player_physical_damage *= 0.3;
        player_magical_damage *= 0.3;
        combatData.glancing_blow = true;
    } else if (critClearance > critChance + combatData.player.level + 55) {
        player_physical_damage *= 0.35;
        player_magical_damage *= 0.35;
        combatData.glancing_blow = true;
    } else if (critClearance > critChance + combatData.player.level + 50) {
        player_physical_damage *= 0.4;
        player_magical_damage *= 0.4;
        combatData.glancing_blow = true;
    } else if (critClearance > critChance + combatData.player.level + 45) {
        player_physical_damage *= 0.45;
        player_magical_damage *= 0.45;
        combatData.glancing_blow = true;
    } else if (critClearance > critChance + combatData.player.level + 40) {
        player_physical_damage *= 0.5;
        player_magical_damage *= 0.5;
        combatData.glancing_blow = true;
    } else if (critClearance > critChance + combatData.player.level + 35) {
        player_physical_damage *= 0.55;
        player_magical_damage *= 0.55;
        combatData.glancing_blow = true;
    } else if (critClearance > critChance + combatData.player.level + 30) {
        player_physical_damage *= 0.6;
        player_magical_damage *= 0.6;
        combatData.glancing_blow = true;
    } else if (critClearance > critChance + combatData.player.level + 25) {
        player_physical_damage *= 0.65;
        player_magical_damage *= 0.65;
        combatData.glancing_blow = true;
    } else if (critClearance > critChance + combatData.player.level + 20) {
        player_physical_damage *= 0.7;
        player_magical_damage *= 0.7;
        combatData.glancing_blow = true;
    } 
    // else if (critClearance > critChance + 20) {
    //     player_physical_damage *= 0.8;
    //     player_magical_damage *= 0.8;
    //     combatData.glancing_blow = true;
    // } else if (critClearance > critChance + 10) {
    //     player_physical_damage *= 0.9;
    //     player_magical_damage *= 0.9;
    //     combatData.glancing_blow = true;
    // }
    return {
        combatData,
        player_physical_damage,
        player_magical_damage
    }
}

const counterCompiler = async (combatData, player_action, enemy_action) => {
    player_action = 'attack';
    await attackCompiler(combatData, player_action)
    return (
        combatData
    );
};

const playerRollCompiler = async (combatData, player_initiative, enemy_initiative, player_action, enemy_action) => {
    const player_roll = combatData.weapons[0].roll;
    let roll_catch = Math.floor(Math.random() * 101) + combatData.enemy_attributes.kyosirMod;
    // console.log(player_roll, 'Player Roll %', roll_catch, 'Roll # To Beat')
    if (player_roll > roll_catch) {
        combatData.roll_success = true;
        combatData.player_special_description = 
            `${combatData.player.name} successfully roll against ${combatData.enemy.name}, avoiding their ${ combatData.enemy_action === 'attack' ? 'Focused' : combatData.enemy_action.charAt(0).toUpperCase() + combatData.enemy_action.slice(1) } Attack.`
        await attackCompiler(combatData, player_action);
    } else {
        // if (player_initiative > enemy_initiative) {
        combatData.player_special_description =
            `${combatData.player.name} failed to roll against ${combatData.enemy.name}'s ${ combatData.enemy_action === 'attack' ? 'Focused' : combatData.enemy_action.charAt(0).toUpperCase() + combatData.enemy_action.slice(1) } Attack.`
        return combatData;
    }
    return (
        combatData
    );
};

const doubleRollCompiler = async (combatData, player_initiative, enemy_initiative, player_action, enemy_action) => {
    const player_roll = combatData.weapons[0].roll;
    const enemy_roll = combatData.enemy_weapons[0].roll;
    let roll_catch = Math.floor(Math.random() * 101) + combatData.enemy_attributes.kyosirMod;
    if (player_initiative > enemy_initiative) { // You have Higher Initiative
        if (player_roll > roll_catch) { // The Player Succeeds the Roll
            combatData.player_special_description = 
                `${combatData.player.name} successfully roll against ${combatData.enemy.name}, avoiding their ${combatData.enemy_action.charAt(0).toUpperCase() + combatData.enemy_action.slice(1)} Attack`;
            await attackCompiler(combatData, player_action);
        } else if (enemy_roll > roll_catch) { // The Player Fails the Roll and the enemy Succeeds
            combatData.player_special_description = 
                `${combatData.player.name} failed to roll against ${combatData.enemy.name}'s ${combatData.enemy_action.charAt(0).toUpperCase() + combatData.enemy_action.slice(1)} Attack`;
            combatData.enemy_special_description = 
                `${combatData.enemy.name} successfully rolls against ${combatData.player.name}, avoiding their ${combatData.player_action.charAt(0).toUpperCase() + combatData.player_action.slice(1)} Attack`;
            await enemyAttackCompiler(combatData, enemy_action);
        } else { // Neither Player nor enemy Succeed
            combatData.player_special_description = 
                `${combatData.player.name} failed to roll against ${combatData.enemy.name}'s ${combatData.enemy_action.charAt(0).toUpperCase() + combatData.enemy_action.slice(1)} Attack`;
            combatData.enemy_special_description = 
                `${combatData.enemy.name} fails to roll against ${combatData.player.name}'s ${combatData.player_action.charAt(0).toUpperCase() + combatData.player_action.slice(1)} Attack`;
            await attackCompiler(combatData, player_action);
            await enemyAttackCompiler(combatData, enemy_action);
        };
    } else { // The enemy has Higher Initiative
        if (enemy_roll > roll_catch) { // The enemy Succeeds the Roll
            combatData.enemy_special_description = 
                `${combatData.enemy.name} successfully rolls against ${combatData.player.name}, avoiding their ${combatData.player_action.charAt(0).toUpperCase() + combatData.player_action.slice(1)} Attack`;
            await enemyAttackCompiler(combatData, enemy_action);
        } else if (player_roll > roll_catch) { // The enemy Fails the Roll and the Player Succeeds
            combatData.enemy_special_description = 
                `${combatData.enemy.name} fails to roll against ${combatData.player.name}'s ${combatData.player_action.charAt(0).toUpperCase() + combatData.player_action.slice(1)} Attack`;
            combatData.player_special_description = 
                `${combatData.player.name} successfully roll against ${combatData.enemy.name}, avoiding their ${combatData.enemy_action.charAt(0).toUpperCase() + combatData.enemy_action.slice(1)} Attack`;
            await attackCompiler(combatData, player_action);
        } else { // Neither enemy nor Player Succeed
            combatData.enemy_special_description = 
                `${combatData.enemy.name} fails to roll against ${combatData.player.name}'s ${combatData.player_action.charAt(0).toUpperCase() + combatData.player_action.slice(1)} Attack`;
            combatData.player_special_description = 
                `${combatData.player.name} failed to roll against ${combatData.enemy.name}'s ${combatData.enemy_action.charAt(0).toUpperCase() + combatData.enemy_action.slice(1)} Attack`;
            await enemyAttackCompiler(combatData, enemy_action);
            await attackCompiler(combatData, player_action);
        };
    };
    return (
        combatData
    );
};

const pvpActionSplitter = async (combatData) => {
    //TODO:FIXME: Work on proper rendering of current health and new health totals post-damage TODO:FIXME:
    let newData = combatData;
    const player_initiative = newData.player_attributes.initiative;
    const enemy_initiative = newData.enemy_attributes.initiative;
    let player_action = newData.action;
    const player_counter = newData.counter_guess;
    let enemy_counter = newData.enemy_counter_guess;
    let enemy_action = newData.enemy_action;
    // Weighs and Evaluates the Action the Opponent Will Choose Based on Reaction to Player Actions (Cumulative)
    newData.enemy_start_description = 
        `${newData.enemy.name} sets to ${enemy_action.charAt(0).toUpperCase() + enemy_action.slice(1)}${enemy_counter ? '-' + enemy_counter.charAt(0).toUpperCase() + enemy_counter.slice(1) : ''} against ${newData.player.name}.`

    newData.player_start_description = 
        `${newData.player.name} attempts to ${player_action.charAt(0).toUpperCase() + player_action.slice(1)}${player_counter ? '-' + player_counter.charAt(0).toUpperCase() + player_counter.slice(1) : ''} against ${newData.enemy.name}.`
    
    // If both Player and enemy Counter -> Counter [Fastest Resolution]
    if (player_action === 'counter' && enemy_action === 'counter') { // This is if COUNTER: 'ACTION' Is the Same for Both
        if (player_counter === enemy_counter && player_counter === 'counter') {
            if (player_initiative > enemy_initiative) {
                newData.counter_success = true;
                newData.player_special_description = 
                    `${newData.player.name} successfully Countered ${newData.enemy.name}'s Counter-Counter! Absolutely Brutal`;
                await attackCompiler(newData, player_action);
                await faithFinder(newData, player_action, enemy_action);

                await statusEffectCheck(newData);
                newData.combatRound += 1;
                newData.sessionRound += 1;
                return newData
            } else {
                newData.enemy_counter_success = true;
                newData.enemy_special_description = 
                    `${newData.enemy.name} successfully Countered ${newData.player.name}'s Counter-Counter! Absolutely Brutal`
                await enemyAttackCompiler(newData, enemy_action);
                await faithFinder(newData, player_action, enemy_action);

                await statusEffectCheck(newData);
                newData.combatRound += 1;
                newData.sessionRound += 1;
                return newData
            }    
        }
        // If the Player Guesses Right and the enemy Guesses Wrong
        if (player_counter === enemy_action && enemy_counter !== player_action) {
            newData.counter_success = true;
            newData.player_special_description = 
                `${newData.player.name} successfully Countered ${newData.enemy.name}'s Counter-${enemy_counter.charAt(0).toUpperCase() + enemy_counter.slice(1)}! Absolutely Brutal`
            await attackCompiler(newData, player_action)
            await faithFinder(newData, player_action, enemy_action);
            await statusEffectCheck(newData);
            newData.combatRound += 1;
            newData.sessionRound += 1;
            return newData
        }
    
        // If the enemy Guesses Right and the Player Guesses Wrong
        if (enemy_counter === player_action && player_counter !== enemy_action) {
            newData.enemy_counter_success = true;
            newData.enemy_special_description = 
                `${newData.enemy.name} successfully Countered ${newData.player.name}'s Counter-${player_counter.charAt(0).toUpperCase() + player_counter.slice(1)}! Absolutely Brutal`
            await enemyAttackCompiler(newData, enemy_action);
            await faithFinder(newData, player_action, enemy_action);
            await statusEffectCheck(newData);
            newData.combatRound += 1;
            newData.sessionRound += 1;
            return newData
        } 
    
        if (player_counter !== enemy_action && enemy_counter !== player_action) {
            newData.player_special_description = 
                `${newData.player.name} fails to Counter ${newData.enemy.name}'s Counter! Heartbreaking`
            newData.enemy_special_description = 
                `${newData.enemy.name} fails to Counter ${newData.player.name}'s Counter! Heartbreaking`
                if (player_initiative > enemy_initiative) {
                    await attackCompiler(newData, player_action);
                    await enemyAttackCompiler(newData, enemy_action);
                } else {
                    await enemyAttackCompiler(newData, enemy_action);
                    await attackCompiler(newData, player_action);
                }
        };
    };


    // Partially Resolves Player: Counter + Countering the enemy
        // If Player Counters the enemy w/o the Enemy Countering
    if (player_action === 'counter' && enemy_action !== 'counter') {
        if (player_counter === enemy_action) {
            newData.counter_success = true;
            newData.player_special_description = 
                `${newData.player.name} successfully Countered ${newData.enemy.name}'s ${ newData.enemy_action === 'attack' ? 'Focused' : newData.enemy_action.charAt(0).toUpperCase() + newData.enemy_action.slice(1) } Attack.`
            await attackCompiler(newData, player_action)
            await faithFinder(newData, player_action, enemy_action);
            await statusEffectCheck(newData);
            newData.combatRound += 1;
            newData.sessionRound += 1;
            return newData
        } else {
            newData.player_special_description = 
                `${newData.player.name} fails to Counter ${newData.enemy.name}'s ${ newData.enemy_action === 'attack' ? 'Focused' : newData.enemy_action.charAt(0).toUpperCase() + newData.enemy_action.slice(1) } Attack. Heartbreaking!`
        }
    }

    if (enemy_action === 'counter' && player_action !== 'counter') {
        if (enemy_counter === player_action) {
            newData.enemy_counter_success = true;
            newData.enemy_special_description = 
                `${newData.enemy.name} successfully Countered ${newData.player.name}'s ${ newData.action === 'attack' ? 'Focused' : newData.action.charAt(0).toUpperCase() + newData.action.slice(1) } Attack.`
            await enemyAttackCompiler(newData, enemy_action)
            await faithFinder(newData, player_action, enemy_action);
            await statusEffectCheck(newData);
            newData.combatRound += 1;
            newData.sessionRound += 1;
            return newData
        } else {
            newData.enemy_special_description = 
                `${newData.enemy.name} fails to Counter ${newData.player.name}'s ${ newData.action === 'attack' ? 'Focused' : newData.action.charAt(0).toUpperCase() + newData.action.slice(1) } Attack. Heartbreaking!`
        }
    }


    
    if (player_action === 'dodge' && enemy_action === 'dodge') { // If both choose Dodge
        if (player_initiative > enemy_initiative) {
            newData.player_special_description = 
                `${newData.player.name} successfully Dodges ${newData.enemy.name}'s ${  newData.enemy_action === 'attack' ? 'Focused' : newData.enemy_action.charAt(0).toUpperCase() + newData.enemy_action.slice(1) } Attack`
            await attackCompiler(newData, player_action);
        } else {
            `${newData.enemy.name} successfully Dodges ${newData.player.name}'s ${  newData.action === 'attack' ? 'Focused' : newData.action.charAt(0).toUpperCase() + newData.action.slice(1) } Attack`
            await enemyAttackCompiler(newData, enemy_action);
        }
    }

    // If the Player Dodges and the enemy does not *Counter or Dodge  *Checked for success
    if (player_action === 'dodge' && enemy_action !== 'dodge') {
        newData.player_special_description = 
            `${newData.player.name} successfully Dodges ${newData.enemy.name}'s ${ newData.enemy_action === 'attack' ? 'Focused' : newData.enemy_action.charAt(0).toUpperCase() + newData.enemy_action.slice(1) } Attack`
        await attackCompiler(newData, player_action);
        await faithFinder(newData, player_action, enemy_action);
        await statusEffectCheck(newData);
        newData.combatRound += 1;
        newData.sessionRound += 1;
        return newData
    }

    // If the enemy Dodges and the Player does not *Counter or Dodge *Checked for success
    if (enemy_action === 'dodge' && player_action !== 'dodge') {
        `${newData.enemy.name} successfully Dodges ${newData.player.name}'s ${ newData.action === 'attack' ? 'Focused' : newData.action.charAt(0).toUpperCase() + newData.action.slice(1) } Attack`
        await enemyAttackCompiler(newData, enemy_action);
        await faithFinder(newData, player_action, enemy_action);
        await statusEffectCheck(newData);
        newData.combatRound += 1;
        newData.sessionRound += 1;
        return newData;
    };

    if (player_action === 'roll' && enemy_action === 'roll') { // If both choose Roll
        await doubleRollCompiler(newData, player_initiative, enemy_initiative, player_action, enemy_action);
    };

    if (player_action === 'roll' && enemy_action !== 'roll') {
        await playerRollCompiler(newData, player_initiative, enemy_initiative, player_action, enemy_action);
        if (newData.roll_success === true) {
            await faithFinder(newData, player_action, enemy_action);
            await statusEffectCheck(newData);
            newData.combatRound += 1;
            newData.sessionRound += 1;
            return newData;
        };
    };

    if (enemy_action === 'roll' && player_action !== 'roll') {
        await enemyRollCompiler(newData, player_initiative, enemy_initiative, player_action, enemy_action)
        if (newData.enemy_roll_success === true) {
            await faithFinder(newData, player_action, enemy_action);
            await statusEffectCheck(newData);
            newData.combatRound += 1;
            newData.sessionRound += 1;
            return newData;
        };
    };

    if (player_action === 'attack' || player_action === 'posture' || enemy_action === 'attack' || enemy_action === 'posture') { // If both choose Attack
        if (player_initiative > enemy_initiative) {
            await attackCompiler(newData, player_action);
            await enemyAttackCompiler(newData, enemy_action);
        } else {
            await enemyAttackCompiler(newData, enemy_action);
            await attackCompiler(newData, player_action);
        };
    };

    await faithFinder(newData, player_action, enemy_action);
    await statusEffectCheck(newData);
    
    if (newData.player_win === true) {
        newData.enemy_death_description = 
        `${newData.enemy.name} has been defeated. Hail ${newData.player.name}, ${newData.player.sex === 'Man' ? 'he' : 'she' } has won the duel!`;
    };
    if (newData.enemy_win === true) {
        newData.player_death_description = 
        `${newData.player.name} have been defeated. Hail ${newData.enemy.name}, ${newData.enemy.sex === 'Man' ? 'he' : 'she' } has won the duel!`;
    };
    if (newData.player_win === true || newData.enemy_win === true) {
        await statusEffectCheck(newData);
    };

    newData.combatRound += 1;
    newData.sessionRound += 1;

    return newData;
};

// Action Splitter Determines the Action Payload and Sorts the Resolution of the Action Round
const actionSplitter = async (combatData) => {
    //TODO:FIXME: Work on proper rendering of current health and new health totals post-damage TODO:FIXME:
    const newData = {
        room: combatData.room,
        playerPosition: combatData.playerPosition,
        enemyPosition: combatData.enemyPosition,

        player: combatData.player, // The player's Ascean
        action: combatData.action, // The player's action
        player_action: combatData.action,
        counter_guess: combatData.counter_guess, // The action chosen believed to be 
        player_health: combatData.player_health, // Current Player Health
        weapon_one: combatData.weapon_one,
        weapon_two: combatData.weapon_two,
        weapon_three: combatData.weapon_three,
        weapons: combatData.weapons, // All 3 Weapons
        player_damage_type: combatData.player_damage_type,
        player_defense: combatData.player_defense, // Posseses Base + Postured Defenses
        player_attributes: combatData.player_attributes, // Possesses compiled Attributes, Initiative
        player_defense_default: combatData.player_defense_default, // Possesses Base Defenses

        enemy: combatData.enemy, // enemy Enemy
        enemy_health: combatData.enemy_health,
        enemy_attributes: combatData.enemy_attributes, // Possesses compiled Attributes, Initiative
        enemy_defense: combatData.enemy_defense, // Posseses Base + Postured Defenses
        enemy_defense_default: combatData.enemy_defense_default, // Possesses Base Defenses
        enemy_action: '', // Action Chosen By enemy
        enemy_counter_guess: '', // Comp's Counter Guess if Action === 'Counter'
        enemy_weapons: combatData.enemy_weapons,  // All 3 Weapons
        enemy_damage_type: combatData.enemy_damage_type,

        potential_player_damage: 0, // All the Damage that is possible on hit for a player
        potential_enemy_damage: 0, // All the Damage that is possible on hit for a enemy
        realized_player_damage: 0, // Player Damage - enemy Defenses
        realized_enemy_damage: 0, // enemy Damage - Player Defenses

        playerDamaged: false,
        enemyDamaged: false,

        player_start_description: '',
        enemy_start_description: '',
        player_special_description: '',
        enemy_special_description: '',
        player_action_description: '', // The combat text to inject from the player
        enemy_action_description: '', // The combat text to inject from the enemy
        player_influence_description: '',
        enemy_influence_description: '',
        player_influence_description_two: '',
        enemy_influence_description_two: '',
        player_death_description: '',
        enemy_death_description: '',
        deaths: combatData.deaths,

        current_player_health: combatData.new_player_health, // New player health post-combat action
        current_enemy_health: combatData.new_enemy_health, // New enemy health post-combat action
        new_player_health: combatData.new_player_health, // New player health post-combat action
        new_enemy_health: combatData.new_enemy_health, // New enemy health post-combat action

        attack_weight: combatData.attack_weight,
        counter_weight: combatData.counter_weight,
        dodge_weight: combatData.dodge_weight,
        posture_weight: combatData.posture_weight,
        roll_weight: combatData.roll_weight,

        counter_attack_weight: combatData.counter_attack_weight,
        counter_counter_weight: combatData.counter_counter_weight,
        counter_dodge_weight: combatData.counter_dodge_weight,
        counter_posture_weight: combatData.counter_posture_weight,
        counter_roll_weight: combatData.counter_roll_weight,

        religious_success: false,
        enemy_religious_success: false,
        dual_wielding: false,
        enemy_dual_wielding: false,
        roll_success: false,
        counter_success: false,
        enemy_roll_success: false,
        enemy_counter_success: false,
        player_win: false,
        player_luckout: false,
        playerTrait: combatData.playerTrait,
        enemyPersuaded: false,
        enemy_win: false,

        critical_success: false,
        enemy_critical_success: false,
        glancing_blow: false,
        enemy_glancing_blow: false,

        combatRound: combatData.combatRound,
        sessionRound: combatData.sessionRound,

        playerEffects: combatData.playerEffects,
        enemyEffects: combatData.enemyEffects,
        playerBlessing: combatData.playerBlessing,
        enemyBlessing: combatData.enemyBlessing,
        prayerSacrifice: combatData.prayerSacrifice,
        prayerSacrificeName: combatData.prayerSacrificeName,

        combatInitiated: combatData.combatInitiated,
        actionStatus: combatData.actionStatus,
        gameIsLive: combatData.gameIsLive,
        combatEngaged: combatData.combatEngaged,
        dodgeStatus: combatData.dodgeStatus,
        instantStatus: combatData.instantStatus,

        highScore: combatData.highScore,
        winStreak: combatData.winStreak,
        loseStreak: combatData.loseStreak,
        spectacle: combatData.spectacle,
        spectators: combatData.spectators,

        weather: combatData.weather,
    };
    const player_initiative = newData.player_attributes.initiative;
    const enemy_initiative = newData.enemy_attributes.initiative;
    let player_action = newData.action;
    const player_counter = newData.counter_guess;
    let enemy_counter = newData.enemy_counter_guess;
    let enemy_action = newData.enemy_action;
    let possible_choices = ['attack', 'posture', 'roll']
    let postureRating = ((combatData.player_defense.physicalPosture + combatData.player_defense.magicalPosture) / 4) + 5;
    let rollRating = combatData.weapons[0].roll;
    let posture = 'posture';
    let roll = 'roll';
    if (rollRating >= 100) {
        possible_choices.push(roll)
    } else  if (postureRating >= 100) {
        possible_choices.push(posture)
    } else if (postureRating >= rollRating) { 
        possible_choices.push(posture)
    } else { 
        possible_choices.push(roll) 
    } 
    let new_choice = Math.floor(Math.random() * possible_choices.length)
    if (player_action === '') {
        newData.action = possible_choices[new_choice];
        newData.player_action = possible_choices[new_choice];
        player_action = possible_choices[new_choice];
    }
    let newEnemyWeaponOrder = newData.enemy_weapons.sort(function() {
        return Math.random() - 0.5;
    })
    newData.enemy_weapons = newEnemyWeaponOrder;

    let new_damage_type = Math.floor(Math.random() * newData.enemy_weapons[0].damage_type.length);
    newData.enemy_damage_type = newData.enemy_weapons[0].damage_type[new_damage_type];

    // Weighs and Evaluates the Action the Opponent Will Choose Based on Reaction to Player Actions (Cumulative)
    await enemyActionCompiler(newData, player_action, enemy_action, enemy_counter)
    // COUNTER >>> DODGE >>> ROLL >>> POSTURE >>> ATTACK
    enemy_counter = newData.enemy_counter_guess;
    enemy_action = newData.enemy_action;

    let prayers = ['Buff', 'Damage', 'Debuff', 'Heal'];
    let new_prayer = Math.floor(Math.random() * prayers.length);
    newData.enemyBlessing = prayers[new_prayer];

    newData.enemy_start_description = 
        `${newData.enemy.name} sets to ${enemy_action.charAt(0).toUpperCase() + enemy_action.slice(1)}${enemy_counter ? '-' + enemy_counter.charAt(0).toUpperCase() + enemy_counter.slice(1) : ''} against you.`

    newData.player_start_description = 
        `You attempt to ${player_action.charAt(0).toUpperCase() + player_action.slice(1)}${player_counter ? '-' + player_counter.charAt(0).toUpperCase() + player_counter.slice(1) : ''} against ${newData.enemy.name}.`
    
    // If both Player and enemy Counter -> Counter [Fastest Resolution]
    if (player_action === 'counter' && enemy_action === 'counter') { // This is if COUNTER: 'ACTION' Is the Same for Both
        if (player_counter === enemy_counter && player_counter === 'counter') {
            if (player_initiative > enemy_initiative) {
                newData.counter_success = true;
                newData.player_special_description = 
                    `You successfully Countered ${newData.enemy.name}'s Counter-Counter! Absolutely Brutal`;
                await attackCompiler(newData, player_action);
                await faithFinder(newData, player_action, enemy_action);

                await statusEffectCheck(newData);
                newData.combatRound += 1;
                newData.sessionRound += 1;
                return newData
            } else {
                newData.enemy_counter_success = true;
                newData.enemy_special_description = 
                    `${newData.enemy.name} successfully Countered your Counter-Counter! Absolutely Brutal`
                await enemyAttackCompiler(newData, enemy_action);
                await faithFinder(newData, player_action, enemy_action);

                await statusEffectCheck(newData);
                newData.combatRound += 1;
                newData.sessionRound += 1;
                return newData
            }    
        }
        // If the Player Guesses Right and the enemy Guesses Wrong
        if (player_counter === enemy_action && enemy_counter !== player_action) {
            newData.counter_success = true;
            newData.player_special_description = 
                `You successfully Countered ${newData.enemy.name}'s Counter-${enemy_counter.charAt(0).toUpperCase() + enemy_counter.slice(1)}! Absolutely Brutal`
            await attackCompiler(newData, player_action)
            await faithFinder(newData, player_action, enemy_action);
            await statusEffectCheck(newData);
            newData.combatRound += 1;
            newData.sessionRound += 1;
            return newData
        }
    
        // If the enemy Guesses Right and the Player Guesses Wrong
        if (enemy_counter === player_action && player_counter !== enemy_action) {
            newData.enemy_counter_success = true;
            newData.enemy_special_description = 
                `${newData.enemy.name} successfully Countered your Counter-${player_counter.charAt(0).toUpperCase() + player_counter.slice(1)}! Absolutely Brutal`
            await enemyAttackCompiler(newData, enemy_action);
            await faithFinder(newData, player_action, enemy_action);
            await statusEffectCheck(newData);
            newData.combatRound += 1;
            newData.sessionRound += 1;
            return newData
        } 
    
        if (player_counter !== enemy_action && enemy_counter !== player_action) {
            newData.player_special_description = 
                `You failed to Counter ${newData.enemy.name}'s Counter! Heartbreaking`
            newData.enemy_special_description = 
                `${newData.enemy.name} fails to Counter your Counter! Heartbreaking`
                if (player_initiative > enemy_initiative) {
                    await attackCompiler(newData, player_action);
                    await enemyAttackCompiler(newData, enemy_action);
                } else {
                    await enemyAttackCompiler(newData, enemy_action);
                    await attackCompiler(newData, player_action);
                }
        }
    } 


    // Partially Resolves Player: Counter + Countering the enemy
        // If Player Counters the enemy w/o the Enemy Countering
    if (player_action === 'counter' && enemy_action !== 'counter') {
        if (player_counter === enemy_action) {
            newData.counter_success = true;
            newData.player_special_description = 
                `You successfully Countered ${newData.enemy.name}'s ${ newData.enemy_action === 'attack' ? 'Focused' : newData.enemy_action.charAt(0).toUpperCase() + newData.enemy_action.slice(1) } Attack.`
            await attackCompiler(newData, player_action)
            await faithFinder(newData, player_action, enemy_action);
            await statusEffectCheck(newData);
            newData.combatRound += 1;
            newData.sessionRound += 1;
            return newData
        } else {
            newData.player_special_description = 
                `You failed to Counter ${newData.enemy.name}'s ${ newData.enemy_action === 'attack' ? 'Focused' : newData.enemy_action.charAt(0).toUpperCase() + newData.enemy_action.slice(1) } Attack. Heartbreaking!`
        }
    }

    if (enemy_action === 'counter' && player_action !== 'counter') {
        if (enemy_counter === player_action) {
            newData.enemy_counter_success = true;
            newData.enemy_special_description = 
                `${newData.enemy.name} successfully Countered your ${ newData.action === 'attack' ? 'Focused' : newData.action.charAt(0).toUpperCase() + newData.action.slice(1) } Attack.`
            await enemyAttackCompiler(newData, enemy_action)
            await faithFinder(newData, player_action, enemy_action);
            await statusEffectCheck(newData);
            newData.combatRound += 1;
            newData.sessionRound += 1;
            return newData
        } else {
            newData.enemy_special_description = 
                `${newData.enemy.name} fails to Counter your ${ newData.action === 'attack' ? 'Focused' : newData.action.charAt(0).toUpperCase() + newData.action.slice(1) } Attack. Heartbreaking!`
        }
    }


    
    if (player_action === 'dodge' && enemy_action === 'dodge') { // If both choose Dodge
        if (player_initiative > enemy_initiative) {
            newData.player_special_description = 
                `You successfully Dodge ${newData.enemy.name}'s ${  newData.enemy_action === 'attack' ? 'Focused' : newData.enemy_action.charAt(0).toUpperCase() + newData.enemy_action.slice(1) } Attack`
            await attackCompiler(newData, player_action);
        } else {
            `${newData.enemy.name} successfully Dodges your ${  newData.action === 'attack' ? 'Focused' : newData.action.charAt(0).toUpperCase() + newData.action.slice(1) } Attack`
            await enemyAttackCompiler(newData, enemy_action);
        }
    }

    // If the Player Dodges and the enemy does not *Counter or Dodge  *Checked for success
    if (player_action === 'dodge' && enemy_action !== 'dodge') {
        newData.player_special_description = 
            `You successfully Dodge ${newData.enemy.name}'s ${ newData.enemy_action === 'attack' ? 'Focused' : newData.enemy_action.charAt(0).toUpperCase() + newData.enemy_action.slice(1) } Attack`
        await attackCompiler(newData, player_action);
        await faithFinder(newData, player_action, enemy_action);
        await statusEffectCheck(newData);
        newData.combatRound += 1;
        newData.sessionRound += 1;
        return newData
    }

    // If the enemy Dodges and the Player does not *Counter or Dodge *Checked for success
    if (enemy_action === 'dodge' && player_action !== 'dodge') {
        `${newData.enemy.name} successfully Dodges your ${ newData.action === 'attack' ? 'Focused' : newData.action.charAt(0).toUpperCase() + newData.action.slice(1) } Attack`
        await enemyAttackCompiler(newData, enemy_action);
        await faithFinder(newData, player_action, enemy_action);
        await statusEffectCheck(newData);
        newData.combatRound += 1;
        newData.sessionRound += 1;
        return newData;
    };

    if (player_action === 'roll' && enemy_action === 'roll') { // If both choose Roll
        await doubleRollCompiler(newData, player_initiative, enemy_initiative, player_action, enemy_action);
    };

    if (player_action === 'roll' && enemy_action !== 'roll') {
        await playerRollCompiler(newData, player_initiative, enemy_initiative, player_action, enemy_action);
        if (newData.roll_success === true) {
            await faithFinder(newData, player_action, enemy_action);
            await statusEffectCheck(newData);
            newData.combatRound += 1;
            newData.sessionRound += 1;
            return newData;
        };
    };

    if (enemy_action === 'roll' && player_action !== 'roll') {
        await enemyRollCompiler(newData, player_initiative, enemy_initiative, player_action, enemy_action)
        if (newData.enemy_roll_success === true) {
            await faithFinder(newData, player_action, enemy_action);
            await statusEffectCheck(newData);
            newData.combatRound += 1;
            newData.sessionRound += 1;
            return newData;
        };
    };

    if (player_action === 'attack' || player_action === 'posture' || enemy_action === 'attack' || enemy_action === 'posture') { // If both choose Attack
        if (player_initiative > enemy_initiative) {
            await attackCompiler(newData, player_action);
            await enemyAttackCompiler(newData, enemy_action);
        } else {
            await enemyAttackCompiler(newData, enemy_action);
            await attackCompiler(newData, player_action);
        };
    };

    await faithFinder(newData, player_action, enemy_action);
    await statusEffectCheck(newData);
    
    if (newData.player_win === true) {
        newData.enemy_death_description = 
        `${newData.enemy.name} has been defeated. Hail ${newData.player.name}, you have won the duel!`;
    };
    if (newData.enemy_win === true) {
        newData.player_death_description = 
        `You have been defeated. Hail ${newData.enemy.name}, they have won the duel!`;
    };
    if (newData.player_win === true || newData.enemy_win === true) {
        await statusEffectCheck(newData);
    };

    newData.combatRound += 1;
    newData.sessionRound += 1;

    return newData;
};

const prayerSplitter = async (combatData, prayer) => {
    let originalPrayer = combatData.playerBlessing;
    combatData.playerBlessing = prayer;
    let existingEffect = combatData.playerEffects.find(effect => effect.name === `Gift of ${combatData.weapons[0].influences[0]}` && effect.prayer === combatData.playerBlessing);   
    // Handles the creation of a new Status Effect if it doesn't already exist
    if (!existingEffect) {
        existingEffect = new StatusEffect(combatData, combatData.player, combatData.enemy, combatData.weapons[0], combatData.player_attributes, combatData.playerBlessing);
        combatData.playerEffects.push(existingEffect);
        combatData.player_influence_description = existingEffect.description;
        // console.log(existingEffect, 'New Status Effect in Game Services');
    } else if (existingEffect.stacks) { // If the effect already exists and it stacks, update the endTick and intensity, for Damage and Buffs
        existingEffect.tick.end += 2;
        existingEffect.activeStacks += 1;
        existingEffect.effect = StatusEffect.updateEffectStack(existingEffect, combatData, combatData.player, combatData.weapons[0], combatData.player_attributes, combatData.playerBlessing);
        combatData.player_influence_description = `${existingEffect.description} Stacked ${existingEffect.activeStacks} times.`;
        switch (existingEffect.prayer) {
            case 'Buff': {
                for (let key in existingEffect.effect) {
                    if (existingEffect.effect[key] && key !== 'dodge') {
                        combatData.weapons[0][key] += existingEffect.effect[key];
                    } else {
                        combatData.weapons[0][key] -= existingEffect.effect[key];
                    };
                    combatData.weapons[0][key] = roundToTwoDecimals(combatData.weapons[0][key]);
                };
                for (let key in combatData.player_defense) {
                    if (existingEffect.effect[key]) {
                        combatData.player_defense[key] += existingEffect.effect[key];
                        combatData.player_defense[key] = roundToTwoDecimals(combatData.player_defense[key]);
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
        combatData.player_influence_description = `${existingEffect.description} Refreshed ${existingEffect.activeRefreshes} time(s) for ${existingEffect.duration + 1} round(s).`;
    };
    combatData.playerBlessing = originalPrayer;
    return combatData;
};

const instantDamageSplitter = async (combatData, mastery) => {
    let damage = combatData.player[mastery] * 0.5 + combatData.player.level;
    console.log(damage, 'Damage');
    combatData.realized_player_damage = damage;
    combatData.new_enemy_health = combatData.current_enemy_health - combatData.realized_player_damage;
    combatData.current_enemy_health = combatData.new_enemy_health; 
    combatData.enemyDamaged = true;
    combatData.player_action = 'invoke';
    combatData.player_action_description = 
        `You attack ${combatData.enemy.name}'s Caeren with your ${combatData.player.mastery}'s Invocation of ${combatData.weapons[0].influences[0]} for ${Math.round(damage)} Pure Damage.`;
};

const instantActionSplitter = async (combatData) => {
    switch (combatData.player.mastery) {
        case 'Constitution':
            await prayerSplitter(combatData, 'Heal');
            await instantEffectCheck(combatData);
            await prayerSplitter(combatData, 'Buff');
            break;
        case 'Strength':
            await prayerSplitter(combatData, 'Buff');
            await instantDamageSplitter(combatData, 'strength');
            break;
        case 'Agility':
            await prayerSplitter(combatData, 'Buff');
            await instantDamageSplitter(combatData, 'agility');
            break;
        case 'Achre':
            await prayerSplitter(combatData, 'Buff');
            await instantDamageSplitter(combatData, 'achre');
            break;
        case 'Caeren':
            await prayerSplitter(combatData, 'Buff');
            await instantDamageSplitter(combatData, 'caeren');
            break;
        case 'Kyosir':
            await prayerSplitter(combatData, 'Damage');
            await instantEffectCheck(combatData);
            await prayerSplitter(combatData, 'Debuff');
            break;
    };
    if (combatData.new_enemy_health <= 0 || combatData.current_enemy_health <= 0) {
        combatData.new_enemy_health = 0;
        combatData.player_win = true;
    };
    return combatData;
};

const instantEffectCheck = async (combatData) => {
    combatData.playerEffects = combatData.playerEffects.filter(effect => {
        if (effect.tick.start !== combatData.combatRound) return true;
        const matchingWeapon = combatData.weapons.find(weapon => weapon.name === effect.weapon);
        const matchingWeaponIndex = combatData.weapons.indexOf(matchingWeapon);
            switch (effect.prayer) {
                case 'Buff': { // Buffs are applied on the first tick, and if found via existingEffect proc, they have already been enhanced by the stack.
                    if (effect.activeStacks === 1) {
                        for (let key in effect.effect) {
                            if (effect.effect[key] && key !== 'dodge') {
                                combatData.weapons[matchingWeaponIndex][key] += effect.effect[key];
                            } else {
                                combatData.weapons[matchingWeaponIndex][key] -= effect.effect[key];
                            };
                            combatData.weapons[matchingWeaponIndex][key] = roundToTwoDecimals(combatData.weapons[matchingWeaponIndex][key]);
                        };
                        for (let key in combatData.player_defense) {
                            if (effect.effect[key]) {
                                combatData.player_defense[key] += effect.effect[key];
                                combatData.player_defense[key] = roundToTwoDecimals(combatData.player_defense[key]);
                            };
                        };
                    };
                    break;
                };
                case 'Debuff': { // Debuffs are applied on the first tick, so they don't need to be reapplied every tick. Refreshes, Not Stackable. Will test for Balance
                    if (effect.activeRefreshes === 0) {
                        effect.debuffTarget = combatData.enemy_weapons[0].name;
                        for (let key in effect.effect) {
                            if (effect.effect[key] && key !== 'dodge') {
                                combatData.enemy_weapons[0][key] -= effect.effect[key];
                            } else {
                                combatData.enemy_weapons[0][key] += effect.effect[key];
                            };
                            combatData.enemy_weapons[0][key] = roundToTwoDecimals(combatData.enemy_weapons[0][key]);
                        };
                        for (let key in combatData.enemy_defense) { // Buff
                            if (effect.effect[key]) {
                                combatData.enemy_defense[key] -= effect.effect[key];
                                combatData.enemy_defense[key] = roundToTwoDecimals(combatData.enemy_defense[key]);
                            };
                        };
                    };
                    break;
                };
                case 'Damage': { // Damage Ticks, 33% of the Damage/Tick (Round), Can Stack and experience the enhanced damage if procced this round, Testing if Stacking is Balanced
                    combatData.new_enemy_health -= effect.effect.damage * 0.33;
                    combatData.current_enemy_health -= effect.effect.damage * 0.33;

                    if (combatData.current_enemy_health < 0 || combatData.new_enemy_health < 0) {
                        combatData.new_enemy_health = 0;
                        combatData.current_enemy_health = 0;
                        combatData.enemy_win = false;
                        combatData.player_win = true;
                    };
                    break;
                };
                case 'Heal': { // Heal Ticks, 33% of the Heal/Tick (Round), Can Refresh, Testing if Stacking is Balanced
                    combatData.new_player_health += effect.effect.healing * 0.33;
                    combatData.current_player_health += effect.effect.healing * 0.33;

                    if (combatData.current_player_health > 0 || combatData.new_player_health > 0) {
                        combatData.enemy_win = false;
                    };
                    break;
                };
            };
        return true;
    });
};

const consumePrayerSplitter = async (combatData) => {
    console.log("Consuming Prayer: ", combatData.new_player_health, combatData.current_player_health, "Player Health Before");
    combatData.playerEffects = combatData.playerEffects.filter(effect => {
        const matchingWeapon = combatData.weapons.find(weapon => weapon.name === effect.weapon);
        const matchingWeaponIndex = combatData.weapons.indexOf(matchingWeapon);
        const matchingDebuffTarget = combatData.enemy_weapons.find(weapon => weapon.name === effect.debuffTarget);
        const matchingDebuffTargetIndex = combatData.enemy_weapons.indexOf(matchingDebuffTarget);
        if (effect.prayer !== combatData.prayerSacrifice || effect.name !== combatData.prayerSacrificeName) return true;
        switch (combatData.prayerSacrifice) {
            case 'Heal':
                console.log(combatData.new_player_health, combatData.current_player_health, "Player Health Before")
                console.log("Healing for :", effect.effect.healing * 0.165);
                combatData.new_player_health += effect.effect.healing * 0.165;
                combatData.current_player_health += effect.effect.healing * 0.165;
                console.log(combatData.new_player_health, combatData.current_player_health, "Player Health After")
                if (combatData.current_player_health > 0 || combatData.new_player_health > 0) {
                    combatData.enemy_win = false;
                };
                break;
            case 'Buff':
                combatData.new_enemy_health = combatData.current_enemy_health - (combatData.realized_player_damage * 0.5);
                combatData.current_enemy_health = combatData.new_enemy_health; // Added to persist health totals?
            
                combatData.player_action_description = 
                    `${combatData.weapons[0].influences[0]}'s Tendrils serenade ${combatData.enemy.name}, echoing ${Math.round(combatData.realized_player_damage * 0.5)} more damage.`    
            
                if (combatData.new_enemy_health <= 0 || combatData.current_enemy_health <= 0) {
                    combatData.new_enemy_health = 0;
                    combatData.player_win = true;
                };
                for (let key in effect.effect) {
                    if (key in combatData.weapons[matchingWeaponIndex]) {
                        if (key !== 'dodge') {
                            combatData.weapons[matchingWeaponIndex][key] -= effect.effect[key] * effect.activeStacks;
                        } else {
                            combatData.weapons[matchingWeaponIndex][key] += effect.effect[key] * effect.activeStacks;
                        };
                        combatData.weapons[matchingWeaponIndex][key] = roundToTwoDecimals(combatData.weapons[matchingWeaponIndex][key]);
                    };
                    if (key in combatData.player_defense) {
                        combatData.player_defense[key] -= effect.effect[key] * effect.activeStacks;
                        combatData.player_defense[key] = roundToTwoDecimals(combatData.player_defense[key]);
                    };
                };
                break;
            case 'Damage':
                combatData.new_enemy_health -= effect.effect.damage * 0.165;
                combatData.current_enemy_health -= effect.effect.damage * 0.165;

                if (combatData.new_enemy_health <= 0 || combatData.current_enemy_health <= 0) {
                    combatData.new_enemy_health = 0;
                    combatData.player_win = true;
                };

                break;
            case 'Debuff':
                combatData.new_enemy_health = combatData.current_enemy_health - (combatData.realized_enemy_damage * 0.5);
                combatData.current_enemy_health = combatData.new_enemy_health; // Added to persist health totals?
                combatData.player_action_description = 
                    `The Hush of ${combatData.weapons[0].influences[0]} wracks ${combatData.enemy.name}, wearing for ${Math.round(combatData.realized_enemy_damage * 0.5)} more damage.`;  
                if (combatData.new_enemy_health <= 0 || combatData.current_enemy_health <= 0) {
                    combatData.new_enemy_health = 0;
                    combatData.player_win = true;
                };
                for (let key in effect.effect) {
                    if (key in combatData.enemy_weapons[matchingDebuffTargetIndex]) {
                        if (key !== 'dodge') {
                            combatData.enemy_weapons[matchingDebuffTargetIndex][key] += effect.effect[key] * effect.activeStacks;
                        } else {
                            combatData.enemy_weapons[matchingDebuffTargetIndex][key] -= effect.effect[key] * effect.activeStacks;
                        };
                        combatData.enemy_weapons[matchingDebuffTargetIndex][key] = roundToTwoDecimals(combatData.enemy_weapons[matchingDebuffTargetIndex][key]);
                    };
                    if (key in combatData.enemy_defense) {
                        combatData.enemy_defense[key] += effect.effect[key] * effect.activeStacks;
                        combatData.enemy_defense[key] = roundToTwoDecimals(combatData.enemy_defense[key]);
                    };
                };
                break;
            default: break;
        };
        return false;
    });
    if (combatData.prayerSacrifice !== 'Heal') {
        if (combatData.realized_player_damage > 0) {
            combatData.enemyDamaged = true;
        };
    };
    combatData.player_action = 'prayer';
    combatData.prayerSacrifice = '';
    return combatData;
};

// ================================= CONTROLLER - SERVICE ===================================== \\

const pvpActionCompiler = async (combatData) => {
    try {
        
        let playerOne = combatData.playerOneData;
        let playerTwo = combatData.playerTwoData;

        const newData = {
            room: combatData.room,
            playerPosition: playerOne.playerPosition,
            enemyPosition: playerOne.enemyPosition,
    
            player: playerOne.player, // The player's Ascean
            action: playerOne.action, // The player's action
            player_action: playerOne.action,
            counter_guess: playerOne.counter_guess, // The action chosen believed to be 
            player_health: playerOne.player_health, // Current Player Health
            weapon_one: playerOne.weapon_one,
            weapon_two: playerOne.weapon_two,
            weapon_three: playerOne.weapon_three,
            weapons: playerOne.weapons, // All 3 Weapons
            player_damage_type: playerOne.player_damage_type,
            player_defense: playerOne.player_defense, // Posseses Base + Postured Defenses
            player_attributes: playerOne.player_attributes, // Possesses compiled Attributes, Initiative
            player_defense_default: playerOne.player_defense_default, // Possesses Base Defenses
    
            enemy: playerTwo.player, // enemy Enemy
            enemy_health: playerTwo.player_health,
            enemy_attributes: playerTwo.player_attributes, // Possesses compiled Attributes, Initiative
            enemy_defense: playerTwo.player_defense, // Posseses Base + Postured Defenses
            enemy_defense_default: playerTwo.player_defense_default, // Possesses Base Defenses
            enemy_action: playerTwo.action, // Action Chosen By enemy
            enemy_counter_guess: playerTwo.counter_guess, // Comp's Counter Guess if Action === 'Counter'
            enemy_weapons: playerTwo.weapons,  // All 3 Weapons
            enemy_damage_type: playerTwo.player_damage_type,
    
            potential_player_damage: 0, // All the Damage that is possible on hit for a player
            potential_enemy_damage: 0, // All the Damage that is possible on hit for a enemy
            realized_player_damage: 0, // Player Damage - enemy Defenses
            realized_enemy_damage: 0, // enemy Damage - Player Defenses
    
            playerDamaged: false,
            enemyDamaged: false,
    
            player_start_description: '',
            enemy_start_description: '',
            player_special_description: '',
            enemy_special_description: '',
            player_action_description: '', // The combat text to inject from the player
            enemy_action_description: '', // The combat text to inject from the enemy
            player_influence_description: '',
            enemy_influence_description: '',
            player_influence_description_two: '',
            enemy_influence_description_two: '',
            player_death_description: '',
            enemy_death_description: '',
    
            current_player_health: playerOne.new_player_health, // New player health post-combat action
            current_enemy_health: playerTwo.new_player_health, // New enemy health post-combat action
            new_player_health: playerOne.new_player_health, // New player health post-combat action
            new_enemy_health: playerTwo.new_player_health, // New enemy health post-combat action
    
            religious_success: false,
            enemy_religious_success: false,
            dual_wielding: false,
            enemy_dual_wielding: false,
            roll_success: false,
            counter_success: false,
            enemy_roll_success: false,
            enemy_counter_success: false,
            player_win: false,
            enemy_win: false,
    
            critical_success: false,
            enemy_critical_success: false,
            glancing_blow: false,
            enemy_glancing_blow: false,
    
            combatRound: playerOne.combatRound,
            sessionRound: playerOne.sessionRound,
    
            playerEffects: playerOne.playerEffects,
            enemyEffects: playerTwo.playerEffects,
            playerBlessing: playerOne.playerBlessing,
            enemyBlessing: playerTwo.enemyBlessing,
    
        };
        let result = await pvpActionSplitter(newData);
        console.log(result.player_action, result.enemy_action, 'P1-P2 Actions');
        if (result.realized_enemy_damage > 0) result.playerDamaged = true;
        if (result.realized_player_damage > 0) result.enemyDamaged = true;
        if (result.player_win === true || result.enemy_win === true) {
            await statusEffectCheck(result);
        };
        let reverseResult = {
            weapons: result.enemy_weapons, // All 3 Weapons
            player_damage_type: result.enemy_damage_type, 
            player_defense: result.enemy_defense, // Posseses Base + Postured Defenses
            player_attributes: result.enemy_attributes, // Possesses compiled Attributes, Initiative
            action: result.enemy_action,
            player_action: result.enemy_action,
    
            enemy_attributes: result.player_attributes, // Possesses compiled Attributes, Initiative
            enemy_defense: result.player_defense, // Posseses Base + Postured Defenses
            enemy_weapons: result.weapons,  // All 3 Weapons
            enemy_damage_type: result.player_damage_type,
            enemy_action: result.action,

            potential_player_damage: result.potential_enemy_damage, // All the Damage that is possible on hit for a player
            potential_enemy_damage: result.potential_player_damage, // All the Damage that is possible on hit for a enemy
            realized_player_damage: result.realized_enemy_damage, // Player Damage - enemy Defenses
            realized_enemy_damage: result.realized_player_damage, // enemy Damage - Player Defenses
    
            playerDamaged: result.playerDamaged,
            enemyDamaged: result.enemyDamaged,
    
            player_start_description: result.enemy_start_description,
            enemy_start_description: result.player_start_description,
            player_special_description: result.enemy_special_description,
            enemy_special_description: result.player_special_description,
            player_action_description: result.enemy_action_description, // The combat text to inject from the player
            enemy_action_description: result.player_action_description, // The combat text to inject from the enemy
            player_influence_description: result.enemy_influence_description,
            enemy_influence_description: result.player_influence_description,
            player_influence_description_two: result.enemy_influence_description_two,
            enemy_influence_description_two: result.player_influence_description_two,
            player_death_description: result.enemy_death_description,
            enemy_death_description: result.player_death_description,
    
            current_player_health: result.new_enemy_health, // New player health post-combat action
            current_enemy_health: result.new_player_health, // New enemy health post-combat action
            new_player_health: result.new_enemy_health, // New player health post-combat action
            new_enemy_health: result.new_player_health, // New enemy health post-combat action
    
            religious_success: result.enemy_religious_success,
            enemy_religious_success: result.religious_success,
            dual_wielding: result.enemy_dual_wielding,
            enemy_dual_wielding: result.dual_wielding,
            roll_success: result.enemy_roll_success,
            counter_success: result.enemy_counter_success,
            enemy_roll_success: result.roll_success,
            enemy_counter_success: result.counter_success,
            player_win: result.enemy_win,
            enemy_win: result.player_win,
    
            critical_success: result.enemy_critical_success,
            enemy_critical_success: result.critical_success,
            glancing_blow: result.enemy_glancing_blow,
            enemy_glancing_blow: result.glancing_blow,
    
            combatRound: result.combatRound,
            sessionRound: result.sessionRound,
    
            playerEffects: result.enemyEffects,
            enemyEffects: result.playerEffects,
            playerBlessing: result.enemyBlessing,
            enemyBlessing: result.playerBlessing,
        };

        playerOne = {
            ...playerOne,
            ...result,
            playerOneReady: false,
            playerTwoReady: false,
            timestamp: 0,
        };
        playerTwo = {
            ...playerTwo,
            ...reverseResult,
            playerTwoReady: false,
            playerOneReady: false,
            timestamp: 0,
        };
        const resultData = { playerOneData: playerOne, playerTwoData: playerTwo };
        return resultData;
    } catch (err) {
        console.log(err, 'Error in the PvP Action Compiler of Game Services');
        res.status(400).json({ err })
    };
};

const actionCompiler = async (combatData) => {
    try {
        let result = await actionSplitter(combatData);
        if (result.realized_enemy_damage > 0) result.playerDamaged = true;
        if (result.realized_player_damage > 0) result.enemyDamaged = true;
        console.log(result.realized_enemy_damage, result.realized_player_damage, 'Comp-Player Damage Dealt', result.playerDamaged, result.enemyDamaged, 'Comp-Player Damaged')
        if (result.player_win === true || result.enemy_win === true) {
            await statusEffectCheck(result);
        };
        return result
    } catch (err) {
        console.log(err, 'Error in the Action Compiler of Game Services');
        res.status(400).json({ err })
    };
};

const instantActionCompiler = async (combatData) => {
    try {
        let result = await instantActionSplitter(combatData);
        if (result.player_win === true || result.enemy_win === true) {
            await statusEffectCheck(result);
        };
        return result;
    } catch (err) {
        console.log(err, 'Error in the Instant Action Compiler of Game Services');
        res.status(400).json({ err })
    };
};

const consumePrayer = async (combatData) => {
    try {
        let result = await consumePrayerSplitter(combatData);
        if (result.player_win === true || result.enemy_win === true) {
            await statusEffectCheck(result);
        };
        return result;
    } catch (err) {
        console.log(err, 'Error in the Consume Prayer of Game Services');
        res.status(400).json({ err })
    };
};

module.exports = {
    pvpActionCompiler,
    actionCompiler,
    instantActionCompiler,
    consumePrayer
};