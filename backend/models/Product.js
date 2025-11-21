import mongoose from "mongoose";

const optionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  img: { type: String, required: true },
  images: { type: [String], default: [] },   // <-- NEW
  price: { type: Number, required: true },
  sizes: { type: [String], default: [] },    // <-- NEW
  options: [optionSchema],
});

export default mongoose.model("Product", productSchema);
