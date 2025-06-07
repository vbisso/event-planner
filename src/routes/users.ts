const usersRoute = require("express").Router();
const {
  getAllUsers,
  addUser,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/users");
import { validate } from "../middleware/validate";

const userValidationRules = {
  displayName: "string",
  email: "required|email",
  password: "required|string|min:6",
  role: "in:user,admin",
};

const customUserMessages = {
  "required.username": "Username is required.",
  "string.username": "Username must be a string.",
  "min.username": "Username must be at least 3 characters.",
  "required.email": "Email is required.",
  "email.email": "Email must be a valid email address.",
  "required.password": "Password is required.",
  "string.password": "Password must be a string.",
  "min.password": "Password must be at least 6 characters.",
  "required.firstName": "First name is required.",
  "string.firstName": "First name must be a string.",
  "required.lastName": "Last name is required.",
  "string.lastName": "Last name must be a string.",
  "date.createdAt": "createdAt must be a valid date format.",
  "in.role": "Role must be 'user' or 'admin'.",
};

usersRoute.get("/", (req: Request, res: Response) => getAllUsers(req, res)); // Render users page
usersRoute.post(
  "/",
  validate(userValidationRules, customUserMessages),
  addUser
);
usersRoute.get("/:id", getUserById);
usersRoute.put(
  "/:id",
  validate(userValidationRules, customUserMessages),
  updateUser
);
usersRoute.delete("/:id", deleteUser);

module.exports = usersRoute;
