const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const asceanSchema = new Schema(
    {
        user: {type: Schema.Types.ObjectId, ref: 'User'},
        visibility: {
            type: String,
            enum : ["public", "private"],
            default: "public"
        },
        level: {type: Number, default: 1},
        experience: {type: Number, default: 0},
        name: String,
        description: String,
        constitution: Number,
        strength: Number,
        agility: Number,
        achre: Number,
        caeren: Number,
        weapon_one: {type: Schema.Types.ObjectId, ref: 'Weapons'},
        weapon_two: {type: Schema.Types.ObjectId, ref: 'Weapons'},
        weapon_three: {type: Schema.Types.ObjectId, ref: 'Weapons'},
        shield: {type: Schema.Types.ObjectId, ref: 'Shields'},
        helmet: {type: Schema.Types.ObjectId, ref: 'Helmets'},
        chest: {type: Schema.Types.ObjectId, ref: 'Chests'},
        legs: {type: Schema.Types.ObjectId, ref: 'Legs'},
        ring_one: {type: Schema.Types.ObjectId, ref: 'Rings'},
        ring_two: {type: Schema.Types.ObjectId, ref: 'Rings'},
        amulet: {type: Schema.Types.ObjectId, ref: 'Amulets'},
        trinket: {type: Schema.Types.ObjectId, ref: 'Trinkets'},
        faith: {
            type: String,
            enum : ["adherent", "devoted", "none"],
            default: "none"
        },
        // adherent: Boolean,
        // devoted: Boolean 
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Ascean', asceanSchema);