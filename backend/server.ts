// eslint-disable-next-line
// @ts-ignore
import app from "./src/app.ts";

const startServer = async() => {
  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
  });
};

startServer();