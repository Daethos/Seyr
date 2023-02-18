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
const fs = require('fs');

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
    swapItems,
    removeItem,
    purchaseToInventory,
    searchAscean
}

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
}

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
    };
      
    const itemTypes = ['Weapon', 'Shield', 'Helmet', 'Chest', 'Legs', 'Ring', 'Amulet', 'Trinket', 'Equipment'];
    for (const itemType of itemTypes) {
        const item = await models[itemType].findById(id).exec();
        if (item) {
            return item;
        };
    };
    return null;
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
        if (!currentItem.name.includes('Empty')) {
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
    }
}

async function saveExperience(req, res) {
    try {
        const ascean = await Ascean.findById(req.body.ascean._id);
        console.log(req.body.opponent, 'Opponent Level in Save Experience')
        let silver = 0;
        let gold = 0;
        let currencyValue = req.body.opponent;
        
        if (currencyValue === 1) { // Opponent Level 1, 1-2 Silver
            silver = Math.floor(Math.random() * 2) + 1;
            gold = 0;
        } else if (currencyValue >= 2 && currencyValue < 11) {  // Opponent Level 2-10, 2-99 Silver
            silver = Math.floor(Math.random() * 10) + 1;
            silver *= currencyValue;
            gold = 0;
            if (silver > 99) {
                silver = 99;
            }
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
                    }
                }
            }

        }
       
            // ascean.currency = { silver: 0, gold: 0 };
        ascean.currency.silver += silver;
        ascean.currency.gold += gold;


        console.log(silver, gold, ascean.currency, '<- Currency in the Controller Saving Experience!')

        if (ascean.currency.silver > 99) {
            // ascean.currency.gold += Math.floor(ascean.currency.silver / 100);
            // ascean.currency.silver = ascean.currency.silver % 100;
            ascean.currency.gold += 1;
            ascean.currency.silver -= 100;
        }

        if (ascean.experience + req.body.experience > ascean.level * 1000) {
            ascean.experience = ascean.level * 1000;
        } else {
            ascean.experience += req.body.experience;
        }
        await ascean.save();
        res.status(200).json({ data: {ascean, silver, gold} });
    } catch (err) {
        console.log(err.message, '<- Error in the Controller Saving Experience!')
        res.status(400).json({ err });
    }
}

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
        await Ascean.findByIdAndDelete(req.params.id)
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
            req.body.helmet = '63b322831c4ece0f04812082';
            req.body.chest = '63b322841c4ece0f04812088';
            req.body.legs = '63b322841c4ece0f0481208d';
        }
        if (req.body.preference === 'Chain-Mail') {
            req.body.helmet = '63b322831c4ece0f04812083';
            req.body.chest = '63b322841c4ece0f04812089';
            req.body.legs = '63b322841c4ece0f0481208e';
        }
        if (req.body.preference === 'Leather-Mail') {
            req.body.helmet = '63b322831c4ece0f04812084';
            req.body.chest = '63b322841c4ece0f0481208a';
            req.body.legs = '63b322841c4ece0f0481208f';
        }
        if (req.body.preference === 'Leather-Cloth') {
            req.body.helmet = '63b322831c4ece0f04812085'
            req.body.chest = '63b322841c4ece0f0481208b';
            req.body.legs = '63b322841c4ece0f04812090';
        }

        if (req.body.faith === 'devoted') { // Devoted to Daethos
            if ((req.body.strength + req.body.agility) >= (req.body.achre + req.body.caeren)) {
                if (req.body.strength > req.body.agility) { // Halberd
                    req.body.weapon_one = '63d059865df7503ef9cd71f4';
                } else if (req.body.strength < req.body.agility) { // Gladius
                    req.body.weapon_one = '63b3460cd5c6cfea02a5e56c';
                } else { // Same Value Daethic Bow
                    req.body.weapon_one = '63b3460cd5c6cfea02a5e586';
                }
            } else {
                if (req.body.achre > req.body.caeren) { // Tendril
                    req.body.weapon_one = '63b3460cd5c6cfea02a5e583';
                } else if (req.body.achre < req.body.caeren) { // Hush of Daethos
                    req.body.weapon_one = '63b3460cd5c6cfea02a5e58e';
                } else { // Same Value Caeren Barrage
                    req.body.weapon_one = '63b3460cd5c6cfea02a5e57c';
                }
            }
        } else { // Adherent to the Ancients or Irreligious
            if ((req.body.strength + req.body.agility) >= (req.body.achre + req.body.caeren)) {
                if (req.body.strength > req.body.agility) { // War Hammer
                    req.body.weapon_one = '63b3460cd5c6cfea02a5e578';
                } else if (req.body.strength < req.body.agility) { // Longsword
                    req.body.weapon_one = '63b3460cd5c6cfea02a5e56d';
                } else { // Same Value Longbow
                    req.body.weapon_one = '63b3460cd5c6cfea02a5e585';
                }
            } else {
                if (req.body.achre > req.body.caeren) { // Astral Spear
                    req.body.weapon_one = '63b3460cd5c6cfea02a5e57f';
                } else if (req.body.achre < req.body.caeren) { // Ashfyre
                    req.body.weapon_one = '63b3460cd5c6cfea02a5e588';
                } else { // Same Value Arctic Bolt
                    req.body.weapon_one = '63b3460cd5c6cfea02a5e580';
                }
            }
        }


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
                weapon_one: req.body.weapon_one,
                weapon_two: '63b34b5ed5326753b191846b',
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
                    silver: 0,
                    gold: 0,
                },
            })
            res.status(201).json({ ascean: ascean });
        } catch (err) {
            res.status(400).json({ err });
        }
}

async function index(req, res) {
    try {
        console.log(req.user._id, '<- User ID in Ascean Index Controller')
        const asceanCrew = await Ascean.find({ user: req.user._id });

        for await (let ascean of asceanCrew) {
            const populateOptions = await Promise.all([
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
                ].map(async field => ({ path: field, model: await getModelType(ascean[field]._id) })));
                
            await Ascean.populate(ascean, [
                { path: 'user' },
                ...populateOptions
            ]);
        };
        res.status(200).json({ data: asceanCrew });
    } catch (err) {
        res.status(400).json({ err });
    };
};

async function quickIndex(req, res) {
    try {
        const asceanCrew = await Ascean.find({ user: req.user._id });
        res.status(200).json({ data: asceanCrew });
    } catch (err) { 
        console.log(err, 'Error in Lean Profile Controller') 
        res.status(400).json({ err });
    }
  }

async function getOneAscean(req, res) {
    try {
        const ascean = await Ascean.findById({ _id: req.params.id });

        const populateOptions = await Promise.all([
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
            ].map(async field => ({ path: field, model: await getModelType(ascean[field]._id) })));
            
        await Ascean.populate(ascean, [
        { path: 'user' },
        ...populateOptions
        ]);

        const inventoryPopulated = ascean.inventory.map(async item => {
            const itemType = determineItemType(item);
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

async function getAsceanStats(req, res) {
    try {
        const ascean = await Ascean.findById({ _id: req.params.id });
        const populateOptions = await Promise.all([
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
        ].map(async field => ({ path: field, model: await getModelType(ascean[field]._id) })));
        await Ascean.populate(ascean, [{ path: 'user' }, ...populateOptions ]);
        const data = await asceanService.asceanCompiler(ascean);
        res.status(200).json({ data });
    } catch (err) {
        console.log(err, `Error retrieving statistics for ascean`);
        res.status(400).json({ err });
    };
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
    console.log(ascean, 'Ascean in search Ascean controller')
    res.send(ascean);
};