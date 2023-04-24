const gameService = require('../services/gameServices')

module.exports = {
    initiate,
};

async function initiate(req, res) {
    try {
        const data = await gameService.actionCompiler(req.body)
        res.status(200).json({ data })
    } catch (err) {
        res.status(400).json({ err })
    };
};
