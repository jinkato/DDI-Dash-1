// Compare Page Logic

// Import dealer data with all properties
const dealerDatabase = [
    {
        id: 1,
        name: "Boston Volvo Cars",
        distance: 2.4,
        inventory: 197,
        sessionsPercentage: 21,
        overlapSessions: 482,
        franchiseType: "Franchise",
        brands: ["Volvo"],
        logoColor: "#1B365D",
        lastActivity: "2024-10-20",
        isSelected: true,
        inventoryData: {
            'Compact': { thisLocation: 2, avgCompetitor: 5 },
            'Sedans': { thisLocation: 6, avgCompetitor: 8 },
            'SUV/CO': { thisLocation: 12, avgCompetitor: 9 },
            'Trucks': { thisLocation: 8, avgCompetitor: 15 },
            'Luxury': { thisLocation: 18, avgCompetitor: 12 }
        },
        pricingData: {
            'Great deal': { percent: 8 },
            'Good deal': { percent: 15 },
            'Fair deal': { percent: 42 },
            'High priced': { percent: 20 },
            'Over priced': { percent: 10 },
            'Uncertain': { percent: 5 }
        }
    },
    {
        id: 2,
        name: "Toyota of Watertown",
        distance: 8.5,
        inventory: 197,
        sessionsPercentage: 14,
        overlapSessions: 482,
        franchiseType: "Franchise",
        brands: ["Toyota"],
        logoColor: "#EB0A1E",
        lastActivity: "2024-10-19",
        isSelected: true,
        inventoryData: {
            'Compact': { thisLocation: 4, avgCompetitor: 5 },
            'Sedans': { thisLocation: 10, avgCompetitor: 8 },
            'SUV/CO': { thisLocation: 15, avgCompetitor: 9 },
            'Trucks': { thisLocation: 12, avgCompetitor: 15 },
            'Luxury': { thisLocation: 5, avgCompetitor: 12 }
        },
        pricingData: {
            'Great deal': { percent: 12 },
            'Good deal': { percent: 18 },
            'Fair deal': { percent: 35 },
            'High priced': { percent: 22 },
            'Over priced': { percent: 8 },
            'Uncertain': { percent: 5 }
        }
    },
    {
        id: 3,
        name: "Jaffarian Toyota Volvo",
        distance: 6.2,
        inventory: 205,
        sessionsPercentage: 4,
        overlapSessions: 709,
        franchiseType: "Franchise",
        brands: ["Toyota", "Volvo"],
        logoColor: "#000000",
        lastActivity: "2024-10-21",
        isSelected: false,
        inventoryData: {
            'Compact': { thisLocation: 3, avgCompetitor: 5 },
            'Sedans': { thisLocation: 8, avgCompetitor: 8 },
            'SUV/CO': { thisLocation: 11, avgCompetitor: 9 },
            'Trucks': { thisLocation: 14, avgCompetitor: 15 },
            'Luxury': { thisLocation: 15, avgCompetitor: 12 }
        },
        pricingData: {
            'Great deal': { percent: 6 },
            'Good deal': { percent: 14 },
            'Fair deal': { percent: 40 },
            'High priced': { percent: 25 },
            'Over priced': { percent: 12 },
            'Uncertain': { percent: 3 }
        }
    },
    {
        id: 4,
        name: "Merchants Automotive Group",
        distance: 6.2,
        inventory: 197,
        sessionsPercentage: 12,
        overlapSessions: 174,
        franchiseType: "Independent",
        brands: ["Multi-brand"],
        logoColor: "#2B4C8C",
        lastActivity: "2024-10-18",
        isSelected: false,
        inventoryData: {
            'Compact': { thisLocation: 5, avgCompetitor: 5 },
            'Sedans': { thisLocation: 7, avgCompetitor: 8 },
            'SUV/CO': { thisLocation: 9, avgCompetitor: 9 },
            'Trucks': { thisLocation: 10, avgCompetitor: 15 },
            'Luxury': { thisLocation: 8, avgCompetitor: 12 }
        },
        pricingData: {
            'Great deal': { percent: 10 },
            'Good deal': { percent: 20 },
            'Fair deal': { percent: 38 },
            'High priced': { percent: 18 },
            'Over priced': { percent: 10 },
            'Uncertain': { percent: 4 }
        }
    },
    {
        id: 5,
        name: "Boston Volvo Cars Allston",
        distance: 6.2,
        inventory: 197,
        sessionsPercentage: 14,
        overlapSessions: 252,
        franchiseType: "Franchise",
        brands: ["Volvo"],
        logoColor: "#1B365D",
        lastActivity: "2024-10-17",
        isSelected: false,
        inventoryData: {
            'Compact': { thisLocation: 1, avgCompetitor: 5 },
            'Sedans': { thisLocation: 5, avgCompetitor: 8 },
            'SUV/CO': { thisLocation: 13, avgCompetitor: 9 },
            'Trucks': { thisLocation: 7, avgCompetitor: 15 },
            'Luxury': { thisLocation: 20, avgCompetitor: 12 }
        },
        pricingData: {
            'Great deal': { percent: 7 },
            'Good deal': { percent: 13 },
            'Fair deal': { percent: 45 },
            'High priced': { percent: 22 },
            'Over priced': { percent: 9 },
            'Uncertain': { percent: 4 }
        }
    },
    {
        id: 6,
        name: "Taktak Auto Group",
        distance: 12.8,
        inventory: 78,
        sessionsPercentage: 2,
        overlapSessions: 174,
        franchiseType: "Independent",
        brands: ["Multi-brand"],
        logoColor: "#333333",
        lastActivity: "2024-10-16",
        isSelected: false,
        inventoryData: {
            'Compact': { thisLocation: 8, avgCompetitor: 5 },
            'Sedans': { thisLocation: 12, avgCompetitor: 8 },
            'SUV/CO': { thisLocation: 6, avgCompetitor: 9 },
            'Trucks': { thisLocation: 4, avgCompetitor: 15 },
            'Luxury': { thisLocation: 3, avgCompetitor: 12 }
        },
        pricingData: {
            'Great deal': { percent: 15 },
            'Good deal': { percent: 25 },
            'Fair deal': { percent: 32 },
            'High priced': { percent: 18 },
            'Over priced': { percent: 7 },
            'Uncertain': { percent: 3 }
        }
    },
    {
        id: 7,
        name: "Marlboro Nissan",
        distance: 26.4,
        inventory: 185,
        sessionsPercentage: 12,
        overlapSessions: 98,
        franchiseType: "Franchise",
        brands: ["Nissan"],
        logoColor: "#C3002F",
        lastActivity: "2024-10-20",
        isSelected: false,
        inventoryData: {
            'Compact': { thisLocation: 5, avgCompetitor: 5 },
            'Sedans': { thisLocation: 9, avgCompetitor: 8 },
            'SUV/CO': { thisLocation: 14, avgCompetitor: 9 },
            'Trucks': { thisLocation: 9, avgCompetitor: 15 },
            'Luxury': { thisLocation: 7, avgCompetitor: 12 }
        },
        pricingData: {
            'Great deal': { percent: 9 },
            'Good deal': { percent: 16 },
            'Fair deal': { percent: 38 },
            'High priced': { percent: 24 },
            'Over priced': { percent: 10 },
            'Uncertain': { percent: 3 }
        }
    },
    {
        id: 8,
        name: "Prestige Motor Sales",
        distance: 15.2,
        inventory: 197,
        sessionsPercentage: 4,
        overlapSessions: 482,
        franchiseType: "Independent",
        brands: ["Luxury", "Multi-brand"],
        logoColor: "#1A1A1A",
        lastActivity: "2024-10-15",
        isSelected: false,
        inventoryData: {
            'Compact': { thisLocation: 2, avgCompetitor: 5 },
            'Sedans': { thisLocation: 3, avgCompetitor: 8 },
            'SUV/CO': { thisLocation: 8, avgCompetitor: 9 },
            'Trucks': { thisLocation: 4, avgCompetitor: 15 },
            'Luxury': { thisLocation: 25, avgCompetitor: 12 }
        },
        pricingData: {
            'Great deal': { percent: 5 },
            'Good deal': { percent: 10 },
            'Fair deal': { percent: 30 },
            'High priced': { percent: 35 },
            'Over priced': { percent: 15 },
            'Uncertain': { percent: 5 }
        }
    },
    {
        id: 9,
        name: "Merchants Auto Group NH",
        distance: 48.3,
        inventory: 197,
        sessionsPercentage: 14,
        overlapSessions: 92,
        franchiseType: "Independent",
        brands: ["Multi-brand"],
        logoColor: "#2B4C8C",
        lastActivity: "2024-10-14",
        isSelected: false,
        inventoryData: {
            'Compact': { thisLocation: 6, avgCompetitor: 5 },
            'Sedans': { thisLocation: 9, avgCompetitor: 8 },
            'SUV/CO': { thisLocation: 10, avgCompetitor: 9 },
            'Trucks': { thisLocation: 11, avgCompetitor: 15 },
            'Luxury': { thisLocation: 9, avgCompetitor: 12 }
        },
        pricingData: {
            'Great deal': { percent: 12 },
            'Good deal': { percent: 21 },
            'Fair deal': { percent: 37 },
            'High priced': { percent: 20 },
            'Over priced': { percent: 7 },
            'Uncertain': { percent: 3 }
        }
    },
    {
        id: 10,
        name: "Merrimack Auto Sales",
        distance: 32.7,
        inventory: 197,
        sessionsPercentage: 4,
        overlapSessions: 482,
        franchiseType: "Independent",
        brands: ["Multi-brand"],
        logoColor: "#FF8C00",
        lastActivity: "2024-10-19",
        isSelected: false,
        inventoryData: {
            'Compact': { thisLocation: 7, avgCompetitor: 5 },
            'Sedans': { thisLocation: 10, avgCompetitor: 8 },
            'SUV/CO': { thisLocation: 9, avgCompetitor: 9 },
            'Trucks': { thisLocation: 13, avgCompetitor: 15 },
            'Luxury': { thisLocation: 6, avgCompetitor: 12 }
        },
        pricingData: {
            'Great deal': { percent: 14 },
            'Good deal': { percent: 24 },
            'Fair deal': { percent: 35 },
            'High priced': { percent: 18 },
            'Over priced': { percent: 6 },
            'Uncertain': { percent: 3 }
        }
    },
    {
        id: 11,
        name: "Atlantic Toyota",
        distance: 16.8,
        inventory: 197,
        sessionsPercentage: 14,
        overlapSessions: 182,
        franchiseType: "Franchise",
        brands: ["Toyota"],
        logoColor: "#EB0A1E",
        lastActivity: "2024-10-28",
        isSelected: false,
        inventoryData: {
            'Compact': { thisLocation: 6, avgCompetitor: 5 },
            'Sedans': { thisLocation: 11, avgCompetitor: 8 },
            'SUV/CO': { thisLocation: 16, avgCompetitor: 9 },
            'Trucks': { thisLocation: 14, avgCompetitor: 15 },
            'Luxury': { thisLocation: 4, avgCompetitor: 12 }
        },
        pricingData: {
            'Great deal': { percent: 11 },
            'Good deal': { percent: 19 },
            'Fair deal': { percent: 36 },
            'High priced': { percent: 23 },
            'Over priced': { percent: 8 },
            'Uncertain': { percent: 3 }
        }
    },
    {
        id: 12,
        name: "Exclusive Auto Sales & Service",
        distance: 4.1,
        inventory: 197,
        sessionsPercentage: 14,
        overlapSessions: 182,
        franchiseType: "Independent",
        brands: ["Multi-brand", "Luxury"],
        logoColor: "#4B0082",
        lastActivity: "2024-10-21",
        isSelected: false,
        inventoryData: {
            'Compact': { thisLocation: 3, avgCompetitor: 5 },
            'Sedans': { thisLocation: 4, avgCompetitor: 8 },
            'SUV/CO': { thisLocation: 7, avgCompetitor: 9 },
            'Trucks': { thisLocation: 3, avgCompetitor: 15 },
            'Luxury': { thisLocation: 22, avgCompetitor: 12 }
        },
        pricingData: {
            'Great deal': { percent: 6 },
            'Good deal': { percent: 11 },
            'Fair deal': { percent: 33 },
            'High priced': { percent: 32 },
            'Over priced': { percent: 13 },
            'Uncertain': { percent: 5 }
        }
    },
    {
        id: 13,
        name: "Prime Honda Boston",
        distance: 3.5,
        inventory: 312,
        sessionsPercentage: 18,
        overlapSessions: 623,
        franchiseType: "Franchise",
        brands: ["Honda"],
        logoColor: "#0088CC",
        lastActivity: "2024-10-20",
        isSelected: false,
        inventoryData: {
            'Compact': { thisLocation: 7, avgCompetitor: 5 },
            'Sedans': { thisLocation: 12, avgCompetitor: 8 },
            'SUV/CO': { thisLocation: 17, avgCompetitor: 9 },
            'Trucks': { thisLocation: 11, avgCompetitor: 15 },
            'Luxury': { thisLocation: 6, avgCompetitor: 12 }
        },
        pricingData: {
            'Great deal': { percent: 13 },
            'Good deal': { percent: 22 },
            'Fair deal': { percent: 40 },
            'High priced': { percent: 17 },
            'Over priced': { percent: 6 },
            'Uncertain': { percent: 2 }
        }
    },
    {
        id: 14,
        name: "Liberty Nissan",
        distance: 22.4,
        inventory: 156,
        sessionsPercentage: 9,
        overlapSessions: 267,
        franchiseType: "Franchise",
        brands: ["Nissan"],
        logoColor: "#C3002F",
        lastActivity: "2024-10-15",
        isSelected: false,
        inventoryData: {
            'Compact': { thisLocation: 4, avgCompetitor: 5 },
            'Sedans': { thisLocation: 8, avgCompetitor: 8 },
            'SUV/CO': { thisLocation: 13, avgCompetitor: 9 },
            'Trucks': { thisLocation: 8, avgCompetitor: 15 },
            'Luxury': { thisLocation: 5, avgCompetitor: 12 }
        },
        pricingData: {
            'Great deal': { percent: 8 },
            'Good deal': { percent: 15 },
            'Fair deal': { percent: 38 },
            'High priced': { percent: 26 },
            'Over priced': { percent: 10 },
            'Uncertain': { percent: 3 }
        }
    },
    {
        id: 15,
        name: "Village Auto Group",
        distance: 18.9,
        inventory: 89,
        sessionsPercentage: 3,
        overlapSessions: 134,
        franchiseType: "Independent",
        brands: ["Multi-brand"],
        logoColor: "#228B22",
        lastActivity: "2024-09-22",
        isSelected: false,
        inventoryData: {
            'Compact': { thisLocation: 9, avgCompetitor: 5 },
            'Sedans': { thisLocation: 14, avgCompetitor: 8 },
            'SUV/CO': { thisLocation: 5, avgCompetitor: 9 },
            'Trucks': { thisLocation: 6, avgCompetitor: 15 },
            'Luxury': { thisLocation: 2, avgCompetitor: 12 }
        },
        pricingData: {
            'Great deal': { percent: 16 },
            'Good deal': { percent: 28 },
            'Fair deal': { percent: 33 },
            'High priced': { percent: 16 },
            'Over priced': { percent: 5 },
            'Uncertain': { percent: 2 }
        }
    }
];

let selectedDealers = [];
let charts = {};

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    loadSelectedDealers();
    buildComparisonTable();
    // Remove chart initialization as we won't need them for this design
});

// Load selected dealers from localStorage
function loadSelectedDealers() {
    // Always include Toyota of Watertown (id: 2) as the user's dealership
    const userDealership = dealerDatabase.find(dealer => dealer.id === 2);
    
    // Create CG Benchmark object
    const cgBenchmark = {
        id: 'benchmark',
        name: 'CG Benchmark',
        isBenchmark: true,
        // Average benchmark data
        inventoryData: {
            'Compact': { thisLocation: 4, avgCompetitor: 5 },
            'Sedans': { thisLocation: 8, avgCompetitor: 8 },
            'SUV/CO': { thisLocation: 12, avgCompetitor: 9 },
            'Trucks': { thisLocation: 11, avgCompetitor: 15 },
            'Luxury': { thisLocation: 13, avgCompetitor: 12 }
        },
        pricingData: {
            'Great deal': { percent: 9 },
            'Good deal': { percent: 16 },
            'Fair deal': { percent: 40 },
            'High priced': { percent: 21 },
            'Over priced': { percent: 10 },
            'Uncertain': { percent: 4 }
        }
    };
    
    const savedIds = localStorage.getItem('cargurusSelectedDealers');
    if (savedIds) {
        const ids = JSON.parse(savedIds);
        // Filter out the user's dealership from selected dealers to avoid duplicates
        const otherDealers = dealerDatabase.filter(dealer => ids.includes(dealer.id) && dealer.id !== 2);
        
        // Always put user's dealership first, then benchmark, then other dealers
        selectedDealers = [userDealership, cgBenchmark, ...otherDealers];
    } else {
        // If no dealers selected, show user's dealership and benchmark
        selectedDealers = [userDealership, cgBenchmark];
    }
}

// Build comparison table
function buildComparisonTable() {
    const tbody = document.getElementById('compare-tbody');
    
    // Clear existing content
    tbody.innerHTML = '';
    
    // Create header row with competitor logos
    const competitorHeader = document.createElement('tr');
    competitorHeader.className = 'competitor-header-row';
    competitorHeader.innerHTML = '<th class="section-header"></th>'; // Empty cell for alignment
    
    selectedDealers.forEach(dealer => {
        const th = document.createElement('th');
        th.className = 'competitor-cell';
        
        // Build logo content
        let logoContent;
        if (dealer.isBenchmark) {
            // Use benchmark image for CG Benchmark
            logoContent = `<img src="../img/store_logo/benchmark.png" srcset="../img/store_logo/benchmark@2x.png 2x" alt="${dealer.name}">`;
        } else if (dealer.id <= 11) {
            logoContent = `<img src="../img/store_logo/store_${dealer.id}.png" srcset="../img/store_logo/store_${dealer.id}@2x.png 2x" alt="${dealer.name}">`;
        } else {
            logoContent = `<div class="logo-placeholder" style="background-color: ${dealer.logoColor};">
                <span>${dealer.name.charAt(0)}</span>
              </div>`;
        }
        
        th.innerHTML = `
            <div class="competitor-logo">
                ${logoContent}
            </div>
            <div class="competitor-name">${dealer.name}</div>
        `;
        competitorHeader.appendChild(th);
    });
    tbody.appendChild(competitorHeader);
    
    // Define sections with metrics
    const sections = [
        {
            name: 'Performance',
            metrics: [
                { key: 'leadPerVehicle', label: 'Lead per vehicle', format: 'decimal' },
                { key: 'srpToVdp', label: 'SRP to VDP conversion rate', format: 'percent' },
                { key: 'turnTime', label: 'Turn time', format: 'days' },
                { key: 'fairShare', label: 'Fair Share', format: 'decimal' },
                { key: 'vdpPerVehicle', label: 'VDP per vehicle', format: 'decimal' }
            ]
        },
        {
            name: 'Store information',
            metrics: [
                { key: 'inventory', label: 'Inventory', format: 'number' },
                { key: 'avgPrice', label: 'Average price', format: 'currency' },
                { key: 'distance', label: 'Distance', format: 'distance' }
            ]
        },
        {
            name: 'Deal rating',
            metrics: [
                { key: 'greatDeal', label: '% in Great deal', format: 'percent' },
                { key: 'goodDeal', label: '% in Good deal', format: 'percent' },
                { key: 'fairDeal', label: '% in Fair deal', format: 'percent' },
                { key: 'highPriced', label: '% in High-priced deal', format: 'percent' },
                { key: 'overPriced', label: '% in Over-priced deal', format: 'percent' }
            ]
        },
        {
            name: 'Overlap by vehicle type',
            metrics: [
                { key: 'overlapCompact', label: 'Compact', format: 'percent' },
                { key: 'overlapSedans', label: 'Sedans', format: 'percent' },
                { key: 'overlapSuvCo', label: 'SUV/CO', format: 'percent' },
                { key: 'overlapTrucks', label: 'Trucks', format: 'percent' },
                { key: 'overlapLuxury', label: 'Luxury', format: 'percent' }
            ]
        },
        {
            name: 'Inventory',
            metrics: [
                { key: 'radarChart', label: 'Inventory Distribution', format: 'chart' },
                { key: 'invCompact', label: 'Compact', format: 'percent' },
                { key: 'invSedans', label: 'Sedans', format: 'percent' },
                { key: 'invSuvCo', label: 'SUV/CO', format: 'percent' },
                { key: 'invTrucks', label: 'Trucks', format: 'percent' },
                { key: 'invLuxury', label: 'Luxury', format: 'percent' }
            ]
        }
    ];
    
    // Add sections and metrics
    sections.forEach((section, sectionIndex) => {
        // Add section header row
        const sectionRow = document.createElement('tr');
        sectionRow.className = 'section-row';
        sectionRow.setAttribute('data-section', sectionIndex);
        sectionRow.innerHTML = `
            <td class="section-header" colspan="${selectedDealers.length + 1}">
                <span class="section-name">${section.name}</span>
                <span class="collapse-icon">▼</span>
            </td>
        `;
        tbody.appendChild(sectionRow);
        
        // Add metric rows for this section
        section.metrics.forEach(metric => {
            const metricRow = document.createElement('tr');
            metricRow.className = 'metric-row';
            metricRow.setAttribute('data-section', sectionIndex);
            
            if (metric.key === 'radarChart' && section.name === 'Inventory') {
                // Special handling for radar chart row - create separate chart for each dealer
                metricRow.innerHTML = `<td class="metric-label">${metric.label}</td>`;
                
                // Create a separate cell with radar chart for each dealer
                selectedDealers.forEach((dealer, dealerIndex) => {
                    const td = document.createElement('td');
                    td.className = 'radar-chart-cell';
                    
                    // Create canvas for radar chart
                    const canvas = document.createElement('canvas');
                    canvas.id = `inventoryRadarChart-${dealerIndex}`;
                    canvas.width = 300;
                    canvas.height = 250;
                    td.appendChild(canvas);
                    
                    metricRow.appendChild(td);
                });
                
                tbody.appendChild(metricRow);
                
                // Create individual radar charts after DOM is ready
                setTimeout(() => {
                    selectedDealers.forEach((dealer, dealerIndex) => {
                        createRadarChart(dealer, dealerIndex);
                    });
                }, 100);
            } else {
                // Normal metric rows
                metricRow.innerHTML = `<td class="metric-label">${metric.label}</td>`;
                
                selectedDealers.forEach((dealer, dealerIndex) => {
                    const td = document.createElement('td');
                    td.className = 'metric-value';
                    
                    // Get value based on metric key
                    let value = getMetricValue(dealer, metric.key, dealerIndex);
                    
                    // Format value based on type
                    switch (metric.format) {
                        case 'percent':
                            td.textContent = value !== 'N/A' ? `${value}%` : 'N/A';
                            break;
                        case 'currency':
                            td.textContent = value !== 'N/A' ? `$${value.toLocaleString()}` : 'N/A';
                            break;
                        case 'decimal':
                            // Special handling for VDP per vehicle with benchmark tooltip
                            if (metric.key === 'vdpPerVehicle' && dealer.isBenchmark) {
                                td.innerHTML = `
                                    <span class="metric-with-tooltip">
                                        ${value.toFixed(1)}
                                        <span class="tooltip-icon">
                                            <img src="../img/info_icon.svg" alt="Info" />
                                            <span class="tooltip-text">78% of the dealers with higher VDP per vehicle is using Highlight.</span>
                                        </span>
                                    </span>
                                `;
                            } else {
                                td.textContent = value !== 'N/A' ? value.toFixed(1) : 'N/A';
                            }
                            break;
                        case 'days':
                            td.textContent = value !== 'N/A' ? `${value} days` : 'N/A';
                            break;
                        case 'distance':
                            td.textContent = value !== 'N/A' ? `${value} mi` : 'N/A';
                            break;
                        default:
                            td.textContent = value !== 'N/A' ? value : 'N/A';
                    }
                    
                    metricRow.appendChild(td);
                });
                
                tbody.appendChild(metricRow);
            }
        });
    });
    
    // Add click handlers for collapsible sections
    initializeCollapsibleSections();
}

// Get metric value from dealer data
function getMetricValue(dealer, key, dealerIndex) {
    // Performance metrics
    if (key === 'leadPerVehicle') {
        const leadRates = { 1: 2.1, 2: 2.5, 3: 1.7, 4: 1.9, 5: 2.3, 6: 1.5, 7: 2.8, 8: 1.2, 9: 2.0, 10: 1.8, 11: 3.1, 12: 1.4, 13: 3.5, 14: 2.2, 15: 1.6 };
        return leadRates[dealer.id] || 2.0;
    }
    if (key === 'srpToVdp') {
        const conversionRates = { 1: 3.6, 2: 4.1, 3: 1.9, 4: 3.2, 5: 3.8, 6: 2.5, 7: 4.5, 8: 2.1, 9: 3.5, 10: 3.0, 11: 4.8, 12: 2.3, 13: 5.2, 14: 3.7, 15: 2.8 };
        return conversionRates[dealer.id] || 3.5;
    }
    if (key === 'turnTime') {
        const turnTimes = { 1: 43, 2: 39, 3: 48, 4: 36, 5: 41, 6: 53, 7: 37, 8: 49, 9: 40, 10: 45, 11: 35, 12: 51, 13: 33, 14: 42, 15: 47 };
        return turnTimes[dealer.id] || 40;
    }
    if (key === 'fairShare') {
        const fairShares = { 1: 1.5, 2: 0.8, 3: 1.2, 4: 1.1, 5: 1.3, 6: 0.7, 7: 0.9, 8: 0.6, 9: 1.0, 10: 0.9, 11: 1.4, 12: 0.8, 13: 1.6, 14: 1.0, 15: 0.6 };
        return fairShares[dealer.id] || 1.0;
    }
    if (key === 'vdpPerVehicle') {
        // Handle benchmark separately
        if (dealer.isBenchmark) return 12.5;
        const vdpRates = { 1: 15.2, 2: 13.8, 3: 11.5, 4: 14.3, 5: 12.9, 6: 10.2, 7: 16.1, 8: 9.8, 9: 13.5, 10: 12.1, 11: 17.4, 12: 10.5, 13: 18.2, 14: 14.7, 15: 11.3 };
        return vdpRates[dealer.id] || 13.0;
    }
    
    // Store information
    if (key === 'avgPrice') {
        const prices = { 1: 24097, 2: 26230, 3: 29166, 4: 22500, 5: 25800, 6: 18900, 7: 27400, 8: 45600, 9: 21300, 10: 19800, 11: 28900, 12: 42000, 13: 31200, 14: 26700, 15: 17500 };
        return prices[dealer.id] || 25000;
    }
    
    // Deal rating (from pricing data)
    if (dealer.pricingData) {
        if (key === 'greatDeal') return dealer.pricingData['Great deal'].percent;
        if (key === 'goodDeal') return dealer.pricingData['Good deal'].percent;
        if (key === 'fairDeal') return dealer.pricingData['Fair deal'].percent;
        if (key === 'highPriced') return dealer.pricingData['High priced'].percent;
        if (key === 'overPriced') return dealer.pricingData['Over priced'].percent;
    }
    
    // Overlap by vehicle type (mock data)
    if (key.startsWith('overlap')) {
        // For simplicity, showing N/A for the first dealer (your store)
        if (dealerIndex === 0) return 'N/A';
        const overlaps = {
            overlapCompact: { 2: 4.9, 3: 4.3, 4: 3.8, 5: 5.2, 6: 2.9, 7: 4.5, 8: 2.1, 9: 4.0, 10: 3.5, 11: 5.5, 12: 2.5, 13: 5.8, 14: 4.2, 15: 3.0 },
            overlapSedans: { 2: 2.1, 3: 2.1, 4: 3.5, 5: 1.8, 6: 4.2, 7: 2.8, 8: 1.5, 9: 3.0, 10: 2.5, 11: 3.2, 12: 1.9, 13: 3.8, 14: 2.6, 15: 2.2 },
            overlapSuvCo: { 2: 3.6, 3: 4.3, 4: 5.1, 5: 3.2, 6: 4.8, 7: 5.5, 8: 2.8, 9: 4.5, 10: 4.0, 11: 5.8, 12: 3.0, 13: 6.2, 14: 4.7, 15: 3.5 },
            overlapTrucks: { 2: 1.0, 3: 2.1, 4: 3.2, 5: 0.8, 6: 2.5, 7: 3.8, 8: 0.5, 9: 2.8, 10: 3.5, 11: 4.2, 12: 0.8, 13: 4.5, 14: 3.0, 15: 1.5 },
            overlapLuxury: { 2: 4.3, 3: 4.3, 4: 3.0, 5: 6.5, 6: 1.8, 7: 2.5, 8: 8.5, 9: 2.2, 10: 1.5, 11: 3.8, 12: 7.2, 13: 2.0, 14: 2.2, 15: 1.0 }
        };
        return overlaps[key][dealer.id] || 3.0;
    }
    
    // Inventory percentages (from inventoryData)
    if (dealer.inventoryData) {
        if (key === 'invCompact') return dealer.inventoryData['Compact'].thisLocation;
        if (key === 'invSedans') return dealer.inventoryData['Sedans'].thisLocation;
        if (key === 'invSuvCo') return dealer.inventoryData['SUV/CO'].thisLocation;
        if (key === 'invTrucks') return dealer.inventoryData['Trucks'].thisLocation;
        if (key === 'invLuxury') return dealer.inventoryData['Luxury'].thisLocation;
    }
    
    // Default dealer properties
    return dealer[key] || 'N/A';
}

// Initialize collapsible sections
function initializeCollapsibleSections() {
    const sectionRows = document.querySelectorAll('.section-row');
    
    sectionRows.forEach(row => {
        row.addEventListener('click', function() {
            const sectionIndex = this.getAttribute('data-section');
            const metricRows = document.querySelectorAll(`.metric-row[data-section="${sectionIndex}"]`);
            const collapseIcon = this.querySelector('.collapse-icon');
            
            // Toggle collapsed state
            this.classList.toggle('collapsed');
            
            // Toggle metric rows visibility
            metricRows.forEach(metricRow => {
                metricRow.classList.toggle('hidden');
            });
            
            // Update collapse icon
            collapseIcon.textContent = this.classList.contains('collapsed') ? '▶' : '▼';
        });
    });
}

// Create radar chart for inventory distribution
function createRadarChart(dealer, dealerIndex) {
    const canvas = document.getElementById(`inventoryRadarChart-${dealerIndex}`);
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Prepare data for the dealer
    const inventoryData = dealer.inventoryData;
    const data = [
        inventoryData['Compact'].thisLocation,
        inventoryData['Sedans'].thisLocation,
        inventoryData['SUV/CO'].thisLocation,
        inventoryData['Trucks'].thisLocation,
        inventoryData['Luxury'].thisLocation
    ];
    
    // Color schemes for different dealers
    const colors = [
        { border: '#EF4444', background: 'rgba(239, 68, 68, 0.2)' },
        { border: '#3B82F6', background: 'rgba(59, 130, 246, 0.2)' },
        { border: '#8B5CF6', background: 'rgba(139, 92, 246, 0.2)' }
    ];
    
    const colorScheme = colors[dealerIndex % colors.length];
    
    // Create the radar chart
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Compact', 'Sedans', 'SUV/CO', 'Trucks', 'Luxury'],
            datasets: [{
                label: dealer.name,
                data: data,
                borderColor: colorScheme.border,
                backgroundColor: colorScheme.background,
                borderWidth: 2,
                pointBackgroundColor: colorScheme.border,
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: colorScheme.border,
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false  // Hide legend since we only have one dataset per chart
                },
                tooltip: {
                    backgroundColor: 'white',
                    titleColor: '#111827',
                    bodyColor: '#374151',
                    borderColor: '#E5E7EB',
                    borderWidth: 1,
                    cornerRadius: 6,
                    padding: 12,
                    displayColors: true,
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.r + '%';
                        }
                    }
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    grid: {
                        color: '#E5E7EB'
                    },
                    pointLabels: {
                        font: {
                            size: 11,
                            family: "'DM Sans', sans-serif"
                        },
                        color: '#374151'
                    },
                    ticks: {
                        stepSize: 5,
                        font: {
                            size: 9
                        },
                        color: '#9CA3AF',
                        backdropColor: 'transparent'
                    },
                    suggestedMin: 0,
                    suggestedMax: 25
                }
            }
        }
    });
}