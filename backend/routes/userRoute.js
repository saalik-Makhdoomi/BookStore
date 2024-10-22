const express = require("express");
const router = express.Router();
const {userSignupController} = require('../controllers/userController');


// Sign-Up route
router.post("/signup", userSignupController);


module.exports = router;