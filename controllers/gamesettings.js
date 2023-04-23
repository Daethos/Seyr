const GameSetting = require('../models/gamesetting');

module.exports = {
    createSettings,
    updateSettings,
    getSettings,
    deleteSettings,
};

async function createSettings(req, res) {
    try {
        const gamesetting = await GameSetting.create({
            user: req.user._id,
            mapMode: "FULL_MAP",
            canvasPosition: {
                x: 0,
                y: 1.5,
            },
            canvasHeight: 400,
            canvasWidth: 400,
            joystickSpeed: 150,
            moveTimer: 10,
            shake: { duration: 200, intensity: 1},
            soundEffectVolume: 0.3,
            timeLeft: 10,
            vibrationTime: 100,
        });
        res.status(201).json(gamesetting);
    } catch (err) {
        res.status(400).json(err);
    };
};

async function updateSettings(req, res) {
    try {
        const gamesetting = await GameSetting.findOneAndUpdate(
            { user: req.user._id },
            req.body,
            { new: true }
        );
        res.status(200).json(gamesetting);
    } catch (err) {
        res.status(400).json(err);
    };
};

async function getSettings(req, res) {
    try {
        let gamesetting = await GameSetting.findOne({ user: req.user._id });

        if (!gamesetting) {
            // Actually We Should Create a New GameSetting If It Doesn't Exist
            gamesetting = await GameSetting.create({
                user: req.user._id,
                mapMode: "FULL_MAP",
                canvasPosition: {
                    x: 0,
                    y: 1.5,
                },
                canvasHeight: 400,
                canvasWidth: 400,
                joystickSpeed: 150,
                moveTimer: 10,
                shake: { duration: 200, intensity: 1},
                soundEffectVolume: 0.3,
                timeLeft: 10,
                vibrationTime: 100,
            });
        };
        res.status(200).json(gamesetting);
    } catch (err) {
        res.status(400).json(err);
    };
};

async function deleteSettings(req, res) {
    try {
        const deletedGamesetting = await GameSetting.findOneAndDelete({ user: req.user._id });
        res.status(200).json(deletedGamesetting);
    } catch (err) {
        res.status(400).json(err);
    };
};