const Chat = require('../models/chat');
const User = require('../models/user');

module.exports = {
    accessChat,
    fetchChat,
    createGroupChat,
    renameGroup,
    addToGroup,
    removeFromGroup
}

async function accessChat(req, res) {
    console.log(req.params.id, 'Do we have a params.id?')
    // const { userId } = req.params.id;
    // console.log(userId, 'Did this copy over?')
    // if (!userId) {
    //     console.log("UserId Param not sent w/ Request")
    //     res.status(400).json({ err });
    // }
    console.log('We have a userID?', req.params.id)
    
    let isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: req.params.id } } },
        ],
    })
    .populate("users", "-password")
    .populate("latestMessages");
    
    isChat = await User.populate(isChat, {
        path:'latestMessages.sender',
        select: 'username email photoUrl',
    });

    if (isChat.length > 0) {
        res.status(200).json(isChat[0]);
        // res.status(200).json({ data: isChat[0] })
    } else {
        let chatData = {
            chatName: 'sender',
            isGroupChat: false,
            users: [req.user._id, req.params.id],
        };

        try {
            const createdChat = await Chat.create(chatData);
            console.log(createdChat, 'Created Chat')
            const FullChat = await Chat.findOne({ _id: createdChat._id }).populate("users", "-password")

            res.status(200).json({ data: FullChat })
        } catch (err) {
            res.status(400).json({ err: 'Error Accessing Chat in the Controller' });
        }
        
        
    }
}

async function fetchChat(req, res) {
    try {
        Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessages")
                .sort({ updatedAt: -1 })
            .then(async (results) => {
                results = await User.populate(results, {
                    path: "latestMessages.sender",
                    select: "username email photoUrl",
                });

            res.status(200).json({ data: results })
        });
    } catch (err) {
        res.status(400).json({ err });
    }
}

async function createGroupChat(req, res) {
    if (!req.body.users || !req.body.name) {
        res.status(400).json({ message: 'Please fill out all the fields' });
    }

    let users = JSON.parse(req.body.users);

    if (users.length < 2) {
        return res.status(400).send("More than 2 Users are Required to Form a Group Chat")
    }

    users.push(req.user);

    try {
        const groupChat = await Chat.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user,
        });

        const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
                                        .populate("users", "-password")
                                        .populate("groupAdmin", "-password")

        res.status(200).json({ data: fullGroupChat })

    } catch (err) {
        res.status(400).json({ err });
    }
}

async function renameGroup(req, res) {
    const { chatId, chatName } = req.body;

    try {
        const updatedChat = await Chat.findByIdAndUpdate(
            chatId, { chatName }, { new: true }
        )
        .populate("users", "-password")
        .populate("groupAdmin", "-password")
        
        if (!updatedChat) {
            res.status(400).send("Chat Not Found")
        } else {
            res.status(200).json({ data: updatedChat })
        }

    } catch (err) {
        res.status(400).json({ err });
    }
}

async function addToGroup(req, res) {
    const { chatId, userId } = req.body;


    try {
        const added = await Chat.findByIdAndUpdate(chatId, {
            $push: { users: userId },
        },
        { new: true }
        )
            .populate("users", "-password")
            .populate("groupAdmin", "-password")

        if (!added) {
            res.status(400).send("Chat Not Found")
        } else {
            res.status(200).json({ data: added })
        }
    } catch (err) {
        res.status(400).json({ err });
    }
}

async function removeFromGroup(req, res) {
    const { chatId, userId } = req.body;
    try {
        const removed = await Chat.findByIdAndUpdate(chatId, {
            $pull: { users: userId },
        },
        { new: true }
        )
            .populate("users", "-password")
            .populate("groupAdmin", "-password")

        if (!removed) {
            res.status(400).send("Chat Not Found")
        } else {
            res.status(200).json({ data: removed })
        }
    } catch (err) {
        res.status(400).json({ err });
    }
}