// Shopper Page JavaScript

// Initialize charts when window loads
window.addEventListener('load', function() {
    console.log('Shopper page loaded');
    
    // Shopper Age Bar Chart
    const ageCanvas = document.getElementById('shopperEngagementChart');
    if (ageCanvas) {
        new Chart(ageCanvas, {
            type: 'bar',
            data: {
                labels: ['18-24', '25-34', '35-44', '45-54', '55+'],
                datasets: [{
                    label: 'Number of Shoppers',
                    data: [1200, 2800, 3500, 2200, 1800],
                    backgroundColor: [
                        'rgba(59, 130, 246, 0.8)',
                        'rgba(59, 130, 246, 0.8)',
                        'rgba(59, 130, 246, 0.8)',
                        'rgba(59, 130, 246, 0.8)',
                        'rgba(59, 130, 246, 0.8)'
                    ],
                    borderColor: '#3B82F6',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return value.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Gender Distribution Pie Chart
    const genderCanvas = document.getElementById('conversionRateChart');
    if (genderCanvas) {
        new Chart(genderCanvas, {
            type: 'pie',
            data: {
                labels: ['Male', 'Female', 'Other'],
                datasets: [{
                    data: [52, 45, 3],
                    backgroundColor: [
                        'rgba(59, 130, 246, 0.8)',
                        'rgba(16, 185, 129, 0.8)',
                        'rgba(251, 146, 60, 0.8)'
                    ],
                    borderColor: [
                        '#3B82F6',
                        '#10B981',
                        '#FB923C'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 15,
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.parsed + '%';
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Initialize Location Map
    const mapContainer = document.getElementById('locationMap');
    if (mapContainer) {
        // Center the map on Massachusetts (approximate center of the four cities)
        const map = L.map('locationMap').setView([42.5, -71.45], 10);
        
        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19
        }).addTo(map);
        
        // Define locations with coordinates
        const locations = [
            { name: 'Acton, MA', lat: 42.4851, lng: -71.4328, leads: 802 },
            { name: 'Westford, MA', lat: 42.5792, lng: -71.4378, leads: 802 },
            { name: 'Littleton, MA', lat: 42.5398, lng: -71.4895, leads: 802 },
            { name: 'Groton, MA', lat: 42.6112, lng: -71.5745, leads: 802 }
        ];
        
        // Add markers for each location
        locations.forEach(location => {
            const marker = L.marker([location.lat, location.lng]).addTo(map);
            marker.bindPopup(`<b>${location.name}</b><br>Total leads: ${location.leads}`);
        });
    }
});
