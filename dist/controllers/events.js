"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { getDb } = require("../config/connection");
const { ObjectId } = require("mongodb");
const getAllEvents = async (req, res) => {
    try {
        const db = getDb();
        const events = await db.collection("events").find({}).toArray();
        if (!events || events.length === 0) {
            return res.status(404).json({ message: "No events found" });
        }
        res.json(events);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to retrieve events", error });
    }
};
const addEvent = async (req, res) => {
    try {
        const db = getDb();
        const { title, description, location, date, time, organizer, category, isPublic, } = req.body;
        const result = await db.collection("events").insertOne({
            title,
            description,
            location,
            date,
            time,
            organizer,
            category,
            isPublic,
        });
        res.status(201).json({
            message: "Event created successfully",
            id: result.insertedId,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to create event", error });
    }
};
const getEventById = async (req, res) => {
    try {
        const db = getDb();
        const id = new ObjectId(req.params.id);
        const event = await db.collection("events").findOne({ _id: id });
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.json(event);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to retrieve event", error });
    }
};
const updateEvent = async (req, res) => {
    try {
        const db = getDb();
        const id = new ObjectId(req.params.id);
        const { title, description, location, date, time, organizer, category, isPublic, } = req.body;
        const result = await db.collection("events").updateOne({ _id: id }, {
            $set: {
                title,
                description,
                location,
                date,
                time,
                organizer,
                category,
                isPublic,
            },
        });
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.status(200).json({ message: "Event updated successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to update event", error });
    }
};
const deleteEvent = async (req, res) => {
    try {
        const db = getDb();
        const id = new ObjectId(req.params.id);
        const result = await db.collection("events").deleteOne({ _id: id });
        if (result.deletedCount === 0) {
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
