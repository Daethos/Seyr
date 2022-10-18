const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const weaponSchema = new Schema(    
    {
        name: String,
        type: String,
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
        imgURL: String
    },
);
module.exports = mongoose.model('Weapons', weaponSchema);