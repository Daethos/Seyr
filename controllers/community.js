const Ascean = require('../models/ascean');
const Weapon = require('../models/weapon');
const Shield = require('../models/shield');
const Helmet = require('../models/helmet');
const Chest = require('../models/chest');
const Legs = require('../models/legs');
const Ring = require('../models/ring');
const Amulet = require('../models/amulet');
const Trinket = require('../models/trinket');
const Equipment = require('../models/equipment');

module.exports = {
    indexCommunity,
    focus
};

async function determineItemType(id) {
    const models = {
        Equipment: Equipment,
        Weapon: Weapon,
        Shield: Shield,
        Helmet: Helmet,
        Chest: Chest,
        Legs: Legs,
        Ring: Ring,
        Amulet: Amulet,
        Trinket: Trinket,
    };
    const itemTypes = ['Equipment', 'Weapon', 'Shield', 'Helmet', 'Chest', 'Legs', 'Ring', 'Amulet', 'Trinket'];
    for (const itemType of itemTypes) {
        const item = await models[itemType].findById(id).exec();
        if (item) {
            return item;
        };
    };
    return null;
};

async function focus(req, res) {
    try {
        let ascean = await Ascean.findById({ _id: req.params.id })
                                 .populate('user')
                                 .exec();
        let fields = [
            'weapon_one',
            'weapon_two',
            'weapon_three',
            'shield',
            'helmet',
            'chest',
            'legs',
            'ring_one',
            'ring_two',
            'amulet',
            'trinket'
        ];
        const populated = await Promise.all(fields.map(async field => {
            const item = await determineItemType(ascean[field]);
            return item ? item : null;
        }));
        populated.forEach((item, index) => {
            ascean[fields[index]] = item;
        });
        res.status(200).json({ data: ascean })
    } catch (err) {
        res.status(400).json({ err });
    };
};

async function indexCommunity(req, res) {
    try {
        console.log(req.user._id, '<- Index Function in Community Controller')
        const asceanCrew = await Ascean.find({ visibility: 'public' });
        res.status(200).json({ data: asceanCrew });
    } catch (err) {
        res.status(400).json({ err });
    };
};