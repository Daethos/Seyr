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
const Equipment = require('../models/equipment');
const eqpIDS = require('../data/equipmentIds.json');
const mongodb = require('mongodb');
const chance = require('chance').Chance();
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://" + process.env.SNEED + "@cluster0.ivsipz0.mongodb.net/seyr?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const fs = require('fs');

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports = {
    indexEquipment,
    getOneEquipment,
    upgradeEquipment,
    getMerchantEquipment,
    deleteEquipment,
    getAndWriteEquipmentIds
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
        Common: [0, 1],
        Uncommon: [1, 2],
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
        await client.connect();
        let merchantEquipment = [];
        let type;
        let rarity;
        for (let i = 0; i < 6; i++) {
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
    } finally {
        await client.close();
    }
}

async function seedDB(type, equipment, rarity) {
    try {
        const mondoDBCalls = equipment.map(async item => {
            let newItem = await mutateEquipment(item, rarity);
            return await Equipment.insertMany(item);
          });
    } catch (error) {
        console.error(error);
    };
};

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

const mutateEquipment = async (item, rarity) => {
    item._id = new mongodb.ObjectID();
    let stats = randomizeStats(item, rarity);
    console.log(stats, 'Stats in mutateEquipment function');
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
        // const itemIndex = ascean.inventory.indexOf(req.body.upgradeID);
        // ascean.inventory.splice(itemIndex, 1);
        // const secondItemIndex = ascean.inventory.indexOf(req.body.upgradeID);
        // ascean.inventory.splice(secondItemIndex, 1);
        // const thirdItemIndex = ascean.inventory.indexOf(req.body.upgradeID);
        // ascean.inventory.splice(thirdItemIndex, 1);
        let itemsToRemove = [];
        const inventoryToKeep = await inventoryCheck(ascean, req.body.upgradeName, req.body.currentRarity);

        // ascean.inventory.forEach(async (inventoryID) => {
        //     const inventoryItem = await determineItemType(inventoryID);
        //     console.log(inventoryItem.name, inventoryItem.rarity, req.body.upgradeName, req.body.currentRarity, 'inventoryItem.name, inventoryItem.rarity');
        //     if (inventoryItem.name === req.body.upgradeName && inventoryItem.rarity === req.body.currentRarity) {
        //         console.log('Does This Match?');
        //         itemsToRemove.push(inventoryID);
        //         if (itemsToRemove.length === 3) {
        //             return itemsToRemove;
        //         };
        //     };
        // });
        console.log(inventoryToKeep, 'inventory to keep');
        // const deletedItems = inventoryToRemove.forEach(async itemID => {
        //     console.log(itemID, 'Do you have an itemID?')
        //     const itemIndex = ascean.inventory.indexOf(itemID);
        //     ascean.inventory.splice(itemIndex, 1);
        //     await deleteEquipmentCheck(itemID);
        // });
        ascean.inventory = inventoryToKeep;
        await ascean.save();
        res.status(201).json({ ascean });
    } catch (err) {
        console.log(err, 'err')
        res.status(400).json(err);
    }
}

const inventoryCheck = async (ascean, name, rarity) => {
    console.log(ascean.inventory, 'ascean inventory')
    let newInventory = ascean.inventory;
    let itemsToRemove = [];
    for (const inventoryID of ascean.inventory) {
        const inventoryItem = await determineItemType(inventoryID);
        if (inventoryItem.name === name && inventoryItem.rarity === rarity) {
            itemsToRemove.push(inventoryID);
        };
    };
    console.log(itemsToRemove, 'This is what has been plucked')
    if (itemsToRemove.length > 3) {
        console.log(itemsToRemove, 'itemsToRemove, slicing down to 3 if needed')
        itemsToRemove = itemsToRemove.slice(0, 3);
    }
    newInventory = await removeItems(itemsToRemove, newInventory);

    return newInventory;
};

const removeItems = async (items, inventory) => {
    console.log(items, 'items in removeItems')
    const removedItems = await items.forEach(async itemID => {
        console.log(itemID, 'Do you have an itemID?');
        const itemIndex = inventory.indexOf(itemID);
        inventory.splice(itemIndex, 1);
        await deleteEquipmentCheck(itemID);
    });
    return inventory;
};
 
async function determineItemType(id) {
    const models = {
        Weapon: Weapon,
        Shield: Shield,
        Helmet: Helmet,
        Chest: Chest,
        Legs: Legs,
        Ring: Ring,
        Amulet: Amulet,
        Trinket: Trinket,
        Equipment: Equipment,
    }
    
    const itemTypes = ['Weapon', 'Shield', 'Helmet', 'Chest', 'Legs', 'Ring', 'Amulet', 'Trinket', 'Equipment'];
    // console.log(id, 'And did we make it here? 2')
    for (const itemType of itemTypes) {
        const item = await models[itemType].findById(id).exec();
        // console.log(item, 'And 3?')
        if (item) {
            return item;
        }
    }
    return null;
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
        Equipment: Equipment,
    }
      
    const itemTypes = ['Weapon', 'Shield', 'Helmet', 'Chest', 'Legs', 'Ring', 'Amulet', 'Trinket', 'Equipment'];
    for (const itemType of itemTypes) {
        let item = await models[itemType].findById(id).exec();
        if (item) {
            console.log(item._id, 'item._id')
            const name = item.name;
            const rarity = item.rarity;
            let nextRarity;
            if (rarity === 'Common') {
                nextRarity = 'Uncommon';
            } else if (rarity === 'Uncommon') {
                nextRarity = 'Rare';
            } else if (rarity === 'Rare') {
                nextRarity = 'Epic';
            }
            const nextItem = await models[itemType].findOne({ name, rarity: nextRarity }).exec();
            if (nextItem) {
                console.log(nextItem, 'nextItem');
                return nextItem;
            } else {
                for (const nextItemType of itemTypes) {
                    const realItem = await models[nextItemType].findOne({ name, rarity: nextRarity }).exec();
                    if (realItem) {
                        console.log(realItem, 'realItem');
                        return realItem;
                    }
                }
            }
        }
    }
    return null;
  }  

async function deleteEquipment(req, res) {
    console.log(req.body, 'Item Ids to be Deleted')
    try {
        let result = null;
        for (const item of req.body) {
            result = await Equipment.deleteMany({ _id: { $in: [item._id] } }).exec();
        }
        res.status(200).json({ success: true, result });
    } catch (err) {
        console.log(err, 'err');
        res.status(400).json(err);
    }
}

async function getAndWriteEquipmentIds(req, res) {
    console.log('Pinged and starting function');
    const models = {
        Weapon: Weapon,
        Shield: Shield,
        Helmet: Helmet,
        Chest: Chest,
        Legs: Legs,
        Ring: Ring,
        Amulet: Amulet,
        Trinket: Trinket,
    };
    const itemTypes = ['Weapon', 'Shield', 'Helmet', 'Chest', 'Legs', 'Ring', 'Amulet', 'Trinket'];
    let allEquipment = [];
    try {
        for (const itemType of itemTypes) {
            console.log('Pinged and starting to find equipment', itemType);
            // let equipment = await models[itemType].find().select('_id').exec();
            let equipment = await models[itemType].find({}).exec();
            console.log(equipment, 'Pinged and found equipment');
            allEquipment.push(equipment);
        };
        console.log(allEquipment, 'allEquipment');
        const allEquipmentIds = allEquipment.flat().map(item => item._id);
        console.log(allEquipmentIds, 'allEquipmentIds');
        await fs.promises.writeFile('data/equipmentIds.json', JSON.stringify(allEquipmentIds));
        res.status(200).json({ success: true, allEquipmentIds });
    } catch (err) {
        console.log(err, 'err');
        res.status(400).json(err);
    };
};

const deleteEquipmentCheck = async (equipmentID) => {
    console.log('Did this carry over?')
    try {
        const allEquipmentIds = await fs.promises.readFile('data/equipmentIds.json');
        const parsedIds = JSON.parse(allEquipmentIds);
        if (parsedIds.includes(equipmentID)) {
            return console.log('Equipment found in golden template list. Must be preserved at all costs!');
        };
        const deleted = await Equipment.findByIdAndDelete(equipmentID).exec();
        console.log(`Successfully deleted equipment with id: ${deleted._id}`);
    } catch (err) {
        console.log(err, 'err');
    }
};