"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routes = require("express").Router();
const usersRouter = require("./users");
const eventsRouter = require("./events");
const swaggerRouter = require("./swagger");
routes.get("/", (req, res) => {
    res.send("Welcome to Event Planner API");
});
routes.use("/users", usersRouter);
routes.use("/events", eventsRouter);
routes.use("/api-docs", swaggerRouter);
module.exports = routes;
