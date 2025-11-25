/**
 * Market Average Data for Conversion Page
 * Provides market benchmark data that responds to filter selections
 *
 * STRUCTURE:
 * - baseline: The market-wide average (no filters applied)
 * - byVehicleType: Segment-specific averages for each vehicle type (additive)
 * - byDealRating: Deal rating multipliers (affect conversion rates)
 * - byBrand: Brand-specific multipliers (applied to final result)
 */

const CONVERSION_MARKET_AVERAGE = {
    // Baseline market average (when all filters are selected)
    baseline: {
        searchViews: 18200,
        detailViews: 5100,
        leads: 310,
        vehicleCount: 1209
    },

    // Market averages by vehicle type (additive when multiple selected)
    byVehicleType: {
        'Compact': {
            searchViews: 2800,
            detailViews: 720,
            leads: 42,
            vehicleCount: 218
        },
        'Sedans': {
            searchViews: 3600,
            detailViews: 980,
            leads: 58,
            vehicleCount: 242
        },
        'SUV/CO': {
            searchViews: 7600,
            detailViews: 2200,
            leads: 138,
            vehicleCount: 508
        },
        'Truck': {
            searchViews: 2400,
            detailViews: 680,
            leads: 44,
            vehicleCount: 121
        },
        'Luxury': {
            searchViews: 1800,
            detailViews: 520,
            leads: 28,
            vehicleCount: 120
        }
    },

    // Deal rating multipliers (affect conversion rates)
    byDealRating: {
        'Great Deal': {
            multiplier: 1.35,
            vehicleCount: 484
        },
        'Good Deal': {
            multiplier: 1.10,
            vehicleCount: 423
        },
        'Fair Deal': {
            multiplier: 0.75,
            vehicleCount: 218
        },
        'High Priced': {
            multiplier: 0.45,
            vehicleCount: 60
        },
        'Over Priced': {
            multiplier: 0.25,
            vehicleCount: 24
        }
    },

    // Brand multipliers (applied to final result)
    byBrand: {
        'All': { multiplier: 1.0 },
        'Audi': { multiplier: 0.92 },
        'BMW': { multiplier: 0.90 },
        'Chevrolet': { multiplier: 1.02 },
        'Ford': { multiplier: 1.08 },
        'Honda': { multiplier: 1.12 },
        'Hyundai': { multiplier: 1.05 },
        'Jeep': { multiplier: 1.06 },
        'Kia': { multiplier: 1.04 },
        'Mazda': { multiplier: 1.02 },
        'Mercedes-Benz': { multiplier: 0.88 },
        'Nissan': { multiplier: 0.98 },
        'Ram': { multiplier: 1.05 },
        'Subaru': { multiplier: 1.06 },
        'Tesla': { multiplier: 1.15 },
        'Toyota': { multiplier: 1.18 },
        'Volkswagen': { multiplier: 0.96 }
    }
};
