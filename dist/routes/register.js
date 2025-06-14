"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registerRoute = require("express").Router();
const { register } = require("../controllers/register");
registerRoute.get("/", (req, res) => {
    res.render("register");
});
registerRoute.post("/", register);
module.exports = registerRoute;
