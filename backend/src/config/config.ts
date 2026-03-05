import { config as conf } from "dotenv";

conf();

const _config = {
    port: process.env.PORT || 5140,
    dbUrl: process.env.MONGO_URI,
    dbName: process.env.DB_NAME,
    env: process.env.NODE_ENV,
    jwtSecret: process.env.JWT_SECRET,
    cloudinaryCloud: process.env.CLOUDINARY_CLOUD,
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
    cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
};

export const config = Object.freeze(_config);