// Why Page JavaScript

// Data structure
const leadsData = {
    barChart: {
        october2024: 305,
        november2024: 298,
        december2024: 275,
        january2025: 310,
        february2025: 295,
        march2025: 305,
        april2025: 290,
        may2025: 315,
        june2025: 308,
        july2025: 320,
        august2025: 285,
        september2025: 292,
        october2025: 270
    },
    table: {
        compact: {
            total: { july: 65, august: 58, september: 57, october: 53 },
            greatDeal: { july: 25, august: 22, september: 21, october: 19 },
            goodDeal: { july: 18, august: 16, september: 16, october: 15 },
            fairDeal: { july: 12, august: 11, september: 12, october: 12 },
            highPriced: { july: 7, august: 6, september: 5, october: 5 },
            overPriced: { july: 3, august: 3, september: 3, october: 2 }
        },
        sedans: {
            total: { july: 70, august: 65, september: 63, october: 60 },
            greatDeal: { july: 28, august: 26, september: 25, october: 23 },
            goodDeal: { july: 20, august: 18, september: 18, october: 17 },
            fairDeal: { july: 13, august: 12, september: 12, october: 12 },
            highPriced: { july: 6, august: 6, september: 6, october: 6 },
            overPriced: { july: 3, august: 3, september: 2, october: 2 }
        },
        suvco: {
            total: { july: 145, august: 130, september: 125, october: 115 },
            greatDeal: { july: 60, august: 55, september: 52, october: 48 },
            goodDeal: { july: 45, august: 40, september: 39, october: 36 },
            fairDeal: { july: 25, august: 22, september: 21, october: 19 },
            highPriced: { july: 10, august: 9, september: 9, october: 8 },
            overPriced: { july: 5, august: 4, september: 4, october: 4 }
        },
        trucks: {
            total: { july: 30, august: 22, september: 25, october: 28 },
            greatDeal: { july: 12, august: 9, september: 10, october: 11 },
            goodDeal: { july: 9, august: 7, september: 8, october: 9 },
            fairDeal: { july: 5, august: 4, september: 4, october: 5 },
            highPriced: { july: 3, august: 2, september: 2, october: 2 },
            overPriced: { july: 1, august: 0, september: 1, october: 1 }
        },
        luxury: {
            total: { july: 10, august: 10, september: 12, october: 14 },
            greatDeal: { july: 4, august: 4, september: 5, october: 6 },
            goodDeal: { july: 3, august: 3, september: 4, october: 5 },
            fairDeal: { july: 2, august: 2, september: 2, october: 2 },
            highPriced: { july: 1, august: 1, september: 1, october: 1 },
            overPriced: { july: 0, august: 0, september: 0, october: 0 }
        }
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWhyPage();
});

function initializeWhyPage() {
    initializeBarChart();
    initializeLeadTypeChart();
    renderPerformanceTable(); // This will call setupAccordionHandlers()
    setupDropdownHandler();
}

function initializeBarChart() {
    const ctx = document.getElementById('totalLeadsChart').getContext('2d');
    
    // Calculate leads per vehicle for each month
    const totalLeads = [
        leadsData.barChart.october2024,
        leadsData.barChart.november2024,
        leadsData.barChart.december2024,
        leadsData.barChart.january2025,
        leadsData.barChart.february2025,
        leadsData.barChart.march2025,
        leadsData.barChart.april2025,
        leadsData.barChart.may2025,
        leadsData.barChart.june2025,
        leadsData.barChart.july2025,
        leadsData.barChart.august2025,
        leadsData.barChart.september2025,
        leadsData.barChart.october2025
    ];
    
    // Mock inventory data (assuming average 120 vehicles in inventory)
    const avgInventory = 120;
    const leadsPerVehicle = totalLeads.map(leads => (leads / avgInventory).toFixed(1));
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Oct 2024', 'Nov 2024', 'Dec 2024', 'Jan 2025', 'Feb 2025', 'Mar 2025', 'Apr 2025', 
                     'May 2025', 'Jun 2025', 'Jul 2025', 'Aug 2025', 'Sep 2025', 'Oct 2025'],
            datasets: [{
                label: 'Your Dealership',
                data: leadsPerVehicle,
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
            }, {
                label: 'Market Average',
                data: [2.7, 2.6, 2.4, 2.8, 2.6, 2.7, 2.5, 2.9, 2.8, 3.0, 2.5, 2.6, 2.4],
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
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false
            },
            animation: {
                duration: 500,
                easing: 'easeInOutQuart'
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
                            
                            if (datasetLabel === 'Your Dealership') {
                                // Get the market average for this specific month
                                const marketData = context.chart.data.datasets[1].data;
                                const marketAvg = marketData[dataIndex];
                                const diff = (value - marketAvg).toFixed(1);
                                const status = parseFloat(diff) < 0 ? 'Below market' : parseFloat(diff) > 0 ? 'Above market' : 'At market';
                                return [
                                    datasetLabel + ': ' + value + ' leads/vehicle',
                                    status + ' by ' + Math.abs(diff) + ' leads'
                                ];
                            } else {
                                return datasetLabel + ': ' + value + ' leads/vehicle';
                            }
                        }
                    }
                }
            }
        }
    });
}

function initializeLeadTypeChart() {
    const ctx = document.getElementById('leadTypeChart');
    if (!ctx) return;
    
    // Data for last 13 months - aligned with Total Leads chart
    const months = ['Oct 2024', 'Nov 2024', 'Dec 2024', 'Jan 2025', 'Feb 2025', 'Mar 2025', 'Apr 2025', 
                    'May 2025', 'Jun 2025', 'Jul 2025', 'Aug 2025', 'Sep 2025', 'Oct 2025'];
    
    // Get total leads from bar chart data for these months
    const totalsByMonth = [
        leadsData.barChart.october2024,
        leadsData.barChart.november2024,
        leadsData.barChart.december2024,
        leadsData.barChart.january2025,
        leadsData.barChart.february2025,
        leadsData.barChart.march2025,
        leadsData.barChart.april2025,
        leadsData.barChart.may2025,
        leadsData.barChart.june2025,
        leadsData.barChart.july2025,
        leadsData.barChart.august2025,
        leadsData.barChart.september2025,
        leadsData.barChart.october2025
    ];
    
    // Lead type data - proportionally distributed to match totals
    // Using percentages: Hot: 20%, Warm: 35%, Standard: 35%, Cold: 10%
    const hotLeads = totalsByMonth.map(total => Math.round(total * 0.20));
    const warmLeads = totalsByMonth.map(total => Math.round(total * 0.35));
    const standardLeads = totalsByMonth.map(total => Math.round(total * 0.35));
    const coldLeads = totalsByMonth.map((total, index) => {
        // Calculate cold leads to ensure total matches exactly
        const hot = hotLeads[index];
        const warm = warmLeads[index];
        const standard = standardLeads[index];
        return total - hot - warm - standard;
    });
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: months,
            datasets: [
                {
                    label: 'Hot',
                    data: hotLeads,
                    backgroundColor: '#EF4444',
                    barPercentage: 0.8,
                    categoryPercentage: 0.9
                },
                {
                    label: 'Warm',
                    data: warmLeads,
                    backgroundColor: '#F59E0B',
                    barPercentage: 0.8,
                    categoryPercentage: 0.9
                },
                {
                    label: 'Standard',
                    data: standardLeads,
                    backgroundColor: '#6B7280',
                    barPercentage: 0.8,
                    categoryPercentage: 0.9
                },
                {
                    label: 'Cold',
                    data: coldLeads,
                    backgroundColor: '#3B82F6',
                    barPercentage: 0.8,
                    categoryPercentage: 0.9
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    stacked: true,
                    grid: {
                        display: false
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
                    stacked: true,
                    grid: {
                        color: '#E5E7EB',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#6B7280',
                        font: {
                            size: 12
                        }
                    },
                    title: {
                        display: true,
                        text: 'Total Leads',
                        color: '#374151',
                        font: {
                            size: 12,
                            weight: 500
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false // Using custom legend
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const total = context.parsed._stacks.y[0];
                            const value = context.parsed.y;
                            const percentage = Math.round((value / total) * 100);
                            return context.dataset.label + ': ' + value + ' leads (' + percentage + '%)';
                        },
                        afterLabel: function(context) {
                            if (context.datasetIndex === 3) { // Show total only on last dataset
                                const total = context.parsed._stacks.y[0];
                                return 'Total: ' + total + ' leads';
                            }
                        }
                    }
                }
            }
        }
    });
}

function renderPerformanceTable(selectedMonth = 'september-2025') {
    const tbody = document.getElementById('performance-tbody');
    tbody.innerHTML = ''; // Clear existing rows
    
    const vehicleTypes = [
        { key: 'compact', name: 'Compact' },
        { key: 'sedans', name: 'Sedans' },
        { key: 'suvco', name: 'SUV/CO' },
        { key: 'trucks', name: 'Trucks' },
        { key: 'luxury', name: 'Luxury' }
    ];
    
    const dealRatings = [
        { key: 'greatDeal', name: 'Great Deal' },
        { key: 'goodDeal', name: 'Good Deal' },
        { key: 'fairDeal', name: 'Fair Deal' },
        { key: 'highPriced', name: 'High Priced' },
        { key: 'overPriced', name: 'Over Priced' }
    ];
    
    // Determine which month's data to show
    const firstMonthKey = selectedMonth === 'september-2025' ? 'september2025' : 'october2024';
    const firstMonthTableKey = selectedMonth === 'september-2025' ? 'september' : 'august';
    const firstMonthDisplay = selectedMonth === 'september-2025' ? 'September 2025' : 'October 2024';
    
    // Create total row
    const totalRow = document.createElement('tr');
    totalRow.className = 'total-row';
    const totalTrend = getTrendArrow(leadsData.barChart.october2025, leadsData.barChart[firstMonthKey]);
    totalRow.innerHTML = `
        <td class="total-cell">Total Leads</td>
        <td class="metric-cell total-metric">${leadsData.barChart[firstMonthKey]}</td>
        <td class="metric-cell total-metric ${getChangeClass(leadsData.barChart.october2025, leadsData.barChart[firstMonthKey])}">
            ${leadsData.barChart.october2025}
            ${totalTrend}
        </td>
    `;
    tbody.appendChild(totalRow);
    
    vehicleTypes.forEach((vehicle, index) => {
        const vehicleData = leadsData.table[vehicle.key];
        
        // Create main vehicle row
        const vehicleRow = document.createElement('tr');
        vehicleRow.className = 'vehicle-row';
        vehicleRow.dataset.vehicle = vehicle.key;
        vehicleRow.dataset.index = index;
        const vehicleTrend = getTrendArrow(vehicleData.total.october, vehicleData.total[firstMonthTableKey]);
        vehicleRow.innerHTML = `
            <td class="vehicle-cell">
                <span class="expand-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                </span>
                ${vehicle.name}
            </td>
            <td class="metric-cell">${vehicleData.total[firstMonthTableKey]}</td>
            <td class="metric-cell ${getChangeClass(vehicleData.total.october, vehicleData.total[firstMonthTableKey])}">
                ${vehicleData.total.october}
                ${vehicleTrend}
            </td>
        `;
        tbody.appendChild(vehicleRow);
        
        // Create deal rating rows
        dealRatings.forEach(deal => {
            const dealRow = document.createElement('tr');
            dealRow.className = 'deal-row';
            dealRow.dataset.vehicle = vehicle.key;
            const dealTrend = getTrendArrow(vehicleData[deal.key].october, vehicleData[deal.key][firstMonthTableKey]);
            dealRow.innerHTML = `
                <td class="deal-cell">
                    <img src="img/deals/${getDealIcon(deal.name)}" alt="${deal.name}" class="deal-icon" />
                    ${deal.name}
                </td>
                <td class="metric-cell">${vehicleData[deal.key][firstMonthTableKey]}</td>
                <td class="metric-cell ${getChangeClass(vehicleData[deal.key].october, vehicleData[deal.key][firstMonthTableKey])}">
                    ${vehicleData[deal.key].october}
                    ${dealTrend}
                </td>
            `;
            
            // Add click handler
            dealRow.addEventListener('click', () => {
                showDealDetails(vehicle.key, deal.name);
            });
            
            tbody.appendChild(dealRow);
        });
        
        // Create inventory chart row (hidden by default) - placed after deal rows
        const chartRow = document.createElement('tr');
        chartRow.className = 'inventory-chart-row';
        chartRow.dataset.parentIndex = index;
        chartRow.style.display = 'none';
        chartRow.innerHTML = `
            <td colspan="3" class="inventory-chart-cell">
                <div class="charts-row-container">
                    <div class="inventory-charts-container">
                        <h4>Inventory - ${vehicle.name}</h4>
                        <div class="inventory-month-container">
                            <div class="month-label-row">
                                <span class="month-label">September 2025</span>
                                <span class="total-label">Total vehicles: ${getInventoryTotal(vehicle.key, 'september')}</span>
                            </div>
                            <div class="inventory-bar" id="inventory-bar-${vehicle.key}-september">
                                ${generateInventoryBar(vehicle.key, 'september')}
                            </div>
                        </div>
                        <div class="inventory-month-container">
                            <div class="month-label-row">
                                <span class="month-label">October 2025</span>
                                <span class="total-label">Total vehicles: ${getInventoryTotal(vehicle.key, 'october')}</span>
                            </div>
                            <div class="inventory-bar" id="inventory-bar-${vehicle.key}-october">
                                ${generateInventoryBar(vehicle.key, 'october')}
                            </div>
                        </div>
                    </div>
                    <div class="leads-per-vehicle-container">
                        <h4>Leads per Vehicle - ${vehicle.name}</h4>
                        <canvas id="leads-per-vehicle-${vehicle.key}"></canvas>
                    </div>
                </div>
                <div class="charts-row-container second-row">
                    <div class="market-trend-container">
                        <h4>Market Trend - ${vehicle.name}</h4>
                        <canvas id="market-trend-${vehicle.key}"></canvas>
                    </div>
                    <div class="buyer-overlap-container">
                        <h4>Average buyer overlap per vehicle - ${vehicle.name}</h4>
                        <canvas id="buyer-overlap-${vehicle.key}"></canvas>
                    </div>
                </div>
            </td>
        `;
        tbody.appendChild(chartRow);
    });
    
    // Re-attach accordion handlers after rendering
    setupAccordionHandlers();
}

function setupAccordionHandlers() {
    const vehicleRows = document.querySelectorAll('.vehicle-row');
    
    vehicleRows.forEach(row => {
        row.addEventListener('click', function() {
            const isExpanded = this.classList.contains('expanded');
            const vehicle = this.dataset.vehicle;
            const index = row.dataset.index;
            
            // Close all other expanded rows
            vehicleRows.forEach(r => {
                if (r !== this) {
                    r.classList.remove('expanded');
                }
            });
            
            // Hide all inventory charts
            document.querySelectorAll('.inventory-chart-row').forEach(chartRow => {
                chartRow.style.display = 'none';
            });
            
            // Toggle current row
            this.classList.toggle('expanded');
            
            // Show/hide inventory chart for this vehicle
            const chartRow = document.querySelector(`.inventory-chart-row[data-parent-index="${index}"]`);
            if (!isExpanded && chartRow) {
                chartRow.style.display = 'table-row';
                // Initialize tooltips for this chart
                initializeInventoryTooltips(vehicle);
                // Initialize charts
                setTimeout(() => {
                    initializeMarketTrendChart(vehicle);
                    initializeLeadsPerVehicleChart(vehicle);
                    initializeBuyerOverlapChart(vehicle);
                }, 100);
            }
            
            // Show/hide deal rows for this vehicle
            const dealRows = document.querySelectorAll(`.deal-row[data-vehicle="${vehicle}"]`);
            dealRows.forEach(dealRow => {
                if (isExpanded) {
                    dealRow.style.display = 'none';
                } else {
                    dealRow.style.display = 'table-row';
                }
            });
            
            // Hide all other deal rows
            const otherDealRows = document.querySelectorAll(`.deal-row:not([data-vehicle="${vehicle}"])`);
            otherDealRows.forEach(dealRow => {
                dealRow.style.display = 'none';
            });
        });
    });
}

function setupDropdownHandler() {
    const dropdown = document.getElementById('month-dropdown');
    if (dropdown) {
        dropdown.addEventListener('change', function(e) {
            const selectedMonth = e.target.value;
            renderPerformanceTable(selectedMonth);
        });
    }
}

function getDealIcon(rating) {
    const iconMap = {
        'Great Deal': 'great.svg',
        'Good Deal': 'good.svg',
        'Fair Deal': 'fair.svg',
        'High Priced': 'high.svg',
        'Over Priced': 'overpriced.svg'
    };
    return iconMap[rating] || 'fair.svg';
}

function getTrendArrow(current, previous) {
    if (current > previous) {
        return '<img src="img/trend icon/up.svg" alt="Up" class="trend-arrow trend-up" />';
    } else if (current < previous) {
        return '<img src="img/trend icon/down.svg" alt="Down" class="trend-arrow trend-down" />';
    } else {
        return '';
    }
}

function getChangeClass(current, previous) {
    const absoluteChange = current - previous;
    
    if (absoluteChange >= 10) {
        return 'significant-increase';
    } else if (absoluteChange >= 5) {
        return 'moderate-increase';
    } else if (absoluteChange > 0) {
        return 'slight-increase';
    } else if (absoluteChange === 0) {
        return 'no-change';
    } else if (absoluteChange > -5) {
        return 'slight-decrease';
    } else if (absoluteChange > -10) {
        return 'moderate-decrease';
    } else {
        return 'significant-decrease';
    }
}

function getInventoryTotal(vehicleKey, month) {
    const vehicleData = leadsData.table[vehicleKey];
    const dealRatings = ['greatDeal', 'goodDeal', 'fairDeal', 'highPriced', 'overPriced'];
    
    // Calculate inventory totals
    const monthData = month === 'september' ? 
        dealRatings.map(rating => Math.round(vehicleData[rating].september / 2.5)) :
        dealRatings.map(rating => Math.round(vehicleData[rating].october / 2.5));
    
    return monthData.reduce((sum, val) => sum + val, 0);
}

function generateInventoryBar(vehicleKey, month) {
    const vehicleData = leadsData.table[vehicleKey];
    const dealRatings = ['greatDeal', 'goodDeal', 'fairDeal', 'highPriced', 'overPriced'];
    const dealNames = ['Great Deal', 'Good Deal', 'Fair Deal', 'High Priced', 'Over Priced'];
    const colors = {
        'greatDeal': '#10B981',
        'goodDeal': '#34D399',
        'fairDeal': '#FCD34D',
        'highPriced': '#FB923C',
        'overPriced': '#EF4444'
    };
    
    // Calculate inventory totals for percentage calculation
    const monthData = month === 'september' ? 
        dealRatings.map(rating => Math.round(vehicleData[rating].september / 2.5)) :
        dealRatings.map(rating => Math.round(vehicleData[rating].october / 2.5));
    
    const total = monthData.reduce((sum, val) => sum + val, 0);
    
    let barHTML = '<div class="inventory-bar-segments">';
    let cumulativePercent = 0;
    
    dealRatings.forEach((rating, index) => {
        const inventory = monthData[index];
        const percentage = (inventory / total * 100).toFixed(1);
        
        barHTML += `
            <div class="inventory-segment" 
                 style="width: ${percentage}%; background-color: ${colors[rating]};"
                 data-tooltip="${dealNames[index]}: ${percentage}% (${inventory} cars)">
            </div>
        `;
        cumulativePercent += parseFloat(percentage);
    });
    
    barHTML += '</div>';
    return barHTML;
}

function initializeInventoryTooltips(vehicleKey) {
    const segments = document.querySelectorAll(`#inventory-bar-${vehicleKey}-september .inventory-segment, #inventory-bar-${vehicleKey}-october .inventory-segment`);
    
    segments.forEach(segment => {
        segment.addEventListener('mouseenter', function(e) {
            const tooltip = document.createElement('div');
            tooltip.className = 'inventory-tooltip';
            tooltip.textContent = this.dataset.tooltip;
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + rect.width / 2 + 'px';
            tooltip.style.top = (rect.top - 40) + 'px';
            tooltip.style.transform = 'translateX(-50%)';
            
            setTimeout(() => tooltip.classList.add('visible'), 10);
        });
        
        segment.addEventListener('mouseleave', function() {
            document.querySelectorAll('.inventory-tooltip').forEach(tooltip => {
                tooltip.remove();
            });
        });
    });
}

function initializeMarketTrendChart(vehicleKey) {
    const ctx = document.getElementById(`market-trend-${vehicleKey}`);
    if (!ctx) return;
    
    // Generate market data for similar dealerships
    const vehicleData = leadsData.table[vehicleKey];
    const yourSeptember = vehicleData.total.september;
    const yourOctober = vehicleData.total.october;
    
    // Calculate percentage change for your store
    const yourChange = ((yourOctober - yourSeptember) / yourSeptember * 100);
    
    // Calculate market average (simulate with some variation)
    const marketAvgChange = yourChange + (Math.random() - 0.5) * 6; // +/- 3% variation
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Your Store', 'Market Avg'],
            datasets: [
                {
                    label: '% Change (Sep to Oct)',
                    data: [yourChange, marketAvgChange],
                    backgroundColor: function(context) {
                        const value = context.parsed.y;
                        return value >= 0 ? '#10B981' : '#EF4444';
                    },
                    borderRadius: 4,
                    barPercentage: 0.5,
                    categoryPercentage: 0.7
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        boxWidth: 12,
                        padding: 8,
                        font: {
                            size: 11
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'white',
                    titleColor: '#111827',
                    bodyColor: '#374151',
                    borderColor: '#E5E7EB',
                    borderWidth: 1,
                    cornerRadius: 6,
                    padding: 8,
                    titleFont: {
                        size: 12
                    },
                    bodyFont: {
                        size: 11
                    },
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            const value = context.parsed.y;
                            const sign = value >= 0 ? '+' : '';
                            return sign + value.toFixed(1) + '% change';
                        }
                    }
                }
            },
            scales: {
                y: {
                    grid: {
                        color: '#F3F4F6',
                        drawBorder: false,
                        lineWidth: function(context) {
                            return context.tick.value === 0 ? 2 : 1;
                        },
                        color: function(context) {
                            return context.tick.value === 0 ? '#9CA3AF' : '#F3F4F6';
                        }
                    },
                    ticks: {
                        color: '#6B7280',
                        padding: 4,
                        font: {
                            size: 10
                        },
                        callback: function(value) {
                            return value + '%';
                        }
                    },
                    title: {
                        display: true,
                        text: '% Change in Leads',
                        color: '#6B7280',
                        font: {
                            size: 11
                        }
                    }
                },
                x: {
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        color: '#374151',
                        padding: 4,
                        font: {
                            size: 10
                        }
                    }
                }
            },
            layout: {
                padding: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                }
            }
        }
    });
}

function initializeLeadsPerVehicleChart(vehicleKey) {
    const ctx = document.getElementById(`leads-per-vehicle-${vehicleKey}`);
    if (!ctx) return;
    
    const vehicleData = leadsData.table[vehicleKey];
    const dealRatings = ['greatDeal', 'goodDeal', 'fairDeal', 'highPriced', 'overPriced'];
    const dealNames = ['Great Deal', 'Good Deal', 'Fair Deal', 'High Priced', 'Over Priced'];
    
    // Calculate leads per vehicle for each deal rating
    const septemberData = dealRatings.map(rating => {
        const leads = vehicleData[rating].september;
        const inventory = Math.round(leads / 2.5); // Using the same calculation as inventory bar
        return inventory > 0 ? (leads / inventory).toFixed(1) : 0;
    });
    
    const octoberData = dealRatings.map(rating => {
        const leads = vehicleData[rating].october;
        const inventory = Math.round(leads / 2.5);
        return inventory > 0 ? (leads / inventory).toFixed(1) : 0;
    });
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: dealNames,
            datasets: [
                {
                    label: 'September 2025',
                    data: septemberData,
                    backgroundColor: '#93C5FD',
                    borderRadius: 4,
                    barPercentage: 0.8,
                    categoryPercentage: 0.8
                },
                {
                    label: 'October 2025',
                    data: octoberData,
                    backgroundColor: '#3B82F6',
                    borderRadius: 4,
                    barPercentage: 0.8,
                    categoryPercentage: 0.8
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        boxWidth: 12,
                        padding: 8,
                        font: {
                            size: 11
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'white',
                    titleColor: '#111827',
                    bodyColor: '#374151',
                    borderColor: '#E5E7EB',
                    borderWidth: 1,
                    cornerRadius: 6,
                    padding: 8,
                    titleFont: {
                        size: 12
                    },
                    bodyFont: {
                        size: 11
                    },
                    displayColors: true,
                    boxWidth: 10,
                    boxHeight: 10,
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y + ' leads/vehicle';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#F3F4F6',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#6B7280',
                        padding: 4,
                        font: {
                            size: 10
                        },
                        callback: function(value) {
                            return value.toFixed(1);
                        }
                    },
                    title: {
                        display: true,
                        text: 'Leads per Vehicle',
                        color: '#6B7280',
                        font: {
                            size: 11
                        }
                    }
                },
                x: {
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        color: '#374151',
                        padding: 4,
                        font: {
                            size: 9
                        },
                        autoSkip: false,
                        maxRotation: 45,
                        minRotation: 45
                    }
                }
            },
            layout: {
                padding: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                }
            }
        }
    });
}

function initializeBuyerOverlapChart(vehicleKey) {
    const ctx = document.getElementById(`buyer-overlap-${vehicleKey}`);
    if (!ctx) return;
    
    // Generate buyer overlap data (values between 15-30)
    const septemberOverlap = 15 + Math.random() * 15; // Random between 15-30
    const octoberOverlap = 15 + Math.random() * 15; // Random between 15-30
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['September 2025', 'October 2025'],
            datasets: [{
                label: 'Avg Buyer Overlap',
                data: [septemberOverlap, octoberOverlap],
                backgroundColor: ['#93C5FD', '#3B82F6'],
                borderRadius: 4,
                barPercentage: 0.5,
                categoryPercentage: 0.7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'white',
                    titleColor: '#111827',
                    bodyColor: '#374151',
                    borderColor: '#E5E7EB',
                    borderWidth: 1,
                    cornerRadius: 6,
                    padding: 8,
                    titleFont: {
                        size: 12
                    },
                    bodyFont: {
                        size: 11
                    },
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return context.parsed.y.toFixed(1);
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 35,
                    grid: {
                        color: '#F3F4F6',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#6B7280',
                        padding: 4,
                        font: {
                            size: 10
                        },
                        callback: function(value) {
                            return value.toFixed(0);
                        }
                    }
                },
                x: {
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        color: '#374151',
                        padding: 4,
                        font: {
                            size: 10
                        }
                    }
                }
            },
            layout: {
                padding: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                }
            }
        }
    });
}

// Detail Panel Functions
function openDetailPanel() {
    const panel = document.getElementById('detail-panel');
    const body = document.body;
    
    // Add active class to panel
    panel.classList.add('active');
    
    // Add class to body to adjust layout
    body.classList.add('detail-panel-open');
}

function closeDetailPanel() {
    const panel = document.getElementById('detail-panel');
    const body = document.body;
    
    // Remove active class from panel
    panel.classList.remove('active');
    
    // Remove class from body
    body.classList.remove('detail-panel-open');
}

function showDealDetails(vehicle, dealRating) {
    const vehicleData = leadsData.table[vehicle];
    const dealKey = Object.keys(vehicleData).find(key => {
        const dealName = key.replace(/([A-Z])/g, ' $1').trim();
        return dealName.toLowerCase().replace('deal', 'deal') === dealRating.toLowerCase();
    });
    
    if (!dealKey || dealKey === 'total') return;
    
    const dealData = vehicleData[dealKey];
    const vehicleName = vehicle === 'suvco' ? 'SUV/CO' : vehicle.charAt(0).toUpperCase() + vehicle.slice(1);
    
    // Calculate inventory data (mock data for demonstration)
    const inventoryData = {
        july: Math.round(dealData.july / 2.5),
        august: Math.round(dealData.august / 2.5),
        october: Math.round(dealData.october / 2.5)
    };
    
    // Build content for detail panel
    const content = `
        <div class="detail-section">
            <h2>${vehicleName} - ${dealRating}</h2>
            
            <!-- Leads per Vehicle -->
            <div class="detail-metric-section">
                <h3>Leads per Vehicle</h3>
                <div class="metric-grid">
                    <div class="metric-item">
                        <span class="metric-label">July 2025</span>
                        <span class="metric-value">${(dealData.july / inventoryData.july).toFixed(1)}</span>
                    </div>
                    <div class="metric-item">
                        <span class="metric-label">August 2025</span>
                        <span class="metric-value">${(dealData.august / inventoryData.august).toFixed(1)}</span>
                    </div>
                    <div class="metric-item">
                        <span class="metric-label">October 2025</span>
                        <span class="metric-value">${(dealData.october / inventoryData.october).toFixed(1)}</span>
                    </div>
                </div>
            </div>
            
            <!-- Inventory Breakdown -->
            <div class="detail-inventory-section">
                <h3>Inventory Breakdown by Deal Rating</h3>
                <table class="inventory-breakdown-table">
                    <thead>
                        <tr>
                            <th>Deal Rating</th>
                            <th>July</th>
                            <th>August</th>
                            <th>October</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${generateInventoryBreakdown(vehicle, vehicleData)}
                    </tbody>
                </table>
            </div>
            
            <!-- Market Trends -->
            <div class="detail-market-section">
                <h3>Market Trends Analysis</h3>
                ${generateMarketAnalysis(vehicle, dealRating, vehicleData)}
            </div>
        </div>
    `;
    
    document.getElementById('detail-panel-content').innerHTML = content;
    openDetailPanel();
}

function generateInsights(dealData, dealRating, vehicleName) {
    const insights = [];
    
    // Calculate trends
    const julyToAugust = ((dealData.august - dealData.july) / dealData.july * 100).toFixed(1);
    const augustToOctober = ((dealData.october - dealData.august) / dealData.august * 100).toFixed(1);
    
    // Trend insight
    if (parseFloat(augustToOctober) > 0) {
        insights.push(`<li>Leads increased by ${augustToOctober}% from August to October</li>`);
    } else if (parseFloat(augustToOctober) < 0) {
        insights.push(`<li>Leads decreased by ${Math.abs(augustToOctober)}% from August to October</li>`);
    } else {
        insights.push(`<li>Leads remained stable from August to October</li>`);
    }
    
    // Performance insight
    if (dealData.october > 20) {
        insights.push(`<li>Strong performance with ${dealData.october} leads in October</li>`);
    } else if (dealData.october < 10) {
        insights.push(`<li>Opportunity to improve lead generation for ${dealRating.toLowerCase()} inventory</li>`);
    }
    
    // Consistency insight
    const avg = (dealData.july + dealData.august + dealData.october) / 3;
    const variance = Math.max(
        Math.abs(dealData.july - avg),
        Math.abs(dealData.august - avg),
        Math.abs(dealData.october - avg)
    ) / avg * 100;
    
    if (variance < 10) {
        insights.push(`<li>Consistent lead generation across the quarter</li>`);
    } else if (variance > 25) {
        insights.push(`<li>Significant fluctuation in lead volume - investigate market factors</li>`);
    }
    
    return insights.join('');
}

function generateInventoryBreakdown(vehicle, vehicleData) {
    const dealRatings = ['greatDeal', 'goodDeal', 'fairDeal', 'highPriced', 'overPriced'];
    const dealNames = ['Great Deal', 'Good Deal', 'Fair Deal', 'High Priced', 'Over Priced'];
    
    let rows = '';
    dealRatings.forEach((rating, index) => {
        const dealData = vehicleData[rating];
        // Calculate inventory numbers (mock calculation)
        const julyInv = Math.round(dealData.july / 2.5);
        const augInv = Math.round(dealData.august / 2.5);
        const octInv = Math.round(dealData.october / 2.5);
        
        rows += `
            <tr>
                <td>
                    <img src="img/deals/${getDealIcon(dealNames[index])}" alt="${dealNames[index]}" class="deal-icon-small" />
                    ${dealNames[index]}
                </td>
                <td>${julyInv}</td>
                <td>${augInv}</td>
                <td>${octInv}</td>
            </tr>
        `;
    });
    
    return rows;
}

function generateMarketAnalysis(vehicle, dealRating, vehicleData) {
    // Mock market data for demonstration
    const marketTrend = vehicle === 'suvco' ? -8 : vehicle === 'sedans' ? 3 : 0;
    const dealerTrend = ((vehicleData.total.october - vehicleData.total.august) / vehicleData.total.august * 100).toFixed(1);
    
    let analysis = '<div class="market-analysis">';
    
    // Market trend
    if (marketTrend !== 0) {
        analysis += `<p class="market-trend">Market Trend: ${vehicle === 'suvco' ? 'SUV/CO' : vehicle.charAt(0).toUpperCase() + vehicle.slice(1)} demand is ${marketTrend > 0 ? 'up' : 'down'} ${Math.abs(marketTrend)}% market-wide</p>`;
    }
    
    // Dealer performance vs market
    const dealerVsMarket = parseFloat(dealerTrend) - marketTrend;
    if (dealerVsMarket > 5) {
        analysis += `<p class="performance-indicator positive">Your dealership is outperforming the market by ${dealerVsMarket.toFixed(1)} percentage points</p>`;
    } else if (dealerVsMarket < -5) {
        analysis += `<p class="performance-indicator negative">Your dealership is underperforming the market by ${Math.abs(dealerVsMarket).toFixed(1)} percentage points</p>`;
    } else {
        analysis += `<p class="performance-indicator neutral">Your dealership is performing in line with market trends</p>`;
    }
    
    // Specific insights for this deal rating
    const dealKey = Object.keys(vehicleData).find(key => {
        const dealName = key.replace(/([A-Z])/g, ' $1').trim();
        return dealName.toLowerCase().replace('deal', 'deal') === dealRating.toLowerCase();
    });
    
    if (dealKey && dealKey !== 'total') {
        const dealData = vehicleData[dealKey];
        const dealTrend = ((dealData.october - dealData.august) / dealData.august * 100).toFixed(1);
        
        if (Math.abs(parseFloat(dealTrend)) > 10) {
            analysis += `<p class="deal-specific">This ${dealRating.toLowerCase()} inventory segment has seen a ${Math.abs(dealTrend)}% ${parseFloat(dealTrend) > 0 ? 'increase' : 'decrease'} in leads</p>`;
        }
    }
    
    analysis += '</div>';
    return analysis;
}