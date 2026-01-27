# INAPROC to Excel Exporter

**INAPROC to Excel Exporter** adalah alat profesional yang dirancang untuk memudahkan pengambilan data RUP (Rencana Umum Pengadaan) dari API INAPROC langsung menjadi file Excel yang rapi. Aplikasi ini menyediakan **Tampilan Web (Web Interface)** yang mudah digunakan dan **Command Line Interface (CLI)** untuk pengguna tingkat lanjut.

![Tampilan Aplikasi](screenshot/image_2.png)

---

## 🚀 Fitur Utama

*   **Ekspor Data Lengkap**: Mendukung ekspor data untuk **Penyedia**, **Swakelola**, **Master Satker**, dan **E-Purchasing**.
*   **Otomatisasi Excel**: Menghasilkan file `.xlsx` yang terformat rapi dengan penamaan otomatis.
*   **Monitoring Real-time**: Pantau status pengambilan data secara langsung melalui tampilan Web.
*   **Penyimpanan Teratur**: Semua file hasil ekspor otomatis tersimpan di folder `generated_files`.
*   **Mudah Dikembangkan**: Struktur kode yang modular memudahkan pengembang untuk menambah fitur baru.

---

## 💻 Persiapan & Instalasi (Langkah demi Langkah)

Sebelum menggunakan aplikasi ini, Anda wajib menginstall **Node.js**. Berikut panduan lengkap untuk setiap sistem operasi.

### 1. Install Node.js

#### 🪟 Windows
1.  Buka website resmi: [https://nodejs.org/](https://nodejs.org/)
2.  Download versi **LTS** (Recommended For Most Users).
3.  Buka file installer (`.msi`) yang sudah didownload.
4.  Ikuti petunjuk instalasi (klik **Next**, centang "I accept", klik **Next** terus hingga **Install**).
5.  Tunggu hingga selesai, lalu klik **Finish**.
6.  Untuk mengecek keberhasilan:
    *   Tekan tombol `Windows + R`, ketik `cmd`, lalu Enter.
    *   Ketik `node -v` dan tekan Enter. Jika muncul angka versi (misal `v18.16.0`), berarti berhasil.

#### 🍎 macOS
1.  Buka website resmi: [https://nodejs.org/](https://nodejs.org/)
2.  Download versi **LTS** macOS Installer (`.pkg`).
3.  Jalankan file installer dan ikuti instruksi di layar.
4.  Untuk mengecek keberhasilan:
    *   Buka aplikasi **Terminal** (bisa dicari di Spotlight `Cmd + Spasi`).
    *   Ketik `node -v` dan tekan Enter.

#### 🐧 Linux (Ubuntu/Debian)
1.  Buka Terminal.
2.  Jalankan perintah berikut untuk mengupdate dan menginstall Node.js:
    ```bash
    sudo apt update
    sudo apt install nodejs npm -y
    ```
3.  Cek versi dengan mengetik `node -v`.

---

### 2. Download & Siapkan Aplikasi

Setelah Node.js terinstall, lakukan langkah berikut:

1.  **Download Aplikasi**
    *   **Cara Mudah**: Download file ZIP dari repository ini, lalu ekstrak (unzip) foldernya.
    *   **Cara Developer (Git)**:
        Buka Terminal/CMD, lalu ketik:
        ```bash
        git clone https://github.com/yogijowo/inaproc-to-excle.git
        cd inaproc-to-excle
        ```

2.  **Install Library Pendukung**
    Masuk ke dalam folder aplikasi (pastikan Anda berada di folder yang ada file `package.json`), lalu jalankan perintah:
    ```bash
    npm install
    ```
    *(Tunggu hingga proses selesai)*

3.  **Konfigurasi Token (PENTING)**
    Aplikasi butuh izin untuk mengakses API INAPROC.
    *   Buat file baru bernama `config.js` di folder utama aplikasi.
    *   Isi file tersebut dengan kode berikut:
    
    ```javascript
    module.exports = {
      BASE_URL: "https://data.inaproc.id",
      TOKEN: "GANTI_DENGAN_TOKEN_INAPROC_ANDA_DISINI",
    };
    ```
    > ⚠️ **Penting**: Ganti tulisan `GANTI_DENGAN_TOKEN_INAPROC_ANDA_DISINI` dengan Token API INAPROC asli milik Anda.

---

## 🖥️ Cara Penggunaan

### Opsi 1: Menggunakan Tampilan Web (Direkomendasikan) ✅

Cara ini paling mudah dan cocok untuk semua pengguna.

1.  Buka Terminal/CMD di dalam folder aplikasi.
2.  Jalankan perintah:
    ```bash
    node server.js
    ```
3.  Buka browser (Chrome, Firefox, Edge) dan kunjungi:
    👉 **[http://localhost:3000](http://localhost:3000)**
4.  Di halaman web:
    *   Pilih **Jenis Data** (Penyedia, Swakelola, dll).
    *   Masukkan **Kode KLPD** (contoh: `D145`).
    *   Masukkan **Tahun Anggaran** (contoh: `2024`).
    *   Klik tombol **"Mulai Export"**.
5.  Tunggu proses bar berjalan hingga data selesai diambil.
6.  Tombol **Download Excel** akan muncul otomatis.

---

### Opsi 2: Menggunakan Command Line (Untuk Ahli) 🛠️

Jalankan perintah berikut di Terminal/CMD:

**Format:**
```bash
node index.js [perintah] [kode_klpd] [tahun] [limit]
```

**Daftar Perintah:**

| Perintah | Keterangan | Contoh Penggunaan |
| :--- | :--- | :--- |
| `penyedia` | Tarik data RUP Penyedia | `node index.js penyedia D145 2024 100` |
| `swakelola` | Tarik data RUP Swakelola | `node index.js swakelola D145 2024 100` |
| `mastersatker` | Tarik data Master Satker | `node index.js mastersatker D145 2024` |
| `epurchasing` | Tarik data E-Purchasing | `node index.js epurchasing D145 2024 100` |

---

## 📂 Di Mana File Excel Saya?

Semua file Excel yang berhasil dibuat akan tersimpan otomatis di dalam folder:

📂 **`generated_files`**

Pastikan Anda membuka folder ini untuk melihat hasil download.

---

## 👨‍💻 Panduan Developer: Menambah Fitur Baru

Project ini menggunakan sistem perintah modular. Untuk menambah endpoint API baru:

1.  Buat file `.js` baru di folder `src/commands/` (misal: `tender.js`).
2.  Gunakan format berikut:

    ```javascript
    module.exports = {
        name: 'tender',              // Nama perintah untuk CLI/Web
        description: 'Export Tender', 
        endpoint: "/api/v1/tender",  // Endpoint API INAPROC
        sheetName: "DATA TENDER",    // Nama Sheet di Excel
        filenamePrefix: "data-tender", // Awalan nama file
    };
    ```
3.  Restart aplikasi. Perintah baru otomatis muncul.

---

## ❓ Pemecahan Masalah (Troubleshooting)

**Masalah: `node: command not found`**
> Artinya Node.js belum terinstall dengan benar. Coba install ulang dan restart komputer.

**Masalah: `Error: Cannot find module`**
> Anda belum menjalankan `npm install`. Jalankan perintah itu dulu.

**Masalah: `401 Unauthorized` atau Error API lainnya**
> Token API Anda salah atau kadaluarsa. Cek kembali file `config.js`.

**Masalah: File Excel tidak muncul**
> Cek folder `generated_files`. Jika tidak ada, pastikan folder aplikasi tidak diproteksi (Read-only).

---
*Dibuat untuk mempermudah pekerjaan Anda.*
