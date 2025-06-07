import { Request, Response } from "express";

import Event from "../models/event";

const getAllEvents = async (req: Request, res: Response) => {
  try {
    const events = await Event.find();
    res.status(200).render("events", { events });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve events", error });
  }
};

const addEvent = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      location,
      date,
      time,
      organizer,
      category,
      isPublic,
    } = req.body;
    const existingEvent = await Event.findOne({ title });
    if (existingEvent) {
      return res.status(400).json({ message: "Event already exists" });
    }
    const newEvent = new Event({
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
  } catch (error) {
    res.status(500).json({ message: "Failed to create event", error });
  }
};

const getEventById = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve event", error });
  }
};

const updateEvent = async (req: Request, res: Response) => {
  const id = req.params.id;
  const {
    title,
    description,
    location,
    date,
    time,
    organizer,
    category,
    isPublic,
  } = req.body;
  try {
    const updatedEvent = await Event.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({
      message: "Event updated successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update event", error });
  }
};

const deleteEvent = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const deletedEvent = await Event.findByIdAndDelete(id);
    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
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
