/**
 * Validasi dan Parsing Argumen
 */

function parseArgs(args, defaultKLPD = "D145", defaultTahun = 2026, defaultLimit = 100) {
    const KODE_KLPD = args[0] || defaultKLPD;
    const TAHUN = Number(args[1] || defaultTahun);
    const LIMIT = Number(args[2] || defaultLimit);

    if (!KODE_KLPD) {
        console.error("❌ Error: Kode KLPD wajib diisi.");
        console.error("   Contoh: node index.js penyedia D145 2026 100");
        process.exit(1);
    }

    if (Number.isNaN(TAHUN) || TAHUN < 2000) {
        console.error("❌ Error: Tahun tidak valid (harus angka >= 2000).");
        process.exit(1);
    }

    // Untuk limit, kita beri toleransi jika user tidak mengirim limit, tapi jika dikirim dan salah maka error
    if (args[2] && (Number.isNaN(LIMIT) || LIMIT <= 0)) {
        console.error("❌ Error: Limit tidak valid (harus angka > 0).");
        process.exit(1);
    }

    return { KODE_KLPD, TAHUN, LIMIT };
}

module.exports = {
    parseArgs,
};
