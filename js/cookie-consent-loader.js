/**
 * Cookie Consent Dynamic Loader
 * Dynamically loads the cookie consent system when needed
 */

(function() {
    'use strict';
    
    // Check if cookie consent is already loaded
    if (window.CookieConsentManager) {
        return;
    }
    
    // Function to load the cookie consent script
    function loadCookieConsent() {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'js/cookie-consent.js';
            script.async = true;
            
            script.onload = () => {
                console.log('Cookie consent system loaded successfully');
                resolve();
            };
            
            script.onerror = () => {
                console.error('Failed to load cookie consent system');
                reject(new Error('Failed to load cookie consent script'));
            };
            
            document.head.appendChild(script);
        });
    }
    
    // Check if consent is needed
    function needsConsent() {
        try {
            const consentData = localStorage.getItem('coral_capital_cookie_consent');
            if (!consentData) return true;
            
            const { choice, timestamp } = JSON.parse(consentData);
            const now = Date.now();
            
            // Use different expiry times based on user choice
            let expiryDays;
            if (choice === 'accepted' || choice === 'denied') {
                expiryDays = 25; // 25 days
            } else if (choice === 'dismissed') {
                expiryDays = 5; // 5 days
            } else {
                return true; // Invalid choice
            }
            
            const expiryTime = timestamp + (expiryDays * 24 * 60 * 60 * 1000);
            return now >= expiryTime;
        } catch (error) {
            console.warn('Error checking cookie consent:', error);
            return true;
        }
    }
    
    // Initialize the loader
    function init() {
        // Only load if consent is needed
        if (needsConsent()) {
            loadCookieConsent().catch(error => {
                console.error('Cookie consent loader error:', error);
            });
        }
    }
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();