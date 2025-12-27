import "./src/config/env.js";
import app from "./app.js";
import connectDB from "./src/config/db.js";
import connectRedis from "./src/config/redis.js";

const PORT = process.env.PORT || 8000;

const startServer = async () => {
  try {
    await connectDB();
    await connectRedis();
    app.listen(PORT, () => {
      console.log(`Server running to the port ${PORT}`);
    });
  } catch (error) {
    console.error(`Server failed to start, ${err}`);
    process.exit(1);
  }
};

startServer();
