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
                label: 'Conversion Funnel',
                data: [10000, 2450, 162],
                backgroundColor: '#3B82F6',
                borderRadius: 4,
                barPercentage: 0.6
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
                        title: function(tooltipItems) {
                            return tooltipItems[0].label;
                        },
                        label: function(context) {
                            const value = context.parsed.y;
                            const label = context.label;
                            let lines = [];
                            
                            lines.push('Count: ' + value.toLocaleString());
                            
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
                data: [-5, 7, 16, -6, 11],
                backgroundColor: function(context) {
                    const value = context.dataset.data[context.dataIndex];
                    return value < 0 ? '#10B981' : '#DC2626';
                },
                borderRadius: 4,
                barPercentage: 0.6
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
                        text: 'Days from Target',
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
                            return value;
                        }
                    },
                    suggestedMin: -8,
                    suggestedMax: 24
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
                            const value = context.parsed.x;
                            const vehicleType = context.label;
                            const target = 30;
                            const actual = target + value;
                            const status = value < 0 ? 'Under target' : 'Over target';
                            
                            return [
                                vehicleType + ': ' + actual + ' days',
                                status + ' by ' + Math.abs(value) + ' days'
                            ];
                        }
                    }
                }
            }
        }
    });

    // Total leads Chart - Bar Chart (Last 6 months)
    const maxMileageCtx = document.getElementById('maxMileageChart').getContext('2d');
    new Chart(maxMileageCtx, {
        type: 'bar',
        data: {
            labels: ['May 2025', 'Jun 2025', 'Jul 2025', 'Aug 2025', 'Sep 2025', 'Oct 2025'],
            datasets: [{
                label: 'Total leads',
                data: [315, 308, 320, 285, 292, 270],
                backgroundColor: '#3B82F6',
                borderRadius: 4,
                barPercentage: 0.7,
                categoryPercentage: 0.8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
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
                        stepSize: 50
                    }
                }
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
                            return 'Leads: ' + context.parsed.y;
                        }
                    }
                }
            }
        },
        plugins: [{
            afterDatasetsDraw: function(chart) {
                const ctx = chart.ctx;
                chart.data.datasets.forEach(function(dataset, i) {
                    const meta = chart.getDatasetMeta(i);
                    meta.data.forEach(function(bar, index) {
                        const data = dataset.data[index];
                        ctx.fillStyle = '#111827';
                        ctx.font = 'bold 14px DM Sans';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'bottom';
                        ctx.fillText(data, bar.x, bar.y - 5);
                    });
                });
            }
        }]
    });
}