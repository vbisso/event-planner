"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const loginRoute = require("express").Router();
const { login } = require("../controllers/login");
loginRoute.get("/", (req, res) => {
    res.render("login");
});
loginRoute.post("/", login);
module.exports = loginRoute;
