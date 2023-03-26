const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const gamesettingSchema = new Schema(
    {
        user: {type: Schema.Types.ObjectId, ref: 'User'},
        mapMode: {
            type: String,
            enum : ["FULL_MAP", "QUADRANT", "SURROUNDING_TILES", "TIGHT"],
            default: "FULL_MAP"
        },
        canvasPosition: {
            x: {
                type: Number,
                default: 0,
            },
            y: {
                type: Number,
                default: 1.5,
            },
        },
        canvasHeight: { type: Number, default: 400 },
        canvasWidth: { type: Number, default: 400 },
        joystickSpeed: { type: Number, default: 150 },
        moveTimer: { type: Number, default: 10 },
        soundEffectVolume: { type: Number, default: 0.3 },
        timeLeft: { type: Number, default: 10 },
        vibrationTime: { type: Number, default: 100 },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('GameSetting', gamesettingSchema);