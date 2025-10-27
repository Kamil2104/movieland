import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const db = await open({
  filename: path.resolve(__dirname, "./movieland.db"),
  driver: sqlite3.Database,
});

// Creating tables if they don't exist
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
    name TEXT,
    appearance TEXT DEFAULT 'light',
    stayLoggedIn TEXT DEFAULT 'Always',
    defaultHomepage TEXT DEFAULT 'Home',
    FOREIGN KEY (email) REFERENCES users(email)
  );
`);
