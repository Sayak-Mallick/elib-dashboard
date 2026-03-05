import { Request, Response, NextFunction } from "express";
import path from "node:path";
import cloudinary from "../config/cloudinary";
import createHttpError from "http-errors";
import bookModel from "./book.model";
import fs from "fs";

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  const { title, genre, description } = req.body;

  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  const coverImageMimeType = files.coverImage[0].mimetype.split("/").at(-1);
  const fileName = files.coverImage[0].filename;
  const filePath = path.resolve(
    __dirname,
    "../../public/data/uploads",
    fileName,
  );

  const bookFileName = files.file[0].filename;
  const bookFilePath = path.resolve(
    __dirname,
    "../../public/data/uploads",
    bookFileName,
  );

  try {
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      filename_override: fileName,
      folder: "book-covers",
      format: coverImageMimeType,
    });

    const bookFileUploadResult = await cloudinary.uploader.upload(
      bookFilePath,
      {
        resource_type: "raw",
        filename_override: bookFileName,
        folder: "book-pdfs",
        format: "pdf",
      },
    );

    try {
      const _req = req as any;
      const newBook = await bookModel.create({
        title,
        genre,
        description,
        author: _req.userId,
        coverImage: uploadResult.secure_url,
        file: bookFileUploadResult.secure_url,
      });

      // Delete the temporary files after upload
      await fs.promises.unlink(filePath);
      await fs.promises.unlink(bookFilePath);

      res.status(201).json({ id: newBook._id, message: "✅ Book created successfully" });
    } catch (error) {
      return next(createHttpError(500, "Internal server error while creating book"));
    }

  } catch (err) {
    console.log(err);
    return next(createHttpError(500, "Error while uploading files"));
  }
};

export { createBook };
