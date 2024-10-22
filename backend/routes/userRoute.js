const express = require("express");
const router = express.Router();
const { authenticateUserToken } = require("../Authentication/userAuth");
const {userSignupController, userLoginController,  userInformation} = require('../controllers/userController');



// User Routes:
router.post("/signup", userSignupController);
router.post("/login", userLoginController);
router.get("/get-user-information", authenticateUserToken, userInformation);




module.exports = router;