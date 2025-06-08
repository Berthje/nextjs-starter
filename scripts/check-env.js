/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const crypto = require("crypto");
const path = require("path");
const readline = require("readline");

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

async function checkAndSetupEnvironment() {
  console.log("🔍 Checking environment setup...");

  // Check if .env exists and has valid configuration
  let needsSetup = false;
  let hasValidConfig = false;

  if (fs.existsSync(".env")) {
    const envContent = fs.readFileSync(".env", "utf8"); // Check for placeholder values that affect container setup
    const hasPlaceholders =
      envContent.includes("your_password") ||
      envContent.includes("my_app_db") ||
      envContent.includes("PROJECT_NAME=my_app") ||
      envContent.includes("my-nextjs-app");

    if (hasPlaceholders) {
      needsSetup = true;
      console.log("⚠️  Found .env with placeholder values");
    } else {
      hasValidConfig = true;
      console.log("✅ Found existing .env with custom configuration");
    }
  } else {
    needsSetup = true;
    console.log("⚠️  No .env file found");
  }

  // If we have valid config, ask if user wants to reconfigure
  if (hasValidConfig) {
    console.log("");
    const shouldReconfigure = await askQuestion(
      "🔧 Reconfigure project settings? (y/N): ",
    );
    if (
      shouldReconfigure.toLowerCase() !== "y" &&
      shouldReconfigure.toLowerCase() !== "yes"
    ) {
      console.log("✅ Using existing configuration");
      console.log("🚀 Starting Docker containers...");
      rl.close();
      return;
    }
    needsSetup = true;
  }

  if (needsSetup) {
    await setupEnvironmentInteractive();
  }

  rl.close();
}

async function setupEnvironmentInteractive() {
  console.log("");
  console.log("🚀 Welcome to Next.js Starter Kit Setup!");
  console.log("");

  // Read .env.example
  if (!fs.existsSync(".env.example")) {
    console.error("❌ .env.example not found");
    process.exit(1);
  }

  // Get project name suggestion from folder
  const folderName = path.basename(process.cwd());
  const suggestedName =
    folderName === "nextjs-starter" || folderName === "nextjs-starter-kit"
      ? ""
      : folderName.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

  // Ask for project name
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

  // Leave Better Auth secret as placeholder (don't auto-generate)
  // envContent = envContent.replace(
  //   /your-secret-key-here-make-it-long-and-random/g,
  //   randomSecret
  // );

  // Update DATABASE_URL with project-specific database name - use regex to handle any password
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

  console.log("");
  console.log("✅ Environment setup complete!");
  console.log("");
  console.log("📋 Configuration Summary:");
  console.log(`   📱 Project Name: ${displayProjectName}`);
  console.log(`   🐳 Container Prefix: ${kebabProjectName}`);
  console.log(`   🗄️  Database: ${kebabProjectName}_db`);
  console.log(`   🔑 Password: dev_${randomPassword}`);
  console.log(`   🔐 Auth Secret: ⚠️  TO BE CONFIGURED`);
  console.log("");
  console.log("⚠️  Remember to add your Better Auth secret to .env!");
  console.log("🚀 Starting Docker containers...");
  console.log("");
}

// Run the check and setup
checkAndSetupEnvironment().catch((error) => {
  console.error("❌ Setup failed:", error.message);
  rl.close();
  process.exit(1);
});
