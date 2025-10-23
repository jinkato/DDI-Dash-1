// Competitors Page JavaScript

// Dealer data
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
        lastActivity: "2024-10-20",
        isSelected: true,
        inventoryData: {
            'Compact': { thisLocation: 2, avgCompetitor: 5 },
            'Sedans': { thisLocation: 6, avgCompetitor: 8 },
            'SUV/CO': { thisLocation: 12, avgCompetitor: 9 },
            'Trucks': { thisLocation: 8, avgCompetitor: 15 },
            'Luxury': { thisLocation: 18, avgCompetitor: 12 }
        },
        pricingData: {
            'Great deal': { percent: 8 },
            'Good deal': { percent: 15 },
            'Fair deal': { percent: 42 },
            'High priced': { percent: 20 },
            'Over priced': { percent: 10 },
            'Uncertain': { percent: 5 }
        }
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
        lastActivity: "2024-10-19",
        isSelected: true,
        inventoryData: {
            'Compact': { thisLocation: 4, avgCompetitor: 5 },
            'Sedans': { thisLocation: 10, avgCompetitor: 8 },
            'SUV/CO': { thisLocation: 15, avgCompetitor: 9 },
            'Trucks': { thisLocation: 12, avgCompetitor: 15 },
            'Luxury': { thisLocation: 5, avgCompetitor: 12 }
        },
        pricingData: {
            'Great deal': { percent: 12 },
            'Good deal': { percent: 18 },
            'Fair deal': { percent: 35 },
            'High priced': { percent: 22 },
            'Over priced': { percent: 8 },
            'Uncertain': { percent: 5 }
        }
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
        lastActivity: "2024-10-21",
        isSelected: false,
        inventoryData: {
            'Compact': { thisLocation: 3, avgCompetitor: 5 },
            'Sedans': { thisLocation: 8, avgCompetitor: 8 },
            'SUV/CO': { thisLocation: 11, avgCompetitor: 9 },
            'Trucks': { thisLocation: 14, avgCompetitor: 15 },
            'Luxury': { thisLocation: 15, avgCompetitor: 12 }
        },
        pricingData: {
            'Great deal': { percent: 6 },
            'Good deal': { percent: 14 },
            'Fair deal': { percent: 40 },
            'High priced': { percent: 25 },
            'Over priced': { percent: 12 },
            'Uncertain': { percent: 3 }
        }
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
        lastActivity: "2024-10-18",
        isSelected: false,
        inventoryData: {
            'Compact': { thisLocation: 5, avgCompetitor: 5 },
            'Sedans': { thisLocation: 7, avgCompetitor: 8 },
            'SUV/CO': { thisLocation: 9, avgCompetitor: 9 },
            'Trucks': { thisLocation: 10, avgCompetitor: 15 },
            'Luxury': { thisLocation: 8, avgCompetitor: 12 }
        },
        pricingData: {
            'Great deal': { percent: 10 },
            'Good deal': { percent: 20 },
            'Fair deal': { percent: 38 },
            'High priced': { percent: 18 },
            'Over priced': { percent: 10 },
            'Uncertain': { percent: 4 }
        }
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
        lastActivity: "2024-10-17",
        isSelected: false,
        inventoryData: {
            'Compact': { thisLocation: 1, avgCompetitor: 5 },
            'Sedans': { thisLocation: 5, avgCompetitor: 8 },
            'SUV/CO': { thisLocation: 13, avgCompetitor: 9 },
            'Trucks': { thisLocation: 7, avgCompetitor: 15 },
            'Luxury': { thisLocation: 20, avgCompetitor: 12 }
        },
        pricingData: {
            'Great deal': { percent: 7 },
            'Good deal': { percent: 13 },
            'Fair deal': { percent: 45 },
            'High priced': { percent: 22 },
            'Over priced': { percent: 9 },
            'Uncertain': { percent: 4 }
        }
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
        lastActivity: "2024-10-16",
        isSelected: false,
        inventoryData: {
            'Compact': { thisLocation: 8, avgCompetitor: 5 },
            'Sedans': { thisLocation: 12, avgCompetitor: 8 },
            'SUV/CO': { thisLocation: 7, avgCompetitor: 9 },
            'Trucks': { thisLocation: 4, avgCompetitor: 15 },
            'Luxury': { thisLocation: 3, avgCompetitor: 12 }
        },
        pricingData: {
            'Great deal': { percent: 15 },
            'Good deal': { percent: 25 },
            'Fair deal': { percent: 32 },
            'High priced': { percent: 18 },
            'Over priced': { percent: 7 },
            'Uncertain': { percent: 3 }
        }
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
        lastActivity: "2024-10-20",
        isSelected: false,
        inventoryData: {
            'Compact': { thisLocation: 6, avgCompetitor: 5 },
            'Sedans': { thisLocation: 11, avgCompetitor: 8 },
            'SUV/CO': { thisLocation: 14, avgCompetitor: 9 },
            'Trucks': { thisLocation: 9, avgCompetitor: 15 },
            'Luxury': { thisLocation: 4, avgCompetitor: 12 }
        },
        pricingData: {
            'Great deal': { percent: 10 },
            'Good deal': { percent: 16 },
            'Fair deal': { percent: 38 },
            'High priced': { percent: 24 },
            'Over priced': { percent: 9 },
            'Uncertain': { percent: 3 }
        }
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
        lastActivity: "2024-10-15",
        isSelected: false,
        inventoryData: {
            'Compact': { thisLocation: 2, avgCompetitor: 5 },
            'Sedans': { thisLocation: 4, avgCompetitor: 8 },
            'SUV/CO': { thisLocation: 8, avgCompetitor: 9 },
            'Trucks': { thisLocation: 3, avgCompetitor: 15 },
            'Luxury': { thisLocation: 25, avgCompetitor: 12 }
        },
        pricingData: {
            'Great deal': { percent: 5 },
            'Good deal': { percent: 10 },
            'Fair deal': { percent: 30 },
            'High priced': { percent: 35 },
            'Over priced': { percent: 15 },
            'Uncertain': { percent: 5 }
        }
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
        lastActivity: "2024-10-14",
        isSelected: false,
        inventoryData: {
            'Compact': { thisLocation: 6, avgCompetitor: 5 },
            'Sedans': { thisLocation: 9, avgCompetitor: 8 },
            'SUV/CO': { thisLocation: 10, avgCompetitor: 9 },
            'Trucks': { thisLocation: 11, avgCompetitor: 15 },
            'Luxury': { thisLocation: 7, avgCompetitor: 12 }
        },
        pricingData: {
            'Great deal': { percent: 11 },
            'Good deal': { percent: 22 },
            'Fair deal': { percent: 36 },
            'High priced': { percent: 20 },
            'Over priced': { percent: 8 },
            'Uncertain': { percent: 3 }
        }
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
        lastActivity: "2024-10-19",
        isSelected: false,
        inventoryData: {
            'Compact': { thisLocation: 7, avgCompetitor: 5 },
            'Sedans': { thisLocation: 10, avgCompetitor: 8 },
            'SUV/CO': { thisLocation: 9, avgCompetitor: 9 },
            'Trucks': { thisLocation: 13, avgCompetitor: 15 },
            'Luxury': { thisLocation: 5, avgCompetitor: 12 }
        },
        pricingData: {
            'Great deal': { percent: 14 },
            'Good deal': { percent: 24 },
            'Fair deal': { percent: 34 },
            'High priced': { percent: 18 },
            'Over priced': { percent: 6 },
            'Uncertain': { percent: 4 }
        }
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
        lastActivity: "2024-10-28",
        isSelected: false,
        inventoryData: {
            'Compact': { thisLocation: 5, avgCompetitor: 5 },
            'Sedans': { thisLocation: 12, avgCompetitor: 8 },
            'SUV/CO': { thisLocation: 16, avgCompetitor: 9 },
            'Trucks': { thisLocation: 14, avgCompetitor: 15 },
            'Luxury': { thisLocation: 6, avgCompetitor: 12 }
        },
        pricingData: {
            'Great deal': { percent: 13 },
            'Good deal': { percent: 19 },
            'Fair deal': { percent: 36 },
            'High priced': { percent: 21 },
            'Over priced': { percent: 7 },
            'Uncertain': { percent: 4 }
        }
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
        lastActivity: "2024-10-21",
        isSelected: false,
        inventoryData: {
            'Compact': { thisLocation: 3, avgCompetitor: 5 },
            'Sedans': { thisLocation: 6, avgCompetitor: 8 },
            'SUV/CO': { thisLocation: 9, avgCompetitor: 9 },
            'Trucks': { thisLocation: 5, avgCompetitor: 15 },
            'Luxury': { thisLocation: 22, avgCompetitor: 12 }
        },
        pricingData: {
            'Great deal': { percent: 6 },
            'Good deal': { percent: 12 },
            'Fair deal': { percent: 32 },
            'High priced': { percent: 32 },
            'Over priced': { percent: 13 },
            'Uncertain': { percent: 5 }
        }
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
        lastActivity: "2024-10-20",
        isSelected: false,
        inventoryData: {
            'Compact': { thisLocation: 7, avgCompetitor: 5 },
            'Sedans': { thisLocation: 13, avgCompetitor: 8 },
            'SUV/CO': { thisLocation: 17, avgCompetitor: 9 },
            'Trucks': { thisLocation: 11, avgCompetitor: 15 },
            'Luxury': { thisLocation: 8, avgCompetitor: 12 }
        },
        pricingData: {
            'Great deal': { percent: 11 },
            'Good deal': { percent: 17 },
            'Fair deal': { percent: 40 },
            'High priced': { percent: 20 },
            'Over priced': { percent: 8 },
            'Uncertain': { percent: 4 }
        }
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
        lastActivity: "2024-10-15",
        isSelected: false,
        inventoryData: {
            'Compact': { thisLocation: 5, avgCompetitor: 5 },
            'Sedans': { thisLocation: 10, avgCompetitor: 8 },
            'SUV/CO': { thisLocation: 13, avgCompetitor: 9 },
            'Trucks': { thisLocation: 8, avgCompetitor: 15 },
            'Luxury': { thisLocation: 3, avgCompetitor: 12 }
        },
        pricingData: {
            'Great deal': { percent: 9 },
            'Good deal': { percent: 15 },
            'Fair deal': { percent: 37 },
            'High priced': { percent: 26 },
            'Over priced': { percent: 10 },
            'Uncertain': { percent: 3 }
        }
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
        lastActivity: "2024-09-22",
        isSelected: false,
        inventoryData: {
            'Compact': { thisLocation: 9, avgCompetitor: 5 },
            'Sedans': { thisLocation: 11, avgCompetitor: 8 },
            'SUV/CO': { thisLocation: 8, avgCompetitor: 9 },
            'Trucks': { thisLocation: 6, avgCompetitor: 15 },
            'Luxury': { thisLocation: 4, avgCompetitor: 12 }
        },
        pricingData: {
            'Great deal': { percent: 18 },
            'Good deal': { percent: 26 },
            'Fair deal': { percent: 30 },
            'High priced': { percent: 16 },
            'Over priced': { percent: 7 },
            'Uncertain': { percent: 3 }
        }
    }
];

// Store original data for filtering
let dealersData = [...dealerDatabase];
let filteredData = [...dealersData];
let currentSort = { column: null, direction: 'asc' };
let selectedRowId = null;

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing competitors page...');
    
    // Load saved selections from localStorage
    if (typeof appState !== 'undefined') {
        const savedIds = appState.selectedDealerIds;
        dealersData.forEach(dealer => {
            dealer.isSelected = savedIds.includes(dealer.id);
        });
    }
    
    // Initialize event listeners
    initializeEventListeners();
    initializeSortHeaders();
    
    // Initial render
    renderTable(dealersData);
});

// Render table with data
function renderTable(data) {
    const tbody = document.querySelector('.competitors-table tbody');
    if (!tbody) {
        console.error('Table tbody not found!');
        return;
    }
    
    tbody.innerHTML = '';
    
    if (data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 20px; color: #6b7280;">No dealers match your filters</td></tr>';
        return;
    }
    
    data.forEach(dealer => {
        const row = createTableRow(dealer);
        tbody.appendChild(row);
    });
    
    // Re-initialize select buttons after rendering
    initializeSelectButtons();
}

// Create a table row from dealer data
function createTableRow(dealer) {
    const tr = document.createElement('tr');
    tr.dataset.dealerId = dealer.id;
    
    // Add selected class if this row is selected
    if (selectedRowId === dealer.id) {
        tr.classList.add('selected');
    }
    
    // Add click handler for row selection
    tr.addEventListener('click', function(e) {
        // Don't select row if clicking on buttons
        if (e.target.closest('button')) return;
        selectRow(dealer.id);
    });
    
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
            <div class="action-buttons">
                <a href="#" class="link-primary info-btn" data-dealer-id="${dealer.id}" onclick="showDealerInfo(${dealer.id}); return false;">
                    Detail
                </a>
                <button class="btn-secondary select-btn ${dealer.isSelected ? 'unselect' : ''}" data-dealer-id="${dealer.id}">
                    ${dealer.isSelected ? 'Unselect' : 'Select'}
                </button>
            </div>
        </td>
    `;
    return tr;
}

// Initialize all event listeners
function initializeEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('search');
    searchInput.addEventListener('input', applyFilters);
    
    // Date range filter
    const dateRange = document.getElementById('date-range');
    dateRange.addEventListener('change', applyFilters);
    
    // Radius filter
    const radiusSelect = document.getElementById('radius');
    radiusSelect.addEventListener('change', applyFilters);
    
    // Franchise type filter
    const franchiseSelect = document.getElementById('franchise');
    franchiseSelect.addEventListener('change', applyFilters);
    
    // Brand overlap filter
    const brandSelect = document.getElementById('brand');
    brandSelect.addEventListener('change', applyFilters);
    
    // Cross shopper filter
    const crossShopperSelect = document.getElementById('cross-shopper');
    crossShopperSelect.addEventListener('change', applyFilters);
    
    // Inventory size filters
    const invMin = document.getElementById('inv-min');
    const invMax = document.getElementById('inv-max');
    invMin.addEventListener('input', applyFilters);
    invMax.addEventListener('input', applyFilters);
    
    // Reset link for inventory
    const resetLink = document.querySelector('.reset-link');
    resetLink.addEventListener('click', function(e) {
        e.preventDefault();
        invMin.value = '';
        invMax.value = '';
        applyFilters();
    });
    
    // Add reset all filters button
    addResetAllButton();
}

// Add a reset all filters button
function addResetAllButton() {
    const filterHeader = document.querySelector('.filter-panel h2');
    if (!filterHeader) return;
    
    // Create a wrapper div for the header
    const headerWrapper = document.createElement('div');
    headerWrapper.style.cssText = 'display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;';
    
    // Move the h2 into the wrapper
    filterHeader.parentNode.insertBefore(headerWrapper, filterHeader);
    headerWrapper.appendChild(filterHeader);
    filterHeader.style.margin = '0';
    
    // Create reset link
    const resetAllLink = document.createElement('a');
    resetAllLink.textContent = 'Reset All';
    resetAllLink.href = '#';
    resetAllLink.style.cssText = 'font-size: 14px; color: #6b7280; text-decoration: none; cursor: pointer;';
    resetAllLink.addEventListener('click', function(e) {
        e.preventDefault();
        resetAllFilters();
    });
    resetAllLink.addEventListener('mouseover', function() {
        this.style.color = '#374151';
        this.style.textDecoration = 'underline';
    });
    resetAllLink.addEventListener('mouseout', function() {
        this.style.color = '#6b7280';
        this.style.textDecoration = 'none';
    });
    
    headerWrapper.appendChild(resetAllLink);
}

// Reset all filters to default
function resetAllFilters() {
    document.getElementById('search').value = '';
    document.getElementById('date-range').selectedIndex = 0;
    document.getElementById('radius').selectedIndex = 0;
    document.getElementById('franchise').selectedIndex = 0;
    document.getElementById('brand').selectedIndex = 0;
    document.getElementById('cross-shopper').selectedIndex = 0;
    document.getElementById('inv-min').value = '';
    document.getElementById('inv-max').value = '';
    
    // Re-apply filters (which will show all)
    applyFilters();
}

// Initialize select/unselect buttons
function initializeSelectButtons() {
    const buttons = document.querySelectorAll('.select-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            toggleSelection(this);
        });
    });
}

// Toggle selection state
function toggleSelection(button) {
    const dealerId = parseInt(button.getAttribute('data-dealer-id'));
    const dealer = dealersData.find(d => d.id === dealerId);
    
    if (dealer) {
        dealer.isSelected = !dealer.isSelected;
        
        if (dealer.isSelected) {
            button.classList.add('unselect');
            button.textContent = 'Unselect';
        } else {
            button.classList.remove('unselect');
            button.textContent = 'Select';
        }
        
        // Update localStorage through app state
        if (typeof appState !== 'undefined') {
            appState.toggleDealerSelection(dealerId, dealer.isSelected);
        }
    }
}

// Apply all filters
function applyFilters() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const dateRange = document.getElementById('date-range').value;
    const radiusText = document.getElementById('radius').value;
    const radiusValue = (radiusText && radiusText !== 'All') ? parseFloat(radiusText.replace(' miles', '')) : null;
    const franchiseType = document.getElementById('franchise').value;
    const brandFilter = document.getElementById('brand').value;
    const invMin = document.getElementById('inv-min').value ? parseInt(document.getElementById('inv-min').value) : 0;
    const invMax = document.getElementById('inv-max').value ? parseInt(document.getElementById('inv-max').value) : Infinity;
    const crossShopper = document.getElementById('cross-shopper').value;
    
    console.log('Applying filters:', {
        searchTerm,
        dateRange,
        radiusValue,
        franchiseType,
        brandFilter,
        invMin,
        invMax,
        crossShopper
    });
    
    console.log('Filtering', dealersData.length, 'dealers');
    
    filteredData = dealersData.filter(dealer => {
        // Search filter
        if (searchTerm && !dealer.name.toLowerCase().includes(searchTerm)) {
            return false;
        }
        
        // Date range filter
        if (dateRange && dateRange !== 'All') {
            const dealerDate = new Date(dealer.lastActivity);
            const today = new Date();
            let daysAgo = 0;
            
            switch(dateRange) {
                case 'Last month':
                    daysAgo = 30;
                    break;
                case 'Last 3 months':
                    daysAgo = 90;
                    break;
                case 'Last 6 month':
                    daysAgo = 180;
                    break;
                case 'Last year':
                    daysAgo = 365;
                    break;
                default:
                    daysAgo = 0; // If no match, don't filter
            }
            
            if (daysAgo > 0) {
                const cutoffDate = new Date(today.getTime() - (daysAgo * 24 * 60 * 60 * 1000));
                if (dealerDate < cutoffDate) {
                    return false;
                }
            }
        }
        
        // Radius filter
        if (radiusValue !== null && radiusValue > 0 && dealer.distance > radiusValue) {
            return false;
        }
        
        // Franchise type filter
        if (franchiseType !== 'All' && dealer.franchiseType !== franchiseType) {
            return false;
        }
        
        // Brand overlap filter
        if (brandFilter !== 'All') {
            if (!dealer.brands.some(brand => brand.toLowerCase().includes(brandFilter.toLowerCase()))) {
                return false;
            }
        }
        
        // Inventory size filter
        if (dealer.inventory < invMin || dealer.inventory > invMax) {
            return false;
        }
        
        // Cross shopper filter
        if (crossShopper !== 'All') {
            const overlap = dealer.overlapSessions;
            switch(crossShopper) {
                case 'High overlap':
                    if (overlap < 300) return false;
                    break;
                case 'Medium overlap':
                    if (overlap < 150 || overlap >= 300) return false;
                    break;
                case 'Low overlap':
                    if (overlap >= 150) return false;
                    break;
            }
        }
        
        return true;
    });
    
    console.log('Filtered results:', filteredData.length, 'dealers remaining');
    
    // Apply current sort if there is one
    if (currentSort.column) {
        sortData(currentSort.column, currentSort.direction);
    }
    
    // Re-render table with filtered data
    renderTable(filteredData);
}

// Show dealer information in detail panel
function showDealerInfo(dealerId) {
    const dealer = dealersData.find(d => d.id === dealerId);
    if (!dealer) return;
    
    // Build logo content for header
    const logoContent = dealer.id <= 11 
        ? `<img src="img/store_logo/store_${dealer.id}.png" srcset="img/store_logo/store_${dealer.id}@2x.png 2x" alt="${dealer.name}">`
        : `<div style="background-color: ${dealer.logoColor}; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; border-radius: 8px;">
            <span style="color: white; font-weight: bold; font-size: 18px;">${dealer.name.charAt(0)}</span>
          </div>`;
    
    // Update header with dealer info
    const headerContent = `
        <div class="detail-dealer-header">
            <div class="detail-dealer-logo">
                ${logoContent}
            </div>
            <div class="detail-dealer-info">
                <h3>${dealer.name}</h3>
                <p>${dealer.distance} miles away</p>
            </div>
        </div>
        <button class="close-btn" onclick="closeDetailPanel()">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
    `;
    document.querySelector('.detail-panel-header').innerHTML = headerContent;
    
    // Build panel content
    const content = `
        <div class="detail-section">
            <h3>Performance Metrics</h3>
            <div class="info-grid">
                <div class="info-item">
                    <span class="info-label">Inventory</span>
                    <span class="info-value">${dealer.inventory} vehicles</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Distance</span>
                    <span class="info-value">${dealer.distance} miles</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Session Percentage</span>
                    <span class="info-value">${dealer.sessionsPercentage}%</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Overlap Sessions</span>
                    <span class="info-value">${dealer.overlapSessions}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Lead per Vehicle</span>
                    <span class="info-value">${getLeadPerVehicle(dealer)}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">SRP to VDP Conversion</span>
                    <span class="info-value">${getSRPtoVDP(dealer)}%</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Turn Time</span>
                    <span class="info-value">${getTurnTime(dealer)} days</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Great/Good/Fair Deals</span>
                    <span class="info-value">${getGoodDealsPercentage(dealer)}%</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Fair Share</span>
                    <span class="info-value">${getFairShare(dealer)}%</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Last Activity</span>
                    <span class="info-value">${new Date(dealer.lastActivity).toLocaleDateString()}</span>
                </div>
            </div>
        </div>
        
        <div class="detail-section">
            <h3>Customer Reviews Summary</h3>
            <div class="review-summary">
                ${getReviewSummary(dealer)}
            </div>
        </div>
        
        <div class="detail-section">
            <h3>Inventory</h3>
            <div class="inventory-chart">
                ${createInventoryChart(dealer)}
            </div>
        </div>
        
        <div class="detail-section">
            <h3>Pricing</h3>
            <div class="pricing-chart">
                ${createPricingChart(dealer)}
            </div>
        </div>
    `;
    
    // Update panel content
    document.getElementById('detail-panel-content').innerHTML = content;
    
    // Show panel
    openDetailPanel();
}

// Open detail panel
function openDetailPanel() {
    const panel = document.getElementById('detail-panel');
    const body = document.body;
    
    // Add active class to panel
    panel.classList.add('active');
    
    // Add class to body to adjust layout
    body.classList.add('detail-panel-open');
}

// Close detail panel
function closeDetailPanel() {
    const panel = document.getElementById('detail-panel');
    const body = document.body;
    
    // Remove active class from panel
    panel.classList.remove('active');
    
    // Remove class from body
    body.classList.remove('detail-panel-open');
}

// Initialize sort headers
function initializeSortHeaders() {
    const sortableHeaders = document.querySelectorAll('.sortable');
    sortableHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const column = this.dataset.sort;
            handleSort(column);
        });
    });
}

// Handle sorting
function handleSort(column) {
    // Determine sort direction
    let direction = 'asc';
    if (currentSort.column === column && currentSort.direction === 'asc') {
        direction = 'desc';
    }
    
    currentSort.column = column;
    currentSort.direction = direction;
    
    // Update header classes
    const headers = document.querySelectorAll('.sortable');
    headers.forEach(header => {
        header.classList.remove('sorted-asc', 'sorted-desc');
        if (header.dataset.sort === column) {
            header.classList.add(`sorted-${direction}`);
        }
    });
    
    // Sort the data
    sortData(column, direction);
    
    // Re-render table
    renderTable(filteredData);
}

// Sort data
function sortData(column, direction) {
    filteredData.sort((a, b) => {
        let aVal, bVal;
        
        switch(column) {
            case 'name':
                aVal = a.name.toLowerCase();
                bVal = b.name.toLowerCase();
                break;
            case 'inventory':
                aVal = a.inventory;
                bVal = b.inventory;
                break;
            case 'sessions':
                aVal = a.sessionsPercentage;
                bVal = b.sessionsPercentage;
                break;
            case 'overlap':
                aVal = a.overlapSessions;
                bVal = b.overlapSessions;
                break;
            default:
                return 0;
        }
        
        // Compare values
        if (typeof aVal === 'string') {
            return direction === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
        } else {
            return direction === 'asc' ? aVal - bVal : bVal - aVal;
        }
    });
}

// Select a row
function selectRow(dealerId) {
    // Remove selected class from all rows
    const allRows = document.querySelectorAll('.competitors-table tbody tr');
    allRows.forEach(row => row.classList.remove('selected'));
    
    // Toggle selection
    if (selectedRowId === dealerId) {
        selectedRowId = null;
    } else {
        selectedRowId = dealerId;
        // Add selected class to the clicked row
        const selectedRow = document.querySelector(`tr[data-dealer-id="${dealerId}"]`);
        if (selectedRow) {
            selectedRow.classList.add('selected');
        }
    }
}

// Create inventory chart
function createInventoryChart(dealer) {
    // Use actual dealer inventory data
    const inventoryData = dealer.inventoryData || {
        'Compact': { thisLocation: 3, avgCompetitor: 5 },
        'Sedans': { thisLocation: 8, avgCompetitor: 6 },
        'SUV/CO': { thisLocation: 10, avgCompetitor: 9 },
        'Trucks': { thisLocation: 18, avgCompetitor: 15 },
        'Luxury': { thisLocation: 15, avgCompetitor: 12 }
    };
    
    let chartHtml = '<div class="bar-chart">';
    
    Object.entries(inventoryData).forEach(([vehicleType, data]) => {
        const maxValue = 20;
        const thisLocationWidth = (data.thisLocation / maxValue) * 100;
        const avgCompetitorWidth = (data.avgCompetitor / maxValue) * 100;
        
        chartHtml += `
            <div class="chart-row">
                <div class="chart-label">${vehicleType}</div>
                <div class="chart-bars">
                    <div class="bar-wrapper">
                        <div class="bar bar-this-location" style="width: ${thisLocationWidth}%;">
                            <span class="bar-value">${data.thisLocation}%</span>
                        </div>
                    </div>
                    <div class="bar-wrapper">
                        <div class="bar bar-avg-competitor" style="width: ${avgCompetitorWidth}%;">
                            <span class="bar-value">${data.avgCompetitor}%</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    
    chartHtml += `
        <div class="chart-legend">
            <div class="legend-item">
                <span class="legend-dot" style="background: #3b82f6;"></span>
                <span>This location</span>
            </div>
            <div class="legend-item">
                <span class="legend-dot" style="background: #5E6976;"></span>
                <span>Your store</span>
            </div>
        </div>
    </div>`;
    
    return chartHtml;
}

// Helper functions for performance metrics
function getLeadPerVehicle(dealer) {
    // Mock calculation: leads divided by inventory
    const leadRates = { 1: 0.8, 2: 1.2, 3: 0.6, 4: 0.9, 5: 0.7, 6: 0.5, 7: 1.1, 8: 0.4, 9: 0.8, 10: 0.7, 11: 1.3, 12: 0.5, 13: 1.4, 14: 0.9, 15: 0.6 };
    return leadRates[dealer.id] || 0.8;
}

function getSRPtoVDP(dealer) {
    // Mock SRP to VDP conversion rate
    const conversionRates = { 1: 28, 2: 32, 3: 25, 4: 30, 5: 27, 6: 22, 7: 31, 8: 18, 9: 29, 10: 26, 11: 34, 12: 20, 13: 36, 14: 28, 15: 24 };
    return conversionRates[dealer.id] || 28;
}

function getTurnTime(dealer) {
    // Mock turn time in days
    const turnTimes = { 1: 42, 2: 38, 3: 45, 4: 35, 5: 40, 6: 52, 7: 36, 8: 48, 9: 39, 10: 44, 11: 34, 12: 50, 13: 32, 14: 41, 15: 46 };
    return turnTimes[dealer.id] || 40;
}

function getGoodDealsPercentage(dealer) {
    // Calculate percentage of Great + Good + Fair deals from pricing data
    if (dealer.pricingData) {
        const greatDeal = dealer.pricingData['Great deal'].percent || 0;
        const goodDeal = dealer.pricingData['Good deal'].percent || 0;
        const fairDeal = dealer.pricingData['Fair deal'].percent || 0;
        return greatDeal + goodDeal + fairDeal;
    }
    return 60; // Default
}

function getFairShare(dealer) {
    // Mock fair share percentage
    const fairShares = { 1: 118, 2: 95, 3: 82, 4: 105, 5: 112, 6: 68, 7: 98, 8: 75, 9: 102, 10: 88, 11: 122, 12: 72, 13: 128, 14: 92, 15: 65 };
    return fairShares[dealer.id] || 100;
}

// Get review summary for dealer
function getReviewSummary(dealer) {
    // In a real implementation, this would fetch and analyze reviews from multiple sources
    // For now, we'll use mock summaries
    const reviewSummaries = {
        1: {
            summary: "Boston Volvo Cars receives consistently high praise for their professional and knowledgeable sales staff, with customers particularly appreciating their no-pressure approach. Service department is noted for transparency and timely repairs, though some customers mention higher than average pricing. Overall satisfaction rating is strong with many repeat customers.",
            sources: { google: 4.3, yelp: 4.0, cargurus: 4.5 },
            totalReviews: 287
        },
        2: {
            summary: "Toyota of Watertown is highly regarded for their extensive inventory and competitive pricing. Customers frequently commend the efficient purchase process and helpful finance team. Some reviews mention occasional wait times during busy periods, but the service quality remains consistently good.",
            sources: { google: 4.4, yelp: 3.9, cargurus: 4.3 },
            totalReviews: 412
        },
        3: {
            summary: "Jaffarian Toyota Volvo stands out for their exceptional customer service and attention to detail. Many reviewers highlight the dealership's willingness to go above and beyond, especially in the service department. The dual-brand expertise is seen as a major advantage by customers who own vehicles from either manufacturer.",
            sources: { google: 4.6, yelp: 4.2, cargurus: 4.4 },
            totalReviews: 198
        }
    };
    
    // Default summary for dealers without specific data
    const defaultSummary = {
        summary: "This dealership maintains a solid reputation with generally positive customer feedback. Reviews indicate satisfactory sales and service experiences, with customers appreciating the selection and staff professionalism. As with many dealerships, experiences can vary, but overall ratings suggest reliable service.",
        sources: { google: 4.1, yelp: 3.8, cargurus: 4.0 },
        totalReviews: 156
    };
    
    const reviewData = reviewSummaries[dealer.id] || defaultSummary;
    
    return `
        <div class="review-content">
            <p class="review-text">${reviewData.summary}</p>
            <div class="review-sources">
                <div class="source-rating">
                    <span class="source-name">Google</span>
                    <span class="rating">${reviewData.sources.google} ★</span>
                </div>
                <div class="source-rating">
                    <span class="source-name">Yelp</span>
                    <span class="rating">${reviewData.sources.yelp} ★</span>
                </div>
                <div class="source-rating">
                    <span class="source-name">CarGurus</span>
                    <span class="rating">${reviewData.sources.cargurus} ★</span>
                </div>
            </div>
            <p class="review-count">Based on ${reviewData.totalReviews} total reviews</p>
        </div>
    `;
}

// Create pricing chart
function createPricingChart(dealer) {
    // Use actual dealer pricing data
    const dealerPricingData = dealer.pricingData || {
        'Great deal': { percent: 5 },
        'Good deal': { percent: 10 },
        'Fair deal': { percent: 35 },
        'High priced': { percent: 30 },
        'Over priced': { percent: 15 },
        'Uncertain': { percent: 5 }
    };
    
    // Define colors and calculate average competitor values
    const pricingData = {
        'Great deal': { color: '#078A0B', thisLocation: dealerPricingData['Great deal'].percent, avgCompetitor: 6 },
        'Good deal': { color: '#09AD0E', thisLocation: dealerPricingData['Good deal'].percent, avgCompetitor: 12 },
        'Fair deal': { color: '#FFC651', thisLocation: dealerPricingData['Fair deal'].percent, avgCompetitor: 40 },
        'High priced': { color: '#FF7F57', thisLocation: dealerPricingData['High priced'].percent, avgCompetitor: 25 },
        'Over priced': { color: '#BD1A2E', thisLocation: dealerPricingData['Over priced'].percent, avgCompetitor: 12 },
        'Uncertain': { color: '#79828D', thisLocation: dealerPricingData['Uncertain'].percent, avgCompetitor: 5 }
    };
    
    let chartHtml = '<div class="stacked-bar-chart">';
    
    // This location bar
    chartHtml += '<div class="stacked-bar-row">';
    chartHtml += '<div class="stacked-bar-label">This location</div>';
    chartHtml += '<div class="stacked-bar-container">';
    
    Object.entries(pricingData).forEach(([priceType, data]) => {
        if (data.thisLocation > 0) {
            chartHtml += `<div class="stacked-bar-segment" style="width: ${data.thisLocation}%; background-color: ${data.color};"></div>`;
        }
    });
    
    chartHtml += '</div></div>';
    
    // Avg competitor bar
    chartHtml += '<div class="stacked-bar-row">';
    chartHtml += '<div class="stacked-bar-label">Avg competitor</div>';
    chartHtml += '<div class="stacked-bar-container">';
    
    Object.entries(pricingData).forEach(([priceType, data]) => {
        if (data.avgCompetitor > 0) {
            chartHtml += `<div class="stacked-bar-segment" style="width: ${data.avgCompetitor}%; background-color: ${data.color};"></div>`;
        }
    });
    
    chartHtml += '</div></div>';
    
    // Legend
    chartHtml += '<div class="pricing-legend">';
    Object.entries(pricingData).forEach(([priceType, data]) => {
        chartHtml += `
            <div class="legend-item">
                <span class="legend-dot" style="background: ${data.color};"></span>
                <span>${priceType}</span>
            </div>
        `;
    });
    chartHtml += '</div>';
    
    chartHtml += '</div>';
    
    return chartHtml;
}