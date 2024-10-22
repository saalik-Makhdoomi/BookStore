const user = require("../models/user");
const bcrypt = require("bcrypt");
const { config } = require("dotenv");
config({ path: "./.env" });

// user SignUp Controller:
const userSignupController = async (req, res) => {
  try {
    const { username, email, password, address } = req.body;

    // Input validations: check if all the fields are present:
    if (!username || !email || !password || !address) {
        return res.status(400).json({ message: "All Fields are Required"});
    }

    // check username length is more than 4:
    if (username.length < 4) {
      return res
        .status(400)
        .json({ message: "Username should be greater than 3" });
    };

    // check if username already exits:
    const existingUsername = await user.findOne({username:username});
    if (existingUsername) {
        return res.status(400).json({ message: "Username already exists"});
    };

     // check if email already exits:
     const existingEmail = await user.findOne({email: email});
     if (existingEmail) {
         return res.status(400).json({ message: "Email already exists"});
     };

    //  check password length:
    if (password.length <= 5){
        return res.status(401).json({ message: "Password should be greater than 5"})
    };

    //  Hash the Password:
    const hashPass = await bcrypt.hash(password, 10);

    // Create the new User:
    const newUser = await user.create({
        username,
        email,
        password: hashPass,
        address
    });
    if (newUser) {
        return res.status(201).json({ message : "User created Successfully"});
    }else {
        return res.status(500).json({ message: "Error while creating the User"});
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message : "Internal Server Error"});
    }
};


module.exports = {userSignupController}