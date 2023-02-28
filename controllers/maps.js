const Ascean = require('../models/ascean');
const Map = require('../models/map');
const WorldMap = require('../services/worldServices.js');

module.exports = {
    createMap,
    saveMap,
};

async function createMap(req, res) {
    try {
        const map = new WorldMap(req.body.name, req.body.ascean);
        res.status(201).json(map);
    } catch (err) {
        console.log(err.message, "Error Creating Map");
        res.status(400).json(err);
    };
};

async function saveMap(req, res) {
    try {
        const ascean = await Ascean.findById(req.params.asceanID);
        const map = await Map.create(req.body);
        ascean.maps.push(map._id);
        await ascean.save();
        res.status(201).json(map);
    } catch (err) {
        console.log(err.message, "Error Saving Map");
        res.status(400).json(err);
    };
};