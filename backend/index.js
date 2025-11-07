import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectToDB } from "./utils/db.js";

import signupRoute from "./api/auth/signup.js";
import signinRoute from "./api/auth/signin.js";
import productsRoute from "./api/auth/products.js";
import sendOrderRoute from "./api/auth/sendOrder.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.options(/.*/, cors());


// Connect MongoDB
connectToDB();

// Routes
app.use("/api/auth/signup", signupRoute);
app.use("/api/auth/signin", signinRoute);
app.use("/api/products", productsRoute);
app.use("/api/send-order", sendOrderRoute);

app.get("/", (req, res) => {
  res.send("Backend is running...");
});

export default app;
