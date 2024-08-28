/**
 * @author : Ameer Heiba
 * @description : This file contains the authications controllers
 * @date : 28/08/2024
 * 
 * @param {Object} User - The User model.
 * @param {Object} bcrypt - The bcrypt module.
 * @param {Object} jwt - The jwt module.
 * @param {Function} register - Controller function to handle user registration.
 * @param {Function} login - Controller function to handle user login using JWT.
 * 
 */






const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    const { fullName, email, password } = req.body;

    // Basic validation
    if (!fullName || !email || !password) {
        return res.status(400).json({ message: "All fields are required." });
    }

    // Check if the email is already registered
    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: "Email is already registered." });
        }
    } catch (err) {
        return res.status(500).json({ message: "Error checking existing user.", error: err });
    }

    // Generate a unique username
    const username = email.split("@")[0] + Math.floor(Math.random() * 100);

    try {
        // Hash the password with a configurable salt rounds
        const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create the new user object
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            fullName,
        });

        // Respond with the newly created user
        res.status(201).json(newUser);
    } catch (err) {
        // Handle different error types separately if needed
        res.status(500).json({ message: "Error registering user.", error: err });
    }
};


const signIn = async (req, res) => {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    try {
        // Check if the user exists
        const user = await User.findOne({ where: { email } }); // Adjust for Mongoose if needed
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        // Verify the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        // Generate a JWT
        const payload = { id: user.id, email: user.email }; // The payload contains the user ID and email
        const secretKey = process.env.JWT_SECRET || "jwt_secret_key"; // Using an environment variable for the secret upon production
        const token = jwt.sign(payload, secretKey, { expiresIn: '1h' }); // Token expires in 1 hour

        // Respond with the token and user information
        res.status(200).json({
            message: "Sign-in successful.",
            token,
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                fullName: user.fullName,
            },
        });
    } catch (err) {
        res.status(500).json({ message: "Error signing in.", error: err });
    }
};

module.exports = { register, signIn };