import app from "./server";
import { config } from "./config/config";
import connectDB from "./config/db";

const startServer = async () => {
  await connectDB();
  const port = config.port;

  app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
  });
};

startServer();
