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
const fs = require('fs');

module.exports = {
    indexEquipment,
    getOneEquipment,
    upgradeEquipment,
    getMerchantEquipment,
    deleteEquipment,
    getAndWriteEquipmentIds,
    seedDB,
    getMartialWeaponEquipment,
    getMysticalWeaponEquipment,
    getArmorEquipment,
    getJewelryEquipment,
    getClothEquipment,
    getTestEquipment,
    writeEnemyDialog,
    deleteEnemyDialogNode,
    deleteEnemyDialogNodeOption
};

async function getTestEquipment(req, res) {
    try {
        const types = {
            Weapon,
            Shield,
            Helmet,
            Chest,
            Legs,
            Ring,
            Amulet,
            Trinket
        };
        const { name, type, rarity } = req.body;
        const equipment = await types[type].findOne({ name, rarity }).exec();
        res.status(200).json({ data: equipment });
    } catch (err) {
        res.status(400).json({ err }); 
    };
}; 

async function indexEquipment(_req, res) {
    try {
        const weapons = await Weapon.find({ rarity: { $in: [ 'Epic' ] } }).populate().exec();
        const shields = await Shield.find({ rarity: { $in: [ 'Epic' ] } }).populate().exec();
        const helmets = await Helmet.find({ rarity: { $in: [ 'Default', 'Common' ] } }).populate().exec();
        const chests = await Chest.find({ rarity: { $in: [ 'Default', 'Common' ] } }).populate().exec();
        const legs = await Legs.find({ rarity: { $in: [ 'Default', 'Common' ] } }).populate().exec();
        const rings = await Ring.find({ rarity: { $in: [ 'Epic' ] } }).populate().exec();
        const amulets = await Amulet.find({ rarity: { $in: [ 'Epic' ] } }).populate().exec();
        const trinkets = await Trinket.find({ rarity: { $in: [ 'Epic' ] } }).populate().exec();
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
    if (level < 4) {
        rarity = 'Common';
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
    return rarity;
};

const determineEquipmentType = () => {
    const roll = Math.floor(Math.random() * 100  + 1);
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
};

const randomizeStats = (item, rarity) => {
    const stats = {};
    const attributeRanges = {
        Common: [0, 1, 1, 1, 2, 3],
        Uncommon: [1, 1, 2, 2, 3, 5],
        Rare: [2, 3, 4, 5, 6, 8],
        Epic: [4, 5, 6, 7, 10, 12],
        Legendary: [10, 14, 17, 20, 24, 30],
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
                item[attribute] = randomIntFromInterval(range[4], range[5]);
            } else if (attributeCount === 2) {
                item[attribute] = randomIntFromInterval(range[2], range[4]);
            } else if (attributeCount === 3) {
                item[attribute] = randomIntFromInterval(range[1], range[3]);
            } else if (attributeCount === 4) { // 4-6
                item[attribute] = randomIntFromInterval(range[0], range[2]);
            } else if (attributeCount === 5) { // 5-6
                item[attribute] = randomIntFromInterval(range[0], range[1]);
            } else { // 6
                item[attribute] = randomIntFromInterval(range[0], range[0]);
            }
        };;
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
            item[dam] = randomIntFromInterval(item[dam] - 1, item[dam] + 5);
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
    });

    return stats;
};

async function getMerchantEquipment(req, res) {
    try {
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
        res.status(200).json({ data: merchantEquipment });
    } catch (err) {
        console.log(err, 'Error in Merchant Function');
        res.status(400).json({ err });
    };
};

async function getMartialWeaponEquipment(req, res) {
    try {
        let merchantEquipment = [];
        let rarity;
        let attack_type = 'Physical';
        for (let i = 0; i < 9; i++) {
            rarity = determineRarityByLevel(req.params.level);
            let equipment;
            if (req.params.level < 4) {
                rarity = 'Common';
                equipment = await Weapon.aggregate([{ $match: { rarity, attack_type } }, { $sample: { size: 1 } }]).exec();
            } else {
                equipment = await Weapon.aggregate([{ $match: { rarity, attack_type } }, { $sample: { size: 1 } }]).exec();
            };
            await seedDB(equipment, rarity);
            merchantEquipment.push(equipment[0]);
        };
        res.status(200).json({ data: merchantEquipment });
    } catch (err) {
        console.log(err, 'Error in Merchant Function');
        res.status(400).json({ err });
    };
};

async function getMysticalWeaponEquipment(req, res) {
    try {
        let merchantEquipment = [];
        let rarity;
        let attack_type = 'Magic';
        for (let i = 0; i < 9; i++) {
            rarity = determineRarityByLevel(req.params.level);
            let equipment;
            if (req.params.level < 4) {
                rarity = 'Common';
                equipment = await Weapon.aggregate([{ $match: { rarity, attack_type } }, { $sample: { size: 1 } }]).exec();
            } else {
                equipment = await Weapon.aggregate([{ $match: { rarity, attack_type } }, { $sample: { size: 1 } }]).exec();
            } ;
            await seedDB(equipment, rarity);
            merchantEquipment.push(equipment[0]);
        };
        res.status(200).json({ data: merchantEquipment });
    } catch (err) {
        console.log(err, 'Error in Merchant Function');
        res.status(400).json({ err });
    };
};

async function getJewelryEquipment(req, res) {
    try {
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
    };
};

async function getClothEquipment(req, res) {
    try {
        let merchantEquipment = [];
        let type;
        let rarity;
        let types = ['Helmet', 'Chest', 'Legs'];
        for (let i = 0; i < 9; i++) {
            rarity = determineRarityByLevel(req.params.level);
            type = types[Math.floor(Math.random() * types.length)];
            let equipment;
            let eqpCheck = Math.floor(Math.random() * 100 + 1);
            if (req.params.level < 4) {
                rarity = 'Common';
                if (eqpCheck > 66) {
                    equipment = await Helmet.aggregate([{ $match: { rarity, type: "Leather-Cloth" } }, { $sample: { size: 1 } }]).exec();
                    type = 'Helmet';
                } else if (eqpCheck > 33) {
                    equipment = await Chest.aggregate([{ $match: { rarity, type: "Leather-Cloth" } }, { $sample: { size: 1 } }]).exec();
                    type = 'Chest';
                } else {
                    equipment = await Legs.aggregate([{ $match: { rarity, type: "Leather-Cloth" } }, { $sample: { size: 1 } }]).exec();
                    type = 'Legs';
                };
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
        res.status(200).json({ data: merchantEquipment });
    } catch (err) {
        console.log(err, 'Error in Merchant Function');
        res.status(400).json({ err });
    };
};

async function getArmorEquipment(req, res) {
    try {
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
    };
};

async function seedDB(equipment, rarity) {
    try {
        equipment.map(async item => {
            await mutateEquipment(item, rarity);
            return await Equipment.insertMany(item);
          });
    } catch (error) {
        console.error(error);
    };
};

const mutateEquipment = async (item, rarity) => {
    item._id = new mongodb.ObjectId();
    item.itemType = 'Equipment';
    let stats = randomizeStats(item, rarity);
    item = Object.assign(item, stats);
    return item;
};


 async function getOneEquipment (req, res) {
    try {
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
                await seedDB(equipment, rarity);
                res.status(200).json({ data: equipment });
                return;
            } else if (eqpCheck > 60) {
                equipment = await Shield.aggregate([{ $match: { rarity } }, { $sample: { size: 1 } }]).exec();
                await seedDB(equipment, rarity);
                res.status(200).json({ data: equipment });
                return;
            } else if (eqpCheck > 40) {
                equipment = await Helmet.aggregate([{ $match: { rarity } }, { $sample: { size: 1 } }]).exec();
                await seedDB(equipment, rarity);
                res.status(200).json({ data: equipment });
                return;
            } else if (eqpCheck > 20) {
                equipment = await Chest.aggregate([{ $match: { rarity } }, { $sample: { size: 1 } }]).exec();
                await seedDB(equipment, rarity);
                res.status(200).json({ data: equipment });
                return;
            } else {
                equipment = await Legs.aggregate([{ $match: { rarity } }, { $sample: { size: 1 } }]).exec();
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
        await seedDB(equipment, rarity);
        res.status(200).json({ data: equipment });
    } catch (err) {
        console.log(err, 'Error Getting One Equipment')
        res.status(400).json(err);
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
        res.status(201).json(ascean);
    } catch (err) {
        console.log(err, 'err')
        res.status(400).json(err);
    };
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
    return nextItem || null;
};  

async function deleteEquipment(req, res) {
    try {
        let result = null;
        for (const item of req.body) {
            if (!item) continue;
            result = await Equipment.deleteMany({ _id: { $in: [item._id] } }).exec();
        };
        res.status(200).json({ success: true, result });
    } catch (err) {
        console.log(err, 'err');
        res.status(400).json(err);
    };
};

async function getAndWriteEquipmentIds(req, res) {
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
            let equipment = await models[itemType].find({}).exec();
            allEquipment.push(equipment);
        };
        const allEquipmentIds = allEquipment.flat().map(item => item._id);
        await fs.promises.writeFile('data/equipmentIds.json', JSON.stringify(allEquipmentIds));
        res.status(200).json({ success: true, allEquipmentIds });
    } catch (err) {
        console.log(err, 'err');
        res.status(400).json(err);
    };
};

async function writeEnemyDialog(req, res) {
    try {
        const jsonData = await fs.promises.readFile('src/components/GameCompiler/EnemyDialogNodes.json');
        const parsedData = await JSON.parse(jsonData);
        const existingNodeIndex = parsedData.nodes.findIndex(node => node.id === req.body.id);
        if (existingNodeIndex !== -1) {
            parsedData.nodes[existingNodeIndex] = req.body;
        } else {
            parsedData.nodes.push(req.body);
        };
        await fs.promises.writeFile('src/components/GameCompiler/EnemyDialogNodes.json', JSON.stringify(parsedData));
        res.status(200).json({ success: true, parsedData });
    } catch (err) {
        console.log(err, 'err');
        res.status(400).json(err);
    };
};

async function deleteEnemyDialogNode(req, res) {
    try {
        const jsonData = await fs.promises.readFile('src/components/GameCompiler/EnemyDialogNodes.json');
        const parsedData = JSON.parse(jsonData);
        const index = parsedData.nodes.findIndex(node => node.id === req.body.nodeId);
        if (index !== -1) {
            parsedData.nodes.splice(index, 1);
            await fs.promises.writeFile('src/components/GameCompiler/EnemyDialogNodes.json', JSON.stringify(parsedData));
            res.status(200).json({ success: true });
        } else {
            res.status(404).json({ success: false, message: `Node with ID ${req.body.nodeId} not found` });
        };
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    };
};

async function deleteEnemyDialogNodeOption(req, res) {
    const { nodeId, optionId } = req.body;
    console.log(nodeId, optionId, 'nodeId, optionId')
    try {
        const jsonData = await fs.promises.readFile('src/components/GameCompiler/EnemyDialogNodes.json');
        const parsedData = JSON.parse(jsonData);
        const index = parsedData.nodes.findIndex(node => node.id === nodeId);
        console.log(index, 'Index in Delete Enemy Dialog Node Option');
        if (index === -1) res.status(404).json({ success: false, message: `Node with ID ${nodeId} not found` });
        console.log(optionId, 'optionId in Delete Enemy Dialog Node Option');
        if (optionId === -1) res.status(404).json({ success: false, message: `Option with ID ${optionId} not found` });
        parsedData.nodes[index].options.splice(optionId, 1);
        await fs.promises.writeFile('src/components/GameCompiler/EnemyDialogNodes.json', JSON.stringify(parsedData));
        res.status(200).json({ success: true });
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    };
};
  

const deleteEquipmentCheck = async (equipmentID) => {
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