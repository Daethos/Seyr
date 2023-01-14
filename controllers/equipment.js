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

// Write in a function that will create an elevated rarity item of the same name when the user subm8its 3 of the same item name of a lower rarity
// This would happen in a services tab of the dialog box

async function indexEquipment(req, res) {
    console.log('%c We have made it to the Index in the Equipment Controller!', 'color: blue')
    try {
        const weapons = await Weapon.find({ rarity: { $in: ['Default', 'Common', 'Uncommon'] } }).populate().exec();
        const shields = await Shield.find({ rarity: { $in: ['Default', 'Common', 'Uncommon'] } }).populate().exec();
        const helmets = await Helmet.find({ rarity: { $in: ['Common', 'Uncommon'] } }).populate().exec();
        const chests = await Chest.find({ rarity: { $in: ['Common', 'Uncommon'] } }).populate().exec();
        const legs = await Legs.find({ rarity: { $in: ['Common', 'Uncommon'] } }).populate().exec();
        const rings = await Ring.find({ rarity: { $in: ['Default', 'Uncommon'] } }).populate().exec();
        const amulets = await Amulet.find({ rarity: { $in: ['Default', 'Uncommon'] } }).populate().exec();
        const trinkets = await Trinket.find({ rarity: { $in: ['Default', 'Uncommon'] } }).populate().exec();
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
    console.log(level, '%c We have made it to the determineRarityByLevel in the Equipment Controller!', 'color: blue')
    const chance = Math.random();
    let rarity = '';
    let uScale = level / 12;
    let rScale = level / 60;
    let eScale = level / 300;
    let lScale = level / 10000;
    if (level < 4) {
        if (uScale > chance) {
            rarity = 'Uncommon';
        } else { 
            rarity = 'Common';
        }
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
    console.log(rarity, 'Rarity ?')
    return rarity;
}

const determineEquipmentType = () => {
    console.log('%c We have made it to the determineEquipmentType in the Equipment Controller!', 'color: blue')
    const roll = Math.floor(Math.random() * 100  + 1);
    
    if (roll <= 30) {
        return 'Weapon';
    } else if (roll < 40) {
        return 'Shield';
    } else if (roll < 50) {
        return 'Helmet';
    } else if (roll < 60) {
        return 'Chest';
    } else if (roll < 70) {
        return 'Legs';
    } else if (roll < 80) {
        return 'Ring';
    } else if (roll < 90) {
        return 'Amulet';
    } else {
        return 'Trinket';
    }
}

 async function getOneEquipment (req, res) {
    console.log('%c We have made it to the getOneEquipment in the Equipment Controller!', 'color: blue')
    try {
        let rarity = determineRarityByLevel(req.params.level);
        const type = determineEquipmentType();
        console.log(rarity, type, 'rarity, type')

        if (type === 'Amulet' || type === 'Ring' || type === 'Trinket') {
            if (rarity === 'Common') {
                rarity = 'Uncommon';
            }
        }

        let equipment;
        let eqpCheck = Math.floor(Math.random() * 100  + 1);
        if (req.params.level < 4) {
            if (eqpCheck > 80) {
                equipment = await Weapon.aggregate([{ $match: { rarity } }, { $sample: { size: 1 } }]).exec();
                console.log(equipment, 'equipment ?')
                res.status(200).json({ data: equipment });
                return;
            } else if (eqpCheck > 60) {
                equipment = await Shield.aggregate([{ $match: { rarity } }, { $sample: { size: 1 } }]).exec();
                console.log(equipment, 'equipment ?')
                res.status(200).json({ data: equipment });
                return;
            } else if (eqpCheck > 40) {
                equipment = await Helmet.aggregate([{ $match: { rarity } }, { $sample: { size: 1 } }]).exec();
                console.log(equipment, 'equipment ?')
                res.status(200).json({ data: equipment });
                return;
            } else if (eqpCheck > 20) {
                equipment = await Chest.aggregate([{ $match: { rarity } }, { $sample: { size: 1 } }]).exec();
                console.log(equipment, 'equipment ?')
                res.status(200).json({ data: equipment });
                return;
            } else {
                equipment = await Legs.aggregate([{ $match: { rarity } }, { $sample: { size: 1 } }]).exec();
                console.log(equipment, 'equipment ?')
                res.status(200).json({ data: equipment });
                return;
            }

        }


        if (type === 'Weapon') {
            equipment = await Weapon.aggregate([{ $match: { rarity } }, { $sample: { size: 1 } }]).exec();
        } else if (type === 'Shield') {
            equipment = await Shield.aggregate([{ $match: { rarity } }, { $sample: { size: 1 } }]).exec();
        } else if (type === 'Helmet') {
            equipment = await Helmet.aggregate([{ $match: { rarity } }, { $sample: { size: 1 } }]).exec();
        } else if (type === 'Chest') {
            equipment = await Chest.aggregate([{ $match: { rarity } }, { $sample: { size: 1 } }]).exec();
        } else if (type === 'Legs') {
            equipment = await Legs.aggregate([{ $match: { rarity } }, { $sample: { size: 1 } }]).exec();
        } else if (type === 'Ring') {
            equipment = await Ring.aggregate([{ $match: { rarity } }, { $sample: { size: 1 } }]).exec();
        } else if (type === 'Amulet') {
            equipment = await Amulet.aggregate([{ $match: { rarity } }, { $sample: { size: 1 } }]).exec();
        } else if (type === 'Trinket') {
            equipment = await Trinket.aggregate([{ $match: { rarity } }, { $sample: { size: 1 } }]).exec(); 
        }
        console.log(equipment, 'equipment ?')
        res.status(200).json({ data: equipment });
    } catch (err) {
        res.status(400).json(err);
    }
}