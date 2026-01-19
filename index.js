const { fetchAllData } = require("./src/api");
const { saveToExcel } = require("./src/excel");
const { parseArgs } = require("./src/utils");

const COMMANDS = {
    penyedia: {
        endpoint: "/api/v1/rup/paket-penyedia-terumumkan",
        sheetName: "RUP PENYEDIA",
        filenamePrefix: "paket-penyedia-terumumkan",
    },
    swakelola: {
        endpoint: "/api/v1/rup/paket-swakelola-terumumkan",
        sheetName: "RUP SWAKELOLA",
        filenamePrefix: "paket-swakelola-terumumkan",
    },
    mastersatker: {
        endpoint: "/api/v1/rup/master-satker",
        sheetName: "MASTER SATKER",
        filenamePrefix: "mastersatker",
    },
    satker: {
        // Alias untuk mastersatker
        endpoint: "/api/v1/rup/master-satker",
        sheetName: "MASTER SATKER",
        filenamePrefix: "mastersatker",
    },
    epurchasing: {
        endpoint: "/api/v1/ekatalog/paket-e-purchasing",
        sheetName: "E-PURCHASING",
        filenamePrefix: "list-paket-e-purchasing-v6",
    },
};

const args = process.argv.slice(2);
const commandName = args[0] ? args[0].toLowerCase() : null;

if (!commandName || !COMMANDS[commandName]) {
    console.log("❌ Perintah tidak dikenali atau kosong.");
    console.log("Daftar perintah yang tersedia:");
    console.log("  - penyedia      (Export RUP Penyedia)");
    console.log("  - swakelola     (Export RUP Swakelola)");
    console.log("  - satker        (Export Master Satker)");
    console.log("  - epurchasing   (Export E-Purchasing)");
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
