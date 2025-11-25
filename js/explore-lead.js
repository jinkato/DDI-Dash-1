/**
 * Explore Leads Page JavaScript
 * Handles the leads chart and vehicle table focused on total leads
 */

(function() {
    'use strict';

    // Inventory data will be loaded from JSON file
    let LEADS_DATA = {
        vehicles: []
    };

    let leadsChart = null;
    let marketAverageChart = null;

    // Performance bucket definitions
    const PERFORMANCE_BUCKETS = {
        '5+ leads': { min: 5, max: Infinity },
        '2-4 leads': { min: 2, max: 5 },
        '1 lead': { min: 1, max: 2 },
        '0 leads': { min: 0, max: 1 }
    };

    /**
     * Get performance category for a vehicle based on leads per vehicle
     * @param {number} leadsPerVehicle - Number of leads for the vehicle
     * @returns {string} Performance category name
     */
    function getPerformanceCategory(leadsPerVehicle) {
        for (const [category, range] of Object.entries(PERFORMANCE_BUCKETS)) {
            if (leadsPerVehicle >= range.min && leadsPerVehicle < range.max) {
                return category;
            }
        }
        return '0 leads'; // Default fallback
    }

    /**
     * Load inventory data from global CONVERSION_INVENTORY variable
     * (loaded via data/conversion-inventory.js script tag)
     */
    function loadInventoryData() {
        if (typeof CONVERSION_INVENTORY !== 'undefined' && CONVERSION_INVENTORY.vehicles) {
            LEADS_DATA.vehicles = CONVERSION_INVENTORY.vehicles;
            console.log('Loaded inventory data:', LEADS_DATA.vehicles.length, 'vehicles');
        } else {
            console.error('CONVERSION_INVENTORY not found! Make sure data/conversion-inventory.js is loaded.');
            LEADS_DATA.vehicles = [];
        }
    }

    /**
     * Initialize the explore leads page
     */
    function initializeExploreLeadsPage() {
        console.log('Initializing explore leads page...');

        // Load data first
        loadInventoryData();

        // Now render everything with the loaded data
        renderLeadsChart();
        renderLeadsTable();

        // Initialize all filters
        initializeMarketAverageFilter();
        initializeLeadTypeFilter();
        initializeLeadsRangeFilter();
        initializeVehicleTypeFilter();
        initializeDealRatingFilter();
    }

    /**
     * Initialize the lead type filter
     */
    function initializeLeadTypeFilter() {
        const checkboxes = document.querySelectorAll('.lead-type-checkbox');

        if (!checkboxes.length) return;

        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                filterTable();
            });
        });
    }

    /**
     * Initialize the leads range filter
     */
    function initializeLeadsRangeFilter() {
        const checkboxes = document.querySelectorAll('.leads-range-checkbox');

        if (!checkboxes.length) return;

        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                filterTable();
            });
        });
    }

    /**
     * Initialize the market average filter
     */
    function initializeMarketAverageFilter() {
        const checkbox = document.getElementById('show-market-average');
        const wrapper = document.getElementById('market-average-chart-wrapper');

        if (!checkbox || !wrapper) return;

        checkbox.addEventListener('change', function() {
            if (this.checked) {
                wrapper.style.display = 'block';
                // Re-render both charts after a small delay to allow flex to recalculate
                setTimeout(() => {
                    const filteredVehicles = getFilteredVehicles();
                    renderLeadsChart(filteredVehicles);
                    renderMarketAverageChart();
                }, 10);
            } else {
                wrapper.style.display = 'none';
                // Re-render main chart to take full width
                setTimeout(() => {
                    const filteredVehicles = getFilteredVehicles();
                    renderLeadsChart(filteredVehicles);
                }, 10);
            }
        });
    }

    /**
     * Initialize the vehicle type filter
     */
    function initializeVehicleTypeFilter() {
        const checkboxes = document.querySelectorAll('.vehicle-type-checkbox');

        if (!checkboxes.length) return;

        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                filterTable();
            });
        });
    }

    /**
     * Initialize the deal rating filter
     */
    function initializeDealRatingFilter() {
        const checkboxes = document.querySelectorAll('.deal-rating-checkbox');

        if (!checkboxes.length) return;

        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                filterTable();
            });
        });
    }

    /**
     * Get filtered vehicles based on all active filters
     * Returns array of vehicles that pass all filter criteria
     */
    function getFilteredVehicles() {
        // Get lead type filter values (checked checkboxes)
        const leadTypeCheckboxes = document.querySelectorAll('.lead-type-checkbox:checked');
        const selectedLeadTypes = Array.from(leadTypeCheckboxes).map(cb => cb.value);

        // Get leads range filter values (checked checkboxes)
        const leadsRangeCheckboxes = document.querySelectorAll('.leads-range-checkbox:checked');
        const selectedLeadsRanges = Array.from(leadsRangeCheckboxes).map(cb => cb.value);

        // Get vehicle type filter values (checked checkboxes)
        const vehicleTypeCheckboxes = document.querySelectorAll('.vehicle-type-checkbox:checked');
        const selectedVehicleTypes = Array.from(vehicleTypeCheckboxes).map(cb => cb.value);

        // Get deal rating filter values (checked checkboxes)
        const dealRatingCheckboxes = document.querySelectorAll('.deal-rating-checkbox:checked');
        const selectedDealRatings = Array.from(dealRatingCheckboxes).map(cb => cb.value);

        // Filter vehicles based on all criteria
        return LEADS_DATA.vehicles.filter(vehicle => {
            // Check lead type filter
            const passesLeadTypeFilter = selectedLeadTypes.length === 0 ||
                                        selectedLeadTypes.includes(vehicle.leadType);

            // Check leads range filter (based on leads last 7 days)
            const passesLeadsRangeFilter = selectedLeadsRanges.length === 0 || selectedLeadsRanges.some(range => {
                const leadsLast7Days = Math.round(vehicle.leadsLast7Days || 0);
                switch(range) {
                    case '5+':
                        return leadsLast7Days >= 5;
                    case '2-4':
                        return leadsLast7Days >= 2 && leadsLast7Days < 5;
                    case '1':
                        return leadsLast7Days >= 1 && leadsLast7Days < 2;
                    case '0':
                        return leadsLast7Days >= 0 && leadsLast7Days < 1;
                    default:
                        return false;
                }
            });

            // Check vehicle type filter
            const passesVehicleTypeFilter = selectedVehicleTypes.length === 0 ||
                                           selectedVehicleTypes.includes(vehicle.vehicleType);

            // Check deal rating filter
            const passesDealRatingFilter = selectedDealRatings.length === 0 ||
                                           selectedDealRatings.includes(vehicle.dealRating);

            // Return true only if vehicle passes ALL filters
            return passesLeadTypeFilter &&
                   passesLeadsRangeFilter &&
                   passesVehicleTypeFilter &&
                   passesDealRatingFilter;
        });
    }

    /**
     * Filter the table based on all active filters
     */
    function filterTable() {
        const tableBody = document.getElementById('leads-table-body');
        const rows = tableBody.querySelectorAll('tr');

        // Get filtered vehicles
        const filteredVehicles = getFilteredVehicles();
        const filteredVehicleIds = new Set(filteredVehicles.map(v => v.id));

        // Filter all rows using vehicle ID from data attribute
        rows.forEach(row => {
            const vehicleId = row.getAttribute('data-vehicle-id');
            if (filteredVehicleIds.has(vehicleId)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });

        // Update the chart with filtered data
        renderLeadsChart(filteredVehicles);
    }

    /**
     * Render the leads chart (bar chart showing vehicle count by performance bucket)
     * @param {Array} filteredVehicles - Optional array of filtered vehicles. If not provided, uses all vehicles.
     */
    function renderLeadsChart(filteredVehicles) {
        const canvas = document.getElementById('leads-chart');
        if (!canvas) {
            console.error('Canvas element with id "leads-chart" not found');
            return;
        }

        const ctx = canvas.getContext('2d');

        // Destroy existing chart if it exists
        if (leadsChart) {
            leadsChart.destroy();
        }

        // Use filtered vehicles if provided, otherwise use all vehicles
        const vehiclesToUse = filteredVehicles || LEADS_DATA.vehicles;

        // Update inventory count in the chart header
        const inventoryCountEl = document.getElementById('inventory-count');
        if (inventoryCountEl) {
            inventoryCountEl.textContent = vehiclesToUse.length;
        }

        // Group vehicles by performance category
        const vehiclesByCategory = {
            '5+ leads': 0,
            '2-4 leads': 0,
            '1 lead': 0,
            '0 leads': 0
        };

        vehiclesToUse.forEach(vehicle => {
            const category = getPerformanceCategory(vehicle.leadsLast7Days);
            vehiclesByCategory[category]++;
        });

        // Prepare data for chart with simplified labels (5+ on left, 0 on right)
        const labels = [
            ['Vehicles with', '5+ leads'],
            ['Vehicles with', '2-4 leads'],
            ['Vehicles with', '1 lead'],
            ['Vehicles with', '0 leads']
        ];
        const data = [
            vehiclesByCategory['5+ leads'],
            vehiclesByCategory['2-4 leads'],
            vehiclesByCategory['1 lead'],
            vehiclesByCategory['0 leads']
        ];

        // Use single blue color for all bars
        const backgroundColors = '#0763D3';

        leadsChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Number of Vehicles',
                    data: data,
                    backgroundColor: backgroundColors,
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: false,
                layout: {
                    padding: {
                        bottom: 16
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: false
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: '#0D1722',
                            font: {
                                size: 12
                            },
                            autoSkip: false,
                            maxRotation: 0,
                            minRotation: 0,
                            callback: function() {
                                return ''; // Hide default labels, we'll draw custom ones
                            }
                        },
                        title: {
                            display: false
                        }
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: '#E5E7EB'
                        },
                        ticks: {
                            color: '#6B7280',
                            font: {
                                size: 12
                            },
                            stepSize: 1
                        },
                        title: {
                            display: true,
                            text: 'Number of vehicle',
                            color: '#6B7280',
                            font: {
                                size: 13,
                                weight: '500'
                            }
                        }
                    }
                }
            },
            plugins: [{
                id: 'customXAxisLabels',
                afterDraw: function(chart) {
                    const ctx = chart.ctx;
                    const xAxis = chart.scales.x;
                    const yAxis = chart.scales.y;

                    // Define the label text
                    const labelLines = [
                        ['Vehicles with', '5+ leads'],
                        ['Vehicles with', '2-4 leads'],
                        ['Vehicles with', '1 lead'],
                        ['Vehicles with', '0 leads']
                    ];

                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'top';

                    // Draw labels for each tick
                    xAxis.ticks.forEach((tick, index) => {
                        const x = xAxis.getPixelForTick(index);
                        const yStart = yAxis.bottom + 10; // Start 10px below the x-axis

                        // Draw first line: "Vehicles with" in #5E6976
                        ctx.fillStyle = '#5E6976';
                        ctx.font = '400 12px DM Sans, sans-serif';
                        ctx.fillText('Vehicles with', x, yStart);

                        // Draw second line: lead range in #0D1722 bold
                        ctx.fillStyle = '#0D1722';
                        ctx.font = '700 12px DM Sans, sans-serif';
                        ctx.fillText(labelLines[index][1], x, yStart + 16);
                    });
                }
            }, {
                id: 'datalabels',
                afterDatasetsDraw: function(chart) {
                    const ctx = chart.ctx;
                    chart.data.datasets.forEach((dataset, datasetIndex) => {
                        const meta = chart.getDatasetMeta(datasetIndex);
                        if (!meta.hidden) {
                            meta.data.forEach((bar, index) => {
                                const data = dataset.data[index];

                                if (data > 0) {
                                    // Calculate bar height
                                    const barHeight = bar.base - bar.y;
                                    const minHeightForInside = 30; // Minimum height needed to fit text inside

                                    const x = bar.x;
                                    let numberY;

                                    // If bar is too short, place text above the bar
                                    if (barHeight < minHeightForInside) {
                                        numberY = bar.y - 12;
                                        ctx.fillStyle = '#374151'; // Dark text for outside
                                    } else {
                                        // Place text inside the bar
                                        numberY = bar.y + 20;
                                        ctx.fillStyle = '#FFFFFF'; // White text for inside
                                    }

                                    ctx.textAlign = 'center';
                                    ctx.textBaseline = 'middle';

                                    // Draw the number
                                    ctx.font = '600 13px DM Sans, sans-serif';
                                    ctx.fillText(data, x, numberY);
                                }
                            });
                        }
                    });
                }
            }]
        });
    }

    /**
     * Render the market average chart
     */
    function renderMarketAverageChart() {
        const canvas = document.getElementById('market-average-chart');
        if (!canvas) {
            console.error('Canvas element with id "market-average-chart" not found');
            return;
        }

        const ctx = canvas.getContext('2d');

        // Destroy existing chart if it exists
        if (marketAverageChart) {
            marketAverageChart.destroy();
        }

        // Market average data (simulated industry benchmark for 5+, 2-4, 1, 0)
        const labels = [
            ['Vehicles with', '5+ leads'],
            ['Vehicles with', '2-4 leads'],
            ['Vehicles with', '1 lead'],
            ['Vehicles with', '0 leads']
        ];
        const data = [7, 15, 10, 8]; // Typical distribution

        marketAverageChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Number of Vehicles',
                    data: data,
                    backgroundColor: '#5E6976',
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: false,
                layout: {
                    padding: {
                        bottom: 16
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: false
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: '#0D1722',
                            font: {
                                size: 12
                            },
                            autoSkip: false,
                            maxRotation: 0,
                            minRotation: 0,
                            callback: function() {
                                return ''; // Hide default labels, we'll draw custom ones
                            }
                        },
                        title: {
                            display: false
                        }
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: '#E5E7EB'
                        },
                        ticks: {
                            color: '#6B7280',
                            font: {
                                size: 12
                            },
                            stepSize: 1
                        },
                        title: {
                            display: true,
                            text: 'Number of vehicles',
                            color: '#6B7280',
                            font: {
                                size: 13,
                                weight: '500'
                            }
                        }
                    }
                }
            },
            plugins: [{
                id: 'customXAxisLabels',
                afterDraw: function(chart) {
                    const ctx = chart.ctx;
                    const xAxis = chart.scales.x;
                    const yAxis = chart.scales.y;

                    // Define the label text
                    const labelLines = [
                        ['Vehicles with', '5+ leads'],
                        ['Vehicles with', '2-4 leads'],
                        ['Vehicles with', '1 lead'],
                        ['Vehicles with', '0 leads']
                    ];

                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'top';

                    // Draw labels for each tick
                    xAxis.ticks.forEach((tick, index) => {
                        const x = xAxis.getPixelForTick(index);
                        const yStart = yAxis.bottom + 10; // Start 10px below the x-axis

                        // Draw first line: "Vehicles with" in #5E6976
                        ctx.fillStyle = '#5E6976';
                        ctx.font = '400 12px DM Sans, sans-serif';
                        ctx.fillText('Vehicles with', x, yStart);

                        // Draw second line: lead range in #0D1722 bold
                        ctx.fillStyle = '#0D1722';
                        ctx.font = '700 12px DM Sans, sans-serif';
                        ctx.fillText(labelLines[index][1], x, yStart + 16);
                    });
                }
            }, {
                id: 'datalabels',
                afterDatasetsDraw: function(chart) {
                    const ctx = chart.ctx;
                    chart.data.datasets.forEach((dataset, datasetIndex) => {
                        const meta = chart.getDatasetMeta(datasetIndex);
                        if (!meta.hidden) {
                            meta.data.forEach((bar, index) => {
                                const data = dataset.data[index];

                                if (data > 0) {
                                    // Calculate bar height
                                    const barHeight = bar.base - bar.y;
                                    const minHeightForInside = 30; // Minimum height needed to fit text inside

                                    const x = bar.x;
                                    let numberY;

                                    // If bar is too short, place text above the bar
                                    if (barHeight < minHeightForInside) {
                                        numberY = bar.y - 12;
                                        ctx.fillStyle = '#374151'; // Dark text for outside
                                    } else {
                                        // Place text inside the bar
                                        numberY = bar.y + 20;
                                        ctx.fillStyle = '#FFFFFF'; // White text for inside
                                    }

                                    ctx.textAlign = 'center';
                                    ctx.textBaseline = 'middle';

                                    // Draw the number
                                    ctx.font = '600 13px DM Sans, sans-serif';
                                    ctx.fillText(data, x, numberY);
                                }
                            });
                        }
                    });
                }
            }]
        });
    }

    /**
     * Get performance badge HTML
     * @param {string} category - Performance category
     * @returns {string} HTML for performance badge
     */
    function getPerformanceBadge(category) {
        const colors = {
            'High performers': '#10B981',
            'Solid performers': '#3B82F6',
            'Average': '#F59E0B',
            'Underperformers': '#EF4444',
            'Non-performers': '#991B1B'
        };

        const bgColor = colors[category] || '#6B7280';

        return `<span style="display: inline-block; padding: 4px 8px; background: ${bgColor}; color: white; border-radius: 4px; font-size: 11px; font-weight: 600;">${category}</span>`;
    }

    /**
     * Render the leads table
     */
    function renderLeadsTable() {
        const tableBody = document.getElementById('leads-table-body');
        if (!tableBody) {
            console.error('Table body element not found');
            return;
        }

        // Clear existing rows
        tableBody.innerHTML = '';

        // Add vehicle rows (sorted by leads last 7 days descending)
        const sortedVehicles = [...LEADS_DATA.vehicles].sort((a, b) => b.leadsLast7Days - a.leadsLast7Days);

        sortedVehicles.forEach((vehicle, index) => {
            const row = document.createElement('tr');
            row.style.fontSize = '12px';
            row.setAttribute('data-vehicle-id', vehicle.id);
            row.innerHTML = `
                <td style="display: flex; align-items: center; gap: 12px;">
                    <img src="${vehicle.image}" alt="${vehicle.name}" style="width: 53px; height: 40px; object-fit: cover; border-radius: 4px;">
                    <div>
                        <a href="#" onclick="return false;">${vehicle.name}</a>
                        <div style="font-size: 12px; color: #5E6976;">$${vehicle.price.toLocaleString()} • ${vehicle.mileage.toLocaleString()} mi</div>
                    </div>
                </td>
                <td>${Math.round(vehicle.daysOnLot || 0)} days</td>
                <td>${Math.round(vehicle.vdpViewsLast7Days || 0)} views</td>
                <td>${Math.round(vehicle.leadsLast7Days || 0)} leads</td>
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
        initializeExploreLeadsPage();
    });

})(); // End of IIFE - keeps all explore leads page code isolated
