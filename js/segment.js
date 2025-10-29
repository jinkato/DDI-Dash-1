// Segment Page Logic - User Segment Analysis

// Define user segments with their metrics
const userSegments = [
    {
        id: 1,
        name: "Users Who Submitted a Lead",
        description: "Users who completed and submitted a lead form",
        logoColor: "#10B981",
        totalUsers: 1247,
        avgSessionDuration: "8:32",
        pagesPerSession: 12.4,
        priceRange: "$25K - $45K",
        maxMileage: "50K miles",
        topFeatures: "Navigation System, Backup Camera, Heated Seats, Sunroof, Park Assist",
        inventoryData: {
            'Compact': { thisLocation: 8, avgCompetitor: 5 },
            'Sedans': { thisLocation: 15, avgCompetitor: 8 },
            'SUV/CO': { thisLocation: 22, avgCompetitor: 9 },
            'Trucks': { thisLocation: 18, avgCompetitor: 15 },
            'Luxury': { thisLocation: 12, avgCompetitor: 12 }
        },
        pricingData: {
            'Great deal': { percent: 25 },
            'Good deal': { percent: 35 },
            'Fair deal': { percent: 28 },
            'High priced': { percent: 8 },
            'Over priced': { percent: 3 },
            'Uncertain': { percent: 1 }
        },
        engagementMetrics: {
            'VDP Views': 8.2,
            'Photos Viewed': 15.4,
            'Dealer Info Clicks': 3.1,
            'Map Views': 2.8,
            'Reviews Read': 4.5
        },
        demographics: {
            'Average Age': 42,
            'Male': 68,
            'Female': 28,
            'Other/Undisclosed': 4
        }
    },
    {
        id: 2,
        name: "Users Who Viewed but Did Not Submit",
        description: "Users who browsed but did not complete a lead form",
        logoColor: "#6B7280",
        totalUsers: 8953,
        avgSessionDuration: "3:45",
        pagesPerSession: 5.2,
        priceRange: "$15K - $35K",
        maxMileage: "75K miles",
        topFeatures: "Backup Camera, Bluetooth, Cruise Control, USB Port, Power Windows",
        inventoryData: {
            'Compact': { thisLocation: 5, avgCompetitor: 5 },
            'Sedans': { thisLocation: 9, avgCompetitor: 8 },
            'SUV/CO': { thisLocation: 11, avgCompetitor: 9 },
            'Trucks': { thisLocation: 8, avgCompetitor: 15 },
            'Luxury': { thisLocation: 6, avgCompetitor: 12 }
        },
        pricingData: {
            'Great deal': { percent: 12 },
            'Good deal': { percent: 18 },
            'Fair deal': { percent: 35 },
            'High priced': { percent: 22 },
            'Over priced': { percent: 10 },
            'Uncertain': { percent: 3 }
        },
        engagementMetrics: {
            'VDP Views': 3.1,
            'Photos Viewed': 6.8,
            'Dealer Info Clicks': 0.9,
            'Map Views': 0.5,
            'Reviews Read': 1.2
        },
        demographics: {
            'Average Age': 38,
            'Male': 62,
            'Female': 34,
            'Other/Undisclosed': 4
        }
    }
];

let charts = {};

// Build comparison table for segments
function buildComparisonTable() {
    const headerRow = document.getElementById('compare-header-row');
    const tbody = document.getElementById('compare-tbody');
    
    // Clear existing content
    headerRow.innerHTML = '<th class="metric-header">Metrics</th>';
    tbody.innerHTML = '';
    
    // Add segment columns to header
    userSegments.forEach(segment => {
        const th = document.createElement('th');
        th.className = 'dealer-header';
        th.innerHTML = `
            <div class="dealer-header-content">
                <div class="dealer-logo" style="background-color: ${segment.logoColor}">
                    <span style="color: white; font-weight: 600; font-size: 14px;">
                        ${segment.name.split(' ').map(word => word[0]).join('').substring(0, 3)}
                    </span>
                </div>
                <div class="dealer-info">
                    <div class="dealer-name">${segment.name}</div>
                    <div class="dealer-details">${segment.description}</div>
                </div>
            </div>
        `;
        headerRow.appendChild(th);
    });
    
    // Define metrics to display
    const metrics = [
        { 
            category: 'Overview',
            items: [
                { label: 'Total Users', key: 'totalUsers', format: 'number' },
                { label: 'Avg Session Duration', key: 'avgSessionDuration', format: 'text' },
                { label: 'Pages per Session', key: 'pagesPerSession', format: 'decimal' },
                { label: 'Price Range', key: 'priceRange', format: 'text' },
                { label: 'Max Mileage', key: 'maxMileage', format: 'text' },
                { label: 'Top Features', key: 'topFeatures', format: 'text' }
            ]
        },
        {
            category: 'Engagement Metrics',
            items: [
                { label: 'VDP Views', key: 'engagementMetrics.VDP Views', format: 'decimal' },
                { label: 'Photos Viewed', key: 'engagementMetrics.Photos Viewed', format: 'decimal' },
                { label: 'Dealer Info Clicks', key: 'engagementMetrics.Dealer Info Clicks', format: 'decimal' },
                { label: 'Map Views', key: 'engagementMetrics.Map Views', format: 'decimal' },
                { label: 'Reviews Read', key: 'engagementMetrics.Reviews Read', format: 'decimal' }
            ]
        },
        {
            category: 'Demographic',
            items: [
                { label: 'Average Age', key: 'demographics.Average Age', format: 'number' },
                { label: 'Male', key: 'demographics.Male', format: 'percentage' },
                { label: 'Female', key: 'demographics.Female', format: 'percentage' },
                { label: 'Other/Undisclosed', key: 'demographics.Other/Undisclosed', format: 'percentage' }
            ]
        }
    ];
    
    // Add descriptive header row
    const descriptiveRow = document.createElement('tr');
    descriptiveRow.className = 'segment-description-row';
    
    // First cell is empty (aligns with "Metrics" column)
    const emptyCell = document.createElement('td');
    emptyCell.className = 'segment-description-label';
    descriptiveRow.appendChild(emptyCell);
    
    // Add description cells for each segment
    const segment1Cell = document.createElement('td');
    segment1Cell.className = 'segment-description-cell';
    segment1Cell.textContent = 'Buyers who submitted a lead';
    descriptiveRow.appendChild(segment1Cell);
    
    const segment2Cell = document.createElement('td');
    segment2Cell.className = 'segment-description-cell';
    segment2Cell.textContent = 'Users who viewed your VDP but did not submit a lead';
    descriptiveRow.appendChild(segment2Cell);
    
    tbody.appendChild(descriptiveRow);
    
    // Build rows for each metric category
    metrics.forEach(category => {
        // Add category header row
        const categoryRow = document.createElement('tr');
        categoryRow.className = 'category-row';
        categoryRow.innerHTML = `
            <td colspan="${userSegments.length + 1}" class="category-header">
                <div class="category-header-content">
                    <svg class="category-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                    <span>${category.category}</span>
                </div>
            </td>
        `;
        tbody.appendChild(categoryRow);
        
        // Add metric rows
        category.items.forEach(metric => {
            const row = document.createElement('tr');
            row.className = 'metric-row';
            
            // Metric label cell
            const labelCell = document.createElement('td');
            labelCell.className = 'metric-label';
            labelCell.textContent = metric.label;
            row.appendChild(labelCell);
            
            // Value cells for each segment
            userSegments.forEach((segment, index) => {
                const valueCell = document.createElement('td');
                valueCell.className = 'metric-value';
                
                const value = getMetricValue(segment, metric.key, index);
                
                switch(metric.format) {
                    case 'number':
                        valueCell.textContent = value.toLocaleString();
                        break;
                    case 'decimal':
                        valueCell.textContent = value.toFixed(1);
                        break;
                    case 'percentage':
                        valueCell.textContent = value + '%';
                        break;
                    case 'text':
                        valueCell.textContent = value;
                        break;
                    case 'chart':
                        const chartId = `chart-${metric.key.replace(/\./g, '-')}-${index}`;
                        valueCell.innerHTML = `<canvas id="${chartId}" width="120" height="60"></canvas>`;
                        row.appendChild(valueCell);
                        
                        // Create chart after DOM is updated
                        setTimeout(() => {
                            createBarChart(segment, metric.key, chartId);
                        }, 0);
                        return;
                    case 'percentage-bar':
                        const percent = value.percent;
                        valueCell.innerHTML = `
                            <div class="percentage-bar-container">
                                <div class="percentage-bar" style="width: ${percent}%"></div>
                                <span class="percentage-text">${percent}%</span>
                            </div>
                        `;
                        break;
                }
                
                row.appendChild(valueCell);
            });
            
            tbody.appendChild(row);
        });
    });
    
    // Initialize collapsible sections
    initializeCollapsibleSections();
}

// Get metric value from segment data
function getMetricValue(segment, key, segmentIndex) {
    const keys = key.split('.');
    let value = segment;
    
    for (let k of keys) {
        if (value && value.hasOwnProperty(k)) {
            value = value[k];
        } else {
            return 'N/A';
        }
    }
    
    return value;
}

// Initialize collapsible sections
function initializeCollapsibleSections() {
    const categoryRows = document.querySelectorAll('.category-row');
    
    categoryRows.forEach(categoryRow => {
        categoryRow.style.cursor = 'pointer';
        
        categoryRow.addEventListener('click', function() {
            const icon = this.querySelector('.category-icon');
            let nextRow = this.nextElementSibling;
            
            // Toggle icon rotation
            icon.classList.toggle('rotated');
            
            // Toggle visibility of metric rows in this category
            while (nextRow && nextRow.classList.contains('metric-row')) {
                nextRow.classList.toggle('hidden');
                nextRow = nextRow.nextElementSibling;
            }
        });
    });
}

// Create bar chart for vehicle interest
function createBarChart(segment, metricKey, chartId) {
    const canvas = document.getElementById(chartId);
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const keys = metricKey.split('.');
    let data = segment;
    
    for (let k of keys) {
        if (data && data.hasOwnProperty(k)) {
            data = data[k];
        } else {
            return;
        }
    }
    
    if (!data || typeof data !== 'object') return;
    
    const thisLocationValue = data.thisLocation || 0;
    const avgCompetitorValue = data.avgCompetitor || 0;
    
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['This Segment', 'Other Segment'],
            datasets: [{
                data: [thisLocationValue, avgCompetitorValue],
                backgroundColor: [
                    segment.logoColor,
                    '#E5E7EB'
                ],
                borderRadius: 4,
                barThickness: 20
            }]
        },
        options: {
            responsive: false,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: true,
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 8,
                    displayColors: false,
                    callbacks: {
                        title: function() {
                            return '';
                        },
                        label: function(context) {
                            return context.parsed.y + ' views';
                        }
                    }
                }
            },
            scales: {
                x: {
                    display: false,
                    grid: {
                        display: false
                    }
                },
                y: {
                    display: false,
                    beginAtZero: true,
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
    
    charts[chartId] = chart;
}

// Build comparison table on page load
buildComparisonTable();
