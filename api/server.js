const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Sequelize = require("sequelize");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const compression = require("compression");
const dotenv = require("dotenv");
dotenv.config();

const sequelize = require("./assets/SQLDB/db");
const initDB = require("./assets/SQLDB/initDB");

// Routes
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const showsRoutes = require("./routes/shows");
const ratingRoutes = require("./routes/rateContent"); 
const moviesRoutes = require("./routes/movies");
const userRoutes = require("./routes/user");
const seriesRoutes = require("./routes/series");
const glopalSearchRoutes = require("./routes/search");

const app = express();

// Security middleware
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(compression({
    threshold: 2048 // Compress responses only if they are at least 2KB
}));

// Rate Limiting
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});
app.use("/auth", apiLimiter);

// CORS setup
const corsOptions = {
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
};
app.use(cors(corsOptions));

// Body-parser applied only to non-GET requests
app.use((req, res, next) => {
    if (req.method !== 'GET') {
        bodyParser.json()(req, res, next);
    } else {
        next();
    }
});

// Routes
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);
app.use("/movies", moviesRoutes);
app.use("/series", seriesRoutes);
app.use("/shows", showsRoutes);
app.use("/rating", ratingRoutes);
app.use("/search", glopalSearchRoutes);

// Mongoose connection
mongoose.connect(process.env.MONGO_URI, {
    maxPoolSize: 10, // pool size for concurrent connections
    serverSelectionTimeoutMS: 5000 //time out after 5 seconds
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

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});
