const registerRoute = require("express").Router();
import { Request, Response } from "express";
const { register } = require("../controllers/register");

registerRoute.get("/", (req: Request, res: Response) => {
  res.render("register");
});
registerRoute.post("/", register);

module.exports = registerRoute;
