//TODO:FIXME: Maybe create a faithServices.js file to handle all the faith related functions?
//TODO:FIXME: Remake effect into a new class perhaps with getters and setters for the properties?
const effectCompiler = async (combatData, statusEffects, player, enemy, weapon, faith, governance, attribute, style, behavior) => {
    // governance is the attribute tied to the faith arg, i.e. Achreo is achre, Cambire is caeren, etc.
    let existingEffect = statusEffects.find(effect => effect.name === `Gift of ${faith}`);
    if (existingEffect && existingEffect.refreshes) { // If the effect already exists and it refreshes, update the endTick, for Heals and Debuffs
        existingEffect.duration = Math.floor(player.level / 4 + 1) > 4 ? 4 : Math.floor(player.level / 4 + 1);
        existingEffect.tick.end = combatData.combatRound + existingEffect.duration;
        return {
            combatData, effect: existingEffect
        }
    } else if (existingEffect && existingEffect.stacks) { // If the effect already exists and it stacks, update the endTick and intensity, for Damage and Buffs
        existingEffect.tick.end += 1;
        existingEffect.intensity.value += attribute;
        return {
            combatData, effect: existingEffect
        }
    }
    let effectDuration = Math.floor(player.level / 4 + 1) > 4 ? 4 : Math.floor(player.level / 4 + 1);
    let effect = {
        name: `Gift of ${faith}`,
        duration: effectDuration,
        intensity: {
            value: attribute,
            magnitude: player.level / 10,
        },
        tick: {
            start: combatData.combatRound,
            end: combatData.combatRound + effectDuration,
        },
        refreshes: style === 'refreshes' ? true : false, 
        stacks: style === 'stacks' ? true : false,
        type: style === 'refreshes' && behavior === 'offensive' ? 'Debuff' : style === 'refreshes' && behavior === 'defensive' ? 'Heal' : style === 'stacks' && behavior === 'offensive' ? 'Damage' : 'Buff',
        effect: getEffect(weapon, faith, governance, this.intensity, this.type),
        description: 
            `${faith} has granted ${player.name} a gift through the use of their ${weapon.name}, 
                ${style === 'refreshes' && behavior === 'offensive' ? `cursing ${enemy.name}` : // If Style = Refreshes + Behavior = Offensive, Create a Debuff
                style === 'refreshes' && behavior === 'defensive' ? `renewing you for ${this.intensity.value * this.intensity.magnitude}` :  // If Style = Refreshes + Behavior = Defensive, Create a Heal over Time
                style === 'stacks' && behavior === 'offensive' ? `damaging ${enemy.name} for ${this.intensity.value * this.intensity.magnitude}` : // If Style = Stacks + Behavior = Offensive, Create a Damage over Time
                `blessing ${player.name}`} for ${this.duration} combat rounds.`, // If Style = Stacks + Behavior = Defensive, Create a Buff over Time
        imgURL: weapon.imgURL,
    };

    function getEffect(faith, governance, intensity, type) {
       
    }

    return {
        combatData, effect
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
            combatData.new_player_health += ahnve
            combatData.current_player_health += ahnve
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

    combatData.weapons[0].critical_chance = combatData.weapons[0].critical_chance.toFixed(2)
    combatData.weapons[0].critical_damage = combatData.weapons[0].critical_damage.toFixed(2)
    combatData.weapons[1].critical_chance = combatData.weapons[1].critical_chance.toFixed(2)
    combatData.weapons[1].critical_damage = combatData.weapons[1].critical_damage.toFixed(2)
    combatData.computer_weapons[0].critical_chance = combatData.computer_weapons[0].critical_chance.toFixed(2)
    combatData.computer_weapons[0].critical_damage = combatData.computer_weapons[0].critical_damage.toFixed(2)
    combatData.computer_weapons[1].critical_chance = combatData.computer_weapons[1].critical_chance.toFixed(2)
    combatData.computer_weapons[1].critical_damage = combatData.computer_weapons[1].critical_damage.toFixed(2)

    combatData.weapons[0].critical_chance = Number(combatData.weapons[0].critical_chance)
    combatData.weapons[0].critical_damage = Number(combatData.weapons[0].critical_damage)
    combatData.weapons[1].critical_chance = Number(combatData.weapons[1].critical_chance)
    combatData.weapons[1].critical_damage = Number(combatData.weapons[1].critical_damage)
    combatData.computer_weapons[0].critical_chance = Number(combatData.computer_weapons[0].critical_chance)
    combatData.computer_weapons[0].critical_damage = Number(combatData.computer_weapons[0].critical_damage)
    combatData.computer_weapons[1].critical_chance = Number(combatData.computer_weapons[1].critical_chance)
    combatData.computer_weapons[1].critical_damage = Number(combatData.computer_weapons[1].critical_damage)



    if (combatData.new_player_health > 0) {
        combatData.computer_win = false;
    }
    if (combatData.new_computer_health > 0) {
        combatData.player_win = false;
    }

    return combatData
}

// ================================= COMPUTER COMPILER FUNCTIONS ================================== \\

const computerActionCompiler = async (newData, player_action, computer_action, computer_counter) => {
    
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
        // if (computerActions.roll_rating > computerActions.armor_rating) {
        //     newData.roll_weight += 2
        // } else {
        //     newData.posture_weight += 2
        // }
        newData.roll_weight += 1;
        newData.posture_weight += 1;
        newData.counter_weight += 1;
        newData.attack_weight -= 3;
        newData.counter_attack_weight += 4;
        newData.counter_counter_weight -= 1;
        newData.counter_dodge_weight -= 1;
        newData.counter_posture_weight -= 1;
        newData.counter_roll_weight -= 1;
    }
    if (player_action === 'counter') { 
        newData.counter_weight -= 3;
        // newData.dodge_weight += 2;
        newData.attack_weight += 1;
        newData.posture_weight += 1;
        newData.roll_weight += 1;
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
        newData.counter_weight -= 3
        newData.attack_weight += 1  
        newData.posture_weight += 1
        newData.roll_weight += 1
    }
    newData.computer_action = computer_action;
    newData.computer_counter_guess = computer_counter;
    console.log(newData.computer_action, newData.computer_counter_guess, 'New Computer Action')

    return (
        newData
    )
}

const computerDualWieldCompiler = async (combatData, player_physical_defense_multiplier, player_magical_defense_multiplier) => { // Triggers if 40+ Str/Caer for 2h, 1h + Agi/Achre Mastery and 2nd weapon is 1h
    console.log('Computer Dual Wield Firing')
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
    const weapOneCrit = combatData.computer_weapons[0].critical_chance;
    const weapTwoCrit = combatData.computer_weapons[1].critical_chance;
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

    console.log(computer_weapon_one_total_damage, computer_weapon_two_total_damage);

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
    }

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
    console.log('Computer Attack Compiler Firing')
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
    const criticalChance = combatData.computer_weapons[0].critical_chance;
    const criticalResult = await computerCriticalCompiler(combatData, criticalChance, criticalClearance, combatData.computer_weapons[0], computer_physical_damage, computer_magical_damage)
    combatData = criticalResult.combatData;
    computer_physical_damage = criticalResult.computer_physical_damage;
    computer_magical_damage = criticalResult.computer_magical_damage;
    console.log('Results for Computer [Crit] [Glancing] [Phys Dam] [Mag Dam]', 
        criticalResult.combatData.computer_critical_success, criticalResult.combatData.computer_glancing_blow, 
        criticalResult.computer_physical_damage, criticalResult.computer_magical_damage)

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

    let strength = combatData.computer_attributes.totalStrength + combatData.computer_weapons[0].strength;
    let agility = combatData.computer_attributes.totalAgility + combatData.computer_weapons[0].agility;
    let achre = combatData.computer_attributes.totalAchre + combatData.computer_weapons[0].achre;
    let caeren = combatData.computer_attributes.totalCaeren + combatData.computer_weapons[0].caeren;

    // if (combatData.computer_weapons[0].grip === 'One Hand') {
    //     if (combatData.computer_weapons[0].attack_type === 'Physical') {
    //         combatData.realized_computer_damage *= (agility / 67)
    //     } else {
    //         combatData.realized_computer_damage *= (achre / 67)
    //     }
    // }

    // if (combatData.computer_weapons[0].grip === 'Two Hand') {
    //     if (combatData.computer_weapons[0].attack_type === 'Physical') {
    //         combatData.realized_computer_damage *= (strength / 100) 
    //     } else {
    //         combatData.realized_computer_damage *= (caeren / 100)
    //     }
    // }


    if (combatData.action === 'attack') {
        combatData.realized_computer_damage *= 1.1;
    }

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

    console.log(computer_total_damage, 'Total Computer Damage')

    return (
        combatData
    )
}

const computerDamageTypeCompiter = async (combatData, weapon, computer_physical_damage, computer_magical_damage) => {
    console.log('Computer Damage Type Compiler Firing', computer_physical_damage, computer_magical_damage);
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
    if (combatData.computer_damage_type === 'Pierce' || combatData.computer_damage_type === 'Lightning' || combatData.computer_damage_type === 'Frost' || combatData.computer_damage_type === 'Sorcery') {
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
    if (combatData.computer_damage_type === 'Slash' || combatData.computer_damage_type === 'Wind' || combatData.computer_damage_type === 'Righteous' || combatData.computer_damage_type === 'Wild') {
        if (weapon.attack_type === 'Physical') {
            if (combatData.player.helmet.type === 'Plate-Mail') {
                computer_physical_damage *= 0.92;
            }
            if (combatData.player.helmet.type === 'Chain-Mail') {
                computer_physical_damage *= 0.92;
            }   
            if (combatData.player.helmet.type === 'Leather-Mail') {
                computer_physical_damage *= 1.08;
            }
            if (combatData.player.helmet.type === 'Leather-Cloth') {
                computer_physical_damage *= 1.08;
            }
    
            if (combatData.player.chest.type === 'Plate-Mail') {
                computer_physical_damage *= 0.95;
            }
            if (combatData.player.chest.type === 'Chain-Mail') {
                computer_physical_damage *= 0.95;
            }
            if (combatData.player.chest.type === 'Leather-Mail') {
                computer_physical_damage *= 1.05;
            }
            if (combatData.player.chest.type === 'Leather-Cloth') {
                computer_physical_damage *= 1.05;
            }
    
            if (combatData.player.legs.type === 'Plate-Mail') {
                computer_physical_damage *= 0.97;
            }
            if (combatData.player.legs.type === 'Chain-Mail') {
                computer_physical_damage *= 0.97;
            }
            if (combatData.player.legs.type === 'Leather-Mail') {
                computer_physical_damage *= 1.03;
            }
            if (combatData.player.legs.type === 'Leather-Cloth') {
                computer_physical_damage *= 1.03;
            }
        }
        if (weapon.attack_type === 'Magic') {
            if (combatData.player.helmet.type === 'Plate-Mail') {
                computer_magical_damage *= 0.92;
            }
            if (combatData.player.helmet.type === 'Chain-Mail') {
                computer_magical_damage *= 0.92;
            }   
            if (combatData.player.helmet.type === 'Leather-Mail') {
                computer_magical_damage *= 1.08;
            }
            if (combatData.player.helmet.type === 'Leather-Cloth') {
                computer_magical_damage *= 1.08;
            }
            if (combatData.player.chest.type === 'Plate-Mail') {
                computer_magical_damage *= 0.95;
            }
            if (combatData.player.chest.type === 'Chain-Mail') {
                computer_magical_damage *= 0.95;
            }
            if (combatData.player.chest.type === 'Leather-Mail') {
                computer_magical_damage *= 1.05;
            }
            if (combatData.player.chest.type === 'Leather-Cloth') {
                computer_magical_damage *= 1.05;
            }
            if (combatData.player.legs.type === 'Plate-Mail') {
                computer_magical_damage *= 0.97;
            }
            if (combatData.player.legs.type === 'Chain-Mail') {
                computer_magical_damage *= 0.97;
            }
            if (combatData.player.legs.type === 'Leather-Mail') {
                computer_magical_damage *= 1.03;
            }
            if (combatData.player.legs.type === 'Leather-Cloth') {
                computer_magical_damage *= 1.03;
            }
        }
    }
    console.log('Computer Post-Damage Type Multiplier', computer_physical_damage, computer_magical_damage);
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
    if (critClearance > critChance + 90) {
        computer_physical_damage *= 0.1;
        computer_magical_damage *= 0.1;
        combatData.computer_glancing_blow = true;
    } else if (critClearance > critChance + 80) {
        computer_physical_damage *= 0.2;
        computer_magical_damage *= 0.2;
        combatData.computer_glancing_blow = true;
    } else if (critClearance > critChance + 70) {
        computer_physical_damage *= 0.3;
        computer_magical_damage *= 0.3;
        combatData.computer_glancing_blow = true;
    } else if (critClearance > critChance + 60) {
        computer_physical_damage *= 0.4;
        computer_magical_damage *= 0.4;
        combatData.computer_glancing_blow = true;
    } else if (critClearance > critChance + 50) {
        computer_physical_damage *= 0.5;
        computer_magical_damage *= 0.5;
        combatData.computer_glancing_blow = true;
    } else if (critClearance > critChance + 40) {
        computer_physical_damage *= 0.6;
        computer_magical_damage *= 0.6;
        combatData.computer_glancing_blow = true;
    } else if (critClearance > critChance + 30) {
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
    console.log('Computer Counter Firing')
    computer_action = 'attack';
    await attackCompiler(combatData, computer_action)
    return {
        combatData,
        computer_action
    }
}
    
const computerRollCompiler = async (combatData, player_initiative, computer_initiative, player_action, computer_action) => {
    console.log(computer_action, 'Computer Roll Firing')
    const computer_roll = combatData.computer_weapons[0].roll;
    let roll_catch = Math.floor(Math.random() * 101) + combatData.player_attributes.kyosirMod;
    console.log(computer_roll, 'Computer Roll %', roll_catch, 'Roll # To Beat')
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
    console.log('Dual Wielding')
    const player = combatData.player;
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
    const weapOneCrit = combatData.weapons[0].critical_chance;
    const weapTwoCrit = combatData.weapons[1].critical_chance;
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

    console.log('Attack Compiler Pre-Damage Type Multiplier', player_weapon_one_physical_damage, player_weapon_one_magical_damage)

    const damageType = await damageTypeCompiler(combatData, weapons[0], player_weapon_one_physical_damage, player_weapon_one_magical_damage);
    player_weapon_one_physical_damage = damageType.player_physical_damage;
    player_weapon_one_magical_damage = damageType.player_magical_damage;

    const damageTypeTwo = await damageTypeCompiler(combatData, weapons[1], player_weapon_two_physical_damage, player_weapon_two_magical_damage);
    player_weapon_two_physical_damage = damageTypeTwo.player_physical_damage;
    player_weapon_two_magical_damage = damageTypeTwo.player_magical_damage;

    console.log('Attack Compiler Post-Damage Type Multiplier', player_weapon_one_physical_damage, player_weapon_one_magical_damage)

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
    }

    combatData.new_computer_health = combatData.current_computer_health - combatData.realized_player_damage;
    combatData.current_computer_health = combatData.new_computer_health; // Added to persist health totals?

    if (combatData.new_computer_health <= 0 || combatData.current_computer_health <= 0) {
        combatData.new_computer_health = 0;
        combatData.player_win = true;
    }
    
    combatData.player_action_description = 
        `You dual-wield attack ${computer.name} with ${weapons[0].name} and ${weapons[1].name} for ${Math.round(combatData.realized_player_damage)} ${combatData.player_damage_type} and ${weapons[1].damage_type[0] ? weapons[1].damage_type[0] : ''}${weapons[1].damage_type[1] ? ' / ' + weapons[1].damage_type[1] : ''} ${firstWeaponCrit === true && secondWeaponCrit === true ? 'Critical Strike Damage' : firstWeaponCrit === true || secondWeaponCrit === true ? 'Partial Crit Damage' : combatData.glancing_blow === true ? 'Damage (Glancing)' : 'Damage'}.`    
    console.log(combatData.realized_player_damage)
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
    }

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
                        }
                    } else {
                        player_physical_damage *= 1.3;
                        player_magical_damage *= 1.15;
                    }
                } else {
                    player_physical_damage *= 1.1;
                    player_magical_damage *= 1.1;
                }
            } 
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
                        }
                    } else {
                        player_physical_damage *= 1.15;
                        player_magical_damage *= 1.3;
                    }
                } else {
                    player_physical_damage *= 1.1;
                    player_magical_damage *= 1.1;
                }
            }
        } 
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
                        }
                    } else { // Less than 40 Srength 
                        player_physical_damage *= 1.3;
                        player_magical_damage *= 1.15;
                    }
                } else {
                    player_physical_damage *= 1.1;
                    player_magical_damage *= 1.1;
                }
            }
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
                    }
                } else {
                    player_physical_damage *= 1.1;
                    player_magical_damage *= 1.1;
                }
            }
            if (combatData.weapons[0].type === 'Bow') {
                if (combatData.player.mastery === 'Agility' || combatData.player.mastery === 'Achre' || combatData.player.mastery === 'Kyosir' || combatData.player.mastery === 'Constitution') {
                    player_physical_damage *= 1.4;
                    player_magical_damage *= 1.4;
                } else {
                    player_physical_damage *= 1.1;
                    player_magical_damage *= 1.1;
                }
            }
        } 
    }

    // Checking For Player Actions
    if (player_action === 'counter') {
        if (combatData.counter_success === true) {
            player_physical_damage *= 3;
            player_magical_damage *= 3;
        } else {
            player_physical_damage *= 0.9;
            player_magical_damage *= 0.9;
        }
    }

    if (player_action === 'dodge') {
        player_physical_damage *= 0.9;
        player_magical_damage *= 0.9;
    }

    // if (player_action === 'posture') {
    //     player_physical_damage *= 0.95;
    //     player_magical_damage *= 0.95;
    // }

    if (player_action === 'roll' ) {
        if (combatData.roll_success === true) {
            player_physical_damage *= 1.15;
            player_magical_damage *= 1.15;
        } else {
            player_physical_damage *= 0.95;
            player_magical_damage *= 0.95;
        }
    }

    // This is for Critical Strikes
    const criticalClearance = Math.floor(Math.random() * 101);
    const criticalChance = combatData.weapons[0].critical_chance;
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
    // console.log('Attack Compiler Post-Damage Type Multiplier', player_physical_damage, player_magical_damage)

    console.log(1 - ((1 - computer_physical_defense_multiplier) * (1 - (combatData.weapons[0].physical_penetration / 100))), 
    1 - computer_physical_defense_multiplier, 1 - (combatData.weapons[0].physical_penetration / 100), 
    'Combined Physical Defense Mitigation, Computer Physical Defense, Player Weapon Physical Penetration')

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
    }

    combatData.new_computer_health = combatData.current_computer_health - combatData.realized_player_damage;
    combatData.current_computer_health = combatData.new_computer_health; // Added to persist health totals?

    combatData.player_action_description = 
        `You attack ${combatData.computer.name} with your ${combatData.weapons[0].name} for ${Math.round(player_total_damage)} ${combatData.player_damage_type} ${combatData.critical_success === true ? 'Critical Strike Damage' : combatData.glancing_blow === true ? 'Damage (Glancing)' : 'Damage'}.`    

    if (combatData.new_computer_health <= 0 || combatData.current_computer_health <= 0) {
        combatData.new_computer_health = 0;
        combatData.player_win = true;
    }

    console.log(player_total_damage, 'Total Player Damage');

    return combatData
}

const damageTypeCompiler = async (combatData, weapon, player_physical_damage, player_magical_damage) => {
    console.log('Damage Type Compiler Firing', player_physical_damage, player_magical_damage);
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
    if (combatData.player_damage_type === 'Pierce' || combatData.player_damage_type === 'Lightning' || combatData.player_damage_type === 'Frost' || combatData.player_damage_type === 'Sorcery') {
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
    if (combatData.player_damage_type === 'Slash' || combatData.player_damage_type === 'Wind' || combatData.player_damage_type === 'Righteous' || combatData.player_damage_type === 'Wild') {

        if (weapon.attack_type === 'Physical') {
            if (combatData.computer.helmet.type === 'Plate-Mail') {
                player_physical_damage *= 0.92;
            }
            if (combatData.computer.helmet.type === 'Chain-Mail') {
                player_physical_damage *= 0.92;
            }   
            if (combatData.computer.helmet.type === 'Leather-Mail') {
                player_physical_damage *= 1.08;
            }
            if (combatData.computer.helmet.type === 'Leather-Cloth') {
                player_physical_damage *= 1.08;
            }
    
            if (combatData.computer.chest.type === 'Plate-Mail') {
                player_physical_damage *= 0.95;
            }
            if (combatData.computer.chest.type === 'Chain-Mail') {
                player_physical_damage *= 0.95;
            }
            if (combatData.computer.chest.type === 'Leather-Mail') {
                player_physical_damage *= 1.05;
            }
            if (combatData.computer.chest.type === 'Leather-Cloth') {
                player_physical_damage *= 1.05;
            }
    
            if (combatData.computer.legs.type === 'Plate-Mail') {
                player_physical_damage *= 0.97;
            }
            if (combatData.computer.legs.type === 'Chain-Mail') {
                player_physical_damage *= 0.97;
            }
            if (combatData.computer.legs.type === 'Leather-Mail') {
                player_physical_damage *= 1.03;
            }
            if (combatData.computer.legs.type === 'Leather-Cloth') {
                player_physical_damage *= 1.03;
            }
        }
        if (weapon.attack_type === 'Magic') {
            if (combatData.computer.helmet.type === 'Plate-Mail') {
                player_magical_damage *= 0.92;
            }
            if (combatData.computer.helmet.type === 'Chain-Mail') {
                player_magical_damage *= 0.92;
            }   
            if (combatData.computer.helmet.type === 'Leather-Mail') {
                player_magical_damage *= 1.08;
            }
            if (combatData.computer.helmet.type === 'Leather-Cloth') {
                player_magical_damage *= 1.08;
            }
            if (combatData.computer.chest.type === 'Plate-Mail') {
                player_magical_damage *= 0.95;
            }
            if (combatData.computer.chest.type === 'Chain-Mail') {
                player_magical_damage *= 0.95;
            }
            if (combatData.computer.chest.type === 'Leather-Mail') {
                player_magical_damage *= 1.05;
            }
            if (combatData.computer.chest.type === 'Leather-Cloth') {
                player_magical_damage *= 1.05;
            }
            if (combatData.computer.legs.type === 'Plate-Mail') {
                player_magical_damage *= 0.97;
            }
            if (combatData.computer.legs.type === 'Chain-Mail') {
                player_magical_damage *= 0.97;
            }
            if (combatData.computer.legs.type === 'Leather-Mail') {
                player_magical_damage *= 1.03;
            }
            if (combatData.computer.legs.type === 'Leather-Cloth') {
                player_magical_damage *= 1.03;
            }
        }

        
    }
    console.log('Player Post-Damage Type Multiplier', player_physical_damage, player_magical_damage);
    return {
        combatData,
        player_physical_damage,
        player_magical_damage
    }
}

const criticalCompiler = async (combatData, critChance, critClearance, weapon, player_physical_damage, player_magical_damage) => {
    console.log(critChance, critClearance, 'Crit Chance and Clearance');
    if (critChance >= critClearance) {
        player_physical_damage *= weapon.critical_damage;
        player_magical_damage *= weapon.critical_damage;
        combatData.critical_success = true;
    }

    if (critClearance > critChance + 90) {
        player_physical_damage *= 0.1;
        player_magical_damage *= 0.1;
        combatData.glancing_blow = true;
    } else if (critClearance > critChance + 80) {
        player_physical_damage *= 0.2;
        player_magical_damage *= 0.2;
        combatData.glancing_blow = true;
    } else if (critClearance > critChance + 70) {
        player_physical_damage *= 0.3;
        player_magical_damage *= 0.3;
        combatData.glancing_blow = true;
    } else if (critClearance > critChance + 60) {
        player_physical_damage *= 0.4;
        player_magical_damage *= 0.4;
        combatData.glancing_blow = true;
    } else if (critClearance > critChance + 50) {
        player_physical_damage *= 0.5;
        player_magical_damage *= 0.5;
        combatData.glancing_blow = true;
    } else if (critClearance > critChance + 40) {
        player_physical_damage *= 0.6;
        player_magical_damage *= 0.6;
        combatData.glancing_blow = true;
    } else if (critClearance > critChance + 30) {
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
    console.log('Player Counter Firing')
    player_action = 'attack';
    await attackCompiler(combatData, player_action)
    // if (computer_action === 'attack') {
    //     combatData.action = 'attack';
    //     await attackCompiler(combatData)
    // }
    // if (computer_action === 'counter') {
        
    // }
    // if (computer_action === 'dodge') {
        
    // }
    // if (computer_action === 'posture') {
        
    // }
    // if (computer_action === 'roll') {
        
    // }
    return (
        combatData
    )
}

const playerRollCompiler = async (combatData, player_initiative, computer_initiative, player_action, computer_action) => {
    console.log('Player Roll Firing')
    const player_roll = combatData.weapons[0].roll;
    let roll_catch = Math.floor(Math.random() * 101) + combatData.computer_attributes.kyosirMod;
    console.log(player_roll, 'Player Roll %', roll_catch, 'Roll # To Beat')
    if (player_roll > roll_catch) {
        combatData.roll_success = true;
        combatData.player_special_description = 
                `You successfully roll against ${combatData.computer.name}, avoiding their ${  combatData.computer_action === 'attack' ? 'Focused' : combatData.computer_action.charAt(0).toUpperCase() + combatData.computer_action.slice(1) } Attack.`
        await attackCompiler(combatData, player_action)
    } else {
        // if (player_initiative > computer_initiative) {
        combatData.player_special_description =
        `You failed to roll against ${combatData.computer.name}'s ${  combatData.computer_action === 'attack' ? 'Focused' : combatData.computer_action.charAt(0).toUpperCase() + combatData.computer_action.slice(1) } Attack.`
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
    console.log('Double Roll Firing')
    const player_roll = combatData.weapons[0].roll;
    const computer_roll = combatData.computer_weapons[0].roll;
    let roll_catch = Math.floor(Math.random() * 101) + combatData.computer_attributes.kyosirMod;
    console.log(player_roll, 'Player Roll %', computer_roll, 'Computer Roll %', roll_catch, 'Number to Beat')
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
        computer: combatData.computer, // Computer Enemy
        computer_health: combatData.computer_health,
        computer_attributes: combatData.computer_attributes, // Possesses compiled Attributes, Initiative
        computer_defense: combatData.computer_defense, // Posseses Base + Postured Defenses
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
        playerEffects: combatData.playerEffects,
        computerEffects: combatData.computerEffects,
    }
    // console.log(newData, 'Combat Data in the Action Splitter')
    const player_initiative = newData.player_attributes.initiative;
    const computer_initiative = newData.computer_attributes.initiative;
    let player_action = newData.action;
    const player_counter = newData.counter_guess;
    let computer_counter = newData.computer_counter_guess;
    let computer_action = newData.computer_action;
    let possible_choices = ['attack', 'posture', 'roll']
    let postureRating = ((combatData.player_defense.physicalPosture + combatData.player_defense.magicalPosture) / 4) + 5;
    let rollRating = combatData.weapons[0].roll;
    console.log('Posture vs Roll: ', postureRating, ' vs. ', rollRating)
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
    console.log(possible_choices, 'What choice was added?')
    let new_choice = Math.floor(Math.random() * possible_choices.length)
    console.log(new_choice, 'New Choice Number')
    if (player_action === '') {
        newData.action = possible_choices[new_choice];
        newData.player_action = possible_choices[new_choice];
        player_action = possible_choices[new_choice];
        console.log(player_action, 'New Choice')
    }
    let newComputerWeaponOrder = newData.computer_weapons.sort(function() {
        return Math.random() - 0.5;
    })
    // console.log(newComputerWeaponOrder)
    newData.computer_weapons = newComputerWeaponOrder

    let new_damage_type = Math.floor(Math.random() * newData.computer_weapons[0].damage_type.length);
    newData.computer_damage_type = newData.computer_weapons[0].damage_type[new_damage_type];
    // console.log(newData.computer_damage_type, 'New Damage Type')

    // Weighs and Evaluates the Action the Opponent Will Choose Based on Reaction to Player Actions (Cumulative)
    await computerActionCompiler(newData, player_action, computer_action, computer_counter)
    // COUNTER >>> DODGE >>> ROLL >>> POSTURE >>> ATTACK
    computer_counter = newData.computer_counter_guess;
    computer_action = newData.computer_action;
    console.log(newData.computer_action, 'Computer Action', newData.computer_counter_guess, '<- If Countering')

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
                    `You successfully Countered ${newData.computer.name}'s Counter-Counter! Absolutely Brutal`
                await attackCompiler(newData, player_action)
                await faithFinder(newData, player_action, computer_action);
                return newData
            } else {
                newData.computer_counter_success = true;
                newData.computer_special_description = 
                    `${newData.computer.name} successfully Countered your Counter-Counter! Absolutely Brutal`
                await computerAttackCompiler(newData, computer_action);
                await faithFinder(newData, player_action, computer_action);
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
            return newData
        }
    
        // If the Computer Guesses Right and the Player Guesses Wrong
        if (computer_counter === player_action && player_counter !== computer_action) {
            newData.computer_counter_success = true;
            newData.computer_special_description = 
                `${newData.computer.name} successfully Countered your Counter-${player_counter.charAt(0).toUpperCase() + player_counter.slice(1)}! Absolutely Brutal`
            await computerAttackCompiler(newData, computer_action);
            await faithFinder(newData, player_action, computer_action);
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
            await attackCompiler(newData, player_action)
        } else {
            `${newData.computer.name} successfully Dodges your ${  newData.action === 'attack' ? 'Focused' : newData.action.charAt(0).toUpperCase() + newData.action.slice(1) } Attack`
            await computerAttackCompiler(newData, computer_action)
        }
    }

    // If the Player Dodges and the Computer does not *Counter or Dodge  *Checked for success
    if (player_action === 'dodge' && computer_action !== 'dodge') {
        newData.player_special_description = 
            `You successfully Dodge ${newData.computer.name}'s ${ newData.computer_action === 'attack' ? 'Focused' : newData.computer_action.charAt(0).toUpperCase() + newData.computer_action.slice(1) } Attack`
        await attackCompiler(newData, player_action)
        await faithFinder(newData, player_action, computer_action);
        return newData
    }

    // If the Computer Dodges and the Player does not *Counter or Dodge *Checked for success
    if (computer_action === 'dodge' && player_action !== 'dodge') {
        `${newData.computer.name} successfully Dodges your ${ newData.action === 'attack' ? 'Focused' : newData.action.charAt(0).toUpperCase() + newData.action.slice(1) } Attack`
        await computerAttackCompiler(newData, computer_action)
        await faithFinder(newData, player_action, computer_action);
        return newData
    }

    if (player_action === 'roll' && computer_action === 'roll') { // If both choose Roll
        await doubleRollCompiler(newData, player_initiative, computer_initiative, player_action, computer_action)
    }

    if (player_action === 'roll' && computer_action !== 'roll') {
        await playerRollCompiler(newData, player_initiative, computer_initiative, player_action, computer_action)
        if (newData.roll_success === true) {
            await faithFinder(newData, player_action, computer_action);
            return newData
        }
    }

    if (computer_action === 'roll' && player_action !== 'roll') {
        await computerRollCompiler(newData, player_initiative, computer_initiative, player_action, computer_action)
        if (newData.computer_roll_success === true) {
            await faithFinder(newData, player_action, computer_action);
            return newData
        }
    }

    if (player_action === 'attack' || player_action === 'posture' || computer_action === 'attack' || computer_action === 'posture') { // If both choose Attack
        if (player_initiative > computer_initiative) {
            await attackCompiler(newData, player_action)
            // if (computer_action === 'attack' || computer_action === 'posture') {
                await computerAttackCompiler(newData, computer_action)
            // }
        } else {
            // if (computer_action === 'attack' || computer_action === 'posture') {
                await computerAttackCompiler(newData, computer_action)
            // }
            await attackCompiler(newData, player_action)
        }
    }

    await faithFinder(newData, player_action, computer_action);
    
    if (newData.player_win === true) {
        newData.computer_death_description = 
        `${newData.computer.name} has been defeated. Hail ${newData.player.name}, you are the new va'Esai!`
    }
    if (newData.computer_win === true) {
        newData.player_death_description = 
            `You have been defeated. Hail ${newData.computer.name}, the new va'Esai!`
    }

    newData.combatRound += 1;

    return newData
}

// ================================= CONTROLLER - SERVICE ===================================== \\

const actionCompiler = async (combatData) => {
    // console.log(combatData, 'Combat Data in the Action Compiler of Game Services')
    try {
        const result = await actionSplitter(combatData)
        // console.log(result, 'Combat Result')
        return result
    } catch (err) {
        console.log(err, 'Error in the Action Compiler of Game Services');
        res.status(400).json({ err })
    }
}

module.exports = {
    actionCompiler
}