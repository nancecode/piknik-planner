import { getDB } from "../db.js";

export async function getParksHandler(req, res) {
  try {
    const db = getDB();
    const parks = await db.collection("parks").find().toArray();
    res.json(parks);
  } catch (err) {
    console.error("Error fetching parks:", err);
    res.status(500).json({ error: "Failed to fetch parks" });
  }
}
