const { fetchAllData } = require("./src/api");
const { saveToExcel } = require("./src/excel");
const { parseArgs } = require("./src/utils");

// endpoint
const ENDPOINT = "/api/v1/rup/paket-swakelola-terumumkan";

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
      sheetName: `RUP SWAKELOLA ${params.TAHUN}`,
      filenamePrefix: "paket-swakelola-terumumkan",
      params,
    });
  } catch (error) {
    console.error("Gagal menjalankan proses.");
  }
})();
