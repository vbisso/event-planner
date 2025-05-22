"use strict";
var express = require("express");
const { connect } = require("./config/connection");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());
app.use("/", require("./routes"));
connect().then(() => {
    app.listen(port, () => {
        console.log(`Server running on http://127.0.0.1:${port}`);
    });
});
