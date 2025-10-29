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

    // VDP Views Line Chart
    const vdpViewsCanvas = document.getElementById('vdpViewsLineChart');
    if (vdpViewsCanvas) {
        new Chart(vdpViewsCanvas, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'VDP Views',
                    data: [3200, 3500, 3800, 4100, 4500, 5200, 4800],
                    borderColor: '#3B82F6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#3B82F6',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 5,
                    pointHoverRadius: 7
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
                            size: 14,
                            weight: 'bold'
                        },
                        bodyFont: {
                            size: 14
                        },
                        callbacks: {
                            label: function(context) {
                                return 'Views: ' + context.parsed.y.toLocaleString();
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
                            font: {
                                size: 13
                            },
                            color: '#6B7280'
                        }
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: '#E5E7EB',
                            drawBorder: false
                        },
                        border: {
                            display: false
                        },
                        ticks: {
                            font: {
                                size: 13
                            },
                            color: '#6B7280',
                            callback: function(value) {
                                return value.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }
}

// Direct test - initialize VDP chart immediately when script loads
window.addEventListener('load', function() {
    console.log('Window loaded, looking for canvas...');
    const testCanvas = document.getElementById('vdpViewsLineChart');
    console.log('Canvas found:', testCanvas);
    
    if (testCanvas) {
        console.log('Creating chart...');
        try {
            new Chart(testCanvas, {
                type: 'line',
                data: {
                    labels: ['Oct 1', 'Oct 8', 'Oct 15', 'Oct 22', 'Oct 29'],
                    datasets: [{
                        label: 'VDP Views',
                        data: [4200, 4300, 4250, 4350, 4280],
                        borderColor: '#3B82F6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
            console.log('Chart created successfully!');
        } catch (error) {
            console.error('Error creating chart:', error);
        }
    } else {
        console.error('Canvas element not found!');
    }
    
    // Create Leads per Vehicle chart
    const leadsCanvas = document.getElementById('leadsPerVehicleChart');
    if (leadsCanvas) {
        console.log('Creating Leads per Vehicle chart...');
        try {
            new Chart(leadsCanvas, {
                type: 'line',
                data: {
                    labels: ['Oct 1', 'Oct 8', 'Oct 15', 'Oct 22', 'Oct 29'],
                    datasets: [{
                        label: 'Leads per Vehicle',
                        data: [1.8, 1.9, 1.7, 2.0, 1.8],
                        borderColor: '#10B981',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
            console.log('Leads per Vehicle chart created successfully!');
        } catch (error) {
            console.error('Error creating Leads per Vehicle chart:', error);
        }
    }
});