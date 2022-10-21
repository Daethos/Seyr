const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Weapon = require('../models/weapon');
const Shield = require('../models/shield');
const Helmet = require('../models/helmet');
const Chest = require('../models/chest');
const Legs = require('../models/legs');
const Ring = require('../models/ring');
const Amulet = require('../models/amulet');
const Trinket = require('../models/trinket');

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports = {
    indexEquipment
}

async function indexEquipment(req, res) {
    console.log('%c We have made it to the Index in the Equipment Controller!', 'color: blue')
    try {
        const weapons = await Weapon.find({}).populate().exec();
        const shields = await Shield.find({}).populate().exec();
        const helmets = await Helmet.find({}).populate().exec();
        const chests = await Chest.find({}).populate().exec();
        const legs = await Legs.find({}).populate().exec();
        const rings = await Ring.find({}).populate().exec();
        const amulets = await Amulet.find({}).populate().exec();
        const trinkets = await Trinket.find({}).populate().exec();
        res.status(200).json({ data: {
            weapons,
            shields,
            helmets,
            chests,
            legs,
            rings,
            amulets,
            trinkets
        } 
    });
    } catch (err) {
        res.status(400).json({ err }); 
    }
}