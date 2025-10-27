import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.js";
import settingsRouter from "./routes/settings.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/settings", settingsRouter);

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
