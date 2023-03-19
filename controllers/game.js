const Ascean = require('../models/ascean');
const User = require('../models/user');
const gameService = require('../services/gameServices')
const pvpService = require('../services/pvpServices')

module.exports = {
    initiate,
    pvp,
    instant,
    prayer,
}

async function prayer(req, res) {
    // console.log(req.body, 'Combat Data in the Game Controller - Initiate')
    try {
        const data = await gameService.consumePrayer(req.body);
        res.status(200).json({ data });
    } catch (err) {
        res.status(400).json({ err });
    };
};

async function instant(req, res) {
    // console.log(req.body, 'Combat Data in the Game Controller - Initiate')
    try {
        const data = await gameService.instantActionCompiler(req.body);
        res.status(200).json({ data });
    } catch (err) {
        res.status(400).json({ err });
    };
};

async function initiate(req, res) {
    // console.log(req.body, 'Combat Data in the Game Controller - Initiate')
    try {
        const data = await gameService.actionCompiler(req.body);
        res.status(200).json({ data });
    } catch (err) {
        res.status(400).json({ err });
    };
};

async function pvp(req, res) {
    // console.log(req.body, 'Combat Data in the Game Controller - Initiate')
    try {
        const data = await pvpService.actionCompiler(req.body);
        res.status(200).json({ data });
    } catch (err) {
        res.status(400).json({ err });
    };
};
