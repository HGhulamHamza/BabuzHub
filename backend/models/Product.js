import mongoose from "mongoose";

const optionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  img: { type: String, required: true },
  price: { type: Number, required: true }, // Add this line
  options: [optionSchema], // For products with multiple options (like pack of 3, pack of 5)
});

export default mongoose.model("Product", productSchema);
