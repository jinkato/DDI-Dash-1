// Deal & Type Analysis Chart Implementation

// Sample data structure
const marketData = [
    // SUV Column
    {
        vehicleType: "SUV",
        dealRating: "Great Deal",
        volume: 320,
        performance: 1.4,
        leadsPerVehicle: 2.8,
        insights: {
            demographics: "Young professionals, household income $50-70k",
            behavior: "Quick decision makers, 1-2 week research period",
            priorities: ["Technology features", "Fuel economy", "Modern styling"],
            metrics: "High lead conversion, low price sensitivity",
            performanceBreakdown: [
                {
                    percentage: 45,
                    shopperType: "Tech-savvy millennials",
                    shoppingBehavior: "Mobile-first, quick decisions, 3-5 day cycle",
                    topPriorities: ["Latest tech features", "Fuel efficiency", "Modern design"],
                    keyMetrics: "4.2 leads/vehicle, 68% mobile traffic",
                    insight: "High conversion rate drives leads up"
                },
                {
                    percentage: 30,
                    shopperType: "Value seekers",
                    shoppingBehavior: "Compare 3-4 options, research reviews, 1-2 week timeline",
                    topPriorities: ["Best value for money", "Reliability scores", "Low ownership cost"],
                    keyMetrics: "2.8 leads/vehicle, high email engagement",
                    insight: "Moderate conversion with good follow-through"
                },
                {
                    percentage: 25,
                    shopperType: "First-time SUV buyers",
                    shoppingBehavior: "Extensive research, need guidance, 3-4 week process",
                    topPriorities: ["Safety ratings", "Cargo space", "Easy financing"],
                    keyMetrics: "1.5 leads/vehicle, high dealer interaction",
                    insight: "Lower initial conversion but high engagement"
                }
            ]
        }
    },
    {
        vehicleType: "SUV",
        dealRating: "Good Deal",
        volume: 450,
        performance: 1.2,
        leadsPerVehicle: 2.1,
        insights: {
            demographics: "Families with 2+ kids, household income $40-60k",
            behavior: "View 12+ vehicles, research for 3+ weeks",
            priorities: ["Safety ratings", "Fuel economy", "Warranty"],
            metrics: "Higher VDP views per vehicle, lower lead conversion rate"
        }
    },
    {
        vehicleType: "SUV",
        dealRating: "Fair Deal",
        volume: 280,
        performance: 0.9,
        leadsPerVehicle: 1.4,
        insights: {
            demographics: "Budget-conscious families",
            behavior: "Price comparison focused, 4+ weeks research",
            priorities: ["Price", "Reliability", "Space"],
            metrics: "High engagement, moderate conversion",
            performanceBreakdown: [
                {
                    percentage: 50,
                    shopperType: "Cautious researchers",
                    shoppingBehavior: "Compare 8+ vehicles, read all reviews, 4-6 week process",
                    topPriorities: ["Lowest price", "Detailed comparisons", "Warranty coverage"],
                    keyMetrics: "0.8 leads/vehicle, high page views per session",
                    insight: "Lower lead rate due to long research cycle"
                },
                {
                    percentage: 35,
                    shopperType: "Deal waiters",
                    shoppingBehavior: "Set price alerts, monitor inventory, wait for incentives",
                    topPriorities: ["Sales events", "End-of-year deals", "Trade-in value"],
                    keyMetrics: "0.5 leads/vehicle baseline, 3.5 during sales",
                    insight: "Spike in leads during promotions only"
                },
                {
                    percentage: 15,
                    shopperType: "Immediate need buyers",
                    shoppingBehavior: "Need vehicle within 1 week, limited options",
                    topPriorities: ["Availability", "Quick financing", "Any reasonable deal"],
                    keyMetrics: "3.0 leads/vehicle, low loyalty",
                    insight: "High urgency but low dealer loyalty"
                }
            ]
        }
    },
    {
        vehicleType: "SUV",
        dealRating: "High-Priced",
        volume: 180,
        performance: 0.7,
        leadsPerVehicle: 0.8,
        insights: {
            demographics: "Value shoppers, diverse income levels",
            behavior: "Extensive research, wait for sales",
            priorities: ["Best price", "Incentives", "Trade-in value"],
            metrics: "Low initial engagement, spike during sales events"
        }
    },
    {
        vehicleType: "SUV",
        dealRating: "Over-Priced",
        volume: 90,
        performance: 0.5,
        leadsPerVehicle: 0.3,
        insights: {
            demographics: "Price-sensitive shoppers",
            behavior: "Quick to abandon, comparison shop",
            priorities: ["Lowest price", "Basic features"],
            metrics: "Very low conversion, high bounce rate"
        }
    },
    
    // Sedan Column
    {
        vehicleType: "Sedan",
        dealRating: "Great Deal",
        volume: 240,
        performance: 1.3,
        leadsPerVehicle: 2.4,
        insights: {
            demographics: "Urban professionals, singles and couples",
            behavior: "Research focused, 2-3 week timeline",
            priorities: ["Fuel efficiency", "Technology", "Style"],
            metrics: "High quality leads, good conversion"
        }
    },
    {
        vehicleType: "Sedan",
        dealRating: "Good Deal",
        volume: 380,
        performance: 1.1,
        leadsPerVehicle: 1.8,
        insights: {
            demographics: "Commuters, mixed age groups",
            behavior: "Practical buyers, moderate research",
            priorities: ["MPG", "Reliability", "Comfort"],
            metrics: "Steady engagement, average conversion"
        }
    },
    {
        vehicleType: "Sedan",
        dealRating: "Fair Deal",
        volume: 220,
        performance: 1.0,
        leadsPerVehicle: 1.2,
        insights: {
            demographics: "First-time buyers, young adults",
            behavior: "Budget conscious, financing focused",
            priorities: ["Monthly payment", "Insurance cost", "Features"],
            metrics: "High finance application rate"
        }
    },
    {
        vehicleType: "Sedan",
        dealRating: "High-Priced",
        volume: 140,
        performance: 0.8,
        leadsPerVehicle: 0.6,
        insights: {
            demographics: "Credit challenged buyers",
            behavior: "Payment focused, limited options",
            priorities: ["Approval odds", "Down payment", "Terms"],
            metrics: "Lower conversion, longer sales cycle"
        }
    },
    {
        vehicleType: "Sedan",
        dealRating: "Over-Priced",
        volume: 60,
        performance: 0.4,
        leadsPerVehicle: 0.2,
        insights: {
            demographics: "Distressed buyers",
            behavior: "Last resort shoppers",
            priorities: ["Any approval", "Transportation"],
            metrics: "Very low engagement"
        }
    },
    
    // Truck Column
    {
        vehicleType: "Truck",
        dealRating: "Great Deal",
        volume: 280,
        performance: 1.5,
        leadsPerVehicle: 3.0,
        insights: {
            demographics: "Contractors, rural households",
            behavior: "Feature focused, know what they want",
            priorities: ["Towing capacity", "Bed size", "4WD"],
            metrics: "High intent, quick decisions",
            performanceBreakdown: [
                {
                    percentage: 55,
                    shopperType: "Work truck buyers",
                    shoppingBehavior: "Spec requirements first, test towing capacity, 3-5 day decision",
                    topPriorities: ["Towing capacity", "Payload rating", "Reliability history"],
                    keyMetrics: "4.5 leads/vehicle, 82% close rate",
                    insight: "Very high conversion drives strong lead rate"
                },
                {
                    percentage: 30,
                    shopperType: "Lifestyle truck buyers",
                    shoppingBehavior: "Compare features and comfort, read owner reviews, 2 week process",
                    topPriorities: ["Interior comfort", "Tech features", "Fuel economy"],
                    keyMetrics: "2.2 leads/vehicle, weekend test drives",
                    insight: "Good conversion after feature comparison"
                },
                {
                    percentage: 15,
                    shopperType: "Fleet buyers",
                    shoppingBehavior: "Bulk pricing focus, negotiate hard, 3-4 week process",
                    topPriorities: ["Volume discounts", "Warranty terms", "Service packages"],
                    keyMetrics: "0.8 leads/vehicle, 5+ units per sale",
                    insight: "Lower lead rate but higher volume potential"
                }
            ]
        }
    },
    {
        vehicleType: "Truck",
        dealRating: "Good Deal",
        volume: 420,
        performance: 1.3,
        leadsPerVehicle: 2.5,
        insights: {
            demographics: "Blue collar workers, outdoor enthusiasts",
            behavior: "Brand loyal, moderate research",
            priorities: ["Capability", "Durability", "Fuel economy"],
            metrics: "Strong conversion, repeat buyers"
        }
    },
    {
        vehicleType: "Truck",
        dealRating: "Fair Deal",
        volume: 340,
        performance: 1.0,
        leadsPerVehicle: 1.6,
        insights: {
            demographics: "Suburban families, lifestyle buyers",
            behavior: "Comparing SUVs and trucks",
            priorities: ["Versatility", "Comfort", "Technology"],
            metrics: "Longer decision process"
        }
    },
    {
        vehicleType: "Truck",
        dealRating: "High-Priced",
        volume: 160,
        performance: 0.6,
        leadsPerVehicle: 0.7,
        insights: {
            demographics: "Aspirational buyers",
            behavior: "Want truck but price sensitive",
            priorities: ["Lower trims", "Used options", "Incentives"],
            metrics: "Consider used alternatives"
        }
    },
    {
        vehicleType: "Truck",
        dealRating: "Over-Priced",
        volume: 40,
        performance: 0.3,
        leadsPerVehicle: 0.3,
        insights: {
            demographics: "Challenged buyers",
            behavior: "Limited by budget",
            priorities: ["Any truck", "Financing"],
            metrics: "Extremely low conversion"
        }
    },
    
    // Coupe Column
    {
        vehicleType: "Coupe",
        dealRating: "Great Deal",
        volume: 120,
        performance: 1.6,
        leadsPerVehicle: 3.2,
        insights: {
            demographics: "Young professionals, enthusiasts",
            behavior: "Emotion-driven, quick decisions",
            priorities: ["Performance", "Style", "Brand image"],
            metrics: "High close rate, less price sensitive",
            performanceBreakdown: [
                {
                    percentage: 60,
                    shopperType: "Performance enthusiasts",
                    shoppingBehavior: "Know exact specs, compare performance, 1 week decision",
                    topPriorities: ["0-60 times", "Handling reviews", "Modification potential"],
                    keyMetrics: "4.8 leads/vehicle, 72% test drive conversion",
                    insight: "Very high conversion drives lead rate up"
                },
                {
                    percentage: 25,
                    shopperType: "Image buyers",
                    shoppingBehavior: "Research brand prestige, check financing first, 2-3 week process",
                    topPriorities: ["Brand reputation", "Visual appeal", "Monthly payment"],
                    keyMetrics: "2.5 leads/vehicle, financing dependent",
                    insight: "Good conversion when financing approved"
                },
                {
                    percentage: 15,
                    shopperType: "Dreamers",
                    shoppingBehavior: "Browse frequently, save favorites, rarely contact",
                    topPriorities: ["Dream car features", "Future possibilities", "Visual inspiration"],
                    keyMetrics: "0.4 leads/vehicle, high engagement time",
                    insight: "Low conversion but high engagement"
                }
            ]
        }
    },
    {
        vehicleType: "Coupe",
        dealRating: "Good Deal",
        volume: 180,
        performance: 1.2,
        leadsPerVehicle: 2.2,
        insights: {
            demographics: "Singles, young couples",
            behavior: "Image conscious, research performance",
            priorities: ["Looks", "Speed", "Technology"],
            metrics: "Quality leads, good margins"
        }
    },
    {
        vehicleType: "Coupe",
        dealRating: "Fair Deal",
        volume: 100,
        performance: 0.9,
        leadsPerVehicle: 1.3,
        insights: {
            demographics: "Entry-level sports car buyers",
            behavior: "Comparing with sedan options",
            priorities: ["Sporty look", "Fuel economy", "Insurance"],
            metrics: "Price negotiations common"
        }
    },
    {
        vehicleType: "Coupe",
        dealRating: "High-Priced",
        volume: 60,
        performance: 0.5,
        leadsPerVehicle: 0.5,
        insights: {
            demographics: "Aspirational young buyers",
            behavior: "Dream car shoppers",
            priorities: ["Monthly payment", "Insurance quotes"],
            metrics: "High abandonment rate"
        }
    },
    {
        vehicleType: "Coupe",
        dealRating: "Over-Priced",
        volume: 20,
        performance: 0.2,
        leadsPerVehicle: 0.2,
        insights: {
            demographics: "Window shoppers",
            behavior: "Unrealistic expectations",
            priorities: ["Dream car at economy price"],
            metrics: "Lowest conversion rate"
        }
    },
    
    // Wagon Column  
    {
        vehicleType: "Wagon",
        dealRating: "Great Deal",
        volume: 80,
        performance: 1.4,
        leadsPerVehicle: 2.6,
        insights: {
            demographics: "Educated urbanites, eco-conscious",
            behavior: "Alternative seekers, anti-SUV",
            priorities: ["Cargo space", "Handling", "MPG"],
            metrics: "Niche but loyal segment"
        }
    },
    {
        vehicleType: "Wagon",
        dealRating: "Good Deal",
        volume: 120,
        performance: 1.1,
        leadsPerVehicle: 1.9,
        insights: {
            demographics: "European car enthusiasts, families",
            behavior: "Brand specific searches",
            priorities: ["European brands", "AWD", "Luxury features"],
            metrics: "Higher average transaction price"
        }
    },
    {
        vehicleType: "Wagon",
        dealRating: "Fair Deal",
        volume: 60,
        performance: 0.8,
        leadsPerVehicle: 1.0,
        insights: {
            demographics: "Practical buyers",
            behavior: "Comparing with SUVs",
            priorities: ["Value", "Reliability", "Space"],
            metrics: "Often switch to SUV"
        }
    },
    {
        vehicleType: "Wagon",
        dealRating: "High-Priced",
        volume: 30,
        performance: 0.0,
        leadsPerVehicle: 0.4,
        insights: {
            demographics: "Limited market",
            behavior: "Specific model seekers",
            priorities: ["Exact specifications"],
            metrics: "Very low volume"
        }
    },
    {
        vehicleType: "Wagon",
        dealRating: "Over-Priced",
        volume: 10,
        performance: 0.0,
        leadsPerVehicle: 0.1,
        insights: {
            demographics: "Rare buyers",
            behavior: "Collectors or specific needs",
            priorities: ["Unique requirements"],
            metrics: "Minimal activity"
        }
    }
];

// Configuration
const vehicleTypes = ["SUV", "Sedan", "Truck", "Coupe", "Wagon"];
const dealRatings = ["Great Deal", "Good Deal", "Fair Deal", "High-Priced", "Over-Priced"];

// Initialize chart when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeBubbleChart();
    setupEventListeners();
});

function initializeBubbleChart() {
    const ctx = document.getElementById('bubbleChart');
    
    if (!ctx) {
        console.error('Canvas element not found');
        return;
    }

    // Transform data for Chart.js bubble chart
    const chartData = marketData.map(item => {
        const x = vehicleTypes.indexOf(item.vehicleType);
        const y = dealRatings.indexOf(item.dealRating);
        
        // Scale bubble size to fit within cells
        // Max radius should be about 45 pixels to fit comfortably in a cell (50% larger than 30)
        const maxVolume = Math.max(...marketData.map(d => d.volume));
        const minVolume = Math.min(...marketData.filter(d => d.volume > 0).map(d => d.volume));
        const scaleFactor = 37.5 / Math.sqrt(maxVolume); // 50% larger than 25
        
        // Calculate radius with minimum size of 12 pixels (50% larger than 8)
        let radius = Math.sqrt(item.volume) * scaleFactor;
        radius = Math.max(radius, 12); // Ensure minimum visibility
        
        return {
            x: x,
            y: y,
            r: radius,
            originalData: item
        };
    });

    // Create gradient colors based on leads per vehicle using alpha transparency
    const getColor = (leadsPerVehicle) => {
        // Convert hex #0763D3 to RGB: 7, 99, 211
        if (leadsPerVehicle <= 0.1) return 'rgba(7, 99, 211, 0)'; // 0% alpha for minimal/no data
        
        // Calculate alpha based on leads per vehicle (0.2 to 1.0)
        // Max leads per vehicle is around 3.2, min meaningful is around 0.2
        const maxLeads = 3.2;
        const minLeads = 0.2;
        
        // Normalize to 0-1 range
        const normalized = Math.max(0, Math.min(1, (leadsPerVehicle - minLeads) / (maxLeads - minLeads)));
        
        // Map to alpha range (0.2 to 1.0)
        const alpha = 0.2 + (normalized * 0.8);
        
        return `rgba(7, 99, 211, ${alpha.toFixed(2)})`;
    };

    // Plugin to draw text labels in center of bubbles
    const bubbleLabelsPlugin = {
        id: 'bubbleLabels',
        afterDatasetsDraw: function(chart) {
            const ctx = chart.ctx;
            
            chart.data.datasets.forEach((dataset, datasetIndex) => {
                const meta = chart.getDatasetMeta(datasetIndex);
                
                meta.data.forEach((element, index) => {
                    const data = dataset.data[index];
                    const leadsPerVehicle = data.originalData.leadsPerVehicle;
                    
                    // Get bubble radius
                    const radius = element.options.radius;
                    
                    // Show label for all bubbles except the very smallest
                    if (radius > 10) {
                        ctx.save();
                        
                        // Set text properties based on bubble size
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        
                        // Use consistent font size for all bubbles
                        ctx.font = 'bold 12px DM Sans';
                        
                        // Use white text for dark bubbles, dark text for light bubbles
                        const alpha = parseFloat(getColor(leadsPerVehicle).match(/[\d.]+\)$/)[0].slice(0, -1));
                        ctx.fillStyle = alpha > 0.6 ? '#FFFFFF' : '#0D1722';
                        
                        // Draw the text
                        ctx.fillText(leadsPerVehicle.toFixed(1), element.x, element.y);
                        
                        ctx.restore();
                    }
                });
            });
        }
    };

    // Configure Chart.js
    window.bubbleChart = new Chart(ctx, {
        type: 'bubble',
        plugins: [bubbleLabelsPlugin],
        data: {
            datasets: [{
                label: 'Market Segments',
                data: chartData,
                backgroundColor: chartData.map(d => getColor(d.originalData.leadsPerVehicle)),
                borderColor: chartData.map(d => {
                    // For border, always use full opacity
                    return 'rgba(7, 99, 211, 1)';
                }),
                borderWidth: 1,
                hoverBorderWidth: 2,
                hoverBackgroundColor: chartData.map(d => {
                    const color = getColor(d.originalData.leadsPerVehicle);
                    // For hover, increase alpha slightly (max 1.0)
                    const match = color.match(/rgba\((\d+), (\d+), (\d+), ([\d.]+)\)/);
                    if (match) {
                        const alpha = parseFloat(match[4]);
                        const newAlpha = Math.min(1, alpha + 0.1);
                        return `rgba(7, 99, 211, ${newAlpha})`;
                    }
                    return color;
                })
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
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
                    beforeBuildTicks: function(axis) {
                        axis.min = -0.5;
                        axis.max = 4.5;
                    },
                    afterBuildTicks: function(axis) {
                        axis.ticks = [0, 1, 2, 3, 4].map(i => ({
                            value: i
                        }));
                    },
                    ticks: {
                        display: true,
                        autoSkip: false,
                        callback: function(value) {
                            if (value >= 0 && value < vehicleTypes.length) {
                                return vehicleTypes[value];
                            }
                            return '';
                        },
                        font: {
                            size: 14,
                            weight: '500'
                        },
                        color: '#111827',
                        padding: 10
                    },
                    title: {
                        display: false
                    }
                },
                y: {
                    type: 'linear',
                    min: -0.5,
                    max: 4.5,
                    reverse: true, // Put "Great Deal" at top
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)',
                        lineWidth: 1,
                        drawTicks: false
                    },
                    beforeBuildTicks: function(axis) {
                        axis.min = -0.5;
                        axis.max = 4.5;
                    },
                    afterBuildTicks: function(axis) {
                        axis.ticks = [0, 1, 2, 3, 4].map(i => ({
                            value: i
                        }));
                    },
                    ticks: {
                        display: true,
                        autoSkip: false,
                        callback: function(value) {
                            if (value >= 0 && value < dealRatings.length) {
                                return dealRatings[value];
                            }
                            return '';
                        },
                        font: {
                            size: 14,
                            weight: '500'
                        },
                        color: '#111827',
                        padding: 10
                    },
                    title: {
                        display: false
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
                            return [
                                `${data.vehicleType} - ${data.dealRating}`,
                                `Volume: ${data.volume} shoppers`,
                                `Leads per Vehicle: ${data.leadsPerVehicle.toFixed(1)}`
                            ];
                        }
                    }
                }
            },
            onClick: function(event, elements) {
                if (elements.length > 0) {
                    const index = elements[0].index;
                    const data = chartData[index].originalData;
                    showDetailPanel(data);
                }
            },
            onHover: function(event, elements) {
                ctx.style.cursor = elements.length > 0 ? 'pointer' : 'default';
            }
        }
    });

    // Add legend
    addChartLegend();
}

function addChartLegend() {
    const legendHtml = `
        <div class="chart-legend">
            <h3>Legend</h3>
            <div class="legend-section">
                <h4>Bubble Size</h4>
                <p>Represents the number of shoppers in each segment</p>
            </div>
            <div class="legend-section">
                <h4>Bubble Color Intensity (Leads per Vehicle)</h4>
                <div class="legend-items">
                    <div class="legend-item">
                        <span class="legend-color" style="background: rgba(7, 99, 211, 1.0)"></span>
                        <span>Highest (3.0+ leads/vehicle)</span>
                    </div>
                    <div class="legend-item">
                        <span class="legend-color" style="background: rgba(7, 99, 211, 0.8)"></span>
                        <span>High (2.5+ leads/vehicle)</span>
                    </div>
                    <div class="legend-item">
                        <span class="legend-color" style="background: rgba(7, 99, 211, 0.6)"></span>
                        <span>Medium (1.5-2.5 leads/vehicle)</span>
                    </div>
                    <div class="legend-item">
                        <span class="legend-color" style="background: rgba(7, 99, 211, 0.4)"></span>
                        <span>Low (0.5-1.5 leads/vehicle)</span>
                    </div>
                    <div class="legend-item">
                        <span class="legend-color" style="background: rgba(7, 99, 211, 0.2)"></span>
                        <span>Lowest (0.2-0.5 leads/vehicle)</span>
                    </div>
                    <div class="legend-item">
                        <span class="legend-color" style="background: rgba(7, 99, 211, 0); border: 1px solid rgba(7, 99, 211, 0.5)"></span>
                        <span>Minimal Activity (0% fill)</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    const chartContainer = document.querySelector('.chart-container');
    const legendDiv = document.createElement('div');
    legendDiv.className = 'chart-info';
    legendDiv.innerHTML = legendHtml;
    chartContainer.appendChild(legendDiv);
}

function showDetailPanel(data) {
    // Update header
    const headerContent = `
        <h2>${data.vehicleType} - ${data.dealRating}</h2>
    `;
    document.getElementById('detail-dealer-header').innerHTML = headerContent;
    
    // Update content with tabs
    const content = `
        <div class="detail-tabs">
            <button class="detail-tab active" onclick="switchDetailTab(event, 'buyers')">Buyers</button>
            <button class="detail-tab" onclick="switchDetailTab(event, 'vehicle')">Vehicle</button>
        </div>
        
        <div id="buyers-tab-content" class="tab-content active">
            ${data.insights.performanceBreakdown ? `
            <div class="detail-section performance-breakdown">
                <div class="breakdown-visual">
                    <div class="stacked-bar">
                        ${data.insights.performanceBreakdown.map((segment, index) => {
                            const colors = ['#0763D3', '#3B82F6', '#93C5FD'];
                            return `<div class="bar-segment" style="width: ${segment.percentage}%; background-color: ${colors[index]};" title="${segment.percentage}%"></div>`;
                        }).join('')}
                    </div>
                </div>
                
                <div class="breakdown-list">
                    ${data.insights.performanceBreakdown.map((segment, index) => {
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
                                        <span class="field-label">Shopping Behavior:</span>
                                        <span class="field-value">${segment.shoppingBehavior}</span>
                                    </div>
                                    <div class="breakdown-field">
                                        <span class="field-label">Top Priorities:</span>
                                        <span class="field-value">${segment.topPriorities.join(', ')}</span>
                                    </div>
                                    <div class="breakdown-field">
                                        <span class="field-label">Key Metrics:</span>
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
            ` : '<p style="color: #6B7280; text-align: center; padding: 40px;">No buyer breakdown data available for this segment.</p>'}
        </div>
        
        <div id="vehicle-tab-content" class="tab-content">
            <div class="detail-section">
                <h3>Vehicle Type Analysis</h3>
                <p style="color: #6B7280; font-size: 14px; line-height: 1.6;">
                    Vehicle segment analysis for ${data.vehicleType} in the ${data.dealRating} category.
                </p>
                <!-- Placeholder for future vehicle-specific content -->
                <div style="padding: 40px; text-align: center; color: #9CA3AF;">
                    <p>Vehicle performance data coming soon...</p>
                </div>
            </div>
        </div>
    `;
    
    // Update panel content
    document.getElementById('detail-panel-content').innerHTML = content;
    
    // Show panel
    openDetailPanel();
}

// Open detail panel
function openDetailPanel() {
    const panel = document.getElementById('detail-panel');
    const body = document.body;
    
    // Add active class to panel
    panel.classList.add('active');
    
    // Add class to body to adjust layout
    body.classList.add('detail-panel-open');
}

// Close detail panel  
function closeDetailPanel() {
    const panel = document.getElementById('detail-panel');
    const body = document.body;
    
    // Remove active class from panel
    panel.classList.remove('active');
    
    // Remove class from body
    body.classList.remove('detail-panel-open');
}

// Switch between detail panel tabs
window.switchDetailTab = function(event, tabName) {
    // Remove active class from all tabs and content
    const tabs = document.querySelectorAll('.detail-tab');
    const contents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => tab.classList.remove('active'));
    contents.forEach(content => content.classList.remove('active'));
    
    // Add active class to clicked tab and corresponding content
    event.target.classList.add('active');
    document.getElementById(`${tabName}-tab-content`).classList.add('active');
}

function setupEventListeners() {
    // Close panel on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeDetailPanel();
        }
    });
    
    // Handle filter changes
    const filters = document.querySelectorAll('.filter-select, .search-input, .range-input');
    filters.forEach(filter => {
        filter.addEventListener('change', handleFilterChange);
    });
}

function handleFilterChange() {
    // Placeholder for filter functionality
    console.log('Filter changed - implement filtering logic here');
}