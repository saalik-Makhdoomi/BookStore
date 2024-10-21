const express = require("express");
const app = express();
require("dotenv").config();
require("./conn/db");



// creating port:

app.listen(process.env.PORT, () => {
    console.log(`Server Started at Port ${process.env.PORT}`);
});
