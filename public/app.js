const startBtn = document.getElementById('startBtn');
const exportForm = document.getElementById('exportForm');
const terminal = document.getElementById('terminal');
const logContent = document.getElementById('logContent');
const resultSection = document.getElementById('resultSection');
const downloadLink = document.getElementById('downloadLink');
const resetBtn = document.getElementById('resetBtn');
const commandSelect = document.getElementById('command');
const statusIcon = document.getElementById('statusIcon');
const resultTitle = document.getElementById('resultTitle');
const resultMessage = document.getElementById('resultMessage');

// State Management
function setUIState(state, data = {}) {
    switch (state) {
        case 'IDLE':
            exportForm.style.display = 'block';
            startBtn.style.display = 'block';
            terminal.classList.add('hidden');
            resultSection.classList.add('hidden');
            logContent.innerHTML = '';
            break;
        case 'PROCESSING':
            startBtn.style.display = 'none'; // Lock form, keep visible but hide button? Or hide form?
            // User requirement: "Switch UI to processing mode" - let's keep inputs visible but disabled?
            // For improved UX let's hide the button and show terminal below form
            terminal.classList.remove('hidden');
            resultSection.classList.add('hidden');
            break;
        case 'SUCCESS':
            // startBtn.style.display = 'none';
            // terminal.classList.add('hidden'); // Optional: keep terminal or hide it? Let's keep it for context
            resultSection.classList.remove('hidden');

            // Update Content
            statusIcon.textContent = '✅';
            resultTitle.textContent = 'Export Selesai!';
            resultMessage.textContent = `File ${data.filename || 'Excel'} berhasil dibuat.`;
            downloadLink.href = data.downloadUrl;
            downloadLink.classList.remove('hidden');
            break;
        case 'ERROR':
            resultSection.classList.remove('hidden');

            // Update Content
            statusIcon.textContent = '❌';
            resultTitle.textContent = 'Proses Gagal';
            resultMessage.textContent = data.message || 'Terjadi kesalahan saat memproses data.';
            downloadLink.classList.add('hidden'); // CRITICAL FIX: Hide download button
            break;
    }
}

// Load commands
async function loadCommands() {
    try {
        const response = await fetch('/api/commands');
        if (!response.ok) throw new Error('Gagal memuat daftar command');

        const commands = await response.json();
        commandSelect.innerHTML = '';

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
        commandSelect.innerHTML = '<option disabled>Gagal memuat opsi</option>';
        console.error(error);
    }
}

loadCommands();

exportForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(exportForm);
    const params = new URLSearchParams(formData);

    setUIState('PROCESSING');
    addLog("🔵 Menghubungkan ke server...");
    addLog(`🚀 Memulai proses...`);

    // Disable inputs
    Array.from(exportForm.elements).forEach(el => el.disabled = true);

    const eventSource = new EventSource(`/api/stream?${params.toString()}`);

    eventSource.addEventListener('log', (event) => {
        const data = JSON.parse(event.data);
        addLog(data.message);
    });

    eventSource.addEventListener('done', (event) => {
        const data = JSON.parse(event.data);
        addLog("\n✅ PROSES SELESAI!");
        eventSource.close();

        // Slight delay for UX
        setTimeout(() => {
            setUIState('SUCCESS', data);
            // Re-enable inputs if needed or wait for reset
        }, 500);
    });

    eventSource.addEventListener('error', (event) => {
        let msg = "Terjadi kesalahan jaringan.";
        if (event.data) {
            try {
                const data = JSON.parse(event.data);
                msg = data.message;
            } catch (e) {
                msg = event.data;
            }
        }

        addLog(`❌ ERROR: ${msg}`);
        eventSource.close();

        // Show error state
        setTimeout(() => {
            setUIState('ERROR', { message: msg });
        }, 500);
    });

    eventSource.onerror = (err) => {
        // Native EventSource error (network down, etc)
        // If we already handled it via named event 'error', verify readyState
        if (eventSource.readyState === EventSource.CLOSED) return;

        // addLog("⚠️ Koneksi terputus.");
        eventSource.close();
        setUIState('ERROR', { message: "Koneksi ke server terputus." });
    };
});

resetBtn.addEventListener('click', () => {
    setUIState('IDLE');
    // Re-enable inputs
    Array.from(exportForm.elements).forEach(el => el.disabled = false);
});

function addLog(message) {
    const line = document.createElement('div');
    line.className = 'log-entry';
    line.textContent = message;
    logContent.appendChild(line);

    // Auto scroll with smooth animation
    logContent.scrollTo({
        top: logContent.scrollHeight,
        behavior: 'smooth'
    });
}
