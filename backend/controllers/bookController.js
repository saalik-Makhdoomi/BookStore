const user = require("../models/user");
const books = require("../models/book");
const jwt = require("jsonwebtoken");
const { config } = require("dotenv");
config({ path: "./.env" });

// Add Book Controller:
const addBookController = async (req, res) => {
  try {
    const adminId = req.user._id;
    const checkAdmin = await user.findById(adminId);

    if (checkAdmin.role !== "admin") {
      return res.status(400).json({ message: "You are not an Admin" });
    }

    const book = new books({
      url: req.body.url,
      title: req.body.title,
      author: req.body.author,
      price: req.body.price,
      desc: req.body.desc,
      language: req.body.language,
    });
    await book.save();
    res.status(200).json({ message: "Book added Successfully" });
  } catch (error) {
    console.log("Error while updating details", error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

const updateBookController = async (req, res) => {
try {
    const { bookid } = req.headers;
    await books.findByIdAndUpdate(bookid, {
        url: req.body.url,
        title: req.body.title,
        author: req.body.author,
        price: req.body.price,
        desc: req.body.desc,
        language: req.body.language,
      });
      
      return res.status(200).json({ message: "Book Updated Successfully"});

} catch (error) {
    console.log("Error while updating details", error);
    return res.status(500).json({ message: "Error while updating!" });
}
};

const deleteBookController = async (req, res) => {
try {
    



    
} catch (error) {
    console.log("Error while deleting", error);
    return res.status(500).json({ message: "Error while deleting!" });
}
};

module.exports = { addBookController, updateBookController, deleteBookController};
