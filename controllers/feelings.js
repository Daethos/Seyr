const Ascean = require('../models/ascean')

module.exports = {
    create,
    updateFeeling
}

async function create(req, res) {
    try {
        const ascean = await Ascean.findById(req.params.id);
        ascean.feelings.push({ 
            username: req.user.username, 
            userId: req.user._id, like: 
            req.body.feelings.like, 
            dislike: req.body.feelings.dislike, 
            doubleDislike: req.body.feelings.doubleDislike 
        })
        await ascean.save()
        res.status(201).json({ data: 'feeling added' })
    } catch (err) {
        res.status(400).json({ error: err })
    }
}

async function updateFeeling(req, res) {
    try {
        const ascean = await Ascean.findByIdAndUpdate(req.params.id, req.body);
        ascean.save();
        res.status(201).json({ ascean: ascean })
    } catch (err) {
        console.log(err.message, '<- Error in the Controller Editing the Ascean!')
    }
}