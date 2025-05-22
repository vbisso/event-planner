import { MongoClient, Db } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri: string = process.env.MONGODB_URI as string;
const client = new MongoClient(uri);

let db: Db | null = null;

async function connect(): Promise<void> {
  try {
    await client.connect();
    db = client.db("eventPlannerDb");
    console.log("Connected to MongoDB!");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
}

function getDb(): Db {
  if (!db) {
    throw new Error("Database not connected");
  }
  return db;
}

export { connect, getDb };
