const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mapSchema = new Schema({
    name: { type: String, required: true },
    player: { type: String, required: true },
    province: { type: String, required: true },
    contentOptions : { type: [], required: true },
    size: { type: Number, default: 100 },
    contentClusters: { type: Object, default: {} },
    contentCounts: { type: Object, default: {} },
    map: { type: Object, default: {} },
    currentTile: { type: Object, default: {} },
    lastCurrentTileContent: { type: String, default: '' },
    initialPosition: { type: Object, default: {} },
    visitedTiles: { type: Object, default: {} },
    context: { type: String, default: '' },
    steps: { type: Number, default: 0 },
    contentMoved: { type: Boolean, default: false },
    joystickDisabled: { type: Boolean, default: false },
    preMovedTiles: { type: [], default: [] },
    postMovedTiles: { type: [], default: [] },
    }, {
    timestamps: true
});

module.exports = mongoose.model('Map', mapSchema);