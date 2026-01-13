# INAPROC to Excel Exporter

Aplikasi ini berfungsi untuk **mengambil data RUP dari API INAPROC** (Penyedia, Swakelola, dan Master Satker) lalu **menyimpannya ke file Excel (.xlsx)**.

---

## 1. Apa yang Akan Anda Dapatkan?

Setelah mengikuti panduan ini, Anda bisa:

- Mengambil data RUP **Penyedia** ke Excel
- Mengambil data RUP **Swakelola** ke Excel
- Mengambil **Master Satker** ke Excel
- Menjalankan perintah langsung dari **Command Prompt / Terminal**
- Menghasilkan file Excel otomatis dengan nama & timestamp

---

## 2. Persiapan Awal (WAJIB)

### 2.1 Install Node.js

Aplikasi ini membutuhkan **Node.js versi 18 atau lebih baru**.

1. Buka browser
2. Kunjungi: [https://nodejs.org](https://nodejs.org)
3. Download **LTS Version**
4. Install (klik Next → Next sampai selesai)

### 2.2 Cek Instalasi

#### Windows

Buka **Command Prompt** atau **PowerShell**:

```bat
node -v
npm -v
```

#### macOS / Linux

Buka **Terminal**:

```bash
node -v
npm -v
```

Jika muncul versi (misalnya `v18.x.x`), berarti berhasil.

---

## 3. Menyiapkan Folder Aplikasi

Anda dapat menyiapkan aplikasi dengan **dua cara**. Untuk pemula, **disarankan menggunakan cara A (Clone dari GitHub)**.

---

### 3.A Cara Paling Mudah (Clone dari GitHub) ✅

1. Buka **Command Prompt / PowerShell (Windows)** atau **Terminal (macOS/Linux)**
2. Jalankan perintah berikut:

```bash
git clone https://github.com/yogijowo/inaproc-to-excle.git
```

3. Masuk ke folder project:

```bash
cd inaproc-to-excle
```

> Jika muncul pesan error `git is not recognized`, silakan install Git terlebih dahulu dari:
> [https://git-scm.com/downloads](https://git-scm.com/downloads)

---

### 3.B Cara Manual (Tanpa Git)

Jika tidak ingin menggunakan Git:

1. Buka halaman:
   [https://github.com/yogijowo/inaproc-to-excle](https://github.com/yogijowo/inaproc-to-excle)
2. Klik tombol **Code → Download ZIP**
3. Extract ZIP
4. Buka folder hasil extract

---

## 4. Install Dependency (Sekali Saja)

Di dalam folder aplikasi, jalankan:

```bash
npm init -y
npm install xlsx
```

Tunggu sampai selesai.

---

## 4. Install Dependency (Sekali Saja)

Di dalam folder aplikasi, jalankan:

```bash
npm init -y
npm install xlsx
```

Tunggu sampai selesai.

---

## 5. Membuat File Konfigurasi (PENTING)

### 5.1 Buat File `config.js`

File ini menyimpan **TOKEN API** dan **BASE URL**.

Buat file `config.js`, lalu isi:

```js
module.exports = {
  BASE_URL: "https://data.inaproc.id",
  TOKEN: "ISI_TOKEN_INAPROC_ANDA",
};
```

> ⚠️ Ganti `ISI_TOKEN_INAPROC_ANDA` dengan token asli Anda

---

### 5.2 Buat File `.gitignore` (Opsional tapi Disarankan)

```text
node_modules/
config.js
```

Agar token tidak tersebar jika pakai Git.

---

## 6. File yang Digunakan

Pastikan folder berisi file berikut:

```text
inaproc-to-excel/
├── node_modules/
├── config.js
├── penyedia-cli.js
├── swakelola-cli.js
├── mastersatker-cli.js
├── package.json
├── package-lock.json
└── .gitignore
```

---

## 7. Cara Menggunakan (SANGAT MUDAH)

### 7.1 Export Paket Penyedia

```bash
node penyedia-cli.js D145 2026 100
```

Keterangan:

- `D145` → kode KLPD
- `2026` → tahun anggaran
- `100` → jumlah data per halaman (limit)

---

### 7.2 Export Paket Swakelola

```bash
node swakelola-cli.js D145 2026 100
```

---

### 7.3 Export Master Satker

```bash
node mastersatker-cli.js D145 2026
```

---

## 8. Hasil File Excel

Setelah selesai, file Excel otomatis dibuat di folder yang sama.

Contoh nama file:

```text
paket-penyedia-terumumkan-2026_D145_20260114_101530.xlsx
paket-swakelola-terumumkan-2026_D145_20260114_102010.xlsx
mastersatker-2026_D145_20260114_102245.xlsx
```

File dapat dibuka dengan:

- Microsoft Excel
- LibreOffice Calc
- Google Sheets (upload)

---

## 9. Jika Terjadi Error

### ❌ `node: command not found`

➡️ Node.js belum terinstall atau belum restart PC

### ❌ `401 / 403 Unauthorized`

➡️ Token salah atau sudah kedaluwarsa

### ❌ File Excel tidak muncul

➡️ Pastikan folder punya izin tulis

---

## 10. Tips untuk Pengguna Awam

- Tidak perlu mengubah kode jika hanya ingin ambil data
- Cukup ganti:

  - kode KLPD
  - tahun

- Jalankan ulang perintah

---

## 11. Catatan Teknis (Opsional)

- API menggunakan pagination **cursor**
- Aman untuk ribuan data
- Tidak membebani memori berlebihan

---

## 12. Pengembangan Selanjutnya (Opsional)

- 1 perintah export semua (penyedia + swakelola + satker)
- Excel multi-sheet
- Jadwal otomatis (cron)
- Import ke database

---

📌 **Kesimpulan**

Jika Anda bisa:

- Install Node.js
- Copy–paste perintah

Maka Anda **PASTI BISA** menggunakan aplikasi ini 😊

Jika masih bingung, cukup jalankan satu perintah dan lihat file Excel muncul.
