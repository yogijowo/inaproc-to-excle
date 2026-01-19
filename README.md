# INAPROC to Excel Exporter

Aplikasi ini berfungsi untuk **mengambil data RUP dari API INAPROC**, untuk saat ini hanya Penyedia, Swakelola, Master Satker, dan E-Purchasing lalu **menyimpannya ke file Excel (.xlsx)**.

---

## 1. Apa yang Akan Anda Dapatkan?

Setelah mengikuti panduan ini, Anda bisa:

- Mengambil data RUP **Penyedia** ke Excel
- Mengambil data RUP **Swakelola** ke Excel
- Mengambil **Master Satker** ke Excel
- Mengambil **E-Purchasing** ke Excel
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

---

## 4. Install Dependency (Sekali Saja)

Di dalam folder aplikasi, jalankan:

```bash
npm install
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

## 7. Cara Menggunakan (Web Interface & CLI)

Aplikasi ini sekarang memiliki **Web Interface** (tampilan browser) yang mudah digunakan, selain CLI.

### 7.A Menggunakan Web Interface (Recommended) 🌐

1. Jalankan perintah:
   ```bash
   node server.js
   ```
2. Buka browser dan kunjungi:
   [http://localhost:3000](http://localhost:3000)
3. Isi form, klik "Mulai Export", dan tunggu hingga tombol download muncul.

---

### 7.B Menggunakan CLI (Terminal) 💻

Anda bisa menggunakan perintah pusat `index.js`:

`node index.js [perintah] [kode_klpd] [tahun] [limit]`

| Perintah | Fungsi | Contoh |
| :--- | :--- | :--- |
| `penyedia` | Export RUP Penyedia | `node index.js penyedia D145 2026 100` |
| `swakelola` | Export RUP Swakelola | `node index.js swakelola D145 2026 100` |
| `satker` | Export Master Satker | `node index.js satker D145 2026` |
| `epurchasing` | Export E-Purchasing | `node index.js epurchasing D145 2026 100` |

### 7.C Cara Lama (Legacy)

Jika masih ingin menggunakan cara lama, file-file ini tetap berfungsi:

- **Penyedia**: `node penyedia.js D145 2026 100`
- **Swakelola**: `node swakelola.js D145 2026 100`
- **Satker**: `node mastersatker.js D145 2026`
- **E-Purchasing**: `node e-purchasing-v6.js D145 2026 100`

---

## 8. Hasil File Excel
 
Setelah selesai, file Excel otomatis dibuat di folder yang sama.
 
Contoh nama file:
 
```text
paket-penyedia-terumumkan-2026_D145_20260114_101530.xlsx
paket-swakelola-terumumkan-2026_D145_20260114_102010.xlsx
mastersatker-2026_D145_20260114_102245.xlsx
list-paket-e-purchasing-v6-2026_D145_20260114_102500.xlsx
```
 
File dapat dibuka dengan:
 
- Microsoft Excel
- LibreOffice Calc
- Google Sheets (upload)
 
---
 
## 9. Jika Terjadi Error
 
### ❌ `node: command not found`
 
➡️ Node.js belum terinstall atau belum restart PC
 
### ❌ `401 / 403 Unauthorized` or `API Request Failed`
 
➡️ Token salah atau sudah kedaluwarsa. Periksa file `config.js`.
 
### ❌ File Excel tidak muncul
 
➡️ Pastikan folder punya izin tulis
 
---
 
## 10. Tips untuk Pengguna Awam
 
- **Web Interface**: Paling mudah, tinggal klik-klik.
- **CLI**: Lebih cepat untuk pengguna mahir.
 
---
 
## 11. Struktur Kode (Untuk Developer)
 
- `server.js` : Backend untuk Web Interface (Express + SSE).
- `public/` : Frontend files (HTML, CSS, JS).
- `index.js` : Entry point untuk CLI.
- `src/api.js` : Logic untuk fetch data dan pagination.
- `src/excel.js` : Logic untuk export ke Excel.
- `src/utils.js` : Helper functions.
- `config.js` : Konfigurasi API (ignored by git).

---

📌 **Kesimpulan**

Jika Anda bisa:

- Install Node.js
- Copy–paste perintah

Maka Anda **PASTI BISA** menggunakan aplikasi ini 😊
