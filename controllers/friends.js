const User = require('../models/user')
const Ascean = require('../models/ascean')

module.exports = {
    send,
    accept,
    delete: decline,
    index,
    requests
}

async function send(req, res) {
    console.log(req.params.userId, 'User in Friend Controller [Send Request]');
    console.log(req.user, '<- Request User')
    try {
        const user = await User.findById(req.params.userId);
        user.requests.push({ 
            username: req.user.username,
            userId: req.user._id
         })
        await user.save()
        res.status(201).json({ data: user })
    } catch (err) {
        res.status(400).json({ error: err })
    }
}


//TODO: I think my logic is off in how I push friends and what not
//FIXME: Probably need to make sure I'm pushing myself as a friend via userID and username
//TODO: Into the accepted friend's friends array, and then likewise use his information
//FIXME: To push their userID/username into my searched for user profile
//TODO: The you.requests.remove is already good, meaning I've already been fetched, and
//FIXME: the accepted friend has been fetched, so the interal logic needs refactoring
async function accept(req, res){
    console.log(req.params.friendId, 'Friend in Friend Controller [Accept Request]');
    try {
        const user = await User.findById(req.params.friendId);
        user.friends.push({ 
            username: req.user.username,
            userId: req.user._id
         })
        console.log(user, '<- Fren in Controller Post-Push Fren')
        const you = await User.findById(req.user._id);
        you.friends.push({ 
            username: user.username,
            userId: user._id
         })
        you.requests.remove(req.params.requestId);
        await user.save();
        await you.save()
        res.status(201).json({ data: user, you })
    } catch(err){
        res.status(400).json({error: err})
    }
}

async function decline(req, res) {
    console.log(req.params.userId, 'User in Friend Controller [Decline Request]');
    console.log(req.params.friendId, 'Friend in Friend Controller [Decline Request]');
    try {
        const user = await User.findOne({ 'requests._id': req.params.friendId })
        user.requests.remove(req.params.friendId);
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

async function requests(req, res){
    try {
        const user = await User.findById(req.params.id)
                                .populate('requests')
                                .populate('requests.userId')
                                .exec();

        res.status(201).json({ data: user })
    } catch(err){
        res.status(400).json({error: err})
    }
}