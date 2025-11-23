// Total Leads Page JavaScript
// This file handles chart and table rendering with filtered data

// Store current chart instance
let currentChart = null;

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
    // Get initial data from filters
    const initialData = getInitialData();

    // Initialize chart and table with initial data
    renderChart(initialData);
    renderTable(initialData);

    // Initialize filter listeners
    initializeFilters(function(filteredData) {
        // This callback is called whenever filters change
        renderChart(filteredData);
        renderTable(filteredData);
        updateMarketAverageDisplay();
        updateMarketDealerCount();

        // Update Explore button URL with new filter state
        if (typeof window.updateExploreButtonURL === 'function') {
            window.updateExploreButtonURL();
        }
    });

    // Initialize market average display
    updateMarketAverageDisplay();

    // Initialize market dealer count
    updateMarketDealerCount();

    // Initialize callout link
    initializeCalloutLink();
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
 * Render or update the chart with filtered data
 */
function renderChart(data) {
    const canvas = document.getElementById('total-leads-chart');
    if (!canvas) {
        console.error('Canvas element with id "total-leads-chart" not found');
        return;
    }

    const ctx = canvas.getContext('2d');

    // Destroy existing chart if it exists
    if (currentChart) {
        currentChart.destroy();
    }

    // Create new chart with filtered data
    currentChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.months,
            datasets: [{
                label: 'Total Leads',
                data: data.totalLeads,
                backgroundColor: '#0763D3',
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
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

        // Determine trend icon
        let trendIcon = '';
        if (parseFloat(difference) > 0) {
            trendIcon = '<img src="img/trend icon/up.svg" alt="Up" style="width: 16px; height: 16px; margin-left: 4px;">';
        } else if (parseFloat(difference) < 0) {
            trendIcon = '<img src="img/trend icon/down.svg" alt="Down" style="width: 16px; height: 16px; margin-left: 4px;">';
        }

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${data.months[i]}</td>
            <td>${data.totalLeads[i]}</td>
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
                <div style="display: flex; align-items: center;">
                    <span class="${diffClass}">${diffDisplay}</span>
                    ${trendIcon}
                </div>
            </td>
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
