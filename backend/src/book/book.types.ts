import { User } from "../types/user.types";

export interface Book {
  _id: string;
  title: string;
  author: User;
  genre: string;
  description: string;
  coverImage: string;
  file: string;
  createdAt: string;
  updatedAt: string;
}
