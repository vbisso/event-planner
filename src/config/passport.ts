import passport from "passport";
import { Profile } from "passport";
import { IUser } from "../middleware/users";
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { Request } = require("express");
const dotenv = require("dotenv");
const User = require("../middleware/users");

dotenv.config();

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

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: (error: any, user?: Express.User | false | null) => void
    ) => {
      try {
        const existingUser = await User.findOne({ googleId: profile.id });
        if (existingUser) return done(null, existingUser);

        const newUser = await User.create({
          googleId: profile.id,
          displayName: profile.displayName,
          email: profile.emails?.[0].value,
        });

        return done(null, newUser);
      } catch (error) {
        return done(error);
      }
    }
  )
);
