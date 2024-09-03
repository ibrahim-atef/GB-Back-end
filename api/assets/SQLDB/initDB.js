const sequelize = require("./db");
const User = require("../../models/User");


const initDB = async () => {
    try {
        await sequelize.authenticate(); // Test the connection to the database
        console.log("Connected to MySQL database.");
        
        // Sync models with the database
        await sequelize.sync({ alter: true }); // Set to `true` to drop tables and recreate them
        console.log("MySQL Database synchronized.");
        
        // Add any other initialization code here
    } catch (error) {
        console.error("Unable to connect to MySQL database:", error);
    }
};

module.exports = initDB;
