const Ascean = require('../models/ascean');
const User = require('../models/user');

module.exports = {
    init,
    render,
    initiate,
    attack,
    dodge,
    roll,
    parry,
    posture,
    playerAttack,
    computerAttack,
    playerWin,
    playerLoss
}

async function init(req, res) {
    // Initializes the Game State
}
async function render(req, res) {
    // Renders the Game State   
}

async function initiate(req, res) {
    console.log(req.body, 'Combat Data')
    // const data = await gameService.actionCompiler(req.body)
}

async function attack(req, res) {
    // Runs the Attack Function
}
async function dodge(req, res) {
    // Runs the Dodge Function
}
async function roll(req, res) {
    // Runs the Roll Function
}
async function parry(req, res) {
    // Runs the Parry Function
}
async function posture(req, res) {
    // Runs the Posture Function
}
async function playerAttack(req, res) {
    // Calculates the player's attack
}
async function computerAttack(req, res) {
    // Calculates the computer's attack
}
async function playerWin(req, res) {
    // Renders Game State if the Player Wins
}
async function playerLoss(req, res) {
    // Renders Game State if the Player Loses
}