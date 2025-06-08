/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const crypto = require("crypto");
const path = require("path");

console.log("🔍 Auto-setting up environment...");

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

function setupEnvironmentSilent() {
  // Check if .env exists with valid values
  if (fs.existsSync(".env")) {
    const envContent = fs.readFileSync(".env", "utf8");

    const hasPlaceholders =
      envContent.includes("your_password") ||
      envContent.includes("your-secret-key-here-make-it-long-and-random");

    if (!hasPlaceholders) {
      console.log("✅ Environment already configured");
      return;
    }
  }

  // Auto-generate project name from folder name
  const folderName = path.basename(process.cwd());
  const projectName =
    folderName === "nextjs-starter" || folderName === "nextjs-starter-kit"
      ? "My Next.js App"
      : folderName.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

  try {
    // Read .env.example
    if (!fs.existsSync(".env.example")) {
      console.error("❌ .env.example not found");
      process.exit(1);
    } // Generate secure values
    const randomPassword = crypto.randomBytes(16).toString("hex");

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
    ); // Replace database configuration
    envContent = envContent.replace(/your_password/g, `dev_${randomPassword}`);

    // Leave Better Auth secret as placeholder (don't auto-generate)
    // envContent = envContent.replace(
    //   /your-secret-key-here-make-it-long-and-random/g,
    //   randomSecret,
    // );

    // Update DATABASE_URL - use regex to handle any password value
    envContent = envContent.replace(
      /postgresql:\/\/postgres:[^@]+@postgres:5432\/my_app_db/,
      `postgresql://postgres:dev_${randomPassword}@postgres:5432/${kebabProjectName}_db`,
    );

    // Update database name
    envContent = envContent.replace(
      /DB_NAME=.*/,
      `DB_NAME=${kebabProjectName}_db`,
    );

    // Write .env file
    fs.writeFileSync(".env", envContent);
    console.log("✅ Environment auto-configured!");
    console.log(`📱 Project: ${displayProjectName}`);
    console.log(`🗄️  Database: ${kebabProjectName}_db`);
    console.log("⚠️  Remember to add your Better Auth secret to .env");
  } catch (error) {
    console.error("❌ Failed to setup environment:", error.message);
    process.exit(1);
  }
}

setupEnvironmentSilent();
console.log("✅ Environment validation complete");
