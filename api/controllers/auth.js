/**
 * @author : Ameer Heiba
 * @description : This file contains the authications controllers
 * @date : 27/09/2022
 * 
 * @param {Object} User - The User model.
 * @param {Object} bcrypt - The bcrypt module.
 * @param {Object} jwt - The jwt module.
 * @param {Function} register - Controller function to handle user registration.
 * @param {Function} login - Controller function to handle user login.
 * 
 */






const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    const { fullName, email, password } = req.body;
    const username = email.split("@")[0] + Math.floor(Math.random() * 100);
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            fullName
        });
        const user = await newUser.save();
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            const validity = await bcrypt.compare(password, user.password);
            if (validity) {
                const { password, ...others } = user._doc;
                res.status(200).json(others);
            } else {
                res.status(400).json("Wrong Password");
            }
        } else {
            res.status(404).json("User Not Found");
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = { register, login };