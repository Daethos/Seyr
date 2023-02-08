const cors = require('cors')
const gameService = require('../services/gameServices')

module.exports = {
    initiate,
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
