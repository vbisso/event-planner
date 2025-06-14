import { Request, Response } from "express";
import User from "../models/user";
import { Session } from "express-session";
import bcrypt from "bcryptjs";

interface CustomRequest extends Request {
  session: Session & {
    user?: { id: string; displayName: string; email: string };
  };
}

export const getAllUsers = async (req: CustomRequest, res: Response) => {
  try {
    const user = res.locals.user || null;
    const users = await User.find();
    res.status(200).render("users", { users, user });
  } catch (err) {
    console.error("Error retrieving users:", err);
    res.status(500).render("error", {
      message: "Failed to load users",
    });
  }
};

const addUser = async (req: Request, res: Response) => {
  try {
    const { displayName, email, password } = req.body;
    // Check if user already exists by email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      displayName,
      email,
      password: hashedPassword,
      role: "user",
    });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to create user", error });
  }
};

const getUserById = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve user", error });
  }
};

const updateUser = async (req: Request, res: Response) => {
  const { displayName, email, password } = req.body;
  const id = req.params.id;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Failed to update user", error });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
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
