/**
 * Conversion Page JavaScript
 * Handles the conversion funnel chart and vehicle table
 *
 * ISOLATION NOTES:
 * - All code is wrapped in IIFE to prevent conflicts with other pages
 * - No global variables are exposed except what's needed for URL parameter reading
 * - All functions and data are scoped within this module
 * - filter-url-utils.js is loaded separately and can be accessed if needed
 * - This ensures no bugs are introduced to other pages
 */

(function() {
    'use strict';

    // Inventory data will be loaded from data/conversion-inventory.js
    // Market average data will be loaded from data/conversion-market-average.js
    let CONVERSION_DATA = {
        funnel: {
            searchViews: 0,
            detailViews: 0,
            leads: 0
        },
        marketAverage: null, // Will be calculated from external data
        vehicles: []
    };

    let conversionChart = null;
    let marketAverageChart = null;

    /**
     * Load inventory data from global CONVERSION_INVENTORY variable
     * (loaded via data/conversion-inventory.js script tag)
     */
    function loadInventoryData() {
        if (typeof CONVERSION_INVENTORY !== 'undefined' && CONVERSION_INVENTORY.vehicles) {
            CONVERSION_DATA.vehicles = CONVERSION_INVENTORY.vehicles;

            // Calculate funnel totals from vehicle data
            CONVERSION_DATA.funnel.searchViews = CONVERSION_INVENTORY.vehicles.reduce((sum, v) => sum + v.searchViews, 0);
            CONVERSION_DATA.funnel.detailViews = CONVERSION_INVENTORY.vehicles.reduce((sum, v) => sum + v.detailViews, 0);
            CONVERSION_DATA.funnel.leads = CONVERSION_INVENTORY.vehicles.reduce((sum, v) => sum + v.leads, 0);

            console.log('Loaded inventory data:', CONVERSION_DATA.vehicles.length, 'vehicles');
        } else {
            console.error('CONVERSION_INVENTORY not found! Make sure data/conversion-inventory.js is loaded.');
            CONVERSION_DATA.vehicles = [];
        }
    }

    /**
     * Load and calculate market average data from global CONVERSION_MARKET_AVERAGE variable
     * (loaded via data/conversion-market-average.js script tag)
     */
    function loadMarketAverageData() {
        if (typeof CONVERSION_MARKET_AVERAGE !== 'undefined') {
            // Calculate initial market average with all filters
            CONVERSION_DATA.marketAverage = calculateMarketAverage();
            console.log('Loaded market average data');
        } else {
            console.error('CONVERSION_MARKET_AVERAGE not found! Using fallback values.');
            // Fallback to hardcoded values if data file fails to load
            CONVERSION_DATA.marketAverage = {
                searchViews: 18200,
                detailViews: 5100,
                leads: 310,
                vehicleCount: 1209
            };
        }
    }

    /**
     * Calculate market average based on current filter selections
     * Uses segment-based data with multipliers
     * @returns {Object} Market average data {searchViews, detailViews, leads, vehicleCount}
     */
    function calculateMarketAverage() {
        if (typeof CONVERSION_MARKET_AVERAGE === 'undefined') {
            return {
                searchViews: 18200,
                detailViews: 5100,
                leads: 310,
                vehicleCount: 1209
            };
        }

        // Get selected vehicle types
        const vehicleTypeCheckboxes = document.querySelectorAll('.vehicle-type-checkbox:checked');
        const selectedVehicleTypes = Array.from(vehicleTypeCheckboxes).map(cb => cb.value);

        // Get selected deal ratings
        const dealRatingCheckboxes = document.querySelectorAll('.deal-rating-checkbox:checked');
        const selectedDealRatings = Array.from(dealRatingCheckboxes).map(cb => cb.value);

        // Get selected brand
        const brandSelect = document.getElementById('brand');
        const selectedBrand = brandSelect ? brandSelect.value : 'All';

        // Step 1: Calculate vehicle type component
        let result = { searchViews: 0, detailViews: 0, leads: 0, vehicleCount: 0 };

        if (selectedVehicleTypes.length === 0 || selectedVehicleTypes.length === 5) {
            // All types selected or none -> use baseline
            result = { ...CONVERSION_MARKET_AVERAGE.baseline };
        } else {
            // Sum the selected vehicle type segments
            selectedVehicleTypes.forEach(type => {
                const typeData = CONVERSION_MARKET_AVERAGE.byVehicleType[type];
                if (typeData) {
                    result.searchViews += typeData.searchViews;
                    result.detailViews += typeData.detailViews;
                    result.leads += typeData.leads;
                    result.vehicleCount += typeData.vehicleCount;
                }
            });
        }

        // Step 2: Calculate deal rating multiplier (weighted average)
        let dealRatingMultiplier = 1.0;
        if (selectedDealRatings.length > 0 && selectedDealRatings.length < 5) {
            let totalWeight = 0;
            let weightedMultiplier = 0;

            selectedDealRatings.forEach(rating => {
                const ratingData = CONVERSION_MARKET_AVERAGE.byDealRating[rating];
                if (ratingData) {
                    const weight = ratingData.vehicleCount;
                    totalWeight += weight;
                    weightedMultiplier += ratingData.multiplier * weight;
                }
            });

            if (totalWeight > 0) {
                dealRatingMultiplier = weightedMultiplier / totalWeight;
            }
        }

        // Step 3: Get brand multiplier
        const brandData = CONVERSION_MARKET_AVERAGE.byBrand[selectedBrand];
        const brandMultiplier = brandData ? brandData.multiplier : 1.0;

        // Step 4: Apply multipliers to conversion metrics (detailViews and leads)
        const combinedMultiplier = dealRatingMultiplier * brandMultiplier;

        return {
            searchViews: Math.round(result.searchViews),
            detailViews: Math.round(result.detailViews * combinedMultiplier),
            leads: Math.round(result.leads * combinedMultiplier),
            vehicleCount: result.vehicleCount
        };
    }

    /**
     * Update the market average chart with filtered data
     * Called when filters change and market average is visible
     */
    function updateMarketAverageChart() {
        const wrapper = document.getElementById('market-average-chart-wrapper');
        const checkbox = document.getElementById('show-market-average');

        // Only update if market average is currently shown
        if (!wrapper || !checkbox || !checkbox.checked) {
            return;
        }

        // Get market average for current filters
        const marketData = calculateMarketAverage();

        // Update CONVERSION_DATA with new market average
        CONVERSION_DATA.marketAverage = marketData;

        // Update the subtitle with vehicle count
        updateMarketAverageSubtitle(marketData.vehicleCount);

        // Re-render the chart
        renderMarketAverageChart();
    }

    /**
     * Update the market average subtitle with vehicle count
     * @param {number} vehicleCount - Number of similar vehicles
     */
    function updateMarketAverageSubtitle(vehicleCount) {
        const wrapper = document.getElementById('market-average-chart-wrapper');
        if (!wrapper) return;

        // Find the subtitle element (div with font-size: 12px inside the wrapper)
        const subtitle = wrapper.querySelector('div[style*="font-size: 12px"]');
        if (subtitle) {
            subtitle.textContent = `Based on ${vehicleCount.toLocaleString()} similar vehicles`;
        }
    }

    /**
     * Initialize the conversion page
     */
    function initializeConversionPage() {
        console.log('Initializing conversion page...');

        // Load data first
        loadInventoryData();
        loadMarketAverageData();

        // Now render everything with the loaded data
        renderConversionChart();
        renderConversionTable();

        // Update the inventory title with initial count
        updateInventoryTitle(CONVERSION_DATA.vehicles.length);

        // Initialize all filters
        initializeVehicleTypeFilter();
        initializeDealRatingFilter();
        initializeBrandFilter();
        initializeConversionRateFilter();
        initializeDaysOnLotFilter();
        initializeTotalLeadsFilter();
        initializeMileageFilter();

        initializeMarketAverageToggle();
    }

/**
 * Initialize the market average toggle
 */
function initializeMarketAverageToggle() {
    const checkbox = document.getElementById('show-market-average');
    const wrapper = document.getElementById('market-average-chart-wrapper');

    if (!checkbox || !wrapper) return;

    checkbox.addEventListener('change', function() {
        if (this.checked) {
            wrapper.style.display = 'block';

            // Calculate market average for current filters before rendering
            const marketData = calculateMarketAverage();
            CONVERSION_DATA.marketAverage = marketData;
            updateMarketAverageSubtitle(marketData.vehicleCount);

            // Always re-render with current filter data
            renderMarketAverageChart();
        } else {
            wrapper.style.display = 'none';
        }
    });
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
 * Initialize accordion for Days on lot filter
 */
function initializeDaysOnLotAccordion() {
    const accordionHeader = document.getElementById('days-on-lot-accordion');
    const accordionContent = document.getElementById('days-on-lot-content');
    const accordionIcon = accordionHeader?.querySelector('.accordion-icon');

    if (!accordionHeader || !accordionContent || !accordionIcon) return;

    accordionHeader.addEventListener('click', function() {
        const isExpanded = accordionContent.classList.contains('expanded');

        if (isExpanded) {
            accordionContent.classList.remove('expanded');
            accordionIcon.classList.remove('expanded');
        } else {
            accordionContent.classList.add('expanded');
            accordionIcon.classList.add('expanded');
        }
    });
}

/**
 * Initialize the days on lot filter
 */
function initializeDaysOnLotFilter() {
    const minInput = document.getElementById('days-min-input');
    const maxInput = document.getElementById('days-max-input');
    const resetLink = document.getElementById('reset-days-on-lot');

    if (!minInput || !maxInput || !resetLink) return;

    // Initialize accordion
    initializeDaysOnLotAccordion();

    // Update filter when min input changes
    minInput.addEventListener('change', function() {
        let minVal = parseInt(this.value) || 0;
        let maxVal = parseInt(maxInput.value) || 365;

        if (minVal > maxVal) {
            minVal = maxVal;
            this.value = minVal;
        }

        if (minVal < 0) {
            minVal = 0;
            this.value = 0;
        }

        filterTable();
    });

    // Update filter when max input changes
    maxInput.addEventListener('change', function() {
        let minVal = parseInt(minInput.value) || 0;
        let maxVal = parseInt(this.value) || 365;

        if (maxVal < minVal) {
            maxVal = minVal;
            this.value = maxVal;
        }

        filterTable();
    });

    // Reset to default values
    resetLink.addEventListener('click', function(e) {
        e.preventDefault();
        minInput.value = 0;
        maxInput.value = 365;
        filterTable();
    });
}

/**
 * Initialize accordion for Total leads filter
 */
function initializeTotalLeadsAccordion() {
    const accordionHeader = document.getElementById('total-leads-accordion');
    const accordionContent = document.getElementById('total-leads-content');
    const accordionIcon = accordionHeader?.querySelector('.accordion-icon');

    if (!accordionHeader || !accordionContent || !accordionIcon) return;

    accordionHeader.addEventListener('click', function() {
        const isExpanded = accordionContent.classList.contains('expanded');

        if (isExpanded) {
            accordionContent.classList.remove('expanded');
            accordionIcon.classList.remove('expanded');
        } else {
            accordionContent.classList.add('expanded');
            accordionIcon.classList.add('expanded');
        }
    });
}

/**
 * Initialize the total leads filter
 */
function initializeTotalLeadsFilter() {
    const minInput = document.getElementById('leads-min-input');
    const maxInput = document.getElementById('leads-max-input');
    const resetLink = document.getElementById('reset-total-leads');

    if (!minInput || !maxInput || !resetLink) return;

    // Initialize accordion
    initializeTotalLeadsAccordion();

    // Update filter when min input changes
    minInput.addEventListener('change', function() {
        let minVal = parseInt(this.value) || 0;
        let maxVal = parseInt(maxInput.value) || 100;

        if (minVal > maxVal) {
            minVal = maxVal;
            this.value = minVal;
        }

        if (minVal < 0) {
            minVal = 0;
            this.value = 0;
        }

        filterTable();
    });

    // Update filter when max input changes
    maxInput.addEventListener('change', function() {
        let minVal = parseInt(minInput.value) || 0;
        let maxVal = parseInt(this.value) || 100;

        if (maxVal < minVal) {
            maxVal = minVal;
            this.value = maxVal;
        }

        filterTable();
    });

    // Reset to default values
    resetLink.addEventListener('click', function(e) {
        e.preventDefault();
        minInput.value = 0;
        maxInput.value = 100;
        filterTable();
    });
}

/**
 * Initialize accordion for Mileage filter
 */
function initializeMileageAccordion() {
    const accordionHeader = document.getElementById('mileage-accordion');
    const accordionContent = document.getElementById('mileage-content');
    const accordionIcon = accordionHeader?.querySelector('.accordion-icon');

    if (!accordionHeader || !accordionContent || !accordionIcon) return;

    accordionHeader.addEventListener('click', function() {
        const isExpanded = accordionContent.classList.contains('expanded');

        if (isExpanded) {
            accordionContent.classList.remove('expanded');
            accordionIcon.classList.remove('expanded');
        } else {
            accordionContent.classList.add('expanded');
            accordionIcon.classList.add('expanded');
        }
    });
}

/**
 * Initialize the mileage filter
 */
function initializeMileageFilter() {
    const minInput = document.getElementById('mileage-min-input');
    const maxInput = document.getElementById('mileage-max-input');
    const resetLink = document.getElementById('reset-mileage');

    if (!minInput || !maxInput || !resetLink) return;

    // Initialize accordion
    initializeMileageAccordion();

    // Update filter when min input changes
    minInput.addEventListener('change', function() {
        let minVal = parseInt(this.value) || 0;
        let maxVal = parseInt(maxInput.value) || 200000;

        if (minVal > maxVal) {
            minVal = maxVal;
            this.value = minVal;
        }

        if (minVal < 0) {
            minVal = 0;
            this.value = 0;
        }

        filterTable();
    });

    // Update filter when max input changes
    maxInput.addEventListener('change', function() {
        let minVal = parseInt(minInput.value) || 0;
        let maxVal = parseInt(this.value) || 200000;

        if (maxVal < minVal) {
            maxVal = minVal;
            this.value = maxVal;
        }

        filterTable();
    });

    // Reset to default values
    resetLink.addEventListener('click', function(e) {
        e.preventDefault();
        minInput.value = 0;
        maxInput.value = 200000;
        filterTable();
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
 * Initialize the brand filter
 */
function initializeBrandFilter() {
    const brandSelect = document.getElementById('brand');

    if (!brandSelect) return;

    brandSelect.addEventListener('change', function() {
        filterTable();
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

    // Get brand filter value
    const brandSelect = document.getElementById('brand');
    const selectedBrand = brandSelect ? brandSelect.value : 'All';

    // Get conversion rate filter values
    const conversionMin = parseInt(document.getElementById('conversion-min-input').value) || 0;
    const conversionMax = parseInt(document.getElementById('conversion-max-input').value) || 100;

    // Get days on lot filter values
    const daysMin = parseInt(document.getElementById('days-min-input').value) || 0;
    const daysMax = parseInt(document.getElementById('days-max-input').value) || 365;

    // Get total leads filter values
    const leadsMin = parseInt(document.getElementById('leads-min-input').value) || 0;
    const leadsMax = parseInt(document.getElementById('leads-max-input').value) || 100;

    // Get mileage filter values
    const mileageMin = parseInt(document.getElementById('mileage-min-input').value) || 0;
    const mileageMax = parseInt(document.getElementById('mileage-max-input').value) || 200000;

    // Filter vehicles based on all criteria
    return CONVERSION_DATA.vehicles.filter(vehicle => {
        // Calculate conversion rate
        const conversionRate = (vehicle.leads / vehicle.searchViews) * 100;

        // Check vehicle type filter
        const passesVehicleTypeFilter = selectedVehicleTypes.length === 0 ||
                                       selectedVehicleTypes.includes(vehicle.vehicleType);

        // Check deal rating filter
        const passesDealRatingFilter = selectedDealRatings.length === 0 ||
                                       selectedDealRatings.includes(vehicle.dealRating);

        // Check brand filter
        const passesBrandFilter = selectedBrand === 'All' || vehicle.make === selectedBrand;

        // Check numeric range filters
        const passesConversionFilter = conversionRate >= conversionMin && conversionRate <= conversionMax;
        const passesDaysFilter = vehicle.daysOnLot >= daysMin && vehicle.daysOnLot <= daysMax;
        const passesLeadsFilter = vehicle.leads >= leadsMin && vehicle.leads <= leadsMax;
        const passesMileageFilter = vehicle.mileage >= mileageMin && vehicle.mileage <= mileageMax;

        // Return true only if vehicle passes ALL filters
        return passesVehicleTypeFilter &&
               passesDealRatingFilter &&
               passesBrandFilter &&
               passesConversionFilter &&
               passesDaysFilter &&
               passesLeadsFilter &&
               passesMileageFilter;
    });
}

/**
 * Update the "My selected inventory" subtitle with vehicle count
 */
function updateInventoryTitle(vehicleCount) {
    const subtitle = document.getElementById('my-inventory-subtitle');
    if (subtitle) {
        subtitle.textContent = `Total: ${vehicleCount} ${vehicleCount === 1 ? 'vehicle' : 'vehicles'}`;
    }
}

/**
 * Filter the table based on all active filters
 */
function filterTable() {
    const tableBody = document.getElementById('conversion-table-body');
    const rows = tableBody.querySelectorAll('tr');

    // Get filtered vehicles
    const filteredVehicles = getFilteredVehicles();
    const filteredVehicleIds = new Set(filteredVehicles.map(v => v.id));

    // Skip the first row (Total row)
    for (let i = 1; i < rows.length; i++) {
        const vehicleIndex = i - 1; // Adjust for total row
        const vehicle = CONVERSION_DATA.vehicles[vehicleIndex];

        if (vehicle) {
            // Show/hide row based on whether vehicle passed filters
            if (filteredVehicleIds.has(vehicle.id)) {
                rows[i].style.display = '';
            } else {
                rows[i].style.display = 'none';
            }
        }
    }

    // Update the average row with filtered data
    updateAverageRow(filteredVehicles);

    // Update the chart with filtered data
    renderConversionChart(filteredVehicles);

    // Update the inventory title with filtered count
    updateInventoryTitle(filteredVehicles.length);

    // Update market average chart if visible
    updateMarketAverageChart();
}

/**
 * Update the total row based on filtered vehicles
 */
function updateAverageRow(filteredVehicles) {
    const tableBody = document.getElementById('conversion-table-body');
    if (!tableBody) return;

    const totalRow = tableBody.querySelector('tr:first-child');
    if (!totalRow) return;

    // Handle case where no vehicles pass filters
    if (filteredVehicles.length === 0) {
        totalRow.innerHTML = `
            <td style="padding-left: 8px;">Total: 0</td>
            <td style="font-size: 11px;">
                <div>0</div>
                <div style="color: #5E6976; font-size: 12px;">100%</div>
            </td>
            <td style="font-size: 11px;">
                <div>0</div>
                <div style="color: #5E6976; font-size: 12px;">0.0%</div>
            </td>
            <td>
                <div>0</div>
                <div style="color: #5E6976; font-size: 12px;">0.0%</div>
            </td>
            <td></td>
        `;
        return;
    }

    // Calculate totals from filtered vehicles
    const totalSearchViews = filteredVehicles.reduce((sum, v) => sum + v.searchViews, 0);
    const totalDetailViews = filteredVehicles.reduce((sum, v) => sum + v.detailViews, 0);
    const totalLeads = filteredVehicles.reduce((sum, v) => sum + v.leads, 0);

    // Calculate total percentages
    const totalVehiclePagePercent = ((totalDetailViews / totalSearchViews) * 100).toFixed(1);
    const totalLeadsPercent = totalDetailViews > 0 ? ((totalLeads / totalDetailViews) * 100).toFixed(1) : '0.0';

    // Update the total row
    totalRow.innerHTML = `
        <td style="padding-left: 8px;">Total: ${filteredVehicles.length}</td>
        <td style="font-size: 11px;">
            <div>${totalSearchViews.toLocaleString()}</div>
            <div style="color: #5E6976; font-size: 12px;">100%</div>
        </td>
        <td style="font-size: 11px;">
            <div>${totalDetailViews.toLocaleString()}</div>
            <div style="color: #5E6976; font-size: 12px;">${totalVehiclePagePercent}%</div>
        </td>
        <td>
            <div>${totalLeads}</div>
            <div style="color: #5E6976; font-size: 12px;">${totalLeadsPercent}%</div>
        </td>
        <td></td>
    `;
}

/**
 * Filter the table by conversion rate range (legacy function that now calls filterTable)
 */
function filterTableByConversionRate(minRate, maxRate) {
    filterTable();
}

/**
 * Render the conversion funnel chart
 * @param {Array} filteredVehicles - Optional array of filtered vehicles. If not provided, uses all vehicles.
 */
function renderConversionChart(filteredVehicles) {
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

    // Use filtered vehicles if provided, otherwise use all vehicles
    const vehiclesToUse = filteredVehicles || CONVERSION_DATA.vehicles;

    // Calculate funnel data from the vehicles
    const data = {
        searchViews: vehiclesToUse.reduce((sum, v) => sum + v.searchViews, 0),
        detailViews: vehiclesToUse.reduce((sum, v) => sum + v.detailViews, 0),
        leads: vehiclesToUse.reduce((sum, v) => sum + v.leads, 0)
    };

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
            animation: false,
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

    const data = CONVERSION_DATA.marketAverage;

    // Calculate percentages (based on search views as 100%)
    const searchViewsPercent = 100;
    const detailViewsPercent = (data.detailViews / data.searchViews) * 100;
    const leadsPercent = (data.leads / data.searchViews) * 100;

    marketAverageChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Search result', 'Vehicle page', 'Leads'],
            datasets: [{
                label: 'Conversion Rate',
                data: [searchViewsPercent, detailViewsPercent, leadsPercent],
                backgroundColor: ['#5E6976', '#5E6976', '#5E6976'],
                borderWidth: 0,
                // Store raw numbers for tooltip
                rawData: [data.searchViews, data.detailViews, data.leads]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: false,
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

                        // Draw trapezoid with gray color at 20% opacity
                        ctx.fillStyle = 'rgba(94, 105, 118, 0.2)';
                        ctx.beginPath();
                        ctx.moveTo(bar1.x + bar1HalfWidth, bar1.y);
                        ctx.lineTo(bar2.x - bar2HalfWidth, bar2.y);
                        ctx.lineTo(bar2.x - bar2HalfWidth, bar2.base);
                        ctx.lineTo(bar1.x + bar1HalfWidth, bar1.base);
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

                        // Draw trapezoid with gray color at 20% opacity
                        ctx.fillStyle = 'rgba(94, 105, 118, 0.2)';
                        ctx.beginPath();
                        ctx.moveTo(bar2.x + bar2HalfWidth, bar2.y);
                        ctx.lineTo(bar3.x - bar3HalfWidth, bar3.y);
                        ctx.lineTo(bar3.x - bar3HalfWidth, bar3.base);
                        ctx.lineTo(bar2.x + bar2HalfWidth, bar2.base);
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
                            const minHeightForInside = 50;

                            const x = bar.x;
                            let percentY, countY;

                            // If bar is too short, place text above the bar
                            if (barHeight < minHeightForInside) {
                                percentY = bar.y - 25;
                                countY = bar.y - 8;
                                ctx.fillStyle = '#374151';
                            } else {
                                // Place text inside the bar
                                percentY = bar.y + 20;
                                countY = bar.y + 38;
                                ctx.fillStyle = '#FFFFFF';
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

    // Calculate totals
    const totalSearchViews = CONVERSION_DATA.vehicles.reduce((sum, v) => sum + v.searchViews, 0);
    const totalDetailViews = CONVERSION_DATA.vehicles.reduce((sum, v) => sum + v.detailViews, 0);
    const totalLeads = CONVERSION_DATA.vehicles.reduce((sum, v) => sum + v.leads, 0);

    // Calculate total percentages
    const totalVehiclePagePercent = ((totalDetailViews / totalSearchViews) * 100).toFixed(1);
    const totalLeadsPercent = totalDetailViews > 0 ? ((totalLeads / totalDetailViews) * 100).toFixed(1) : '0.0';

    // Add total row first
    const totalRow = document.createElement('tr');
    totalRow.style.fontWeight = '700';
    totalRow.style.backgroundColor = '#F9FAFB';
    totalRow.style.fontSize = '12px';
    totalRow.innerHTML = `
        <td style="padding-left: 8px;">Total: ${CONVERSION_DATA.vehicles.length}</td>
        <td style="font-size: 11px;">
            <div>${totalSearchViews.toLocaleString()}</div>
            <div style="color: #5E6976; font-size: 12px;">100%</div>
        </td>
        <td style="font-size: 11px;">
            <div>${totalDetailViews.toLocaleString()}</div>
            <div style="color: #5E6976; font-size: 12px;">${totalVehiclePagePercent}%</div>
        </td>
        <td>
            <div>${totalLeads}</div>
            <div style="color: #5E6976; font-size: 12px;">${totalLeadsPercent}%</div>
        </td>
        <td></td>
    `;
    tableBody.appendChild(totalRow);

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
                <div>
                    <a href="#" onclick="return false;">${vehicle.name}</a>
                    <div style="font-size: 12px; color: #5E6976;">$${vehicle.price.toLocaleString()} • ${vehicle.mileage.toLocaleString()} mi</div>
                </div>
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

})(); // End of IIFE - keeps all conversion page code isolated
