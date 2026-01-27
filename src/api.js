const { BASE_URL, TOKEN } = require("../config");

async function fetchAllData({ endpoint, params, onProgress, allowedQueryParams, clientSideFilter }) {
    let cursor = null;
    let hasMore = true;
    let allData = [];
    let page = 1;

    const { KODE_KLPD, TAHUN, LIMIT } = params;

    // Helper untuk log ke console DAN callback (jika ada)
    const log = (msg) => {
        console.log(msg);
        if (onProgress) onProgress(msg);
    };

    log(`▶️ Mulai export: KLPD=${KODE_KLPD}, Tahun=${TAHUN}, Limit per request=${LIMIT}`);

    while (hasMore) {
        log(`📄 Page ${page}`);
        log(`   ▶ Cursor request : ${cursor ?? "(kosong / awal)"}`);

        // Build URL with params
        const queryParams = new URLSearchParams();

        // Helper to check if a param is allowed
        const isAllowed = (key) => {
            if (!allowedQueryParams) return true; // Default to allow all if not specified
            return allowedQueryParams.includes(key);
        };

        if (LIMIT && isAllowed('limit')) queryParams.append("limit", LIMIT);
        if (KODE_KLPD && isAllowed('kode_klpd')) queryParams.append("kode_klpd", KODE_KLPD);
        if (TAHUN && isAllowed('tahun')) queryParams.append("tahun", TAHUN);
        if (cursor && isAllowed('cursor')) queryParams.append("cursor", cursor);

        const url = `${BASE_URL}${endpoint}?${queryParams.toString()}`;

        try {
            const res = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                    Accept: "application/json",
                },
            });

            if (!res.ok) {
                const text = await res.text().catch(() => "");
                log(`❌ Request gagal: ${res.status} ${res.statusText}`);
                if (text) log(`Respons: ${text.slice(0, 500)}`);
                // Kita throw error agar pemanggil bisa handle atau stop
                throw new Error(`API Request Failed: ${res.status} ${res.statusText}`);
            }

            const json = await res.json();
            let pageData = json.data || [];

            // Apply client-side filter if provided
            if (clientSideFilter && typeof clientSideFilter === 'function') {
                const initialCount = pageData.length;
                pageData = pageData.filter(item => clientSideFilter(item, params));
                if (pageData.length !== initialCount) {
                    // log(`   ℹ️ Filtered: ${initialCount} -> ${pageData.length} items matched criteria`);
                }
            }

            const pageCount = Array.isArray(pageData) ? pageData.length : 0;

            allData = allData.concat(pageData);

            // Ambil cursor baru
            const newCursor = json?.meta?.cursor ?? null;
            hasMore = Boolean(json?.meta?.has_more);

            log(`   ✔ Data diterima (filtered) : ${pageCount}`);
            // log(`   ▶ Cursor respon : ${newCursor}`); // Optional: hide to reduce noise
            log(`   ▶ Masih ada data? : ${hasMore ? "Ya" : "Tidak"}`);
            log(`   ▶ Total terkumpul : ${allData.length}`);

            cursor = newCursor;
            page++;
        } catch (err) {
            log("❌ Terjadi kesalahan saat fetch data:");
            log(err.message);
            // Re-throw agar caller tau ini gagal
            throw err;
        }
    }

    return allData;
}

module.exports = {
    fetchAllData,
};
