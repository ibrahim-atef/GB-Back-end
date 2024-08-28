const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();


// const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const TvShowRoutes = require("./routes/shows");

const app = express();
app.use(bodyParser.json());


// app.use("/user", userRoutes);
app.use("/auth", authRoutes);
app.use("/TvShows", TvShowRoutes);



mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    authSource: "admin"
    
}).then(() => {
    app.listen(process.env.DEV_API_PORT, () => {
        console.log(`Server is running on port ${process.env.DEV_API_PORT}`);
    });
})
.catch((error) => {
    console.log(error);
})