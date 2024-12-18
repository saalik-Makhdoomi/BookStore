const express = require("express");
const app = express();     //initialize the app
require("dotenv").config();
require("./conn/db");

// Middelware to Parse JSON:
app.use(express.json());


// User Routes:
const userRoute = require("./routes/userRoute");
app.use("/user", userRoute);

// Book Routes:
const bookRoute = require("./routes/bookRoute");
app.use("/book", bookRoute);




// creating port:
app.listen(process.env.PORT, () => {
    console.log(`Server Started at Port ${process.env.PORT}`);
});
