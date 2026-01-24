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

const allowedOrigins = [
  "https://babyzhub.com",
  "https://www.babyzhub.com",
  "https://babuz-hub.vercel.app",
  "https://babuz-hub-3u7z.vercel.app",
  process.env.FRONTEND_URL,
  "http://localhost:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (e.g., mobile apps, postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS blocked: " + origin));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

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
