#!/usr/bin/env node

import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function createApp() {
  const projectName = process.argv[2];

  if (!projectName) {
    console.error("❌ Errore: Specifica il nome del progetto");
    console.log("💡 Uso: npx ns-fivem-react-boilerplate <nome-progetto>");
    process.exit(1);
  }

  if (fs.existsSync(projectName)) {
    console.error(`❌ Errore: La cartella "${projectName}" esiste già`);
    process.exit(1);
  }

  console.log(`🚀 Creazione del progetto FiveM React: ${projectName}`);

  try {
    // Crea la cartella del progetto
    fs.mkdirSync(projectName);
    process.chdir(projectName);

    // Inizializza git
    console.log("📦 Inizializzazione del repository...");
    execSync("git init", { stdio: "inherit" });

    // Clona il template
    console.log("📥 Download del template...");
    execSync(
      `git remote add origin https://github.com/tuousername/ns-fivem-react-boilerplate.git`,
      { stdio: "inherit" }
    );
    execSync("git fetch origin", { stdio: "inherit" });
    execSync("git checkout -b main origin/main", { stdio: "inherit" });

    // Rimuovi il riferimento al repository originale
    execSync("git remote remove origin", { stdio: "inherit" });

    // Aggiorna il package.json con il nuovo nome
    const packageJsonPath = path.join(process.cwd(), "package.json");
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
    packageJson.name = projectName;
    delete packageJson.bin; // Rimuove il bin dal progetto finale
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

    // Installa le dipendenze
    console.log("📦 Installazione delle dipendenze...");
    execSync("npm install", { stdio: "inherit" });

    console.log(`\n✅ Progetto "${projectName}" creato con successo!`);
    console.log("\n🎯 Prossimi passi:");
    console.log(`   cd ${projectName}`);
    console.log("   npm start          # Per sviluppo normale");
    console.log("   npm run start:game # Per sviluppo FiveM (con watch)");
    console.log("   npm run build      # Per build di produzione");
    console.log("\n📖 Leggi il README.md per maggiori informazioni!");
  } catch (error) {
    console.error(
      "❌ Errore durante la creazione del progetto:",
      error.message
    );
    process.exit(1);
  }
}

createApp();
