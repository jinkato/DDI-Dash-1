// Performance Page JavaScript

// Store chart instances globally
let chartInstances = {};

// Mock data structure for different timeframes and vehicle types
const performanceData = {
    'last-7-days': {
        'all': {
            metrics: {
                marketPercentile: '72th',
                inventory: 247,
                inventoryChange: -7,
                dealRating: 82,
                dealRatingChange: -29,
                merchandisingHealth: 100,
                conversionRate: 1.62,
                leadsPerVehicle: 2.3,
                turnTime: 34
            },
            charts: {
                conversion: {
                    yourData: [10000, 2450, 162],
                    marketData: [10000, 2450, 145]
                },
                leadsPerVehicle: {
                    yourData: [2.3, 2.7, 2.5, 2.4, 2.6, 2.3],
                    marketData: [2.8, 2.9, 3.0, 3.2, 3.1, 3.1]
                },
                turnTime: {
                    yourData: [25, 37, 46, 24, 41],
                    marketData: [42, 42, 42, 42, 42]
                }
            }
        },
        'new': {
            metrics: {
                marketPercentile: '68th',
                inventory: 87,
                inventoryChange: -5,
                dealRating: 78,
                dealRatingChange: -15,
                merchandisingHealth: 98,
                conversionRate: 1.45,
                leadsPerVehicle: 2.1,
                turnTime: 28
            },
            charts: {
                conversion: {
                    yourData: [4000, 980, 58],
                    marketData: [4000, 980, 52]
                },
                leadsPerVehicle: {
                    yourData: [2.1, 2.3, 2.2, 2.0, 2.1, 2.1],
                    marketData: [2.5, 2.6, 2.7, 2.8, 2.7, 2.8]
                },
                turnTime: {
                    yourData: [22, 30, 35, 20, 32],
                    marketData: [38, 38, 38, 38, 38]
                }
            }
        },
        'used': {
            metrics: {
                marketPercentile: '75th',
                inventory: 160,
                inventoryChange: -8,
                dealRating: 85,
                dealRatingChange: -32,
                merchandisingHealth: 100,
                conversionRate: 1.72,
                leadsPerVehicle: 2.5,
                turnTime: 38
            },
            charts: {
                conversion: {
                    yourData: [6000, 1470, 104],
                    marketData: [6000, 1470, 93]
                },
                leadsPerVehicle: {
                    yourData: [2.5, 2.9, 2.7, 2.6, 2.8, 2.5],
                    marketData: [3.0, 3.1, 3.2, 3.4, 3.3, 3.3]
                },
                turnTime: {
                    yourData: [28, 42, 52, 26, 46],
                    marketData: [45, 45, 45, 45, 45]
                }
            }
        },
        'cpo': {
            metrics: {
                marketPercentile: '80th',
                inventory: 0,
                inventoryChange: 0,
                dealRating: 0,
                dealRatingChange: 0,
                merchandisingHealth: 0,
                conversionRate: 0,
                leadsPerVehicle: 0,
                turnTime: 0
            },
            charts: {
                conversion: {
                    yourData: [0, 0, 0],
                    marketData: [0, 0, 0]
                },
                leadsPerVehicle: {
                    yourData: [0, 0, 0, 0, 0, 0],
                    marketData: [0, 0, 0, 0, 0, 0]
                },
                turnTime: {
                    yourData: [0, 0, 0, 0, 0],
                    marketData: [0, 0, 0, 0, 0]
                }
            }
        }
    },
    'last-30-days': {
        'all': {
            metrics: {
                marketPercentile: '70th',
                inventory: 255,
                inventoryChange: -3,
                dealRating: 80,
                dealRatingChange: -25,
                merchandisingHealth: 98,
                conversionRate: 1.58,
                leadsPerVehicle: 2.4,
                turnTime: 36
            },
            charts: {
                conversion: {
                    yourData: [25000, 6250, 395],
                    marketData: [25000, 6250, 363]
                },
                leadsPerVehicle: {
                    yourData: [2.4, 2.6, 2.5, 2.3, 2.4, 2.4],
                    marketData: [2.9, 3.0, 3.1, 3.2, 3.1, 3.2]
                },
                turnTime: {
                    yourData: [28, 38, 45, 26, 43],
                    marketData: [44, 44, 44, 44, 44]
                }
            }
        },
        'new': {
            metrics: {
                marketPercentile: '66th',
                inventory: 90,
                inventoryChange: -2,
                dealRating: 76,
                dealRatingChange: -12,
                merchandisingHealth: 96,
                conversionRate: 1.42,
                leadsPerVehicle: 2.2,
                turnTime: 30
            },
            charts: {
                conversion: {
                    yourData: [10000, 2500, 142],
                    marketData: [10000, 2500, 130]
                },
                leadsPerVehicle: {
                    yourData: [2.2, 2.3, 2.2, 2.1, 2.2, 2.2],
                    marketData: [2.6, 2.7, 2.8, 2.9, 2.8, 2.9]
                },
                turnTime: {
                    yourData: [24, 32, 36, 22, 34],
                    marketData: [40, 40, 40, 40, 40]
                }
            }
        },
        'used': {
            metrics: {
                marketPercentile: '73th',
                inventory: 165,
                inventoryChange: -4,
                dealRating: 83,
                dealRatingChange: -28,
                merchandisingHealth: 99,
                conversionRate: 1.68,
                leadsPerVehicle: 2.6,
                turnTime: 40
            },
            charts: {
                conversion: {
                    yourData: [15000, 3750, 252],
                    marketData: [15000, 3750, 233]
                },
                leadsPerVehicle: {
                    yourData: [2.6, 2.8, 2.7, 2.5, 2.6, 2.6],
                    marketData: [3.1, 3.2, 3.3, 3.4, 3.3, 3.4]
                },
                turnTime: {
                    yourData: [30, 44, 50, 28, 48],
                    marketData: [47, 47, 47, 47, 47]
                }
            }
        },
        'cpo': {
            metrics: {
                marketPercentile: '78th',
                inventory: 0,
                inventoryChange: 0,
                dealRating: 0,
                dealRatingChange: 0,
                merchandisingHealth: 0,
                conversionRate: 0,
                leadsPerVehicle: 0,
                turnTime: 0
            },
            charts: {
                conversion: {
                    yourData: [0, 0, 0],
                    marketData: [0, 0, 0]
                },
                leadsPerVehicle: {
                    yourData: [0, 0, 0, 0, 0, 0],
                    marketData: [0, 0, 0, 0, 0, 0]
                },
                turnTime: {
                    yourData: [0, 0, 0, 0, 0],
                    marketData: [0, 0, 0, 0, 0]
                }
            }
        }
    },
    'last-60-days': {
        'all': {
            metrics: {
                marketPercentile: '74th',
                inventory: 260,
                inventoryChange: 2,
                dealRating: 84,
                dealRatingChange: -18,
                merchandisingHealth: 99,
                conversionRate: 1.65,
                leadsPerVehicle: 2.5,
                turnTime: 35
            },
            charts: {
                conversion: {
                    yourData: [80000, 20000, 1320],
                    marketData: [80000, 20000, 1160]
                },
                leadsPerVehicle: {
                    yourData: [2.5, 2.7, 2.6, 2.4, 2.5, 2.5],
                    marketData: [3.0, 3.1, 3.2, 3.3, 3.2, 3.2]
                },
                turnTime: {
                    yourData: [26, 36, 44, 25, 42],
                    marketData: [43, 43, 43, 43, 43]
                }
            }
        },
        'new': {
            metrics: {
                marketPercentile: '70th',
                inventory: 92,
                inventoryChange: 3,
                dealRating: 80,
                dealRatingChange: -8,
                merchandisingHealth: 97,
                conversionRate: 1.48,
                leadsPerVehicle: 2.3,
                turnTime: 29
            },
            charts: {
                conversion: {
                    yourData: [32000, 8000, 473],
                    marketData: [32000, 8000, 416]
                },
                leadsPerVehicle: {
                    yourData: [2.3, 2.4, 2.3, 2.2, 2.3, 2.3],
                    marketData: [2.7, 2.8, 2.9, 3.0, 2.9, 2.9]
                },
                turnTime: {
                    yourData: [23, 31, 35, 21, 33],
                    marketData: [39, 39, 39, 39, 39]
                }
            }
        },
        'used': {
            metrics: {
                marketPercentile: '77th',
                inventory: 168,
                inventoryChange: 2,
                dealRating: 87,
                dealRatingChange: -20,
                merchandisingHealth: 100,
                conversionRate: 1.75,
                leadsPerVehicle: 2.7,
                turnTime: 39
            },
            charts: {
                conversion: {
                    yourData: [48000, 12000, 840],
                    marketData: [48000, 12000, 744]
                },
                leadsPerVehicle: {
                    yourData: [2.7, 2.9, 2.8, 2.6, 2.7, 2.7],
                    marketData: [3.2, 3.3, 3.4, 3.5, 3.4, 3.4]
                },
                turnTime: {
                    yourData: [29, 43, 49, 27, 47],
                    marketData: [46, 46, 46, 46, 46]
                }
            }
        },
        'cpo': {
            metrics: {
                marketPercentile: '82th',
                inventory: 0,
                inventoryChange: 0,
                dealRating: 0,
                dealRatingChange: 0,
                merchandisingHealth: 0,
                conversionRate: 0,
                leadsPerVehicle: 0,
                turnTime: 0
            },
            charts: {
                conversion: {
                    yourData: [0, 0, 0],
                    marketData: [0, 0, 0]
                },
                leadsPerVehicle: {
                    yourData: [0, 0, 0, 0, 0, 0],
                    marketData: [0, 0, 0, 0, 0, 0]
                },
                turnTime: {
                    yourData: [0, 0, 0, 0, 0],
                    marketData: [0, 0, 0, 0, 0]
                }
            }
        }
    }
};

// Initialize charts when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    setupDropdownListeners();
});

function initializeCharts() {
    // Chart.js default options
    Chart.defaults.font.family = "'DM Sans', sans-serif";
    Chart.defaults.plugins.legend.display = false;
    
    // Conversion Funnel Chart - Normalized Percentages
    // Store absolute numbers for tooltip display
    const conversionAbsoluteData = {
        dealer: {
            srp: 10000,
            vdp: 2450,
            leads: 162
        },
        market: {
            srp: 10000,
            vdp: 2000,
            leads: 145
        }
    };

    // Calculate percentages (normalized to SRP = 100%)
    const conversionPercentageData = {
        dealer: {
            srp: 100,
            vdp: (conversionAbsoluteData.dealer.vdp / conversionAbsoluteData.dealer.srp) * 100, // 24.5%
            leads: (conversionAbsoluteData.dealer.leads / conversionAbsoluteData.dealer.srp) * 100 // 1.62%
        },
        market: {
            srp: 100,
            vdp: (conversionAbsoluteData.market.vdp / conversionAbsoluteData.market.srp) * 100, // 20%
            leads: (conversionAbsoluteData.market.leads / conversionAbsoluteData.market.srp) * 100 // 1.45%
        }
    };

    const searchVsTypeCtx = document.getElementById('searchVsTypeChart').getContext('2d');
    chartInstances.conversionChart = new Chart(searchVsTypeCtx, {
        type: 'bar',
        data: {
            labels: ['Search Result Pages (SRP)', 'Vehicle Detail Pages (VDP)', 'Leads Generated'],
            datasets: [{
                label: 'Your Dealership',
                data: [
                    conversionPercentageData.dealer.srp,
                    conversionPercentageData.dealer.vdp,
                    conversionPercentageData.dealer.leads
                ],
                backgroundColor: '#3B82F6',
                borderRadius: 4,
                barPercentage: 0.8
            }, {
                label: 'Market Average',
                data: [
                    conversionPercentageData.market.srp,
                    conversionPercentageData.market.vdp,
                    conversionPercentageData.market.leads
                ],
                backgroundColor: '#E5E7EB',
                borderRadius: 4,
                barPercentage: 0.8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    border: {
                        display: false
                    },
                    ticks: {
                        font: {
                            size: 11,
                            weight: '500'
                        },
                        color: '#374151',
                        autoSkip: false,
                        maxRotation: 0
                    }
                },
                y: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        color: '#F3F4F6',
                        drawBorder: false
                    },
                    border: {
                        display: false
                    },
                    ticks: {
                        font: {
                            size: 12
                        },
                        callback: function(value) {
                            return value + '%';
                        }
                    },
                    title: {
                        display: true,
                        text: 'Percentage of Traffic',
                        font: {
                            size: 12,
                            weight: '500'
                        },
                        color: '#6B7280',
                        padding: { top: 0, bottom: 10 }
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        font: {
                            size: 12,
                            weight: '500'
                        },
                        color: '#6B7280',
                        padding: 15,
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
                        title: function(tooltipItems) {
                            return tooltipItems[0].label;
                        },
                        label: function(context) {
                            const percentage = context.parsed.y;
                            const label = context.label;
                            const datasetLabel = context.dataset.label;
                            const isDealer = datasetLabel === 'Your Dealership';
                            let lines = [];

                            // Get absolute number based on stage and dataset
                            let absoluteValue;
                            if (isDealer) {
                                if (label === 'Search Result Pages (SRP)') {
                                    absoluteValue = conversionAbsoluteData.dealer.srp;
                                } else if (label === 'Vehicle Detail Pages (VDP)') {
                                    absoluteValue = conversionAbsoluteData.dealer.vdp;
                                } else {
                                    absoluteValue = conversionAbsoluteData.dealer.leads;
                                }
                            } else {
                                if (label === 'Search Result Pages (SRP)') {
                                    absoluteValue = conversionAbsoluteData.market.srp;
                                } else if (label === 'Vehicle Detail Pages (VDP)') {
                                    absoluteValue = conversionAbsoluteData.market.vdp;
                                } else {
                                    absoluteValue = conversionAbsoluteData.market.leads;
                                }
                            }

                            // Show percentage (and absolute number for dealer only)
                            if (isDealer) {
                                lines.push(datasetLabel + ': ' + percentage.toFixed(2) + '% (' + absoluteValue.toLocaleString() + ')');
                            } else {
                                lines.push(datasetLabel + ': ' + percentage.toFixed(2) + '%');
                            }

                            // Additional context for dealer data
                            if (isDealer) {
                                if (label === 'Search Result Pages (SRP)') {
                                    lines.push('Starting point: 100%');
                                } else if (label === 'Vehicle Detail Pages (VDP)') {
                                    const vdpConversion = (conversionAbsoluteData.dealer.vdp / conversionAbsoluteData.dealer.srp * 100).toFixed(2);
                                    const dropOff = conversionAbsoluteData.dealer.srp - conversionAbsoluteData.dealer.vdp;
                                    const dropOffPercent = ((dropOff / conversionAbsoluteData.dealer.srp) * 100).toFixed(1);
                                    lines.push('Conversion from SRP: ' + vdpConversion + '%');
                                    lines.push('Drop-off: ' + dropOff.toLocaleString() + ' (' + dropOffPercent + '%)');
                                } else if (label === 'Leads Generated') {
                                    const leadsFromVDP = (conversionAbsoluteData.dealer.leads / conversionAbsoluteData.dealer.vdp * 100).toFixed(1);
                                    const leadsFromSRP = (conversionAbsoluteData.dealer.leads / conversionAbsoluteData.dealer.srp * 100).toFixed(2);
                                    const dropOffVDP = conversionAbsoluteData.dealer.vdp - conversionAbsoluteData.dealer.leads;
                                    const dropOffVDPPercent = ((dropOffVDP / conversionAbsoluteData.dealer.vdp) * 100).toFixed(1);
                                    lines.push('Conversion from VDP: ' + leadsFromVDP + '%');
                                    lines.push('Conversion from SRP: ' + leadsFromSRP + '%');
                                    lines.push('Drop-off from VDP: ' + dropOffVDP.toLocaleString() + ' (' + dropOffVDPPercent + '%)');
                                }
                            } else if (datasetLabel === 'Market Average') {
                                if (label === 'Vehicle Detail Pages (VDP)') {
                                    const vdpConversion = (conversionAbsoluteData.market.vdp / conversionAbsoluteData.market.srp * 100).toFixed(2);
                                    lines.push('Conversion from SRP: ' + vdpConversion + '%');
                                } else if (label === 'Leads Generated') {
                                    const leadsFromSRP = (conversionAbsoluteData.market.leads / conversionAbsoluteData.market.srp * 100).toFixed(2);
                                    lines.push('Conversion from SRP: ' + leadsFromSRP + '%');
                                }
                            }

                            return lines;
                        }
                    }
                }
            }
        }
    });

    // Turn Time Chart - Deviation from Goal
    const priceVsSearchCtx = document.getElementById('priceVsSearchChart').getContext('2d');
    chartInstances.turnTimeChart = new Chart(priceVsSearchCtx, {
        type: 'bar',
        data: {
            labels: ['Sedan', 'SUV', 'Truck', 'Coupe', 'Van'],
            datasets: [{
                label: 'Your Dealership',
                data: [25, 37, 46, 24, 41], // Actual turn time in days
                backgroundColor: '#3B82F6',
                borderRadius: 4,
                barPercentage: 0.8
            }, {
                label: 'Market Average',
                data: [42, 42, 42, 42, 42], // Market average of 42 days
                backgroundColor: '#E5E7EB',
                borderRadius: 4,
                barPercentage: 0.8
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Days to Turn',
                        font: {
                            size: 12,
                            color: '#9CA3AF'
                        }
                    },
                    grid: {
                        color: '#F3F4F6',
                        drawBorder: false
                    },
                    border: {
                        display: false
                    },
                    ticks: {
                        font: {
                            size: 11
                        },
                        callback: function(value) {
                            return value + ' days';
                        }
                    },
                    suggestedMin: 0,
                    suggestedMax: 50
                },
                y: {
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    border: {
                        display: false
                    },
                    ticks: {
                        font: {
                            size: 12,
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
                            size: 12,
                            weight: '500'
                        },
                        color: '#6B7280',
                        padding: 15,
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
                            const value = context.parsed.x;
                            const vehicleType = context.label;
                            const datasetLabel = context.dataset.label;
                            
                            if (datasetLabel === 'Your Dealership') {
                                const marketAvg = 42;
                                const diff = value - marketAvg;
                                const status = diff < 0 ? 'Better than market' : 'Slower than market';
                                return [
                                    datasetLabel + ': ' + value + ' days',
                                    status + ' by ' + Math.abs(diff) + ' days'
                                ];
                            } else {
                                return datasetLabel + ': ' + value + ' days';
                            }
                        }
                    }
                }
            }
        }
    });

    // Leads per Vehicle Chart with Market Benchmark
    const leadsPerVehicleCtx = document.getElementById('leadsPerVehicleChart').getContext('2d');
    chartInstances.leadsPerVehicleChart = new Chart(leadsPerVehicleCtx, {
        type: 'line',
        data: {
            labels: ['May 2025', 'Jun 2025', 'Jul 2025', 'Aug 2025', 'Sep 2025', 'Oct 2025'],
            datasets: [{
                label: 'Your Dealership',
                data: [2.3, 2.7, 2.5, 2.4, 2.6, 2.3],
                backgroundColor: '#3B82F6',
                borderColor: '#3B82F6',
                borderWidth: 2,
                tension: 0.3,
                pointRadius: 4,
                pointHoverRadius: 6,
                pointBackgroundColor: '#3B82F6',
                pointBorderColor: '#FFFFFF',
                pointBorderWidth: 2
            }, {
                label: 'Market Average',
                data: [2.8, 2.9, 3.0, 3.2, 3.1, 3.1],
                backgroundColor: '#9CA3AF',
                borderColor: '#9CA3AF',
                borderWidth: 2,
                borderDash: [5, 5],
                tension: 0.3,
                pointRadius: 0,
                pointHoverRadius: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false
            },
            animation: {
                duration: 500,
                easing: 'easeInOutQuart'
            },
            scales: {
                x: {
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    border: {
                        display: false
                    },
                    ticks: {
                        font: {
                            size: 11,
                            weight: '500'
                        },
                        color: '#6B7280'
                    }
                },
                y: {
                    beginAtZero: true,
                    suggestedMax: 4,
                    grid: {
                        color: '#F3F4F6',
                        drawBorder: false
                    },
                    border: {
                        display: false
                    },
                    ticks: {
                        font: {
                            size: 11
                        },
                        color: '#6B7280',
                        stepSize: 0.5,
                        callback: function(value) {
                            return value.toFixed(1);
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        font: {
                            size: 12,
                            weight: '500'
                        },
                        color: '#6B7280',
                        padding: 15,
                        usePointStyle: true,
                        pointStyle: 'line'
                    }
                },
                tooltip: {
                    backgroundColor: '#FFFFFF',
                    titleColor: '#111827',
                    bodyColor: '#6B7280',
                    borderColor: '#E5E7EB',
                    borderWidth: 1,
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
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            label += context.parsed.y.toFixed(1) + ' leads/vehicle';
                            
                            // Add additional context for dealership data
                            if (context.datasetIndex === 0) {
                                const marketAvg = 3.1;
                                const diff = context.parsed.y - marketAvg;
                                const percentage = ((context.parsed.y / marketAvg - 1) * 100).toFixed(1);
                                if (diff < 0) {
                                    label += ' (' + percentage + '% below market)';
                                } else if (diff > 0) {
                                    label += ' (' + percentage + '% above market)';
                                }
                            }
                            
                            return label;
                        }
                    }
                }
            }
        }
    });

    // Deal Rating Chart - Small Line Chart
    const dealRatingCtx = document.getElementById('dealRatingChart').getContext('2d');
    chartInstances.dealRatingChart = new Chart(dealRatingCtx, {
        type: 'line',
        data: {
            labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
            datasets: [{
                label: 'Your Dealership',
                data: [78, 79, 80, 81, 81.5, 82],
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                borderColor: '#3B82F6',
                borderWidth: 2,
                tension: 0.3,
                pointRadius: 3,
                pointHoverRadius: 4,
                pointBackgroundColor: '#3B82F6',
                pointBorderColor: '#FFFFFF',
                pointBorderWidth: 1,
                fill: true
            }, {
                label: 'Market Average',
                data: [74, 74.5, 75, 75.5, 75, 75],
                backgroundColor: 'transparent',
                borderColor: '#9CA3AF',
                borderWidth: 2,
                borderDash: [5, 5],
                tension: 0.3,
                pointRadius: 0,
                pointHoverRadius: 0
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
                            size: 12,
                            weight: '500'
                        },
                        color: '#6B7280',
                        padding: 15,
                        usePointStyle: true,
                        pointStyle: 'line'
                    }
                },
                tooltip: {
                    backgroundColor: '#FFFFFF',
                    titleColor: '#111827',
                    bodyColor: '#6B7280',
                    borderColor: '#E5E7EB',
                    borderWidth: 1,
                    padding: 10,
                    cornerRadius: 6,
                    titleFont: {
                        size: 12,
                        weight: '600'
                    },
                    bodyFont: {
                        size: 11
                    },
                    callbacks: {
                        title: function(tooltipItems) {
                            return tooltipItems[0].label + ' 2025';
                        },
                        label: function(context) {
                            let label = context.dataset.label + ': ';
                            label += context.parsed.y.toFixed(1) + '%';
                            return label;
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
                    border: {
                        display: false
                    },
                    ticks: {
                        font: {
                            size: 10
                        },
                        color: '#9CA3AF',
                        padding: 4
                    }
                },
                y: {
                    min: 70,
                    max: 85,
                    grid: {
                        color: '#F3F4F6',
                        drawBorder: false
                    },
                    border: {
                        display: false
                    },
                    ticks: {
                        font: {
                            size: 10
                        },
                        color: '#9CA3AF',
                        stepSize: 5,
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    });

    // Inventory Summary Chart - Bar Chart
    const inventorySummaryCtx = document.getElementById('inventorySummaryChart').getContext('2d');
    chartInstances.inventorySummaryChart = new Chart(inventorySummaryCtx, {
        type: 'bar',
        data: {
            labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
            datasets: [{
                label: 'Inventory Count',
                data: [258, 261, 254, 252, 249, 247],
                backgroundColor: '#3B82F6',
                borderRadius: 4,
                barPercentage: 0.7
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
                    backgroundColor: '#FFFFFF',
                    titleColor: '#111827',
                    bodyColor: '#6B7280',
                    borderColor: '#E5E7EB',
                    borderWidth: 1,
                    padding: 10,
                    cornerRadius: 6,
                    titleFont: {
                        size: 12,
                        weight: '600'
                    },
                    bodyFont: {
                        size: 11
                    },
                    callbacks: {
                        title: function(tooltipItems) {
                            return tooltipItems[0].label + ' 2025';
                        },
                        label: function(context) {
                            let label = context.dataset.label + ': ';
                            label += context.parsed.y + ' vehicles';
                            return label;
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
                    border: {
                        display: false
                    },
                    ticks: {
                        font: {
                            size: 10
                        },
                        color: '#9CA3AF',
                        padding: 4
                    }
                },
                y: {
                    min: 230,
                    max: 280,
                    grid: {
                        color: '#F3F4F6',
                        drawBorder: false
                    },
                    border: {
                        display: false
                    },
                    ticks: {
                        font: {
                            size: 10
                        },
                        color: '#9CA3AF',
                        stepSize: 10
                    }
                }
            }
        }
    });
}

// Setup dropdown listeners
function setupDropdownListeners() {
    const timeframeSelect = document.getElementById('timeframeSelect');
    const vehicleTypeSelect = document.getElementById('vehicleTypeSelect');

    // Add change event listeners
    if (timeframeSelect) {
        timeframeSelect.addEventListener('change', updatePageData);
    }
    if (vehicleTypeSelect) {
        vehicleTypeSelect.addEventListener('change', updatePageData);
    }
}

// Main update function
function updatePageData() {
    const timeframeSelect = document.getElementById('timeframeSelect');
    const vehicleTypeSelect = document.getElementById('vehicleTypeSelect');

    const timeframe = timeframeSelect ? timeframeSelect.value : 'last-30-days';
    const vehicleType = vehicleTypeSelect ? vehicleTypeSelect.value : 'all';

    // Get the data for the selected combination
    const data = performanceData[timeframe][vehicleType];

    // Update all components
    updateMetricCards(data.metrics);
    updateConversionValues(data.metrics);
    updateCharts(data.charts);
}

// Update metric cards
function updateMetricCards(metrics) {
    // Update Market Percentile
    const marketPercentileEl = document.getElementById('marketPercentileValue');
    if (marketPercentileEl) {
        marketPercentileEl.textContent = metrics.marketPercentile;
    }
    
    // Update Inventory
    const inventoryEl = document.getElementById('inventoryValue');
    if (inventoryEl) {
        inventoryEl.textContent = metrics.inventory;
    }
    
    // Update inventory change
    const inventoryChangeEl = inventoryEl.nextElementSibling.querySelector('span');
    if (inventoryChangeEl) {
        const changeText = metrics.inventoryChange < 0 ? 
            `${metrics.inventoryChange}% decrease` : 
            `+${metrics.inventoryChange}% increase`;
        inventoryChangeEl.textContent = changeText;
        
        // Update change indicator class
        const changeDiv = inventoryEl.nextElementSibling;
        changeDiv.className = metrics.inventoryChange < 0 ? 'metric-card-change negative' : 'metric-card-change positive';
    }
    
    // Update Deal Rating
    const dealRatingEl = document.getElementById('dealRatingValue');
    if (dealRatingEl) {
        dealRatingEl.textContent = `${metrics.dealRating}%`;
    }

    // Update Inventory Summary
    const inventorySummaryEl = document.getElementById('inventorySummaryValue');
    if (inventorySummaryEl) {
        inventorySummaryEl.textContent = metrics.inventory;
    }

    // Update Merchandising Health
    const merchandisingEl = document.getElementById('merchandisingHealthValue');
    if (merchandisingEl) {
        merchandisingEl.textContent = `${metrics.merchandisingHealth}%`;
    }
}

// Update conversion values
function updateConversionValues(metrics) {
    // Update Conversion Rate
    const conversionRateEl = document.getElementById('conversionRateValue');
    if (conversionRateEl) {
        conversionRateEl.textContent = `${metrics.conversionRate}%`;
    }
    
    // Update Leads per Vehicle
    const leadsPerVehicleEl = document.getElementById('leadsPerVehicleValue');
    if (leadsPerVehicleEl) {
        leadsPerVehicleEl.textContent = metrics.leadsPerVehicle;
    }
    
    // Update Turn Time
    const turnTimeEl = document.getElementById('turnTimeValue');
    if (turnTimeEl) {
        turnTimeEl.textContent = `${metrics.turnTime} days`;
    }
}

// Update all charts
function updateCharts(chartData) {
    // Update Conversion Chart
    if (chartInstances.conversionChart) {
        chartInstances.conversionChart.data.datasets[0].data = chartData.conversion.yourData;
        chartInstances.conversionChart.data.datasets[1].data = chartData.conversion.marketData;
        chartInstances.conversionChart.update('active');
    }
    
    // Update Leads per Vehicle Chart
    if (chartInstances.leadsPerVehicleChart) {
        chartInstances.leadsPerVehicleChart.data.datasets[0].data = chartData.leadsPerVehicle.yourData;
        chartInstances.leadsPerVehicleChart.data.datasets[1].data = chartData.leadsPerVehicle.marketData;
        chartInstances.leadsPerVehicleChart.update('active');
    }
    
    // Update Turn Time Chart
    if (chartInstances.turnTimeChart) {
        chartInstances.turnTimeChart.data.datasets[0].data = chartData.turnTime.yourData;
        chartInstances.turnTimeChart.data.datasets[1].data = chartData.turnTime.marketData;
        chartInstances.turnTimeChart.update('active');
    }
    
    // Update Deal Rating Chart
    if (chartInstances.dealRatingChart) {
        // For now, keep the same data as it's a trend chart
        chartInstances.dealRatingChart.update('active');
    }
    
    // Update Inventory Summary Chart
    if (chartInstances.inventorySummaryChart) {
        // For now, keep the same data as it's a trend chart
        chartInstances.inventorySummaryChart.update('active');
    }
}