// Compare Page Logic

// Dealer data (same as in competitors.js)
const dealerDatabase = [
    {
        id: 1,
        name: "Boston Volvo Cars",
        distance: 2.4,
        inventory: 197,
        sessionsPercentage: 21,
        overlapSessions: 482,
        franchiseType: "Franchise",
        brands: ["Volvo"],
        logoColor: "#1B365D",
        lastActivity: "2024-10-20"
    },
    {
        id: 2,
        name: "Toyota of Watertown",
        distance: 8.5,
        inventory: 197,
        sessionsPercentage: 14,
        overlapSessions: 482,
        franchiseType: "Franchise",
        brands: ["Toyota"],
        logoColor: "#EB0A1E",
        lastActivity: "2024-10-19"
    },
    {
        id: 3,
        name: "Jaffarian Toyota Volvo",
        distance: 6.2,
        inventory: 205,
        sessionsPercentage: 4,
        overlapSessions: 709,
        franchiseType: "Franchise",
        brands: ["Toyota", "Volvo"],
        logoColor: "#000000",
        lastActivity: "2024-10-21"
    },
    {
        id: 4,
        name: "Merchants Automotive Group",
        distance: 6.2,
        inventory: 197,
        sessionsPercentage: 12,
        overlapSessions: 174,
        franchiseType: "Independent",
        brands: ["Multi-brand"],
        logoColor: "#2B4C8C",
        lastActivity: "2024-10-18"
    },
    {
        id: 5,
        name: "Boston Volvo Cars Allston",
        distance: 6.2,
        inventory: 197,
        sessionsPercentage: 14,
        overlapSessions: 252,
        franchiseType: "Franchise",
        brands: ["Volvo"],
        logoColor: "#1B365D",
        lastActivity: "2024-10-17"
    },
    {
        id: 6,
        name: "Taktak Auto Group",
        distance: 12.8,
        inventory: 78,
        sessionsPercentage: 2,
        overlapSessions: 174,
        franchiseType: "Independent",
        brands: ["Multi-brand"],
        logoColor: "#333333",
        lastActivity: "2024-10-16"
    },
    {
        id: 7,
        name: "Marlboro Nissan",
        distance: 26.4,
        inventory: 185,
        sessionsPercentage: 12,
        overlapSessions: 98,
        franchiseType: "Franchise",
        brands: ["Nissan"],
        logoColor: "#C3002F",
        lastActivity: "2024-10-20"
    },
    {
        id: 8,
        name: "Prestige Motor Sales",
        distance: 15.2,
        inventory: 197,
        sessionsPercentage: 4,
        overlapSessions: 482,
        franchiseType: "Independent",
        brands: ["Luxury", "Multi-brand"],
        logoColor: "#1A1A1A",
        lastActivity: "2024-10-15"
    },
    {
        id: 9,
        name: "Merchants Auto Group NH",
        distance: 48.3,
        inventory: 197,
        sessionsPercentage: 14,
        overlapSessions: 92,
        franchiseType: "Independent",
        brands: ["Multi-brand"],
        logoColor: "#2B4C8C",
        lastActivity: "2024-10-14"
    },
    {
        id: 10,
        name: "Merrimack Auto Sales",
        distance: 32.7,
        inventory: 197,
        sessionsPercentage: 4,
        overlapSessions: 482,
        franchiseType: "Independent",
        brands: ["Multi-brand"],
        logoColor: "#FF8C00",
        lastActivity: "2024-10-19"
    },
    {
        id: 11,
        name: "Atlantic Toyota",
        distance: 16.8,
        inventory: 197,
        sessionsPercentage: 14,
        overlapSessions: 182,
        franchiseType: "Franchise",
        brands: ["Toyota"],
        logoColor: "#EB0A1E",
        lastActivity: "2024-10-28"
    },
    {
        id: 12,
        name: "Exclusive Auto Sales & Service",
        distance: 4.1,
        inventory: 197,
        sessionsPercentage: 14,
        overlapSessions: 182,
        franchiseType: "Independent",
        brands: ["Multi-brand", "Luxury"],
        logoColor: "#4B0082",
        lastActivity: "2024-10-21"
    },
    {
        id: 13,
        name: "Prime Honda Boston",
        distance: 3.5,
        inventory: 312,
        sessionsPercentage: 18,
        overlapSessions: 623,
        franchiseType: "Franchise",
        brands: ["Honda"],
        logoColor: "#0088CC",
        lastActivity: "2024-10-20"
    },
    {
        id: 14,
        name: "Liberty Nissan",
        distance: 22.4,
        inventory: 156,
        sessionsPercentage: 9,
        overlapSessions: 267,
        franchiseType: "Franchise",
        brands: ["Nissan"],
        logoColor: "#C3002F",
        lastActivity: "2024-10-15"
    },
    {
        id: 15,
        name: "Village Auto Group",
        distance: 18.9,
        inventory: 89,
        sessionsPercentage: 3,
        overlapSessions: 134,
        franchiseType: "Independent",
        brands: ["Multi-brand"],
        logoColor: "#228B22",
        lastActivity: "2024-09-22"
    }
];

let selectedDealers = [];
let charts = {};

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    loadSelectedDealers();
    buildComparisonTable();
    initializeCharts();
});

// Load selected dealers from localStorage
function loadSelectedDealers() {
    const savedIds = localStorage.getItem('cargurusSelectedDealers');
    if (savedIds) {
        const ids = JSON.parse(savedIds);
        selectedDealers = dealerDatabase.filter(dealer => ids.includes(dealer.id));
    }
    
    if (selectedDealers.length === 0) {
        // Redirect back if no dealers selected
        window.location.href = 'index.html';
    }
}

// Build comparison table
function buildComparisonTable() {
    const headerRow = document.getElementById('compare-header-row');
    const tbody = document.getElementById('compare-tbody');
    
    // Clear existing content
    headerRow.innerHTML = '<th class="metric-header">Metrics</th>';
    tbody.innerHTML = '';
    
    // Add dealer columns to header
    selectedDealers.forEach(dealer => {
        const th = document.createElement('th');
        th.className = 'dealer-header';
        
        // Use store logo if ID is 11 or less, otherwise use fallback
        const logoContent = dealer.id <= 11 
            ? `<img src="img/store_logo/store_${dealer.id}.png" srcset="img/store_logo/store_${dealer.id}@2x.png 2x" alt="${dealer.name}" style="width: 100%; height: 100%; object-fit: contain;">`
            : `<div style="background-color: ${dealer.logoColor}; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; border-radius: 8px;">
                <span style="color: white; font-weight: bold;">${dealer.name.charAt(0)}</span>
              </div>`;
        
        th.innerHTML = `
            <div class="dealer-header-content">
                <div class="dealer-logo">
                    ${logoContent}
                </div>
                <div class="dealer-name">${dealer.name}</div>
            </div>
        `;
        headerRow.appendChild(th);
    });
    
    // Define metrics to compare
    const metrics = [
        { key: 'distance', label: 'Distance', format: (val) => `${val} mi` },
        { key: 'inventory', label: 'Inventory', format: (val) => val },
        { key: 'sessionsPercentage', label: '% of Sessions', format: (val) => `${val}%` },
        { key: 'overlapSessions', label: 'Overlap Sessions', format: (val) => val },
        { key: 'franchiseType', label: 'Franchise Type', format: (val) => val },
        { key: 'brands', label: 'Brands', format: (val) => Array.isArray(val) ? val.join(', ') : val },
        { key: 'lastActivity', label: 'Last Activity', format: (val) => new Date(val).toLocaleDateString() }
    ];
    
    // Add metric rows
    metrics.forEach(metric => {
        const tr = document.createElement('tr');
        
        // Metric name cell
        const metricCell = document.createElement('td');
        metricCell.className = 'metric-name';
        metricCell.textContent = metric.label;
        tr.appendChild(metricCell);
        
        // Dealer value cells
        selectedDealers.forEach(dealer => {
            const td = document.createElement('td');
            td.className = 'metric-value';
            
            // Highlight best values for numeric metrics
            if (['inventory', 'sessionsPercentage', 'overlapSessions'].includes(metric.key)) {
                const values = selectedDealers.map(d => d[metric.key]);
                const maxValue = Math.max(...values);
                if (dealer[metric.key] === maxValue) {
                    td.classList.add('best-value');
                }
            }
            
            td.textContent = metric.format(dealer[metric.key]);
            tr.appendChild(td);
        });
        
        tbody.appendChild(tr);
    });
}

// Initialize charts
function initializeCharts() {
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };
    
    const colors = selectedDealers.map(d => d.logoColor);
    const labels = selectedDealers.map(d => d.name);
    
    // Inventory Chart
    charts.inventory = new Chart(document.getElementById('inventory-chart'), {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                data: selectedDealers.map(d => d.inventory),
                backgroundColor: colors,
                borderWidth: 0
            }]
        },
        options: chartOptions
    });
    
    // Sessions Chart
    charts.sessions = new Chart(document.getElementById('sessions-chart'), {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                data: selectedDealers.map(d => d.sessionsPercentage),
                backgroundColor: colors,
                borderWidth: 0
            }]
        },
        options: {
            ...chartOptions,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    });
    
    // Overlap Chart
    charts.overlap = new Chart(document.getElementById('overlap-chart'), {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                data: selectedDealers.map(d => d.overlapSessions),
                backgroundColor: colors,
                borderWidth: 0
            }]
        },
        options: chartOptions
    });
}

// Export to CSV
function exportToCSV() {
    let csv = 'Metric,' + selectedDealers.map(d => `"${d.name}"`).join(',') + '\n';
    
    const metrics = [
        { key: 'distance', label: 'Distance (mi)' },
        { key: 'inventory', label: 'Inventory' },
        { key: 'sessionsPercentage', label: '% of Sessions' },
        { key: 'overlapSessions', label: 'Overlap Sessions' },
        { key: 'franchiseType', label: 'Franchise Type' },
        { key: 'brands', label: 'Brands' }
    ];
    
    metrics.forEach(metric => {
        csv += metric.label + ',';
        csv += selectedDealers.map(d => {
            const value = d[metric.key];
            return Array.isArray(value) ? `"${value.join(', ')}"` : value;
        }).join(',');
        csv += '\n';
    });
    
    // Download CSV
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'competitor-comparison.csv';
    a.click();
    window.URL.revokeObjectURL(url);
}