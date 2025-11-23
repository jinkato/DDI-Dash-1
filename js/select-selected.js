// Selected Competitors Tab Logic

// Update the selected table when tab is shown
function updateSelectedTable() {
    const tbody = document.getElementById('selected-tbody');
    const selectedDealers = appState.getSelectedDealers();
    
    // Clear existing content
    tbody.innerHTML = '';
    
    if (selectedDealers.length === 0) {
        // Show empty state
        tbody.innerHTML = `
            <tr>
                <td colspan="5" class="empty-state">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <h3>No competitors selected</h3>
                    <p>Go to the "Select Competitors" tab to choose dealers to compare.</p>
                </td>
            </tr>
        `;
        
        // Update compare button state
        updateCompareButtonState();
    } else {
        // Update compare button state
        updateCompareButtonState();
        
        // Populate table with selected dealers
        selectedDealers.forEach(dealer => {
            const row = createSelectedTableRow(dealer);
            tbody.appendChild(row);
        });
    }
}

// Create a table row for selected dealers
function createSelectedTableRow(dealer) {
    const tr = document.createElement('tr');
    // Use store logo if ID is 11 or less, otherwise use fallback
    const logoContent = dealer.id <= 11 
        ? `<img src="img/store_logo/store_${dealer.id}.png" srcset="img/store_logo/store_${dealer.id}@2x.png 2x" alt="${dealer.name}">`
        : `<div style="background-color: ${dealer.logoColor}; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; border-radius: 8px;">
            <span style="color: white; font-weight: bold; font-size: 18px;">
                ${dealer.name.charAt(0)}
            </span>
          </div>`;
    
    tr.innerHTML = `
        <td>
            <div class="dealer-info">
                <div class="dealer-logo">
                    ${logoContent}
                </div>
                <div class="dealer-details">
                    <h3>${dealer.name}</h3>
                    <p>${dealer.distance} mi</p>
                </div>
            </div>
        </td>
        <td>${dealer.inventory}</td>
        <td>${dealer.sessionsPercentage}%</td>
        <td>${dealer.overlapSessions}</td>
        <td>
            <button class="btn btn-secondary" data-dealer-id="${dealer.id}" onclick="removeDealer(${dealer.id})">
                Remove
            </button>
        </td>
    `;
    return tr;
}

// Remove dealer from selection
function removeDealer(dealerId) {
    // Update app state
    appState.toggleDealerSelection(dealerId, false);
    
    // Update the main dealers data if we're on the same page
    if (typeof dealersData !== 'undefined') {
        const dealer = dealersData.find(d => d.id === dealerId);
        if (dealer) {
            dealer.isSelected = false;
            
            // Update button in select tab if visible
            const selectBtn = document.querySelector(`.select-btn[data-dealer-id="${dealerId}"]`);
            if (selectBtn) {
                selectBtn.classList.remove('unselect');
                selectBtn.textContent = 'Select';
            }
        }
    }
    
    // Refresh the selected table
    updateSelectedTable();
}

// Update compare button state based on selection count
function updateCompareButtonState() {
    const compareBtn = document.querySelector('.compare-button');
    if (compareBtn) {
        const selectedCount = appState.selectedDealerIds.length;
        compareBtn.disabled = selectedCount === 0;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Update table when switching to selected tab
    const selectedTab = document.querySelector('[data-tab="selected"]');
    if (selectedTab) {
        selectedTab.addEventListener('click', () => {
            setTimeout(updateSelectedTable, 100); // Small delay to ensure tab is visible
        });
    }
    
    // Initial update of compare button
    updateCompareButtonState();
});