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

    // Sorting state
    let currentSortColumn = 'leadPerVehicle'; // Default sort by lead per vehicle
    let currentSortDirection = 'desc';

    // Flag to prevent multiple re-renders when toggling Group By checkboxes
    let isTogglingGroupBy = false;

    // Chart instance
    let scatterChart = null;

    // Search filter state
    let currentSearchTerm = '';
    let autocompleteOptions = [];
    let originalGroupByState = {}; // Track checkbox state before search autocomplete

    // Constants
    const MAX_AUTOCOMPLETE_RESULTS = 10;
    const MIN_BAR_HEIGHT_FOR_INSIDE_TEXT = 25;

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
     * Initialize global click handlers (added once to prevent memory leaks)
     */
    function initializeGlobalClickHandlers() {
        // Reserved for future global event handlers
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
        initializeSearchInput();
        initializeGroupByFilter();
        initializeChartFilter();
        initializeTrendingInfoFilter();
        initializeSameShoppersFilter();
        initializeMyInventoryFilter();
        initializeVehicleTypeFilter();
        initializeDealRatingFilter();
        initializeTableSorting();

        // Initialize global click handlers (once)
        initializeGlobalClickHandlers();

        // Initialize side panel
        initializeSidePanel();
    }

    /**
     * Initialize table header sorting
     */
    function initializeTableSorting() {
        const headers = document.querySelectorAll('.vehicle-table thead th');

        if (!headers.length) return;

        // Add click handlers to sortable columns
        headers.forEach((header, index) => {
            header.style.cursor = 'pointer';
            header.style.userSelect = 'none';

            // Add data attribute for column name
            const columnNames = ['vehicle', 'count', 'totalSearch', 'totalLeads', 'leadPerVehicle'];
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
     * Initialize the chart visibility filter
     */
    function initializeChartFilter() {
        const checkbox = document.getElementById('show-scatter-chart');
        const chartPanel = document.getElementById('scatter-chart-panel');

        if (!checkbox || !chartPanel) return;

        checkbox.addEventListener('change', function() {
            if (this.checked) {
                chartPanel.style.display = 'block';
            } else {
                chartPanel.style.display = 'none';
            }
        });
    }

    /**
     * Initialize the trending information visibility filter
     */
    function initializeTrendingInfoFilter() {
        const checkbox = document.getElementById('show-trending-info');

        if (!checkbox) return;

        checkbox.addEventListener('change', function() {
            // Re-render the table to show/hide trending information
            renderSearchTable();
        });
    }

    /**
     * Initialize the same shoppers filter
     */
    function initializeSameShoppersFilter() {
        const checkbox = document.getElementById('hide-same-shoppers');

        if (!checkbox) return;

        checkbox.addEventListener('change', function() {
            // Re-render the table to show/hide competing vehicles
            renderSearchTable();
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
            // Clear search input and term when switching inventories
            const searchInput = document.getElementById('vehicle-search');
            if (searchInput) {
                searchInput.value = '';
            }
            currentSearchTerm = '';
            originalGroupByState = {}; // Reset saved state

            // Hide autocomplete dropdown
            const autocompleteDropdown = document.getElementById('autocomplete-dropdown');
            if (autocompleteDropdown) {
                autocompleteDropdown.style.display = 'none';
            }

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

                // Rebuild autocomplete for market inventory
                buildAutocompleteOptions();
            }

            // Reset flag
            isTogglingGroupBy = false;

            // Re-render table with new data and grouping
            renderSearchTable();
        });
    }

    /**
     * Build autocomplete options from market inventory
     * Creates a unique list of makes, models, and trims
     */
    function buildAutocompleteOptions() {
        const options = new Set();

        // Use market inventory for autocomplete (not dealer inventory)
        MARKET_INVENTORY.forEach(vehicle => {
            // Add make
            if (vehicle.make) {
                options.add(vehicle.make);
            }
            // Add model (with make prefix for clarity)
            if (vehicle.make && vehicle.model) {
                options.add(`${vehicle.make} ${vehicle.model}`);
            }
            // Add trim (with make and model prefix)
            if (vehicle.make && vehicle.model && vehicle.trim) {
                options.add(`${vehicle.make} ${vehicle.model} ${vehicle.trim}`);
            }
        });

        autocompleteOptions = Array.from(options).sort();
    }

    /**
     * Initialize the search input with autocomplete
     */
    function initializeSearchInput() {
        const searchInput = document.getElementById('vehicle-search');
        const autocompleteDropdown = document.getElementById('autocomplete-dropdown');

        if (!searchInput || !autocompleteDropdown) return;

        // Build autocomplete options from data
        buildAutocompleteOptions();

        // Handle input typing
        searchInput.addEventListener('input', function() {
            const value = this.value.trim().toLowerCase();

            if (value.length === 0) {
                // Clear search and hide dropdown
                currentSearchTerm = '';
                autocompleteDropdown.style.display = 'none';

                // Restore original Group By checkbox state
                restoreGroupByCheckboxes();

                renderSearchTable();
                return;
            }

            // Filter autocomplete options
            const matches = autocompleteOptions.filter(option =>
                option.toLowerCase().includes(value)
            );

            if (matches.length > 0) {
                // Show autocomplete dropdown
                autocompleteDropdown.innerHTML = matches.slice(0, MAX_AUTOCOMPLETE_RESULTS).map(option => `
                    <div class="autocomplete-item" style="padding: 10px 16px; cursor: pointer; font-size: 14px; color: #0D1722; border-bottom: 1px solid #E5E7EB;" data-value="${option}">
                        ${highlightMatch(option, value)}
                    </div>
                `).join('');

                autocompleteDropdown.style.display = 'block';

                // Add click handlers to autocomplete items
                autocompleteDropdown.querySelectorAll('.autocomplete-item').forEach(item => {
                    item.addEventListener('mouseenter', function() {
                        this.style.backgroundColor = '#F3F4F6';
                    });
                    item.addEventListener('mouseleave', function() {
                        this.style.backgroundColor = 'white';
                    });
                    item.addEventListener('click', function() {
                        const selectedValue = this.getAttribute('data-value');
                        searchInput.value = selectedValue;
                        currentSearchTerm = selectedValue.toLowerCase();
                        autocompleteDropdown.style.display = 'none';

                        // Auto-check Group by checkboxes based on selection level
                        updateGroupByCheckboxes(selectedValue);

                        renderSearchTable();
                    });
                });
            } else {
                autocompleteDropdown.style.display = 'none';
            }

            // Update current search term and filter table
            currentSearchTerm = value;
            renderSearchTable();
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (e.target !== searchInput && !autocompleteDropdown.contains(e.target)) {
                autocompleteDropdown.style.display = 'none';
            }
        });

        // Handle Enter key
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                autocompleteDropdown.style.display = 'none';
            }
        });
    }

    /**
     * Highlight matching text in autocomplete suggestions
     */
    function highlightMatch(text, searchTerm) {
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        return text.replace(regex, '<strong>$1</strong>');
    }

    /**
     * Save current Group By checkbox state before autocomplete changes them
     */
    function saveGroupByCheckboxes() {
        const checkboxes = document.querySelectorAll('.group-by-checkbox');
        checkboxes.forEach(cb => {
            originalGroupByState[cb.value] = cb.checked;
        });
    }

    /**
     * Restore Group By checkboxes to their original state
     */
    function restoreGroupByCheckboxes() {
        if (Object.keys(originalGroupByState).length === 0) return;

        isTogglingGroupBy = true;
        const checkboxes = document.querySelectorAll('.group-by-checkbox');
        checkboxes.forEach(cb => {
            if (originalGroupByState.hasOwnProperty(cb.value)) {
                cb.checked = originalGroupByState[cb.value];
            }
        });
        isTogglingGroupBy = false;
    }

    /**
     * Update Group by checkboxes based on selected search value
     * @param {string} selectedValue - The selected autocomplete value
     */
    function updateGroupByCheckboxes(selectedValue) {
        // Save current state before making changes (first time only)
        if (Object.keys(originalGroupByState).length === 0) {
            saveGroupByCheckboxes();
        }
        // Set flag to prevent re-renders during checkbox updates
        isTogglingGroupBy = true;

        // Get all Group by checkboxes
        const modelCheckbox = document.querySelector('.group-by-checkbox[value="Model"]');
        const trimCheckbox = document.querySelector('.group-by-checkbox[value="Trim"]');

        // Split the selected value to determine level
        const parts = selectedValue.trim().split(' ');

        // Find a matching vehicle to determine if this is make, model, or trim level
        const matchingVehicle = MARKET_INVENTORY.find(v => {
            const fullName = `${v.make} ${v.model} ${v.trim}`.toLowerCase();
            const modelName = `${v.make} ${v.model}`.toLowerCase();
            const makeName = v.make.toLowerCase();
            const selectedLower = selectedValue.toLowerCase();

            return fullName === selectedLower || modelName === selectedLower || makeName === selectedLower;
        });

        if (matchingVehicle) {
            const selectedLower = selectedValue.toLowerCase();
            const makeName = matchingVehicle.make.toLowerCase();
            const modelName = `${matchingVehicle.make} ${matchingVehicle.model}`.toLowerCase();
            const trimName = `${matchingVehicle.make} ${matchingVehicle.model} ${matchingVehicle.trim}`.toLowerCase();

            if (selectedLower === trimName) {
                // Trim level: check both Model and Trim
                if (modelCheckbox) modelCheckbox.checked = true;
                if (trimCheckbox) trimCheckbox.checked = true;
            } else if (selectedLower === modelName) {
                // Model level: check only Model
                if (modelCheckbox) modelCheckbox.checked = true;
                if (trimCheckbox) trimCheckbox.checked = false;
            } else if (selectedLower === makeName) {
                // Make level: uncheck both
                if (modelCheckbox) modelCheckbox.checked = false;
                if (trimCheckbox) trimCheckbox.checked = false;
            }
        }

        // Reset flag
        isTogglingGroupBy = false;
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

            // Check search term filter
            let passesSearchFilter = true;
            if (currentSearchTerm) {
                const searchLower = currentSearchTerm.toLowerCase();
                const makeMatch = vehicle.make && vehicle.make.toLowerCase().includes(searchLower);
                const modelMatch = vehicle.model && vehicle.model.toLowerCase().includes(searchLower);
                const trimMatch = vehicle.trim && vehicle.trim.toLowerCase().includes(searchLower);
                const combinedMatch = `${vehicle.make} ${vehicle.model} ${vehicle.trim}`.toLowerCase().includes(searchLower);

                passesSearchFilter = makeMatch || modelMatch || trimMatch || combinedMatch;
            }

            // Return true only if vehicle passes ALL filters
            return passesVehicleTypeFilter &&
                   passesDealRatingFilter &&
                   passesSearchFilter;
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
     * Render the scatter chart showing available vehicles vs leads generated
     */
    function renderScatterChart(groupedData, marketAvgLeads, marketAvgCount) {
        const canvas = document.getElementById('opportunity-scatter-chart');
        if (!canvas) {
            console.error('Canvas element with id "opportunity-scatter-chart" not found');
            return;
        }

        const ctx = canvas.getContext('2d');

        // Destroy existing chart if it exists
        if (scatterChart) {
            scatterChart.destroy();
        }

        // Prepare data points for scatter chart
        const dataPoints = groupedData.map(group => {
            const leadsGenerated = group.totalLeads || 0;
            const availableVehicles = group.count || 0;

            // Calculate point radius based on total search volume (2.5-7.5px range)
            const minRadius = 2.5;
            const maxRadius = 7.5;
            const maxSearch = Math.max(...groupedData.map(g => g.totalVdpViews || 0));
            const radius = minRadius + (((group.totalVdpViews || 0) / maxSearch) * (maxRadius - minRadius));

            // Add jitter to break up overlapping points (±3% random offset)
            const jitterAmount = 0.03;
            const xJitter = (Math.random() - 0.5) * 2 * jitterAmount * leadsGenerated;
            const yJitter = (Math.random() - 0.5) * 2 * jitterAmount * availableVehicles;

            return {
                x: leadsGenerated + xJitter,
                y: availableVehicles + yJitter,
                originalX: leadsGenerated,
                originalY: availableVehicles,
                groupKey: group.groupKey,
                count: group.count,
                totalSearch: group.totalVdpViews,
                totalLeads: group.totalLeads,
                leadPerVehicle: group.leadPerVehicle,
                radius: radius
            };
        });

        // Create scatter chart
        scatterChart = new Chart(ctx, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: 'Market Groups',
                    data: dataPoints,
                    backgroundColor: '#0763D3',
                    borderColor: '#0763D3',
                    pointRadius: dataPoints.map(p => p.radius),
                    pointHoverRadius: dataPoints.map(p => p.radius + 2)
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
                        callbacks: {
                            title: function(context) {
                                return context[0].raw.groupKey;
                            },
                            label: function(context) {
                                const data = context.raw;
                                return [
                                    `Available vehicles: ${data.originalY}`,
                                    `Leads generated: ${data.originalX}`,
                                    `Lead per vehicle: ${(data.leadPerVehicle || 0).toFixed(2)}`,
                                    `Total search: ${data.totalSearch.toLocaleString()}`
                                ];
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Leads Generated',
                            color: '#0D1722',
                            font: {
                                size: 13,
                                weight: '600'
                            }
                        },
                        grid: {
                            color: '#E5E7EB'
                        },
                        ticks: {
                            color: '#6B7280',
                            callback: function(value) {
                                return Math.round(value);
                            }
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Available Vehicles',
                            color: '#0D1722',
                            font: {
                                size: 13,
                                weight: '600'
                            }
                        },
                        grid: {
                            color: '#E5E7EB'
                        },
                        ticks: {
                            color: '#6B7280',
                            callback: function(value) {
                                return Math.round(value);
                            }
                        }
                    }
                },
                onClick: function(event, elements) {
                    if (elements.length > 0) {
                        const dataIndex = elements[0].index;
                        const groupKey = dataPoints[dataIndex].groupKey;

                        // Find and highlight the corresponding row in the table
                        const rows = document.querySelectorAll('.vehicle-table tbody tr');
                        rows.forEach(row => {
                            // Remove previous highlight
                            row.style.backgroundColor = '';

                            // Check if this row matches
                            if (row.getAttribute('data-group-key') === groupKey) {
                                row.style.backgroundColor = '#EFF6FF';
                                row.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            }
                        });
                    }
                }
            },
            plugins: [{
                // Add reference lines for market averages
                id: 'referenceLines',
                afterDraw: function(chart) {
                    const ctx = chart.ctx;
                    const xAxis = chart.scales.x;
                    const yAxis = chart.scales.y;

                    // Draw vertical line for average leads generated
                    const avgLeadsX = xAxis.getPixelForValue(marketAvgLeads);
                    ctx.save();
                    ctx.beginPath();
                    ctx.strokeStyle = '#9CA3AF';
                    ctx.lineWidth = 1;
                    ctx.setLineDash([5, 5]);
                    ctx.moveTo(avgLeadsX, yAxis.top);
                    ctx.lineTo(avgLeadsX, yAxis.bottom);
                    ctx.stroke();
                    ctx.restore();

                    // Draw horizontal line for average vehicle count
                    const avgCountY = yAxis.getPixelForValue(marketAvgCount);
                    ctx.save();
                    ctx.beginPath();
                    ctx.strokeStyle = '#9CA3AF';
                    ctx.lineWidth = 1;
                    ctx.setLineDash([5, 5]);
                    ctx.moveTo(xAxis.left, avgCountY);
                    ctx.lineTo(xAxis.right, avgCountY);
                    ctx.stroke();
                    ctx.restore();
                }
            }]
        });
    }

    /**
     * Calculate trend text with arrow
     * @param {number} current - Current period value
     * @param {number} previous - Previous period value
     * @param {boolean} isPercentage - Whether to show as percentage
     * @returns {string} HTML string with trend
     */
    function calculateTrend(current, previous, isPercentage = true) {
        // Check if trending information should be displayed
        const showTrendingInfo = document.getElementById('show-trending-info');
        if (!showTrendingInfo || !showTrendingInfo.checked) {
            return '';
        }

        const diff = current - previous;
        const percentChange = (diff / previous) * 100;

        let arrow = '↑';
        if (diff < 0) arrow = '↓';

        const displayValue = isPercentage
            ? `${Math.abs(percentChange).toFixed(1)}%`
            : `${Math.abs(diff)}`;

        return `<div style="font-size: 12px; color: #5E6976; margin-top: 4px;">${arrow} ${displayValue}</div>`;
    }

    /**
     * Calculate distribution label based on variance of leads across vehicles
     * @param {Array} vehicles - Array of vehicles in the group
     * @returns {string} Distribution label
     */
    function calculateDistributionLabel(vehicles) {
        // Check if trending information should be displayed
        const showTrendingInfo = document.getElementById('show-trending-info');
        if (!showTrendingInfo || !showTrendingInfo.checked) {
            return '';
        }

        if (!vehicles || vehicles.length <= 1) {
            return 'Single vehicle';
        }

        // Calculate leads per vehicle for each vehicle
        const leadsPerVehicle = vehicles.map(v => v.leadsLast7Days || 0);

        // Calculate mean
        const mean = leadsPerVehicle.reduce((sum, val) => sum + val, 0) / leadsPerVehicle.length;

        if (mean === 0) {
            return 'No leads';
        }

        // Calculate standard deviation
        const squaredDiffs = leadsPerVehicle.map(val => Math.pow(val - mean, 2));
        const variance = squaredDiffs.reduce((sum, val) => sum + val, 0) / leadsPerVehicle.length;
        const stdDev = Math.sqrt(variance);

        // Calculate coefficient of variation (CV)
        const cv = stdDev / mean;

        // Determine distribution label based on CV thresholds
        if (cv < 0.3) {
            return 'Evenly distributed';
        } else if (cv < 0.7) {
            return 'Slight variation';
        } else {
            return 'Winners and losers';
        }
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
        if (typeof MARKET_SEARCH_UTILS === 'undefined') {
            console.error('MARKET_SEARCH_UTILS not found! Make sure filter-url-utils.js is loaded.');
            return;
        }

        let groupedData = MARKET_SEARCH_UTILS.groupVehicles(dimensions, filteredVehicles);

        // Add lead per vehicle and synthetic previous period data to each group
        groupedData = groupedData.map(group => {
            const totalLeads = group.totalLeads || 0;
            const count = group.count || 1; // Avoid division by zero
            const leadPerVehicle = count > 0 ? (totalLeads / count) : 0;

            // Generate synthetic previous period data with realistic variance (-15% to +15%)
            const varianceMin = 0.85;
            const varianceMax = 1.15;
            const countVariance = varianceMin + Math.random() * (varianceMax - varianceMin);
            const searchVariance = varianceMin + Math.random() * (varianceMax - varianceMin);
            const leadsVariance = varianceMin + Math.random() * (varianceMax - varianceMin);

            const countPrevious = Math.max(1, Math.round(count * countVariance));
            const totalVdpViewsPrevious = Math.max(1, Math.round((group.totalVdpViews || 0) * searchVariance));
            const totalLeadsPrevious = Math.max(0, Math.round(totalLeads * leadsVariance));

            return {
                ...group,
                leadPerVehicle,
                countPrevious,
                totalVdpViewsPrevious,
                totalLeadsPrevious
            };
        });

        // Filter out competing vehicles if the checkbox is checked
        const hideSameShoppersCheckbox = document.getElementById('hide-same-shoppers');
        if (hideSameShoppersCheckbox && hideSameShoppersCheckbox.checked) {
            // Simulate hiding ~40% of vehicles that would target the same shoppers
            // Use a deterministic random based on group key so the same groups are always hidden
            groupedData = groupedData.filter(group => {
                // Create a simple hash from the group key for consistent "random" selection
                let hash = 0;
                for (let i = 0; i < group.groupKey.length; i++) {
                    hash = ((hash << 5) - hash) + group.groupKey.charCodeAt(i);
                    hash = hash & hash; // Convert to 32-bit integer
                }
                // Keep approximately 60% of groups (hide 40%)
                return Math.abs(hash) % 100 >= 40;
            });
        }

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
                case 'leadPerVehicle':
                    aVal = a.leadPerVehicle;
                    bVal = b.leadPerVehicle;
                    break;
                default:
                    aVal = a.leadPerVehicle;
                    bVal = b.leadPerVehicle;
            }

            if (currentSortDirection === 'asc') {
                return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
            } else {
                return aVal < bVal ? 1 : aVal > bVal ? -1 : 0;
            }
        });

        // Calculate market averages
        const totalLeadPerVehicle = groupedData.reduce((sum, g) => sum + g.leadPerVehicle, 0);
        const marketAvgLeadPerVehicle = groupedData.length > 0 ? totalLeadPerVehicle / groupedData.length : 0;

        const totalLeads = groupedData.reduce((sum, g) => g.totalLeads + sum, 0);
        const marketAvgLeads = groupedData.length > 0 ? totalLeads / groupedData.length : 0;

        const totalCount = groupedData.reduce((sum, g) => g.count + sum, 0);
        const marketAvgCount = groupedData.length > 0 ? totalCount / groupedData.length : 0;

        // Render scatter chart
        renderScatterChart(groupedData, marketAvgLeads, marketAvgCount);

        // Render grouped rows
        groupedData.forEach((group, index) => {
            const totalSearch = group.totalVdpViews || 0;
            const totalLeads = group.totalLeads || 0;
            const leadPerVehicle = (group.leadPerVehicle || 0).toFixed(2);

            const countPrevious = group.countPrevious || 0;
            const totalSearchPrevious = group.totalVdpViewsPrevious || 0;
            const totalLeadsPrevious = group.totalLeadsPrevious || 0;

            // Calculate trends
            const countTrend = calculateTrend(group.count, countPrevious, true);
            const searchTrend = calculateTrend(totalSearch, totalSearchPrevious, true);
            const leadsTrend = calculateTrend(totalLeads, totalLeadsPrevious, true);

            // Calculate distribution label for lead per vehicle
            const distributionLabel = calculateDistributionLabel(group.vehicles);

            // Determine pill classes based on market average
            const leadPerVehiclePillClass = (group.leadPerVehicle || 0) >= marketAvgLeadPerVehicle ? 'pill pill-green' : 'pill pill-red';

            // Get the make name from groupValues (always the first dimension)
            const makeName = group.groupValues.make || '';
            // Handle special case for Mercedes-Benz - only use makeName if it's not empty
            const logoFileName = makeName === 'Mercedes-Benz' ? 'Mercedes' : (makeName || '');
            const logoPath = logoFileName ? `../img/Make logo/${logoFileName}.png` : '';

            // Build two lines: primary (make, model, year, trim) and secondary (price, mileage, deal rating, vehicle type)
            const primaryParts = [];
            const secondaryParts = [];

            if (group.groupValues.make) primaryParts.push(group.groupValues.make);
            if (group.groupValues.model) primaryParts.push(group.groupValues.model);
            if (group.groupValues.year) primaryParts.push(group.groupValues.year);
            if (group.groupValues.trim) primaryParts.push(group.groupValues.trim);

            if (group.groupValues.price) secondaryParts.push(group.groupValues.price);
            if (group.groupValues.mileage) secondaryParts.push(group.groupValues.mileage);
            if (group.groupValues.dealRating) secondaryParts.push(group.groupValues.dealRating);
            if (group.groupValues.vehicleType) secondaryParts.push(group.groupValues.vehicleType);

            const primaryText = primaryParts.join(' ');
            const secondaryText = secondaryParts.join(' • ');

            const row = document.createElement('tr');
            row.style.fontSize = '12px';
            row.setAttribute('data-group-key', group.groupKey);

            row.innerHTML = `
                <td>
                    <div style="display: flex; align-items: center; gap: 12px;">
                        ${makeName ? `<img src="${logoPath}" alt="${makeName}" style="width: 53px; height: 40px; object-fit: contain; border: var(--border-light); border-radius: 4px;">` : ''}
                        <div style="display: flex; flex-direction: column; gap: 4px;">
                            <a href="#" onclick="return false;" style="font-weight: 600; color: #0D1722; text-decoration: none;">${primaryText}</a>
                            ${secondaryText ? `<span style="font-size: 12px; color: #5E6976;">${secondaryText}</span>` : ''}
                        </div>
                    </div>
                </td>
                <td>
                    <div>${group.count} ${group.count === 1 ? 'vehicle' : 'vehicles'}</div>
                    ${countTrend}
                </td>
                <td>
                    <div>${totalSearch.toLocaleString()}</div>
                    ${searchTrend}
                </td>
                <td>
                    <div>${totalLeads} ${totalLeads === 1 ? 'lead' : 'leads'}</div>
                    ${leadsTrend}
                </td>
                <td>
                    <div><span class="${leadPerVehiclePillClass}">${leadPerVehicle}</span></div>
                    <div style="font-size: 12px; color: #5E6976; margin-top: 4px;">${distributionLabel}</div>
                </td>
            `;
            tableBody.appendChild(row);

            // Add click event listener to open side panel
            row.addEventListener('click', function(e) {
                // Don't open panel if clicking on a link or button
                if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('button')) {
                    return;
                }
                openSidePanel(group);
            });
        });

        // Update table header sort indicators
        updateSortIndicators();
    }

    /**
     * Open the side panel with group data
     * @param {Object} group - The group data to display
     */
    function openSidePanel(group) {
        const panel = document.getElementById('side-panel');
        const overlay = document.getElementById('side-panel-overlay');
        const title = document.getElementById('side-panel-title');
        const content = document.getElementById('side-panel-content');

        if (!panel || !overlay) return;

        // Set the title
        title.textContent = group.groupKey || 'Details';

        // Build the vehicle table
        let tableHTML = `
            <table class="vehicle-table" style="width: 100%; font-size: 12px;">
                <thead>
                    <tr style="border-bottom: 1px solid #E5E7EB;">
                        <th style="text-align: left; padding: 12px 8px; font-weight: 600; color: #0D1722;">Vehicle</th>
                        <th style="text-align: left; padding: 12px 8px; font-weight: 600; color: #0D1722;">Price</th>
                        <th style="text-align: left; padding: 12px 8px; font-weight: 600; color: #0D1722;">Mileage</th>
                        <th style="text-align: left; padding: 12px 8px; font-weight: 600; color: #0D1722;">Days on Lot</th>
                        <th style="text-align: left; padding: 12px 8px; font-weight: 600; color: #0D1722;">VDP Views</th>
                        <th style="text-align: left; padding: 12px 8px; font-weight: 600; color: #0D1722;">Leads</th>
                    </tr>
                </thead>
                <tbody>
        `;

        // Add each vehicle as a row
        group.vehicles.forEach((vehicle, index) => {
            tableHTML += `
                <tr style="border-bottom: 1px solid #E5E7EB;">
                    <td style="padding: 12px 8px;">
                        <div style="font-weight: 500; color: #0D1722;">${vehicle.year} ${vehicle.make} ${vehicle.model}</div>
                        <div style="font-size: 11px; color: #6B7280; margin-top: 2px;">${vehicle.trim}</div>
                    </td>
                    <td style="padding: 12px 8px; color: #0D1722;">$${vehicle.price.toLocaleString()}</td>
                    <td style="padding: 12px 8px; color: #0D1722;">${vehicle.mileage.toLocaleString()} mi</td>
                    <td style="padding: 12px 8px; color: #0D1722;">${vehicle.daysOnLot} days</td>
                    <td style="padding: 12px 8px; color: #0D1722;">${vehicle.vdpViewsLast7Days || 0}</td>
                    <td style="padding: 12px 8px; color: #0D1722;">${vehicle.leadsLast7Days || 0}</td>
                </tr>
            `;
        });

        tableHTML += `
                </tbody>
            </table>
        `;

        content.innerHTML = tableHTML;

        // Show the panel with animation
        overlay.style.display = 'block';
        panel.style.display = 'flex';

        // Trigger animation after a small delay to ensure display is set
        setTimeout(() => {
            overlay.classList.add('active');
            panel.classList.add('active');
        }, 10);
    }

    /**
     * Close the side panel
     */
    function closeSidePanel() {
        const panel = document.getElementById('side-panel');
        const overlay = document.getElementById('side-panel-overlay');

        if (!panel || !overlay) return;

        // Remove active classes for animation
        overlay.classList.remove('active');
        panel.classList.remove('active');

        // Hide after animation completes
        setTimeout(() => {
            overlay.style.display = 'none';
            panel.style.display = 'none';
        }, 300); // Match the CSS transition duration
    }

    /**
     * Initialize side panel event listeners
     */
    function initializeSidePanel() {
        const closeButton = document.getElementById('side-panel-close');
        const overlay = document.getElementById('side-panel-overlay');

        if (closeButton) {
            closeButton.addEventListener('click', closeSidePanel);
        }

        if (overlay) {
            overlay.addEventListener('click', closeSidePanel);
        }

        // Close panel on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeSidePanel();
            }
        });
    }

    /**
     * Update sort indicators in table headers
     */
    function updateSortIndicators() {
        const headers = document.querySelectorAll('.vehicle-table thead th');
        const columnNames = ['vehicle', 'count', 'totalSearch', 'totalLeads', 'leadPerVehicle'];

        headers.forEach((header, index) => {
            const column = columnNames[index];

            // Special handling for columns with sub-text (count, totalSearch, totalLeads, leadPerVehicle)
            if (column === 'count' || column === 'totalSearch' || column === 'totalLeads' || column === 'leadPerVehicle') {
                // For columns with tooltip, target the tooltip-trigger span
                let targetSpan;
                if (column === 'leadPerVehicle') {
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
