// Filter Logic for Total Leads Page
// This file contains all filtering functions and state management

// Current filter state
let currentFilters = {
    dateRange: 'Last 13 months',
    radius: '50 miles',
    franchiseType: 'All',
    inventoryMin: null,
    inventoryMax: null,
    vehicleTypes: ['Compact', 'Sedans', 'SUV/CO', 'Truck', 'Luxury'], // Array of selected types
    dealRatings: ['Great Deal', 'Good Deal', 'Fair Deal', 'High Priced', 'Over Priced'], // Array of selected ratings
    brand: 'All'
};

/**
 * Get the number of months to display based on date range filter
 */
function getMonthCount(dateRange) {
    switch (dateRange) {
        case 'Last month': return 1;
        case 'Last 3 months': return 3;
        case 'Last 6 months': return 6;
        case 'Last year': return 12;
        case 'Last 13 months': return 13;
        case 'All': return 13;
        default: return 13;
    }
}

/**
 * Get filtered data based on current filter state
 */
function getFilteredData() {
    // Get number of months to display
    const monthCount = getMonthCount(currentFilters.dateRange);
    const startIndex = 13 - monthCount;
    const months = MOCK_DATA.months.slice(startIndex);

    // YOUR DEALERSHIP DATA - Always use "All" radius and "All" franchise (not affected by market filters)
    let dealershipBaseData = MOCK_DATA.dataByRadiusAndFranchise['All']['All'];
    let inventory = dealershipBaseData.inventory.slice(startIndex);
    let totalLeads = dealershipBaseData.totalLeads.slice(startIndex);

    // Apply vehicle type filter to dealership data
    const vehicleInfo = getVehicleTypesInfo(currentFilters.vehicleTypes);
    inventory = inventory.map(inv => Math.round(inv * vehicleInfo.inventoryMultiplier));
    // Apply time-based performance multipliers (different for each month)
    totalLeads = totalLeads.map((leads, idx) => {
        const monthIndex = startIndex + idx; // Get the actual month index in the full 13-month array
        return Math.round(leads * vehicleInfo.inventoryMultiplier * vehicleInfo.performanceMultipliers[monthIndex]);
    });

    // Apply deal rating filter to dealership data
    const dealRatingInfo = getDealRatingInfo(currentFilters.dealRatings);
    inventory = inventory.map(inv => Math.round(inv * dealRatingInfo.inventoryShare));
    // Apply time-based deal rating performance multipliers
    totalLeads = totalLeads.map((leads, idx) => {
        const monthIndex = startIndex + idx; // Get the actual month index in the full 13-month array
        return Math.round(leads * dealRatingInfo.inventoryShare * dealRatingInfo.leadsPerformanceMultipliers[monthIndex]);
    });

    // Apply brand filter to dealership data
    const brandInfo = getBrandMultiplier(currentFilters.brand);
    if (brandInfo.inventoryMultiplier !== 1.0) {
        inventory = inventory.map(inv => Math.round(inv * brandInfo.inventoryMultiplier));
        totalLeads = totalLeads.map(leads => Math.round(leads * brandInfo.inventoryMultiplier * brandInfo.leadsMultiplier));
    }

    // MARKET AVERAGE DATA - Uses selected radius and franchise type
    const radiusKey = currentFilters.radius === 'All distances' ? 'All' : currentFilters.radius;
    const franchiseKey = currentFilters.franchiseType;
    let marketBaseData = MOCK_DATA.dataByRadiusAndFranchise[radiusKey][franchiseKey];
    let marketAvg = marketBaseData.marketAvg.slice(startIndex);

    // Apply same filters to market average for fair comparison
    // Vehicle type performance - use AVERAGE performance (not time-based) so market stays steady
    const avgVehiclePerformance = vehicleInfo.performanceMultipliers.reduce((a, b) => a + b, 0) / vehicleInfo.performanceMultipliers.length;
    marketAvg = marketAvg.map(avg => parseFloat((avg * avgVehiclePerformance).toFixed(1)));

    // Deal rating performance - use AVERAGE performance (not time-based) so market stays steady
    const avgDealRatingPerformance = dealRatingInfo.leadsPerformanceMultipliers.reduce((a, b) => a + b, 0) / dealRatingInfo.leadsPerformanceMultipliers.length;
    marketAvg = marketAvg.map(avg => parseFloat((avg * avgDealRatingPerformance).toFixed(1)));

    // Brand performance (Toyota gets more leads per vehicle than Volvo)
    if (brandInfo.leadsMultiplier !== 1.0) {
        marketAvg = marketAvg.map(avg => parseFloat((avg * brandInfo.leadsMultiplier).toFixed(1)));
    }

    // Apply inventory size filter (filters out months where YOUR inventory doesn't match)
    let filteredMonths = [];
    let filteredInventory = [];
    let filteredTotalLeads = [];
    let filteredMarketAvg = [];

    for (let i = 0; i < months.length; i++) {
        const inv = inventory[i];

        // Check inventory min/max filters - only affects which months to show
        if (currentFilters.inventoryMin && inv < currentFilters.inventoryMin) continue;
        if (currentFilters.inventoryMax && inv > currentFilters.inventoryMax) continue;

        filteredMonths.push(months[i]);
        filteredInventory.push(inv);
        filteredTotalLeads.push(totalLeads[i]);
        filteredMarketAvg.push(marketAvg[i]);
    }

    // Calculate leads per vehicle
    const leadsPerVehicle = filteredInventory.map((inv, i) =>
        inv > 0 ? (filteredTotalLeads[i] / inv).toFixed(1) : 0
    );

    // Calculate market sample size based on market filters
    const marketSampleSize = calculateMarketSampleSize();

    return {
        months: filteredMonths,
        inventory: filteredInventory,
        totalLeads: filteredTotalLeads,
        leadsPerVehicle: leadsPerVehicle,
        marketAvg: filteredMarketAvg,
        marketSampleSize: marketSampleSize
    };
}

/**
 * Calculate market sample size based on current filters
 */
function calculateMarketSampleSize() {
    // Base sample size
    let sampleSize = 1800;

    // Adjust by radius
    const radiusMultipliers = {
        '5 miles': 0.25,
        '10 miles': 0.40,
        '25 miles': 0.65,
        '50 miles': 0.85,
        'All': 1.0
    };
    const radiusKey = currentFilters.radius === 'All distances' ? 'All' : currentFilters.radius;
    sampleSize *= radiusMultipliers[radiusKey] || 1.0;

    // Adjust by franchise type
    if (currentFilters.franchiseType === 'Franchise') {
        sampleSize *= 0.6;
    } else if (currentFilters.franchiseType === 'Independent') {
        sampleSize *= 0.4;
    }

    // Adjust by vehicle type
    const vehicleInfo = getVehicleTypesInfo(currentFilters.vehicleTypes);
    sampleSize *= vehicleInfo.inventoryMultiplier;

    // Adjust by deal rating
    const dealRatingInfo = getDealRatingInfo(currentFilters.dealRatings);
    sampleSize *= dealRatingInfo.inventoryShare;

    // Adjust by brand
    const brandInfo = getBrandMultiplier(currentFilters.brand);
    sampleSize *= brandInfo.inventoryMultiplier;

    return Math.round(sampleSize);
}

/**
 * Get inventory and performance multipliers based on selected vehicle types
 * Returns performanceMultipliers as an array (one value per month)
 */
function getVehicleTypesInfo(vehicleTypes) {
    // If no types selected, return 0
    if (!vehicleTypes || vehicleTypes.length === 0) {
        return {
            inventoryMultiplier: 0,
            performanceMultipliers: Array(13).fill(0)
        };
    }

    // If all types selected, return 1.0 for all months
    const allTypes = ['Compact', 'Sedans', 'SUV/CO', 'Truck', 'Luxury'];
    if (vehicleTypes.length === allTypes.length) {
        return {
            inventoryMultiplier: 1.0,
            performanceMultipliers: Array(13).fill(1.0)
        };
    }

    // Calculate weighted average based on selected vehicle types for each month
    let totalInventoryShare = 0;
    const performanceMultipliers = Array(13).fill(0);

    vehicleTypes.forEach(type => {
        const vehicleData = MOCK_DATA.vehicleTypeData[type];
        if (vehicleData) {
            totalInventoryShare += vehicleData.inventoryShare;
            // Add weighted performance for each month
            for (let i = 0; i < 13; i++) {
                performanceMultipliers[i] += vehicleData.inventoryShare * vehicleData.leadsPerformance[i];
            }
        }
    });

    // Calculate weighted average performance for each month
    if (totalInventoryShare > 0) {
        for (let i = 0; i < 13; i++) {
            performanceMultipliers[i] = performanceMultipliers[i] / totalInventoryShare;
        }
    } else {
        for (let i = 0; i < 13; i++) {
            performanceMultipliers[i] = 1.0;
        }
    }

    return {
        inventoryMultiplier: totalInventoryShare,
        performanceMultipliers: performanceMultipliers
    };
}

/**
 * Get deal rating info (inventory share and leads performance)
 * Handles multiple selected deal ratings with weighted averages
 * Returns leadsPerformanceMultipliers as an array (one value per month)
 */
function getDealRatingInfo(dealRatings) {
    // If no ratings selected, return 0
    if (!dealRatings || dealRatings.length === 0) {
        return {
            inventoryShare: 0,
            leadsPerformanceMultipliers: Array(13).fill(0)
        };
    }

    // If all ratings selected, return 1.0 for all months
    const allRatings = ['Great Deal', 'Good Deal', 'Fair Deal', 'High Priced', 'Over Priced'];
    if (dealRatings.length === allRatings.length) {
        return {
            inventoryShare: 1.0,
            leadsPerformanceMultipliers: Array(13).fill(1.0)
        };
    }

    // Calculate weighted average based on selected deal ratings for each month
    let totalInventoryShare = 0;
    const leadsPerformanceMultipliers = Array(13).fill(0);

    dealRatings.forEach(rating => {
        const ratingData = MOCK_DATA.dealRatingData[rating];
        if (ratingData) {
            totalInventoryShare += ratingData.inventoryShare;

            // Check if leadsPerformance is an array (time-based) or single value
            if (Array.isArray(ratingData.leadsPerformance)) {
                // Add weighted performance for each month
                for (let i = 0; i < 13; i++) {
                    leadsPerformanceMultipliers[i] += ratingData.inventoryShare * ratingData.leadsPerformance[i];
                }
            } else {
                // Single value - apply to all months
                for (let i = 0; i < 13; i++) {
                    leadsPerformanceMultipliers[i] += ratingData.inventoryShare * ratingData.leadsPerformance;
                }
            }
        }
    });

    // Calculate weighted average performance for each month
    if (totalInventoryShare > 0) {
        for (let i = 0; i < 13; i++) {
            leadsPerformanceMultipliers[i] = leadsPerformanceMultipliers[i] / totalInventoryShare;
        }
    } else {
        for (let i = 0; i < 13; i++) {
            leadsPerformanceMultipliers[i] = 1.0;
        }
    }

    return {
        inventoryShare: totalInventoryShare,
        leadsPerformanceMultipliers: leadsPerformanceMultipliers
    };
}

/**
 * Get brand multipliers for inventory and leads
 */
function getBrandMultiplier(brand) {
    // Brand distribution percentages (what % of inventory is each brand)
    const brandInventoryShare = {
        'All': 1.0,
        'Toyota': 0.25,      // 25% of inventory
        'Honda': 0.20,       // 20% of inventory
        'Nissan': 0.15,      // 15% of inventory
        'Volvo': 0.10,       // 10% of inventory
        'Multi-brand': 0.20, // 20% of inventory
        'Luxury': 0.10       // 10% of inventory
    };

    // How well each brand performs relative to their inventory share
    const brandLeadsPerformance = {
        'All': 1.0,
        'Toyota': 1.15,      // Toyota gets 15% more leads per vehicle
        'Honda': 1.10,       // Honda gets 10% more leads per vehicle
        'Nissan': 0.95,      // Nissan gets 5% fewer leads per vehicle
        'Volvo': 0.85,       // Volvo gets 15% fewer leads per vehicle
        'Multi-brand': 1.05, // Multi-brand gets 5% more leads per vehicle
        'Luxury': 0.90       // Luxury gets 10% fewer leads per vehicle
    };

    return {
        inventoryMultiplier: brandInventoryShare[brand],
        leadsMultiplier: brandLeadsPerformance[brand]
    };
}

/**
 * Update a specific filter
 */
function updateFilter(filterName, value) {
    currentFilters[filterName] = value;
    return getFilteredData();
}

/**
 * Initialize filter event listeners
 */
function initializeFilters(onFilterChange) {
    // Date range filter
    document.getElementById('date-range').addEventListener('change', function(e) {
        const data = updateFilter('dateRange', e.target.value);
        onFilterChange(data);
    });

    // Radius filter
    document.getElementById('radius').addEventListener('change', function(e) {
        const data = updateFilter('radius', e.target.value);
        onFilterChange(data);
    });

    // Franchise type filter
    document.getElementById('franchise').addEventListener('change', function(e) {
        const data = updateFilter('franchiseType', e.target.value);
        onFilterChange(data);
    });

    // Inventory size filters
    document.getElementById('inv-min').addEventListener('input', function(e) {
        const value = e.target.value ? parseInt(e.target.value) : null;
        const data = updateFilter('inventoryMin', value);
        onFilterChange(data);
    });

    document.getElementById('inv-max').addEventListener('input', function(e) {
        const value = e.target.value ? parseInt(e.target.value) : null;
        const data = updateFilter('inventoryMax', value);
        onFilterChange(data);
    });

    // Reset inventory filter
    document.querySelector('.reset-link').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('inv-min').value = '';
        document.getElementById('inv-max').value = '';
        currentFilters.inventoryMin = null;
        currentFilters.inventoryMax = null;
        const data = getFilteredData();
        onFilterChange(data);
    });

    // Vehicle type checkboxes
    const vehicleCheckboxes = document.querySelectorAll('.vehicle-type-checkbox');
    vehicleCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            // Get all checked vehicle types
            const selectedTypes = Array.from(vehicleCheckboxes)
                .filter(cb => cb.checked)
                .map(cb => cb.value);

            currentFilters.vehicleTypes = selectedTypes;
            const data = getFilteredData();
            onFilterChange(data);
        });
    });

    // Deal rating checkboxes
    const dealRatingCheckboxes = document.querySelectorAll('.deal-rating-checkbox');
    dealRatingCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            // Get all checked deal ratings
            const selectedRatings = Array.from(dealRatingCheckboxes)
                .filter(cb => cb.checked)
                .map(cb => cb.value);

            currentFilters.dealRatings = selectedRatings;
            const data = getFilteredData();
            onFilterChange(data);
        });
    });

    // Brand filter
    document.getElementById('brand').addEventListener('change', function(e) {
        const data = updateFilter('brand', e.target.value);
        onFilterChange(data);
    });
}

/**
 * Get initial filtered data
 */
function getInitialData() {
    return getFilteredData();
}
