module.exports = {
    name: 'tender',
    description: 'Export SPSE Tender',
    endpoint: "/api/v1/tender",
    sheetName: "SPSE TENDER",
    filenamePrefix: "spse-tender",
    allowedQueryParams: ["limit", "cursor"], // Only these params are allowed by API
    clientSideFilter: (item, params) => {
        // Filter by KLPD Code
        if (params.KODE_KLPD && item.klpd_kode !== params.KODE_KLPD) {
            return false;
        }
        // Filter by Year (tahun_anggaran is usually an array of strings like ["2024"])
        if (params.TAHUN) {
            const tahunStr = String(params.TAHUN);
            if (Array.isArray(item.tahun_anggaran)) {
                return item.tahun_anggaran.includes(tahunStr);
            }
            return item.tahun_anggaran == tahunStr;
        }
        return true;
    }
};
