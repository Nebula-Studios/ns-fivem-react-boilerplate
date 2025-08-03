#!/usr/bin/env node

import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function createApp() {
  const projectName = process.argv[2];

  if (!projectName) {
    console.error("❌ Error: Please specify a project name");
    console.log("💡 Usage: npx ns-fivem-react-boilerplate <project-name>");
    process.exit(1);
  }

  if (fs.existsSync(projectName)) {
    console.error(`❌ Error: Folder "${projectName}" already exists`);
    process.exit(1);
  }

  console.log(`🚀 Creating FiveM React project: ${projectName}`);

  try {
    // Create project folder
    fs.mkdirSync(projectName);
    process.chdir(projectName);

    // Initialize git
    console.log("📦 Initializing repository...");
    execSync("git init", { stdio: "inherit" });

    // Clone template
    console.log("📥 Downloading template...");
    execSync(
      `git remote add origin https://github.com/Nebula-Studios/ns-fivem-react-boilerplate.git`,
      { stdio: "inherit" }
    );
    execSync("git fetch origin", { stdio: "inherit" });
    execSync("git checkout -b main origin/main", { stdio: "inherit" });

    // Remove reference to original repository
    execSync("git remote remove origin", { stdio: "inherit" });

    // Update package.json with new name
    const packageJsonPath = path.join(process.cwd(), "package.json");
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
    packageJson.name = projectName;
    delete packageJson.bin; // Remove bin from final project
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

    // Install dependencies
    console.log("📦 Installing dependencies...");
    execSync("npm install", { stdio: "inherit" });

    console.log(`\n✅ Project "${projectName}" created successfully!`);
    console.log("\n🎯 Next steps:");
    console.log(`   cd ${projectName}`);
    console.log("   npm start          # For normal development");
    console.log("   npm run start:game # For FiveM development (with watch)");
    console.log("   npm run build      # For production build");
    console.log("\n📖 Read the README.md for more information!");
  } catch (error) {
    console.error("❌ Error creating project:", error.message);
    process.exit(1);
  }
}

createApp();
