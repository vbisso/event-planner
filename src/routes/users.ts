const usersRoute = require("express").Router();
const { getAllUsers, addUser } = require("../controllers/users");

usersRoute.get("/", getAllUsers);
usersRoute.get("/:id", getAllUsers); //for api-docs purpose, will be updated later
usersRoute.post("/", addUser);
usersRoute.put("/", getAllUsers); //for api-docs purpose, will be updated later
usersRoute.delete("/", getAllUsers); //for api-docs purpose, will be updated later

module.exports = usersRoute;
