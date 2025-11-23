// Mock Data for Total Leads Page
// This file contains all mock data variations for different filter combinations

const MOCK_DATA = {
    // Base data structure for 13 months
    months: [
        'Oct 2024', 'Nov 2024', 'Dec 2024', 'Jan 2025', 'Feb 2025', 'Mar 2025',
        'Apr 2025', 'May 2025', 'Jun 2025', 'Jul 2025', 'Aug 2025', 'Sep 2025', 'Oct 2025'
    ],

    // Data variations by Radius and Franchise Type
    // Structure: [radius][franchiseType]
    dataByRadiusAndFranchise: {
        '5 miles': {
            'All': {
                inventory: [92, 78, 85, 73, 88, 82, 76, 90, 80, 86, 74, 89, 81],
                totalLeads: [175, 155, 205, 170, 220, 185, 210, 255, 210, 265, 215, 285, 270],
                marketAvg: [2.3, 2.2, 2.4, 2.3, 2.3, 2.4, 2.2, 2.4, 2.3, 2.3, 2.2, 2.4, 2.3]
            },
            'Franchise': {
                inventory: [98, 84, 91, 79, 94, 88, 82, 96, 86, 92, 80, 95, 87],
                totalLeads: [200, 180, 210, 195, 230, 220, 215, 265, 240, 270, 245, 295, 285],
                marketAvg: [2.5, 2.4, 2.6, 2.5, 2.5, 2.6, 2.4, 2.6, 2.5, 2.5, 2.4, 2.6, 2.5]
            },
            'Independent': {
                inventory: [86, 72, 79, 67, 82, 76, 70, 84, 74, 80, 68, 83, 75],
                totalLeads: [170, 150, 180, 165, 195, 185, 180, 225, 200, 230, 205, 255, 240],
                marketAvg: [2.1, 2.0, 2.2, 2.1, 2.1, 2.2, 2.0, 2.2, 2.1, 2.1, 2.0, 2.2, 2.1]
            }
        },
        '10 miles': {
            'All': {
                inventory: [108, 92, 100, 86, 105, 98, 90, 107, 94, 102, 88, 106, 96],
                totalLeads: [215, 195, 255, 210, 275, 235, 260, 305, 260, 320, 270, 350, 330],
                marketAvg: [2.5, 2.4, 2.6, 2.5, 2.5, 2.6, 2.4, 2.6, 2.5, 2.5, 2.4, 2.6, 2.5]
            },
            'Franchise': {
                inventory: [113, 97, 105, 91, 110, 103, 95, 112, 99, 107, 93, 111, 101],
                totalLeads: [245, 220, 255, 235, 280, 265, 255, 315, 290, 325, 295, 355, 340],
                marketAvg: [2.7, 2.6, 2.8, 2.7, 2.7, 2.8, 2.6, 2.8, 2.7, 2.7, 2.6, 2.8, 2.7]
            },
            'Independent': {
                inventory: [103, 87, 95, 81, 100, 93, 85, 102, 89, 97, 83, 101, 91],
                totalLeads: [215, 190, 225, 205, 250, 235, 225, 275, 250, 285, 255, 315, 300],
                marketAvg: [2.3, 2.2, 2.4, 2.3, 2.3, 2.4, 2.2, 2.4, 2.3, 2.3, 2.2, 2.4, 2.3]
            }
        },
        '25 miles': {
            'All': {
                inventory: [124, 108, 116, 102, 121, 114, 106, 123, 110, 118, 104, 122, 112],
                totalLeads: [255, 235, 295, 250, 325, 280, 305, 365, 310, 380, 325, 420, 395],
                marketAvg: [2.7, 2.6, 2.8, 2.7, 2.7, 2.8, 2.6, 2.8, 2.7, 2.7, 2.6, 2.8, 2.7]
            },
            'Franchise': {
                inventory: [127, 111, 119, 105, 124, 117, 109, 126, 113, 121, 107, 125, 115],
                totalLeads: [285, 260, 295, 275, 325, 310, 300, 370, 340, 380, 350, 420, 400],
                marketAvg: [2.9, 2.8, 3.0, 2.9, 2.9, 3.0, 2.8, 3.0, 2.9, 2.9, 2.8, 3.0, 2.9]
            },
            'Independent': {
                inventory: [121, 105, 113, 99, 118, 111, 103, 120, 107, 115, 101, 119, 109],
                totalLeads: [255, 230, 265, 245, 295, 280, 270, 330, 300, 340, 310, 380, 360],
                marketAvg: [2.5, 2.4, 2.6, 2.5, 2.5, 2.6, 2.4, 2.6, 2.5, 2.5, 2.4, 2.6, 2.5]
            }
        },
        '50 miles': {
            'All': {
                inventory: [135, 118, 127, 112, 132, 125, 117, 134, 120, 129, 114, 133, 123],
                totalLeads: [285, 260, 325, 280, 360, 315, 340, 405, 350, 425, 365, 470, 445],
                marketAvg: [2.8, 2.7, 2.9, 2.8, 2.8, 2.9, 2.7, 2.9, 2.8, 2.8, 2.7, 2.9, 2.8]
            },
            'Franchise': {
                inventory: [138, 121, 130, 115, 135, 128, 120, 137, 123, 132, 117, 136, 126],
                totalLeads: [315, 285, 325, 305, 360, 345, 330, 410, 380, 425, 390, 470, 450],
                marketAvg: [3.0, 2.9, 3.1, 3.0, 3.0, 3.1, 2.9, 3.1, 3.0, 3.0, 2.9, 3.1, 3.0]
            },
            'Independent': {
                inventory: [132, 115, 124, 109, 129, 122, 114, 131, 117, 126, 111, 130, 120],
                totalLeads: [285, 255, 295, 275, 330, 315, 300, 370, 340, 385, 350, 430, 410],
                marketAvg: [2.6, 2.5, 2.7, 2.6, 2.6, 2.7, 2.5, 2.7, 2.6, 2.6, 2.5, 2.7, 2.6]
            }
        },
        'All': {
            'All': {
                inventory: [145, 132, 138, 125, 141, 135, 128, 143, 130, 137, 126, 140, 133],
                totalLeads: [380, 350, 395, 360, 385, 370, 390, 405, 385, 400, 390, 415, 405],
                marketAvg: [2.9, 2.8, 3.0, 2.9, 2.9, 3.0, 2.8, 3.0, 2.9, 2.9, 2.8, 3.0, 2.9]
            },
            'Franchise': {
                inventory: [148, 135, 141, 128, 144, 138, 131, 146, 133, 140, 129, 143, 136],
                totalLeads: [335, 305, 345, 325, 385, 370, 355, 440, 410, 455, 420, 500, 480],
                marketAvg: [3.1, 3.0, 3.2, 3.1, 3.1, 3.2, 3.0, 3.2, 3.1, 3.1, 3.0, 3.2, 3.1]
            },
            'Independent': {
                inventory: [142, 129, 135, 122, 138, 132, 125, 140, 127, 134, 123, 137, 130],
                totalLeads: [305, 275, 315, 295, 355, 340, 325, 400, 370, 415, 380, 460, 440],
                marketAvg: [2.7, 2.6, 2.8, 2.7, 2.7, 2.8, 2.6, 2.8, 2.7, 2.7, 2.6, 2.8, 2.7]
            }
        }
    },

    // Vehicle type breakdown (inventory percentage and performance over time)
    // leadsPerformance is now an array with one value per month (13 months)
    vehicleTypeData: {
        'Compact': {
            inventoryShare: 0.18,      // 18% of total inventory
            // Compact shows strong upward trend (starts low, grows significantly)
            leadsPerformance: [0.70, 0.72, 0.78, 0.75, 0.85, 0.82, 0.88, 0.95, 0.90, 1.00, 0.95, 1.08, 1.05]
        },
        'Sedans': {
            inventoryShare: 0.20,       // 20% of total inventory
            // Sedans stay relatively flat with random variation
            leadsPerformance: [0.95, 0.92, 0.97, 0.94, 0.96, 0.93, 0.95, 0.97, 0.94, 0.96, 0.93, 0.95, 0.94]
        },
        'SUV/CO': {
            inventoryShare: 0.42,       // 42% of total inventory
            // SUV/CO shows strong upward trend (already high, grows higher)
            leadsPerformance: [1.00, 1.02, 1.08, 1.05, 1.15, 1.12, 1.18, 1.25, 1.20, 1.30, 1.25, 1.38, 1.35]
        },
        'Truck': {
            inventoryShare: 0.10,       // 10% of total inventory
            // Trucks stay relatively flat with random variation
            leadsPerformance: [1.05, 1.03, 1.07, 1.04, 1.06, 1.02, 1.05, 1.08, 1.04, 1.06, 1.03, 1.05, 1.04]
        },
        'Luxury': {
            inventoryShare: 0.10,       // 10% of total inventory
            // Luxury stays flat or slightly declining
            leadsPerformance: [0.78, 0.76, 0.80, 0.75, 0.77, 0.74, 0.76, 0.79, 0.75, 0.77, 0.73, 0.75, 0.74]
        }
    },

    // Deal rating distribution (inventory share and leads performance over time)
    // leadsPerformance is now an array with one value per month (13 months)
    dealRatingData: {
        'All': {
            inventoryShare: 1.0,
            leadsPerformance: 1.0  // Still single value since "All" doesn't vary
        },
        'Great Deal': {
            inventoryShare: 0.30,      // 30% of inventory
            // Great Deals show strong upward trend (already high, getting better)
            leadsPerformance: [1.25, 1.28, 1.35, 1.32, 1.42, 1.38, 1.45, 1.52, 1.48, 1.58, 1.53, 1.65, 1.62]
        },
        'Good Deal': {
            inventoryShare: 0.35,      // 35% of inventory (most vehicles here)
            // Good Deals show moderate upward trend
            leadsPerformance: [1.05, 1.07, 1.12, 1.10, 1.18, 1.15, 1.20, 1.25, 1.22, 1.30, 1.26, 1.35, 1.32]
        },
        'Fair Deal': {
            inventoryShare: 0.25,      // 25% of inventory
            // Fair Deals stay relatively flat with random variation
            leadsPerformance: [0.85, 0.83, 0.87, 0.84, 0.86, 0.82, 0.85, 0.88, 0.84, 0.86, 0.83, 0.85, 0.84]
        },
        'High Priced': {
            inventoryShare: 0.08,      // Only 8% of inventory
            // High Priced stays low and flat
            leadsPerformance: [0.50, 0.48, 0.52, 0.49, 0.51, 0.47, 0.50, 0.53, 0.49, 0.51, 0.48, 0.50, 0.49]
        },
        'Over Priced': {
            inventoryShare: 0.02,      // Only 2% of inventory (very few overpriced)
            // Over Priced stays very low and flat
            leadsPerformance: [0.25, 0.23, 0.27, 0.24, 0.26, 0.22, 0.25, 0.28, 0.24, 0.26, 0.23, 0.25, 0.24]
        }
    },

    // Brand distribution (affects leads slightly)
    brandMultiplier: {
        'All': 1.0,
        'Toyota': 1.15,
        'Honda': 1.10,
        'Nissan': 0.95,
        'Volvo': 0.85,
        'Multi-brand': 1.05,
        'Luxury': 0.90
    }
};
