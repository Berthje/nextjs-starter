/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const crypto = require("crypto");
const path = require("path");

console.log("🔍 Checking environment setup...");

// Check if .env exists
if (!fs.existsSync(".env")) {
  console.log("⚠️  No .env file found. Creating one automatically...");

  // Auto-generate project name from folder name
  const folderName = path.basename(process.cwd());
  const projectName =
    folderName === "nextjs-starter" ? "My Next.js App" : folderName;

  setupEnvironmentAuto(projectName);
} else {
  console.log("✅ Environment file found");

  // Check for placeholder values
  const envContent = fs.readFileSync(".env", "utf8");
  const hasPlaceholders =
    envContent.includes("your_password") ||
    envContent.includes("your-secret-key-here-make-it-long-and-random");

  if (hasPlaceholders) {
    console.log("⚠️  Found placeholder values in .env. Regenerating...");
    const folderName = path.basename(process.cwd());
    const projectName =
      folderName === "nextjs-starter" ? "My Next.js App" : folderName;
    setupEnvironmentAuto(projectName);
  }
}

function generateProjectName(customName) {
  return customName
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function generateAppDisplayName(customName) {
  return customName
    .replace(/[^a-zA-Z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function setupEnvironmentAuto(projectName) {
  try {
    // Read .env.example
    if (!fs.existsSync(".env.example")) {
      console.error("❌ .env.example not found");
      process.exit(1);
    }

    // Generate secure values
    const randomPassword = crypto.randomBytes(16).toString("hex");
    const randomSecret = crypto.randomBytes(32).toString("hex");

    // Process project names
    const kebabProjectName = generateProjectName(projectName);
    const displayProjectName = generateAppDisplayName(projectName);

    // Read and update .env content
    let envContent = fs.readFileSync(".env.example", "utf8");

    // Replace project configuration
    envContent = envContent.replace(
      /PROJECT_NAME=.*/,
      `PROJECT_NAME=${kebabProjectName}`,
    );

    envContent = envContent.replace(
      /NEXT_PUBLIC_APP_NAME=.*/,
      `NEXT_PUBLIC_APP_NAME="${displayProjectName}"`,
    );

    // Replace database configuration
    envContent = envContent.replace(/your_password/g, `dev_${randomPassword}`);

    envContent = envContent.replace(
      /your-secret-key-here-make-it-long-and-random/g,
      randomSecret,
    );

    // Update DATABASE_URL with project-specific database name
    envContent = envContent.replace(
      "postgresql://postgres:your_password@postgres:5432/my_app_db",
      `postgresql://postgres:dev_${randomPassword}@postgres:5432/${kebabProjectName}_db`,
    );

    // Update database name
    envContent = envContent.replace(
      /DB_NAME=.*/,
      `DB_NAME=${kebabProjectName}_db`,
    );

    // Write .env file
    fs.writeFileSync(".env", envContent);

    console.log("✅ Environment setup complete!");
    console.log(`📱 Project: ${displayProjectName}`);
    console.log(`🗄️  Database: ${kebabProjectName}_db`);
    console.log("🚀 Starting Docker containers...");
  } catch (error) {
    console.error("❌ Failed to setup environment:", error.message);
    process.exit(1);
  }
}

console.log("✅ Environment validation complete");
