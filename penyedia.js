const XLSX = require("xlsx");
const { BASE_URL, TOKEN } = require("./config");

// endpoint
const ENDPOINT = "/api/v1/rup/paket-penyedia-terumumkan";

const args = process.argv.slice(2);

const KODE_KLPD = args[0] || "D145";
const TAHUN = Number(args[1] || 2026);
const LIMIT = Number(args[2] || 100);

if (!KODE_KLPD) {
  console.error("❌ kode_klpd wajib diisi. Contoh: node penyedia-cli.js D145 2026 100");
  process.exit(1);
}

if (Number.isNaN(TAHUN) || TAHUN < 2000) {
  console.error("❌ tahun tidak valid. Contoh: node penyedia-cli.js D145 2026 100");
  process.exit(1);
}

if (Number.isNaN(LIMIT) || LIMIT <= 0 || LIMIT > 1000) {
  console.error("❌ limit tidak valid (1–1000). Contoh: node penyedia-cli.js D145 2026 100");
  process.exit(1);
}

async function exportKeExcel() {
  let cursor = null;
  let hasMore = true;
  let allData = [];

  console.log(`▶️ Mulai export: kode_klpd=${KODE_KLPD}, tahun=${TAHUN}, limit=${LIMIT}`);

  while (hasMore) {
    let url =
      `${BASE_URL}${ENDPOINT}` +
      `?limit=${LIMIT}&kode_klpd=${encodeURIComponent(KODE_KLPD)}&tahun=${TAHUN}`;

    if (cursor) url += `&cursor=${encodeURIComponent(cursor)}`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("❌ Request gagal:", res.status, res.statusText);
      if (text) console.error("Respons:", text.slice(0, 500));
      process.exit(1);
    }

    const json = await res.json();

    const pageCount = Array.isArray(json.data) ? json.data.length : 0;
    allData = allData.concat(json.data || []);

    cursor = json?.meta?.cursor ?? null;
    hasMore = Boolean(json?.meta?.has_more);

    console.log(`Ambil ${pageCount} data | Total: ${allData.length}`);
  }

  // Simpan ke Excel
  const worksheet = XLSX.utils.json_to_sheet(allData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, `RUP ${TAHUN}`);

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

  const filename = `paket-penyedia-terumumkan-${TAHUN}_${KODE_KLPD}_${timestamp}.xlsx`;
  XLSX.writeFile(workbook, filename);

  console.log("\n✅ SELESAI");
  console.log(`📁 File dibuat: ${filename}`);
}

exportKeExcel();
