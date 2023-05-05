const Chat = require('../models/chat');
const User = require('../models/user');
const Message = require('../models/message');

module.exports = {
    sendMessage,
    allMessages,
    allMessagesNotRead,
    markMessagesAsRead
};

async function sendMessage(req, res) {
    const { content, chatId } = req.body
    if (!content || !chatId) {
        return res.status(400).json('Error with the Body of the Message in Controller')
    };
    let newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId
    };
    try {
        let message = await Message.create(newMessage)
        message = await message.populate('sender', 'username photoUrl')
        message = await message.populate('chat')
        message = await User.populate(message, {
            path: 'chat.users',
            select: 'username email photoUrl',
        });
        await Chat.findByIdAndUpdate(req.body.chatId, {
            latestMessages: message
        });
        res.status(200).json({ data: message });
    } catch (err) {
        res.status(400).json({ err: 'Error Sending Message in Controller' });
    };
};

async function allMessages(req, res) {
    try {
        const messages = await Message.find({ chat: req.params.chatId })
                                        .populate('sender', 'username email photoUrl')
                                        .populate('chat')

        res.status(200).json({ data: messages });
    } catch (err) {
        res.status(400).json({ err: 'Error Retrieving Messages in Controller' });
    };
};

async function allMessagesNotRead(req, res) {
    try {
        const userId = req.user._id;
        console.log(userId, "User ID")
        const chatGroups = await Chat.find({ users: userId });
        const chatIds = chatGroups.map(chat => chat._id);
        let messages = await Message.find({ chat: { $in: chatIds }, readBy: { $nin: [userId] }, sender: { $ne: userId } })
                                        .populate('sender', 'username email photoUrl')
                                        .populate('chat')
        messages = await User.populate(messages, {
            path: 'chat.users',
            select: 'username email photoUrl',
        });
        res.status(200).json({ data: messages });
    } catch (err) {
        res.status(400).json({ err: 'Error Retrieving Messages in Controller' });
    };
};

async function markMessagesAsRead(req, res) {
    try {
        const messages = await Message.updateMany(
            { chat: req.params.chatId, readBy: { $ne: req.user._id } }, 
            { $addToSet: { readBy: req.user._id } }
        );

        res.status(200).json({ data: messages });
    } catch (err) {
        res.status(400).json({ err: 'Error Updating Messages in Controller' });
    };
};
