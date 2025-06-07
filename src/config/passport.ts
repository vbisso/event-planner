import passport from "passport";
import { Profile } from "passport";
import User, { IUser } from "../models/user";
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const dotenv = require("dotenv");

dotenv.config();
// console.log("✅ passport.ts loaded");

passport.serializeUser((user: Express.User, done: any) => {
  done(null, (user as IUser)._id);
});

passport.deserializeUser(async (id: string, done: any) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
console.log("🔍 CLIENT ID:", process.env.GOOGLE_CLIENT_ID);
console.log("🔍 CLIENT SECRET:", process.env.GOOGLE_CLIENT_SECRET);
console.log("🔍 CALLBACK URL:", process.env.GOOGLE_CALLBACK_URL);
console.log("💡 GoogleStrategy:", GoogleStrategy);
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      callbackURL:
        process.env.GOOGLE_CALLBACK_URL ||
        "http://localhost:3000/auth/google/callback",
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: (error: any, user?: Express.User | false | null) => void
    ) => {
      console.log("🔐 Google callback triggered for profile:", profile.id);
      try {
        const existingUser = await User.findOne({ googleId: profile.id });
        if (existingUser) {
          console.log("✅ Existing user found:", existingUser.displayName);
          return done(null, existingUser);
        }

        const newUser = await User.create({
          googleId: profile.id,
          displayName: profile.displayName,
          email: profile.emails?.[0].value,
        });
        console.log("🆕 New user created:", newUser.displayName);
        return done(null, newUser);
      } catch (error) {
        console.error("❌ Error in Google strategy:", error);
        return done(error);
      }
    }
  )
);
