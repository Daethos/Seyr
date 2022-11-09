const cors = require('cors')
const gameService = require('../services/gameServices')

module.exports = {
    init,
    render,
    initiate,
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
    // console.log(req.body, 'Combat Data in the Game Controller - Initiate')
    try {
        const data = await gameService.actionCompiler(req.body)
        res.status(200).json({ data })
    } catch (err) {
        res.status(400).json({ err })
    }
}

async function playerWin(req, res) {
    // Renders Game State if the Player Wins
}
async function playerLoss(req, res) {
    // Renders Game State if the Player Loses
}