const Ascean = require('../models/ascean');
const User = require('../models/user');
const gameService = require('../services/gameServices')
const pvpService = require('../services/pvpServices')

module.exports = {
    initiate,
    instant,
    prayer,
    pvpInitiate,
    pvpInstant,
    pvpPrayer,
}

async function prayer(req, res) {
    try {
        const data = await gameService.consumePrayer(req.body);
        res.status(200).json({ data });
    } catch (err) {
        res.status(400).json({ err });
    };
};

async function instant(req, res) {
    try {
        const data = await gameService.instantActionCompiler(req.body);
        res.status(200).json({ data });
    } catch (err) {
        res.status(400).json({ err });
    };
};

async function initiate(req, res) {
    try {
        const data = await gameService.actionCompiler(req.body);
        res.status(200).json({ data });
    } catch (err) {
        res.status(400).json({ err });
    };
};

async function pvpInitiate(req, res) {
    try {
        const data = await pvpService.actionCompiler(req.body);
        res.status(200).json({ data });
    } catch (err) {
        res.status(400).json({ err });
    };
};

async function pvpPrayer(req, res) {
    try {
        const data = await pvpService.consumePrayer(req.body);
        res.status(200).json({ data });
    } catch (err) {
        res.status(400).json({ err });
    };
};

async function pvpInstant(req, res) {
    try {
        const data = await pvpService.instantActionCompiler(req.body);
        res.status(200).json({ data });
    } catch (err) {
        res.status(400).json({ err });
    };
};