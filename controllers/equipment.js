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
const Ascean = require('../models/ascean');
const mongodb = require('mongodb');
const chance = require('chance').Chance();
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://" + process.env.SNEED + "@cluster0.ivsipz0.mongodb.net/seyr?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports = {
    indexEquipment,
    getOneEquipment,
    upgradeEquipment,
    getMerchantEquipment,
    deleteEquipment
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
    let uScale = level / 25;
    let rScale = level / 100;
    let eScale = level / 500;
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
    const roll = Math.floor(Math.random() * 100  + 1);
    console.log(roll, 'Determining Equpment Type by Roll');
    
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

const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const randomizeStats = (item, rarity) => {
    console.log(item, 'Item in randomizeStats()')
    const stats = {};
    const attributeRanges = {
        Common: [0, 2],
        Uncommon: [1, 3],
        Rare: [2, 4],
        Epic: [4, 6],
        Legendary: [8, 12],
    };
    const attributeCounts = {
        Common: [1, 2],
        Uncommon: [1, 3],
        Rare: [2, 3],
        Epic: [3, 4],
        Legendary: [5, 6],
    };

    const range = attributeRanges[rarity];
    const attributes = ['strength', 'constitution', 'agility', 'achre', 'caeren', 'kyosir'];
    attributes.forEach(attribute => {
        console.log(attribute, item[attribute], 'Attribute')
        if (item[attribute] > 0) {
          item[attribute] = randomIntFromInterval(range[0], range[1]);
        }
    });

    console.log(stats, 'Stats in randomizeStats function');
    return stats;
}

async function getMerchantEquipment(req, res) {
    try {
        let merchantEquipment = [];
        let type;
        let rarity;
        for (let i = 0; i < 12; i++) {
            rarity = determineRarityByLevel(req.params.level);
            type = determineEquipmentType();
            console.log(type, 'Type of Item Ping 1')
            let equipment;
            let eqpCheck = Math.floor(Math.random() * 100 + 1);

            if (type === 'Amulet' || type === 'Ring' || type === 'Trinket') {
                if (rarity === 'Common') {
                    rarity = 'Uncommon';
                }
            }

            if (req.params.level < 4) {
                if (eqpCheck > 80) {
                    equipment = await Weapon.aggregate([{ $match: { rarity } }, { $sample: { size: 1 } }]).exec();
                    type = 'Weapon';
                    console.log(equipment, 'Weapon ?')
                } else if (eqpCheck > 60) {
                    equipment = await Shield.aggregate([{ $match: { rarity } }, { $sample: { size: 1 } }]).exec();
                    type = 'Shield';
                    console.log(equipment, 'Shield ?')
                } else if (eqpCheck > 40) {
                    equipment = await Helmet.aggregate([{ $match: { rarity } }, { $sample: { size: 1 } }]).exec();
                    type = 'Helmet';
                    console.log(equipment, 'Helmet ?')
                } else if (eqpCheck > 20) {
                    equipment = await Chest.aggregate([{ $match: { rarity } }, { $sample: { size: 1 } }]).exec();
                    type = 'Chest';
                    console.log(equipment, 'Chest ?')
                } else {
                    equipment = await Legs.aggregate([{ $match: { rarity } }, { $sample: { size: 1 } }]).exec();
                    type = 'Legs';
                    console.log(equipment, 'Legs ?')
                }
            } else if (type === 'Weapon') {
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
            console.log(type, 'Type of Item Ping 2')
            await seedDB(type, equipment, rarity);
            merchantEquipment.push(equipment[0]);
            // console.log(equipment, 'Equipment in Merchant Function')
        }
        console.log(type, 'Type in Merchant Function')
        res.status(200).json({ data: merchantEquipment });
    } catch (err) {
        console.log(err, 'Error in Merchant Function');
        res.status(400).json({ err });
    }
}

async function seedDB(type, equipment, rarity) {
    console.log(type, 'type in seedDB')
    try {
        await client.connect();
        const mondoDBCalls = equipment.map(async item => {
            let newItem = await insertIntoDB(item, rarity);
            return mongoDB(type, newItem);
          });
        await Promise.all(mondoDBCalls);
    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
    }
  }

const mongoDB = async (model, item) => {
    console.log(model, 'Model in mondoDB function')
    switch (model) {
        case 'Weapon': {
            await Weapon.insertMany(item); 
            break;
        };
        case 'Shield': {
            await Shield.insertMany(item); 
            break;
        };
        case 'Helmet': {
            await Helmet.insertMany(item); 
            break;
        };
        case 'Chest': {
            await Chest.insertMany(item); 
            break;
        };
        case 'Legs': {
            await Legs.insertMany(item); 
            break;
        };
        case 'Ring': {
            await Ring.insertMany(item); 
            break;
        };
        case 'Amulet': {
            await Amulet.insertMany(item); 
            break;
        };
        case 'Trinket': {
            await Trinket.insertMany(item); 
            break;
        };
        default: {
            console.log('No model found');
            break;
        };
    };
};

const insertIntoDB = async (item, rarity) => {
    item._id = new mongodb.ObjectID();
    let stats = randomizeStats(item, rarity);
    console.log(stats, 'Stats in insertIntoDB function');
    item = Object.assign(item, stats);
    return item;
};


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

async function createEquipment(req, res) {

}

async function upgradeEquipment(req, res) {
    try {
        let ascean = await Ascean.findById(req.body.asceanID);
        let item = await getHigherRarity(req.body.upgradeID);
        
        ascean.inventory.push(item._id);
        const itemIndex = ascean.inventory.indexOf(req.body.upgradeID);
        ascean.inventory.splice(itemIndex, 1);
        const secondItemIndex = ascean.inventory.indexOf(req.body.upgradeID);
        ascean.inventory.splice(secondItemIndex, 1);
        const thirdItemIndex = ascean.inventory.indexOf(req.body.upgradeID);
        ascean.inventory.splice(thirdItemIndex, 1);

        await ascean.save();
        res.status(201).json({ ascean });
    } catch (err) {
        console.log(err, 'err')
        res.status(400).json(err);
    }
}

async function getHigherRarity(id) {
    const models = {
        Weapon: Weapon,
        Shield: Shield,
        Helmet: Helmet,
        Chest: Chest,
        Legs: Legs,
        Ring: Ring,
        Amulet: Amulet,
        Trinket: Trinket,
    }
      
    const itemTypes = ['Weapon', 'Shield', 'Helmet', 'Chest', 'Legs', 'Ring', 'Amulet', 'Trinket'];
    // console.log(id, 'And did we make it here? 2')
    for (const itemType of itemTypes) {
        let item = await models[itemType].findById(id).exec();
        // console.log(item, 'And 3?')
        if (item) {
            console.log(item._id, 'item._id')
            const name = item.name;
            const rarity = item.rarity;
            // Determine the next rarity level
            let nextRarity;
            if (rarity === 'Common') {
                nextRarity = 'Uncommon';
            } else if (rarity === 'Uncommon') {
                nextRarity = 'Rare';
            } else if (rarity === 'Rare') {
                nextRarity = 'Epic';
            }

            // Find the next rarity item
            const nextItem = await models[itemType].findOne({ name, rarity: nextRarity }).exec();
            console.log(nextItem, 'nextItem')
            return nextItem;
        }
    }
    return null;
  }  

async function deleteEquipment(req, res) {
    const models = {
        Weapon: Weapon,
        Shield: Shield,
        Helmet: Helmet,
        Chest: Chest,
        Legs: Legs,
        Ring: Ring,
        Amulet: Amulet,
        Trinket: Trinket,
    }
    const itemTypes = ['Weapon', 'Shield', 'Helmet', 'Chest', 'Legs', 'Ring', 'Amulet', 'Trinket'];
    console.log(req.body, 'Item Ids to be Deleted')
    try {
        let result = null;
        for (const item of req.body) {
            for (const itemType of itemTypes) {
                result = await models[itemType].deleteMany({ _id: { $in: [item._id] } }).exec();
            }
        }
        res.status(200).json({ success: true, result });
    } catch (err) {
        console.log(err, 'err');
        res.status(400).json(err);
    }
}