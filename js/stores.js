// Stores Page JavaScript

// Store data
const storesData = [
    {
        name: "Boston Volvo Cars",
        septemberLeads: 285,
        octoberLeads: 342,  // +20% increase
        septemberDaysOnLot: 45,
        octoberDaysOnLot: 38,  // -15.6% improvement
        septemberVdpPerVehicle: 18.5,
        octoberVdpPerVehicle: 14.2,  // -23.2% decrease
        logo: "store_1.png"
    },
    {
        name: "Marlboro Nissan",
        septemberLeads: 412,
        octoberLeads: 410,  // -0.5% decrease
        septemberDaysOnLot: 52,
        octoberDaysOnLot: 64,  // +23.1% increase (worse)
        septemberVdpPerVehicle: 25.2,
        octoberVdpPerVehicle: 31.6,  // +25.4% increase
        logo: "store_6@2x.png"
    },
    {
        name: "Valley Motors",
        septemberLeads: 195,
        octoberLeads: 238,  // +22% increase
        septemberDaysOnLot: 68,
        octoberDaysOnLot: 55,  // -19.1% improvement
        septemberVdpPerVehicle: 12.8,
        octoberVdpPerVehicle: 10.2,  // -20.3% decrease
        logo: "store_2.png"
    },
    {
        name: "Toyota of Watertown",
        septemberLeads: 292,
        octoberLeads: 280,  // -4.1% decrease
        septemberDaysOnLot: 35,
        octoberDaysOnLot: 43,  // +22.9% increase (worse)
        septemberVdpPerVehicle: 32.4,
        octoberVdpPerVehicle: 39.8,  // +22.8% increase
        logo: "store_3.png"
    },
    {
        name: "Jaffarian Toyota Volvo",
        septemberLeads: 367,
        octoberLeads: 370,  // +0.8% increase
        septemberDaysOnLot: 58,
        octoberDaysOnLot: 61,  // +5.2% increase (worse)
        septemberVdpPerVehicle: 21.6,
        octoberVdpPerVehicle: 22.1,  // +2.3% increase
        logo: "store_4.png"
    },
    {
        name: "Merchants Automotive Group",
        septemberLeads: 298,
        octoberLeads: 365,  // +22.5% increase
        septemberDaysOnLot: 42,
        octoberDaysOnLot: 33,  // -21.4% improvement
        septemberVdpPerVehicle: 19.4,
        octoberVdpPerVehicle: 15.1,  // -22.2% decrease
        logo: "store_5.png"
    },
    {
        name: "Auto Mile Boston",
        septemberLeads: 445,
        octoberLeads: 442,  // -0.7% decrease
        septemberDaysOnLot: 55,
        octoberDaysOnLot: 68,  // +23.6% increase (worse)
        septemberVdpPerVehicle: 27.9,
        octoberVdpPerVehicle: 34.5,  // +23.7% increase
        logo: "store_7.png"
    },
    {
        name: "Premier Auto Sales",
        septemberLeads: 312,
        octoberLeads: 382,  // +22.4% increase
        septemberDaysOnLot: 63,
        octoberDaysOnLot: 51,  // -19% improvement
        septemberVdpPerVehicle: 16.7,
        octoberVdpPerVehicle: 12.8,  // -23.4% decrease
        logo: "store_8.png"
    }
];

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeStoresPage();
});

function initializeStoresPage() {
    renderTotalLeadsTable();
    renderDaysOnLotTable();
    renderVdpPerVehicleTable();
    setupTimePeriodDropdown();
    setupTabHandlers();
}

function setupTimePeriodDropdown() {
    const timePeriodDropdown = document.getElementById('time-period-dropdown');
    const changeTypeDropdown = document.getElementById('change-type-dropdown');
    
    if (timePeriodDropdown) {
        timePeriodDropdown.addEventListener('change', function(e) {
            updateTables();
        });
    }
    
    if (changeTypeDropdown) {
        changeTypeDropdown.addEventListener('change', function(e) {
            updateTables();
        });
    }
}

function setupTabHandlers() {
    const mostChangeTab = document.getElementById('most-change-tab');
    const allStoresTab = document.getElementById('all-stores-tab');
    
    mostChangeTab.addEventListener('click', function() {
        mostChangeTab.classList.add('active');
        allStoresTab.classList.remove('active');
        // For now, just update the tables (no change in functionality)
        updateTables();
    });
    
    allStoresTab.addEventListener('click', function() {
        allStoresTab.classList.add('active');
        mostChangeTab.classList.remove('active');
        // TODO: Show all stores view
        alert('All stores view coming soon!');
    });
}

function updateTables() {
    const changeType = document.getElementById('change-type-dropdown').value;
    renderTotalLeadsTable(changeType);
    renderDaysOnLotTable(changeType);
    renderVdpPerVehicleTable(changeType);
}

function renderTotalLeadsTable(changeType = 'all') {
    const tbody = document.getElementById('total-leads-tbody');
    
    // Calculate percentage change for each store
    let storesWithChange = storesData.map(store => ({
        ...store,
        percentChange: ((store.octoberLeads - store.septemberLeads) / store.septemberLeads * 100)
    }));
    
    // Filter based on change type
    if (changeType === 'increase') {
        storesWithChange = storesWithChange.filter(store => store.percentChange > 0);
    } else if (changeType === 'decrease') {
        storesWithChange = storesWithChange.filter(store => store.percentChange < 0);
    }
    
    // Sort by absolute percentage change (biggest changes first) and take top 5
    const topStores = storesWithChange
        .sort((a, b) => Math.abs(b.percentChange) - Math.abs(a.percentChange))
        .slice(0, 5);
    
    // Clear existing content
    tbody.innerHTML = '';
    
    // Render rows
    topStores.forEach((store, index) => {
        const row = document.createElement('tr');
        const changeClass = store.percentChange >= 0 ? 'change-positive' : 'change-negative';
        const changeIcon = store.percentChange >= 0 ? 
            '<svg class="change-icon" viewBox="0 0 16 16" fill="currentColor"><path d="M8 2a.75.75 0 01.75.75v8.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V2.75A.75.75 0 018 2z" transform="rotate(180 8 8)"/></svg>' : 
            '<svg class="change-icon" viewBox="0 0 16 16" fill="currentColor"><path d="M8 2a.75.75 0 01.75.75v8.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V2.75A.75.75 0 018 2z"/></svg>';
        
        row.innerHTML = `
            <td>
                <div class="store-name">${store.name}</div>
            </td>
            <td class="metric-cell">${store.septemberLeads.toLocaleString()}</td>
            <td class="metric-cell">${store.octoberLeads.toLocaleString()}</td>
            <td class="change-cell ${changeClass}">
                ${changeIcon}
                ${store.percentChange > 0 ? '+' : ''}${store.percentChange.toFixed(1)}%
            </td>
        `;
        
        // Add hover effect to all rows
        row.style.cursor = 'pointer';
        row.classList.add('clickable-row');
        
        // Add click handler for Toyota of Watertown
        if (store.name === 'Toyota of Watertown') {
            row.addEventListener('click', () => {
                window.location.href = 'why.html';
            });
        }
        
        tbody.appendChild(row);
    });
}

function renderVdpPerVehicleTable(changeType = 'all') {
    const tbody = document.getElementById('vdp-per-vehicle-tbody');
    
    // Calculate percentage change for each store
    let storesWithChange = storesData.map(store => ({
        ...store,
        percentChange: ((store.octoberVdpPerVehicle - store.septemberVdpPerVehicle) / store.septemberVdpPerVehicle * 100)
    }));
    
    // Filter based on change type
    if (changeType === 'increase') {
        storesWithChange = storesWithChange.filter(store => store.percentChange > 0);
    } else if (changeType === 'decrease') {
        storesWithChange = storesWithChange.filter(store => store.percentChange < 0);
    }
    
    // Sort by absolute percentage change (biggest changes first) and take top 5
    const topStores = storesWithChange
        .sort((a, b) => Math.abs(b.percentChange) - Math.abs(a.percentChange))
        .slice(0, 5);
    
    // Clear existing content
    tbody.innerHTML = '';
    
    // Render rows
    topStores.forEach((store, index) => {
        const row = document.createElement('tr');
        const changeClass = store.percentChange >= 0 ? 'change-positive' : 'change-negative';
        const changeIcon = store.percentChange >= 0 ? 
            '<svg class="change-icon" viewBox="0 0 16 16" fill="currentColor"><path d="M8 2a.75.75 0 01.75.75v8.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V2.75A.75.75 0 018 2z" transform="rotate(180 8 8)"/></svg>' : 
            '<svg class="change-icon" viewBox="0 0 16 16" fill="currentColor"><path d="M8 2a.75.75 0 01.75.75v8.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V2.75A.75.75 0 018 2z"/></svg>';
        
        row.innerHTML = `
            <td>
                <div class="store-name">${store.name}</div>
            </td>
            <td class="metric-cell">${store.septemberVdpPerVehicle.toFixed(1)}</td>
            <td class="metric-cell">${store.octoberVdpPerVehicle.toFixed(1)}</td>
            <td class="change-cell ${changeClass}">
                ${changeIcon}
                ${store.percentChange > 0 ? '+' : ''}${store.percentChange.toFixed(1)}%
            </td>
        `;
        
        tbody.appendChild(row);
    });
}

function renderDaysOnLotTable(changeType = 'all') {
    const tbody = document.getElementById('days-on-lot-tbody');
    
    // Calculate percentage change for each store
    let storesWithChange = storesData.map(store => ({
        ...store,
        percentChange: ((store.octoberDaysOnLot - store.septemberDaysOnLot) / store.septemberDaysOnLot * 100)
    }));
    
    // Filter based on change type
    if (changeType === 'increase') {
        storesWithChange = storesWithChange.filter(store => store.percentChange > 0);
    } else if (changeType === 'decrease') {
        storesWithChange = storesWithChange.filter(store => store.percentChange < 0);
    }
    
    // Sort by absolute percentage change (biggest changes first) and take top 5
    const topStores = storesWithChange
        .sort((a, b) => Math.abs(b.percentChange) - Math.abs(a.percentChange))
        .slice(0, 5);
    
    // Clear existing content
    tbody.innerHTML = '';
    
    // Render rows
    topStores.forEach((store, index) => {
        const row = document.createElement('tr');
        // For days on lot, negative change is good (improvement)
        const changeClass = store.percentChange <= 0 ? 'change-positive' : 'change-negative';
        const changeIcon = store.percentChange <= 0 ? 
            '<svg class="change-icon" viewBox="0 0 16 16" fill="currentColor"><path d="M8 2a.75.75 0 01.75.75v8.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V2.75A.75.75 0 018 2z"/></svg>' : 
            '<svg class="change-icon" viewBox="0 0 16 16" fill="currentColor"><path d="M8 2a.75.75 0 01.75.75v8.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V2.75A.75.75 0 018 2z" transform="rotate(180 8 8)"/></svg>';
        
        row.innerHTML = `
            <td>
                <div class="store-name">${store.name}</div>
            </td>
            <td class="metric-cell">${store.septemberDaysOnLot}</td>
            <td class="metric-cell">${store.octoberDaysOnLot}</td>
            <td class="change-cell ${changeClass}">
                ${changeIcon}
                ${store.percentChange > 0 ? '+' : ''}${store.percentChange.toFixed(1)}%
            </td>
        `;
        
        // Add hover effect to all rows
        row.style.cursor = 'pointer';
        row.classList.add('clickable-row');
        
        // Add click handler for Auto Mile Boston
        if (store.name === 'Auto Mile Boston') {
            row.addEventListener('click', () => {
                window.location.href = 'days.html';
            });
        }
        
        tbody.appendChild(row);
    });
}

function renderVdpPerVehicleTable(changeType = 'all') {
    const tbody = document.getElementById('vdp-per-vehicle-tbody');
    
    // Calculate percentage change for each store
    let storesWithChange = storesData.map(store => ({
        ...store,
        percentChange: ((store.octoberVdpPerVehicle - store.septemberVdpPerVehicle) / store.septemberVdpPerVehicle * 100)
    }));
    
    // Filter based on change type
    if (changeType === 'increase') {
        storesWithChange = storesWithChange.filter(store => store.percentChange > 0);
    } else if (changeType === 'decrease') {
        storesWithChange = storesWithChange.filter(store => store.percentChange < 0);
    }
    
    // Sort by absolute percentage change (biggest changes first) and take top 5
    const topStores = storesWithChange
        .sort((a, b) => Math.abs(b.percentChange) - Math.abs(a.percentChange))
        .slice(0, 5);
    
    // Clear existing content
    tbody.innerHTML = '';
    
    // Render rows
    topStores.forEach((store, index) => {
        const row = document.createElement('tr');
        const changeClass = store.percentChange >= 0 ? 'change-positive' : 'change-negative';
        const changeIcon = store.percentChange >= 0 ? 
            '<svg class="change-icon" viewBox="0 0 16 16" fill="currentColor"><path d="M8 2a.75.75 0 01.75.75v8.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V2.75A.75.75 0 018 2z" transform="rotate(180 8 8)"/></svg>' : 
            '<svg class="change-icon" viewBox="0 0 16 16" fill="currentColor"><path d="M8 2a.75.75 0 01.75.75v8.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V2.75A.75.75 0 018 2z"/></svg>';
        
        row.innerHTML = `
            <td>
                <div class="store-name">${store.name}</div>
            </td>
            <td class="metric-cell">${store.septemberVdpPerVehicle.toFixed(1)}</td>
            <td class="metric-cell">${store.octoberVdpPerVehicle.toFixed(1)}</td>
            <td class="change-cell ${changeClass}">
                ${changeIcon}
                ${store.percentChange > 0 ? '+' : ''}${store.percentChange.toFixed(1)}%
            </td>
        `;
        
        tbody.appendChild(row);
    });
}