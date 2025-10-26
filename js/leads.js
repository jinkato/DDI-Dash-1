// Competitive Performance Analysis with Timeline Scrubber

// Configuration
const vehicleTypes = ["SUV", "Sedan", "Truck", "Coupe", "Wagon"];
const dealRatings = ["Great Deal", "Good Deal", "Fair Deal", "High-Priced", "Over-Priced"];

// Generate 6 months of competitive data
const months = [
    { value: "2024-05", label: "May 2024" },
    { value: "2024-06", label: "Jun 2024" },
    { value: "2024-07", label: "Jul 2024" },
    { value: "2024-08", label: "Aug 2024" },
    { value: "2024-09", label: "Sep 2024" },
    { value: "2024-10", label: "Oct 2024" }
];

// Generate comprehensive competitive data
const competitiveData = generateCompetitiveData();

// Current month index (start with most recent)
let currentMonthIndex = 5;
let bubbleChart = null;
let timelineChart = null;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeCompetitiveChart();
    setupTimelineScrubber();
    setupEventListeners();
    addChartLegend();
});

function generateCompetitiveData() {
    const data = [];
    const dealerNames = ["Valley Motors", "Downtown Auto", "City Cars", "Metro Dealers", "Highway Auto Mall", "Premium Motors", "Budget Cars"];
    
    // Generate data for each month
    months.forEach((month, monthIndex) => {
        const segments = [];
        
        // SUV segments with evolving performance
        segments.push({
            vehicleType: "SUV",
            dealRating: "Great Deal",
            condition: "New",
            crossShoppingVolume: 450 - (monthIndex * 40),
            vehicleInventory: 45 + (monthIndex * 3),
            yourWinRate: 0.35 - (monthIndex * 0.04),
            fairShare: 0.20,
            competingDealers: 5,
            topCompetitors: [
                { name: "Valley Motors", winRate: 0.28 + (monthIndex * 0.03) },
                { name: "Downtown Auto", winRate: 0.22 },
                { name: "City Cars", winRate: 0.15 - (monthIndex * 0.01) }
            ],
            newCompetitors: monthIndex === 3 ? ["Metro Dealers"] : [],
            insights: {
                avgTimeOnYourListings: "4.2 minutes",
                avgTimeOnCompetitorListings: "3.8 minutes",
                trends: monthIndex > 3 ? "Losing ground to Valley Motors" : "Stable performance"
            },
            shopperBreakdown: [
                {
                    percentage: 45,
                    shopperType: "Budget-conscious families",
                    behavior: "Quick decision makers, 3-5 day cycle",
                    priorities: ["Price", "Safety ratings", "Fuel efficiency"],
                    keyMetrics: "3.8 leads/vehicle, high email engagement",
                    insight: "Fast converters drive high win rate"
                },
                {
                    percentage: 35,
                    shopperType: "Feature seekers",
                    behavior: "Compare 5-6 vehicles, tech focused",
                    priorities: ["Technology", "Comfort", "Brand reputation"],
                    keyMetrics: "2.5 leads/vehicle, weekend shoppers",
                    insight: "Moderate conversion, price sensitive"
                },
                {
                    percentage: 20,
                    shopperType: "Urgent buyers",
                    behavior: "Need vehicle within 1 week",
                    priorities: ["Availability", "Quick financing"],
                    keyMetrics: "5.2 leads/vehicle, high close rate",
                    insight: "High urgency drives quick decisions"
                }
            ]
        });
        
        segments.push({
            vehicleType: "SUV",
            dealRating: "Good Deal",
            condition: "Used",
            crossShoppingVolume: 380 + (monthIndex * 30),
            vehicleInventory: 65 - (monthIndex * 2),
            yourWinRate: 0.25 + (monthIndex * 0.03),
            fairShare: 0.25,
            competingDealers: 4,
            topCompetitors: [
                { name: "City Cars", winRate: 0.30 - (monthIndex * 0.02) },
                { name: "Valley Motors", winRate: 0.25 },
                { name: "Budget Cars", winRate: 0.20 }
            ],
            newCompetitors: [],
            insights: {
                avgTimeOnYourListings: "3.5 minutes",
                avgTimeOnCompetitorListings: "4.1 minutes",
                trends: "Gradually improving performance"
            },
            shopperBreakdown: []
        });
        
        // Sedan segments showing improvement
        segments.push({
            vehicleType: "Sedan",
            dealRating: "Great Deal",
            condition: "CPO",
            crossShoppingVolume: 320,
            vehicleInventory: 32 + (monthIndex * 2),
            yourWinRate: 0.28 + (monthIndex * 0.05),
            fairShare: 0.25,
            competingDealers: 4,
            topCompetitors: [
                { name: "Downtown Auto", winRate: 0.35 - (monthIndex * 0.04) },
                { name: "Metro Dealers", winRate: 0.22 },
                { name: "Valley Motors", winRate: 0.15 }
            ],
            newCompetitors: [],
            insights: {
                avgTimeOnYourListings: "5.1 minutes",
                avgTimeOnCompetitorListings: "4.5 minutes",
                trends: "Gaining market share steadily"
            },
            shopperBreakdown: [
                {
                    percentage: 55,
                    shopperType: "Commuters",
                    behavior: "Fuel economy focused, practical",
                    priorities: ["MPG", "Reliability", "Price"],
                    keyMetrics: "2.8 leads/vehicle",
                    insight: "Strong conversion on fuel-efficient models"
                },
                {
                    percentage: 45,
                    shopperType: "Urban professionals",
                    behavior: "Style and tech focused",
                    priorities: ["Design", "Technology", "Brand"],
                    keyMetrics: "3.2 leads/vehicle",
                    insight: "Higher engagement with premium features"
                }
            ]
        });
        
        segments.push({
            vehicleType: "Sedan",
            dealRating: "Good Deal",
            condition: "Used",
            crossShoppingVolume: 280 - (monthIndex * 25),
            vehicleInventory: 48,
            yourWinRate: 0.22 - (monthIndex * 0.03),
            fairShare: 0.20,
            competingDealers: 5,
            topCompetitors: [
                { name: "City Cars", winRate: 0.24 + (monthIndex * 0.01) },
                { name: "Budget Cars", winRate: 0.23 },
                { name: "Downtown Auto", winRate: 0.21 }
            ],
            newCompetitors: [],
            insights: {
                avgTimeOnYourListings: "3.8 minutes",
                avgTimeOnCompetitorListings: "3.9 minutes",
                trends: "Losing ground to City Cars"
            },
            shopperBreakdown: []
        });
        
        // Truck segments with strong performance
        segments.push({
            vehicleType: "Truck",
            dealRating: "Great Deal",
            condition: "New",
            crossShoppingVolume: 420 + (monthIndex * 35),
            vehicleInventory: 55 + (monthIndex * 4),
            yourWinRate: 0.40 - (monthIndex * 0.05),
            fairShare: 0.25,
            competingDealers: 4,
            topCompetitors: [
                { name: "Highway Auto Mall", winRate: 0.30 + (monthIndex * 0.015) },
                { name: "Valley Motors", winRate: 0.20 },
                { name: "Metro Dealers", winRate: 0.10 }
            ],
            newCompetitors: [],
            insights: {
                avgTimeOnYourListings: "6.2 minutes",
                avgTimeOnCompetitorListings: "4.8 minutes",
                trends: "Highway Auto Mall gaining ground"
            },
            shopperBreakdown: [
                {
                    percentage: 60,
                    shopperType: "Work truck buyers",
                    behavior: "Spec-driven, know what they want",
                    priorities: ["Towing capacity", "Reliability", "Price"],
                    keyMetrics: "4.5 leads/vehicle",
                    insight: "High conversion on work-ready models"
                },
                {
                    percentage: 40,
                    shopperType: "Lifestyle buyers",
                    behavior: "Feature and comfort focused",
                    priorities: ["Technology", "Comfort", "Appearance"],
                    keyMetrics: "3.2 leads/vehicle",
                    insight: "Growing segment with good margins"
                }
            ]
        });
        
        segments.push({
            vehicleType: "Truck",
            dealRating: "Good Deal",
            condition: "Used",
            crossShoppingVolume: 350 - (monthIndex * 20),
            vehicleInventory: 72 - (monthIndex * 3),
            yourWinRate: 0.35 + (monthIndex * 0.04),
            fairShare: 0.20,
            competingDealers: 5,
            topCompetitors: [
                { name: "Highway Auto Mall", winRate: 0.25 },
                { name: "Valley Motors", winRate: 0.20 - (monthIndex * 0.01) },
                { name: "City Cars", winRate: 0.10 }
            ],
            newCompetitors: monthIndex === 4 ? ["Premium Motors"] : [],
            insights: {
                avgTimeOnYourListings: "5.5 minutes",
                avgTimeOnCompetitorListings: "4.9 minutes",
                trends: "Improving win rate despite lower volume"
            },
            shopperBreakdown: []
        });
        
        // Coupe segments with variable performance
        segments.push({
            vehicleType: "Coupe",
            dealRating: "Great Deal",
            condition: "CPO",
            crossShoppingVolume: 180 - (monthIndex * 20),
            vehicleInventory: 15 + (monthIndex * 1),
            yourWinRate: 0.30 - (monthIndex * 0.06),
            fairShare: 0.33,
            competingDealers: 3,
            topCompetitors: [
                { name: "Premium Motors", winRate: 0.40 + (monthIndex * 0.05) },
                { name: "Downtown Auto", winRate: 0.30 }
            ],
            newCompetitors: [],
            insights: {
                avgTimeOnYourListings: "4.8 minutes",
                avgTimeOnCompetitorListings: "5.2 minutes",
                trends: "Losing to Premium Motors' inventory"
            },
            shopperBreakdown: [
                {
                    percentage: 70,
                    shopperType: "Enthusiasts",
                    behavior: "Performance focused, brand loyal",
                    priorities: ["Performance", "Style", "Brand heritage"],
                    keyMetrics: "3.5 leads/vehicle",
                    insight: "Need stronger performance inventory"
                },
                {
                    percentage: 30,
                    shopperType: "Image buyers",
                    behavior: "Status and style focused",
                    priorities: ["Appearance", "Brand", "Features"],
                    keyMetrics: "2.2 leads/vehicle",
                    insight: "Price sensitive on premium models"
                }
            ]
        });
        
        // Wagon - limited data
        segments.push({
            vehicleType: "Wagon",
            dealRating: "Good Deal",
            condition: "Used",
            crossShoppingVolume: 80,
            vehicleInventory: 8,
            yourWinRate: 0.25,
            fairShare: 0.50,
            competingDealers: 2,
            topCompetitors: [
                { name: "Downtown Auto", winRate: 0.75 }
            ],
            newCompetitors: [],
            insights: {
                avgTimeOnYourListings: "3.2 minutes",
                avgTimeOnCompetitorListings: "4.5 minutes",
                trends: "Limited inventory affecting performance"
            },
            shopperBreakdown: []
        });
        
        // Add more segments for other combinations...
        segments.push({
            vehicleType: "SUV",
            dealRating: "Fair Deal",
            condition: "New",
            crossShoppingVolume: 220 + (monthIndex * 30),
            vehicleInventory: 38 - (monthIndex * 1),
            yourWinRate: 0.18 + (monthIndex * 0.04),
            fairShare: 0.20,
            competingDealers: 5,
            topCompetitors: [
                { name: "Budget Cars", winRate: 0.35 - (monthIndex * 0.02) },
                { name: "City Cars", winRate: 0.22 },
                { name: "Valley Motors", winRate: 0.15 }
            ],
            newCompetitors: [],
            insights: {
                avgTimeOnYourListings: "2.8 minutes",
                avgTimeOnCompetitorListings: "3.5 minutes",
                trends: "Gaining market share from Budget Cars"
            },
            shopperBreakdown: []
        });
        
        segments.push({
            vehicleType: "Sedan",
            dealRating: "Fair Deal",
            condition: "Used",
            crossShoppingVolume: 150 + (monthIndex * 20),
            vehicleInventory: 28 + (monthIndex * 1),
            yourWinRate: 0.15 - (monthIndex * 0.02),
            fairShare: 0.25,
            competingDealers: 4,
            topCompetitors: [
                { name: "Budget Cars", winRate: 0.40 + (monthIndex * 0.02) },
                { name: "City Cars", winRate: 0.25 },
                { name: "Metro Dealers", winRate: 0.20 - (monthIndex * 0.01) }
            ],
            newCompetitors: [],
            insights: {
                avgTimeOnYourListings: "2.5 minutes",
                avgTimeOnCompetitorListings: "3.2 minutes",
                trends: "Budget Cars dominating this segment"
            },
            shopperBreakdown: []
        });
        
        segments.push({
            vehicleType: "Truck",
            dealRating: "Fair Deal",
            condition: "CPO",
            crossShoppingVolume: 180 - (monthIndex * 15),
            vehicleInventory: 42,
            yourWinRate: 0.28 - (monthIndex * 0.03),
            fairShare: 0.25,
            competingDealers: 4,
            topCompetitors: [
                { name: "Highway Auto Mall", winRate: 0.32 + (monthIndex * 0.01) },
                { name: "Valley Motors", winRate: 0.25 },
                { name: "Budget Cars", winRate: 0.15 }
            ],
            newCompetitors: [],
            insights: {
                avgTimeOnYourListings: "4.1 minutes",
                avgTimeOnCompetitorListings: "4.0 minutes",
                trends: "Declining performance over time"
            },
            shopperBreakdown: []
        });
        
        data.push({
            month: month.value,
            segments: segments
        });
    });
    
    return data;
}

function initializeCompetitiveChart() {
    const ctx = document.getElementById('competitiveBubbleChart');
    
    if (!ctx) {
        console.error('Canvas element not found');
        return;
    }
    
    // Get current month data
    const currentData = competitiveData[currentMonthIndex].segments;
    
    // Transform data for Chart.js
    const chartData = currentData.map(segment => {
        const x = vehicleTypes.indexOf(segment.vehicleType);
        const y = dealRatings.indexOf(segment.dealRating);
        
        // Scale bubble size based on vehicle inventory
        const inventory = segment.vehicleInventory || 0;
        const maxInventory = Math.max(...currentData.map(s => s.vehicleInventory || 0));
        const minInventory = Math.min(...currentData.filter(s => (s.vehicleInventory || 0) > 0).map(s => s.vehicleInventory));
        
        // Use a more linear scale for inventory since the range is smaller
        const scaleFactor = 40 / Math.sqrt(maxInventory);
        let radius = Math.sqrt(inventory) * scaleFactor;
        radius = Math.max(radius, 12); // Minimum size for visibility
        
        return {
            x: x,
            y: y,
            r: radius,
            originalData: segment
        };
    });
    
    // Plugin to draw win rate labels in bubbles
    const bubbleLabelsPlugin = {
        id: 'bubbleLabels',
        afterDatasetsDraw: function(chart) {
            const ctx = chart.ctx;
            
            chart.data.datasets.forEach((dataset, datasetIndex) => {
                const meta = chart.getDatasetMeta(datasetIndex);
                
                meta.data.forEach((element, index) => {
                    const data = dataset.data[index];
                    const winRate = data.originalData.yourWinRate;
                    const radius = element.options.radius;
                    
                    if (radius > 10) {
                        ctx.save();
                        
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        ctx.font = 'bold 12px DM Sans';
                        
                        // Use white text for dark bubbles, dark for light
                        const color = getCompetitiveColor(winRate, data.originalData.fairShare);
                        const rgb = color.match(/\d+/g);
                        const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;
                        ctx.fillStyle = brightness > 128 ? '#0D1722' : '#FFFFFF';
                        
                        // Draw win rate percentage
                        ctx.fillText(`${Math.round(winRate * 100)}%`, element.x, element.y);
                        
                        ctx.restore();
                    }
                });
            });
        }
    };
    
    // Create chart
    bubbleChart = new Chart(ctx, {
        type: 'bubble',
        plugins: [bubbleLabelsPlugin],
        data: {
            datasets: [{
                label: 'Competitive Performance',
                data: chartData,
                backgroundColor: chartData.map(d => getCompetitiveColor(d.originalData.yourWinRate, d.originalData.fairShare)),
                borderWidth: 0,
                hoverBorderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 500
            },
            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0
                }
            },
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    min: -0.5,
                    max: 4.5,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)',
                        lineWidth: 1,
                        drawTicks: false
                    },
                    afterBuildTicks: function(axis) {
                        axis.ticks = [0, 1, 2, 3, 4].map(i => ({ value: i }));
                    },
                    ticks: {
                        display: true,
                        autoSkip: false,
                        callback: function(value) {
                            return vehicleTypes[value] || '';
                        },
                        font: {
                            size: 14,
                            weight: '500'
                        },
                        color: '#111827',
                        padding: 10
                    }
                },
                y: {
                    type: 'linear',
                    min: -0.5,
                    max: 4.5,
                    reverse: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)',
                        lineWidth: 1,
                        drawTicks: false
                    },
                    afterBuildTicks: function(axis) {
                        axis.ticks = [0, 1, 2, 3, 4].map(i => ({ value: i }));
                    },
                    ticks: {
                        display: true,
                        autoSkip: false,
                        callback: function(value) {
                            return dealRatings[value] || '';
                        },
                        font: {
                            size: 14,
                            weight: '500'
                        },
                        color: '#111827',
                        padding: 10
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const data = context.raw.originalData;
                            const performanceVsFair = ((data.yourWinRate / data.fairShare - 1) * 100).toFixed(0);
                            const sign = performanceVsFair > 0 ? '+' : '';
                            
                            return [
                                `${data.vehicleType} - ${data.dealRating}`,
                                `Condition: ${data.condition || 'N/A'}`,
                                `Vehicle Inventory: ${data.vehicleInventory || 0} units`,
                                `Win Rate: ${(data.yourWinRate * 100).toFixed(0)}%`,
                                `Fair Share: ${(data.fairShare * 100).toFixed(0)}%`,
                                `Performance: ${sign}${performanceVsFair}% vs fair share`,
                                `Cross-shopping: ${data.crossShoppingVolume} instances`
                            ];
                        }
                    }
                }
            },
            onClick: function(event, elements) {
                if (elements.length > 0) {
                    const index = elements[0].index;
                    const data = chartData[index].originalData;
                    showCompetitiveDetailPanel(data);
                }
            },
            onHover: function(event, elements) {
                ctx.style.cursor = elements.length > 0 ? 'pointer' : 'default';
            }
        }
    });
}

function getCompetitiveColor(winRate, fairShare, forBorder = false) {
    const performance = winRate / fairShare;
    
    if (performance >= 1.05) {
        // Winning - Green
        return forBorder ? '#059669' : '#10B981';
    } else if (performance >= 0.95) {
        // Near fair share - Yellow/Orange
        return forBorder ? '#D97706' : '#F59E0B';
    } else {
        // Losing - Red
        return forBorder ? '#DC2626' : '#EF4444';
    }
}

function setupTimelineScrubber() {
    const labelsContainer = document.getElementById('timelineLabels');
    const currentMonthLabel = document.getElementById('currentMonthLabel');
    const prevButton = document.getElementById('prevMonth');
    const nextButton = document.getElementById('nextMonth');
    
    // Create timeline labels
    months.forEach((month, index) => {
        const label = document.createElement('div');
        label.className = 'timeline-label';
        label.textContent = month.label.substring(0, 3); // Short month name
        if (index === currentMonthIndex) {
            label.classList.add('active');
        }
        
        // Make labels clickable
        label.addEventListener('click', function() {
            currentMonthIndex = index;
            updateChartForMonth(index);
            updateTimelineLabels();
            updateNavigationButtons();
        });
        
        label.style.cursor = 'pointer';
        labelsContainer.appendChild(label);
    });
    
    // Handle navigation arrows
    prevButton.addEventListener('click', function() {
        if (currentMonthIndex > 0) {
            currentMonthIndex--;
            updateChartForMonth(currentMonthIndex);
            updateTimelineLabels();
            updateNavigationButtons();
        }
    });
    
    nextButton.addEventListener('click', function() {
        if (currentMonthIndex < months.length - 1) {
            currentMonthIndex++;
            updateChartForMonth(currentMonthIndex);
            updateTimelineLabels();
            updateNavigationButtons();
        }
    });
    
    // Initialize button states
    updateNavigationButtons();
}

function updateNavigationButtons() {
    const prevButton = document.getElementById('prevMonth');
    const nextButton = document.getElementById('nextMonth');
    
    // Disable/enable buttons based on current position
    prevButton.disabled = currentMonthIndex === 0;
    nextButton.disabled = currentMonthIndex === months.length - 1;
}


function updateChartForMonth(monthIndex) {
    const currentMonthLabel = document.getElementById('currentMonthLabel');
    currentMonthLabel.textContent = months[monthIndex].label;
    
    // Apply current vehicle condition filter
    const vehicleConditionFilter = document.getElementById('vehicle-condition');
    const selectedCondition = vehicleConditionFilter ? vehicleConditionFilter.value : 'All';
    
    let newData = competitiveData[monthIndex].segments;
    
    // Filter data if a specific condition is selected
    if (selectedCondition !== 'All') {
        newData = newData.filter(segment => segment.condition === selectedCondition);
    }
    
    updateChartWithData(newData);
}

function updateChartWithData(segmentData) {
    // Transform data
    const chartData = segmentData.map(segment => {
        const x = vehicleTypes.indexOf(segment.vehicleType);
        const y = dealRatings.indexOf(segment.dealRating);
        
        // Scale bubble size based on vehicle inventory
        const inventory = segment.vehicleInventory || 0;
        const maxInventory = Math.max(...segmentData.map(s => s.vehicleInventory || 0));
        const scaleFactor = 40 / Math.sqrt(maxInventory);
        let radius = Math.sqrt(inventory) * scaleFactor;
        radius = Math.max(radius, 12); // Minimum size for visibility
        
        return {
            x: x,
            y: y,
            r: radius,
            originalData: segment
        };
    });
    
    // Update chart data with animation
    bubbleChart.data.datasets[0].data = chartData;
    bubbleChart.data.datasets[0].backgroundColor = chartData.map(d => 
        getCompetitiveColor(d.originalData.yourWinRate, d.originalData.fairShare)
    );
    
    bubbleChart.update('active');
}

function updateTimelineLabels() {
    const labels = document.querySelectorAll('.timeline-label');
    labels.forEach((label, index) => {
        label.classList.toggle('active', index === currentMonthIndex);
    });
}

function showCompetitiveDetailPanel(data) {
    // Calculate trend
    const currentMonth = currentMonthIndex;
    const threeMonthsAgo = Math.max(0, currentMonth - 3);
    const oldData = competitiveData[threeMonthsAgo].segments.find(s => 
        s.vehicleType === data.vehicleType && s.dealRating === data.dealRating
    );
    
    let trend = 'stable';
    let trendValue = 0;
    if (oldData) {
        trendValue = ((data.yourWinRate - oldData.yourWinRate) * 100).toFixed(0);
        trend = trendValue > 0 ? 'positive' : trendValue < 0 ? 'negative' : 'stable';
    }
    
    // Create header content
    const headerContent = `
        <div class="performance-header">
            <h2>${data.vehicleType} - ${data.dealRating}</h2>
        </div>
    `;
    document.getElementById('competitive-detail-header').innerHTML = headerContent;
    
    // Create detail content
    const detailContent = `
        <div class="performance-section">
            <div class="performance-header">
                <span class="win-rate-value">${(data.yourWinRate * 100).toFixed(0)}%</span>
                <span class="trend-indicator ${trend}">
                    ${trend === 'positive' ? '↗' : trend === 'negative' ? '↘' : '→'} 
                    ${Math.abs(trendValue)}% vs 3 months ago
                </span>
            </div>
            
            <div class="timeline-chart-container">
                <canvas id="performanceTimelineChart"></canvas>
            </div>
        </div>
        
        <div class="detail-section">
            <h3>What's Happening</h3>
            <div class="metrics-grid">
                <div class="metric-card">
                    <div class="metric-label">Vehicle Inventory</div>
                    <div class="metric-value">${data.vehicleInventory || 0}</div>
                    <div class="metric-change">units in this segment</div>
                </div>
                <div class="metric-card">
                    <div class="metric-label">Competing Dealers</div>
                    <div class="metric-value">${data.competingDealers}</div>
                    <div class="metric-change">dealers selling similar</div>
                </div>
                <div class="metric-card">
                    <div class="metric-label">Your Win Rate</div>
                    <div class="metric-value">${(data.yourWinRate * 100).toFixed(0)}%</div>
                    <div class="metric-change">vs ${(data.fairShare * 100).toFixed(0)}% fair share</div>
                </div>
                <div class="metric-card">
                    <div class="metric-label">Performance vs Fair</div>
                    <div class="metric-value">${((data.yourWinRate / data.fairShare - 1) * 100).toFixed(0)}%</div>
                    <div class="metric-change">${data.yourWinRate > data.fairShare ? 'above' : 'below'} expectation</div>
                </div>
            </div>
        </div>
        
        <div class="detail-section">
            <h3>Why It's Happening</h3>
            <div class="competitor-list">
                ${data.topCompetitors.map((comp, index) => `
                    <div class="competitor-item">
                        <div>
                            <span class="competitor-name">${comp.name}</span>
                            ${data.newCompetitors && data.newCompetitors.includes(comp.name) ? 
                                '<span class="new-competitor-badge">NEW</span>' : ''}
                        </div>
                        <span class="competitor-win-rate">${(comp.winRate * 100).toFixed(0)}% win rate</span>
                    </div>
                `).join('')}
            </div>
            
            <div class="insight-section" style="margin-top: 20px;">
                <h4 style="font-size: 14px; margin-bottom: 12px;">Behavioral Insights</h4>
                <div style="background: #F9FAFB; padding: 16px; border-radius: 8px;">
                    <p style="margin: 0 0 8px 0; font-size: 14px;">
                        <strong>Time on listings:</strong> ${data.insights.avgTimeOnYourListings} (yours) vs 
                        ${data.insights.avgTimeOnCompetitorListings} (competitors)
                    </p>
                    <p style="margin: 0; font-size: 14px;">
                        <strong>Trend:</strong> ${data.insights.trends}
                    </p>
                </div>
            </div>
        </div>
        
        ${data.shopperBreakdown && data.shopperBreakdown.length > 0 ? `
        <div class="detail-section shopper-breakdown">
            <h3>Shopper Breakdown</h3>
            <div class="breakdown-visual">
                <div class="stacked-bar">
                    ${data.shopperBreakdown.map((segment, index) => {
                        const colors = ['#0763D3', '#3B82F6', '#93C5FD'];
                        return `<div class="bar-segment" style="width: ${segment.percentage}%; background-color: ${colors[index]};" title="${segment.percentage}%"></div>`;
                    }).join('')}
                </div>
            </div>
            
            <div class="breakdown-list">
                ${data.shopperBreakdown.map((segment, index) => {
                    const colors = ['#0763D3', '#3B82F6', '#93C5FD'];
                    return `
                    <div class="breakdown-item">
                        <div class="breakdown-header">
                            <span class="breakdown-dot" style="background-color: ${colors[index]};"></span>
                            <span class="breakdown-percentage">${segment.percentage}%</span>
                            <span class="breakdown-type">${segment.shopperType}</span>
                        </div>
                        <div class="breakdown-details">
                            <div class="breakdown-grid">
                                <div class="breakdown-field">
                                    <span class="field-label">Behavior:</span>
                                    <span class="field-value">${segment.behavior}</span>
                                </div>
                                <div class="breakdown-field">
                                    <span class="field-label">Priorities:</span>
                                    <span class="field-value">${segment.priorities.join(', ')}</span>
                                </div>
                                <div class="breakdown-field">
                                    <span class="field-label">Metrics:</span>
                                    <span class="field-value">${segment.keyMetrics}</span>
                                </div>
                            </div>
                            <p class="breakdown-impact">→ ${segment.insight}</p>
                        </div>
                    </div>
                    `;
                }).join('')}
            </div>
        </div>
        ` : ''}
    `;
    
    document.getElementById('competitive-detail-content').innerHTML = detailContent;
    
    // Create performance timeline chart
    createPerformanceTimelineChart(data);
    
    // Open panel
    openCompetitiveDetailPanel();
}

function createPerformanceTimelineChart(segmentData) {
    const ctx = document.getElementById('performanceTimelineChart');
    if (!ctx) return;
    
    // Get historical data for this segment
    const historicalData = competitiveData.map(monthData => {
        const segment = monthData.segments.find(s => 
            s.vehicleType === segmentData.vehicleType && s.dealRating === segmentData.dealRating
        );
        return segment ? segment.yourWinRate * 100 : null;
    });
    
    // Destroy existing chart if it exists
    if (timelineChart) {
        timelineChart.destroy();
    }
    
    // Create timeline chart
    timelineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: months.map(m => m.label),
            datasets: [{
                label: 'Win Rate',
                data: historicalData,
                borderColor: '#0763D3',
                backgroundColor: 'rgba(7, 99, 211, 0.1)',
                borderWidth: 2,
                tension: 0.3,
                pointRadius: 4,
                pointBackgroundColor: '#0763D3',
                pointBorderColor: '#fff',
                pointBorderWidth: 2
            }, {
                label: 'Fair Share',
                data: Array(6).fill(segmentData.fairShare * 100),
                borderColor: '#6B7280',
                borderDash: [5, 5],
                borderWidth: 2,
                pointRadius: 0,
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            if (context.dataset.label === 'Win Rate') {
                                return `Win Rate: ${context.parsed.y.toFixed(0)}%`;
                            } else {
                                return `Fair Share: ${context.parsed.y.toFixed(0)}%`;
                            }
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
                            size: 11
                        }
                    }
                },
                y: {
                    beginAtZero: true,
                    max: 50,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        },
                        font: {
                            size: 11
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                }
            }
        }
    });
}

function openCompetitiveDetailPanel() {
    const panel = document.getElementById('competitive-detail-panel');
    const body = document.body;
    
    panel.classList.add('active');
    body.classList.add('detail-panel-open');
}

function closeCompetitiveDetailPanel() {
    const panel = document.getElementById('competitive-detail-panel');
    const body = document.body;
    
    panel.classList.remove('active');
    body.classList.remove('detail-panel-open');
}

// Make closeCompetitiveDetailPanel available globally
window.closeCompetitiveDetailPanel = closeCompetitiveDetailPanel;

function addChartLegend() {
    const legendHtml = `
        <div class="chart-legend">
            <h4>Legend</h4>
            <div class="legend-grid">
                <div class="legend-item">
                    <span class="legend-color" style="background: #10B981;"></span>
                    <span><strong>Winning</strong> - Above fair share (>5%)</span>
                </div>
                <div class="legend-item">
                    <span class="legend-color" style="background: #F59E0B;"></span>
                    <span><strong>Near Fair Share</strong> - Within 5% of expected</span>
                </div>
                <div class="legend-item">
                    <span class="legend-color" style="background: #EF4444;"></span>
                    <span><strong>Losing</strong> - Below fair share (>5%)</span>
                </div>
                <div class="legend-item">
                    <span class="legend-color" style="background: #6B7280;"></span>
                    <span><strong>No Data</strong> - Insufficient activity</span>
                </div>
            </div>
            <p style="margin-top: 16px; font-size: 13px; color: #6B7280;">
                <strong>Bubble size</strong> represents vehicle inventory count. 
                <strong>Numbers</strong> show your win rate percentage.
            </p>
        </div>
    `;
    
    const container = document.querySelector('.leads-container');
    const legendDiv = document.createElement('div');
    legendDiv.innerHTML = legendHtml;
    container.appendChild(legendDiv);
}

function setupEventListeners() {
    // Close panel on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeCompetitiveDetailPanel();
        }
    });
    
    // Handle filter changes
    const vehicleConditionFilter = document.getElementById('vehicle-condition');
    if (vehicleConditionFilter) {
        vehicleConditionFilter.addEventListener('change', handleVehicleConditionFilter);
    }
}

function handleVehicleConditionFilter(event) {
    const selectedCondition = event.target.value;
    
    // Get current month data
    const currentData = competitiveData[currentMonthIndex].segments;
    
    // Filter data based on vehicle condition
    let filteredData;
    if (selectedCondition === 'All') {
        filteredData = currentData;
    } else {
        filteredData = currentData.filter(segment => segment.condition === selectedCondition);
    }
    
    // Update chart with filtered data
    updateChartWithData(filteredData);
}