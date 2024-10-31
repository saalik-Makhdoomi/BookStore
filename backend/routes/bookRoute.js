const express = require("express");
const router = express.Router();
const { authenticateUserToken } = require ("../Authentication/userAuth");
const {addBookController, updateBookController, deleteBookController} = require("../controllers/bookController");



// Book Routes:
router.post("/addBook", authenticateUserToken, addBookController);
router.put("/updateBook", authenticateUserToken, updateBookController);
router.delete("/deleteBook", authenticateUserToken, deleteBookController);



module.exports = router;