const User = require('../models/user');
const Ascean = require('../models/ascean');
const Weapon = require('../models/weapon');
const Shield = require('../models/shield');
const Helmet = require('../models/helmet');
const Chest = require('../models/chest');
const Legs = require('../models/legs');
const Ring = require('../models/ring');
const Amulet = require('../models/amulet');
const Trinket = require('../models/trinket');
const Equipment = require('../models/equipment');
const asceanService = require('../services/asceanServices');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const S3 = require("aws-sdk/clients/s3");
const s3 = new S3(); // initate the S3 constructor which can talk to aws/s3 our bucket!
const { v4: uuidv4 } = require("uuid");
const BUCKET_NAME = process.env.AWS_BUCKET_NAME;
const SECRET = process.env.SECRET;
const FIELDS = [
  'weapon_one',
  'weapon_two',
  'weapon_three',
  'shield',
  'helmet',
  'chest',
  'legs',
  'ring_one',
  'ring_two',
  'amulet',
  'trinket'
];
const MODELS = {
  'Equipment': Equipment,
  'Weapon': Weapon,
  'Shield': Shield,
  'Helmet': Helmet,
  'Chest': Chest,
  'Legs': Legs,
  'Ring': Ring,
  'Amulet': Amulet,
  'Trinket': Trinket,
};
module.exports = {
  signup,
  login,
  profile,
  profileCharacter,
  deadEnemy,
  allUsers,
  updateUser,
  updateUserBio,
  changePassword,
  createGuestToken,
  demo,
};

async function createGuestToken(req, res) {
  const guestUser = { id: "guest", isGuest: true };
  const guestToken = createJWT(guestUser);
  res.json({ token: guestToken });
};

async function profile(req, res) {
    try {
        const user = await User.findOne({ username: req.params.username });
        if (!user) return res.status(404).json({ error: "User not found" });
        console.log(user.username, " <- user.username");
        const asceanCrew = await Ascean.find({ user: user._id
        // , visibility: 'public' 
        }).populate('user').exec();
        
        const itemFields = FIELDS.map(field => ({ field, itemType: [field.split('_')[0].charAt(0).toUpperCase() + field.split('_')[0].slice(1), 'Equipment'] }));
        for await (let ascean of asceanCrew) {
            
            const populated = await Promise.all(itemFields.map(async ({ field, itemType }) => {
                const item =  await determineItemType(ascean[field], itemType);
                return item ? item : null;  
            }));
        
            populated.forEach((item, index) => {
                ascean[FIELDS[index]] = item;
            });
        };
                                    
        res.status(200).json({
        data: {
            user: user,
            ascean: asceanCrew,
        }
        });
    } catch (err) {
        console.log(err.message, " <- profile controller");
        res.status(400).json({ error: "Something went wrong" });
    };
}; 

async function determineItemType(id, itemType) {
    for (const type of itemType) {
        const item = await MODELS[type].findById(id).exec();
        if (item) return item;
    };
    return null;
};


async function profileCharacter(req, res) {
  try {
        let ascean = await Ascean.aggregate([
            { $match: { user: mongoose.Types.ObjectId(req.body.username), level: { $gte: req.body.minLevel, $lte: req.body.maxLevel } } },
            { $sample: { size: 1 } }
        ]);
        const itemFields = FIELDS.map(field => ({ field, itemType: [field.split('_')[0].charAt(0).toUpperCase() + field.split('_')[0].slice(1), 'Equipment'] }));
        const populated = await Promise.all(itemFields.map(async ({ field, itemType }) => {
            const item =  await determineItemType(ascean[0][field], itemType);
            return item ? item : null;  
        }));

        populated.forEach((item, index) => {
            ascean[0][FIELDS[index]] = item;
        });

        const data = await asceanService.asceanCompiler(ascean[0]);
        res.status(200).json(data);
    } catch (err) {
        console.log(err.message, " <- Error fetching Character from Profile");
        res.status(400).json(err);
    };
};

async function deadEnemy(req, res) {
  try {
    const user = await User.findOne({ username: req.body.username });
    const ascean = await Ascean.find({ user: user._id, alive: false });
    let randomAscean;
    if (ascean) {
      const asceanInRange = ascean.filter((a) => a.level >= req.body.minLevel && a.level <= req.body.maxLevel);
      randomAscean = asceanInRange[Math.floor(Math.random() * asceanInRange.length)];
    } else {
      randomAscean = await Ascean.find({ alive: false, level: { $gte: req.body.minLevel, $lte: req.body.maxLevel } });
    };

    res.status(200).json({
      data: {
        user: user,
        ascean: randomAscean,
      }
    });
  } catch (err) {
    console.log(err.message, " <- Error fetching Character from Profile");
    res.status(400).json({ err });
  }
};

async function changePassword(req, res) {
    try {
        const user = await User.findById(req.body.id);
        const newPassword = req.body.password;
        user.password = newPassword;
        await user.save();
        res.status(200).json({ message: "Password Changed Successfully" });
    } catch (err) {
        console.log(err.message, " <- Error Changing Password");
    };
};

async function demo(_req, res) {
    try {
        const user = await User.findOne({ email: 'demo@ascea.com' });
        const token = createJWT(user);
        res.json({ token });
    } catch (err) {
        console.log(err.message, " <- Error Logging In Demo User");
    };
};

async function signup(req, res) {
  if (!req.file) return res.status(400).json({ error: "Please Submit A Photo! I Know Its Trite, I Apologize" });
  const key = `seyr/${uuidv4()}-${req.file.originalname}`;
  const params = { Bucket: BUCKET_NAME, Key: key, Body: req.file.buffer };

  s3.upload(params, async function (err, data) {
    console.log(err, " <--- err from aws");
    if (err)
      return res.status(400).json({
        err: "Error from AWS, their server may be experiencing issues.",
      });

    const user = new User({ ...req.body, photoUrl: data.Location });
    try {
      await user.save();
      const token = createJWT(user);
      res.json({ token });
    } catch (err) {
      if (err.name === "MongoServerError" && err.code === 11000) {
        console.log(err.message, "err.message");
        res
          .status(423)
          .json({
            errorMessage: err,
            err: `${identifyKeyInMongooseValidationError(
              err.message
            )} Already Taken!`,
          });
      } else {
        res.status(500).json({
          err: err,
          message: "Internal Server Error, Please Try Again",
        });
      };
    };
  });
};

async function login(req, res) {
  try {
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(401).json({err: 'This Email Address Is Not Registered With The Seyr'});
    user.comparePassword(req.body.password, (_err, isMatch) => {
      if (isMatch) {
        const token = createJWT(user);
        res.json({token});
      } else {
        return res.status(401).json({err: 'The Password You Have Provided Does Not Match The Registered Email Address'});
      };
    });
  } catch (err) {
    return res.status(401).json({err: 'ERROR 401 -- Problem Fetching User, Server May Be Experiencing Issues -- ERROR 401'});
  };
};

async function allUsers(req, res) {
  const keyword = req.query.search ? {
    $or: [
      { username: { $regex: req.query.search, $options: "i" } },
      { email: { $regex: req.query.search, $options: "i" } },
    ]
  } : {};

  const users = await User.find(keyword).find({ _id: {$ne:req.user._id } });
  res.send(users);
};

async function updateUser(req, res) {
  const { username } = req.body;
  try {
    const user = await User.findByIdAndUpdate(req.user._id, {
      username}, { new: true })
    res.status(200).json({ data: user })
  } catch (err) {
    res.status(400).json({ err: 'Error Updating User in Controller' })
  }
};

async function updateUserBio(req, res) {
  const { bio } = req.body;
  try {
    const user = await User.findByIdAndUpdate(req.user._id, {
      bio}, { new: true });
    res.status(200).json({ data: user })
  } catch (err) {
    res.status(400).json({ err: 'Error Updating User in Controller' })
  };
};

function createJWT(user) {
  return jwt.sign(
    {user}, // data payload
    SECRET,
    {expiresIn: '7d'}
  );
};

function identifyKeyInMongooseValidationError(err) {
  let key = err.split("dup key: {")[1].trim();
  key = key.slice(0, key.indexOf(":"));
  return key.replace(/^./, (str) => str.toUpperCase());
};