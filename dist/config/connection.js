"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = connect;
exports.getDb = getDb;
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const uri = process.env.MONGODB_URI;
const client = new mongodb_1.MongoClient(uri);
let db = null;
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
