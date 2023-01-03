const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ringSchema = new Schema(    
    {
        name: String,
        type: String,
        rarity: String,
        physical_damage: Number,
        magical_damage: Number,
        critical_chance: Number,
        critical_damage: Number,
        physical_penetration: Number,
        magical_penetration: Number,
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
        imgURL: String
    },
);
module.exports = mongoose.model('Rings', ringSchema);