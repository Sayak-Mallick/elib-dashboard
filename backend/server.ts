/* eslint-disable */
// @ts-nocheck
import app from "./src/app.ts";
import { config } from "./src/config/config.ts";
import connectDB from "./src/config/db.ts";

const startServer = async() => {
  await connectDB();
  const port = config.port || 3000;

  app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
  });
};

startServer();