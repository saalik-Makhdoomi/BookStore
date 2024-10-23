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


// get user-information:
const userInformationController = async (req, res) => {
    try {
      const userId = req.user._id;  // Extract userId from the decoded token in req.user
      const data = await user.findById(userId).select('-password');  // Fetch user data, exclude password
        return res.status(200).json(data);
        
        
    } catch (error) {
        res.status(500).json({ message: "Internal server error"});
    }
};

//Edit User:
const userEditController = async (req, res) => {
  try {
    const { username, email, password, address} = req.body;
    const userId = req.user._id;

    // Fetch user by userId:
    const findUser = await user.findById(userId);
    if(!findUser) {
      return res.status(400).json({ message : "User not Found" });
    }

      // Hash password only if it's provided in the update
      let hashPass;
      if (password) {
        hashPass = await bcrypt.hash(password, 10);
        if (!hashPass) {
          return res
            .status(500)
            .json({ message: "Error while hashing the new password!" });
        }
      }
      
      const updateUser = await user.findByIdAndUpdate(userId,{
                // Fallback Logic: Here, I used username || findUser.username, which means if username is not provided (undefined), it will retain the existing value from findUser.username. This prevents overwriting existing fields with undefined.
                username: username || findUser.username, // Use existing value if not provided
                password: hashPass || findUser.password, // Update password only if a new one is provided
                email: email || findUser.email,
                address: address || findUser.address,
        
      },
    { new: true, runValidators: true } // Return the updated document and validate fields
  );

  if (!updateUser) {
    return res
      .status(500)
      .json({ message: "Error while updating user details!" });
  }

  return res
  .status(200)
  .json({ message: "User Details Updated Successfully!" });
  
  } catch (error) {
    console.log("Error while updating details", error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
}



module.exports = { userSignupController, userLoginController,  userInformationController, userEditController};
