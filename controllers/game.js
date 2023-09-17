const gameService = require('../services/gameServices');

module.exports = {
    initiate,
    instant,
    prayer,
    phaser,
    phaserEffect,
};

async function phaser(req, res) {
    try {
        const data = gameService.phaserActionCompiler(req.body);
        res.status(200).json({ data });
    } catch (err) {
        res.status(400).json({ err });
    };
};

async function phaserEffect(req, res) {
    try {
        const data = gameService.phaserEffectTick(req.body);
        res.status(200).json({ data });
    } catch (err) {
        res.status(400).json({ err });
    };
};

async function prayer(req, res) {
    try {
        const data = gameService.consumePrayer(req.body);
        res.status(200).json({ data });
    } catch (err) {
        res.status(400).json({ err });
    };
};

async function instant(req, res) {
    try {
        const data = gameService.instantActionCompiler(req.body);
        res.status(200).json({ data });
    } catch (err) {
        res.status(400).json({ err });
    };
};

async function initiate(req, res) {
    try {
        const data = gameService.actionCompiler(req.body);
        res.status(200).json({ data });
    } catch (err) {
        res.status(400).json({ err });
    };
};