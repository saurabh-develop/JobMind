import express from "express";
import routes from "./src/routes/index.js";
import errorMiddleware from "./src/middlewares/error.middlewares.js";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);
app.use(errorMiddleware);

export default app;
