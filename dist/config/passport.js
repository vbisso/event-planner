"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const user_1 = __importDefault(require("../models/user"));
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const dotenv = require("dotenv");
dotenv.config();
// console.log("✅ passport.ts loaded");
passport_1.default.serializeUser((user, done) => {
    done(null, user._id);
});
passport_1.default.deserializeUser(async (id, done) => {
    try {
        const user = await user_1.default.findById(id);
        done(null, user);
    }
    catch (err) {
        done(err);
    }
});
console.log("🔍 CLIENT ID:", process.env.GOOGLE_CLIENT_ID);
console.log("🔍 CLIENT SECRET:", process.env.GOOGLE_CLIENT_SECRET);
console.log("🔍 CALLBACK URL:", process.env.GOOGLE_CALLBACK_URL);
console.log("💡 GoogleStrategy:", GoogleStrategy);
passport_1.default.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    callbackURL: process.env.GOOGLE_CALLBACK_URL ||
        "http://localhost:3000/auth/google/callback",
}, async (accessToken, refreshToken, profile, done) => {
    console.log("🔐 Google callback triggered for profile:", profile.id);
    try {
        const existingUser = await user_1.default.findOne({ googleId: profile.id });
        if (existingUser) {
            console.log("✅ Existing user found:", existingUser.displayName);
            return done(null, existingUser);
        }
        const newUser = await user_1.default.create({
            googleId: profile.id,
            displayName: profile.displayName,
            email: profile.emails?.[0].value,
        });
        console.log("🆕 New user created:", newUser.displayName);
        return done(null, newUser);
    }
    catch (error) {
        console.error("❌ Error in Google strategy:", error);
        return done(error);
    }
}));
