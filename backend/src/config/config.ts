import { config as conf} from 'dotenv';

conf();

const _config = {
  port: process.env.PORT || 3000,
  dbUrlb: process.env.MONGO_URI,
  dbName: process.env.DB_NAME || "newtown-lib",
};

export const config = Object.freeze(_config);