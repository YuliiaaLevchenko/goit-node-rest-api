import express from "express";
import morgan from "morgan";
import cors from "cors";

import routes from "./routes/index.js"
import userRoutes from "./routes/auth.js"

import "./index.js"

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", routes);
app.use("/api/users", userRoutes)

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

export default app;