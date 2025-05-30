import { Request, Response } from "express";
const { getDb } = require("../config/connection");
const { ObjectId } = require("mongodb");

const getAllUsers = async (req: Request, res: Response) => {
  const db = getDb();
  const users = await db.collection("users").find({}).toArray();
  res.json(users);
};
const addUser = async (req: Request, res: Response) => {
  const db = getDb();
  const { username, email, password, firstName, lastName, createdAt, role } =
    req.body;
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
const getUserById = async (req: Request, res: Response) => {
  const db = getDb();
  const id = new ObjectId(req.params.id);
  const user = await db.collection("users").findOne({ _id: id });
  res.json(user);
};
const updateUser = async (req: Request, res: Response) => {
  const db = getDb();
  const id = new ObjectId(req.params.id);
  const { username, email, password, firstName, lastName, createdAt, role } =
    req.body;
  await db.collection("users").updateOne(
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

  res.sendStatus(204).json({ message: "User updated successfully" });
};
const deleteUser = async (req: Request, res: Response) => {
  const db = getDb();
  const id = new ObjectId(req.params.id);
  await db.collection("users").deleteOne({ _id: id });
  res.sendStatus(204).json({ message: "User deleted successfully" });
};
module.exports = {
  getAllUsers,
  addUser,
  getUserById,
  updateUser,
  deleteUser,
};
