// Main Application Logic and State Management

// Application State
const appState = {
    currentTab: 'select',
    selectedDealerIds: [],
    
    // Initialize application
    init() {
        this.loadFromLocalStorage();
        this.initTabNavigation();
        this.updateSelectedCount();
        
        // Show the correct tab
        this.showTab(this.currentTab);
    },
    
    // Load state from localStorage
    loadFromLocalStorage() {
        const savedIds = localStorage.getItem('cargurusSelectedDealers');
        if (savedIds) {
            this.selectedDealerIds = JSON.parse(savedIds);
        }
        
        const savedTab = localStorage.getItem('cargurusLastTab');
        if (savedTab && (savedTab === 'select' || savedTab === 'selected')) {
            this.currentTab = savedTab;
        }
    },
    
    // Save selected dealers to localStorage
    saveSelectedDealers(ids) {
        this.selectedDealerIds = ids;
        localStorage.setItem('cargurusSelectedDealers', JSON.stringify(ids));
        this.updateSelectedCount();
    },
    
    // Add or remove a dealer from selection
    toggleDealerSelection(dealerId, isSelected) {
        if (isSelected && !this.selectedDealerIds.includes(dealerId)) {
            this.selectedDealerIds.push(dealerId);
        } else if (!isSelected) {
            this.selectedDealerIds = this.selectedDealerIds.filter(id => id !== dealerId);
        }
        
        localStorage.setItem('cargurusSelectedDealers', JSON.stringify(this.selectedDealerIds));
        this.updateSelectedCount();
    },
    
    // Update the count badge on the compare button
    updateSelectedCount() {
        const badge = document.querySelector('.compare-button .tab-badge');
        if (badge) {
            badge.textContent = this.selectedDealerIds.length;
            badge.style.display = this.selectedDealerIds.length > 0 ? 'inline-flex' : 'none';
        }
        
        // Also update compare button state
        const compareBtn = document.querySelector('.compare-button');
        if (compareBtn) {
            compareBtn.disabled = this.selectedDealerIds.length === 0;
        }
    },
    
    // Initialize tab navigation
    initTabNavigation() {
        const tabs = document.querySelectorAll('.tab-button');
        tabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                const tabName = e.currentTarget.dataset.tab;
                this.showTab(tabName);
            });
        });
    },
    
    // Show specific tab
    showTab(tabName) {
        // Update current tab
        this.currentTab = tabName;
        localStorage.setItem('cargurusLastTab', tabName);
        
        // Update tab buttons
        document.querySelectorAll('.tab-button').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tabName);
        });
        
        // Show/hide tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.toggle('active', content.id === `${tabName}-tab`);
        });
        
        // Trigger events for tab-specific logic
        if (tabName === 'selected' && typeof updateSelectedTable === 'function') {
            updateSelectedTable();
        }
    },
    
    // Get selected dealers data
    getSelectedDealers() {
        if (typeof dealerDatabase !== 'undefined') {
            return dealerDatabase.filter(dealer => this.selectedDealerIds.includes(dealer.id));
        }
        return [];
    },
    
    // Navigate to compare page
    navigateToCompare() {
        if (this.selectedDealerIds.length > 0) {
            window.location.href = 'compare.html';
        } else {
            alert('Please select at least one competitor to compare.');
        }
    }
};

// Initialize app when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => appState.init());
} else {
    appState.init();
}