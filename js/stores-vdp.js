function renderVdpPerVehicleTable() {
    const tbody = document.getElementById('vdp-per-vehicle-tbody');
    
    // Calculate percentage change for each store
    const storesWithChange = storesData.map(store => ({
        ...store,
        percentChange: ((store.octoberVdpPerVehicle - store.septemberVdpPerVehicle) / store.septemberVdpPerVehicle * 100)
    }));
    
    // Sort by percentage change (descending for highest improvement) and take top 5
    const topStores = storesWithChange
        .sort((a, b) => b.percentChange - a.percentChange)
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