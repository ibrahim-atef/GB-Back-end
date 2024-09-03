const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Sequelize = require("sequelize");
const sequelize = require("./assets/SQLDB/db");
const initDB = require("./assets/SQLDB/initDB");
require("dotenv").config();
const cors = require("cors");

 
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const TvShowRoutes = require("./routes/shows");
const landingBlockRoutes = require("./routes/landingBlockRoutes");  
const moviesRoutes = require("./routes/movies");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));  

 
app.use("/TvShows", TvShowRoutes);
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/landingBlocks", landingBlockRoutes); 
app.use("/movies", moviesRoutes);

 
app.get('/', (req, res) => {
    res.send('API:  Welcome to the API!   please enter your correct route');
});

 
app.use((req, res, next) => {
    res.status(404).json({ message: "api route not found" });
});
 
mongoose.connect(process.env.MONGO_URI, {
    authSource: "admin"
})
.then(() => {
    console.log("Connected to MongoDB");

    initDB()
    .then(() => {
        app.listen(process.env.DEV_API_PORT, () => {
            console.log(`Server started on port ${process.env.DEV_API_PORT}`);
        });
    })
    .catch((error) => console.log("Error initializing database:", error));
})
.catch((error) => {
    console.log("Error connecting to MongoDB:", error);
});
