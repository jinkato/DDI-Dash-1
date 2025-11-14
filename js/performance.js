// Performance Page JavaScript

// Initialize charts when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
});

function initializeCharts() {
    // Chart.js default options
    Chart.defaults.font.family = "'DM Sans', sans-serif";
    Chart.defaults.plugins.legend.display = false;
    
    // Conversion Funnel Chart - Horizontal Bar
    const searchVsTypeCtx = document.getElementById('searchVsTypeChart').getContext('2d');
    new Chart(searchVsTypeCtx, {
        type: 'bar',
        data: {
            labels: ['Search Result Pages (SRP)', 'Vehicle Detail Pages (VDP)', 'Leads Generated'],
            datasets: [{
                label: 'Your Dealership',
                data: [10000, 2450, 162],
                backgroundColor: '#3B82F6',
                borderRadius: 4,
                barPercentage: 0.8
            }, {
                label: 'Market Average',
                data: [10000, 2450, 145], // Market average conversion rate of 1.45%
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
                            return value.toLocaleString();
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
                            const value = context.parsed.y;
                            const label = context.label;
                            const datasetLabel = context.dataset.label;
                            let lines = [];
                            
                            lines.push(datasetLabel + ': ' + value.toLocaleString());
                            
                            if (datasetLabel === 'Your Dealership') {
                                if (label === 'Search Result Pages (SRP)') {
                                    lines.push('Starting point: 100%');
                                } else if (label === 'Vehicle Detail Pages (VDP)') {
                                    lines.push('Conversion from SRP: 24.5%');
                                    lines.push('Drop-off: 7,550 (75.5%)');
                                } else if (label === 'Leads Generated') {
                                    lines.push('Conversion from VDP: 6.6%');
                                    lines.push('Conversion from SRP: 1.62%');
                                    lines.push('Drop-off from VDP: 2,288 (93.4%)');
                                }
                            } else if (datasetLabel === 'Market Average') {
                                if (label === 'Leads Generated') {
                                    lines.push('Conversion from SRP: 1.45%');
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
    new Chart(priceVsSearchCtx, {
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
    new Chart(leadsPerVehicleCtx, {
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
                data: [3.1, 3.1, 3.1, 3.1, 3.1, 3.1],
                backgroundColor: '#9CA3AF',
                borderColor: '#9CA3AF',
                borderWidth: 2,
                borderDash: [5, 5],
                tension: 0,
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
    new Chart(dealRatingCtx, {
        type: 'line',
        data: {
            labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
            datasets: [{
                label: 'Your Dealership',
                data: [85, 84.5, 84, 83.5, 83, 82],
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
                data: [78, 78, 78, 78, 78, 78],
                backgroundColor: 'transparent',
                borderColor: '#9CA3AF',
                borderWidth: 2,
                borderDash: [5, 5],
                tension: 0,
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
                    min: 75,
                    max: 90,
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

    // Inventory Count Chart - Small Bar Chart
    const inventoryCountCtx = document.getElementById('inventoryCountChart').getContext('2d');
    new Chart(inventoryCountCtx, {
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
                            return 'Inventory: ' + context.parsed.y + ' vehicles';
                        },
                        afterLabel: function(context) {
                            const monthIndex = context.dataIndex;
                            const previousValue = monthIndex > 0 ? context.dataset.data[monthIndex - 1] : context.parsed.y;
                            const change = context.parsed.y - previousValue;
                            const changePercent = ((change / previousValue) * 100).toFixed(1);
                            
                            if (change !== 0) {
                                return 'Change: ' + (change > 0 ? '+' : '') + change + ' (' + (change > 0 ? '+' : '') + changePercent + '%)';
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
                    min: 200,
                    max: 350,
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
                        stepSize: 50
                    }
                },
                marketAverage: {
                    type: 'linear',
                    display: false,
                    position: 'right',
                    min: 200,
                    max: 350
                }
            },
            // Custom plugin to draw market average line
            plugins: {
                annotation: {
                    annotations: {
                        line1: {
                            type: 'line',
                            yMin: 312,
                            yMax: 312,
                            borderColor: '#9CA3AF',
                            borderWidth: 2,
                            borderDash: [5, 5],
                            label: {
                                display: false
                            }
                        }
                    }
                }
            }
        },
        plugins: [{
            // Custom plugin to draw the market average line
            afterDraw: function(chart) {
                const ctx = chart.ctx;
                const yScale = chart.scales.y;
                const xScale = chart.scales.x;
                const marketAvg = 312;
                
                // Calculate y position for market average
                const y = yScale.getPixelForValue(marketAvg);
                
                // Draw dashed line
                ctx.save();
                ctx.beginPath();
                ctx.setLineDash([5, 5]);
                ctx.strokeStyle = '#9CA3AF';
                ctx.lineWidth = 2;
                ctx.moveTo(xScale.left, y);
                ctx.lineTo(xScale.right, y);
                ctx.stroke();
                ctx.restore();
            }
        }]
    });
}