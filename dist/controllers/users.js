"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { getDb } = require("../config/connection");
const { ObjectId } = require("mongodb");
const getAllUsers = async (req, res) => {
    const db = getDb();
    const users = await db.collection("users").find({}).toArray();
    res.json(users);
};
const addUser = async (req, res) => {
    const db = getDb();
    const { username, email, password, firstName, lastName, createdAt, role } = req.body;
    const user = await db.collection("users").insertOne({
        username,
        email,
        password,
        firstName,
        lastName,
        createdAt,
        role,
    });
    res.status(201).json({
        message: "Contact created successfully",
        id: user.insertedId,
    });
};
module.exports = {
    getAllUsers,
    addUser,
};
