import mongoose from "mongoose";

const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) {
    console.log("Database already connected.");
    return;
  }
  console.log("Connecting to MongoDB...");
  
  try {
    await mongoose.connect("mongodb://localhost:27017/next_tutorial", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connection successful!");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
};

export default dbConnect;
