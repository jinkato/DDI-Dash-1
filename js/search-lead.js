/**
 * Search Leads Page JavaScript
 * Handles the search leads chart showing total search and leads side by side
 */

(function() {
    'use strict';

    // Inventory data will be loaded from JSON file
    let SEARCH_DATA = {
        vehicles: []
    };

    // Separate storage for market and dealer inventories
    let MARKET_INVENTORY = [];
    let DEALER_INVENTORY = [];

    let searchChart = null;

    // Sorting state
    let currentSortColumn = 'conversion'; // Default sort by conversion
    let currentSortDirection = 'desc';

    // Flag to prevent multiple re-renders when toggling Group By checkboxes
    let isTogglingGroupBy = false;

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
     * Load inventory data from global MARKET_SEARCH_INVENTORY and CONVERSION_INVENTORY variables
     * (loaded via data/market-search-inventory.js and data/conversion-inventory.js script tags)
     */
    function loadInventoryData() {
        // Load market inventory
        if (typeof MARKET_SEARCH_INVENTORY !== 'undefined' && MARKET_SEARCH_INVENTORY.vehicles) {
            MARKET_INVENTORY = MARKET_SEARCH_INVENTORY.vehicles;
            console.log('Loaded market search inventory data:', MARKET_INVENTORY.length, 'vehicles');
        } else {
            console.error('MARKET_SEARCH_INVENTORY not found! Make sure data/market-search-inventory.js is loaded.');
            MARKET_INVENTORY = [];
        }

        // Load dealer inventory
        if (typeof CONVERSION_INVENTORY !== 'undefined' && CONVERSION_INVENTORY.vehicles) {
            DEALER_INVENTORY = CONVERSION_INVENTORY.vehicles;
            console.log('Loaded dealer inventory data:', DEALER_INVENTORY.length, 'vehicles');
        } else {
            console.error('CONVERSION_INVENTORY not found! Make sure data/conversion-inventory.js is loaded.');
            DEALER_INVENTORY = [];
        }

        // Default to market inventory
        SEARCH_DATA.vehicles = MARKET_INVENTORY;
    }

    /**
     * Initialize the search leads page
     */
    function initializeSearchLeadsPage() {
        console.log('Initializing search leads page...');

        // Load data first
        loadInventoryData();

        // Now render everything with the loaded data
        // renderSearchChart(); // Chart removed from UI
        renderSearchTable();

        // Initialize all filters
        initializeGroupByFilter();
        initializeMyInventoryFilter();
        initializeVehicleTypeFilter();
        initializeDealRatingFilter();
        initializeTableSorting();
    }

    /**
     * Initialize table header sorting
     */
    function initializeTableSorting() {
        const headers = document.querySelectorAll('.vehicle-table thead th');

        if (!headers.length) return;

        // Add click handlers to sortable columns (skip the last column - menu)
        headers.forEach((header, index) => {
            if (index === headers.length - 1) return; // Skip menu column

            header.style.cursor = 'pointer';
            header.style.userSelect = 'none';

            // Add data attribute for column name
            const columnNames = ['vehicle', 'count', 'totalSearch', 'totalLeads', 'opportunityScore', 'conversion'];
            header.setAttribute('data-sort-column', columnNames[index]);


            header.addEventListener('click', function() {
                const column = this.getAttribute('data-sort-column');

                // Toggle direction if clicking same column, otherwise default to desc
                if (currentSortColumn === column) {
                    currentSortDirection = currentSortDirection === 'desc' ? 'asc' : 'desc';
                } else {
                    currentSortColumn = column;
                    currentSortDirection = 'desc';
                }

                // Re-render table with new sort
                renderSearchTable();
            });
        });

        // Set initial sort indicators
        updateSortIndicators();
    }

    /**
     * Initialize the group by filter
     */
    function initializeGroupByFilter() {
        const checkboxes = document.querySelectorAll('.group-by-checkbox');

        if (!checkboxes.length) return;

        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                // Skip re-render if we're programmatically toggling from My Inventory filter
                if (!isTogglingGroupBy) {
                    renderSearchTable();
                }
            });
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
     * Initialize the "My inventory" filter
     */
    function initializeMyInventoryFilter() {
        const checkbox = document.getElementById('show-my-inventory');

        if (!checkbox) return;

        checkbox.addEventListener('change', function() {
            // Set flag to prevent multiple re-renders
            isTogglingGroupBy = true;

            // Get all Group by checkboxes
            const groupByCheckboxes = document.querySelectorAll('.group-by-checkbox');

            if (this.checked) {
                // Switch to dealer inventory
                SEARCH_DATA.vehicles = DEALER_INVENTORY;

                // Check all Group by checkboxes EXCEPT Vehicle type
                groupByCheckboxes.forEach(cb => {
                    if (cb.value !== 'Vehicle type') {
                        cb.checked = true;
                    }
                });
            } else {
                // Switch back to market inventory
                SEARCH_DATA.vehicles = MARKET_INVENTORY;

                // Uncheck all Group by checkboxes
                groupByCheckboxes.forEach(cb => {
                    cb.checked = false;
                });
            }

            // Reset flag
            isTogglingGroupBy = false;

            // Re-render table with new data and grouping
            renderSearchTable();
        });
    }

    /**
     * Get filtered vehicles based on all active filters
     * Returns array of vehicles that pass all filter criteria
     */
    function getFilteredVehicles() {
        // Get vehicle type filter values (checked checkboxes)
        const vehicleTypeCheckboxes = document.querySelectorAll('.vehicle-type-checkbox:checked');
        const selectedVehicleTypes = Array.from(vehicleTypeCheckboxes).map(cb => cb.value);

        // Get deal rating filter values (checked checkboxes)
        const dealRatingCheckboxes = document.querySelectorAll('.deal-rating-checkbox:checked');
        const selectedDealRatings = Array.from(dealRatingCheckboxes).map(cb => cb.value);

        // Filter vehicles based on all criteria
        return SEARCH_DATA.vehicles.filter(vehicle => {
            // Check vehicle type filter
            const passesVehicleTypeFilter = selectedVehicleTypes.length === 0 ||
                                           selectedVehicleTypes.includes(vehicle.vehicleType);

            // Check deal rating filter
            const passesDealRatingFilter = selectedDealRatings.length === 0 ||
                                           selectedDealRatings.includes(vehicle.dealRating);

            // Return true only if vehicle passes ALL filters
            return passesVehicleTypeFilter &&
                   passesDealRatingFilter;
        });
    }

    /**
     * Filter the table based on all active filters
     */
    function filterTable() {
        // Re-render the table with filtered and grouped data
        renderSearchTable();
    }

    /**
     * Render the search chart (grouped bar chart showing total search and leads)
     * @param {Array} filteredVehicles - Optional array of filtered vehicles. If not provided, uses all vehicles.
     */
    function renderSearchChart(filteredVehicles) {
        const canvas = document.getElementById('search-chart');
        if (!canvas) {
            console.error('Canvas element with id "search-chart" not found');
            return;
        }

        const ctx = canvas.getContext('2d');

        // Destroy existing chart if it exists
        if (searchChart) {
            searchChart.destroy();
        }

        // Use filtered vehicles if provided, otherwise use all vehicles
        const vehiclesToUse = filteredVehicles || SEARCH_DATA.vehicles;

        // Calculate total search and leads across all vehicles
        let totalSearch = 0;
        let totalLeads = 0;

        vehiclesToUse.forEach(vehicle => {
            // Total search = VDP views (assuming search results led to VDP views)
            totalSearch += Math.round(vehicle.vdpViewsLast7Days || 0);
            totalLeads += Math.round(vehicle.leadsLast7Days || 0);
        });

        // Prepare data for chart - just two bars
        const labels = ['Total search', 'Leads'];
        const data = [totalSearch, totalLeads];
        const backgroundColors = ['#0763D3', '#10B981'];

        searchChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: backgroundColors,
                    borderWidth: 0,
                    barPercentage: 0.6,
                    categoryPercentage: 0.8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: false,
                layout: {
                    padding: {
                        bottom: 30
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
                        display: false
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
                            }
                        },
                        title: {
                            display: true,
                            text: 'Count',
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
                id: 'barLabels',
                afterDatasetsDraw: function(chart) {
                    const ctx = chart.ctx;
                    const dataset = chart.data.datasets[0];
                    const meta = chart.getDatasetMeta(0);

                    if (!meta.hidden) {
                        meta.data.forEach((bar, index) => {
                            const label = chart.data.labels[index];
                            const x = bar.x;
                            const y = chart.chartArea.bottom + 20;

                            ctx.fillStyle = '#0D1722';
                            ctx.font = '600 12px DM Sans, sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillText(label, x, y);
                        });
                    }
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
                                    const minHeightForInside = 25; // Minimum height needed to fit text inside

                                    const x = bar.x;
                                    let numberY;

                                    // If bar is too short, place text above the bar
                                    if (barHeight < minHeightForInside) {
                                        numberY = bar.y - 8;
                                        ctx.fillStyle = '#374151'; // Dark text for outside
                                    } else {
                                        // Place text inside the bar
                                        numberY = bar.y + 16;
                                        ctx.fillStyle = '#FFFFFF'; // White text for inside
                                    }

                                    ctx.textAlign = 'center';
                                    ctx.textBaseline = 'middle';

                                    // Draw the number
                                    ctx.font = '600 12px DM Sans, sans-serif';
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
     * Render the search table
     */
    function renderSearchTable() {
        const tableBody = document.getElementById('search-table-body');
        if (!tableBody) {
            console.error('Table body element not found');
            return;
        }

        // Clear existing rows
        tableBody.innerHTML = '';

        // Get selected grouping dimensions
        const groupByCheckboxes = document.querySelectorAll('.group-by-checkbox:checked');
        const selectedDimensions = Array.from(groupByCheckboxes).map(cb => {
            const value = cb.value.toLowerCase();
            // Map display names to data field names
            if (value === 'vehicle type') return 'vehicleType';
            if (value === 'deal rating') return 'dealRating';
            return value;
        });

        // Always start with 'make' as the first dimension, then add selected dimensions
        const dimensions = ['make', ...selectedDimensions];

        // Get filtered vehicles first
        const filteredVehicles = getFilteredVehicles();

        // Group vehicles using the utility function
        let groupedData = MARKET_SEARCH_UTILS.groupVehicles(dimensions, filteredVehicles);

        // Add conversion rate and opportunity score to each group for sorting
        groupedData = groupedData.map(group => {
            const totalSearch = group.totalVdpViews;
            const totalLeads = group.totalLeads;
            const conversionRate = totalSearch > 0 ? (totalLeads / totalSearch) : 0;
            const opportunityScore = group.count > 0 ? (totalSearch / group.count) : 0;
            return { ...group, conversionRate, opportunityScore };
        });

        // Sort based on current sort column and direction
        groupedData.sort((a, b) => {
            let aVal, bVal;

            switch(currentSortColumn) {
                case 'vehicle':
                    aVal = a.groupKey.toLowerCase();
                    bVal = b.groupKey.toLowerCase();
                    break;
                case 'count':
                    aVal = a.count;
                    bVal = b.count;
                    break;
                case 'totalSearch':
                    aVal = a.totalVdpViews;
                    bVal = b.totalVdpViews;
                    break;
                case 'totalLeads':
                    aVal = a.totalLeads;
                    bVal = b.totalLeads;
                    break;
                case 'conversion':
                    aVal = a.conversionRate;
                    bVal = b.conversionRate;
                    break;
                case 'opportunityScore':
                    aVal = a.opportunityScore;
                    bVal = b.opportunityScore;
                    break;
                default:
                    aVal = a.conversionRate;
                    bVal = b.conversionRate;
            }

            if (currentSortDirection === 'asc') {
                return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
            } else {
                return aVal < bVal ? 1 : aVal > bVal ? -1 : 0;
            }
        });

        // Calculate market averages for conversion and opportunity score
        const totalConversionRate = groupedData.reduce((sum, g) => sum + g.conversionRate, 0);
        const totalOpportunityScore = groupedData.reduce((sum, g) => sum + g.opportunityScore, 0);
        const marketAvgConversion = groupedData.length > 0 ? totalConversionRate / groupedData.length : 0;
        const marketAvgOpportunity = groupedData.length > 0 ? totalOpportunityScore / groupedData.length : 0;

        // Render grouped rows
        groupedData.forEach((group, index) => {
            const totalSearch = group.totalVdpViews;
            const totalLeads = group.totalLeads;
            const conversionValue = totalSearch > 0 ? ((totalLeads / totalSearch) * 100) : 0;
            const conversion = conversionValue.toFixed(1);
            const opportunityScore = group.opportunityScore.toFixed(2);

            // Determine pill classes based on market average
            const conversionPillClass = conversionValue >= (marketAvgConversion * 100) ? 'pill pill-green' : 'pill pill-red';
            const opportunityPillClass = group.opportunityScore >= marketAvgOpportunity ? 'pill pill-green' : 'pill pill-red';

            // Get the make name from groupValues (always the first dimension)
            const makeName = group.groupValues.make || '';
            // Handle special case for Mercedes-Benz
            const logoFileName = makeName === 'Mercedes-Benz' ? 'Mercedes' : makeName;
            const logoPath = makeName ? `../img/Make logo/${logoFileName}.png` : '';

            const row = document.createElement('tr');
            row.style.fontSize = '12px';
            row.setAttribute('data-group-key', group.groupKey);

            row.innerHTML = `
                <td>
                    <div style="display: flex; align-items: center; gap: 12px;">
                        ${makeName ? `<img src="${logoPath}" alt="${makeName}" style="width: 53px; height: 40px; object-fit: contain; border: var(--border-light); border-radius: 4px;">` : ''}
                        <a href="#" onclick="return false;" style="font-weight: 500; color: #0D1722;">${group.groupKey}</a>
                    </div>
                </td>
                <td>${group.count} ${group.count === 1 ? 'vehicle' : 'vehicles'}</td>
                <td>${totalSearch.toLocaleString()}</td>
                <td>${totalLeads} ${totalLeads === 1 ? 'lead' : 'leads'}</td>
                <td><span class="${opportunityPillClass}">${opportunityScore}</span></td>
                <td><span class="${conversionPillClass}">${conversion}%</span></td>
                <td style="position: relative;">
                    <button class="menu-button" data-index="${index}" style="background: none; border: none; cursor: pointer; padding: 4px;">
                        <img src="../img/icon/menu.svg" alt="Menu" style="width: 20px; height: 20px;">
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

        // Update table header sort indicators
        updateSortIndicators();
    }

    /**
     * Update sort indicators in table headers
     */
    function updateSortIndicators() {
        const headers = document.querySelectorAll('.vehicle-table thead th');
        const columnNames = ['vehicle', 'count', 'totalSearch', 'totalLeads', 'opportunityScore', 'conversion'];

        headers.forEach((header, index) => {
            if (index === headers.length - 1) return; // Skip menu column

            const column = columnNames[index];

            // Special handling for columns with sub-text (count, totalSearch, totalLeads, conversion, opportunityScore)
            if (column === 'count' || column === 'totalSearch' || column === 'totalLeads' || column === 'conversion' || column === 'opportunityScore') {
                // For columns with tooltip, target the tooltip-trigger span
                let targetSpan;
                if (column === 'conversion' || column === 'opportunityScore') {
                    targetSpan = header.querySelector('.tooltip-trigger');
                } else {
                    targetSpan = header.querySelector('span:first-child');
                }

                if (targetSpan) {
                    let text = targetSpan.textContent.replace(' ↑', '').replace(' ↓', '');
                    if (column === currentSortColumn) {
                        text += currentSortDirection === 'asc' ? ' ↑' : ' ↓';
                    }
                    targetSpan.textContent = text;
                }
            } else {
                // Regular columns without sub-text
                let text = header.textContent.replace(' ↑', '').replace(' ↓', '');

                // Add arrow if this is the sorted column
                if (column === currentSortColumn) {
                    text += currentSortDirection === 'asc' ? ' ↑' : ' ↓';
                }

                header.textContent = text;
            }
        });
    }

    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        initializeSearchLeadsPage();
    });

})(); // End of IIFE - keeps all search leads page code isolated
