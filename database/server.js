import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';

import path from "path";
import { fileURLToPath } from "url";

import { open } from 'sqlite';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// Database connection
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, "movieland.db");

let db;
const initDb = async () => {
  db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });
  console.log('✅ Connected to movieland.db');

  // If tables don't exist, create them
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      email TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      password TEXT NOT NULL
    );
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS settings (
      email TEXT PRIMARY KEY,
      appearance TEXT DEFAULT 'light',
      stayLoggedIn TEXT DEFAULT 'Always',
      defaultHomepage TEXT DEFAULT 'Home',
      FOREIGN KEY (email) REFERENCES users(email)
    );
  `);
};

initDb()

// Login endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db.get(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (!user) { // If user not found
      return res.status(404).json({ message: 'Invalid e-mail or password' });
    }

    if (user.password !== password) { // If password does not match
      return res.status(401).json({ message: 'Invalid e-mail or password' });
    }

    res.status(200).json({ message: 'Success' });

  } catch (err) {
    console.error('Error logging in:', err);
    res.status(500).json({ message: null, error: 'Server error' });
  }
});

// Register endpoint
app.post('/register', async (req, res) => {
  const { email, name, password } = req.body;

  try {
    const existingUser = await db.get(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    await db.run(
      'INSERT INTO users (email, name, password) VALUES (?, ?, ?)',
      [email, name, password]
    );

    await db.run(
      'INSERT INTO settings (email, name) VALUES (?, ?)',
      [email, name]
    )

    res.status(200).json({ message: 'Success' });
  } catch (err) {
    console.error('Error registering:', err);
    res.status(500).json({ message: null, error: 'Server error' });
  }
});

// Get user settings endpoint
app.post('/getSettings', async (req, res) => {
  const { email } = req.body

  try {
    const settings = await db.get(
      'SELECT appearance, stayLoggedIn, defaultHomepage FROM settings WHERE email = ?',
      [email]
    )

    if (!settings) {
      return res.status(404).json({ message: 'Error uploading settings' });
    }

    res.status(200).json({
      message: 'Success',
      settings: {
        appearance: settings.appearance,
        stayLoggedIn: settings.stayLoggedIn,
        defaultHomepage: settings.defaultHomepage
      }
    });
  } catch (err) {
    console.error('Error uploading settings:', err);
    res.status(500).json({ message: null, error: 'Server error' });
  }
})

// Appearance change endpoint
app.post('/updateAppearance', async (req, res) => {
  const { value, email } = req.body

  try {
    await db.run('UPDATE settings SET appearance = ? WHERE email = ?',
      [value, email]
    )

    res.status(200).json({ message: "Success" })
  } catch (err) {
    res.status(500).json({ message: 'Error updating data' })
  }
})

// StayLoggedIn change endpoint
app.post('/updateStayLoggedIn', async (req, res) => {
  const { value, email } = req.body

  try {
    await db.run('UPDATE settings SET stayLoggedIn = ? WHERE email = ?',
      [value, email]
    )

    res.status(200).json({ message: "Success" })
  } catch (err) {
    res.status(500).json({ message: 'Error updating data' })
  }
})

// DefaultHomepage change endpoint
app.post('/updateDefaultHomepage', async (req, res) => {
  const { value, email } = req.body

  try {
    await db.run('UPDATE settings SET defaultHomepage = ? WHERE email = ?',
      [value, email]
    )

    res.status(200).json({ message: "Success" })
  } catch (err) {
    res.status(500).json({ message: 'Error updating data' })
  }
})

// Delete account endpoint
app.post('/deleteAccount', async (req, res) => {
  const { email } = req.body

  try {
    await db.run('DELETE FROM settings WHERE email = ?',
      [email]
    );

    await db.run('DELETE FROM users WHERE email = ?',
      [email]
    );
  } catch (err) {
    res.status(500).json({ message: "Error deleting account" })
  }
})