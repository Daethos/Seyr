const Ascean = require('../models/ascean')

module.exports = {
    create,
    updateFeeling,
    deleteFeeling
}

async function create(req, res) {
    console.log(req.body, '%c Feeling in Controller', 'color: green');
    try {
        const ascean = await Ascean.findById(req.params.id);
        ascean.likes.push({ 
            username: req.user.username, 
            userId: req.user._id
        })
        ascean.dislikes.push({ 
            username: req.user.username, 
            userId: req.user._id
        })
        ascean.double_dislikes.push({ 
            username: req.user.username, 
            userId: req.user._id
        })
        await ascean.save()
        res.status(201).json({ data: ascean })
    } catch (err) {
        res.status(400).json({ error: err })
    }
}

async function deleteFeeling(req, res){
    console.log(req.body, '<- What is the body?')
    try {
        const ascean = await Ascean.findOne({'likes._id': req.params.id, 'likes.username': req.user.username});
        ascean.likes.remove(req.params.id) // mutating a document
        // req.params.id is the like id 
        await ascean.save() // after you mutate a document you must save
        res.json({ data: ascean })
    } catch(err){
        res.status(400).json({error: err})
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