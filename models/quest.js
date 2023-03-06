const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questSchema = new Schema({
    player: Object,
    giver: Object,
    title: String,
    level: Number,
    details: {
        isBounty: Boolean,
        isGiver: String,
        isTimed: Boolean,
        bounty: {
            name: String,
            bounty: Number,
        },
        timer: Number,
    },
    description: String,
    rewards: {
        currency: {
            silver: Number,
            gold: Number,
        },
        items: Array,
        experience: Number,
    },
    completed: Boolean,
    repeatable: Boolean,
});

module.exports = mongoose.model('Quest', questSchema);
