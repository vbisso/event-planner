import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI;

async function connect(): Promise<void> {
  if (!uri) {
    throw new Error(
      "❌ MONGODB_URI is not defined in the environment variables."
    );
  }

  try {
    await mongoose.connect(uri);
    console.log("✅ Mongoose connected to MongoDB!");
  } catch (err) {
    console.error("❌ Mongoose connection error:", err);
    throw err;
  }
}

export { connect };
