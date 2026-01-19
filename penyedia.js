const { fetchAllData } = require("./src/api");
const { saveToExcel } = require("./src/excel");
const { parseArgs } = require("./src/utils");

// endpoint
const ENDPOINT = "/api/v1/rup/paket-penyedia-terumumkan";

const args = process.argv.slice(2);
const params = parseArgs(args);

(async () => {
  try {
    const data = await fetchAllData({
      endpoint: ENDPOINT,
      params,
    });

    saveToExcel({
      data,
      sheetName: `RUP PENYEDIA ${params.TAHUN}`,
      filenamePrefix: "paket-penyedia-terumumkan",
      params,
    });
  } catch (error) {
    console.error("Gagal menjalankan proses.");
  }
})();
