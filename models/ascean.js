const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO: Inventory Field! Empty Array? Default Null?
// FIXME: Perhaps capture all the current EQP? Is that possible?

const likeSchema = new Schema({
    username: String,
    userId: { type: mongoose.Schema.Types.Object }
})

const dislikeSchema = new Schema({
    username: String,
    userId: { type: mongoose.Schema.Types.Object }
})

const doubleDislikeSchema = new Schema({
    username: String,
    userId: { type: mongoose.Schema.Types.Object }
})

const questSchema = new Schema({
    title: String,
    description: String,
    requires: {
        type: [],
        default: null
    },
    level: Number,
    repeatable: Boolean,
    rewards: {
        type: [],
        default: null
    },
    completed: Boolean,
});

const statusSchema = new Schema({
    name: String,
    description: String,
    duration: Number,
    refreshes: Boolean,
    stacks: Boolean,
    type: String,
    active: Boolean,
    hidden: Boolean,
    imgURL: String,
});

const asceanSchema = new Schema(
    {
        user: {type: Schema.Types.ObjectId, ref: 'User'},
        visibility: {
            type: String,
            enum : ["public", "private"],
            default: "public"
        },
        shareable: {
            type: String,
            enum : ["public", "private", "none"],
            default: "none"
        },
        origin: {
            type: String,
            enum : ["Ashtre", "Fyers", "Li'ivi", "Notheo", "Nothos", "Quor'eite", "Sedyreal"],
            default: "Ashtre"
        },
        sex:  {
            type: String,
            enum: ["Man", "Woman"],
            default: "Man"
        },
        mastery: {
            type: String,
            enum : ["Constitution", "Strength", "Agility", "Achre", "Caeren", "Kyosir"],
            default: "Constitution"
        },
        index: String,
        level: {type: Number, default: 1},
        experience: {type: Number, default: 0},
        high_score: { type: Number, default: 0 },
        currency: {
            silver: {
                type: Number,
                default: 0,
            },
            gold: {
                type: Number,
                default: 0,
            },
        },
        inventory: {
            type: [],
            default: null
        },
        name: String,
        description: String,
        constitution: Number,
        strength: Number,
        agility: Number,
        achre: Number,
        caeren: Number,
        kyosir: Number,
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
        likes: [likeSchema],
        dislikes: [dislikeSchema],
        double_dislikes: [doubleDislikeSchema]
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Ascean', asceanSchema);