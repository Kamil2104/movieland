import express from "express";
import { db } from "../connection.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db.get(
      "SELECT * FROM users WHERE email = ? AND password = ?",
      [email, password]
    );

    if (!user)
      return res.status(401).json({ message: "Invalid e-mail or password" });

    res
      .status(200)
      .json({
        message: "Success",
        user: { email: user.email, name: user.name },
      });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.post("/register", async (req, res) => {
  const { email, name, password } = req.body;

  try {
    const existingUser = await db.get("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    await db.run("INSERT INTO users (email, name, password) VALUES (?, ?, ?)", [
      email,
      name,
      password,
    ]);
    await db.run(
      "INSERT INTO settings (email, name, appearance, stayLoggedIn, defaultHomepage, language) VALUES (?, ?, ?, ?, ?, ?)",
      [email, name, "light", "Always", "Home", "English"]
    );

    res.status(200).json({ message: "Success" });
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
