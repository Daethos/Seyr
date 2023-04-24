const Ascean = require('../models/ascean');
const Quest = require('../models/quest');
const QuestService = require('../services/questServices.js');

module.exports = {
    createQuest,
};

async function createQuest(req, res) {
    try {
        const ascean = await Ascean.findById(req.params.id);
        const quest = new QuestService(req.body);
        const newQuest = await Quest.create(quest);
        ascean.quests.push(newQuest._id);
        await ascean.save();
        res.status(201).json(quest);
    } catch (err) {
        console.log(err.message, "Error Creating Quest");
        res.status(400).json(err);
    };
};