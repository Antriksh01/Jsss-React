import express from "express";
import { db } from "./connect.js"; // Import the database connection
import { authRoutes } from "./routes/auth.js";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use("/gallery", express.static(join(__dirname, "gallery")));

// Middleware
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
