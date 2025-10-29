// Days Page JavaScript

// Data structure
const daysOnLotData = {
    barChart: {
        october2024: 48,
        november2024: 52,
        december2024: 55,
        january2025: 54,
        february2025: 56,
        march2025: 58,
        april2025: 61,
        may2025: 59,
        june2025: 62,
        july2025: 60,
        august2025: 63,
        september2025: 55,
        october2025: 68
    },
    table: {
        compact: {
            total: { july: 52, august: 51, september: 52, october: 53 },  // Staying similar
            greatDeal: { july: 45, august: 44, september: 45, october: 46 },
            goodDeal: { july: 50, august: 49, september: 50, october: 51 },
            fairDeal: { july: 55, august: 54, september: 55, october: 56 },
            highPriced: { july: 58, august: 57, september: 58, october: 59 },
            overPriced: { july: 62, august: 61, september: 62, october: 63 }
        },
        sedans: {
            total: { july: 58, august: 62, september: 65, october: 72 },  // Getting worse
            greatDeal: { july: 50, august: 54, september: 57, october: 64 },
            goodDeal: { july: 55, august: 59, september: 62, october: 69 },
            fairDeal: { july: 60, august: 64, september: 67, october: 74 },
            highPriced: { july: 63, august: 67, september: 70, october: 77 },
            overPriced: { july: 67, august: 71, september: 74, october: 81 }
        },
        suvco: {
            total: { july: 72, august: 68, september: 64, october: 60 },  // Improving
            greatDeal: { july: 65, august: 61, september: 57, october: 53 },
            goodDeal: { july: 70, august: 66, september: 62, october: 58 },
            fairDeal: { july: 75, august: 71, september: 67, october: 63 },
            highPriced: { july: 78, august: 74, september: 70, october: 66 },
            overPriced: { july: 82, august: 78, september: 74, october: 70 }
        },
        trucks: {
            total: { july: 68, august: 69, september: 68, october: 69 },  // Staying similar
            greatDeal: { july: 60, august: 61, september: 60, october: 61 },
            goodDeal: { july: 65, august: 66, september: 65, october: 66 },
            fairDeal: { july: 70, august: 71, september: 70, october: 71 },
            highPriced: { july: 73, august: 74, september: 73, october: 74 },
            overPriced: { july: 77, august: 78, september: 77, october: 78 }
        },
        luxury: {
            total: { july: 45, august: 48, september: 52, october: 57 },  // Getting worse
            greatDeal: { july: 38, august: 41, september: 45, october: 50 },
            goodDeal: { july: 42, august: 45, september: 49, october: 54 },
            fairDeal: { july: 47, august: 50, september: 54, october: 59 },
            highPriced: { july: 50, august: 53, september: 57, october: 62 },
            overPriced: { july: 54, august: 57, september: 61, october: 66 }
        }
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeDaysPage();
});

function initializeDaysPage() {
    initializeBarChart();
    renderPerformanceTable();
    setupAccordionHandlers();
    setupDropdownHandler();
}

function initializeBarChart() {
    const ctx = document.getElementById('daysOnLotChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Oct 2024', 'Nov 2024', 'Dec 2024', 'Jan 2025', 'Feb 2025', 'Mar 2025', 'Apr 2025', 
                     'May 2025', 'Jun 2025', 'Jul 2025', 'Aug 2025', 'Sep 2025', 'Oct 2025'],
            datasets: [{
                label: 'Days on Lot',
                data: [
                    daysOnLotData.barChart.october2024,
                    daysOnLotData.barChart.november2024,
                    daysOnLotData.barChart.december2024,
                    daysOnLotData.barChart.january2025,
                    daysOnLotData.barChart.february2025,
                    daysOnLotData.barChart.march2025,
                    daysOnLotData.barChart.april2025,
                    daysOnLotData.barChart.may2025,
                    daysOnLotData.barChart.june2025,
                    daysOnLotData.barChart.july2025,
                    daysOnLotData.barChart.august2025,
                    daysOnLotData.barChart.september2025,
                    daysOnLotData.barChart.october2025
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
                            return 'Days on Lot: ' + context.parsed.y;
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
    const totalTrend = getTrendArrow(daysOnLotData.barChart.october2025, daysOnLotData.barChart[firstMonthKey]);
    totalRow.innerHTML = `
        <td class="total-cell">Average Days</td>
        <td class="metric-cell total-metric">${daysOnLotData.barChart[firstMonthKey]}</td>
        <td class="metric-cell total-metric ${getChangeClass(daysOnLotData.barChart.october2025, daysOnLotData.barChart[firstMonthKey])}">
            ${daysOnLotData.barChart.october2025}
            ${totalTrend}
        </td>
    `;
    tbody.appendChild(totalRow);
    
    vehicleTypes.forEach((vehicle, index) => {
        const vehicleData = daysOnLotData.table[vehicle.key];
        
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
                        <h4>Days on Lot by Deal Rating - ${vehicle.name}</h4>
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
    
    // For days on lot, increase is bad (red) and decrease is good (green)
    if (absoluteChange <= -10) {
        return 'significant-increase'; // Green
    } else if (absoluteChange <= -5) {
        return 'moderate-increase'; // Light green
    } else if (absoluteChange < 0) {
        return 'slight-increase'; // Very light green
    } else if (absoluteChange === 0) {
        return 'no-change';
    } else if (absoluteChange < 5) {
        return 'slight-decrease'; // Very light red
    } else if (absoluteChange < 10) {
        return 'moderate-decrease'; // Light red
    } else {
        return 'significant-decrease'; // Red
    }
}

function getInventoryTotal(vehicleKey, month) {
    const vehicleData = daysOnLotData.table[vehicleKey];
    const dealRatings = ['greatDeal', 'goodDeal', 'fairDeal', 'highPriced', 'overPriced'];
    
    // Calculate inventory totals
    const monthData = month === 'september' ? 
        dealRatings.map(rating => Math.round(vehicleData[rating].september / 2.5)) :
        dealRatings.map(rating => Math.round(vehicleData[rating].october / 2.5));
    
    return monthData.reduce((sum, val) => sum + val, 0);
}

function generateInventoryBar(vehicleKey, month) {
    const vehicleData = daysOnLotData.table[vehicleKey];
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
    const vehicleData = daysOnLotData.table[vehicleKey];
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
                        // For days on lot, negative change (decrease) is good (green)
                        return value <= 0 ? '#10B981' : '#EF4444';
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
    
    const vehicleData = daysOnLotData.table[vehicleKey];
    const dealRatings = ['greatDeal', 'goodDeal', 'fairDeal', 'highPriced', 'overPriced'];
    const dealNames = ['Great Deal', 'Good Deal', 'Fair Deal', 'High Priced', 'Over Priced'];
    
    // Use days on lot data for each deal rating
    const septemberData = dealRatings.map(rating => vehicleData[rating].september);
    const octoberData = dealRatings.map(rating => vehicleData[rating].october);
    
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
                            return context.dataset.label + ': ' + context.parsed.y + ' days';
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
                        text: 'Days on Lot',
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
    const vehicleData = daysOnLotData.table[vehicle];
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
            
            <!-- Days on Lot -->
            <div class="detail-metric-section">
                <h3>Average Days on Lot</h3>
                <div class="metric-grid">
                    <div class="metric-item">
                        <span class="metric-label">July 2025</span>
                        <span class="metric-value">${dealData.july}</span>
                    </div>
                    <div class="metric-item">
                        <span class="metric-label">August 2025</span>
                        <span class="metric-value">${dealData.august}</span>
                    </div>
                    <div class="metric-item">
                        <span class="metric-label">October 2025</span>
                        <span class="metric-value">${dealData.october}</span>
                    </div>
                </div>
            </div>
            
            <!-- Inventory Breakdown -->
            <div class="detail-inventory-section">
                <h3>Days on Lot by Deal Rating</h3>
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
    
    // Trend insight (for days on lot, increase is bad, decrease is good)
    if (parseFloat(augustToOctober) > 0) {
        insights.push(`<li>Days on lot increased by ${augustToOctober}% from August to October (needs improvement)</li>`);
    } else if (parseFloat(augustToOctober) < 0) {
        insights.push(`<li>Days on lot decreased by ${Math.abs(augustToOctober)}% from August to October (improving)</li>`);
    } else {
        insights.push(`<li>Days on lot remained stable from August to October</li>`);
    }
    
    // Performance insight (for days on lot, lower is better)
    if (dealData.october < 50) {
        insights.push(`<li>Strong performance with average ${dealData.october} days on lot in October</li>`);
    } else if (dealData.october > 70) {
        insights.push(`<li>Opportunity to reduce inventory aging for ${dealRating.toLowerCase()} vehicles</li>`);
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