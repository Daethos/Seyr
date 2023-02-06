const User = require('../models/user');
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
const mongoose = require('mongoose');

module.exports = {
    create,
    index,
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



//TODO: Make a function to create the Ascean's 'stats' through the backend
//FIXME: So they're simply 'on' the character I think. That way the rendering client-side
//TODO: Will hopefully not mess around with the stats of the character
//FIXME: Not sure but probably exploitable via the client somehow, like getting it to render so you multiply stats

//TODO: Note: Seem to be able to run the equations through a 'const' at the beginning and it holds the value through re-rendering

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

async function saveToInventory(req, res) {
    try {
        // console.log(req.body, 'Req Body in Saving to Inventory')
        const ascean = await Ascean.findById(req.body.ascean._id);
        ascean.inventory.push(req.body.lootDrop._id);
        await ascean.save();
        res.status(201).json({ ascean });
    } catch (err) {
        console.log(err.message, '<- Error in the Controller Saving to Inventory!')
    }
}

async function rebalanceCurrency(ascean) {
    while (ascean.currency.silver < 0) {
      ascean.currency.gold -= 1;
      ascean.currency.silver += 100;
    }
    while (ascean.currency.gold < 0) {
      ascean.currency.gold += 1;
      ascean.currency.silver -= 100;
    }
  }
  

async function purchaseToInventory(req, res) {
    try {
        // console.log(req.body, 'Req Body in Saving to Inventory')
        const ascean = await Ascean.findById(req.body.ascean._id);
        ascean.inventory.push(req.body.item._id);
        console.log(req.body.cost, 'Cost of EQP')
        ascean.currency.silver -= req.body.cost.silver;
        ascean.currency.gold -= req.body.cost.gold;
        await rebalanceCurrency(ascean);
        await ascean.save();
        res.status(201).json({ ascean });
    } catch (err) {
        console.log(err.message, '<- Error in the Controller Purchasing to Inventory!')
    }
}
async function swapItems(req, res) {
    try {
        // console.log(req.body, 'Req Body in Swapping Items')
        const ascean = await Ascean.findById(req.params.id);
        const keyToUpdate = Object.keys(req.body).find(key => {
            console.log(key, 'Key in Swapping Items');
            return typeof req.body[key] === 'string' && req.body[key] !== '';
        });
        console.log(ascean, 'Ascean in Swap Items')
        const itemType = keyToUpdate.replace('new_', '');
        const currentItemId = ascean[itemType];
        // console.log(keyToUpdate, 'Key To Update')
        ascean[itemType] = req.body[keyToUpdate];
        const currentItem = await determineItemType(currentItemId);
        if (!currentItem.name.includes('Empty')) {
            ascean.inventory.push(currentItemId);
        }
        const currentItemIndex = ascean.inventory.indexOf(req.body[keyToUpdate]);
        ascean.inventory.splice(currentItemIndex, 1);
        await ascean.save();
        res.status(201).json({ ascean });
    } catch (err) {
        console.log(err.message, '<- Error in the Controller Swapping Items!')
    }
}

const deleteEquipmentCheck = async (equipmentID) => {
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
    }
}

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
        const ascean = await Ascean.findById(req.params.id);
        await asceanEquipmentDeleteCheck(ascean);
        await Ascean.findByIdAndDelete(req.params.id)
        res.status(201).json({});
    } catch (err) {
        console.log(err.message, '<- Error in delete Ascean function')
        res.status(400).json({ err })
    }
}

const asceanEquipmentDeleteCheck = async (ascean) => {
    await deleteEquipmentCheck(ascean.helmet._id);
    await deleteEquipmentCheck(ascean.chest._id);
    await deleteEquipmentCheck(ascean.legs._id);
    await deleteEquipmentCheck(ascean.ring_one._id);
    await deleteEquipmentCheck(ascean.ring_two._id);
    await deleteEquipmentCheck(ascean.amulet._id);
    await deleteEquipmentCheck(ascean.trinket._id);
    await deleteEquipmentCheck(ascean.weapon_one._id);
    await deleteEquipmentCheck(ascean.weapon_two._id);
    await deleteEquipmentCheck(ascean.weapon_three._id);
    await deleteEquipmentCheck(ascean.shield._id);
    const inventory = ascean.inventory;
    for (const item of inventory) {
        await deleteEquipmentCheck(item._id);
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
        const asceanCrew = await Ascean.find({ user: req.user._id })
                                    // .populate("user")
                                    // .populate("weapon_one")
                                    // .populate("weapon_two")
                                    // .populate("weapon_three")
                                    // .populate("shield")
                                    // .populate("helmet")
                                    // .populate("chest")
                                    // .populate("legs")
                                    // .populate("ring_one")
                                    // .populate("ring_two")
                                    // .populate("amulet")
                                    // .populate("trinket")
                                    // .exec();

        // ascean.weapon_one = await getModelType(ascean.weapon_one._id);
        // ascean.weapon_two = await getModelType(ascean.weapon_two._id);
        // ascean.weapon_three = await getModelType(ascean.weapon_three._id);
        // ascean.shield = await getModelType(ascean.shield._id);
        // ascean.helmet = await getModelType(ascean.helmet._id);
        // ascean.chest = await getModelType(ascean.chest._id);
        // ascean.legs = await getModelType(ascean.legs._id);
        // ascean.ring_one = await getModelType(ascean.ring_one._id);
        // ascean.ring_two = await getModelType(ascean.ring_two._id);
        // ascean.amulet = await getModelType(ascean.amulet._id);
        // ascean.trinket = await getModelType(ascean.trinket._id);

        // const equipmentModels = Object.keys(mongoose.models).filter(modelName => modelName.endsWith('Equipment') || modelName.endsWith('Weapons') ||  modelName.endsWith('Shields') || 
        //                                                                          modelName.endsWith('Helmets') || modelName.endsWith('Chests') || modelName.endsWith('Legs') || 
        //                                                                          modelName.endsWith('Rings') || modelName.endsWith('Amulets') || modelName.endsWith('Trinkets'));

        // const modelMapping = {
        // Weapons: ['weapon_one', 'weapon_two', 'weapon_three'],
        // Shields: ['shield'],
        // Helmets: ['helmet'],
        // Chests: ['chest'],
        // Legs: ['legs'],
        // Rings: ['ring_one', 'ring_two'],
        // Amulets: ['amulet'],
        // Trinkets: ['trinket'],
        // };
        
        let promises = [];
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
        // equipmentModels.forEach(async modelName => {
        //     const paths = modelMapping[modelName] || [];
        
        //     for (let path of paths) {
        //     let model;
        
        //     switch (modelName) {
        //         case 'Weapons':
        //             const weapon = await Weapon.find(ascean[path]);
        //             model = weapon.length > 0 ? 'Weapons' : 'Equipment';
        //             break;
        //         case 'Shields':
        //             const shield = await Shield.find(ascean[path]);
        //             model = shield.length > 0 ? 'Shields' : 'Equipment';
        //             break;
        //         case 'Helmets':
        //             const helmet = await Helmet.find(ascean[path]);
        //             model = helmet.length > 0 ? 'Helmets' : 'Equipment';
        //             break;
        //         case 'Chests':
        //             const chest = await Chest.find(ascean[path]);
        //             model = chest.length > 0 ? 'Chests' : 'Equipment';

        //             break;
        //         case 'Legs':
        //             const legs = await Legs.find(ascean[path]);
        //             model = legs.length > 0 ? 'Legs' : 'Equipment';
        //             break;
        //         case 'Rings':
        //             const ring = await Ring.find(ascean[path]);
        //             model = ring.length > 0 ? 'Rings' : 'Equipment';
        //             break;
        //         case 'Amulets':
        //             const amulet = await Amulet.find(ascean[path]);
        //             model = amulet.length > 0 ? 'Amulets' : 'Equipment';
        //             break;
        //         case 'Trinkets':
        //             const trinket = await Trinket.find(ascean[path]);
        //             model = trinket.length > 0 ? 'Trinkets' : 'Equipment';
        //             break;
        //         default:
        //             model = 'Equipment';
        //             break;
        //     }
        
        //     promises.push(Ascean.populate(ascean, { path, model }));
        //     // console.log(promises, 'Growing Promises ???');
        //     }
        // });
        // promises.push(Ascean.populate(ascean, { path: "user" }));
        // await Promise.all(promises);
        }
        // console.log(asceanCrew, 'The Crew of Ascean!')
        // for (let ascean of asceanCrew) {
        //     // console.log(ascean, "Just an Ascean from the Crew")
        //     let promises = [];
        // // console.log(equipmentModels, '<- Equipment Models')
        //     equipmentModels.forEach(async modelName => {
        //     let path, model;
        //     switch (modelName) {
        //         case 'Weapons':
        //             path = 'weapon_one';
        //                 const weapon_one = await Weapon.find(ascean[path]);
        //                 // console.log(weapon_one, 'Weapon One?')
        //                 if (weapon_one.length > 0) {
        //                     model = 'Weapons';
        //                 } else {
        //                     model = 'Equipment';
        //                 }
        //                 promises.push(Ascean.populate(ascean, { path, model }));
        //                 path = 'weapon_two';
        //                 const weapon_two = await Weapon.find(ascean[path]);
        //                 if (weapon_two.length > 0) {
        //                     model = 'Weapons';
        //                 } else {
        //                     model = 'Equipment';
        //                 }
        //                 promises.push(Ascean.populate(ascean, { path, model }));
        //                 path = 'weapon_three';
        //                 const weapon_three = await Weapon.find(ascean[path]);
        //                 if (weapon_three.length > 0) {
        //                     model = 'Weapons';
        //                 } else {
        //                     model = 'Equipment';
        //                 }
        //                 promises.push(Ascean.populate(ascean, { path, model }));
        //                 break;
        //             case 'Shields':
        //                 path = 'shield';
        //                 const shield = await Shield.find(ascean[path]);
        //                 if (shield.length > 0) {
        //                     model = 'Shields';
        //                 } else {
        //                     model = 'Equipment';
        //                 }
        //                 promises.push(Ascean.populate(ascean, { path, model }));
        //                 break;
        //             case 'Helmets':
        //                 path = 'helmet';
        //                 const helmet = await Helmet.find(ascean[path]);
        //                 if (helmet.length > 0) {
        //                     model = 'Helmets';
        //                 } else {
        //                     model = 'Equipment';
        //                 }
        //                 promises.push(Ascean.populate(ascean, { path, model }));
        //                 break;
        //             case 'Chests':
        //                 path = 'chest';
        //                 const chest = await Chest.find(ascean[path]);
        //                 if (chest.length > 0) {
        //                     model = 'Chests';
        //                 } else {
        //                     model = 'Equipment';
        //                 }
        //                 console.log(model, 'Model of Chest?');

        //                 promises.push(Ascean.populate(ascean, { path, model }));
        //                 break;
        //             case 'Legs':
        //                 path = 'legs';
        //                 const legs = await Legs.find(ascean[path]);
        //                 if (legs.length > 0) {
        //                     model = 'Legs';
        //                 } else {
        //                     model = 'Equipment';
        //                 }
        //                 promises.push(Ascean.populate(ascean, { path, model }));
        //                 break;
        //             case 'Rings':
        //                 path = 'ring_one';
        //                 const ring_one = await Ring.find(ascean[path]);
        //                 if (ring_one.length > 0) {
        //                     model = 'Rings';
        //                 } else {
        //                     model = 'Equipment';
        //                 }
        //                 promises.push(Ascean.populate(ascean, { path, model }));
        //                 path = 'ring_two';
        //                 const ring_two = await Ring.find(ascean[path]);
        //                 if (ring_two.length > 0) {
        //                     model = 'Rings';
        //                 } else {
        //                     model = 'Equipment';
        //                 }
        //                 promises.push(Ascean.populate(ascean, { path, model }));
        //                 break;
        //             case 'Amulets':
        //                 path = 'amulet';
        //                 const amulet = await Amulet.find(ascean[path]);
        //                 if (amulet.length > 0) {
        //                     model = 'Amulets';
        //                 } else {
        //                     model = 'Equipment';
        //                 }
        //                 promises.push(Ascean.populate(ascean, { path, model }));
        //                 break;
        //             case 'Trinkets':
        //                 path = 'trinket';
        //                 const trinket = await Trinket.find(ascean[path]);
        //                 if (trinket.length > 0) {
        //                     model = 'Trinkets';
        //                 } else {
        //                     model = 'Equipment';
        //                 }
        //                 promises.push(Ascean.populate(ascean, { path, model }));
        //                 break;
        //             default:
        //                 break;
        //         }
        // });
        // promises.push(Ascean.populate(ascean, { path: "user" }));
        // await Promise.all(promises);
        // }
        // console.log(asceanCrew, 'Did This function?')
        res.status(200).json({ data: asceanCrew });
    } catch (err) {
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
        //                             .populate("user")
        //                             .populate("weapon_one")
        //                             .populate("weapon_two")
        //                             .populate("weapon_three")
        //                             .populate("shield")
        //                             .populate("helmet")
        //                             .populate("chest")
        //                             .populate("legs")
        //                             .populate("ring_one")
        //                             .populate("ring_two")
        //                             .populate("amulet")
        //                             .populate("trinket")
        //                             .exec();

        // ascean.weapon_one = await getModelType(ascean.weapon_one._id);
        // ascean.weapon_two = await getModelType(ascean.weapon_two._id);
        // ascean.weapon_three = await getModelType(ascean.weapon_three._id);
        // ascean.shield = await getModelType(ascean.shield._id);
        // ascean.helmet = await getModelType(ascean.helmet._id);
        // ascean.chest = await getModelType(ascean.chest._id);
        // ascean.legs = await getModelType(ascean.legs._id);
        // ascean.ring_one = await getModelType(ascean.ring_one._id);
        // ascean.ring_two = await getModelType(ascean.ring_two._id);
        // ascean.amulet = await getModelType(ascean.amulet._id);
        // ascean.trinket = await getModelType(ascean.trinket._id);


    //     const equipmentModels = Object.keys(mongoose.models).filter(modelName => modelName.endsWith('Equipment') || modelName.endsWith('Weapons') ||  modelName.endsWith('Shields') || 
    //                                                                              modelName.endsWith('Helmets') || modelName.endsWith('Chests') || modelName.endsWith('Legs') || 
    //                                                                              modelName.endsWith('Rings') || modelName.endsWith('Amulets') || modelName.endsWith('Trinkets'));
    //     const modelMapping = {
    //         Weapons: ['weapon_one', 'weapon_two', 'weapon_three'],
    //         Shields: ['shield'],
    //         Helmets: ['helmet'],
    //         Chests: ['chest'],
    //         Legs: ['legs'],
    //         Rings: ['ring_one', 'ring_two'],
    //         Amulets: ['amulet'],
    //         Trinkets: ['trinket'],
    //     };
    //     let promises = [];
    //     if (ascean) {
    //         equipmentModels.forEach(async modelName => {
    //         const paths = modelMapping[modelName] || [];
    //         for (let path of paths) {
    //         let model;
    //         switch (modelName) {
    //             case 'Weapons':
    //                 const weapon = await Weapon.find(ascean[path]);
    //                 model = weapon.length > 0 ? 'Weapons' : 'Equipment';
    //                 break;
    //             case 'Shields':
    //                 const shield = await Shield.find(ascean[path]);
    //                 model = shield.length > 0 ? 'Shields' : 'Equipment';
    //                 break;
    //             case 'Helmets':
    //                 const helmet = await Helmet.find(ascean[path]);
    //                 model = helmet.length > 0 ? 'Helmets' : 'Equipment';
    //                 break;
    //             case 'Chests':
    //                 const chest = await Chest.find(ascean[path]);
    //                 model = chest.length > 0 ? 'Chests' : 'Equipment';
    //                 break;
    //             case 'Legs':
    //                 const legs = await Legs.find(ascean[path]);
    //                 model = legs.length > 0 ? 'Legs' : 'Equipment';
    //                 break;
    //             case 'Rings':
    //                 const ring = await Ring.find(ascean[path]);
    //                 model = ring.length > 0 ? 'Rings' : 'Equipment';
    //                 break;
    //             case 'Amulets':
    //                 const amulet = await Amulet.find(ascean[path]);
    //                 model = amulet.length > 0 ? 'Amulets' : 'Equipment';
    //                 break;
    //             case 'Trinkets':
    //                 const trinket = await Trinket.find(ascean[path]);
    //                 model = trinket.length > 0 ? 'Trinkets' : 'Equipment';
    //                 break;
    //             default:
    //                 model = 'Equipment';
    //                 break;
    //         }
    //         promises.push(Ascean.populate(ascean, { path, model }));
    //         }
    //     });
    //     promises.push(Ascean.populate(ascean, { path: "user" }));
    //     await Promise.all(promises);
    // }
    console.log(ascean.helmet, 'Did This function?')

        const inventoryPopulated = ascean.inventory.map(async item => {
            const itemType = determineItemType(item);
            // console.log('The Fourth Potential ?')
            if (itemType) {
                return itemType;
                // return await (itemType).findById(item).populate().exec();
            }
            return null;
        });
        // console.log(inventoryPopulated, '<- Inventory Populated 5')
        const inventory = await Promise.all(inventoryPopulated);
        // console.log(inventory, '<- Inventory 6')
        ascean.inventory = inventory;
        res.status(200).json({ data: ascean })
    } catch (err) {
        res.status(400).json({ err });
    }
}

const eitherOrType = function(ref1, ref2) {
    return function(value) {
        return mongoose.model(ref1).countDocuments({ _id: value }).then((count1) => {
            if (count1 > 0) {
                return true;
            }
            return mongoose.model(ref2).countDocuments({ _id: value }).then((count2) => {
                if (count2 > 0) {
                    return true;
                }
                return false;
            });
        });
    };
};

async function getAsceanStats(req, res) {
    try {
        const ascean = await Ascean.findById({ _id: req.params.id })

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
                                    // .populate("user")
                                    // .populate("weapon_one")
                                    // .populate("weapon_two")
                                    // .populate("weapon_three")
                                    // .populate("shield")
                                    // .populate("helmet")
                                    // .populate("chest")
                                    // .populate("legs")
                                    // .populate("ring_one")
                                    // .populate("ring_two")
                                    // .populate("amulet")
                                    // .populate("trinket")
                                    // .exec();

    // ascean.weapon_one = await getModelType(ascean.weapon_one._id);
    // ascean.weapon_two = await getModelType(ascean.weapon_two._id);
    // ascean.weapon_three = await getModelType(ascean.weapon_three._id);
    // ascean.shield = await getModelType(ascean.shield._id);
    // ascean.helmet = await getModelType(ascean.helmet._id);
    // ascean.chest = await getModelType(ascean.chest._id);
    // ascean.legs = await getModelType(ascean.legs._id);
    // ascean.ring_one = await getModelType(ascean.ring_one._id);
    // ascean.ring_two = await getModelType(ascean.ring_two._id);
    // ascean.amulet = await getModelType(ascean.amulet._id);
    // ascean.trinket = await getModelType(ascean.trinket._id);

        // const equipmentModels = Object.keys(mongoose.models).filter(modelName => modelName.endsWith('Equipment') || modelName.endsWith('Weapons') ||  modelName.endsWith('Shields') || 
        //                                                                          modelName.endsWith('Helmets') || modelName.endsWith('Chests') || modelName.endsWith('Legs') || 
        //                                                                          modelName.endsWith('Rings') || modelName.endsWith('Amulets') || modelName.endsWith('Trinkets'));
        // const modelMapping = {
        // Weapons: ['weapon_one', 'weapon_two', 'weapon_three'],
        // Shields: ['shield'],
        // Helmets: ['helmet'],
        // Chests: ['chest'],
        // Legs: ['legs'],
        // Rings: ['ring_one', 'ring_two'],
        // Amulets: ['amulet'],
        // Trinkets: ['trinket'],
        // };
        // let promises = [];
        // equipmentModels.forEach(async modelName => {
        //     const paths = modelMapping[modelName] || [];
        //     for (let path of paths) {
        //     let model;
        //     switch (modelName) {
        //         case 'Weapons':
        //             const weapon = await Weapon.find(ascean[path]);
        //             model = weapon.length > 0 ? 'Weapons' : 'Equipment';
        //             break;
        //         case 'Shields':
        //             const shield = await Shield.find(ascean[path]);
        //             model = shield.length > 0 ? 'Shields' : 'Equipment';
        //             break;
        //         case 'Helmets':
        //             const helmet = await Helmet.find(ascean[path]);
        //             model = helmet.length > 0 ? 'Helmets' : 'Equipment';
        //             break;
        //         case 'Chests':
        //             const chest = await Chest.find(ascean[path]);
        //             model = chest.length > 0 ? 'Chests' : 'Equipment';

        //             break;
        //         case 'Legs':
        //             const legs = await Legs.find(ascean[path]);
        //             model = legs.length > 0 ? 'Legs' : 'Equipment';
        //             break;
        //         case 'Rings':
        //             const ring = await Ring.find(ascean[path]);
        //             model = ring.length > 0 ? 'Rings' : 'Equipment';
        //             break;
        //         case 'Amulets':
        //             const amulet = await Amulet.find(ascean[path]);
        //             model = amulet.length > 0 ? 'Amulets' : 'Equipment';
        //             break;
        //         case 'Trinkets':
        //             const trinket = await Trinket.find(ascean[path]);
        //             model = trinket.length > 0 ? 'Trinkets' : 'Equipment';
        //             break;
        //         default:
        //             model = 'Equipment';
        //             break;
        //     }
        //     promises.push(Ascean.populate(ascean, { path, model }));
        //     }
        // });
        // promises.push(Ascean.populate(ascean, { path: "user" }));
        // await Promise.all(promises);

        // let check = await getModelType(ascean.chest._id);
        // console.log(check, 'Checking Chest!');

        // await ascean.populate('user')
        //             .populate({path: 'weapon_one', model: getModelType(ascean.weapon_one._id)})
        //             .populate({path: 'weapon_two', model: getModelType(ascean.weapon_two._id)})
        //             .populate({path: 'weapon_three', model: getModelType(ascean.weapon_three._id)})
        //             .populate({path: 'shield', model: getModelType(ascean.shield._id)})
        //             .populate({path: 'helmet', model: getModelType(ascean.helmet._id)})
        //             .populate({path: 'chest', model: getModelType(ascean.chest._id)})
        //             .populate({path: 'legs', model: getModelType(ascean.legs._id)})
        //             .populate({path: 'ring_one', model: getModelType(ascean.ring_one._id)})
        //             .populate({path: 'ring_two', model: getModelType(ascean.ring_two._id)})
        //             .populate({path: 'amulet', model: getModelType(ascean.amulet._id)})
        //             .populate({path: 'trinket', model: getModelType(ascean.trinket._id)})
        //             .exec();

        const data = await asceanService.asceanCompiler(ascean)
        //console.log(data)
        res.status(200).json({ data })
    } catch (err) {
        console.log(err, `Error retrieving statistics for ascean`)
        res.status(400).json({ err });
    }
}

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
            // console.log(itemType, item.itemType, 'This is the itemType and item.itemType, does this do anything correct?')
            return item.itemType;
        };
    };
    return null;
};

const getModel = async (type) => {
    switch (type) {
        case "Weapon": {
            return 'Weapons';
        };
        case "Shield": {
            return 'Shields';
        };
        case "Helmet": {
            return 'Helmets';
        };
        case "Chest": {
            return 'Chests';
        };
        case "Legs": {
            return 'Legs';
        };
        case "Ring": {
            return 'Rings';
        };
        case "Amulet": {
            return 'Amulets';
        };
        case "Trinket": {
            return 'Trinkets';
        };
        default: {
            return 'Equipment';
        };
    };
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
}