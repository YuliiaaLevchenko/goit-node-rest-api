import mongoose from "mongoose";

const DB_URI = `mongodb+srv://levyulia0912:AGncjEyfIcTggGHn@cluster0.dfvjimf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

async function run() {
  try {
    await mongoose.connect(DB_URI);

    console.info("Database connection successfully");
} catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);  
} finally {
    await mongoose.disconnect();
  }
}

run().catch((error) => console.error(error));