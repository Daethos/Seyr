const User = require('../models/user');
const Ascean = require('../models/ascean');
const asceanService = require('../services/asceanServices')

module.exports = {
    create,
    index,
    editAscean,
    getOneAscean,
    delete: deleteAscean,
    getAsceanStats,
    updateHighScore,
    updateLevel,
    saveItemToAscean
}



//TODO: Make a function to create the Ascean's 'stats' through the backend
//FIXME: So they're simply 'on' the character I think. That way the rendering client-side
//TODO: Will hopefully not mess around with the stats of the character
//FIXME: Not sure but probably exploitable via the client somehow, like getting it to render so you multiply stats

//TODO: Note: Seem to be able to run the equations through a 'const' at the beginning and it holds the value through re-rendering

async function editAscean(req, res) {
    try {
        const ascean = await Ascean.findByIdAndUpdate(req.params.id, {
            user: req.user,
            visibility: req.body.visibility,
            shareable: req.body.shareable,
            name: req.body.name,
            origin: req.body.origin,
            sex: req.body.sex,
            index: req.body.name,
            description: req.body.description,
            constitution: req.body.constitution,
            strength: req.body.strength,
            agility: req.body.agility,
            achre: req.body.achre,
            caeren: req.body.caeren,
            kyosir: req.body.kyosir,
            mastery: req.body.mastery,
            weapon_one: req.body.weapon_one,
            weapon_two: req.body.weapon_two,
            weapon_three: req.body.weapon_three,
            shield: req.body.shield,
            helmet: req.body.helmet,
            helmet: req.body.helmet,
            chest: req.body.chest,
            legs: req.body.legs,
            ring_one: req.body.ring_one,
            ring_two: req.body.ring_two,
            amulet: req.body.amulet,
            trinket: req.body.trinket,
            faith: req.body.faith,
        })
        ascean.save();
        res.status(201).json({ ascean: ascean })
    } catch (err) {
        console.log(err.message, '<- Error in the Controller Editing the Ascean!')
    }
}

async function updateLevel(req, res) {
    let constitution = Number(req.body.constitution);
    let strength = Number(req.body.strength);
    let agility = Number(req.body.agility);
    let achre = Number(req.body.achre);
    let caeren = Number(req.body.caeren);
    let kyosir = Number(req.body.kyosir);
    let mastery = req.body.ascean.mastery;
    let newMastery = req.body.mastery;
    try {
        const ascean = await Ascean.findByIdAndUpdate(req.body.ascean._id, {
            level: req.body.ascean.level + 1,
            experience: 0,
            constitution: Math.round((req.body.ascean.constitution + constitution) * (newMastery === 'Constitution' ? 1.1 : 1.05)),
            strength: Math.round((req.body.ascean.strength + strength) * (newMastery === 'Strength' ? 1.1 : 1.05)),
            agility: Math.round((req.body.ascean.agility + agility) * (newMastery === 'Agility' ? 1.1 : 1.05)),
            achre: Math.round((req.body.ascean.achre + achre) * (newMastery === 'Achre' ? 1.1 : 1.05)),
            caeren: Math.round((req.body.ascean.caeren + caeren) * (newMastery === 'Caeren' ? 1.1 : 1.05)),
            kyosir: Math.round((req.body.ascean.kyosir + kyosir) * (newMastery === 'Kyosir' ? 1.1 : 1.05)),
            mastery: newMastery, 
            faith: req.body.faith,
        }, { new: true });
        console.log(ascean, '<- Ascean Leveled Up in the Controller');
        res.status(200).json({ data: ascean });
    } catch (err) {
        console.log(err.message, '<- Error in the Controller Updating the Level!')
        res.status(400).json({ err });
    }
}

async function updateHighScore(req, res) {
    const { asceanId, highScore } = req.body
    console.log(asceanId, highScore, 'Are we updating in the Controller?')
    try {
        const ascean = await Ascean.findByIdAndUpdate(asceanId, {
            high_score: highScore }, { new: true})
        res.status(200).json({ data: ascean });
    } catch (err) {
        res.status(400).json({ err });
    }
}

async function deleteAscean(req, res) {
    try {
        await Ascean.findByIdAndDelete(req.params.id)
        res.status(201).json({});
    } catch (err) {
        console.log(err.message, '<- Error in delete Ascean function')
        res.status(400).json({ err })
    }
}

async function create(req, res) {
    console.log(req.body, '<- Hopefully the Ascean!', req.user)
        if (req.body.preference === 'Plate-Mail') {
            req.body.helmet = '63b322831c4ece0f04812082';
            req.body.chest = '63b322841c4ece0f04812088';
            req.body.legs = '63b322841c4ece0f0481208d';
        }
        if (req.body.preference === 'Chain-Mail') {
            req.body.helmet = '63b322831c4ece0f04812083';
            req.body.chest = '63b322841c4ece0f04812089';
            req.body.legs = '63b322841c4ece0f0481208e';
        }
        if (req.body.preference === 'Leather-Mail') {
            req.body.helmet = '63b322831c4ece0f04812084';
            req.body.chest = '63b322841c4ece0f0481208a';
            req.body.legs = '63b322841c4ece0f0481208f';
        }
        if (req.body.preference === 'Leather-Cloth') {
            req.body.helmet = '63b322831c4ece0f04812085'
            req.body.chest = '63b322841c4ece0f0481208b';
            req.body.legs = '63b322841c4ece0f04812090';
        }

        if (req.body.faith === 'devoted') { // Devoted to Daethos
            if (req.body.strength + req.body.agility >= req.body.achre + req.body.caeren) {
                if (req.body.strength > req.body.agility) { // Halberd
                    req.body.weapon_one = '63b3460cd5c6cfea02a5e575';
                } else if (req.body.strength < req.body.agility) { // Gladius
                    req.body.weapon_one = '63b3460cd5c6cfea02a5e56c';
                } else { // Same Value Daethic Bow
                    req.body.weapon_one = '63b3460cd5c6cfea02a5e586';
                }
            }
            if (req.body.strength + req.body.agility < req.body.achre + req.body.caeren) {
                if (req.body.achre > req.body.caeren) { // Tendril
                    req.body.weapon_one = '63b3460cd5c6cfea02a5e583';
                } else if (req.body.achre < req.body.caeren) { // Hush
                    req.body.weapon_one = '63b3460cd5c6cfea02a5e57d';
                } else { // Same Value Caeren Barrage
                    req.body.weapon_one = '63b3460cd5c6cfea02a5e57c';
                }
            }
        } else { // Adherent to the Ancients or Irreligious
            if (req.body.strength + req.body.agility >= req.body.achre + req.body.caeren) {
                if (req.body.strength > req.body.agility) { // War Hammer
                    req.body.weapon_one = '63b3460cd5c6cfea02a5e578';
                } else if (req.body.strength < req.body.agility) { // Longsword
                    req.body.weapon_one = '63b3460cd5c6cfea02a5e56d';
                } else { // Same Value Longbow
                    req.body.weapon_one = '635b855d9095eea18746cddc';
                }
            }
            if (req.body.strength + req.body.agility < req.body.achre + req.body.caeren) {
                if (req.body.achre > req.body.caeren) { // Astral Spear
                    req.body.weapon_one = '63b3460cd5c6cfea02a5e57f';
                } else if (req.body.achre < req.body.caeren) { // Lava Spit
                    req.body.weapon_one = '63b3460cd5c6cfea02a5e57e';
                } else { // Same Value Arctic Bolt
                    req.body.weapon_one = '63b3460cd5c6cfea02a5e580';
                }
            }
        }


        try {
            const ascean = await Ascean.create({
                user: req.user,
                name: req.body.name,
                index: req.body.name,
                origin: req.body.origin,
                sex: req.body.sex,
                description: req.body.description,
                constitution: req.body.constitution,
                strength: req.body.strength,
                agility: req.body.agility,
                achre: req.body.achre,
                caeren: req.body.caeren,
                kyosir: req.body.kyosir,
                mastery: req.body.mastery,
                weapon_one: req.body.weapon_one,
                weapon_two: '63b34b5ed5326753b191846b',
                weapon_three: '63b34b5ed5326753b191846c',
                shield: '63b34b5fd5326753b191846f',
                helmet: req.body.helmet,
                chest: req.body.chest,
                legs: req.body.legs,
                ring_one: '63b3491009fa8aa7e4495996',
                ring_two: '63b3491009fa8aa7e4495996',
                amulet: '63b3491109fa8aa7e4495999',
                trinket: '63b3491109fa8aa7e449599b',
                faith: req.body.faith,
            })
            res.status(201).json({ ascean: ascean });
        } catch (err) {
            res.status(400).json({ err });
        }
}

async function index(req, res) {
    try {
        console.log(req.user._id, '<- User ID in Ascean Index Controller')
        const ascean = await Ascean.find({ user: req.user._id })
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
        res.status(200).json({ data: ascean });
    } catch (err) {
        res.status(400).json({ err });
    }
}

async function getOneAscean(req, res) {
    try {
        const ascean = await Ascean.findById({ _id: req.params.id })
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
        res.status(200).json({ data: ascean })
    } catch (err) {
        res.status(400).json({ err });
    }
}

async function getAsceanStats(req, res) {
    try {
        const ascean = await Ascean.findById({ _id: req.params.id })
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
        const data = await asceanService.asceanCompiler(ascean)
        //console.log(data)
        res.status(200).json({ data })
    } catch (err) {
        res.status(400).json({ err });
    }
}

async function saveItemToAscean(req, res) {
    try {
       const ascean = await Ascean.findById(req.params.id);
       ascean.inventory.push(req.body.itemId);
       await ascean.save();
        res.status(201).json({ data: ascean });
    } catch (err) {
        res.status(400).json({ err });
    }
}