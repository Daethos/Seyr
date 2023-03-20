const StatusEffect = require('./faithServices.js');

const statusEffectCheck = async (combatData) => {
    combatData.playerEffects = combatData.playerEffects.filter(effect => {
        // console.log(effect.name, effect.tick.end, combatData.combatRound, combatData.player_win, combatData.computer_win, 'Player Effect in statusCheck, Checking: End Tick, Combat Round, Player Win, Computer Win');
        const matchingWeapon = combatData.weapons.find(weapon => weapon.name === effect.weapon);
        const matchingWeaponIndex = combatData.weapons.indexOf(matchingWeapon);
        const matchingDebuffTarget = combatData.computer_weapons.find(weapon => weapon.name === effect.debuffTarget);
        const matchingDebuffTargetIndex = combatData.computer_weapons.indexOf(matchingDebuffTarget);
        if (effect.tick.end === combatData.combatRound || combatData.player_win === true || combatData.computer_win === true) { // The Effect Expires
            if (effect.prayer === 'Buff') { // Reverses the Buff Effect to the magnitude of the stack to the proper weapon
                // console.log('Player Buff Effect Expires');
                for (let key in effect.effect) {
                    if (key in combatData.weapons[matchingWeaponIndex]) {
                        if (key !== 'dodge') {
                            // console.log(effect.effect, key, 'Buff Effect Expires in Weapon Loop');
                            combatData.weapons[matchingWeaponIndex][key] -= effect.effect[key] * effect.activeStacks;
                        } else {
                            combatData.weapons[matchingWeaponIndex][key] += effect.effect[key] * effect.activeStacks;
                        }
                    }
                    if (key in combatData.player_defense) {
                        // console.log(effect.effect, key, 'Buff Effect Expires in Defense Loop');
                        combatData.player_defense[key] -= effect.effect[key] * effect.activeStacks;
                    }
                }
            }
            if (effect.prayer === 'Debuff') { // Revereses the Debuff Effect to the proper weapon
                // console.log(effect.name, 'The Effect Expiring Against the Debuff Target', effect.debuffTarget, matchingDebuffTarget, matchingDebuffTargetIndex);
                for (let key in effect.effect) {

                    if (key in combatData.computer_weapons[matchingDebuffTargetIndex]) {
                        if (key !== 'dodge') {
                            // console.log(effect.effect, key, 'Debuff Effect Expires in Weapon Loop');
                            combatData.computer_weapons[matchingDebuffTargetIndex][key] += effect.effect[key] * effect.activeStacks;
                        } else {
                            combatData.computer_weapons[matchingDebuffTargetIndex][key] -= effect.effect[key] * effect.activeStacks;
                        }
                    }
                    if (key in combatData.computer_defense) {
                        // console.log(effect.effect, key, 'Debuff Effect Expires in Defense Loop');
                        combatData.computer_defense[key] += effect.effect[key] * effect.activeStacks;
                    }
                }
            }
            // console.log(effect.name, effect.prayer, 'Player Effect Expiring');
            return false;
        } else { // The Effect Persists
            switch (effect.prayer) {
                case 'Buff': { // Buffs are applied on the first tick, and if found via existingEffect proc, they have already been enhanced by the stack.
                    if (effect.activeStacks === 1 && effect.tick.start === combatData.combatRound) {
                        for (let key in effect.effect) {
                            if (effect.effect[key] && key !== 'dodge') {
                                combatData.weapons[matchingWeaponIndex][key] += effect.effect[key];
                            } else {
                                combatData.weapons[matchingWeaponIndex][key] -= effect.effect[key];
                            }
                        }
                        for (let key in combatData.player_defense) {
                            if (effect.effect[key]) combatData.player_defense[key] += effect.effect[key];
                        }
                    }
                    // console.log(effect.name, effect.prayer, 'Player Buff Ticking');
                    break;
                }
                case 'Debuff': { // Debuffs are applied on the first tick, so they don't need to be reapplied every tick. Refreshes, Not Stackable. Will test for Balance
                    if (effect.activeRefreshes === 0 && effect.tick.start === combatData.combatRound) {
                        effect.debuffTarget = combatData.computer_weapons[0].name;
                        for (let key in effect.effect) {
                            if (effect.effect[key] && key !== 'dodge') {
                                combatData.computer_weapons[0][key] -= effect.effect[key];
                            } else {
                                combatData.computer_weapons[0][key] += effect.effect[key];
                            }
                        }
                        for (let key in combatData.computer_defense) { // Buff
                            if (effect.effect[key]) {
                                combatData.computer_defense[key] -= effect.effect[key];
                            }
                        }
                    }
                    // console.log(effect.name, effect.prayer, 'Computer Debuff Ticking');
                    break;
                }
                case 'Damage': { // Damage Ticks, 33% of the Damage/Tick (Round), Can Stack and experience the enhanced damage if procced this round, Testing if Stacking is Balanced
                    combatData.new_computer_health -= effect.effect.damage * 0.33;
                    combatData.current_computer_health -= effect.effect.damage * 0.33;

                    // console.log(effect.name, effect.prayer, 'Damage Effect Ticking');

                    if (combatData.current_computer_health < 0 || combatData.new_computer_health < 0) {
                        combatData.new_computer_health = 0;
                        combatData.current_computer_health = 0;
                        combatData.computer_win = false;
                        combatData.player_win = true;
                    }
                    break;
                }
                case 'Heal': { // Heal Ticks, 33% of the Heal/Tick (Round), Can Refresh, Testing if Stacking is Balanced
                    combatData.new_player_health += effect.effect.healing * 0.33;
                    combatData.current_player_health += effect.effect.healing * 0.33;

                    if (combatData.current_player_health > 0 || combatData.new_player_health > 0) {
                        combatData.computer_win = false;
                    }
                    // console.log(effect.name, effect.prayer, 'Heal Ticking');
                    break;
                }

            }
            return true;
        }
    });

    combatData.computerEffects = combatData.computerEffects.filter(effect => {
        // console.log(effect.name, effect.tick.end, combatData.combatRound, combatData.player_win, combatData.computer_win, 'Computer Effect in statusCheck, Checking: End Tick, Combat Round, Player Win, Computer Win')
        const matchingWeapon = combatData.computer_weapons.find(weapon => weapon.name === effect.weapon);
        const matchingWeaponIndex = combatData.computer_weapons.indexOf(matchingWeapon);
        const matchingDebuffTarget = combatData.weapons.find(weapon => weapon.name === effect.debuffTarget);
        const matchingDebuffTargetIndex = combatData.weapons.indexOf(matchingDebuffTarget);
        if (effect.tick.end === combatData.combatRound || combatData.player_win === true || combatData.computer_win === true) { // The Effect Expires
            if (effect.prayer === 'Buff') { // Reverses the Buff Effect to the magnitude of the stack to the proper weapon
                // console.log('Computer Buff Effect Expires');
                for (let key in effect.effect) {
                    if (effect.effect[key] && key !== 'dodge') {
                        // console.log(combatData.computer_weapons[matchingWeaponIndex], effect.effect, key, 'Buff Effect Expires in Effect Loop');
                        combatData.computer_weapons[matchingWeaponIndex][key] -= effect.effect[key] * effect.activeStacks;
                    } else {
                        combatData.computer_weapons[matchingWeaponIndex][key] += effect.effect[key] * effect.activeStacks;
                    }
                }
                for (let key in combatData.computer_defense) {
                    if (effect.effect[key]) combatData.computer_defense[key] -= effect.effect[key] * effect.activeStacks;
                }
            }
            if (effect.prayer === 'Debuff') { // Revereses the Debuff Effect to the proper weapon
                for (let key in effect.effect) {
                    if (effect.effect[key] && key !== 'dodge') {
                        combatData.weapons[matchingDebuffTargetIndex][key] += effect.effect[key];
                    } else {
                        combatData.weapons[matchingDebuffTargetIndex][key] -= effect.effect[key];
                    }
                }
                for (let key in combatData.player_defense) {
                    if (effect.effect[key]) combatData.player_defense[key] += effect.effect[key];
                }
            }
            // console.log(effect.name, effect.prayer, 'Computer Effect Expiring')
            return false;
        } else { // The Effect Persists
            switch (effect.prayer) {
                case 'Buff': { // Buffs are applied
                    if (effect.activeStacks === 1 && effect.tick.start === combatData.combatRound) {
                        for (let key in effect.effect) {
                            if (effect.effect[key] && key !== 'dodge') {
                                combatData.computer_weapons[matchingWeaponIndex][key] += effect.effect[key];
                            } else {
                                combatData.computer_weapons[matchingWeaponIndex][key] -= effect.effect[key];
                            }
                        }
                        for (let key in combatData.computer_defense) {
                            if (effect.effect[key]) combatData.computer_defense[key] += effect.effect[key];
                        }
                    }
                    // console.log(effect.name, effect.prayer, 'Computer Buff Ticking');
                    break;
                }
                case 'Debuff': { // Debuffs are applied on the first tick, so they don't need to be reapplied every tick. Refreshes, Not Stackable. Will test for Balance
                    if (effect.activeRefreshes === 0 && effect.tick.start === combatData.combatRound) {
                        effect.debuffTarget = combatData.weapons[0].name;
                        for (let key in effect.effect) {
                            if (effect.effect[key] && key !== 'dodge') {
                                combatData.weapons[0][key] -= effect.effect[key];
                            } else {
                                combatData.weapons[0][key] += effect.effect[key];
                            }
                        }
                        for (let key in combatData.player_defense) { // Buff
                            if (effect.effect[key]) {
                                combatData.player_defense[key] -= effect.effect[key];
                            }
                        }
                    }
                    // console.log(effect.name, effect.prayer, 'Computer Debuff Ticking');
                    break;
                }
                case 'Damage': { // Damage Ticks, 33% of the Damage/Tick (Round), Can Stack and experience the enhanced damage if procced this round, Testing if Stacking is Balanced
                    combatData.new_player_health -= effect.effect.damage * 0.33;
                    combatData.current_player_health -= effect.effect.damage * 0.33;

                    // console.log(effect.name, effect.prayer, 'Damage Effect Ticking');

                    if (combatData.current_player_health < 0 || combatData.new_player_health < 0) {
                        combatData.new_player_health = 0;
                        combatData.current_player_health = 0;
                        combatData.player_win = false;
                        combatData.computer_win = true;
                    }
                    break;
                }
                case 'Heal': { // Heal Ticks, 33% of the Heal/Tick (Round), Can Refresh, Testing if Stacking is Balanced
                    combatData.new_computer_health += effect.effect.healing * 0.33;
                    combatData.current_computer_health += effect.effect.healing * 0.33;

                    if (combatData.current_computer_health > 0 || combatData.new_computer_health > 0) {
                        combatData.player_win = false;
                    }
                    // console.log(effect.name, effect.prayer, 'Heal Ticking');
                    break;
                }
            }
        }
        return true;
    });

    if (combatData.new_player_health > 0) {
        combatData.computer_win = false;
    }
    if (combatData.new_computer_health > 0) {
        combatData.player_win = false;
    }
    return combatData;
}

const faithFinder = async (combatData, player_action, computer_action) => { // The influence will add a chance to have a special effect occur
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

    combatData.weapons[0].critical_chance = Number(combatData.weapons[0].critical_chance)
    combatData.weapons[0].critical_damage = Number(combatData.weapons[0].critical_damage)

    combatData.weapons[1].critical_chance = Number(combatData.weapons[1].critical_chance)
    combatData.weapons[1].critical_damage = Number(combatData.weapons[1].critical_damage)

    combatData.computer_weapons[0].critical_chance = Number(combatData.computer_weapons[0].critical_chance)
    combatData.computer_weapons[0].critical_damage = Number(combatData.computer_weapons[0].critical_damage)

    combatData.computer_weapons[1].critical_chance = Number(combatData.computer_weapons[1].critical_chance)
    combatData.computer_weapons[1].critical_damage = Number(combatData.computer_weapons[1].critical_damage)

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

    switch (combatData.weapons[0].rarity) {
        case 'Common': {
            faith_number += 1;
            faith_mod_one += 1;
            break;
        }
        case 'Uncommon': {
            faith_number += 2;
            faith_mod_one += 2;
            break;
        }
        case 'Rare': {
            faith_number += 3;
            faith_mod_one += 3;
            break;
        }
        case 'Epic': {
            faith_number += 5;
            faith_mod_one += 5;
            break;
        }
        case 'Legendary': {
            faith_number += 10;
            faith_mod_one += 10;
        }
        default: {
            faith_number += 0;
            faith_mod_one += 0;
            break;
        }
    }
    switch (combatData.weapons[1].rarity) {
        case 'Common': {
            faith_number_two += 1;
            faith_mod_two += 1;
            break;
        }
        case 'Uncommon': {
            faith_number_two += 2;
            faith_mod_two += 2;
            break;
        }
        case 'Rare': {
            faith_number_two += 3;
            faith_mod_two += 3;
            break;
        }
        case 'Epic': {
            faith_number_two += 5;
            faith_mod_two += 5;
            break;
        }
        case 'Legendary': {
            faith_number_two += 10;
            faith_mod_two += 10;
        }
        default: {
            faith_number_two += 0;
            faith_mod_two += 0;
            break;
        }
    }
    switch (combatData.computer_weapons[0].rarity) {
        case 'Common': {
            computer_faith_number += 1;
            computer_faith_mod_one += 1;
            break;
        }
        case 'Uncommon': {
            computer_faith_number += 2;
            computer_faith_mod_one += 2;
            break;
        }
        case 'Rare': {
            computer_faith_number += 3;
            computer_faith_mod_one += 3;
            break;
        }
        case 'Epic': {
            computer_faith_number += 5;
            computer_faith_mod_one += 5;
            break;
        }
        case 'Legendary': {
            computer_faith_number += 10;
            computer_faith_mod_one += 10;
        }
        default: {
            computer_faith_number += 0;
            computer_faith_mod_one += 0;
            break;
        }
    }
    switch (combatData.computer_weapons[1].rarity) {
        case 'Common': {
            computer_faith_number_two += 1;
            computer_faith_mod_two += 1;
            break;
        }
        case 'Uncommon': {
            computer_faith_number_two += 2;
            computer_faith_mod_two += 2;
            break;
        }
        case 'Rare': {
            computer_faith_number_two += 3;
            computer_faith_mod_two += 3;
            break;
        }
        case 'Epic': {
            computer_faith_number_two += 5;
            computer_faith_mod_two += 5;
            break;
        }
        case 'Legendary': {
            computer_faith_number_two += 10;
            computer_faith_mod_two += 10;
        }
        default: {
            computer_faith_number_two += 0;
            computer_faith_mod_two += 0;
            break;
        }
    }

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
        }
    }
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
    if (combatData.computer_weapons[0].influences[0] === combatData.computer.amulet.influences[0]) {
        if (combatData.computer.amulet.rarity === 'Common') {
            computer_faith_number += 1;
            computer_faith_mod_one += 1;
        } else if (combatData.computer.amulet.rarity === 'Uncommon') {
            computer_faith_number += 2;
            computer_faith_mod_one += 2;
        } else if (combatData.computer.amulet.rarity === 'Rare') {
            computer_faith_number += 3;
            computer_faith_mod_one += 3;
        } else if (combatData.computer.amulet.rarity === 'Epic') {
            computer_faith_number += 5;
            computer_faith_mod_one +=5;
        }
    }
    if (combatData.computer_weapons[1].influences[0] === combatData.computer.amulet.influences[0]) {
        if (combatData.computer.amulet.rarity === 'Common') {
            computer_faith_number_two += 1;
            computer_faith_mod_two += 1;
        } else if (combatData.computer.amulet.rarity === 'Uncommon') {
            computer_faith_number_two += 2;
            computer_faith_mod_two += 2;
        } else if (combatData.computer.amulet.rarity === 'Rare') {
            computer_faith_number_two += 3;
            computer_faith_mod_two += 3;
        } else if (combatData.computer.amulet.rarity === 'Epic') {
            computer_faith_number_two += 5;
            computer_faith_mod_two +=5;
        }
    }
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
        }
    }
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
        }
    }
    if (combatData.computer_weapons[0].influences[0] === combatData.computer.trinket.influences[0]) {
        if (combatData.computer.amulet.rarity === 'Common') {
            computer_faith_number += 1;
            computer_faith_mod_one += 1;
        } else if (combatData.computer.amulet.rarity === 'Uncommon') {
            computer_faith_number += 2;
            computer_faith_mod_one += 2;
        } else if (combatData.computer.amulet.rarity === 'Rare') {
            computer_faith_number += 3;
            computer_faith_mod_one += 3;
        } else if (combatData.computer.amulet.rarity === 'Epic') {
            computer_faith_number += 5;
            computer_faith_mod_one +=5;
        }
    }
    if (combatData.computer_weapons[1].influences[0] === combatData.computer.trinket.influences[0]) {
        if (combatData.computer.amulet.rarity === 'Common') {
            computer_faith_number_two += 1;
            computer_faith_mod_two += 1;
        } else if (combatData.computer.amulet.rarity === 'Uncommon') {
            computer_faith_number_two += 2;
            computer_faith_mod_two += 2;
        } else if (combatData.computer.amulet.rarity === 'Rare') {
            computer_faith_number_two += 3;
            computer_faith_mod_two += 3;
        } else if (combatData.computer.amulet.rarity === 'Epic') {
            computer_faith_number_two += 5;
            computer_faith_mod_two +=5;
        }
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
    // console.log(combatData.weapons[0].influences[0], combatData.weapons[1].influences[0]);
    // console.log(combatData.player.name, `'s Faith #`, faith_number, `Faith #2`, faith_number_two, `Dual Wielding?`, combatData.dual_wielding);
    // console.log(combatData.player.name, `'s Faith Mod #`, faith_mod_one, `Faith Mod #2`, faith_mod_two, `Dual Wielding?`, combatData.dual_wielding);

    // console.log(combatData.computer_weapons[0].influences[0], combatData.computer_weapons[1].influences[0]);
    // console.log(combatData.computer.name, `'s Faith #`, computer_faith_number, `Faith #2`, computer_faith_number_two, `Dual Wielding?`, combatData.dual_wielding);
    // console.log(combatData.computer.name, `'s Faith Mod #`, computer_faith_mod_one, `Faith Mod #2`, computer_faith_mod_two, `Dual Wielding?`, combatData.dual_wielding);


    //TODO:FIXME: START OF CODE TESTING

    if (faith_number > 90) {
        combatData.religious_success = true;
        let existingEffect = combatData.playerEffects.find(effect => effect.name === `Gift of ${combatData.weapons[0].influences[0]}` && effect.prayer === combatData.playerBlessing);   
        // Handles the creation of a new Status Effect if it doesn't already exist
        if (!existingEffect) {
            existingEffect = new StatusEffect(combatData, combatData.player, combatData.computer, combatData.weapons[0], combatData.player_attributes, combatData.playerBlessing);
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
                        }
                    }
                    for (let key in combatData.player_defense) {
                        if (existingEffect.effect[key]) {
                            combatData.player_defense[key] += existingEffect.effect[key];
                        }
                    }
                    break;
                }
                case 'Damage': {
                    existingEffect.effect.damage = Math.round(existingEffect.effect.damage * existingEffect.activeStacks);
                    break;
                }
            }
        } else if (existingEffect.refreshes) {
            existingEffect.duration = Math.floor(combatData.player.level / 3 + 1) > 6 ? 6 : Math.floor(combatData.player.level / 3 + 1);
            existingEffect.tick.end += existingEffect.duration + 1;
            existingEffect.activeRefreshes += 1;
            combatData.player_influence_description = `${existingEffect.description} Refreshed ${existingEffect.activeRefreshes} time(s) for ${existingEffect.duration + 1} round(s).`;
        }    
    }
    if (combatData.dual_wielding === true) {
        if (faith_number_two > 90) {
            combatData.religious_success = true;
            let existingEffect = combatData.playerEffects.find(effect => effect.name === `Gift of ${combatData.weapons[1].influences[0]}` && effect.prayer === combatData.playerBlessing);   
            // Handles the creation of a new Status Effect if it doesn't already exist
            if (!existingEffect) {
                existingEffect = new StatusEffect(combatData, combatData.player, combatData.computer, combatData.weapons[1], combatData.player_attributes, combatData.playerBlessing);
                combatData.playerEffects.push(existingEffect);
                combatData.player_influence_description_two = existingEffect.description;
                // console.log(existingEffect, 'New Status Effect in Game Services');
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
                            } else {
                                combatData.weapons[1][key] -= existingEffect.effect[key];
                            }
                        }
                        for (let key in combatData.player_defense) {
                            if (existingEffect.effect[key]) {
                                combatData.player_defense[key] += existingEffect.effect[key];
                            }
                        }
                        break;
                    }
                    case 'Damage': {
                        existingEffect.effect.damage = Math.round(existingEffect.effect.damage * existingEffect.activeStacks);
                        break;
                    }
                }
            } else if (existingEffect.refreshes) {
                existingEffect.duration = Math.floor(combatData.player.level / 3 + 1) > 6 ? 6 : Math.floor(combatData.player.level / 3 + 1);
                existingEffect.tick.end += existingEffect.duration + 1;
                existingEffect.activeRefreshes += 1;
                combatData.player_influence_description_two = `${existingEffect.description} Refreshed ${existingEffect.activeRefreshes} time(s) for ${existingEffect.duration + 1} round(s).`;
            }    
        }
    }
    if (computer_faith_number > 90) {
        combatData.computer_religious_success = true;
        let existingEffect = combatData.computerEffects.find(effect => effect.name === `Gift of ${combatData.computer_weapons[0].influences[0]}` && effect.prayer === combatData.computerBlessing);   
        // Handles the creation of a new Status Effect if it doesn't already exist
        if (!existingEffect) {
            existingEffect = new StatusEffect(combatData, combatData.computer, combatData.player, combatData.computer_weapons[0], combatData.computer_attributes, combatData.computerBlessing);
            combatData.computerEffects.push(existingEffect);
            combatData.computer_influence_description = existingEffect.description;
            // console.log(existingEffect, 'New Status Effect in Game Services');
        } else if (existingEffect.stacks) { // If the effect already exists and it stacks, update the endTick and intensity, for Damage and Buffs
            existingEffect.tick.end += 2;
            existingEffect.activeStacks += 1;
            existingEffect.effect = StatusEffect.updateEffectStack(existingEffect, combatData, combatData.computer, combatData.computer_weapons[0], combatData.computer_attributes, combatData.computerBlessing);
            combatData.computer_influence_description = `${existingEffect.description} Stacked ${existingEffect.activeStacks} times.`;
            switch (existingEffect.prayer) {
                case 'Buff': {
                    for (let key in existingEffect.effect) {
                        if (existingEffect.effect[key] && key !== 'dodge') {
                            combatData.computer_weapons[0][key] += existingEffect.effect[key];
                        } else {
                            combatData.computer_weapons[0][key] -= existingEffect.effect[key];
                        }
                    }
                    for (let key in combatData.computer_defense) {
                        if (existingEffect.effect[key]) {
                            combatData.computer_defense[key] += existingEffect.effect[key];
                        }
                    }
                    break;
                }
                case 'Damage': {
                    existingEffect.effect.damage = Math.round(existingEffect.effect.damage * existingEffect.activeStacks);
                    break;
                }
            }
        } else if (existingEffect.refreshes) {
            existingEffect.duration = Math.floor(combatData.computer.level / 3 + 1) > 6 ? 6 : Math.floor(combatData.computer.level / 3 + 1);
            existingEffect.tick.end += existingEffect.duration + 1;
            existingEffect.activeRefreshes += 1;
            combatData.computer_influence_description = `${existingEffect.description} Refreshed ${existingEffect.activeRefreshes} time(s) for ${existingEffect.duration + 1} round(s).`;
        }    
    }
    if (combatData.computer_dual_wielding === true) {
        if (computer_faith_number_two > 90) {
            combatData.computer_religious_success = true;
            let existingEffect = combatData.computerEffects.find(effect => effect.name === `Gift of ${combatData.computer_weapons[1].influences[0]}` && effect.prayer === combatData.computerBlessing);   
            // Handles the creation of a new Status Effect if it doesn't already exist
            if (!existingEffect) {
                existingEffect = new StatusEffect(combatData, combatData.computer, combatData.player, combatData.computer_weapons[1], combatData.computer_attributes, combatData.computerBlessing);
                combatData.computerEffects.push(existingEffect);
                combatData.computer_influence_description_two = existingEffect.description;
                // console.log(existingEffect, 'New Status Effect in Game Services');
            } else if (existingEffect.stacks) { // If the effect already exists and it stacks, update the endTick and intensity, for Damage and Buffs
                existingEffect.tick.end += 2;
                existingEffect.activeStacks += 1;
                existingEffect.effect = StatusEffect.updateEffectStack(existingEffect, combatData, combatData.computer, combatData.computer_weapons[1], combatData.computer_attributes, combatData.computerBlessing);
                combatData.computer_influence_description_two = `${existingEffect.description} Stacked ${existingEffect.activeStacks} times.`;
                switch (existingEffect.prayer) {
                    case 'Buff': {
                        for (let key in existingEffect.effect) {
                            if (existingEffect.effect[key] && key !== 'dodge') {
                                combatData.computer_weapons[1][key] += existingEffect.effect[key];
                            } else {
                                combatData.computer_weapons[1][key] -= existingEffect.effect[key];
                            }
                        }
                        for (let key in combatData.computer_defense) {
                            if (existingEffect.effect[key]) {
                                combatData.computer_defense[key] += existingEffect.effect[key];
                            }
                        }
                        break;
                    }
                    case 'Damage': {
                        existingEffect.effect.damage = Math.round(existingEffect.effect.damage * existingEffect.activeStacks);
                        break;
                    }
                }
            } else if (existingEffect.refreshes) {
                existingEffect.duration = Math.floor(combatData.computer.level / 3 + 1) > 6 ? 6 : Math.floor(combatData.computer.level / 3 + 1);
                existingEffect.tick.end += existingEffect.duration + 1;
                existingEffect.activeRefreshes += 1;
                combatData.computer_influence_description_two = `${existingEffect.description} Refreshed ${existingEffect.activeRefreshes} time(s) for ${existingEffect.duration + 1} round(s).`;
            }    
        }
    }

    return combatData
}

// ================================= COMPUTER COMPILER FUNCTIONS ================================== \\

const computerActionCompiler = async (newData, player_action, computer_action, computer_counter) => {

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
    }
    
    const computerActions = {
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
        roll_rating: newData.computer_weapons[0].roll,
        armor_rating: (newData.computer_defense.physicalPosture + newData.computer_defense.magicalPosture)  /  4,
    }

    if (player_action === 'attack') { 
        if (computerActions.roll_rating > computerActions.armor_rating) {
            newData.roll_weight += 1.5;
            newData.posture_weight += 0.5;
        } else {
            newData.posture_weight += 1.5;
            newData.roll_weight += 0.5;
        }
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
    }
    if (player_action === 'dodge') { 
        // newData.counter_weight += 2;
        // newData.dodge_weight -= 2;
        newData.counter_dodge_weight += 4;
        newData.counter_attack_weight -= 1;
        newData.counter_counter_weight -= 1;
        newData.counter_posture_weight -= 1;
        newData.counter_roll_weight -= 1;
    }
    if (player_action === 'posture') { 
        newData.attack_weight += 2;  
        newData.posture_weight -= 3;
        newData.counter_weight += 1;
        newData.counter_posture_weight += 3;
        newData.counter_roll_weight -= 2;
        newData.counter_attack_weight -= 1;
    }

    if (player_action === 'roll') { 
        newData.attack_weight += 2;  
        newData.roll_weight -= 3;
        newData.counter_weight += 1;
        newData.counter_roll_weight += 3;
        newData.counter_posture_weight -= 2;
        newData.counter_attack_weight -= 1;
    }

    // const computerAction = async (computerActions) => {

    let actionNumber = Math.floor(Math.random() * 101);
    if (actionNumber > (100 - computerActions.attack)) {
        computer_action = 'attack';
    } else if (actionNumber > (100 - computerActions.attack - computerActions.counter)) {
        computer_action = 'counter';
    } else if (actionNumber > (100 - computerActions.attack - computerActions.counter - computerActions.dodge)) {
        computer_action = 'dodge';
    } else if (actionNumber > (100 - computerActions.attack - computerActions.counter - computerActions.dodge - computerActions.posture)) {
        computer_action = 'posture';
    } else {
        computer_action = 'roll';
    }

    if (computer_action === 'counter') {
        let counterNumber = Math.floor(Math.random() * 101);
        if (counterNumber > (100 - computerActions.counter_attack)) {
            computer_counter = 'attack';
        } else if (counterNumber > (100 - computerActions.counter_attack - computerActions.counter_counter)) {
            computer_counter = 'counter';
        } else if (counterNumber > (100 - computerActions.counter_attack - computerActions.counter_counter - computerActions.counter_dodge)) {
            computer_counter = 'dodge';
        } else if (counterNumber > (100 - computerActions.counter_attack - computerActions.counter_counter - computerActions.counter_dodge - computerActions.counter_posture)) {
            computer_counter = 'posture';
        } else {
            computer_counter = 'roll';
        }
        newData.counter_weight -= 3;
        newData.attack_weight += 1;  
        newData.posture_weight += 1;
        newData.roll_weight += 1;
    }
    newData.computer_action = computer_action;
    newData.computer_counter_guess = computer_counter;
    // console.log(newData.computer_action, newData.computer_counter_guess, 'New Computer Action')

    return (
        newData
    )
}

const computerDualWieldCompiler = async (combatData, player_physical_defense_multiplier, player_magical_defense_multiplier) => { // Triggers if 40+ Str/Caer for 2h, 1h + Agi/Achre Mastery and 2nd weapon is 1h
    const player = combatData.player;
    const computer = combatData.computer;
    const weapons = combatData.computer_weapons;

    let computer_weapon_one_physical_damage = weapons[0].physical_damage;
    let computer_weapon_one_magical_damage = weapons[0].magical_damage;
    let computer_weapon_two_physical_damage = weapons[1].physical_damage;
    let computer_weapon_two_magical_damage = weapons[1].magical_damage;
    let computer_weapon_one_total_damage;
    let computer_weapon_two_total_damage;
    let firstWeaponCrit = false;
    let secondWeaponCrit = false;

    const weapOneClearance = Math.floor(Math.random() * 101);
    const weapTwoClearance = Math.floor(Math.random() * 101);
    let weapOneCrit = combatData.computer_weapons[0].critical_chance;
    let weapTwoCrit = combatData.computer_weapons[1].critical_chance;
    weapOneCrit -= combatData.player_attributes.kyosirMod;
    weapTwoCrit -= combatData.player_attributes.kyosirMod;
    const resultOne = await computerCriticalCompiler(combatData, weapOneCrit, weapOneClearance, combatData.computer_weapons[0], computer_weapon_one_physical_damage, computer_weapon_one_magical_damage);
    combatData = resultOne.combatData;
    computer_weapon_one_physical_damage = resultOne.computer_physical_damage;
    computer_weapon_one_magical_damage = resultOne.computer_magical_damage;
    if (weapOneCrit >= weapOneClearance) {
        firstWeaponCrit = true;
    }
    const resultTwo = await computerCriticalCompiler(combatData, weapTwoCrit, weapTwoClearance, combatData.computer_weapons[1], computer_weapon_two_physical_damage, computer_weapon_two_magical_damage);
    combatData = resultTwo.combatData;
    computer_weapon_two_physical_damage = resultTwo.computer_physical_damage;
    computer_weapon_two_magical_damage = resultTwo.computer_magical_damage;
    if (weapTwoCrit >= weapTwoClearance) {
        secondWeaponCrit = true;
    }

    
    // console.log(firstWeaponCrit, secondWeaponCrit)
    computer_weapon_one_physical_damage *= 1 - ((1 - player_physical_defense_multiplier) * (1 - (weapons[0].physical_penetration / 100 )));
    computer_weapon_one_magical_damage *= 1 - ((1 - player_magical_defense_multiplier) * (1 - (weapons[0].magical_penetration  / 100 )));

    computer_weapon_two_physical_damage *= 1 - ((1 - player_physical_defense_multiplier) * (1 - (weapons[1].physical_penetration / 100 )));
    computer_weapon_two_magical_damage *= 1 - ((1 - player_magical_defense_multiplier) * (1 - (weapons[1].magical_penetration / 100 )));

    const damageType = await computerDamageTypeCompiter(combatData, weapons[0], computer_weapon_one_physical_damage, computer_weapon_one_magical_damage);
    computer_weapon_one_physical_damage = damageType.computer_physical_damage;
    computer_weapon_one_magical_damage = damageType.computer_magical_damage;

    const damageTypeTwo = await computerDamageTypeCompiter(combatData, weapons[1], computer_weapon_two_physical_damage, computer_weapon_two_magical_damage);
    computer_weapon_two_physical_damage = damageTypeTwo.computer_physical_damage;
    computer_weapon_two_magical_damage = damageTypeTwo.computer_magical_damage;

    computer_weapon_one_total_damage = computer_weapon_one_physical_damage + computer_weapon_one_magical_damage;
    computer_weapon_two_total_damage = computer_weapon_two_physical_damage + computer_weapon_two_magical_damage;

    // console.log(computer_weapon_one_total_damage, computer_weapon_two_total_damage);

    combatData.realized_computer_damage = computer_weapon_one_total_damage + computer_weapon_two_total_damage;
    if (combatData.realized_computer_damage < 0) {
        combatData.realized_computer_damage = 0;
    }

    let strength = combatData.computer_attributes.totalStrength + combatData.computer_weapons[0].strength  + combatData.computer_weapons[1].strength;
    let agility = combatData.computer_attributes.totalAgility + combatData.computer_weapons[0].agility  + combatData.computer_weapons[1].agility;
    let achre = combatData.computer_attributes.totalAchre + combatData.computer_weapons[0].achre  + combatData.computer_weapons[1].achre;
    let caeren = combatData.computer_attributes.totalCaeren + combatData.computer_weapons[0].caeren  + combatData.computer_weapons[1].caeren;

    if (combatData.computer_weapons[0].grip === 'One Hand') {
        if (combatData.computer_weapons[0].attack_type === 'Physical') {
            combatData.realized_computer_damage *= (agility / 100)
        } else {
            combatData.realized_computer_damage *= (achre / 100)
        }
    }

    if (combatData.computer_weapons[0].grip === 'Two Hand') {
        if (combatData.computer_weapons[0].attack_type === 'Physical') {
            combatData.realized_computer_damage *= (strength / 150) 
        } else {
            combatData.realized_computer_damage *= (caeren / 150)
        }
    }

    if (combatData.action === 'attack') {
        combatData.realized_computer_damage *= 1.1;
    };
    if (combatData.action === 'posture') {
        combatData.realized_computer_damage *= 0.95;
    };

    combatData.new_player_health = combatData.current_player_health - combatData.realized_computer_damage;
    combatData.current_player_health = combatData.new_player_health; // Added to persist health totals?

    if (combatData.new_player_health < 0 || combatData.current_player_health <= 0) {
        combatData.new_player_health = 0;
        combatData.computer_win = true;
    }
    
    combatData.computer_action_description = 
        `${computer.name} dual-wield attacks you with ${weapons[0].name} and ${weapons[1].name} for ${Math.round(combatData.realized_computer_damage)} ${combatData.computer_damage_type} and ${weapons[1].damage_type[0] ? weapons[1].damage_type[0] : ''}${weapons[1].damage_type[1] ? ' / ' + weapons[1].damage_type[1] : ''} ${firstWeaponCrit === true && secondWeaponCrit === true ? 'Critical Strike Damage' : firstWeaponCrit === true || secondWeaponCrit === true ? 'Partial Crit Damage' : combatData.computer_glancing_blow === true ? 'Damage (Glancing)' : 'Damage'}.`    
    return (
        combatData
    )
}

const computerAttackCompiler = async (combatData, computer_action) => {
    if (combatData.player_win === true) { return }
    let computer_physical_damage = combatData.computer_weapons[0].physical_damage;
    let computer_magical_damage = combatData.computer_weapons[0].magical_damage;
    let computer_total_damage;

    let player_physical_defense_multiplier = 1 - (combatData.player_defense.physicalDefenseModifier / 100);
    let player_magical_defense_multiplier = 1 - (combatData.player_defense.magicalDefenseModifier / 100);

    // This is for Players's who are Posturing
    if (combatData.action === 'posture' && combatData.computer_counter_success !== true && combatData.computer_roll_success !== true) {
        player_physical_defense_multiplier = 1 - (combatData.player_defense.physicalPosture / 100);
        player_magical_defense_multiplier = 1 - (combatData.player_defense.magicalPosture / 100);
    }

    if (combatData.computer_action === 'attack') {
        if (combatData.computer_weapons[0].grip === 'One Hand') {
            if (combatData.computer_weapons[0].attack_type === 'Physical') {
                if (combatData.computer.mastery === 'Agility' || combatData.computer.mastery === 'Constitution') {
                    if (combatData.computer_attributes.totalAgility + combatData.computer_weapons[0].agility + combatData.computer_weapons[1].agility >= 50) {
                        if (combatData.computer_weapons[1].grip === 'One Hand') { // If you're Focusing Attack + 1h + Agi Mastery + 1h in Second Slot
                           combatData.computer_dual_wielding = true;
                            await computerDualWieldCompiler(combatData, player_physical_defense_multiplier, player_magical_defense_multiplier)
                            return combatData
                        } else {
                            computer_physical_damage *= 1.3;
                            computer_magical_damage *= 1.15;
                        }
                    } else {
                        computer_physical_damage *= 1.3;
                        computer_magical_damage *= 1.15;
                    }
                } else {
                    computer_physical_damage *= 1.1;
                    computer_magical_damage *= 1.1;
                }
            } 
            if (combatData.computer_weapons[0].attack_type === 'Magic') {
                if (combatData.computer.mastery === 'Achre' || combatData.computer.mastery === 'Kyosir') {
                    if (combatData.computer_attributes.totalAchre + combatData.computer_weapons[0].achre + combatData.computer_weapons[1].achre >= 50) {
                        if (combatData.computer_weapons[1].grip === 'One Hand') { // Might be a dual-wield compiler instead to take the rest of it
                            combatData.computer_dual_wielding = true;
                            await computerDualWieldCompiler(combatData, player_physical_defense_multiplier, player_magical_defense_multiplier)
                            return combatData
                        } else {
                            computer_physical_damage *= 1.15;
                            computer_magical_damage *= 1.3;
                        }
                    } else {
                        computer_physical_damage *= 1.15;
                        computer_magical_damage *= 1.3;
                    }
                } else {
                    computer_physical_damage *= 1.1;
                    computer_magical_damage *= 1.1;
                }
            } 
        }
        if (combatData.computer_weapons[0].grip === 'Two Hand') {
            if (combatData.computer_weapons[0].attack_type === 'Physical' && combatData.computer_weapons[0].type !== 'Bow') {
                if (combatData.computer.mastery === 'Strength' || combatData.computer.mastery === 'Constitution') {
                    if (combatData.computer_attributes.totalStrength + combatData.computer_weapons[0].strength + combatData.computer_weapons[1].strength >= 75) { // Might be a dual-wield compiler instead to take the rest of it
                        if (combatData.computer_weapons[1].type !== 'Bow') {
                            combatData.computer_dual_wielding = true;
                            await computerDualWieldCompiler(combatData, player_physical_defense_multiplier, player_magical_defense_multiplier)
                            return combatData
                        } else { // Less than 50 Srength 
                            computer_physical_damage *= 1.3;
                            computer_magical_damage *= 1.15;
                        }
                    } else { // Less than 50 Srength 
                        computer_physical_damage *= 1.3;
                        computer_magical_damage *= 1.15;
                    }
                } else {
                    computer_physical_damage *= 1.1;
                    computer_magical_damage *= 1.1;
                }
            }
            if (combatData.computer_weapons[0].attack_type === 'Magic') {
                if (combatData.computer.mastery === 'Caeren' || combatData.computer.mastery === 'Kyosir') {
                    if (combatData.computer_attributes.totalCaeren + combatData.computer_weapons[0].caeren + combatData.computer_weapons[1].caeren >= 75) {
                        if (combatData.computer_weapons[1].type !== 'Bow') {
                            combatData.computer_dual_wielding = true;
                            await computerDualWieldCompiler(combatData, player_physical_defense_multiplier, player_magical_defense_multiplier)
                            return combatData
                        } else {
                            computer_physical_damage *= 1.15;
                            computer_magical_damage *= 1.3;
                        }
                    } else {
                        computer_physical_damage *= 1.15;
                        computer_magical_damage *= 1.3;
                    }
                } else {
                    computer_physical_damage *= 1.1;
                    computer_magical_damage *= 1.1;
                }
            }
            if (combatData.computer_weapons[0].type === 'Bow') {
                if (combatData.computer.mastery === 'Agility' || combatData.computer.mastery === 'Achre' || combatData.computer.mastery === 'Kyosir' || combatData.computer.mastery === 'Constitution') {
                    computer_physical_damage *= 1.4;
                    computer_magical_damage *= 1.4;
                } else {
                    computer_physical_damage *= 1.1;
                    computer_magical_damage *= 1.1;
                }
            }
        }
    } 

    if (computer_action === 'counter') {
        if (combatData.computer_counter_success === true) {
            computer_physical_damage *= 3;
            computer_magical_damage *= 3;    
        } else {
            computer_physical_damage *= 0.9;
            computer_magical_damage *= 0.9;
        }
    }

    if (computer_action === 'dodge') {
        computer_physical_damage *= 0.9;
        computer_magical_damage *= 0.9;
    }

    // if (computer_action === 'posture') {
    //     computer_physical_damage *= 0.95;
    //     computer_magical_damage *= 0.95;
    // }

    if (computer_action === 'roll' ) {
        if (combatData.computer_roll_success === true) {
            computer_physical_damage *= 1.15;
            computer_magical_damage *= 1.15;
        } else {
            computer_physical_damage *= 0.95;
            computer_magical_damage *= 0.95;
        }
    }

    const criticalClearance = Math.floor(Math.random() * 101);
    let criticalChance = combatData.computer_weapons[0].critical_chance;
    criticalChance -= combatData.player_attributes.kyosirMod;
    if (combatData.weather === 'Astralands') criticalChance += 10;
    const criticalResult = await computerCriticalCompiler(combatData, criticalChance, criticalClearance, combatData.computer_weapons[0], computer_physical_damage, computer_magical_damage)
    combatData = criticalResult.combatData;
    computer_physical_damage = criticalResult.computer_physical_damage;
    computer_magical_damage = criticalResult.computer_magical_damage;
    // console.log('Results for Computer [Crit] [Glancing] [Phys Dam] [Mag Dam]', 
    //     criticalResult.combatData.computer_critical_success, criticalResult.combatData.computer_glancing_blow, 
    //     criticalResult.computer_physical_damage, criticalResult.computer_magical_damage)

    // If you made it here, your basic attack now resolves itself
    computer_physical_damage *= 1 - ((1 - player_physical_defense_multiplier) * (1 - (combatData.computer_weapons[0].physical_penetration / 100)));
    computer_magical_damage *= 1 - ((1 - player_magical_defense_multiplier) * (1 - (combatData.computer_weapons[0].magical_penetration / 100)));

    const damageType = await computerDamageTypeCompiter(combatData, combatData.computer_weapons[0], computer_physical_damage, computer_magical_damage);
    computer_physical_damage = damageType.computer_physical_damage;
    computer_magical_damage = damageType.computer_magical_damage;

    computer_total_damage = computer_physical_damage + computer_magical_damage;
    if (computer_total_damage < 0) {
        computer_total_damage = 0;
    }
    combatData.realized_computer_damage = computer_total_damage;

    if (combatData.action === 'attack') {
        combatData.realized_computer_damage *= 1.1;
    };
    if (combatData.action === 'posture') {
        combatData.realized_computer_damage *= 0.95;
    };

    combatData.new_player_health = combatData.current_player_health - combatData.realized_computer_damage;
    combatData.current_player_health = combatData.new_player_health; // Added to persist health totals?

    combatData.computer_action_description = 
        `${combatData.computer.name} attacks you with their ${combatData.computer_weapons[0].name} for ${Math.round(computer_total_damage)} ${combatData.computer_damage_type} ${combatData.computer_critical_success === true ? 'Critical Strike Damage' : combatData.computer_glancing_blow === true ? 'Damage (Glancing)' : 'Damage'}.`    

    if (combatData.new_player_health < 0 || combatData.current_player_health <= 0) {
        combatData.new_player_health = 0;
        combatData.computer_win = true;
    }

    if (combatData.new_player_health > 0) {
        combatData.computer_win = false;
    }

    if (combatData.new_computer_health > 0) {
        combatData.player_win = false;
    }

    // console.log(computer_total_damage, 'Total Computer Damage')

    return (
        combatData
    )
}

const computerDamageTypeCompiter = async (combatData, weapon, computer_physical_damage, computer_magical_damage) => {
    if (combatData.computer_damage_type === 'Blunt' || combatData.computer_damage_type === 'Fire' || combatData.computer_damage_type === 'Earth' || combatData.computer_damage_type === 'Spooky') {
        if (weapon.attack_type === 'Physical') {
            if (combatData.player.helmet.type === 'Plate-Mail') {
                computer_physical_damage *= 1.15;
            }
            if (combatData.player.helmet.type === 'Chain-Mail') {
                computer_physical_damage *= 1.08;
            }
            if (combatData.player.helmet.type === 'Leather-Mail') {
                computer_physical_damage *= 0.92;
            }
            if (combatData.player.helmet.type === 'Leather-Cloth') {
                computer_physical_damage *= 0.85;
            }
            if (combatData.player.chest.type === 'Plate-Mail') {
                computer_physical_damage *= 1.1;
            }
            if (combatData.player.chest.type === 'Chain-Mail') {
                computer_physical_damage *= 1.05;
            }
            if (combatData.player.chest.type === 'Leather-Mail') {
                computer_physical_damage *= 0.95;
            }
            if (combatData.player.chest.type === 'Leather-Cloth') {
                computer_physical_damage *= 0.9;
            }
            if (combatData.player.legs.type === 'Plate-Mail') {
                computer_physical_damage *= 1.05;
            }
            if (combatData.player.legs.type === 'Chain-Mail') {
                computer_physical_damage *= 1.03;
            }
            if (combatData.player.legs.type === 'Leather-Mail') {
                computer_physical_damage *= 0.97;
            }
            if (combatData.player.legs.type === 'Leather-Cloth') {
                computer_physical_damage *= 0.95;
            }
        }
        if (weapon.attack_type === 'Magic') {
            if (combatData.player.helmet.type === 'Plate-Mail') {
                computer_magical_damage *= 1.15;
            }
            if (combatData.player.helmet.type === 'Chain-Mail') {
                computer_magical_damage *= 1.08;
            }
            if (combatData.player.helmet.type === 'Leather-Mail') {
                computer_magical_damage *= 0.92;
            }
            if (combatData.player.helmet.type === 'Leather-Cloth') {
                computer_magical_damage *= 0.85;
            }
            if (combatData.player.chest.type === 'Plate-Mail') {
                computer_magical_damage *= 1.1;
            }
            if (combatData.player.chest.type === 'Chain-Mail') {
                computer_magical_damage *= 1.05;
            }
            if (combatData.player.chest.type === 'Leather-Mail') {
                computer_magical_damage *= 0.95;
            }
            if (combatData.player.chest.type === 'Leather-Cloth') {
                computer_magical_damage *= 0.9;
            }
            if (combatData.player.legs.type === 'Plate-Mail') {
                computer_magical_damage *= 1.05;
            }
            if (combatData.player.legs.type === 'Chain-Mail') {
                computer_magical_damage *= 1.03;
            }
            if (combatData.player.legs.type === 'Leather-Mail') {
                computer_magical_damage *= 0.97;
            }
            if (combatData.player.legs.type === 'Leather-Cloth') {
                computer_magical_damage *= 0.95;
            }
        }
    }
    if (combatData.computer_damage_type === 'Pierce' || combatData.computer_damage_type === 'Lightning' || combatData.computer_damage_type === 'Frost' || combatData.computer_damage_type === 'Righteous') {
        if (weapon.attack_type === 'Physical') {
            if (combatData.player.helmet.type === 'Plate-Mail') {
                computer_physical_damage *= 0.85;
            }
            if (combatData.player.helmet.type === 'Chain-Mail') {
                computer_physical_damage *= 0.92;
            }
            if (combatData.player.helmet.type === 'Leather-Mail') {
                computer_physical_damage *= 1.08;
            }
            if (combatData.player.helmet.type === 'Leather-Cloth') {
                computer_physical_damage *= 1.15;
            }
            if (combatData.player.chest.type === 'Plate-Mail') {
                computer_physical_damage *= 0.9;
            }
            if (combatData.player.chest.type === 'Chain-Mail') {
                computer_physical_damage *= 0.95;
            }
            if (combatData.player.chest.type === 'Leather-Mail') {
                computer_physical_damage *= 1.05;
            }
            if (combatData.player.chest.type === 'Leather-Cloth') {
                computer_physical_damage *= 1.1;
            }
            if (combatData.player.legs.type === 'Plate-Mail') {
                computer_physical_damage *= 0.95;
            }   
            if (combatData.player.legs.type === 'Chain-Mail') {
                computer_physical_damage *= 0.97;
            }
            if (combatData.player.legs.type === 'Leather-Mail') {
                computer_physical_damage *= 1.03;
            }
            if (combatData.player.legs.type === 'Leather-Cloth') {
                computer_physical_damage *= 1.05;
            }
        }
        if (weapon.attack_type === 'Magic') {
            if (combatData.player.helmet.type === 'Plate-Mail') {
                computer_magical_damage *= 0.85;
            }
            if (combatData.player.helmet.type === 'Chain-Mail') {
                computer_magical_damage *= 0.92;
            }
            if (combatData.player.helmet.type === 'Leather-Mail') {
                computer_magical_damage *= 1.08;
            }
            if (combatData.player.helmet.type === 'Leather-Cloth') {
                computer_magical_damage *= 1.15;
            }
            if (combatData.player.chest.type === 'Plate-Mail') {
                computer_magical_damage *= 0.9;
            }
            if (combatData.player.chest.type === 'Chain-Mail') {
                computer_magical_damage *= 0.95;
            }
            if (combatData.player.chest.type === 'Leather-Mail') {
                computer_magical_damage *= 1.05;
            }
            if (combatData.player.chest.type === 'Leather-Cloth') {
                computer_magical_damage *= 1.1;
            }
            if (combatData.player.legs.type === 'Plate-Mail') {
                computer_magical_damage *= 0.95;
            }   
            if (combatData.player.legs.type === 'Chain-Mail') {
                computer_magical_damage *= 0.97;
            }
            if (combatData.player.legs.type === 'Leather-Mail') {
                computer_magical_damage *= 1.03;
            }
            if (combatData.player.legs.type === 'Leather-Cloth') {
                computer_magical_damage *= 1.05;
            }
        }
    }
    if (combatData.computer_damage_type === 'Slash' || combatData.computer_damage_type === 'Wind' || combatData.computer_damage_type === 'Sorcery' || combatData.computer_damage_type === 'Wild') {
        if (weapon.attack_type === 'Physical') {
            if (combatData.player.helmet.type === 'Plate-Mail') {
                computer_physical_damage *= 0.925 + Math.random() * 0.15;
            }
            if (combatData.player.helmet.type === 'Chain-Mail') {
                computer_physical_damage *= 0.925 + Math.random() * 0.15;
            }   
            if (combatData.player.helmet.type === 'Leather-Mail') {
                computer_physical_damage *= 0.925 + Math.random() * 0.15;
            }
            if (combatData.player.helmet.type === 'Leather-Cloth') {
                computer_physical_damage *= 0.925 + Math.random() * 0.15;
            }
    
            if (combatData.player.chest.type === 'Plate-Mail') {
                computer_physical_damage *= 0.925 + Math.random() * 0.15;
            }
            if (combatData.player.chest.type === 'Chain-Mail') {
                computer_physical_damage *= 0.925 + Math.random() * 0.15;
            }
            if (combatData.player.chest.type === 'Leather-Mail') {
                computer_physical_damage *= 0.925 + Math.random() * 0.15;
            }
            if (combatData.player.chest.type === 'Leather-Cloth') {
                computer_physical_damage *= 0.925 + Math.random() * 0.15;
            }
    
            if (combatData.player.legs.type === 'Plate-Mail') {
                computer_physical_damage *= 0.925 + Math.random() * 0.15;
            }
            if (combatData.player.legs.type === 'Chain-Mail') {
                computer_physical_damage *= 0.925 + Math.random() * 0.15;
            }
            if (combatData.player.legs.type === 'Leather-Mail') {
                computer_physical_damage *= 0.925 + Math.random() * 0.15;
            }
            if (combatData.player.legs.type === 'Leather-Cloth') {
                computer_physical_damage *= 0.925 + Math.random() * 0.15;
            }
        }
        if (weapon.attack_type === 'Magic') {
            if (combatData.player.helmet.type === 'Plate-Mail') {
                computer_magical_damage *= 0.925 + Math.random() * 0.15;
            }
            if (combatData.player.helmet.type === 'Chain-Mail') {
                computer_magical_damage *= 0.925 + Math.random() * 0.15;
            }   
            if (combatData.player.helmet.type === 'Leather-Mail') {
                computer_magical_damage *= 0.925 + Math.random() * 0.15;
            }
            if (combatData.player.helmet.type === 'Leather-Cloth') {
                computer_magical_damage *= 0.925 + Math.random() * 0.15;
            }
            if (combatData.player.chest.type === 'Plate-Mail') {
                computer_magical_damage *= 0.925 + Math.random() * 0.15;
            }
            if (combatData.player.chest.type === 'Chain-Mail') {
                computer_magical_damage *= 0.925 + Math.random() * 0.15;
            }
            if (combatData.player.chest.type === 'Leather-Mail') {
                computer_magical_damage *= 0.925 + Math.random() * 0.15;
            }
            if (combatData.player.chest.type === 'Leather-Cloth') {
                computer_magical_damage *= 0.925 + Math.random() * 0.15;
            }
            if (combatData.player.legs.type === 'Plate-Mail') {
                computer_magical_damage *= 0.925 + Math.random() * 0.15;
            }
            if (combatData.player.legs.type === 'Chain-Mail') {
                computer_magical_damage *= 0.925 + Math.random() * 0.15;
            }
            if (combatData.player.legs.type === 'Leather-Mail') {
                computer_magical_damage *= 0.925 + Math.random() * 0.15;
            }
            if (combatData.player.legs.type === 'Leather-Cloth') {
                computer_magical_damage *= 0.925 + Math.random() * 0.15;
            }
        }
    }
    return {
        combatData,
        computer_physical_damage,
        computer_magical_damage
    }
}

const computerCriticalCompiler = async (combatData, critChance, critClearance, weapon, computer_physical_damage, computer_magical_damage) => {
    if (critChance >= critClearance) {
        computer_physical_damage *= weapon.critical_damage;
        computer_magical_damage *= weapon.critical_damage;
        combatData.computer_critical_success = true;
    }
    if (critClearance > critChance + combatData.computer.level + 80) {
        computer_physical_damage *= 0.1;
        computer_magical_damage *= 0.1;
        combatData.computer_glancing_blow = true;
    } else if (critClearance > critChance + combatData.computer.level + 75) {
        computer_physical_damage *= 0.15;
        computer_magical_damage *= 0.15;
        combatData.computer_glancing_blow = true;
    } else if (critClearance > critChance + combatData.computer.level + 70) {
        computer_physical_damage *= 0.2;
        computer_magical_damage *= 0.2;
        combatData.computer_glancing_blow = true;
    } else if (critClearance > critChance + combatData.computer.level + 65) {
        computer_physical_damage *= 0.25;
        computer_magical_damage *= 0.25;
        combatData.computer_glancing_blow = true;
    } else if (critClearance > critChance + combatData.computer.level + 60) {
        computer_physical_damage *= 0.3;
        computer_magical_damage *= 0.3;
        combatData.computer_glancing_blow = true;
    } else if (critClearance > critChance + combatData.computer.level + 55) {
        computer_physical_damage *= 0.35;
        computer_magical_damage *= 0.35;
        combatData.computer_glancing_blow = true;
    } else if (critClearance > critChance + combatData.computer.level + 50) {
        computer_physical_damage *= 0.4;
        computer_magical_damage *= 0.4;
        combatData.computer_glancing_blow = true;
    } else if (critClearance > critChance + combatData.computer.level + 45) {
        computer_physical_damage *= 0.45;
        computer_magical_damage *= 0.45;
        combatData.computer_glancing_blow = true;
    } else if (critClearance > critChance + combatData.computer.level + 40) {
        computer_physical_damage *= 0.5;
        computer_magical_damage *= 0.5;
        combatData.computer_glancing_blow = true;
    } else if (critClearance > critChance + combatData.computer.level + 35) {
        computer_physical_damage *= 0.55;
        computer_magical_damage *= 0.55;
        combatData.computer_glancing_blow = true;
    } else if (critClearance > critChance + combatData.computer.level + 30) {
        computer_physical_damage *= 0.6;
        computer_magical_damage *= 0.6;
        combatData.computer_glancing_blow = true;
    } else if (critClearance > critChance + combatData.computer.level + 25) {
        computer_physical_damage *= 0.65;
        computer_magical_damage *= 0.65;
        combatData.computer_glancing_blow = true;
    } else if (critClearance > critChance + combatData.computer.level + 20) {
        computer_physical_damage *= 0.7;
        computer_magical_damage *= 0.7;
        combatData.computer_glancing_blow = true;
    } 
    // else if (critClearance > critChance + 20) {
    //     computer_physical_damage *= 0.8;
    //     computer_magical_damage *= 0.8;
    //     combatData.computer_glancing_blow = true;
    // } 
    // else if (critClearance > critChance + 10) {
    //     computer_physical_damage *= 0.9;
    //     computer_magical_damage *= 0.9;
    //     combatData.computer_glancing_blow = true;
    // }
    return {
        combatData,
        computer_physical_damage,
        computer_magical_damage
    }
}

const computerCounterCompiler = async (combatData, player_action, computer_action) => {
    computer_action = 'attack';
    await attackCompiler(combatData, computer_action);
    return {
        combatData,
        computer_action
    }
}
    
const computerRollCompiler = async (combatData, player_initiative, computer_initiative, player_action, computer_action) => {
    const computer_roll = combatData.computer_weapons[0].roll;
    let roll_catch = Math.floor(Math.random() * 101) + combatData.player_attributes.kyosirMod;
    // console.log(computer_roll, 'Computer Roll %', roll_catch, 'Roll # To Beat')
    if (computer_roll > roll_catch) {
        combatData.computer_roll_success = true;
        combatData.computer_special_description = 
                `${combatData.computer.name} successfully rolls against you, avoiding your ${  player_action === 'attack' ? 'Focused' : player_action.charAt(0).toUpperCase() + player_action.slice(1) } Attack.`
        await computerAttackCompiler(combatData, computer_action)
    } else {
        combatData.computer_special_description = 
            `${combatData.computer.name} fails to roll against your ${  player_action === 'attack' ? 'Focused' : player_action.charAt(0).toUpperCase() + player_action.slice(1) } Attack.`
        return combatData
    }
    return (
        combatData
    )
}

// ================================== PLAYER COMPILER FUNCTIONS ====================================== \\

const dualWieldCompiler = async (combatData) => { // Triggers if 40+ Str/Caer for 2h, 1h + Agi/Achre Mastery and 2nd weapon is 1h
    const computer = combatData.computer;
    const weapons = combatData.weapons;

    let player_weapon_one_physical_damage = combatData.weapons[0].physical_damage;
    let player_weapon_one_magical_damage = combatData.weapons[0].magical_damage;
    let player_weapon_two_physical_damage = combatData.weapons[1].physical_damage;
    let player_weapon_two_magical_damage = combatData.weapons[1].magical_damage;
    let player_weapon_one_total_damage;
    let player_weapon_two_total_damage;
    let firstWeaponCrit = false;
    let secondWeaponCrit = false;
    
    let computer_physical_defense_multiplier = 1 - (combatData.computer_defense.physicalDefenseModifier / 100);
    let computer_magical_defense_multiplier = 1 - (combatData.computer_defense.magicalDefenseModifier / 100);

    const weapOneClearance = Math.floor(Math.random() * 101);
    const weapTwoClearance = Math.floor(Math.random() * 101);
    let weapOneCrit = combatData.weapons[0].critical_chance;
    let weapTwoCrit = combatData.weapons[1].critical_chance;
    weapOneCrit -= combatData.computer_attributes.kyosirMod;
    weapTwoCrit -= combatData.computer_attributes.kyosirMod;
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

    player_weapon_one_physical_damage *= 1 - ((1 - computer_physical_defense_multiplier) * (1 - (weapons[0].physical_penetration / 100)));
    player_weapon_one_magical_damage *= 1 - ((1 - computer_magical_defense_multiplier) * (1 - (weapons[0].magical_penetration / 100)));

    player_weapon_two_physical_damage *= 1 - ((1 - computer_physical_defense_multiplier) * (1 - (weapons[1].physical_penetration / 100)));
    player_weapon_two_magical_damage *= 1 - ((1 - computer_magical_defense_multiplier) * (1 - (weapons[1].magical_penetration / 100)));

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

    if (combatData.computer_action === 'attack') {
        combatData.realized_player_damage *= 1.1;
    };
    if (combatData.computer_action === 'posture') {
        combatData.realized_player_damage *= 0.95;
    };

    combatData.new_computer_health = combatData.current_computer_health - combatData.realized_player_damage;
    combatData.current_computer_health = combatData.new_computer_health; // Added to persist health totals?

    if (combatData.new_computer_health <= 0 || combatData.current_computer_health <= 0) {
        combatData.new_computer_health = 0;
        combatData.player_win = true;
    }
    
    combatData.player_action_description = 
        `You dual-wield attack ${computer.name} with ${weapons[0].name} and ${weapons[1].name} for ${Math.round(combatData.realized_player_damage)} ${combatData.player_damage_type} and ${weapons[1].damage_type[0] ? weapons[1].damage_type[0] : ''} ${firstWeaponCrit === true && secondWeaponCrit === true ? 'Critical Strike Damage' : firstWeaponCrit === true || secondWeaponCrit === true ? 'Partial Crit Damage' : combatData.glancing_blow === true ? 'Damage (Glancing)' : 'Damage'}.`    
    return (
        combatData
    )
}
    
const attackCompiler = async (combatData, player_action) => {
    if (combatData.computer_win === true) { return }
    let player_physical_damage = combatData.weapons[0].physical_damage;
    let player_magical_damage = combatData.weapons[0].magical_damage;
    let player_total_damage;

    let computer_physical_defense_multiplier = 1 - (combatData.computer_defense.physicalDefenseModifier / 100);
    let computer_magical_defense_multiplier = 1 - (combatData.computer_defense.magicalDefenseModifier / 100);
    
    // This is for Opponent's who are Posturing
    if (combatData.computer_action === 'posture' && combatData.counter_success !== true && combatData.roll_success !== true) {
        computer_physical_defense_multiplier = 1 - (combatData.computer_defense.physicalPosture / 100);
        computer_magical_defense_multiplier = 1 - (combatData.computer_defense.magicalPosture / 100);
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
    const criticalClearance = Math.floor(Math.random() * 101);
    let criticalChance = combatData.weapons[0].critical_chance;
    criticalChance -= combatData.computer_attributes.kyosirMod;
    if (combatData.weather === 'Astralands') criticalChance += 10;
    if (combatData.weather === 'Astralands' && combatData.weapons[0].influences[0] === 'Astra') criticalChance += 10;
    // console.log('Critical Chance', criticalChance, 'Critical Clearance', criticalClearance)
    const criticalResult = await criticalCompiler(combatData, criticalChance, criticalClearance, combatData.weapons[0], player_physical_damage, player_magical_damage);
    // console.log('Results for [Crit] [Glancing] [Phys Dam] [Mag Dam]', criticalResult.combatData.critical_success, criticalResult.combatData.glancing_blow, criticalResult.player_physical_damage, criticalResult.player_magical_damage)

    combatData = criticalResult.combatData;
    player_physical_damage = criticalResult.player_physical_damage;
    player_magical_damage = criticalResult.player_magical_damage;

    // If you made it here, your basic attack now resolves itself
    player_physical_damage *= 1 - ((1 - computer_physical_defense_multiplier) * (1 - (combatData.weapons[0].physical_penetration / 100)));
    player_magical_damage *=1 - ((1 - computer_magical_defense_multiplier) * (1 - (combatData.weapons[0].magical_penetration / 100)));

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

    // console.log(1 - ((1 - computer_physical_defense_multiplier) * (1 - (combatData.weapons[0].physical_penetration / 100))), 
    // 1 - computer_physical_defense_multiplier, 1 - (combatData.weapons[0].physical_penetration / 100), 
    // 'Combined Physical Defense Mitigation, Computer Physical Defense, Player Weapon Physical Penetration')

    player_total_damage = player_physical_damage + player_magical_damage;
    if (player_total_damage < 0) {
        player_total_damage = 0;
    }
    combatData.realized_player_damage = player_total_damage;

    let strength = combatData.player_attributes.totalStrength + combatData.weapons[0].strength;
    let agility = combatData.player_attributes.totalAgility + combatData.weapons[0].agility;
    let achre = combatData.player_attributes.totalAchre + combatData.weapons[0].achre;
    let caeren = combatData.player_attributes.totalCaeren + combatData.weapons[0].caeren;

    // if (combatData.weapons[0].grip === 'One Hand') {
    //     if (combatData.weapons[0].attack_type === 'Physical') {
    //         combatData.realized_player_damage *= (agility / 67)
    //     } else {
    //         combatData.realized_player_damage *= (achre / 67)
    //     }
    // }

    // if (combatData.weapons[0].grip === 'Two Hand') {
    //     if (combatData.weapons[0].attack_type === 'Physical') {
    //         combatData.realized_player_damage *= (strength / 100) 
    //     } else {
    //         combatData.realized_player_damage *= (caeren / 100)
    //     }
    // }

    if (combatData.computer_action === 'attack') {
        combatData.realized_player_damage *= 1.1;
    };

    combatData.new_computer_health = combatData.current_computer_health - combatData.realized_player_damage;
    combatData.current_computer_health = combatData.new_computer_health; // Added to persist health totals?

    combatData.player_action_description = 
        `You attack ${combatData.computer.name} with your ${combatData.weapons[0].name} for ${Math.round(player_total_damage)} ${combatData.player_damage_type} ${combatData.critical_success === true ? 'Critical Strike Damage' : combatData.glancing_blow === true ? 'Damage (Glancing)' : 'Damage'}.`    

    if (combatData.new_computer_health <= 0 || combatData.current_computer_health <= 0) {
        combatData.new_computer_health = 0;
        combatData.player_win = true;
    };

    // console.log(player_total_damage, 'Total Player Damage');

    return combatData
}

const damageTypeCompiler = async (combatData, weapon, player_physical_damage, player_magical_damage) => {
    // console.log('Damage Type Compiler Firing', player_physical_damage, player_magical_damage);
    if (combatData.player_damage_type === 'Blunt' || combatData.player_damage_type === 'Fire' || combatData.player_damage_type === 'Earth' || combatData.player_damage_type === 'Spooky') {
        if (weapon.attack_type === 'Physical') {
            if (combatData.computer.helmet.type === 'Plate-Mail') {
                player_physical_damage *= 1.15;
            }
            if (combatData.computer.helmet.type === 'Chain-Mail') {
                player_physical_damage *= 1.08;
            }
            if (combatData.computer.helmet.type === 'Leather-Mail') {
                player_physical_damage *= 0.92;
            }
            if (combatData.computer.helmet.type === 'Leather-Cloth') {
                player_physical_damage *= 0.85;
            }
            if (combatData.computer.chest.type === 'Plate-Mail') {
                player_physical_damage *= 1.1;
            }
            if (combatData.computer.chest.type === 'Chain-Mail') {
                player_physical_damage *= 1.05;
            }
            if (combatData.computer.chest.type === 'Leather-Mail') {
                player_physical_damage *= 0.95;
            }
            if (combatData.computer.chest.type === 'Leather-Cloth') {
                player_physical_damage *= 0.9;
            }
            if (combatData.computer.legs.type === 'Plate-Mail') {
                player_physical_damage *= 1.05;
            }
            if (combatData.computer.legs.type === 'Chain-Mail') {
                player_physical_damage *= 1.03;
            }
            if (combatData.computer.legs.type === 'Leather-Mail') {
                player_physical_damage *= 0.97;
            }
            if (combatData.computer.legs.type === 'Leather-Cloth') {
                player_physical_damage *= 0.95;
            }
        }
        if (weapon.attack_type === 'Magic') {
            if (combatData.computer.helmet.type === 'Plate-Mail') {
                player_magical_damage *= 1.15;
            }
            if (combatData.computer.helmet.type === 'Chain-Mail') {
                player_magical_damage *= 1.08;
            }
            if (combatData.computer.helmet.type === 'Leather-Mail') {
                player_magical_damage *= 0.92;
            }
            if (combatData.computer.helmet.type === 'Leather-Cloth') {
                player_magical_damage *= 0.85;
            }
            if (combatData.computer.chest.type === 'Plate-Mail') {
                player_magical_damage *= 1.1;
            }
            if (combatData.computer.chest.type === 'Chain-Mail') {
                player_magical_damage *= 1.05;
            }
            if (combatData.computer.chest.type === 'Leather-Mail') {
                player_magical_damage *= 0.95;
            }
            if (combatData.computer.chest.type === 'Leather-Cloth') {
                player_magical_damage *= 0.9;
            }
            if (combatData.computer.legs.type === 'Plate-Mail') {
                player_magical_damage *= 1.05;
            }
            if (combatData.computer.legs.type === 'Chain-Mail') {
                player_magical_damage *= 1.03;
            }
            if (combatData.computer.legs.type === 'Leather-Mail') {
                player_magical_damage *= 0.97;
            }
            if (combatData.computer.legs.type === 'Leather-Cloth') {
                player_magical_damage *= 0.95;
            }
        }
    }
    if (combatData.player_damage_type === 'Pierce' || combatData.player_damage_type === 'Lightning' || combatData.player_damage_type === 'Frost' || combatData.player_damage_type === 'Righteous') {
        if (weapon.attack_type === 'Physical') {
            if (combatData.computer.helmet.type === 'Plate-Mail') {
                player_physical_damage *= 0.85;
            }
            if (combatData.computer.helmet.type === 'Chain-Mail') {
                player_physical_damage *= 0.92;
            }
            if (combatData.computer.helmet.type === 'Leather-Mail') {
                player_physical_damage *= 1.08;
            }
            if (combatData.computer.helmet.type === 'Leather-Cloth') {
                player_physical_damage *= 1.15;
            }
            if (combatData.computer.chest.type === 'Plate-Mail') {
                player_physical_damage *= 0.9;
            }
            if (combatData.computer.chest.type === 'Chain-Mail') {
                player_physical_damage *= 0.95;
            }
            if (combatData.computer.chest.type === 'Leather-Mail') {
                player_physical_damage *= 1.05;
            }
            if (combatData.computer.chest.type === 'Leather-Cloth') {
                player_physical_damage *= 1.1;
            }
            if (combatData.computer.legs.type === 'Plate-Mail') {
                player_physical_damage *= 0.95;
            }   
            if (combatData.computer.legs.type === 'Chain-Mail') {
                player_physical_damage *= 0.97;
            }
            if (combatData.computer.legs.type === 'Leather-Mail') {
                player_physical_damage *= 1.03;
            }
            if (combatData.computer.legs.type === 'Leather-Cloth') {
                player_physical_damage *= 1.05;
            }
        }
        if (weapon.attack_type === 'Magic') {
            if (combatData.computer.helmet.type === 'Plate-Mail') {
                player_magical_damage *= 0.85;
            }
            if (combatData.computer.helmet.type === 'Chain-Mail') {
                player_magical_damage *= 0.92;
            }
            if (combatData.computer.helmet.type === 'Leather-Mail') {
                player_magical_damage *= 1.08;
            }
            if (combatData.computer.helmet.type === 'Leather-Cloth') {
                player_magical_damage *= 1.15;
            }
            if (combatData.computer.chest.type === 'Plate-Mail') {
                player_magical_damage *= 0.9;
            }
            if (combatData.computer.chest.type === 'Chain-Mail') {
                player_magical_damage *= 0.95;
            }
            if (combatData.computer.chest.type === 'Leather-Mail') {
                player_magical_damage *= 1.05;
            }
            if (combatData.computer.chest.type === 'Leather-Cloth') {
                player_magical_damage *= 1.1;
            }
            if (combatData.computer.legs.type === 'Plate-Mail') {
                player_magical_damage *= 0.95;
            }   
            if (combatData.computer.legs.type === 'Chain-Mail') {
                player_magical_damage *= 0.97;
            }
            if (combatData.computer.legs.type === 'Leather-Mail') {
                player_magical_damage *= 1.03;
            }
            if (combatData.computer.legs.type === 'Leather-Cloth') {
                player_magical_damage *= 1.05;
            }
        }
        
    }
    if (combatData.player_damage_type === 'Slash' || combatData.player_damage_type === 'Wind' || combatData.player_damage_type === 'Sorcery' || combatData.player_damage_type === 'Wild') {

        if (weapon.attack_type === 'Physical') {
            if (combatData.computer.helmet.type === 'Plate-Mail') {
                player_physical_damage *= 0.925 + Math.random() * 0.15;
            }
            if (combatData.computer.helmet.type === 'Chain-Mail') {
                player_physical_damage *= 0.925 + Math.random() * 0.15;
            }   
            if (combatData.computer.helmet.type === 'Leather-Mail') {
                player_physical_damage *= 0.925 + Math.random() * 0.15;
            }
            if (combatData.computer.helmet.type === 'Leather-Cloth') {
                player_physical_damage *= 0.925 + Math.random() * 0.15;
            }
    
            if (combatData.computer.chest.type === 'Plate-Mail') {
                player_physical_damage *= 0.925 + Math.random() * 0.15;
            }
            if (combatData.computer.chest.type === 'Chain-Mail') {
                player_physical_damage *= 0.925 + Math.random() * 0.15;
            }
            if (combatData.computer.chest.type === 'Leather-Mail') {
                player_physical_damage *= 0.925 + Math.random() * 0.15;
            }
            if (combatData.computer.chest.type === 'Leather-Cloth') {
                player_physical_damage *= 0.925 + Math.random() * 0.15;
            }
    
            if (combatData.computer.legs.type === 'Plate-Mail') {
                player_physical_damage *= 0.925 + Math.random() * 0.15;
            }
            if (combatData.computer.legs.type === 'Chain-Mail') {
                player_physical_damage *= 0.925 + Math.random() * 0.15;
            }
            if (combatData.computer.legs.type === 'Leather-Mail') {
                player_physical_damage *= 0.925 + Math.random() * 0.15;
            }
            if (combatData.computer.legs.type === 'Leather-Cloth') {
                player_physical_damage *= 0.925 + Math.random() * 0.15;
            }
        }
        if (weapon.attack_type === 'Magic') {
            if (combatData.computer.helmet.type === 'Plate-Mail') {
                player_magical_damage *= 0.925 + Math.random() * 0.15;
            }
            if (combatData.computer.helmet.type === 'Chain-Mail') {
                player_magical_damage *= 0.925 + Math.random() * 0.15;
            }   
            if (combatData.computer.helmet.type === 'Leather-Mail') {
                player_magical_damage *= 0.925 + Math.random() * 0.15;
            }
            if (combatData.computer.helmet.type === 'Leather-Cloth') {
                player_magical_damage *= 0.925 + Math.random() * 0.15;
            }
            if (combatData.computer.chest.type === 'Plate-Mail') {
                player_magical_damage *= 0.925 + Math.random() * 0.15;
            }
            if (combatData.computer.chest.type === 'Chain-Mail') {
                player_magical_damage *= 0.925 + Math.random() * 0.15;
            }
            if (combatData.computer.chest.type === 'Leather-Mail') {
                player_magical_damage *= 0.925 + Math.random() * 0.15;
            }
            if (combatData.computer.chest.type === 'Leather-Cloth') {
                player_magical_damage *= 0.925 + Math.random() * 0.15;
            }
            if (combatData.computer.legs.type === 'Plate-Mail') {
                player_magical_damage *= 0.925 + Math.random() * 0.15;
            }
            if (combatData.computer.legs.type === 'Chain-Mail') {
                player_magical_damage *= 0.925 + Math.random() * 0.15;
            }
            if (combatData.computer.legs.type === 'Leather-Mail') {
                player_magical_damage *= 0.925 + Math.random() * 0.15;
            }
            if (combatData.computer.legs.type === 'Leather-Cloth') {
                player_magical_damage *= 0.925 + Math.random() * 0.15;
            }
        }

        
    }
    // console.log('Player Post-Damage Type Multiplier', player_physical_damage, player_magical_damage);
    return {
        combatData,
        player_physical_damage,
        player_magical_damage
    }
}

const criticalCompiler = async (combatData, critChance, critClearance, weapon, player_physical_damage, player_magical_damage) => {
    // console.log(critChance, critClearance, 'Crit Chance and Clearance');
    if (critChance >= critClearance) {
        player_physical_damage *= weapon.critical_damage;
        player_magical_damage *= weapon.critical_damage;
        combatData.critical_success = true;
    }

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

const counterCompiler = async (combatData, player_action, computer_action) => {
    player_action = 'attack';
    await attackCompiler(combatData, player_action)
    return (
        combatData
    )
}

const playerRollCompiler = async (combatData, player_initiative, computer_initiative, player_action, computer_action) => {
    const player_roll = combatData.weapons[0].roll;
    let roll_catch = Math.floor(Math.random() * 101) + combatData.computer_attributes.kyosirMod;
    // console.log(player_roll, 'Player Roll %', roll_catch, 'Roll # To Beat')
    if (player_roll > roll_catch) {
        combatData.roll_success = true;
        combatData.player_special_description = 
                `You successfully roll against ${combatData.computer.name}, avoiding their ${ combatData.computer_action === 'attack' ? 'Focused' : combatData.computer_action.charAt(0).toUpperCase() + combatData.computer_action.slice(1) } Attack.`
        await attackCompiler(combatData, player_action)
    } else {
        // if (player_initiative > computer_initiative) {
        combatData.player_special_description =
        `You failed to roll against ${combatData.computer.name}'s ${ combatData.computer_action === 'attack' ? 'Focused' : combatData.computer_action.charAt(0).toUpperCase() + combatData.computer_action.slice(1) } Attack.`
        return combatData
            //     await attackCompiler(combatData, player_action)
        //     await computerAttackCompiler(combatData, computer_action)
        // } else {
        //     combatData.player_special_description =
        //     `You failed to roll against ${combatData.computer.name}'s ${  combatData.computer_action === 'attack' ? 'Focused' : combatData.computer_action.charAt(0).toUpperCase() + combatData.computer_action.slice(1) } Attack.`
        //     await computerAttackCompiler(combatData, computer_action)
        //     await attackCompiler(combatData, player_action)
        // }
    }
    return (
        combatData
    )
}

// Resolves both Player and Computer Rolling
const doubleRollCompiler = async (combatData, player_initiative, computer_initiative, player_action, computer_action) => {
    const player_roll = combatData.weapons[0].roll;
    const computer_roll = combatData.computer_weapons[0].roll;
    let roll_catch = Math.floor(Math.random() * 101) + combatData.computer_attributes.kyosirMod;
    // console.log(player_roll, 'Player Roll %', computer_roll, 'Computer Roll %', roll_catch, 'Number to Beat')
    if (player_initiative > computer_initiative) { // You have Higher Initiative
        if (player_roll > roll_catch) { // The Player Succeeds the Roll
            combatData.player_special_description = 
                `You successfully roll against ${combatData.computer.name}, avoiding their ${combatData.computer_action.charAt(0).toUpperCase() + combatData.computer_action.slice(1)} Attack`
            await attackCompiler(combatData, player_action)
        } else if (computer_roll > roll_catch) { // The Player Fails the Roll and the Computer Succeeds
            combatData.player_special_description = 
                `You failed to roll against ${combatData.computer.name}'s ${combatData.computer_action.charAt(0).toUpperCase() + combatData.computer_action.slice(1)} Attack`
            combatData.computer_special_description = 
                `${combatData.computer.name} successfully rolls against you, avoiding your ${combatData.player_action.charAt(0).toUpperCase() + combatData.player_action.slice(1)} Attack`
            await computerAttackCompiler(combatData, computer_action)
        } else { // Neither Player nor Computer Succeed
            combatData.player_special_description = 
                `You failed to roll against ${combatData.computer.name}'s ${combatData.computer_action.charAt(0).toUpperCase() + combatData.computer_action.slice(1)} Attack`
            combatData.computer_special_description = 
                `${combatData.computer.name} fails to roll against your ${combatData.player_action.charAt(0).toUpperCase() + combatData.player_action.slice(1)} Attack`
            await attackCompiler(combatData, player_action)
            await computerAttackCompiler(combatData, computer_action)
        }
    } else { // The Computer has Higher Initiative
        if (computer_roll > roll_catch) { // The Computer Succeeds the Roll
            combatData.computer_special_description = 
                `${combatData.computer.name} successfully rolls against you, avoiding your ${combatData.player_action.charAt(0).toUpperCase() + combatData.player_action.slice(1)} Attack`
            await computerAttackCompiler(combatData, computer_action)
        } else if (player_roll > roll_catch) { // The Computer Fails the Roll and the Player Succeeds
            combatData.computer_special_description = 
                `${combatData.computer.name} fails to roll against your ${combatData.player_action.charAt(0).toUpperCase() + combatData.player_action.slice(1)} Attack`
            combatData.player_special_description = 
                `You successfully roll against ${combatData.computer.name}, avoiding their ${combatData.computer_action.charAt(0).toUpperCase() + combatData.computer_action.slice(1)} Attack`
            await attackCompiler(combatData, player_action)
        } else { // Neither Computer nor Player Succeed
            combatData.computer_special_description = 
                `${combatData.computer.name} fails to roll against your ${combatData.player_action.charAt(0).toUpperCase() + combatData.player_action.slice(1)} Attack`
            combatData.player_special_description = 
                `You failed to roll against ${combatData.computer.name}'s ${combatData.computer_action.charAt(0).toUpperCase() + combatData.computer_action.slice(1)} Attack`
            await computerAttackCompiler(combatData, computer_action)
            await attackCompiler(combatData, player_action)
        }
    }
    return (
        combatData
    )
}

// Action Splitter Determines the Action Payload and Sorts the Resolution of the Action Round
const actionSplitter = async (combatData) => {
    //TODO:FIXME: Work on proper rendering of current health and new health totals post-damage TODO:FIXME:
    const newData = {
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
        computer: combatData.computer, // Computer Enemy
        computer_health: combatData.computer_health,
        computer_attributes: combatData.computer_attributes, // Possesses compiled Attributes, Initiative
        computer_defense: combatData.computer_defense, // Posseses Base + Postured Defenses
        computer_defense_default: combatData.computer_defense_default, // Possesses Base Defenses
        computer_action: '', // Action Chosen By Computer
        computer_counter_guess: '', // Comp's Counter Guess if Action === 'Counter'
        computer_weapons: combatData.computer_weapons,  // All 3 Weapons
        computer_damage_type: combatData.computer_damage_type,
        potential_player_damage: 0, // All the Damage that is possible on hit for a player
        potential_computer_damage: 0, // All the Damage that is possible on hit for a computer
        realized_player_damage: 0, // Player Damage - Computer Defenses
        realized_computer_damage: 0, // Computer Damage - Player Defenses
        player_start_description: '',
        computer_start_description: '',
        player_special_description: '',
        computer_special_description: '',
        player_action_description: '', // The combat text to inject from the player
        computer_action_description: '', // The combat text to inject from the computer
        player_influence_description: '',
        computer_influence_description: '',
        player_influence_description_two: '',
        computer_influence_description_two: '',
        player_death_description: '',
        computer_death_description: '',
        current_player_health: combatData.new_player_health, // New player health post-combat action
        current_computer_health: combatData.new_computer_health, // New computer health post-combat action
        new_player_health: combatData.new_player_health, // New player health post-combat action
        new_computer_health: combatData.new_computer_health, // New computer health post-combat action
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
        computer_religious_success: false,
        dual_wielding: false,
        computer_dual_wielding: false,
        roll_success: false,
        counter_success: false,
        computer_roll_success: false,
        computer_counter_success: false,
        player_win: false,
        computer_win: false,
        critical_success: false,
        computer_critical_success: false,
        glancing_blow: false,
        computer_glancing_blow: false,
        combatRound: combatData.combatRound,
        sessionRound: combatData.sessionRound,
        playerEffects: combatData.playerEffects,
        computerEffects: combatData.computerEffects,
        playerBlessing: combatData.playerBlessing,
        computerBlessing: combatData.computerBlessing,
        prayerSacrifice: combatData.prayerSacrifice,
        combatInitiated: combatData.combatInitiated,
        actionStatus: combatData.actionStatus,
        gameIsLive: combatData.gameIsLive,
        combatEngaged: combatData.combatEngaged,
        dodgeStatus: combatData.dodgeStatus,
        instantStatus: combatData.instantStatus,
        highScore: combatData.highScore,
        winStreak: combatData.winStreak,
        loseStreak: combatData.loseStreak,
        weather: combatData.weather,
    };
    const player_initiative = newData.player_attributes.initiative;
    const computer_initiative = newData.computer_attributes.initiative;
    let player_action = newData.action;
    const player_counter = newData.counter_guess;
    let computer_counter = newData.computer_counter_guess;
    let computer_action = newData.computer_action;
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
    let newComputerWeaponOrder = newData.computer_weapons.sort(function() {
        return Math.random() - 0.5;
    })
    newData.computer_weapons = newComputerWeaponOrder

    let new_damage_type = Math.floor(Math.random() * newData.computer_weapons[0].damage_type.length);
    newData.computer_damage_type = newData.computer_weapons[0].damage_type[new_damage_type];

    // Weighs and Evaluates the Action the Opponent Will Choose Based on Reaction to Player Actions (Cumulative)
    await computerActionCompiler(newData, player_action, computer_action, computer_counter)
    // COUNTER >>> DODGE >>> ROLL >>> POSTURE >>> ATTACK
    computer_counter = newData.computer_counter_guess;
    computer_action = newData.computer_action;

    let prayers = ['Buff', 'Damage', 'Debuff', 'Heal'];
    let new_prayer = Math.floor(Math.random() * prayers.length);
    newData.computerBlessing = prayers[new_prayer];

    newData.computer_start_description = 
        `${newData.computer.name} sets to ${computer_action.charAt(0).toUpperCase() + computer_action.slice(1)}${computer_counter ? '-' + computer_counter.charAt(0).toUpperCase() + computer_counter.slice(1) : ''} against you.`

    newData.player_start_description = 
        `You attempt to ${player_action.charAt(0).toUpperCase() + player_action.slice(1)}${player_counter ? '-' + player_counter.charAt(0).toUpperCase() + player_counter.slice(1) : ''} against ${newData.computer.name}.`
    
    // If both Player and Computer Counter -> Counter [Fastest Resolution]
    if (player_action === 'counter' && computer_action === 'counter') { // This is if COUNTER: 'ACTION' Is the Same for Both
        if (player_counter === computer_counter && player_counter === 'counter') {
            if (player_initiative > computer_initiative) {
                newData.counter_success = true;
                newData.player_special_description = 
                    `You successfully Countered ${newData.computer.name}'s Counter-Counter! Absolutely Brutal`;
                await attackCompiler(newData, player_action);
                await faithFinder(newData, player_action, computer_action);

                await statusEffectCheck(newData);
                newData.combatRound += 1;
                newData.sessionRound += 1;
                return newData
            } else {
                newData.computer_counter_success = true;
                newData.computer_special_description = 
                    `${newData.computer.name} successfully Countered your Counter-Counter! Absolutely Brutal`
                await computerAttackCompiler(newData, computer_action);
                await faithFinder(newData, player_action, computer_action);

                await statusEffectCheck(newData);
                newData.combatRound += 1;
                newData.sessionRound += 1;
                return newData
            }    
        }
        // If the Player Guesses Right and the Computer Guesses Wrong
        if (player_counter === computer_action && computer_counter !== player_action) {
            newData.counter_success = true;
            newData.player_special_description = 
                `You successfully Countered ${newData.computer.name}'s Counter-${computer_counter.charAt(0).toUpperCase() + computer_counter.slice(1)}! Absolutely Brutal`
            await attackCompiler(newData, player_action)
            await faithFinder(newData, player_action, computer_action);
            await statusEffectCheck(newData);
            newData.combatRound += 1;
            newData.sessionRound += 1;
            return newData
        }
    
        // If the Computer Guesses Right and the Player Guesses Wrong
        if (computer_counter === player_action && player_counter !== computer_action) {
            newData.computer_counter_success = true;
            newData.computer_special_description = 
                `${newData.computer.name} successfully Countered your Counter-${player_counter.charAt(0).toUpperCase() + player_counter.slice(1)}! Absolutely Brutal`
            await computerAttackCompiler(newData, computer_action);
            await faithFinder(newData, player_action, computer_action);
            await statusEffectCheck(newData);
            newData.combatRound += 1;
            newData.sessionRound += 1;
            return newData
        } 
    
        if (player_counter !== computer_action && computer_counter !== player_action) {
            newData.player_special_description = 
                `You failed to Counter ${newData.computer.name}'s Counter! Heartbreaking`
            newData.computer_special_description = 
                `${newData.computer.name} fails to Counter your Counter! Heartbreaking`
                if (player_initiative > computer_initiative) {
                    await attackCompiler(newData, player_action);
                    await computerAttackCompiler(newData, computer_action);
                } else {
                    await computerAttackCompiler(newData, computer_action);
                    await attackCompiler(newData, player_action);
                }
        }
    } 


    // Partially Resolves Player: Counter + Countering the Computer
        // If Player Counters the Computer w/o the Enemy Countering
    if (player_action === 'counter' && computer_action !== 'counter') {
        if (player_counter === computer_action) {
            newData.counter_success = true;
            newData.player_special_description = 
                `You successfully Countered ${newData.computer.name}'s ${ newData.computer_action === 'attack' ? 'Focused' : newData.computer_action.charAt(0).toUpperCase() + newData.computer_action.slice(1) } Attack.`
            await attackCompiler(newData, player_action)
            await faithFinder(newData, player_action, computer_action);
            await statusEffectCheck(newData);
            newData.combatRound += 1;
            newData.sessionRound += 1;
            return newData
        } else {
            newData.player_special_description = 
                `You failed to Counter ${newData.computer.name}'s ${ newData.computer_action === 'attack' ? 'Focused' : newData.computer_action.charAt(0).toUpperCase() + newData.computer_action.slice(1) } Attack. Heartbreaking!`
        }
    }

    if (computer_action === 'counter' && player_action !== 'counter') {
        if (computer_counter === player_action) {
            newData.computer_counter_success = true;
            newData.computer_special_description = 
                `${newData.computer.name} successfully Countered your ${ newData.action === 'attack' ? 'Focused' : newData.action.charAt(0).toUpperCase() + newData.action.slice(1) } Attack.`
            await computerAttackCompiler(newData, computer_action)
            await faithFinder(newData, player_action, computer_action);
            await statusEffectCheck(newData);
            newData.combatRound += 1;
            newData.sessionRound += 1;
            return newData
        } else {
            newData.computer_special_description = 
                `${newData.computer.name} fails to Counter your ${ newData.action === 'attack' ? 'Focused' : newData.action.charAt(0).toUpperCase() + newData.action.slice(1) } Attack. Heartbreaking!`
        }
    }


    
    if (player_action === 'dodge' && computer_action === 'dodge') { // If both choose Dodge
        if (player_initiative > computer_initiative) {
            newData.player_special_description = 
                `You successfully Dodge ${newData.computer.name}'s ${  newData.computer_action === 'attack' ? 'Focused' : newData.computer_action.charAt(0).toUpperCase() + newData.computer_action.slice(1) } Attack`
            await attackCompiler(newData, player_action);
        } else {
            `${newData.computer.name} successfully Dodges your ${  newData.action === 'attack' ? 'Focused' : newData.action.charAt(0).toUpperCase() + newData.action.slice(1) } Attack`
            await computerAttackCompiler(newData, computer_action);
        }
    }

    // If the Player Dodges and the Computer does not *Counter or Dodge  *Checked for success
    if (player_action === 'dodge' && computer_action !== 'dodge') {
        newData.player_special_description = 
            `You successfully Dodge ${newData.computer.name}'s ${ newData.computer_action === 'attack' ? 'Focused' : newData.computer_action.charAt(0).toUpperCase() + newData.computer_action.slice(1) } Attack`
        await attackCompiler(newData, player_action);
        await faithFinder(newData, player_action, computer_action);
        await statusEffectCheck(newData);
        newData.combatRound += 1;
        newData.sessionRound += 1;
        return newData
    }

    // If the Computer Dodges and the Player does not *Counter or Dodge *Checked for success
    if (computer_action === 'dodge' && player_action !== 'dodge') {
        `${newData.computer.name} successfully Dodges your ${ newData.action === 'attack' ? 'Focused' : newData.action.charAt(0).toUpperCase() + newData.action.slice(1) } Attack`
        await computerAttackCompiler(newData, computer_action);
        await faithFinder(newData, player_action, computer_action);
        await statusEffectCheck(newData);
        newData.combatRound += 1;
        newData.sessionRound += 1;
        return newData
    }

    if (player_action === 'roll' && computer_action === 'roll') { // If both choose Roll
        await doubleRollCompiler(newData, player_initiative, computer_initiative, player_action, computer_action);
    }

    if (player_action === 'roll' && computer_action !== 'roll') {
        await playerRollCompiler(newData, player_initiative, computer_initiative, player_action, computer_action);
        if (newData.roll_success === true) {
            await faithFinder(newData, player_action, computer_action);
            await statusEffectCheck(newData);
            newData.combatRound += 1;
            newData.sessionRound += 1;
            return newData
        }
    }

    if (computer_action === 'roll' && player_action !== 'roll') {
        await computerRollCompiler(newData, player_initiative, computer_initiative, player_action, computer_action)
        if (newData.computer_roll_success === true) {
            await faithFinder(newData, player_action, computer_action);
            await statusEffectCheck(newData);
            newData.combatRound += 1;
            newData.sessionRound += 1;
            return newData
        }
    }

    if (player_action === 'attack' || player_action === 'posture' || computer_action === 'attack' || computer_action === 'posture') { // If both choose Attack
        if (player_initiative > computer_initiative) {
            await attackCompiler(newData, player_action);
            // if (computer_action === 'attack' || computer_action === 'posture') {
                await computerAttackCompiler(newData, computer_action);
            // }
        } else {
            // if (computer_action === 'attack' || computer_action === 'posture') {
                await computerAttackCompiler(newData, computer_action);
            // }
            await attackCompiler(newData, player_action);
        }
    }

    await faithFinder(newData, player_action, computer_action);
    await statusEffectCheck(newData);
    
    if (newData.player_win === true) {
        newData.computer_death_description = 
        `${newData.computer.name} has been defeated. Hail ${newData.player.name}, you have won the duel!`;
    };
    if (newData.computer_win === true) {
        newData.player_death_description = 
        `You have been defeated. Hail ${newData.computer.name}, they have won the duel!`;
    };
    if (newData.player_win === true || newData.computer_win === true) {
        // To Remove Effects
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
        existingEffect = new StatusEffect(combatData, combatData.player, combatData.computer, combatData.weapons[0], combatData.player_attributes, combatData.playerBlessing);
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
                    }
                }
                for (let key in combatData.player_defense) {
                    if (existingEffect.effect[key]) {
                        combatData.player_defense[key] += existingEffect.effect[key];
                    }
                }
                break;
            }
            case 'Damage': {
                existingEffect.effect.damage = Math.round(existingEffect.effect.damage * existingEffect.activeStacks);
                break;
            }
        }
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
    let damage = combatData.player[mastery] * 0.5;
    console.log(damage, 'Damage');
    combatData.realized_player_damage = damage;
    combatData.new_computer_health = combatData.current_computer_health - combatData.realized_player_damage;
    combatData.current_computer_health = combatData.new_computer_health; // Added to persist health totals?

    combatData.player_action_description = 
        `You instantly attack ${combatData.computer.name}'s Caeren with your Conviction for ${Math.round(damage)} Pure Damage.`    

    if (combatData.new_computer_health <= 0 || combatData.current_computer_health <= 0) {
        combatData.new_computer_health = 0;
        combatData.player_win = true;
    };
};

const instantActionSplitter = async (combatData) => {
    switch (combatData.player.mastery) {
        case 'Constitution':
            await prayerSplitter(combatData, 'Heal');
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
            await prayerSplitter(combatData, 'Debuff');
            break;
    };
    await statusEffectCheck(combatData);
    return combatData;
};

const consumePrayerSplitter = async (combatData) => {
    console.log("Consuming Prayer: ", combatData.new_player_health, combatData.current_player_health, "Player Health Before");
    combatData.playerEffects = combatData.playerEffects.filter(effect => {
        const matchingWeapon = combatData.weapons.find(weapon => weapon.name === effect.weapon);
        const matchingWeaponIndex = combatData.weapons.indexOf(matchingWeapon);
        const matchingDebuffTarget = combatData.computer_weapons.find(weapon => weapon.name === effect.debuffTarget);
        const matchingDebuffTargetIndex = combatData.computer_weapons.indexOf(matchingDebuffTarget);
        if (effect.prayer !== combatData.prayerSacrifice) return true;
        switch (combatData.prayerSacrifice) {
            case 'Heal':
                console.log(combatData.new_player_health, combatData.current_player_health, "Player Health Before")
                console.log("Healing for :", effect.effect.healing * 0.5);
                combatData.new_player_health += effect.effect.healing * 0.5;
                combatData.current_player_health += effect.effect.healing * 0.5;
                console.log(combatData.new_player_health, combatData.current_player_health, "Player Health After")
                if (combatData.current_player_health > 0 || combatData.new_player_health > 0) {
                    combatData.computer_win = false;
                };
                break;
            case 'Buff':
                combatData.new_computer_health = combatData.current_computer_health - combatData.realized_player_damage;
                combatData.current_computer_health = combatData.new_computer_health; // Added to persist health totals?
            
                combatData.player_action_description = 
                    `${combatData.weapons[0].influences[0]}'s Tendrils serenade ${combatData.computer.name}, echoing ${Math.round(combatData.realized_player_damage)} more damage.`    
            
                if (combatData.new_computer_health <= 0 || combatData.current_computer_health <= 0) {
                    combatData.new_computer_health = 0;
                    combatData.player_win = true;
                };
                for (let key in effect.effect) {
                    if (key in combatData.weapons[matchingWeaponIndex]) {
                        if (key !== 'dodge') {
                            combatData.weapons[matchingWeaponIndex][key] -= effect.effect[key] * effect.activeStacks;
                        } else {
                            combatData.weapons[matchingWeaponIndex][key] += effect.effect[key] * effect.activeStacks;
                        };
                    };
                    if (key in combatData.player_defense) {
                        combatData.player_defense[key] -= effect.effect[key] * effect.activeStacks;
                    };
                };
                break;
            case 'Damage':
                combatData.new_computer_health -= effect.effect.damage * 0.5;
                combatData.current_computer_health -= effect.effect.damage * 0.5;

                if (combatData.new_computer_health <= 0 || combatData.current_computer_health <= 0) {
                    combatData.new_computer_health = 0;
                    combatData.player_win = true;
                };

                break;
            case 'Debuff':
                
                combatData.new_computer_health = combatData.current_computer_health - combatData.realized_computer_damage;
                combatData.current_computer_health = combatData.new_computer_health; // Added to persist health totals?
            
                combatData.player_action_description = 
                    `The Hush of ${combatData.weapons[0].influences[0]} wracks ${combatData.computer.name}, wearing for ${Math.round(combatData.realized_computer_damage)} more damage.`    
            
                if (combatData.new_computer_health <= 0 || combatData.current_computer_health <= 0) {
                    combatData.new_computer_health = 0;
                    combatData.player_win = true;
                };

                for (let key in effect.effect) {
                    if (key in combatData.computer_weapons[matchingDebuffTargetIndex]) {
                        if (key !== 'dodge') {
                            combatData.computer_weapons[matchingDebuffTargetIndex][key] += effect.effect[key] * effect.activeStacks;
                        } else {
                            combatData.computer_weapons[matchingDebuffTargetIndex][key] -= effect.effect[key] * effect.activeStacks;
                        };
                    };
                    if (key in combatData.computer_defense) {
                        combatData.computer_defense[key] += effect.effect[key] * effect.activeStacks;
                    };
                };
                break;
            default: break;
        };
        return false;
    });
    combatData.prayerSacrifice = '';
    return combatData;
};

// ================================= CONTROLLER - SERVICE ===================================== \\

const actionCompiler = async (combatData) => {
    try {
        const result = await actionSplitter(combatData);
        if (result.player_win === true || result.computer_win === true) {
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
        const result = await instantActionSplitter(combatData);
        if (result.player_win === true || result.computer_win === true) {
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
        const result = await consumePrayerSplitter(combatData);
        if (result.player_win === true || result.computer_win === true) {
            await statusEffectCheck(result);
        };
        return result;
    } catch (err) {
        console.log(err, 'Error in the Consume Prayer of Game Services');
        res.status(400).json({ err })
    };
};

module.exports = {
    actionCompiler,
    instantActionCompiler,
    consumePrayer
};