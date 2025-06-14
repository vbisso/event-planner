"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
const path = require("path");
const { connect } = require("./config/connection");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
require("./config/passport");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day
}));
app.use(passport.initialize());
app.use(passport.session());
// Set the view engine to EJS
app.set("view engine", "ejs");
// Set the views directory and public directory
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use("/", require("./routes"));
connect().then(() => {
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
});
