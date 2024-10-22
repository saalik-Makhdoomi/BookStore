const user = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { config } = require("dotenv");
config({ path: "./.env" });

// user SignUp Controller:
const userSignupController = async (req, res) => {
  try {
    const { username, email, password, address } = req.body;

    // Input validations: check if all the fields are present:
    if (!username || !email || !password || !address) {
      return res.status(400).json({ message: "All Fields are Required" });
    }

    // check username length is more than 4:
    if (username.length < 4) {
      return res
        .status(400)
        .json({ message: "Username should be greater than 3" });
    }

    // check if username already exits:
    const existingUsername = await user.findOne({ username: username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // check if email already exits:
    const existingEmail = await user.findOne({ email: email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    //  check password length:
    if (password.length <= 5) {
      return res
        .status(401)
        .json({ message: "Password should be greater than 5" });
    }

    //  Hash the Password:
    const hashPass = await bcrypt.hash(password, 10);

    // Create the new User:
    const newUser = await user.create({
      username,
      email,
      password: hashPass,
      address,
    });
    if (newUser) {
      return res.status(201).json({ message: "User created Successfully" });
    } else {
      return res.status(500).json({ message: "Error while creating the User" });
    }
  } catch (error) {
    // console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// user Login Controller:
const userLoginController = async (req, res) => {
  try {
    const secretKey = process.env.SECRET_KEY;
    const { username, password } = req.body;

    // check if all the fields are filled:
    if (!username || !password) {
      return res.status(400).json({ message: "All Data Fields Required!" });
    }
    // check if username is avaliable:
    const existingUser = await user.findOne({ username });
    console.log(existingUser);
    
    if (!existingUser) {
      return res.status(401).json({ message: "User not Registered" });
    }

    //   compare password and act accordigly:
    const comparePass = await bcrypt.compare(password, existingUser.password);
      if (comparePass) {
        const token = jwt.sign(
          { _id: existingUser._id, role: existingUser.role },
          secretKey,
          { expiresIn: "30d" }
        ); //token expires in 30days
        res.status(200).json({ message: "Login Successfully", token: token });

      } else {
        res.status(400).json({ message: "Invalid Credentials" });
      };

  } catch (error) {
    // console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { userSignupController, userLoginController };
