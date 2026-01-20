const startBtn = document.getElementById('startBtn');
const exportForm = document.getElementById('exportForm');
const terminal = document.getElementById('terminal');
const logContent = document.getElementById('logContent');
const downloadSection = document.getElementById('downloadSection');
const downloadLink = document.getElementById('downloadLink');
const resetBtn = document.getElementById('resetBtn');
const card = document.querySelector('.card');
const commandSelect = document.getElementById('command');

// Load commands on startup
async function loadCommands() {
    try {
        const response = await fetch('/api/commands');
        if (!response.ok) throw new Error('Gagal memuat daftar command');

        const commands = await response.json();

        // Clear "Loading..." option
        commandSelect.innerHTML = '';

        // Add default option if needed or just select the first one
        if (commands.length === 0) {
            const option = document.createElement('option');
            option.text = "Tidak ada command tersedia";
            commandSelect.add(option);
            return;
        }

        commands.forEach(cmd => {
            const option = document.createElement('option');
            option.value = cmd.name;
            option.textContent = cmd.description;
            commandSelect.appendChild(option);
        });

    } catch (error) {
        console.error('Error loading commands:', error);
        commandSelect.innerHTML = '<option disabled>Gagal memuat opsi</option>';
        addLog(`❌ Error loading commands: ${error.message}`);
    }
}

loadCommands();

exportForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(exportForm);
    const params = new URLSearchParams(formData);

    // Switch UI to processing mode
    card.classList.add('collapsed');
    terminal.classList.remove('hidden');
    downloadSection.classList.add('hidden');
    logContent.innerHTML = '';
    addLog("🔵 Menghubungkan ke server...");

    // Start SSE connection
    const eventSource = new EventSource(`/api/stream?${params.toString()}`);

    eventSource.addEventListener('log', (event) => {
        const data = JSON.parse(event.data);
        addLog(data.message);
    });

    eventSource.addEventListener('done', (event) => {
        const data = JSON.parse(event.data);
        addLog("\n✅ PROSES SELESAI!");
        eventSource.close();
        showDownload(data.downloadUrl);
    });

    eventSource.addEventListener('error', (event) => {
        // Standard error handling for EventSource
        if (event.data) {
            const data = JSON.parse(event.data);
            addLog(`❌ ERROR: ${data.message}`);
        } else {
            addLog(`⚠️ Koneksi terputus atau terjadi kesalahan jaringan.`);
        }
        eventSource.close();

        // Show back button even on error
        setTimeout(() => {
            downloadSection.classList.remove('hidden');
            downloadLink.style.display = 'none'; // Hide download button if error
            document.querySelector('.success-icon').textContent = '⚠️';
            document.querySelector('h3').textContent = 'Proses Berhenti';
            document.querySelector('p').textContent = 'Silakan coba lagi atau cek log.';
        }, 1000);
    });
});

resetBtn.addEventListener('click', () => {
    card.classList.remove('collapsed');
    terminal.classList.add('hidden');
    downloadSection.classList.add('hidden');
    // Reset texts
    downloadLink.style.display = 'inline-block';
    document.querySelector('.success-icon').textContent = '✅';
    document.querySelector('h3').textContent = 'Proses Selesai!';
    document.querySelector('p').textContent = 'File Excel Anda siap diunduh.';
});

function addLog(message) {
    const line = document.createElement('div');
    line.textContent = message;
    logContent.appendChild(line);
    // Auto scroll to bottom
    terminal.scrollTop = terminal.scrollHeight; // Scroll container
    logContent.scrollTop = logContent.scrollHeight; // Scroll content div just in case
}

function showDownload(url) {
    downloadLink.href = url;
    downloadSection.classList.remove('hidden');
}
