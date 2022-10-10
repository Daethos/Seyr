const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Ascean = require('../models/ascean');
const bcrypt = require('bcrypt');

module.exports = {
    create
}

async function create(req, res) {
    console.log(req.body, '<- Hopefully the Ascean!', req.user)
        try {
            const ascean = await Ascean.create({
                user: req.user,
                name: req.body.name,
                description: req.body.description,
                constitution: req.body.constitution,
                strength: req.body.strength,
                agility: req.body.agility,
                achre: req.body.achre,
                caeren: req.body.caeren,
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
            res.status(201).json({ ascean: ascean });
        } catch (err) {
            res.status(400).json({ err });
        }
}