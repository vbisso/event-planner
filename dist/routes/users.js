"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const usersRoute = require("express").Router();
const { getAllUsers, addUser, getUserById, updateUser, deleteUser, } = require("../controllers/users");
const validate_1 = require("../middleware/validate");
const userValidationRules = {
    username: "required|string|min:3",
    email: "required|email",
    password: "required|string|min:6",
    firstName: "required|string",
    lastName: "required|string",
    createdAt: "date",
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
usersRoute.get("/", getAllUsers);
usersRoute.post("/", (0, validate_1.validate)(userValidationRules, customUserMessages), addUser);
usersRoute.get("/:id", getUserById);
usersRoute.put("/:id", (0, validate_1.validate)(userValidationRules, customUserMessages), updateUser);
usersRoute.delete("/:id", deleteUser);
module.exports = usersRoute;
