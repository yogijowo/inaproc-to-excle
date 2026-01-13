const XLSX = require("xlsx");
const { BASE_URL, TOKEN } = require("./config");

// endpoint
const ENDPOINT = "/api/v1/rup/master-satker";
const KODE_KLPD = "D145";
const TAHUN = 2026;

async function exportKeExcel() {
    let cursor = null;
    let hasMore = true;
    let allData = [];

    while (hasMore) {
        let url = `${BASE_URL}${ENDPOINT}` +
                          `?kode_klpd=${KODE_KLPD}&tahun=${TAHUN}`;

        if (cursor) {
            url += `&cursor=${encodeURIComponent(cursor)}`;
        }

        const res = await fetch(url, {
            headers: {
                "Authorization": `Bearer ${TOKEN}`,
                "Accept": "application/json"
            }
        });

        if (!res.ok) {
            console.error("Request gagal:", res.status);
            process.exit(1);
        }

        const json = await res.json();

        allData = allData.concat(json.data);
        cursor = json.meta.cursor;
        hasMore = json.meta.has_more;

        console.log(`Ambil ${json.data.length} data | Total: ${allData.length}`);
    }

    // Simpan ke Excel
    const worksheet = XLSX.utils.json_to_sheet(allData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "RUP 2026");

    // Tambahkan tanggal dan waktu ke nama file: YYYYMMDD_HHMMSS
    const pad = n => n.toString().padStart(2, "0");
    const now = new Date();
    const timestamp =
        now.getFullYear().toString() +
        pad(now.getMonth() + 1) +
        pad(now.getDate()) + "_" +
        pad(now.getHours()) +
        pad(now.getMinutes()) +
        pad(now.getSeconds());
    const filename = `mastersatker-2026_${timestamp}.xlsx`;

    XLSX.writeFile(workbook, filename);

    console.log("\n✅ SELESAI");
    console.log(`📁 File dibuat: ${filename}`);
}

exportKeExcel();
