const eventsRoute = require("express").Router();
const {
  getAllEvents,
  addEvent,
  getEventById,
  updateEvent,
  deleteEvent,
} = require("../controllers/events");
import { validate } from "../middleware/validate";

const eventValidationRules = {
  title: "required|string|min:3",
  description: "required|string|min:10",
  location: "required|string",
  date: "required|string",
  time: "required|string",
  organizer: "required|string",
  category: "required|string",
  isPublic: "required|boolean",
};
const customEventMessages = {
  "required.title": "Event title is required.",
  "string.title": "Event title must be a string.",
  "min.title": "Event title must be at least 3 characters.",

  "required.description": "Description is required.",
  "string.description": "Description must be a string.",
  "min.description": "Description must be at least 10 characters.",

  "required.location": "Location is required.",
  "string.location": "Location must be a valid string.",

  "required.date": "Date is required.",
  "date.date": "Date must be a valid date format.",

  "required.time": "Time is required.",
  "string.time": "Time must be a string (e.g., '2:00 PM').",

  "required.organizer": "Organizer is required.",
  "string.organizer": "Organizer must be a valid string.",

  "required.category": "Category is required.",
  "string.category": "Category must be a string.",

  "required.isPublic": "isPublic is required.",
  "boolean.isPublic": "isPublic must be true or false.",
};

eventsRoute.get("/", getAllEvents);
eventsRoute.get("/:id", getEventById);
eventsRoute.post(
  "/",
  validate(eventValidationRules, customEventMessages),
  addEvent
);
eventsRoute.put(
  "/:id",
  validate(eventValidationRules, customEventMessages),
  updateEvent
);
eventsRoute.delete("/:id", deleteEvent);

module.exports = eventsRoute;
