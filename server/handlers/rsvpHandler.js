import { getDB } from "../db.js";

export async function rsvpHandler(req, res) {
  try {
    const db = getDB();
    const { piknikId, email, status } = req.body;

    if (!piknikId || !email || !status) {
      return res.status(400).json({ message: "Missing RSVP data." });
    }

    // Ensure unique RSVP per (piknikId + email)
    const filter = { piknikId, email };
    const update = { $set: { status, respondedAt: new Date() } };
    const options = { upsert: true }; // Create if not exists, update otherwise

    await db.collection("rsvps").updateOne(filter, update, options);

    res.status(200).json({ message: "RSVP recorded!" });
  } catch (err) {
    console.error("❌ RSVP error:", err);
    res.status(500).json({ message: "Server error" });
  }
}
