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
    indexEquipment,
    getOneEquipment
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

const determineRarityByLevel = (level) => {
    const chance = Math.random();
    let rarity = '';
    let uScale = level / 12;
    let rScale = level / 72;
    let eScale = level / 300;
    let lScale = level / 10000;
    if (level < 4) {
        rarity = 'Common';
    } else if (level >= 4 && level < 12) {
        if (rScale > chance) {
            rarity = 'Rare';
        } else if (uScale > chance) {
            rarity = 'Uncommon';
        } else {
            rarity = 'Common';
        }
    } else if (level >= 12 && level < 20) {
        if (eScale > chance) {
            rarity = 'Epic';
        } else if (rScale > chance) {
            rarity = 'Rare';
        } else if (uScale > chance) {
            rarity = 'Uncommon';
        }
    } else { // === 20
        if (lScale > chance) {
            rarity = 'Legendary';
        } else if (eScale > chance) {
            rarity = 'Epic';
        } else if (rScale > chance) {
            rarity = 'Rare';
        } else if (uScale > chance) {
            rarity = 'Uncommon';
        }
    }
    return rarity;
}

const determineEquipmentType = () => {
    const type = Math.floor(Math.random() * 100  + 1);
    if (type <= 30) {
        return 'Weapon';
    } else if (type > 40) {
        return 'Shield';
    } else if (type > 50) {
        return 'Helmet';
    } else if (type > 60) {
        return 'Chest';
    } else if (type > 70) {
        return 'Legs';
    } else if (type > 80) {
        return 'Ring';
    } else if (type > 90) {
        return 'Amulet';
    } else {
        return 'Trinket';
    }
}

 async function getOneEquipment (req, res) {
    try {
        const rarity = determineRarityByLevel(req.body.level);
        const type = determineEquipmentType();
        if (type === 'Weapon') {
            const equipment = await Weapon.findOne({ rarity: rarity }).populate().exec();
        } else if (type === 'Shield') {
            const equipment = await Shield.findOne({ rarity }).populate().exec();
        } else if (type === 'Helmet') {
            const equipment = await Helmet.findOne({ rarity }).populate().exec();
        } else if (type === 'Chest') {
            const equipment = await Chest.findOne({ rarity }).populate().exec();
        } else if (type === 'Legs') {
            const equipment = await Legs.findOne({ rarity }).populate().exec();
        } else if (type === 'Ring') {
            const equipment = await Ring.findOne({ rarity }).populate().exec();
        } else if (type === 'Amulet') {
            const equipment = await Amulet.findOne({ rarity }).populate().exec();
        } else {
            const equipment = await Trinket.findOne({ rarity }).populate().exec();        
        }
        res.status(200).json({ data: equipment });
    } catch (err) {
        res.status(400).json(err);
    }
}