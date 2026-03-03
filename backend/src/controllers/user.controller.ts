import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import userModel from "../models/user.model";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  // validation
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
  // Process the registration logic (e.g., save user to database, hash password, etc.)
  // Response with success message or error if registration fails
  return res.json({
    message: '✅ User registered successfully',
  });
}

export { createUser };
