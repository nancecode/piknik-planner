// ==== server/db.js ====
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("❌ MONGO_URI is missing in .env");
}

const client = new MongoClient(MONGO_URI);
let db;

async function connectToDB() {
  try {
    await client.connect();
    db = client.db("piknik");
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    throw err;
  }
}

function getDB() {
  if (!db) throw new Error("❌ DB not initialized. Did you forget connectToDB()?");
  return db;
}

export { connectToDB, getDB };