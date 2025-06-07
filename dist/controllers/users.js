"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = void 0;
const user_1 = __importDefault(require("../models/user"));
const getAllUsers = async (req, res) => {
    try {
        const users = await user_1.default.find();
        res.status(200).render("users", { users });
    }
    catch (err) {
        console.error("Error retrieving users:", err);
        res.status(500).render("error", {
            message: "Failed to load users",
        });
    }
};
exports.getAllUsers = getAllUsers;
const addUser = async (req, res) => {
    try {
        const { displayName, email, password } = req.body;
        // Check if user already exists by email
        const existingUser = await user_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const newUser = new user_1.default({
            displayName,
            email,
            password,
        });
        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to create user", error });
    }
};
const getUserById = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await user_1.default.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to retrieve user", error });
    }
};
const updateUser = async (req, res) => {
    const { displayName, email, password } = req.body;
    const id = req.params.id;
    try {
        const updatedUser = await user_1.default.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(updatedUser);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to update user", error });
    }
};
const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedUser = await user_1.default.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to delete user", error });
    }
};
module.exports = {
    getAllUsers: exports.getAllUsers,
    addUser,
    getUserById,
    updateUser,
    deleteUser,
};
