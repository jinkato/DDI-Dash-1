/**
 * Conversion Page JavaScript
 * Handles the conversion funnel chart and vehicle table
 *
 * ISOLATION NOTES:
 * - All code is wrapped in IIFE to prevent conflicts with other pages
 * - No global variables are exposed except what's needed for URL parameter reading
 * - All functions and data are scoped within this module
 * - filter-url-utils.js is loaded separately and can be accessed if needed
 * - This ensures no bugs are introduced to other pages
 */

(function() {
    'use strict';

    // Inventory data embedded directly to avoid CORS issues
    const INVENTORY_VEHICLES = [
        {
            "id": "VIN001",
            "name": "2023 Toyota Camry SE",
            "year": 2023,
            "make": "Toyota",
            "model": "Camry",
            "trim": "SE",
            "image": "img/car thumbnail/used-1.png",
            "price": 28495,
            "mileage": 15420,
            "vehicleType": "Sedans",
            "dealRating": "Great Deal",
            "daysOnLot": 12,
            "searchViews": 245,
            "detailViews": 89,
            "leads": 8
        },
        {
            "id": "VIN002",
            "name": "2022 Honda Accord EX",
            "year": 2022,
            "make": "Honda",
            "model": "Accord",
            "trim": "EX",
            "image": "img/car thumbnail/used-2.png",
            "price": 29850,
            "mileage": 22100,
            "vehicleType": "Sedans",
            "dealRating": "Good Deal",
            "daysOnLot": 18,
            "searchViews": 198,
            "detailViews": 72,
            "leads": 6
        },
        {
            "id": "VIN003",
            "name": "2023 Tesla Model 3",
            "year": 2023,
            "make": "Tesla",
            "model": "Model 3",
            "trim": "Standard Range",
            "image": "img/car thumbnail/used-3.png",
            "price": 42990,
            "mileage": 8500,
            "vehicleType": "Luxury",
            "dealRating": "Fair Deal",
            "daysOnLot": 5,
            "searchViews": 412,
            "detailViews": 156,
            "leads": 12
        },
        {
            "id": "VIN004",
            "name": "2021 Ford F-150 XLT",
            "year": 2021,
            "make": "Ford",
            "model": "F-150",
            "trim": "XLT",
            "image": "img/car thumbnail/used-4.png",
            "price": 38750,
            "mileage": 35200,
            "vehicleType": "Truck",
            "dealRating": "Great Deal",
            "daysOnLot": 25,
            "searchViews": 321,
            "detailViews": 134,
            "leads": 9
        },
        {
            "id": "VIN005",
            "name": "2023 Mazda CX-5 Grand Touring",
            "year": 2023,
            "make": "Mazda",
            "model": "CX-5",
            "trim": "Grand Touring",
            "image": "img/car thumbnail/used-5.png",
            "price": 33200,
            "mileage": 12800,
            "vehicleType": "SUV/CO",
            "dealRating": "Good Deal",
            "daysOnLot": 8,
            "searchViews": 267,
            "detailViews": 98,
            "leads": 7
        },
        {
            "id": "VIN006",
            "name": "2022 Chevrolet Silverado 1500",
            "year": 2022,
            "make": "Chevrolet",
            "model": "Silverado 1500",
            "trim": "LT",
            "image": "img/car thumbnail/used-6.png",
            "price": 41500,
            "mileage": 28900,
            "vehicleType": "Truck",
            "dealRating": "Fair Deal",
            "daysOnLot": 42,
            "searchViews": 189,
            "detailViews": 67,
            "leads": 3
        },
        {
            "id": "VIN007",
            "name": "2023 Subaru Outback Premium",
            "year": 2023,
            "make": "Subaru",
            "model": "Outback",
            "trim": "Premium",
            "image": "img/car thumbnail/used-7.png",
            "price": 32495,
            "mileage": 9200,
            "vehicleType": "SUV/CO",
            "dealRating": "Great Deal",
            "daysOnLot": 15,
            "searchViews": 234,
            "detailViews": 87,
            "leads": 10
        },
        {
            "id": "VIN008",
            "name": "2020 BMW 3 Series 330i",
            "year": 2020,
            "make": "BMW",
            "model": "3 Series",
            "trim": "330i",
            "image": "img/car thumbnail/used-8.png",
            "price": 35900,
            "mileage": 42000,
            "vehicleType": "Luxury",
            "dealRating": "High Priced",
            "daysOnLot": 67,
            "searchViews": 156,
            "detailViews": 45,
            "leads": 2
        },
        {
            "id": "VIN009",
            "name": "2022 Hyundai Tucson SEL",
            "year": 2022,
            "make": "Hyundai",
            "model": "Tucson",
            "trim": "SEL",
            "image": "img/car thumbnail/used-9.png",
            "price": 27850,
            "mileage": 18500,
            "vehicleType": "SUV/CO",
            "dealRating": "Good Deal",
            "daysOnLot": 21,
            "searchViews": 203,
            "detailViews": 76,
            "leads": 5
        },
        {
            "id": "VIN010",
            "name": "2023 Nissan Altima SV",
            "year": 2023,
            "make": "Nissan",
            "model": "Altima",
            "trim": "SV",
            "image": "img/car thumbnail/used-10.png",
            "price": 26995,
            "mileage": 11200,
            "vehicleType": "Sedans",
            "dealRating": "Great Deal",
            "daysOnLot": 9,
            "searchViews": 178,
            "detailViews": 68,
            "leads": 6
        },
        {
            "id": "VIN011",
            "name": "2021 Jeep Grand Cherokee Limited",
            "year": 2021,
            "make": "Jeep",
            "model": "Grand Cherokee",
            "trim": "Limited",
            "image": "img/car thumbnail/used-11.png",
            "price": 39200,
            "mileage": 31400,
            "vehicleType": "SUV/CO",
            "dealRating": "Fair Deal",
            "daysOnLot": 38,
            "searchViews": 289,
            "detailViews": 102,
            "leads": 4
        },
        {
            "id": "VIN012",
            "name": "2023 Honda Civic LX",
            "year": 2023,
            "make": "Honda",
            "model": "Civic",
            "trim": "LX",
            "image": "img/car thumbnail/used-12.png",
            "price": 24750,
            "mileage": 7800,
            "vehicleType": "Compact",
            "dealRating": "Great Deal",
            "daysOnLot": 6,
            "searchViews": 312,
            "detailViews": 118,
            "leads": 11
        },
        {
            "id": "VIN013",
            "name": "2022 Toyota RAV4 XLE",
            "year": 2022,
            "make": "Toyota",
            "model": "RAV4",
            "trim": "XLE",
            "image": "img/car thumbnail/used-13.png",
            "price": 31900,
            "mileage": 19600,
            "vehicleType": "SUV/CO",
            "dealRating": "Good Deal",
            "daysOnLot": 14,
            "searchViews": 345,
            "detailViews": 129,
            "leads": 9
        },
        {
            "id": "VIN014",
            "name": "2020 Mercedes-Benz C-Class C300",
            "year": 2020,
            "make": "Mercedes-Benz",
            "model": "C-Class",
            "trim": "C300",
            "image": "img/car thumbnail/used-14.png",
            "price": 38500,
            "mileage": 38700,
            "vehicleType": "Luxury",
            "dealRating": "Over Priced",
            "daysOnLot": 89,
            "searchViews": 134,
            "detailViews": 38,
            "leads": 1
        },
        {
            "id": "VIN015",
            "name": "2023 Volkswagen Jetta S",
            "year": 2023,
            "make": "Volkswagen",
            "model": "Jetta",
            "trim": "S",
            "image": "img/car thumbnail/used-15.png",
            "price": 22995,
            "mileage": 9100,
            "vehicleType": "Compact",
            "dealRating": "Good Deal",
            "daysOnLot": 11,
            "searchViews": 167,
            "detailViews": 61,
            "leads": 5
        },
        {
            "id": "VIN016",
            "name": "2021 Ram 1500 Big Horn",
            "year": 2021,
            "make": "Ram",
            "model": "1500",
            "trim": "Big Horn",
            "image": "img/car thumbnail/used-16.png",
            "price": 42800,
            "mileage": 26500,
            "vehicleType": "Truck",
            "dealRating": "Fair Deal",
            "daysOnLot": 33,
            "searchViews": 278,
            "detailViews": 95,
            "leads": 6
        },
        {
            "id": "VIN017",
            "name": "2023 Kia Sportage LX",
            "year": 2023,
            "make": "Kia",
            "model": "Sportage",
            "trim": "LX",
            "image": "img/car thumbnail/used-17.png",
            "price": 28200,
            "mileage": 6400,
            "vehicleType": "SUV/CO",
            "dealRating": "Great Deal",
            "daysOnLot": 7,
            "searchViews": 221,
            "detailViews": 84,
            "leads": 8
        },
        {
            "id": "VIN018",
            "name": "2022 Ford Mustang EcoBoost",
            "year": 2022,
            "make": "Ford",
            "model": "Mustang",
            "trim": "EcoBoost",
            "image": "img/car thumbnail/used-18.png",
            "price": 33750,
            "mileage": 14200,
            "vehicleType": "Sedans",
            "dealRating": "Good Deal",
            "daysOnLot": 28,
            "searchViews": 298,
            "detailViews": 112,
            "leads": 7
        },
        {
            "id": "VIN019",
            "name": "2023 Chevrolet Equinox LT",
            "year": 2023,
            "make": "Chevrolet",
            "model": "Equinox",
            "trim": "LT",
            "image": "img/car thumbnail/used-19.png",
            "price": 29500,
            "mileage": 10800,
            "vehicleType": "SUV/CO",
            "dealRating": "Fair Deal",
            "daysOnLot": 19,
            "searchViews": 187,
            "detailViews": 69,
            "leads": 4
        },
        {
            "id": "VIN020",
            "name": "2021 Audi A4 Premium",
            "year": 2021,
            "make": "Audi",
            "model": "A4",
            "trim": "Premium",
            "image": "img/car thumbnail/used-20.png",
            "price": 36900,
            "mileage": 29800,
            "vehicleType": "Luxury",
            "dealRating": "High Priced",
            "daysOnLot": 54,
            "searchViews": 145,
            "detailViews": 52,
            "leads": 2
        }
    ];

    let CONVERSION_DATA = {
        funnel: {
            searchViews: 0,
            detailViews: 0,
            leads: 0
        },
        marketAverage: {
            searchViews: 18200,
            detailViews: 5100,
            leads: 310
        },
        vehicles: []
    };

    let conversionChart = null;
    let marketAverageChart = null;

    /**
     * Load inventory data from embedded data
     */
    function loadInventoryData() {
        CONVERSION_DATA.vehicles = INVENTORY_VEHICLES;

        // Calculate funnel totals from vehicle data
        CONVERSION_DATA.funnel.searchViews = INVENTORY_VEHICLES.reduce((sum, v) => sum + v.searchViews, 0);
        CONVERSION_DATA.funnel.detailViews = INVENTORY_VEHICLES.reduce((sum, v) => sum + v.detailViews, 0);
        CONVERSION_DATA.funnel.leads = INVENTORY_VEHICLES.reduce((sum, v) => sum + v.leads, 0);

        console.log('Loaded inventory data:', CONVERSION_DATA.vehicles.length, 'vehicles');
    }

    /**
     * Initialize the conversion page
     */
    function initializeConversionPage() {
        console.log('Initializing conversion page...');

        // Load data first
        loadInventoryData();

        // Now render everything with the loaded data
        renderConversionChart();
        renderConversionTable();

        // Update the inventory title with initial count
        updateInventoryTitle(CONVERSION_DATA.vehicles.length);

        // Initialize all filters
        initializeVehicleTypeFilter();
        initializeDealRatingFilter();
        initializeBrandFilter();
        initializeConversionRateFilter();
        initializeDaysOnLotFilter();
        initializeTotalLeadsFilter();
        initializeMileageFilter();

        initializeMarketAverageToggle();
    }

/**
 * Initialize the market average toggle
 */
function initializeMarketAverageToggle() {
    const checkbox = document.getElementById('show-market-average');
    const wrapper = document.getElementById('market-average-chart-wrapper');

    if (!checkbox || !wrapper) return;

    checkbox.addEventListener('change', function() {
        if (this.checked) {
            wrapper.style.display = 'block';
            if (!marketAverageChart) {
                renderMarketAverageChart();
            }
        } else {
            wrapper.style.display = 'none';
        }
    });
}

/**
 * Initialize the conversion rate filter
 */
function initializeConversionRateFilter() {
    const minInput = document.getElementById('conversion-min-input');
    const maxInput = document.getElementById('conversion-max-input');
    const resetLink = document.getElementById('reset-conversion-rate');

    if (!minInput || !maxInput || !resetLink) return;

    // Update filter when min input changes
    minInput.addEventListener('change', function() {
        let minVal = parseInt(this.value) || 0;
        let maxVal = parseInt(maxInput.value) || 100;

        // Ensure min doesn't exceed max
        if (minVal > maxVal) {
            minVal = maxVal;
            this.value = minVal;
        }

        // Ensure within bounds
        if (minVal < 0) {
            minVal = 0;
            this.value = 0;
        }

        filterTableByConversionRate(minVal, maxVal);
    });

    // Update filter when max input changes
    maxInput.addEventListener('change', function() {
        let minVal = parseInt(minInput.value) || 0;
        let maxVal = parseInt(this.value) || 100;

        // Ensure max doesn't go below min
        if (maxVal < minVal) {
            maxVal = minVal;
            this.value = maxVal;
        }

        // Ensure within bounds
        if (maxVal > 100) {
            maxVal = 100;
            this.value = 100;
        }

        filterTableByConversionRate(minVal, maxVal);
    });

    // Reset to default values
    resetLink.addEventListener('click', function(e) {
        e.preventDefault();
        minInput.value = 0;
        maxInput.value = 100;
        filterTableByConversionRate(0, 100);
    });
}

/**
 * Initialize accordion for Days on lot filter
 */
function initializeDaysOnLotAccordion() {
    const accordionHeader = document.getElementById('days-on-lot-accordion');
    const accordionContent = document.getElementById('days-on-lot-content');
    const accordionIcon = accordionHeader?.querySelector('.accordion-icon');

    if (!accordionHeader || !accordionContent || !accordionIcon) return;

    accordionHeader.addEventListener('click', function() {
        const isExpanded = accordionContent.classList.contains('expanded');

        if (isExpanded) {
            accordionContent.classList.remove('expanded');
            accordionIcon.classList.remove('expanded');
        } else {
            accordionContent.classList.add('expanded');
            accordionIcon.classList.add('expanded');
        }
    });
}

/**
 * Initialize the days on lot filter
 */
function initializeDaysOnLotFilter() {
    const minInput = document.getElementById('days-min-input');
    const maxInput = document.getElementById('days-max-input');
    const resetLink = document.getElementById('reset-days-on-lot');

    if (!minInput || !maxInput || !resetLink) return;

    // Initialize accordion
    initializeDaysOnLotAccordion();

    // Update filter when min input changes
    minInput.addEventListener('change', function() {
        let minVal = parseInt(this.value) || 0;
        let maxVal = parseInt(maxInput.value) || 365;

        if (minVal > maxVal) {
            minVal = maxVal;
            this.value = minVal;
        }

        if (minVal < 0) {
            minVal = 0;
            this.value = 0;
        }

        filterTable();
    });

    // Update filter when max input changes
    maxInput.addEventListener('change', function() {
        let minVal = parseInt(minInput.value) || 0;
        let maxVal = parseInt(this.value) || 365;

        if (maxVal < minVal) {
            maxVal = minVal;
            this.value = maxVal;
        }

        filterTable();
    });

    // Reset to default values
    resetLink.addEventListener('click', function(e) {
        e.preventDefault();
        minInput.value = 0;
        maxInput.value = 365;
        filterTable();
    });
}

/**
 * Initialize accordion for Total leads filter
 */
function initializeTotalLeadsAccordion() {
    const accordionHeader = document.getElementById('total-leads-accordion');
    const accordionContent = document.getElementById('total-leads-content');
    const accordionIcon = accordionHeader?.querySelector('.accordion-icon');

    if (!accordionHeader || !accordionContent || !accordionIcon) return;

    accordionHeader.addEventListener('click', function() {
        const isExpanded = accordionContent.classList.contains('expanded');

        if (isExpanded) {
            accordionContent.classList.remove('expanded');
            accordionIcon.classList.remove('expanded');
        } else {
            accordionContent.classList.add('expanded');
            accordionIcon.classList.add('expanded');
        }
    });
}

/**
 * Initialize the total leads filter
 */
function initializeTotalLeadsFilter() {
    const minInput = document.getElementById('leads-min-input');
    const maxInput = document.getElementById('leads-max-input');
    const resetLink = document.getElementById('reset-total-leads');

    if (!minInput || !maxInput || !resetLink) return;

    // Initialize accordion
    initializeTotalLeadsAccordion();

    // Update filter when min input changes
    minInput.addEventListener('change', function() {
        let minVal = parseInt(this.value) || 0;
        let maxVal = parseInt(maxInput.value) || 100;

        if (minVal > maxVal) {
            minVal = maxVal;
            this.value = minVal;
        }

        if (minVal < 0) {
            minVal = 0;
            this.value = 0;
        }

        filterTable();
    });

    // Update filter when max input changes
    maxInput.addEventListener('change', function() {
        let minVal = parseInt(minInput.value) || 0;
        let maxVal = parseInt(this.value) || 100;

        if (maxVal < minVal) {
            maxVal = minVal;
            this.value = maxVal;
        }

        filterTable();
    });

    // Reset to default values
    resetLink.addEventListener('click', function(e) {
        e.preventDefault();
        minInput.value = 0;
        maxInput.value = 100;
        filterTable();
    });
}

/**
 * Initialize accordion for Mileage filter
 */
function initializeMileageAccordion() {
    const accordionHeader = document.getElementById('mileage-accordion');
    const accordionContent = document.getElementById('mileage-content');
    const accordionIcon = accordionHeader?.querySelector('.accordion-icon');

    if (!accordionHeader || !accordionContent || !accordionIcon) return;

    accordionHeader.addEventListener('click', function() {
        const isExpanded = accordionContent.classList.contains('expanded');

        if (isExpanded) {
            accordionContent.classList.remove('expanded');
            accordionIcon.classList.remove('expanded');
        } else {
            accordionContent.classList.add('expanded');
            accordionIcon.classList.add('expanded');
        }
    });
}

/**
 * Initialize the mileage filter
 */
function initializeMileageFilter() {
    const minInput = document.getElementById('mileage-min-input');
    const maxInput = document.getElementById('mileage-max-input');
    const resetLink = document.getElementById('reset-mileage');

    if (!minInput || !maxInput || !resetLink) return;

    // Initialize accordion
    initializeMileageAccordion();

    // Update filter when min input changes
    minInput.addEventListener('change', function() {
        let minVal = parseInt(this.value) || 0;
        let maxVal = parseInt(maxInput.value) || 200000;

        if (minVal > maxVal) {
            minVal = maxVal;
            this.value = minVal;
        }

        if (minVal < 0) {
            minVal = 0;
            this.value = 0;
        }

        filterTable();
    });

    // Update filter when max input changes
    maxInput.addEventListener('change', function() {
        let minVal = parseInt(minInput.value) || 0;
        let maxVal = parseInt(this.value) || 200000;

        if (maxVal < minVal) {
            maxVal = minVal;
            this.value = maxVal;
        }

        filterTable();
    });

    // Reset to default values
    resetLink.addEventListener('click', function(e) {
        e.preventDefault();
        minInput.value = 0;
        maxInput.value = 200000;
        filterTable();
    });
}

/**
 * Initialize the vehicle type filter
 */
function initializeVehicleTypeFilter() {
    const checkboxes = document.querySelectorAll('.vehicle-type-checkbox');

    if (!checkboxes.length) return;

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            filterTable();
        });
    });
}

/**
 * Initialize the deal rating filter
 */
function initializeDealRatingFilter() {
    const checkboxes = document.querySelectorAll('.deal-rating-checkbox');

    if (!checkboxes.length) return;

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            filterTable();
        });
    });
}

/**
 * Initialize the brand filter
 */
function initializeBrandFilter() {
    const brandSelect = document.getElementById('brand');

    if (!brandSelect) return;

    brandSelect.addEventListener('change', function() {
        filterTable();
    });
}

/**
 * Get filtered vehicles based on all active filters
 * Returns array of vehicles that pass all filter criteria
 */
function getFilteredVehicles() {
    // Get vehicle type filter values (checked checkboxes)
    const vehicleTypeCheckboxes = document.querySelectorAll('.vehicle-type-checkbox:checked');
    const selectedVehicleTypes = Array.from(vehicleTypeCheckboxes).map(cb => cb.value);

    // Get deal rating filter values (checked checkboxes)
    const dealRatingCheckboxes = document.querySelectorAll('.deal-rating-checkbox:checked');
    const selectedDealRatings = Array.from(dealRatingCheckboxes).map(cb => cb.value);

    // Get brand filter value
    const brandSelect = document.getElementById('brand');
    const selectedBrand = brandSelect ? brandSelect.value : 'All';

    // Get conversion rate filter values
    const conversionMin = parseInt(document.getElementById('conversion-min-input').value) || 0;
    const conversionMax = parseInt(document.getElementById('conversion-max-input').value) || 100;

    // Get days on lot filter values
    const daysMin = parseInt(document.getElementById('days-min-input').value) || 0;
    const daysMax = parseInt(document.getElementById('days-max-input').value) || 365;

    // Get total leads filter values
    const leadsMin = parseInt(document.getElementById('leads-min-input').value) || 0;
    const leadsMax = parseInt(document.getElementById('leads-max-input').value) || 100;

    // Get mileage filter values
    const mileageMin = parseInt(document.getElementById('mileage-min-input').value) || 0;
    const mileageMax = parseInt(document.getElementById('mileage-max-input').value) || 200000;

    // Filter vehicles based on all criteria
    return CONVERSION_DATA.vehicles.filter(vehicle => {
        // Calculate conversion rate
        const conversionRate = (vehicle.leads / vehicle.searchViews) * 100;

        // Check vehicle type filter
        const passesVehicleTypeFilter = selectedVehicleTypes.length === 0 ||
                                       selectedVehicleTypes.includes(vehicle.vehicleType);

        // Check deal rating filter
        const passesDealRatingFilter = selectedDealRatings.length === 0 ||
                                       selectedDealRatings.includes(vehicle.dealRating);

        // Check brand filter
        const passesBrandFilter = selectedBrand === 'All' || vehicle.make === selectedBrand;

        // Check numeric range filters
        const passesConversionFilter = conversionRate >= conversionMin && conversionRate <= conversionMax;
        const passesDaysFilter = vehicle.daysOnLot >= daysMin && vehicle.daysOnLot <= daysMax;
        const passesLeadsFilter = vehicle.leads >= leadsMin && vehicle.leads <= leadsMax;
        const passesMileageFilter = vehicle.mileage >= mileageMin && vehicle.mileage <= mileageMax;

        // Return true only if vehicle passes ALL filters
        return passesVehicleTypeFilter &&
               passesDealRatingFilter &&
               passesBrandFilter &&
               passesConversionFilter &&
               passesDaysFilter &&
               passesLeadsFilter &&
               passesMileageFilter;
    });
}

/**
 * Update the "My selected inventory" subtitle with vehicle count
 */
function updateInventoryTitle(vehicleCount) {
    const subtitle = document.getElementById('my-inventory-subtitle');
    if (subtitle) {
        subtitle.textContent = `Total: ${vehicleCount} ${vehicleCount === 1 ? 'vehicle' : 'vehicles'}`;
    }
}

/**
 * Filter the table based on all active filters
 */
function filterTable() {
    const tableBody = document.getElementById('conversion-table-body');
    const rows = tableBody.querySelectorAll('tr');

    // Get filtered vehicles
    const filteredVehicles = getFilteredVehicles();
    const filteredVehicleIds = new Set(filteredVehicles.map(v => v.id));

    // Skip the first row (Total row)
    for (let i = 1; i < rows.length; i++) {
        const vehicleIndex = i - 1; // Adjust for total row
        const vehicle = CONVERSION_DATA.vehicles[vehicleIndex];

        if (vehicle) {
            // Show/hide row based on whether vehicle passed filters
            if (filteredVehicleIds.has(vehicle.id)) {
                rows[i].style.display = '';
            } else {
                rows[i].style.display = 'none';
            }
        }
    }

    // Update the average row with filtered data
    updateAverageRow(filteredVehicles);

    // Update the chart with filtered data
    renderConversionChart(filteredVehicles);

    // Update the inventory title with filtered count
    updateInventoryTitle(filteredVehicles.length);
}

/**
 * Update the total row based on filtered vehicles
 */
function updateAverageRow(filteredVehicles) {
    const tableBody = document.getElementById('conversion-table-body');
    if (!tableBody) return;

    const totalRow = tableBody.querySelector('tr:first-child');
    if (!totalRow) return;

    // Handle case where no vehicles pass filters
    if (filteredVehicles.length === 0) {
        totalRow.innerHTML = `
            <td style="padding-left: 8px;">Total: 0</td>
            <td style="font-size: 11px;">
                <div>0</div>
                <div style="color: #5E6976; font-size: 12px;">100%</div>
            </td>
            <td style="font-size: 11px;">
                <div>0</div>
                <div style="color: #5E6976; font-size: 12px;">0.0%</div>
            </td>
            <td>
                <div>0</div>
                <div style="color: #5E6976; font-size: 12px;">0.0%</div>
            </td>
            <td></td>
        `;
        return;
    }

    // Calculate totals from filtered vehicles
    const totalSearchViews = filteredVehicles.reduce((sum, v) => sum + v.searchViews, 0);
    const totalDetailViews = filteredVehicles.reduce((sum, v) => sum + v.detailViews, 0);
    const totalLeads = filteredVehicles.reduce((sum, v) => sum + v.leads, 0);

    // Calculate total percentages
    const totalVehiclePagePercent = ((totalDetailViews / totalSearchViews) * 100).toFixed(1);
    const totalLeadsPercent = totalDetailViews > 0 ? ((totalLeads / totalDetailViews) * 100).toFixed(1) : '0.0';

    // Update the total row
    totalRow.innerHTML = `
        <td style="padding-left: 8px;">Total: ${filteredVehicles.length}</td>
        <td style="font-size: 11px;">
            <div>${totalSearchViews.toLocaleString()}</div>
            <div style="color: #5E6976; font-size: 12px;">100%</div>
        </td>
        <td style="font-size: 11px;">
            <div>${totalDetailViews.toLocaleString()}</div>
            <div style="color: #5E6976; font-size: 12px;">${totalVehiclePagePercent}%</div>
        </td>
        <td>
            <div>${totalLeads}</div>
            <div style="color: #5E6976; font-size: 12px;">${totalLeadsPercent}%</div>
        </td>
        <td></td>
    `;
}

/**
 * Filter the table by conversion rate range (legacy function that now calls filterTable)
 */
function filterTableByConversionRate(minRate, maxRate) {
    filterTable();
}

/**
 * Render the conversion funnel chart
 * @param {Array} filteredVehicles - Optional array of filtered vehicles. If not provided, uses all vehicles.
 */
function renderConversionChart(filteredVehicles) {
    const canvas = document.getElementById('conversion-chart');
    if (!canvas) {
        console.error('Canvas element with id "conversion-chart" not found');
        return;
    }

    const ctx = canvas.getContext('2d');

    // Destroy existing chart if it exists
    if (conversionChart) {
        conversionChart.destroy();
    }

    // Use filtered vehicles if provided, otherwise use all vehicles
    const vehiclesToUse = filteredVehicles || CONVERSION_DATA.vehicles;

    // Calculate funnel data from the vehicles
    const data = {
        searchViews: vehiclesToUse.reduce((sum, v) => sum + v.searchViews, 0),
        detailViews: vehiclesToUse.reduce((sum, v) => sum + v.detailViews, 0),
        leads: vehiclesToUse.reduce((sum, v) => sum + v.leads, 0)
    };

    // Calculate percentages (based on search views as 100%)
    const searchViewsPercent = 100;
    const detailViewsPercent = (data.detailViews / data.searchViews) * 100;
    const leadsPercent = (data.leads / data.searchViews) * 100;

    conversionChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Search result', 'Vehicle page', 'Leads'],
            datasets: [{
                label: 'Conversion Rate',
                data: [searchViewsPercent, detailViewsPercent, leadsPercent],
                backgroundColor: ['#0763D3', '#0763D3', '#0763D3'],
                borderWidth: 0,
                // Store raw numbers for tooltip
                rawData: [data.searchViews, data.detailViews, data.leads]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: false
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#6B7280',
                        font: {
                            size: 12
                        }
                    }
                },
                y: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        color: '#E5E7EB'
                    },
                    ticks: {
                        color: '#6B7280',
                        font: {
                            size: 12
                        },
                        callback: function(value) {
                            return value + '%';
                        }
                    },
                    title: {
                        display: true,
                        text: 'Conversion Rate (%)',
                        color: '#6B7280',
                        font: {
                            size: 13,
                            weight: '500'
                        }
                    }
                }
            }
        },
        plugins: [
        {
            id: 'funnelConnectors',
            afterDatasetsDraw: function(chart) {
                const ctx = chart.ctx;
                const meta = chart.getDatasetMeta(0);

                if (meta.data.length >= 3) {
                    const bars = meta.data;

                    // Draw connector between first and second bar
                    if (bars[0] && bars[1]) {
                        const bar1 = bars[0];
                        const bar2 = bars[1];

                        // Get bar widths (half width for edges)
                        const bar1HalfWidth = (bar1.width || 40) / 2;
                        const bar2HalfWidth = (bar2.width || 40) / 2;

                        // Draw trapezoid
                        ctx.fillStyle = 'rgba(7, 99, 211, 0.2)';
                        ctx.beginPath();
                        ctx.moveTo(bar1.x + bar1HalfWidth, bar1.y); // Top right of first bar
                        ctx.lineTo(bar2.x - bar2HalfWidth, bar2.y); // Top left of second bar
                        ctx.lineTo(bar2.x - bar2HalfWidth, bar2.base); // Bottom left of second bar
                        ctx.lineTo(bar1.x + bar1HalfWidth, bar1.base); // Bottom right of first bar
                        ctx.closePath();
                        ctx.fill();
                    }

                    // Draw connector between second and third bar
                    if (bars[1] && bars[2]) {
                        const bar2 = bars[1];
                        const bar3 = bars[2];

                        // Get bar widths (half width for edges)
                        const bar2HalfWidth = (bar2.width || 40) / 2;
                        const bar3HalfWidth = (bar3.width || 40) / 2;

                        // Draw trapezoid
                        ctx.fillStyle = 'rgba(7, 99, 211, 0.2)';
                        ctx.beginPath();
                        ctx.moveTo(bar2.x + bar2HalfWidth, bar2.y); // Top right of second bar
                        ctx.lineTo(bar3.x - bar3HalfWidth, bar3.y); // Top left of third bar
                        ctx.lineTo(bar3.x - bar3HalfWidth, bar3.base); // Bottom left of third bar
                        ctx.lineTo(bar2.x + bar2HalfWidth, bar2.base); // Bottom right of second bar
                        ctx.closePath();
                        ctx.fill();
                    }
                }
            }
        },
        {
            id: 'datalabels',
            afterDatasetsDraw: function(chart) {
                const ctx = chart.ctx;
                chart.data.datasets.forEach((dataset, datasetIndex) => {
                    const meta = chart.getDatasetMeta(datasetIndex);
                    if (!meta.hidden) {
                        meta.data.forEach((bar, index) => {
                            const data = dataset.data[index];
                            const rawValue = dataset.rawData[index];

                            // Calculate bar height
                            const barHeight = bar.base - bar.y;
                            const minHeightForInside = 50; // Minimum height needed to fit text inside

                            const x = bar.x;
                            let percentY, countY;

                            // If bar is too short, place text above the bar
                            if (barHeight < minHeightForInside) {
                                percentY = bar.y - 25;
                                countY = bar.y - 8;
                                ctx.fillStyle = '#374151'; // Dark text for outside
                            } else {
                                // Place text inside the bar
                                percentY = bar.y + 20;
                                countY = bar.y + 38;
                                ctx.fillStyle = '#FFFFFF'; // White text for inside
                            }

                            // Draw percentage
                            ctx.font = '600 13px DM Sans, sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            const percentText = data.toFixed(1) + '%';
                            ctx.fillText(percentText, x, percentY);

                            // Draw count below percentage
                            ctx.font = '400 12px DM Sans, sans-serif';
                            const countText = rawValue.toLocaleString();
                            ctx.fillText(countText, x, countY);
                        });
                    }
                });
            }
        }]
    });
}

/**
 * Render the market average chart
 */
function renderMarketAverageChart() {
    const canvas = document.getElementById('market-average-chart');
    if (!canvas) {
        console.error('Canvas element with id "market-average-chart" not found');
        return;
    }

    const ctx = canvas.getContext('2d');

    // Destroy existing chart if it exists
    if (marketAverageChart) {
        marketAverageChart.destroy();
    }

    const data = CONVERSION_DATA.marketAverage;

    // Calculate percentages (based on search views as 100%)
    const searchViewsPercent = 100;
    const detailViewsPercent = (data.detailViews / data.searchViews) * 100;
    const leadsPercent = (data.leads / data.searchViews) * 100;

    marketAverageChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Search result', 'Vehicle page', 'Leads'],
            datasets: [{
                label: 'Conversion Rate',
                data: [searchViewsPercent, detailViewsPercent, leadsPercent],
                backgroundColor: ['#5E6976', '#5E6976', '#5E6976'],
                borderWidth: 0,
                // Store raw numbers for tooltip
                rawData: [data.searchViews, data.detailViews, data.leads]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: false
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#6B7280',
                        font: {
                            size: 12
                        }
                    }
                },
                y: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        color: '#E5E7EB'
                    },
                    ticks: {
                        color: '#6B7280',
                        font: {
                            size: 12
                        },
                        callback: function(value) {
                            return value + '%';
                        }
                    },
                    title: {
                        display: true,
                        text: 'Conversion Rate (%)',
                        color: '#6B7280',
                        font: {
                            size: 13,
                            weight: '500'
                        }
                    }
                }
            }
        },
        plugins: [
        {
            id: 'funnelConnectors',
            afterDatasetsDraw: function(chart) {
                const ctx = chart.ctx;
                const meta = chart.getDatasetMeta(0);

                if (meta.data.length >= 3) {
                    const bars = meta.data;

                    // Draw connector between first and second bar
                    if (bars[0] && bars[1]) {
                        const bar1 = bars[0];
                        const bar2 = bars[1];

                        // Get bar widths (half width for edges)
                        const bar1HalfWidth = (bar1.width || 40) / 2;
                        const bar2HalfWidth = (bar2.width || 40) / 2;

                        // Draw trapezoid with gray color at 20% opacity
                        ctx.fillStyle = 'rgba(94, 105, 118, 0.2)';
                        ctx.beginPath();
                        ctx.moveTo(bar1.x + bar1HalfWidth, bar1.y);
                        ctx.lineTo(bar2.x - bar2HalfWidth, bar2.y);
                        ctx.lineTo(bar2.x - bar2HalfWidth, bar2.base);
                        ctx.lineTo(bar1.x + bar1HalfWidth, bar1.base);
                        ctx.closePath();
                        ctx.fill();
                    }

                    // Draw connector between second and third bar
                    if (bars[1] && bars[2]) {
                        const bar2 = bars[1];
                        const bar3 = bars[2];

                        // Get bar widths (half width for edges)
                        const bar2HalfWidth = (bar2.width || 40) / 2;
                        const bar3HalfWidth = (bar3.width || 40) / 2;

                        // Draw trapezoid with gray color at 20% opacity
                        ctx.fillStyle = 'rgba(94, 105, 118, 0.2)';
                        ctx.beginPath();
                        ctx.moveTo(bar2.x + bar2HalfWidth, bar2.y);
                        ctx.lineTo(bar3.x - bar3HalfWidth, bar3.y);
                        ctx.lineTo(bar3.x - bar3HalfWidth, bar3.base);
                        ctx.lineTo(bar2.x + bar2HalfWidth, bar2.base);
                        ctx.closePath();
                        ctx.fill();
                    }
                }
            }
        },
        {
            id: 'datalabels',
            afterDatasetsDraw: function(chart) {
                const ctx = chart.ctx;
                chart.data.datasets.forEach((dataset, datasetIndex) => {
                    const meta = chart.getDatasetMeta(datasetIndex);
                    if (!meta.hidden) {
                        meta.data.forEach((bar, index) => {
                            const data = dataset.data[index];
                            const rawValue = dataset.rawData[index];

                            // Calculate bar height
                            const barHeight = bar.base - bar.y;
                            const minHeightForInside = 50;

                            const x = bar.x;
                            let percentY, countY;

                            // If bar is too short, place text above the bar
                            if (barHeight < minHeightForInside) {
                                percentY = bar.y - 25;
                                countY = bar.y - 8;
                                ctx.fillStyle = '#374151';
                            } else {
                                // Place text inside the bar
                                percentY = bar.y + 20;
                                countY = bar.y + 38;
                                ctx.fillStyle = '#FFFFFF';
                            }

                            // Draw percentage
                            ctx.font = '600 13px DM Sans, sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            const percentText = data.toFixed(1) + '%';
                            ctx.fillText(percentText, x, percentY);

                            // Draw count below percentage
                            ctx.font = '400 12px DM Sans, sans-serif';
                            const countText = rawValue.toLocaleString();
                            ctx.fillText(countText, x, countY);
                        });
                    }
                });
            }
        }]
    });
}

/**
 * Render the conversion table
 */
function renderConversionTable() {
    const tableBody = document.getElementById('conversion-table-body');
    if (!tableBody) {
        console.error('Table body element not found');
        return;
    }

    // Clear existing rows
    tableBody.innerHTML = '';

    // Calculate totals
    const totalSearchViews = CONVERSION_DATA.vehicles.reduce((sum, v) => sum + v.searchViews, 0);
    const totalDetailViews = CONVERSION_DATA.vehicles.reduce((sum, v) => sum + v.detailViews, 0);
    const totalLeads = CONVERSION_DATA.vehicles.reduce((sum, v) => sum + v.leads, 0);

    // Calculate total percentages
    const totalVehiclePagePercent = ((totalDetailViews / totalSearchViews) * 100).toFixed(1);
    const totalLeadsPercent = totalDetailViews > 0 ? ((totalLeads / totalDetailViews) * 100).toFixed(1) : '0.0';

    // Add total row first
    const totalRow = document.createElement('tr');
    totalRow.style.fontWeight = '700';
    totalRow.style.backgroundColor = '#F9FAFB';
    totalRow.style.fontSize = '12px';
    totalRow.innerHTML = `
        <td style="padding-left: 8px;">Total: ${CONVERSION_DATA.vehicles.length}</td>
        <td style="font-size: 11px;">
            <div>${totalSearchViews.toLocaleString()}</div>
            <div style="color: #5E6976; font-size: 12px;">100%</div>
        </td>
        <td style="font-size: 11px;">
            <div>${totalDetailViews.toLocaleString()}</div>
            <div style="color: #5E6976; font-size: 12px;">${totalVehiclePagePercent}%</div>
        </td>
        <td>
            <div>${totalLeads}</div>
            <div style="color: #5E6976; font-size: 12px;">${totalLeadsPercent}%</div>
        </td>
        <td></td>
    `;
    tableBody.appendChild(totalRow);

    // Add vehicle rows
    CONVERSION_DATA.vehicles.forEach((vehicle, index) => {
        // Calculate percentages for this vehicle
        const vehiclePagePercent = ((vehicle.detailViews / vehicle.searchViews) * 100).toFixed(1);
        const leadsPercent = vehicle.detailViews > 0 ? ((vehicle.leads / vehicle.detailViews) * 100).toFixed(1) : '0.0';

        const row = document.createElement('tr');
        row.style.fontSize = '12px';
        row.innerHTML = `
            <td style="display: flex; align-items: center; gap: 12px;">
                <img src="${vehicle.image}" alt="${vehicle.name}" style="width: 53px; height: 40px; object-fit: cover; border-radius: 4px;">
                <div>
                    <a href="#" onclick="return false;">${vehicle.name}</a>
                    <div style="font-size: 12px; color: #5E6976;">$${vehicle.price.toLocaleString()} • ${vehicle.mileage.toLocaleString()} mi</div>
                </div>
            </td>
            <td style="font-size: 11px;">
                <div>${vehicle.searchViews.toLocaleString()}</div>
                <div style="color: #5E6976; font-size: 12px;">100%</div>
            </td>
            <td style="font-size: 11px;">
                <div>${vehicle.detailViews.toLocaleString()}</div>
                <div style="color: #5E6976; font-size: 12px;">${vehiclePagePercent}%</div>
            </td>
            <td>
                <div>${vehicle.leads}</div>
                <div style="color: #5E6976; font-size: 12px;">${leadsPercent}%</div>
            </td>
            <td style="position: relative;">
                <button class="menu-button" data-index="${index}" style="background: none; border: none; cursor: pointer; padding: 4px;">
                    <img src="img/icon/menu.svg" alt="Menu" style="width: 20px; height: 20px;">
                </button>
                <div class="dropdown-menu" id="dropdown-${index}" style="display: none; position: absolute; right: 0; top: 100%; background: white; border: 1px solid #D1D5DB; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); min-width: 200px; z-index: 1000;">
                    <a href="#" onclick="return false;" style="display: block; padding: 12px 16px; text-decoration: none; color: #374151; font-size: 14px; border-bottom: 1px solid #E5E7EB;">Segment analysis</a>
                    <a href="#" onclick="return false;" style="display: block; padding: 12px 16px; text-decoration: none; color: #374151; font-size: 14px;">Buyer overlap analysis</a>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });

    // Add event listeners for menu buttons
    document.querySelectorAll('.menu-button').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const index = this.getAttribute('data-index');
            const dropdown = document.getElementById(`dropdown-${index}`);

            // Close all other dropdowns
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                if (menu.id !== `dropdown-${index}`) {
                    menu.style.display = 'none';
                }
            });

            // Toggle current dropdown
            dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function() {
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            menu.style.display = 'none';
        });
    });
}

    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        initializeConversionPage();
    });

})(); // End of IIFE - keeps all conversion page code isolated
