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
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const S3 = require("aws-sdk/clients/s3");
const s3 = new S3(); // initate the S3 constructor which can talk to aws/s3 our bucket!
// import uuid to help generate random names
const { v4: uuidv4 } = require("uuid");
// since we are sharing code, when you pull you don't want to have to edit the
// the bucket name, thats why we're using an environment variable
const BUCKET_NAME = process.env.AWS_BUCKET_NAME;
const SECRET = process.env.SECRET;

module.exports = {
  signup,
  login,
  profile,
  allUsers,
  updateUser,
  updateUserBio
};

async function getModelType(id) {
  const models = {
      Weapon: Weapon,
      Shield: Shield,
      Helmet: Helmet,
      Chest: Chest,
      Legs: Legs,
      Ring: Ring,
      Amulet: Amulet,
      Trinket: Trinket,
      Equipment: Equipment,
  };
  const itemTypes = ['Weapon', 'Shield', 'Helmet', 'Chest', 'Legs', 'Ring', 'Amulet', 'Trinket', 'Equipment'];
  for (const itemType of itemTypes) {
      const item = await models[itemType].findById(id).exec();
      if (item) {
          // let trueType = await getModel(itemType);
          // return trueType;
          return item;
      };
  };
  return null;
};

async function getModelType(id) {
  const models = {
      Weapon: Weapon,
      Shield: Shield,
      Helmet: Helmet,
      Chest: Chest,
      Legs: Legs,
      Ring: Ring,
      Amulet: Amulet,
      Trinket: Trinket,
      Equipment: Equipment,
  };
  const itemTypes = ['Weapon', 'Shield', 'Helmet', 'Chest', 'Legs', 'Ring', 'Amulet', 'Trinket', 'Equipment'];
  for (const itemType of itemTypes) {
      const item = await models[itemType].findById(id).exec();
      if (item) {
          // console.log(itemType, item.itemType, 'This is the itemType and item.itemType, does this do anything correct?')
          return item.itemType;
      };
  };
  return null;
};

async function profile(req, res) {
  try {
    // find the user!
    const user = await User.findOne({ username: req.params.username });
    // if the user is undefined, that means the database couldn't find this user lets send an error back
    if (!user) return res.status(404).json({ error: "User not found" });

    // Find the Post's by the user
    //.populate('user') <- user comes from the key on the post model 
    //   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}, // referencing a model < which replaces the id with the userdocument
    const asceanCrew = await Ascean.find({ user: user._id
      // , visibility: 'public' 
    })
    //                             .populate("user")
    //                             .populate("weapon_one")
    //                             .populate("weapon_two")
    //                             .populate("weapon_three")
    //                             .populate("shield")
    //                             .populate("helmet")
    //                             .populate("chest")
    //                             .populate("legs")
    //                             .populate("ring_one")
    //                             .populate("ring_two")
    //                             .populate("amulet")
    //                             .populate("trinket")
    //                             .exec();
    // console.log(asceanCrew, 'The Ascean Crew')
      const equipmentModels = Object.keys(mongoose.models).filter(modelName => modelName.endsWith('Equipment') || modelName.endsWith('Weapons') ||  modelName.endsWith('Shields') || 
                                                                                 modelName.endsWith('Helmets') || modelName.endsWith('Chests') || modelName.endsWith('Legs') || 
                                                                                 modelName.endsWith('Rings') || modelName.endsWith('Amulets') || modelName.endsWith('Trinkets'));

        const modelMapping = {
        Weapons: ['weapon_one', 'weapon_two', 'weapon_three'],
        Shields: ['shield'],
        Helmets: ['helmet'],
        Chests: ['chest'],
        Legs: ['legs'],
        Rings: ['ring_one', 'ring_two'],
        Amulets: ['amulet'],
        Trinkets: ['trinket'],
        };
        let promises = [];
        
        for await (let ascean of asceanCrew) {
          const populateOptions = await Promise.all([
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
            ].map(async field => ({ path: field, model: await getModelType(ascean[field]._id) })));
            
            await Ascean.populate(ascean, [
            { path: 'user' },
            ...populateOptions
            ]);
          }
          
          // equipmentModels.forEach(async modelName => {
          //     const paths = modelMapping[modelName] || [];
          
          //     for (let path of paths) {
          //     let model;
          
          //     switch (modelName) {
          //         case 'Weapons':
          //             const weapon = await Weapon.find(ascean[path]);
          //             model = weapon.length > 0 ? 'Weapons' : 'Equipment';
          //             break;
          //         case 'Shields':
          //             const shield = await Shield.find(ascean[path]);
          //             model = shield.length > 0 ? 'Shields' : 'Equipment';
          //             break;
          //         case 'Helmets':
          //             const helmet = await Helmet.find(ascean[path]);
          //             model = helmet.length > 0 ? 'Helmets' : 'Equipment';
          //             break;
          //         case 'Chests':
          //             const chest = await Chest.find(ascean[path]);
          //             model = chest.length > 0 ? 'Chests' : 'Equipment';
  
          //             break;
          //         case 'Legs':
          //             const legs = await Legs.find(ascean[path]);
          //             model = legs.length > 0 ? 'Legs' : 'Equipment';
          //             break;
          //         case 'Rings':
          //             const ring = await Ring.find(ascean[path]);
          //             model = ring.length > 0 ? 'Rings' : 'Equipment';
          //             break;
          //         case 'Amulets':
          //             const amulet = await Amulet.find(ascean[path]);
          //             model = amulet.length > 0 ? 'Amulets' : 'Equipment';
          //             break;
          //         case 'Trinkets':
          //             const trinket = await Trinket.find(ascean[path]);
          //             model = trinket.length > 0 ? 'Trinkets' : 'Equipment';
          //             break;
          //         default:
          //             model = 'Equipment';
          //             break;
          //     }
          
          //     promises.push(Ascean.populate(ascean, { path, model }));
          //     // console.log(promises, 'Growing Promises ???');
          //     }
          // });
          // promises.push(Ascean.populate(ascean, { path: "user" }));
          // await Promise.all(promises);
                                
    res.status(200).json({
      data: {
        user: user,
        ascean: asceanCrew,
      }
    });
  } catch (err) {
    console.log(err.message, " <- profile controller");
    res.status(400).json({ error: "Something went wrong" });
  }
}



async function signup(req, res) {
  console.log(req.body, " req.body in signup", req.file);

  if (!req.file) return res.status(400).json({ error: "Please Submit A Photo! I Know Its Trite, I Apologize" });
  const key = `seyr/${uuidv4()}-${req.file.originalname}`;
  const params = { Bucket: BUCKET_NAME, Key: key, Body: req.file.buffer };

  s3.upload(params, async function (err, data) {
    console.log("========================");
    console.log(err, " <--- err from aws");
    console.log("========================");
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
      }
    }
  });
}

async function login(req, res) {
  try {
    const user = await User.findOne({email: req.body.email});
    console.log(user, ' this user in login')
    if (!user) return res.status(401).json({err: 'This Email Address Is Not Registered With The Seyr'});
    user.comparePassword(req.body.password, (err, isMatch) => {
        
      if (isMatch) {
        const token = createJWT(user);
        console.log(token, '<- Token from Login')
        res.json({token});
      } else {
        return res.status(401).json({err: 'The Password You Have Provided Does Not Match The Registered Email Address'});
      }
    });
  } catch (err) {

    return res.status(401).json({err: 'ERROR 401 -- Problem Fetching User, Server May Be Experiencing Issues -- ERROR 401'});
      
    
  }
}

// /api/users
async function allUsers(req, res) {
  const keyword = req.query.search ? {
    $or: [
      { username: { $regex: req.query.search, $options: "i" } },
      { email: { $regex: req.query.search, $options: "i" } },
    ]
  } : {};

  const users = await User.find(keyword)
                          .find({ _id: {$ne:req.user._id } });
  res.send(users);
}

async function updateUser(req, res) {
  // const { username, email } = req.body;
  const { username } = req.body;

  try {
    const user = await User.findByIdAndUpdate(req.user._id, {
      username}, { new: true })
    // await user.save();
    res.status(200).json({ data: user })
  } catch (err) {
    res.status(400).json({ err: 'Error Updating User in Controller' })
  }
}

async function updateUserBio(req, res) {
  // const { username, email } = req.body;
  const { bio } = req.body;

  try {
    const user = await User.findByIdAndUpdate(req.user._id, {
      bio}, { new: true })
    // await user.save();
    res.status(200).json({ data: user })
  } catch (err) {
    res.status(400).json({ err: 'Error Updating User in Controller' })
  }
}

/*----- Helper Functions -----*/

function createJWT(user) {
  return jwt.sign(
    {user}, // data payload
    SECRET,
    {expiresIn: '24h'}
  );
}

function identifyKeyInMongooseValidationError(err) {
  let key = err.split("dup key: {")[1].trim();
  key = key.slice(0, key.indexOf(":"));
  return key.replace(/^./, (str) => str.toUpperCase());
}
