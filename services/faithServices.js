//TODO:FIXME: Maybe create a faithServices.js file to handle all the faith related functions?
//TODO:FIXME: Remake effect into a new class perhaps with getters and setters for the properties?

// const statusEffect = new StatusEffect(combatData, combatData.playerEffects, combatData.player, combatdata.computer, weapons[0], combatData.player.faith e.g. 'Achreo', governance, combatData.player_attributes.totalAchre, style="Choice", behavior="Choice");

class StatusEffect {
    constructor(combatData, statusEffects, player, enemy, weapon, faith, governance, attribute, style, behavior) {
        // May have to juggle the order of these args and the order of the properties and how they are derived. Not sure
        this.name = this.setName(faith);
        this.duration = this.setDuration(player);
        this.intensity = this.setIntensity(attribute, player);
        this.tick = this.setTick(combatData);
        this.refreshes = this.setRefreshes(style);
        this.stacks = this.setStacks(style);
        this.type = this.setType(style, behavior);
        this.effect = this.setEffect(statusEffects, faith, governance, attribute, this.intensity, this.type);
        this.description = description;
        this.imgURL = this.setImgURL(weapon);
    }

    getEffect(faith, governance, intensity, type) {
    }
    getDuration() {
        return this.duration;
    }
    getType() {
        return this.type;
    }
    getIntensity() {
        return this.intensity;
    }
    getImgURL() {
        return this.imgURL;
    }

    
    setName(deity) {
        this.name = `Gift of ${deity}`;
    }
    setDuration(player) {
        this.duration = Math.floor(player.level / 4 + 1) > 4 ? 4 : Math.floor(player.level / 4 + 1);;
    }
    setIntensity(attributeNumber, player) {
        this.intensity = {
            value: attributeNumber,
            magnitude: player.level / 10,
        };
    }
    setTick(combatData) {
        this.tick = {
            start: combatData.combatRound,
            end: combatData.combatRound + this.duration,
        };
    }
    setRefreshes(style) {
        this.refreshes = style === 'refreshes' ? true : false;
    }
    setStacks(style) {
        this.stacks = style === 'stacks' ? true : false;
    }
    setType(style, behavior) {
        this.type = style === 'refreshes' && behavior === 'offensive' ? 'Debuff' : style === 'refreshes' && behavior === 'defensive' ? 'Heal' : style === 'stacks' && behavior === 'offensive' ? 'Damage' : 'Buff';
    }
    setEffect(statusEffects, faith, governance, attribute, intensity, type) {
        // This Is What Creates The Effect
        let existingEffect = statusEffects.find(effect => effect.name === `Gift of ${faith}` && effect.type === type);
        if (existingEffect && existingEffect.refreshes) { // If the effect already exists and it refreshes, update the endTick, for Heals and Debuffs
            existingEffect.duration = Math.floor(player.level / 4 + 1) > 4 ? 4 : Math.floor(player.level / 4 + 1);
            existingEffect.tick.end = combatData.combatRound + existingEffect.duration;
            return this.effect = existingEffect;
        } else if (existingEffect && existingEffect.stacks) { // If the effect already exists and it stacks, update the endTick and intensity, for Damage and Buffs
            existingEffect.tick.end += 1;
            existingEffect.intensity.value += attribute;
            return this.effect = existingEffect;
        }

        // Maybe I'll run this through the faithFinder function to get the effect and description. GENIUS 

        const faithCheck = faithFinder(combatData, this);
        
        this.effect;
    }
    setImgURL(weap) {
        this.imgURL = weap.imgURL;
    }

}

const effectCompiler = async (combatData, statusEffects, player, enemy, weapon, faith, governance, attribute, style, behavior) => {
    // governance is the attribute tied to the faith arg, i.e. Achreo is achre, Cambire is caeren, etc.
    
    let effect = {
        
        description: 
            `${faith} has granted ${player.name} a gift through the use of their ${weapon.name}, 
                ${style === 'refreshes' && behavior === 'offensive' ? `cursing ${enemy.name}` : // If Style = Refreshes + Behavior = Offensive, Create a Debuff
                style === 'refreshes' && behavior === 'defensive' ? `renewing you for ${this.intensity.value * this.intensity.magnitude}` :  // If Style = Refreshes + Behavior = Defensive, Create a Heal over Time
                style === 'stacks' && behavior === 'offensive' ? `damaging ${enemy.name} for ${this.intensity.value * this.intensity.magnitude}` : // If Style = Stacks + Behavior = Offensive, Create a Damage over Time
                `blessing ${player.name}`} for ${this.duration} combat rounds.`, // If Style = Stacks + Behavior = Defensive, Create a Buff over Time

    };

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

const faithFinder = async (combatData, ) => { // The influence will add a chance to have a special effect occur
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