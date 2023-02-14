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

const eitherOrType = async function(value) {
    // console.log(value, 'Does this fire off?')
    const itemTypes = ['Equipment', 'Weapons', 'Amulets', 'Trinkets', 'Shields', 'Rings', 'Helmets', 'Chests', 'Legs'];
    for (const type of itemTypes) {
        const item = await mongoose.model(type).findOne({_id: value});
        if (item) {
            console.log(item.itemType, type, 'This is the item type and type.')
            return type;
        }
    }
    return false;
};

const refType = async function(item) {
    let ref = 'Equipment';
    switch (item.itemType) {
        case 'Weapons' : {
            ref = 'Weapons';
            break;
        };
        case 'Shields' : {
            ref = 'Shields';
            break;
        };
        case 'Helmets': {
            ref = 'Helmets';
            break;
        };
        case 'Chests': {
            ref = 'Chests';
            break;
        };
        case 'Legs': {
            ref = 'Legs';
            break;
        };
        case 'Rings': {
            ref = 'Rings';
            break;
        };
        case 'Amulets': {
            ref = 'Amulets';
            break;
        };
        case 'Trinkets': {
            ref = 'Trinkets';
            break;
        };
    };
};

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
        // weapon_one: {type: Schema.Types.ObjectId, ref: 'Weapons'},
        // weapon_two: {type: Schema.Types.ObjectId, ref: 'Weapons'},
        // weapon_three: {type: Schema.Types.ObjectId, ref: 'Weapons'},
        // shield: {type: Schema.Types.ObjectId, ref: 'Shields'},
        // helmet: {type: Schema.Types.ObjectId, ref: 'Helmets'},
        // chest: {type: Schema.Types.ObjectId, ref: 'Chests'},
        // legs: {type: Schema.Types.ObjectId, ref: 'Legs'},
        // ring_one: {type: Schema.Types.ObjectId, ref: 'Rings'},
        // ring_two: {type: Schema.Types.ObjectId, ref: 'Rings'},
        // amulet: {type: Schema.Types.ObjectId, ref: 'Amulets'},
        // trinket: {type: Schema.Types.ObjectId, ref: 'Trinkets'},
        
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
        tutorial: {
            firstCombat: { type: Boolean, default: true },
            firstQuest: { type: Boolean, default: true },
            firstShop: { type: Boolean, default: true },
            firstInventory: { type: Boolean, default: true },
            firstLoot: { type: Boolean, default: true },
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