"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routes = require("express").Router();
const usersRouter = require("./users");
const eventsRouter = require("./events");
const swaggerRouter = require("./swagger");
const authRouter = require("./auth");
routes.use("/auth", authRouter);
routes.get("/", (req, res) => {
    res.render("index", { user: req.user });
});
routes.use("/users", usersRouter);
routes.use("/events", eventsRouter);
routes.use("/api-docs", swaggerRouter);
module.exports = routes;
