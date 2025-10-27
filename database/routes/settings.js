import express from "express";
import { db } from "../connection.js";

const router = express.Router();

router.post("/getSettings", async (req, res) => {
  const { email } = req.body;

  try {
    const settings = await db.get(
      "SELECT appearance, stayLoggedIn, defaultHomepage FROM settings WHERE email = ?",
      [email]
    );
    if (!settings)
      return res.status(404).json({ message: "Settings not found" });

    res.status(200).json({ message: "Success", settings });
  } catch (err) {
    console.error("Error fetching settings:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.post("/updateAppearance", async (req, res) => {
  const { email, value } = req.body;
  try {
    await db.run("UPDATE settings SET appearance = ? WHERE email = ?", [
      value,
      email,
    ]);
    res.status(200).json({ message: "Success" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating appearance", error: err.message });
  }
});

router.post("/updateStayLoggedIn", async (req, res) => {
  const { email, value } = req.body;
  try {
    await db.run("UPDATE settings SET stayLoggedIn = ? WHERE email = ?", [
      value,
      email,
    ]);
    res.status(200).json({ message: "Success" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating stayLoggedIn", error: err.message });
  }
});

router.post("/updateDefaultHomepage", async (req, res) => {
  const { email, value } = req.body;
  try {
    await db.run("UPDATE settings SET defaultHomepage = ? WHERE email = ?", [
      value,
      email,
    ]);
    res.status(200).json({ message: "Success" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating defaultHomepage", error: err.message });
  }
});

router.post("/deleteAccount", async (req, res) => {
  const { email } = req.body;
  try {
    await db.run("DELETE FROM settings WHERE email = ?", [email]);
    await db.run("DELETE FROM users WHERE email = ?", [email]);
    res.status(200).json({ message: "Account deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting account", error: err.message });
  }
});

export default router;
