const usersRoute = require("express").Router();
const {
  getAllUsers,
  addUser,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/users");

usersRoute.get("/", getAllUsers);
usersRoute.post("/", addUser);
usersRoute.get("/:id", getUserById);
usersRoute.put("/:id", updateUser);
usersRoute.delete("/:id", deleteUser);

module.exports = usersRoute;
