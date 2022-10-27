const User = require('../models/user');
const Ascean = require('../models/ascean');
const asceanService = require('../services/asceanServices')

module.exports = {
    create,
    index,
    editAscean,
    getOneAscean,
    delete: deleteAscean,
    getAsceanStats
}



//TODO: Make a function to create the Ascean's 'stats' through the backend
//FIXME: So they're simply 'on' the character I think. That way the rendering client-side
//TODO: Will hopefully not mess around with the stats of the character
//FIXME: Not sure but probably exploitable via the client somehow, like getting it to render so you multiply stats

//TODO: Note: Seem to be able to run the equations through a 'const' at the beginning and it holds the value through re-rendering

async function editAscean(req, res) {
    try {
        const ascean = await Ascean.findByIdAndUpdate(req.params.id, {
            user: req.user,
            visibility: req.body.visibility,
            shareable: req.body.shareable,
            name: req.body.name,
            origin: req.body.origin,
            sex: req.body.sex,
            index: req.body.name,
            description: req.body.description,
            constitution: req.body.constitution,
            strength: req.body.strength,
            agility: req.body.agility,
            achre: req.body.achre,
            caeren: req.body.caeren,
            kyosir: req.body.kyosir,
            mastery: req.body.mastery,
            weapon_one: req.body.weapon_one,
            weapon_two: req.body.weapon_two,
            weapon_three: req.body.weapon_three,
            shield: req.body.shield,
            helmet: req.body.helmet,
            helmet: req.body.helmet,
            chest: req.body.chest,
            legs: req.body.legs,
            ring_one: req.body.ring_one,
            ring_two: req.body.ring_two,
            amulet: req.body.amulet,
            trinket: req.body.trinket,
            faith: req.body.faith,
        })
        ascean.save();
        res.status(201).json({ ascean: ascean })
    } catch (err) {
        console.log(err.message, '<- Error in the Controller Editing the Ascean!')
    }
}

async function deleteAscean(req, res) {
    try {
        await Ascean.findByIdAndDelete(req.params.id)
        res.status(201).json({});
    } catch (err) {
        console.log(err.message, '<- Error in delete Ascean function')
        res.status(400).json({ err })
    }
}

async function create(req, res) {
    console.log(req.body, '<- Hopefully the Ascean!', req.user)
        try {
            const ascean = await Ascean.create({
                user: req.user,
                name: req.body.name,
                index: req.body.name,
                origin: req.body.origin,
                sex: req.body.sex,
                description: req.body.description,
                constitution: req.body.constitution,
                strength: req.body.strength,
                agility: req.body.agility,
                achre: req.body.achre,
                caeren: req.body.caeren,
                kyosir: req.body.kyosir,
                mastery: req.body.mastery,
                weapon_one: req.body.weapon_one,
                weapon_two: req.body.weapon_two ? req.body.weapon_two : 'Nothing of Note',
                weapon_three: req.body.weapon_three ? req.body.weapon_three : 'Nothing of Note',
                shield: req.body.shield,
                helmet: req.body.helmet ? req.body.helmet : 'Nothing of Note',
                chest: req.body.chest ? req.body.chest : 'Nothing of Note',
                legs: req.body.legs,
                ring_one: req.body.ring_one ? req.body.ring_one : 'Nothing of Note',
                ring_two: req.body.ring_two ? req.body.ring_two : 'Nothing of Note',
                amulet: req.body.amulet ? req.body.amulet : 'Nothing of Note',
                trinket: req.body.trinket ? req.body.trinket : 'Nothing of Note',
                faith: req.body.faith,
            })
            res.status(201).json({ ascean: ascean });
        } catch (err) {
            res.status(400).json({ err });
        }
}

async function index(req, res) {
    try {
        console.log(req.user._id, '<- User ID in Ascean Index Controller')
        const ascean = await Ascean.find({ user: req.user._id })
                                    .populate("user")
                                    .populate("weapon_one")
                                    .populate("weapon_two")
                                    .populate("weapon_three")
                                    .populate("shield")
                                    .populate("helmet")
                                    .populate("chest")
                                    .populate("legs")
                                    .populate("ring_one")
                                    .populate("ring_two")
                                    .populate("amulet")
                                    .populate("trinket")
                                    .exec();
        res.status(200).json({ data: ascean });
    } catch (err) {
        res.status(400).json({ err });
    }
}

async function getOneAscean(req, res) {
    try {
        const ascean = await Ascean.findById({ _id: req.params.id })
                                    .populate("user")
                                    .populate("weapon_one")
                                    .populate("weapon_two")
                                    .populate("weapon_three")
                                    .populate("shield")
                                    .populate("helmet")
                                    .populate("chest")
                                    .populate("legs")
                                    .populate("ring_one")
                                    .populate("ring_two")
                                    .populate("amulet")
                                    .populate("trinket")
                                    .exec();
        res.status(200).json({ data: ascean })
    } catch (err) {
        res.status(400).json({ err });
    }
}

async function getAsceanStats(req, res) {
    try {
        const ascean = await Ascean.findById({ _id: req.params.id })
                                    .populate("user")
                                    .populate("weapon_one")
                                    .populate("weapon_two")
                                    .populate("weapon_three")
                                    .populate("shield")
                                    .populate("helmet")
                                    .populate("chest")
                                    .populate("legs")
                                    .populate("ring_one")
                                    .populate("ring_two")
                                    .populate("amulet")
                                    .populate("trinket")
                                    .exec();
        const data = await asceanService.asceanCompiler(ascean)
        console.log(data)
        res.status(200).json({ data })
    } catch (err) {
        res.status(400).json({ err });
    }
}