const express = require("express");
const router = express.Router();
const {userSignupController, userLoginController} = require('../controllers/userController');


// User Routes:
router.post("/signup", userSignupController);
router.post("/login", userLoginController);

module.exports = router;