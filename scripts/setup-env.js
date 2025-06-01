/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const crypto = require("crypto");
const readline = require("readline");
const path = require("path");

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

function generateProjectName(customName) {
  if (customName) {
    return customName
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  }
  return "my-nextjs-app";
}

function generateAppDisplayName(customName) {
  if (customName) {
    return customName
      .replace(/[^a-zA-Z0-9\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }
  return "My Next.js App";
}

async function setupEnvironment() {
  console.log("🚀 Welcome to Next.js Starter Kit Setup!");
  console.log("");

  // Check if .env already exists with valid values
  if (fs.existsSync(".env")) {
    const envContent = fs.readFileSync(".env", "utf8");

    const hasPlaceholders =
      envContent.includes("your_password") ||
      envContent.includes("your-secret-key-here-make-it-long-and-random") ||
      envContent.includes("my-nextjs-app");

    if (!hasPlaceholders) {
      const shouldReconfigure = await askQuestion(
        "✅ .env file already exists with custom values. Reconfigure? (y/N): ",
      );
      if (
        shouldReconfigure.toLowerCase() !== "y" &&
        shouldReconfigure.toLowerCase() !== "yes"
      ) {
        console.log("✅ Using existing configuration");
        rl.close();
        return;
      }
    }
  }

  // Read .env.example
  if (!fs.existsSync(".env.example")) {
    console.error("❌ .env.example not found");
    rl.close();
    process.exit(1);
  }

  // Get project name suggestion from folder
  const folderName = path.basename(process.cwd());
  const suggestedName =
    folderName === "nextjs-starter" || folderName === "nextjs-starter-kit"
      ? ""
      : folderName.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

  // Get project name from user
  console.log("📝 Let's configure your project:");
  console.log("");

  let question = "Enter your project name";
  if (suggestedName) {
    question += ` (or press Enter for "${suggestedName}")`;
  }
  question += ": ";

  const userInput = await askQuestion(question);
  const projectName = userInput || suggestedName || "My Next.js App";

  console.log("");
  console.log("🔧 Generating secure credentials...");

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

  // Update DATABASE_URL
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

  console.log("");
  console.log("✅ Environment setup complete!");
  console.log("");
  console.log("📋 Configuration Summary:");
  console.log(`   📱 Project Name: ${displayProjectName}`);
  console.log(`   🐳 Container Prefix: ${kebabProjectName}`);
  console.log(`   🗄️  Database: ${kebabProjectName}_db`);
  console.log(`   🔑 Password: dev_${randomPassword}`);
  console.log(`   🔐 Auth Secret: ${randomSecret.substring(0, 16)}...`);
  console.log("");
  console.log("📝 You can edit .env to customize any settings");
  console.log("🚀 Ready for development!");
  console.log("");

  rl.close();
}

// Run setup
setupEnvironment().catch((error) => {
  console.error("❌ Setup failed:", error.message);
  rl.close();
  process.exit(1);
});
