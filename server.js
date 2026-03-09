import express from "express";
import dotenv from "dotenv";
import { initDb } from "./src/config/db.js";

//  routes
import authRoutes from "./src/routes/Auth/Auth.js";
import userRoutes from "./src/routes/User.js";

// this is to initialize dotenv
dotenv.config();

const app = express();
const port = process.env.PORT;

// Middleware to parse JSON bodies
app.use(express.json());

// routes
app.use("/auth", authRoutes);
app.use("/user", userRoutes);

app.listen(port, () => {
  console.log(`My server is running at https://localhost:${port}`);
  initDb();
});
