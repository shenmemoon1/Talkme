const User = require("../model/userModel");
const bcrypt = require("bcrypt");
//registration
module.exports.register = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) {
      return res.json({ msg: "Username already use", status: false });
    }
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      res.json({ msg: "Email already use", status: false });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashPassword,
    });

    delete user.password;
    return res.json({ status: true, user });
  } catch (error) {
    next(error);
  }
};

// login controllr
module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    console.log("User from database:", user.username);
    if (!user) {
      return res.json({ msg: "Incorrect username or password", status: false });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.json({ msg: "Incorrect username or password", status: false });
    }
    delete user.password;
    return res.json({ status: true, user });
  } catch (error) {
    next(error);
  }
};

//set avatar
module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.avatarImage;
    const userData = await User.findByIdAndUpdate(userId, {
      isAvatarImageSet: true,
      avatarImage: avatarImage,
    });
    console.log(userData);
    return res.json({
      isSet: userData.isAvatarImageSet,
      avatarImage: userData.avatarImage,
    });
  } catch (error) {
    next(error);
  }
};

// get users
module.exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);
    return res.json(users);
  } catch (error) {
    next(error);
  }
};

// user logot
module.exports.logout = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
  } catch (error) {
    next(error);
  }
};
