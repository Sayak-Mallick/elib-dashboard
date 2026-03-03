import mongoose from "mongoose";
import { User } from "../types/user.types";

const userSchema = new mongoose.Schema<User>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
}, { timestamps: true });

// users
export default mongoose.model<User>('User', userSchema);