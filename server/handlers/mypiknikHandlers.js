import { getDB } from "../db.js";
import { ObjectId } from "mongodb";
import { sendInvitationEmail } from "../utils/sendInvitationEmail.js";

// --- Create Piknik ---
  export async function createPiknikHandler(req, res) {
  try {
    const db = getDB();
    const picnicData = req.body;

    if (!picnicData.title || !picnicData.date || !picnicData.park) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // Insert picnic into DB
    const result = await db.collection("mypikniks").insertOne(picnicData);
    const insertedId = result.insertedId;

    // Build full picnic object
    const fullPicnic = { ...picnicData, _id: insertedId };

    // Handle invitations
    if (Array.isArray(picnicData.invitedEmails)) {
      for (const email of picnicData.invitedEmails) {
        try {
          // 1. Send email
          await sendInvitationEmail(email, fullPicnic);

          // 2. Add to inbox
          await db.collection("inbox").insertOne({
            email,
            piknikId: insertedId.toString(),
            type: "Invitation",
            message: `You're invited to ${picnicData.title} at ${picnicData.park.name} on ${picnicData.date}.`,
            seen: false,
            createdAt: new Date()
          });
        } catch (err) {
          console.error(`❌ Failed for ${email}:`, err);
        }
      }
    }

    res.status(201).json({ message: "Picnic created", id: insertedId });
  } catch (err) {
    console.error("❌ Error creating picnic:", err);
    res.status(500).json({ message: "Server error" });
  }
}
// --- Get Pikniks for a User ---
export async function getMyPikniksHandler(req, res) {
  try {
    const db = getDB();
    const userEmail = req.query.userEmail;

    if (!userEmail) {
      return res.status(400).json({ message: "Missing user email" });
    }

    const pikniks = await db
      .collection("mypikniks")
      .find({ createdBy: userEmail })
      .toArray();

    res.status(200).json(pikniks);
  } catch (err) {
    console.error("❌ Error fetching pikniks:", err);
    res.status(500).json({ message: "Server error" });
  }
}

// --- Get Single Piknik ---
export async function getSinglePiknikHandler(req, res) {
  try {
    const db = getDB();
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const picnic = await db.collection("mypikniks").findOne({ _id: new ObjectId(id) });

    if (!picnic) {
      return res.status(404).json({ message: "Picnic not found" });
    }

    res.json(picnic);
  } catch (err) {
    console.error("❌ Error fetching picnic:", err);
    res.status(500).json({ message: "Server error" });
  }
}
// --- Update Piknik ---
export async function updatePiknikHandler(req, res) {
  try {
    const db = getDB();
    const { id } = req.params;
    const updatedData = req.body;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Piknik ID" });
    }

    const result = await db.collection("mypikniks").updateOne(
      {
        _id: new ObjectId(id),
        createdBy: updatedData.createdBy, // ✅ only update if user is creator
      },
      { $set: updatedData }
    );

    if (result.matchedCount === 0) {
      return res.status(403).json({ message: "Unauthorized or Piknik not found" });
    }

    res.json({ message: "Picnic updated" });
  } catch (err) {
    console.error("❌ Error updating picnic:", err);
    res.status(500).json({ message: "Server error" });
  }
}

// --- Delete Piknik ---
export async function deletePiknikHandler(req, res) {
  try {
    const db = getDB();
    const { id } = req.params;

    const result = await db.collection("mypikniks").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Picnic not found" });
    }

    res.json({ message: "Picnic deleted" });
  } catch (err) {
    console.error("❌ Error deleting picnic:", err);
    res.status(500).json({ message: "Server error" });
  }
}

// --- Join Event ---
export async function joinEventHandler(req, res) {
  try {
    const db = getDB();
    const { userEmail, eventId, status } = req.body;

    if (!userEmail || !eventId || !status) {
      return res.status(400).json({ message: "Missing userEmail, eventId, or status." });
    }

    const existing = await db.collection("mypikniks").findOne({ userEmail, eventId });
    if (existing) {
      return res.status(200).json({ message: "Already joined." });
    }

    // Fetch the event
    const event = await db.collection("events").findOne({ _id: new ObjectId(eventId) });
    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }

    const joinedPiknik = {
      userEmail,
      eventId,
      status,
      title: event.title,
      date: event.date,
      emoji: "🎉", 
      park: { name: event.park },
      joinedAt: new Date(),
    };

    const result = await db.collection("mypikniks").insertOne(joinedPiknik);
    res.status(201).json({ message: "Joined successfully", id: result.insertedId });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(200).json({ message: "Already joined." });
    }

    console.error("❌ Error joining event:", err);
    res.status(500).json({ message: "Server error" });
  }
}

// --- Get All Pikniks ---
export async function getAllPikniksHandler(req, res) {
  try {
    const db = getDB();
    const pikniks = await db.collection("mypikniks").find({}).toArray();
    res.status(200).json(pikniks);
  } catch (err) {
    console.error("❌ Error fetching all pikniks:", err);
    res.status(500).json({ message: "Server error" });
  }
}
