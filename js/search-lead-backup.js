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
    let currentSortColumn = 'conversion'; // Default sort by conversion
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
     * Render the scatter chart showing opportunity vs conversion
     */
    function renderScatterChart(groupedData, marketAvgConversion, marketAvgOpportunity) {
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
            const conversionPercent = (group.conversionRate * 100) || 0;
            const opportunityValue = group.opportunityScore || 0;

            // Calculate point radius based on vehicle count (2.5-7.5px range)
            const minRadius = 2.5;
            const maxRadius = 7.5;
            const maxCount = Math.max(...groupedData.map(g => g.count));
            const radius = minRadius + ((group.count / maxCount) * (maxRadius - minRadius));

            // Add jitter to break up diagonal banding patterns (±8% random offset)
            const jitterAmount = 0.08;
            const xJitter = (Math.random() - 0.5) * 2 * jitterAmount * conversionPercent;
            const yJitter = (Math.random() - 0.5) * 2 * jitterAmount * opportunityValue;

            return {
                x: conversionPercent + xJitter,
                y: opportunityValue + yJitter,
                originalX: conversionPercent,
                originalY: opportunityValue,
                groupKey: group.groupKey,
                count: group.count,
                totalSearch: group.totalVdpViews,
                totalLeads: group.totalLeads,
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
                                    `Conversion: ${data.originalX.toFixed(1)}%`,
                                    `Search per vehicle: ${data.originalY.toFixed(2)}`,
                                    `Total vehicles: ${data.count}`,
                                    `Total searches: ${data.totalSearch.toLocaleString()}`,
                                    `Total leads: ${data.totalLeads}`
                                ];
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Conversion Rate (%)',
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
                                return value.toFixed(1) + '%';
                            }
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Search per Available Vehicle',
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
                                return value.toFixed(1);
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

                    // Draw vertical line for average conversion
                    const avgConversionX = xAxis.getPixelForValue(marketAvgConversion * 100);
                    ctx.save();
                    ctx.beginPath();
                    ctx.strokeStyle = '#9CA3AF';
                    ctx.lineWidth = 1;
                    ctx.setLineDash([5, 5]);
                    ctx.moveTo(avgConversionX, yAxis.top);
                    ctx.lineTo(avgConversionX, yAxis.bottom);
                    ctx.stroke();
                    ctx.restore();

                    // Draw horizontal line for average opportunity
                    const avgOpportunityY = yAxis.getPixelForValue(marketAvgOpportunity);
                    ctx.save();
                    ctx.beginPath();
                    ctx.strokeStyle = '#9CA3AF';
                    ctx.lineWidth = 1;
                    ctx.setLineDash([5, 5]);
                    ctx.moveTo(xAxis.left, avgOpportunityY);
                    ctx.lineTo(xAxis.right, avgOpportunityY);
                    ctx.stroke();
                    ctx.restore();
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
        if (typeof MARKET_SEARCH_UTILS === 'undefined') {
            console.error('MARKET_SEARCH_UTILS not found! Make sure filter-url-utils.js is loaded.');
            return;
        }

        let groupedData = MARKET_SEARCH_UTILS.groupVehicles(dimensions, filteredVehicles);

        // Add conversion rate and opportunity score to each group for sorting
        groupedData = groupedData.map(group => {
            const totalSearch = group.totalVdpViews || 0;
            const totalLeads = group.totalLeads || 0;
            const count = group.count || 1; // Avoid division by zero
            const conversionRate = totalSearch > 0 ? (totalLeads / totalSearch) : 0;
            const opportunityScore = count > 0 ? (totalSearch / count) : 0;
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

        // Render scatter chart
        renderScatterChart(groupedData, marketAvgConversion, marketAvgOpportunity);

        // Render grouped rows
        groupedData.forEach((group, index) => {
            const totalSearch = group.totalVdpViews || 0;
            const totalLeads = group.totalLeads || 0;
            const conversionValue = totalSearch > 0 ? ((totalLeads / totalSearch) * 100) : 0;
            const conversion = (conversionValue || 0).toFixed(1);
            const opportunityScore = (group.opportunityScore || 0).toFixed(2);

            // Determine pill classes based on market average
            const conversionPillClass = conversionValue >= (marketAvgConversion * 100) ? 'pill pill-green' : 'pill pill-red';
            const opportunityPillClass = (group.opportunityScore || 0) >= marketAvgOpportunity ? 'pill pill-green' : 'pill pill-red';

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
                <td>${group.count} ${group.count === 1 ? 'vehicle' : 'vehicles'}</td>
                <td>${totalSearch.toLocaleString()}</td>
                <td>${totalLeads} ${totalLeads === 1 ? 'lead' : 'leads'}</td>
                <td><span class="${opportunityPillClass}">${opportunityScore}</span></td>
                <td><span class="${conversionPillClass}">${conversion}%</span></td>
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

        // Set empty content for now
        content.innerHTML = '<p style="color: #6B7280;">Content coming soon...</p>';

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
        const columnNames = ['vehicle', 'count', 'totalSearch', 'totalLeads', 'opportunityScore', 'conversion'];

        headers.forEach((header, index) => {
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
