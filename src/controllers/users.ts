import { Request, Response } from "express";
const { getDb } = require("../config/connection");
const { ObjectId } = require("mongodb");

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const db = getDb();
    const users = await db.collection("users").find({}).toArray();

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve users", error });
  }
};

const addUser = async (req: Request, res: Response) => {
  try {
    const db = getDb();
    const { username, email, password, firstName, lastName, createdAt, role } =
      req.body;

    const result = await db.collection("users").insertOne({
      username,
      email,
      password,
      firstName,
      lastName,
      createdAt: createdAt || new Date(),
      role: role || "user",
    });

    res.status(201).json({
      message: "User created successfully",
      id: result.insertedId,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create user", error });
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const db = getDb();
    const id = new ObjectId(req.params.id);
    const user = await db.collection("users").findOne({ _id: id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve user", error });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const db = getDb();
    const id = new ObjectId(req.params.id);
    const { username, email, password, firstName, lastName, createdAt, role } =
      req.body;

    const result = await db.collection("users").updateOne(
      { _id: id },
      {
        $set: {
          username,
          email,
          password,
          firstName,
          lastName,
          createdAt,
          role,
        },
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update user", error });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const db = getDb();
    const id = new ObjectId(req.params.id);

    const result = await db.collection("users").deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user", error });
  }
};

module.exports = {
  getAllUsers,
  addUser,
  getUserById,
  updateUser,
  deleteUser,
};
