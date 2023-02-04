const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const equipmentSchema = new Schema({
    name: String,
    type: String,
    rarity: String,
    grip: String,
    attack_type: String,
    damage_type: {
        type: [],
        default: null
    },
    physical_damage: Number,
    magical_damage: Number,
    physical_penetration: Number,
    magical_penetration: Number,
    critical_chance: Number,
    critical_damage: Number,
    physical_resistance: Number,
    magical_resistance: Number,
    dodge: Number,
    roll: Number,
    constitution: Number,
    strength: Number,
    agility: Number,
    achre: Number,
    caeren: Number,
    kyosir: Number,
    influences: {
        type: [],
        default: null
    },
    imgURL: String
});

module.exports = mongoose.model('Equipment', equipmentSchema)