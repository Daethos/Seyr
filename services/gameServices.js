
// =================================== HELPER CONSTANTS ======================================= \\


// =================================== HELPER FUNCTIONS ======================================= \\

const faithFinder = async (combatData) => { // The influence will add a chance to have a special effect occur

    if (combatData.weapons[0].influences === 'Daethos') { // God

    }
    if (combatData.weapons[0].influences === 'Achreo') { // Wild
        
    }
    if (combatData.weapons[0].influences === "Ahn've") { // Wind

    }
    if (combatData.weapons[0].influences === 'Astra') { // Lightning
        
    }
    if (combatData.weapons[0].influences === 'Cambire') { // Potential

    }
    if (combatData.weapons[0].influences === 'Chiomyr') { // Humor
        
    }
    if (combatData.weapons[0].influences === 'Fyer') { // Fire

    }
    if (combatData.weapons[0].influences === 'Ilios') { // Sun
        
    }
    if (combatData.weapons[0].influences === "Kyn'gi") { // Hunt

    }
    if (combatData.weapons[0].influences === "Kyrisos") { // Gold

    }
    if (combatData.weapons[0].influences === "Kyr'na") { // Time

    }
    if (combatData.weapons[0].influences === "Lilos") { // Life

    }
    if (combatData.weapons[0].influences === "Ma'anre") { // Moon

    }
    if (combatData.weapons[0].influences === "Nyrolus") { // Water

    }
    if (combatData.weapons[0].influences === "Quor'ei") { // Earth

    }
    if (combatData.weapons[0].influences === "Rahvre") { // Dreams

    }
    if (combatData.weapons[0].influences === "Senari") { // Wisdom

    }
    if (combatData.weapons[0].influences === "Se'dyro") { // Iron

    }
    if (combatData.weapons[0].influences === "Se'vas") { // War

    }
    if (combatData.weapons[0].influences === "Shrygei") { // Song

    }
    if (combatData.weapons[0].influences === "Tshaer") { // Animal

    }
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

const computerAttackCompiler = async (combatData) => {

    return (
        console.log(combatData)
    )
}

const computerCounterCompiler = async (combatData) => {
    
    return (
        console.log(combatData)
    )
}

const computerPostureCompiler = async (combatData) => {
    
    return (
        console.log(combatData)
        )
    }
    
const computerRollCompiler = async (combatData) => {
    
    return (
        console.log(combatData)
    )
}

const dualWieldCompiler = async (combatData) => { // Triggers if 40+ Str/Caer for 2h, 1h + Agi/Achre Mastery and 2nd weapon is 1h
    let player_weapon_one_physical_damage = combatData.weapons[0].physical_damage;
    let player_weapon_one_magical_damage = combatData.weapons[0].magical_damage;
    let player_weapon_two_physical_damage = combatData.weapons[1].physical_damage;
    let player_weapon_two_magical_damage = combatData.weapons[1].magical_damage;
    let player_total_damage;
    
    let computer_physical_defense_multiplier = 1 - (combatData.computer_defense.physicalDefenseModifier / 100);
    let computer_magical_defense_multiplier = 1 - (combatData.computer_defense.magicalDefenseModifier / 100);
    
    return (
        console.log(combatData)
    )
}

const damageCompiler = async (combatData) => {
    let player_physical_damage = combatData.weapons[0].physical_damage;
    let player_magical_damage = combatData.weapons[0].magical_damage;
    let player_total_damage;
    
    let computer_physical_defense_multiplier = 1 - (combatData.computer_defense.physicalDefenseModifier / 100);
    let computer_magical_defense_multiplier = 1 - (combatData.computer_defense.magicalDefenseModifier / 100);


    return (
        console.log(combatData)
    )
}
    
    // ================================== COMPILER FUNCTIONS ====================================== \\
    
const attackCompiler = async (combatData) => {
    
    let player_physical_damage = combatData.weapons[0].physical_damage;
    let player_magical_damage = combatData.weapons[0].magical_damage;
    let player_total_damage;
    
    let computer_physical_defense_multiplier = 1 - (combatData.computer_defense.physicalDefenseModifier / 100);
    let computer_magical_defense_multiplier = 1 - (combatData.computer_defense.magicalDefenseModifier / 100);
    
    // TODO: FIXME: May not do Damage Type Armor Modifiers Yet
    // damageTypeCompiler(player_physical_damage, player_magical_damage, computer) // Checks Damage Types and Armor for Modifiers

    if (combatData.action === 'attack') {
        if (combatData.weapons[0].grip === 'One Hand') {
            if (combatData.weapons[0].attack_type === 'Physical') {
                if (combatData.player.mastery === 'Agility') {
                    if (combatData.weapons[1].grip === 'One Hand') { // If you're Focusing Attack + 1h + Agi Mastery + 1h in Second Slot
                        // dualWieldCompiler(combatData)
                        player_physical_damage += combatData.weapons[1].physical_damage;
                        player_magical_damage += combatData.weapons[1].magical_damage;
                    } else {
                        player_physical_damage *= 1.25;
                        player_magical_damage *= 1.05;
                    }
                } else {
                    player_physical_damage *= 1.35;
                    player_magical_damage *= 1.15;
                }
            } else {
                // If Focus + 1h But Magic
                if (combatData.player.mastery === 'Achre') {
                    if (combatData.weapons[1].grip === 'One Hand') { // Might be a dual-wield compiler instead to take the rest of it
                        // dualWieldCompiler(combatData)
                        player_physical_damage += combatData.weapons[1].physical_damage;
                        player_magical_damage += combatData.weapons[1].magical_damage;
                    }
                } else {
                    player_physical_damage *= 1.15;
                    player_magical_damage *= 1.35;
                }
            }
        } else { // Weapon is TWO HAND
            if (combatData.player.mastery === 'Strength') {
                if (combatData.player_attributes.totalStrength > 40) { // Might be a dual-wield compiler instead to take the rest of it
                    player_physical_damage += combatData.weapons[1].physical_damage;
                    player_magical_damage += combatData.weapons[1].magical_damage;
                } else { // Less than 40 Srength 
                    player_physical_damage *= 1.5;
                    player_magical_damage *= 1.25;
                }
            }
            if (combatData.player.mastery === 'Caeren') {
                if (combatData.player_attributes.totalCaeren > 40) {
                    player_physical_damage += combatData.weapons[1].physical_damage;
                    player_magical_damage += combatData.weapons[1].magical_damage;
                } else {
                    player_physical_damage *= 1.25;
                    player_magical_damage *= 1.5;
                }
            }
            
        }
    }

    if (combatData.computer.computer_action === 'posture') {
        computer_physical_defense_multiplier = 1 - (combatData.computer_defense.physicalPosture / 100);
        computer_magical_defense_multiplier = 1 - (combatData.computer_defense.magicalPosture / 100);
    }


    player_physical_damage *= computer_physical_defense_multiplier;
    player_magical_damage *= computer_magical_defense_multiplier;

    player_total_damage = player_physical_damage + player_magical_damage;
    combatData.realized_player_damage = player_total_damage;
    combatData.new_computer_health = combatData.computer_health - combatData.realized_player_damage;

    combatData.player_action_description = `${combatData.player.name} attacks ${combatData.computer.name} for ${player_total_damage} ${combatData.weapons[0].damage_type} damage.`    

    if (combatData.new_computer_health < 0) {
        combatData.new_computer_health = 0;
    }

    return combatData
}

const counterCompiler = async (combatData) => {
    
    return (
        console.log(combatData)
    )
}

const dodgeCompiler = async (combatData) => {
    
    return (
        console.log(combatData)
    )
}

const postureCompiler = async (combatData) => {
    
    return (
        console.log(combatData)
    )
}

const rollCompiler = async (combatData) => {
    
    return (
        console.log(combatData)
    )
}

const doublePostureCompiler = async (combatData, player_initiative, computer_initiative) => {
    
    return (
        console.log(combatData)
    )
}

const doubleRollCompiler = async (combatData, player_initiative, computer_initiative) => {
    
    return (
        console.log(combatData)
    )
}

const actionSplitter = async (combatData) => {
    const newData = {
        player: combatData.player, // The player's Ascean
        action: combatData.action, // The player's action
        counter_guess: combatData.counter_guess, // The action chosen believed to be 
        player_health: combatData.player_health, // Current Player Health
        weapons: [...combatData.weapons], // All 3 Weapons
        player_defense: combatData.player_defense, // Posseses Base + Postured Defenses
        player_attributes: combatData.player_attributes, // Possesses compiled Attributes, Initiative
        computer: combatData.computer, // Computer Enemy
        computer_attributes: combatData.computer_attributes, // Possesses compiled Attributes, Initiative
        computer_defense: combatData.computer_defense, // Posseses Base + Postured Defenses
        computer_action: combatData.computer_action, // Action Chosen By Computer
        computer_counter_guess: combatData.computer_counter_guess, // Comp's Counter Guess if Action === 'Counter'
        computer_weapons: [...combatData.computer_weapons],  // All 3 Weapons
        potential_player_damage: 0, // All the Damage that is possible on hit for a player
        potential_computer_damage: 0, // All the Damage that is possible on hit for a computer
        realized_player_damage: 0, // Player Damage - Computer Defenses
        realized_computer_damage: 0, // Computer Damage - Player Defenses
        player_action_description: '', // The combat text to inject from the player
        computer_action_description: '', // The combat text to inject from the computer
        new_player_health: combatData.new_player_health, // New player health post-combat action
        new_computer_health: combatData.new_computer_health, // New computer health post-combat action
    }

    const player_initiative = combatData.player_attributes.initiative;
    const computer_initiative = combatData.computer_attributes.initiative;
    const player_action = combatData.action;
    const player_counter = combatData.counter_guess;
    const computer_counter = combatData.computer_counter_guess;
    const computer_action = combatData.computer_action;

    // COUNTER >>> DODGE >>> ROLL >>> POSTURE >>> ATTACK

    if (player_action === 'attack' && computer_action === 'attack') { // If both choose Attack
        if (player_initiative > computer_initiative) {
            await attackCompiler(newData)
            await computerAttackCompiler(newData)
        } else {
            await computerAttackCompiler(newData)
            await attackCompiler(newData)
        }
    }

    if (player_action === 'counter' && computer_action === 'counter') { // This is if COUNTER: 'ACTION' Is the Same for Both
        if (player_counter === computer_counter) {
            if (player_initiative > computer_initiative) {
                await counterCompiler(newData)
            } else {
                await computerCounterCompiler(newData)
            }    
        }
    }

    if (player_action === 'dodge' && computer_action === 'dodge') { // If both choose Dodge
        if (player_initiative > computer_initiative) {
            await dodgeCompiler(newData)
        } else {
            await computerDodgeCompiler(newData)
        }
    }
    if (player_action === 'posture' && computer_action === 'posture') { // If both choose Posture
        // If both Posture, maybe just boost the defenses and treat like regular attacks?
        await doublePostureCompiler(newData, player_initiative, computer_initiative)
        // if (player_initiative > computer_initiative) {
        //     await postureCompiler(newData)
        //     await computerPostureCompiler(newData)
        // } else {
        //     await computerPostureCompiler(newData)
        //     await postureCompiler(newData)
        // }
    }
    if (player_action === 'roll' && computer_action === 'roll') { // If both choose Roll
        await doubleRollCompiler(newData, player_initiative, computer_initiative)
        // if (player_initiative > computer_initiative) {
        //     await rollCompiler(newData)
        //     await computerRollCompiler(newData)
        // } else {
        //     await computerRollCompiler(newData)
        //     await rollCompiler(newData)
        // }
    }

    return newData
}

// ================================= CONTROLLER - SERVICE ===================================== \\

const actionCompiler = async (combatData) => {
    console.log(combatData, 'Combat Data in the Action Compiler of Game Services')
    try {
        const result = await actionSplitter(combatData)
        console.log(result, 'Combat Result')
        return result
    } catch (err) {
        res.status(400).json({ err })
    }
}

module.exports = {
    actionCompiler
}