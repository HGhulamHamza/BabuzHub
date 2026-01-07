// backend/api/auth/signin.js
import { connectToDB } from "../../utils/db.js"; // ✅ correct for named export
import User from "../../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = req.body;

  try {
    await connectToDB();

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

  res.status(200).json({
  message: "Login successful",
  user: {
    _id: user._id,
    email: user.email,
    fullName: user.fullName
  },
  token
});

  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
}
