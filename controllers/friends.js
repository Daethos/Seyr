const User = require('../models/user')
const Ascean = require('../models/ascean')

module.exports = {
    send,
    accept,
    delete: decline,
    index,
    requests,
    soloFriend
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

async function soloFriend(req, res) {
    try {
        const user = await User.findById(req.params.id)

        const ascean = await Ascean.find({ user: user._id
            // , visibility: 'public' 
        })
                                .populate("user")
                                .populate("weapon_one")
                                .populate("weapon_two")
                                .populate("weapon_three")
                                .populate("shield")
                                .populate("helmet")
                                .populate("chest")
                                .populate("legs")
                                .populate("ring_one")
                                .populate("ring_two")
                                .populate("amulet")
                                .populate("trinket")
                                .exec();
        
        // res.status(201).json({ data: user })

        res.status(201).json({ data: {
            user: user,
            ascean: ascean,
        }})

    } catch (err) {
        res.status(400).json({ err })
    }
}

async function index(req, res) {
    console.log(req.params.id, 'User in Controller')
    try {
        const user = await User.findById(req.params.id)
                                .populate('friends')
                                .populate('friends.userId')
                                .exec()
        const asceans = await Promise.all(user.friends.map(async (friend) => {
            console.log(friend.userId._id, '<- Hello, fren in Controller')
            let asceanFrens = []
            const ascean = await Ascean.find({ user: friend.userId._id
                // , visibility: 'public' 
            })
                                .populate("user")
                                .populate("weapon_one")
                                .populate("weapon_two")
                                .populate("weapon_three")
                                .populate("shield")
                                .populate("helmet")
                                .populate("chest")
                                .populate("legs")
                                .populate("ring_one")
                                .populate("ring_two")
                                .populate("amulet")
                                .populate("trinket")
                                .exec()

            //console.log(ascean, '<- Hello, Ascean of Fren!')       
            asceanFrens.push(ascean)     
            //console.log(ascean, '<- Hello, Ascean Frens!')       
            return (
                ascean
            );
        }))
        const asceanFrens = await asceans
        //console.log(asceanFrens, '<- Are you here, asceans?')
        // const ascean = await Ascean.find({ user: user._id, visibility: 'public' })
        //                         .populate("user")
        //                         .populate("weapon_one")
        //                         .populate("weapon_two")
        //                         .populate("weapon_three")
        //                         .populate("shield")
        //                         .populate("helmet")
        //                         .populate("chest")
        //                         .populate("legs")
        //                         .populate("ring_one")
        //                         .populate("ring_two")
        //                         .populate("amulet")
        //                         .populate("trinket")
        //                         .exec();
        
        // res.status(201).json({ data: user })

        res.status(201).json({ data: {
            user: user,
            asceans: asceans,
          } })

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