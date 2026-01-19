const { fetchAllData } = require("./src/api");
const { saveToExcel } = require("./src/excel");
const { parseArgs } = require("./src/utils");

// endpoint
const ENDPOINT = "/api/v1/ekatalog/paket-e-purchasing";

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
      sheetName: `E-PURCHASING ${params.TAHUN}`,
      filenamePrefix: "list-paket-e-purchasing-v6",
      params,
    });
  } catch (error) {
    console.error("Gagal menjalankan proses.");
  }
})();
