import "dotenv/config";
import mongoose from "mongoose";
import { app } from './app.js';


const { DB_URI } = process.env.DB_URI;

mongoose
  .connect(DB_URI)
  .then(() => {
    app.listen(3000, () => {
      console.log('Database connection successful');
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error.message);
    process.exit(1);
  });