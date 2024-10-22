const mongoose = require("mongoose");

const conn = async () => {
  try {
    await mongoose.connect(`${process.env.URI}`);
    console.log("Connected to Db");
    
  } catch (error) {
    console.log("error while connecting to the db", error);
  }
};
conn();   //database connection call
