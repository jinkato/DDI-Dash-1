// Explore Page JavaScript
// This file handles chart initialization and interactivity with full filtering support

// Store chart instances for updates
let inventoryTrendChartInstance = null;
let totalLeadsChartInstance = null;
let leadsPerVehicleChartInstance = null;
let buyerOverlapChartInstance = null;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize filters from URL parameters (updates window.currentFilters)
    initializeFiltersFromURL();

    // Get initial filtered data from explore-filters.js
    if (typeof getFilteredData === 'function') {
        // Get initial filtered data
        const filteredData = getFilteredData();

        // Initialize all charts with filtered data
        updateInventoryTrendChart(filteredData);
        updateTotalLeadsChart(filteredData);
        updateLeadsPerVehicleChart(filteredData);
        updateBuyerOverlapChart(filteredData);
    }

    // Set up filter event listeners
    initializeFilterEventListeners();
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

    if (groupBy === 'vehicle-type') {
        // Group by vehicle type
        const selectedVehicleTypes = window.currentFilters.vehicleTypes || ['Compact', 'Sedans', 'SUV/CO', 'Truck', 'Luxury'];
        const allVehicleTypes = ['Compact', 'Sedans', 'SUV/CO', 'Truck', 'Luxury'];
        const allColorVars = ['--color-great-deal', '--color-good-deal', '--color-fair-deal', '--color-high-priced', '--color-over-priced'];

        datasets = selectedVehicleTypes.map((type) => {
            const typeIndex = allVehicleTypes.indexOf(type);
            const typeData = EXPLORE_MOCK_DATA.vehicleTypeData[type];
            const typeInventory = inventory.map(inv => Math.round(inv * typeData.inventoryShare));

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

        datasets = selectedDealRatings.map((rating) => {
            const ratingIndex = allDealRatings.indexOf(rating);
            const ratingData = EXPLORE_MOCK_DATA.dealRatingData[rating];
            const ratingInventory = inventory.map(inv => Math.round(inv * ratingData.inventoryShare));

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

    if (groupBy === 'vehicle-type') {
        // Group by vehicle type
        const selectedVehicleTypes = window.currentFilters.vehicleTypes || ['Compact', 'Sedans', 'SUV/CO', 'Truck', 'Luxury'];
        const allVehicleTypes = ['Compact', 'Sedans', 'SUV/CO', 'Truck', 'Luxury'];
        const allColorVars = ['--color-great-deal', '--color-good-deal', '--color-fair-deal', '--color-high-priced', '--color-over-priced'];

        // Get base market avg and calculate average LPV
        const avgLPV = Object.values(lpvByDealRating).reduce((a, b) => a + b, 0) / Object.values(lpvByDealRating).length;

        datasets = selectedVehicleTypes.map((type) => {
            const typeIndex = allVehicleTypes.indexOf(type);
            const typeData = EXPLORE_MOCK_DATA.vehicleTypeData[type];

            // Calculate total leads for this type for each month
            const typeLeads = inventory.map((inv, idx) => {
                const typeInventory = Math.round(inv * typeData.inventoryShare);
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

        datasets = selectedDealRatings.map((rating) => {
            const ratingIndex = allDealRatings.indexOf(rating);
            const ratingData = EXPLORE_MOCK_DATA.dealRatingData[rating];
            const lpv = lpvByDealRating[rating];

            // Calculate total leads for this rating for each month
            const ratingLeads = inventory.map(inv => {
                const ratingInventory = Math.round(inv * ratingData.inventoryShare);
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
    const marketBaseData = EXPLORE_MOCK_DATA.dataByRadiusAndFranchise[radiusKey][franchiseKey];
    const baseMarketAvg = marketBaseData.marketAvg.slice(startIndex);

    // Apply brand filter
    const brandInfo = getBrandMultiplier(window.currentFilters.brand);

    let datasets;

    if (groupBy === 'vehicle-type') {
        // Group by vehicle type
        const selectedVehicleTypes = window.currentFilters.vehicleTypes || ['Compact', 'Sedans', 'SUV/CO', 'Truck', 'Luxury'];
        const allVehicleTypes = ['Compact', 'Sedans', 'SUV/CO', 'Truck', 'Luxury'];
        const allColorVars = ['--color-great-deal', '--color-good-deal', '--color-fair-deal', '--color-high-priced', '--color-over-priced'];

        // Get average deal rating performance
        const dealRatings = window.currentFilters.dealRatings || ['Great Deal', 'Good Deal', 'Fair Deal', 'High Priced', 'Over Priced'];
        let avgDealRatingPerformance = Array(13).fill(0);
        let totalShare = 0;
        dealRatings.forEach(rating => {
            const ratingData = EXPLORE_MOCK_DATA.dealRatingData[rating];
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
            const typeData = EXPLORE_MOCK_DATA.vehicleTypeData[type];

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
            const ratingData = EXPLORE_MOCK_DATA.dealRatingData[rating];

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
 * Update Buyer Overlap Chart (Stacked Bar Chart by Deal Rating or Vehicle Type)
 */
function updateBuyerOverlapChart(data) {
    const ctx = document.getElementById('buyer-overlap-chart');
    if (!ctx) return;

    // Destroy existing chart
    if (buyerOverlapChartInstance) {
        buyerOverlapChartInstance.destroy();
    }

    const months = data.months;
    const groupBy = window.currentFilters.groupBy || 'deal-rating';

    // Map both deal ratings and vehicle types to the same color variables
    const allDealRatings = ['Great Deal', 'Good Deal', 'Fair Deal', 'High Priced', 'Over Priced'];
    const allVehicleTypes = ['Compact', 'Sedans', 'SUV/CO', 'Truck', 'Luxury'];
    const allColorVars = ['--color-great-deal', '--color-good-deal', '--color-fair-deal', '--color-high-priced', '--color-over-priced'];

    let datasets;

    if (groupBy === 'vehicle-type') {
        // Group by vehicle type
        const buyerOverlapByVehicleType = data.buyerOverlapByVehicleType;
        const selectedVehicleTypes = window.currentFilters.vehicleTypes || allVehicleTypes;

        datasets = selectedVehicleTypes.map((type) => {
            const typeIndex = allVehicleTypes.indexOf(type);
            const buyerOverlapData = buyerOverlapByVehicleType[type] || [];

            return {
                label: type,
                data: buyerOverlapData,
                backgroundColor: getComputedStyle(document.documentElement).getPropertyValue(allColorVars[typeIndex]),
                borderWidth: 0
            };
        }).reverse();
    } else {
        // Group by deal rating (default)
        const buyerOverlapByDealRating = data.buyerOverlapByDealRating;
        const selectedDealRatings = window.currentFilters.dealRatings || allDealRatings;

        datasets = selectedDealRatings.map((rating) => {
            const ratingIndex = allDealRatings.indexOf(rating);
            const buyerOverlapData = buyerOverlapByDealRating[rating] || [];

            return {
                label: rating,
                data: buyerOverlapData,
                backgroundColor: getComputedStyle(document.documentElement).getPropertyValue(allColorVars[ratingIndex]),
                borderWidth: 0
            };
        }).reverse();
    }

    buyerOverlapChartInstance = new Chart(ctx, {
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
                        // Sort tooltip items by their order
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
                            return context.dataset.label + ': ' + context.parsed.y + ' buyers/vehicle';
                        },
                        footer: function(tooltipItems) {
                            let total = 0;
                            tooltipItems.forEach(item => {
                                total += item.parsed.y;
                            });
                            return 'Total: ' + total.toFixed(1) + ' buyers/vehicle';
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
                        text: 'Buyers per Vehicle',
                        color: '#6B7280',
                        font: { size: 12, weight: '500' }
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
    // If no URL filters, window.currentFilters already has defaults from explore-filters.js

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
}

/**
 * Called whenever filters change
 * Updates charts and data based on new filter state
 */
function onFiltersChanged() {
    // Update market average display
    updateMarketAverageDisplay();

    // Get fresh filtered data (uses window.currentFilters from explore-filters.js)
    if (typeof getFilteredData === 'function') {
        const filteredData = getFilteredData();

        // Update all charts
        updateInventoryTrendChart(filteredData);
        updateTotalLeadsChart(filteredData);
        updateLeadsPerVehicleChart(filteredData);
        updateBuyerOverlapChart(filteredData);
    }

    console.log('Filters changed:', window.currentFilters);
}

