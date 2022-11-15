const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    message: { type: String, trim: true },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat' },
},{
    timestamps: true, 
})

module.exports = mongoose.model('Message', messageSchema)