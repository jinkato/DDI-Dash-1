// Total Leads Page JavaScript
// This file handles chart and table rendering with filtered data

// Store chart instances
let totalLeadsChart = null;
let leadsPerVehicleChart = null;
let currentTab = 'total-leads';

// Expose closeDetailPanel function globally for onclick handler
window.closeDetailPanel = function() {
    const panel = document.getElementById('detail-panel');
    panel.classList.remove('active');
    document.body.classList.remove('detail-panel-open');
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeTotalLeadsPage();
});

function initializeTotalLeadsPage() {
    // Initialize tab switching
    initializeTabSwitching();

    // Initialize callout link
    initializeCalloutLink();

    // Initialize filters with shared function from trends-filters.js
    // Pass config indicating this page has lead type filters
    initializeFilters(
        { hasLeadTypeFilter: true },
        function(filteredData) {
            // This callback is called on initial load and whenever filters change
            renderTotalLeadsChart(filteredData);
            renderLeadsPerVehicleChart(filteredData);
            renderTable(filteredData);
            updateMarketAverageDisplay();
            updateMarketDealerCount();

            // Update Trends button URL with new filter state
            if (typeof window.updateTrendsButtonURL === 'function') {
                window.updateTrendsButtonURL();
            }
        }
    );
}

/**
 * Initialize tab switching functionality
 */
function initializeTabSwitching() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const totalLeadsContainer = document.getElementById('total-leads-container');
    const lpvContainer = document.getElementById('leads-per-vehicle-container');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');

            // Update active tab button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Update current tab
            currentTab = tabName;

            // Show/hide appropriate chart container
            if (tabName === 'total-leads') {
                totalLeadsContainer.style.display = 'block';
                lpvContainer.style.display = 'none';
            } else if (tabName === 'leads-per-vehicle') {
                totalLeadsContainer.style.display = 'none';
                lpvContainer.style.display = 'block';
            }
        });
    });
}

/**
 * Update the market average display with current radius and franchise type
 */
function updateMarketAverageDisplay() {
    const marketAverageValue = document.querySelector('.market-average-value');
    if (marketAverageValue) {
        const radius = currentFilters.radius;
        const franchiseType = currentFilters.franchiseType;
        marketAverageValue.textContent = `${radius}, ${franchiseType}`;
    }
}

/**
 * Update the market dealer count in the side panel
 */
function updateMarketDealerCount() {
    const marketDealerCountEl = document.getElementById('marketDealerCount');
    if (marketDealerCountEl && typeof calculateMarketSampleSize === 'function') {
        const count = calculateMarketSampleSize();
        marketDealerCountEl.textContent = count.toLocaleString();
    }
}

/**
 * Initialize the "Show me" link in the market callout
 */
function initializeCalloutLink() {
    const showLuxuryLink = document.getElementById('show-luxury-link');
    if (showLuxuryLink) {
        showLuxuryLink.addEventListener('click', function(e) {
            e.preventDefault();

            // Uncheck all vehicle type checkboxes
            const vehicleCheckboxes = document.querySelectorAll('.vehicle-type-checkbox');
            vehicleCheckboxes.forEach(checkbox => {
                checkbox.checked = false;
            });

            // Check only the Luxury checkbox
            const luxuryCheckbox = Array.from(vehicleCheckboxes).find(cb => cb.value === 'Luxury');
            if (luxuryCheckbox) {
                luxuryCheckbox.checked = true;
            }

            // Trigger the filter change
            const selectedTypes = Array.from(vehicleCheckboxes)
                .filter(cb => cb.checked)
                .map(cb => cb.value);

            currentFilters.vehicleTypes = selectedTypes;
            const data = getFilteredData();
            renderChart(data);
            renderTable(data);

            // Scroll to the filter panel to show the user what changed
            const filterPanel = document.querySelector('.filter-panel');
            if (filterPanel) {
                filterPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    }
}

/**
 * Render or update the Total Leads bar chart
 */
function renderTotalLeadsChart(data) {
    const canvas = document.getElementById('total-leads-chart');
    if (!canvas) {
        console.error('Canvas element with id "total-leads-chart" not found');
        return;
    }

    const ctx = canvas.getContext('2d');

    // Destroy existing chart if it exists
    if (totalLeadsChart) {
        totalLeadsChart.destroy();
    }

    // Check groupBy filter
    const groupBy = window.currentFilters.groupBy || 'none';
    const months = data.months;
    const inventory = data.inventory;
    const lpvByDealRating = data.lpvByDealRating;
    let datasets = [];

    if (groupBy === 'none') {
        // No grouping - show total leads
        datasets = [{
            label: 'Total Leads',
            data: data.totalLeads,
            backgroundColor: '#0763D3',
            borderWidth: 0
        }];
    } else if (groupBy === 'deal-rating') {
        // Group by deal rating - show stacked bars
        const dealRatingColors = {
            'Over Priced': '#BD1A2E',
            'High Priced': '#FF7F57',
            'Fair Deal': '#FFC651',
            'Good Deal': '#09AD0E',
            'Great Deal': '#078A0B'
        };

        // Calculate total share of selected ratings to normalize
        let totalShare = 0;
        window.currentFilters.dealRatings.forEach(rating => {
            totalShare += TRENDS_MOCK_DATA.dealRatingData[rating].inventoryShare;
        });

        // Build datasets in reverse order for proper stacking (worst deals at bottom)
        const ratingsOrder = ['Over Priced', 'High Priced', 'Fair Deal', 'Good Deal', 'Great Deal'];
        ratingsOrder.forEach(rating => {
            if (window.currentFilters.dealRatings.includes(rating)) {
                const ratingData = TRENDS_MOCK_DATA.dealRatingData[rating];

                // Split the existing totalLeads proportionally - don't recalculate from inventory
                const ratingLeads = data.totalLeads.map(totalLeads => {
                    const normalizedShare = ratingData.inventoryShare / totalShare;
                    return Math.round(totalLeads * normalizedShare);
                });

                datasets.push({
                    label: rating,
                    data: ratingLeads,
                    backgroundColor: dealRatingColors[rating],
                    borderWidth: 0
                });
            }
        });
    } else if (groupBy === 'vehicle-type') {
        // Group by vehicle type - show stacked bars
        const vehicleTypeColors = {
            'Luxury': '#C7CEEA',
            'Truck': '#95E1D3',
            'SUV/CO': '#556FB5',
            'Sedans': '#4ECDC4',
            'Compact': '#FF6B9D'
        };

        // Calculate total share of selected types
        let totalShare = 0;
        window.currentFilters.vehicleTypes.forEach(type => {
            totalShare += TRENDS_MOCK_DATA.vehicleTypeData[type].inventoryShare;
        });

        // Build datasets in reverse order for proper stacking
        const typesOrder = ['Luxury', 'Truck', 'SUV/CO', 'Sedans', 'Compact'];
        typesOrder.forEach(type => {
            if (window.currentFilters.vehicleTypes.includes(type)) {
                const typeData = TRENDS_MOCK_DATA.vehicleTypeData[type];

                // Split the existing totalLeads proportionally - don't recalculate from inventory
                const typeLeads = data.totalLeads.map(totalLeads => {
                    const normalizedShare = typeData.inventoryShare / totalShare;
                    return Math.round(totalLeads * normalizedShare);
                });

                datasets.push({
                    label: type,
                    data: typeLeads,
                    backgroundColor: vehicleTypeColors[type],
                    borderWidth: 0
                });
            }
        });
    } else if (groupBy === 'lead-type') {
        // Group by lead type - show stacked bars
        const leadTypeColors = {
            'Text': '#BD1A2E',
            'Chat': '#FF7F57',
            'Digital deal': '#FFC651',
            'Phone': '#09AD0E',
            'Standard email': '#0763D3'
        };

        // Calculate total leads for each lead type based on their share
        const typesOrder = ['Text', 'Chat', 'Digital deal', 'Phone', 'Standard email'];
        typesOrder.forEach(type => {
            if (window.currentFilters.leadTypes.includes(type)) {
                const typeData = TRENDS_MOCK_DATA.leadTypeData[type];

                // Calculate leads for this type - proportion of total leads
                const typeLeads = data.totalLeads.map(total => Math.round(total * typeData.leadsShare));

                datasets.push({
                    label: type,
                    data: typeLeads,
                    backgroundColor: leadTypeColors[type],
                    borderWidth: 0
                });
            }
        });
    }

    // Create new chart with filtered data
    totalLeadsChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.months,
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 0
            },
            plugins: {
                legend: {
                    display: groupBy !== 'none',
                    position: 'bottom',
                    labels: {
                        font: {
                            size: 12,
                            weight: '500'
                        },
                        color: '#6B7280',
                        padding: 15,
                        usePointStyle: true,
                        pointStyle: 'rectRounded'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    cornerRadius: 6,
                    titleFont: {
                        size: 13,
                        weight: '600'
                    },
                    bodyFont: {
                        size: 12
                    }
                }
            },
            scales: {
                x: {
                    stacked: groupBy !== 'none',
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        color: '#6B7280',
                        font: {
                            size: 11
                        }
                    }
                },
                y: {
                    stacked: groupBy !== 'none',
                    beginAtZero: true,
                    grid: {
                        color: '#E5E7EB',
                        drawBorder: false
                    },
                    ticks: {
                        font: {
                            size: 12,
                            weight: '500'
                        },
                        color: '#6B7280',
                        padding: 8
                    }
                }
            }
        }
    });
}

/**
 * Render or update the Leads per Vehicle line chart
 */
function renderLeadsPerVehicleChart(data) {
    const canvas = document.getElementById('leads-per-vehicle-chart');
    if (!canvas) {
        console.error('Canvas element with id "leads-per-vehicle-chart" not found');
        return;
    }

    const ctx = canvas.getContext('2d');

    // Destroy existing chart if it exists
    if (leadsPerVehicleChart) {
        leadsPerVehicleChart.destroy();
    }

    // Check groupBy filter
    const groupBy = window.currentFilters.groupBy || 'none';
    const showMarketAverage = window.currentFilters.showMarketAverage;
    let datasets = [];

    // Build datasets based on groupBy setting
    if (groupBy === 'none') {
        // No grouping - show Your Dealership and optionally Market Average
        datasets.push({
            label: 'Your Dealership',
            data: data.leadsPerVehicle,
            backgroundColor: '#3B82F6',
            borderColor: '#3B82F6',
            borderWidth: 2,
            tension: 0.3,
            pointRadius: 4,
            pointHoverRadius: 6,
            pointBackgroundColor: '#3B82F6',
            pointBorderColor: '#FFFFFF',
            pointBorderWidth: 2,
            fill: false
        });

        if (showMarketAverage) {
            datasets.push({
                label: 'Market Average',
                data: data.marketAvg,
                backgroundColor: '#9CA3AF',
                borderColor: '#9CA3AF',
                borderWidth: 2,
                borderDash: [5, 5],
                tension: 0.3,
                pointRadius: 0,
                pointHoverRadius: 4,
                pointBackgroundColor: '#9CA3AF',
                pointBorderColor: '#FFFFFF',
                pointBorderWidth: 2,
                fill: false
            });
        }
    } else if (groupBy === 'deal-rating') {
        // Group by deal rating - show one line per selected deal rating
        const dealRatingColors = {
            'Great Deal': '#078A0B',
            'Good Deal': '#09AD0E',
            'Fair Deal': '#FFC651',
            'High Priced': '#FF7F57',
            'Over Priced': '#BD1A2E'
        };

        window.currentFilters.dealRatings.forEach(rating => {
            if (data.leadsPerVehicleByDealRating && data.leadsPerVehicleByDealRating[rating]) {
                datasets.push({
                    label: rating,
                    data: data.leadsPerVehicleByDealRating[rating],
                    backgroundColor: dealRatingColors[rating],
                    borderColor: dealRatingColors[rating],
                    borderWidth: 2,
                    tension: 0.3,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    pointBackgroundColor: dealRatingColors[rating],
                    pointBorderColor: '#FFFFFF',
                    pointBorderWidth: 2,
                    fill: false
                });
            }
        });
    } else if (groupBy === 'vehicle-type') {
        // Group by vehicle type - show one line per selected vehicle type
        const vehicleTypeColors = {
            'Compact': '#FF6B9D',
            'Sedans': '#4ECDC4',
            'SUV/CO': '#556FB5',
            'Truck': '#95E1D3',
            'Luxury': '#C7CEEA'
        };

        window.currentFilters.vehicleTypes.forEach(type => {
            if (data.leadsPerVehicleByVehicleType && data.leadsPerVehicleByVehicleType[type]) {
                datasets.push({
                    label: type,
                    data: data.leadsPerVehicleByVehicleType[type],
                    backgroundColor: vehicleTypeColors[type],
                    borderColor: vehicleTypeColors[type],
                    borderWidth: 2,
                    tension: 0.3,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    pointBackgroundColor: vehicleTypeColors[type],
                    pointBorderColor: '#FFFFFF',
                    pointBorderWidth: 2,
                    fill: false
                });
            }
        });
    } else if (groupBy === 'lead-type') {
        // Group by lead type - show one line per selected lead type
        const leadTypeColors = {
            'Standard email': '#0763D3',
            'Phone': '#09AD0E',
            'Digital deal': '#FFC651',
            'Chat': '#FF7F57',
            'Text': '#BD1A2E'
        };

        window.currentFilters.leadTypes.forEach(type => {
            if (data.leadsPerVehicleByLeadType && data.leadsPerVehicleByLeadType[type]) {
                datasets.push({
                    label: type,
                    data: data.leadsPerVehicleByLeadType[type],
                    backgroundColor: leadTypeColors[type],
                    borderColor: leadTypeColors[type],
                    borderWidth: 2,
                    tension: 0.3,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    pointBackgroundColor: leadTypeColors[type],
                    pointBorderColor: '#FFFFFF',
                    pointBorderWidth: 2,
                    fill: false
                });
            }
        });
    }

    // Create new chart with filtered data
    leadsPerVehicleChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.months,
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
                        font: {
                            size: 12,
                            weight: '500'
                        },
                        color: '#6B7280',
                        padding: 15,
                        usePointStyle: true,
                        pointStyle: 'rectRounded'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    cornerRadius: 6,
                    titleFont: {
                        size: 13,
                        weight: '600'
                    },
                    bodyFont: {
                        size: 12
                    },
                    callbacks: {
                        label: function(context) {
                            const value = context.parsed.y;
                            const datasetLabel = context.dataset.label;
                            const dataIndex = context.dataIndex;

                            // Get corresponding inventory and total leads from the data
                            const inventory = data.inventory[dataIndex];
                            const totalLeads = data.totalLeads[dataIndex];

                            return [
                                `${datasetLabel}: ${value.toFixed(2)}`,
                                `Total Leads: ${totalLeads}`,
                                `Inventory: ${inventory}`
                            ];
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        color: '#6B7280',
                        font: {
                            size: 11
                        },
                        autoSkip: false,
                        maxRotation: 45,
                        minRotation: 45
                    }
                },
                y: {
                    beginAtZero: false,
                    grid: {
                        color: '#E5E7EB',
                        drawBorder: false
                    },
                    ticks: {
                        font: {
                            size: 12,
                            weight: '500'
                        },
                        color: '#6B7280',
                        padding: 8
                    },
                    title: {
                        display: true,
                        text: 'Leads per Vehicle',
                        font: {
                            size: 13,
                            weight: '500'
                        },
                        color: '#6B7280',
                        padding: 8
                    }
                }
            }
        }
    });
}

/**
 * Render or update the table with filtered data
 */
function renderTable(data) {
    const tbody = document.querySelector('.vehicle-table tbody');
    tbody.innerHTML = '';

    // Check if we have data
    if (data.months.length === 0) {
        const emptyRow = document.createElement('tr');
        emptyRow.innerHTML = '<td colspan="5" style="text-align: center; padding: 20px;">No data matches the current filters</td>';
        tbody.appendChild(emptyRow);
        return;
    }

    // Generate rows for each month (in reverse order - most recent first)
    for (let i = data.months.length - 1; i >= 0; i--) {
        // Calculate difference: Your Leads per Vehicle - Market Average
        const yourLeadsPerVehicle = parseFloat(data.leadsPerVehicle[i]);
        const marketAvg = parseFloat(data.marketAvg[i]);
        const difference = (yourLeadsPerVehicle - marketAvg).toFixed(1);
        const diffClass = parseFloat(difference) > 0 ? 'text-positive' : parseFloat(difference) < 0 ? 'text-negative' : 'text-neutral';
        const diffDisplay = parseFloat(difference) > 0 ? `+${difference}` : difference;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${data.months[i]}</td>
            <td>
                <div style="display: flex; flex-direction: column; gap: 2px;">
                    <span>${data.marketAvg[i]}</span>
                    <span class="tooltip-trigger" style="font-size: 12px; color: #5E6976;">
                        ${data.marketSampleSize} vehicles
                        <span class="tooltip-content">
                            <strong>Market Sample Size</strong><br>
                            Based on ${data.marketSampleSize} vehicles in your selected market area.<br>
                            Larger samples provide more reliable averages.
                        </span>
                    </span>
                </div>
            </td>
            <td>
                <div style="display: flex; flex-direction: column; gap: 2px;">
                    <span>${data.leadsPerVehicle[i]}</span>
                    <span class="tooltip-trigger" style="font-size: 12px; color: #5E6976;">
                        ${data.inventory[i]} vehicles
                        <span class="tooltip-content">
                            <strong>Your Inventory</strong><br>
                            This metric is based on ${data.inventory[i]} vehicles in your dealership.<br>
                            Larger samples provide more reliable averages.
                        </span>
                    </span>
                </div>
            </td>
            <td>
                <span class="${diffClass}">${diffDisplay}</span>
            </td>
            <td>${data.totalLeads[i]}</td>
        `;
        tbody.appendChild(row);
    }

    // Tooltips are now handled via CSS (tooltip.css)
    // addMarketSampleTooltips();
    // addDealershipInventoryTooltips();

    // Add explore link functionality
    // addExploreLinkListeners(data); // Commented out - Explore links now navigate to explore.html
}

/**
 * Add tooltips to market sample size elements
 */
function addMarketSampleTooltips() {
    const sampleSizeElements = document.querySelectorAll('.market-sample-size');

    sampleSizeElements.forEach(element => {
        element.addEventListener('mouseenter', function(e) {
            const tooltip = document.createElement('div');
            tooltip.className = 'market-sample-tooltip';
            tooltip.innerHTML = `
                <strong>Market Sample Size</strong><br>
                Based on ${this.textContent} in your selected market area.<br>
                Larger samples provide more reliable averages.
            `;
            document.body.appendChild(tooltip);

            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) + 'px';
            tooltip.style.top = (rect.top - 10) + 'px';
            tooltip.style.transform = 'translate(-50%, -100%)';

            setTimeout(() => tooltip.classList.add('visible'), 10);
        });

        element.addEventListener('mouseleave', function() {
            document.querySelectorAll('.market-sample-tooltip').forEach(tooltip => {
                tooltip.remove();
            });
        });
    });
}

/**
 * Add tooltips to dealership inventory elements
 */
function addDealershipInventoryTooltips() {
    const inventoryElements = document.querySelectorAll('.dealership-inventory');

    inventoryElements.forEach(element => {
        element.addEventListener('mouseenter', function(e) {
            const tooltip = document.createElement('div');
            tooltip.className = 'dealership-inventory-tooltip';
            tooltip.innerHTML = `
                <strong>Your Inventory</strong><br>
                This metric is based on ${this.textContent} in your dealership.<br>
                Matches the Total Inventory column.
            `;
            document.body.appendChild(tooltip);

            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) + 'px';
            tooltip.style.top = (rect.top - 10) + 'px';
            tooltip.style.transform = 'translate(-50%, -100%)';

            setTimeout(() => tooltip.classList.add('visible'), 10);
        });

        element.addEventListener('mouseleave', function() {
            document.querySelectorAll('.dealership-inventory-tooltip').forEach(tooltip => {
                tooltip.remove();
            });
        });
    });
}

/**
 * Add event listeners to explore links
 */
function addExploreLinkListeners(data) {
    const exploreLinks = document.querySelectorAll('.explore-link');

    exploreLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const monthIndex = parseInt(this.getAttribute('data-month-index'));
            openDetailPanel(data, monthIndex);
        });
    });
}

/**
 * Open the detail panel with data for a specific month
 */
function openDetailPanel(data, monthIndex) {
    const panel = document.getElementById('detail-panel');
    const content = document.getElementById('detail-panel-content');

    // Get data for this month
    const month = data.months[monthIndex];
    const inventory = data.inventory[monthIndex];
    const totalLeads = data.totalLeads[monthIndex];
    const leadsPerVehicle = data.leadsPerVehicle[monthIndex];
    const marketAvg = data.marketAvg[monthIndex];

    // Calculate difference from market
    const diffFromMarket = (parseFloat(leadsPerVehicle) - parseFloat(marketAvg)).toFixed(1);
    const diffPercent = ((parseFloat(leadsPerVehicle) / parseFloat(marketAvg) - 1) * 100).toFixed(0);
    const performanceStatus = parseFloat(diffFromMarket) > 0 ? 'positive' : parseFloat(diffFromMarket) < 0 ? 'negative' : 'neutral';
    const performanceText = parseFloat(diffFromMarket) > 0 ? 'Above' : parseFloat(diffFromMarket) < 0 ? 'Below' : 'At';

    // Populate the panel content
    content.innerHTML = `
        <div class="detail-section">
            <h2>${month} - Detailed Analysis</h2>

            <div class="detail-metric-section">
                <h3>Key Metrics</h3>
                <div class="metric-grid">
                    <div class="metric-item">
                        <span class="metric-label">Total Inventory</span>
                        <span class="metric-value">${inventory}</span>
                    </div>
                    <div class="metric-item">
                        <span class="metric-label">Total Leads</span>
                        <span class="metric-value">${totalLeads}</span>
                    </div>
                    <div class="metric-item">
                        <span class="metric-label">Leads/Vehicle</span>
                        <span class="metric-value">${leadsPerVehicle}</span>
                    </div>
                </div>
            </div>

            <div class="detail-market-section">
                <h3>Market Comparison</h3>
                <div class="market-analysis">
                    <p class="market-trend">
                        Your leads per vehicle: <strong>${leadsPerVehicle}</strong><br>
                        Market average: <strong>${marketAvg}</strong>
                    </p>
                    <p>
                        You are performing
                        <span class="performance-indicator ${performanceStatus}">
                            ${performanceText} market by ${Math.abs(diffFromMarket)} leads/vehicle (${diffPercent > 0 ? '+' : ''}${diffPercent}%)
                        </span>
                    </p>
                    <p class="deal-specific">
                        Market sample size: ${data.marketSampleSize} vehicles within ${currentFilters.radius}
                    </p>
                </div>
            </div>

            <div class="detail-insights">
                <h3>Insights & Recommendations</h3>
                <ul>
                    ${performanceStatus === 'positive' ? `
                        <li>Your dealership is outperforming the market average in ${month}. Continue your current marketing and pricing strategies.</li>
                        <li>Consider analyzing which vehicle types are driving this strong performance.</li>
                    ` : performanceStatus === 'negative' ? `
                        <li>Your dealership is underperforming the market average. Consider reviewing your pricing strategy and vehicle mix.</li>
                        <li>Check if specific vehicle types are bringing down your overall performance.</li>
                        <li>Review your online listings and ensure competitive pricing and high-quality photos.</li>
                    ` : `
                        <li>Your dealership is performing at market average. Look for opportunities to differentiate and improve.</li>
                    `}
                    <li>With ${inventory} vehicles generating ${totalLeads} leads, you're averaging ${leadsPerVehicle} leads per vehicle.</li>
                    <li>Use the filters to analyze performance by vehicle type, brand, and deal rating to identify opportunities.</li>
                </ul>
            </div>
        </div>
    `;

    // Show the panel
    panel.classList.add('active');
    document.body.classList.add('detail-panel-open');
}
