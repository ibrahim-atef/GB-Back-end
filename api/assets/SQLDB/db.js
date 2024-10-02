/**
 * @author : Ameer Heiba
 * @description : This file uses Sequelize ORM to establish a connection with MySQL
 * @date : 27/09/2022
 * 
 * @param {Object} Sequelize - The Sequelize module used to create the connection.
 * @param {Object} sqlDB - The Sequelize connection used to create the connection.
 * @example sqlDB.authenticate()
 * 
 * 
 */

require("dotenv").config();
const Sequelize = require("sequelize");

// Load environment variables (make sure to configure these in your environment)
const DB_NAME = process.env.SQLDB_NAME || "test";
const DB_USER = process.env.SQLDB_USER || "root";
const DB_PASSWORD = process.env.SQLDB_PASSWORD || "123456";
const DB_HOST = process.env.SQLDB_HOST || "localhost";
const DB_DIALECT = process.env.DB_DIALECT || "mysql";

// Function to create a database if it does not exist
const createDatabaseIfNotExists = async (sequelize) => {
    const dbName = DB_NAME;

    // Connect to MySQL without specifying a database
    const tempSequelize = new Sequelize('mysql', DB_USER, DB_PASSWORD, {
        host: DB_HOST,
        dialect: 'mysql',
        logging: false,
    });

    try {
        // Check if the database exists
        const [results] = await tempSequelize.query(`SHOW DATABASES LIKE '${dbName}'`);
        
        if (results.length === 0) {
            // Create the database if it does not exist
            await tempSequelize.query(`CREATE DATABASE ${dbName}`);
            console.log(`Database '${dbName}' created.`);
        } else {
            console.log(`Database '${dbName}' already exists.`);
        }
    } catch (error) {
        console.error("Error checking/creating database:", error);
    } finally {
        await tempSequelize.close();
    }
};

// Create an instance to check and create the database
const tempSequelize = new Sequelize('mysql', DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql',
    logging: false,
});

const sqlDB = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: DB_DIALECT,
    pool: {
        max: 5, // Max number of concurrent connections
        min: 1,
        acquire: 60000, // Maximum time, in milliseconds, that a connection can be idle before being released
        idle: 5000, // Maximum time, in milliseconds, that a connection can be idle before being evicted
    },
    logging: false,
    retry: {
        max: 3  // Retry failed queries up to 3 times
    }
});



module.exports = {sqlDB, createDatabaseIfNotExists, tempSequelize};