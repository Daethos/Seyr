const Ascean = require('../models/ascean');
const Map = require('../models/map');
const WorldMap = require('../services/worldServices.js');
const zlib = require('zlib');



module.exports = {
    createMap,
    saveMap,
};

async function createMap(req, res) {
    try {
        const map = new WorldMap(req.body.name, req.body.ascean);
        // console.log(map, "New Map Made")
        const newMap = await compress(map);
        console.log(newMap, "New Map Compressed")
        res.status(201).json(map);
    } catch (err) {
        console.log(err.message, "Error Creating Map");
        res.status(400).json(err);
    };
};

async function saveMap(req, res) {
    try {
        const ascean = await Ascean.findById(req.params.asceanID);
        console.log(req.body.map, "Map to Save")
        req.body.map = await compress(req.body.map);
        console.log("Creating Map", Date.now());
        let map = await Map.create(req.body);

        const decompressedMap = zlib.inflateSync(map.map).toString();
        const parsedMap = JSON.parse(decompressedMap);
        map.map = parsedMap;
        
        console.log("Map Created", Date.now());
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
    console.log("Compressing Map", Date.now());
    const compressedMap = zlib.deflateSync(JSON.stringify(map));
    return compressedMap;
};