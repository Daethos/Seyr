const User = require('../models/user');
const Ascean = require('../models/ascean')
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

async function profile(req, res) {
  try {
    // find the user!
    const user = await User.findOne({ username: req.params.username });
    // if the user is undefined, that means the database couldn't find this user lets send an error back
    if (!user) return res.status(404).json({ error: "User not found" });

    // Find the Post's by the user
    //.populate('user') <- user comes from the key on the post model 
    //   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}, // referencing a model < which replaces the id with the userdocument
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

                                if (ascean) {
                                  let promises = [];
                                
                                  if (ascean.onWeapon) {
                                    promises.push(
                                      Ascean.populate(ascean, {
                                        path: "weapon_one",
                                        model: ascean.onWeapon
                                      })
                                    );
                                    promises.push(
                                      Ascean.populate(ascean, {
                                        path: "weapon_two",
                                        model: ascean.onWeapon
                                      })
                                    );
                                    promises.push(
                                      Ascean.populate(ascean, {
                                        path: "weapon_three",
                                        model: ascean.onWeapon
                                      })
                                    );
                                  }
                                
                                  if (ascean.onShield) {
                                    promises.push(
                                      Ascean.populate(ascean, {
                                        path: "shield",
                                        model: ascean.onShield
                                      })
                                    );
                                  }

                                  if (ascean.onHelmet) {
                                    promises.push(
                                      Ascean.populate(ascean, {
                                        path: "helmet",
                                        model: ascean.onHelmet
                                      })
                                    );
                                  }

                                  if (ascean.onChest) {
                                    promises.push(
                                      Ascean.populate(ascean, {
                                        path: "chest",
                                        model: ascean.onChest
                                      })
                                    );
                                  }

                                  if (ascean.onLegs) {
                                    promises.push(
                                      Ascean.populate(ascean, {
                                        path: "legs",
                                        model: ascean.onLegs
                                      })
                                    );
                                  }

                                  if (ascean.onRing) {
                                    promises.push(
                                      Ascean.populate(ascean, {
                                        path: "ring_one",
                                        model: ascean.onRing
                                      })
                                    );
                                    promises.push(
                                      Ascean.populate(ascean, {
                                        path: "ring_two",
                                        model: ascean.onRing
                                      })
                                    );
                                  }

                                  if (ascean.onAmulet) {
                                    promises.push(
                                      Ascean.populate(ascean, {
                                        path: "amulet",
                                        model: ascean.onAmulet
                                      })
                                    );
                                  }

                                  if (ascean.onTrinket) {
                                    promises.push(
                                      Ascean.populate(ascean, {
                                        path: "trinket",
                                        model: ascean.onTrinket
                                      })
                                    );
                                  }
                                
                                  // Repeat this pattern for all the other equipment fields
                                
                                  promises.push(Ascean.populate(ascean, { path: "user" }));
                                
                                  await Promise.all(promises);
                                
                                  // ascean is now populated with all the referenced equipment and user
                                }
    res.status(200).json({
      data: {
        user: user,
        ascean: ascean,
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
