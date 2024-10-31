const express = require("express");
const router = express.Router();
const { authenticateUserToken } = require ("../Authentication/userAuth");
const {addBookController, updateBookController, deleteBookController, getAllBooksController, getRecentBooksController, getBookByIDController} = require("../controllers/bookController");



// Book Routes:
router.post("/addBook", authenticateUserToken, addBookController);
router.put("/updateBook", authenticateUserToken, updateBookController);
router.delete("/deleteBook", authenticateUserToken, deleteBookController);
router.get("/getAllBooks", getAllBooksController);
router.get("/getRecentBooks", getRecentBooksController);
router.get("/getBookbyID/:bookid", getBookByIDController);



module.exports = router;