import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import dbconn from "./config/dbconn";

const PORT = Number(process.env.PORT);

const startServer = async () => {
  try {
    await dbconn();
    console.log("✅ PostgreSQL (Supabase) connected successfully.");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Database connection failed:");
    console.error(error);
    process.exit(1);
  }
};

startServer();
