
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
const computerActionCompiler = async (newData, computer_action, computer_counter) => {

    const computerActions = {
        attack: 30 + newData.attack_weight,
        counter: 10 + newData.counter_weight,
        dodge: 10 + newData.dodge_weight,
        posture: 25 + newData.posture_weight,
        roll: 25 + newData.roll_weight,
        counter_attack: 20 + newData.counter_attack_weight,
        counter_counter: 20 + newData.counter_counter_weight,
        counter_dodge: 20 + newData.counter_dodge_weight,
        counter_posture: 20 + newData.counter_posture_weight,
        counter_roll: 20 + newData.counter_roll_weight,
    }

    if (player_action === 'attack') { 
        newData.posture_weight += 1
        newData.roll_weight += 1
        newData.attack_weight -= 2
        newData.counter_attack_weight += 2
        newData.counter_counter_weight -= 1
        newData.counter_dodge_weight -= 1
    }
    if (player_action === 'counter') { 
        newData.counter_weight += 2  
        newData.attack_weight -= 2
        newData.counter_counter_weight += 2
        newData.counter_attack_weight -= 1
        newData.counter_dodge_weight -= 1
    }
    if (player_action === 'dodge') { 
        newData.dodge_weight += 3  
        newData.attack_weight -= 3
        newData.counter_dodge_weight += 4
        newData.counter_attack_weight -= 1
        newData.counter_counter_weight -= 1
        newData.counter_posture_weight -= 1
        newData.counter_roll_weight -= 1
    }
    if (player_action === 'posture') { 
        newData.attack_weight += 1  
        newData.posture_weight -= 1
        newData.counter_posture_weight += 3
        newData.counter_roll_weight -= 2
        newData.counter_dodge_weight -= 1
    }

    if (player_action === 'roll') { 
        newData.attack_weight += 1  
        newData.roll_weight -= 1
        newData.counter_roll_weight += 3
        newData.counter_posture_weight -= 2
        newData.counter_dodge_weight -= 1
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

    return (
        newData,
        computer_action,
        computer_counter
    )
}

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
    
const computerRollCompiler = async (combatData) => {
    
    return (
        console.log(combatData)
    )
}

const dualWieldCompiler = async (combatData) => { // Triggers if 40+ Str/Caer for 2h, 1h + Agi/Achre Mastery and 2nd weapon is 1h
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

    // TODO:FIXME: This is for Critical Strikes
    if (combatData.weapons[0].critical_chance > Math.floor(Math.random() * 101)) {
        if (combatData.weapons[1].critical_chance > Math.floor(Math.random() * 101)) {
            await dualCriticalCompiler(combatData)
            return combatData
        } else {
            await criticalCompiler(combatData)
            firstWeaponCrit = true;
        }
    }

    if (combatData.weapons[1].critical_chance > Math.floor(Math.random() * 101)) {
        await secondWeaponCriticalCompiler(combatData)
        secondWeaponCrit = true;
    }

    player_weapon_one_physical_damage *= computer_physical_defense_multiplier;
    player_weapon_one_magical_damage *= computer_magical_defense_multiplier;

    player_weapon_one_physical_damage *= computer_physical_defense_multiplier;
    player_weapon_one_magical_damage *= computer_magical_defense_multiplier;

    player_weapon_one_total_damage = player_weapon_one_physical_damage + player_weapon_one_magical_damage;
    player_weapon_two_total_damage = player_weapon_two_physical_damage + player_weapon_two_magical_damage;

    combatData.realized_player_damage = player_weapon_one_total_damage + player_weapon_two_total_damage;
    combatData.new_computer_health = combatData.computer_health - combatData.realized_player_damage;
    
    combatData.player_action_description = 
        `You attack ${computer.name} with ${weapons[0].name} and ${weapons[1].name} for 
        ${combatData.realized_player_damage} ${weapons[0].damage_type} and ${weapons[1].damage_type}
        ${firstWeaponCrit === true && secondWeaponCrit === true 
            ? 'Critical Strike' 
            : firstWeaponCrit === true || secondWeaponCrit === true 
            ? 'Partial Crit'
            : ''} Damage.`    

    

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
    
    // This is for Opponent's who are Posturing
    if (combatData.computer.computer_action === 'posture') {
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
                        await dualWieldCompiler(combatData)
                        return combatData
                    } else {
                        await doubleAttackCompiler(combatData)
                        return combatData
                    }
                } else {
                    player_physical_damage *= 1.3;
                    player_magical_damage *= 1.1;
                }
            } else {
                // If Focus + 1h But Magic
                if (combatData.player.mastery === 'Achre') {
                    if (combatData.weapons[1].grip === 'One Hand') { // Might be a dual-wield compiler instead to take the rest of it
                        await dualWieldCompiler(combatData)
                        return combatData
                    }
                } else {
                    player_physical_damage *= 1.15;
                    player_magical_damage *= 1.35;
                }
            }
        } else { // Weapon is TWO HAND
            if (combatData.player.mastery === 'Strength') {
                if (combatData.player_attributes.totalStrength > 40) { // Might be a dual-wield compiler instead to take the rest of it
                    await dualWieldCompiler(combatData)
                    return combatData
                } else { // Less than 40 Srength 
                    player_physical_damage *= 1.5;
                    player_magical_damage *= 1.25;
                }
            }
            if (combatData.player.mastery === 'Caeren') {
                if (combatData.player_attributes.totalCaeren > 40) {
                    await dualWieldCompiler(combatData)
                        return combatData
                } else {
                    player_physical_damage *= 1.25;
                    player_magical_damage *= 1.5;
                }
            }
            
        }
    }

    // Checking For Player Actions
    if (player_action === 'counter') {
        player_physical_damage *= 0.9;
        player_magical_damage *= 0.9;
    }

    if (player_action === 'dodge') {
        player_physical_damage *= 0.9;
        player_magical_damage *= 0.9;
    }

    if (player_action === 'posture') {
        player_physical_damage *= 0.75;
        player_magical_damage *= 0.75;
    }

    if (player_action === 'roll' ) { // && the roll failed. 
        // TODO:FIXME: Make a variable to check if you failed the roll attempt
        player_physical_damage *= 0.75;
        player_magical_damage *= 0.75;
    }


    // This is for Critical Strikes
    if (combatData.weapons[0].critical_chance > Math.floor(Math.random() * 101)) {
        criticalCompiler(combatData)
        return combatData
    }

    // If you made it here, your basic attack now resolves itself
    player_physical_damage *= computer_physical_defense_multiplier;
    player_magical_damage *= computer_magical_defense_multiplier;

    player_total_damage = player_physical_damage + player_magical_damage;
    combatData.realized_player_damage = player_total_damage;
    combatData.new_computer_health = combatData.computer_health - combatData.realized_player_damage;

    combatData.player_action_description = 
        `You attack ${combatData.computer.name} with ${combatData.weapons[0].name} for 
        ${player_total_damage} ${combatData.weapons[0].damage_type} Damage.`    

    if (combatData.new_computer_health < 0) {
        combatData.new_computer_health = 0;
    }

    return combatData
}

const criticalCompiler = async (combatData) => {
    

    return (
        console.log(combatData)
    )
}

const counterCompiler = async (combatData, computer_action) => {
    if (computer_action === 'attack') {

    }
    if (computer_action === 'counter') {
        
    }
    if (computer_action === 'dodge') {
        
    }
    if (computer_action === 'posture') {
        
    }
    if (computer_action === 'roll') {
        
    }
    return (
        console.log(combatData)
    )
}

const dodgeCompiler = async (combatData) => {
    
    return (
        console.log(combatData)
    )
}

const playerRollCompiler = async (combatData) => {
    
    return (
        console.log(combatData)
    )
}

// Resolves both Player and Computer Rolling
const doubleRollCompiler = async (combatData, player_initiative, computer_initiative) => {
    
    return (
        console.log(combatData)
    )
}

// Action Splitter Determines the Action Payload and Sorts the Resolution of the Action Round
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
        player_action_description: combatData.player_action_description, // The combat text to inject from the player
        computer_action_description: combatData.computer_action_description, // The combat text to inject from the computer
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
    }

    const player_initiative = combatData.player_attributes.initiative;
    const computer_initiative = combatData.computer_attributes.initiative;
    const player_action = combatData.action;
    const player_counter = combatData.counter_guess;
    let computer_counter = combatData.computer_counter_guess;
    let computer_action = combatData.computer_action;

    // Weighs and Evaluates the Action the Opponent Will Choose Based on Reaction to Player Actions (Cumulative)
    await computerActionCompiler(newData, computer_action, computer_counter)

    // COUNTER >>> DODGE >>> ROLL >>> POSTURE >>> ATTACK
    
    // If both Player and Computer Counter -> Counter [Fastest Resolution]
    if (player_action === 'counter' && computer_action === 'counter') { // This is if COUNTER: 'ACTION' Is the Same for Both
        if (player_counter === computer_counter && player_counter === 'counter') {
            if (player_initiative > computer_initiative) {
                await counterCompiler(newData, computer_action)
            } else {
                await computerCounterCompiler(newData, player_counter)
            }    
        }
    }

    // Partially Resolves Player: Counter + Countering the Computer
    if (player_initiative > computer_initiative ) { // If the Player is Faster
        // If Player Counters the Computer w/o the Enemy Countering
        if (player_action === 'counter' && computer_action !== 'counter') {
            if (player_counter === computer_action) {
                await counterCompiler(newData, computer_action)
            }
        }
    }

    if (computer_initiative > player_initiative) {
        if (computer_action === 'counter' && player_action !== 'counter') {
            if (computer_counter === player_action) {
                await computerCounterCompiler(newData, player_counter)
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

    // If the Player Dodges and the Computer does not *Counter or Dodge  *Checked for success
    if (player_action === 'dodge' && computer_action !== 'dodge') {
        await dodgeCompiler(newData)
    }

    // If the Computer Dodges and the Player does not *Counter or Dodge *Checked for success
    if (computer_action === 'dodge' && player_action !== 'dodge') {
        await computerDodgeCompiler(newData)
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

    if (player_action === 'roll' && computer_action !== 'roll') {
        await playerRollCompiler(newData)
    }

    if (computer_action === 'roll' && player_action !== 'roll') {
        await computerRollCompiler(newData)
    }
    
    if (player_action === 'attack' && computer_action === 'attack') { // If both choose Attack
        if (player_initiative > computer_initiative) {
            await attackCompiler(newData)
            await computerAttackCompiler(newData)
        } else {
            await computerAttackCompiler(newData)
            await attackCompiler(newData)
        }
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