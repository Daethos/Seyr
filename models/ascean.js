const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
        maps: [{
            type: Schema.Types.ObjectId, ref: 'Map'
        }],
        coordinates: {
            x: {
                type: Number,
                default: 0,
            },
            y: {
                type: Number,
                default: 0,
            },
        },
        firewater: {
            charges: {
                type: Number,
                default: 5,
            },
            maxCharges: {
                type: Number,
                default: 5,
            },
        },
        health: {
            current: {
                type: Number,
                default: -10,
            },
            total: {
                type: Number,
                default: 0,
            }
        },
        inventory: {
            type: [],
            default: null
        },
        journal: {
            entries: {
                type: [{
                    title: String,
                    body: String,
                    footnote: String,
                    date: Date,
                    location: String,
                    coordinates: {
                        x: Number,
                        y: Number,
                    },
                }],
                default: null
            },
            currentEntry: {
                type: Number,
                default: 0,
            },
            lastEntry: {
                type: Number,
                default: 0,
            },
        },
        name: String,
        description: String,
        constitution: Number,
        strength: Number,
        agility: Number,
        achre: Number,
        caeren: Number,
        kyosir: Number,
        hardcore: {
            type: Boolean,
            default: false,
        },
        alive: {
            type: Boolean,
            default: true,
        },
        lineage: [{
            type: Schema.Types.ObjectId,
            ref: 'Ascean'
        }],
        weapon_one: {
            type: Schema.Types.ObjectId,
            refPath: 'onWeapon'
        },
        weapon_two: {
            type: Schema.Types.ObjectId,
            refPath: 'onWeapon'
        },
        weapon_three: {
            type: Schema.Types.ObjectId,
            refPath: 'onWeapon'
        },
        shield: {
            type: Schema.Types.ObjectId,
            refPath: 'onShield'
        },
        helmet: {
            type: Schema.Types.ObjectId,
            refPath: 'onHelmet'
        },
        chest: {
            type: Schema.Types.ObjectId,
            refPath: 'onChest'
        },
        legs: {
            type: Schema.Types.ObjectId,
            refPath: 'onLegs'
        },
        ring_one: {
            type: Schema.Types.ObjectId,
            refPath: 'onRing'
        },
        ring_two: {
            type: Schema.Types.ObjectId,
            refPath: 'onRing'
        },
        amulet: {
            type: Schema.Types.ObjectId,
            refPath: 'onAmulet'
        },
        trinket: {
            type: Schema.Types.ObjectId,
            refPath: 'onTrinket'
        },
        onWeapon: {
            type: String,
            enum: ['Weapons', 'Equipment'],
            required: false
        },
        onShield: {
            type: String,
            enum: ['Shields', 'Equipment'],
            required: false
        },
        onHelmet: {
            type: String,
            enum: ['Helmets', 'Equipment'],
            required: false
        },
        onChest: {
            type: String,
            enum: ['Chests', 'Equipment'],
            required: false
        },
        onLegs: {
            type: String,
            enum: ['Legs', 'Equipment'],
            required: false
        },
        onRing: {
            type: String,
            enum: ['Rings', 'Equipment'],
            required: false
        },
        onAmulet: {
            type: String,
            enum: ['Amulets', 'Equipment'],
            required: false
        },
        onTrinket: {
            type: String,
            enum: ['Trinkets', 'Equipment'],
            required: false
        },
        faith: {
            type: String,
            enum : ["adherent", "devoted", "none"],
            default: "none"
        },
        quests: [{
            type: Schema.Types.ObjectId, ref: 'Quest'
        }],
        completedQuests: [{
            type: Schema.Types.ObjectId, ref: 'Quest'
        }],
        statistics: {
            combat: { // Some combat things will be every duel, some will be every level
                losses: { type: Number, default: 0 },
                total: { type: Number, default: 0 },
                wins: { type: Number, default: 0 },
                attacks: { 
                    magical: { type: Number, default: 0 }, 
                    physical: { type: Number, default: 0 } 
                },
                damage: { 
                    magical: { type: Number, default: 0 }, 
                    physical: { type: Number, default: 0 } 
                },
                prayers: { 
                    buff: { type: Number, default: 0 }, 
                    damage: { type: Number, default: 0 }, 
                    debuff: { type: Number, default: 0 }, 
                    heal: { type: Number, default: 0 } 
                 },
                mastery: { 
                    constitution: { type: Number, default: 0 }, 
                    strength: { type: Number, default: 0 }, 
                    agility: { type: Number, default: 0 }, 
                    achre: { type: Number, default: 0 }, 
                    caeren: { type: Number, default: 0 }, 
                    kyosir: { type: Number, default: 0 } 
                },
            },
            luckout: {
                arbitious: { 
                    failures: { type: Number, default: 0 },
                    successes: { type: Number, default: 0 },
                    total: { type: Number, default: 0 },
                 }, 
                chiomic: { 
                    failures: { type: Number, default: 0 },
                    successes: { type: Number, default: 0 },
                    total: { type: Number, default: 0 },
                 }, 
                kyrnaic: { 
                    failures: { type: Number, default: 0 },
                    successes: { type: Number, default: 0 },
                    total: { type: Number, default: 0 },
                 }, 
                lilosian: { 
                    failures: { type: Number, default: 0 },
                    successes: { type: Number, default: 0 },
                    total: { type: Number, default: 0 },
                 }, 

            },
            miniGames: {
                cambiren: {
                    failures: { type: Number, default: 0 },
                    successes: { type: Number, default: 0 },
                    total: { type: Number, default: 0 },
                },
                sevan: {
                    failures: { type: Number, default: 0 },
                    successes: { type: Number, default: 0 },
                    total: { type: Number, default: 0 },
                },
                shrygeian: {
                    failures: { type: Number, default: 0 },
                    successes: { type: Number, default: 0 },
                    total: { type: Number, default: 0 },
                },
                tshaeral: {
                    failures: { type: Number, default: 0 },
                    successes: { type: Number, default: 0 },
                    total: { type: Number, default: 0 },
                }
            },
            persuasion: {
                arbitious: {
                    failures: { type: Number, default: 0 },
                    successes: { type: Number, default: 0 },
                    total: { type: Number, default: 0 },
                }, 
                chiomic: {
                    failures: { type: Number, default: 0 },
                    successes: { type: Number, default: 0 },
                    total: { type: Number, default: 0 },
                },
                fyeran: {
                    failures: { type: Number, default: 0 },
                    successes: { type: Number, default: 0 },
                    total: { type: Number, default: 0 },
                },
                ilian: {
                    failures: { type: Number, default: 0 },
                    successes: { type: Number, default: 0 },
                    total: { type: Number, default: 0 },
                },
                kyrnaic: {
                    failures: { type: Number, default: 0 },
                    successes: { type: Number, default: 0 },
                    total: { type: Number, default: 0 },
                },
                lilosian: {
                    failures: { type: Number, default: 0 },
                    successes: { type: Number, default: 0 },
                    total: { type: Number, default: 0 },
                },
                shaorahi: {
                    failures: { type: Number, default: 0 },
                    successes: { type: Number, default: 0 },
                    total: { type: Number, default: 0 },
                },
            },
            thievery: {
                failures: { type: Number, default: 0 },
                successes: { type: Number, default: 0 },
                total: { type: Number, default: 0 },
                totalValue: { type: Number, default: 0 },
            },
            relationships: {
                deity: {
                    name: { type: String, default: "" }, // This occurs when you meet a deity a second time, you can reinforce you believe it's *that* deity and it'll name them then.
                    behaviors: {
                        type: [],
                        default: []
                    },
                    Compliant: { 
                        occurence: { type: Number, default: 0 },
                        value: { type: Number, default: 0 },
                     },
                    Disobedient: { 
                        occurence: { type: Number, default: 0 },
                        value: { type: Number, default: 0 },
                     },
                    Faithful: { 
                        occurence: { type: Number, default: 0 },
                        value: { type: Number, default: 0 },
                     },
                    Unfaithful: { 
                        occurence: { type: Number, default: 0 },
                        value: { type: Number, default: 0 },
                     },
                    value: { type: Number, default: 0 },
                }
            },
        },
        tutorial: {
            firstBoot: { type: Boolean, default: true },
            firstCity: { type: Boolean, default: true },
            firstCombat: { type: Boolean, default: true },
            firstQuest: { type: Boolean, default: true },
            firstShop: { type: Boolean, default: true },
            firstInventory: { type: Boolean, default: true },
            firstLoot: { type: Boolean, default: true },
            firstMovement: { type: Boolean, default: true },
            firstDeath: { type: Boolean, default: true },
            firstLevelUp: { type: Boolean, default: true },
            firstPhenomena: { type: Boolean, default: true },
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