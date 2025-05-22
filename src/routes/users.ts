const usersRoute = require("express").Router();
const { getAllUsers, addUser } = require("../controllers/users");

usersRoute.get("/", getAllUsers);
usersRoute.post("/", addUser);

module.exports = usersRoute;
