"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = connect;
exports.getDb = getDb;
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
let db;
async function connect() {
    try {
        await client.connect();
        db = client.db("eventPlannerDb");
        console.log("Connected to MongoDB!");
    }
    catch (err) {
        console.error("MongoDB connection error:", err);
        throw err;
    }
}
function getDb() {
    if (!db) {
        throw new Error("Database not connected");
    }
    return db;
}
