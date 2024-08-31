


const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Sequelize = require("sequelize");
const sequelize = require("./assets/SQLDB/db");
const initDB = require("./assets/SQLDB/initDB");
require("dotenv").config();


// const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");

const TvShowRoutes = require("./routes/shows");


const app = express();
app.use(bodyParser.json());


// app.use("/user", userRoutes);
app.use("/TvShows", TvShowRoutes);
app.use("/auth", authRoutes);

app.use("/admin", adminRoutes);






mongoose.connect(process.env.MONGO_URI, {
 
    authSource: "admin"
    
}).then(() => {
    console.log("Connected to MongoDB");

    initDB()
    .then(() => {
        app.listen(process.env.DEV_API_PORT, () => {
            console.log(`Server started on port ${process.env.DEV_API_PORT}`);
        });
    })
    .catch((error) => console.log(error));
        
})
.catch((error) => {
    console.log("Error connecting to MongoDB",error);
})