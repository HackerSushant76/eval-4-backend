const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { User } = require("../models/user.model");

const signupController = async (req, res) => {
  const { email, password } = req.body;
  const IP_address = req.socket.remoteAddress;
  bcrypt.hash(password, 4, async function (err, hash) {
    // Store hash in your password DB.
    if (err) {
      res.send("Somethhing went wrong , please signup later");
    } else {
      const user = new User({
        email: email,
        password: hash,
        IP_address: IP_address,
      });
      await user.save();
      res.send("signup succesful");
    }
  });
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  console.log(user);
  const hash = user.password;
  const userid = user._id;
  bcrypt.compare(password, hash, function (err, result) {
    if (result) {
      const token = jwt.sign({ userid: userid }, process.env.secret_key);
      res.send({ msg: "login succesful", token: token });
    } else {
      res.send("wrong credentials");
    }
  });
};

module.exports = { signupController, loginController };
