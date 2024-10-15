const User = require("../models/User");

const getCurrentUserProfile = async (req, res) => {
    try {
        const user = await User.findOne({ where: { id: req.user.id } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



const updateCurrentUserProfile = async (req, res) => {
    try {
        const user = await User.findOne({ where: { id: req.user.id } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        await user.update(req.body);
        res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const searchUserById = async (req, res) => {
    try {
        const user = await User.findOne({ where: { id: req.params.id } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const searchUserByUsername = async (req, res) => {
    try {
        const user = await User.findOne({ where: { username: req.params.username } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const blockUser = async (req, res) => {
    try {
        const user = await User.findOne({ where: { id: req.params.id } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        await user.update({ isBlocked: true });
        res.status(200).json({ message: "User blocked successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const unblockUser = async (req, res) => {
    try {
        const user = await User.findOne({ where: { id: req.params.id } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        await user.update({ isBlocked: false });
        res.status(200).json({ message: "User unblocked successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



module.exports = { 
    getCurrentUserProfile,
    searchUserById, 
    searchUserByUsername, 
    blockUser, 
    unblockUser, 
    updateCurrentUserProfile 
};