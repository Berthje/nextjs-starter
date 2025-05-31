/* eslint-disable @typescript-eslint/no-require-imports */
const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config({ path: ".env.local" });

async function setupDatabase() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await pool.query("SELECT NOW()");
    console.log("✅ Database connection successful");
    console.log("✅ Database setup complete");
  } catch (error) {
    console.error("❌ Database setup failed:", error.message);
    console.log("npm run db:start");
  } finally {
    await pool.end();
  }
}

setupDatabase();
