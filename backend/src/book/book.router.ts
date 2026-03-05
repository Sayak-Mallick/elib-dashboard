import express from "express";
import multer from "multer";
import { createBook } from "./book.controller";
import path from "node:path";

const bookRouter = express.Router();

const upload = multer({
  dest: path.resolve(__dirname, "../../public/data/uploads"),
  limits: { fileSize: 10 * 1e6 },
});

bookRouter.post( "/",
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
  createBook,
);

export default bookRouter;
