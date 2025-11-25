/**
 * Market Search Inventory Data
 * Represents all used cars on the market within 20 mile radius of the dealer
 * This data supports dynamic grouping and filtering for market analysis
 */

const MARKET_SEARCH_INVENTORY = {
    vehicles: [
        // Toyota vehicles
        { id: "mkt-1", make: "Toyota", model: "Camry", year: 2024, trim: "LE", price: 28500, mileage: 5200, dealRating: "Great Deal", vehicleType: "Sedans", daysOnLot: 12, vdpViewsLast7Days: 45, leadsLast7Days: 1 },
        { id: "mkt-2", make: "Toyota", model: "Camry", year: 2024, trim: "SE", price: 30200, mileage: 3800, dealRating: "Good Deal", vehicleType: "Sedans", daysOnLot: 8, vdpViewsLast7Days: 52, leadsLast7Days: 1 },
        { id: "mkt-3", make: "Toyota", model: "Camry", year: 2023, trim: "LE", price: 26800, mileage: 12400, dealRating: "Great Deal", vehicleType: "Sedans", daysOnLot: 15, vdpViewsLast7Days: 38, leadsLast7Days: 1 },
        { id: "mkt-4", make: "Toyota", model: "Camry", year: 2023, trim: "XLE", price: 29500, mileage: 15200, dealRating: "Good Deal", vehicleType: "Sedans", daysOnLot: 22, vdpViewsLast7Days: 31, leadsLast7Days: 1 },
        { id: "mkt-5", make: "Toyota", model: "Camry", year: 2022, trim: "SE", price: 25200, mileage: 28600, dealRating: "Fair Deal", vehicleType: "Sedans", daysOnLot: 34, vdpViewsLast7Days: 22, leadsLast7Days: 0 },
        { id: "mkt-6", make: "Toyota", model: "RAV4", year: 2024, trim: "XLE", price: 35800, mileage: 4100, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 6, vdpViewsLast7Days: 68, leadsLast7Days: 4 },
        { id: "mkt-7", make: "Toyota", model: "RAV4", year: 2024, trim: "Limited", price: 38900, mileage: 2900, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 9, vdpViewsLast7Days: 61, leadsLast7Days: 1 },
        { id: "mkt-8", make: "Toyota", model: "RAV4", year: 2023, trim: "LE", price: 32100, mileage: 18200, dealRating: "Great Deal", vehicleType: "SUV/CO", daysOnLot: 11, vdpViewsLast7Days: 55, leadsLast7Days: 6 },
        { id: "mkt-9", make: "Toyota", model: "RAV4", year: 2023, trim: "XLE", price: 34200, mileage: 16800, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 19, vdpViewsLast7Days: 42, leadsLast7Days: 1 },
        { id: "mkt-10", make: "Toyota", model: "RAV4", year: 2022, trim: "LE", price: 29800, mileage: 32400, dealRating: "Fair Deal", vehicleType: "SUV/CO", daysOnLot: 28, vdpViewsLast7Days: 28, leadsLast7Days: 3 },
        { id: "mkt-11", make: "Toyota", model: "Highlander", year: 2024, trim: "XLE", price: 42500, mileage: 3600, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 14, vdpViewsLast7Days: 48, leadsLast7Days: 0 },
        { id: "mkt-12", make: "Toyota", model: "Highlander", year: 2023, trim: "Limited", price: 45200, mileage: 12100, dealRating: "Fair Deal", vehicleType: "SUV/CO", daysOnLot: 26, vdpViewsLast7Days: 34, leadsLast7Days: 2 },
        { id: "mkt-13", make: "Toyota", model: "Corolla", year: 2024, trim: "LE", price: 22500, mileage: 6200, dealRating: "Great Deal", vehicleType: "Compact", daysOnLot: 10, vdpViewsLast7Days: 41, leadsLast7Days: 2 },
        { id: "mkt-14", make: "Toyota", model: "Corolla", year: 2023, trim: "SE", price: 21200, mileage: 14500, dealRating: "Great Deal", vehicleType: "Compact", daysOnLot: 18, vdpViewsLast7Days: 36, leadsLast7Days: 5 },
        { id: "mkt-15", make: "Toyota", model: "Tacoma", year: 2024, trim: "SR5", price: 39800, mileage: 5800, dealRating: "Good Deal", vehicleType: "Truck", daysOnLot: 7, vdpViewsLast7Days: 58, leadsLast7Days: 3 },
        { id: "mkt-16", make: "Toyota", model: "Tacoma", year: 2023, trim: "TRD Sport", price: 42100, mileage: 11200, dealRating: "Good Deal", vehicleType: "Truck", daysOnLot: 16, vdpViewsLast7Days: 44, leadsLast7Days: 2 },

        // Honda vehicles
        { id: "mkt-17", make: "Honda", model: "Accord", year: 2024, trim: "EX", price: 29800, mileage: 4500, dealRating: "Good Deal", vehicleType: "Sedans", daysOnLot: 9, vdpViewsLast7Days: 49, leadsLast7Days: 2 },
        { id: "mkt-18", make: "Honda", model: "Accord", year: 2024, trim: "Sport", price: 31200, mileage: 3200, dealRating: "Good Deal", vehicleType: "Sedans", daysOnLot: 11, vdpViewsLast7Days: 46, leadsLast7Days: 1 },
        { id: "mkt-19", make: "Honda", model: "Accord", year: 2023, trim: "LX", price: 27500, mileage: 13800, dealRating: "Great Deal", vehicleType: "Sedans", daysOnLot: 13, vdpViewsLast7Days: 40, leadsLast7Days: 1 },
        { id: "mkt-20", make: "Honda", model: "Accord", year: 2022, trim: "EX", price: 26100, mileage: 26400, dealRating: "Fair Deal", vehicleType: "Sedans", daysOnLot: 31, vdpViewsLast7Days: 25, leadsLast7Days: 1 },
        { id: "mkt-21", make: "Honda", model: "CR-V", year: 2024, trim: "EX", price: 34500, mileage: 3900, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 8, vdpViewsLast7Days: 62, leadsLast7Days: 4 },
        { id: "mkt-22", make: "Honda", model: "CR-V", year: 2024, trim: "EX-L", price: 37200, mileage: 2800, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 10, vdpViewsLast7Days: 57, leadsLast7Days: 1 },
        { id: "mkt-23", make: "Honda", model: "CR-V", year: 2023, trim: "LX", price: 31800, mileage: 16200, dealRating: "Great Deal", vehicleType: "SUV/CO", daysOnLot: 14, vdpViewsLast7Days: 48, leadsLast7Days: 2 },
        { id: "mkt-24", make: "Honda", model: "CR-V", year: 2023, trim: "EX", price: 33500, mileage: 18900, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 21, vdpViewsLast7Days: 39, leadsLast7Days: 2 },
        { id: "mkt-25", make: "Honda", model: "CR-V", year: 2022, trim: "LX", price: 29200, mileage: 31200, dealRating: "Fair Deal", vehicleType: "SUV/CO", daysOnLot: 29, vdpViewsLast7Days: 27, leadsLast7Days: 3 },
        { id: "mkt-26", make: "Honda", model: "Civic", year: 2024, trim: "Sport", price: 25800, mileage: 5100, dealRating: "Good Deal", vehicleType: "Compact", daysOnLot: 12, vdpViewsLast7Days: 44, leadsLast7Days: 5 },
        { id: "mkt-27", make: "Honda", model: "Civic", year: 2023, trim: "LX", price: 23200, mileage: 12600, dealRating: "Great Deal", vehicleType: "Compact", daysOnLot: 15, vdpViewsLast7Days: 38, leadsLast7Days: 1 },
        { id: "mkt-28", make: "Honda", model: "Pilot", year: 2024, trim: "EX-L", price: 44200, mileage: 4200, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 17, vdpViewsLast7Days: 45, leadsLast7Days: 1 },
        { id: "mkt-29", make: "Honda", model: "Pilot", year: 2023, trim: "Touring", price: 47500, mileage: 11800, dealRating: "Fair Deal", vehicleType: "SUV/CO", daysOnLot: 24, vdpViewsLast7Days: 32, leadsLast7Days: 3 },

        // Nissan vehicles
        { id: "mkt-30", make: "Nissan", model: "Altima", year: 2024, trim: "S", price: 26500, mileage: 5800, dealRating: "Good Deal", vehicleType: "Sedans", daysOnLot: 14, vdpViewsLast7Days: 39, leadsLast7Days: 2 },
        { id: "mkt-31", make: "Nissan", model: "Altima", year: 2023, trim: "SV", price: 24800, mileage: 15200, dealRating: "Great Deal", vehicleType: "Sedans", daysOnLot: 19, vdpViewsLast7Days: 33, leadsLast7Days: 1 },
        { id: "mkt-32", make: "Nissan", model: "Altima", year: 2022, trim: "S", price: 22500, mileage: 28900, dealRating: "Fair Deal", vehicleType: "Sedans", daysOnLot: 36, vdpViewsLast7Days: 21, leadsLast7Days: 1 },
        { id: "mkt-33", make: "Nissan", model: "Rogue", year: 2024, trim: "SV", price: 32800, mileage: 4600, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 11, vdpViewsLast7Days: 51, leadsLast7Days: 6 },
        { id: "mkt-34", make: "Nissan", model: "Rogue", year: 2023, trim: "S", price: 29500, mileage: 17600, dealRating: "Great Deal", vehicleType: "SUV/CO", daysOnLot: 16, vdpViewsLast7Days: 42, leadsLast7Days: 4 },
        { id: "mkt-35", make: "Nissan", model: "Rogue", year: 2022, trim: "SV", price: 27200, mileage: 33100, dealRating: "Fair Deal", vehicleType: "SUV/CO", daysOnLot: 32, vdpViewsLast7Days: 24, leadsLast7Days: 1 },
        { id: "mkt-36", make: "Nissan", model: "Sentra", year: 2024, trim: "SV", price: 21800, mileage: 6400, dealRating: "Good Deal", vehicleType: "Compact", daysOnLot: 13, vdpViewsLast7Days: 37, leadsLast7Days: 2 },
        { id: "mkt-37", make: "Nissan", model: "Sentra", year: 2023, trim: "S", price: 19500, mileage: 16800, dealRating: "Great Deal", vehicleType: "Compact", daysOnLot: 20, vdpViewsLast7Days: 31, leadsLast7Days: 1 },
        { id: "mkt-38", make: "Nissan", model: "Pathfinder", year: 2024, trim: "SV", price: 41200, mileage: 3800, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 18, vdpViewsLast7Days: 43, leadsLast7Days: 2 },
        { id: "mkt-39", make: "Nissan", model: "Frontier", year: 2024, trim: "SV", price: 36500, mileage: 5200, dealRating: "Good Deal", vehicleType: "Truck", daysOnLot: 15, vdpViewsLast7Days: 46, leadsLast7Days: 2 },

        // Ford vehicles
        { id: "mkt-40", make: "Ford", model: "F-150", year: 2024, trim: "XLT", price: 48500, mileage: 3200, dealRating: "Good Deal", vehicleType: "Truck", daysOnLot: 5, vdpViewsLast7Days: 72, leadsLast7Days: 3 },
        { id: "mkt-41", make: "Ford", model: "F-150", year: 2024, trim: "Lariat", price: 54200, mileage: 2100, dealRating: "Good Deal", vehicleType: "Truck", daysOnLot: 7, vdpViewsLast7Days: 68, leadsLast7Days: 2 },
        { id: "mkt-42", make: "Ford", model: "F-150", year: 2023, trim: "XLT", price: 45800, mileage: 14200, dealRating: "Great Deal", vehicleType: "Truck", daysOnLot: 12, vdpViewsLast7Days: 59, leadsLast7Days: 8 },
        { id: "mkt-43", make: "Ford", model: "F-150", year: 2023, trim: "XL", price: 42100, mileage: 19800, dealRating: "Good Deal", vehicleType: "Truck", daysOnLot: 18, vdpViewsLast7Days: 48, leadsLast7Days: 4 },
        { id: "mkt-44", make: "Ford", model: "F-150", year: 2022, trim: "XLT", price: 41200, mileage: 28600, dealRating: "Fair Deal", vehicleType: "Truck", daysOnLot: 27, vdpViewsLast7Days: 35, leadsLast7Days: 2 },
        { id: "mkt-45", make: "Ford", model: "Explorer", year: 2024, trim: "XLT", price: 42800, mileage: 4100, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 10, vdpViewsLast7Days: 54, leadsLast7Days: 1 },
        { id: "mkt-46", make: "Ford", model: "Explorer", year: 2023, trim: "Limited", price: 46500, mileage: 13400, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 20, vdpViewsLast7Days: 41, leadsLast7Days: 1 },
        { id: "mkt-47", make: "Ford", model: "Explorer", year: 2022, trim: "XLT", price: 39200, mileage: 31200, dealRating: "Fair Deal", vehicleType: "SUV/CO", daysOnLot: 33, vdpViewsLast7Days: 26, leadsLast7Days: 4 },
        { id: "mkt-48", make: "Ford", model: "Escape", year: 2024, trim: "SEL", price: 31500, mileage: 5400, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 13, vdpViewsLast7Days: 47, leadsLast7Days: 6 },
        { id: "mkt-49", make: "Ford", model: "Escape", year: 2023, trim: "SE", price: 28200, mileage: 16900, dealRating: "Great Deal", vehicleType: "SUV/CO", daysOnLot: 17, vdpViewsLast7Days: 40, leadsLast7Days: 0 },
        { id: "mkt-50", make: "Ford", model: "Maverick", year: 2024, trim: "XLT", price: 32800, mileage: 4800, dealRating: "Good Deal", vehicleType: "Truck", daysOnLot: 9, vdpViewsLast7Days: 56, leadsLast7Days: 1 },

        // Chevrolet vehicles
        { id: "mkt-51", make: "Chevrolet", model: "Silverado 1500", year: 2024, trim: "LT", price: 47200, mileage: 3600, dealRating: "Good Deal", vehicleType: "Truck", daysOnLot: 8, vdpViewsLast7Days: 65, leadsLast7Days: 1 },
        { id: "mkt-52", make: "Chevrolet", model: "Silverado 1500", year: 2023, trim: "LT", price: 44500, mileage: 15800, dealRating: "Good Deal", vehicleType: "Truck", daysOnLot: 14, vdpViewsLast7Days: 52, leadsLast7Days: 3 },
        { id: "mkt-53", make: "Chevrolet", model: "Silverado 1500", year: 2022, trim: "WT", price: 39800, mileage: 29400, dealRating: "Fair Deal", vehicleType: "Truck", daysOnLot: 26, vdpViewsLast7Days: 33, leadsLast7Days: 1 },
        { id: "mkt-54", make: "Chevrolet", model: "Equinox", year: 2024, trim: "LT", price: 29800, mileage: 5100, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 12, vdpViewsLast7Days: 45, leadsLast7Days: 2 },
        { id: "mkt-55", make: "Chevrolet", model: "Equinox", year: 2023, trim: "LS", price: 26500, mileage: 17200, dealRating: "Great Deal", vehicleType: "SUV/CO", daysOnLot: 19, vdpViewsLast7Days: 38, leadsLast7Days: 2 },
        { id: "mkt-56", make: "Chevrolet", model: "Equinox", year: 2022, trim: "LT", price: 24800, mileage: 32600, dealRating: "Fair Deal", vehicleType: "SUV/CO", daysOnLot: 35, vdpViewsLast7Days: 22, leadsLast7Days: 3 },
        { id: "mkt-57", make: "Chevrolet", model: "Traverse", year: 2024, trim: "LT", price: 41200, mileage: 4300, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 15, vdpViewsLast7Days: 49, leadsLast7Days: 1 },
        { id: "mkt-58", make: "Chevrolet", model: "Traverse", year: 2023, trim: "Premier", price: 44800, mileage: 12900, dealRating: "Fair Deal", vehicleType: "SUV/CO", daysOnLot: 23, vdpViewsLast7Days: 36, leadsLast7Days: 0 },
        { id: "mkt-59", make: "Chevrolet", model: "Malibu", year: 2024, trim: "LT", price: 27500, mileage: 5600, dealRating: "Good Deal", vehicleType: "Sedans", daysOnLot: 16, vdpViewsLast7Days: 38, leadsLast7Days: 5 },
        { id: "mkt-60", make: "Chevrolet", model: "Malibu", year: 2023, trim: "LS", price: 24200, mileage: 18400, dealRating: "Great Deal", vehicleType: "Sedans", daysOnLot: 21, vdpViewsLast7Days: 32, leadsLast7Days: 2 },

        // Jeep vehicles
        { id: "mkt-61", make: "Jeep", model: "Wrangler", year: 2024, trim: "Sport", price: 42500, mileage: 3400, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 6, vdpViewsLast7Days: 69, leadsLast7Days: 6 },
        { id: "mkt-62", make: "Jeep", model: "Wrangler", year: 2024, trim: "Sahara", price: 48200, mileage: 2100, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 8, vdpViewsLast7Days: 64, leadsLast7Days: 4 },
        { id: "mkt-63", make: "Jeep", model: "Wrangler", year: 2023, trim: "Sport", price: 39800, mileage: 14600, dealRating: "Great Deal", vehicleType: "SUV/CO", daysOnLot: 13, vdpViewsLast7Days: 56, leadsLast7Days: 2 },
        { id: "mkt-64", make: "Jeep", model: "Grand Cherokee", year: 2024, trim: "Laredo", price: 44500, mileage: 4200, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 11, vdpViewsLast7Days: 53, leadsLast7Days: 4 },
        { id: "mkt-65", make: "Jeep", model: "Grand Cherokee", year: 2023, trim: "Limited", price: 48900, mileage: 11800, dealRating: "Fair Deal", vehicleType: "SUV/CO", daysOnLot: 22, vdpViewsLast7Days: 39, leadsLast7Days: 2 },
        { id: "mkt-66", make: "Jeep", model: "Cherokee", year: 2024, trim: "Latitude", price: 34200, mileage: 5300, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 14, vdpViewsLast7Days: 46, leadsLast7Days: 2 },
        { id: "mkt-67", make: "Jeep", model: "Gladiator", year: 2024, trim: "Sport", price: 45800, mileage: 3900, dealRating: "Good Deal", vehicleType: "Truck", daysOnLot: 10, vdpViewsLast7Days: 58, leadsLast7Days: 3 },

        // RAM vehicles
        { id: "mkt-68", make: "RAM", model: "1500", year: 2024, trim: "Big Horn", price: 49500, mileage: 2800, dealRating: "Good Deal", vehicleType: "Truck", daysOnLot: 7, vdpViewsLast7Days: 70, leadsLast7Days: 4 },
        { id: "mkt-69", make: "RAM", model: "1500", year: 2023, trim: "Tradesman", price: 44200, mileage: 16400, dealRating: "Good Deal", vehicleType: "Truck", daysOnLot: 15, vdpViewsLast7Days: 54, leadsLast7Days: 7 },
        { id: "mkt-70", make: "RAM", model: "1500", year: 2022, trim: "Big Horn", price: 42800, mileage: 27200, dealRating: "Fair Deal", vehicleType: "Truck", daysOnLot: 28, vdpViewsLast7Days: 36, leadsLast7Days: 1 },

        // Hyundai vehicles
        { id: "mkt-71", make: "Hyundai", model: "Tucson", year: 2024, trim: "SEL", price: 31200, mileage: 4700, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 12, vdpViewsLast7Days: 48, leadsLast7Days: 4 },
        { id: "mkt-72", make: "Hyundai", model: "Tucson", year: 2023, trim: "SE", price: 28500, mileage: 15600, dealRating: "Great Deal", vehicleType: "SUV/CO", daysOnLot: 17, vdpViewsLast7Days: 41, leadsLast7Days: 1 },
        { id: "mkt-73", make: "Hyundai", model: "Tucson", year: 2022, trim: "SEL", price: 26200, mileage: 30800, dealRating: "Fair Deal", vehicleType: "SUV/CO", daysOnLot: 30, vdpViewsLast7Days: 25, leadsLast7Days: 1 },
        { id: "mkt-74", make: "Hyundai", model: "Elantra", year: 2024, trim: "SEL", price: 23800, mileage: 5900, dealRating: "Good Deal", vehicleType: "Compact", daysOnLot: 14, vdpViewsLast7Days: 40, leadsLast7Days: 1 },
        { id: "mkt-75", make: "Hyundai", model: "Elantra", year: 2023, trim: "SE", price: 21200, mileage: 16200, dealRating: "Great Deal", vehicleType: "Compact", daysOnLot: 19, vdpViewsLast7Days: 34, leadsLast7Days: 1 },
        { id: "mkt-76", make: "Hyundai", model: "Santa Fe", year: 2024, trim: "SEL", price: 36500, mileage: 4100, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 13, vdpViewsLast7Days: 50, leadsLast7Days: 3 },
        { id: "mkt-77", make: "Hyundai", model: "Santa Fe", year: 2023, trim: "Limited", price: 39800, mileage: 12600, dealRating: "Fair Deal", vehicleType: "SUV/CO", daysOnLot: 24, vdpViewsLast7Days: 35, leadsLast7Days: 1 },

        // Kia vehicles
        { id: "mkt-78", make: "Kia", model: "Sportage", year: 2024, trim: "LX", price: 29800, mileage: 5200, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 11, vdpViewsLast7Days: 46, leadsLast7Days: 0 },
        { id: "mkt-79", make: "Kia", model: "Sportage", year: 2023, trim: "EX", price: 32200, mileage: 14800, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 18, vdpViewsLast7Days: 39, leadsLast7Days: 2 },
        { id: "mkt-80", make: "Kia", model: "Forte", year: 2024, trim: "LXS", price: 21500, mileage: 6100, dealRating: "Good Deal", vehicleType: "Compact", daysOnLot: 15, vdpViewsLast7Days: 37, leadsLast7Days: 1 },
        { id: "mkt-81", make: "Kia", model: "Forte", year: 2023, trim: "FE", price: 19200, mileage: 17400, dealRating: "Great Deal", vehicleType: "Compact", daysOnLot: 22, vdpViewsLast7Days: 30, leadsLast7Days: 1 },
        { id: "mkt-82", make: "Kia", model: "Telluride", year: 2024, trim: "LX", price: 42500, mileage: 3800, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 9, vdpViewsLast7Days: 61, leadsLast7Days: 3 },
        { id: "mkt-83", make: "Kia", model: "Telluride", year: 2023, trim: "EX", price: 45200, mileage: 11400, dealRating: "Fair Deal", vehicleType: "SUV/CO", daysOnLot: 21, vdpViewsLast7Days: 42, leadsLast7Days: 2 },

        // Mazda vehicles
        { id: "mkt-84", make: "Mazda", model: "CX-5", year: 2024, trim: "Sport", price: 32500, mileage: 4500, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 10, vdpViewsLast7Days: 51, leadsLast7Days: 3 },
        { id: "mkt-85", make: "Mazda", model: "CX-5", year: 2023, trim: "Touring", price: 34800, mileage: 13200, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 16, vdpViewsLast7Days: 44, leadsLast7Days: 5 },
        { id: "mkt-86", make: "Mazda", model: "Mazda3", year: 2024, trim: "Base", price: 24200, mileage: 5800, dealRating: "Good Deal", vehicleType: "Compact", daysOnLot: 13, vdpViewsLast7Days: 39, leadsLast7Days: 2 },
        { id: "mkt-87", make: "Mazda", model: "CX-9", year: 2023, trim: "Touring", price: 39500, mileage: 14900, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 20, vdpViewsLast7Days: 40, leadsLast7Days: 2 },

        // Subaru vehicles
        { id: "mkt-88", make: "Subaru", model: "Outback", year: 2024, trim: "Base", price: 33800, mileage: 4200, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 11, vdpViewsLast7Days: 50, leadsLast7Days: 3 },
        { id: "mkt-89", make: "Subaru", model: "Outback", year: 2023, trim: "Premium", price: 35200, mileage: 12800, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 17, vdpViewsLast7Days: 43, leadsLast7Days: 1 },
        { id: "mkt-90", make: "Subaru", model: "Forester", year: 2024, trim: "Base", price: 31500, mileage: 4900, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 12, vdpViewsLast7Days: 47, leadsLast7Days: 1 },
        { id: "mkt-91", make: "Subaru", model: "Forester", year: 2023, trim: "Premium", price: 32800, mileage: 15200, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 19, vdpViewsLast7Days: 38, leadsLast7Days: 3 },
        { id: "mkt-92", make: "Subaru", model: "Crosstrek", year: 2024, trim: "Base", price: 28500, mileage: 5400, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 14, vdpViewsLast7Days: 44, leadsLast7Days: 3 },

        // Volkswagen vehicles
        { id: "mkt-93", make: "Volkswagen", model: "Jetta", year: 2024, trim: "S", price: 24500, mileage: 5600, dealRating: "Good Deal", vehicleType: "Compact", daysOnLot: 16, vdpViewsLast7Days: 36, leadsLast7Days: 1 },
        { id: "mkt-94", make: "Volkswagen", model: "Jetta", year: 2023, trim: "SE", price: 26200, mileage: 13800, dealRating: "Good Deal", vehicleType: "Compact", daysOnLot: 21, vdpViewsLast7Days: 31, leadsLast7Days: 0 },
        { id: "mkt-95", make: "Volkswagen", model: "Tiguan", year: 2024, trim: "S", price: 32800, mileage: 4800, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 13, vdpViewsLast7Days: 45, leadsLast7Days: 2 },
        { id: "mkt-96", make: "Volkswagen", model: "Atlas", year: 2023, trim: "SE", price: 38500, mileage: 14200, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 22, vdpViewsLast7Days: 37, leadsLast7Days: 3 },

        // Luxury vehicles - BMW
        { id: "mkt-97", make: "BMW", model: "3 Series", year: 2024, trim: "330i", price: 45800, mileage: 3200, dealRating: "Good Deal", vehicleType: "Luxury", daysOnLot: 14, vdpViewsLast7Days: 52, leadsLast7Days: 3 },
        { id: "mkt-98", make: "BMW", model: "3 Series", year: 2023, trim: "330i", price: 42500, mileage: 12400, dealRating: "Fair Deal", vehicleType: "Luxury", daysOnLot: 25, vdpViewsLast7Days: 38, leadsLast7Days: 1 },
        { id: "mkt-99", make: "BMW", model: "X5", year: 2024, trim: "xDrive40i", price: 62500, mileage: 2800, dealRating: "Fair Deal", vehicleType: "Luxury", daysOnLot: 19, vdpViewsLast7Days: 45, leadsLast7Days: 3 },
        { id: "mkt-100", make: "BMW", model: "X3", year: 2023, trim: "xDrive30i", price: 46800, mileage: 14600, dealRating: "Good Deal", vehicleType: "Luxury", daysOnLot: 23, vdpViewsLast7Days: 40, leadsLast7Days: 2 },

        // Luxury vehicles - Mercedes-Benz
        { id: "mkt-101", make: "Mercedes-Benz", model: "C-Class", year: 2024, trim: "C300", price: 48500, mileage: 3600, dealRating: "Good Deal", vehicleType: "Luxury", daysOnLot: 16, vdpViewsLast7Days: 49, leadsLast7Days: 3 },
        { id: "mkt-102", make: "Mercedes-Benz", model: "C-Class", year: 2023, trim: "C300", price: 45200, mileage: 13200, dealRating: "Fair Deal", vehicleType: "Luxury", daysOnLot: 27, vdpViewsLast7Days: 36, leadsLast7Days: 1 },
        { id: "mkt-103", make: "Mercedes-Benz", model: "GLE", year: 2024, trim: "350", price: 64800, mileage: 2400, dealRating: "Fair Deal", vehicleType: "Luxury", daysOnLot: 21, vdpViewsLast7Days: 43, leadsLast7Days: 3 },
        { id: "mkt-104", make: "Mercedes-Benz", model: "GLC", year: 2023, trim: "300", price: 48200, mileage: 15800, dealRating: "Good Deal", vehicleType: "Luxury", daysOnLot: 24, vdpViewsLast7Days: 38, leadsLast7Days: 5 },

        // Luxury vehicles - Audi
        { id: "mkt-105", make: "Audi", model: "A4", year: 2024, trim: "Premium", price: 44500, mileage: 3800, dealRating: "Good Deal", vehicleType: "Luxury", daysOnLot: 15, vdpViewsLast7Days: 50, leadsLast7Days: 1 },
        { id: "mkt-106", make: "Audi", model: "A4", year: 2023, trim: "Premium Plus", price: 46800, mileage: 11600, dealRating: "Fair Deal", vehicleType: "Luxury", daysOnLot: 26, vdpViewsLast7Days: 37, leadsLast7Days: 1 },
        { id: "mkt-107", make: "Audi", model: "Q5", year: 2024, trim: "Premium", price: 48200, mileage: 3200, dealRating: "Good Deal", vehicleType: "Luxury", daysOnLot: 13, vdpViewsLast7Days: 54, leadsLast7Days: 4 },
        { id: "mkt-108", make: "Audi", model: "Q7", year: 2023, trim: "Premium Plus", price: 58500, mileage: 12800, dealRating: "Fair Deal", vehicleType: "Luxury", daysOnLot: 28, vdpViewsLast7Days: 39, leadsLast7Days: 4 },

        // Luxury vehicles - Lexus
        { id: "mkt-109", make: "Lexus", model: "ES", year: 2024, trim: "350", price: 46500, mileage: 3400, dealRating: "Good Deal", vehicleType: "Luxury", daysOnLot: 12, vdpViewsLast7Days: 51, leadsLast7Days: 0 },
        { id: "mkt-110", make: "Lexus", model: "ES", year: 2023, trim: "350", price: 43800, mileage: 12200, dealRating: "Good Deal", vehicleType: "Luxury", daysOnLot: 20, vdpViewsLast7Days: 44, leadsLast7Days: 5 },
        { id: "mkt-111", make: "Lexus", model: "RX", year: 2024, trim: "350", price: 52500, mileage: 2900, dealRating: "Good Deal", vehicleType: "Luxury", daysOnLot: 11, vdpViewsLast7Days: 58, leadsLast7Days: 4 },
        { id: "mkt-112", make: "Lexus", model: "RX", year: 2023, trim: "350", price: 49200, mileage: 14400, dealRating: "Fair Deal", vehicleType: "Luxury", daysOnLot: 22, vdpViewsLast7Days: 41, leadsLast7Days: 4 },

        // Additional variety with High Priced and Over Priced ratings
        { id: "mkt-113", make: "Toyota", model: "Camry", year: 2021, trim: "SE", price: 28500, mileage: 42600, dealRating: "High Priced", vehicleType: "Sedans", daysOnLot: 45, vdpViewsLast7Days: 18, leadsLast7Days: 2 },
        { id: "mkt-114", make: "Honda", model: "CR-V", year: 2021, trim: "EX", price: 34200, mileage: 45200, dealRating: "Over Priced", vehicleType: "SUV/CO", daysOnLot: 52, vdpViewsLast7Days: 14, leadsLast7Days: 1 },
        { id: "mkt-115", make: "Ford", model: "F-150", year: 2021, trim: "XLT", price: 48500, mileage: 38900, dealRating: "High Priced", vehicleType: "Truck", daysOnLot: 41, vdpViewsLast7Days: 20, leadsLast7Days: 1 },
        { id: "mkt-116", make: "Nissan", model: "Altima", year: 2021, trim: "SV", price: 26800, mileage: 44100, dealRating: "Over Priced", vehicleType: "Sedans", daysOnLot: 49, vdpViewsLast7Days: 16, leadsLast7Days: 2 },
        { id: "mkt-117", make: "Chevrolet", model: "Equinox", year: 2021, trim: "LT", price: 28200, mileage: 48600, dealRating: "High Priced", vehicleType: "SUV/CO", daysOnLot: 47, vdpViewsLast7Days: 15, leadsLast7Days: 0 },
        { id: "mkt-118", make: "BMW", model: "3 Series", year: 2022, trim: "330i", price: 48500, mileage: 24800, dealRating: "Over Priced", vehicleType: "Luxury", daysOnLot: 38, vdpViewsLast7Days: 22, leadsLast7Days: 0 },
        { id: "mkt-119", make: "Hyundai", model: "Tucson", year: 2021, trim: "SEL", price: 29800, mileage: 46200, dealRating: "High Priced", vehicleType: "SUV/CO", daysOnLot: 44, vdpViewsLast7Days: 17, leadsLast7Days: 1 },
        { id: "mkt-120", make: "Jeep", model: "Wrangler", year: 2022, trim: "Sport", price: 45200, mileage: 22400, dealRating: "Over Priced", vehicleType: "SUV/CO", daysOnLot: 40, vdpViewsLast7Days: 24, leadsLast7Days: 3 },

        // Additional 120 vehicles for doubled inventory
        // More Toyota vehicles
        { id: "mkt-121", make: "Toyota", model: "Tundra", year: 2024, trim: "SR5", price: 52500, mileage: 2800, dealRating: "Good Deal", vehicleType: "Truck", daysOnLot: 8, vdpViewsLast7Days: 66, leadsLast7Days: 6 },
        { id: "mkt-122", make: "Toyota", model: "Tundra", year: 2023, trim: "Limited", price: 58200, mileage: 10400, dealRating: "Fair Deal", vehicleType: "Truck", daysOnLot: 19, vdpViewsLast7Days: 52, leadsLast7Days: 4 },
        { id: "mkt-123", make: "Toyota", model: "Camry", year: 2021, trim: "XSE", price: 24500, mileage: 35200, dealRating: "Fair Deal", vehicleType: "Sedans", daysOnLot: 38, vdpViewsLast7Days: 26, leadsLast7Days: 1 },
        { id: "mkt-124", make: "Toyota", model: "RAV4", year: 2021, trim: "XLE", price: 28500, mileage: 38600, dealRating: "Fair Deal", vehicleType: "SUV/CO", daysOnLot: 35, vdpViewsLast7Days: 31, leadsLast7Days: 1 },
        { id: "mkt-125", make: "Toyota", model: "4Runner", year: 2024, trim: "SR5", price: 48200, mileage: 3100, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 9, vdpViewsLast7Days: 62, leadsLast7Days: 4 },
        { id: "mkt-126", make: "Toyota", model: "4Runner", year: 2023, trim: "TRD Off-Road", price: 51800, mileage: 12800, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 16, vdpViewsLast7Days: 55, leadsLast7Days: 2 },
        { id: "mkt-127", make: "Toyota", model: "Sienna", year: 2024, trim: "XLE", price: 45800, mileage: 4200, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 14, vdpViewsLast7Days: 48, leadsLast7Days: 2 },
        { id: "mkt-128", make: "Toyota", model: "Corolla", year: 2022, trim: "LE", price: 19800, mileage: 28400, dealRating: "Great Deal", vehicleType: "Compact", daysOnLot: 25, vdpViewsLast7Days: 33, leadsLast7Days: 1 },

        // More Honda vehicles
        { id: "mkt-129", make: "Honda", model: "Ridgeline", year: 2024, trim: "RTL", price: 42500, mileage: 3600, dealRating: "Good Deal", vehicleType: "Truck", daysOnLot: 11, vdpViewsLast7Days: 54, leadsLast7Days: 1 },
        { id: "mkt-130", make: "Honda", model: "Ridgeline", year: 2023, trim: "Sport", price: 39800, mileage: 14200, dealRating: "Good Deal", vehicleType: "Truck", daysOnLot: 18, vdpViewsLast7Days: 46, leadsLast7Days: 2 },
        { id: "mkt-131", make: "Honda", model: "Accord", year: 2021, trim: "Sport", price: 24800, mileage: 32800, dealRating: "Fair Deal", vehicleType: "Sedans", daysOnLot: 36, vdpViewsLast7Days: 28, leadsLast7Days: 1 },
        { id: "mkt-132", make: "Honda", model: "CR-V", year: 2021, trim: "EX", price: 27500, mileage: 36400, dealRating: "Fair Deal", vehicleType: "SUV/CO", daysOnLot: 33, vdpViewsLast7Days: 30, leadsLast7Days: 2 },
        { id: "mkt-133", make: "Honda", model: "Passport", year: 2024, trim: "TrailSport", price: 46200, mileage: 3200, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 12, vdpViewsLast7Days: 58, leadsLast7Days: 1 },
        { id: "mkt-134", make: "Honda", model: "Passport", year: 2023, trim: "EX-L", price: 42800, mileage: 13600, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 19, vdpViewsLast7Days: 47, leadsLast7Days: 4 },
        { id: "mkt-135", make: "Honda", model: "Civic", year: 2022, trim: "EX", price: 22500, mileage: 24600, dealRating: "Good Deal", vehicleType: "Compact", daysOnLot: 21, vdpViewsLast7Days: 36, leadsLast7Days: 1 },
        { id: "mkt-136", make: "Honda", model: "Civic", year: 2021, trim: "Sport", price: 20800, mileage: 31200, dealRating: "Fair Deal", vehicleType: "Compact", daysOnLot: 28, vdpViewsLast7Days: 29, leadsLast7Days: 1 },

        // More Ford vehicles
        { id: "mkt-137", make: "Ford", model: "Ranger", year: 2024, trim: "Lariat", price: 41500, mileage: 3800, dealRating: "Good Deal", vehicleType: "Truck", daysOnLot: 10, vdpViewsLast7Days: 57, leadsLast7Days: 3 },
        { id: "mkt-138", make: "Ford", model: "Ranger", year: 2023, trim: "XLT", price: 38200, mileage: 15600, dealRating: "Good Deal", vehicleType: "Truck", daysOnLot: 17, vdpViewsLast7Days: 49, leadsLast7Days: 3 },
        { id: "mkt-139", make: "Ford", model: "Edge", year: 2024, trim: "SEL", price: 39500, mileage: 4600, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 13, vdpViewsLast7Days: 50, leadsLast7Days: 7 },
        { id: "mkt-140", make: "Ford", model: "Edge", year: 2023, trim: "ST", price: 45200, mileage: 11800, dealRating: "Fair Deal", vehicleType: "SUV/CO", daysOnLot: 22, vdpViewsLast7Days: 42, leadsLast7Days: 3 },
        { id: "mkt-141", make: "Ford", model: "Bronco", year: 2024, trim: "Big Bend", price: 46800, mileage: 2400, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 7, vdpViewsLast7Days: 71, leadsLast7Days: 2 },
        { id: "mkt-142", make: "Ford", model: "Bronco", year: 2023, trim: "Outer Banks", price: 52500, mileage: 9800, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 14, vdpViewsLast7Days: 63, leadsLast7Days: 4 },
        { id: "mkt-143", make: "Ford", model: "F-150", year: 2021, trim: "XLT", price: 38500, mileage: 36200, dealRating: "Fair Deal", vehicleType: "Truck", daysOnLot: 32, vdpViewsLast7Days: 32, leadsLast7Days: 1 },
        { id: "mkt-144", make: "Ford", model: "Escape", year: 2022, trim: "SEL", price: 26800, mileage: 27600, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 24, vdpViewsLast7Days: 35, leadsLast7Days: 2 },

        // More Chevrolet vehicles
        { id: "mkt-145", make: "Chevrolet", model: "Colorado", year: 2024, trim: "Z71", price: 42800, mileage: 3400, dealRating: "Good Deal", vehicleType: "Truck", daysOnLot: 9, vdpViewsLast7Days: 59, leadsLast7Days: 2 },
        { id: "mkt-146", make: "Chevrolet", model: "Colorado", year: 2023, trim: "LT", price: 39500, mileage: 14800, dealRating: "Good Deal", vehicleType: "Truck", daysOnLot: 16, vdpViewsLast7Days: 51, leadsLast7Days: 0 },
        { id: "mkt-147", make: "Chevrolet", model: "Tahoe", year: 2024, trim: "LT", price: 58500, mileage: 2900, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 11, vdpViewsLast7Days: 64, leadsLast7Days: 5 },
        { id: "mkt-148", make: "Chevrolet", model: "Tahoe", year: 2023, trim: "Premier", price: 64200, mileage: 10600, dealRating: "Fair Deal", vehicleType: "SUV/CO", daysOnLot: 20, vdpViewsLast7Days: 48, leadsLast7Days: 1 },
        { id: "mkt-149", make: "Chevrolet", model: "Blazer", year: 2024, trim: "RS", price: 38500, mileage: 4200, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 12, vdpViewsLast7Days: 52, leadsLast7Days: 0 },
        { id: "mkt-150", make: "Chevrolet", model: "Blazer", year: 2023, trim: "LT", price: 35800, mileage: 15200, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 19, vdpViewsLast7Days: 44, leadsLast7Days: 2 },
        { id: "mkt-151", make: "Chevrolet", model: "Silverado 1500", year: 2021, trim: "LT", price: 37200, mileage: 38600, dealRating: "Fair Deal", vehicleType: "Truck", daysOnLot: 34, vdpViewsLast7Days: 29, leadsLast7Days: 1 },
        { id: "mkt-152", make: "Chevrolet", model: "Camaro", year: 2024, trim: "LT", price: 34500, mileage: 3600, dealRating: "Good Deal", vehicleType: "Sedans", daysOnLot: 15, vdpViewsLast7Days: 46, leadsLast7Days: 1 },

        // More Nissan vehicles
        { id: "mkt-153", make: "Nissan", model: "Murano", year: 2024, trim: "SL", price: 38500, mileage: 4100, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 12, vdpViewsLast7Days: 50, leadsLast7Days: 3 },
        { id: "mkt-154", make: "Nissan", model: "Murano", year: 2023, trim: "SV", price: 35200, mileage: 16400, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 20, vdpViewsLast7Days: 41, leadsLast7Days: 1 },
        { id: "mkt-155", make: "Nissan", model: "Maxima", year: 2023, trim: "SV", price: 32800, mileage: 13200, dealRating: "Good Deal", vehicleType: "Sedans", daysOnLot: 18, vdpViewsLast7Days: 43, leadsLast7Days: 1 },
        { id: "mkt-156", make: "Nissan", model: "Kicks", year: 2024, trim: "SV", price: 24500, mileage: 5800, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 14, vdpViewsLast7Days: 42, leadsLast7Days: 0 },
        { id: "mkt-157", make: "Nissan", model: "Kicks", year: 2023, trim: "S", price: 21800, mileage: 18600, dealRating: "Great Deal", vehicleType: "SUV/CO", daysOnLot: 21, vdpViewsLast7Days: 36, leadsLast7Days: 1 },
        { id: "mkt-158", make: "Nissan", model: "Frontier", year: 2023, trim: "PRO-4X", price: 39500, mileage: 11200, dealRating: "Good Deal", vehicleType: "Truck", daysOnLot: 17, vdpViewsLast7Days: 49, leadsLast7Days: 3 },
        { id: "mkt-159", make: "Nissan", model: "Titan", year: 2024, trim: "SV", price: 46500, mileage: 3200, dealRating: "Good Deal", vehicleType: "Truck", daysOnLot: 10, vdpViewsLast7Days: 56, leadsLast7Days: 2 },
        { id: "mkt-160", make: "Nissan", model: "Versa", year: 2024, trim: "S", price: 18500, mileage: 6800, dealRating: "Great Deal", vehicleType: "Compact", daysOnLot: 16, vdpViewsLast7Days: 38, leadsLast7Days: 1 },

        // More Jeep vehicles
        { id: "mkt-161", make: "Jeep", model: "Compass", year: 2024, trim: "Latitude", price: 31500, mileage: 4800, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 13, vdpViewsLast7Days: 47, leadsLast7Days: 1 },
        { id: "mkt-162", make: "Jeep", model: "Compass", year: 2023, trim: "Sport", price: 28200, mileage: 16800, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 22, vdpViewsLast7Days: 38, leadsLast7Days: 2 },
        { id: "mkt-163", make: "Jeep", model: "Renegade", year: 2024, trim: "Latitude", price: 28500, mileage: 5200, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 15, vdpViewsLast7Days: 44, leadsLast7Days: 2 },
        { id: "mkt-164", make: "Jeep", model: "Renegade", year: 2023, trim: "Sport", price: 25800, mileage: 18400, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 23, vdpViewsLast7Days: 35, leadsLast7Days: 1 },
        { id: "mkt-165", make: "Jeep", model: "Wrangler", year: 2022, trim: "Sahara", price: 42500, mileage: 19200, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 18, vdpViewsLast7Days: 51, leadsLast7Days: 3 },
        { id: "mkt-166", make: "Jeep", model: "Grand Cherokee", year: 2022, trim: "Laredo", price: 39800, mileage: 22600, dealRating: "Fair Deal", vehicleType: "SUV/CO", daysOnLot: 26, vdpViewsLast7Days: 37, leadsLast7Days: 2 },

        // More RAM vehicles
        { id: "mkt-167", make: "RAM", model: "2500", year: 2024, trim: "Laramie", price: 62500, mileage: 2400, dealRating: "Good Deal", vehicleType: "Truck", daysOnLot: 9, vdpViewsLast7Days: 68, leadsLast7Days: 1 },
        { id: "mkt-168", make: "RAM", model: "2500", year: 2023, trim: "Big Horn", price: 58200, mileage: 12800, dealRating: "Good Deal", vehicleType: "Truck", daysOnLot: 16, vdpViewsLast7Days: 57, leadsLast7Days: 3 },
        { id: "mkt-169", make: "RAM", model: "1500", year: 2022, trim: "Laramie", price: 48500, mileage: 21400, dealRating: "Fair Deal", vehicleType: "Truck", daysOnLot: 23, vdpViewsLast7Days: 44, leadsLast7Days: 4 },
        { id: "mkt-170", make: "RAM", model: "1500", year: 2021, trim: "Big Horn", price: 41200, mileage: 35800, dealRating: "Fair Deal", vehicleType: "Truck", daysOnLot: 31, vdpViewsLast7Days: 33, leadsLast7Days: 3 },

        // More Hyundai vehicles
        { id: "mkt-171", make: "Hyundai", model: "Palisade", year: 2024, trim: "SEL", price: 42500, mileage: 3600, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 10, vdpViewsLast7Days: 59, leadsLast7Days: 2 },
        { id: "mkt-172", make: "Hyundai", model: "Palisade", year: 2023, trim: "Limited", price: 46800, mileage: 11400, dealRating: "Fair Deal", vehicleType: "SUV/CO", daysOnLot: 19, vdpViewsLast7Days: 46, leadsLast7Days: 5 },
        { id: "mkt-173", make: "Hyundai", model: "Kona", year: 2024, trim: "SEL", price: 27500, mileage: 5400, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 14, vdpViewsLast7Days: 45, leadsLast7Days: 1 },
        { id: "mkt-174", make: "Hyundai", model: "Kona", year: 2023, trim: "SE", price: 24800, mileage: 17800, dealRating: "Great Deal", vehicleType: "SUV/CO", daysOnLot: 20, vdpViewsLast7Days: 38, leadsLast7Days: 3 },
        { id: "mkt-175", make: "Hyundai", model: "Sonata", year: 2024, trim: "SEL", price: 28500, mileage: 4800, dealRating: "Good Deal", vehicleType: "Sedans", daysOnLot: 15, vdpViewsLast7Days: 42, leadsLast7Days: 1 },
        { id: "mkt-176", make: "Hyundai", model: "Sonata", year: 2023, trim: "SE", price: 25200, mileage: 18200, dealRating: "Great Deal", vehicleType: "Sedans", daysOnLot: 22, vdpViewsLast7Days: 35, leadsLast7Days: 2 },
        { id: "mkt-177", make: "Hyundai", model: "Venue", year: 2024, trim: "SEL", price: 23500, mileage: 6200, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 16, vdpViewsLast7Days: 40, leadsLast7Days: 2 },

        // More Kia vehicles
        { id: "mkt-178", make: "Kia", model: "Sorento", year: 2024, trim: "LX", price: 34500, mileage: 4200, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 11, vdpViewsLast7Days: 52, leadsLast7Days: 1 },
        { id: "mkt-179", make: "Kia", model: "Sorento", year: 2023, trim: "EX", price: 37200, mileage: 13600, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 18, vdpViewsLast7Days: 45, leadsLast7Days: 1 },
        { id: "mkt-180", make: "Kia", model: "Seltos", year: 2024, trim: "LX", price: 26500, mileage: 5600, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 14, vdpViewsLast7Days: 43, leadsLast7Days: 4 },
        { id: "mkt-181", make: "Kia", model: "Seltos", year: 2023, trim: "S", price: 23800, mileage: 19200, dealRating: "Great Deal", vehicleType: "SUV/CO", daysOnLot: 21, vdpViewsLast7Days: 36, leadsLast7Days: 2 },
        { id: "mkt-182", make: "Kia", model: "Soul", year: 2024, trim: "LX", price: 22500, mileage: 6800, dealRating: "Good Deal", vehicleType: "Compact", daysOnLot: 17, vdpViewsLast7Days: 39, leadsLast7Days: 3 },
        { id: "mkt-183", make: "Kia", model: "K5", year: 2024, trim: "LXS", price: 28500, mileage: 4600, dealRating: "Good Deal", vehicleType: "Sedans", daysOnLot: 13, vdpViewsLast7Days: 44, leadsLast7Days: 2 },
        { id: "mkt-184", make: "Kia", model: "K5", year: 2023, trim: "GT-Line", price: 31200, mileage: 12400, dealRating: "Good Deal", vehicleType: "Sedans", daysOnLot: 19, vdpViewsLast7Days: 40, leadsLast7Days: 0 },

        // More Mazda vehicles
        { id: "mkt-185", make: "Mazda", model: "CX-50", year: 2024, trim: "Select", price: 34500, mileage: 3800, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 11, vdpViewsLast7Days: 53, leadsLast7Days: 2 },
        { id: "mkt-186", make: "Mazda", model: "CX-50", year: 2023, trim: "Preferred", price: 36800, mileage: 11600, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 17, vdpViewsLast7Days: 47, leadsLast7Days: 1 },
        { id: "mkt-187", make: "Mazda", model: "CX-30", year: 2024, trim: "Select", price: 28500, mileage: 5200, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 14, vdpViewsLast7Days: 45, leadsLast7Days: 3 },
        { id: "mkt-188", make: "Mazda", model: "CX-90", year: 2024, trim: "Preferred", price: 44500, mileage: 2800, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 9, vdpViewsLast7Days: 60, leadsLast7Days: 4 },
        { id: "mkt-189", make: "Mazda", model: "Mazda3", year: 2023, trim: "Select", price: 25800, mileage: 14800, dealRating: "Good Deal", vehicleType: "Compact", daysOnLot: 18, vdpViewsLast7Days: 38, leadsLast7Days: 0 },

        // More Subaru vehicles
        { id: "mkt-190", make: "Subaru", model: "Ascent", year: 2024, trim: "Base", price: 38500, mileage: 3600, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 12, vdpViewsLast7Days: 54, leadsLast7Days: 5 },
        { id: "mkt-191", make: "Subaru", model: "Ascent", year: 2023, trim: "Premium", price: 40200, mileage: 12200, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 19, vdpViewsLast7Days: 46, leadsLast7Days: 1 },
        { id: "mkt-192", make: "Subaru", model: "Impreza", year: 2024, trim: "Base", price: 24500, mileage: 5800, dealRating: "Good Deal", vehicleType: "Compact", daysOnLot: 15, vdpViewsLast7Days: 41, leadsLast7Days: 0 },
        { id: "mkt-193", make: "Subaru", model: "Legacy", year: 2024, trim: "Base", price: 28500, mileage: 4400, dealRating: "Good Deal", vehicleType: "Sedans", daysOnLot: 14, vdpViewsLast7Days: 43, leadsLast7Days: 3 },
        { id: "mkt-194", make: "Subaru", model: "WRX", year: 2024, trim: "Base", price: 35500, mileage: 3200, dealRating: "Good Deal", vehicleType: "Sedans", daysOnLot: 10, vdpViewsLast7Days: 56, leadsLast7Days: 3 },

        // More Volkswagen vehicles
        { id: "mkt-195", make: "Volkswagen", model: "Taos", year: 2024, trim: "S", price: 28500, mileage: 4800, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 13, vdpViewsLast7Days: 46, leadsLast7Days: 3 },
        { id: "mkt-196", make: "Volkswagen", model: "Taos", year: 2023, trim: "SE", price: 30200, mileage: 13400, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 20, vdpViewsLast7Days: 39, leadsLast7Days: 1 },
        { id: "mkt-197", make: "Volkswagen", model: "Passat", year: 2023, trim: "S", price: 26500, mileage: 15200, dealRating: "Good Deal", vehicleType: "Sedans", daysOnLot: 22, vdpViewsLast7Days: 36, leadsLast7Days: 2 },
        { id: "mkt-198", make: "Volkswagen", model: "ID.4", year: 2024, trim: "Standard", price: 42500, mileage: 2800, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 11, vdpViewsLast7Days: 55, leadsLast7Days: 0 },

        // More BMW vehicles
        { id: "mkt-199", make: "BMW", model: "5 Series", year: 2024, trim: "530i", price: 56500, mileage: 2600, dealRating: "Good Deal", vehicleType: "Luxury", daysOnLot: 15, vdpViewsLast7Days: 54, leadsLast7Days: 2 },
        { id: "mkt-200", make: "BMW", model: "5 Series", year: 2023, trim: "530i", price: 52800, mileage: 11200, dealRating: "Fair Deal", vehicleType: "Luxury", daysOnLot: 24, vdpViewsLast7Days: 42, leadsLast7Days: 1 },
        { id: "mkt-201", make: "BMW", model: "X1", year: 2024, trim: "xDrive28i", price: 42500, mileage: 3400, dealRating: "Good Deal", vehicleType: "Luxury", daysOnLot: 13, vdpViewsLast7Days: 50, leadsLast7Days: 3 },
        { id: "mkt-202", make: "BMW", model: "X7", year: 2024, trim: "xDrive40i", price: 82500, mileage: 2200, dealRating: "Fair Deal", vehicleType: "Luxury", daysOnLot: 22, vdpViewsLast7Days: 46, leadsLast7Days: 1 },
        { id: "mkt-203", make: "BMW", model: "4 Series", year: 2024, trim: "430i", price: 48500, mileage: 3800, dealRating: "Good Deal", vehicleType: "Luxury", daysOnLot: 16, vdpViewsLast7Days: 48, leadsLast7Days: 1 },

        // More Mercedes-Benz vehicles
        { id: "mkt-204", make: "Mercedes-Benz", model: "E-Class", year: 2024, trim: "E300", price: 62500, mileage: 2400, dealRating: "Good Deal", vehicleType: "Luxury", daysOnLot: 17, vdpViewsLast7Days: 52, leadsLast7Days: 1 },
        { id: "mkt-205", make: "Mercedes-Benz", model: "E-Class", year: 2023, trim: "E350", price: 58200, mileage: 10800, dealRating: "Fair Deal", vehicleType: "Luxury", daysOnLot: 25, vdpViewsLast7Days: 41, leadsLast7Days: 1 },
        { id: "mkt-206", make: "Mercedes-Benz", model: "GLB", year: 2024, trim: "250", price: 45500, mileage: 3200, dealRating: "Good Deal", vehicleType: "Luxury", daysOnLot: 14, vdpViewsLast7Days: 51, leadsLast7Days: 1 },
        { id: "mkt-207", make: "Mercedes-Benz", model: "GLS", year: 2024, trim: "450", price: 82500, mileage: 2100, dealRating: "Fair Deal", vehicleType: "Luxury", daysOnLot: 20, vdpViewsLast7Days: 47, leadsLast7Days: 2 },
        { id: "mkt-208", make: "Mercedes-Benz", model: "A-Class", year: 2023, trim: "A220", price: 38500, mileage: 14600, dealRating: "Good Deal", vehicleType: "Luxury", daysOnLot: 23, vdpViewsLast7Days: 39, leadsLast7Days: 1 },

        // More Audi vehicles
        { id: "mkt-209", make: "Audi", model: "A6", year: 2024, trim: "Premium", price: 58500, mileage: 2800, dealRating: "Good Deal", vehicleType: "Luxury", daysOnLot: 16, vdpViewsLast7Days: 53, leadsLast7Days: 3 },
        { id: "mkt-210", make: "Audi", model: "A6", year: 2023, trim: "Premium Plus", price: 62200, mileage: 10400, dealRating: "Fair Deal", vehicleType: "Luxury", daysOnLot: 24, vdpViewsLast7Days: 42, leadsLast7Days: 1 },
        { id: "mkt-211", make: "Audi", model: "Q3", year: 2024, trim: "Premium", price: 40500, mileage: 3600, dealRating: "Good Deal", vehicleType: "Luxury", daysOnLot: 12, vdpViewsLast7Days: 52, leadsLast7Days: 2 },
        { id: "mkt-212", make: "Audi", model: "Q8", year: 2024, trim: "Premium", price: 72500, mileage: 2400, dealRating: "Fair Deal", vehicleType: "Luxury", daysOnLot: 21, vdpViewsLast7Days: 45, leadsLast7Days: 3 },
        { id: "mkt-213", make: "Audi", model: "A3", year: 2024, trim: "Premium", price: 38500, mileage: 4200, dealRating: "Good Deal", vehicleType: "Luxury", daysOnLot: 15, vdpViewsLast7Days: 48, leadsLast7Days: 4 },

        // More Lexus vehicles
        { id: "mkt-214", make: "Lexus", model: "NX", year: 2024, trim: "250", price: 44500, mileage: 3200, dealRating: "Good Deal", vehicleType: "Luxury", daysOnLot: 11, vdpViewsLast7Days: 56, leadsLast7Days: 4 },
        { id: "mkt-215", make: "Lexus", model: "NX", year: 2023, trim: "350", price: 48200, mileage: 11800, dealRating: "Fair Deal", vehicleType: "Luxury", daysOnLot: 20, vdpViewsLast7Days: 44, leadsLast7Days: 1 },
        { id: "mkt-216", make: "Lexus", model: "IS", year: 2024, trim: "300", price: 42500, mileage: 3400, dealRating: "Good Deal", vehicleType: "Luxury", daysOnLot: 13, vdpViewsLast7Days: 50, leadsLast7Days: 1 },
        { id: "mkt-217", make: "Lexus", model: "GX", year: 2024, trim: "460", price: 62500, mileage: 2600, dealRating: "Good Deal", vehicleType: "Luxury", daysOnLot: 10, vdpViewsLast7Days: 61, leadsLast7Days: 4 },
        { id: "mkt-218", make: "Lexus", model: "UX", year: 2024, trim: "200", price: 36500, mileage: 4800, dealRating: "Good Deal", vehicleType: "Luxury", daysOnLot: 15, vdpViewsLast7Days: 46, leadsLast7Days: 1 },

        // Additional variety for market depth
        { id: "mkt-219", make: "Toyota", model: "Prius", year: 2024, trim: "LE", price: 29500, mileage: 4200, dealRating: "Good Deal", vehicleType: "Compact", daysOnLot: 12, vdpViewsLast7Days: 47, leadsLast7Days: 3 },
        { id: "mkt-220", make: "Honda", model: "HR-V", year: 2024, trim: "LX", price: 26500, mileage: 5400, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 14, vdpViewsLast7Days: 44, leadsLast7Days: 3 },
        { id: "mkt-221", make: "Ford", model: "Mustang", year: 2024, trim: "EcoBoost", price: 38500, mileage: 3200, dealRating: "Good Deal", vehicleType: "Sedans", daysOnLot: 11, vdpViewsLast7Days: 58, leadsLast7Days: 2 },
        { id: "mkt-222", make: "Chevrolet", model: "Trax", year: 2024, trim: "LS", price: 23500, mileage: 6200, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 16, vdpViewsLast7Days: 40, leadsLast7Days: 0 },
        { id: "mkt-223", make: "Nissan", model: "Armada", year: 2024, trim: "SV", price: 54500, mileage: 2800, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 13, vdpViewsLast7Days: 55, leadsLast7Days: 2 },
        { id: "mkt-224", make: "Jeep", model: "Grand Wagoneer", year: 2024, trim: "Series I", price: 92500, mileage: 1800, dealRating: "Fair Deal", vehicleType: "SUV/CO", daysOnLot: 25, vdpViewsLast7Days: 42, leadsLast7Days: 2 },
        { id: "mkt-225", make: "RAM", model: "ProMaster", year: 2024, trim: "1500", price: 38500, mileage: 4200, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 18, vdpViewsLast7Days: 35, leadsLast7Days: 2 },
        { id: "mkt-226", make: "Hyundai", model: "Ioniq 5", year: 2024, trim: "SE", price: 44500, mileage: 2400, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 10, vdpViewsLast7Days: 62, leadsLast7Days: 4 },
        { id: "mkt-227", make: "Kia", model: "EV6", year: 2024, trim: "Light", price: 46500, mileage: 2100, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 9, vdpViewsLast7Days: 64, leadsLast7Days: 1 },
        { id: "mkt-228", make: "Mazda", model: "MX-5 Miata", year: 2024, trim: "Sport", price: 32500, mileage: 2800, dealRating: "Good Deal", vehicleType: "Sedans", daysOnLot: 14, vdpViewsLast7Days: 51, leadsLast7Days: 4 },
        { id: "mkt-229", make: "Subaru", model: "BRZ", year: 2024, trim: "Premium", price: 31500, mileage: 3200, dealRating: "Good Deal", vehicleType: "Sedans", daysOnLot: 15, vdpViewsLast7Days: 48, leadsLast7Days: 1 },
        { id: "mkt-230", make: "Volkswagen", model: "Arteon", year: 2023, trim: "SE", price: 42500, mileage: 10200, dealRating: "Fair Deal", vehicleType: "Sedans", daysOnLot: 22, vdpViewsLast7Days: 38, leadsLast7Days: 2 },
        { id: "mkt-231", make: "BMW", model: "Z4", year: 2024, trim: "sDrive30i", price: 54500, mileage: 2400, dealRating: "Fair Deal", vehicleType: "Luxury", daysOnLot: 20, vdpViewsLast7Days: 44, leadsLast7Days: 2 },
        { id: "mkt-232", make: "Mercedes-Benz", model: "CLA", year: 2024, trim: "250", price: 46500, mileage: 3200, dealRating: "Good Deal", vehicleType: "Luxury", daysOnLot: 14, vdpViewsLast7Days: 49, leadsLast7Days: 7 },
        { id: "mkt-233", make: "Audi", model: "TT", year: 2023, trim: "Coupe", price: 48500, mileage: 9800, dealRating: "Fair Deal", vehicleType: "Luxury", daysOnLot: 26, vdpViewsLast7Days: 36, leadsLast7Days: 3 },
        { id: "mkt-234", make: "Lexus", model: "LC", year: 2024, trim: "500", price: 98500, mileage: 1600, dealRating: "Fair Deal", vehicleType: "Luxury", daysOnLot: 28, vdpViewsLast7Days: 38, leadsLast7Days: 5 },
        { id: "mkt-235", make: "Toyota", model: "GR86", year: 2024, trim: "Base", price: 31500, mileage: 2800, dealRating: "Good Deal", vehicleType: "Sedans", daysOnLot: 13, vdpViewsLast7Days: 52, leadsLast7Days: 4 },
        { id: "mkt-236", make: "Honda", model: "Odyssey", year: 2024, trim: "EX", price: 42500, mileage: 3600, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 15, vdpViewsLast7Days: 47, leadsLast7Days: 1 },
        { id: "mkt-237", make: "Ford", model: "Expedition", year: 2024, trim: "XLT", price: 58500, mileage: 2800, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 12, vdpViewsLast7Days: 59, leadsLast7Days: 6 },
        { id: "mkt-238", make: "Chevrolet", model: "Corvette", year: 2024, trim: "Stingray", price: 72500, mileage: 1200, dealRating: "Fair Deal", vehicleType: "Sedans", daysOnLot: 22, vdpViewsLast7Days: 56, leadsLast7Days: 5 },
        { id: "mkt-239", make: "Nissan", model: "Ariya", year: 2024, trim: "Engage", price: 48500, mileage: 2400, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 11, vdpViewsLast7Days: 57, leadsLast7Days: 1 },
        { id: "mkt-240", make: "Jeep", model: "Grand Cherokee L", year: 2024, trim: "Limited", price: 52500, mileage: 3200, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 13, vdpViewsLast7Days: 54, leadsLast7Days: 5 },

        // Additional vehicles (241-480)
// Toyota vehicles
{ id: "mkt-241", make: "Toyota", model: "Camry", year: 2023, trim: "LE", price: 29078, mileage: 11305, dealRating: "Great Deal", vehicleType: "Sedans", daysOnLot: 7, vdpViewsLast7Days: 38, leadsLast7Days: 3 },
{ id: "mkt-242", make: "Toyota", model: "Camry", year: 2023, trim: "SE", price: 31493, mileage: 17504, dealRating: "Good Deal", vehicleType: "Sedans", daysOnLot: 9, vdpViewsLast7Days: 54, leadsLast7Days: 3 },
{ id: "mkt-243", make: "Toyota", model: "Camry", year: 2022, trim: "LE", price: 26353, mileage: 17728, dealRating: "Great Deal", vehicleType: "Sedans", daysOnLot: 16, vdpViewsLast7Days: 37, leadsLast7Days: 2 },
{ id: "mkt-244", make: "Toyota", model: "Camry", year: 2022, trim: "XLE", price: 30724, mileage: 20762, dealRating: "Good Deal", vehicleType: "Sedans", daysOnLot: 18, vdpViewsLast7Days: 26, leadsLast7Days: 1 },
{ id: "mkt-245", make: "Toyota", model: "Camry", year: 2022, trim: "SE", price: 25749, mileage: 42255, dealRating: "Fair Deal", vehicleType: "Sedans", daysOnLot: 37, vdpViewsLast7Days: 21, leadsLast7Days: 1 },
{ id: "mkt-246", make: "Toyota", model: "RAV4", year: 2023, trim: "XLE", price: 34860, mileage: 13372, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 4, vdpViewsLast7Days: 76, leadsLast7Days: 6 },
{ id: "mkt-247", make: "Toyota", model: "RAV4", year: 2023, trim: "Limited", price: 38515, mileage: 16883, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 10, vdpViewsLast7Days: 69, leadsLast7Days: 10 },
{ id: "mkt-248", make: "Toyota", model: "RAV4", year: 2022, trim: "LE", price: 33669, mileage: 28213, dealRating: "Great Deal", vehicleType: "SUV/CO", daysOnLot: 10, vdpViewsLast7Days: 45, leadsLast7Days: 1 },
{ id: "mkt-249", make: "Toyota", model: "RAV4", year: 2022, trim: "XLE", price: 35784, mileage: 30312, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 14, vdpViewsLast7Days: 42, leadsLast7Days: 2 },
{ id: "mkt-250", make: "Toyota", model: "RAV4", year: 2022, trim: "LE", price: 31241, mileage: 44057, dealRating: "Fair Deal", vehicleType: "SUV/CO", daysOnLot: 24, vdpViewsLast7Days: 24, leadsLast7Days: 2 },
{ id: "mkt-251", make: "Toyota", model: "Highlander", year: 2023, trim: "XLE", price: 43974, mileage: 15676, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 13, vdpViewsLast7Days: 49, leadsLast7Days: 3 },
{ id: "mkt-252", make: "Toyota", model: "Highlander", year: 2022, trim: "Limited", price: 45162, mileage: 19541, dealRating: "Fair Deal", vehicleType: "SUV/CO", daysOnLot: 29, vdpViewsLast7Days: 27, leadsLast7Days: 1 },
{ id: "mkt-253", make: "Toyota", model: "Corolla", year: 2023, trim: "LE", price: 21387, mileage: 13293, dealRating: "Great Deal", vehicleType: "Compact", daysOnLot: 11, vdpViewsLast7Days: 38, leadsLast7Days: 1 },
{ id: "mkt-254", make: "Toyota", model: "Corolla", year: 2022, trim: "SE", price: 20592, mileage: 28865, dealRating: "Great Deal", vehicleType: "Compact", daysOnLot: 20, vdpViewsLast7Days: 36, leadsLast7Days: 1 },
{ id: "mkt-255", make: "Toyota", model: "Tacoma", year: 2023, trim: "SR5", price: 40207, mileage: 12209, dealRating: "Good Deal", vehicleType: "Truck", daysOnLot: 2, vdpViewsLast7Days: 53, leadsLast7Days: 3 },
{ id: "mkt-256", make: "Toyota", model: "Tacoma", year: 2022, trim: "TRD Sport", price: 41650, mileage: 23361, dealRating: "Good Deal", vehicleType: "Truck", daysOnLot: 11, vdpViewsLast7Days: 42, leadsLast7Days: 1 },

        // Honda vehicles
{ id: "mkt-257", make: "Honda", model: "Accord", year: 2023, trim: "EX", price: 29142, mileage: 13130, dealRating: "Good Deal", vehicleType: "Sedans", daysOnLot: 6, vdpViewsLast7Days: 53, leadsLast7Days: 3 },
{ id: "mkt-258", make: "Honda", model: "Accord", year: 2023, trim: "Sport", price: 32603, mileage: 9265, dealRating: "Good Deal", vehicleType: "Sedans", daysOnLot: 13, vdpViewsLast7Days: 36, leadsLast7Days: 1 },
{ id: "mkt-259", make: "Honda", model: "Accord", year: 2022, trim: "LX", price: 28469, mileage: 24962, dealRating: "Great Deal", vehicleType: "Sedans", daysOnLot: 13, vdpViewsLast7Days: 40, leadsLast7Days: 1 },
{ id: "mkt-260", make: "Honda", model: "Accord", year: 2022, trim: "EX", price: 25540, mileage: 34855, dealRating: "Fair Deal", vehicleType: "Sedans", daysOnLot: 31, vdpViewsLast7Days: 28, leadsLast7Days: 1 },
{ id: "mkt-261", make: "Honda", model: "CR-V", year: 2023, trim: "EX", price: 35126, mileage: 12524, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 10, vdpViewsLast7Days: 63, leadsLast7Days: 6 },
{ id: "mkt-262", make: "Honda", model: "CR-V", year: 2023, trim: "EX-L", price: 38256, mileage: 17716, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 12, vdpViewsLast7Days: 60, leadsLast7Days: 2 },
{ id: "mkt-263", make: "Honda", model: "CR-V", year: 2022, trim: "LX", price: 32070, mileage: 30505, dealRating: "Great Deal", vehicleType: "SUV/CO", daysOnLot: 17, vdpViewsLast7Days: 52, leadsLast7Days: 2 },
{ id: "mkt-264", make: "Honda", model: "CR-V", year: 2022, trim: "EX", price: 32765, mileage: 28967, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 21, vdpViewsLast7Days: 32, leadsLast7Days: 4 },
{ id: "mkt-265", make: "Honda", model: "CR-V", year: 2022, trim: "LX", price: 29673, mileage: 41756, dealRating: "Fair Deal", vehicleType: "SUV/CO", daysOnLot: 29, vdpViewsLast7Days: 18, leadsLast7Days: 2 },
{ id: "mkt-266", make: "Honda", model: "Civic", year: 2023, trim: "Sport", price: 24627, mileage: 14157, dealRating: "Good Deal", vehicleType: "Compact", daysOnLot: 10, vdpViewsLast7Days: 39, leadsLast7Days: 1 },
{ id: "mkt-267", make: "Honda", model: "Civic", year: 2022, trim: "LX", price: 24014, mileage: 20609, dealRating: "Great Deal", vehicleType: "Compact", daysOnLot: 15, vdpViewsLast7Days: 32, leadsLast7Days: 1 },
{ id: "mkt-268", make: "Honda", model: "Pilot", year: 2023, trim: "EX-L", price: 45068, mileage: 13788, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 21, vdpViewsLast7Days: 45, leadsLast7Days: 1 },
{ id: "mkt-269", make: "Honda", model: "Pilot", year: 2022, trim: "Touring", price: 45276, mileage: 26505, dealRating: "Fair Deal", vehicleType: "SUV/CO", daysOnLot: 22, vdpViewsLast7Days: 24, leadsLast7Days: 2 },

        // Nissan vehicles
{ id: "mkt-270", make: "Nissan", model: "Altima", year: 2023, trim: "S", price: 25860, mileage: 18147, dealRating: "Good Deal", vehicleType: "Sedans", daysOnLot: 10, vdpViewsLast7Days: 30, leadsLast7Days: 3 },
{ id: "mkt-271", make: "Nissan", model: "Altima", year: 2022, trim: "SV", price: 24753, mileage: 27561, dealRating: "Great Deal", vehicleType: "Sedans", daysOnLot: 21, vdpViewsLast7Days: 25, leadsLast7Days: 2 },
{ id: "mkt-272", make: "Nissan", model: "Altima", year: 2022, trim: "S", price: 21397, mileage: 35160, dealRating: "Fair Deal", vehicleType: "Sedans", daysOnLot: 35, vdpViewsLast7Days: 20, leadsLast7Days: 2 },
{ id: "mkt-273", make: "Nissan", model: "Rogue", year: 2023, trim: "SV", price: 33604, mileage: 18282, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 14, vdpViewsLast7Days: 48, leadsLast7Days: 2 },
{ id: "mkt-274", make: "Nissan", model: "Rogue", year: 2022, trim: "S", price: 29446, mileage: 29970, dealRating: "Great Deal", vehicleType: "SUV/CO", daysOnLot: 19, vdpViewsLast7Days: 35, leadsLast7Days: 4 },
{ id: "mkt-275", make: "Nissan", model: "Rogue", year: 2022, trim: "SV", price: 26162, mileage: 47426, dealRating: "Fair Deal", vehicleType: "SUV/CO", daysOnLot: 31, vdpViewsLast7Days: 29, leadsLast7Days: 3 },
{ id: "mkt-276", make: "Nissan", model: "Sentra", year: 2023, trim: "SV", price: 21952, mileage: 21364, dealRating: "Good Deal", vehicleType: "Compact", daysOnLot: 11, vdpViewsLast7Days: 33, leadsLast7Days: 2 },
{ id: "mkt-277", make: "Nissan", model: "Sentra", year: 2022, trim: "S", price: 18615, mileage: 22603, dealRating: "Great Deal", vehicleType: "Compact", daysOnLot: 23, vdpViewsLast7Days: 30, leadsLast7Days: 2 },
{ id: "mkt-278", make: "Nissan", model: "Pathfinder", year: 2023, trim: "SV", price: 42591, mileage: 18555, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 16, vdpViewsLast7Days: 38, leadsLast7Days: 2 },
{ id: "mkt-279", make: "Nissan", model: "Frontier", year: 2023, trim: "SV", price: 38216, mileage: 13011, dealRating: "Good Deal", vehicleType: "Truck", daysOnLot: 12, vdpViewsLast7Days: 41, leadsLast7Days: 2 },

        // Ford vehicles
{ id: "mkt-280", make: "Ford", model: "F-150", year: 2023, trim: "XLT", price: 50915, mileage: 11150, dealRating: "Good Deal", vehicleType: "Truck", daysOnLot: 3, vdpViewsLast7Days: 70, leadsLast7Days: 6 },
{ id: "mkt-281", make: "Ford", model: "F-150", year: 2023, trim: "Lariat", price: 55421, mileage: 10721, dealRating: "Good Deal", vehicleType: "Truck", daysOnLot: 6, vdpViewsLast7Days: 69, leadsLast7Days: 7 },
{ id: "mkt-282", make: "Ford", model: "F-150", year: 2022, trim: "XLT", price: 45778, mileage: 23106, dealRating: "Great Deal", vehicleType: "Truck", daysOnLot: 11, vdpViewsLast7Days: 53, leadsLast7Days: 1 },
{ id: "mkt-283", make: "Ford", model: "F-150", year: 2022, trim: "XL", price: 41600, mileage: 29073, dealRating: "Good Deal", vehicleType: "Truck", daysOnLot: 15, vdpViewsLast7Days: 41, leadsLast7Days: 1 },
{ id: "mkt-284", make: "Ford", model: "F-150", year: 2022, trim: "XLT", price: 39852, mileage: 36767, dealRating: "Fair Deal", vehicleType: "Truck", daysOnLot: 29, vdpViewsLast7Days: 27, leadsLast7Days: 1 },
{ id: "mkt-285", make: "Ford", model: "Explorer", year: 2023, trim: "XLT", price: 43756, mileage: 16878, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 8, vdpViewsLast7Days: 58, leadsLast7Days: 4 },
{ id: "mkt-286", make: "Ford", model: "Explorer", year: 2022, trim: "Limited", price: 45323, mileage: 25053, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 16, vdpViewsLast7Days: 38, leadsLast7Days: 1 },
{ id: "mkt-287", make: "Ford", model: "Explorer", year: 2022, trim: "XLT", price: 38124, mileage: 45786, dealRating: "Fair Deal", vehicleType: "SUV/CO", daysOnLot: 37, vdpViewsLast7Days: 32, leadsLast7Days: 1 },
{ id: "mkt-288", make: "Ford", model: "Escape", year: 2023, trim: "SEL", price: 31371, mileage: 16097, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 15, vdpViewsLast7Days: 46, leadsLast7Days: 4 },
{ id: "mkt-289", make: "Ford", model: "Escape", year: 2022, trim: "SE", price: 29095, mileage: 31649, dealRating: "Great Deal", vehicleType: "SUV/CO", daysOnLot: 19, vdpViewsLast7Days: 39, leadsLast7Days: 3 },
{ id: "mkt-290", make: "Ford", model: "Maverick", year: 2023, trim: "XLT", price: 33166, mileage: 18028, dealRating: "Good Deal", vehicleType: "Truck", daysOnLot: 9, vdpViewsLast7Days: 53, leadsLast7Days: 4 },

        // Chevrolet vehicles
{ id: "mkt-291", make: "Chevrolet", model: "Silverado 1500", year: 2023, trim: "LT", price: 45302, mileage: 10542, dealRating: "Good Deal", vehicleType: "Truck", daysOnLot: 10, vdpViewsLast7Days: 68, leadsLast7Days: 2 },
{ id: "mkt-292", make: "Chevrolet", model: "Silverado 1500", year: 2022, trim: "LT", price: 45445, mileage: 24013, dealRating: "Good Deal", vehicleType: "Truck", daysOnLot: 18, vdpViewsLast7Days: 49, leadsLast7Days: 5 },
{ id: "mkt-293", make: "Chevrolet", model: "Silverado 1500", year: 2022, trim: "WT", price: 40565, mileage: 41118, dealRating: "Fair Deal", vehicleType: "Truck", daysOnLot: 29, vdpViewsLast7Days: 25, leadsLast7Days: 2 },
{ id: "mkt-294", make: "Chevrolet", model: "Equinox", year: 2023, trim: "LT", price: 30767, mileage: 19196, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 14, vdpViewsLast7Days: 47, leadsLast7Days: 1 },
{ id: "mkt-295", make: "Chevrolet", model: "Equinox", year: 2022, trim: "LS", price: 27804, mileage: 27495, dealRating: "Great Deal", vehicleType: "SUV/CO", daysOnLot: 14, vdpViewsLast7Days: 34, leadsLast7Days: 0 },
{ id: "mkt-296", make: "Chevrolet", model: "Equinox", year: 2022, trim: "LT", price: 24244, mileage: 47090, dealRating: "Fair Deal", vehicleType: "SUV/CO", daysOnLot: 32, vdpViewsLast7Days: 25, leadsLast7Days: 0 },
{ id: "mkt-297", make: "Chevrolet", model: "Traverse", year: 2023, trim: "LT", price: 39614, mileage: 17978, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 14, vdpViewsLast7Days: 49, leadsLast7Days: 1 },
{ id: "mkt-298", make: "Chevrolet", model: "Traverse", year: 2022, trim: "Premier", price: 43858, mileage: 18871, dealRating: "Fair Deal", vehicleType: "SUV/CO", daysOnLot: 21, vdpViewsLast7Days: 41, leadsLast7Days: 2 },
{ id: "mkt-299", make: "Chevrolet", model: "Malibu", year: 2023, trim: "LT", price: 26347, mileage: 12604, dealRating: "Good Deal", vehicleType: "Sedans", daysOnLot: 15, vdpViewsLast7Days: 46, leadsLast7Days: 1 },
{ id: "mkt-300", make: "Chevrolet", model: "Malibu", year: 2022, trim: "LS", price: 24794, mileage: 28375, dealRating: "Great Deal", vehicleType: "Sedans", daysOnLot: 22, vdpViewsLast7Days: 25, leadsLast7Days: 1 },

        // Jeep vehicles
{ id: "mkt-301", make: "Jeep", model: "Wrangler", year: 2023, trim: "Sport", price: 42994, mileage: 17504, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 2, vdpViewsLast7Days: 72, leadsLast7Days: 3 },
{ id: "mkt-302", make: "Jeep", model: "Wrangler", year: 2023, trim: "Sahara", price: 49882, mileage: 8717, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 12, vdpViewsLast7Days: 61, leadsLast7Days: 4 },
{ id: "mkt-303", make: "Jeep", model: "Wrangler", year: 2022, trim: "Sport", price: 41239, mileage: 21434, dealRating: "Great Deal", vehicleType: "SUV/CO", daysOnLot: 8, vdpViewsLast7Days: 63, leadsLast7Days: 5 },
{ id: "mkt-304", make: "Jeep", model: "Grand Cherokee", year: 2023, trim: "Laredo", price: 45272, mileage: 14424, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 12, vdpViewsLast7Days: 48, leadsLast7Days: 1 },
{ id: "mkt-305", make: "Jeep", model: "Grand Cherokee", year: 2022, trim: "Limited", price: 46689, mileage: 19494, dealRating: "Fair Deal", vehicleType: "SUV/CO", daysOnLot: 21, vdpViewsLast7Days: 41, leadsLast7Days: 1 },
{ id: "mkt-306", make: "Jeep", model: "Cherokee", year: 2023, trim: "Latitude", price: 35482, mileage: 16912, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 9, vdpViewsLast7Days: 54, leadsLast7Days: 3 },
{ id: "mkt-307", make: "Jeep", model: "Gladiator", year: 2023, trim: "Sport", price: 47871, mileage: 14369, dealRating: "Good Deal", vehicleType: "Truck", daysOnLot: 8, vdpViewsLast7Days: 66, leadsLast7Days: 3 },

        // RAM vehicles
{ id: "mkt-308", make: "RAM", model: "1500", year: 2023, trim: "Big Horn", price: 50881, mileage: 12457, dealRating: "Good Deal", vehicleType: "Truck", daysOnLot: 2, vdpViewsLast7Days: 79, leadsLast7Days: 5 },
{ id: "mkt-309", make: "RAM", model: "1500", year: 2022, trim: "Tradesman", price: 43350, mileage: 28913, dealRating: "Good Deal", vehicleType: "Truck", daysOnLot: 11, vdpViewsLast7Days: 44, leadsLast7Days: 2 },
{ id: "mkt-310", make: "RAM", model: "1500", year: 2022, trim: "Big Horn", price: 43538, mileage: 41966, dealRating: "Fair Deal", vehicleType: "Truck", daysOnLot: 31, vdpViewsLast7Days: 26, leadsLast7Days: 2 },

        // Hyundai vehicles
{ id: "mkt-311", make: "Hyundai", model: "Tucson", year: 2023, trim: "SEL", price: 29932, mileage: 19131, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 15, vdpViewsLast7Days: 51, leadsLast7Days: 5 },
{ id: "mkt-312", make: "Hyundai", model: "Tucson", year: 2022, trim: "SE", price: 29714, mileage: 29817, dealRating: "Great Deal", vehicleType: "SUV/CO", daysOnLot: 15, vdpViewsLast7Days: 47, leadsLast7Days: 1 },
{ id: "mkt-313", make: "Hyundai", model: "Tucson", year: 2022, trim: "SEL", price: 26436, mileage: 39777, dealRating: "Fair Deal", vehicleType: "SUV/CO", daysOnLot: 25, vdpViewsLast7Days: 19, leadsLast7Days: 0 },
{ id: "mkt-314", make: "Hyundai", model: "Elantra", year: 2023, trim: "SEL", price: 23085, mileage: 15332, dealRating: "Good Deal", vehicleType: "Compact", daysOnLot: 9, vdpViewsLast7Days: 34, leadsLast7Days: 2 },
{ id: "mkt-315", make: "Hyundai", model: "Elantra", year: 2022, trim: "SE", price: 21903, mileage: 23824, dealRating: "Great Deal", vehicleType: "Compact", daysOnLot: 19, vdpViewsLast7Days: 29, leadsLast7Days: 1 },
{ id: "mkt-316", make: "Hyundai", model: "Santa Fe", year: 2023, trim: "SEL", price: 36113, mileage: 14397, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 9, vdpViewsLast7Days: 52, leadsLast7Days: 2 },
{ id: "mkt-317", make: "Hyundai", model: "Santa Fe", year: 2022, trim: "Limited", price: 40916, mileage: 27363, dealRating: "Fair Deal", vehicleType: "SUV/CO", daysOnLot: 25, vdpViewsLast7Days: 30, leadsLast7Days: 0 },

        // Kia vehicles
{ id: "mkt-318", make: "Kia", model: "Sportage", year: 2023, trim: "LX", price: 30043, mileage: 18226, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 11, vdpViewsLast7Days: 45, leadsLast7Days: 1 },
{ id: "mkt-319", make: "Kia", model: "Sportage", year: 2022, trim: "EX", price: 31680, mileage: 26032, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 22, vdpViewsLast7Days: 33, leadsLast7Days: 1 },
{ id: "mkt-320", make: "Kia", model: "Forte", year: 2023, trim: "LXS", price: 21597, mileage: 20621, dealRating: "Good Deal", vehicleType: "Compact", daysOnLot: 14, vdpViewsLast7Days: 41, leadsLast7Days: 5 },
{ id: "mkt-321", make: "Kia", model: "Forte", year: 2022, trim: "FE", price: 20113, mileage: 24371, dealRating: "Great Deal", vehicleType: "Compact", daysOnLot: 23, vdpViewsLast7Days: 21, leadsLast7Days: 1 },
{ id: "mkt-322", make: "Kia", model: "Telluride", year: 2023, trim: "LX", price: 41643, mileage: 14828, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 12, vdpViewsLast7Days: 63, leadsLast7Days: 8 },
{ id: "mkt-323", make: "Kia", model: "Telluride", year: 2022, trim: "EX", price: 46226, mileage: 23068, dealRating: "Fair Deal", vehicleType: "SUV/CO", daysOnLot: 19, vdpViewsLast7Days: 46, leadsLast7Days: 4 },

        // Mazda vehicles
{ id: "mkt-324", make: "Mazda", model: "CX-5", year: 2023, trim: "Sport", price: 31497, mileage: 16778, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 13, vdpViewsLast7Days: 47, leadsLast7Days: 1 },
{ id: "mkt-325", make: "Mazda", model: "CX-5", year: 2022, trim: "Touring", price: 36270, mileage: 25381, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 12, vdpViewsLast7Days: 52, leadsLast7Days: 1 },
{ id: "mkt-326", make: "Mazda", model: "Mazda3", year: 2023, trim: "Base", price: 23923, mileage: 17145, dealRating: "Good Deal", vehicleType: "Compact", daysOnLot: 13, vdpViewsLast7Days: 29, leadsLast7Days: 0 },
{ id: "mkt-327", make: "Mazda", model: "CX-9", year: 2022, trim: "Touring", price: 40916, mileage: 24217, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 20, vdpViewsLast7Days: 46, leadsLast7Days: 4 },

        // Subaru vehicles
{ id: "mkt-328", make: "Subaru", model: "Outback", year: 2023, trim: "Base", price: 32846, mileage: 9589, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 9, vdpViewsLast7Days: 55, leadsLast7Days: 1 },
{ id: "mkt-329", make: "Subaru", model: "Outback", year: 2022, trim: "Premium", price: 35229, mileage: 21481, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 12, vdpViewsLast7Days: 37, leadsLast7Days: 1 },
{ id: "mkt-330", make: "Subaru", model: "Forester", year: 2023, trim: "Base", price: 32607, mileage: 16852, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 12, vdpViewsLast7Days: 45, leadsLast7Days: 0 },
{ id: "mkt-331", make: "Subaru", model: "Forester", year: 2022, trim: "Premium", price: 33227, mileage: 27366, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 17, vdpViewsLast7Days: 31, leadsLast7Days: 2 },
{ id: "mkt-332", make: "Subaru", model: "Crosstrek", year: 2023, trim: "Base", price: 27098, mileage: 13140, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 10, vdpViewsLast7Days: 38, leadsLast7Days: 2 },

        // Volkswagen vehicles
{ id: "mkt-333", make: "Volkswagen", model: "Jetta", year: 2023, trim: "S", price: 24335, mileage: 14722, dealRating: "Good Deal", vehicleType: "Compact", daysOnLot: 15, vdpViewsLast7Days: 39, leadsLast7Days: 2 },
{ id: "mkt-334", make: "Volkswagen", model: "Jetta", year: 2022, trim: "SE", price: 26987, mileage: 19679, dealRating: "Good Deal", vehicleType: "Compact", daysOnLot: 18, vdpViewsLast7Days: 38, leadsLast7Days: 3 },
{ id: "mkt-335", make: "Volkswagen", model: "Tiguan", year: 2023, trim: "S", price: 32936, mileage: 13605, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 8, vdpViewsLast7Days: 49, leadsLast7Days: 3 },
{ id: "mkt-336", make: "Volkswagen", model: "Atlas", year: 2022, trim: "SE", price: 39503, mileage: 27733, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 21, vdpViewsLast7Days: 34, leadsLast7Days: 1 },

        // Luxury vehicles - BMW
{ id: "mkt-337", make: "BMW", model: "3 Series", year: 2023, trim: "330i", price: 43602, mileage: 9983, dealRating: "Good Deal", vehicleType: "Luxury", daysOnLot: 10, vdpViewsLast7Days: 42, leadsLast7Days: 2 },
{ id: "mkt-338", make: "BMW", model: "3 Series", year: 2022, trim: "330i", price: 40768, mileage: 27295, dealRating: "Fair Deal", vehicleType: "Luxury", daysOnLot: 26, vdpViewsLast7Days: 35, leadsLast7Days: 1 },
{ id: "mkt-339", make: "BMW", model: "X5", year: 2023, trim: "xDrive40i", price: 60687, mileage: 17039, dealRating: "Fair Deal", vehicleType: "Luxury", daysOnLot: 14, vdpViewsLast7Days: 46, leadsLast7Days: 3 },
{ id: "mkt-340", make: "BMW", model: "X3", year: 2022, trim: "xDrive30i", price: 44524, mileage: 26097, dealRating: "Good Deal", vehicleType: "Luxury", daysOnLot: 22, vdpViewsLast7Days: 40, leadsLast7Days: 3 },

        // Luxury vehicles - Mercedes-Benz
{ id: "mkt-341", make: "Mercedes-Benz", model: "C-Class", year: 2023, trim: "C300", price: 48223, mileage: 9789, dealRating: "Good Deal", vehicleType: "Luxury", daysOnLot: 13, vdpViewsLast7Days: 52, leadsLast7Days: 4 },
{ id: "mkt-342", make: "Mercedes-Benz", model: "C-Class", year: 2022, trim: "C300", price: 42990, mileage: 23924, dealRating: "Fair Deal", vehicleType: "Luxury", daysOnLot: 31, vdpViewsLast7Days: 33, leadsLast7Days: 2 },
{ id: "mkt-343", make: "Mercedes-Benz", model: "GLE", year: 2023, trim: "350", price: 63945, mileage: 13079, dealRating: "Fair Deal", vehicleType: "Luxury", daysOnLot: 19, vdpViewsLast7Days: 42, leadsLast7Days: 3 },
{ id: "mkt-344", make: "Mercedes-Benz", model: "GLC", year: 2022, trim: "300", price: 45802, mileage: 23227, dealRating: "Good Deal", vehicleType: "Luxury", daysOnLot: 25, vdpViewsLast7Days: 37, leadsLast7Days: 2 },

        // Luxury vehicles - Audi
{ id: "mkt-345", make: "Audi", model: "A4", year: 2023, trim: "Premium", price: 44873, mileage: 16268, dealRating: "Good Deal", vehicleType: "Luxury", daysOnLot: 12, vdpViewsLast7Days: 49, leadsLast7Days: 1 },
{ id: "mkt-346", make: "Audi", model: "A4", year: 2022, trim: "Premium Plus", price: 44488, mileage: 25722, dealRating: "Fair Deal", vehicleType: "Luxury", daysOnLot: 21, vdpViewsLast7Days: 29, leadsLast7Days: 1 },
{ id: "mkt-347", make: "Audi", model: "Q5", year: 2023, trim: "Premium", price: 45972, mileage: 15041, dealRating: "Good Deal", vehicleType: "Luxury", daysOnLot: 12, vdpViewsLast7Days: 52, leadsLast7Days: 2 },
{ id: "mkt-348", make: "Audi", model: "Q7", year: 2022, trim: "Premium Plus", price: 56327, mileage: 19422, dealRating: "Fair Deal", vehicleType: "Luxury", daysOnLot: 30, vdpViewsLast7Days: 39, leadsLast7Days: 0 },

        // Luxury vehicles - Lexus
{ id: "mkt-349", make: "Lexus", model: "ES", year: 2023, trim: "350", price: 47834, mileage: 17518, dealRating: "Good Deal", vehicleType: "Luxury", daysOnLot: 11, vdpViewsLast7Days: 54, leadsLast7Days: 5 },
{ id: "mkt-350", make: "Lexus", model: "ES", year: 2022, trim: "350", price: 45510, mileage: 20650, dealRating: "Good Deal", vehicleType: "Luxury", daysOnLot: 21, vdpViewsLast7Days: 39, leadsLast7Days: 1 },
{ id: "mkt-351", make: "Lexus", model: "RX", year: 2023, trim: "350", price: 52035, mileage: 16418, dealRating: "Good Deal", vehicleType: "Luxury", daysOnLot: 8, vdpViewsLast7Days: 59, leadsLast7Days: 4 },
{ id: "mkt-352", make: "Lexus", model: "RX", year: 2022, trim: "350", price: 49206, mileage: 26343, dealRating: "Fair Deal", vehicleType: "Luxury", daysOnLot: 24, vdpViewsLast7Days: 48, leadsLast7Days: 5 },

        // Additional variety with High Priced and Over Priced ratings
{ id: "mkt-353", make: "Toyota", model: "Camry", year: 2021, trim: "SE", price: 28624, mileage: 51027, dealRating: "High Priced", vehicleType: "Sedans", daysOnLot: 48, vdpViewsLast7Days: 24, leadsLast7Days: 1 },
{ id: "mkt-354", make: "Honda", model: "CR-V", year: 2021, trim: "EX", price: 35717, mileage: 53708, dealRating: "Over Priced", vehicleType: "SUV/CO", daysOnLot: 49, vdpViewsLast7Days: 23, leadsLast7Days: 1 },
{ id: "mkt-355", make: "Ford", model: "F-150", year: 2021, trim: "XLT", price: 48262, mileage: 45953, dealRating: "High Priced", vehicleType: "Truck", daysOnLot: 43, vdpViewsLast7Days: 12, leadsLast7Days: 1 },
{ id: "mkt-356", make: "Nissan", model: "Altima", year: 2021, trim: "SV", price: 26702, mileage: 58949, dealRating: "Over Priced", vehicleType: "Sedans", daysOnLot: 52, vdpViewsLast7Days: 9, leadsLast7Days: 0 },
{ id: "mkt-357", make: "Chevrolet", model: "Equinox", year: 2021, trim: "LT", price: 28372, mileage: 56073, dealRating: "High Priced", vehicleType: "SUV/CO", daysOnLot: 47, vdpViewsLast7Days: 11, leadsLast7Days: 1 },
{ id: "mkt-358", make: "BMW", model: "3 Series", year: 2022, trim: "330i", price: 48694, mileage: 32032, dealRating: "Over Priced", vehicleType: "Luxury", daysOnLot: 34, vdpViewsLast7Days: 21, leadsLast7Days: 1 },
{ id: "mkt-359", make: "Hyundai", model: "Tucson", year: 2021, trim: "SEL", price: 29656, mileage: 53097, dealRating: "High Priced", vehicleType: "SUV/CO", daysOnLot: 44, vdpViewsLast7Days: 12, leadsLast7Days: 0 },
{ id: "mkt-360", make: "Jeep", model: "Wrangler", year: 2022, trim: "Sport", price: 45966, mileage: 29775, dealRating: "Over Priced", vehicleType: "SUV/CO", daysOnLot: 39, vdpViewsLast7Days: 33, leadsLast7Days: 1 },

        // Additional 120 vehicles for doubled inventory
        // More Toyota vehicles
{ id: "mkt-361", make: "Toyota", model: "Tundra", year: 2023, trim: "SR5", price: 50026, mileage: 9650, dealRating: "Good Deal", vehicleType: "Truck", daysOnLot: 7, vdpViewsLast7Days: 74, leadsLast7Days: 1 },
{ id: "mkt-362", make: "Toyota", model: "Tundra", year: 2022, trim: "Limited", price: 59429, mileage: 23037, dealRating: "Fair Deal", vehicleType: "Truck", daysOnLot: 16, vdpViewsLast7Days: 52, leadsLast7Days: 4 },
{ id: "mkt-363", make: "Toyota", model: "Camry", year: 2021, trim: "XSE", price: 23907, mileage: 44008, dealRating: "Fair Deal", vehicleType: "Sedans", daysOnLot: 41, vdpViewsLast7Days: 16, leadsLast7Days: 1 },
{ id: "mkt-364", make: "Toyota", model: "RAV4", year: 2021, trim: "XLE", price: 29565, mileage: 43675, dealRating: "Fair Deal", vehicleType: "SUV/CO", daysOnLot: 34, vdpViewsLast7Days: 38, leadsLast7Days: 2 },
{ id: "mkt-365", make: "Toyota", model: "4Runner", year: 2023, trim: "SR5", price: 49207, mileage: 12882, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 5, vdpViewsLast7Days: 63, leadsLast7Days: 2 },
{ id: "mkt-366", make: "Toyota", model: "4Runner", year: 2022, trim: "TRD Off-Road", price: 51699, mileage: 22214, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 18, vdpViewsLast7Days: 47, leadsLast7Days: 1 },
{ id: "mkt-367", make: "Toyota", model: "Sienna", year: 2023, trim: "XLE", price: 46982, mileage: 14032, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 12, vdpViewsLast7Days: 42, leadsLast7Days: 2 },
{ id: "mkt-368", make: "Toyota", model: "Corolla", year: 2022, trim: "LE", price: 19325, mileage: 38270, dealRating: "Great Deal", vehicleType: "Compact", daysOnLot: 24, vdpViewsLast7Days: 39, leadsLast7Days: 2 },

        // More Honda vehicles
{ id: "mkt-369", make: "Honda", model: "Ridgeline", year: 2023, trim: "RTL", price: 40878, mileage: 12150, dealRating: "Good Deal", vehicleType: "Truck", daysOnLot: 7, vdpViewsLast7Days: 47, leadsLast7Days: 0 },
{ id: "mkt-370", make: "Honda", model: "Ridgeline", year: 2022, trim: "Sport", price: 39403, mileage: 24013, dealRating: "Good Deal", vehicleType: "Truck", daysOnLot: 20, vdpViewsLast7Days: 48, leadsLast7Days: 1 },
{ id: "mkt-371", make: "Honda", model: "Accord", year: 2021, trim: "Sport", price: 24471, mileage: 42180, dealRating: "Fair Deal", vehicleType: "Sedans", daysOnLot: 35, vdpViewsLast7Days: 24, leadsLast7Days: 1 },
{ id: "mkt-372", make: "Honda", model: "CR-V", year: 2021, trim: "EX", price: 28800, mileage: 42727, dealRating: "Fair Deal", vehicleType: "SUV/CO", daysOnLot: 29, vdpViewsLast7Days: 39, leadsLast7Days: 1 },
{ id: "mkt-373", make: "Honda", model: "Passport", year: 2023, trim: "TrailSport", price: 46732, mileage: 9541, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 12, vdpViewsLast7Days: 55, leadsLast7Days: 1 },
{ id: "mkt-374", make: "Honda", model: "Passport", year: 2022, trim: "EX-L", price: 42914, mileage: 22268, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 17, vdpViewsLast7Days: 41, leadsLast7Days: 2 },
{ id: "mkt-375", make: "Honda", model: "Civic", year: 2022, trim: "EX", price: 23031, mileage: 36754, dealRating: "Good Deal", vehicleType: "Compact", daysOnLot: 16, vdpViewsLast7Days: 26, leadsLast7Days: 1 },
{ id: "mkt-376", make: "Honda", model: "Civic", year: 2021, trim: "Sport", price: 21348, mileage: 41708, dealRating: "Fair Deal", vehicleType: "Compact", daysOnLot: 25, vdpViewsLast7Days: 29, leadsLast7Days: 2 },

        // More Ford vehicles
{ id: "mkt-377", make: "Ford", model: "Ranger", year: 2023, trim: "Lariat", price: 41459, mileage: 12228, dealRating: "Good Deal", vehicleType: "Truck", daysOnLot: 8, vdpViewsLast7Days: 49, leadsLast7Days: 3 },
{ id: "mkt-378", make: "Ford", model: "Ranger", year: 2022, trim: "XLT", price: 39513, mileage: 21695, dealRating: "Good Deal", vehicleType: "Truck", daysOnLot: 18, vdpViewsLast7Days: 57, leadsLast7Days: 1 },
{ id: "mkt-379", make: "Ford", model: "Edge", year: 2023, trim: "SEL", price: 38791, mileage: 16523, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 11, vdpViewsLast7Days: 41, leadsLast7Days: 2 },
{ id: "mkt-380", make: "Ford", model: "Edge", year: 2022, trim: "ST", price: 46867, mileage: 21358, dealRating: "Fair Deal", vehicleType: "SUV/CO", daysOnLot: 18, vdpViewsLast7Days: 38, leadsLast7Days: 2 },
{ id: "mkt-381", make: "Ford", model: "Bronco", year: 2023, trim: "Big Bend", price: 48087, mileage: 7442, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 11, vdpViewsLast7Days: 71, leadsLast7Days: 4 },
{ id: "mkt-382", make: "Ford", model: "Bronco", year: 2022, trim: "Outer Banks", price: 52852, mileage: 23874, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 13, vdpViewsLast7Days: 72, leadsLast7Days: 2 },
{ id: "mkt-383", make: "Ford", model: "F-150", year: 2021, trim: "XLT", price: 38260, mileage: 49737, dealRating: "Fair Deal", vehicleType: "Truck", daysOnLot: 28, vdpViewsLast7Days: 26, leadsLast7Days: 1 },
{ id: "mkt-384", make: "Ford", model: "Escape", year: 2022, trim: "SEL", price: 28032, mileage: 40983, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 19, vdpViewsLast7Days: 35, leadsLast7Days: 1 },

        // More Chevrolet vehicles
{ id: "mkt-385", make: "Chevrolet", model: "Colorado", year: 2023, trim: "Z71", price: 43121, mileage: 11547, dealRating: "Good Deal", vehicleType: "Truck", daysOnLot: 5, vdpViewsLast7Days: 57, leadsLast7Days: 2 },
{ id: "mkt-386", make: "Chevrolet", model: "Colorado", year: 2022, trim: "LT", price: 40681, mileage: 24243, dealRating: "Good Deal", vehicleType: "Truck", daysOnLot: 14, vdpViewsLast7Days: 55, leadsLast7Days: 3 },
{ id: "mkt-387", make: "Chevrolet", model: "Tahoe", year: 2023, trim: "LT", price: 55944, mileage: 10256, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 13, vdpViewsLast7Days: 58, leadsLast7Days: 8 },
{ id: "mkt-388", make: "Chevrolet", model: "Tahoe", year: 2022, trim: "Premier", price: 64875, mileage: 18782, dealRating: "Fair Deal", vehicleType: "SUV/CO", daysOnLot: 23, vdpViewsLast7Days: 45, leadsLast7Days: 1 },
{ id: "mkt-389", make: "Chevrolet", model: "Blazer", year: 2023, trim: "RS", price: 38905, mileage: 11131, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 15, vdpViewsLast7Days: 42, leadsLast7Days: 2 },
{ id: "mkt-390", make: "Chevrolet", model: "Blazer", year: 2022, trim: "LT", price: 35822, mileage: 25826, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 21, vdpViewsLast7Days: 48, leadsLast7Days: 5 },
{ id: "mkt-391", make: "Chevrolet", model: "Silverado 1500", year: 2021, trim: "LT", price: 35954, mileage: 44751, dealRating: "Fair Deal", vehicleType: "Truck", daysOnLot: 29, vdpViewsLast7Days: 36, leadsLast7Days: 2 },
{ id: "mkt-392", make: "Chevrolet", model: "Camaro", year: 2023, trim: "LT", price: 35635, mileage: 17080, dealRating: "Good Deal", vehicleType: "Sedans", daysOnLot: 16, vdpViewsLast7Days: 55, leadsLast7Days: 2 },

        // More Nissan vehicles
{ id: "mkt-393", make: "Nissan", model: "Murano", year: 2023, trim: "SL", price: 40016, mileage: 11361, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 15, vdpViewsLast7Days: 42, leadsLast7Days: 1 },
{ id: "mkt-394", make: "Nissan", model: "Murano", year: 2022, trim: "SV", price: 36628, mileage: 21432, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 16, vdpViewsLast7Days: 39, leadsLast7Days: 1 },
{ id: "mkt-395", make: "Nissan", model: "Maxima", year: 2022, trim: "SV", price: 34394, mileage: 25322, dealRating: "Good Deal", vehicleType: "Sedans", daysOnLot: 13, vdpViewsLast7Days: 39, leadsLast7Days: 4 },
{ id: "mkt-396", make: "Nissan", model: "Kicks", year: 2023, trim: "SV", price: 25509, mileage: 20360, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 13, vdpViewsLast7Days: 34, leadsLast7Days: 2 },
{ id: "mkt-397", make: "Nissan", model: "Kicks", year: 2022, trim: "S", price: 20812, mileage: 23854, dealRating: "Great Deal", vehicleType: "SUV/CO", daysOnLot: 25, vdpViewsLast7Days: 36, leadsLast7Days: 1 },
{ id: "mkt-398", make: "Nissan", model: "Frontier", year: 2022, trim: "PRO-4X", price: 38749, mileage: 20059, dealRating: "Good Deal", vehicleType: "Truck", daysOnLot: 16, vdpViewsLast7Days: 39, leadsLast7Days: 3 },
{ id: "mkt-399", make: "Nissan", model: "Titan", year: 2023, trim: "SV", price: 45641, mileage: 8934, dealRating: "Good Deal", vehicleType: "Truck", daysOnLot: 14, vdpViewsLast7Days: 58, leadsLast7Days: 1 },
{ id: "mkt-400", make: "Nissan", model: "Versa", year: 2023, trim: "S", price: 18231, mileage: 11853, dealRating: "Great Deal", vehicleType: "Compact", daysOnLot: 20, vdpViewsLast7Days: 43, leadsLast7Days: 2 },

        // More Jeep vehicles
{ id: "mkt-401", make: "Jeep", model: "Compass", year: 2023, trim: "Latitude", price: 31922, mileage: 13784, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 11, vdpViewsLast7Days: 47, leadsLast7Days: 2 },
{ id: "mkt-402", make: "Jeep", model: "Compass", year: 2022, trim: "Sport", price: 28020, mileage: 26662, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 18, vdpViewsLast7Days: 36, leadsLast7Days: 3 },
{ id: "mkt-403", make: "Jeep", model: "Renegade", year: 2023, trim: "Latitude", price: 27673, mileage: 10735, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 12, vdpViewsLast7Days: 42, leadsLast7Days: 5 },
{ id: "mkt-404", make: "Jeep", model: "Renegade", year: 2022, trim: "Sport", price: 26222, mileage: 25062, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 19, vdpViewsLast7Days: 34, leadsLast7Days: 2 },
{ id: "mkt-405", make: "Jeep", model: "Wrangler", year: 2022, trim: "Sahara", price: 44504, mileage: 28237, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 15, vdpViewsLast7Days: 44, leadsLast7Days: 4 },
{ id: "mkt-406", make: "Jeep", model: "Grand Cherokee", year: 2022, trim: "Laredo", price: 40922, mileage: 34678, dealRating: "Fair Deal", vehicleType: "SUV/CO", daysOnLot: 28, vdpViewsLast7Days: 30, leadsLast7Days: 2 },

        // More RAM vehicles
{ id: "mkt-407", make: "RAM", model: "2500", year: 2023, trim: "Laramie", price: 62707, mileage: 12654, dealRating: "Good Deal", vehicleType: "Truck", daysOnLot: 4, vdpViewsLast7Days: 58, leadsLast7Days: 2 },
{ id: "mkt-408", make: "RAM", model: "2500", year: 2022, trim: "Big Horn", price: 58570, mileage: 22716, dealRating: "Good Deal", vehicleType: "Truck", daysOnLot: 13, vdpViewsLast7Days: 57, leadsLast7Days: 1 },
{ id: "mkt-409", make: "RAM", model: "1500", year: 2022, trim: "Laramie", price: 50110, mileage: 32160, dealRating: "Fair Deal", vehicleType: "Truck", daysOnLot: 21, vdpViewsLast7Days: 39, leadsLast7Days: 2 },
{ id: "mkt-410", make: "RAM", model: "1500", year: 2021, trim: "Big Horn", price: 42499, mileage: 43432, dealRating: "Fair Deal", vehicleType: "Truck", daysOnLot: 28, vdpViewsLast7Days: 40, leadsLast7Days: 4 },

        // More Hyundai vehicles
{ id: "mkt-411", make: "Hyundai", model: "Palisade", year: 2023, trim: "SEL", price: 41523, mileage: 8785, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 13, vdpViewsLast7Days: 67, leadsLast7Days: 5 },
{ id: "mkt-412", make: "Hyundai", model: "Palisade", year: 2022, trim: "Limited", price: 46422, mileage: 25306, dealRating: "Fair Deal", vehicleType: "SUV/CO", daysOnLot: 23, vdpViewsLast7Days: 55, leadsLast7Days: 4 },
{ id: "mkt-413", make: "Hyundai", model: "Kona", year: 2023, trim: "SEL", price: 27360, mileage: 12064, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 12, vdpViewsLast7Days: 53, leadsLast7Days: 2 },
{ id: "mkt-414", make: "Hyundai", model: "Kona", year: 2022, trim: "SE", price: 23707, mileage: 31571, dealRating: "Great Deal", vehicleType: "SUV/CO", daysOnLot: 19, vdpViewsLast7Days: 33, leadsLast7Days: 3 },
{ id: "mkt-415", make: "Hyundai", model: "Sonata", year: 2023, trim: "SEL", price: 29852, mileage: 10834, dealRating: "Good Deal", vehicleType: "Sedans", daysOnLot: 11, vdpViewsLast7Days: 44, leadsLast7Days: 2 },
{ id: "mkt-416", make: "Hyundai", model: "Sonata", year: 2022, trim: "SE", price: 25470, mileage: 25429, dealRating: "Great Deal", vehicleType: "Sedans", daysOnLot: 23, vdpViewsLast7Days: 43, leadsLast7Days: 2 },
{ id: "mkt-417", make: "Hyundai", model: "Venue", year: 2023, trim: "SEL", price: 23249, mileage: 16656, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 13, vdpViewsLast7Days: 30, leadsLast7Days: 3 },

        // More Kia vehicles
{ id: "mkt-418", make: "Kia", model: "Sorento", year: 2023, trim: "LX", price: 34926, mileage: 15621, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 7, vdpViewsLast7Days: 47, leadsLast7Days: 3 },
{ id: "mkt-419", make: "Kia", model: "Sorento", year: 2022, trim: "EX", price: 36216, mileage: 28027, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 18, vdpViewsLast7Days: 46, leadsLast7Days: 2 },
{ id: "mkt-420", make: "Kia", model: "Seltos", year: 2023, trim: "LX", price: 26875, mileage: 11738, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 17, vdpViewsLast7Days: 43, leadsLast7Days: 1 },
{ id: "mkt-421", make: "Kia", model: "Seltos", year: 2022, trim: "S", price: 23805, mileage: 25936, dealRating: "Great Deal", vehicleType: "SUV/CO", daysOnLot: 17, vdpViewsLast7Days: 29, leadsLast7Days: 1 },
{ id: "mkt-422", make: "Kia", model: "Soul", year: 2023, trim: "LX", price: 23359, mileage: 13523, dealRating: "Good Deal", vehicleType: "Compact", daysOnLot: 18, vdpViewsLast7Days: 30, leadsLast7Days: 1 },
{ id: "mkt-423", make: "Kia", model: "K5", year: 2023, trim: "LXS", price: 29710, mileage: 18339, dealRating: "Good Deal", vehicleType: "Sedans", daysOnLot: 16, vdpViewsLast7Days: 42, leadsLast7Days: 5 },
{ id: "mkt-424", make: "Kia", model: "K5", year: 2022, trim: "GT-Line", price: 31508, mileage: 24185, dealRating: "Good Deal", vehicleType: "Sedans", daysOnLot: 19, vdpViewsLast7Days: 33, leadsLast7Days: 1 },

        // More Mazda vehicles
{ id: "mkt-425", make: "Mazda", model: "CX-50", year: 2023, trim: "Select", price: 33509, mileage: 16843, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 15, vdpViewsLast7Days: 54, leadsLast7Days: 2 },
{ id: "mkt-426", make: "Mazda", model: "CX-50", year: 2022, trim: "Preferred", price: 37777, mileage: 17137, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 16, vdpViewsLast7Days: 52, leadsLast7Days: 1 },
{ id: "mkt-427", make: "Mazda", model: "CX-30", year: 2023, trim: "Select", price: 27661, mileage: 16295, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 12, vdpViewsLast7Days: 45, leadsLast7Days: 1 },
{ id: "mkt-428", make: "Mazda", model: "CX-90", year: 2023, trim: "Preferred", price: 44102, mileage: 15081, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 8, vdpViewsLast7Days: 51, leadsLast7Days: 2 },
{ id: "mkt-429", make: "Mazda", model: "Mazda3", year: 2022, trim: "Select", price: 25226, mileage: 23384, dealRating: "Good Deal", vehicleType: "Compact", daysOnLot: 14, vdpViewsLast7Days: 45, leadsLast7Days: 3 },

        // More Subaru vehicles
{ id: "mkt-430", make: "Subaru", model: "Ascent", year: 2023, trim: "Base", price: 39841, mileage: 14989, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 10, vdpViewsLast7Days: 61, leadsLast7Days: 1 },
{ id: "mkt-431", make: "Subaru", model: "Ascent", year: 2022, trim: "Premium", price: 41031, mileage: 24488, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 17, vdpViewsLast7Days: 52, leadsLast7Days: 0 },
{ id: "mkt-432", make: "Subaru", model: "Impreza", year: 2023, trim: "Base", price: 25114, mileage: 12656, dealRating: "Good Deal", vehicleType: "Compact", daysOnLot: 15, vdpViewsLast7Days: 33, leadsLast7Days: 1 },
{ id: "mkt-433", make: "Subaru", model: "Legacy", year: 2023, trim: "Base", price: 29128, mileage: 15175, dealRating: "Good Deal", vehicleType: "Sedans", daysOnLot: 14, vdpViewsLast7Days: 52, leadsLast7Days: 4 },
{ id: "mkt-434", make: "Subaru", model: "WRX", year: 2023, trim: "Base", price: 36237, mileage: 15664, dealRating: "Good Deal", vehicleType: "Sedans", daysOnLot: 7, vdpViewsLast7Days: 64, leadsLast7Days: 3 },

        // More Volkswagen vehicles
{ id: "mkt-435", make: "Volkswagen", model: "Taos", year: 2023, trim: "S", price: 28304, mileage: 16515, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 8, vdpViewsLast7Days: 48, leadsLast7Days: 1 },
{ id: "mkt-436", make: "Volkswagen", model: "Taos", year: 2022, trim: "SE", price: 29965, mileage: 23617, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 20, vdpViewsLast7Days: 37, leadsLast7Days: 1 },
{ id: "mkt-437", make: "Volkswagen", model: "Passat", year: 2022, trim: "S", price: 25387, mileage: 22739, dealRating: "Good Deal", vehicleType: "Sedans", daysOnLot: 19, vdpViewsLast7Days: 43, leadsLast7Days: 5 },
{ id: "mkt-438", make: "Volkswagen", model: "ID.4", year: 2023, trim: "Standard", price: 42884, mileage: 17397, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 9, vdpViewsLast7Days: 52, leadsLast7Days: 3 },

        // More BMW vehicles
{ id: "mkt-439", make: "BMW", model: "5 Series", year: 2023, trim: "530i", price: 56402, mileage: 7948, dealRating: "Good Deal", vehicleType: "Luxury", daysOnLot: 14, vdpViewsLast7Days: 63, leadsLast7Days: 1 },
{ id: "mkt-440", make: "BMW", model: "5 Series", year: 2022, trim: "530i", price: 54169, mileage: 19477, dealRating: "Fair Deal", vehicleType: "Luxury", daysOnLot: 20, vdpViewsLast7Days: 44, leadsLast7Days: 1 },
{ id: "mkt-441", make: "BMW", model: "X1", year: 2023, trim: "xDrive28i", price: 42515, mileage: 13136, dealRating: "Good Deal", vehicleType: "Luxury", daysOnLot: 12, vdpViewsLast7Days: 52, leadsLast7Days: 1 },
{ id: "mkt-442", make: "BMW", model: "X7", year: 2023, trim: "xDrive40i", price: 79345, mileage: 15538, dealRating: "Fair Deal", vehicleType: "Luxury", daysOnLot: 25, vdpViewsLast7Days: 44, leadsLast7Days: 2 },
{ id: "mkt-443", make: "BMW", model: "4 Series", year: 2023, trim: "430i", price: 46443, mileage: 10855, dealRating: "Good Deal", vehicleType: "Luxury", daysOnLot: 15, vdpViewsLast7Days: 46, leadsLast7Days: 2 },

        // More Mercedes-Benz vehicles
{ id: "mkt-444", make: "Mercedes-Benz", model: "E-Class", year: 2023, trim: "E300", price: 60647, mileage: 11056, dealRating: "Good Deal", vehicleType: "Luxury", daysOnLot: 21, vdpViewsLast7Days: 57, leadsLast7Days: 2 },
{ id: "mkt-445", make: "Mercedes-Benz", model: "E-Class", year: 2022, trim: "E350", price: 59000, mileage: 19705, dealRating: "Fair Deal", vehicleType: "Luxury", daysOnLot: 27, vdpViewsLast7Days: 50, leadsLast7Days: 2 },
{ id: "mkt-446", make: "Mercedes-Benz", model: "GLB", year: 2023, trim: "250", price: 47557, mileage: 11533, dealRating: "Good Deal", vehicleType: "Luxury", daysOnLot: 18, vdpViewsLast7Days: 45, leadsLast7Days: 4 },
{ id: "mkt-447", make: "Mercedes-Benz", model: "GLS", year: 2023, trim: "450", price: 85327, mileage: 11641, dealRating: "Fair Deal", vehicleType: "Luxury", daysOnLot: 24, vdpViewsLast7Days: 48, leadsLast7Days: 1 },
{ id: "mkt-448", make: "Mercedes-Benz", model: "A-Class", year: 2022, trim: "A220", price: 38246, mileage: 22769, dealRating: "Good Deal", vehicleType: "Luxury", daysOnLot: 27, vdpViewsLast7Days: 47, leadsLast7Days: 1 },

        // More Audi vehicles
{ id: "mkt-449", make: "Audi", model: "A6", year: 2023, trim: "Premium", price: 58752, mileage: 8765, dealRating: "Good Deal", vehicleType: "Luxury", daysOnLot: 13, vdpViewsLast7Days: 58, leadsLast7Days: 4 },
{ id: "mkt-450", make: "Audi", model: "A6", year: 2022, trim: "Premium Plus", price: 61227, mileage: 19629, dealRating: "Fair Deal", vehicleType: "Luxury", daysOnLot: 23, vdpViewsLast7Days: 49, leadsLast7Days: 5 },
{ id: "mkt-451", make: "Audi", model: "Q3", year: 2023, trim: "Premium", price: 42471, mileage: 17336, dealRating: "Good Deal", vehicleType: "Luxury", daysOnLot: 7, vdpViewsLast7Days: 53, leadsLast7Days: 5 },
{ id: "mkt-452", make: "Audi", model: "Q8", year: 2023, trim: "Premium", price: 70549, mileage: 13277, dealRating: "Fair Deal", vehicleType: "Luxury", daysOnLot: 19, vdpViewsLast7Days: 46, leadsLast7Days: 0 },
{ id: "mkt-453", make: "Audi", model: "A3", year: 2023, trim: "Premium", price: 37736, mileage: 18919, dealRating: "Good Deal", vehicleType: "Luxury", daysOnLot: 11, vdpViewsLast7Days: 46, leadsLast7Days: 2 },

        // More Lexus vehicles
{ id: "mkt-454", make: "Lexus", model: "NX", year: 2023, trim: "250", price: 43899, mileage: 14582, dealRating: "Good Deal", vehicleType: "Luxury", daysOnLot: 14, vdpViewsLast7Days: 49, leadsLast7Days: 1 },
{ id: "mkt-455", make: "Lexus", model: "NX", year: 2022, trim: "350", price: 49968, mileage: 21526, dealRating: "Fair Deal", vehicleType: "Luxury", daysOnLot: 21, vdpViewsLast7Days: 48, leadsLast7Days: 7 },
{ id: "mkt-456", make: "Lexus", model: "IS", year: 2023, trim: "300", price: 44111, mileage: 12048, dealRating: "Good Deal", vehicleType: "Luxury", daysOnLot: 15, vdpViewsLast7Days: 57, leadsLast7Days: 3 },
{ id: "mkt-457", make: "Lexus", model: "GX", year: 2023, trim: "460", price: 60205, mileage: 10172, dealRating: "Good Deal", vehicleType: "Luxury", daysOnLot: 5, vdpViewsLast7Days: 59, leadsLast7Days: 4 },
{ id: "mkt-458", make: "Lexus", model: "UX", year: 2023, trim: "200", price: 35288, mileage: 16214, dealRating: "Good Deal", vehicleType: "Luxury", daysOnLot: 13, vdpViewsLast7Days: 52, leadsLast7Days: 1 },

        // Additional variety for market depth
{ id: "mkt-459", make: "Toyota", model: "Prius", year: 2023, trim: "LE", price: 28930, mileage: 11788, dealRating: "Good Deal", vehicleType: "Compact", daysOnLot: 16, vdpViewsLast7Days: 53, leadsLast7Days: 1 },
{ id: "mkt-460", make: "Honda", model: "HR-V", year: 2023, trim: "LX", price: 25556, mileage: 13243, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 17, vdpViewsLast7Days: 37, leadsLast7Days: 1 },
{ id: "mkt-461", make: "Ford", model: "Mustang", year: 2023, trim: "EcoBoost", price: 39738, mileage: 12718, dealRating: "Good Deal", vehicleType: "Sedans", daysOnLot: 15, vdpViewsLast7Days: 52, leadsLast7Days: 2 },
{ id: "mkt-462", make: "Chevrolet", model: "Trax", year: 2023, trim: "LS", price: 24203, mileage: 19981, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 12, vdpViewsLast7Days: 36, leadsLast7Days: 3 },
{ id: "mkt-463", make: "Nissan", model: "Armada", year: 2023, trim: "SV", price: 55428, mileage: 14469, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 10, vdpViewsLast7Days: 56, leadsLast7Days: 5 },
{ id: "mkt-464", make: "Jeep", model: "Grand Wagoneer", year: 2023, trim: "Series I", price: 88029, mileage: 10358, dealRating: "Fair Deal", vehicleType: "SUV/CO", daysOnLot: 23, vdpViewsLast7Days: 36, leadsLast7Days: 1 },
{ id: "mkt-465", make: "RAM", model: "ProMaster", year: 2023, trim: "1500", price: 37453, mileage: 14952, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 20, vdpViewsLast7Days: 26, leadsLast7Days: 0 },
{ id: "mkt-466", make: "Hyundai", model: "Ioniq 5", year: 2023, trim: "SE", price: 44678, mileage: 12374, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 7, vdpViewsLast7Days: 68, leadsLast7Days: 2 },
{ id: "mkt-467", make: "Kia", model: "EV6", year: 2023, trim: "Light", price: 47096, mileage: 16688, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 10, vdpViewsLast7Days: 69, leadsLast7Days: 6 },
{ id: "mkt-468", make: "Mazda", model: "MX-5 Miata", year: 2023, trim: "Sport", price: 32379, mileage: 9699, dealRating: "Good Deal", vehicleType: "Sedans", daysOnLot: 15, vdpViewsLast7Days: 49, leadsLast7Days: 5 },
{ id: "mkt-469", make: "Subaru", model: "BRZ", year: 2023, trim: "Premium", price: 32152, mileage: 9652, dealRating: "Good Deal", vehicleType: "Sedans", daysOnLot: 19, vdpViewsLast7Days: 40, leadsLast7Days: 1 },
{ id: "mkt-470", make: "Volkswagen", model: "Arteon", year: 2022, trim: "SE", price: 42529, mileage: 17537, dealRating: "Fair Deal", vehicleType: "Sedans", daysOnLot: 23, vdpViewsLast7Days: 45, leadsLast7Days: 2 },
{ id: "mkt-471", make: "BMW", model: "Z4", year: 2023, trim: "sDrive30i", price: 53022, mileage: 9649, dealRating: "Fair Deal", vehicleType: "Luxury", daysOnLot: 19, vdpViewsLast7Days: 36, leadsLast7Days: 2 },
{ id: "mkt-472", make: "Mercedes-Benz", model: "CLA", year: 2023, trim: "250", price: 47587, mileage: 15395, dealRating: "Good Deal", vehicleType: "Luxury", daysOnLot: 13, vdpViewsLast7Days: 39, leadsLast7Days: 1 },
{ id: "mkt-473", make: "Audi", model: "TT", year: 2022, trim: "Coupe", price: 49535, mileage: 19675, dealRating: "Fair Deal", vehicleType: "Luxury", daysOnLot: 21, vdpViewsLast7Days: 27, leadsLast7Days: 2 },
{ id: "mkt-474", make: "Lexus", model: "LC", year: 2023, trim: "500", price: 101142, mileage: 7153, dealRating: "Fair Deal", vehicleType: "Luxury", daysOnLot: 24, vdpViewsLast7Days: 44, leadsLast7Days: 1 },
{ id: "mkt-475", make: "Toyota", model: "GR86", year: 2023, trim: "Base", price: 32484, mileage: 14180, dealRating: "Good Deal", vehicleType: "Sedans", daysOnLot: 17, vdpViewsLast7Days: 49, leadsLast7Days: 7 },
{ id: "mkt-476", make: "Honda", model: "Odyssey", year: 2023, trim: "EX", price: 43111, mileage: 9923, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 17, vdpViewsLast7Days: 48, leadsLast7Days: 2 },
{ id: "mkt-477", make: "Ford", model: "Expedition", year: 2023, trim: "XLT", price: 57988, mileage: 8681, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 8, vdpViewsLast7Days: 54, leadsLast7Days: 5 },
{ id: "mkt-478", make: "Chevrolet", model: "Corvette", year: 2023, trim: "Stingray", price: 73707, mileage: 12932, dealRating: "Fair Deal", vehicleType: "Sedans", daysOnLot: 17, vdpViewsLast7Days: 51, leadsLast7Days: 1 },
{ id: "mkt-479", make: "Nissan", model: "Ariya", year: 2023, trim: "Engage", price: 48703, mileage: 13647, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 7, vdpViewsLast7Days: 62, leadsLast7Days: 1 },
{ id: "mkt-480", make: "Jeep", model: "Grand Cherokee L", year: 2023, trim: "Limited", price: 52844, mileage: 9547, dealRating: "Good Deal", vehicleType: "SUV/CO", daysOnLot: 13, vdpViewsLast7Days: 47, leadsLast7Days: 3 }
    ]
};

// Helper functions for data analysis
const MARKET_SEARCH_UTILS = {
    /**
     * Get unique values for a specific field
     */
    getUniqueValues(field) {
        return [...new Set(MARKET_SEARCH_INVENTORY.vehicles.map(v => v[field]))].sort();
    },

    /**
     * Get price buckets for grouping
     */
    getPriceBucket(price) {
        if (price < 20000) return "Under $20k";
        if (price < 30000) return "$20k-$30k";
        if (price < 40000) return "$30k-$40k";
        if (price < 50000) return "$40k-$50k";
        return "$50k+";
    },

    /**
     * Get mileage buckets for grouping
     */
    getMileageBucket(mileage) {
        if (mileage < 10000) return "Under 10k mi";
        if (mileage < 20000) return "10k-20k mi";
        if (mileage < 30000) return "20k-30k mi";
        if (mileage < 40000) return "30k-40k mi";
        return "40k+ mi";
    },

    /**
     * Group vehicles by specified dimensions
     * @param {Array} dimensions - Array of field names to group by ['make', 'year', 'model']
     * @param {Array} vehicles - Array of vehicles to group (optional, uses all if not provided)
     * @returns {Array} Array of grouped objects with aggregated metrics
     */
    groupVehicles(dimensions, vehicles = null) {
        const data = vehicles || MARKET_SEARCH_INVENTORY.vehicles;
        const groups = {};

        data.forEach(vehicle => {
            // Build the group key based on dimensions
            const keyParts = dimensions.map(dim => {
                if (dim === 'price') return this.getPriceBucket(vehicle.price);
                if (dim === 'mileage') return this.getMileageBucket(vehicle.mileage);
                return vehicle[dim];
            });
            const key = keyParts.join(' | ');

            if (!groups[key]) {
                groups[key] = {
                    groupKey: key,
                    groupValues: {},
                    count: 0,
                    totalDaysOnLot: 0,
                    totalVdpViews: 0,
                    totalLeads: 0,
                    avgPrice: 0,
                    avgMileage: 0,
                    vehicles: []
                };

                // Store individual dimension values
                dimensions.forEach((dim, index) => {
                    groups[key].groupValues[dim] = keyParts[index];
                });
            }

            groups[key].count++;
            groups[key].totalDaysOnLot += vehicle.daysOnLot;
            groups[key].totalVdpViews += vehicle.vdpViewsLast7Days;
            groups[key].totalLeads += vehicle.leadsLast7Days;
            groups[key].avgPrice += vehicle.price;
            groups[key].avgMileage += vehicle.mileage;
            groups[key].vehicles.push(vehicle);
        });

        // Calculate averages and return as array
        return Object.values(groups).map(group => ({
            ...group,
            avgDaysOnLot: Math.round(group.totalDaysOnLot / group.count),
            avgPrice: Math.round(group.avgPrice / group.count),
            avgMileage: Math.round(group.avgMileage / group.count)
        })).sort((a, b) => b.totalLeads - a.totalLeads);
    }
};
