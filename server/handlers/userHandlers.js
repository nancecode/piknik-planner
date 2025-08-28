import { getDB } from "../db.js";

export const updateUserHandler = async (req, res) => {
  const db = getDB();
  const { email, newEmail, name } = req.body;

  if (!email || (!newEmail && !name)) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  try {
    const result = await db.collection("users").findOneAndUpdate(
      { email },
      {
        $set: {
          ...(newEmail && { email: newEmail }),
          ...(name && { name }),
        },
      },
      { returnDocument: "after" }
    );

    if (!result.value) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({
      message: "User updated successfully.",
      updatedUser: result.value,
    });
  } catch (err) {
    console.error("❌ Error updating user:", err);
    res.status(500).json({ message: "Internal server error." });
  }
};