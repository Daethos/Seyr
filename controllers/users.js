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
                                // .populate("user")
                                // .populate("weapon_one")
                                // .populate("weapon_two")
                                // .populate("weapon_three")
                                // .populate("shield")
                                // .populate("helmet")
                                // .populate("chest")
                                // .populate("legs")
                                // .populate("ring_one")
                                // .populate("ring_two")
                                // .populate("amulet")
                                // .populate("trinket")
                                // .exec();

      // ascean.forEach(async ascean => {
      //   ascean.weapon_one = await getModelType(ascean.weapon_one._id);
      //   ascean.weapon_two = await getModelType(ascean.weapon_two._id);
      //   ascean.weapon_three = await getModelType(ascean.weapon_three._id);
      //   ascean.shield = await getModelType(ascean.shield._id);
      //   ascean.helmet = await getModelType(ascean.helmet._id);
      //   ascean.chest = await getModelType(ascean.chest._id);
      //   ascean.legs = await getModelType(ascean.legs._id);
      //   ascean.ring_one = await getModelType(ascean.ring_one._id);
      //   ascean.ring_two = await getModelType(ascean.ring_two._id);
      //   ascean.amulet = await getModelType(ascean.amulet._id);
      //   ascean.trinket = await getModelType(ascean.trinket._id);
      // });
    // const equipmentModels = Object.keys(mongoose.models).filter(modelName => modelName.endsWith('Equipment') || modelName.endsWith('Weapons') ||  modelName.endsWith('Shields') || 
    //                                                                              modelName.endsWith('Helmets') || modelName.endsWith('Chests') || modelName.endsWith('Legs') || 
    //                                                                              modelName.endsWith('Rings') || modelName.endsWith('Amulets') || modelName.endsWith('Trinkets'));


    //     for await (let ascean of asceanCrew) {
    //       let promises = [];
    //       console.log(mongoose.models, '<- Equipment Models')
    //       equipmentModels.forEach(async modelName => {
    //           let path, model;
    //           switch (modelName) {
    //               case 'Weapons':
    //                   path = 'weapon_one';
    //                   console.log(ascean[path], 'Ascean')
    //                       const weapon_one = await Weapon.find(ascean[path]);
    //                       if (weapon_one) {
    //                           model = mongoose.models.Weapon;
    //                       } else {
    //                           model = mongoose.models.Equipment;
    //                       }
    //                       console.log(model, 'Model of Weapon One?');
    //                       promises.push(Ascean.populate(ascean, { path, model }));
    //                       path = 'weapon_two';
    //                       const weapon_two = await Weapon.find(ascean[path]);
    //                       if (weapon_two) {
    //                           model = mongoose.models.Weapon;
    //                       } else {
    //                           model = mongoose.models.Equipment;
    //                       }
    //                       promises.push(Ascean.populate(ascean, { path, model }));
    //                       path = 'weapon_three';
    //                       const weapon_three = await Weapon.find(ascean[path]);
    //                       if (weapon_three) {
    //                           model = mongoose.models.Weapon;
    //                       } else {
    //                           model = mongoose.models.Equipment;
    //                       }
    //                       promises.push(Ascean.populate(ascean, { path, model }));
    //                       break;
    //                   case 'Shields':
    //                       path = 'shield';
    //                       const shield = await Shield.find(ascean[path]);
    //                       if (shield) {
    //                           model = mongoose.models.Shield;
    //                       } else {
    //                           model = mongoose.models.Equipment;
    //                       }
    //                       promises.push(Ascean.populate(ascean, { path, model }));
    //                       break;
    //                   case 'Helmets':
    //                       path = 'helmet';
    //                       const helmet = await Helmet.find(ascean[path]);
    //                       if (helmet) {
    //                           model = mongoose.models.Helmet;
    //                       } else {
    //                           model = mongoose.models.Equipment;
    //                       }
    //                       promises.push(Ascean.populate(ascean, { path, model }));
    //                       break;
    //                   case 'Chests':
    //                       path = 'chest';
    //                       const chest = await Chest.find(ascean[path]);
    //                       if (chest) {
    //                           model = mongoose.models.Chest;
    //                       } else {
    //                           model = mongoose.models.Equipment;
    //                       }
    //                       promises.push(Ascean.populate(ascean, { path, model }));
    //                       break;
    //                   case 'Legs':
    //                       path = 'legs';
    //                       const legs = await Legs.find(ascean[path]);
    //                       if (legs) {
    //                           model = mongoose.models.Legs;
    //                       } else {
    //                           model = mongoose.models.Equipment;
    //                       }
    //                       promises.push(Ascean.populate(ascean, { path, model }));
    //                       break;
    //                   case 'Rings':
    //                       path = 'ring_one';
    //                       const ring_one = await Ring.find(ascean[path]);
    //                       if (ring_one) {
    //                           model = mongoose.models.Ring;
    //                       } else {
    //                           model = mongoose.models.Equipment;
    //                       }
    //                       promises.push(Ascean.populate(ascean, { path, model }));
    //                       path = 'ring_two';
    //                       const ring_two = await Ring.find(ascean[path]);
    //                       if (ring_two) {
    //                           model = mongoose.models.Ring;
    //                       } else {
    //                           model = mongoose.models.Equipment;
    //                       }
    //                       promises.push(Ascean.populate(ascean, { path, model }));
    //                       break;
    //                   case 'Amulets':
    //                       path = 'amulet';
    //                       const amulet = await Amulet.find(ascean[path]);
    //                       if (amulet) {
    //                           model = mongoose.models.Amulet;
    //                       } else {
    //                           model = mongoose.models.Equipment;
    //                       }
    //                       promises.push(Ascean.populate(ascean, { path, model }));
    //                       break;
    //                   case 'Trinkets':
    //                       path = 'trinket';
    //                       const trinket = await Trinket.find(ascean[path]);
    //                       if (trinket) {
    //                           model = mongoose.models.Trinket;
    //                       } else {
    //                           model = mongoose.models.Equipment;
    //                       }
    //                       promises.push(Ascean.populate(ascean, { path, model }));
    //                       break;
    //                   default:
    //                       break;
    //               }
    //       });
    //       promises.push(Ascean.populate(ascean, { path: "user" }));
    //       await Promise.all(promises);
    //     }

                                
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
