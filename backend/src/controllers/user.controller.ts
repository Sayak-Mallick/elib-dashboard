import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import bcyrpt from "bcrypt";
import userModel from "../models/user.model";
import { sign } from "jsonwebtoken";
import { config } from "../config/config";
import { User } from "../types/user.types";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  // Basic Validation
  if (!name || !email || !password) {
    const error = createHttpError(400, 'All fields are required');
    return next(error);
  }  // we can use express-validator for better validation

  // TODO: in the next version we will implement express-validator for better validation

  // Database call to check if user already exists
  try {
    const user = await userModel.findOne({ email: email });
    if (user) {
      const error = createHttpError(400, '🔁 User with this email already exists');
      return next(error);
    }
  } catch (err) {
    return next(createHttpError(500, 'Internal server error while checking for existing user'));
  }

  // Password hashing
  const hashedPassword = await bcyrpt.hash(password, 10);

  // Process the registration logic (e.g., save user to database, hash password, etc.)
  let newUser: User;
  try {
    newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });
  } catch (error) {
    return next(createHttpError(500, 'Internal server error while creating user'));
  }

  // JWT token generation for authentication
  try {
    const token = sign({ sub: newUser._id }, config.jwtSecret as string, {
      expiresIn: '7d',
      algorithm: 'HS256',
    });

    // Response with success message or error if registration fails
    res.status(201).json({
      accessToken: token,
      message: '✅ User registered successfully',
    });
  } catch (error) {
    return next(createHttpError(500, 'Internal server error while generating token'));
  }

}

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  // Basic Validation
  if (!email || !password) {
    const error = createHttpError(400, 'Email and password are required');
    return next(error);
  }

  const user = await userModel.findOne({ email: email });
  if (!user) {
    const error = createHttpError(404, '🔍 User not found with this email');
    return next(error);
  }

  const isMatch = await bcyrpt.compare(password, user.password);
  if (!isMatch) {
    const error = createHttpError(400, '🔒 Invalid email or password');
    return next(error);
  }

  // JWT token generation for authentication
  try {
    const token = sign({ sub: user._id }, config.jwtSecret as string, {
      expiresIn: '7d',
      algorithm: 'HS256',
    });
    res.status(201).json({
      message: '✅ OK',
      accessToken: token,
    })
  } catch (error) {
    return next(createHttpError(500, 'Internal server error while generating token'));
  }
}

export { createUser, loginUser };
