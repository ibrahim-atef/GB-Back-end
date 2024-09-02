


const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Sequelize = require("sequelize");
const cors = require("cors");
const sequelize = require("./assets/SQLDB/db");
const initDB = require("./assets/SQLDB/initDB");
require("dotenv").config();

// const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");
// // CORS options
// const corsOptions = {
//     origin: 'http://example.com', // Allow only this origin
//     methods: 'GET,POST', // Allow only GET and POST requests
//     optionsSuccessStatus: 200 // Some legacy browsers choke on 204
// };

// // Enable CORS with custom options
// app.use(cors(corsOptions));

const app = express();
app.use(cors());
app.use(bodyParser.json());



app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
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