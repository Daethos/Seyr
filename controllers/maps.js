const Ascean = require('../models/ascean');
const Map = require('../models/map');
const WorldMap = require('../services/worldServices.js');
const zlib = require('zlib');

module.exports = {
    createMap,
    saveMap,
    fetchMap,
};

async function fetchMap(req, res) {
    try {
        const ascean = await Ascean.findById(req.params.asceanID);
        let map;
        if (ascean.maps.length > 0) {
            console.log("Finding Map")
            map = await Map.findById(ascean.maps[0]);
            const decompressedMap = zlib.inflateSync(map.map.buffer).toString();
            const parsedMap = JSON.parse(decompressedMap);
            map.map = parsedMap;
            ascean.maps[0] = map;
        } else {
            map = null;
        };
        res.status(200).json(map);
    } catch (err) {
        console.log(err, "Error Fetching Map");
        res.status(400).json(err);
    };
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
        req.body.map = await compress(req.body.map);
        let map = await Map.create(req.body);
        const decompressedMap = zlib.inflateSync(map.map).toString();
        const parsedMap = JSON.parse(decompressedMap);
        map.map = parsedMap;
        ascean.maps.push(map._id);
        if (ascean.tutorial.firstBoot === true) {
            ascean.tutorial.firstBoot = false;
        };
        await ascean.save();
        res.status(201).json(map);
    } catch (err) {
        console.log(err, "Error Saving Map");
        res.status(400).json(err);
    };
};

async function compress(map) {
    const compressedMap = zlib.deflateSync(JSON.stringify(map));
    return compressedMap;
};