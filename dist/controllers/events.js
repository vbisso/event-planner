"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const event_1 = __importDefault(require("../models/event"));
const getAllEvents = async (req, res) => {
    try {
        const events = await event_1.default.find();
        res.status(200).render("events", { events });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to retrieve events", error });
    }
};
const addEvent = async (req, res) => {
    try {
        const { title, description, location, date, time, organizer, category, isPublic, } = req.body;
        const existingEvent = await event_1.default.findOne({ title });
        if (existingEvent) {
            return res.status(400).json({ message: "Event already exists" });
        }
        const newEvent = new event_1.default({
            title,
            description,
            location,
            date,
            time,
            organizer,
            category,
            isPublic,
        });
        await newEvent.save();
        res.status(201).json({ message: "Event created successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to create event", error });
    }
};
const getEventById = async (req, res) => {
    const id = req.params.id;
    try {
        const event = await event_1.default.findById(id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.status(200).json(event);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to retrieve event", error });
    }
};
const updateEvent = async (req, res) => {
    const id = req.params.id;
    const { title, description, location, date, time, organizer, category, isPublic, } = req.body;
    try {
        const updatedEvent = await event_1.default.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        if (!updatedEvent) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.status(200).json({
            message: "Event updated successfully",
        });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to update event", error });
    }
};
const deleteEvent = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedEvent = await event_1.default.findByIdAndDelete(id);
        if (!deletedEvent) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.status(200).json({ message: "Event deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to delete event", error });
    }
};
module.exports = {
    getAllEvents,
    addEvent,
    getEventById,
    updateEvent,
    deleteEvent,
};
