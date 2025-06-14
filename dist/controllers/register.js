"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = __importDefault(require("../models/user"));
const register = async (req, res) => {
    try {
        const { displayName, email, password } = req.body;
        // Check if user exists already
        const existingUser = await user_1.default.findOne({ email });
        if (existingUser) {
            return res
                .status(400)
                .render("register", { message: "Email already in use" });
        }
        // Hash password
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        // Create new user
        const newUser = new user_1.default({
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
    }
    catch (error) {
        console.error(error);
        res.status(500).render("register", { message: "Registration failed" });
    }
};
exports.register = register;
