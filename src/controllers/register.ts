import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/user";
import mongoose from "mongoose";
import { Session } from "express-session";

interface CustomRequest extends Request {
  session: Session & {
    user?: { id: string; displayName: string; email: string };
  };
}
const register = async (req: CustomRequest, res: Response) => {
  try {
    const { displayName, email, password } = req.body;

    // Check if user exists already
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .render("register", { message: "Email already in use" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      displayName,
      email,
      password: hashedPassword,
      role: "user",
    });
    await newUser.save();

    // Optionally log in user immediately after register:
    req.session.user = {
      id: newUser._id.toString(),
      displayName: newUser.displayName,
      email: newUser.email,
    };

    res.status(201).redirect("/"); // or render some success page
  } catch (error) {
    console.error(error);
    res.status(500).render("register", { message: "Registration failed" });
  }
};

export { register };
