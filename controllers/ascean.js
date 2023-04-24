const Ascean = require('../models/ascean');
const asceanService = require('../services/asceanServices');
const Weapon = require('../models/weapon');
const Shield = require('../models/shield');
const Helmet = require('../models/helmet');
const Chest = require('../models/chest');
const Legs = require('../models/legs');
const Ring = require('../models/ring');
const Amulet = require('../models/amulet');
const Trinket = require('../models/trinket');
const Equipment = require('../models/equipment');
const Map = require('../models/map');
const fs = require('fs');
const seedDB = require('./equipment').seedDB;
const zlib = require('zlib');

module.exports = {
    create,
    index,
    quickIndex,
    editAscean,
    getOneAscean,
    delete: deleteAscean,
    getAsceanStats,
    updateHighScore,
    updateLevel,
    saveExperience,
    saveToInventory,
    saveInventory,
    swapItems,
    removeItem,
    purchaseToInventory,
    searchAscean,
    saveCoordinates,
    drinkFirewater,
    restoreFirewater,
    replenishFirewater,
    animalStats,
    getOneAsceanClean,
    killAscean,
    persistAscean,
    getAsceanAndInventory,
    getAsceanInventory,
    getAsceanQuests,
    killAscean,
    persistAscean,
    firstTutorial,
    asceanTax,
};

async function firstTutorial(req, res) {
    try {
        const ascean = await Ascean.findById(req.params.id);
        ascean.tutorial[req.params.tutorial] = false;
        ascean.save();
        res.status(201).json(ascean);
    } catch (err) {
        console.log(err.message, "Error Changing Tutorial");
        res.status(400).json(err);
    };
};

async function killAscean(req, res) {
    try {
        const ascean = await Ascean.findById(req.params.id);
        ascean.alive = false;
        ascean.save();
        res.status(201).json(ascean);
    } catch (err) {
        console.log(err.message, "Error Killing Ascean");
        res.status(400).json(err);
    };
};

async function persistAscean(req, res) {
    console.log(req.body.lineage.name, req.body.name, '<- Hopefully the Ascean!');

    if (req.body.faith === 'devoted') { // Devoted to Daethos
        if (parseInt(req.body.strength) + parseInt(req.body.agility) >= parseInt(req.body.achre) + parseInt(req.body.caeren)) {
            if (parseInt(req.body.strength) > parseInt(req.body.agility)) { // Daethic Halberd && Hush of Daethos
                req.body.weapon_one = '63d059865df7503ef9cd71f4';
                req.body.weapon_two = '63b3460cd5c6cfea02a5e58e';
            } else if (parseInt(req.body.strength) < parseInt(req.body.agility)) { // Gladius && Daethic Bow
                req.body.weapon_one = '63b3460cd5c6cfea02a5e56c';
                req.body.weapon_two = '63b3460cd5c6cfea02a5e586';
            } else { // Same Value Daethic Bow && Daethic Halberd
                req.body.weapon_one = '63b3460cd5c6cfea02a5e586';
                req.body.weapon_two = '63d059865df7503ef9cd71f4';
            }
        } else {
            if (parseInt(req.body.achre) > parseInt(req.body.caeren)) { // Tendril && Daethic Bow
                req.body.weapon_one = '63b3460cd5c6cfea02a5e583';
                req.body.weapon_two = '63b3460cd5c6cfea02a5e586';
            } else if (parseInt(req.body.achre) < parseInt(req.body.caeren)) { // Hush of Daethos && Tendril of Daethos
                req.body.weapon_one = '63b3460cd5c6cfea02a5e58e';
                req.body.weapon_two = '63b3460cd5c6cfea02a5e58f';
            } else { // Same Value Blessed Dagger && Cursed Dagger
                req.body.weapon_one = '63e47c140de4781b96411d67';
                req.body.weapon_two = '63b3460cd5c6cfea02a5e572';
            }
        }
    } else { // Adherent to the Ancients or Irreligious
        if (parseInt(req.body.strength) + parseInt(req.body.agility) >= parseInt(req.body.achre) + parseInt(req.body.caeren)) {
            if (parseInt(req.body.strength) > parseInt(req.body.agility)) { // War Hammer && Sunshatter
                req.body.weapon_one = '63b3460cd5c6cfea02a5e578';
                req.body.weapon_two = '63e47c140de4781b96411d6b';
            } else if (parseInt(req.body.strength) < parseInt(req.body.agility)) { // Longsword && Sevashyr
                req.body.weapon_one = '63b3460cd5c6cfea02a5e56d';
                req.body.weapon_two = '63e54b27d110dc7ef8fd630b';
            } else { // Same Value Claymore && Longbow
                req.body.weapon_one = '63b3460cd5c6cfea02a5e576';
                req.body.weapon_two = '63b3460cd5c6cfea02a5e585';
            }
        } else {
            if (parseInt(req.body.achre) > parseInt(req.body.caeren)) { // Astral Spear && Quor'eite Crush
                req.body.weapon_one = '63b3460cd5c6cfea02a5e57f';
                req.body.weapon_two = '63b3460cd5c6cfea02a5e581';
            } else if (parseInt(req.body.achre) < parseInt(req.body.caeren)) { // Ashfyre && Nyrolean Wave
                req.body.weapon_one = '63b3460cd5c6cfea02a5e588';
                req.body.weapon_two = '63b3460cd5c6cfea02a5e58b';
            } else { // Same Value Wildstrike && Nightmare
                req.body.weapon_one = '63b3460cd5c6cfea02a5e582';
                req.body.weapon_two = '63e47c140de4781b96411d77';
            }
        }
    }

    const firstWeapon = await Weapon.findById(req.body.weapon_one);
    await seedDB([firstWeapon], firstWeapon.rarity);
    const secondWeapon = await Weapon.findById(req.body.weapon_two);
    await seedDB([secondWeapon], secondWeapon.rarity);

    try {
        const previous = req.body.lineage;

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
            const item = await determineItemType(previous[field]);
            return item ? item : null;
        }));
        populated.forEach((item, index) => {
            previous[fields[index]] = item;
        });

        let pCon = previous.constitution > 100 ? 6 : previous.constitution > 50 ? 4 : previous.constitution > 25 ? 2 : 0;
        let pStr = previous.strength > 100 ? 6 : previous.strength > 50 ? 4 : previous.strength > 25 ? 2 : 0;
        let pAgi = previous.agility > 100 ? 6 : previous.agility > 50 ? 4 : previous.agility > 25 ? 2 : 0;
        let pAch = previous.achre > 100 ? 6 : previous.achre > 50 ? 4 : previous.achre > 25 ? 2 : 0;
        let pCae = previous.caeren > 100 ? 6 : previous.caeren > 50 ? 4 : previous.caeren > 25 ? 2 : 0;
        let pKyo = previous.kyosir > 100 ? 6 : previous.kyosir > 50 ? 4 : previous.kyosir > 25 ? 2 : 0;

        let nCon = Number(req.body.constitution);
        let nStr = Number(req.body.strength);
        let nAgi = Number(req.body.agility);
        let nAch = Number(req.body.achre);
        let nCae = Number(req.body.caeren);
        let nKyo = Number(req.body.kyosir);

        switch (previous.mastery) {
            case "Constitution":
                nCon += pCon;
                break;
            case "Strength":
                nStr += pStr;
                break;
            case "Agility":
                nAgi += pAgi;
                break;
            case "Achre":
                nAch += pAch;
                break;
            case "Caeren":
                nCae += pCae;
                break;
            case "Kyosir":
                nKyo += pKyo;
                break;
            default:
                break;
        };
        console.log(req.body.achre, nAch, pAch, "Achre - Pre, New, Bonus")
        let weapon = await imprintEquipment(previous.weapon_one);
        let shield = await imprintEquipment(previous.shield);
        let helmet = await imprintEquipment(previous.helmet);
        let chest = await imprintEquipment(previous.chest);
        let legs = await imprintEquipment(previous.legs);

        const ascean = await Ascean.create({
            user: req.user,
            name: req.body.name,
            index: req.body.name,
            origin: req.body.origin,
            sex: req.body.sex,
            description: req.body.description,
            constitution: nCon,
            strength: nStr,
            agility: nAgi,
            achre: nAch,
            caeren: nCae,
            kyosir: nKyo,
            mastery: req.body.mastery,
            weapon_one: firstWeapon._id,
            weapon_two: secondWeapon._id,
            weapon_three: weapon._id,
            shield: shield._id,
            helmet: helmet._id,
            chest: chest._id,
            legs: legs._id,
            ring_one: '63b3491009fa8aa7e4495996',
            ring_two: '63b3491009fa8aa7e4495996',
            amulet: '63b3491109fa8aa7e4495999',
            trinket: '63b3491109fa8aa7e449599b',
            faith: req.body.faith,
            currency: {
                silver: req.body.lineage.kyosir,
                gold: 0,
            },
            shareable: req.body.shareable,
            visibility: req.body.visibility,
            hardcore: true,
            lineage: [...previous.lineage, previous._id]
        })
        res.status(201).json(ascean);
    } catch (err) {
        console.log(err.message, "Error Persisting Ascean");
        res.status(400).json({ err });
    }
};

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
};

async function imprintEquipment(inventory) {
    let type = ''
    if (inventory.grip) {
        type = 'Weapon';
    };
    if (inventory?.name.includes('Hood') || inventory?.name.includes('Helm') || inventory?.name.includes('Mask')) {
        type = 'Helmet';
    };
    if (inventory?.name.includes('Cuirass') || inventory?.name.includes('Robes') || inventory?.name.includes('Armor')) {
        type = 'Chest';
    };
    if (inventory?.name.includes('Greaves') || inventory?.name.includes('Pants') || inventory?.name.includes('Legs')) {
        type = 'Legs';
    };
    if (inventory?.type.includes('Shield')) {
        type = 'Shield';
    };
    let models = {
        Weapon: Weapon,
        Shield: Shield,
        Helmet: Helmet,
        Chest: Chest,
        Legs: Legs,
    };
    let rarity = 'Common';
    item = await models[type].findOne({ name: inventory.name, rarity: rarity }).exec();
    await seedDB([item], rarity);
    return item;
}

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

async function drinkFirewater(req, res) {
    try {
        let ascean = await Ascean.findByIdAndUpdate(req.params.id, {
            $inc: {
                "firewater.charges": -1,
            },
        }, { new: true });
        console.log(ascean.firewater, ascean.health.current, ascean.health.total, "Drinking Firewater")
        const healing = ascean.health.total * 0.4;
        ascean.health.current += healing;
        ascean.health.current = ascean.health.current > ascean.health.total ? ascean.health.total : ascean.health.current;
        await ascean.save(); 
        res.status(201).json(ascean);
    } catch (err) {
        console.log(err.message, '<- Error in the Controller Drinking Firewater!')
        res.status(400).json(err);
    };
};

async function replenishFirewater(req, res) {
    try {
        let ascean = await Ascean.findById(req.params.id);
        let cost = ascean.level * 100;
        ascean.firewater.charges = 5;
        ascean.experience -= cost < 0 ? ascean.experience : cost;
        await ascean.save();
        console.log(ascean.firewater, "Firewater After Saving Replenish")
        res.status(201).json(ascean);
    } catch (err) {
        console.log(err.message, '<- Error in the Controller Drinking Firewater!')
        res.status(400).json(err);
    }
};

async function asceanTax(req, res) {
    try {
        let ascean = await Ascean.findById(req.params.id);
        const tax = req.params.tax;
        let goldTax;
        let silverTax;
        if (tax >= 100) {
            goldTax = Math.floor(tax / 100);
            silverTax = tax % 100;
        } else {
            goldTax = 0;
            silverTax = tax;
        };
        ascean.currency.gold -= goldTax;
        ascean.currency.silver -= silverTax;
        await rebalanceCurrency(ascean);
        await ascean.save();
        res.status(201).json(ascean.currency);
    } catch (err) {
        console.log(err.message, '<- Error in the Controller Drinking Firewater!')
        res.status(400).json(err);
    }
}

async function restoreFirewater(req, res) {
    try {
        // let ascean = await Ascean.findByIdAndUpdate(req.params.id, {
        //     "firewater.charges": 5,
        // }, { new: true });
        let ascean = await Ascean.findById(req.params.id);
        const cost = (5 - ascean.firewater.charges) * 10;
        console.log(cost, "Cost of Restoring Firewater")
        ascean.firewater.charges = 5;
        if (ascean.currency.silver > cost) {
            ascean.currency.silver -= cost;
            console.log("You had the silver for it")
        } else if (ascean.currency.gold > 0) {
            ascean.currency.gold -= 1;
            ascean.currency.silver += 100;
            ascean.currency.silver -= cost;
            console.log("You had to pay gold for it")
        } else {
            ascean.experience -= (cost * 10) < 0 ? ascean.experience : (cost * 10);
            console.log("You had to pay experience for it")
        };
        await ascean.save();
        console.log(ascean.firewater, ascean.currency, "Firewater After Saving Restore");
        res.status(201).json(ascean);
    } catch (err) {
        console.log(err.message, '<- Error in the Controller Drinking Firewater!')
        res.status(400).json(err);
    }
}

async function saveCoordinates(req, res) {
    try {
        const ascean = await Ascean.findById(req.body.ascean);
        ascean.coordinates = req.body.coordinates;
        await ascean.save();
        req.body.map.map = await compress(req.body.map.map);
        await Map.findByIdAndUpdate(req.body.map._id, req.body.map, { new: true });
        
        res.status(201).json({ success: true });
    } catch (err) {
        console.log(err.message, '<- Error in the Controller Saving Coordinates!');
        res.status(400).json(err);
    }
};

async function compress(map) {
    const compressedMap = zlib.deflateSync(JSON.stringify(map));
    return compressedMap;
};

async function saveToInventory(req, res) {
    try {
        const ascean = await Ascean.findById(req.body.ascean._id);
        ascean.inventory.push(req.body.lootDrop._id);
        await ascean.save();
        res.status(201).json({ ascean });
    } catch (err) {
        console.log(err.message, '<- Error in the Controller Saving to Inventory!')
    };
};

async function saveInventory(req, res) {
    try {
        console.log(req.body, "Req.body")
        const ascean = await Ascean.findById(req.body.ascean);
        ascean.inventory = req.body.inventory;
        await ascean.save();
        res.status(201).json(ascean.inventory);
    } catch (err) {
        console.log(err.message, '<- Error in the Controller Saving to Inventory!')
    };
};

async function rebalanceCurrency(ascean) {
    while (ascean.currency.silver < 0) {
      ascean.currency.gold -= 1;
      ascean.currency.silver += 100;
    };
    while (ascean.currency.gold < 0) {
      ascean.currency.gold += 1;
      ascean.currency.silver -= 100;
    };
};

async function purchaseToInventory(req, res) {
    try {
        const ascean = await Ascean.findById(req.body.ascean._id);
        ascean.inventory.push(req.body.item._id);
        console.log(req.body.cost, 'Cost of EQP');
        ascean.currency.silver -= req.body.cost.silver;
        ascean.currency.gold -= req.body.cost.gold;
        await rebalanceCurrency(ascean);
        await ascean.save();
        res.status(201).json({ ascean });
    } catch (err) {
        console.log(err.message, '<- Error in the Controller Purchasing to Inventory!');
        res.status(400).json({ err });
    };
};

async function swapItems(req, res) {
    try {
        const ascean = await Ascean.findById(req.params.id);
        const keyToUpdate = Object.keys(req.body).find(key => {
            console.log(key, 'Key in Swapping Items');
            return typeof req.body[key] === 'string' && req.body[key] !== '';
        });
        const itemType = keyToUpdate.replace('new_', '');
        const currentItemId = ascean[itemType];
        ascean[itemType] = req.body[keyToUpdate];
        const currentItem = await determineItemType(currentItemId);
        if (!(currentItem.rarity === 'Default')) {
            ascean.inventory.push(currentItemId);
        };
        const currentItemIndex = ascean.inventory.indexOf(req.body[keyToUpdate]);
        ascean.inventory.splice(currentItemIndex, 1);
        await ascean.save();
        res.status(201).json({ ascean });
    } catch (err) {
        console.log(err.message, '<- Error in the Controller Swapping Items!');
        res.status(400).json({ err });
    };
};

const deleteEquipmentCheck = async (equipmentID) => {
    try {
        console.log(equipmentID, 'Did We Make It Here?')
        const allEquipmentIds = await fs.promises.readFile('data/equipmentIds.json');
        const parsedIds = JSON.parse(allEquipmentIds);
        if (parsedIds.includes(equipmentID)) {
            return console.log('Equipment found in golden template list. Must be preserved at all costs!');
        };
        const deleted = await Equipment.findByIdAndDelete(equipmentID).exec();
        console.log(`Successfully deleted equipment with id: ${deleted}`);
    } catch (err) {
        console.log(err, 'err');
        res.status(400).json({ err });
    };
};

async function removeItem(req, res) {
    try {
        const ascean = await Ascean.findById(req.params.id);
        const itemID = req.body.inventory._id;
        const itemIndex = ascean.inventory.indexOf(itemID);
        ascean.inventory.splice(itemIndex, 1);
        deleteEquipmentCheck(itemID);
        await ascean.save();
        res.status(201).json({ ascean });
    } catch (err) {
        res.status(400).json({ err });
        console.log(err.message, '<- Error in the Controller Removing Items!')
    };
};

async function updateLevel(req, res) {
    let constitution = Number(req.body.constitution);
    let strength = Number(req.body.strength);
    let agility = Number(req.body.agility);
    let achre = Number(req.body.achre);
    let caeren = Number(req.body.caeren);
    let kyosir = Number(req.body.kyosir);
    let mastery = req.body.ascean.mastery;
    let newMastery = req.body.mastery;
    try {
        const ascean = await Ascean.findByIdAndUpdate(req.body.ascean._id, {
            level: req.body.ascean.level + 1,
            experience: 0,
            constitution: Math.round((req.body.ascean.constitution + constitution) * (newMastery === 'Constitution' ? 1.07 : 1.04)), // 1.04 = +1 stat once the stat is 13 as it rounds up from .52 (1.04 * 13 = 13.52)
            strength: Math.round((req.body.ascean.strength + strength) * (newMastery === 'Strength' ? 1.07 : 1.04)), // 1.07 = +1 stat always, even at base 8. Requires 22 Stat points to increase by 2 / level. 22 * 1.07 = 23.54, rounded up to 24 
            agility: Math.round((req.body.ascean.agility + agility) * (newMastery === 'Agility' ? 1.07 : 1.04)),
            achre: Math.round((req.body.ascean.achre + achre) * (newMastery === 'Achre' ? 1.07 : 1.04)),
            caeren: Math.round((req.body.ascean.caeren + caeren) * (newMastery === 'Caeren' ? 1.07 : 1.04)),
            kyosir: Math.round((req.body.ascean.kyosir + kyosir) * (newMastery === 'Kyosir' ? 1.07 : 1.04)),
            mastery: newMastery, 
            faith: req.body.faith,
        }, { new: true });
        console.log(ascean, '<- Ascean Leveled Up in the Controller');
        res.status(200).json({ data: ascean });
    } catch (err) {
        console.log(err.message, '<- Error in the Controller Updating the Level!')
        res.status(400).json({ err });
    };
};

async function saveExperience(req, res) {
    try {
        const ascean = await Ascean.findById(req.body.ascean._id);
        console.log(req.body.opponent, 'Opponent Level in Save Experience');
        let silver = 0;
        let gold = 0;
        let currencyValue = req.body.opponent;
        let health = req.body.currentHealth > ascean.health.total ? ascean.health.total : req.body.currentHealth;
        
        if (currencyValue === 1) { // Opponent Level 1, 1-2 Silver
            silver = Math.floor(Math.random() * 2) + 1;
            gold = 0;
        } else if (currencyValue >= 2 && currencyValue < 11) {  // Opponent Level 2-10, 2-99 Silver
            silver = Math.floor(Math.random() * 10) + 1;
            silver *= currencyValue;
            gold = 0;
            if (silver > 99) {
                silver = 99;
            };
        } else if (currencyValue > 10 && currencyValue <= 20) { // Opponent Level 11-20, 5-30 Silver, 1-2 Gold
            if (currencyValue > 15) { // Opponent Level 16-20, 5-30 Silver, 1-2 Gold
                silver = Math.round(Math.floor(Math.random() * 25) + 5);
                gold = Math.floor(Math.random() * 2) + 1;
            } else { // Opponent Level 11-15, 1-99 Silver, 0-1 Gold
                if (Math.random() >= 0.5) { // 50% chance of 1 gold and 1-10 silver
                    silver = Math.round(Math.floor(Math.random() * 10) + 1);
                    gold = 1;
                } else { // 50% chance of 35-99 silver
                    silver = Math.round(Math.floor(Math.random() * 100) + 35);
                    if (silver > 99) {
                        silver = 99;
                        gold = 0;
                    };
                };
            };
        };
       
        ascean.currency.silver += silver;
        ascean.currency.gold += gold;

        console.log(silver, gold, ascean.currency, '<- Currency in the Controller Saving Experience!');

        if (ascean.currency.silver > 99) {
            ascean.currency.gold += 1;
            ascean.currency.silver -= 100;
        };
        
        if (ascean.firewater.charges < 5 && (ascean.level <= req.body.opponent)) {
            console.log(ascean.level, req.body.opponent, '<- Level and Opponent Level. You should get a charge!');
            ascean.firewater.charges += 1;
        };
        
        if (ascean.experience + req.body.experience > ascean.level * 1000) {
            ascean.experience = ascean.level * 1000;
        } else {
            ascean.experience += req.body.experience;
        };

        ascean.health.current = health;

        await ascean.save();
        res.status(200).json({ data: {ascean, silver, gold} });
    } catch (err) {
        console.log(err.message, '<- Error in the Controller Saving Experience!')
        res.status(400).json({ err });
    };
};

async function updateHighScore(req, res) {
    const { asceanId, highScore } = req.body
    console.log(asceanId, highScore, 'Are we updating in the Controller?')
    try {
        const ascean = await Ascean.findByIdAndUpdate(asceanId, {
            high_score: highScore }, { new: true})
        res.status(200).json({ data: ascean });
    } catch (err) {
        res.status(400).json({ err });
    }
}

async function deleteAscean(req, res) {
    try {
        // const ascean = await Ascean.findById(req.params.id);
        // await asceanEquipmentDeleteCheck(ascean);
        console.log(req.params.id, '<- Ascean ID in Delete Ascean Function')
        await Ascean.findByIdAndDelete(req.params.id);
        res.status(201).json({});
    } catch (err) {
        console.log(err.message, '<- Error in delete Ascean function')
        res.status(400).json({ err })
    }
}

const asceanEquipmentDeleteCheck = async (ascean) => {
    console.log(ascean, 'Ascean Checking For Deletion')
    await deleteEquipmentCheck(ascean.helmet);
    await deleteEquipmentCheck(ascean.chest);
    await deleteEquipmentCheck(ascean.legs);
    await deleteEquipmentCheck(ascean.ring_one);
    await deleteEquipmentCheck(ascean.ring_two);
    await deleteEquipmentCheck(ascean.amulet);
    await deleteEquipmentCheck(ascean.trinket);
    await deleteEquipmentCheck(ascean.weapon_one);
    await deleteEquipmentCheck(ascean.weapon_two);
    await deleteEquipmentCheck(ascean.weapon_three);
    await deleteEquipmentCheck(ascean.shield);
    const inventory = ascean.inventory;
    if (inventory.length > 0) {
        for (const item of inventory) {
            await deleteEquipmentCheck(item);
        }
    }
};

async function create(req, res) {
    console.log(req.body, '<- Hopefully the Ascean!', req.user)
        if (req.body.preference === 'Plate-Mail') {
            req.body.helmet = '63f413a4acef90a6e298a3c4';
            req.body.chest = '63f413a5acef90a6e298a3cf';
            req.body.legs = '63f413a5acef90a6e298a429';
        }
        if (req.body.preference === 'Chain-Mail') {
            req.body.helmet = '63f413a4acef90a6e298a3c5';
            req.body.chest = '63f413a5acef90a6e298a3d0';
            req.body.legs = '63f413a5acef90a6e298a42a';
        }
        if (req.body.preference === 'Leather-Mail') {
            req.body.helmet = '63f413a4acef90a6e298a3c6';
            req.body.chest = '63f413a5acef90a6e298a3d1';
            req.body.legs = '63f413a5acef90a6e298a42b';
        }
        if (req.body.preference === 'Leather-Cloth') {
            req.body.helmet = '63f413a4acef90a6e298a3c7'
            req.body.chest = '63f413a5acef90a6e298a3d2';
            req.body.legs = '63f413a5acef90a6e298a42c';
        }

        if (req.body.faith === 'devoted') { // Devoted to Daethos
            if (parseInt(req.body.strength) + parseInt(req.body.agility) >= parseInt(req.body.achre) + parseInt(req.body.caeren)) {
                if (parseInt(req.body.strength) > parseInt(req.body.agility)) { // Daethic Halberd && Hush of Daethos
                    req.body.weapon_one = '63d059865df7503ef9cd71f4';
                    req.body.weapon_two = '63b3460cd5c6cfea02a5e58e';
                } else if (parseInt(req.body.strength) < parseInt(req.body.agility)) { // Gladius && Daethic Bow
                    req.body.weapon_one = '63b3460cd5c6cfea02a5e56c';
                    req.body.weapon_two = '63b3460cd5c6cfea02a5e586';
                } else { // Same Value Daethic Bow && Daethic Halberd
                    req.body.weapon_one = '63b3460cd5c6cfea02a5e586';
                    req.body.weapon_two = '63d059865df7503ef9cd71f4';
                }
            } else {
                if (parseInt(req.body.achre) > parseInt(req.body.caeren)) { // Tendril && Daethic Bow && Hush
                    req.body.weapon_one = '63b3460cd5c6cfea02a5e583';
                    req.body.weapon_two = '63b3460cd5c6cfea02a5e586';
                    // req.body.weapon_three = '63b3460cd5c6cfea02a5e57d';
                } else if (parseInt(req.body.achre) < parseInt(req.body.caeren)) { // Hush of Daethos && Tendril of Daethos
                    req.body.weapon_one = '63b3460cd5c6cfea02a5e58e';
                    req.body.weapon_two = '63b3460cd5c6cfea02a5e58f';
                } else { // Same Value Blessed Dagger && Cursed Dagger && Tendril
                    req.body.weapon_one = '63e47c140de4781b96411d67';
                    req.body.weapon_two = '63b3460cd5c6cfea02a5e572';
                    // req.body.weapon_three = '63b3460cd5c6cfea02a5e583';
                }
            }
        } else { // Adherent to the Ancients or Irreligious
            if (parseInt(req.body.strength) + parseInt(req.body.agility) >= parseInt(req.body.achre) + parseInt(req.body.caeren)) {
                if (parseInt(req.body.strength) > parseInt(req.body.agility)) { // War Hammer && Sunshatter
                    req.body.weapon_one = '63b3460cd5c6cfea02a5e578';
                    req.body.weapon_two = '63e47c140de4781b96411d6b';
                } else if (parseInt(req.body.strength) < parseInt(req.body.agility)) { // Longsword && Sevashyr && Shotel
                    req.body.weapon_one = '63b3460cd5c6cfea02a5e56d';
                    req.body.weapon_two = '63e54b27d110dc7ef8fd630b';
                    // req.body.weapon_three = '63b3460cd5c6cfea02a5e573';
                } else { // Same Value Claymore && Longbow
                    req.body.weapon_one = '63b3460cd5c6cfea02a5e576';
                    req.body.weapon_two = '63b3460cd5c6cfea02a5e585';
                }
            } else {
                if (parseInt(req.body.achre) > parseInt(req.body.caeren)) { // Astral Spear && Quor'eite Crush
                    req.body.weapon_one = '63b3460cd5c6cfea02a5e57f';
                    req.body.weapon_two = '63b3460cd5c6cfea02a5e581';
                } else if (parseInt(req.body.achre) < parseInt(req.body.caeren)) { // Ashfyre && Nyrolean Wave
                    req.body.weapon_one = '63b3460cd5c6cfea02a5e588';
                    req.body.weapon_two = '63b3460cd5c6cfea02a5e58b';
                } else { // Same Value Wildstrike && Nightmare
                    req.body.weapon_one = '63b3460cd5c6cfea02a5e582';
                    req.body.weapon_two = '63e47c140de4781b96411d77';
                }
            }
        }

        const firstWeapon = await Weapon.findById(req.body.weapon_one);
        await seedDB([firstWeapon], firstWeapon.rarity);
        const secondWeapon = await Weapon.findById(req.body.weapon_two);
        await seedDB([secondWeapon], secondWeapon.rarity);

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
                weapon_one: firstWeapon._id,
                weapon_two: secondWeapon._id,
                weapon_three: '63b34b5ed5326753b191846c',
                shield: '63b34b5fd5326753b191846f',
                helmet: req.body.helmet,
                chest: req.body.chest,
                legs: req.body.legs,
                ring_one: '63b3491009fa8aa7e4495996',
                ring_two: '63b3491009fa8aa7e4495996',
                amulet: '63b3491109fa8aa7e4495999',
                trinket: '63b3491109fa8aa7e449599b',
                faith: req.body.faith,
                currency: {
                    silver: req.body.kyosir,
                    gold: 0,
                },
                shareable: req.body.shareable,
                visibility: req.body.visibility,
                hardcore: req.body.hardcore,
            })
            res.status(201).json({ ascean: ascean });
        } catch (err) {
            res.status(400).json({ err });
        }
}

async function index(req, res) {
    try {
        console.log(req.user._id, '<- User ID in Ascean Index Controller')
        let asceanCrew = await Ascean.find({ user: req.user._id, alive: true });
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
        // Except this should be the latest 10 characters
        asceanCrew = asceanCrew.slice(-10) // Needs to be the last 10 characters        
        for await (let ascean of asceanCrew) {

            const populated = await Promise.all(fields.map(async field => {
                const item = await determineItemType(ascean[field]);
                return item ? item : null;
            }));
            populated.forEach((item, index) => {
                ascean[fields[index]] = item;
            });
            await Ascean.populate(ascean, { path: 'user' });
        };
        res.status(200).json({ data: asceanCrew });
    } catch (err) {
        res.status(400).json({ err });
    };
};

async function quickIndex(req, res) {
    try {
        const asceanCrew = await Ascean.find({ user: req.user._id, alive: true });
        res.status(200).json({ data: asceanCrew });
    } catch (err) { 
        console.log(err, 'Error in Lean Profile Controller') 
        res.status(400).json({ err });
    }
  }

async function getOneAscean(req, res) {
    try {
        let ascean = await Ascean.findById({ _id: req.params.id })
                                 .populate('user')
                                 .populate('quests')
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

        const inventoryPopulated = ascean.inventory.map(async item => {
            const itemType = await determineItemType(item);
            if (itemType) {
                return itemType;
            };
            return null;
        });
        const inventory = await Promise.all(inventoryPopulated);
        ascean.inventory = inventory;
        res.status(200).json({ data: ascean });
    } catch (err) {
        console.log(err, 'Error Getting An Ascean');
        res.status(400).json({ err });
    };
};

async function getAsceanQuests(req, res) {
    try {
        const ascean = await Ascean.findById({ _id: req.params.id })
                                   .populate('quests')
                                   .exec();
        res.status(200).json(ascean.quests);
    } catch (err) {
        console.log(err, 'Error Getting Ascean Quests');
        res.status(400).json({ err });
    }
}

async function getAsceanAndInventory(req, res) {
    try {
        let ascean = await Ascean.findById({ _id: req.params.id })
                                    .populate('user')
                                    .populate('quests')
                                    .exec();
        console.log(ascean.name, "Ascean Name")
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
        
        const inventoryPopulated = ascean.inventory.map(async item => {
            const itemType = await determineItemType(item);
            if (itemType) {
                return itemType;
            };
            return null;
        });
        const inventory = await Promise.all(inventoryPopulated);
        ascean.inventory = inventory;
    
        res.status(200).json({ data: ascean });
    } catch (err) {
        console.log(err, 'Error Getting An Ascean');
        res.status(400).json({ err });
    };
};

async function getAsceanInventory(req, res) {
    try {
        const ascean = await Ascean.findById({ _id: req.params.id });
        const inventoryPopulated = ascean.inventory.map(async item => {
            const itemType = await determineItemType(item);
            if (itemType) {
                return itemType;
            };
            return null;
        });
        const inventory = await Promise.all(inventoryPopulated);
        ascean.inventory = inventory;
    
        res.status(200).json({inventory:  ascean.inventory, currency: ascean.currency });
    } catch (err) {
        console.log(err, 'Error Getting An Ascean');
        res.status(400).json({ err });
    };
};

async function getOneAsceanClean(req, res) {
    try {
        let ascean = await Ascean.findById({ _id: req.params.id })
                                 .populate('user')
                                 .populate('quests')
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
        res.status(200).json({ data: ascean });
    } catch (err) {
        console.log(err, 'Error Getting An Ascean');
        res.status(400).json({ err });
    };
};

async function getAsceanStats(req, res) {
    try {
        let ascean = await Ascean.findById({ _id: req.params.id })
                                 .populate('user')
                                 .exec();
        console.log(ascean.name, "Ascean Name")
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
        let data = await asceanService.asceanCompiler(ascean);
        if (data.data.attributes.healthTotal > ascean.health.total) {
            ascean.health.total = data.data.attributes.healthTotal;
            data.data.ascean.health.total = data.data.attributes.healthTotal;
            if (typeof ascean.currency.gold !== 'number') {
                const currency = { gold: 0, silver: 0 };
                ascean.currency = currency;
            };
            await ascean.save();
        };
        res.status(200).json({ data });
    } catch (err) {
        console.log(err, `Error retrieving statistics for ascean`);
        res.status(400).json({ err });
    };
};

async function animalStats(req, res) {
    try {
        const animal = req.body;
        const data = await asceanService.asceanCompiler(animal);
        res.status(200).json({ data });
    } catch (err) {
        console.log(err, 'Error in Animal Stats Controller');
        res.status(400).json(err);
    };
};

async function getModelTypes(ids) {
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
    };
  
    const itemTypeMap = {};
    for (const itemType of itemTypes) {
      itemTypeMap[itemType] = [];
    }
  
    for (const id of ids) {
      const itemType = id.itemType;
      itemTypeMap[itemType].push(id);
    };
  
    const promises = [];
    for (const itemType of itemTypes) {
      const itemIds = itemTypeMap[itemType];
      if (itemIds.length > 0) {
        const model = models[itemType];
        promises.push(model.find({ _id: { $in: itemIds } }).exec());
      };
    };
  
    const results = await Promise.all(promises);
  
    const idToItemTypeMap = {};
    for (const itemType of itemTypes) {
      const model = models[itemType];
      for (const item of results[itemType]) {
        idToItemTypeMap[item._id.toString()] = itemType;
      };
    };
  
    const itemTypes = ids.map(id => idToItemTypeMap[id._id.toString()]);
    return itemTypes;
  };
  

async function getModelType(id) {
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
    };
    const itemTypes = ['Weapon', 'Shield', 'Helmet', 'Chest', 'Legs', 'Ring', 'Amulet', 'Trinket', 'Equipment'];
    for (const itemType of itemTypes) {
        const item = await models[itemType].findById(id).exec();
        if (item) {
            return item.itemType;
        };
    };
    return null;
};

async function searchAscean(req, res) {
    const keyword = req.query.search ? {
        $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            // { level: { $regex: req.query.search, $options: "i" } },
            { origin: { $regex: req.query.search, $options: "i" } },
            // { high_score: { $regex: req.query.search, $options: "i" } },
        ]
    } : [];

    const ascean = await Ascean.find(keyword);
    console.log(ascean, 'Ascean in search Ascean controller');
    res.send(ascean);
};