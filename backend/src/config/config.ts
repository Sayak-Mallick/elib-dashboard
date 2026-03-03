import { config as conf } from "dotenv";

conf();

const _config = {
    port: process.env.PORT || 5140,
    dbUrl: process.env.MONGO_URI,
    dbName: process.env.DB_NAME,
    env: process.env.NODE_ENV,
    jwtSecret: process.env.JWT_SECRET,
};

export const config = Object.freeze(_config);