
// =================================== HELPER CONSTANTS ======================================= \\

// Helps to remember nested fields in CombatData
// =============== COMBAT DATA ==============
//     player: ascean,
//     action: '',
//     player_health: currentPlayerHealth,
//     weapons: [],
//     weapon_one: weaponOne,
//     weapon_two: weaponTwo,
//     weapon_three: weaponThree,
//     player_defense: playerDefense,
//     player_attributes: attributes,
//     computer: '',
//     computer_action: '',
//     computer_weapons: [],
//     new_player_health: currentPlayerHealth,
//     new_computer_health: 0
// })

// =================================== HELPER FUNCTIONS ======================================= \\

const attackCompiler = async (combatData) => {
    
    return (
        console.log(combatData)
    )
}

const dodgeCompiler = async (combatData) => {
    
    return (
        console.log(combatData)
    )
}

const parryCompiler = async (combatData) => {
    
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

// ================================== COMPILER FUNCTIONS ====================================== \\

const actionSplitter = async (action, combatData) => {
    const newData = {
        player: combatData.player,
        action: combatData.action,
        player_health: combatData.player_health,
        weapons: [...combatData.weapons],
        player_defense: combatData.player_defense,
        player_attributes: combatData.player_attributes,
        computer: combatData.computer,
        computer_defense: combatData.computer_defense,
        computer_action: combatData.computer_action,
        computer_weapons: [...combatData.computer_weapons],
        new_player_health: combatData.new_player_health,
        new_computer_health: combatData.new_computer_health,
        potential_player_damage: 0,
        potential_computer_damage: 0,
        realized_player_damage: 0,
        realized_computer_damage: 0,
        player_action_description: '',
        computer_action_description: ''
    }

    if (action === 'attack') {
        attackCompiler(newData)
    }
    if (action === 'dodge') {
        dodgeCompiler(newData)
    }
    if (action === 'parry') {
        parryCompiler(newData)
    }
    if (action === 'posture') {
        postureCompiler(newData)
    }
    if (action === 'roll') {
        rollCompiler(newData)
    }
    return newData
}

// ================================= CONTROLLER - SERVICE ===================================== \\

const actionCompiler = async (combatData) => {
    try {
        const result = await actionSplitter(combatData.action, combatData)
        console.log(result, 'Combat Result')
        return result
    } catch (err) {
        res.status(400).json({ err })
    }
}

module.exports = {
    actionCompiler
}