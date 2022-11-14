
// =================================== HELPER CONSTANTS ======================================= \\


// =================================== HELPER FUNCTIONS ======================================= \\

const faithFinder = async (combatData, player_action, computer_action) => { // The influence will add a chance to have a special effect occur
    let faith_number = Math.floor(Math.random() * 101);
    let faith_number_two = Math.floor(Math.random() * 101);
    let faith_check = Math.floor(Math.random() * 101);
    let computer_faith_number = Math.floor(Math.random() * 101);
    let computer_faith_number_two = Math.floor(Math.random() * 101);

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
    }
    if (combatData.player.faith === 'adherent' && combatData.weapons[0].influences[0] !== 'Daethos') {
        faith_number += 5;
        faith_number_two += 5;
    }

    if (combatData.computer.faith === 'devoted' && combatData.computer_weapons[0].influences[0] === 'Daethos') {
        computer_faith_number += 5;
        computer_faith_number_two += 5;
    }
    if (combatData.computer.faith === 'adherent' && combatData.computer_weapons[0].influences[0] !== 'Daethos') {
        computer_faith_number += 5;
        computer_faith_number_two += 5;
    }
    console.log(combatData.weapons[0].influences[0], combatData.weapons[1].influences[0])
    console.log(combatData.player.name, `'s Faith #`, faith_number, `Faith #2`, faith_number_two, `Dual Wielding?`, combatData.dual_wielding)

    console.log(combatData.computer_weapons[0].influences[0], combatData.computer_weapons[1].influences[0])
    console.log(combatData.computer.name, `'s Faith #`, computer_faith_number, `Faith #2`, computer_faith_number_two, `Dual Wielding?`, combatData.dual_wielding)
    if (faith_number > 85) {
        combatData.religious_success = true;
        if (combatData.weapons[0].influences[0] === 'Daethos') { // God
            console.log('Daethos!')
            let daethos = (combatData.player_attributes.totalAchre + combatData.player_attributes.totalCaeren) / 2;
            combatData.new_player_health += combatData.realized_player_damage;
            combatData.player_influence_description = 
                `Daethos wraps through your Caer, ${combatData.weapons[0].name} healing you for ${Math.round(combatData.realized_player_damage)}. A faint echo of Caeren lingers for ${daethos} Righteously Spooky Damage.`    
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
    }
        if (combatData.weapons[0].influences[0] === 'Achreo') { // Wild
            console.log('Achreo!')
            // combatData.weapons[0].critical_chance = Number(combatData.weapons[0].critical_chance + 1);
            combatData.player_influence_description = 
                `Your Caer stirs Achreo, much to his own surprise.`
            combatData.weapons[0].physical_damage += 1;
            combatData.weapons[0].magical_damage += 1;
            combatData.weapons[0].critical_chance += 1;
            combatData.weapons[0].critical_damage += 0.1;
        }
        if (combatData.weapons[0].influences[0] === "Ahn've") { // Wind
            console.log("Achreo!")
            combatData.player_influence_description = 
                `Your Caer ushers forth Ahn've, a devastating storm posseses you.`
            player_action = 'attack';
            await attackCompiler(combatData, player_action)
        }
        if (combatData.weapons[0].influences[0] === 'Astra') { // Lightning
            console.log("Astra!")
            combatData.player_influence_description = 
                `Your Caer ushers forth the favor of Astra's Lightning, quickening you.`
            combatData.weapons[0].critical_chance += 3;
        }
        if (combatData.weapons[0].influences[0] === 'Cambire') { // Potential
            console.log("Cambire!")
            combatData.player_influence_description = 
                `Your Caer ushers forth the Chance of Cambire.`
            player_action = 'attack';
            await attackCompiler(combatData, player_action)    
        }
        if (combatData.weapons[0].influences[0] === 'Chiomyr') { // Humor
            console.log("Chiomyr!")
            combatData.weapons[0].physical_penetration += 2;
            combatData.weapons[0].magical_penetration += 2;
        }
        if (combatData.weapons[0].influences[0] === 'Fyer') { // Fire
            console.log("Fyer!")
            combatData.player_influence_description = 
                `Your Caer ushers forth the favor of Fyer igniting through you.`
            combatData.weapons[0].critical_damage += 0.6;
        }
        if (combatData.weapons[0].influences[0] === 'Ilios') { // Sun
            console.log("Ilios!")
            combatData.player_influence_description = 
                `The Hush of Ilios bursts into you through your ${combatData.weapons[0].name}.`
            player_action = 'attack';   
            combatData.weapons[0].magical_penetration += 1;
            combatData.weapons[0].physical_penetration += 1;
            combatData.player_defense.physicalDefenseModifier += 1;
            combatData.player_defense.magicalDefenseModifier += 1;
        }
        if (combatData.weapons[0].influences[0] === "Kyn'gi") { // Hunt
            console.log("Kyn'gi!")
            combatData.player_influence_description = 
                `Your keening Caer shrieks into Kyn'gi, emboldening the Hunt.`
            combatData.weapons[0].roll += 2;
            combatData.weapons[0].critical_chance += 2;
        }
        if (combatData.weapons[0].influences[0] === "Kyrisos") { // Gold
            console.log("Kyrisos!")
            combatData.player_influence_description = 
                `The Caer of Kyrisos imbues you with Kyosir!`
            combatData.player_attributes.kyosirMod += 2;
        }
        if (combatData.weapons[0].influences[0] === "Kyr'na") { // Time
            console.log("Kyr'na!")
            let kyrna = 50 + combatData.player_attributes.totalAchre;
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
            let lilos = 50 + combatData.player_attributes.totalCaeren;
            combatData.player_influence_description = 
                `Lilos breathes her Cear into ${combatData.player.name}, healing you for ${lilos}.`
            combatData.new_player_health += lilos;
            combatData.current_player_health += lilos;
        }
        if (combatData.weapons[0].influences[0] === "Ma'anre") { // Moon
            console.log("Ma'anre!")
            combatData.player_influence_description = 
                `Ma'anre wraps her tendrils about your ${combatData.weapons[0].name}, changing your perception of this world.` 
            combatData.weapons[0].roll += 1;
            combatData.weapons[0].dodge -= 1;
            combatData.weapons[0].critical_chance += 1;
            combatData.weapons[0].critical_damage += 0.1;
        }
        if (combatData.weapons[0].influences[0] === "Nyrolus") { // Water
            console.log("Nyrolus!")
            combatData.player_influence_description = 
                `Your mercurial weapon intrigues Nyrolus, swarming you in their Caer.`
            combatData.player_defense.physicalDefenseModifier += 2;
            combatData.player_defense.magicalDefenseModifier += 2;
        }
        if (combatData.weapons[0].influences[0] === "Quor'ei") { // Earth
            console.log("Quor'ei!")
            combatData.player_influence_description = 
                `Your resolve beckons with the favor of your Quor'ei, steeling you in their Caer.`
            combatData.player_defense.physicalDefenseModifier += 2;
            combatData.player_defense.magicalDefenseModifier += 2;
        }
        if (combatData.weapons[0].influences[0] === "Rahvre") { // Dreams
            console.log("Rahvre!")
            combatData.player_influence_description = 
            `Your calming Caer reaches its tendrils to Rahvre, intertwining you.`
        combatData.weapons[0].magical_damage += 3;
        }
        if (combatData.weapons[0].influences[0] === "Senari") { // Wisdom
            console.log("Senari!")
            combatData.player_influence_description = 
                `Your calm swirls with the favor of Senari, holding you in her Caer.`
            combatData.weapons[0].roll += 2;
            combatData.weapons[0].dodge -= 2;
        }
        if (combatData.weapons[0].influences[0] === "Se'dyro") { // Iron
            console.log("Se'dyro!")
            combatData.player_influence_description = 
                `The Caer of Se'dyro sings into your ${combatData.weapons[0].name}, causing it to frenzy!`    
            player_action = 'attack';
            await attackCompiler(combatData, player_action)
        }
        if (combatData.weapons[0].influences[0] === "Se'vas") { // War
            console.log("Se'vas!")
            combatData.player_influence_description = 
                `The Caer of Se'vas scorns your ${combatData.weapons[0].name}, scarring it with the beauty of war.` 
            combatData.weapons[0].critical_chance += 2;
            combatData.weapons[0].critical_damage += 0.2;
        }
        if (combatData.weapons[0].influences[0] === "Shrygei") { // Song
    
        }
        if (combatData.weapons[0].influences[0] === "Tshaer") { // Animal
            console.log("Tshaer!")
            combatData.player_influence_description = 
                `Your fervor unleashes the bestial nature of Tshaer within you.`
            combatData.weapons[0].physical_damage += 3;
        }
    }
    if (combatData.dual_wielding === true) {
        if (faith_number_two > 85) {
            combatData.religious_success = true;
            if (combatData.weapons[1].influences[0] === 'Daethos') { // God
                console.log("Daethos!")
                let daethos = (combatData.player_attributes.totalAchre + combatData.player_attributes.totalCaeren) / 2;
                combatData.new_player_health += combatData.realized_player_damage;
                combatData.player_influence_description = 
                    `Daethos wraps through your Caer, ${combatData.weapons[1].name} healing you for ${Math.round(combatData.realized_player_damage)}. A faint echo of Caeren lingers for ${daethos} Righteously Spooky Damage.`    
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
        }
            if (combatData.weapons[1].influences[0] === 'Achreo') { // Wild
                console.log("Achreo!")
                combatData.player_influence_description = 
                    `Your Caer stirs Achreo, much to his own surprise.`
                combatData.weapons[1].physical_damage += 1;
                combatData.weapons[1].magical_damage += 1;
                combatData.weapons[1].critical_chance += 1;
                combatData.weapons[1].critical_damage += 0.1;
            }
            if (combatData.weapons[1].influences[0] === "Ahn've") { // Wind
                console.log("Ahn've!")
                combatData.player_influence_description = 
                    `Your Caer ushers forth Ahn've, a devastating storm posseses you.`
                player_action = 'attack';
                await attackCompiler(combatData, player_action)
            }
            if (combatData.weapons[1].influences[0] === 'Astra') { // Lightning
                combatData.player_influence_description = 
                    `Your Caer ushers forth the favor of Astra's Lightning, quickening you.`
                combatData.weapons[1].critical_chance += 3;
            }
            if (combatData.weapons[1].influences[0] === 'Cambire') { // Potential
                combatData.player_influence_description = 
                    `Your Caer ushers forth the Chance of Cambire.`
                player_action = 'attack';
                await attackCompiler(combatData, player_action)    
            }
            if (combatData.weapons[1].influences[0] === 'Chiomyr') { // Humor
                combatData.weapons[1].physical_penetration += 2;
                combatData.weapons[1].magical_penetration += 2;
            }
            if (combatData.weapons[1].influences[0] === 'Fyer') { // Fire
                combatData.player_influence_description = 
                    `Your Caer ushers forth the favor of Fyer igniting through you.`
                combatData.weapons[1].critical_damage += 0.6;
            }
            if (combatData.weapons[1].influences[0] === 'Ilios') { // Sun
                combatData.player_influence_description = 
                    `The Hush of Ilios bursts into you through your ${combatData.weapons[1].name}.`
                player_action = 'attack';   
                combatData.weapons[1].magical_penetration += 1;
                combatData.weapons[1].physical_penetration += 1;
                combatData.player_defense.physicalDefenseModifier += 1;
                combatData.player_defense.magicalDefenseModifier += 1;
            }
            if (combatData.weapons[1].influences[0] === "Kyn'gi") { // Hunt
                combatData.player_influence_description = 
                    `Your keen Caer shrieks into Kyn'gi, emboldening the Hunt.`
                combatData.weapons[1].roll += 2;
                combatData.weapons[1].critical_chance += 2;
            }
            if (combatData.weapons[1].influences[0] === "Kyrisos") { // Gold
                combatData.player_influence_description = 
                    `The Caer of Kyrisos imbues you with Kyosir!`
                combatData.player_attributes.kyosirMod += 2;
            }
            if (combatData.weapons[1].influences[0] === "Kyr'na") { // Time
                let kyrna = 50 + combatData.player_attributes.totalAchre;
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
            if (combatData.weapons[1].influences[0] === "Lilos") { // Life
                let lilos = 50 + combatData.player_attributes.totalCaeren;
                combatData.player_influence_description = 
                    `Lilos breathes her Caer into ${combatData.player.name}, healing you for ${lilos}.`
                combatData.new_player_health += lilos;
                combatData.current_player_health += lilos;
            }
            if (combatData.weapons[1].influences[0] === "Ma'anre") { // Moon
                combatData.player_influence_description = 
                    `Ma'anre wraps her tendrils about your ${combatData.weapons[1].name}, changing your perception of this world.` 
                combatData.weapons[1].roll += 1;
                combatData.weapons[1].dodge -= 1;
                combatData.weapons[1].critical_chance += 1;
                combatData.weapons[1].critical_damage += 0.1;
            }
            if (combatData.weapons[1].influences[0] === "Nyrolus") { // Water
                combatData.player_influence_description = 
                    `Your mercurial weapon intrigues Nyrolus, swarming you in their Caer.`
                combatData.player_defense.physicalDefenseModifier += 2;
                combatData.player_defense.magicalDefenseModifier += 2;
            }
            if (combatData.weapons[1].influences[0] === "Quor'ei") { // Earth
                combatData.player_influence_description = 
                    `Your resolve beckons with the favor of your Quor'ei, steeling you in their Caer.`
                combatData.player_defense.physicalDefenseModifier += 2;
                combatData.player_defense.magicalDefenseModifier += 2;
            }
            if (combatData.weapons[1].influences[0] === "Rahvre") { // Dreams
                combatData.player_influence_description = 
                `Your calming Caer reaches its tendrils to Rahvre, intertwining you.`
            combatData.weapons[1].magical_damage += 3;
            }
            if (combatData.weapons[1].influences[0] === "Senari") { // Wisdom
                combatData.player_influence_description = 
                    `Your calm swirls with the favor of Senari, holding you in her Caer.`
                combatData.weapons[1].roll += 2;
                combatData.weapons[1].dodge -= 2;
            }
            if (combatData.weapons[1].influences[0] === "Se'dyro") { // Iron
                combatData.player_influence_description = 
                    `The Caer of Se'dyro sings into your ${combatData.weapons[1].name}, causing it to frenzy!`    
                player_action = 'attack';
                await attackCompiler(combatData, player_action)
            }
            if (combatData.weapons[1].influences[0] === "Se'vas") { // War
                combatData.player_influence_description = 
                    `The Caer of Se'vas scorns your ${combatData.weapons[1].name}, scarring it with the beauty of war.` 
                combatData.weapons[1].critical_chance += 2;
                combatData.weapons[1].critical_damage += 0.2;
            }
            if (combatData.weapons[1].influences[0] === "Shrygei") { // Song
        
            }
            if (combatData.weapons[1].influences[0] === "Tshaer") { // Animal
                combatData.player_influence_description = 
                    `Your Caer unleashes the bestial nature of Tshaer within you.`
                combatData.weapons[1].physical_damage += 3;
            }
        }
    }

    if (computer_faith_number > 85) {
        combatData.computer_religious_success = true;
        if (combatData.computer_weapons[0].influences[0] === 'Daethos') { // God
            console.log('Daethos!')
            let daethos = (combatData.computer_attributes.totalAchre + combatData.computer_attributes.totalCaeren) / 2;
            combatData.new_computer_health += combatData.realized_computer_damage;
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
    }
        if (combatData.computer_weapons[0].influences[0] === 'Achreo') { // Wild
            console.log('Achreo!')
            // combatData.computer_weapons[0].critical_chance = Number(combatData.computer_weapons[0].critical_chance + 1);
            combatData.computer_influence_description = 
                `${combatData.computer.name}'s Caer stirs Achreo, much to his own surprise.`
            combatData.computer_weapons[0].physical_damage += 1;
            combatData.computer_weapons[0].magical_damage += 1;
            combatData.computer_weapons[0].critical_chance += 1;
            combatData.computer_weapons[0].critical_damage += 0.1;
        }
        if (combatData.computer_weapons[0].influences[0] === "Ahn've") { // Wind
            console.log("Achreo!")
            combatData.computer_influence_description = 
                `${combatData.computer.name}'s Caer ushers forth Ahn've, a devastating storm posseses them.`
            player_action = 'attack';
            await attackCompiler(combatData, player_action)
        }
        if (combatData.computer_weapons[0].influences[0] === 'Astra') { // Lightning
            console.log("Astra!")
            combatData.computer_influence_description = 
                `${combatData.computer.name}'s Caer ushers forth the favor of Astra's Lightning, quickening them.`
            combatData.computer_weapons[0].critical_chance += 3;
        }
        if (combatData.computer_weapons[0].influences[0] === 'Cambire') { // Potential
            console.log("Cambire!")
            combatData.computer_influence_description = 
                `${combatData.computer.name}'s Caer ushers forth the Chance of Cambire.`
            player_action = 'attack';
            await attackCompiler(combatData, player_action)    
        }
        if (combatData.computer_weapons[0].influences[0] === 'Chiomyr') { // Humor
            console.log("Chiomyr!")
            combatData.computer_weapons[0].physical_penetration += 2;
            combatData.computer_weapons[0].magical_penetration += 2;
        }
        if (combatData.computer_weapons[0].influences[0] === 'Fyer') { // Fire
            console.log("Fyer!")
            combatData.computer_influence_description = 
                `${combatData.computer.name}'s Caer ushers forth the favor of Fyer igniting through them.`
            combatData.computer_weapons[0].critical_damage += 0.6;
        }
        if (combatData.computer_weapons[0].influences[0] === 'Ilios') { // Sun
            console.log("Ilios!")
            combatData.computer_influence_description = 
                `The Hush of Ilios bursts into ${combatData.computer.name} through their ${combatData.computer_weapons[0].name}.`
            player_action = 'attack';   
            combatData.computer_weapons[0].magical_penetration += 1;
            combatData.computer_weapons[0].physical_penetration += 1;
            combatData.computer_defense.physicalDefenseModifier += 1;
            combatData.computer_defense.magicalDefenseModifier += 1;
        }
        if (combatData.computer_weapons[0].influences[0] === "Kyn'gi") { // Hunt
            console.log("Kyn'gi!")
            combatData.computer_influence_description = 
                `${combatData.computer.name}'s keening Caer shrieks into Kyn'gi, emboldening the Hunt.`
            combatData.computer_weapons[0].roll += 2;
            combatData.computer_weapons[0].critical_chance += 2;
        }
        if (combatData.computer_weapons[0].influences[0] === "Kyrisos") { // Gold
            console.log("Kyrisos!")
            combatData.computer_influence_description = 
                `The Caer of Kyrisos imbues ${combatData.computer.name}'s with Kyosir!`
            combatData.computer_attributes.kyosirMod += 2;
        }
        if (combatData.computer_weapons[0].influences[0] === "Kyr'na") { // Time
            console.log("Kyr'na!")
            let kyrna = 50 + combatData.computer_attributes.totalAchre;
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
            let lilos = 50 + combatData.computer_attributes.totalCaeren;
            combatData.computer_influence_description = 
                `Lilos breathes her Cear into ${combatData.player.name}, healing ${combatData.computer.name} for ${lilos}.`
            combatData.new_computer_health += lilos;
            combatData.current_computer_health += lilos;
        }
        if (combatData.computer_weapons[0].influences[0] === "Ma'anre") { // Moon
            console.log("Ma'anre!")
            combatData.computer_influence_description = 
                `Ma'anre wraps her tendrils about ${combatData.computer.name}'s ${combatData.computer_weapons[0].name}, changing their perception of this world.` 
            combatData.computer_weapons[0].roll += 1;
            combatData.computer_weapons[0].dodge -= 1;
            combatData.computer_weapons[0].critical_chance += 1;
            combatData.computer_weapons[0].critical_damage += 0.1;
        }
        if (combatData.computer_weapons[0].influences[0] === "Nyrolus") { // Water
            console.log("Nyrolus!")
            combatData.computer_influence_description = 
                `${combatData.computer.name}'s mercurial weapon intrigues Nyrolus, swarming them in their Caer.`
            combatData.computer_defense.physicalDefenseModifier += 2;
            combatData.computer_defense.magicalDefenseModifier += 2;
        }
        if (combatData.computer_weapons[0].influences[0] === "Quor'ei") { // Earth
            console.log("Quor'ei!")
            combatData.computer_influence_description = 
                `${combatData.computer.name}'s resolve beckons with the favor of your Quor'ei, steeling them in their Caer.`
            combatData.computer_defense.physicalDefenseModifier += 2;
            combatData.computer_defense.magicalDefenseModifier += 2;
        }
        if (combatData.computer_weapons[0].influences[0] === "Rahvre") { // Dreams
            console.log("Rahvre!")
            combatData.computer_influence_description = 
            `${combatData.computer.name}'s calming Caer reaches its tendrils to Rahvre, intertwining them.`
        combatData.computer_weapons[0].magical_damage += 3;
        }
        if (combatData.computer_weapons[0].influences[0] === "Senari") { // Wisdom
            console.log("Senari!")
            combatData.computer_influence_description = 
                `${combatData.computer.name}'s calm swirls with the favor of Senari, holding them in her Caer.`
            combatData.computer_weapons[0].roll += 2;
            combatData.computer_weapons[0].dodge -= 2;
        }
        if (combatData.computer_weapons[0].influences[0] === "Se'dyro") { // Iron
            console.log("Se'dyro!")
            combatData.computer_influence_description = 
                `The Caer of Se'dyro sings into their ${combatData.computer_weapons[0].name}, causing it to frenzy!`    
            player_action = 'attack';
            await attackCompiler(combatData, player_action)
        }
        if (combatData.computer_weapons[0].influences[0] === "Se'vas") { // War
            console.log("Se'vas!")
            combatData.computer_influence_description = 
                `The Caer of Se'vas scorns their ${combatData.computer_weapons[0].name}, scarring it with the beauty of war.` 
            combatData.computer_weapons[0].critical_chance += 2;
            combatData.computer_weapons[0].critical_damage += 0.2;
        }
        if (combatData.computer_weapons[0].influences[0] === "Shrygei") { // Song
    
        }
        if (combatData.computer_weapons[0].influences[0] === "Tshaer") { // Animal
            console.log("Tshaer!")
            combatData.computer_influence_description = 
                `${combatData.computer.name}'s fervor unleashes the bestial nature of Tshaer within them.`
            combatData.computer_weapons[0].physical_damage += 3;
        }
    }
    if (combatData.computer_dual_wielding === true) {
        if (computer_faith_number_two > 85) {
            combatData.computer_religious_success = true;
            if (combatData.computer_weapons[1].influences[0] === 'Daethos') { // God
                console.log("Daethos!")
                let daethos = (combatData.computer_attributes.totalAchre + combatData.computer_attributes.totalCaeren) / 2;
                combatData.new_computer_health += combatData.realized_computer_damage;
                combatData.computer_influence_description = 
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
        }
            if (combatData.computer_weapons[1].influences[0] === 'Achreo') { // Wild
                console.log("Achreo!")
                combatData.computer_influence_description = 
                    `${combatData.computer.name}'s Caer stirs Achreo, much to his own surprise.`
                combatData.computer_weapons[1].physical_damage += 1;
                combatData.computer_weapons[1].magical_damage += 1;
                combatData.computer_weapons[1].critical_chance += 1;
                combatData.computer_weapons[1].critical_damage += 0.1;
            }
            if (combatData.computer_weapons[1].influences[0] === "Ahn've") { // Wind
                console.log("Ahn've!")
                combatData.computer_influence_description = 
                    `${combatData.computer.name}'s Caer ushers forth Ahn've, a devastating storm posseses them.`
                player_action = 'attack';
                await attackCompiler(combatData, player_action)
            }
            if (combatData.computer_weapons[1].influences[0] === 'Astra') { // Lightning
                combatData.computer_influence_description = 
                    `${combatData.computer.name}'s Caer ushers forth the favor of Astra's Lightning, quickening them.`
                combatData.computer_weapons[1].critical_chance += 3;
            }
            if (combatData.computer_weapons[1].influences[0] === 'Cambire') { // Potential
                combatData.computer_influence_description = 
                    `${combatData.computer.name}'s Caer ushers forth the Chance of Cambire.`
                player_action = 'attack';
                await attackCompiler(combatData, player_action)    
            }
            if (combatData.computer_weapons[1].influences[0] === 'Chiomyr') { // Humor
                combatData.computer_weapons[1].physical_penetration += 2;
                combatData.computer_weapons[1].magical_penetration += 2;
            }
            if (combatData.computer_weapons[1].influences[0] === 'Fyer') { // Fire
                combatData.computer_influence_description = 
                    `${combatData.computer.name}'s Caer ushers forth the favor of Fyer igniting through them.`
                combatData.computer_weapons[1].critical_damage += 0.6;
            }
            if (combatData.computer_weapons[1].influences[0] === 'Ilios') { // Sun
                combatData.computer_influence_description = 
                    `The Hush of Ilios bursts into ${combatData.computer.name} through their ${combatData.computer_weapons[1].name}.`
                player_action = 'attack';   
                combatData.computer_weapons[1].magical_penetration += 1;
                combatData.computer_weapons[1].physical_penetration += 1;
                combatData.computer_defense.physicalDefenseModifier += 1;
                combatData.computer_defense.magicalDefenseModifier += 1;
            }
            if (combatData.computer_weapons[1].influences[0] === "Kyn'gi") { // Hunt
                combatData.computer_influence_description = 
                    `${combatData.computer.name}'s keen Caer shrieks into Kyn'gi, emboldening the Hunt.`
                combatData.computer_weapons[1].roll += 2;
                combatData.computer_weapons[1].critical_chance += 2;
            }
            if (combatData.computer_weapons[1].influences[0] === "Kyrisos") { // Gold
                combatData.computer_influence_description = 
                    `The Caer of Kyrisos imbues ${combatData.computer.name}'s with Kyosir!`
                combatData.computer_attributes.kyosirMod += 2;
            }
            if (combatData.computer_weapons[1].influences[0] === "Kyr'na") { // Time
                let kyrna = 50 + combatData.computer_attributes.totalAchre;
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
            if (combatData.computer_weapons[1].influences[0] === "Lilos") { // Life
                let lilos = 50 + combatData.computer_attributes.totalCaeren;
                combatData.computer_influence_description = 
                    `Lilos breathes her Caer into ${combatData.player.name}, healing ${combatData.computer.name} for ${lilos}.`
                combatData.new_computer_health += lilos;
                combatData.current_computer_health += lilos;
            }
            if (combatData.computer_weapons[1].influences[0] === "Ma'anre") { // Moon
                combatData.computer_influence_description = 
                    `Ma'anre wraps her tendrils about ${combatData.computer.name}'s ${combatData.computer_weapons[1].name}, changing their perception of this world.` 
                combatData.computer_weapons[1].roll += 1;
                combatData.computer_weapons[1].dodge -= 1;
                combatData.computer_weapons[1].critical_chance += 1;
                combatData.computer_weapons[1].critical_damage += 0.1;
            }
            if (combatData.computer_weapons[1].influences[0] === "Nyrolus") { // Water
                combatData.computer_influence_description = 
                    `${combatData.computer.name}'s mercurial weapon intrigues Nyrolus, swarming them in their Caer.`
                combatData.computer_defense.physicalDefenseModifier += 2;
                combatData.computer_defense.magicalDefenseModifier += 2;
            }
            if (combatData.computer_weapons[1].influences[0] === "Quor'ei") { // Earth
                combatData.computer_influence_description = 
                    `${combatData.computer.name}'s resolve beckons with the favor of your Quor'ei, steeling them in their Caer.`
                combatData.computer_defense.physicalDefenseModifier += 2;
                combatData.computer_defense.magicalDefenseModifier += 2;
            }
            if (combatData.computer_weapons[1].influences[0] === "Rahvre") { // Dreams
                combatData.computer_influence_description = 
                `${combatData.computer.name}'s calming Caer reaches its tendrils to Rahvre, intertwining them.`
            combatData.computer_weapons[1].magical_damage += 3;
            }
            if (combatData.computer_weapons[1].influences[0] === "Senari") { // Wisdom
                combatData.computer_influence_description = 
                    `${combatData.computer.name}'s calm swirls with the favor of Senari, holding them in her Caer.`
                combatData.computer_weapons[1].roll += 2;
                combatData.computer_weapons[1].dodge -= 2;
            }
            if (combatData.computer_weapons[1].influences[0] === "Se'dyro") { // Iron
                combatData.computer_influence_description = 
                    `The Caer of Se'dyro sings into their ${combatData.computer_weapons[1].name}, causing it to frenzy!`    
                player_action = 'attack';
                await attackCompiler(combatData, player_action)
            }
            if (combatData.computer_weapons[1].influences[0] === "Se'vas") { // War
                combatData.computer_influence_description = 
                    `The Caer of Se'vas scorns their ${combatData.computer_weapons[1].name}, scarring it with the beauty of war.` 
                combatData.computer_weapons[1].critical_chance += 2;
                combatData.computer_weapons[1].critical_damage += 0.2;
            }
            if (combatData.computer_weapons[1].influences[0] === "Shrygei") { // Song
        
            }
            if (combatData.computer_weapons[1].influences[0] === "Tshaer") { // Animal
                combatData.computer_influence_description = 
                    `${combatData.computer.name}'s Caer unleashes the bestial nature of Tshaer within them.`
                combatData.computer_weapons[1].physical_damage += 3;
            }
        }
    }
    return combatData
}

// TODO: QueryFunctions -------
// FIXME: Weapon -> Grip / Attack Type / Damage Type
// FIXME: Attack ? Weapon[0].grip: 1h ? weapon[0].attack_type === 'Physical' ?  
// So I need to do some wild nesting and if statements which suck unfortunately
// So what's the first thing that needs to be resolved? Presumably who goes first!
// This is solved with initiative, but what if someone with low initiative rolls against high?
// Should initiative be used as the trump card if the actions are the same?
// Sort of like if both parties guessed the other was countering, the person with first initiative gets priority?
// So at beginning of action splitter, it'll evaluate player and computer action
// Hierarchy is... 
// COUNTER >>> DODGE >>> ROLL >>> POSTURE >>> ATTACK
// Add difference between Initiatives for roll % ONLY IF person not rolling has higher?
// 
// 
// 

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
        armor_rating: (newData.computer_defense.physicalPosture + newData.computer_defense.magicalPosture)  / 4,
    }

    if (player_action === 'attack') { 
        if (computerActions.roll_rating > computerActions.armor_rating) {
            newData.roll_weight += 2
        } else {
            newData.posture_weight += 2
        }
        // newData.counter_weight += 1 
        newData.attack_weight -= 2
        newData.counter_attack_weight += 2
        newData.counter_counter_weight -= 1
        newData.counter_dodge_weight -= 1
    }
    if (player_action === 'counter') { 
        newData.counter_weight += 2  
        newData.posture_weight -= 1
        newData.roll_weight -= 1
        newData.counter_counter_weight += 2
        newData.counter_attack_weight -= 1
        newData.counter_dodge_weight -= 1
    }
    if (player_action === 'dodge') { 
        newData.counter_dodge_weight += 4
        newData.counter_attack_weight -= 1
        newData.counter_counter_weight -= 1
        newData.counter_posture_weight -= 1
        newData.counter_roll_weight -= 1
    }
    if (player_action === 'posture') { 
        newData.attack_weight += 1  
        newData.posture_weight -= 2
        newData.counter_weight += 1
        newData.counter_posture_weight += 3
        newData.counter_roll_weight -= 2
        newData.counter_attack_weight -= 1
    }

    if (player_action === 'roll') { 
        newData.attack_weight += 1  
        newData.roll_weight -= 2
        newData.counter_weight += 1
        newData.counter_roll_weight += 3
        newData.counter_posture_weight -= 2
        newData.counter_attack_weight -= 1
    }

    // const computerAction = async (computerActions) => {

    let actionNumber = Math.floor(Math.random() * 101);
    if (actionNumber > (100 - computerActions.attack)) {
        computer_action = 'attack'
    } else if (actionNumber > (100 - computerActions.attack - computerActions.counter)) {
        computer_action = 'counter'
    } else if (actionNumber > (100 - computerActions.attack - computerActions.counter - computerActions.dodge)) {
        computer_action = 'dodge'
    } else if (actionNumber > (100 - computerActions.attack - computerActions.counter - computerActions.dodge - computerActions.posture)) {
        computer_action = 'posture'
    } else {
        computer_action = 'roll'
    }

    if (computer_action === 'counter') {
        let counterNumber = Math.floor(Math.random() * 101);
        if (counterNumber > (100 - computerActions.counter_attack)) {
            computer_counter = 'attack'
        } else if (counterNumber > (100 - computerActions.counter_attack - computerActions.counter_counter)) {
            computer_counter = 'counter'
        } else if (counterNumber > (100 - computerActions.counter_attack - computerActions.counter_counter - computerActions.counter_dodge)) {
            computer_counter = 'dodge'
        } else if (counterNumber > (100 - computerActions.counter_attack - computerActions.counter_counter - computerActions.counter_dodge - computerActions.counter_posture)) {
            computer_counter = 'posture'
        } else {
            computer_counter = 'roll'
        }
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
    
    console.log(player_physical_defense_multiplier, player_magical_defense_multiplier, 'Player Defenses in Computer Dual Wield')
    // console.log(weapons, 'Computer Weapons in Dual Wield Compiler')

    // This is for Critical Strikes
    if (weapons[0].critical_chance > Math.floor(Math.random() * 101)) {
        // console.log('Comp DW1 Critical Firing', computer_weapon_one_physical_damage, computer_weapon_one_magical_damage)
        computer_weapon_one_physical_damage *= weapons[0].critical_damage;
        computer_weapon_one_magical_damage *= weapons[0].critical_damage;
        // if (combatData.weapons[1].critical_chance > Math.floor(Math.random() * 101)) {
        //     await computerCriticalCompiler(combatData, computer_weapon_one_physical_damage, computer_weapon_one_magical_damage)
        //     await computerCriticalCompiler(combatData, computer_weapon_two_physical_damage, computer_weapon_two_magical_damage)
        //     firstWeaponCrit = true;
        //     secondWeaponCrit = true;
        // } else {
            
        // await computerCriticalCompiler(combatDatacombatData, computer_weapon_one_physical_damage, computer_weapon_one_magical_damage)
        console.log('Comp DW1 Post-Crit Firing', computer_weapon_one_physical_damage, computer_weapon_one_magical_damage)
        firstWeaponCrit = true;
        combatData.computer_critical_success = true;
        // }
    }

    if (weapons[1].critical_chance > Math.floor(Math.random() * 101)) {
        // console.log('Comp DW2 Critical Firing', computer_weapon_two_physical_damage, computer_weapon_two_magical_damage)
        computer_weapon_two_physical_damage *= weapons[1].critical_damage;
        computer_weapon_two_magical_damage *= weapons[1].critical_damage;
        //await computerCriticalCompiler(combatData, computer_weapon_two_physical_damage, computer_weapon_two_magical_damage)
        console.log('Comp DW2 Critical Firing', computer_weapon_two_physical_damage, computer_weapon_two_magical_damage)
        secondWeaponCrit = true;
        combatData.computer_critical_success = true;
    }
    
    console.log(firstWeaponCrit, secondWeaponCrit)

    computer_weapon_one_physical_damage *= (player_physical_defense_multiplier * (1 - (weapons[0].physical_penetration / 100 )));
    computer_weapon_one_magical_damage *= (player_magical_defense_multiplier * (1 - (weapons[0].magical_penetration  / 100 )));

    computer_weapon_two_physical_damage *= (player_physical_defense_multiplier * (1 - (weapons[1].physical_penetration / 100 )));
    computer_weapon_two_magical_damage *= (player_magical_defense_multiplier * (1 - (weapons[1].magical_penetration / 100 )));

    computer_weapon_one_total_damage = computer_weapon_one_physical_damage + computer_weapon_one_magical_damage;
    computer_weapon_two_total_damage = computer_weapon_two_physical_damage + computer_weapon_two_magical_damage;

    console.log(computer_weapon_one_total_damage, computer_weapon_two_total_damage);

    combatData.realized_computer_damage = computer_weapon_one_total_damage + computer_weapon_two_total_damage;
    if (combatData.realized_computer_damage < 0) {
        combatData.realized_computer_damage = 0;
    }
    combatData.new_player_health = combatData.current_player_health - combatData.realized_computer_damage;
    combatData.current_player_health = combatData.new_player_health; // Added to persist health totals?

    if (combatData.new_player_health < 0 || combatData.current_player_health <= 0) {
        combatData.new_player_health = 0;
        combatData.computer_win = true;
    }
    
    combatData.computer_action_description = 
        `${computer.name} dual-wield attacks you with ${weapons[0].name} and ${weapons[1].name} for ${Math.round(combatData.realized_computer_damage)} ${weapons[0].damage_type[0] ? weapons[0].damage_type[0] : ''}${weapons[0].damage_type[1] ? ' / ' + weapons[0].damage_type[1] : ''} and ${weapons[1].damage_type[0] ? weapons[1].damage_type[0] : ''}${weapons[1].damage_type[1] ? ' / ' + weapons[1].damage_type[1] : ''} ${firstWeaponCrit === true && secondWeaponCrit === true ? 'Critical Strike Damage' : firstWeaponCrit === true || secondWeaponCrit === true ? 'Partial Crit Damage' : 'Damage'}.`    
    return (
        combatData
    )
}

const computerAttackCompiler = async (combatData, computer_action) => {
    if (combatData.player_win === true) {
        combatData.computer_action_description = 
        `${combatData.computer.name} has been defeated. Hail ${combatData.player.name}, you are the new va'Esai!`
        return
    }
    console.log('Computer Attack Compiler Firing')
    let computer_physical_damage = combatData.computer_weapons[0].physical_damage;
    let computer_magical_damage = combatData.computer_weapons[0].magical_damage;
    let computer_total_damage;

    let player_physical_defense_multiplier = 1 - (combatData.player_defense.physicalDefenseModifier / 100);
    let player_magical_defense_multiplier = 1 - (combatData.player_defense.magicalDefenseModifier / 100);

    // This is for Players's who are Posturing
    if (combatData.action === 'posture') {
        player_physical_defense_multiplier = 1 - (combatData.player_defense.physicalPosture / 100);
        player_magical_defense_multiplier = 1 - (combatData.player_defense.magicalPosture / 100);
    }

    if (combatData.computer_action === 'attack') {
        if (combatData.computer_weapons[0].grip === 'One Hand') {
            if (combatData.computer_weapons[0].attack_type === 'Physical') {
                if (combatData.computer.mastery === 'Agility') {
                    if (combatData.computer_weapons[1].grip === 'One Hand') { // If you're Focusing Attack + 1h + Agi Mastery + 1h in Second Slot
                       combatData.computer_dual_wielding = true;
                        await computerDualWieldCompiler(combatData, player_physical_defense_multiplier, player_magical_defense_multiplier)
                        // Computer Dual Wield Compiler
                        return combatData
                    } else {
                        // Computer Double Attack Compiler
                        combatData.computer_dual_wielding = true;
                        await computerDoubleAttackCompiler(combatData)
                        return combatData
                    }
                } else {
                    computer_physical_damage *= 1.5;
                    computer_magical_damage *= 1.25;
                }
            } else {
                // If Focus + 1h But Magic
                if (combatData.computer.mastery === 'Achre') {
                    if (combatData.computer_weapons[1].grip === 'One Hand') { // Might be a dual-wield compiler instead to take the rest of it
                        combatData.computer_dual_wielding = true;
                        await computerDualWieldCompiler(combatData, player_physical_defense_multiplier, player_magical_defense_multiplier)
                        return combatData
                    }
                } else {
                    computer_physical_damage *= 1.25;
                    computer_magical_damage *= 1.5;
                }
            }
        } else { // Weapon is TWO HAND
            if (combatData.computer.mastery === 'Strength') {
                if (combatData.computer_attributes.totalStrength + combatData.computer_weapons[0].strength + combatData.computer_weapons[1].strength >= 60) { // Might be a dual-wield compiler instead to take the rest of it
                    combatData.computer_dual_wielding = true;
                    await computerDualWieldCompiler(combatData, player_physical_defense_multiplier, player_magical_defense_multiplier)
                    return combatData
                } else { // Less than 50 Srength 
                    computer_physical_damage *= 2.0;
                    computer_magical_damage *= 1.75;
                }
            }
            if (combatData.computer.mastery === 'Caeren') {
                if (combatData.computer_attributes.totalCaeren + combatData.computer_weapons[0].caeren + combatData.computer_weapons[1].caeren >= 60) {
                    combatData.computer_dual_wielding = true;
                    await computerDualWieldCompiler(combatData, player_physical_defense_multiplier, player_magical_defense_multiplier)
                    return combatData
                } else {
                    computer_physical_damage *= 1.75;
                    computer_magical_damage *= 2.0;
                }
            }
            if (combatData.computer_weapons[0].type === 'Bow') {
                if (combatData.computer.mastery === 'Agility' || combatData.computer.mastery === 'Achre') {
                    computer_physical_damage *= 2;
                    computer_magical_damage *= 2;
                }
            }
        }
    }

    // Checking For Player Actions
    if (computer_action === 'counter') {
        if (combatData.computer_counter_success === true) {
            computer_physical_damage *= 2.5;
            computer_magical_damage *= 2.5;    
        } else {
            computer_physical_damage *= 0.9;
            computer_magical_damage *= 0.9;
        }
    }

    if (computer_action === 'dodge') {
        computer_physical_damage *= 0.95;
        computer_magical_damage *= 0.95;
    }

    if (computer_action === 'posture') {
        computer_physical_damage *= 0.85;
        computer_magical_damage *= 0.85;
    }

    if (computer_action === 'roll' ) {
        computer_physical_damage *= 0.85;
        computer_magical_damage *= 0.85;
    }

    // This is for Critical Strikes
    if (combatData.computer_weapons[0].critical_chance > Math.floor(Math.random() * 101)) {
        computer_physical_damage *= combatData.computer_weapons[0].critical_damage;
        computer_magical_damage *= combatData.computer_weapons[0].critical_damage;
        // computerCriticalCompiler(combatData, combatData.weapons[0], computer_physical_damage, computer_magical_damage)
        // return combatData
        console.log('Computer Critical Post-Multiplier Inside Computer Attack Function', computer_physical_damage, computer_magical_damage);
        combatData.computer_critical_success = true;
    }

    // If you made it here, your basic attack now resolves itself
    computer_physical_damage *= (player_physical_defense_multiplier * (1 - (combatData.computer_weapons[0].physical_penetration / 100)));
    computer_magical_damage *= (player_magical_defense_multiplier * (1 - (combatData.computer_weapons[0].magical_penetration / 100)));

    computer_total_damage = computer_physical_damage + computer_magical_damage;
    if (computer_total_damage < 0) {
        computer_total_damage = 0;
    }
    combatData.realized_computer_damage = computer_total_damage;
    combatData.new_player_health = combatData.current_player_health - combatData.realized_computer_damage;
    combatData.current_player_health = combatData.new_player_health; // Added to persist health totals?

    combatData.computer_action_description = 
        `${combatData.computer.name} attacks you with their ${combatData.computer_weapons[0].name} for ${Math.round(computer_total_damage)} ${combatData.computer_weapons[0].damage_type[0] ? combatData.computer_weapons[0].damage_type[0] : ''}${combatData.computer_weapons[0].damage_type[1] ? ' / ' + combatData.computer_weapons[0].damage_type[1] : ''} ${combatData.computer_critical_success === true ? 'Critical Strike Damage' : 'Damage'}.`    

    if (combatData.new_player_health < 0 || combatData.current_player_health <= 0) {
        combatData.new_player_health = 0;
        combatData.computer_win = true;
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
        if (player_initiative > computer_initiative) {
            combatData.computer_special_description = 
                `${combatData.computer.name} fails to roll against your ${  player_action === 'attack' ? 'Focused' : player_action.charAt(0).toUpperCase() + player_action.slice(1) } Attack.`
            await computerAttackCompiler(combatData, computer_action)
            await attackCompiler(combatData, player_action)
        } else {
            console.log('Computer failed yet had higher initiative')
            combatData.computer_special_description = 
                `${combatData.computer.name} fails to roll against your ${  player_action === 'attack' ? 'Focused' : player_action.charAt(0).toUpperCase() + player_action.slice(1) } Attack.`
            await attackCompiler(combatData, player_action)
            await computerAttackCompiler(combatData, computer_action)
        }
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

    // This is for Critical Strikes
    if (combatData.weapons[0].critical_chance > Math.floor(Math.random() * 101)) {
            player_weapon_one_physical_damage *= combatData.weapons[0].critical_damage;
            player_weapon_one_magical_damage *= combatData.weapons[0].critical_damage;
            firstWeaponCrit = true;
            combatData.critical_success = true;
        console.log(player_weapon_one_physical_damage, player_weapon_one_magical_damage, 'Weapon 1 Post-Crit Modifier')
    }

    if (combatData.weapons[1].critical_chance > Math.floor(Math.random() * 101)) {
        player_weapon_two_physical_damage *= combatData.weapons[1].critical_damage;
        player_weapon_two_magical_damage *= combatData.weapons[1].critical_damage;
        // await criticalCompiler(combatData, combatData.weapons[1], player_weapon_two_physical_damage, player_weapon_two_magical_damage)
        secondWeaponCrit = true;
        combatData.critical_success = true;
        console.log(player_weapon_two_physical_damage, player_weapon_two_magical_damage, 'Weapon 2 Post-Crit Modifier')
    }

    player_weapon_one_physical_damage *= (computer_physical_defense_multiplier * (1 - (weapons[0].physical_penetration / 100)));
    player_weapon_one_magical_damage *= (computer_magical_defense_multiplier * (1 - (weapons[0].magical_penetration / 100)));

    player_weapon_one_physical_damage *= (computer_physical_defense_multiplier * (1 - (weapons[1].physical_penetration / 100)));
    player_weapon_one_magical_damage *= (computer_magical_defense_multiplier * (1 - (weapons[1].magical_penetration / 100)));

    player_weapon_one_total_damage = player_weapon_one_physical_damage + player_weapon_one_magical_damage;
    player_weapon_two_total_damage = player_weapon_two_physical_damage + player_weapon_two_magical_damage;

    combatData.realized_player_damage = player_weapon_one_total_damage + player_weapon_two_total_damage;
    if (combatData.realized_player_damage < 0) {
        combatData.realized_player_damage = 0;
    }
    combatData.new_computer_health = combatData.current_computer_health - combatData.realized_player_damage;
    combatData.current_computer_health = combatData.new_computer_health; // Added to persist health totals?

    if (combatData.new_computer_health <= 0 || combatData.current_computer_health <= 0) {
        combatData.new_computer_health = 0;
        combatData.player_win = true;
    }
    
    combatData.player_action_description = 
        `You dual-wield attack ${computer.name} with ${weapons[0].name} and ${weapons[1].name} for ${Math.round(combatData.realized_player_damage)} ${weapons[0].damage_type[0] ? weapons[0].damage_type[0] : ''}${weapons[0].damage_type[1] ? ' / ' + weapons[0].damage_type[1] : ''} and ${weapons[1].damage_type[0] ? weapons[1].damage_type[0] : ''}${weapons[1].damage_type[1] ? ' / ' + weapons[1].damage_type[1] : ''} ${firstWeaponCrit === true && secondWeaponCrit === true ? 'Critical Strike Damage' : firstWeaponCrit === true || secondWeaponCrit === true ? 'Partial Crit Damage' : 'Damage'}.`    
    console.log(combatData.realized_player_damage)
    return (
        combatData
    )
}
    
const attackCompiler = async (combatData, player_action) => {
    if (combatData.computer_win === true) {
        combatData.player_action_description = 
        `You have been defeated. Hail ${combatData.computer.name}, the new va'Esai!`
        return
    }
    console.log('In the Player Attack Compiler')
    let player_physical_damage = combatData.weapons[0].physical_damage;
    let player_magical_damage = combatData.weapons[0].magical_damage;
    let player_total_damage;

    let computer_physical_defense_multiplier = 1 - (combatData.computer_defense.physicalDefenseModifier / 100);
    let computer_magical_defense_multiplier = 1 - (combatData.computer_defense.magicalDefenseModifier / 100);
    
    // This is for Opponent's who are Posturing
    if (combatData.computer_action === 'posture') {
        computer_physical_defense_multiplier = 1 - (combatData.computer_defense.physicalPosture / 100);
        computer_magical_defense_multiplier = 1 - (combatData.computer_defense.magicalPosture / 100);
    }

    // TODO:FIXME:TODO:FIXME: May not do Damage Type Armor Modifiers Yet TODO:FIXME:TODO:FIXME:
    // checkDamageTypes(combatData)

    // This is for the Focused Attack Action i.e. you chose to Attack over adding a defensive component
    if (combatData.action === 'attack') {
        if (combatData.weapons[0].grip === 'One Hand') {
            if (combatData.weapons[0].attack_type === 'Physical') {
                if (combatData.player.mastery === 'Agility') {
                    if (combatData.weapons[1].grip === 'One Hand') { // If you're Focusing Attack + 1h + Agi Mastery + 1h in Second Slot
                        combatData.dual_wielding = true;
                        await dualWieldCompiler(combatData)
                        return combatData
                    } else {
                        player_physical_damage *= 1.5;
                        player_magical_damage *= 1.25;
                        // await doubleAttackCompiler(combatData)
                        // return combatData
                    }
                } else {
                    player_physical_damage *= 1.5;
                    player_magical_damage *= 1.25;
                }
            } else {
                // If Focus + 1h But Magic
                if (combatData.player.mastery === 'Achre') {
                    if (combatData.weapons[1].grip === 'One Hand') { // Might be a dual-wield compiler instead to take the rest of it
                        combatData.dual_wielding = true;
                        await dualWieldCompiler(combatData)
                        return combatData
                    }
                } else {
                    player_physical_damage *= 1.25;
                    player_magical_damage *= 1.5;
                }
            }
        } else if (combatData.weapons[0].grip === 'Two Hand') { // Weapon is TWO HAND
            console.log(combatData.weapons[0].grip, combatData.player.mastery, combatData.player_attributes.totalStrength)
            if (combatData.player.mastery === 'Strength') {
                if (combatData.player_attributes.totalStrength + combatData.weapons[0].strength  + combatData.weapons[1].strength >= 60) { // Might be a dual-wield compiler instead to take the rest of it
                    console.log('Did we make it here?')
                    combatData.dual_wielding = true;
                    await dualWieldCompiler(combatData)
                    return combatData
                } else { // Less than 40 Srength 
                    player_physical_damage *= 2.25;
                    player_magical_damage *= 1.75;
                }

            }
            if (combatData.player.mastery === 'Caeren') {
                if (combatData.player_attributes.totalCaeren + combatData.weapons[0].caeren + combatData.weapons[1].caeren >= 60) {
                    combatData.dual_wielding = true;
                    await dualWieldCompiler(combatData)
                        return combatData
                } else {
                    player_physical_damage *= 1.75;
                    player_magical_damage *= 2.25;
                }
            }
            if (combatData.weapons[0].type === 'Bow') {
                if (combatData.player.mastery === 'Agility' || combatData.player.mastery === 'Achre') {
                    player_physical_damage *= 2;
                    player_magical_damage *= 2;
                }
            }
        } else {
            player_physical_damage *= 1.25;
            player_magical_damage *= 1.25;
        }
    }

    // Checking For Player Actions
    if (player_action === 'counter') {
        if (combatData.counter_success === true) {
            player_physical_damage *= 2.5;
            player_magical_damage *= 2.5;
        } else {
            player_physical_damage *= 0.9;
            player_magical_damage *= 0.9;
        }
    }

    if (player_action === 'dodge') {
        player_physical_damage *= 0.95;
        player_magical_damage *= 0.95;
    }

    if (player_action === 'posture') {
        player_physical_damage *= 0.85;
        player_magical_damage *= 0.85;
    }

    if (player_action === 'roll' ) {
        if (combatData.roll_success === true) {
            player_physical_damage *= 1.1;
            player_magical_damage *= 1.1;
        } else {
            player_physical_damage *= 0.75;
            player_magical_damage *= 0.75;
        }
    }


    // This is for Critical Strikes
    if (combatData.weapons[0].critical_chance > Math.floor(Math.random() * 101)) {
        console.log('Player Critical Firing', player_physical_damage, player_magical_damage)
        player_physical_damage *= combatData.weapons[0].critical_damage;
        player_magical_damage *= combatData.weapons[0].critical_damage;
        // criticalCompiler(combatData, combatData.weapons[0], player_physical_damage, player_magical_damage)
        // return combatData
        console.log('Attack Compiler Post-Crit Multiplier', player_physical_damage, player_magical_damage)
        combatData.critical_success = true;
    }

    // If you made it here, your basic attack now resolves itself
    player_physical_damage *= (computer_physical_defense_multiplier * (1 - (combatData.weapons[0].physical_penetration / 100)));
    player_magical_damage *= (computer_magical_defense_multiplier * (1 - (combatData.weapons[0].magical_penetration / 100)));

    player_total_damage = player_physical_damage + player_magical_damage;
    if (player_total_damage < 0) {
        player_total_damage = 0;
    }
    combatData.realized_player_damage = player_total_damage;
    combatData.new_computer_health = combatData.current_computer_health - combatData.realized_player_damage;
    combatData.current_computer_health = combatData.new_computer_health; // Added to persist health totals?

    combatData.player_action_description = 
        `You attack ${combatData.computer.name} with your ${combatData.weapons[0].name} for ${Math.round(player_total_damage)} ${combatData.weapons[0].damage_type[0] ? combatData.weapons[0].damage_type[0] : ''}${combatData.weapons[0].damage_type[1] ? ' / ' + combatData.weapons[0].damage_type[1] : ''} ${combatData.critical_success === true ? 'Critical Strike Damage' : 'Damage'}.`    

    if (combatData.new_computer_health <= 0 || combatData.current_computer_health <= 0) {
        combatData.new_computer_health = 0;
        combatData.player_win = true;
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
        if (player_initiative > computer_initiative) {
            combatData.player_special_description =
            `You failed to roll against ${combatData.computer.name}'s ${  combatData.computer_action === 'attack' ? 'Focused' : combatData.computer_action.charAt(0).toUpperCase() + combatData.computer_action.slice(1) } Attack.`
            await attackCompiler(combatData, player_action)
            await computerAttackCompiler(combatData, computer_action)
        } else {
            combatData.player_special_description =
            `You failed to roll against ${combatData.computer.name}'s ${  combatData.computer_action === 'attack' ? 'Focused' : combatData.computer_action.charAt(0).toUpperCase() + combatData.computer_action.slice(1) } Attack.`
            await computerAttackCompiler(combatData, computer_action)
            await attackCompiler(combatData, player_action)
        }
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
        player_defense: combatData.player_defense, // Posseses Base + Postured Defenses
        player_attributes: combatData.player_attributes, // Possesses compiled Attributes, Initiative
        computer: combatData.computer, // Computer Enemy
        computer_attributes: combatData.computer_attributes, // Possesses compiled Attributes, Initiative
        computer_defense: combatData.computer_defense, // Posseses Base + Postured Defenses
        computer_action: '', // Action Chosen By Computer
        computer_counter_guess: '', // Comp's Counter Guess if Action === 'Counter'
        computer_weapons: combatData.computer_weapons,  // All 3 Weapons
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
        dual_wielding: false,
        computer_dual_wielding: false,
        roll_success: false,
        counter_success: false,
        computer_roll_success: false,
        computer_counter_success: false,
        player_win: false,
        computer_win: false,
        critical_success: false,
        computer_critical_success: false
    }
    // console.log(newData, 'Combat Data in the Action Splitter')
    const player_initiative = newData.player_attributes.initiative;
    const computer_initiative = newData.computer_attributes.initiative;
    let player_action = newData.action;
    const player_counter = newData.counter_guess;
    let computer_counter = newData.computer_counter_guess;
    let computer_action = newData.computer_action;
    let possible_choices = ['attack', 'posture', 'roll']
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
    
    if (newData.new_computer_health === 0) {
        newData.player_win = true;
    }
    if (newData.new_player_health === 0) {
        newData.computer_win = true;
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
        res.status(400).json({ err })
    }
}

module.exports = {
    actionCompiler
}