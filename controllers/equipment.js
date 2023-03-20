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
const mongodb = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const uri = process.env.DATABASE_URL;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const fs = require('fs');

module.exports = {
    indexEquipment,
    getOneEquipment,
    upgradeEquipment,
    getMerchantEquipment,
    deleteEquipment,
    getAndWriteEquipmentIds,
    seedDB,
    getWeaponEquipment,
    getArmorEquipment,
    getJewelryEquipment,
    getClothEquipment
}

async function indexEquipment(req, res) {
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
    };
};

const determineRarityByLevel = (level) => {
    const chance = Math.random();
    let rarity = '';
    let uScale = level / 40;
    let rScale = level / 200;
    let eScale = level / 500;
    let lScale = level / 10000;
    console.log(level, chance, uScale, rScale, eScale, lScale, 'We have made it to the determineRarityByLevel in the Equipment Controller!');
    if (level < 4) {
        // if (uScale > chance) {
            // rarity = 'Uncommon';
        // } else { 
            rarity = 'Common';
        // }
    } else if (level >= 4 && level < 12) {
        if (rScale > chance) {
            rarity = 'Rare';
        } else if (uScale > chance) {
            rarity = 'Uncommon';
        } else {
            rarity = 'Common';
        };
    } else if (level >= 12 && level < 20) {
        if (eScale > chance) {
            rarity = 'Epic';
        } else if (rScale > chance) {
            rarity = 'Rare';
        } else if (uScale > chance) {
            rarity = 'Uncommon';
        } else {
            rarity = 'Common';
        }
    } else if (level >= 20 && level < 30) {
        if (lScale > chance) {
            rarity = 'Legendary';
        } else if (eScale > chance) {
            rarity = 'Epic';
        } else if (rScale > chance) {
            rarity = 'Rare';
        } else {
            rarity = 'Uncommon';
        };
    };
    console.log(rarity, 'Rarity ?');
    return rarity;
};

const determineEquipmentType = () => {
    const roll = Math.floor(Math.random() * 100  + 1);
    console.log(roll, 'Determining Equipment Type by Roll');
    
    if (roll <= 32) {
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
    };
};

const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

const randomFloatFromInterval = (min, max) => {
    return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}

const randomizeStats = (item, rarity) => {
    const stats = {};
    const attributeRanges = {
        Common: [1, 1, 1, 2, 3],
        Uncommon: [1, 2, 2, 3, 5],
        Rare: [2, 3, 4, 5, 8],
        Epic: [4, 5, 6, 9, 12],
        Legendary: [10, 13, 16, 20, 25],
    };

    const range = attributeRanges[rarity];
    const attributes = ['strength', 'constitution', 'agility', 'achre', 'caeren', 'kyosir'];
    const attributeCount = attributes.filter(attribute => item[attribute] > 0).length;
    const chance = ['critical_chance', 'physical_penetration', 'magical_penetration', 'roll', 'dodge'];
    const damage = ['physical_damage', 'magical_damage'];
    const critDamage = ['critical_damage'];

    attributes.forEach(attribute => {
        console.log(attribute, item[attribute], 'Attribute')
        if (item[attribute] > 0) {
            if (attributeCount === 1) {
                item[attribute] = randomIntFromInterval(range[3], range[4]);
            } else if (attributeCount === 2) {
                item[attribute] = randomIntFromInterval(range[2], range[3]);
            } else if (attributeCount === 3) {
                item[attribute] = randomIntFromInterval(range[0], range[2]);
            } else { // 4-6
                item[attribute] = randomIntFromInterval(range[0], range[1]);
            };
        };
    });

    chance.forEach(att => {
        if (item[att] > 10) {
            item[att] = randomIntFromInterval(item[att] -2, item[att] + 5);
        } else if (item[att] > 5) { // 6-10
            item[att] = randomIntFromInterval(item[att] - 1, item[att] + 3);
        } else if (item[att] >= 3) { // 3-5
            item[att] = randomIntFromInterval(item[att], item[att] + 2);
        } else if (item[att] > 0) { // 1-2
            item[att] = randomIntFromInterval(item[att], item[att] + 1);
        };
    });

    damage.forEach(dam => {
        if (item[dam] > 20) { // 21 +/- 5/3
            item[dam] = randomIntFromInterval(item[dam] - 2, item[dam] + 5);
        } else if (item[dam] > 10) { // 11-20 +/- 3/2
            item[dam] = randomIntFromInterval(item[dam] - 1, item[dam] + 3);
        } else if (item[dam] > 5) { // 6-10 +/- 2/1
            item[dam] = randomIntFromInterval(item[dam], item[dam] + 2);
        } else if (item[dam] > 1) { // 2-5 +/- 1/0
            item[dam] = randomIntFromInterval(item[dam], item[dam] + 1);
        };
    });

    critDamage.forEach(dam => {
        if (item[dam] > 1.99) { // 2.0 +/- 0.3/0.25 (0.55 Range)
            item[dam] = randomFloatFromInterval(item[dam] - 0.25, item[dam] + 0.3);
        } else if (item[dam] > 1.74) { // 1.75 +/- 0.25/0.2 (0.45 Range)
            item[dam] = randomFloatFromInterval(item[dam] - 0.2, item[dam] + 0.25);
        } else if (item[dam] > 1.49) { // 1.5 +/- 0.2/0.15 (0.35 Range)
            item[dam] = randomFloatFromInterval(item[dam] - 0.15, item[dam] + 0.2);
        } else if (item[dam] > 1.24) { // 1.25 +/- 0.15/0.1 (0.25 Range)
            item[dam] = randomFloatFromInterval(item[dam] - 0.1, item[dam] + 0.15);
        } else if (item[dam] > 1.09) { // 1.1 +/- 0.05/0.02 (0.07 Range)
            item[dam] = randomFloatFromInterval(item[dam] - 0.02, item[dam] + 0.05);
        } else if (item[dam] > 1.05) { // 1.05 +/- 0.04/0.01 (0.05 Range)
            item[dam] = randomFloatFromInterval(item[dam] - 0.01, item[dam] + 0.04);
        } else if (item[dam] === 1.03) { // 1.00 +/- 0.03/0 (0.03 Range)
            item[dam] = randomFloatFromInterval(item[dam], item[dam] + 0.03);
        } else if (item[dam] === 1.02) { // 1.00 +/- 0.02/0 (0.02 Range)
            item[dam] = randomFloatFromInterval(item[dam], item[dam] + 0.02);
        } else if (item[dam] === 1.01) { // 1.00 +/- 0.01/0 (0.01 Range)
            item[dam] = randomFloatFromInterval(item[dam], item[dam] + 0.01);
        };
    })

    return stats;
};

async function getMerchantEquipment(req, res) {
    try {
        await client.connect();
        let merchantEquipment = [];
        let type;
        let rarity;
        for (let i = 0; i < 12; i++) {
            rarity = determineRarityByLevel(req.params.level);
            type = determineEquipmentType();
            let equipment;
            let eqpCheck = Math.floor(Math.random() * 100 + 1);
            if (type === 'Amulet' || type === 'Ring' || type === 'Trinket') {
                if (rarity === 'Common') {
                    rarity = 'Uncommon';
                };
            };
            if (req.params.level < 4) {
                rarity = 'Common';
                if (eqpCheck > 75) {
                    equipment = await Weapon.aggregate([{ $match: { rarity } }, { $sample: { size: 1 } }]).exec();
                    type = 'Weapon';
                } else if (eqpCheck > 60) {
                    equipment = await Shield.aggregate([{ $match: { rarity } }, { $sample: { size: 1 } }]).exec();
                    type = 'Shield';
                } else if (eqpCheck > 40) {
                    equipment = await Helmet.aggregate([{ $match: { rarity } }, { $sample: { size: 1 } }]).exec();
                    type = 'Helmet';
                } else if (eqpCheck > 20) {
                    equipment = await Chest.aggregate([{ $match: { rarity } }, { $sample: { size: 1 } }]).exec();
                    type = 'Chest';
                } else {
                    equipment = await Legs.aggregate([{ $match: { rarity } }, { $sample: { size: 1 } }]).exec();
                    type = 'Legs';
                };
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
            };
            await seedDB(equipment, rarity);
            merchantEquipment.push(equipment[0]);
        };
        // console.log(type, 'Type in Merchant Function')
        res.status(200).json({ data: merchantEquipment });
    } catch (err) {
        console.log(err, 'Error in Merchant Function');
        res.status(400).json({ err });
    } finally {
        await client.close();
    };
};

async function getWeaponEquipment(req, res) {
    try {
        await client.connect();
        let merchantEquipment = [];
        let rarity;
        for (let i = 0; i < 9; i++) {
            rarity = determineRarityByLevel(req.params.level);
            let equipment;
            if (req.params.level < 4) {
                rarity = 'Common';
                equipment = await Weapon.aggregate([{ $match: { rarity } }, { $sample: { size: 1 } }]).exec();
            } else {
                equipment = await Weapon.aggregate([{ $match: { rarity } }, { $sample: { size: 1 } }]).exec();
            } ;
            await seedDB(equipment, rarity);
            merchantEquipment.push(equipment[0]);
        };
        res.status(200).json({ data: merchantEquipment });
    } catch (err) {
        console.log(err, 'Error in Merchant Function');
        res.status(400).json({ err });
    } finally {
        await client.close();
    };
};

async function getJewelryEquipment(req, res) {
    try {
        await client.connect();
        let merchantEquipment = [];
        let type;
        let rarity;
        let types = ['Ring', 'Amulet', 'Trinket'];
        for (let i = 0; i < 9; i++) {
            rarity = determineRarityByLevel(req.params.level);
            if (rarity === 'Common') {
                rarity = 'Uncommon';
            };
            type = types[Math.floor(Math.random() * types.length)];
            let equipment;
            if (type === 'Ring') {
                equipment = await Ring.aggregate([{ $match: { rarity } }, { $sample: { size: 1 } }]).exec();
            } else if (type === 'Amulet') {
                equipment = await Amulet.aggregate([{ $match: { rarity } }, { $sample: { size: 1 } }]).exec();
            } else if (type === 'Trinket') {
                equipment = await Trinket.aggregate([{ $match: { rarity } }, { $sample: { size: 1 } }]).exec(); 
            };
            await seedDB(equipment, rarity);
            merchantEquipment.push(equipment[0]);
        };
        res.status(200).json({ data: merchantEquipment });
    } catch (err) {
        console.log(err, 'Error in Merchant Function');
        res.status(400).json({ err });
    } finally {
        await client.close();
    };
};

async function getClothEquipment(req, res) {
    try {
        await client.connect();
        let merchantEquipment = [];
        let type;
        let rarity;
        let types = ['Weapon', 'Helmet', 'Chest', 'Legs'];
        for (let i = 0; i < 9; i++) {
            rarity = determineRarityByLevel(req.params.level);
            type = types[Math.floor(Math.random() * types.length)];
            let equipment;
            let eqpCheck = Math.floor(Math.random() * 100 + 1);
            if (req.params.level < 4) {
                rarity = 'Common';
                if (eqpCheck > 75) {
                    equipment = await Weapon.aggregate([ { $match: { rarity, attack_type: "Magic" } }, { $sample: { size: 1 } }]).exec();
                    type = 'Weapon';
                } else if (eqpCheck > 50) {
                    equipment = await Helmet.aggregate([{ $match: { rarity, type: "Leather-Cloth" } }, { $sample: { size: 1 } }]).exec();
                    type = 'Helmet';
                } else if (eqpCheck > 25) {
                    equipment = await Chest.aggregate([{ $match: { rarity, type: "Leather-Cloth" } }, { $sample: { size: 1 } }]).exec();
                    type = 'Chest';
                } else {
                    equipment = await Legs.aggregate([{ $match: { rarity, type: "Leather-Cloth" } }, { $sample: { size: 1 } }]).exec();
                    type = 'Legs';
                };
            } else if (type === 'Weapon') {
                equipment = await Weapon.aggregate([{ $match: { rarity, attack_type: "Magic" } }, { $sample: { size: 1 } } ]).exec();
            } else if (type === 'Helmet') {
                equipment = await Helmet.aggregate([{ $match: { rarity, type: "Leather-Cloth" } }, { $sample: { size: 1 } }]).exec();
            } else if (type === 'Chest') {
                equipment = await Chest.aggregate([{ $match: { rarity, type: "Leather-Cloth" } }, { $sample: { size: 1 } }]).exec();
            } else if (type === 'Legs') {
                equipment = await Legs.aggregate([{ $match: { rarity, type: "Leather-Cloth" } }, { $sample: { size: 1 } }]).exec();
            };
            await seedDB(equipment, rarity);
            merchantEquipment.push(equipment[0]);
        };
        // console.log(type, 'Type in Merchant Function')
        res.status(200).json({ data: merchantEquipment });
    } catch (err) {
        console.log(err, 'Error in Merchant Function');
        res.status(400).json({ err });
    } finally {
        await client.close();
    };
};

async function getArmorEquipment(req, res) {
    try {
        await client.connect();
        let merchantEquipment = [];
        let type;
        let rarity;
        let types = ['Shield', 'Helmet', 'Chest', 'Legs', 'Helmet', 'Chest', 'Legs', 'Helmet', 'Chest', 'Legs'];
        for (let i = 0; i < 9; i++) {
            rarity = determineRarityByLevel(req.params.level);
            type = types[Math.floor(Math.random() * types.length)];
            let equipment;
            let eqpCheck = Math.floor(Math.random() * 100 + 1);
            if (req.params.level < 4) {
                rarity = 'Common';
                 if (eqpCheck > 90) {
                    equipment = await Shield.aggregate([{ $match: { rarity } }, { $sample: { size: 1 } }]).exec();
                    type = 'Shield';
                } else if (eqpCheck > 60) {
                    equipment = await Helmet.aggregate([ { $match: { rarity, type: { $ne: 'Leather-Cloth' } } }, { $sample: { size: 1 } }]).exec();
                    type = 'Helmet';
                } else if (eqpCheck > 30) {
                    equipment = await Chest.aggregate([{ $match: { rarity, type: { $ne: 'Leather-Cloth' } } }, { $sample: { size: 1 } }]).exec();
                    type = 'Chest';
                } else {
                    equipment = await Legs.aggregate([{ $match: { rarity, type: { $ne: 'Leather-Cloth' } } }, { $sample: { size: 1 } }]).exec();
                    type = 'Legs';
                };
            } else if (type === 'Shield') {
                equipment = await Shield.aggregate([{ $match: { rarity } }, { $sample: { size: 1 } }]).exec();
            } else if (type === 'Helmet') {
                equipment = await Helmet.aggregate([{ $match: { rarity, type: { $ne: 'Leather-Cloth' } } }, { $sample: { size: 1 } }]).exec();
            } else if (type === 'Chest') {
                equipment = await Chest.aggregate([{ $match: { rarity, type: { $ne: 'Leather-Cloth' } } }, { $sample: { size: 1 } }]).exec();
            } else if (type === 'Legs') {
                equipment = await Legs.aggregate([{ $match: { rarity, type: { $ne: 'Leather-Cloth' } } }, { $sample: { size: 1 } }]).exec();
            } 
            await seedDB(equipment, rarity);
            merchantEquipment.push(equipment[0]);
        };
        res.status(200).json({ data: merchantEquipment });
    } catch (err) {
        console.log(err, 'Error in Merchant Function');
        res.status(400).json({ err });
    } finally {
        await client.close();
    };
};

async function seedDB(equipment, rarity) {
    try {
        const mondoDBCalls = equipment.map(async item => {
            let newItem = await mutateEquipment(item, rarity);
            // console.log(newItem, 'New Item in seedDB function')
            return await Equipment.insertMany(item);
          });
    } catch (error) {
        console.error(error);
    };
};

const mutateEquipment = async (item, rarity) => {
    item._id = new mongodb.ObjectID();
    item.itemType = 'Equipment';
    let stats = randomizeStats(item, rarity);
    item = Object.assign(item, stats);
    return item;
};


 async function getOneEquipment (req, res) {
    try {
        await client.connect();
        let rarity = determineRarityByLevel(req.params.level);
        const type = determineEquipmentType();

        if (type === 'Amulet' || type === 'Ring' || type === 'Trinket') {
            if (rarity === 'Common') {
                rarity = 'Uncommon';
            };
        };

        let equipment;
        let eqpCheck = Math.floor(Math.random() * 100  + 1);
        if (req.params.level < 4) {
            rarity = 'Common';
            if (eqpCheck > 75) {
                equipment = await Weapon.aggregate([{ $match: { rarity } }, { $sample: { size: 1 } }]).exec();
                console.log(equipment, 'equipment ?')
                await seedDB(equipment, rarity);
                res.status(200).json({ data: equipment });
                return;
            } else if (eqpCheck > 60) {
                equipment = await Shield.aggregate([{ $match: { rarity } }, { $sample: { size: 1 } }]).exec();
                console.log(equipment, 'equipment ?')
                await seedDB(equipment, rarity);
                res.status(200).json({ data: equipment });
                return;
            } else if (eqpCheck > 40) {
                equipment = await Helmet.aggregate([{ $match: { rarity } }, { $sample: { size: 1 } }]).exec();
                console.log(equipment, 'equipment ?')
                await seedDB(equipment, rarity);
                res.status(200).json({ data: equipment });
                return;
            } else if (eqpCheck > 20) {
                equipment = await Chest.aggregate([{ $match: { rarity } }, { $sample: { size: 1 } }]).exec();
                console.log(equipment, 'equipment ?')
                await seedDB(equipment, rarity);
                res.status(200).json({ data: equipment });
                return;
            } else {
                equipment = await Legs.aggregate([{ $match: { rarity } }, { $sample: { size: 1 } }]).exec();
                console.log(equipment, 'equipment ?')
                await seedDB(equipment, rarity);
                res.status(200).json({ data: equipment });
                return;
            };
        };

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
        await seedDB(equipment, rarity);
        res.status(200).json({ data: equipment });
    } catch (err) {
        console.log(err, 'Error Getting One Equipment')
        res.status(400).json(err);
    } finally {
        await client.close();
    };
};

async function upgradeEquipment(req, res) {
    try {
        let realType;
        switch (req.body.inventoryType) {
            case 'weapon_one': realType = Weapon; break;
            case 'weapon_two': realType = Weapon; break;
            case 'weapon_three': realType = Weapon; break;
            case 'shield': realType = Shield; break;
            case 'helmet': realType = Helmet; break;
            case 'chest': realType = Chest; break;
            case 'legs': realType = Legs; break;
            case 'ring_one': realType = Ring; break;
            case 'amulet': realType = Amulet; break;
            case 'trinket': realType = Trinket; break;
            default: realType = null; break;
        }
        console.log(realType, 'The Real Type of Equipment');
        let ascean = await Ascean.findById(req.body.asceanID);
        let item = await getHigherRarity(req.body.upgradeName, realType, req.body.currentRarity);
        await seedDB([item], item.rarity);
        ascean.inventory.push(item._id);
        let itemsToRemove = req.body.upgradeMatches;

        if (itemsToRemove.length > 3) {
            itemsToRemove = itemsToRemove.slice(0, 3);
        };
        const itemsIdsToRemove = itemsToRemove.map(item => item._id);

        let inventory = ascean.inventory;

        itemsIdsToRemove.forEach(async itemID => {
            const itemIndex = inventory.indexOf(itemID);
            inventory.splice(itemIndex, 1);
            await deleteEquipmentCheck(itemID);
        });

        ascean.inventory = inventory;
        let gold = 0;
        if (item.rarity === 'Uncommon') {
            gold = 1;
        } else if (item.rarity === 'Rare') {
            gold = 3;
        } else if (item.rarity === 'Epic') {
            gold = 12;
        } else if (item.rarity === 'Legendary') {
            gold = 60;
        };
        ascean.currency.gold -= gold;

        await ascean.save();
        res.status(201).json({ ascean });
    } catch (err) {
        console.log(err, 'err')
        res.status(400).json(err);
    };
};

const removeItems = async (items, inventory) => {
    console.log(items, 'items in removeItems')
    await Promise.all(items.map(async itemID => {
        await deleteEquipmentCheck(itemID);
    }));
    return inventory.filter(id => !items.includes(id));
};

async function getHigherRarity(name, type, rarity) {
    let nextRarity;
    if (rarity === 'Common') {
        nextRarity = 'Uncommon';
    } else if (rarity === 'Uncommon') {
        nextRarity = 'Rare';
    } else if (rarity === 'Rare') {
        nextRarity = 'Epic';
    } else if (rarity === 'Epic') {
        nextRarity = 'Legendary';
    };
    const nextItem = await type.findOne({ name, rarity: nextRarity }).exec();
    console.log(nextItem, 'Is This The NExt Item ???')
    return nextItem || null;
};  

async function deleteEquipment(req, res) {
    console.log(req.body, 'Item Ids to be Deleted');
    try {
        let result = null;
        for (const item of req.body) {
            result = await Equipment.deleteMany({ _id: { $in: [item._id] } }).exec();
        }
        res.status(200).json({ success: true, result });
    } catch (err) {
        console.log(err, 'err');
        res.status(400).json(err);
    };
};

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
    console.log(equipmentID, 'Did this carry over?')
    try {
        const allEquipmentIds = await fs.promises.readFile('data/equipmentIds.json');
        const parsedIds = await JSON.parse(allEquipmentIds);
        if (parsedIds.includes(equipmentID)) {
            return console.log('Equipment found in golden template list. Must be preserved at all costs!');
        };
        const deleted = await Equipment.findByIdAndDelete(equipmentID).exec();
        console.log(`Successfully deleted equipment: ${deleted}`);
    } catch (err) {
        console.log(err, 'err');
    };
};