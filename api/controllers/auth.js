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
 * @param {Function} sendPasswordResetEmail - Controller function to send password reset email.
 * @param {Function} resetPassword - Controller function to handle password reset.
 * @param {Function} requestPasswordReset - Controller function to handle password reset request.   
 * @param {Function} utils - The utils module.
 * @param {Function} crypto - The crypto module.
 * @param {Function} sgMail - The sendgrid module.
 * @param {Function} Op - The Op module.
 * 
 * 
 */






const User = require("../models/User");
const Role = require("../models/role"); // Import the Role model
const utils = require("../assets/utils/utils");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sgMail = require('@sendgrid/mail');
const crypto = require('crypto');
const { Op } = require('sequelize');
require('dotenv').config();


sgMail.setApiKey(process.env.SENDGRID_API_KEY);


const register = async (req, res) => {
  const { fullName, email, password, role = "user" } = req.body; // role defaults to "user" if not provided

  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: "Email is already registered." });
    }

    const username = email.split("@")[0] + Math.floor(Math.random() * 100);
    const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Find the role in the database
    const userRole = await Role.findOne({ where: { name: role } });
    if (!userRole) {
      return res.status(400).json({ message: "Invalid role." });
    }

    // Create the new user with the role
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      fullName,
      roleId: userRole.id // Assign the role ID
    });

    sgMail.send(utils.createMsg(
      newUser.email, 
      process.env.SENDGRID_SENDER_EMAIL, 
      process.env.SUCCESS_REG_EMAIL_SUB, 
      process.env.SUCCESS_REG_EMAIL_BODY, 
      process.env.SUCCESS_REG_EMAIL_BODY_HTML
    )).then(() => {
      console.log('Email sent');
    }).catch((error) => {
      console.error(error);
    });

    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: "Error registering user.", error: err });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    const user = await User.findOne({ where: { email }, include: [Role] });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.Role.name, isPrime: user.isPrime },
      process.env.JWT_SECRET || "jwt_secret_key",
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: "Sign-in successful.",
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        fullName: user.fullName,
        role: user.Role.name
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Error signing in.", error: err });
  }
};



const requestPasswordReset = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: "Email not found." });
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour

        await user.update({
            resetPasswordToken: resetToken,
            resetPasswordExpires,
        });

        const resetUrl = `${req.protocol}://${req.get('host')}/reset-password/${resetToken}`;

        sgMail.send(utils.createMsg(email, process.env.SENDGRID_SENDER_EMAIL, "Password Reset Request", `Click here to reset your password: ${resetUrl}`, `<p>Click <a href="${resetUrl}">here</a> to reset your password.</p>`));

        res.status(200).json({ message: "Password reset email sent." });
    } catch (err) {
        res.status(500).json({ message: "Error requesting password reset.", error: err });
    }
};

const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
        const user = await User.findOne({
            where: {
                resetPasswordToken: token,
                resetPasswordExpires: { [Op.gt]: Date.now() },
            },
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token." });
        }

        const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        user.password = hashedPassword;
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;

        await user.save();

        res.status(200).json({ message: "Password has been reset." });
    } catch (err) {
        res.status(500).json({ message: "Error resetting password.", error: err });
    }
};



module.exports = { register, signIn, requestPasswordReset,resetPassword };