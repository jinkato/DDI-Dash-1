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
        october2025: 280
    },
    table: {
        compact: {
            total: { july: 65, august: 58, october: 55 },
            greatDeal: { july: 25, august: 22, october: 20 },
            goodDeal: { july: 18, august: 16, october: 15 },
            fairDeal: { july: 12, august: 11, october: 12 },
            highPriced: { july: 7, august: 6, october: 5 },
            overPriced: { july: 3, august: 3, october: 3 }
        },
        sedans: {
            total: { july: 70, august: 65, october: 62 },
            greatDeal: { july: 28, august: 26, october: 24 },
            goodDeal: { july: 20, august: 18, october: 17 },
            fairDeal: { july: 13, august: 12, october: 12 },
            highPriced: { july: 6, august: 6, october: 6 },
            overPriced: { july: 3, august: 3, october: 3 }
        },
        suvco: {
            total: { july: 145, august: 130, october: 120 },
            greatDeal: { july: 60, august: 55, october: 50 },
            goodDeal: { july: 45, august: 40, october: 38 },
            fairDeal: { july: 25, august: 22, october: 20 },
            highPriced: { july: 10, august: 9, october: 8 },
            overPriced: { july: 5, august: 4, october: 4 }
        },
        trucks: {
            total: { july: 30, august: 22, october: 28 },
            greatDeal: { july: 12, august: 9, october: 11 },
            goodDeal: { july: 9, august: 7, october: 9 },
            fairDeal: { july: 5, august: 4, october: 5 },
            highPriced: { july: 3, august: 2, october: 2 },
            overPriced: { july: 1, august: 0, october: 1 }
        },
        luxury: {
            total: { july: 10, august: 10, october: 15 },
            greatDeal: { july: 4, august: 4, october: 6 },
            goodDeal: { july: 3, august: 3, october: 5 },
            fairDeal: { july: 2, august: 2, october: 3 },
            highPriced: { july: 1, august: 1, october: 1 },
            overPriced: { july: 0, august: 0, october: 0 }
        }
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWhyPage();
});

function initializeWhyPage() {
    initializeBarChart();
    renderPerformanceTable();
    setupAccordionHandlers();
}

function initializeBarChart() {
    const ctx = document.getElementById('totalLeadsChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Oct 2024', 'Nov 2024', 'Dec 2024', 'Jan 2025', 'Feb 2025', 'Mar 2025', 'Apr 2025', 
                     'May 2025', 'Jun 2025', 'Jul 2025', 'Aug 2025', 'Sep 2025', 'Oct 2025'],
            datasets: [{
                label: 'Total Leads',
                data: [
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
                ],
                backgroundColor: '#3B82F6',
                borderRadius: 4,
                barPercentage: 0.7,
                categoryPercentage: 0.8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 500,
                easing: 'easeInOutQuart'
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
                    padding: 12,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return 'Total Leads: ' + context.parsed.y;
                        }
                    }
                },
                datalabels: {
                    display: true,
                    anchor: 'end',
                    align: 'end',
                    color: '#111827',
                    font: {
                        weight: 'bold',
                        size: 14
                    }
                }
            },
            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    top: 20,
                    bottom: 0
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    position: 'left',
                    grid: {
                        color: '#F3F4F6',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#6B7280',
                        padding: 8,
                        font: {
                            size: 12
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
                        padding: 8,
                        font: {
                            size: 11
                        },
                        autoSkip: false,
                        maxRotation: 45,
                        minRotation: 45
                    }
                }
            },
            onComplete: function() {
                const chart = this;
                const ctx = chart.ctx;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'bottom';
                ctx.font = 'bold 14px DM Sans';
                ctx.fillStyle = '#111827';
                
                chart.data.datasets.forEach(function(dataset, i) {
                    const meta = chart.getDatasetMeta(i);
                    meta.data.forEach(function(bar, index) {
                        const data = dataset.data[index];
                        ctx.fillText(data, bar.x, bar.y - 5);
                    });
                });
            }
        },
        plugins: [{
            afterDatasetsDraw: function(chart) {
                const ctx = chart.ctx;
                chart.data.datasets.forEach(function(dataset, i) {
                    const meta = chart.getDatasetMeta(i);
                    meta.data.forEach(function(bar, index) {
                        const data = dataset.data[index];
                        ctx.fillStyle = '#111827';
                        ctx.font = 'bold 14px DM Sans';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'bottom';
                        ctx.fillText(data, bar.x, bar.y - 5);
                    });
                });
            }
        }]
    });
}

function renderPerformanceTable() {
    const tbody = document.getElementById('performance-tbody');
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
    
    // Create total row
    const totalRow = document.createElement('tr');
    totalRow.className = 'total-row';
    const totalTrend = getTrendArrow(leadsData.barChart.october2025, leadsData.barChart.august2025);
    totalRow.innerHTML = `
        <td class="total-cell">Total Leads</td>
        <td class="metric-cell total-metric">${leadsData.barChart.august2025}</td>
        <td class="metric-cell total-metric ${getChangeClass(leadsData.barChart.october2025, leadsData.barChart.august2025)}">
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
        const vehicleTrend = getTrendArrow(vehicleData.total.october, vehicleData.total.august);
        vehicleRow.innerHTML = `
            <td class="vehicle-cell">
                <span class="expand-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                </span>
                ${vehicle.name}
            </td>
            <td class="metric-cell">${vehicleData.total.august}</td>
            <td class="metric-cell ${getChangeClass(vehicleData.total.october, vehicleData.total.august)}">
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
            const dealTrend = getTrendArrow(vehicleData[deal.key].october, vehicleData[deal.key].august);
            dealRow.innerHTML = `
                <td class="deal-cell">
                    <img src="img/deals/${getDealIcon(deal.name)}" alt="${deal.name}" class="deal-icon" />
                    ${deal.name}
                </td>
                <td class="metric-cell">${vehicleData[deal.key].august}</td>
                <td class="metric-cell ${getChangeClass(vehicleData[deal.key].october, vehicleData[deal.key].august)}">
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
                        <h4>Inventory</h4>
                        <div class="inventory-month-container">
                            <div class="month-label">August 2025</div>
                            <div class="inventory-bar" id="inventory-bar-${vehicle.key}-august">
                                ${generateInventoryBar(vehicle.key, 'august')}
                            </div>
                        </div>
                        <div class="inventory-month-container">
                            <div class="month-label">October 2025</div>
                            <div class="inventory-bar" id="inventory-bar-${vehicle.key}-october">
                                ${generateInventoryBar(vehicle.key, 'october')}
                            </div>
                        </div>
                    </div>
                    <div class="market-trend-container">
                        <h4>Market Trend - ${vehicle.name}</h4>
                        <canvas id="market-trend-${vehicle.key}"></canvas>
                    </div>
                </div>
                <div class="charts-row-container second-row">
                    <div class="leads-per-vehicle-container">
                        <h4>Leads per Vehicle - ${vehicle.name}</h4>
                        <canvas id="leads-per-vehicle-${vehicle.key}"></canvas>
                    </div>
                </div>
            </td>
        `;
        tbody.appendChild(chartRow);
    });
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
                // Initialize market trend chart
                setTimeout(() => {
                    initializeMarketTrendChart(vehicle);
                    initializeLeadsPerVehicleChart(vehicle);
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
    const monthData = month === 'august' ? 
        dealRatings.map(rating => Math.round(vehicleData[rating].august / 2.5)) :
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
    const segments = document.querySelectorAll(`#inventory-bar-${vehicleKey}-august .inventory-segment, #inventory-bar-${vehicleKey}-october .inventory-segment`);
    
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
    const yourAugust = vehicleData.total.august;
    const yourOctober = vehicleData.total.october;
    
    // Simulate competitor data with some variation
    const competitor1August = Math.round(yourAugust * (0.85 + Math.random() * 0.3));
    const competitor1October = Math.round(yourOctober * (0.85 + Math.random() * 0.3));
    const competitor2August = Math.round(yourAugust * (0.9 + Math.random() * 0.2));
    const competitor2October = Math.round(yourOctober * (0.9 + Math.random() * 0.2));
    const marketAvgAugust = Math.round((yourAugust + competitor1August + competitor2August) / 3);
    const marketAvgOctober = Math.round((yourOctober + competitor1October + competitor2October) / 3);
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Your Store', 'Marlboro Nissan', 'Valley Motors', 'Market Avg'],
            datasets: [
                {
                    label: 'August 2025',
                    data: [yourAugust, competitor1August, competitor2August, marketAvgAugust],
                    backgroundColor: '#93C5FD',
                    borderRadius: 4,
                    barPercentage: 0.8,
                    categoryPercentage: 0.8
                },
                {
                    label: 'October 2025',
                    data: [yourOctober, competitor1October, competitor2October, marketAvgOctober],
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
                    boxHeight: 10
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
    const augustData = dealRatings.map(rating => {
        const leads = vehicleData[rating].august;
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
                    label: 'August 2025',
                    data: augustData,
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
            
            <!-- Total Leads Bar Chart -->
            <div class="detail-chart-section">
                <h3>Total Leads - Last 3 Months</h3>
                <canvas id="detailLeadsChart" width="400" height="180"></canvas>
            </div>
            
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
    
    // Create the bar chart
    setTimeout(() => {
        createDetailLeadsChart(dealData);
    }, 100);
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

function createDetailLeadsChart(dealData) {
    const ctx = document.getElementById('detailLeadsChart');
    if (!ctx) return;
    
    new Chart(ctx.getContext('2d'), {
        type: 'bar',
        data: {
            labels: ['July 2025', 'August 2025', 'October 2025'],
            datasets: [{
                label: 'Total Leads',
                data: [dealData.july, dealData.august, dealData.october],
                backgroundColor: '#3B82F6',
                borderRadius: 6,
                barPercentage: 0.6,
                categoryPercentage: 0.8
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
                    backgroundColor: 'white',
                    titleColor: '#111827',
                    bodyColor: '#374151',
                    borderColor: '#E5E7EB',
                    borderWidth: 1,
                    cornerRadius: 6,
                    padding: 12,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return 'Total Leads: ' + context.parsed.y;
                        }
                    }
                },
                datalabels: {
                    display: true,
                    anchor: 'end',
                    align: 'end',
                    color: '#111827',
                    font: {
                        weight: 'bold',
                        size: 12
                    }
                }
            },
            layout: {
                padding: {
                    top: 20
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
                        padding: 8,
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
                        padding: 8,
                        font: {
                            size: 12
                        }
                    }
                }
            }
        },
        plugins: [{
            afterDatasetsDraw: function(chart) {
                const ctx = chart.ctx;
                chart.data.datasets.forEach(function(dataset, i) {
                    const meta = chart.getDatasetMeta(i);
                    meta.data.forEach(function(bar, index) {
                        const data = dataset.data[index];
                        ctx.fillStyle = '#111827';
                        ctx.font = 'bold 12px DM Sans';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'bottom';
                        ctx.fillText(data, bar.x, bar.y - 5);
                    });
                });
            }
        }]
    });
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