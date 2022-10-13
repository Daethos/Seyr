const Ascean = require('../models/ascean');

module.exports = {
    index,
}

async function index(req, res) {
    try {
        console.log(req.user._id, '<- Index Function in Community Controller')
        const ascean = await Ascean.find({ visibility: 'public' })
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