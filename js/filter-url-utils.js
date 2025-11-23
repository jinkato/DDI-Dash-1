// Filter URL Utilities
// Handles encoding/decoding filter state to/from URL parameters

// Default filter values
const DEFAULT_FILTERS = {
    dateRange: 'Last 13 months',
    dateGroup: 'Monthly',
    vehicleTypes: ['Compact', 'Sedans', 'SUV/CO', 'Truck', 'Luxury'],
    dealRatings: ['Great Deal', 'Good Deal', 'Fair Deal', 'High Priced', 'Over Priced'],
    brand: 'All',
    radius: '50 miles',
    franchiseType: 'All'
};

// Abbreviation mappings for URL parameters (keep URLs clean)
const VEHICLE_TYPE_ABBREV = {
    'Compact': 'C',
    'Sedans': 'S',
    'SUV/CO': 'SUV',
    'Truck': 'T',
    'Luxury': 'L'
};

const VEHICLE_TYPE_REVERSE = {
    'C': 'Compact',
    'S': 'Sedans',
    'SUV': 'SUV/CO',
    'T': 'Truck',
    'L': 'Luxury'
};

const DEAL_RATING_ABBREV = {
    'Great Deal': 'GD',
    'Good Deal': 'GOD',
    'Fair Deal': 'FD',
    'High Priced': 'HP',
    'Over Priced': 'OP'
};

const DEAL_RATING_REVERSE = {
    'GD': 'Great Deal',
    'GOD': 'Good Deal',
    'FD': 'Fair Deal',
    'HP': 'High Priced',
    'OP': 'Over Priced'
};

/**
 * Encode filter state to URL parameters
 * @param {Object} filters - Filter state object
 * @returns {string} URL parameter string
 */
function encodeFiltersToURL(filters) {
    const params = new URLSearchParams();

    // Date Range
    if (filters.dateRange && filters.dateRange !== DEFAULT_FILTERS.dateRange) {
        params.set('dr', filters.dateRange);
    }

    // Date Group
    if (filters.dateGroup && filters.dateGroup !== DEFAULT_FILTERS.dateGroup) {
        params.set('dg', filters.dateGroup);
    }

    // Vehicle Types (abbreviated and comma-separated)
    if (filters.vehicleTypes && filters.vehicleTypes.length > 0) {
        const abbrevTypes = filters.vehicleTypes.map(type => VEHICLE_TYPE_ABBREV[type] || type);
        // Only add if different from default
        if (JSON.stringify(filters.vehicleTypes.sort()) !== JSON.stringify(DEFAULT_FILTERS.vehicleTypes.sort())) {
            params.set('vt', abbrevTypes.join(','));
        }
    }

    // Deal Ratings (abbreviated and comma-separated)
    if (filters.dealRatings && filters.dealRatings.length > 0) {
        const abbrevRatings = filters.dealRatings.map(rating => DEAL_RATING_ABBREV[rating] || rating);
        // Only add if different from default
        if (JSON.stringify(filters.dealRatings.sort()) !== JSON.stringify(DEFAULT_FILTERS.dealRatings.sort())) {
            params.set('dd', abbrevRatings.join(','));
        }
    }

    // Brand
    if (filters.brand && filters.brand !== DEFAULT_FILTERS.brand) {
        params.set('br', filters.brand);
    }

    // Radius (extract number only)
    if (filters.radius) {
        const radiusNum = filters.radius.replace(/[^\d]/g, '');
        if (radiusNum && radiusNum !== '50') {
            params.set('r', radiusNum);
        }
    }

    // Franchise Type
    if (filters.franchiseType && filters.franchiseType !== DEFAULT_FILTERS.franchiseType) {
        params.set('ft', filters.franchiseType);
    }

    return params.toString();
}

/**
 * Decode URL parameters to filter state
 * @returns {Object} Filter state object
 */
function decodeFiltersFromURL() {
    const params = new URLSearchParams(window.location.search);
    const filters = { ...DEFAULT_FILTERS };

    // Date Range
    if (params.has('dr')) {
        filters.dateRange = params.get('dr');
    }

    // Date Group
    if (params.has('dg')) {
        filters.dateGroup = params.get('dg');
    }

    // Vehicle Types
    if (params.has('vt')) {
        const abbrevTypes = params.get('vt').split(',');
        filters.vehicleTypes = abbrevTypes.map(abbrev => VEHICLE_TYPE_REVERSE[abbrev] || abbrev);
    }

    // Deal Ratings
    if (params.has('dd')) {
        const abbrevRatings = params.get('dd').split(',');
        filters.dealRatings = abbrevRatings.map(abbrev => DEAL_RATING_REVERSE[abbrev] || abbrev);
    }

    // Brand
    if (params.has('br')) {
        filters.brand = params.get('br');
    }

    // Radius
    if (params.has('r')) {
        const radiusNum = params.get('r');
        if (radiusNum === 'All') {
            filters.radius = 'All distances';
        } else {
            filters.radius = radiusNum + ' miles';
        }
    }

    // Franchise Type
    if (params.has('ft')) {
        filters.franchiseType = params.get('ft');
    }

    return filters;
}

/**
 * Get current filter state from lpv-2-filters.js if available
 * Falls back to defaults if not available
 * @returns {Object} Current filter state
 */
function getCurrentFilters() {
    if (typeof currentFilters !== 'undefined') {
        return currentFilters;
    }
    return { ...DEFAULT_FILTERS };
}

/**
 * Build explore.html URL with current filter state
 * @param {Object} filters - Optional filter state (uses current if not provided)
 * @returns {string} Full URL to explore.html with filters
 */
function buildExploreURL(filters) {
    const filterState = filters || getCurrentFilters();
    const queryString = encodeFiltersToURL(filterState);
    return 'explore.html' + (queryString ? '?' + queryString : '');
}

/**
 * Build lead.html URL with current filter state
 * @param {Object} filters - Optional filter state (uses current if not provided)
 * @returns {string} Full URL to lead.html with filters
 */
function buildLeadURL(filters) {
    const filterState = filters || getCurrentFilters();
    const queryString = encodeFiltersToURL(filterState);
    return 'lead.html' + (queryString ? '?' + queryString : '');
}
