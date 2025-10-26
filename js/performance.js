// Performance Page JavaScript

// Sample performance data organized by vehicle type
const performanceData = [
    {
        vehicleType: 'Compact',
        currentStore: 2.8, // leads per vehicle (August)
        lastMonth: 2.6, // leads per vehicle (July)
        marketAvg: 2.4,
        valleyMotors: 2.5,
        performance: 85,
        dealRatings: [
            {
                rating: 'Great Deal',
                currentStore: 4.2,
                lastMonth: 3.8,
                marketAvg: 3.8,
                valleyMotors: 3.9
            },
            {
                rating: 'Good Deal',
                currentStore: 3.5,
                lastMonth: 3.3,
                marketAvg: 3.1,
                valleyMotors: 3.2
            },
            {
                rating: 'Fair Price',
                currentStore: 2.8,
                lastMonth: 2.7,
                marketAvg: 2.5,
                valleyMotors: 2.6
            },
            {
                rating: 'High Priced',
                currentStore: 1.5,
                lastMonth: 1.7,
                marketAvg: 1.8,
                valleyMotors: 1.7
            },
            {
                rating: 'Over Priced',
                currentStore: 0.8,
                lastMonth: 1.0,
                marketAvg: 1.1,
                valleyMotors: 1.0
            }
        ],
        trend: [2.5, 2.6, 2.6, 2.7, 2.7, 2.8, 2.8]
    },
    {
        vehicleType: 'Sedans',
        currentStore: 2.5,
        lastMonth: 2.4,
        marketAvg: 2.2,
        valleyMotors: 2.3,
        performance: 92,
        dealRatings: [
            {
                rating: 'Great Deal',
                currentStore: 3.8,
                lastMonth: 3.5,
                marketAvg: 3.4,
                valleyMotors: 3.5
            },
            {
                rating: 'Good Deal',
                currentStore: 3.2,
                lastMonth: 3.0,
                marketAvg: 2.9,
                valleyMotors: 3.0
            },
            {
                rating: 'Fair Price',
                currentStore: 2.5,
                lastMonth: 2.4,
                marketAvg: 2.3,
                valleyMotors: 2.4
            },
            {
                rating: 'High Priced',
                currentStore: 1.2,
                lastMonth: 1.3,
                marketAvg: 1.5,
                valleyMotors: 1.4
            },
            {
                rating: 'Over Priced',
                currentStore: 0.6,
                lastMonth: 0.7,
                marketAvg: 0.9,
                valleyMotors: 0.8
            }
        ],
        trend: [2.3, 2.3, 2.4, 2.4, 2.5, 2.5, 2.5]
    },
    {
        vehicleType: 'SUV/CO',
        currentStore: 3.2,
        lastMonth: 3.3,
        marketAvg: 2.9,
        valleyMotors: 3.0,
        performance: 78,
        dealRatings: [
            {
                rating: 'Great Deal',
                currentStore: 4.8,
                lastMonth: 4.6,
                marketAvg: 4.2,
                valleyMotors: 4.4
            },
            {
                rating: 'Good Deal',
                currentStore: 3.9,
                lastMonth: 3.8,
                marketAvg: 3.5,
                valleyMotors: 3.6
            },
            {
                rating: 'Fair Price',
                currentStore: 3.2,
                lastMonth: 3.2,
                marketAvg: 2.9,
                valleyMotors: 3.0
            },
            {
                rating: 'High Priced',
                currentStore: 1.8,
                lastMonth: 2.0,
                marketAvg: 2.0,
                valleyMotors: 1.9
            },
            {
                rating: 'Over Priced',
                currentStore: 0.9,
                lastMonth: 1.2,
                marketAvg: 1.2,
                valleyMotors: 1.1
            }
        ],
        trend: [3.3, 3.3, 3.2, 3.2, 3.2, 3.2, 3.2]
    },
    {
        vehicleType: 'Trucks',
        currentStore: 3.5,
        lastMonth: 3.0,
        marketAvg: 3.1,
        valleyMotors: 3.2,
        performance: 95,
        dealRatings: [
            {
                rating: 'Great Deal',
                currentStore: 5.2,
                lastMonth: 4.4,
                marketAvg: 4.5,
                valleyMotors: 4.7
            },
            {
                rating: 'Good Deal',
                currentStore: 4.3,
                lastMonth: 3.7,
                marketAvg: 3.8,
                valleyMotors: 4.0
            },
            {
                rating: 'Fair Price',
                currentStore: 3.5,
                lastMonth: 3.1,
                marketAvg: 3.2,
                valleyMotors: 3.3
            },
            {
                rating: 'High Priced',
                currentStore: 2.1,
                lastMonth: 1.9,
                marketAvg: 2.3,
                valleyMotors: 2.2
            },
            {
                rating: 'Over Priced',
                currentStore: 1.0,
                lastMonth: 1.1,
                marketAvg: 1.3,
                valleyMotors: 1.2
            }
        ],
        trend: [3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.5]
    },
    {
        vehicleType: 'Luxury',
        currentStore: 1.8,
        lastMonth: 1.9,
        marketAvg: 2.1,
        valleyMotors: 2.0,
        performance: 68,
        dealRatings: [
            {
                rating: 'Great Deal',
                currentStore: 3.2,
                lastMonth: 3.1,
                marketAvg: 3.5,
                valleyMotors: 3.4
            },
            {
                rating: 'Good Deal',
                currentStore: 2.5,
                lastMonth: 2.6,
                marketAvg: 2.8,
                valleyMotors: 2.7
            },
            {
                rating: 'Fair Price',
                currentStore: 1.8,
                lastMonth: 1.9,
                marketAvg: 2.1,
                valleyMotors: 2.0
            },
            {
                rating: 'High Priced',
                currentStore: 0.9,
                lastMonth: 1.0,
                marketAvg: 1.2,
                valleyMotors: 1.1
            },
            {
                rating: 'Over Priced',
                currentStore: 0.4,
                lastMonth: 0.6,
                marketAvg: 0.7,
                valleyMotors: 0.6
            }
        ],
        trend: [2.0, 1.9, 1.9, 1.8, 1.8, 1.8, 1.8]
    }
];

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePerformancePage();
});

// Calculate total leads per vehicle across all inventory
function calculateTotalLeadsPerVehicle() {
    let totals = {
        currentStore: 0,
        lastMonth: 0,
        marketAvg: 0,
        valleyMotors: 0,
        count: 0
    };
    
    // Sum up all vehicle types
    performanceData.forEach(vehicleType => {
        totals.currentStore += vehicleType.currentStore;
        totals.lastMonth += vehicleType.lastMonth;
        totals.marketAvg += vehicleType.marketAvg;
        totals.valleyMotors += vehicleType.valleyMotors;
        totals.count++;
    });
    
    // Calculate averages
    return {
        currentStore: totals.currentStore / totals.count,
        lastMonth: totals.lastMonth / totals.count,
        marketAvg: totals.marketAvg / totals.count,
        valleyMotors: totals.valleyMotors / totals.count
    };
}

function initializePerformancePage() {
    renderPerformanceTable();
    setupEventListeners();
    initializeTooltips();
}

function renderPerformanceTable() {
    const tbody = document.getElementById('performance-tbody');
    tbody.innerHTML = '';
    
    // Create store logo row
    const logoRow = document.createElement('tr');
    logoRow.className = 'store-logo-row';
    logoRow.innerHTML = `
        <th class="empty-cell"></th>
        <th class="store-logo-cell">
            <div class="store-logo">
                <img src="img/store_logo/store_1.png" alt="Your Store" />
            </div>
            <div class="store-name">August 2025</div>
        </th>
        <th class="store-logo-cell">
            <div class="store-logo">
                <img src="img/store_logo/store_1.png" alt="Your Store" />
            </div>
            <div class="store-name">July 2025</div>
        </th>
        <th class="metric-logo-cell">
            <div class="market-avg-logo">
                <div class="market-avg-box">21</div>
            </div>
            <div class="metric-label-header">Market Average</div>
        </th>
        <th class="competitor-logo-cell">
            <div class="competitor-logo">
                <img src="img/store_logo/store_6@2x.png" alt="Marlboro Nissan" />
            </div>
            <div class="competitor-name">Marlboro Nissan</div>
        </th>
    `;
    tbody.appendChild(logoRow);
    
    // Calculate totals for all inventory
    const totals = calculateTotalLeadsPerVehicle();
    
    // Create header row
    const headerRow = document.createElement('tr');
    headerRow.className = 'performance-header-row';
    headerRow.innerHTML = `
        <th class="section-header">Full inventory</th>
        <th class="metric-header">${totals.currentStore.toFixed(1)}</th>
        <th class="metric-header">${totals.lastMonth.toFixed(1)}</th>
        <th class="metric-header">${totals.marketAvg.toFixed(1)}</th>
        <th class="metric-header">${totals.valleyMotors.toFixed(1)}</th>
    `;
    tbody.appendChild(headerRow);
    
    performanceData.forEach((vehicleType, index) => {
        // Create main row
        const mainRow = document.createElement('tr');
        mainRow.dataset.index = index;
        mainRow.classList.add('vehicle-type-row');
        mainRow.innerHTML = `
            <td>
                <div class="vehicle-cell">
                    <div class="expand-icon">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                    </div>
                    <span class="vehicle-name">${vehicleType.vehicleType}</span>
                </div>
            </td>
            <td class="metric-cell">
                <span class="metric-value-cell ${getLeadsPerVehicleClass(vehicleType.currentStore)}">
                    ${vehicleType.currentStore.toFixed(1)}
                </span>
            </td>
            <td class="metric-cell">
                <span class="metric-value-cell ${getLeadsPerVehicleClass(vehicleType.lastMonth)}">
                    ${vehicleType.lastMonth.toFixed(1)}
                </span>
            </td>
            <td class="metric-cell">
                <span class="market-avg-cell">
                    ${vehicleType.marketAvg.toFixed(1)}
                </span>
            </td>
            <td class="metric-cell">
                <span class="metric-value-cell ${getLeadsPerVehicleClass(vehicleType.valleyMotors)}">
                    ${vehicleType.valleyMotors.toFixed(1)}
                </span>
            </td>
        `;
        
        // Add click handler
        mainRow.addEventListener('click', () => toggleRow(index));
        tbody.appendChild(mainRow);
        
        // Create deal rating rows (hidden by default)
        vehicleType.dealRatings.forEach((deal, dealIndex) => {
            const dealRow = document.createElement('tr');
            dealRow.className = 'deal-rating-row';
            if (dealIndex === vehicleType.dealRatings.length - 1) {
                dealRow.classList.add('last-deal-row');
            }
            dealRow.dataset.parentIndex = index;
            dealRow.style.display = 'none';
            dealRow.innerHTML = `
                <td class="deal-rating-cell">
                    <span class="deal-rating-name">
                        <img src="img/deals/${getDealIcon(deal.rating)}" alt="${deal.rating}" class="deal-rating-icon" />
                        ${deal.rating}
                    </span>
                </td>
                <td class="metric-cell">
                    <span class="metric-value-cell ${getLeadsPerVehicleClass(deal.currentStore)}">
                        ${deal.currentStore.toFixed(1)}
                        ${deal.currentStore < 1.0 ? '<svg class="warning-icon" width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1L1 12h12L7 1z" stroke="#DC2626" stroke-width="1.5" fill="#FEF2F2"/><path d="M7 5v3M7 10.5v.5" stroke="#DC2626" stroke-width="1.5" stroke-linecap="round"/></svg>' : ''}
                    </span>
                </td>
                <td class="metric-cell">
                    <span class="metric-value-cell ${getLeadsPerVehicleClass(deal.lastMonth)}">
                        ${deal.lastMonth.toFixed(1)}
                        ${deal.lastMonth < 1.0 ? '<svg class="warning-icon" width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1L1 12h12L7 1z" stroke="#DC2626" stroke-width="1.5" fill="#FEF2F2"/><path d="M7 5v3M7 10.5v.5" stroke="#DC2626" stroke-width="1.5" stroke-linecap="round"/></svg>' : ''}
                    </span>
                </td>
                <td class="metric-cell">
                    <span class="market-avg-cell">
                        ${deal.marketAvg.toFixed(1)}
                    </span>
                </td>
                <td class="metric-cell">
                    <span class="metric-value-cell ${getLeadsPerVehicleClass(deal.valleyMotors)}">
                        ${deal.valleyMotors.toFixed(1)}
                    </span>
                </td>
            `;
            tbody.appendChild(dealRow);
        });
        
    });
}

function toggleRow(index) {
    const tbody = document.getElementById('performance-tbody');
    const mainRow = tbody.querySelector(`tr[data-index="${index}"]`);
    const dealRows = tbody.querySelectorAll(`tr.deal-rating-row[data-parent-index="${index}"]`);
    
    if (mainRow.classList.contains('expanded')) {
        // Close row
        mainRow.classList.remove('expanded');
        dealRows.forEach(row => row.style.display = 'none');
    } else {
        // Close any other expanded rows
        tbody.querySelectorAll('tr.vehicle-type-row').forEach(row => {
            row.classList.remove('expanded');
        });
        tbody.querySelectorAll('tr.deal-rating-row').forEach(row => {
            row.style.display = 'none';
        });
        
        // Open this row
        mainRow.classList.add('expanded');
        dealRows.forEach(row => row.style.display = 'table-row');
        
        // Re-initialize tooltips for newly rendered cells
        setTimeout(() => {
            document.querySelectorAll('.metric-value-cell').forEach(cell => {
                cell.addEventListener('mouseenter', (e) => {
                    const tooltip = document.querySelector('.performance-tooltip');
                    if (tooltip) showTooltip(e, tooltip);
                });
                cell.addEventListener('mouseleave', () => {
                    const tooltip = document.querySelector('.performance-tooltip');
                    if (tooltip) hideTooltip(tooltip);
                });
            });
        }, 100);
    }
}


function getLeadsPerVehicleClass(value) {
    // Higher leads per vehicle is better
    if (value >= 4.0) return 'excellent';
    if (value >= 3.0) return 'good';
    if (value >= 2.0) return 'average';
    if (value >= 1.0) return 'below';
    return 'poor';
}

function getPercentageDifference(current, comparison) {
    // For leads per vehicle, higher is better
    const percentDiff = ((current - comparison) / comparison * 100);
    const sign = percentDiff > 0 ? '+' : '';
    return `${sign}${percentDiff.toFixed(0)}%`;
}

function getDealIcon(rating) {
    const iconMap = {
        'Great Deal': 'great.svg',
        'Good Deal': 'good.svg',
        'Fair Price': 'fair.svg',
        'High Priced': 'high.svg',
        'Over Priced': 'overpriced.svg'
    };
    return iconMap[rating] || 'fair.svg';
}

function setupEventListeners() {
    // Event listeners can be added here if needed in the future
}

function exportToCSV() {
    let csv = 'Vehicle Type,Deal Rating,August 2025,July 2025,Market Avg,Marlboro Nissan\n';
    
    performanceData.forEach(vehicleType => {
        // Summary row
        csv += `"${vehicleType.vehicleType}","Summary",${vehicleType.currentStore.toFixed(1)},${vehicleType.lastMonth.toFixed(1)},${vehicleType.marketAvg.toFixed(1)},${vehicleType.valleyMotors.toFixed(1)}\n`;
        
        // Deal rating rows
        vehicleType.dealRatings.forEach(deal => {
            csv += `"${vehicleType.vehicleType}","${deal.rating}",${deal.currentStore.toFixed(1)},${deal.lastMonth.toFixed(1)},${deal.marketAvg.toFixed(1)},${deal.valleyMotors.toFixed(1)}\n`;
        });
    });
    
    // Create download link
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `performance-report-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
}


function initializeTooltips() {
    // Create tooltip element
    const tooltip = document.createElement('div');
    tooltip.className = 'performance-tooltip';
    document.body.appendChild(tooltip);
    
    // Add hover handlers to metric value cells after table renders
    setTimeout(() => {
        document.querySelectorAll('.metric-value-cell').forEach(cell => {
            cell.addEventListener('mouseenter', (e) => showTooltip(e, tooltip));
            cell.addEventListener('mouseleave', () => hideTooltip(tooltip));
        });
    }, 100);
}

function showTooltip(e, tooltip) {
    const value = parseFloat(e.target.textContent);
    const rect = e.target.getBoundingClientRect();
    
    let message = '';
    if (value >= 4.0) {
        message = 'Excellent: Very high lead generation';
    } else if (value >= 3.0) {
        message = 'Good: Above average lead generation';
    } else if (value >= 2.0) {
        message = 'Average: Standard lead generation rate';
    } else if (value >= 1.0) {
        message = 'Below Average: Lower lead generation';
    } else {
        message = 'Poor: Very low lead generation';
    }
    
    tooltip.innerHTML = `<div class="tooltip-content">${message}</div>`;
    tooltip.style.left = `${rect.left + rect.width / 2}px`;
    tooltip.style.top = `${rect.top - 40}px`;
    tooltip.style.transform = 'translateX(-50%)';
    tooltip.classList.add('visible');
}

function hideTooltip(tooltip) {
    tooltip.classList.remove('visible');
}