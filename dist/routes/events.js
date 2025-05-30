"use strict";
const eventsRoute = require("express").Router();
const { getAllEvents, addEvent, getEventById, updateEvent, deleteEvent, } = require("../controllers/events");
eventsRoute.get("/", getAllEvents);
eventsRoute.post("/", addEvent);
eventsRoute.get("/:id", getEventById);
eventsRoute.put("/:id", updateEvent);
eventsRoute.delete("/:id", deleteEvent);
module.exports = eventsRoute;
