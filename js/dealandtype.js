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
            metrics: "High lead conversion, low price sensitivity"
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
            metrics: "High engagement, moderate conversion"
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
            metrics: "High intent, quick decisions"
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
            metrics: "High close rate, less price sensitive"
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
        // Max radius should be about 30 pixels to fit comfortably in a cell
        const maxVolume = Math.max(...marketData.map(d => d.volume));
        const minVolume = Math.min(...marketData.filter(d => d.volume > 0).map(d => d.volume));
        const scaleFactor = 25 / Math.sqrt(maxVolume);
        
        // Calculate radius with minimum size of 8 pixels
        let radius = Math.sqrt(item.volume) * scaleFactor;
        radius = Math.max(radius, 8); // Ensure minimum visibility
        
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
        if (leadsPerVehicle <= 0.1) return 'rgba(128, 128, 128, 0.3)'; // Gray for minimal/no data
        
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

    // Configure Chart.js
    window.bubbleChart = new Chart(ctx, {
        type: 'bubble',
        data: {
            datasets: [{
                label: 'Market Segments',
                data: chartData,
                backgroundColor: chartData.map(d => getColor(d.originalData.leadsPerVehicle)),
                borderColor: chartData.map(d => {
                    const color = getColor(d.originalData.leadsPerVehicle);
                    // For border, always use full opacity except for gray
                    if (d.originalData.leadsPerVehicle <= 0.1) {
                        return 'rgba(128, 128, 128, 0.5)';
                    }
                    return 'rgba(7, 99, 211, 1)';
                }),
                borderWidth: 2,
                hoverBorderWidth: 3,
                hoverBackgroundColor: chartData.map(d => {
                    const color = getColor(d.originalData.leadsPerVehicle);
                    // For hover, increase alpha slightly (max 1.0)
                    if (d.originalData.leadsPerVehicle <= 0.1) {
                        return 'rgba(128, 128, 128, 0.4)';
                    }
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
                    showInsightsModal(data);
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
                        <span class="legend-color" style="background: rgba(128, 128, 128, 0.3)"></span>
                        <span>Minimal Activity</span>
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

function showInsightsModal(data) {
    // Create modal HTML
    const modalHtml = `
        <div class="insights-modal" id="insightsModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${data.vehicleType} - ${data.dealRating}</h2>
                    <button class="close-btn" onclick="closeInsightsModal()">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="insight-section">
                        <h3>Market Volume</h3>
                        <p class="volume-stat">${data.volume} shoppers</p>
                        <p class="performance-stat">Leads per Vehicle: ${data.leadsPerVehicle.toFixed(1)}</p>
                    </div>
                    
                    <div class="insight-section">
                        <h3>Demographics</h3>
                        <p>${data.insights.demographics}</p>
                    </div>
                    
                    <div class="insight-section">
                        <h3>Shopping Behavior</h3>
                        <p>${data.insights.behavior}</p>
                    </div>
                    
                    <div class="insight-section">
                        <h3>Top Priorities</h3>
                        <ul>
                            ${data.insights.priorities.map(p => `<li>${p}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="insight-section">
                        <h3>Key Metrics</h3>
                        <p>${data.insights.metrics}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to page
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalHtml;
    document.body.appendChild(modalContainer);
    
    // Add click outside to close
    const modal = document.getElementById('insightsModal');
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeInsightsModal();
        }
    });
}

function closeInsightsModal() {
    const modal = document.getElementById('insightsModal');
    if (modal) {
        modal.remove();
    }
}

function setupEventListeners() {
    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeInsightsModal();
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