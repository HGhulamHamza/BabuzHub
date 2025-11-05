import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

router.post("/", async (req, res) => {
  const { userDetails, cartItems, total } = req.body;

  if (!userDetails || !cartItems) {
    return res.status(400).json({ error: "Missing order details" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // use .env for security
        pass: process.env.EMAIL_PASS,
      },
    });

    const itemsHTML = cartItems
      .map(
        (item) =>
          `<li>${item.title} (${item.selectedOption?.name || ""}) — ${item.quantity} × Rs ${
            item.selectedOption ? item.selectedOption.price : item.price
          }</li>`
      )
      .join("");

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "moizkhanal82@gmail.com",
      subject: `🛍️ New Order from ${userDetails.name}`,
      html: `
        <h2>New Order Received</h2>
        <p><strong>Name:</strong> ${userDetails.name}</p>
        <p><strong>Email:</strong> ${userDetails.email}</p>
        <p><strong>Phone:</strong> ${userDetails.phone}</p>
        <p><strong>Address:</strong> ${userDetails.address}</p>
        <h3>Order Items:</h3>
        <ul>${itemsHTML}</ul>
        <p><strong>Total:</strong> Rs ${total}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

export default router;
