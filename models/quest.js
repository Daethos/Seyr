const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questSchema = new Schema({
    player: Object,
    giver: Object,
    title: String,
    level: Number,
    details: {
        isGiver: String,
        isTimed: Boolean,
        bounty: Number,
        timer: Number,
    },
    description: String,
    rewards: {
        type: [],
        default: null
    },
    completed: Boolean,
    repeatable: Boolean,
});

module.exports = mongoose.model('Quest', questSchema);
