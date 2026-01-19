const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const { fetchAllData } = require("./src/api");
const { saveToExcel } = require("./src/excel");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static("public")); // Serve frontend files

// Config commands mirip dengan index.js
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
    satker: {
        endpoint: "/api/v1/rup/master-satker",
        sheetName: "MASTER SATKER",
        filenamePrefix: "mastersatker",
        defaultLimit: 1000 // Master Satker doesn't use limit usually but our API logic supports it
    },
    epurchasing: {
        endpoint: "/api/v1/ekatalog/paket-e-purchasing",
        sheetName: "E-PURCHASING",
        filenamePrefix: "list-paket-e-purchasing-v6",
    },
};

// SSE Endpoint for streaming progress
app.get("/api/stream", async (req, res) => {
    const { command, klpd, tahun, limit } = req.query;

    // Set headers for SSE
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const sendEvent = (type, data) => {
        res.write(`event: ${type}\n`);
        res.write(`data: ${JSON.stringify(data)}\n\n`);
    };

    const logCallback = (message) => {
        sendEvent("log", { message });
    };

    if (!COMMANDS[command]) {
        sendEvent("error", { message: "Perintah tidak valid." });
        return res.end();
    }

    const config = COMMANDS[command];
    const params = {
        KODE_KLPD: klpd || "D145",
        TAHUN: Number(tahun) || new Date().getFullYear(),
        LIMIT: Number(limit) || 100
    };

    try {
        sendEvent("log", { message: `🚀 Memulai proses untuk ${command.toUpperCase()}...` });

        const data = await fetchAllData({
            endpoint: config.endpoint,
            params,
            onProgress: logCallback,
        });

        const filename = saveToExcel({
            data,
            sheetName: `${config.sheetName} ${params.TAHUN}`,
            filenamePrefix: config.filenamePrefix,
            params,
            onProgress: logCallback,
        });

        if (filename) {
            sendEvent("done", {
                filename,
                downloadUrl: `/download/${filename}`
            });
        } else {
            sendEvent("error", { message: "Tidak ada data yang disimpan." });
        }

    } catch (error) {
        sendEvent("error", { message: error.message || "Terjadi kesalahan server." });
    } finally {
        res.end();
    }
});

// Download endpoint
app.get("/download/:filename", (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, filename);

    if (fs.existsSync(filePath)) {
        res.download(filePath);
    } else {
        res.status(404).send("File tidak ditemukan.");
    }
});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
