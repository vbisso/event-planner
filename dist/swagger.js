"use strict";
const swaggerAutogen = require("swagger-autogen")();
const doc = {
    info: {
        title: "My Event Planner API",
        description: "Event Planner project",
    },
    host: "event-planner-hb82.onrender.com",
    schemes: ["https"],
};
const outputFile = "./swagger.json";
const routes = ["./routes/index.ts"];
/* NOTE: If you are using the express Router, you must pass in the 'routes' only the
root file where the route starts, such as index.js, app.js, routes.js, etc ... */
swaggerAutogen(outputFile, routes, doc);
