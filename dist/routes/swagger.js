"use strict";
const swaggerRoute = require("express").Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");
// swaggerRoute.use("/api-docs", swaggerUi.serve);
// swaggerRoute.get("/api-docs", swaggerUi.setup(swaggerDocument));
// swaggerRoute.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
swaggerRoute.use(
  "/",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    swaggerOptions: {
      oauth2RedirectUrl:
        "https://event-planner-hb82.onrender.com/api-docs/oauth2-redirect.html",
    },
  })
);
module.exports = swaggerRoute;
