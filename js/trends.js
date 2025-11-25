// Trends Page JavaScript
// This file handles chart initialization and interactivity with full filtering support

// Store chart instances for updates
let inventoryTrendChartInstance = null;
let totalLeadsChartInstance = null;
let leadsPerVehicleChartInstance = null;
let conversionFunnelChartInstance = null;
let buyerOverlapChartInstance = null;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize tab switching for Leads panel
    initializeLeadsTabSwitching();

    // Initialize filters with shared function from trends-filters.js
    // Pass config indicating this page does not have lead type filters
    initializeFilters(
        { hasLeadTypeFilter: false },
        function(filteredData) {
            // This callback is called on initial load and whenever filters change
            updateInventoryTrendChart(filteredData);
            updateTotalLeadsChart(filteredData);
            updateLeadsPerVehicleChart(filteredData);
            updateConversionFunnelChart(filteredData);
            updateBuyerOverlapChart(filteredData);
            updateSearchDemandChart(filteredData);
            updateMarketAverageDisplay();

            // Update lead.html link with current filters
            if (typeof buildLeadURL === 'function') {
                const leadLink = document.querySelector('a[href*="lead.html"]');
                if (leadLink) {
                    leadLink.href = buildLeadURL(window.currentFilters);
                }
            }

            // Update inventory.html link with current filters
            if (typeof buildInventoryURL === 'function') {
                const inventoryLink = document.getElementById('inventory-learn-more');
                if (inventoryLink) {
                    inventoryLink.href = buildInventoryURL(window.currentFilters);
                }
            }

            // Update search-demand.html link with current filters
            if (typeof buildSearchDemandURL === 'function') {
                const searchDemandLink = document.getElementById('search-demand-learn-more');
                if (searchDemandLink) {
                    searchDemandLink.href = buildSearchDemandURL(window.currentFilters);
                }
            }
        }
    );
});

/**
 * Update Inventory Trend Chart
 */
function updateInventoryTrendChart(data) {
    const ctx = document.getElementById('inventory-trend-chart');
    if (!ctx) return;

    // Destroy existing chart
    if (inventoryTrendChartInstance) {
        inventoryTrendChartInstance.destroy();
    }

    // Get inventory breakdown over time
    const months = data.months;
    const inventory = data.inventory;
    const groupBy = window.currentFilters.groupBy || 'deal-rating';

    let datasets;

    if (groupBy === 'none') {
        // No grouping - show total inventory
        datasets = [{
            label: 'Total Inventory',
            data: inventory,
            backgroundColor: '#0763D3',
            borderWidth: 0
        }];
    } else if (groupBy === 'vehicle-type') {
        // Group by vehicle type
        const selectedVehicleTypes = window.currentFilters.vehicleTypes || ['Compact', 'Sedans', 'SUV/CO', 'Truck', 'Luxury'];
        const allVehicleTypes = ['Compact', 'Sedans', 'SUV/CO', 'Truck', 'Luxury'];
        const allColorVars = ['--color-compact', '--color-sedans', '--color-suv-co', '--color-truck', '--color-luxury'];

        // Calculate total share of selected types to normalize
        let totalShare = 0;
        selectedVehicleTypes.forEach(type => {
            totalShare += TRENDS_MOCK_DATA.vehicleTypeData[type].inventoryShare;
        });

        datasets = selectedVehicleTypes.map((type) => {
            const typeIndex = allVehicleTypes.indexOf(type);
            const typeData = TRENDS_MOCK_DATA.vehicleTypeData[type];
            // Normalize share so selected types add up to 100%
            const normalizedShare = typeData.inventoryShare / totalShare;
            const typeInventory = inventory.map(inv => Math.round(inv * normalizedShare));

            return {
                label: type,
                data: typeInventory,
                backgroundColor: getComputedStyle(document.documentElement).getPropertyValue(allColorVars[typeIndex]),
                borderWidth: 0
            };
        }).reverse();
    } else {
        // Group by deal rating (default)
        const selectedDealRatings = window.currentFilters.dealRatings || ['Great Deal', 'Good Deal', 'Fair Deal', 'High Priced', 'Over Priced'];
        const allDealRatings = ['Great Deal', 'Good Deal', 'Fair Deal', 'High Priced', 'Over Priced'];
        const allColorVars = ['--color-great-deal', '--color-good-deal', '--color-fair-deal', '--color-high-priced', '--color-over-priced'];

        // Calculate total share of selected ratings to normalize
        let totalShare = 0;
        selectedDealRatings.forEach(rating => {
            totalShare += TRENDS_MOCK_DATA.dealRatingData[rating].inventoryShare;
        });

        datasets = selectedDealRatings.map((rating) => {
            const ratingIndex = allDealRatings.indexOf(rating);
            const ratingData = TRENDS_MOCK_DATA.dealRatingData[rating];
            // Normalize share so selected ratings add up to 100%
            const normalizedShare = ratingData.inventoryShare / totalShare;
            const ratingInventory = inventory.map(inv => Math.round(inv * normalizedShare));

            return {
                label: rating,
                data: ratingInventory,
                backgroundColor: getComputedStyle(document.documentElement).getPropertyValue(allColorVars[ratingIndex]),
                borderWidth: 0
            };
        }).reverse();
    }

    inventoryTrendChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: months,
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 0
            },
            interaction: {
                mode: 'index',
                intersect: false
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        font: { size: 11 },
                        color: '#6B7280',
                        padding: 10,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    cornerRadius: 6,
                    titleFont: { size: 13, weight: '600' },
                    bodyFont: { size: 12 },
                    itemSort: function(a, b) {
                        // Sort tooltip items so Great Deal appears first
                        const dealRatingOrder = ['Great Deal', 'Good Deal', 'Fair Deal', 'High Priced', 'Over Priced'];
                        const vehicleTypeOrder = ['Compact', 'Sedans', 'SUV/CO', 'Truck', 'Luxury'];

                        const aIndexDeal = dealRatingOrder.indexOf(a.dataset.label);
                        const bIndexDeal = dealRatingOrder.indexOf(b.dataset.label);
                        const aIndexType = vehicleTypeOrder.indexOf(a.dataset.label);
                        const bIndexType = vehicleTypeOrder.indexOf(b.dataset.label);

                        // If both are deal ratings
                        if (aIndexDeal !== -1 && bIndexDeal !== -1) {
                            return aIndexDeal - bIndexDeal;
                        }
                        // If both are vehicle types
                        if (aIndexType !== -1 && bIndexType !== -1) {
                            return aIndexType - bIndexType;
                        }
                        return 0;
                    },
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y + ' vehicles';
                        },
                        footer: function(tooltipItems) {
                            let total = 0;
                            tooltipItems.forEach(item => {
                                total += item.parsed.y;
                            });
                            return 'Total: ' + total + ' vehicles';
                        }
                    }
                }
            },
            scales: {
                x: {
                    stacked: true,
                    grid: { display: false },
                    ticks: {
                        color: '#6B7280',
                        font: { size: 11 },
                        maxRotation: 45,
                        minRotation: 45
                    }
                },
                y: {
                    stacked: true,
                    beginAtZero: true,
                    grid: { color: '#E5E7EB' },
                    ticks: { color: '#6B7280', font: { size: 11 } },
                    title: {
                        display: true,
                        text: 'Number of Vehicles',
                        color: '#6B7280',
                        font: { size: 12, weight: '500' }
                    }
                }
            }
        }
    });
}

/**
 * Update Total Leads Chart
 */
function updateTotalLeadsChart(data) {
    const ctx = document.getElementById('total-leads-chart');
    if (!ctx) return;

    // Destroy existing chart
    if (totalLeadsChartInstance) {
        totalLeadsChartInstance.destroy();
    }

    // Get total leads breakdown over time
    const months = data.months;
    const inventory = data.inventory;
    const lpvByDealRating = data.lpvByDealRating;
    const groupBy = window.currentFilters.groupBy || 'deal-rating';

    let datasets;

    if (groupBy === 'none') {
        // No grouping - show total leads
        datasets = [{
            label: 'Total Leads',
            data: data.totalLeads,
            backgroundColor: '#0763D3',
            borderWidth: 0
        }];
    } else if (groupBy === 'vehicle-type') {
        // Group by vehicle type
        const selectedVehicleTypes = window.currentFilters.vehicleTypes || ['Compact', 'Sedans', 'SUV/CO', 'Truck', 'Luxury'];
        const allVehicleTypes = ['Compact', 'Sedans', 'SUV/CO', 'Truck', 'Luxury'];
        const allColorVars = ['--color-compact', '--color-sedans', '--color-suv-co', '--color-truck', '--color-luxury'];

        // Get base market avg and calculate average LPV
        const avgLPV = Object.values(lpvByDealRating).reduce((a, b) => a + b, 0) / Object.values(lpvByDealRating).length;

        // Calculate total share of selected types to normalize
        let totalShare = 0;
        selectedVehicleTypes.forEach(type => {
            totalShare += TRENDS_MOCK_DATA.vehicleTypeData[type].inventoryShare;
        });

        datasets = selectedVehicleTypes.map((type) => {
            const typeIndex = allVehicleTypes.indexOf(type);
            const typeData = TRENDS_MOCK_DATA.vehicleTypeData[type];

            // Calculate total leads for this type for each month
            const typeLeads = inventory.map((inv, idx) => {
                // Normalize share so selected types add up to 100%
                const normalizedShare = typeData.inventoryShare / totalShare;
                const typeInventory = Math.round(inv * normalizedShare);
                const typeLPV = avgLPV * typeData.leadsPerformance[idx];
                return Math.round(typeInventory * typeLPV);
            });

            return {
                label: type,
                data: typeLeads,
                backgroundColor: getComputedStyle(document.documentElement).getPropertyValue(allColorVars[typeIndex]),
                borderWidth: 0
            };
        }).reverse();
    } else {
        // Group by deal rating (default)
        const selectedDealRatings = window.currentFilters.dealRatings || ['Great Deal', 'Good Deal', 'Fair Deal', 'High Priced', 'Over Priced'];
        const allDealRatings = ['Great Deal', 'Good Deal', 'Fair Deal', 'High Priced', 'Over Priced'];
        const allColorVars = ['--color-great-deal', '--color-good-deal', '--color-fair-deal', '--color-high-priced', '--color-over-priced'];

        // Calculate total share of selected ratings to normalize
        let totalShare = 0;
        selectedDealRatings.forEach(rating => {
            totalShare += TRENDS_MOCK_DATA.dealRatingData[rating].inventoryShare;
        });

        datasets = selectedDealRatings.map((rating) => {
            const ratingIndex = allDealRatings.indexOf(rating);
            const ratingData = TRENDS_MOCK_DATA.dealRatingData[rating];
            const lpv = lpvByDealRating[rating];

            // Calculate total leads for this rating for each month
            const ratingLeads = inventory.map(inv => {
                // Normalize share so selected ratings add up to 100%
                const normalizedShare = ratingData.inventoryShare / totalShare;
                const ratingInventory = Math.round(inv * normalizedShare);
                return Math.round(ratingInventory * lpv);
            });

            return {
                label: rating,
                data: ratingLeads,
                backgroundColor: getComputedStyle(document.documentElement).getPropertyValue(allColorVars[ratingIndex]),
                borderWidth: 0
            };
        }).reverse();
    }

    totalLeadsChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: months,
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 0
            },
            interaction: {
                mode: 'index',
                intersect: false
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        font: { size: 11 },
                        color: '#6B7280',
                        padding: 10,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    cornerRadius: 6,
                    titleFont: { size: 13, weight: '600' },
                    bodyFont: { size: 12 },
                    itemSort: function(a, b) {
                        // Sort tooltip items so Great Deal appears first
                        const dealRatingOrder = ['Great Deal', 'Good Deal', 'Fair Deal', 'High Priced', 'Over Priced'];
                        const vehicleTypeOrder = ['Compact', 'Sedans', 'SUV/CO', 'Truck', 'Luxury'];

                        const aIndexDeal = dealRatingOrder.indexOf(a.dataset.label);
                        const bIndexDeal = dealRatingOrder.indexOf(b.dataset.label);
                        const aIndexType = vehicleTypeOrder.indexOf(a.dataset.label);
                        const bIndexType = vehicleTypeOrder.indexOf(b.dataset.label);

                        // If both are deal ratings
                        if (aIndexDeal !== -1 && bIndexDeal !== -1) {
                            return aIndexDeal - bIndexDeal;
                        }
                        // If both are vehicle types
                        if (aIndexType !== -1 && bIndexType !== -1) {
                            return aIndexType - bIndexType;
                        }
                        return 0;
                    },
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y + ' leads';
                        },
                        footer: function(tooltipItems) {
                            let total = 0;
                            tooltipItems.forEach(item => {
                                total += item.parsed.y;
                            });
                            return 'Total: ' + total + ' leads';
                        }
                    }
                }
            },
            scales: {
                x: {
                    stacked: true,
                    grid: { display: false },
                    ticks: {
                        color: '#6B7280',
                        font: { size: 11 },
                        maxRotation: 45,
                        minRotation: 45
                    }
                },
                y: {
                    stacked: true,
                    beginAtZero: true,
                    grid: { color: '#E5E7EB' },
                    ticks: { color: '#6B7280', font: { size: 11 } },
                    title: {
                        display: true,
                        text: 'Total Leads',
                        color: '#6B7280',
                        font: { size: 12, weight: '500' }
                    }
                }
            }
        }
    });
}

/**
 * Update Leads per Vehicle Chart (Line chart broken down by deal rating)
 */
function updateLeadsPerVehicleChart(data) {
    const ctx = document.getElementById('leads-per-vehicle-chart');
    if (!ctx) return;

    // Destroy existing chart
    if (leadsPerVehicleChartInstance) {
        leadsPerVehicleChartInstance.destroy();
    }

    const months = data.months;
    const startIndex = 13 - months.length;
    const groupBy = window.currentFilters.groupBy || 'deal-rating';

    // Get base LPV from market average
    const radiusKey = window.currentFilters.radius === 'All distances' ? 'All' : window.currentFilters.radius;
    const franchiseKey = window.currentFilters.franchiseType;
    const marketBaseData = TRENDS_MOCK_DATA.dataByRadiusAndFranchise[radiusKey][franchiseKey];
    const baseMarketAvg = marketBaseData.marketAvg.slice(startIndex);

    // Apply brand filter
    const brandInfo = getBrandMultiplier(window.currentFilters.brand);

    let datasets;

    if (groupBy === 'none') {
        // No grouping - show overall LPV
        datasets = [{
            label: 'Leads per Vehicle',
            data: data.leadsPerVehicle,
            backgroundColor: '#0763D3',
            borderColor: '#0763D3',
            borderWidth: 2,
            tension: 0.3,
            pointRadius: 4,
            pointHoverRadius: 6,
            pointBackgroundColor: '#0763D3',
            pointBorderColor: '#FFFFFF',
            pointBorderWidth: 2,
            fill: false
        }];
    } else if (groupBy === 'vehicle-type') {
        // Group by vehicle type
        const selectedVehicleTypes = window.currentFilters.vehicleTypes || ['Compact', 'Sedans', 'SUV/CO', 'Truck', 'Luxury'];
        const allVehicleTypes = ['Compact', 'Sedans', 'SUV/CO', 'Truck', 'Luxury'];
        const allColorVars = ['--color-compact', '--color-sedans', '--color-suv-co', '--color-truck', '--color-luxury'];

        // Get average deal rating performance
        const dealRatings = window.currentFilters.dealRatings || ['Great Deal', 'Good Deal', 'Fair Deal', 'High Priced', 'Over Priced'];
        let avgDealRatingPerformance = Array(13).fill(0);
        let totalShare = 0;
        dealRatings.forEach(rating => {
            const ratingData = TRENDS_MOCK_DATA.dealRatingData[rating];
            totalShare += ratingData.inventoryShare;
            if (Array.isArray(ratingData.leadsPerformance)) {
                ratingData.leadsPerformance.forEach((perf, idx) => {
                    avgDealRatingPerformance[idx] += perf * ratingData.inventoryShare;
                });
            }
        });
        avgDealRatingPerformance = avgDealRatingPerformance.map(val => val / totalShare).slice(startIndex);

        datasets = selectedVehicleTypes.map((type) => {
            const typeIndex = allVehicleTypes.indexOf(type);
            const typeData = TRENDS_MOCK_DATA.vehicleTypeData[type];

            // Calculate LPV for this vehicle type over time
            const lpvOverTime = months.map((month, idx) => {
                const monthIndex = startIndex + idx;
                const typePerformance = typeData.leadsPerformance[monthIndex];
                return parseFloat((baseMarketAvg[idx] * typePerformance * avgDealRatingPerformance[idx] * brandInfo.leadsMultiplier).toFixed(1));
            });

            return {
                label: type,
                data: lpvOverTime,
                backgroundColor: getComputedStyle(document.documentElement).getPropertyValue(allColorVars[typeIndex]),
                borderColor: getComputedStyle(document.documentElement).getPropertyValue(allColorVars[typeIndex]),
                borderWidth: 2,
                tension: 0.3,
                pointRadius: 4,
                pointHoverRadius: 6,
                pointBackgroundColor: getComputedStyle(document.documentElement).getPropertyValue(allColorVars[typeIndex]),
                pointBorderColor: '#FFFFFF',
                pointBorderWidth: 2,
                fill: false
            };
        });
    } else {
        // Group by deal rating (default)
        const selectedDealRatings = window.currentFilters.dealRatings || ['Great Deal', 'Good Deal', 'Fair Deal', 'High Priced', 'Over Priced'];
        const allDealRatings = ['Great Deal', 'Good Deal', 'Fair Deal', 'High Priced', 'Over Priced'];
        const allColorVars = ['--color-great-deal', '--color-good-deal', '--color-fair-deal', '--color-high-priced', '--color-over-priced'];

        // Apply vehicle type filter
        const vehicleInfo = getVehicleTypesInfo(window.currentFilters.vehicleTypes);
        const avgVehiclePerformance = vehicleInfo.performanceMultipliers.slice(startIndex);

        datasets = selectedDealRatings.map((rating) => {
            const ratingIndex = allDealRatings.indexOf(rating);
            const ratingData = TRENDS_MOCK_DATA.dealRatingData[rating];

            // Calculate LPV for this rating over time
            const lpvOverTime = months.map((month, idx) => {
                const monthIndex = startIndex + idx;
                const ratingPerformance = Array.isArray(ratingData.leadsPerformance)
                    ? ratingData.leadsPerformance[monthIndex]
                    : ratingData.leadsPerformance;

                return parseFloat((baseMarketAvg[idx] * avgVehiclePerformance[idx] * ratingPerformance * brandInfo.leadsMultiplier).toFixed(1));
            });

            return {
                label: rating,
                data: lpvOverTime,
                backgroundColor: getComputedStyle(document.documentElement).getPropertyValue(allColorVars[ratingIndex]),
                borderColor: getComputedStyle(document.documentElement).getPropertyValue(allColorVars[ratingIndex]),
                borderWidth: 2,
                tension: 0.3,
                pointRadius: 4,
                pointHoverRadius: 6,
                pointBackgroundColor: getComputedStyle(document.documentElement).getPropertyValue(allColorVars[ratingIndex]),
                pointBorderColor: '#FFFFFF',
                pointBorderWidth: 2,
                fill: false
            };
        });
    }

    // Add market average line if checkbox is checked
    if (window.currentFilters.showMarketAverage) {
        datasets.push({
            label: 'Market Average',
            data: data.marketAvg,
            backgroundColor: '#9CA3AF',
            borderColor: '#9CA3AF',
            borderWidth: 2,
            borderDash: [5, 5],
            tension: 0.3,
            pointRadius: 0,
            pointHoverRadius: 6,
            pointBackgroundColor: '#9CA3AF',
            pointBorderColor: '#FFFFFF',
            pointBorderWidth: 2,
            fill: false
        });
    }

    leadsPerVehicleChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false
            },
            animation: {
                duration: 0
            },
            scales: {
                x: {
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        color: '#6B7280',
                        font: {
                            size: 11
                        },
                        autoSkip: false,
                        maxRotation: 45,
                        minRotation: 45
                    }
                },
                y: {
                    beginAtZero: false,
                    grid: {
                        color: '#E5E7EB',
                        drawBorder: false
                    },
                    ticks: {
                        font: {
                            size: 12,
                            weight: '500'
                        },
                        color: '#6B7280',
                        padding: 8
                    },
                    title: {
                        display: true,
                        text: 'Leads per Vehicle',
                        font: {
                            size: 13,
                            weight: '500'
                        },
                        color: '#6B7280',
                        padding: 8
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        font: {
                            size: 11
                        },
                        color: '#6B7280',
                        padding: 10,
                        usePointStyle: true,
                        pointStyle: 'rectRounded'
                    }
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
                    itemSort: function(a, b) {
                        // Sort tooltip items so Great Deal appears first
                        const dealRatingOrder = ['Great Deal', 'Good Deal', 'Fair Deal', 'High Priced', 'Over Priced'];
                        const vehicleTypeOrder = ['Compact', 'Sedans', 'SUV/CO', 'Truck', 'Luxury'];

                        const aIndexDeal = dealRatingOrder.indexOf(a.dataset.label);
                        const bIndexDeal = dealRatingOrder.indexOf(b.dataset.label);
                        const aIndexType = vehicleTypeOrder.indexOf(a.dataset.label);
                        const bIndexType = vehicleTypeOrder.indexOf(b.dataset.label);

                        // If both are deal ratings
                        if (aIndexDeal !== -1 && bIndexDeal !== -1) {
                            return aIndexDeal - bIndexDeal;
                        }
                        // If both are vehicle types
                        if (aIndexType !== -1 && bIndexType !== -1) {
                            return aIndexType - bIndexType;
                        }
                        return 0;
                    },
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y + ' leads/vehicle';
                        }
                    }
                }
            }
        }
    });
}

/**
 * Update Buyer Overlap Chart (Average buyer overlap per vehicle)
 */
function updateBuyerOverlapChart(data) {
    const ctx = document.getElementById('buyer-overlap-chart');
    if (!ctx) return;

    // Destroy existing chart
    if (buyerOverlapChartInstance) {
        buyerOverlapChartInstance.destroy();
    }

    const months = data.months;
    const groupBy = window.currentFilters.groupBy;
    let datasets = [];

    // Check if we should group by deal rating or vehicle type
    if (groupBy === 'deal-rating' && data.buyerOverlapByDealRating) {
        // Show lines for each deal rating (filtered by selected deal ratings)
        const dealRatingColors = {
            'Great Deal': '#078A0B',
            'Good Deal': '#09AD0E',
            'Fair Deal': '#FFC651',
            'High Priced': '#FF7F57',
            'Over Priced': '#BD1A2E'
        };

        Object.keys(data.buyerOverlapByDealRating).forEach(rating => {
            // Only show deal ratings that are selected in the filter
            if (window.currentFilters.dealRatings.includes(rating)) {
                datasets.push({
                    label: rating,
                    data: data.buyerOverlapByDealRating[rating],
                    backgroundColor: dealRatingColors[rating],
                    borderColor: dealRatingColors[rating],
                    borderWidth: 2,
                    tension: 0.3,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    pointBackgroundColor: dealRatingColors[rating],
                    pointBorderColor: '#FFFFFF',
                    pointBorderWidth: 2,
                    fill: false
                });
            }
        });
    } else if (groupBy === 'vehicle-type' && data.buyerOverlapByVehicleType) {
        // Show lines for each vehicle type (filtered by selected vehicle types)
        const vehicleTypeColors = {
            'Compact': '#3B82F6',
            'Sedans': '#06B6D4',
            'SUV/CO': '#8B5CF6',
            'Truck': '#EC4899',
            'Luxury': '#6366F1'
        };

        Object.keys(data.buyerOverlapByVehicleType).forEach(type => {
            // Only show vehicle types that are selected in the filter
            if (window.currentFilters.vehicleTypes.includes(type)) {
                datasets.push({
                    label: type,
                    data: data.buyerOverlapByVehicleType[type],
                    backgroundColor: vehicleTypeColors[type],
                    borderColor: vehicleTypeColors[type],
                    borderWidth: 2,
                    tension: 0.3,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    pointBackgroundColor: vehicleTypeColors[type],
                    pointBorderColor: '#FFFFFF',
                    pointBorderWidth: 2,
                    fill: false
                });
            }
        });
    } else {
        // No grouping - show single line for Your Dealership
        datasets.push({
            label: 'Your Dealership',
            data: data.buyerOverlap,
            backgroundColor: '#3B82F6',
            borderColor: '#3B82F6',
            borderWidth: 2,
            tension: 0.3,
            pointRadius: 4,
            pointHoverRadius: 6,
            pointBackgroundColor: '#3B82F6',
            pointBorderColor: '#FFFFFF',
            pointBorderWidth: 2,
            fill: false
        });

        // Add market average line if checkbox is checked
        if (window.currentFilters.showMarketAverage) {
            datasets.push({
                label: 'Market Average',
                data: data.buyerOverlapBaseline,
                backgroundColor: '#9CA3AF',
                borderColor: '#9CA3AF',
                borderWidth: 2,
                borderDash: [5, 5],
                tension: 0.3,
                pointRadius: 3,
                pointHoverRadius: 5,
                pointBackgroundColor: '#9CA3AF',
                pointBorderColor: '#FFFFFF',
                pointBorderWidth: 2,
                fill: false
            });
        }
    }

    buyerOverlapChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 0
            },
            interaction: {
                mode: 'index',
                intersect: false
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        font: { size: 11 },
                        color: '#6B7280',
                        padding: 10,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    cornerRadius: 6,
                    titleFont: { size: 13, weight: '600' },
                    bodyFont: { size: 12 },
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y.toFixed(1) + ' buyers/vehicle';
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        color: '#6B7280',
                        font: {
                            size: 11
                        },
                        autoSkip: false,
                        maxRotation: 45,
                        minRotation: 45
                    }
                },
                y: {
                    beginAtZero: false,
                    grid: {
                        color: '#E5E7EB',
                        drawBorder: false
                    },
                    ticks: {
                        font: {
                            size: 12,
                            weight: '500'
                        },
                        color: '#6B7280',
                        padding: 8
                    },
                    title: {
                        display: true,
                        text: 'Average Buyers per Vehicle',
                        font: {
                            size: 13,
                            weight: '500'
                        },
                        color: '#6B7280',
                        padding: 8
                    }
                }
            }
        }
    });
}

/**
 * Update Search demand chart
 */
let searchDemandChartInstance = null;

function updateSearchDemandChart(data) {
    const ctx = document.getElementById('search-demand-chart');
    if (!ctx) return;

    // Destroy existing chart
    if (searchDemandChartInstance) {
        searchDemandChartInstance.destroy();
    }

    const months = data.months;
    const inventory = data.inventory;
    const groupBy = window.currentFilters.groupBy || 'none';

    // Base search demand calculation
    const baseSearchDemand = inventory.map((inv, idx) => {
        return Math.round(inv * 15 + (Math.random() * 500 - 250));
    });

    let datasets;

    if (groupBy === 'none') {
        // No grouping - show total search demand
        datasets = [{
            label: 'Search Demand',
            data: baseSearchDemand,
            backgroundColor: 'rgba(7, 99, 211, 0.08)',
            borderColor: '#0763D3',
            borderWidth: 2,
            tension: 0.3,
            pointRadius: 4,
            pointHoverRadius: 6,
            pointBackgroundColor: '#0763D3',
            pointBorderColor: '#FFFFFF',
            pointBorderWidth: 2,
            fill: true
        }];
    } else if (groupBy === 'vehicle-type') {
        // Group by vehicle type
        const selectedVehicleTypes = window.currentFilters.vehicleTypes || ['Compact', 'Sedans', 'SUV/CO', 'Truck', 'Luxury'];
        const allVehicleTypes = ['Compact', 'Sedans', 'SUV/CO', 'Truck', 'Luxury'];
        const allColorVars = ['--color-compact', '--color-sedans', '--color-suv-co', '--color-truck', '--color-luxury'];

        // Calculate total share of selected types to normalize
        let totalShare = 0;
        selectedVehicleTypes.forEach(type => {
            totalShare += TRENDS_MOCK_DATA.vehicleTypeData[type].inventoryShare;
        });

        datasets = selectedVehicleTypes.map((type) => {
            const typeIndex = allVehicleTypes.indexOf(type);
            const typeData = TRENDS_MOCK_DATA.vehicleTypeData[type];
            const normalizedShare = typeData.inventoryShare / totalShare;
            const typeSearchDemand = baseSearchDemand.map(demand => Math.round(demand * normalizedShare));
            const color = getComputedStyle(document.documentElement).getPropertyValue(allColorVars[typeIndex]).trim();

            return {
                label: type,
                data: typeSearchDemand,
                backgroundColor: color + '14',
                borderColor: color,
                borderWidth: 2,
                tension: 0.3,
                pointRadius: 4,
                pointHoverRadius: 6,
                pointBackgroundColor: color,
                pointBorderColor: '#FFFFFF',
                pointBorderWidth: 2,
                fill: true
            };
        });
    } else {
        // Group by deal rating (default)
        const selectedDealRatings = window.currentFilters.dealRatings || ['Great Deal', 'Good Deal', 'Fair Deal', 'High Priced', 'Over Priced'];
        const allDealRatings = ['Great Deal', 'Good Deal', 'Fair Deal', 'High Priced', 'Over Priced'];
        const allColorVars = ['--color-great-deal', '--color-good-deal', '--color-fair-deal', '--color-high-priced', '--color-over-priced'];

        // Calculate total share of selected ratings to normalize
        let totalShare = 0;
        selectedDealRatings.forEach(rating => {
            totalShare += TRENDS_MOCK_DATA.dealRatingData[rating].inventoryShare;
        });

        datasets = selectedDealRatings.map((rating) => {
            const ratingIndex = allDealRatings.indexOf(rating);
            const ratingData = TRENDS_MOCK_DATA.dealRatingData[rating];
            const normalizedShare = ratingData.inventoryShare / totalShare;
            const ratingSearchDemand = baseSearchDemand.map(demand => Math.round(demand * normalizedShare));
            const color = getComputedStyle(document.documentElement).getPropertyValue(allColorVars[ratingIndex]).trim();

            return {
                label: rating,
                data: ratingSearchDemand,
                backgroundColor: color + '14',
                borderColor: color,
                borderWidth: 2,
                tension: 0.3,
                pointRadius: 4,
                pointHoverRadius: 6,
                pointBackgroundColor: color,
                pointBorderColor: '#FFFFFF',
                pointBorderWidth: 2,
                fill: true
            };
        });
    }

    searchDemandChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: false,
            interaction: {
                mode: 'index',
                intersect: false
            },
            plugins: {
                legend: {
                    display: groupBy !== 'none',
                    position: 'bottom',
                    labels: {
                        font: { size: 11 },
                        color: '#6B7280',
                        padding: 10,
                        usePointStyle: true
                    }
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
                    itemSort: function(a, b) {
                        // Sort tooltip items so Great Deal appears first
                        const dealRatingOrder = ['Great Deal', 'Good Deal', 'Fair Deal', 'High Priced', 'Over Priced'];
                        const vehicleTypeOrder = ['Compact', 'Sedans', 'SUV/CO', 'Truck', 'Luxury'];

                        const aIndexDeal = dealRatingOrder.indexOf(a.dataset.label);
                        const bIndexDeal = dealRatingOrder.indexOf(b.dataset.label);
                        const aIndexType = vehicleTypeOrder.indexOf(a.dataset.label);
                        const bIndexType = vehicleTypeOrder.indexOf(b.dataset.label);

                        // If both are deal ratings
                        if (aIndexDeal !== -1 && bIndexDeal !== -1) {
                            return aIndexDeal - bIndexDeal;
                        }
                        // If both are vehicle types
                        if (aIndexType !== -1 && bIndexType !== -1) {
                            return aIndexType - bIndexType;
                        }
                        return 0;
                    },
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y.toLocaleString() + ' searches';
                        },
                        footer: function(tooltipItems) {
                            if (tooltipItems.length > 1) {
                                let total = 0;
                                tooltipItems.forEach(item => {
                                    total += item.parsed.y;
                                });
                                return 'Total: ' + total.toLocaleString() + ' searches';
                            }
                            return '';
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        color: '#6B7280',
                        font: {
                            size: 11
                        },
                        autoSkip: false,
                        maxRotation: 45,
                        minRotation: 45
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#E5E7EB',
                        drawBorder: false
                    },
                    ticks: {
                        font: {
                            size: 12,
                            weight: '500'
                        },
                        color: '#6B7280',
                        padding: 8
                    },
                    title: {
                        display: true,
                        text: 'Search Volume',
                        font: {
                            size: 13,
                            weight: '500'
                        },
                        color: '#6B7280',
                        padding: 8
                    }
                }
            }
        }
    });
}

/**
 * Initialize filters from URL parameters
 * Reads filter state from URL and applies to UI elements
 */
function initializeFiltersFromURL() {
    // Get filters from URL parameters using utility function
    if (typeof decodeFiltersFromURL === 'function') {
        const urlFilters = decodeFiltersFromURL();
        Object.assign(window.currentFilters, urlFilters);
    }
    // If no URL filters, window.currentFilters already has defaults from trends-filters.js

    // Apply filters to UI elements
    applyFiltersToUI();
}

/**
 * Apply current filter state to UI elements
 */
function applyFiltersToUI() {
    const filters = window.currentFilters;

    // Date Range dropdown
    const dateRangeSelect = document.getElementById('date-range');
    if (dateRangeSelect && filters.dateRange) {
        dateRangeSelect.value = filters.dateRange;
    }

    // Date Group dropdown
    const dateGroupSelect = document.getElementById('date-group');
    if (dateGroupSelect && filters.dateGroup) {
        dateGroupSelect.value = filters.dateGroup;
    }

    // Vehicle Type checkboxes
    const vehicleTypeCheckboxes = document.querySelectorAll('.vehicle-type-checkbox');
    vehicleTypeCheckboxes.forEach(checkbox => {
        checkbox.checked = filters.vehicleTypes &&
                          filters.vehicleTypes.includes(checkbox.value);
    });

    // Deal Rating checkboxes
    const dealRatingCheckboxes = document.querySelectorAll('.deal-rating-checkbox');
    dealRatingCheckboxes.forEach(checkbox => {
        checkbox.checked = filters.dealRatings &&
                          filters.dealRatings.includes(checkbox.value);
    });

    // Brand dropdown
    const brandSelect = document.getElementById('brand');
    if (brandSelect && filters.brand) {
        brandSelect.value = filters.brand;
    }

    // Group by dropdown
    const groupBySelect = document.getElementById('group-by');
    if (groupBySelect && filters.groupBy) {
        groupBySelect.value = filters.groupBy;
    }

    // Show Market Average checkbox
    const showMarketAverageCheckbox = document.getElementById('show-market-average');
    if (showMarketAverageCheckbox) {
        showMarketAverageCheckbox.checked = filters.showMarketAverage !== undefined ? filters.showMarketAverage : true;
    }

    // Update market average display
    updateMarketAverageDisplay();
}

/**
 * Update the market average display with current filter values
 */
function updateMarketAverageDisplay() {
    const marketAverageValue = document.querySelector('.market-average-value');
    const filters = window.currentFilters;
    if (marketAverageValue && filters.radius && filters.franchiseType) {
        const radiusShort = filters.radius.replace(' miles', 'ml').replace('All distances', 'All');
        marketAverageValue.textContent = `${radiusShort}, ${filters.franchiseType}`;
    }
}

/**
 * Initialize filter event listeners
 * Sets up listeners for all filter controls
 */
function initializeFilterEventListeners() {
    // Date Range dropdown
    const dateRangeSelect = document.getElementById('date-range');
    if (dateRangeSelect) {
        dateRangeSelect.addEventListener('change', function() {
            window.currentFilters.dateRange = this.value;
            onFiltersChanged();
        });
    }

    // Date Group dropdown
    const dateGroupSelect = document.getElementById('date-group');
    if (dateGroupSelect) {
        dateGroupSelect.addEventListener('change', function() {
            window.currentFilters.dateGroup = this.value;
            onFiltersChanged();
        });
    }

    // Vehicle Type checkboxes
    const vehicleTypeCheckboxes = document.querySelectorAll('.vehicle-type-checkbox');
    vehicleTypeCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const selectedTypes = Array.from(vehicleTypeCheckboxes)
                .filter(cb => cb.checked)
                .map(cb => cb.value);
            window.currentFilters.vehicleTypes = selectedTypes;
            onFiltersChanged();
        });
    });

    // Deal Rating checkboxes
    const dealRatingCheckboxes = document.querySelectorAll('.deal-rating-checkbox');
    dealRatingCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const selectedRatings = Array.from(dealRatingCheckboxes)
                .filter(cb => cb.checked)
                .map(cb => cb.value);
            window.currentFilters.dealRatings = selectedRatings;
            onFiltersChanged();
        });
    });

    // Brand dropdown
    const brandSelect = document.getElementById('brand');
    if (brandSelect) {
        brandSelect.addEventListener('change', function() {
            window.currentFilters.brand = this.value;
            onFiltersChanged();
        });
    }

    // Group by dropdown
    const groupBySelect = document.getElementById('group-by');
    if (groupBySelect) {
        groupBySelect.addEventListener('change', function() {
            window.currentFilters.groupBy = this.value;
            onFiltersChanged();
        });
    }

    // Show Market Average checkbox
    const showMarketAverageCheckbox = document.getElementById('show-market-average');
    if (showMarketAverageCheckbox) {
        showMarketAverageCheckbox.addEventListener('change', function() {
            window.currentFilters.showMarketAverage = this.checked;
            onFiltersChanged();
        });
    }
}

/**
 * Initialize tab switching for Leads panel
 */
function initializeLeadsTabSwitching() {
    const tabButtons = document.querySelectorAll('.tab-navigation .tab-button');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');

            // Remove active class from all tab buttons in this panel
            tabButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Hide all tab contents
            document.getElementById('total-leads-tab').classList.remove('active');
            document.getElementById('leads-per-vehicle-tab').classList.remove('active');

            // Show the selected tab content
            if (tabName === 'total-leads') {
                document.getElementById('total-leads-tab').classList.add('active');
            } else if (tabName === 'leads-per-vehicle') {
                document.getElementById('leads-per-vehicle-tab').classList.add('active');
            }
        });
    });
}

/**
 * Update Conversion Funnel Chart (Line chart showing SRP to Leads conversion over time)
 */
function updateConversionFunnelChart(data) {
    const ctx = document.getElementById('conversion-funnel-chart');
    if (!ctx) return;

    // Destroy existing chart
    if (conversionFunnelChartInstance) {
        conversionFunnelChartInstance.destroy();
    }

    const months = data.months;
    const startIndex = 13 - months.length;
    const groupBy = window.currentFilters.groupBy;
    let datasets = [];

    // Check if we should group by deal rating or vehicle type
    if (groupBy === 'deal-rating' && data.conversionFunnelByDealRating) {
        // Show lines for each deal rating (filtered by selected deal ratings)
        const dealRatingColors = {
            'Great Deal': '#078A0B',
            'Good Deal': '#09AD0E',
            'Fair Deal': '#FFC651',
            'High Priced': '#FF7F57',
            'Over Priced': '#BD1A2E'
        };

        Object.keys(data.conversionFunnelByDealRating).forEach(rating => {
            // Only show deal ratings that are selected in the filter
            if (window.currentFilters.dealRatings.includes(rating)) {
                datasets.push({
                    label: rating,
                    data: data.conversionFunnelByDealRating[rating],
                    backgroundColor: dealRatingColors[rating],
                    borderColor: dealRatingColors[rating],
                    borderWidth: 2,
                    tension: 0.3,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    pointBackgroundColor: dealRatingColors[rating],
                    pointBorderColor: '#FFFFFF',
                    pointBorderWidth: 2,
                    fill: false
                });
            }
        });
    } else if (groupBy === 'vehicle-type' && data.conversionFunnelByVehicleType) {
        // Show lines for each vehicle type (filtered by selected vehicle types)
        const vehicleTypeColors = {
            'Compact': '#3B82F6',
            'Sedans': '#06B6D4',
            'SUV/CO': '#8B5CF6',
            'Truck': '#EC4899',
            'Luxury': '#6366F1'
        };

        Object.keys(data.conversionFunnelByVehicleType).forEach(type => {
            // Only show vehicle types that are selected in the filter
            if (window.currentFilters.vehicleTypes.includes(type)) {
                datasets.push({
                    label: type,
                    data: data.conversionFunnelByVehicleType[type],
                    backgroundColor: vehicleTypeColors[type],
                    borderColor: vehicleTypeColors[type],
                    borderWidth: 2,
                    tension: 0.3,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    pointBackgroundColor: vehicleTypeColors[type],
                    pointBorderColor: '#FFFFFF',
                    pointBorderWidth: 2,
                    fill: false
                });
            }
        });
    } else {
        // No grouping - show Your Dealership (filtered) and Market Average
        const conversionData = TRENDS_MOCK_DATA.conversionFunnelData;
        const marketSrpToLeads = conversionData.market.srpToLeads.slice(startIndex);

        datasets = [
            {
                label: 'Your Dealership',
                data: data.conversionFunnel,
                backgroundColor: '#3B82F6',
                borderColor: '#3B82F6',
                borderWidth: 2,
                tension: 0.3,
                pointRadius: 4,
                pointHoverRadius: 6,
                pointBackgroundColor: '#3B82F6',
                pointBorderColor: '#FFFFFF',
                pointBorderWidth: 2,
                fill: false
            },
            {
                label: 'Market Average',
                data: marketSrpToLeads,
                backgroundColor: '#9CA3AF',
                borderColor: '#9CA3AF',
                borderWidth: 2,
                borderDash: [5, 5],
                tension: 0.3,
                pointRadius: 3,
                pointHoverRadius: 5,
                pointBackgroundColor: '#9CA3AF',
                pointBorderColor: '#FFFFFF',
                pointBorderWidth: 2,
                fill: false
            }
        ];
    }

    conversionFunnelChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false
            },
            animation: {
                duration: 0
            },
            scales: {
                x: {
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        color: '#6B7280',
                        font: {
                            size: 11
                        },
                        autoSkip: false,
                        maxRotation: 45,
                        minRotation: 45
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#E5E7EB',
                        drawBorder: false
                    },
                    ticks: {
                        font: {
                            size: 12,
                            weight: '500'
                        },
                        color: '#6B7280',
                        padding: 8,
                        callback: function(value) {
                            return value.toFixed(2) + '%';
                        }
                    },
                    title: {
                        display: true,
                        text: 'SRP to Leads Conversion Rate (%)',
                        font: {
                            size: 13,
                            weight: '500'
                        },
                        color: '#6B7280',
                        padding: 8
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        font: {
                            size: 11
                        },
                        color: '#6B7280',
                        padding: 10,
                        usePointStyle: true,
                        pointStyle: 'rectRounded'
                    }
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
                            return context.dataset.label + ': ' + context.parsed.y.toFixed(2) + '%';
                        }
                    }
                }
            }
        }
    });
}

/**
 * Called whenever filters change
 * Updates charts and data based on new filter state
 */
function onFiltersChanged() {
    // Update market average display
    updateMarketAverageDisplay();

    // Get fresh filtered data (uses window.currentFilters from trends-filters.js)
    if (typeof getFilteredData === 'function') {
        const filteredData = getFilteredData();

        // Update all charts
        updateInventoryTrendChart(filteredData);
        updateTotalLeadsChart(filteredData);
        updateLeadsPerVehicleChart(filteredData);
        updateConversionFunnelChart(filteredData);
        updateBuyerOverlapChart(filteredData);
        updateSearchDemandChart(filteredData);
    }

    // Update lead.html link with current filters
    if (typeof buildLeadURL === 'function') {
        const leadsLink = document.getElementById('leadsLearnMoreLink');
        if (leadsLink) {
            leadsLink.href = buildLeadURL();
        }
    }

    console.log('Filters changed:', window.currentFilters);
}

