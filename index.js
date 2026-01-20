const { fetchAllData } = require("./src/api");
const { saveToExcel } = require("./src/excel");
const { parseArgs } = require("./src/utils");

const fs = require("fs");
const path = require("path");

// Load commands dynamically
const COMMANDS = {};
const commandsDir = path.join(__dirname, "src/commands");

if (fs.existsSync(commandsDir)) {
    fs.readdirSync(commandsDir).forEach((file) => {
        if (file.endsWith(".js")) {
            const command = require(path.join(commandsDir, file));
            if (command.name) {
                COMMANDS[command.name] = command;
                // Handle aliases
                if (command.aliases && Array.isArray(command.aliases)) {
                    command.aliases.forEach(alias => {
                        COMMANDS[alias] = command;
                    });
                }
            }
        }
    });
}

const args = process.argv.slice(2);
const commandName = args[0] ? args[0].toLowerCase() : null;

if (!commandName || !COMMANDS[commandName]) {
    console.log("❌ Perintah tidak dikenali atau kosong.");
    console.log("Daftar perintah yang tersedia:");
    const printedCommands = new Set();
    Object.values(COMMANDS).forEach((cmd) => {
        if (!printedCommands.has(cmd.name)) {
            console.log(`  - ${cmd.name.padEnd(12)} (${cmd.description || "No description"})`);
            printedCommands.add(cmd.name);
        }
    });
    console.log("\nCara penggunaan:");
    console.log("  node index.js [perintah] [kode_klpd] [tahun] [limit]");
    console.log("Contoh:");
    console.log("  node index.js penyedia D145 2026 100");
    process.exit(1);
}

// Ambil config untuk command tersebut
const config = COMMANDS[commandName];

// Parse sisa argumen (skip command name)
const params = parseArgs(args.slice(1));

(async () => {
    try {
        const data = await fetchAllData({
            endpoint: config.endpoint,
            params,
        });

        saveToExcel({
            data,
            sheetName: `${config.sheetName} ${params.TAHUN}`,
            filenamePrefix: config.filenamePrefix,
            params,
        });
    } catch (error) {
        console.error("Gagal menjalankan proses.");
    }
})();
