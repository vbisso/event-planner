"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = connect;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const uri = process.env.MONGODB_URI;
async function connect() {
    if (!uri) {
        throw new Error("❌ MONGODB_URI is not defined in the environment variables.");
    }
    try {
        await mongoose_1.default.connect(uri);
        console.log("✅ Mongoose connected to MongoDB!");
    }
    catch (err) {
        console.error("❌ Mongoose connection error:", err);
        throw err;
    }
}
