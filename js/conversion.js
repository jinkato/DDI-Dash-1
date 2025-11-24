/**
 * Conversion Page JavaScript
 * Handles the conversion funnel chart and vehicle table
 */

// Mock data for conversion funnel
const CONVERSION_DATA = {
    funnel: {
        searchViews: 15420,
        detailViews: 4850,
        leads: 285
    },
    vehicles: [
        {
            name: '2023 Toyota Camry SE',
            image: 'img/car thumbnail/used-1.png',
            searchViews: 45,
            detailViews: 12,
            leads: 4
        },
        {
            name: '2022 Honda Accord EX',
            image: 'img/car thumbnail/used-2.png',
            searchViews: 42,
            detailViews: 15,
            leads: 6
        },
        {
            name: '2023 Tesla Model 3',
            image: 'img/car thumbnail/used-3.png',
            searchViews: 50,
            detailViews: 18,
            leads: 5
        },
        {
            name: '2021 Ford F-150 XLT',
            image: 'img/car thumbnail/used-4.png',
            searchViews: 48,
            detailViews: 14,
            leads: 2
        },
        {
            name: '2023 Mazda CX-5 Grand Touring',
            image: 'img/car thumbnail/used-5.png',
            searchViews: 40,
            detailViews: 10,
            leads: 0
        },
        {
            name: '2022 Chevrolet Silverado 1500',
            image: 'img/car thumbnail/used-6.png',
            searchViews: 47,
            detailViews: 16,
            leads: 3
        },
        {
            name: '2023 Subaru Outback Premium',
            image: 'img/car thumbnail/used-7.png',
            searchViews: 43,
            detailViews: 11,
            leads: 1
        }
    ]
};

let conversionChart = null;

/**
 * Initialize the conversion page
 */
function initializeConversionPage() {
    console.log('Initializing conversion page...');
    renderConversionChart();
    renderConversionTable();
    initializeConversionRateFilter();
}

/**
 * Initialize the conversion rate filter
 */
function initializeConversionRateFilter() {
    const minInput = document.getElementById('conversion-min-input');
    const maxInput = document.getElementById('conversion-max-input');
    const resetLink = document.getElementById('reset-conversion-rate');

    if (!minInput || !maxInput || !resetLink) return;

    // Update filter when min input changes
    minInput.addEventListener('change', function() {
        let minVal = parseInt(this.value) || 0;
        let maxVal = parseInt(maxInput.value) || 100;

        // Ensure min doesn't exceed max
        if (minVal > maxVal) {
            minVal = maxVal;
            this.value = minVal;
        }

        // Ensure within bounds
        if (minVal < 0) {
            minVal = 0;
            this.value = 0;
        }

        filterTableByConversionRate(minVal, maxVal);
    });

    // Update filter when max input changes
    maxInput.addEventListener('change', function() {
        let minVal = parseInt(minInput.value) || 0;
        let maxVal = parseInt(this.value) || 100;

        // Ensure max doesn't go below min
        if (maxVal < minVal) {
            maxVal = minVal;
            this.value = maxVal;
        }

        // Ensure within bounds
        if (maxVal > 100) {
            maxVal = 100;
            this.value = 100;
        }

        filterTableByConversionRate(minVal, maxVal);
    });

    // Reset to default values
    resetLink.addEventListener('click', function(e) {
        e.preventDefault();
        minInput.value = 0;
        maxInput.value = 100;
        filterTableByConversionRate(0, 100);
    });
}

/**
 * Filter the table by conversion rate range
 */
function filterTableByConversionRate(minRate, maxRate) {
    const tableBody = document.getElementById('conversion-table-body');
    const rows = tableBody.querySelectorAll('tr');

    // Skip the first row (Average row)
    for (let i = 1; i < rows.length; i++) {
        const vehicleIndex = i - 1; // Adjust for average row
        const vehicle = CONVERSION_DATA.vehicles[vehicleIndex];

        if (vehicle) {
            // Calculate conversion rate
            const conversionRate = (vehicle.leads / vehicle.searchViews) * 100;

            // Show/hide row based on filter
            if (conversionRate >= minRate && conversionRate <= maxRate) {
                rows[i].style.display = '';
            } else {
                rows[i].style.display = 'none';
            }
        }
    }
}

/**
 * Render the conversion funnel chart
 */
function renderConversionChart() {
    const canvas = document.getElementById('conversion-chart');
    if (!canvas) {
        console.error('Canvas element with id "conversion-chart" not found');
        return;
    }

    const ctx = canvas.getContext('2d');

    // Destroy existing chart if it exists
    if (conversionChart) {
        conversionChart.destroy();
    }

    const data = CONVERSION_DATA.funnel;

    // Calculate percentages (based on search views as 100%)
    const searchViewsPercent = 100;
    const detailViewsPercent = (data.detailViews / data.searchViews) * 100;
    const leadsPercent = (data.leads / data.searchViews) * 100;

    conversionChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Search result', 'Vehicle page', 'Leads'],
            datasets: [{
                label: 'Conversion Rate',
                data: [searchViewsPercent, detailViewsPercent, leadsPercent],
                backgroundColor: ['#0763D3', '#0763D3', '#0763D3'],
                borderWidth: 0,
                // Store raw numbers for tooltip
                rawData: [data.searchViews, data.detailViews, data.leads]
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
                    },
                    callbacks: {
                        label: function(context) {
                            const rawValue = context.dataset.rawData[context.dataIndex];
                            const percent = context.parsed.y.toFixed(1);
                            return [
                                `${percent}%`,
                                `${rawValue.toLocaleString()} total`
                            ];
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#6B7280',
                        font: {
                            size: 12
                        }
                    }
                },
                y: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        color: '#E5E7EB'
                    },
                    ticks: {
                        color: '#6B7280',
                        font: {
                            size: 12
                        },
                        callback: function(value) {
                            return value + '%';
                        }
                    },
                    title: {
                        display: true,
                        text: 'Conversion Rate (%)',
                        color: '#6B7280',
                        font: {
                            size: 13,
                            weight: '500'
                        }
                    }
                }
            }
        },
        plugins: [
        {
            id: 'funnelConnectors',
            afterDatasetsDraw: function(chart) {
                const ctx = chart.ctx;
                const meta = chart.getDatasetMeta(0);

                if (meta.data.length >= 3) {
                    const bars = meta.data;

                    // Draw connector between first and second bar
                    if (bars[0] && bars[1]) {
                        const bar1 = bars[0];
                        const bar2 = bars[1];

                        // Get bar widths (half width for edges)
                        const bar1HalfWidth = (bar1.width || 40) / 2;
                        const bar2HalfWidth = (bar2.width || 40) / 2;

                        // Draw trapezoid
                        ctx.fillStyle = 'rgba(7, 99, 211, 0.2)';
                        ctx.beginPath();
                        ctx.moveTo(bar1.x + bar1HalfWidth, bar1.y); // Top right of first bar
                        ctx.lineTo(bar2.x - bar2HalfWidth, bar2.y); // Top left of second bar
                        ctx.lineTo(bar2.x - bar2HalfWidth, bar2.base); // Bottom left of second bar
                        ctx.lineTo(bar1.x + bar1HalfWidth, bar1.base); // Bottom right of first bar
                        ctx.closePath();
                        ctx.fill();
                    }

                    // Draw connector between second and third bar
                    if (bars[1] && bars[2]) {
                        const bar2 = bars[1];
                        const bar3 = bars[2];

                        // Get bar widths (half width for edges)
                        const bar2HalfWidth = (bar2.width || 40) / 2;
                        const bar3HalfWidth = (bar3.width || 40) / 2;

                        // Draw trapezoid
                        ctx.fillStyle = 'rgba(7, 99, 211, 0.2)';
                        ctx.beginPath();
                        ctx.moveTo(bar2.x + bar2HalfWidth, bar2.y); // Top right of second bar
                        ctx.lineTo(bar3.x - bar3HalfWidth, bar3.y); // Top left of third bar
                        ctx.lineTo(bar3.x - bar3HalfWidth, bar3.base); // Bottom left of third bar
                        ctx.lineTo(bar2.x + bar2HalfWidth, bar2.base); // Bottom right of second bar
                        ctx.closePath();
                        ctx.fill();
                    }
                }
            }
        },
        {
            id: 'datalabels',
            afterDatasetsDraw: function(chart) {
                const ctx = chart.ctx;
                chart.data.datasets.forEach((dataset, datasetIndex) => {
                    const meta = chart.getDatasetMeta(datasetIndex);
                    if (!meta.hidden) {
                        meta.data.forEach((bar, index) => {
                            const data = dataset.data[index];
                            const rawValue = dataset.rawData[index];

                            // Calculate bar height
                            const barHeight = bar.base - bar.y;
                            const minHeightForInside = 50; // Minimum height needed to fit text inside

                            const x = bar.x;
                            let percentY, countY;

                            // If bar is too short, place text above the bar
                            if (barHeight < minHeightForInside) {
                                percentY = bar.y - 25;
                                countY = bar.y - 8;
                                ctx.fillStyle = '#374151'; // Dark text for outside
                            } else {
                                // Place text inside the bar
                                percentY = bar.y + 20;
                                countY = bar.y + 38;
                                ctx.fillStyle = '#FFFFFF'; // White text for inside
                            }

                            // Draw percentage
                            ctx.font = '600 13px DM Sans, sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            const percentText = data.toFixed(1) + '%';
                            ctx.fillText(percentText, x, percentY);

                            // Draw count below percentage
                            ctx.font = '400 12px DM Sans, sans-serif';
                            const countText = rawValue.toLocaleString();
                            ctx.fillText(countText, x, countY);
                        });
                    }
                });
            }
        }]
    });
}

/**
 * Render the conversion table
 */
function renderConversionTable() {
    const tableBody = document.getElementById('conversion-table-body');
    if (!tableBody) {
        console.error('Table body element not found');
        return;
    }

    // Clear existing rows
    tableBody.innerHTML = '';

    // Calculate average
    const avgSearchViews = Math.round(
        CONVERSION_DATA.vehicles.reduce((sum, v) => sum + v.searchViews, 0) / CONVERSION_DATA.vehicles.length
    );
    const avgDetailViews = Math.round(
        CONVERSION_DATA.vehicles.reduce((sum, v) => sum + v.detailViews, 0) / CONVERSION_DATA.vehicles.length
    );
    const avgLeads = Math.round(
        CONVERSION_DATA.vehicles.reduce((sum, v) => sum + v.leads, 0) / CONVERSION_DATA.vehicles.length
    );

    // Calculate average percentages
    const avgVehiclePagePercent = ((avgDetailViews / avgSearchViews) * 100).toFixed(1);
    const avgLeadsPercent = avgDetailViews > 0 ? ((avgLeads / avgDetailViews) * 100).toFixed(1) : '0.0';

    // Add average row first
    const avgRow = document.createElement('tr');
    avgRow.style.fontWeight = '600';
    avgRow.style.backgroundColor = '#F9FAFB';
    avgRow.style.fontSize = '12px';
    avgRow.innerHTML = `
        <td>Average</td>
        <td style="font-size: 11px;">
            <div>${avgSearchViews.toLocaleString()}</div>
            <div style="color: #5E6976; font-size: 12px;">100%</div>
        </td>
        <td style="font-size: 11px;">
            <div>${avgDetailViews.toLocaleString()}</div>
            <div style="color: #5E6976; font-size: 12px;">${avgVehiclePagePercent}%</div>
        </td>
        <td>
            <div>${avgLeads}</div>
            <div style="color: #5E6976; font-size: 12px;">${avgLeadsPercent}%</div>
        </td>
        <td></td>
    `;
    tableBody.appendChild(avgRow);

    // Add vehicle rows
    CONVERSION_DATA.vehicles.forEach((vehicle, index) => {
        // Calculate percentages for this vehicle
        const vehiclePagePercent = ((vehicle.detailViews / vehicle.searchViews) * 100).toFixed(1);
        const leadsPercent = vehicle.detailViews > 0 ? ((vehicle.leads / vehicle.detailViews) * 100).toFixed(1) : '0.0';

        const row = document.createElement('tr');
        row.style.fontSize = '12px';
        row.innerHTML = `
            <td style="display: flex; align-items: center; gap: 12px;">
                <img src="${vehicle.image}" alt="${vehicle.name}" style="width: 53px; height: 40px; object-fit: cover; border-radius: 4px;">
                <a href="#" onclick="return false;">${vehicle.name}</a>
            </td>
            <td style="font-size: 11px;">
                <div>${vehicle.searchViews.toLocaleString()}</div>
                <div style="color: #5E6976; font-size: 12px;">100%</div>
            </td>
            <td style="font-size: 11px;">
                <div>${vehicle.detailViews.toLocaleString()}</div>
                <div style="color: #5E6976; font-size: 12px;">${vehiclePagePercent}%</div>
            </td>
            <td>
                <div>${vehicle.leads}</div>
                <div style="color: #5E6976; font-size: 12px;">${leadsPercent}%</div>
            </td>
            <td style="position: relative;">
                <button class="menu-button" data-index="${index}" style="background: none; border: none; cursor: pointer; padding: 4px;">
                    <img src="img/icon/menu.svg" alt="Menu" style="width: 20px; height: 20px;">
                </button>
                <div class="dropdown-menu" id="dropdown-${index}" style="display: none; position: absolute; right: 0; top: 100%; background: white; border: 1px solid #D1D5DB; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); min-width: 200px; z-index: 1000;">
                    <a href="#" onclick="return false;" style="display: block; padding: 12px 16px; text-decoration: none; color: #374151; font-size: 14px; border-bottom: 1px solid #E5E7EB;">Segment analysis</a>
                    <a href="#" onclick="return false;" style="display: block; padding: 12px 16px; text-decoration: none; color: #374151; font-size: 14px;">Buyer overlap analysis</a>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });

    // Add event listeners for menu buttons
    document.querySelectorAll('.menu-button').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const index = this.getAttribute('data-index');
            const dropdown = document.getElementById(`dropdown-${index}`);

            // Close all other dropdowns
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                if (menu.id !== `dropdown-${index}`) {
                    menu.style.display = 'none';
                }
            });

            // Toggle current dropdown
            dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function() {
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            menu.style.display = 'none';
        });
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeConversionPage();
});
