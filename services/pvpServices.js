
// =================================== HELPER CONSTANTS ======================================= \\


// =================================== HELPER FUNCTIONS ======================================= \\

const faithFinder = async (combatData, player_one_action, player_two_action) => { // The influence will add a chance to have a special effect occur
    let player_one_faith_number = Math.floor(Math.random() * 101);
    let player_one_faith_number_two = Math.floor(Math.random() * 101);
    let faith_check = Math.floor(Math.random() * 101);
    let player_two_faith_number = Math.floor(Math.random() * 101);
    let player_two_faith_number_two = Math.floor(Math.random() * 101);

    combatData.player_one_weapons[0].critical_chance = Number(combatData.player_one_weapons[0].critical_chance)
    combatData.player_one_weapons[0].critical_damage = Number(combatData.player_one_weapons[0].critical_damage)

    combatData.player_one_weapons[1].critical_chance = Number(combatData.player_one_weapons[1].critical_chance)
    combatData.player_one_weapons[1].critical_damage = Number(combatData.player_one_weapons[1].critical_damage)

    combatData.player_two_weapons[0].critical_chance = Number(combatData.player_two_weapons[0].critical_chance)
    combatData.player_two_weapons[0].critical_damage = Number(combatData.player_two_weapons[0].critical_damage)

    combatData.player_two_weapons[1].critical_chance = Number(combatData.player_two_weapons[1].critical_chance)
    combatData.player_two_weapons[1].critical_damage = Number(combatData.player_two_weapons[1].critical_damage)


    // console.log(combatData.player_one_weapons[0].magical_penetration, typeof(combatData.player_one_weapons[0].magical_penetration))
    // console.log(combatData.player_one_weapons[0].physical_penetration, typeof(combatData.player_one_weapons[0].physical_penetration))
    // console.log(combatData.player_one_weapons[0].roll, typeof(combatData.player_one_weapons[0].roll))
    // console.log(combatData.player_one_weapons[0].dodge, typeof(combatData.player_one_weapons[0].dodge))

    if (combatData.player_one.faith === 'devoted' && combatData.player_one_weapons[0].influences[0] === 'Daethos') {
        player_one_faith_number += 5;
        player_one_faith_number_two += 5;
    }
    if (combatData.player_one.faith === 'adherent' && combatData.player_one_weapons[0].influences[0] !== 'Daethos') {
        player_one_faith_number += 5;
        player_one_faith_number_two += 5;
    }

    if (combatData.player_two.faith === 'devoted' && combatData.player_two_weapons[0].influences[0] === 'Daethos') {
        player_two_faith_number += 5;
        player_two_faith_number_two += 5;
    }
    if (combatData.player_two.faith === 'adherent' && combatData.player_two_weapons[0].influences[0] !== 'Daethos') {
        player_two_faith_number += 5;
        player_two_faith_number_two += 5;
    }
    console.log(combatData.player_one_weapons[0].influences[0], combatData.player_one_weapons[1].influences[0])
    console.log(combatData.player_one.name, `'s Faith #`, player_one_faith_number, `Faith #2`, player_one_faith_number_two, `Dual Wielding?`, combatData.player_one_dual_wielding)

    console.log(combatData.player_two_weapons[0].influences[0], combatData.player_two_weapons[1].influences[0])
    console.log(combatData.player_two.name, `'s Faith #`, player_two_faith_number, `Faith #2`, player_two_faith_number_two, `Dual Wielding?`, combatData.player_two_dual_wielding)
    if (player_one_faith_number > 85) {
        combatData.player_one_religious_success = true;
        if (combatData.player_one_weapons[0].influences[0] === 'Daethos') { // God
            console.log('Daethos!')
            let daethos = (combatData.player_one_attributes.totalAchre + combatData.player_one_weapons[0].achre + combatData.player_one_attributes.totalCaeren + combatData.player_one_weapons[0].caeren);
            daethos = Math.round(daethos / 2);
            combatData.new_player_one_health += combatData.realized_player_one_damage;
            combatData.player_one_influence_description = 
                `Daethos wraps through ${combatData.player_one.name}'s Caer, ${combatData.player_one_weapons[0].name} healing them for ${Math.round(combatData.realized_player_one_damage)}. A faint echo of Caeren lingers for ${daethos} Righteously Spooky Damage.`    
            combatData.new_player_one_health += daethos;
            combatData.new_player_two_health -= daethos;
            combatData.current_player_one_health += daethos;
            combatData.current_player_two_health -= daethos;
            if (combatData.current_player_two_health < 0) {
                combatData.current_player_two_health = 0;
            }
            if (combatData.new_player_two_health < 0) {
                combatData.new_player_two_health = 0;
            }
    }
        if (combatData.player_one_weapons[0].influences[0] === 'Achreo') { // Wild
            console.log('Achreo!')
            // combatData.player_one_weapons[0].critical_chance = Number(combatData.player_one_weapons[0].critical_chance + 1);
            let achreo = 2 * (combatData.player_one_attributes.totalAchre + combatData.player_one_weapons[0].achre)
            combatData.new_player_one_health += achreo;
            combatData.current_player_one_health += achreo;
            combatData.player_one_influence_description = 
                `${combatData.player_one.name}'s Caer stirs Achreo, to his own surprise and soft as whispers he grants renewal of ${achreo}.`
            combatData.player_one_weapons[0].physical_damage += 2;
            combatData.player_one_weapons[0].magical_damage += 2;
            combatData.player_one_weapons[0].critical_chance += 2;
            combatData.player_one_weapons[0].critical_damage += 0.2;
        }
        if (combatData.player_one_weapons[0].influences[0] === "Ahn've") { // Wind
            let ahnve = 2 * (combatData.player_one_attributes.totalCaeren + combatData.player_one_weapons[0].caeren)
            combatData.new_player_one_health += ahnve
            combatData.current_player_one_health += ahnve
            console.log("Achreo!")
            combatData.player_one_influence_description = 
                `${combatData.player_one.name}'s Caer ushers forth Ahn've, a devastating storm posseses them to attack ${combatData.player_two.name} for ${Math.round(combatData.realized_player_one_damage)} more damage.`
            player_one_action = 'attack';
            if (combatData.realized_player_one_damage < 0) {
                combatData.realized_player_one_damage = 0;
            }
            combatData.new_player_two_health = combatData.current_player_two_health - combatData.realized_player_one_damage;
            combatData.current_player_two_health = combatData.new_player_two_health; // Added to persist health totals?

            if (combatData.new_player_two_health <= 0 || combatData.current_player_two_health <= 0) {
                combatData.new_player_two_health = 0;
                combatData.player_one_win = true;
            }
        }
        if (combatData.player_one_weapons[0].influences[0] === 'Astra') { // Lightning
            let astra = 2 * (combatData.player_one_attributes.totalAchre + combatData.player_one_weapons[0].achre)
            combatData.new_player_one_health += astra;
            combatData.current_player_one_health += astra;
            console.log("Astra!")
            combatData.player_one_influence_description = 
                `${combatData.player_one.name}'s Caer ushers forth the favor of Astra's Lightning, quickening them.`
            combatData.player_one_weapons[0].critical_chance += 4;
            combatData.player_one_weapons[0].roll += 2;
            combatData.player_one_weapons[0].critical_damage += 0.1;
        }
        if (combatData.player_one_weapons[0].influences[0] === 'Cambire') { // Potential
            console.log("Cambire!")
            combatData.player_one_influence_description = 
                `${combatData.player_one.name}'s Caer ushers forth the Chance of Cambire, warping back to attack ${combatData.player_two.name} for ${Math.round(combatData.realized_player_one_damage)} more damage.`
            player_one_action = 'attack';
            if (combatData.realized_player_one_damage < 0) {
                combatData.realized_player_one_damage = 0;
            }
            combatData.new_player_two_health = combatData.current_player_two_health - combatData.realized_player_one_damage;
            combatData.current_player_two_health = combatData.new_player_two_health; // Added to persist health totals?

            if (combatData.new_player_two_health <= 0 || combatData.current_player_two_health <= 0) {
                combatData.new_player_two_health = 0;
                combatData.player_one_win = true;
            }    
        }
        if (combatData.player_one_weapons[0].influences[0] === 'Chiomyr') { // Humor
            let chiomyr = 2 * (combatData.player_one_attributes.totalKyosir + combatData.player_one_weapons[0].kyosir);
            combatData.new_player_one_health += chiomyr;
            combatData.current_player_one_health += chiomyr;
            combatData.player_one_influence_description = 
                `${combatData.player_one.name}'s Caer causes a faint cackle to fade through the battle.`
            console.log("Chiomyr!")
            combatData.player_one_weapons[0].physical_penetration += 3;
            combatData.player_one_weapons[0].magical_penetration += 3;
        }
        if (combatData.player_one_weapons[0].influences[0] === 'Fyer') { // Fire
            let fyer = 2 * (combatData.player_one_attributes.totalCaeren + combatData.player_one_weapons[0].caeren)
            combatData.new_player_one_health += fyer;
            combatData.current_player_one_health += fyer;
            console.log("Fyer!")
            combatData.player_one_influence_description = 
                `${combatData.player_one.name}'s Caer ushers forth the favor of Fyer igniting through them.`
            combatData.player_one_weapons[0].critical_damage += 0.9;
            combatData.player_one_weapons[0].critical_chance += 1;
        }
        if (combatData.player_one_weapons[0].influences[0] === 'Ilios') { // Sun
            let ilios = combatData.realized_player_one_damage;
            combatData.new_player_one_health += ilios;
            combatData.current_player_one_health += ilios;
            console.log("Ilios!")
            combatData.player_one_influence_description = 
                `The Hush of Ilios bursts into them through ${combatData.player_one.name}'s ${combatData.player_one_weapons[0].name}, his brilliance radiating for ${Math.round(ilios)}.`
            player_one_action = 'attack';   
            combatData.player_one_weapons[0].magical_penetration += 2;
            combatData.player_one_weapons[0].physical_penetration += 2;
            combatData.player_one_defense.physicalDefenseModifier += 1;
            combatData.player_one_defense.magicalDefenseModifier += 1;
            combatData.player_one_defense.physicalPosture += 1;
            combatData.player_one_defense.magicalPosture += 1;
        }
        if (combatData.player_one_weapons[0].influences[0] === "Kyn'gi") { // Hunt
            console.log("Kyn'gi!")
            let kyngi = 2 * (combatData.player_one_attributes.totalAgility + combatData.player_one_weapons[0].agility)
            combatData.new_player_one_health += kyngi;
            combatData.current_player_one_health += kyngi;
            combatData.player_one_influence_description = 
                `${combatData.player_one.name}'s keening Caer shrieks into Kyn'gi, his blessing emboldening the Hunt.`
            combatData.player_one_weapons[0].roll += 3;
            combatData.player_one_weapons[0].critical_chance += 3;
        }
        if (combatData.player_one_weapons[0].influences[0] === "Kyrisos") { // Gold
            let kyrisos = 2 * (combatData.player_one_attributes.totalKyosir + combatData.player_one_weapons[0].kyosir)
            combatData.new_player_one_health += kyrisos;
            combatData.current_player_one_health += kyrisos;
            console.log("Kyrisos!")
            combatData.player_one_influence_description = 
                `The Caer of Kyrisos imbues them with Kyosir!`
            combatData.player_one_attributes.kyosirMod += 4;
        }
        if (combatData.player_one_weapons[0].influences[0] === "Kyr'na") { // Time
            console.log("Kyr'na!")
            let kyrna = 4 * (combatData.player_one_attributes.totalAchre + combatData.player_one_weapons[0].achre);
            combatData.player_one_influence_description = 
                `Kyr'na withers ${combatData.player_two.name}, brittling their Caer for ${kyrna} Damage.`
            combatData.new_player_two_health -= kyrna;
            combatData.current_player_two_health -= kyrna;
            if (combatData.current_player_two_health < 0) {
                combatData.current_player_two_health = 0;
            }
            if (combatData.new_player_two_health < 0) {
                combatData.new_player_two_health = 0;
            }
        }
        if (combatData.player_one_weapons[0].influences[0] === "Lilos") { // Life
            console.log("Lilos!")
            let lilos = 5 * (combatData.player_one_attributes.totalCaeren + combatData.player_one_weapons[0].caeren);
            combatData.player_one_influence_description = 
                `Lilos breathes her Cear into ${combatData.player_one.name}, healing them for ${lilos}.`
            combatData.new_player_one_health += lilos;
            combatData.current_player_one_health += lilos;
        }
        if (combatData.player_one_weapons[0].influences[0] === "Ma'anre") { // Moon
            let maanre = combatData.realized_player_one_damage;
            combatData.new_player_one_health += maanre;
            combatData.current_player_one_health += maanre;
            console.log("Ma'anre!")
            combatData.player_one_influence_description = 
                `Ma'anre wraps her tendrils about ${combatData.player_one.name}'s ${combatData.player_one_weapons[0].name}, changing ${combatData.player_one.name}'s perception of this world, its peculiarity resonating for ${Math.round(maanre)}.` 
            combatData.player_one_weapons[0].roll += 2;
            combatData.player_one_weapons[0].dodge -= 2;
            combatData.player_one_weapons[0].critical_chance += 2;
            combatData.player_one_weapons[0].critical_damage += 0.2;
        }
        if (combatData.player_one_weapons[0].influences[0] === "Nyrolus") { // Water
            console.log("Nyrolus!")
            let nyrolus = 2 * (combatData.player_one_attributes.totalCaeren + combatData.player_one_weapons[0].caeren)
            combatData.player_one_influence_description = 
                `${combatData.player_one.name}'s mercurial weapon intrigues Nyrolus, swarming them in their Caer for ${nyrolus}.`
            combatData.player_one_defense.physicalDefenseModifier += 2;
            combatData.player_one_defense.magicalDefenseModifier += 2;
            combatData.player_one_defense.physicalPosture += 2;
            combatData.player_one_defense.magicalPosture += 2;
            combatData.new_player_one_health += nyrolus
            combatData.current_player_one_health += nyrolus
        }
        if (combatData.player_one_weapons[0].influences[0] === "Quor'ei") { // Earth
            console.log("Quor'ei!")
            let quorei = 2 * (combatData.player_one_attributes.totalAchre + combatData.player_one_weapons[0].achre)
            combatData.player_one_influence_description = 
                `${combatData.player_one.name}'s resolve beckons with the favor of ${combatData.player_one.name}'s Quor'ei, steeling them in their Caer for ${quorei}.`
            combatData.player_one_defense.physicalDefenseModifier += 2;
            combatData.player_one_defense.magicalDefenseModifier += 2;
            combatData.player_one_defense.physicalPosture += 2;
            combatData.player_one_defense.magicalPosture += 2;
            combatData.new_player_one_health += quorei
            combatData.current_player_one_health += quorei
        }
        if (combatData.player_one_weapons[0].influences[0] === "Rahvre") { // Dreams
            let rahvre = 2 * (combatData.player_one_attributes.totalCaeren + combatData.player_one_weapons[0].caeren)
            combatData.new_player_one_health += rahvre
            combatData.current_player_one_health += rahvre
            console.log("Rahvre!")
            combatData.player_one_influence_description = 
            `${combatData.player_one.name}'s calming Caer reaches its tendrils to Rahvre, intertwining them.`
        combatData.player_one_weapons[0].magical_damage += 5;
        }
        if (combatData.player_one_weapons[0].influences[0] === "Senari") { // Wisdom
            console.log("Senari!")
            combatData.player_one_influence_description = 
                `${combatData.player_one.name}'s calm swirls with the favor of Senari, holding them in her Caer.`
            combatData.player_one_weapons[0].roll += 3;
            combatData.player_one_weapons[0].dodge -= 3;
        }
        if (combatData.player_one_weapons[0].influences[0] === "Se'dyro") { // Iron
            let sedyro = 2 * (combatData.player_one_attributes.totalAgility + combatData.player_one_weapons[0].agility)
            combatData.new_player_one_health += sedyro
            combatData.current_player_one_health += sedyro
            console.log("Se'dyro!")
            combatData.player_one_influence_description = 
                `The Caer of Se'dyro sings into ${combatData.player_one.name}'s ${combatData.player_one_weapons[0].name}, causing it to frenzy for ${Math.round(combatData.realized_player_one_damage)} more damage!`    
            player_one_action = 'attack';
            if (combatData.realized_player_one_damage < 0) {
                combatData.realized_player_one_damage = 0;
            }
            combatData.new_player_two_health = combatData.current_player_two_health - combatData.realized_player_one_damage;
            combatData.current_player_two_health = combatData.new_player_two_health; // Added to persist health totals?

            if (combatData.new_player_two_health <= 0 || combatData.current_player_two_health <= 0) {
                combatData.new_player_two_health = 0;
                combatData.player_one_win = true;
            }
        }
        if (combatData.player_one_weapons[0].influences[0] === "Se'vas") { // War
            let sevas = 2 * (combatData.player_one_attributes.totalStrength + combatData.player_one_weapons[0].strength)
            combatData.new_player_one_health += sevas
            combatData.current_player_one_health += sevas
            console.log("Se'vas!")
            combatData.player_one_influence_description = 
                `The Caer of Se'vas scorns ${combatData.player_one.name}'s ${combatData.player_one_weapons[0].name}, scarring it with the beauty of war.` 
            combatData.player_one_weapons[0].critical_chance += 3;
            combatData.player_one_weapons[0].critical_damage += 0.3;
        }
        if (combatData.player_one_weapons[0].influences[0] === "Shrygei") { // Song
            let shrygei = combatData.player_one_attributes.totalAchre + combatData.player_one_weapons[0].achre + combatData.player_one_attributes.totalCaeren + combatData.player_one_weapons[0].caeren + combatData.player_one_attributes.totalConstitution;
            combatData.player_one_influence_description =
                `The Song of Shry'gei shrieks itself through ${combatData.player_one.name}'s ${combatData.player_one_weapons[0].name}, the resplendence renews them for ${shrygei}`
            combatData.player_one_weapons[0].magical_penetration += 2
            combatData.player_one_weapons[0].physical_penetration += 2
            combatData.new_player_one_health += shrygei
            combatData.current_player_one_health += shrygei
        }
        if (combatData.player_one_weapons[0].influences[0] === "Tshaer") { // Animal
            let tshaer = 2 * (combatData.player_one_attributes.totalStrength + combatData.player_one_weapons[0].strength)
            combatData.new_player_one_health += tshaer
            combatData.current_player_one_health += tshaer
            console.log("Tshaer!")
            combatData.player_one_influence_description = 
                `${combatData.player_one.name}'s fervor unleashes the bestial nature of Tshaer within them.`
            combatData.player_one_weapons[0].physical_damage += 5;
        }
    }
    if (combatData.player_one_dual_wielding === true) {
        if (player_one_faith_number_two > 85) {
            combatData.player_one_religious_success = true;
            if (combatData.player_one_weapons[1].influences[0] === 'Daethos') { // God
                console.log("Daethos!")
                let daethos = (combatData.player_one_attributes.totalAchre + combatData.player_one_weapons[1].achre + combatData.player_one_attributes.totalCaeren + combatData.player_one_weapons[1].caeren);
                daethos = Math.round(daethos / 2);
                combatData.new_player_one_health += combatData.realized_player_one_damage;
                combatData.current_player_one_health += combatData.realized_player_one_damage;
                combatData.player_one_influence_description_two = 
                    `Daethos wraps through ${combatData.player_one.name}'s Caer, ${combatData.player_one_weapons[1].name} healing them for ${Math.round(combatData.realized_player_one_damage)}. A faint echo of Caeren lingers for ${daethos} Righteously Spooky Damage.`    
                combatData.new_player_one_health += daethos;
                combatData.new_player_two_health -= daethos;
                combatData.current_player_one_health += daethos;
                combatData.current_player_two_health -= daethos;
                if (combatData.current_player_two_health < 0) {
                    combatData.current_player_two_health = 0;
                }
                if (combatData.new_player_two_health < 0) {
                    combatData.new_player_two_health = 0;
                }
            }
            if (combatData.player_one_weapons[1].influences[0] === 'Achreo') { // Wild
                console.log("Achreo!")
                let achreo = 2 * (combatData.player_one_attributes.totalAchre + combatData.player_one_weapons[1].achre)
                combatData.new_player_one_health += achreo
                combatData.current_player_one_health += achreo
                combatData.player_one_influence_description_two = 
                    `${combatData.player_one.name}'s Caer stirs Achreo, to his own surprise and soft as whispers he grants renewal of ${achreo}.`
                combatData.player_one_weapons[1].physical_damage += 2;
                combatData.player_one_weapons[1].magical_damage += 2;
                combatData.player_one_weapons[1].critical_chance += 2;
                combatData.player_one_weapons[1].critical_damage += 0.2;
            }
            if (combatData.player_one_weapons[1].influences[0] === "Ahn've") { // Wind
                let ahnve = 2 * (combatData.player_one_attributes.totalCaeren + combatData.player_one_weapons[1].caeren)
                combatData.new_player_one_health += ahnve
                combatData.current_player_one_health += ahnve
                console.log("Ahn've!")
                combatData.player_one_influence_description_two = 
                    `${combatData.player_one.name}'s Caer ushers forth Ahn've, a devastating storm posseses them to attack ${combatData.player_two.name} for ${Math.round(combatData.realized_player_one_damage)} more damage.`
                player_one_action = 'attack';
                // await attackCompiler(combatData, player_one_action)
                if (combatData.realized_player_one_damage < 0) {
                    combatData.realized_player_one_damage = 0;
                }
                combatData.new_player_two_health = combatData.current_player_two_health - combatData.realized_player_one_damage;
                combatData.current_player_two_health = combatData.new_player_two_health; // Added to persist health totals?

                if (combatData.new_player_two_health <= 0 || combatData.current_player_two_health <= 0) {
                    combatData.new_player_two_health = 0;
                    combatData.player_one_win = true;
                }
            }
            if (combatData.player_one_weapons[1].influences[0] === 'Astra') { // Lightning
                let astra = 2 * (combatData.player_one_attributes.totalAchre + combatData.player_one_weapons[1].achre)
                combatData.new_player_one_health += astra;
                combatData.current_player_one_health += astra;
                combatData.player_one_influence_description_two = 
                    `${combatData.player_one.name}'s Caer ushers forth the favor of Astra's Lightning, quickening them.`
                combatData.player_one_weapons[1].critical_chance += 4;
                combatData.player_one_weapons[1].roll += 2;
                combatData.player_one_weapons[1].critical_damage += 0.1;
            }
            if (combatData.player_one_weapons[1].influences[0] === 'Cambire') { // Potential
                combatData.player_one_influence_description_two = 
                    `${combatData.player_one.name}'s Caer ushers forth the Chance of Cambire, warping back to attack ${combatData.player_two.name} for ${Math.round(combatData.realized_player_one_damage)} more damage.`
                player_one_action = 'attack';
                // await attackCompiler(combatData, player_one_action)
                if (combatData.realized_player_one_damage < 0) {
                    combatData.realized_player_one_damage = 0;
                }
                combatData.new_player_two_health = combatData.current_player_two_health - combatData.realized_player_one_damage;
                combatData.current_player_two_health = combatData.new_player_two_health; // Added to persist health totals?

                if (combatData.new_player_two_health <= 0 || combatData.current_player_two_health <= 0) {
                    combatData.new_player_two_health = 0;
                    combatData.player_one_win = true;
                }
            }
            if (combatData.player_one_weapons[1].influences[0] === 'Chiomyr') { // Humor
                let chiomyr = 2 * (combatData.player_one_attributes.totalKyosir + combatData.player_one_weapons[1].kyosir);
                combatData.new_player_one_health += chiomyr;
                combatData.current_player_one_health += chiomyr;
                combatData.player_one_weapons[1].physical_penetration += 3;
                combatData.player_one_weapons[1].magical_penetration += 3;
            }
            if (combatData.player_one_weapons[1].influences[0] === 'Fyer') { // Fire
                let fyer = 2 * (combatData.player_one_attributes.totalCaeren + combatData.player_one_weapons[1].caeren)
                combatData.new_player_one_health += fyer;
                combatData.current_player_one_health += fyer;
                combatData.player_one_influence_description_two = 
                    `${combatData.player_one.name}'s Caer ushers forth the favor of Fyer igniting through them.`
                combatData.player_one_weapons[1].critical_damage += 0.9;
                combatData.player_one_weapons[1].critical_chance += 1;
            }
            if (combatData.player_one_weapons[1].influences[0] === 'Ilios') { // Sun
                let ilios = combatData.realized_player_one_damage;
                combatData.new_player_one_health += ilios;
                combatData.current_player_one_health += ilios;
                combatData.player_one_influence_description_two = 
                    `The Hush of Ilios bursts into them through ${combatData.player_one.name}'s ${combatData.player_one_weapons[1].name}, his brilliance radiating for ${Math.round(ilios)}.`
                player_one_action = 'attack';   
                combatData.player_one_weapons[1].magical_penetration += 2;
                combatData.player_one_weapons[1].physical_penetration += 2;
                combatData.player_one_defense.physicalDefenseModifier += 1;
                combatData.player_one_defense.magicalDefenseModifier += 1;
                combatData.player_one_defense.physicalPosture += 1;
                combatData.player_one_defense.magicalPosture += 1;
            }
            if (combatData.player_one_weapons[1].influences[0] === "Kyn'gi") { // Hunt
                let kyngi = 2 * (combatData.player_one_attributes.totalAgility + combatData.player_one_weapons[1].agility)
                combatData.new_player_one_health += kyngi;
                combatData.current_player_one_health += kyngi;
                combatData.player_one_influence_description_two = 
                    `${combatData.player_one.name}'s keen Caer shrieks into Kyn'gi, emboldening the Hunt.`
                combatData.player_one_weapons[1].roll += 3;
                combatData.player_one_weapons[1].critical_chance += 3;
            }
            if (combatData.player_one_weapons[1].influences[0] === "Kyrisos") { // Gold
                let kyrisos = 2 * (combatData.player_one_attributes.totalKyosir + combatData.player_one_weapons[1].kyosir)
                combatData.new_player_one_health += kyrisos;
                combatData.current_player_one_health += kyrisos;
                combatData.player_one_influence_description_two = 
                    `The Caer of Kyrisos imbues them with Kyosir!`
                combatData.player_one_attributes.kyosirMod += 4;
            }
            if (combatData.player_one_weapons[1].influences[0] === "Kyr'na") { // Time
                let kyrna = 4 * (combatData.player_one_attributes.totalAchre + combatData.player_one_weapons[1].achre);
                combatData.player_one_influence_description_two = 
                    `Kyr'na withers ${combatData.player_two.name}, brittling their Caer for ${kyrna} Damage.`
                combatData.new_player_two_health -= kyrna;
                combatData.current_player_two_health -= kyrna;
                if (combatData.current_player_two_health < 0) {
                    combatData.current_player_two_health = 0;
                }
                if (combatData.new_player_two_health < 0) {
                    combatData.new_player_two_health = 0;
                }
            }
            if (combatData.player_one_weapons[1].influences[0] === "Lilos") { // Life
                let lilos = 5 * (combatData.player_one_attributes.totalCaeren + combatData.player_one_weapons[1].caeren);
                combatData.player_one_influence_description_two = 
                    `Lilos breathes her Caer into ${combatData.player_one.name}, healing them for ${lilos}.`
                combatData.new_player_one_health += lilos;
                combatData.current_player_one_health += lilos;
            }
            if (combatData.player_one_weapons[1].influences[0] === "Ma'anre") { // Moon
                let maanre = combatData.realized_player_one_damage;
                combatData.new_player_one_health += maanre;
                combatData.current_player_one_health += maanre;
                combatData.player_one_influence_description_two = 
                    `Ma'anre wraps her tendrils about ${combatData.player_one.name}'s ${combatData.player_one_weapons[1].name}, changing ${combatData.player_one.name}'s perception of this world, its peculiarity resonating for ${Math.round(maanre)}.` 
                combatData.player_one_weapons[1].roll += 2;
                combatData.player_one_weapons[1].dodge -= 2;
                combatData.player_one_weapons[1].critical_chance += 2;
                combatData.player_one_weapons[1].critical_damage += 0.2;
            }
            if (combatData.player_one_weapons[1].influences[0] === "Nyrolus") { // Water
                let nyrolus = 2 * (combatData.player_one_attributes.totalCaeren + combatData.player_one_weapons[1].caeren)
                combatData.player_one_influence_description_two = 
                    `${combatData.player_one.name}'s mercurial weapon intrigues Nyrolus, swarming them in their Caer for ${nyrolus}.`
                combatData.player_one_defense.physicalDefenseModifier += 2;
                combatData.player_one_defense.magicalDefenseModifier += 2;
                combatData.player_one_defense.physicalPosture += 2;
                combatData.player_one_defense.magicalPosture += 2;
                combatData.new_player_one_health += nyrolus
                combatData.current_player_one_health += nyrolus
            }
            if (combatData.player_one_weapons[1].influences[0] === "Quor'ei") { // Earth
                let quorei = 2 * (combatData.player_one_attributes.totalAchre + combatData.player_one_weapons[1].achre)
                combatData.player_one_influence_description_two = 
                    `${combatData.player_one.name}'s resolve beckons with the favor of ${combatData.player_one.name}'s Quor'ei, steeling them in their Caer for ${quorei}.`
                combatData.player_one_defense.physicalDefenseModifier += 2;
                combatData.player_one_defense.magicalDefenseModifier += 2;
                combatData.player_one_defense.physicalPosture += 2;
                combatData.player_one_defense.magicalPosture += 2;
                combatData.new_player_one_health += quorei
                combatData.current_player_one_health += quorei
            }
            if (combatData.player_one_weapons[1].influences[0] === "Rahvre") { // Dreams
                let rahvre = 2 * (combatData.player_one_attributes.totalCaeren + combatData.player_one_weapons[1].caeren)
                combatData.new_player_one_health += rahvre
                combatData.current_player_one_health += rahvre
                combatData.player_one_influence_description_two = 
                `${combatData.player_one.name}'s calming Caer reaches its tendrils to Rahvre, intertwining them.`
                combatData.player_one_weapons[1].magical_damage += 5;   
            }
            if (combatData.player_one_weapons[1].influences[0] === "Senari") { // Wisdom
                combatData.player_one_influence_description_two = 
                    `${combatData.player_one.name}'s calm swirls with the favor of Senari, holding them in her Caer.`
                combatData.player_one_weapons[1].roll += 3;
                combatData.player_one_weapons[1].dodge -= 3;
            }
            if (combatData.player_one_weapons[1].influences[0] === "Se'dyro") { // Iron
                let sedyro = 2 * (combatData.player_one_attributes.totalAgility + combatData.player_one_weapons[1].agility)
                combatData.new_player_one_health += sedyro
                combatData.current_player_one_health += sedyro
                combatData.player_one_influence_description_two = 
                    `The Caer of Se'dyro sings into ${combatData.player_one.name}'s ${combatData.player_one_weapons[1].name}, causing it to frenzy for ${Math.round(combatData.realized_player_one_damage)} more damage!`    
                player_one_action = 'attack';
                // await attackCompiler(combatData, player_one_action)
                if (combatData.realized_player_one_damage < 0) {
                    combatData.realized_player_one_damage = 0;
                }
                combatData.new_player_two_health = combatData.current_player_two_health - combatData.realized_player_one_damage;
                combatData.current_player_two_health = combatData.new_player_two_health; // Added to persist health totals?

                if (combatData.new_player_two_health <= 0 || combatData.current_player_two_health <= 0) {
                    combatData.new_player_two_health = 0;
                    combatData.player_one_win = true;
                }
            }
            if (combatData.player_one_weapons[1].influences[0] === "Se'vas") { // War
                let sevas = 2 * (combatData.player_one_attributes.totalStrength + combatData.player_one_weapons[1].strength)
                combatData.new_player_one_health += sevas
                combatData.current_player_one_health += sevas
                combatData.player_one_influence_description_two = 
                    `The Caer of Se'vas scorns ${combatData.player_one.name}'s ${combatData.player_one_weapons[1].name}, scarring it with the beauty of war.` 
                combatData.player_one_weapons[1].critical_chance += 3;
                combatData.player_one_weapons[1].critical_damage += 0.3;
            }
            if (combatData.player_one_weapons[1].influences[0] === "Shrygei") { // Song
                let shrygei = combatData.player_one_attributes.totalAchre + combatData.player_one_weapons[1].achre + combatData.player_one_attributes.totalCaeren + combatData.player_one_weapons[1].caeren + combatData.player_one_attributes.totalConstitution;
                combatData.player_one_influence_description_two =
                `The Song of Shry'gei shrieks itself through ${combatData.player_one.name}'s ${combatData.player_one_weapons[1].name}, the resplendence renews them for ${shrygei}`
                    combatData.player_one_weapons[1].magical_penetration += 2
                    combatData.player_one_weapons[1].physical_penetration += 2
                    combatData.new_player_one_health += shrygei
                    combatData.current_player_one_health += shrygei
                }
            if (combatData.player_one_weapons[1].influences[0] === "Tshaer") { // Animal
                let tshaer = 2 * (combatData.player_one_attributes.totalStrength + combatData.player_one_weapons[1].strength)
                combatData.new_player_one_health += tshaer
                combatData.current_player_one_health += tshaer
                combatData.player_one_influence_description_two = 
                    `${combatData.player_one.name}'s Caer unleashes the bestial nature of Tshaer within them.`
                combatData.player_one_weapons[1].physical_damage += 5;
            }
        }
    }

    if (player_two_faith_number > 85) {
        combatData.player_two_religious_success = true;
        if (combatData.player_two_weapons[0].influences[0] === 'Daethos') { // God
            console.log('Daethos!')
            let daethos = (combatData.player_two_attributes.totalAchre + combatData.player_two_weapons[0].achre + combatData.player_two_attributes.totalCaeren + combatData.player_two_weapons[0].caeren);
            daethos = Math.round(daethos / 2);
            combatData.new_player_two_health += combatData.realized_player_two_damage;
            combatData.current_player_two_health += combatData.realized_player_two_damage;
            combatData.player_two_influence_description = 
                `Daethos wraps through ${combatData.player_two.name}'s Caer, ${combatData.player_two_weapons[0].name} healing them for ${Math.round(combatData.realized_player_two_damage)}. A faint echo of Caeren lingers for ${daethos} Righteously Spooky Damage.`    
            combatData.new_player_two_health += daethos;
            combatData.new_player_one_health -= daethos;
            combatData.current_player_two_health += daethos;
            combatData.current_player_one_health -= daethos;
            if (combatData.current_player_one_health < 0) {
                combatData.current_player_one_health = 0;
            }
            if (combatData.new_player_one_health < 0) {
                combatData.new_player_one_health = 0;
            }
    }
        if (combatData.player_two_weapons[0].influences[0] === 'Achreo') { // Wild
            console.log('Achreo!')
            // combatData.player_two_weapons[0].critical_chance = Number(combatData.player_two_weapons[0].critical_chance + 1);
            let achreo = 2 * (combatData.player_two_attributes.totalAchre + combatData.player_two_weapons[0].achre)
            combatData.new_player_two_health += achreo
            combatData.current_player_two_health += achreo
            combatData.player_two_influence_description = 
                `${combatData.player_two.name}'s Caer stirs Achreo, much to his own surprise.`
            combatData.player_two_weapons[0].physical_damage += 2;
            combatData.player_two_weapons[0].magical_damage += 2;
            combatData.player_two_weapons[0].critical_chance += 2;
            combatData.player_two_weapons[0].critical_damage += 0.2;
        }
        if (combatData.player_two_weapons[0].influences[0] === "Ahn've") { // Wind
            let ahnve = 2 * (combatData.player_two_attributes.totalCaeren + combatData.player_two_weapons[0].caeren)
            combatData.new_player_two_health += ahnve
            combatData.current_player_two_health += ahnve
            console.log("Achreo!")
            combatData.player_two_influence_description = 
                `${combatData.player_two.name}'s Caer ushers forth Ahn've, a devastating storm posseses them for ${Math.round(combatData.realized_player_two_damage)} more damage.`
            player_one_action = 'attack';
            // await attackCompiler(combatData, player_one_action)
            if (combatData.realized_player_two_damage < 0) {
                    combatData.realized_player_two_damage = 0;
                }
                combatData.new_player_one_health = combatData.current_player_one_health - combatData.realized_player_two_damage;
                combatData.current_player_one_health = combatData.new_player_one_health; // Added to persist health totals?

                if (combatData.new_player_one_health < 0 || combatData.current_player_one_health <= 0) {
                    combatData.new_player_one_health = 0;
                    combatData.player_two_win = true;
                }
        }
        if (combatData.player_two_weapons[0].influences[0] === 'Astra') { // Lightning
            let astra = 2 * (combatData.player_two_attributes.totalAchre + combatData.player_two_weapons[0].achre)
            combatData.new_player_two_health += astra;
            combatData.current_player_two_health += astra;
            console.log("Astra!")
            combatData.player_two_influence_description = 
                `${combatData.player_two.name}'s Caer ushers forth the favor of Astra's Lightning, quickening them.`
            combatData.player_two_weapons[0].critical_chance += 4;
            combatData.player_two_weapons[0].roll += 2;
            combatData.player_two_weapons[0].critical_damage += 0.1;
        }
        if (combatData.player_two_weapons[0].influences[0] === 'Cambire') { // Potential
            console.log("Cambire!")
            combatData.player_two_influence_description = 
                `${combatData.player_two.name}'s Caer ushers forth the Chance of Cambire, warping back to damage ${combatData.player_one.name} for ${Math.round(combatData.realized_player_two_damage)}.`
            player_one_action = 'attack';
            // await attackCompiler(combatData, player_one_action)
            if (combatData.realized_player_two_damage < 0) {
                    combatData.realized_player_two_damage = 0;
                }
                combatData.new_player_one_health = combatData.current_player_one_health - combatData.realized_player_two_damage;
                combatData.current_player_one_health = combatData.new_player_one_health; // Added to persist health totals?

                if (combatData.new_player_one_health < 0 || combatData.current_player_one_health <= 0) {
                    combatData.new_player_one_health = 0;
                    combatData.player_two_win = true;
                }    
        }
        if (combatData.player_two_weapons[0].influences[0] === 'Chiomyr') { // Humor
            let chiomyr = 2 * (combatData.player_two_attributes.totalKyosir + combatData.player_two_weapons[0].kyosir);
            combatData.new_player_two_health += chiomyr;
            combatData.current_player_two_health += chiomyr;
            console.log("Chiomyr!")
            combatData.player_two_weapons[0].physical_penetration += 3;
            combatData.player_two_weapons[0].magical_penetration += 3;
        }
        if (combatData.player_two_weapons[0].influences[0] === 'Fyer') { // Fire
            let fyer = 2 * (combatData.player_two_attributes.totalCaeren + combatData.player_two_weapons[0].caeren)
            combatData.new_player_two_health += fyer;
            combatData.current_player_two_health += fyer;
            console.log("Fyer!")
            combatData.player_two_influence_description = 
                `${combatData.player_two.name}'s Caer ushers forth the favor of Fyer igniting through them.`
            combatData.player_two_weapons[0].critical_damage += 0.9;
        }
        if (combatData.player_two_weapons[0].influences[0] === 'Ilios') { // Sun
            let ilios = combatData.realized_player_two_damage;
            combatData.new_player_two_health += ilios;
            combatData.current_player_two_health += ilios;
            console.log("Ilios!")
            combatData.player_two_influence_description = 
                `The Hush of Ilios bursts into ${combatData.player_two.name} through their ${combatData.player_two_weapons[0].name}, his brilliance radiating for ${Math.round(ilios)}.`
            player_one_action = 'attack';   
            combatData.player_two_weapons[0].magical_penetration += 2;
            combatData.player_two_weapons[0].physical_penetration += 2;
            combatData.player_two_defense.physicalDefenseModifier += 1;
            combatData.player_two_defense.magicalDefenseModifier += 1;
            combatData.player_two_defense.physicalPosture += 1;
            combatData.player_two_defense.magicalPosture += 1;
        }
        if (combatData.player_two_weapons[0].influences[0] === "Kyn'gi") { // Hunt
            let kyngi = 2 * (combatData.player_two_attributes.totalAgility + combatData.player_two_weapons[0].agility)
            combatData.new_player_two_health += kyngi;
            combatData.current_player_two_health += kyngi;
            console.log("Kyn'gi!")
            combatData.player_two_influence_description = 
                `${combatData.player_two.name}'s keening Caer shrieks into Kyn'gi, emboldening the Hunt.`
            combatData.player_two_weapons[0].roll += 3;
            combatData.player_two_weapons[0].critical_chance += 3;
        }
        if (combatData.player_two_weapons[0].influences[0] === "Kyrisos") { // Gold
            let kyrisos = 2 * (combatData.player_two_attributes.totalKyosir + combatData.player_two_weapons[0].kyosir)
            combatData.new_player_two_health += kyrisos;
            combatData.current_player_two_health += kyrisos;
            console.log("Kyrisos!")
            combatData.player_two_influence_description = 
                `The Caer of Kyrisos imbues ${combatData.player_two.name}'s with Kyosir!`
            combatData.player_two_attributes.kyosirMod += 3;
        }
        if (combatData.player_two_weapons[0].influences[0] === "Kyr'na") { // Time
            console.log("Kyr'na!")
            let kyrna = 4 * (combatData.player_two_attributes.totalAchre + combatData.player_two_weapons[0].achre);
            combatData.player_two_influence_description = 
                `Kyr'na withers you, brittling your Caer for ${kyrna} Damage.`
            combatData.new_player_one_health -= kyrna;
            combatData.current_player_one_health -= kyrna;
            if (combatData.current_player_one_health < 0) {
                combatData.current_player_one_health = 0;
            }
            if (combatData.new_player_one_health < 0) {
                combatData.new_player_one_health = 0;
            }
        }
        if (combatData.player_two_weapons[0].influences[0] === "Lilos") { // Life
            console.log("Lilos!")
            let lilos = 5 * (combatData.player_two_attributes.totalCaeren + combatData.player_two_weapons[0].caeren);
            combatData.player_two_influence_description = 
                `Lilos breathes her Cear into ${combatData.player_two.name}, healing ${combatData.player_two.name} for ${lilos}.`
            combatData.new_player_two_health += lilos;
            combatData.current_player_two_health += lilos;
        }
        if (combatData.player_two_weapons[0].influences[0] === "Ma'anre") { // Moon
            let maanre = combatData.realized_player_two_damage;
            combatData.new_player_two_health += maanre;
            combatData.current_player_two_health += maanre;
            console.log("Ma'anre!")
            combatData.player_two_influence_description = 
                `Ma'anre wraps her tendrils about ${combatData.player_two.name}'s ${combatData.player_two_weapons[0].name}, changing their perception of this world, its peculiarity resonating for ${Math.round(maanre)}.` 
            combatData.player_two_weapons[0].roll += 2;
            combatData.player_two_weapons[0].dodge -= 2;
            combatData.player_two_weapons[0].critical_chance += 2;
            combatData.player_two_weapons[0].critical_damage += 0.2;
        }
        if (combatData.player_two_weapons[0].influences[0] === "Nyrolus") { // Water
            console.log("Nyrolus!")
            let nyrolus = (2 * (combatData.player_two_attributes.totalCaeren + combatData.player_two_weapons[0].caeren))
            combatData.player_two_influence_description = 
                `${combatData.player_two.name}'s mercurial weapon intrigues Nyrolus, swarming them in their Caer for ${nyrolus}.`
            combatData.player_two_defense.physicalDefenseModifier += 2;
            combatData.player_two_defense.magicalDefenseModifier += 2;
            combatData.player_two_defense.physicalPosture += 2;
            combatData.player_two_defense.magicalPosture += 2;
            combatData.new_player_two_health += nyrolus
        }
        if (combatData.player_two_weapons[0].influences[0] === "Quor'ei") { // Earth
            console.log("Quor'ei!")
            let quorei = 2 * (combatData.player_two_attributes.totalAchre + combatData.player_two_weapons[0].achre)
            combatData.player_two_influence_description = 
                `${combatData.player_two.name}'s resolve beckons with the favor of your Quor'ei, steeling them in their Caer for ${quorei}.`
            combatData.player_two_defense.physicalDefenseModifier += 2;
            combatData.player_two_defense.magicalDefenseModifier += 2;
            combatData.player_two_defense.physicalPosture += 2;
            combatData.player_two_defense.magicalPosture += 2;
            combatData.new_player_two_health += quorei     }
        if (combatData.player_two_weapons[0].influences[0] === "Rahvre") { // Dreams
            let rahvre = 2 * (combatData.player_two_attributes.totalCaeren + combatData.player_two_weapons[0].caeren)
            combatData.new_player_two_health += rahvre
            combatData.current_player_two_health += rahvre
            console.log("Rahvre!")
            combatData.player_two_influence_description = 
            `${combatData.player_two.name}'s calming Caer reaches its tendrils to Rahvre, intertwining them.`
        combatData.player_two_weapons[0].magical_damage += 5;
        }
        if (combatData.player_two_weapons[0].influences[0] === "Senari") { // Wisdom
            console.log("Senari!")
            combatData.player_two_influence_description = 
                `${combatData.player_two.name}'s calm swirls with the favor of Senari, holding them in her Caer.`
            combatData.player_two_weapons[0].roll += 3;
            combatData.player_two_weapons[0].dodge -= 3;
        }
        if (combatData.player_two_weapons[0].influences[0] === "Se'dyro") { // Iron
            let sedyro = 2 * (combatData.player_two_attributes.totalAgility + combatData.player_two_weapons[0].agility)
            combatData.new_player_two_health += sedyro
            combatData.current_player_two_health += sedyro
            console.log("Se'dyro!")
            combatData.player_two_influence_description = 
                `The Caer of Se'dyro sings into their ${combatData.player_two_weapons[0].name}, causing it to frenzy for ${Math.round(combatData.realized_player_two_damage)} more damage!`    
            player_one_action = 'attack';
            // await attackCompiler(combatData, player_one_action)
            if (combatData.realized_player_two_damage < 0) {
                    combatData.realized_player_two_damage = 0;
                }
                combatData.new_player_one_health = combatData.current_player_one_health - combatData.realized_player_two_damage;
                combatData.current_player_one_health = combatData.new_player_one_health; // Added to persist health totals?

                if (combatData.new_player_one_health < 0 || combatData.current_player_one_health <= 0) {
                    combatData.new_player_one_health = 0;
                    combatData.player_two_win = true;
                }
        }
        if (combatData.player_two_weapons[0].influences[0] === "Se'vas") { // War
            let sevas = 2 * (combatData.player_two_attributes.totalStrength + combatData.player_two_weapons[0].strength)
            combatData.new_player_two_health += sevas
            combatData.current_player_two_health += sevas
            console.log("Se'vas!")
            combatData.player_two_influence_description = 
                `The Caer of Se'vas scorns their ${combatData.player_two_weapons[0].name}, scarring it with the beauty of war.` 
            combatData.player_two_weapons[0].critical_chance += 3;
            combatData.player_two_weapons[0].critical_damage += 0.3;
        }
        if (combatData.player_two_weapons[0].influences[0] === "Shrygei") { // Song
            let shrygei = combatData.player_two_attributes.totalAchre + combatData.player_two_weapons[0].achre + combatData.player_two_attributes.totalCaeren + combatData.player_two_weapons[0].caeren + combatData.player_two_attributes.totalConstitution;
            combatData.player_two_influence_description =
            `The Song of Shry'gei shrieks itself through ${combatData.player_two.name}'s ${combatData.player_two_weapons[0].name}, the resplendence renews them for ${shrygei}`
                combatData.player_two_weapons[0].magical_penetration += 2
                combatData.player_two_weapons[0].physical_penetration += 2
                combatData.new_player_two_health += shrygei
                combatData.current_player_two_health += shrygei
        }
        if (combatData.player_two_weapons[0].influences[0] === "Tshaer") { // Animal
            let tshaer = 2 * (combatData.player_two_attributes.totalStrength + combatData.player_two_weapons[0].strength)
            combatData.new_player_two_health += tshaer
            combatData.current_player_two_health += tshaer
            console.log("Tshaer!")
            combatData.player_two_influence_description = 
                `${combatData.player_two.name}'s fervor unleashes the bestial nature of Tshaer within them.`
            combatData.player_two_weapons[0].physical_damage += 5;
        }
    }
    if (combatData.player_two_dual_wielding === true) {
        if (player_two_faith_number_two > 85) {
            combatData.player_two_religious_success = true;
            if (combatData.player_two_weapons[1].influences[0] === 'Daethos') { // God
                console.log("Daethos!")
                let daethos = (combatData.player_two_attributes.totalAchre + combatData.player_two_weapons[1].achre + combatData.player_two_attributes.totalCaeren + combatData.player_two_weapons[1].caeren);
                daethos = Math.round(daethos / 2);
                combatData.new_player_two_health += combatData.realized_player_two_damage;
                combatData.current_player_two_health += combatData.realized_player_two_damage;
                combatData.player_two_influence_description_two = 
                    `Daethos wraps through ${combatData.player_two.name}'s Caer, ${combatData.player_two_weapons[1].name} healing them for ${Math.round(combatData.realized_player_two_damage)}. A faint echo of Caeren lingers for ${daethos} Righteously Spooky Damage.`    
                    combatData.new_player_two_health += daethos;
                    combatData.new_player_one_health -= daethos;
                    combatData.current_player_two_health += daethos;
                    combatData.current_player_one_health -= daethos;
                    if (combatData.current_player_one_health < 0) {
                        combatData.current_player_one_health = 0;
                    }
                    if (combatData.new_player_one_health < 0) {
                        combatData.new_player_one_health = 0;
                    }
            }
            if (combatData.player_two_weapons[1].influences[0] === 'Achreo') { // Wild
                console.log("Achreo!")
                let achreo = 2 * (combatData.player_two_attributes.totalAchre + combatData.player_two_weapons[1].achre)
                combatData.new_player_two_health += achreo
                combatData.current_player_two_health += achreo
                combatData.player_two_influence_description_two = 
                    `${combatData.player_two.name}'s Caer stirs Achreo, much to his own surprise.`
                combatData.player_two_weapons[1].physical_damage += 2;
                combatData.player_two_weapons[1].magical_damage += 2;
                combatData.player_two_weapons[1].critical_chance += 2;
                combatData.player_two_weapons[1].critical_damage += 0.2;
            }
            if (combatData.player_two_weapons[1].influences[0] === "Ahn've") { // Wind
                let ahnve = 2 * (combatData.player_two_attributes.totalCaeren + combatData.player_two_weapons[1].caeren)
                combatData.new_player_two_health += ahnve
                combatData.current_player_two_health += ahnve
                console.log("Ahn've!")
                combatData.player_two_influence_description_two = 
                    `${combatData.player_two.name}'s Caer ushers forth Ahn've, a devastating storm posseses them for ${Math.round(combatData.realized_player_two_damage)} more damage.`
                player_one_action = 'attack';
                // await attackCompiler(combatData, player_one_action)
                if (combatData.realized_player_two_damage < 0) {
                    combatData.realized_player_two_damage = 0;
                }
                combatData.new_player_one_health = combatData.current_player_one_health - combatData.realized_player_two_damage;
                combatData.current_player_one_health = combatData.new_player_one_health; // Added to persist health totals?

                if (combatData.new_player_one_health < 0 || combatData.current_player_one_health <= 0) {
                    combatData.new_player_one_health = 0;
                    combatData.player_two_win = true;
                }
            }
            if (combatData.player_two_weapons[1].influences[0] === 'Astra') { // Lightning
                let astra = 2 * (combatData.player_two_attributes.totalAchre + combatData.player_two_weapons[1].achre)
                combatData.new_player_two_health += astra;
                combatData.current_player_two_health += astra;
                combatData.player_two_influence_description_two = 
                    `${combatData.player_two.name}'s Caer ushers forth the favor of Astra's Lightning, quickening them.`
                combatData.player_two_weapons[1].critical_chance += 4;
                combatData.player_two_weapons[1].roll += 2;
                combatData.player_two_weapons[1].critical_damage += 0.1;
            }
            if (combatData.player_two_weapons[1].influences[0] === 'Cambire') { // Potential
                combatData.player_two_influence_description_two = 
                    `${combatData.player_two.name}'s Caer ushers forth the Chance of Cambire, warping back to damage ${combatData.player_one.name} for ${Math.round(combatData.realized_player_two_damage)}.`
                player_one_action = 'attack';
                // await attackCompiler(combatData, player_one_action)
                if (combatData.realized_player_two_damage < 0) {
                    combatData.realized_player_two_damage = 0;
                }
                combatData.new_player_one_health = combatData.current_player_one_health - combatData.realized_player_two_damage;
                combatData.current_player_one_health = combatData.new_player_one_health; // Added to persist health totals?

                if (combatData.new_player_one_health < 0 || combatData.current_player_one_health <= 0) {
                    combatData.new_player_one_health = 0;
                    combatData.player_two_win = true;
                }    
            }
            if (combatData.player_two_weapons[1].influences[0] === 'Chiomyr') { // Humor
                let chiomyr = 2 * (combatData.player_two_attributes.totalKyosir + combatData.player_two_weapons[1].kyosir);
                combatData.new_player_two_health += chiomyr;
                combatData.current_player_two_health += chiomyr;
                combatData.player_two_weapons[1].physical_penetration += 3;
                combatData.player_two_weapons[1].magical_penetration += 3;
            }
            if (combatData.player_two_weapons[1].influences[0] === 'Fyer') { // Fire
                let fyer = 2 * (combatData.player_two_attributes.totalCaeren + combatData.player_two_weapons[1].caeren)
                combatData.new_player_two_health += fyer;
                combatData.current_player_two_health += fyer;
                combatData.player_two_influence_description_two = 
                    `${combatData.player_two.name}'s Caer ushers forth the favor of Fyer igniting through them.`
                combatData.player_two_weapons[1].critical_damage += 0.9;
                combatData.player_two_weapons[1].critical_chance += 1;
            }
            if (combatData.player_two_weapons[1].influences[0] === 'Ilios') { // Sun
                let ilios = combatData.realized_player_two_damage;
                combatData.new_player_two_health += ilios;
                combatData.current_player_two_health += ilios;
                combatData.player_two_influence_description_two = 
                    `The Hush of Ilios bursts into ${combatData.player_two.name} through their ${combatData.player_two_weapons[1].name}, his brilliance radiating for ${Math.round(ilios)}.`
                player_one_action = 'attack';   
                combatData.player_two_weapons[1].magical_penetration += 2;
                combatData.player_two_weapons[1].physical_penetration += 2;
                combatData.player_two_defense.physicalDefenseModifier += 1;
                combatData.player_two_defense.magicalDefenseModifier += 1;
                combatData.player_two_defense.physicalPosture += 1;
                combatData.player_two_defense.magicalPosture += 1;
            }
            if (combatData.player_two_weapons[1].influences[0] === "Kyn'gi") { // Hunt
                let kyngi = 2 * (combatData.player_two_attributes.totalAgility + combatData.player_two_weapons[1].agility)
                combatData.new_player_two_health += kyngi;
                combatData.current_player_two_health += kyngi;
                combatData.player_two_influence_description_two = 
                    `${combatData.player_two.name}'s keen Caer shrieks into Kyn'gi, emboldening the Hunt.`
                combatData.player_two_weapons[1].roll += 3;
                combatData.player_two_weapons[1].critical_chance += 3;
            }
            if (combatData.player_two_weapons[1].influences[0] === "Kyrisos") { // Gold
                let kyrisos = 2 * (combatData.player_two_attributes.totalKyosir + combatData.player_two_weapons[1].kyosir)
                combatData.new_player_two_health += kyrisos;
                combatData.current_player_two_health += kyrisos;
                combatData.player_two_influence_description_two = 
                    `The Caer of Kyrisos imbues ${combatData.player_two.name}'s with Kyosir!`
                combatData.player_two_attributes.kyosirMod += 3;
            }
            if (combatData.player_two_weapons[1].influences[0] === "Kyr'na") { // Time
                let kyrna = 4 * (combatData.player_two_attributes.totalAchre + combatData.player_two_weapons[1].achre);
                combatData.player_two_influence_description_two = 
                    `Kyr'na withers you, brittling your Caer for ${kyrna} Damage.`
                combatData.new_player_one_health -= kyrna;
                combatData.current_player_one_health -= kyrna;
                if (combatData.current_player_one_health < 0) {
                    combatData.current_player_one_health = 0;
                }
                if (combatData.new_player_one_health < 0) {
                    combatData.new_player_one_health = 0;
                }
            }
            if (combatData.player_two_weapons[1].influences[0] === "Lilos") { // Life
                let lilos = 5 * (combatData.player_two_attributes.totalCaeren + combatData.player_two_weapons[1].caeren);
                combatData.player_two_influence_description_two = 
                    `Lilos breathes her Caer into ${combatData.player_two.name}, healing them for ${lilos}.`
                combatData.new_player_two_health += lilos;
                combatData.current_player_two_health += lilos;
            }
            if (combatData.player_two_weapons[1].influences[0] === "Ma'anre") { // Moon
                let maanre = combatData.realized_player_two_damage;
                combatData.new_player_two_health += maanre;
                combatData.current_player_two_health += maanre;
                combatData.player_two_influence_description_two = 
                    `Ma'anre wraps her tendrils about ${combatData.player_two.name}'s ${combatData.player_two_weapons[1].name}, changing their perception of this world, its peculiarity resonating for ${Math.round(maanre)}.` 
                combatData.player_two_weapons[1].roll += 2;
                combatData.player_two_weapons[1].dodge -= 2;
                combatData.player_two_weapons[1].critical_chance += 2;
                combatData.player_two_weapons[1].critical_damage += 0.2;
            }
            if (combatData.player_two_weapons[1].influences[0] === "Nyrolus") { // Water
                let nyrolus = (2 * (combatData.player_two_attributes.totalCaeren + combatData.player_two_weapons[1].caeren))
                combatData.player_two_influence_description_two = 
                    `${combatData.player_two.name}'s mercurial weapon intrigues Nyrolus, swarming them in their Caer for ${nyrolus}.`
                combatData.player_two_defense.physicalDefenseModifier += 2;
                combatData.player_two_defense.magicalDefenseModifier += 2;
                combatData.player_two_defense.physicalPosture += 2;
                combatData.player_two_defense.magicalPosture += 2;
                combatData.new_player_two_health += nyrolus
                combatData.current_player_two_health += nyrolus
            }
            if (combatData.player_two_weapons[1].influences[0] === "Quor'ei") { // Earth
                let quorei = 2 * (combatData.player_two_attributes.totalAchre + combatData.player_two_weapons[1].achre)
                combatData.player_two_influence_description_two = 
                    `${combatData.player_two.name}'s resolve beckons with the favor of your Quor'ei, steeling them in their Caer for ${quorei}.`
                combatData.player_two_defense.physicalDefenseModifier += 2;
                combatData.player_two_defense.magicalDefenseModifier += 2;
                combatData.player_two_defense.physicalPosture += 2;
                combatData.player_two_defense.magicalPosture += 2;
                combatData.new_player_two_health += quorei
                combatData.current_player_two_health += quorei
            }
            if (combatData.player_two_weapons[1].influences[0] === "Rahvre") { // Dreams
                let rahvre = 2 * (combatData.player_two_attributes.totalCaeren + combatData.player_two_weapons[1].caeren)
                combatData.new_player_two_health += rahvre
                combatData.current_player_two_health += rahvre
                combatData.player_two_influence_description_two = 
                    `${combatData.player_two.name}'s calming Caer reaches its tendrils to Rahvre, intertwining them.`
                combatData.player_two_weapons[1].magical_damage += 5;
            }
            if (combatData.player_two_weapons[1].influences[0] === "Senari") { // Wisdom
                combatData.player_two_influence_description_two = 
                    `${combatData.player_two.name}'s calm swirls with the favor of Senari, holding them in her Caer.`
                combatData.player_two_weapons[1].roll += 3;
                combatData.player_two_weapons[1].dodge -= 3;
            }
            if (combatData.player_two_weapons[1].influences[0] === "Se'dyro") { // Iron
                let sedyro = 2 * (combatData.player_two_attributes.totalAgility + combatData.player_two_weapons[1].agility)
                combatData.new_player_two_health += sedyro
                combatData.current_player_two_health += sedyro
                combatData.player_two_influence_description_two = 
                    `The Caer of Se'dyro sings into their ${combatData.player_two_weapons[1].name}, causing it to frenzy for ${Math.round(combatData.realized_player_two_damage)} more damage!`    
                player_one_action = 'attack';
                // await attackCompiler(combatData, player_one_action)
                if (combatData.realized_player_two_damage < 0) {
                    combatData.realized_player_two_damage = 0;
                }
                combatData.new_player_one_health = combatData.current_player_one_health - combatData.realized_player_two_damage;
                combatData.current_player_one_health = combatData.new_player_one_health; // Added to persist health totals?

                if (combatData.new_player_one_health < 0 || combatData.current_player_one_health <= 0) {
                    combatData.new_player_one_health = 0;
                    combatData.player_two_win = true;
                }
            }
            if (combatData.player_two_weapons[1].influences[0] === "Se'vas") { // War
                let sevas = 2 * (combatData.player_two_attributes.totalStrength + combatData.player_two_weapons[1].strength)
                combatData.new_player_two_health += sevas
                combatData.current_player_two_health += sevas
                combatData.player_two_influence_description_two = 
                    `The Caer of Se'vas scorns their ${combatData.player_two_weapons[1].name}, scarring it with the beauty of war.` 
                combatData.player_two_weapons[1].critical_chance += 3;
                combatData.player_two_weapons[1].critical_damage += 0.3;
            }
            if (combatData.player_two_weapons[1].influences[0] === "Shrygei") { // Song
                let shrygei = combatData.player_two_attributes.totalAchre + combatData.player_two_weapons[1].achre + combatData.player_two_attributes.totalCaeren + combatData.player_two_weapons[1].caeren + combatData.player_two_attributes.totalConstitution;
                combatData.player_two_influence_description_two =
                `The Song of Shry'gei shrieks itself through ${combatData.player_two.name}'s ${combatData.player_two_weapons[1].name}, the resplendence renews them for ${shrygei}`
                    combatData.player_two_weapons[1].magical_penetration += 2
                    combatData.player_two_weapons[1].physical_penetration += 2
                    combatData.new_player_two_health += shrygei
                    combatData.current_player_two_health += shrygei
            }
            if (combatData.player_two_weapons[1].influences[0] === "Tshaer") { // Animal
                let tshaer = 2 * (combatData.player_two_attributes.totalStrength + combatData.player_two_weapons[1].strength)
                combatData.new_player_two_health += tshaer
                combatData.current_player_two_health += tshaer
                combatData.player_two_influence_description_two = 
                    `${combatData.player_two.name}'s Caer unleashes the bestial nature of Tshaer within them.`
                combatData.player_two_weapons[1].physical_damage += 5;
            }
        }
    }

    combatData.player_one_weapons[0].critical_chance = combatData.player_one_weapons[0].critical_chance.toFixed(2)
    combatData.player_one_weapons[0].critical_damage = combatData.player_one_weapons[0].critical_damage.toFixed(2)
    combatData.player_one_weapons[1].critical_chance = combatData.player_one_weapons[1].critical_chance.toFixed(2)
    combatData.player_one_weapons[1].critical_damage = combatData.player_one_weapons[1].critical_damage.toFixed(2)
    combatData.player_two_weapons[0].critical_chance = combatData.player_two_weapons[0].critical_chance.toFixed(2)
    combatData.player_two_weapons[0].critical_damage = combatData.player_two_weapons[0].critical_damage.toFixed(2)
    combatData.player_two_weapons[1].critical_chance = combatData.player_two_weapons[1].critical_chance.toFixed(2)
    combatData.player_two_weapons[1].critical_damage = combatData.player_two_weapons[1].critical_damage.toFixed(2)

    combatData.player_one_weapons[0].critical_chance = Number(combatData.player_one_weapons[0].critical_chance)
    combatData.player_one_weapons[0].critical_damage = Number(combatData.player_one_weapons[0].critical_damage)
    combatData.player_one_weapons[1].critical_chance = Number(combatData.player_one_weapons[1].critical_chance)
    combatData.player_one_weapons[1].critical_damage = Number(combatData.player_one_weapons[1].critical_damage)
    combatData.player_two_weapons[0].critical_chance = Number(combatData.player_two_weapons[0].critical_chance)
    combatData.player_two_weapons[0].critical_damage = Number(combatData.player_two_weapons[0].critical_damage)
    combatData.player_two_weapons[1].critical_chance = Number(combatData.player_two_weapons[1].critical_chance)
    combatData.player_two_weapons[1].critical_damage = Number(combatData.player_two_weapons[1].critical_damage)

    if (combatData.new_player_one_health > 0) {
        combatData.player_two_win = false;
    }
    if (combatData.new_player_two_health > 0) {
        combatData.player_one_win = false;
    }


    return combatData
}

// ================================= COMPUTER COMPILER FUNCTIONS ================================== \\

const p2DualWieldCompiler = async (combatData, player_physical_defense_multiplier, player_magical_defense_multiplier) => { // Triggers if 40+ Str/Caer for 2h, 1h + Agi/Achre Mastery and 2nd weapon is 1h
    console.log('Computer Dual Wield Firing')
    const player = combatData.player;
    const computer = combatData.player_two;
    const weapons = combatData.player_two_weapons;

    let player_two_weapon_one_physical_damage = weapons[0].physical_damage;
    let player_two_weapon_one_magical_damage = weapons[0].magical_damage;
    let player_two_weapon_two_physical_damage = weapons[1].physical_damage;
    let player_two_weapon_two_magical_damage = weapons[1].magical_damage;
    let player_two_weapon_one_total_damage;
    let player_two_weapon_two_total_damage;
    let firstWeaponCrit = false;
    let secondWeaponCrit = false;
    
    console.log(player_physical_defense_multiplier, player_magical_defense_multiplier, 'Player Defenses in Computer Dual Wield')
    // console.log(weapons, 'Computer Weapons in Dual Wield Compiler')

    // This is for Critical Strikes
    if (weapons[0].critical_chance > Math.floor(Math.random() * 101)) {
        // console.log('Comp DW1 Critical Firing', player_two_weapon_one_physical_damage, player_two_weapon_one_magical_damage)
        player_two_weapon_one_physical_damage *= weapons[0].critical_damage;
        player_two_weapon_one_magical_damage *= weapons[0].critical_damage;
        // await computerCriticalCompiler(combatDatacombatData, player_two_weapon_one_physical_damage, player_two_weapon_one_magical_damage)
        console.log('Comp DW1 Post-Crit Firing', player_two_weapon_one_physical_damage, player_two_weapon_one_magical_damage)
        firstWeaponCrit = true;
        combatData.player_two_critical_success = true;
        // }
    }

    if (weapons[1].critical_chance > Math.floor(Math.random() * 101)) {
        // console.log('Comp DW2 Critical Firing', player_two_weapon_two_physical_damage, player_two_weapon_two_magical_damage)
        player_two_weapon_two_physical_damage *= weapons[1].critical_damage;
        player_two_weapon_two_magical_damage *= weapons[1].critical_damage;
        //await computerCriticalCompiler(combatData, player_two_weapon_two_physical_damage, player_two_weapon_two_magical_damage)
        console.log('Comp DW2 Critical Firing', player_two_weapon_two_physical_damage, player_two_weapon_two_magical_damage)
        secondWeaponCrit = true;
        combatData.player_two_critical_success = true;
    }
    
    console.log(firstWeaponCrit, secondWeaponCrit)

    player_two_weapon_one_physical_damage *= (player_physical_defense_multiplier * (1 - (weapons[0].physical_penetration / 100 )));
    player_two_weapon_one_magical_damage *= (player_magical_defense_multiplier * (1 - (weapons[0].magical_penetration  / 100 )));

    player_two_weapon_two_physical_damage *= (player_physical_defense_multiplier * (1 - (weapons[1].physical_penetration / 100 )));
    player_two_weapon_two_magical_damage *= (player_magical_defense_multiplier * (1 - (weapons[1].magical_penetration / 100 )));

    player_two_weapon_one_total_damage = player_two_weapon_one_physical_damage + player_two_weapon_one_magical_damage;
    player_two_weapon_two_total_damage = player_two_weapon_two_physical_damage + player_two_weapon_two_magical_damage;

    console.log(player_two_weapon_one_total_damage, player_two_weapon_two_total_damage);

    combatData.realized_player_two_damage = player_two_weapon_one_total_damage + player_two_weapon_two_total_damage;
    if (combatData.realized_player_two_damage < 0) {
        combatData.realized_player_two_damage = 0;
    }

    let strength = combatData.player_two_attributes.totalStrength + combatData.player_two_weapons[0].strength  + combatData.player_two_weapons[1].strength;
    let agility = combatData.player_two_attributes.totalAgility + combatData.player_two_weapons[0].agility  + combatData.player_two_weapons[1].agility;
    let achre = combatData.player_two_attributes.totalAchre + combatData.player_two_weapons[0].achre  + combatData.player_two_weapons[1].achre;
    let caeren = combatData.player_two_attributes.totalCaeren + combatData.player_two_weapons[0].caeren  + combatData.player_two_weapons[1].caeren;

    if (combatData.player_two_weapons[0].grip === 'One Hand') {
        if (combatData.player_two_weapons[0].attack_type === 'Physical') {
            combatData.realized_player_two_damage *= (agility / 45)
        } else {
            combatData.realized_player_two_damage *= (achre / 45)
        }
    }

    if (combatData.player_two_weapons[0].grip === 'Two Hand') {
        if (combatData.player_two_weapons[0].attack_type === 'Physical') {
            combatData.realized_player_two_damage *= (strength / 60) 
        } else {
            combatData.realized_player_two_damage *= (caeren / 60)
        }
    }

    combatData.new_player_one_health = combatData.current_player_one_health - combatData.realized_player_two_damage;
    combatData.current_player_one_health = combatData.new_player_one_health; // Added to persist health totals?

    if (combatData.new_player_one_health < 0 || combatData.current_player_one_health <= 0) {
        combatData.new_player_one_health = 0;
        combatData.player_two_win = true;
    }
    
    combatData.player_two_action_description = 
        `${computer.name} dual-wield attacks you with ${weapons[0].name} and ${weapons[1].name} for ${Math.round(combatData.realized_player_two_damage)} ${weapons[0].damage_type[0] ? weapons[0].damage_type[0] : ''}${weapons[0].damage_type[1] ? ' / ' + weapons[0].damage_type[1] : ''} and ${weapons[1].damage_type[0] ? weapons[1].damage_type[0] : ''}${weapons[1].damage_type[1] ? ' / ' + weapons[1].damage_type[1] : ''} ${firstWeaponCrit === true && secondWeaponCrit === true ? 'Critical Strike Damage' : firstWeaponCrit === true || secondWeaponCrit === true ? 'Partial Crit Damage' : 'Damage'}.`    
    return (
        combatData
    )
}

const p2AttackCompiler = async (combatData, player_two_action) => {
    if (combatData.player_one_win === true) {
        // combatData.player_two_action_description = 
        // `${combatData.player_two.name} has been defeated. Hail ${combatData.player_one.name}, you are the new va'Esai!`
        return
    }
    console.log('Computer Attack Compiler Firing')
    let computer_physical_damage = combatData.player_two_weapons[0].physical_damage;
    let computer_magical_damage = combatData.player_two_weapons[0].magical_damage;
    let computer_total_damage;

    let player_physical_defense_multiplier = 1 - (combatData.player_one_defense.physicalDefenseModifier / 100);
    let player_magical_defense_multiplier = 1 - (combatData.player_one_defense.magicalDefenseModifier / 100);

    // This is for Players's who are Posturing
    if (combatData.action === 'posture' && combatData.player_two_counter_success !== true && combatData.player_two_roll_success !== true) {
        player_physical_defense_multiplier = 1 - (combatData.player_one_defense.physicalPosture / 100);
        player_magical_defense_multiplier = 1 - (combatData.player_one_defense.magicalPosture / 100);
    }

    if (combatData.player_two_action === 'attack') {
        if (combatData.player_two_weapons[0].grip === 'One Hand') {
            if (combatData.player_two_weapons[0].attack_type === 'Physical') {
                if (combatData.player_two.mastery === 'Agility' || combatData.player_two.mastery === 'Constitution') {
                    if (combatData.player_two_attributes.totalAgility + combatData.player_two_weapons[0].agility + combatData.player_two_weapons[1].agility >= 30) {
                            if (combatData.player_two_weapons[1].grip === 'One Hand') { // If you're Focusing Attack + 1h + Agi Mastery + 1h in Second Slot
                               combatData.player_two_dual_wielding = true;
                                await p2DualWieldCompiler(combatData, player_physical_defense_multiplier, player_magical_defense_multiplier)
                                return combatData
                            } else {
                                computer_physical_damage *= 1.6;
                                computer_magical_damage *= 1.4;
                            }
                        } else {
                            computer_physical_damage *= 1.6;
                            computer_magical_damage *= 1.4;
                        }
                } else {
                    computer_physical_damage *= 1.25;
                    computer_magical_damage *= 1.25;
                }
            } 
            if (combatData.player_two_weapons[0].attack_type === 'Magic') {
                if (combatData.player_two.mastery === 'Achre' || combatData.player_two.mastery === 'Kyosir') {
                    if (combatData.player_two_attributes.totalAchre + combatData.player_two_weapons[0].achre + combatData.player_two_weapons[1].achre >= 30) {
                        if (combatData.player_two_weapons[1].grip === 'One Hand') { // Might be a dual-wield compiler instead to take the rest of it
                            combatData.player_two_dual_wielding = true;
                            await p2DualWieldCompiler(combatData, player_physical_defense_multiplier, player_magical_defense_multiplier)
                            return combatData
                        } else {
                            computer_physical_damage *= 1.4;
                            computer_magical_damage *= 1.6;
                        } 
                    } else {
                        computer_physical_damage *= 1.4;
                        computer_magical_damage *= 1.6;
                    } 
                } else {
                    computer_physical_damage *= 1.25;
                    computer_magical_damage *= 1.25;
                }
            }
        } 
        if (combatData.player_two_weapons[0].grip === 'Two Hand') { // Weapon is TWO HAND
            if (combatData.player_two_weapons[0].attack_type === 'Physical' && combatData.player_two_weapons[0].type !== 'Bow') {
                if (combatData.player_two.mastery === 'Strength' || combatData.player_two.mastery === 'Constitution') {
                    if (combatData.player_two_attributes.totalStrength + combatData.player_two_weapons[0].strength + combatData.player_two_weapons[1].strength >= 30) { // Might be a dual-wield compiler instead to take the rest of it
                        if (combatData.player_two_weapons[1].type !== 'Bow') {
                            combatData.player_two_dual_wielding = true;
                            await p2DualWieldCompiler(combatData, player_physical_defense_multiplier, player_magical_defense_multiplier)
                            return combatData
                        } else { // Less than 50 Srength 
                            computer_physical_damage *= 1.6;
                            computer_magical_damage *= 1.4;
                        }
                    } else { // Less than 50 Srength 
                        computer_physical_damage *= 1.6;
                        computer_magical_damage *= 1.4;
                    }
                } else {
                    computer_physical_damage *= 1.25;
                    computer_magical_damage *= 1.25;
                }
            }
            if (combatData.player_two_weapons[0].attack_type === 'Magic') {
                if (combatData.player_two.mastery === 'Caeren' || combatData.player_two.mastery === 'Kyosir') {
                    if (combatData.player_two_attributes.totalCaeren + combatData.player_two_weapons[0].caeren + combatData.player_two_weapons[1].caeren >= 30) {
                        if (combatData.player_two_weapons[1].type !== 'Bow') {
                            combatData.player_two_dual_wielding = true;
                            await p2DualWieldCompiler(combatData, player_physical_defense_multiplier, player_magical_defense_multiplier)
                            return combatData
                        } else {
                            computer_physical_damage *= 1.4;
                            computer_magical_damage *= 1.6;
                        }
                    } else {
                        computer_physical_damage *= 1.4;
                        computer_magical_damage *= 1.6;
                    }
                } else {
                    computer_physical_damage *= 1.25;
                    computer_magical_damage *= 1.25;
                }
            }
            if (combatData.player_two_weapons[0].type === 'Bow') {
                if (combatData.player_two.mastery === 'Agility' || combatData.player_two.mastery === 'Achre' || combatData.player_two.mastery === 'Kyosir') {
                    computer_physical_damage *= 2.25;
                    computer_magical_damage *= 2.25;
                } else {
                    computer_physical_damage *= 1.25;
                    computer_magical_damage *= 1.25;
                }
            }
        }
    }

    // Checking For Player Actions
    if (player_two_action === 'counter') {
        if (combatData.player_two_counter_success === true) {
            computer_physical_damage *= 3;
            computer_magical_damage *= 3;    
        } else {
            computer_physical_damage *= 0.9;
            computer_magical_damage *= 0.9;
        }
    }

    if (player_two_action === 'dodge') {
        computer_physical_damage *= 0.9;
        computer_magical_damage *= 0.9;
    }

    if (player_two_action === 'posture') {
        computer_physical_damage *= 0.95;
        computer_magical_damage *= 0.95;
    }

    if (player_two_action === 'roll' ) {
        if (combatData.player_two_roll_success === true) {
            computer_physical_damage *= 1.15;
            computer_magical_damage *= 1.15;
        } else {
            computer_physical_damage *= 0.85;
            computer_magical_damage *= 0.85;
        }
    }

    // This is for Critical Strikes
    if (combatData.player_two_weapons[0].critical_chance > Math.floor(Math.random() * 101)) {
        computer_physical_damage *= combatData.player_two_weapons[0].critical_damage;
        computer_magical_damage *= combatData.player_two_weapons[0].critical_damage;
        // computerCriticalCompiler(combatData, combatData.player_one_weapons[0], computer_physical_damage, computer_magical_damage)
        // return combatData
        console.log('Computer Critical Post-Multiplier Inside Computer Attack Function', computer_physical_damage, computer_magical_damage);
        combatData.player_two_critical_success = true;
    }

    // If you made it here, your basic attack now resolves itself
    computer_physical_damage *= (player_physical_defense_multiplier * (1 - (combatData.player_two_weapons[0].physical_penetration / 100)));
    computer_magical_damage *= (player_magical_defense_multiplier * (1 - (combatData.player_two_weapons[0].magical_penetration / 100)));

    computer_total_damage = computer_physical_damage + computer_magical_damage;
    if (computer_total_damage < 0) {
        computer_total_damage = 0;
    }
    combatData.realized_player_two_damage = computer_total_damage;
    combatData.new_player_one_health = combatData.current_player_one_health - combatData.realized_player_two_damage;
    combatData.current_player_one_health = combatData.new_player_one_health; // Added to persist health totals?

    combatData.player_two_action_description = 
        `${combatData.player_two.name} attacks ${combatData.player_one.name} with their ${combatData.player_two_weapons[0].name} for ${Math.round(computer_total_damage)} ${combatData.player_two_weapons[0].damage_type[0] ? combatData.player_two_weapons[0].damage_type[0] : ''}${combatData.player_two_weapons[0].damage_type[1] ? ' / ' + combatData.player_two_weapons[0].damage_type[1] : ''} ${combatData.player_two_critical_success === true ? 'Critical Strike Damage' : 'Damage'}.`    

    if (combatData.new_player_one_health < 0 || combatData.current_player_one_health <= 0) {
        combatData.new_player_one_health = 0;
        combatData.player_two_win = true;
    }

    console.log(computer_total_damage, 'Total Computer Damage')

    return (
        combatData
    )
}

const computerCriticalCompiler = async (combatData, weapon, computer_physical_damage, computer_magical_damage) => {
    console.log('Computer Critical Firing', computer_physical_damage, computer_magical_damage)
    computer_physical_damage *= weapon.critical_damage;
    computer_magical_damage *= weapon.critical_damage;
    console.log('Computer Post-Crit Multiplier', computer_physical_damage, computer_magical_damage)

    return {
        combatData,
        computer_physical_damage,
        computer_magical_damage
    }
}

const computerCounterCompiler = async (combatData, player_one_action, player_two_action) => {
    console.log('Computer Counter Firing')
    player_two_action = 'attack';
    await attackCompiler(combatData, player_two_action)
    return {
        combatData,
        player_two_action
    }
}
    
const p2RollCompiler = async (combatData, player_one_initiative, player_two_initiative, player_one_action, player_two_action) => {
    console.log(player_two_action, 'Computer Roll Firing')
    const computer_roll = combatData.player_two_weapons[0].roll;
    let roll_catch = Math.floor(Math.random() * 101) + combatData.player_one_attributes.kyosirMod;
    console.log(computer_roll, 'Computer Roll %', roll_catch, 'Roll # To Beat')
    if (computer_roll > roll_catch) {
        combatData.player_two_roll_success = true;
        combatData.player_two_special_description = 
                `${combatData.player_two.name} successfully rolls against ${combatData.player_one.name}, avoiding their ${  player_one_action === 'attack' ? 'Focused' : player_one_action.charAt(0).toUpperCase() + player_one_action.slice(1) } Attack.`
        await p2AttackCompiler(combatData, player_two_action)
    } else {
        combatData.player_two_special_description = 
            `${combatData.player_two.name} fails to roll against ${combatData.player_one.name}'s ${  player_one_action === 'attack' ? 'Focused' : player_one_action.charAt(0).toUpperCase() + player_one_action.slice(1) } Attack.`
        return combatData
        // if (player_one_initiative > player_two_initiative) {
        //     await p2AttackCompiler(combatData, player_two_action)
        //     await attackCompiler(combatData, player_one_action)
        // } else {
        //     console.log('Computer failed yet had higher initiative')
        //     combatData.player_two_special_description = 
        //         `${combatData.player_two.name} fails to roll against ${combatData.player_one.name}'s ${  player_one_action === 'attack' ? 'Focused' : player_one_action.charAt(0).toUpperCase() + player_one_action.slice(1) } Attack.`
        //     await attackCompiler(combatData, player_one_action)
        //     await p2AttackCompiler(combatData, player_two_action)
        // }
    }
    return (
        combatData
    )
}


// ================================== PLAYER COMPILER FUNCTIONS ====================================== \\

const dualWieldCompiler = async (combatData) => { // Triggers if 40+ Str/Caer for 2h, 1h + Agi/Achre Mastery and 2nd weapon is 1h
    console.log('Dual Wielding')
    const player = combatData.player;
    const computer = combatData.player_two;
    const weapons = combatData.player_one_weapons;

    let player_weapon_one_physical_damage = combatData.player_one_weapons[0].physical_damage;
    let player_weapon_one_magical_damage = combatData.player_one_weapons[0].magical_damage;
    let player_weapon_two_physical_damage = combatData.player_one_weapons[1].physical_damage;
    let player_weapon_two_magical_damage = combatData.player_one_weapons[1].magical_damage;
    let player_weapon_one_total_damage;
    let player_weapon_two_total_damage;
    let firstWeaponCrit = false;
    let secondWeaponCrit = false;
    
    let computer_physical_defense_multiplier = 1 - (combatData.player_two_defense.physicalDefenseModifier / 100);
    let computer_magical_defense_multiplier = 1 - (combatData.player_two_defense.magicalDefenseModifier / 100);

    // This is for Critical Strikes
    if (combatData.player_one_weapons[0].critical_chance > Math.floor(Math.random() * 101)) {
            player_weapon_one_physical_damage *= combatData.player_one_weapons[0].critical_damage;
            player_weapon_one_magical_damage *= combatData.player_one_weapons[0].critical_damage;
            firstWeaponCrit = true;
            combatData.player_one_critical_success = true;
        console.log(player_weapon_one_physical_damage, player_weapon_one_magical_damage, 'Weapon 1 Post-Crit Modifier')
    }

    if (combatData.player_one_weapons[1].critical_chance > Math.floor(Math.random() * 101)) {
        player_weapon_two_physical_damage *= combatData.player_one_weapons[1].critical_damage;
        player_weapon_two_magical_damage *= combatData.player_one_weapons[1].critical_damage;
        // await criticalCompiler(combatData, combatData.player_one_weapons[1], player_weapon_two_physical_damage, player_weapon_two_magical_damage)
        secondWeaponCrit = true;
        combatData.player_one_critical_success = true;
        console.log(player_weapon_two_physical_damage, player_weapon_two_magical_damage, 'Weapon 2 Post-Crit Modifier')
    }

    player_weapon_one_physical_damage *= (computer_physical_defense_multiplier * (1 - (weapons[0].physical_penetration / 100)));
    player_weapon_one_magical_damage *= (computer_magical_defense_multiplier * (1 - (weapons[0].magical_penetration / 100)));

    player_weapon_one_physical_damage *= (computer_physical_defense_multiplier * (1 - (weapons[1].physical_penetration / 100)));
    player_weapon_one_magical_damage *= (computer_magical_defense_multiplier * (1 - (weapons[1].magical_penetration / 100)));

    player_weapon_one_total_damage = player_weapon_one_physical_damage + player_weapon_one_magical_damage;
    player_weapon_two_total_damage = player_weapon_two_physical_damage + player_weapon_two_magical_damage;

    combatData.realized_player_one_damage = player_weapon_one_total_damage + player_weapon_two_total_damage;
    if (combatData.realized_player_one_damage < 0) {
        combatData.realized_player_one_damage = 0;
    }

    let strength = combatData.player_one_attributes.totalStrength + combatData.player_one_weapons[0].strength  + combatData.player_one_weapons[1].strength;
    let agility = combatData.player_one_attributes.totalAgility + combatData.player_one_weapons[0].agility  + combatData.player_one_weapons[1].agility;
    let achre = combatData.player_one_attributes.totalAchre + combatData.player_one_weapons[0].achre  + combatData.player_one_weapons[1].achre;
    let caeren = combatData.player_one_attributes.totalCaeren + combatData.player_one_weapons[0].caeren  + combatData.player_one_weapons[1].caeren;

    if (combatData.player_one_weapons[0].grip === 'One Hand') {
        if (combatData.player_one_weapons[0].attack_type === 'Physical') {
            combatData.realized_player_one_damage *= (agility / 45)
        } else {
            combatData.realized_player_one_damage *= (achre / 45)
        }
    }

    if (combatData.player_one_weapons[0].grip === 'Two Hand') {
        if (combatData.player_one_weapons[0].attack_type === 'Physical') {
            combatData.realized_player_one_damage *= (strength / 60) 
        } else {
            combatData.realized_player_one_damage *= (caeren / 60)
        }
    }

    
    combatData.new_player_two_health = combatData.current_player_two_health - combatData.realized_player_one_damage;
    combatData.current_player_two_health = combatData.new_player_two_health; // Added to persist health totals?

    if (combatData.new_player_two_health <= 0 || combatData.current_player_two_health <= 0) {
        combatData.new_player_two_health = 0;
        combatData.player_one_win = true;
    }
    
    combatData.player_one_action_description = 
        `${combatData.player_one.name} attacks ${computer.name} with both ${weapons[0].name} and ${weapons[1].name} for ${Math.round(combatData.realized_player_one_damage)} ${weapons[0].damage_type[0] ? weapons[0].damage_type[0] : ''}${weapons[0].damage_type[1] ? ' / ' + weapons[0].damage_type[1] : ''} and ${weapons[1].damage_type[0] ? weapons[1].damage_type[0] : ''}${weapons[1].damage_type[1] ? ' / ' + weapons[1].damage_type[1] : ''} ${firstWeaponCrit === true && secondWeaponCrit === true ? 'Critical Strike Damage' : firstWeaponCrit === true || secondWeaponCrit === true ? 'Partial Crit Damage' : 'Damage'}.`    
    console.log(combatData.realized_player_one_damage)
    return (
        combatData
    )
}
    
const attackCompiler = async (combatData, player_one_action) => {
    if (combatData.player_two_win === true) {
        // combatData.player_one_action_description = 
        // `${combatData.player_one.name} has been defeated. Hail ${combatData.player_two.name}, the new va'Esai!`
        return
    }
    console.log('In the Player Attack Compiler')
    let player_physical_damage = combatData.player_one_weapons[0].physical_damage;
    let player_magical_damage = combatData.player_one_weapons[0].magical_damage;
    let player_total_damage;

    let computer_physical_defense_multiplier = 1 - (combatData.player_two_defense.physicalDefenseModifier / 100);
    let computer_magical_defense_multiplier = 1 - (combatData.player_two_defense.magicalDefenseModifier / 100);
    
    // This is for Opponent's who are Posturing
    if (combatData.player_two_action === 'posture' && combatData.player_one_counter_success !== true && combatData.player_one_roll_success !== true) {
        computer_physical_defense_multiplier = 1 - (combatData.player_two_defense.physicalPosture / 100);
        computer_magical_defense_multiplier = 1 - (combatData.player_two_defense.magicalPosture / 100);
    }

    // TODO:FIXME:TODO:FIXME: May not do Damage Type Armor Modifiers Yet TODO:FIXME:TODO:FIXME:
    // checkDamageTypes(combatData)

    // This is for the Focused Attack Action i.e. you chose to Attack over adding a defensive component
    if (combatData.action === 'attack') {
        if (combatData.player_one_weapons[0].grip === 'One Hand') {
            if (combatData.player_one_weapons[0].attack_type === 'Physical') {
                if (combatData.player_one.mastery === 'Agility' || combatData.player_one.mastery === 'Constitution') {
                    if (combatData.player_one_attributes.totalAgility + combatData.player_one_weapons[0].agility  + combatData.player_one_weapons[1].agility >= 30) {
                        if (combatData.player_one_weapons[1].grip === 'One Hand') { // If you're Focusing Attack + 1h + Agi Mastery + 1h in Second Slot
                            combatData.player_one_dual_wielding = true;
                            await dualWieldCompiler(combatData)
                            return combatData
                        } else {
                            player_physical_damage *= 1.6;
                            player_magical_damage *= 1.4;
                        }
                    } else {
                        player_physical_damage *= 1.6;
                        player_magical_damage *= 1.4;
                    }
                } else {
                    player_physical_damage *= 1.25;
                    player_magical_damage *= 1.25;
                }
            } 
            if (combatData.player_one_weapons[0].attack_type === 'Magic') {
                if (combatData.player_one.mastery === 'Achre' || combatData.player_one.mastery === 'Kyosir') {
                    if (combatData.player_one_attributes.totalAchre + combatData.player_one_weapons[0].achre + combatData.player_one_weapons[1].achre >= 30) {
                        if (combatData.player_one_weapons[1].grip === 'One Hand') { // Might be a dual-wield compiler instead to take the rest of it
                            combatData.player_one_dual_wielding = true;
                            await dualWieldCompiler(combatData)
                            return combatData
                        } else {
                            player_physical_damage *= 1.4;
                            player_magical_damage *= 1.6;
                        }
                    } else {
                        player_physical_damage *= 1.4;
                        player_magical_damage *= 1.6;
                    }
                } else {
                    player_physical_damage *= 1.25;
                    player_magical_damage *= 1.25;
                }
            }
        }
        if (combatData.player_one_weapons[0].grip === 'Two Hand') { // Weapon is TWO HAND
            if (combatData.player_one_weapons[0].attack_type === 'Physical' && combatData.player_one_weapons[0].type !== 'Bow') {
                if (combatData.player_one.mastery === 'Strength'  || combatData.player_one.mastery === 'Constitution') {
                    if (combatData.player_one_attributes.totalStrength + combatData.player_one_weapons[0].strength  + combatData.player_one_weapons[1].strength >= 30) { // Might be a dual-wield compiler instead to take the rest of it
                        if (combatData.player_one_weapons[1].type !== 'Bow') {
                            combatData.player_one_dual_wielding = true;
                            await dualWieldCompiler(combatData)
                            return combatData
                        } else {
                            player_physical_damage *= 1.6;
                            player_magical_damage *= 1.4;
                        }
                    } else {
                        player_physical_damage *= 1.6;
                        player_magical_damage *= 1.4;
                    }
                } else {
                    player_physical_damage *= 1.25;
                    player_magical_damage *= 1.25;
                }
            }
            if (combatData.player_one_weapons[0].attack_type === 'Magic') {
                if (combatData.player_one.mastery === 'Caeren' || combatData.player_one.mastery === 'Kyosir') {
                    if (combatData.player_one_attributes.totalCaeren + combatData.player_one_weapons[0].caeren + combatData.player_one_weapons[1].caeren >= 30) {
                        if (combatData.player_one_weapons[1].type !== 'Bow') {
                            combatData.player_one_dual_wielding = true;
                            await dualWieldCompiler(combatData)
                                return combatData
                        } else {
                            player_physical_damage *= 1.4;
                            player_magical_damage *= 1.6;
                        }
                    } else {
                        player_physical_damage *= 1.4;
                        player_magical_damage *= 1.6;
                    }
                } else {
                    player_physical_damage *= 1.25;
                    player_magical_damage *= 1.25;
                }
            }
                if (combatData.player_one_weapons[0].type === 'Bow') {
                    if (combatData.player_one.mastery === 'Agility' || combatData.player_one.mastery === 'Achre' || combatData.player_one.mastery === 'Kyosir') {
                        player_physical_damage *= 2.25;
                        player_magical_damage *= 2.25;
                    } else {
                        player_physical_damage *= 1.25;
                        player_magical_damage *= 1.25;
                    }
                }
        } 
    }

    // Checking For Player Actions
    if (player_one_action === 'counter') {
        if (combatData.player_one_counter_success === true) {
            player_physical_damage *= 3;
            player_magical_damage *= 3;
        } else {
            player_physical_damage *= 0.9;
            player_magical_damage *= 0.9;
        }
    }

    if (player_one_action === 'dodge') {
        player_physical_damage *= 0.9;
        player_magical_damage *= 0.9;
    }

    if (player_one_action === 'posture') {
        player_physical_damage *= 0.95;
        player_magical_damage *= 0.95;
    }

    if (player_one_action === 'roll' ) {
        if (combatData.player_one_roll_success === true) {
            player_physical_damage *= 1.15;
            player_magical_damage *= 1.15;
        } else {
            player_physical_damage *= 0.85;
            player_magical_damage *= 0.85;
        }
    }


    // This is for Critical Strikes
    if (combatData.player_one_weapons[0].critical_chance > Math.floor(Math.random() * 101)) {
        console.log('Player Critical Firing', player_physical_damage, player_magical_damage)
        player_physical_damage *= combatData.player_one_weapons[0].critical_damage;
        player_magical_damage *= combatData.player_one_weapons[0].critical_damage;
        // criticalCompiler(combatData, combatData.player_one_weapons[0], player_physical_damage, player_magical_damage)
        // return combatData
        console.log('Attack Compiler Post-Crit Multiplier', player_physical_damage, player_magical_damage)
        combatData.player_one_critical_success = true;
    }

    // If you made it here, your basic attack now resolves itself
    player_physical_damage *= (computer_physical_defense_multiplier * (1 - (combatData.player_one_weapons[0].physical_penetration / 100)));
    player_magical_damage *= (computer_magical_defense_multiplier * (1 - (combatData.player_one_weapons[0].magical_penetration / 100)));

    player_total_damage = player_physical_damage + player_magical_damage;
    if (player_total_damage < 0) {
        player_total_damage = 0;
    }
    combatData.realized_player_one_damage = player_total_damage;
    combatData.new_player_two_health = combatData.current_player_two_health - combatData.realized_player_one_damage;
    combatData.current_player_two_health = combatData.new_player_two_health; // Added to persist health totals?

    combatData.player_one_action_description = 
        `${combatData.player_one.name} attacks ${combatData.player_two.name} with their ${combatData.player_one_weapons[0].name} for ${Math.round(player_total_damage)} ${combatData.player_one_weapons[0].damage_type[0] ? combatData.player_one_weapons[0].damage_type[0] : ''}${combatData.player_one_weapons[0].damage_type[1] ? ' / ' + combatData.player_one_weapons[0].damage_type[1] : ''} ${combatData.critical_success === true ? 'Critical Strike Damage' : 'Damage'}.`    

    if (combatData.new_player_two_health <= 0 || combatData.current_player_two_health <= 0) {
        combatData.new_player_two_health = 0;
        combatData.player_one_win = true;
    }

    console.log(player_total_damage, 'Total Player Damage');

    return combatData
}

const criticalCompiler = async (combatData, weapon, player_physical_damage, player_magical_damage) => {
    console.log('Player Critical Firing', player_physical_damage, player_magical_damage)
    player_physical_damage *= weapon.critical_damage;
    player_magical_damage *= weapon.critical_damage;
    
    console.log('Player Post-Crit Multiplier', player_physical_damage, player_magical_damage)
    return {
        combatData
    }
}

const counterCompiler = async (combatData, player_one_action, player_two_action) => {
    console.log('Player Counter Firing')
    player_one_action = 'attack';
    await attackCompiler(combatData, player_one_action)
    // if (player_two_action === 'attack') {
    //     combatData.action = 'attack';
    //     await attackCompiler(combatData)
    // }
    // if (player_two_action === 'counter') {
        
    // }
    // if (player_two_action === 'dodge') {
        
    // }
    // if (player_two_action === 'posture') {
        
    // }
    // if (player_two_action === 'roll') {
        
    // }
    return (
        combatData
    )
}

const p1RollCompiler = async (combatData, player_one_initiative, player_two_initiative, player_one_action, player_two_action) => {
    console.log('Player Roll Firing')
    const player_roll = combatData.player_one_weapons[0].roll;
    let roll_catch = Math.floor(Math.random() * 101) + combatData.player_two_attributes.kyosirMod;
    console.log(player_roll, 'Player Roll %', roll_catch, 'Roll # To Beat')
    if (player_roll > roll_catch) {
        combatData.player_one_roll_success = true;
        combatData.player_one_special_description = 
                `${combatData.player_one.name} successfully rolls against ${combatData.player_two.name}, avoiding their ${  combatData.player_two_action === 'attack' ? 'Focused' : combatData.player_two_action.charAt(0).toUpperCase() + combatData.player_two_action.slice(1) } Attack.`
        await attackCompiler(combatData, player_one_action)
    } else {
        combatData.player_one_special_description =
            `${combatData.player_one.name} fails to roll against ${combatData.player_two.name}'s ${  combatData.player_two_action === 'attack' ? 'Focused' : combatData.player_two_action.charAt(0).toUpperCase() + combatData.player_two_action.slice(1) } Attack.`
        return combatData
        // if (player_one_initiative > player_two_initiative) {
        //     await attackCompiler(combatData, player_one_action)
        //     await p2AttackCompiler(combatData, player_two_action)
        // } else {
        //     combatData.player_one_special_description =
        //     `${combatData.player_one.name} fails to roll against ${combatData.player_two.name}'s ${  combatData.player_two_action === 'attack' ? 'Focused' : combatData.player_two_action.charAt(0).toUpperCase() + combatData.player_two_action.slice(1) } Attack.`
        //     await p2AttackCompiler(combatData, player_two_action)
        //     await attackCompiler(combatData, player_one_action)
        // }
    }
    return (
        combatData
    )
}

// Resolves both Player and Computer Rolling
const doubleRollCompiler = async (combatData, player_one_initiative, player_two_initiative, player_one_action, player_two_action) => {
    console.log('Double Roll Firing')
    const player_roll = combatData.player_one_weapons[0].roll;
    const computer_roll = combatData.player_two_weapons[0].roll;
    let roll_catch = Math.floor(Math.random() * 101) + combatData.player_two_attributes.kyosirMod;
    console.log(player_roll, 'Player Roll %', computer_roll, 'Computer Roll %', roll_catch, 'Number to Beat')
    if (player_one_initiative > player_two_initiative) { // You have Higher Initiative
        if (player_roll > roll_catch) { // The Player Succeeds the Roll
            combatData.player_one_special_description = 
                `${combatData.player_one.name} successfully rolls against ${combatData.player_two.name}, avoiding their ${combatData.player_two_action.charAt(0).toUpperCase() + combatData.player_two_action.slice(1)} Attack`
            await attackCompiler(combatData, player_one_action)
        } else if (computer_roll > roll_catch) { // The Player Fails the Roll and the Computer Succeeds
            combatData.player_one_special_description = 
                `${combatData.player_one.name} fails to roll against ${combatData.player_two.name}'s ${combatData.player_two_action.charAt(0).toUpperCase() + combatData.player_two_action.slice(1)} Attack`
            combatData.player_two_special_description = 
                `${combatData.player_two.name} successfully rolls against ${combatData.player_one.name}, avoiding their ${combatData.player_one_action.charAt(0).toUpperCase() + combatData.player_one_action.slice(1)} Attack`
            await p2AttackCompiler(combatData, player_two_action)
        } else { // Neither Player nor Computer Succeed
            combatData.player_one_special_description = 
                `${combatData.player_one.name} fails to roll against ${combatData.player_two.name}'s ${combatData.player_two_action.charAt(0).toUpperCase() + combatData.player_two_action.slice(1)} Attack`
            combatData.player_two_special_description = 
                `${combatData.player_two.name} fails to roll against ${combatData.player_one.name}'s ${combatData.player_one_action.charAt(0).toUpperCase() + combatData.player_one_action.slice(1)} Attack`
            await attackCompiler(combatData, player_one_action)
            await p2AttackCompiler(combatData, player_two_action)
        }
    } else { // The Computer has Higher Initiative
        if (computer_roll > roll_catch) { // The Computer Succeeds the Roll
            combatData.player_two_special_description = 
                `${combatData.player_two.name} successfully rolls against ${combatData.player_one.name}, avoiding their ${combatData.player_one_action.charAt(0).toUpperCase() + combatData.player_one_action.slice(1)} Attack`
            await p2AttackCompiler(combatData, player_two_action)
        } else if (player_roll > roll_catch) { // The Computer Fails the Roll and the Player Succeeds
            combatData.player_two_special_description = 
                `${combatData.player_two.name} fails to roll against ${combatData.player_one.name}'s ${combatData.player_one_action.charAt(0).toUpperCase() + combatData.player_one_action.slice(1)} Attack`
            combatData.player_one_special_description = 
                `${combatData.player_one.name} successfully rolls against ${combatData.player_two.name}, avoiding their ${combatData.player_two_action.charAt(0).toUpperCase() + combatData.player_two_action.slice(1)} Attack`
            await attackCompiler(combatData, player_one_action)
        } else { // Neither Computer nor Player Succeed
            combatData.player_two_special_description = 
                `${combatData.player_two.name} fails to roll against ${combatData.player_one.name}'s ${combatData.player_one_action.charAt(0).toUpperCase() + combatData.player_one_action.slice(1)} Attack`
            combatData.player_one_special_description = 
                `${combatData.player_one.name} fails to roll against ${combatData.player_two.name}'s ${combatData.player_two_action.charAt(0).toUpperCase() + combatData.player_two_action.slice(1)} Attack`
            await p2AttackCompiler(combatData, player_two_action)
            await attackCompiler(combatData, player_one_action)
        }
    }
    return (
        combatData
    )
}

// Action Splitter Determines the Action Payload and Sorts the Resolution of the Action Round player_one.name
const actionSplitter = async (combatData) => {
    //TODO:FIXME: Work on proper rendering of current health and new health totals post-damage TODO:FIXME:
    const newData = {
        room: combatData.room,
        player_one: combatData.player_one, // The player's Ascean
        action: combatData.action, // The player's action
        player_one_action: combatData.action,
        player_one_counter_guess: combatData.player_one_counter_guess, // The action chosen believed to be 
        player_one_health: combatData.player_one_health, // Current Player Health
        player_one_weapon_one: combatData.player_one_weapon_one,
        player_one_weapon_two: combatData.player_one_weapon_two,
        player_one_weapon_three: combatData.player_one_weapon_three,
        player_one_weapons: combatData.player_one_weapons, // All 3 Weapons
        player_one_defense: combatData.player_one_defense, // Posseses Base + Postured Defenses
        player_one_attributes: combatData.player_one_attributes, // Possesses compiled Attributes, Initiative

        player_two: combatData.player_two, // Computer Enemy
        player_two_attributes: combatData.player_two_attributes, // Possesses compiled Attributes, Initiative
        player_two_defense: combatData.player_two_defense, // Posseses Base + Postured Defenses
        action_two: combatData.action_two,
        player_two_action: combatData.action_two, // Action Chosen By Computer
        player_two_counter_guess: combatData.player_two_counter_guess, // Comp's Counter Guess if Action === 'Counter'
        player_two_weapons: combatData.player_two_weapons,  // All 3 Weapons

        potential_player_one_damage: 0, // All the Damage that is possible on hit for a player
        potential_player_two_damage: 0, // All the Damage that is possible on hit for a computer

        realized_player_one_damage: 0, // Player Damage - Computer Defenses
        realized_player_two_damage: 0, // Computer Damage - Player Defenses

        player_one_start_description: '',
        player_one_special_description: '',
        player_one_action_description: '', // The combat text to inject from the player
        player_one_influence_description: '',
        player_one_influence_description_two: '',
        player_one_death_description: '',

        player_two_start_description: '',
        player_two_special_description: '',
        player_two_action_description: '', // The combat text to inject from the computer
        player_two_influence_description: '',
        player_two_influence_description_two: '',
        player_two_death_description: '',
        
        current_player_one_health: combatData.new_player_one_health, // New player health post-combat action
        current_player_two_health: combatData.new_player_two_health, // New computer health post-combat action
        new_player_one_health: combatData.new_player_one_health, // New player health post-combat action
        new_player_two_health: combatData.new_player_two_health, // New computer health post-combat action

        player_one_religious_success: false,
        
        player_one_dual_wielding: false,
        player_one_roll_success: false,
        player_one_win: false,
        player_one_critical_success: false,
        player_one_counter_success: false,
        player_one_initiated: false,
        player_one_reduel: false,

        player_two_reduel: false,
        player_two_initiated: false,
        player_two_dual_wielding: false,
        player_two_roll_success: false,
        player_two_counter_success: false,
        player_two_win: false,
        player_two_critical_success: false
    }
    // console.log(newData, 'Combat Data in the Action Splitter')
    const player_one_initiative = newData.player_one_attributes.initiative;
    const player_two_initiative = newData.player_two_attributes.initiative;
    let player_one_action = newData.action;
    let player_one_counter = newData.player_one_counter_guess;
    let player_two_counter = newData.player_two_counter_guess;
    let player_two_action = newData.action_two;
    let player_one_possible_choices = ['attack', 'posture', 'roll']
    let player_two_possible_choices = ['attack', 'posture', 'roll']

    let playerOnePostureRating = ((combatData.player_one_defense.physicalPosture + combatData.player_one_defense.magicalPosture) / 4) + 5;
    let playerOneRollRating = combatData.player_one_weapons[0].roll;

    let playerTwoPostureRating = ((combatData.player_two_defense.physicalPosture + combatData.player_two_defense.magicalPosture) / 4) + 5;
    let playerTwoRollRating = combatData.player_two_weapons[0].roll;

    let posture = 'posture';
    let roll = 'roll';

    // Keeping This Off For Now to Facilliate More Auto Focus Attacks

    // if (playerOneRollRating >= 100) {
    //     player_one_possible_choices.push(roll)
    // } else  if (playerOnePostureRating >= 100) {
    //     player_one_possible_choices.push(posture)
    // } else if (playerOnePostureRating >= playerOneRollRating) { 
    //     player_one_possible_choices.push(posture)
    // } else { 
    //     player_one_possible_choices.push(roll) 
    // } 

    // if (playerTwoRollRating >= 100) {
    //     player_two_possible_choices.push(roll)
    // } else  if (playerTwoPostureRating >= 100) {
    //     player_two_possible_choices.push(posture)
    // } else if (playerTwoPostureRating >= playerTwoRollRating) { 
    //     player_two_possible_choices.push(posture)
    // } else { 
    //     player_two_possible_choices.push(roll) 
    // } 


    if (player_one_action === '') {
        let player_one_new_choice = Math.floor(Math.random() * player_one_possible_choices.length)
        console.log(player_one_new_choice, 'New Choice Number')
        newData.action = player_one_possible_choices[player_one_new_choice];
        newData.player_one_action = player_one_possible_choices[player_one_new_choice];
        player_one_action = player_one_possible_choices[player_one_new_choice];
        console.log(player_one_action, 'New Choice')
    }

    if (player_two_action === '') {
        let player_two_new_choice = Math.floor(Math.random() * player_two_possible_choices.length)
        console.log(player_two_new_choice, 'New Choice Number')
        newData.action_two = player_two_possible_choices[player_two_new_choice];
        newData.player_two_action = player_two_possible_choices[player_two_new_choice];
        player_two_action = player_two_possible_choices[player_two_new_choice];
        console.log(player_two_action, 'New Choice')
    }
    player_one_counter = newData.player_one_counter_guess;
    player_one_action = newData.player_one_action;
    
    player_two_counter = newData.player_two_counter_guess;
    player_two_action = newData.player_two_action;

    newData.player_two_start_description = 
        `${combatData.player_two.name} sets to ${player_two_action.charAt(0).toUpperCase() + player_two_action.slice(1)}${player_two_counter ? '-' + player_two_counter.charAt(0).toUpperCase() + player_two_counter.slice(1) : ''} against ${combatData.player_one.name}.`

    newData.player_one_start_description = 
        `${combatData.player_one.name} attempt to ${player_one_action.charAt(0).toUpperCase() + player_one_action.slice(1)}${player_one_counter ? '-' + player_one_counter.charAt(0).toUpperCase() + player_one_counter.slice(1) : ''} against ${combatData.player_two.name}.`
    
    // If both Player and Computer Counter -> Counter [Fastest Resolution]
    if (player_one_action === 'counter' && player_two_action === 'counter') { // This is if COUNTER: 'ACTION' Is the Same for Both
        if (player_one_counter === player_two_counter && player_one_counter === 'counter') {
            if (player_one_initiative > player_two_initiative) {
                newData.player_one_counter_success = true;
                newData.player_one_special_description = 
                    `${newData.player_one.name} successfully Countered ${newData.player_two.name}'s Counter-Counter! Absolutely Brutal`
                await attackCompiler(newData, player_one_action)
                await faithFinder(newData, player_one_action, player_two_action);
                return newData
            } else {
                newData.player_two_counter_success = true;
                newData.player_two_special_description = 
                    `${newData.player_two.name} successfully Countered ${newData.player_one.name}'s Counter-Counter! Absolutely Brutal`
                await p2AttackCompiler(newData, player_two_action);
                await faithFinder(newData, player_one_action, player_two_action);
                return newData
            }    
        }
        // If the Player Guesses Right and the Computer Guesses Wrong
        if (player_one_counter === player_two_action && player_two_counter !== player_one_action) {
            newData.player_one_counter_success = true;
            newData.player_one_special_description = 
                `${newData.player_one.name} successfully Counters ${newData.player_two.name}'s Counter-${player_two_counter.charAt(0).toUpperCase() + player_two_counter.slice(1)}! Absolutely Brutal`
            await attackCompiler(newData, player_one_action)
            await faithFinder(newData, player_one_action, player_two_action);
            return newData
        }
    
        // If the Computer Guesses Right and the Player Guesses Wrong
        if (player_two_counter === player_one_action && player_one_counter !== player_two_action) {
            newData.player_two_counter_success = true;
            newData.player_two_special_description = 
                `${newData.player_two.name} successfully Counters ${newData.player_one.name}'s Counter-${player_one_counter.charAt(0).toUpperCase() + player_one_counter.slice(1)}! Absolutely Brutal`
            await p2AttackCompiler(newData, player_two_action);
            await faithFinder(newData, player_one_action, player_two_action);
            return newData
        } 
    
        if (player_one_counter !== player_two_action && player_two_counter !== player_one_action) {
            newData.player_one_special_description = 
                `${newData.player_one.name} fails to Counter ${newData.player_two.name}'s Counter! Heartbreaking`
            newData.player_two_special_description = 
                `${newData.player_two.name} fails to Counter ${newData.player_one.name}'s Counter! Heartbreaking`
                if (player_one_initiative > player_two_initiative) {
                    await attackCompiler(newData, player_one_action);
                    await p2AttackCompiler(newData, player_two_action);
                } else {
                    await p2AttackCompiler(newData, player_two_action);
                    await attackCompiler(newData, player_one_action);
                }
        }
    } 


    // Partially Resolves Player: Counter + Countering the Computer
        // If Player Counters the Computer w/o the Enemy Countering
    if (player_one_action === 'counter' && player_two_action !== 'counter') {
        if (player_one_counter === player_two_action) {
            newData.player_one_counter_success = true;
            newData.player_one_special_description = 
                `${newData.player_one.name} successfully Counters ${newData.player_two.name}'s ${ newData.player_two_action === 'attack' ? 'Focused' : newData.player_two_action.charAt(0).toUpperCase() + newData.player_two_action.slice(1) } Attack.`
            await attackCompiler(newData, player_one_action)
            await faithFinder(newData, player_one_action, player_two_action);
            return newData
        } else {
            newData.player_one_special_description = 
                `${newData.player_one.name} fail to Counter ${newData.player_two.name}'s ${ newData.player_two_action === 'attack' ? 'Focused' : newData.player_two_action.charAt(0).toUpperCase() + newData.player_two_action.slice(1) } Attack. Heartbreaking!`
        }
    }

    if (player_two_action === 'counter' && player_one_action !== 'counter') {
        if (player_two_counter === player_one_action) {
            newData.player_two_counter_success = true;
            newData.player_two_special_description = 
                `${newData.player_two.name} successfully Counters ${newData.player_one.name}'s ${ newData.action === 'attack' ? 'Focused' : newData.action.charAt(0).toUpperCase() + newData.action.slice(1) } Attack.`
            await p2AttackCompiler(newData, player_two_action)
            await faithFinder(newData, player_one_action, player_two_action);
            return newData
        } else {
            newData.player_two_special_description = 
                `${newData.player_two.name} fails to Counter ${newData.player_one.name}'s ${ newData.action === 'attack' ? 'Focused' : newData.action.charAt(0).toUpperCase() + newData.action.slice(1) } Attack. Heartbreaking!`
        }
    }


    
    if (player_one_action === 'dodge' && player_two_action === 'dodge') { // If both choose Dodge
        if (player_one_initiative > player_two_initiative) {
            newData.player_one_special_description = 
                `${newData.player_one.name} successfully Dodge ${newData.player_two.name}'s ${  newData.player_two_action === 'attack' ? 'Focused' : newData.player_two_action.charAt(0).toUpperCase() + newData.player_two_action.slice(1) } Attack`
            await attackCompiler(newData, player_one_action)
        } else {
            `${newData.player_two.name} successfully Dodges ${newData.player_one.name}'s ${  newData.action === 'attack' ? 'Focused' : newData.action.charAt(0).toUpperCase() + newData.action.slice(1) } Attack`
            await p2AttackCompiler(newData, player_two_action)
        }
    }

    // If the Player Dodges and the Computer does not *Counter or Dodge  *Checked for success
    if (player_one_action === 'dodge' && player_two_action !== 'dodge') {
        newData.player_one_special_description = 
            `${newData.player_one.name} successfully Dodge ${newData.player_two.name}'s ${ newData.player_two_action === 'attack' ? 'Focused' : newData.player_two_action.charAt(0).toUpperCase() + newData.player_two_action.slice(1) } Attack`
        await attackCompiler(newData, player_one_action)
        await faithFinder(newData, player_one_action, player_two_action);
        return newData
    }

    // If the Computer Dodges and the Player does not *Counter or Dodge *Checked for success
    if (player_two_action === 'dodge' && player_one_action !== 'dodge') {
        `${newData.player_two.name} successfully Dodges ${newData.player_one.name}'s ${ newData.action === 'attack' ? 'Focused' : newData.action.charAt(0).toUpperCase() + newData.action.slice(1) } Attack`
        await p2AttackCompiler(newData, player_two_action)
        await faithFinder(newData, player_one_action, player_two_action);
        return newData
    }

    if (player_one_action === 'roll' && player_two_action === 'roll') { // If both choose Roll
        await doubleRollCompiler(newData, player_one_initiative, player_two_initiative, player_one_action, player_two_action)
    }

    if (player_one_action === 'roll' && player_two_action !== 'roll') {
        await p1RollCompiler(newData, player_one_initiative, player_two_initiative, player_one_action, player_two_action)
        if (newData.player_one_roll_success === true) {
            await faithFinder(newData, player_one_action, player_two_action);
            return newData
        }
    }

    if (player_two_action === 'roll' && player_one_action !== 'roll') {
        await p2RollCompiler(newData, player_one_initiative, player_two_initiative, player_one_action, player_two_action)
        if (newData.player_two_roll_success === true) {
            await faithFinder(newData, player_one_action, player_two_action);
            return newData
        }
    }

    if (player_one_action === 'attack' || player_one_action === 'posture' || player_two_action === 'attack' || player_two_action === 'posture') { // If both choose Attack
        if (player_one_initiative > player_two_initiative) {
            await attackCompiler(newData, player_one_action)
            // if (player_two_action === 'attack' || player_two_action === 'posture') {
                await p2AttackCompiler(newData, player_two_action)
            // }
        } else {
            // if (player_two_action === 'attack' || player_two_action === 'posture') {
                await p2AttackCompiler(newData, player_two_action)
            // }
            await attackCompiler(newData, player_one_action)
        }
    }

    await faithFinder(newData, player_one_action, player_two_action);
    
    if (newData.player_one_win === true) {
        newData.player_two_death_description = 
            `${newData.player_two.name} has been defeated. Hail ${newData.player_one.name}, the new va'Esai!`
    }
    if (newData.player_two_win === true) {
        newData.player_one_death_description = 
            `${newData.player_one.name} has been defeated. Hail ${newData.player_two.name}, the new va'Esai!`
    }
    

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
        // res.status(400).json({ err })
        console.log(err, 'Error ni PvP!')
    }
}

module.exports = {
    actionCompiler
}