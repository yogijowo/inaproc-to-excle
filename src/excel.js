const XLSX = require("xlsx");
const path = require("path");

function saveToExcel({ data, sheetName, filenamePrefix, params, onProgress }) {
    const log = (msg) => {
        console.log(msg);
        if (onProgress) onProgress(msg);
    };

    if (!data || data.length === 0) {
        log("⚠️ Tidak ada data untuk disimpan.");
        return null;
    }

    const { KODE_KLPD, TAHUN } = params;

    // === Simpan ke Excel ===
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName || `DATA ${TAHUN}`);

    // Timestamp: YYYYMMDD_HHMMSS
    const pad = (n) => n.toString().padStart(2, "0");
    const now = new Date();
    const timestamp =
        now.getFullYear().toString() +
        pad(now.getMonth() + 1) +
        pad(now.getDate()) +
        "_" +
        pad(now.getHours()) +
        pad(now.getMinutes()) +
        pad(now.getSeconds());

    // Format Nama File sesuai request yang ada di file lama
    // contoh: paket-penyedia-terumumkan-2026_D145_20260114_101530.xlsx
    const filename = `${filenamePrefix}-${TAHUN}_${KODE_KLPD}_${timestamp}.xlsx`;

    // Clean filename to allow saving in current directory smoothly
    const filePath = path.join(process.cwd(), filename);

    XLSX.writeFile(workbook, filePath);

    log("✅ SELESAI EKSPOR");
    log(`📁 File tersimpan: ${filename}`);

    return filename;
}

module.exports = {
    saveToExcel,
};
