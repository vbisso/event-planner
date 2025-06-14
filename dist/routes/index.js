"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routes = require("express").Router();
const usersRouter = require("./users");
const eventsRouter = require("./events");
const swaggerRouter = require("./swagger");
const authRouter = require("./auth");
const registerRouter = require("./register");
const loginRouter = require("./login");
routes.use((req, res, next) => {
    res.locals.user = req.session.user || req.user || null;
    next();
});
routes.use("/auth", authRouter);
routes.get("/", (req, res) => {
    // console.log(" 🔑 User logged in:", res.locals.user);
    res.render("index");
});
routes.use("/register", registerRouter);
routes.use("/login", loginRouter);
routes.use("/users", usersRouter);
routes.use("/events", eventsRouter);
routes.use("/api-docs", swaggerRouter);
module.exports = routes;
