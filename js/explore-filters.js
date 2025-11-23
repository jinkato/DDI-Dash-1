// Filter Logic for Explore Page
// This file contains all filtering functions and state management for explore.html
// Adapted from lpv-2-filters.js with explore-specific data formatting

// Current filter state (will be set from URL parameters)
// Expose globally so explore.js can access it
window.currentFilters = {
    dateRange: 'Last 13 months',
    dateGroup: 'Monthly',
    radius: '50 miles',
    franchiseType: 'All',
    vehicleTypes: ['Compact', 'Sedans', 'SUV/CO', 'Truck', 'Luxury'],
    dealRatings: ['Great Deal', 'Good Deal', 'Fair Deal', 'High Priced', 'Over Priced'],
    brand: 'All',
    groupBy: 'none',
    showMarketAverage: true
};
// Create a local alias for convenience
const currentFilters = window.currentFilters;

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
 * Returns data formatted for all explore charts
 */
function getFilteredData() {
    // Get number of months to display
    const monthCount = getMonthCount(currentFilters.dateRange);
    const startIndex = 13 - monthCount;
    const months = EXPLORE_MOCK_DATA.months.slice(startIndex);

    // YOUR DEALERSHIP DATA - Always use "All" radius and "All" franchise
    let dealershipBaseData = EXPLORE_MOCK_DATA.dataByRadiusAndFranchise['All']['All'];
    let inventory = dealershipBaseData.inventory.slice(startIndex);
    let totalLeads = dealershipBaseData.totalLeads.slice(startIndex);

    // Apply vehicle type filter to dealership data
    const vehicleInfo = getVehicleTypesInfo(currentFilters.vehicleTypes);
    inventory = inventory.map(inv => Math.round(inv * vehicleInfo.inventoryMultiplier));
    totalLeads = totalLeads.map((leads, idx) => {
        const monthIndex = startIndex + idx;
        return Math.round(leads * vehicleInfo.inventoryMultiplier * vehicleInfo.performanceMultipliers[monthIndex]);
    });

    // Apply deal rating filter to dealership data
    const dealRatingInfo = getDealRatingInfo(currentFilters.dealRatings);
    inventory = inventory.map(inv => Math.round(inv * dealRatingInfo.inventoryShare));
    totalLeads = totalLeads.map((leads, idx) => {
        const monthIndex = startIndex + idx;
        return Math.round(leads * dealRatingInfo.inventoryShare * dealRatingInfo.leadsPerformanceMultipliers[monthIndex]);
    });

    // Apply brand filter to dealership data
    const brandInfo = getBrandMultiplier(currentFilters.brand);
    if (brandInfo.inventoryMultiplier !== 1.0) {
        inventory = inventory.map(inv => Math.round(inv * brandInfo.inventoryMultiplier));
        totalLeads = totalLeads.map(leads => Math.round(leads * brandInfo.inventoryMultiplier * brandInfo.leadsMultiplier));
    }

    // MARKET AVERAGE DATA
    const radiusKey = currentFilters.radius === 'All distances' ? 'All' : currentFilters.radius;
    const franchiseKey = currentFilters.franchiseType;
    let marketBaseData = EXPLORE_MOCK_DATA.dataByRadiusAndFranchise[radiusKey][franchiseKey];
    let marketAvg = marketBaseData.marketAvg.slice(startIndex);

    // Apply filters to market average
    const avgVehiclePerformance = vehicleInfo.performanceMultipliers.reduce((a, b) => a + b, 0) / vehicleInfo.performanceMultipliers.length;
    marketAvg = marketAvg.map(avg => parseFloat((avg * avgVehiclePerformance).toFixed(1)));

    const avgDealRatingPerformance = dealRatingInfo.leadsPerformanceMultipliers.reduce((a, b) => a + b, 0) / dealRatingInfo.leadsPerformanceMultipliers.length;
    marketAvg = marketAvg.map(avg => parseFloat((avg * avgDealRatingPerformance).toFixed(1)));

    if (brandInfo.leadsMultiplier !== 1.0) {
        marketAvg = marketAvg.map(avg => parseFloat((avg * brandInfo.leadsMultiplier).toFixed(1)));
    }

    // Calculate leads per vehicle
    const leadsPerVehicle = inventory.map((inv, i) =>
        inv > 0 ? parseFloat((totalLeads[i] / inv).toFixed(1)) : 0
    );

    // Calculate market sample size
    const marketSampleSize = calculateMarketSampleSize();

    // Get buyer overlap data
    const buyerOverlap = getBuyerOverlapTimeSeries(startIndex);

    // Get baseline buyer overlap (unfiltered, for market average comparison)
    const buyerOverlapBaseline = EXPLORE_MOCK_DATA.buyerOverlapData.marketAverageBaseline.slice(startIndex);

    // Get buyer overlap breakdown by deal rating (for buyer overlap stacked chart)
    const buyerOverlapByDealRating = getBuyerOverlapByDealRating();

    // Get buyer overlap breakdown by vehicle type (for buyer overlap stacked chart)
    const buyerOverlapByVehicleType = getBuyerOverlapByVehicleType();

    // Get inventory breakdown by deal rating (for inventory bars)
    const inventoryByDealRating = getInventoryByDealRating(inventory);

    // Get LPV by deal rating (for LPV chart)
    const lpvByDealRating = getLPVByDealRating();

    return {
        months: months,
        inventory: inventory,
        totalLeads: totalLeads,
        leadsPerVehicle: leadsPerVehicle,
        marketAvg: marketAvg,
        marketSampleSize: marketSampleSize,
        buyerOverlap: buyerOverlap,
        buyerOverlapBaseline: buyerOverlapBaseline,
        buyerOverlapByDealRating: buyerOverlapByDealRating,
        buyerOverlapByVehicleType: buyerOverlapByVehicleType,
        inventoryByDealRating: inventoryByDealRating,
        lpvByDealRating: lpvByDealRating
    };
}

/**
 * Get inventory breakdown by deal rating for last 3 months + market average
 * Used for inventory bar chart
 */
function getInventoryByDealRating(inventory) {
    // Get last 3 months of inventory
    const last3Months = inventory.slice(-3);

    // Calculate total inventory for market average (based on market sample size)
    const marketSampleSize = calculateMarketSampleSize();

    const dealRatings = ['Great Deal', 'Good Deal', 'Fair Deal', 'High Priced', 'Over Priced'];

    // Build inventory breakdown for each month
    const breakdown = last3Months.map((totalInv, monthIdx) => {
        const result = {};
        dealRatings.forEach(rating => {
            const ratingData = EXPLORE_MOCK_DATA.dealRatingData[rating];
            result[rating] = Math.round(totalInv * ratingData.inventoryShare);
        });
        return result;
    });

    // Add market average breakdown
    const marketBreakdown = {};
    dealRatings.forEach(rating => {
        const ratingData = EXPLORE_MOCK_DATA.dealRatingData[rating];
        marketBreakdown[rating] = Math.round(marketSampleSize * ratingData.inventoryShare);
    });
    breakdown.push(marketBreakdown);

    return breakdown;
}

/**
 * Get LPV (Leads per Vehicle) for each deal rating
 * Used for LPV by deal rating bar chart
 */
function getLPVByDealRating() {
    const dealRatings = ['Great Deal', 'Good Deal', 'Fair Deal', 'High Priced', 'Over Priced'];

    // Get base LPV from market average (using current radius/franchise filters)
    const radiusKey = currentFilters.radius === 'All distances' ? 'All' : currentFilters.radius;
    const franchiseKey = currentFilters.franchiseType;
    const marketBaseData = EXPLORE_MOCK_DATA.dataByRadiusAndFranchise[radiusKey][franchiseKey];
    const baseLPV = marketBaseData.marketAvg[12]; // Use latest month

    // Apply vehicle type filter
    const vehicleInfo = getVehicleTypesInfo(currentFilters.vehicleTypes);
    const avgVehiclePerformance = vehicleInfo.performanceMultipliers.reduce((a, b) => a + b, 0) / vehicleInfo.performanceMultipliers.length;

    // Apply brand filter
    const brandInfo = getBrandMultiplier(currentFilters.brand);

    const lpvByRating = {};

    dealRatings.forEach(rating => {
        const ratingData = EXPLORE_MOCK_DATA.dealRatingData[rating];
        // Get latest month performance (index 12)
        const ratingPerformance = Array.isArray(ratingData.leadsPerformance)
            ? ratingData.leadsPerformance[12]
            : ratingData.leadsPerformance;

        lpvByRating[rating] = parseFloat((baseLPV * avgVehiclePerformance * ratingPerformance * brandInfo.leadsMultiplier).toFixed(1));
    });

    return lpvByRating;
}

/**
 * Get buyer overlap time series data with filters applied
 */
function getBuyerOverlapTimeSeries(startIndex) {
    const baseline = EXPLORE_MOCK_DATA.buyerOverlapData.baseline.slice(startIndex);

    // Apply vehicle type filter
    const vehicleInfo = getVehicleTypesInfo(currentFilters.vehicleTypes);
    let vehicleMultiplier = 0;
    if (vehicleInfo.inventoryMultiplier > 0) {
        currentFilters.vehicleTypes.forEach(type => {
            const typeData = EXPLORE_MOCK_DATA.vehicleTypeData[type];
            const multiplier = EXPLORE_MOCK_DATA.buyerOverlapData.vehicleTypeMultiplier[type] || 1.0;
            vehicleMultiplier += typeData.inventoryShare * multiplier;
        });
        vehicleMultiplier = vehicleMultiplier / vehicleInfo.inventoryMultiplier;
    } else {
        vehicleMultiplier = 1.0;
    }

    // Apply deal rating filter
    const dealRatingInfo = getDealRatingInfo(currentFilters.dealRatings);
    let dealRatingMultiplier = 0;
    if (dealRatingInfo.inventoryShare > 0) {
        currentFilters.dealRatings.forEach(rating => {
            const ratingData = EXPLORE_MOCK_DATA.dealRatingData[rating];
            const multiplier = EXPLORE_MOCK_DATA.buyerOverlapData.dealRatingMultiplier[rating] || 1.0;
            dealRatingMultiplier += ratingData.inventoryShare * multiplier;
        });
        dealRatingMultiplier = dealRatingMultiplier / dealRatingInfo.inventoryShare;
    } else {
        dealRatingMultiplier = 1.0;
    }

    // Apply brand filter
    const brandMultiplier = EXPLORE_MOCK_DATA.buyerOverlapData.brandMultiplier[currentFilters.brand] || 1.0;

    // Apply all multipliers to baseline
    return baseline.map(value => parseFloat((value * vehicleMultiplier * dealRatingMultiplier * brandMultiplier).toFixed(1)));
}

/**
 * Get buyer overlap breakdown by deal rating
 * Returns an object with buyer overlap for each deal rating
 */
function getBuyerOverlapByDealRating() {
    const baseline = EXPLORE_MOCK_DATA.buyerOverlapData.baseline;
    const monthCount = getMonthCount(currentFilters.dateRange);
    const startIndex = 13 - monthCount;
    const baselineSlice = baseline.slice(startIndex);

    // Calculate vehicle type multiplier (weighted average)
    const selectedVehicleTypes = currentFilters.vehicleTypes || ['Compact', 'Sedans', 'SUV/CO', 'Truck', 'Luxury'];
    let vehicleMultiplier = 0;
    let totalShare = 0;

    selectedVehicleTypes.forEach(type => {
        const share = EXPLORE_MOCK_DATA.vehicleTypeData[type].inventoryShare;
        const multiplier = EXPLORE_MOCK_DATA.buyerOverlapData.vehicleTypeMultiplier[type] || 1.0;
        vehicleMultiplier += share * multiplier;
        totalShare += share;
    });

    if (totalShare > 0) {
        vehicleMultiplier = vehicleMultiplier / totalShare;
    } else {
        vehicleMultiplier = 1.0;
    }

    // Get brand multiplier
    const brandMultiplier = EXPLORE_MOCK_DATA.buyerOverlapData.brandMultiplier[currentFilters.brand] || 1.0;

    // Calculate buyer overlap for each deal rating individually
    const result = {};
    const allDealRatings = ['Great Deal', 'Good Deal', 'Fair Deal', 'High Priced', 'Over Priced'];

    allDealRatings.forEach(rating => {
        const dealRatingMultiplier = EXPLORE_MOCK_DATA.buyerOverlapData.dealRatingMultiplier[rating] || 1.0;
        const trendMultipliers = EXPLORE_MOCK_DATA.buyerOverlapData.dealRatingTrendMultiplier[rating] || [];
        const trendMultiplierSlice = trendMultipliers.slice(startIndex);

        result[rating] = baselineSlice.map((value, index) => {
            const trendMultiplier = trendMultiplierSlice[index] || 1.0;
            return parseFloat((value * vehicleMultiplier * dealRatingMultiplier * brandMultiplier * trendMultiplier).toFixed(1));
        });
    });

    return result;
}

/**
 * Get buyer overlap breakdown by vehicle type
 * Returns an object with buyer overlap for each vehicle type
 */
function getBuyerOverlapByVehicleType() {
    const baseline = EXPLORE_MOCK_DATA.buyerOverlapData.baseline;
    const monthCount = getMonthCount(currentFilters.dateRange);
    const startIndex = 13 - monthCount;
    const baselineSlice = baseline.slice(startIndex);

    // Calculate deal rating multiplier (weighted average)
    const selectedDealRatings = currentFilters.dealRatings || ['Great Deal', 'Good Deal', 'Fair Deal', 'High Priced', 'Over Priced'];
    let dealRatingMultiplier = 0;
    let totalShare = 0;

    selectedDealRatings.forEach(rating => {
        const share = EXPLORE_MOCK_DATA.dealRatingData[rating].inventoryShare;
        const multiplier = EXPLORE_MOCK_DATA.buyerOverlapData.dealRatingMultiplier[rating] || 1.0;
        dealRatingMultiplier += share * multiplier;
        totalShare += share;
    });

    if (totalShare > 0) {
        dealRatingMultiplier = dealRatingMultiplier / totalShare;
    } else {
        dealRatingMultiplier = 1.0;
    }

    // Get brand multiplier
    const brandMultiplier = EXPLORE_MOCK_DATA.buyerOverlapData.brandMultiplier[currentFilters.brand] || 1.0;

    // Calculate buyer overlap for each vehicle type individually
    const result = {};
    const allVehicleTypes = ['Compact', 'Sedans', 'SUV/CO', 'Truck', 'Luxury'];

    allVehicleTypes.forEach(type => {
        const vehicleTypeMultiplier = EXPLORE_MOCK_DATA.buyerOverlapData.vehicleTypeMultiplier[type] || 1.0;

        result[type] = baselineSlice.map((value) => {
            return parseFloat((value * vehicleTypeMultiplier * dealRatingMultiplier * brandMultiplier).toFixed(1));
        });
    });

    return result;
}

/**
 * Calculate market sample size based on current filters
 */
function calculateMarketSampleSize() {
    let sampleSize = 1800;

    const radiusMultipliers = {
        '5 miles': 0.25,
        '10 miles': 0.40,
        '25 miles': 0.65,
        '50 miles': 0.85,
        'All': 1.0
    };
    const radiusKey = currentFilters.radius === 'All distances' ? 'All' : currentFilters.radius;
    sampleSize *= radiusMultipliers[radiusKey] || 1.0;

    if (currentFilters.franchiseType === 'Franchise') {
        sampleSize *= 0.6;
    } else if (currentFilters.franchiseType === 'Independent') {
        sampleSize *= 0.4;
    }

    const vehicleInfo = getVehicleTypesInfo(currentFilters.vehicleTypes);
    sampleSize *= vehicleInfo.inventoryMultiplier;

    const dealRatingInfo = getDealRatingInfo(currentFilters.dealRatings);
    sampleSize *= dealRatingInfo.inventoryShare;

    const brandInfo = getBrandMultiplier(currentFilters.brand);
    sampleSize *= brandInfo.inventoryMultiplier;

    return Math.round(sampleSize);
}

/**
 * Get inventory and performance multipliers based on selected vehicle types
 */
function getVehicleTypesInfo(vehicleTypes) {
    if (!vehicleTypes || vehicleTypes.length === 0) {
        return {
            inventoryMultiplier: 0,
            performanceMultipliers: Array(13).fill(0)
        };
    }

    const allTypes = ['Compact', 'Sedans', 'SUV/CO', 'Truck', 'Luxury'];
    if (vehicleTypes.length === allTypes.length) {
        return {
            inventoryMultiplier: 1.0,
            performanceMultipliers: Array(13).fill(1.0)
        };
    }

    let totalInventoryShare = 0;
    const performanceMultipliers = Array(13).fill(0);

    vehicleTypes.forEach(type => {
        const vehicleData = EXPLORE_MOCK_DATA.vehicleTypeData[type];
        if (vehicleData) {
            totalInventoryShare += vehicleData.inventoryShare;
            for (let i = 0; i < 13; i++) {
                performanceMultipliers[i] += vehicleData.inventoryShare * vehicleData.leadsPerformance[i];
            }
        }
    });

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
 */
function getDealRatingInfo(dealRatings) {
    if (!dealRatings || dealRatings.length === 0) {
        return {
            inventoryShare: 0,
            leadsPerformanceMultipliers: Array(13).fill(0)
        };
    }

    const allRatings = ['Great Deal', 'Good Deal', 'Fair Deal', 'High Priced', 'Over Priced'];
    if (dealRatings.length === allRatings.length) {
        return {
            inventoryShare: 1.0,
            leadsPerformanceMultipliers: Array(13).fill(1.0)
        };
    }

    let totalInventoryShare = 0;
    const leadsPerformanceMultipliers = Array(13).fill(0);

    dealRatings.forEach(rating => {
        const ratingData = EXPLORE_MOCK_DATA.dealRatingData[rating];
        if (ratingData) {
            totalInventoryShare += ratingData.inventoryShare;

            if (Array.isArray(ratingData.leadsPerformance)) {
                for (let i = 0; i < 13; i++) {
                    leadsPerformanceMultipliers[i] += ratingData.inventoryShare * ratingData.leadsPerformance[i];
                }
            } else {
                for (let i = 0; i < 13; i++) {
                    leadsPerformanceMultipliers[i] += ratingData.inventoryShare * ratingData.leadsPerformance;
                }
            }
        }
    });

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
    const brandInventoryShare = {
        'All': 1.0,
        'Toyota': 0.25,
        'Honda': 0.20,
        'Nissan': 0.15,
        'Volvo': 0.10,
        'Multi-brand': 0.20,
        'Luxury': 0.10
    };

    const brandLeadsPerformance = {
        'All': 1.0,
        'Toyota': 1.15,
        'Honda': 1.10,
        'Nissan': 0.95,
        'Volvo': 0.85,
        'Multi-brand': 1.05,
        'Luxury': 0.90
    };

    return {
        inventoryMultiplier: brandInventoryShare[brand],
        leadsMultiplier: brandLeadsPerformance[brand]
    };
}
