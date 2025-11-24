// Mock Data for Trends Page
// This file contains all mock data variations for different filter combinations
// Extended from lpv-2-data.js with additional buyer overlap data

const TRENDS_MOCK_DATA = {
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
                totalLeads: [175, 155, 205, 170, 220, 295, 210, 255, 210, 265, 215, 285, 270],
                marketAvg: [2.3, 2.2, 2.4, 2.3, 2.3, 2.4, 2.2, 2.4, 2.3, 2.3, 2.2, 2.4, 2.3]
            },
            'Franchise': {
                inventory: [98, 84, 91, 79, 94, 88, 82, 96, 86, 92, 80, 95, 87],
                totalLeads: [200, 180, 210, 195, 230, 305, 215, 265, 240, 270, 245, 295, 285],
                marketAvg: [2.5, 2.4, 2.6, 2.5, 2.5, 2.6, 2.4, 2.6, 2.5, 2.5, 2.4, 2.6, 2.5]
            },
            'Independent': {
                inventory: [86, 72, 79, 67, 82, 76, 70, 84, 74, 80, 68, 83, 75],
                totalLeads: [170, 150, 180, 165, 195, 265, 180, 225, 200, 230, 205, 255, 240],
                marketAvg: [2.1, 2.0, 2.2, 2.1, 2.1, 2.2, 2.0, 2.2, 2.1, 2.1, 2.0, 2.2, 2.1]
            }
        },
        '10 miles': {
            'All': {
                inventory: [108, 92, 100, 86, 105, 98, 90, 107, 94, 102, 88, 106, 96],
                totalLeads: [215, 195, 255, 210, 275, 360, 260, 305, 260, 320, 270, 350, 330],
                marketAvg: [2.5, 2.4, 2.6, 2.5, 2.5, 2.6, 2.4, 2.6, 2.5, 2.5, 2.4, 2.6, 2.5]
            },
            'Franchise': {
                inventory: [113, 97, 105, 91, 110, 103, 95, 112, 99, 107, 93, 111, 101],
                totalLeads: [245, 220, 255, 235, 280, 365, 255, 315, 290, 325, 295, 355, 340],
                marketAvg: [2.7, 2.6, 2.8, 2.7, 2.7, 2.8, 2.6, 2.8, 2.7, 2.7, 2.6, 2.8, 2.7]
            },
            'Independent': {
                inventory: [103, 87, 95, 81, 100, 93, 85, 102, 89, 97, 83, 101, 91],
                totalLeads: [215, 190, 225, 205, 250, 325, 225, 275, 250, 285, 255, 315, 300],
                marketAvg: [2.3, 2.2, 2.4, 2.3, 2.3, 2.4, 2.2, 2.4, 2.3, 2.3, 2.2, 2.4, 2.3]
            }
        },
        '25 miles': {
            'All': {
                inventory: [124, 108, 116, 102, 121, 114, 106, 123, 110, 118, 104, 122, 112],
                totalLeads: [255, 235, 295, 250, 325, 430, 305, 365, 310, 380, 325, 420, 395],
                marketAvg: [2.7, 2.6, 2.8, 2.7, 2.7, 2.8, 2.6, 2.8, 2.7, 2.7, 2.6, 2.8, 2.7]
            },
            'Franchise': {
                inventory: [127, 111, 119, 105, 124, 117, 109, 126, 113, 121, 107, 125, 115],
                totalLeads: [285, 260, 295, 275, 325, 430, 300, 370, 340, 380, 350, 420, 400],
                marketAvg: [2.9, 2.8, 3.0, 2.9, 2.9, 3.0, 2.8, 3.0, 2.9, 2.9, 2.8, 3.0, 2.9]
            },
            'Independent': {
                inventory: [121, 105, 113, 99, 118, 111, 103, 120, 107, 115, 101, 119, 109],
                totalLeads: [255, 230, 265, 245, 295, 390, 270, 330, 300, 340, 310, 380, 360],
                marketAvg: [2.5, 2.4, 2.6, 2.5, 2.5, 2.6, 2.4, 2.6, 2.5, 2.5, 2.4, 2.6, 2.5]
            }
        },
        '50 miles': {
            'All': {
                inventory: [135, 118, 127, 112, 132, 125, 117, 134, 120, 129, 114, 133, 123],
                totalLeads: [285, 260, 325, 280, 360, 480, 340, 405, 350, 425, 365, 470, 445],
                marketAvg: [2.8, 2.7, 2.9, 2.8, 2.8, 2.9, 2.7, 2.9, 2.8, 2.8, 2.7, 2.9, 2.8]
            },
            'Franchise': {
                inventory: [138, 121, 130, 115, 135, 128, 120, 137, 123, 132, 117, 136, 126],
                totalLeads: [315, 285, 325, 305, 360, 480, 330, 410, 380, 425, 390, 470, 450],
                marketAvg: [3.0, 2.9, 3.1, 3.0, 3.0, 3.1, 2.9, 3.1, 3.0, 3.0, 2.9, 3.1, 3.0]
            },
            'Independent': {
                inventory: [132, 115, 124, 109, 129, 122, 114, 131, 117, 126, 111, 130, 120],
                totalLeads: [285, 255, 295, 275, 330, 440, 300, 370, 340, 385, 350, 430, 410],
                marketAvg: [2.6, 2.5, 2.7, 2.6, 2.6, 2.7, 2.5, 2.7, 2.6, 2.6, 2.5, 2.7, 2.6]
            }
        },
        'All': {
            'All': {
                inventory: [145, 132, 138, 125, 141, 135, 128, 143, 130, 137, 126, 140, 133],
                totalLeads: [380, 350, 395, 360, 385, 425, 390, 405, 385, 400, 390, 415, 405],
                marketAvg: [2.9, 2.8, 3.0, 2.9, 2.9, 3.0, 2.8, 3.0, 2.9, 2.9, 2.8, 3.0, 2.9]
            },
            'Franchise': {
                inventory: [148, 135, 141, 128, 144, 138, 131, 146, 133, 140, 129, 143, 136],
                totalLeads: [335, 305, 345, 325, 385, 510, 355, 440, 410, 455, 420, 500, 480],
                marketAvg: [3.1, 3.0, 3.2, 3.1, 3.1, 3.2, 3.0, 3.2, 3.1, 3.1, 3.0, 3.2, 3.1]
            },
            'Independent': {
                inventory: [142, 129, 135, 122, 138, 132, 125, 140, 127, 134, 123, 137, 130],
                totalLeads: [305, 275, 315, 295, 355, 470, 325, 400, 370, 415, 380, 460, 440],
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
            inventoryShare: 0.40,      // 40% of inventory (increased to dominate)
            // Great Deals show very strong upward trend and high performance
            leadsPerformance: [1.50, 1.55, 1.65, 1.60, 1.75, 1.70, 1.80, 1.90, 1.85, 1.95, 1.90, 2.05, 2.00]
        },
        'Good Deal': {
            inventoryShare: 0.35,      // 35% of inventory (most vehicles here)
            // Good Deals show strong upward trend
            leadsPerformance: [1.20, 1.25, 1.35, 1.30, 1.45, 1.40, 1.48, 1.55, 1.50, 1.60, 1.55, 1.68, 1.65]
        },
        'Fair Deal': {
            inventoryShare: 0.18,      // 18% of inventory (reduced)
            // Fair Deals stay relatively low and flat
            leadsPerformance: [0.60, 0.58, 0.62, 0.59, 0.63, 0.60, 0.62, 0.65, 0.62, 0.64, 0.61, 0.63, 0.62]
        },
        'High Priced': {
            inventoryShare: 0.05,      // Only 5% of inventory (reduced)
            // High Priced stays very low and flat
            leadsPerformance: [0.35, 0.33, 0.37, 0.34, 0.36, 0.32, 0.35, 0.38, 0.34, 0.36, 0.33, 0.35, 0.34]
        },
        'Over Priced': {
            inventoryShare: 0.02,      // Only 2% of inventory (very few overpriced)
            // Over Priced stays extremely low and flat
            leadsPerformance: [0.15, 0.13, 0.17, 0.14, 0.16, 0.12, 0.15, 0.18, 0.14, 0.16, 0.13, 0.15, 0.14]
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
    },

    // Lead type distribution (share of total leads and quality multipliers)
    leadTypeData: {
        'Standard email': {
            leadsShare: 0.40,              // 40% of total leads
            qualityMultiplier: 1.0         // Baseline quality
        },
        'Phone': {
            leadsShare: 0.25,              // 25% of total leads
            qualityMultiplier: 1.1         // Higher quality - direct contact
        },
        'Digital deal': {
            leadsShare: 0.15,              // 15% of total leads
            qualityMultiplier: 1.25        // Highest quality - high intent
        },
        'Chat': {
            leadsShare: 0.12,              // 12% of total leads
            qualityMultiplier: 0.9         // Lower quality - casual inquiry
        },
        'Text': {
            leadsShare: 0.08,              // 8% of total leads
            qualityMultiplier: 0.95        // Slightly lower quality
        }
    },

    // NEW: Buyer Overlap Data (average number of competitive shoppers per vehicle)
    // Baseline values for 13 months with multipliers by vehicle type, deal rating, and brand
    buyerOverlapData: {
        // Baseline buyer overlap per vehicle over time (13 months)
        // U-shaped pattern for dealership: starts high, dips in middle, gradual recovery with realistic noise
        baseline: [6.3, 5.9, 6.4, 5.7, 4.9, 4.6, 4.9, 4.7, 5.3, 5.1, 5.7, 5.9, 5.6],

        // Market average baseline - stable around 5.5 with realistic minor monthly variation
        marketAverageBaseline: [5.6, 5.4, 5.7, 5.5, 5.3, 5.6, 5.4, 5.8, 5.5, 5.4, 5.7, 5.6, 5.4],

        // Vehicle type affects buyer overlap
        // More popular vehicle types = more competitive shoppers
        vehicleTypeMultiplier: {
            'Compact': 0.85,        // Less competitive segment
            'Sedans': 0.90,         // Moderate competition
            'SUV/CO': 1.15,         // Most competitive segment
            'Truck': 1.05,          // Above average competition
            'Luxury': 0.95          // Moderate competition (niche market)
        },

        // Deal rating affects buyer overlap
        // Most competition is in the Fair/Good deal range where buyers are most active
        dealRatingMultiplier: {
            'Great Deal': 1.00,     // Moderate competition
            'Good Deal': 1.35,      // High competition
            'Fair Deal': 1.50,      // Highest competition - sweet spot for buyers
            'High Priced': 0.70,    // Low competition
            'Over Priced': 0.45     // Very low competition
        },

        // Brand affects buyer overlap
        // Popular brands = more competitive shoppers
        brandMultiplier: {
            'All': 1.0,
            'Toyota': 1.10,
            'Honda': 1.08,
            'Nissan': 0.98,
            'Volvo': 0.92,
            'Multi-brand': 1.02,
            'Luxury': 0.95
        },

        // Time-based trend multipliers for specific deal ratings (13 months)
        // Fair Deal and Good Deal show increasing competition over time with realistic variation
        // Generated with base trend + random noise for natural patterns
        dealRatingTrendMultiplier: {
            'Great Deal': [0.97, 1.03, 0.99, 1.06, 0.98, 1.01, 1.04, 1.02, 0.99, 1.04, 1.01, 1.03, 1.05],
            'Good Deal': [0.84, 0.91, 0.87, 0.97, 0.94, 1.06, 1.13, 1.22, 1.17, 1.29, 1.24, 1.37, 1.31],
            'Fair Deal': [0.79, 0.89, 0.83, 0.96, 0.91, 1.07, 1.19, 1.29, 1.24, 1.39, 1.33, 1.49, 1.44],
            'High Priced': [1.01, 0.97, 1.06, 0.94, 1.03, 0.97, 1.06, 0.99, 1.01, 0.96, 1.04, 0.99, 1.03],
            'Over Priced': [1.06, 0.94, 1.03, 0.97, 1.06, 0.94, 1.09, 0.96, 1.01, 0.99, 1.04, 0.96, 1.01]
        }
    },

    // Conversion Funnel Data - tracking conversion rates over time
    // Shows how SRP → VDP → Leads conversion changes month over month
    conversionFunnelData: {
        // Your dealership conversion rates (%)
        dealer: {
            // SRP to VDP conversion rate (% of SRP viewers who visit VDP)
            srpToVdp: [23.8, 24.1, 24.3, 23.5, 24.0, 24.2, 24.5, 24.8, 25.0, 25.2, 24.9, 25.5, 25.3],
            // SRP to Leads conversion rate (% of SRP viewers who convert to leads)
            srpToLeads: [1.55, 1.58, 1.60, 1.52, 1.56, 1.59, 1.62, 1.65, 1.68, 1.70, 1.67, 1.73, 1.71]
        },
        // Market average conversion rates (%)
        market: {
            // SRP to VDP conversion rate
            srpToVdp: [19.5, 19.7, 19.8, 19.6, 19.8, 19.9, 20.0, 20.1, 20.2, 20.3, 20.1, 20.4, 20.2],
            // SRP to Leads conversion rate
            srpToLeads: [1.42, 1.43, 1.44, 1.41, 1.43, 1.44, 1.45, 1.46, 1.47, 1.48, 1.46, 1.49, 1.47]
        },
        // Conversion rates by deal rating
        // Patterns: Great Deal highest and growing, Over Priced lowest and volatile
        // Values include realistic month-to-month variations with overall upward trends
        byDealRating: {
            'Great Deal': {
                srpToLeads: [2.06, 2.11, 2.17, 2.09, 2.24, 2.23, 2.31, 2.29, 2.34, 2.37, 2.43, 2.41, 2.49]
            },
            'Good Deal': {
                srpToLeads: [1.73, 1.84, 1.79, 1.89, 1.87, 1.94, 1.93, 1.97, 2.03, 1.99, 2.09, 2.07, 2.13]
            },
            'Fair Deal': {
                srpToLeads: [1.26, 1.37, 1.31, 1.41, 1.36, 1.47, 1.44, 1.52, 1.49, 1.57, 1.54, 1.63, 1.59]
            },
            'High Priced': {
                srpToLeads: [0.54, 0.63, 0.59, 0.67, 0.64, 0.73, 0.69, 0.77, 0.74, 0.83, 0.79, 0.86, 0.84]
            },
            'Over Priced': {
                srpToLeads: [0.24, 0.33, 0.29, 0.39, 0.36, 0.46, 0.43, 0.49, 0.47, 0.56, 0.53, 0.59, 0.57]
            }
        },
        // Conversion rates by vehicle type
        // SUV/CO and Sedans are top performers with steady growth
        // Patterns include realistic seasonal variations and noise
        byVehicleType: {
            'Compact': {
                srpToLeads: [1.34, 1.43, 1.39, 1.49, 1.47, 1.56, 1.53, 1.59, 1.57, 1.66, 1.64, 1.73, 1.69]
            },
            'Sedans': {
                srpToLeads: [1.81, 1.89, 1.86, 1.96, 1.94, 2.03, 1.99, 2.09, 2.07, 2.16, 2.13, 2.23, 2.19]
            },
            'SUV/CO': {
                srpToLeads: [1.94, 2.03, 1.99, 2.09, 2.07, 2.16, 2.13, 2.23, 2.19, 2.29, 2.27, 2.36, 2.33]
            },
            'Truck': {
                srpToLeads: [1.64, 1.73, 1.69, 1.79, 1.77, 1.86, 1.83, 1.93, 1.89, 1.99, 1.97, 2.06, 2.03]
            },
            'Luxury': {
                srpToLeads: [1.41, 1.49, 1.46, 1.56, 1.53, 1.59, 1.57, 1.66, 1.63, 1.73, 1.69, 1.79, 1.76]
            }
        }
    }
};
