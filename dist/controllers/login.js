"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = __importDefault(require("../models/user"));
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // console.log("🔑 User logging in:", email);
        const user = await user_1.default.findOne({ email }).select("+password");
        console.log(" 🔑 User found:", user);
        if (!user) {
            console.log("❌ User not found:", email);
            return res
                .status(401)
                .render("login", { message: "Invalid credentials" });
        }
        // Compare passwords
        const passwordMatches = await bcryptjs_1.default.compare(password, user.password);
        if (!passwordMatches) {
            console.log("❌ Password does not match:", email);
            return res
                .status(401)
                .render("login", { message: "Invalid credentials" });
        }
        // Save user info in session
        req.session.user = {
            id: user._id.toString(),
            displayName: user.displayName,
            email: user.email,
        };
        res.locals.user = req.session.user;
        console.log(req.session.user);
        console.log("✅ User logged in:", user.displayName);
        // Redirect or render the home page with user info
        res.status(200).render("index");
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Login failed", error: err });
    }
};
exports.login = login;
