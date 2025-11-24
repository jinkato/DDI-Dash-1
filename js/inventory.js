/**
 * Inventory Page JavaScript
 * Handles the inventory chart and table rendering
 */

let inventoryChartInstance = null;

/**
 * Initialize the inventory page
 */
function initializeInventoryPage() {
    console.log('Initializing inventory page...');

    // Initialize filters (will decode from URL if present)
    initializeFilters(
        { hasLeadTypeFilter: false },
        function(filteredData) {
            // This callback is called on initial load and whenever filters change
            updateInventoryChart(filteredData);
            updateInventoryTable(filteredData);
        }
    );
}

/**
 * Update the inventory chart
 */
function updateInventoryChart(data) {
    const ctx = document.getElementById('inventory-chart');
    if (!ctx) return;

    // Destroy existing chart
    if (inventoryChartInstance) {
        inventoryChartInstance.destroy();
    }

    // Get inventory breakdown over time
    const months = data.months;
    const inventory = data.inventory;
    const groupBy = window.currentFilters.groupBy || 'none';

    let datasets;

    if (groupBy === 'none') {
        // No grouping - show total inventory
        datasets = [{
            label: 'Total Inventory',
            data: inventory,
            backgroundColor: '#0763D3',
            borderWidth: 0
        }];
    } else if (groupBy === 'vehicle-type') {
        // Group by vehicle type
        const selectedVehicleTypes = window.currentFilters.vehicleTypes || ['Compact', 'Sedans', 'SUV/CO', 'Truck', 'Luxury'];
        const allVehicleTypes = ['Compact', 'Sedans', 'SUV/CO', 'Truck', 'Luxury'];
        const allColorVars = ['--color-compact', '--color-sedans', '--color-suv-co', '--color-truck', '--color-luxury'];

        // Calculate total share of selected types to normalize
        let totalShare = 0;
        selectedVehicleTypes.forEach(type => {
            totalShare += EXPLORE_MOCK_DATA.vehicleTypeData[type].inventoryShare;
        });

        datasets = selectedVehicleTypes.map((type) => {
            const typeIndex = allVehicleTypes.indexOf(type);
            const typeData = EXPLORE_MOCK_DATA.vehicleTypeData[type];
            // Normalize share so selected types add up to 100%
            const normalizedShare = typeData.inventoryShare / totalShare;
            const typeInventory = inventory.map(inv => Math.round(inv * normalizedShare));

            return {
                label: type,
                data: typeInventory,
                backgroundColor: getComputedStyle(document.documentElement).getPropertyValue(allColorVars[typeIndex]),
                borderWidth: 0
            };
        }).reverse();
    } else {
        // Group by deal rating (default)
        const selectedDealRatings = window.currentFilters.dealRatings || ['Great Deal', 'Good Deal', 'Fair Deal', 'High Priced', 'Over Priced'];
        const allDealRatings = ['Great Deal', 'Good Deal', 'Fair Deal', 'High Priced', 'Over Priced'];
        const allColorVars = ['--color-great-deal', '--color-good-deal', '--color-fair-deal', '--color-high-priced', '--color-over-priced'];

        // Calculate total share of selected ratings to normalize
        let totalShare = 0;
        selectedDealRatings.forEach(rating => {
            totalShare += EXPLORE_MOCK_DATA.dealRatingData[rating].inventoryShare;
        });

        datasets = selectedDealRatings.map((rating) => {
            const ratingIndex = allDealRatings.indexOf(rating);
            const ratingData = EXPLORE_MOCK_DATA.dealRatingData[rating];
            // Normalize share so selected ratings add up to 100%
            const normalizedShare = ratingData.inventoryShare / totalShare;
            const ratingInventory = inventory.map(inv => Math.round(inv * normalizedShare));

            return {
                label: rating,
                data: ratingInventory,
                backgroundColor: getComputedStyle(document.documentElement).getPropertyValue(allColorVars[ratingIndex]),
                borderWidth: 0
            };
        }).reverse();
    }

    inventoryChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: months,
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 0
            },
            interaction: {
                mode: 'index',
                intersect: false
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        font: { size: 11 },
                        color: '#6B7280',
                        padding: 10,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    cornerRadius: 6,
                    titleFont: { size: 13, weight: '600' },
                    bodyFont: { size: 12 },
                    itemSort: function(a, b) {
                        // Sort tooltip items so Great Deal appears first
                        const dealRatingOrder = ['Great Deal', 'Good Deal', 'Fair Deal', 'High Priced', 'Over Priced'];
                        const vehicleTypeOrder = ['Compact', 'Sedans', 'SUV/CO', 'Truck', 'Luxury'];

                        const aIndexDeal = dealRatingOrder.indexOf(a.dataset.label);
                        const bIndexDeal = dealRatingOrder.indexOf(b.dataset.label);
                        const aIndexType = vehicleTypeOrder.indexOf(a.dataset.label);
                        const bIndexType = vehicleTypeOrder.indexOf(b.dataset.label);

                        // If both are deal ratings
                        if (aIndexDeal !== -1 && bIndexDeal !== -1) {
                            return aIndexDeal - bIndexDeal;
                        }
                        // If both are vehicle types
                        if (aIndexType !== -1 && bIndexType !== -1) {
                            return aIndexType - bIndexType;
                        }
                        return 0;
                    },
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y + ' vehicles';
                        },
                        footer: function(tooltipItems) {
                            let total = 0;
                            tooltipItems.forEach(item => {
                                total += item.parsed.y;
                            });
                            return 'Total: ' + total + ' vehicles';
                        }
                    }
                }
            },
            scales: {
                x: {
                    stacked: true,
                    grid: { display: false },
                    ticks: {
                        color: '#6B7280',
                        font: { size: 11 },
                        maxRotation: 45,
                        minRotation: 45
                    }
                },
                y: {
                    stacked: true,
                    beginAtZero: true,
                    grid: { color: '#E5E7EB' },
                    ticks: { color: '#6B7280', font: { size: 11 } },
                    title: {
                        display: true,
                        text: 'Number of Vehicles',
                        color: '#6B7280',
                        font: { size: 12, weight: '500' }
                    }
                }
            }
        }
    });
}

/**
 * Update the inventory table
 */
function updateInventoryTable(data) {
    const tableBody = document.getElementById('inventory-table-body');
    if (!tableBody) return;

    const months = data.months;
    const inventory = data.inventory;

    // Clear existing rows
    tableBody.innerHTML = '';

    // Get deal rating data to calculate percentages
    const selectedDealRatings = window.currentFilters.dealRatings || ['Great Deal', 'Good Deal', 'Fair Deal', 'High Priced', 'Over Priced'];

    // Calculate total share of Great, Good, and Fair deals
    const goodDealRatings = ['Great Deal', 'Good Deal', 'Fair Deal'];
    let totalShareGoodDeals = 0;

    goodDealRatings.forEach(rating => {
        if (selectedDealRatings.includes(rating) && EXPLORE_MOCK_DATA.dealRatingData[rating]) {
            totalShareGoodDeals += EXPLORE_MOCK_DATA.dealRatingData[rating].inventoryShare;
        }
    });

    // Calculate total share of all selected ratings for normalization
    let totalShareAll = 0;
    selectedDealRatings.forEach(rating => {
        if (EXPLORE_MOCK_DATA.dealRatingData[rating]) {
            totalShareAll += EXPLORE_MOCK_DATA.dealRatingData[rating].inventoryShare;
        }
    });

    // Normalize the good deals percentage
    const normalizedGoodDealsPercentage = totalShareAll > 0 ? (totalShareGoodDeals / totalShareAll) * 100 : 0;

    // Populate table with data
    months.forEach((month, index) => {
        const row = document.createElement('tr');

        // Month column
        const monthCell = document.createElement('td');
        monthCell.textContent = month;
        row.appendChild(monthCell);

        // % in Great Good Fair deal column
        const percentCell = document.createElement('td');
        percentCell.textContent = normalizedGoodDealsPercentage.toFixed(1) + '%';
        row.appendChild(percentCell);

        // Inventory column
        const inventoryCell = document.createElement('td');
        inventoryCell.textContent = inventory[index].toLocaleString();
        row.appendChild(inventoryCell);

        // MoM change column
        const momCell = document.createElement('td');
        if (index === 0) {
            // First month - no previous data
            momCell.textContent = '—';
            momCell.style.color = '#6B7280';
        } else {
            const previousInventory = inventory[index - 1];
            const currentInventory = inventory[index];
            const change = currentInventory - previousInventory;
            const percentChange = (change / previousInventory) * 100;

            if (change > 0) {
                momCell.textContent = '+' + percentChange.toFixed(1) + '%';
                momCell.style.color = '#10B981'; // Green for positive
            } else if (change < 0) {
                momCell.textContent = percentChange.toFixed(1) + '%';
                momCell.style.color = '#EF4444'; // Red for negative
            } else {
                momCell.textContent = '0.0%';
                momCell.style.color = '#6B7280'; // Gray for no change
            }
        }
        row.appendChild(momCell);

        tableBody.appendChild(row);
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeInventoryPage();
});
