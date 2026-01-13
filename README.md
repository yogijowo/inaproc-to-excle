# INAPROC to Excel Exporter

Project ini digunakan untuk **mengambil data RUP INAPROC (Penyedia & Swakelola)** menggunakan **API berbasis cursor** dan **menyimpannya langsung ke file Excel (.xlsx)**.

Cocok untuk:

- Audit data pengadaan
- Rekap RUP per K/L/PD
- Analisis lanjutan di Excel
- Arsip data resmi

---

## 1. Prasyarat

Pastikan software berikut sudah terpasang:

- **Node.js v18+** (karena menggunakan `fetch` bawaan)
- **npm**

Cek versi:

```bash
node -v
npm -v
```

---

## 2. Instalasi Project

### 2.1 Clone / Siapkan Folder

```bash
git clone <repo-anda>
cd inaproc-to-excel
```

Atau jika tanpa Git, cukup buat folder lalu masuk ke folder tersebut.

---

### 2.2 Install Dependency

```bash
npm install xlsx
```

Dependency yang digunakan:

- `xlsx` → untuk membuat file Excel

---

## 3. Konfigurasi

### 3.1 File `config.js`

File ini **WAJIB ADA** dan berisi token serta base URL API.

```js
module.exports = {
  BASE_URL: "https://data.inaproc.id",
  TOKEN: "ISI_TOKEN_ANDA",
};
```

> ⚠️ **Penting**

- Jangan commit file ini ke GitHub
- Masukkan `config.js` ke `.gitignore`

---

### 3.2 File `.gitignore`

```text
node_modules/
config.js
```

---

## 4. Struktur Folder

```text
inaproc-to-excel/
├── node_modules/
├── config.js
├── penyedia.js
├── swakelola.js
├── mastersatker.js
├── package.json
├── package-lock.json
└── .gitignore
```

---

## 5. Cara Penggunaan

### 5.1 Export Paket Penyedia

```bash
node penyedia.js
```

Output di terminal:

```text
Ambil 100 data | Total: 100
Ambil 100 data | Total: 200
...
SELESAI
File dibuat: paket-penyedia-terumumkan-2026_YYYYMMDD_HHMMSS.xlsx
```

---

### 5.2 Export Paket Swakelola

```bash
node swakelola.js
```

Output:

```text
Ambil 50 data | Total: 50
...
SELESAI
File dibuat: paket-swakelola-terumumkan-2026_YYYYMMDD_HHMMSS.xlsx
```

---

## 6. Format File Excel

- Format: `.xlsx`
- Sheet: `RUP 2026`
- Kolom otomatis sesuai field JSON API
- Filename menggunakan timestamp agar tidak tertimpa

Contoh nama file:

```text
paket-swakelola-terumumkan-2026_20260114_093015.xlsx
```

---

## 7. Kustomisasi

Beberapa bagian yang bisa diubah langsung di file JS:

### 7.1 Ganti Tahun Anggaran

```js
tahun = 2026;
```

### 7.2 Ganti Kode KLPD

```js
kode_klpd = D145;
```

### 7.3 Ganti Limit per Request

```js
limit = 100;
```

---

## 8. Keamanan

- Token disimpan terpisah (`config.js`)
- Tidak hardcode credential
- Aman digunakan di banyak script
- Cocok untuk lingkungan kerja tim

---

## 9. Troubleshooting

### 9.1 Error 401 / 403

- Pastikan token valid
- Pastikan scope token benar

### 9.2 File Excel Tidak Terbuat

- Pastikan `xlsx` terinstall
- Pastikan permission folder writeable

---

## 10. Rencana Pengembangan (Opsional)

- Export per Satker (multi sheet)
- Format rupiah otomatis
- Filter metode pengadaan
- Simpan ke database MySQL
- Jalankan via cron job

---

## 11. Lisensi

Digunakan untuk kebutuhan internal, audit, dan analisis data pengadaan.

---

📌 **Catatan**
Project ini mematuhi mekanisme pagination berbasis `cursor` sesuai API INAPROC dan aman untuk data besar.
