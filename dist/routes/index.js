"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routes = require("express").Router();
const usersRouter = require("./users");
const swaggerRouter = require("./swagger");
routes.get("/", (req, res) => {
    res.send("Welcome to Event Planner API");
});
routes.use("/users", usersRouter);
// routes.use("/api-docs", swaggerRouter);
module.exports = routes;
