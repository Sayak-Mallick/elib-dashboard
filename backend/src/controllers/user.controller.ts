import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import bcyrpt from "bcrypt";
import userModel from "../models/user.model";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  // Basic Validation
  if (!name || !email || !password) {
    const error = createHttpError(400, 'All fields are required');
    return next(error);
  }  // we can use express-validator for better validation

  // TODO: in the next version we will implement express-validator for better validation

  // Database call to check if user already exists
  const user = await userModel.findOne({ email: email });
  if (user) {
    const error = createHttpError(400, '🔁 User with this email already exists');
    return next(error);
  }

  // Password hashing
  const hashedPassword = await bcyrpt.hash(password, 10);

  // Process the registration logic (e.g., save user to database, hash password, etc.)
  const newUser = await userModel.create({
    name,
    email,
    password: hashedPassword,
  });
  // JWT token generation for authentication
  // Response with success message or error if registration fails
  res.json({
    id: newUser._id,
    message: '✅ User registered successfully',
  });
}

export { createUser };
