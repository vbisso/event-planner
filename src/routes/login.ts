const loginRoute = require("express").Router();
import { Request, Response } from "express";
const { login } = require("../controllers/login");

loginRoute.get("/", (req: Request, res: Response) => {
  res.render("login");
});
loginRoute.post("/", login);

module.exports = loginRoute;
