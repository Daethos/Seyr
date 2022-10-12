const Ascean = require('../models/ascean')

module.exports = {
    create,
    updateFeeling,
    deleteFeeling
}

async function create(req, res) {
    console.log(req.params.feeling, 'Feeling in Controller');
    try {
        const ascean = await Ascean.findById(req.params.id);

        if (req.params.feeling === 'like') {
            ascean.likes.push({ 
                username: req.user.username, 
                userId: req.user._id
            })
        }
        if (req.params.feeling === 'dislike') {
            ascean.dislikes.push({ 
                username: req.user.username, 
                userId: req.user._id
            })
        }
        if (req.params.feeling === 'doubleDislike') {
            ascean.double_dislikes.push({ 
                username: req.user.username, 
                userId: req.user._id
            })
        }
        
        await ascean.save()
        res.status(201).json({ data: ascean })
    } catch (err) {
        res.status(400).json({ error: err })
    }
}

async function deleteFeeling(req, res){
    console.log(req.params.id, '<- What is the ID in Delete?')
    try {
        const ascean = await Ascean.findOne({'likes._id': req.params.id, 'likes.username': req.user.username});
        ascean.likes.remove(req.params.id) // mutating a document
        ascean.dislikes.remove(req.params.id)
        ascean.double_dislikes.remove(req.params.id)
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