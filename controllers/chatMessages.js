const Chat = require('../models/chat');
const User = require('../models/user');
const Message = require('../models/message')

module.exports = {
    sendMessage,
    allMessages
}

async function sendMessage(req, res) {
    console.log(req.body, 'Message Content and Chat ID?')
    const { content, chatId } = req.body
    
    if (!content || !chatId) {
        return res.status(400).json('Error with the Body of the Message in Controller')
    }

    let newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId
    }
    console.log(newMessage, 'New Message in Controller')
    try {
        let message = await Message.create(newMessage)
        message = await message.populate('sender', 'username photoUrl')
        message = await message.populate('chat')
        message = await User.populate(message, {
            path: 'chat.users',
            select: 'username email photoUrl',
        })
        
        console.log(message, 'Message Updated?')
        await Chat.findByIdAndUpdate(req.body.chatId, {
            latestMessages: message
        });

        res.status(200).json({ data: message })
    } catch (err) {
        res.status(400).json({ err: 'Error Sending Message in Controller' })
    }
}

async function allMessages(req, res) {
    console.log(req.params.chatId, 'Did we make it to the Controller?')
    try {
        const messages = await Message.find({ chat: req.params.chatId })
                                        .populate('sender', 'username email photoUrl')
                                        .populate('chat')

        res.status(200).json({ data: messages })
    } catch (err) {
        res.status(400).json({ err: 'Error Retrieving Messages in Controller' })
    }
}