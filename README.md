# INAPROC to Excel Exporter

**INAPROC to Excel Exporter** is a professional tool designed to streamline the extraction of RUP (Rencana Umum Pengadaan) data from the INAPROC API directly into formatted Excel files. It offers both a user-friendly Web Interface and a powerful Command Line Interface (CLI) for flexibility.

---

## 🚀 Key Features

*   **Comprehensive Data Extraction**: Easily export data for **Penyedia**, **Swakelola**, **Master Satker**, and **E-Purchasing**.
*   **Automated Excel Generation**: Produces neatly formatted `.xlsx` files with automatic timestamping.
*   **Real-time Progress Monitoring**: Watch the data fetching and processing status in real-time via the Web UI.
*   **Organized Storage**: All generated files are automatically saved to a dedicated `generated_files` directory.
*   **Modular Architecture**: Easily extensible for developers to add new API endpoints.

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

*   **Node.js** (Version 18 or higher)
    *   [Download Node.js](https://nodejs.org/)

---

## 🛠️ Installation

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/yogijowo/inaproc-to-excle.git
    cd inaproc-to-excle
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Configure API Access**
    Create a file named `config.js` in the root directory. This file is required to authenticate with the INAPROC API.
    
    **File: `config.js`**
    ```javascript
    module.exports = {
      BASE_URL: "https://data.inaproc.id",
      TOKEN: "YOUR_INAPROC_API_TOKEN_HERE",
    };
    ```
    > ⚠️ **Important**: Replace `YOUR_INAPROC_API_TOKEN_HERE` with your valid INAPROC API token.

---

## 🖥️ Usage

### Option 1: Web Interface (Recommended)

The Web Interface provides a visual dashboard to generate and download reports.

1.  **Start the Server**
    ```bash
    node server.js
    ```
2.  **Open in Browser**
    Navigate to [http://localhost:3000](http://localhost:3000).
3.  **Generate Report**
    - Select the desired **Command** (e.g., Penyedia, Swakelola).
    - Enter the **Kode KLPD** (e.g., D145).
    - Set the **Tahun** (Year).
    - Click **"Mulai Export"**.
4.  **Download**
    Once completed, a download button will appear.

### Option 2: Command Line Interface (CLI)

For automation or power users, use the CLI directly from your terminal.

**Syntax:**
```bash
node index.js [command] [kode_klpd] [tahun] [limit]
```

**Available Commands:**

| Command | Description | Example |
| :--- | :--- | :--- |
| `penyedia` | Export RUP Penyedia | `node index.js penyedia D145 2024 100` |
| `swakelola` | Export RUP Swakelola | `node index.js swakelola D145 2024 100` |
| `mastersatker` | Export Master Satker | `node index.js mastersatker D145 2024` |
| `epurchasing` | Export E-Purchasing | `node index.js epurchasing D145 2024 100` |

---

## 📂 Output Files

All generated Excel files are saved in the `generated_files` folder within the project directory.

**File Naming Convention:**
`[prefix]-[year]_[klpd]_[timestamp].xlsx`

*Example:* `generated_files/paket-penyedia-terumumkan-2024_D145_20260120_143000.xlsx`

---

## 👨‍💻 Developer Guide: Adding New Commands

The project uses a modular command structure located in `src/commands/`. To add a new endpoint:

1.  Create a new file in `src/commands/` (e.g., `my-new-endpoint.js`).
2.  Export the configuration object:

    ```javascript
    module.exports = {
        name: 'my-command',          // Command name used in CLI/Web
        description: 'Export My Data', 
        endpoint: "/api/v1/new-endpoint", // API Endpoint path
        sheetName: "MY DATA SHEET",  // Excel Sheet Name
        filenamePrefix: "my-data",   // Output filename prefix
        defaultLimit: 100            // Optional default limit
    };
    ```
3.  Restart the application. The new command will automatically appear in the CLI help and Web Interface.

---

## ❓ Troubleshooting

**`Error: Cannot find module '...'`**
> Run `npm install` to ensure all dependencies are downloaded.

**`401 Unauthorized` or API Errors**
> Check your `config.js`. Ensure the `TOKEN` is correct and valid.

**File not created**
> Ensure the application has write permissions to the folder. The `generated_files` directory is created automatically.

---
*Built for simplicity and efficiency.*
