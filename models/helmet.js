const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const helmetSchema = new Schema(    
    {
        name: String,
        type: String,
        rarity: String,
        itemType: { type: String, default: 'Helmets' },
        physical_damage: Number,
        magical_damage: Number,
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
        imgURL: String
    },
);
module.exports = mongoose.model('Helmets', helmetSchema);