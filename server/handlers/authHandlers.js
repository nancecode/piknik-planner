import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getDB } from "../db.js";

const JWT_SECRET = process.env.JWT_SECRET || "piknik-secret";
const SALT_ROUNDS = 10;

// ==== SIGNUP ====
export async function signupHandler(req, res) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  try {
    const db = getDB();
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const newUser = {
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    };

    await db.collection("users").insertOne(newUser);

    const token = jwt.sign({ email, name }, JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({ token, email, name });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
}

// ==== LOGIN ====
export async function loginHandler(req, res) {
  const { email, password } = req.body;

  try {
    const db = getDB();
    const user = await db.collection("users").findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const token = jwt.sign({ email: user.email, name: user.name }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ token, email: user.email, name: user.name });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
}

// ==== UPDATE USER ====
export async function updateUserHandler(req, res) {
  const { email, name } = req.body;
  if (!email) return res.status(400).json({ error: "Email required." });
  if (!name) return res.status(400).json({ error: "Name required." });

  const { email: authEmail } = req.user;

  try {
    const db = getDB();
    await db
      .collection("users")
      .updateOne({ email: authEmail }, { $set: { email, name } });
    res.json({ message: "User updated successfully." });
  } catch (err) {
    console.error("Update user error:", err);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

// ==== DELETE USER ====
export async function deleteUserHandler(req, res) {
  try {
    const { email } = req.user;
    const db = getDB();
    const result = await db.collection("users").deleteOne({ email });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "User not found." });
    }

    res.json({ message: "User deleted successfully." });
  } catch (err) {
    console.error("Delete user error:", err);
    res.status(500).json({ error: "Failed to delete user." });
  }
}
