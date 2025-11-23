// Explore Page JavaScript
// This file handles chart initialization and interactivity

// Store current filter state
let currentFilters = {};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize filters from URL parameters first
    initializeFiltersFromURL();

    // Then initialize charts with filtered data
    initializeLeadsPerVehicleChart();
    initializeMarketTrendChart();
    initializeBuyerOverlapChart();
    initializeInventoryBarTooltips();

    // Set up filter event listeners
    initializeFilterEventListeners();
});

/**
 * Initialize Leads per Vehicle Chart
 */
function initializeLeadsPerVehicleChart() {
    const ctx = document.getElementById('leads-per-vehicle-chart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Great Deal', 'Good Deal', 'Fair Deal', 'High Priced', 'Over Priced'],
            datasets: [{
                label: 'Leads per Vehicle',
                data: [3.2, 2.8, 2.1, 1.5, 0.9],
                backgroundColor: [
                    getComputedStyle(document.documentElement).getPropertyValue('--color-great-deal'),
                    getComputedStyle(document.documentElement).getPropertyValue('--color-good-deal'),
                    getComputedStyle(document.documentElement).getPropertyValue('--color-fair-deal'),
                    getComputedStyle(document.documentElement).getPropertyValue('--color-high-priced'),
                    getComputedStyle(document.documentElement).getPropertyValue('--color-over-priced')
                ],
                borderWidth: 0
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
                            return context.parsed.y + ' leads/vehicle';
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
                            size: 11
                        }
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
                            size: 11
                        }
                    },
                    title: {
                        display: true,
                        text: 'Leads per Vehicle',
                        color: '#6B7280',
                        font: {
                            size: 12,
                            weight: '500'
                        }
                    }
                }
            }
        }
    });
}

/**
 * Initialize Market Trend Chart
 */
function initializeMarketTrendChart() {
    const ctx = document.getElementById('market-trend-chart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
            datasets: [{
                label: 'Your Dealership',
                data: [2.3, 2.5, 2.4, 2.6, 2.7, 2.5, 2.8, 2.6, 2.7, 2.9],
                borderColor: '#3B82F6',
                backgroundColor: '#3B82F6',
                borderWidth: 2,
                tension: 0.3,
                pointRadius: 3,
                pointHoverRadius: 5
            }, {
                label: 'Market Average',
                data: [2.5, 2.6, 2.5, 2.7, 2.8, 2.7, 2.9, 2.8, 2.9, 3.0],
                borderColor: '#9CA3AF',
                backgroundColor: '#9CA3AF',
                borderWidth: 2,
                borderDash: [5, 5],
                tension: 0.3,
                pointRadius: 0,
                pointHoverRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false
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
                            size: 11
                        }
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
                            size: 11
                        }
                    }
                }
            }
        }
    });
}

/**
 * Initialize Buyer Overlap Chart
 */
function initializeBuyerOverlapChart() {
    const ctx = document.getElementById('buyer-overlap-chart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
            datasets: [{
                label: 'Buyer Overlap',
                data: [4.2, 4.5, 4.3, 4.7, 4.8, 4.6, 5.0, 4.8, 4.9, 5.2],
                backgroundColor: '#8B5CF6',
                borderWidth: 0
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
                            return context.parsed.y + ' buyers/vehicle';
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
                            size: 11
                        }
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
                            size: 11
                        }
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
        currentFilters = decodeFiltersFromURL();
    } else {
        // Fallback to defaults if utility not available
        currentFilters = {
            dateRange: 'Last 13 months',
            dateGroup: 'Monthly',
            vehicleTypes: ['Compact', 'Sedans', 'SUV/CO', 'Truck', 'Luxury'],
            dealRatings: ['Great Deal', 'Good Deal', 'Fair Deal', 'High Priced', 'Over Priced'],
            brand: 'All',
            radius: '50 miles',
            franchiseType: 'All'
        };
    }

    // Apply filters to UI elements
    applyFiltersToUI();
}

/**
 * Apply current filter state to UI elements
 */
function applyFiltersToUI() {
    // Date Range dropdown
    const dateRangeSelect = document.getElementById('date-range');
    if (dateRangeSelect && currentFilters.dateRange) {
        dateRangeSelect.value = currentFilters.dateRange;
    }

    // Date Group dropdown
    const dateGroupSelect = document.getElementById('date-group');
    if (dateGroupSelect && currentFilters.dateGroup) {
        dateGroupSelect.value = currentFilters.dateGroup;
    }

    // Vehicle Type checkboxes
    const vehicleTypeCheckboxes = document.querySelectorAll('.vehicle-type-checkbox');
    vehicleTypeCheckboxes.forEach(checkbox => {
        checkbox.checked = currentFilters.vehicleTypes &&
                          currentFilters.vehicleTypes.includes(checkbox.value);
    });

    // Deal Rating checkboxes
    const dealRatingCheckboxes = document.querySelectorAll('.deal-rating-checkbox');
    dealRatingCheckboxes.forEach(checkbox => {
        checkbox.checked = currentFilters.dealRatings &&
                          currentFilters.dealRatings.includes(checkbox.value);
    });

    // Brand dropdown
    const brandSelect = document.getElementById('brand');
    if (brandSelect && currentFilters.brand) {
        brandSelect.value = currentFilters.brand;
    }

    // Update market average display
    updateMarketAverageDisplay();
}

/**
 * Update the market average display with current filter values
 */
function updateMarketAverageDisplay() {
    const marketAverageValue = document.querySelector('.market-average-value');
    if (marketAverageValue && currentFilters.radius && currentFilters.franchiseType) {
        const radiusShort = currentFilters.radius.replace(' miles', 'ml').replace('All distances', 'All');
        marketAverageValue.textContent = `${radiusShort}, ${currentFilters.franchiseType}`;
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
            currentFilters.dateRange = this.value;
            onFiltersChanged();
        });
    }

    // Date Group dropdown
    const dateGroupSelect = document.getElementById('date-group');
    if (dateGroupSelect) {
        dateGroupSelect.addEventListener('change', function() {
            currentFilters.dateGroup = this.value;
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
            currentFilters.vehicleTypes = selectedTypes;
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
            currentFilters.dealRatings = selectedRatings;
            onFiltersChanged();
        });
    });

    // Brand dropdown
    const brandSelect = document.getElementById('brand');
    if (brandSelect) {
        brandSelect.addEventListener('change', function() {
            currentFilters.brand = this.value;
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

    // TODO: Update charts with filtered data
    // For now, charts show static data
    // In the future, this would filter the data and re-render charts

    console.log('Filters changed:', currentFilters);
}

/**
 * Initialize inventory bar tooltips
 */
function initializeInventoryBarTooltips() {
    const inventorySegments = document.querySelectorAll('.inventory-segment');

    inventorySegments.forEach(segment => {
        segment.addEventListener('mouseenter', function(e) {
            // Get the width percentage from the style attribute
            const widthStyle = this.style.width;
            const percentage = widthStyle.replace('%', '').trim();

            // Get the title attribute for additional info
            const titleText = this.getAttribute('title');

            // Create tooltip element
            const tooltip = document.createElement('div');
            tooltip.className = 'inventory-bar-tooltip';
            tooltip.innerHTML = `
                <div style="font-weight: 600; margin-bottom: 4px;">${percentage}%</div>
                <div style="font-size: 12px;">${titleText}</div>
            `;
            document.body.appendChild(tooltip);

            // Position the tooltip
            const rect = this.getBoundingClientRect();
            tooltip.style.position = 'absolute';
            tooltip.style.left = rect.left + (rect.width / 2) + 'px';
            tooltip.style.top = (rect.top - 10) + 'px';
            tooltip.style.transform = 'translate(-50%, -100%)';
            tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            tooltip.style.color = 'white';
            tooltip.style.padding = '8px 12px';
            tooltip.style.borderRadius = '6px';
            tooltip.style.fontSize = '13px';
            tooltip.style.pointerEvents = 'none';
            tooltip.style.zIndex = '1000';
            tooltip.style.whiteSpace = 'nowrap';

            // Fade in animation
            setTimeout(() => {
                tooltip.style.opacity = '1';
                tooltip.style.transition = 'opacity 0.2s';
            }, 10);
        });

        segment.addEventListener('mouseleave', function() {
            // Remove all tooltips
            document.querySelectorAll('.inventory-bar-tooltip').forEach(tooltip => {
                tooltip.remove();
            });
        });
    });
}
