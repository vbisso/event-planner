import { Request, Response } from "express";
const { getDb } = require("../config/connection");
const { ObjectId } = require("mongodb");

const getAllEvents = async (req: Request, res: Response) => {
  const db = getDb();
  const events = await db.collection("events").find({}).toArray();
  res.json(events);
};

const addEvent = async (req: Request, res: Response) => {
  const db = getDb();
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
  const event = await db.collection("events").insertOne({
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
    id: event.insertedId,
  });
};

const getEventById = async (req: Request, res: Response) => {
  const db = getDb();
  const id = new ObjectId(req.params.id);
  const event = await db.collection("events").findOne({ _id: id });
  res.json(event);
};
const updateEvent = async (req: Request, res: Response) => {
  const db = getDb();
  const id = new ObjectId(req.params.id);
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
  await db.collection("events").updateOne(
    { _id: id },
    {
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
    }
  );

  res.sendStatus(204).json({ message: "Event updated successfully" });
};

const deleteEvent = async (req: Request, res: Response) => {
  const db = getDb();
  const id = new ObjectId(req.params.id);
  await db.collection("events").deleteOne({ _id: id });
  res.sendStatus(204).json({ message: "Event deleted successfully" });
};
module.exports = {
  getAllEvents,
  addEvent,
  getEventById,
  updateEvent,
  deleteEvent,
};
