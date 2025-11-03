import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectToDB } from "./utils/db.js";
import signupRoute from "./api/auth/signup.js";
import signinRoute from "./api/auth/signin.js";
import productsRoute from "./api/auth/products.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===== CORS FIX =====
app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true // only if using cookies/auth
}));

// Connect MongoDB
connectToDB();

// Routes
app.use("/api/auth/signup", signupRoute);
app.use("/api/auth/signin", signinRoute);
app.use("/api/products", productsRoute);

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
