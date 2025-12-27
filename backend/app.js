import express, { Router } from "express";
import routes from "./src/routes/index.js";
import errorMiddleware from "./src/middlewares/error.middlewares.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);
app.use(errorMiddleware);

export default app;
