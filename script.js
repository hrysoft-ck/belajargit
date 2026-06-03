const patients = [
    {
        id: 1,
        name: "Budi Santoso",
        room: "ICU - Bed 1",
        tensi: "120/80",
        nadi: 78,
        saturasi: 98,
        infus: { sisa: 350, total: 500, rate: "20 tpm" },
        syringe: { sisa: 12.5, total: 50, rate: "2 ml/jam", obat: "Dopamin" },
        status: "normal"
    },
    {
        id: 2,
        name: "Siti Aminah",
        room: "ICU - Bed 2",
        tensi: "145/90",
        nadi: 115,
        saturasi: 93,
        infus: { sisa: 85, total: 500, rate: "30 tpm" },
        syringe: { sisa: 45, total: 50, rate: "1 ml/jam", obat: "Norepinefrin" },
        status: "warning"
    },
    {
        id: 3,
        name: "Agus Pratama",
        room: "ICU - Bed 3",
        tensi: "85/50",
        nadi: 135,
        saturasi: 88,
        infus: { sisa: 40, total: 500, rate: "40 tpm" },
        syringe: { sisa: 4.5, total: 50, rate: "5 ml/jam", obat: "Fentanyl" },
        status: "critical"
    },
    {
        id: 4,
        name: "Dewi Lestari",
        room: "ICU - Bed 4",
        tensi: "110/70",
        nadi: 82,
        saturasi: 99,
        infus: { sisa: 400, total: 500, rate: "15 tpm" },
        syringe: { sisa: 30, total: 50, rate: "1.5 ml/jam", obat: "Midazolam" },
        status: "normal"
    },
    {
        id: 5,
        name: "Rizky Firmansyah",
        room: "ICU - Bed 5",
        tensi: "130/85",
        nadi: 90,
        saturasi: 96,
        infus: { sisa: 250, total: 500, rate: "20 tpm" },
        syringe: null,
        status: "normal"
    },
    {
        id: 6,
        name: "Maria Goretti",
        room: "ICU - Bed 6",
        tensi: "95/60",
        nadi: 105,
        saturasi: 94,
        infus: { sisa: 120, total: 500, rate: "30 tpm" },
        syringe: { sisa: 8.2, total: 50, rate: "3 ml/jam", obat: "Propofol" },
        status: "warning"
    }
];

function updateTime() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    document.getElementById('datetime').innerText = now.toLocaleDateString('id-ID', options);
}

setInterval(updateTime, 1000);
updateTime();

function renderDashboard() {
    const grid = document.getElementById('patient-grid');
    
    // We update innerHTML smartly to prevent recreating DOM if possible, 
    // but for simplicity we will recreate here, or we can just update values.
    // For a dynamic modern feel, we just recreate.
    
    let html = '';

    patients.forEach(patient => {
        let infusPercent = (patient.infus.sisa / patient.infus.total) * 100;
        let infusColor = infusPercent < 20 ? 'var(--status-critical)' : (infusPercent < 40 ? 'var(--status-warning)' : 'var(--accent-green)');

        let syringeHtml = '';
        if (patient.syringe) {
            let syringePercent = (patient.syringe.sisa / patient.syringe.total) * 100;
            let syringeColor = syringePercent < 20 ? 'var(--status-critical)' : (syringePercent < 40 ? 'var(--status-warning)' : 'var(--accent-yellow)');
            
            syringeHtml = `
            <div class="metric-item m-syringe">
                <div class="metric-header">
                    <i class="fa-solid fa-syringe metric-icon"></i>
                    <span>Syringe Pump (${patient.syringe.obat})</span>
                </div>
                <div class="metric-value">
                    ${patient.syringe.sisa.toFixed(1)} <span class="metric-unit">ml</span>
                </div>
                <div class="progress-bar-container">
                    <div class="progress-bar" style="width: ${syringePercent}%; background-color: ${syringeColor}; box-shadow: 0 0 10px ${syringeColor}"></div>
                </div>
                <div class="metric-sub">
                    <span>Sisa: <strong>${patient.syringe.sisa.toFixed(1)} ml</strong></span>
                    <span>Rate: <strong>${patient.syringe.rate}</strong></span>
                </div>
            </div>`;
        }

        html += `
        <div class="patient-card status-${patient.status}" id="patient-${patient.id}">
            <div class="status-indicator"></div>
            <div class="patient-header">
                <div class="patient-info">
                    <h2>${patient.name}</h2>
                    <p>MR: ${100000 + patient.id} | Usia: ${Math.floor(Math.random() * 40 + 30)} Thn</p>
                </div>
                <div class="room-badge">${patient.room}</div>
            </div>

            <div class="metrics-grid">
                <div class="metric-item m-tensi">
                    <div class="metric-header">
                        <i class="fa-solid fa-heart-circle-bolt metric-icon"></i>
                        <span>Tensi</span>
                    </div>
                    <div class="metric-value">
                        ${patient.tensi} <span class="metric-unit">mmHg</span>
                    </div>
                </div>

                <div class="metric-item m-nadi">
                    <div class="metric-header">
                        <i class="fa-solid fa-heart-pulse metric-icon"></i>
                        <span>Nadi</span>
                    </div>
                    <div class="metric-value">
                        ${patient.nadi} <span class="metric-unit">bpm</span>
                    </div>
                </div>

                <div class="metric-item m-saturasi">
                    <div class="metric-header">
                        <i class="fa-solid fa-lungs metric-icon"></i>
                        <span>SpO2</span>
                    </div>
                    <div class="metric-value">
                        ${patient.saturasi} <span class="metric-unit">%</span>
                    </div>
                </div>

                <div class="metric-item m-infus">
                    <div class="metric-header">
                        <i class="fa-solid fa-droplet metric-icon"></i>
                        <span>Infus (IV Fluid)</span>
                    </div>
                    <div class="metric-value">
                        ${Math.floor(patient.infus.sisa)} <span class="metric-unit">ml</span>
                    </div>
                    <div class="progress-bar-container">
                        <div class="progress-bar" style="width: ${infusPercent}%; background-color: ${infusColor}; box-shadow: 0 0 10px ${infusColor}"></div>
                    </div>
                    <div class="metric-sub">
                        <span>Sisa: <strong>${Math.floor(patient.infus.sisa)} ml</strong> / ${patient.infus.total} ml</span>
                        <span>Rate: <strong>${patient.infus.rate}</strong></span>
                    </div>
                </div>

                ${syringeHtml}
            </div>
        </div>`;
    });

    grid.innerHTML = html;
    
    // Update header badges
    const counts = { normal: 0, warning: 0, critical: 0 };
    patients.forEach(p => counts[p.status]++);
    
    document.getElementById('count-normal').innerText = counts.normal;
    document.getElementById('count-warning').innerText = counts.warning;
    document.getElementById('count-critical').innerText = counts.critical;
}

// Simulate real-time updates
setInterval(() => {
    // Randomly fluctuate vitals
    patients.forEach(p => {
        // Randomly skip updating to make it feel more organic
        if (Math.random() > 0.3) {
            // Nadi fluctuation
            p.nadi += Math.floor(Math.random() * 5) - 2;
            if(p.nadi > 160) p.nadi = 160;
            if(p.nadi < 40) p.nadi = 40;
            
            // Saturasi fluctuation
            if(Math.random() > 0.5) {
                p.saturasi += Math.floor(Math.random() * 3) - 1;
                if (p.saturasi > 100) p.saturasi = 100;
                if (p.saturasi < 70) p.saturasi = 70;
            }

            // Tensi fluctuation (simulated NIBP update occasionally)
            if(Math.random() > 0.8) {
                let [sys, dia] = p.tensi.split('/').map(Number);
                sys += Math.floor(Math.random() * 7) - 3;
                dia += Math.floor(Math.random() * 5) - 2;
                p.tensi = `${sys}/${dia}`;
            }

            // Reduce infus and syringe fluid levels continuously
            if (p.infus.sisa > 0) p.infus.sisa -= Math.random() * 2;
            if (p.infus.sisa < 0) p.infus.sisa = 0;
            
            if (p.syringe && p.syringe.sisa > 0) {
                p.syringe.sisa -= Math.random() * 0.2;
                if (p.syringe.sisa < 0) p.syringe.sisa = 0;
            }
            
            // Re-evaluate status
            let isCritical = p.saturasi < 90 || p.nadi > 130 || p.nadi < 50 || p.infus.sisa < 30 || (p.syringe && p.syringe.sisa < 5);
            let isWarning = p.saturasi < 95 || p.nadi > 110 || p.nadi < 60 || p.infus.sisa < 100 || (p.syringe && p.syringe.sisa < 10);
            
            if (isCritical) {
                p.status = 'critical';
            } else if (isWarning) {
                p.status = 'warning';
            } else {
                p.status = 'normal';
            }
        }
    });
    
    renderDashboard();
}, 2500); // update every 2.5 seconds for dynamic feel

// Initial render
renderDashboard();
