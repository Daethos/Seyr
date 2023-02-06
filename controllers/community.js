const Ascean = require('../models/ascean');
const mongoose = require('mongoose');
const Weapon = require('../models/weapon');
const Shield = require('../models/shield');
const Helmet = require('../models/helmet');
const Chest = require('../models/chest');
const Legs = require('../models/legs');
const Ring = require('../models/ring');
const Amulet = require('../models/amulet');
const Trinket = require('../models/trinket');
const Equipment = require('../models/equipment');

module.exports = {
    indexCommunity,
    focus
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

  
async function focus(req, res) {
    try {
        console.log(req.params.id, '<- Focus ID Function in Community Controller')
        const ascean = await Ascean.findById({ _id: req.params.id })
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
        res.status(200).json({ data: ascean })
    } catch (err) {
        res.status(400).json({ err });
    }
}

async function indexCommunity(req, res) {
    try {
        console.log(req.user._id, '<- Index Function in Community Controller')
        const asceanCrew = await Ascean.find({ visibility: 'public' })
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
        //             // model = 'Equipment';
        //             break;
        //     }
        
        //     promises.push(Ascean.populate(ascean, { path, model }));
        //     // console.log(promises, 'Growing Promises ???');
        //     }
        // });
        // promises.push(Ascean.populate(ascean, { path: "user" }));
        // await Promise.all(promises);
        }
        res.status(200).json({ data: asceanCrew });
    } catch (err) {
        res.status(400).json({ err });
    }
}