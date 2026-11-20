import config from "./server/config/config.js";
import app from "./server/express.js";
import mongoose from "mongoose";

mongoose
  .connect(config.mongoUri)
  .then(() => console.log("Connected to the database!"))
  .catch((err) => console.error("Unable to connect to database:", err.message));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to My Portfolio application." });
});

// On Vercel the app is exported as a serverless function; locally we start a normal server
if (!process.env.VERCEL) {
  app.listen(config.port, () => {
    console.info("Server started on port %s.", config.port);
  });
}

export default app;
