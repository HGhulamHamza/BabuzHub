import mongoose from "mongoose";

let isConnected = false; // prevent multiple connections in serverless

export const connectToDB = async () => {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.log("MongoDB connection error:", error);
    throw new Error("MongoDB connection failed");
  }
};
