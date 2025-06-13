import { Request, Response } from "express";
import { login } from "../controllers/login";
const routes = require("express").Router();
const usersRouter = require("./users");
const eventsRouter = require("./events");
const swaggerRouter = require("./swagger");
const authRouter = require("./auth");
const registerRouter = require("./register");
const loginRouter = require("./login");
import { Session } from "express-session";

interface CustomRequest extends Request {
  session: Session & {
    user?: { id: string; displayName: string; email: string };
  };
}

routes.use((req: CustomRequest, res: Response, next: Function) => {
  res.locals.user = req.session.user || req.user || null;
  next();
});

routes.use("/auth", authRouter);
routes.get("/", (req: CustomRequest, res: Response) => {
  // console.log(" 🔑 User logged in:", res.locals.user);
  res.render("index");
});
routes.use("/register", registerRouter);
routes.use("/login", loginRouter);

routes.use("/users", usersRouter);

routes.use("/events", eventsRouter);

routes.use("/api-docs", swaggerRouter);

module.exports = routes;
