/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const crypto = require("crypto");

console.log("🔧 Setting up environment...");

// Check if .env already exists
if (fs.existsSync(".env")) {
  console.log("✅ .env file already exists");
  process.exit(0);
}

// Read .env.example
if (!fs.existsSync(".env.example")) {
  console.error("❌ .env.example not found");
  process.exit(1);
}

let envContent = fs.readFileSync(".env.example", "utf8");

// Generate random password and secret
const randomPassword = crypto.randomBytes(16).toString("hex");
const randomSecret = crypto.randomBytes(32).toString("hex");

// Replace placeholders with random values
envContent = envContent.replace("your_password", `dev_${randomPassword}`);

envContent = envContent.replace(
  "your-secret-key-here-make-it-long-and-random",
  randomSecret,
);

// Update DATABASE_URL with the same password
envContent = envContent.replace(
  "postgresql://postgres:your_password@postgres:5432/my_app_db",
  `postgresql://postgres:dev_${randomPassword}@postgres:5432/my_app_db`,
);

// Write .env file
fs.writeFileSync(".env", envContent);

console.log("✅ Created .env file with random credentials");
console.log("🔑 Database password: dev_" + randomPassword);
console.log("📝 You can edit .env to customize settings");
console.log('🚀 Run "npm run docker:dev" to start development');
