const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questSchema = new Schema({
    title: String,
    description: String,
    requirements: {
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

module.exports = mongoose.model('Quest', questSchema);
