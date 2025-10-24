// Market Page JavaScript

// Initialize charts when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
});

function initializeCharts() {
    // Chart.js default options
    Chart.defaults.font.family = "'DM Sans', sans-serif";
    Chart.defaults.plugins.legend.display = false;
    
    // Search vs. Vehicle Type Chart
    const searchVsTypeCtx = document.getElementById('searchVsTypeChart').getContext('2d');
    new Chart(searchVsTypeCtx, {
        type: 'bar',
        data: {
            labels: ['SUV', 'Sedan', 'Truck', 'Coupe', 'Convertible', 'Wagon'],
            datasets: [{
                label: 'Your inventory',
                data: [2800, 3100, 1800, 1500, 600, 400],
                backgroundColor: '#3b82f6',
                borderRadius: 4,
                barPercentage: 0.5
            }, {
                label: 'Local market',
                data: [3200, 2800, 2400, 1200, 800, 600],
                backgroundColor: '#5E6976',
                borderRadius: 4,
                barPercentage: 0.5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            size: 12
                        }
                    }
                },
                y: {
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
                        }
                    }
                }
            },
            plugins: {
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 8,
                    cornerRadius: 4,
                    titleFont: {
                        size: 12
                    },
                    bodyFont: {
                        size: 12
                    },
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.formattedValue.toLocaleString();
                        }
                    }
                }
            }
        }
    });

    // Price vs. Search Chart
    const priceVsSearchCtx = document.getElementById('priceVsSearchChart').getContext('2d');
    new Chart(priceVsSearchCtx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Vehicles',
                data: [
                    {x: 15000, y: 450},
                    {x: 18000, y: 520},
                    {x: 20000, y: 680},
                    {x: 22000, y: 820},
                    {x: 25000, y: 950},
                    {x: 28000, y: 780},
                    {x: 30000, y: 650},
                    {x: 35000, y: 420},
                    {x: 40000, y: 280},
                    {x: 45000, y: 150},
                    {x: 50000, y: 80}
                ],
                backgroundColor: '#3B82F6',
                borderColor: '#3B82F6',
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Price ($)',
                        font: {
                            size: 12
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
                        callback: function(value) {
                            return '$' + (value / 1000) + 'k';
                        },
                        font: {
                            size: 11
                        }
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Search volume',
                        font: {
                            size: 12
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
                        }
                    }
                }
            },
            plugins: {
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 8,
                    cornerRadius: 4,
                    titleFont: {
                        size: 12
                    },
                    bodyFont: {
                        size: 12
                    },
                    callbacks: {
                        label: function(context) {
                            return 'Price: $' + context.parsed.x.toLocaleString() + ', Searches: ' + context.parsed.y;
                        }
                    }
                }
            }
        }
    });

    // Max Mileage Chart
    const maxMileageCtx = document.getElementById('maxMileageChart').getContext('2d');
    new Chart(maxMileageCtx, {
        type: 'line',
        data: {
            labels: ['< 30k', '30k-50k', '50k-70k', '70k-90k', '90k-110k', '> 110k'],
            datasets: [{
                label: 'Search volume',
                data: [1200, 2100, 2800, 2400, 1600, 800],
                borderColor: '#3B82F6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#3B82F6',
                pointBorderColor: '#3B82F6',
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            size: 11
                        }
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Search volume',
                        font: {
                            size: 12
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
                        }
                    }
                }
            },
            plugins: {
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 8,
                    cornerRadius: 4,
                    titleFont: {
                        size: 12
                    },
                    bodyFont: {
                        size: 12
                    },
                    callbacks: {
                        label: function(context) {
                            return 'Searches: ' + context.formattedValue.toLocaleString();
                        }
                    }
                }
            }
        }
    });
}