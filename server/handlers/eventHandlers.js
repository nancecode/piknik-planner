import { getDB } from "../db.js";
import { ObjectId } from "mongodb";

// GET /api/events
export async function getEventsHandler(req, res) {
  try {
    const db = getDB();
    const events = await db.collection("events").find().toArray();
    res.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Failed to fetch events" });
  }
}

// GET /api/events/:id
export async function getEventByIdHandler(req, res) {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid event ID" });
  }

  try {
    const db = getDB();
    const event = await db.collection("events").findOne({ _id: new ObjectId(id) });

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event);
  } catch (error) {
    console.error("Error fetching event by ID:", error);
    res.status(500).json({ message: "Failed to fetch event" });
  }
}
