const User = require('../models/user')

module.exports = {
    create,
    deleteMessage,
    getMessages,
    getPersonal
}

async function create(req, res) {
    console.log(req.body, '<- Message being created?')
    try {
        const sender = await User.findById(req.params.sendID);
        const receiver = await User.findById(req.params.recID);
        receiver.messages.push({
            message: req.body.message,
            userID: sender._id,
            username: sender.username
        })
        await receiver.save()
        res.status(201).json({ data: receiver })
    } catch (err) {
        res.status(400).json({ error: err })
    };
};

async function deleteMessage(req, res){
    console.log(req.params._id, 'ID in Delete Message Controller');
    try {
            const user = await User.findOne({'messages._id': req.params.id, 'messages.username': req.user.username });
            user.messages.remove(req.params.id)
            await user.save() // after you mutate a document you must save
            res.json({ data: user })
        
    } catch(err){
        res.status(400).json({error: err})
    };
};

async function getMessages(req, res) {
    console.log(req.params.id, 'ID in Message Controller');
    try {
        const user = await User.findById({ _id: req.params.id })
                                .exec();
        res.status(200).json({ data: user })
    } catch (err) {
        res.status(400).json({ err });
    };
};

async function getPersonal(req, res) {
    
    try {
        const user = await User.findById(req.params.userID);
        const friend = await User.findById(req.params.friendID);

        res.status(200).json(
            { data: {
                user,
                friend
                }
            }
        );

    } catch (err) {
        res.status(400).json({ err });
    }
}