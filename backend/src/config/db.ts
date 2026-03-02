/* eslint-disable */
// @ts-nocheck
import mongoose from "mongoose";
import { config } from "./config.ts";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("✅ Connected to MongoDB successfully!");
    });

    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️ MongoDB disconnected");
    });

    await mongoose.connect(config.dbUrlb as string, {
      dbName: `${config.dbName}`,
    });

  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;