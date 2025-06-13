import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/user";
import { Session } from "express-session";

interface CustomRequest extends Request {
  session: Session & {
    user?: { id: string; displayName: string; email: string };
  };
}

const login = async (req: CustomRequest, res: Response) => {
  try {
    const { email, password } = req.body;
    // console.log("🔑 User logging in:", email);

    const user = await User.findOne({ email }).select("+password");
    console.log(" 🔑 User found:", user);

    if (!user) {
      console.log("❌ User not found:", email);
      return res
        .status(401)
        .render("login", { message: "Invalid credentials" });
    }

    // Compare passwords
    const passwordMatches = await bcrypt.compare(password, user.password);
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
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed", error: err });
  }
};

export { login };
