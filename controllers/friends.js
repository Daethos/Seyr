const User = require('../models/user')

module.exports = {
    send,
    accept,
    delete: decline,
    index,
    status
}

async function send(req, res) {
    console.log(req.params.userId, 'User in Friend Controller [Send Request]');
    console.log(req.user, '<- Request User')
    try {
        const user = await User.findById(req.params.userId);
        user.friends.push({ 
            username: req.user.username,
            userId: req.user._id
         })
        await user.save()
        res.status(201).json({ data: user })
    } catch (err) {
        res.status(400).json({ error: err })
    }
}

async function accept(req, res){
    try {
        const user = await User.findById(req.params.friendId);
        user.friends.push({ 
            username: req.user.username,
            userId: req.user._id
         })
        user.save();
        res.status(201).json({ data: user })
    } catch(err){
        res.status(400).json({error: err})
    }
}

async function decline(req, res) {
    console.log(req.params.userId, 'User in Friend Controller [Decline Request]');
    console.log(req.params.friendId, 'Friend in Friend Controller [Decline Request]');
    try {
        const user = await User.findOne({ 'friends._id': req.params.friendId })
        user.friends.remove(req.params.friendId);
        await user.save();
        res.json({ data: user })
    } catch (err) {
        res.status(400).json({error: err})
    }
}

async function index(req, res) {
    try {
        const user = await User.findById(req.params.id)
                                .populate('friends')
                                .populate('friends.userId')
                                .exec();
        res.status(200).json({ data: user })
    } catch (err) {
        res.status(400).json({ err })
    }
}

async function status(req, res){
    try {
        const yourSelf = req.user.username
        console.log(yourSelf, '<- Who are you in the controller?', req.params.friendName, 'And who is your fren?')
        const user = await User.findOne({ 'username': req.params.friendName })
                                .populate('friends')
                                .exec()
        console.log(user, '<- Who is this fren REALLY?')

        // if ( 

        const data = user.friends.find( (friend) => friend.username === req.user.username )
        //( { yourSelf : { $in: username } } ) 
            
        //     ) {
        //     data = true;
        // } else {
        //     data = false;
        // }
        console.log(data, '<- What is teh data from status controller?')
        res.status(201).json({ data, user })
    } catch(err){
        res.status(400).json({error: err})
    }
}