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

    // Inventory Mix Chart
    const inventoryMixCanvas = document.getElementById('inventoryMixChart');
    if (inventoryMixCanvas) {
        new Chart(inventoryMixCanvas, {
            type: 'bar',
            data: {
                labels: ['SUVs', 'Sedans', 'Trucks', 'Electric', 'Luxury', 'Economy'],
                datasets: [{
                    label: 'Your Inventory %',
                    data: [25, 32, 18, 12, 8, 5],
                    backgroundColor: '#6B8BF5',
                    borderRadius: 4,
                    barPercentage: 0.8,
                    categoryPercentage: 0.7
                }, {
                    label: 'Market Demand %',
                    data: [40, 20, 15, 15, 6, 4],
                    backgroundColor: '#9B7BB8',
                    borderRadius: 4,
                    barPercentage: 0.8,
                    categoryPercentage: 0.7
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom',
                        align: 'center',
                        labels: {
                            boxWidth: 15,
                            padding: 15,
                            font: {
                                size: 13,
                                weight: '500'
                            },
                            color: '#374151'
                        }
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
                                return context.dataset.label + ': ' + context.parsed.y + '%';
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
                        max: 45,
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
                                return value + '%';
                            },
                            stepSize: 5
                        }
                    }
                }
            }
        });
    }

    // Top Features Pie Chart
    const topFeaturesCanvas = document.getElementById('topFeaturesChart');
    if (topFeaturesCanvas) {
        new Chart(topFeaturesCanvas, {
            type: 'doughnut',
            data: {
                labels: ['Backup Camera', 'Alloy Wheels', 'Bluetooth', 'Heated Seats', 'CarPlay', 'Navigation System', 'Android Auto', 'Remote Start', 'Other'],
                datasets: [{
                    data: [18, 15, 14, 12, 10, 9, 8, 7, 7],
                    backgroundColor: [
                        '#3B82F6',
                        '#10B981',
                        '#F59E0B',
                        '#EF4444',
                        '#8B5CF6',
                        '#EC4899',
                        '#14B8A6',
                        '#F97316',
                        '#6B7280'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: 1.8,
                plugins: {
                    legend: {
                        display: true,
                        position: 'right',
                        align: 'center',
                        labels: {
                            boxWidth: 12,
                            padding: 8,
                            boxPadding: 20,
                            usePointStyle: false,
                            font: {
                                size: 11,
                                family: "'DM Sans', sans-serif"
                            },
                            color: '#374151',
                            generateLabels: function(chart) {
                                const data = chart.data;
                                if (data.labels.length && data.datasets.length) {
                                    return data.labels.map((label, i) => {
                                        const value = data.datasets[0].data[i];
                                        return {
                                            text: label + ' ' + value + '%',
                                            fillStyle: data.datasets[0].backgroundColor[i],
                                            strokeStyle: data.datasets[0].backgroundColor[i],
                                            lineWidth: 0,
                                            index: i
                                        };
                                    });
                                }
                                return [];
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        padding: 12,
                        cornerRadius: 6,
                        bodyFont: {
                            size: 14
                        },
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.parsed + '%';
                            }
                        }
                    }
                }
            }
        });
    }
}

// Direct test - initialize charts immediately when script loads

window.addEventListener('load', function() {
    console.log('Window loaded, looking for canvas...');
    const testCanvas = document.getElementById('inventoryMixChart');
    console.log('Canvas found:', testCanvas);
    
    if (testCanvas) {
        console.log('Creating inventory mix chart...');
        try {
            new Chart(testCanvas, {
                type: 'bar',
                data: {
                    labels: ['SUVs', 'Sedans', 'Trucks', 'Electric', 'Luxury', 'Economy'],
                    datasets: [{
                        label: 'Your Inventory %',
                        data: [25, 32, 18, 12, 8, 5],
                        backgroundColor: '#6B8BF5',
                        borderRadius: 4,
                        barPercentage: 0.8,
                        categoryPercentage: 0.7
                    }, {
                        label: 'Market Demand %',
                        data: [40, 20, 15, 15, 6, 4],
                        backgroundColor: '#9B7BB8',
                        borderRadius: 4,
                        barPercentage: 0.8,
                        categoryPercentage: 0.7
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: true,
                            position: 'bottom',
                            align: 'center',
                            labels: {
                                boxWidth: 15,
                                padding: 15,
                                font: {
                                    size: 13,
                                    weight: '500'
                                },
                                color: '#374151'
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 45,
                            ticks: {
                                callback: function(value) {
                                    return value + '%';
                                }
                            }
                        }
                    }
                }
            });
            console.log('Inventory mix chart created successfully!');
        } catch (error) {
            console.error('Error creating chart:', error);
        }
    } else {
        console.error('Canvas element not found!');
    }
    
    // Create Top Features chart
    const topFeaturesCanvas = document.getElementById('topFeaturesChart');
    if (topFeaturesCanvas) {
        console.log('Creating Top Features chart...');
        try {
            new Chart(topFeaturesCanvas, {
                type: 'doughnut',
                data: {
                    labels: ['Backup Camera', 'Alloy Wheels', 'Bluetooth', 'Heated Seats', 'CarPlay', 'Navigation System', 'Android Auto', 'Remote Start', 'Other'],
                    datasets: [{
                        data: [18, 15, 14, 12, 10, 9, 8, 7, 7],
                        backgroundColor: [
                            '#3B82F6',
                            '#10B981',
                            '#F59E0B',
                            '#EF4444',
                            '#8B5CF6',
                            '#EC4899',
                            '#14B8A6',
                            '#F97316',
                            '#6B7280'
                        ],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    aspectRatio: 1.8,
                    plugins: {
                        legend: {
                            display: true,
                            position: 'right',
                            align: 'center',
                            labels: {
                                boxWidth: 12,
                                padding: 8,
                            boxPadding: 20,
                                usePointStyle: false,
                                font: {
                                    size: 11,
                                    family: "'DM Sans', sans-serif"
                                },
                                color: '#374151',
                                generateLabels: function(chart) {
                                    const data = chart.data;
                                    if (data.labels.length && data.datasets.length) {
                                        return data.labels.map((label, i) => {
                                            const value = data.datasets[0].data[i];
                                            return {
                                                text: label + ' ' + value + '%',
                                                fillStyle: data.datasets[0].backgroundColor[i],
                                                strokeStyle: data.datasets[0].backgroundColor[i],
                                                lineWidth: 0,
                                                index: i
                                            };
                                        });
                                    }
                                    return [];
                                }
                            }
                        },
                        tooltip: {
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            padding: 12,
                            cornerRadius: 6,
                            bodyFont: {
                                size: 14
                            },
                            callbacks: {
                                label: function(context) {
                                    return context.label + ': ' + context.parsed + '%';
                                }
                            }
                        }
                    }
                }
            });
            console.log('Top Features chart created successfully!');
        } catch (error) {
            console.error('Error creating Top Features chart:', error);
        }
    }

    // Create Days on Market chart
    const daysCanvas = document.getElementById('daysOnMarketChart');
    if (daysCanvas) {
        console.log('Creating Days on Market chart...');
        try {
            new Chart(daysCanvas, {
                type: 'bar',
                data: {
                    labels: ['Luxury', 'Sedans', 'Economy', 'Trucks', 'SUVs', 'Electric'],
                    datasets: [{
                        label: 'Days on Market',
                        data: [58, 48, 42, 38, 35, 28],
                        backgroundColor: [
                            '#E06B6B',  // Luxury - reddish
                            '#E89A9A',  // Sedans - light red
                            '#F2B676',  // Economy - orange
                            '#F5D171',  // Trucks - yellow
                            '#6B8BF5',  // SUVs - blue
                            '#7DC383'   // Electric - green
                        ],
                        borderRadius: 0,
                        barPercentage: 0.7
                    }]
                },
                options: {
                    indexAxis: 'y',
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
                                    return context.parsed.x + ' days';
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            beginAtZero: true,
                            max: 60,
                            grid: {
                                color: '#E5E7EB',
                                drawBorder: false
                            },
                            border: {
                                display: false
                            },
                            ticks: {
                                font: {
                                    size: 12
                                },
                                color: '#6B7280',
                                stepSize: 10
                            },
                            title: {
                                display: true,
                                text: 'Days',
                                font: {
                                    size: 13
                                },
                                color: '#6B7280'
                            }
                        },
                        y: {
                            grid: {
                                display: false
                            },
                            ticks: {
                                font: {
                                    size: 13
                                },
                                color: '#374151'
                            }
                        }
                    }
                }
            });
            console.log('Days on Market chart created successfully!');
        } catch (error) {
            console.error('Error creating Days on Market chart:', error);
        }
    }
});