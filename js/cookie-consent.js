/**
 * Enhanced Cookie Consent Management System
 * Provides GDPR-compliant cookie consent with 10-day persistence
 */

class CookieConsentManager {
    constructor() {
        this.COOKIE_NAME = 'coral_capital_cookie_consent';
        this.EXPIRY_DAYS_ACCEPT_DENY = 25; // 25 days for Accept All or Deny
        this.EXPIRY_DAYS_DISMISS = 5; // 5 days for X (dismiss)
        this.banner = null;
        this.isVisible = false;
        
        this.init();
    }

    init() {
        // Check if consent has been given and is still valid
        if (this.hasValidConsent()) {
            return; // Don't show banner if consent is valid
        }

        // Create and show the banner
        this.createBanner();
        this.showBanner();
        this.attachEventListeners();
    }

    hasValidConsent() {
        try {
            const consentData = localStorage.getItem(this.COOKIE_NAME);
            if (!consentData) return false;

            const { choice, timestamp } = JSON.parse(consentData);
            const now = Date.now();
            
            // Use different expiry times based on user choice
            let expiryDays;
            if (choice === 'accepted' || choice === 'denied') {
                expiryDays = this.EXPIRY_DAYS_ACCEPT_DENY; // 25 days
            } else if (choice === 'dismissed') {
                expiryDays = this.EXPIRY_DAYS_DISMISS; // 5 days
            } else {
                return false; // Invalid choice
            }
            
            const expiryTime = timestamp + (expiryDays * 24 * 60 * 60 * 1000);

            return now < expiryTime;
        } catch (error) {
            console.warn('Error checking cookie consent:', error);
            return false;
        }
    }

    createBanner() {
        // Determine the correct path to the cookie image based on current page location
        const getCookieImagePath = () => {
            const currentPath = window.location.pathname;
            if (currentPath.includes('/cookie/')) {
                return '../wp-content/cookie/cookie.PNG';
            }
            return 'wp-content/cookie/cookie.PNG';
        };

        // Determine the correct path to the privacy policy based on current page location
        const getPrivacyPolicyPath = () => {
            const currentPath = window.location.pathname;
            if (currentPath.includes('/cookie/')) {
                return '../privacy-policy/index.html';
            }
            return 'privacy-policy/index.html';
        };

        // Create banner HTML
        const bannerHTML = `
            <div id="coral-cookie-banner" class="coral-cookie-banner" style="display: none;">
                <div class="coral-cookie-content">
                    <div class="coral-cookie-header">
                        <img src="${getCookieImagePath()}" alt="Cookie" class="coral-cookie-icon" onerror="this.style.display='none'">
                        <h3>We Value Your Privacy</h3>
                    </div>
                    <div class="coral-cookie-message">
                        <p>We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. By continuing to use our website, you consent to our use of cookies in accordance with our <a href="${getPrivacyPolicyPath()}" target="_blank" class="coral-cookie-link">Privacy Policy</a>.</p>
                    </div>
                    <div class="coral-cookie-actions">
                        <button id="coral-accept-cookies" class="coral-btn coral-btn-accept">
                            ACCEPT ALL
                        </button>
                        <button id="coral-deny-cookies" class="coral-btn coral-btn-deny">
                            DENY
                        </button>
                        <button id="coral-close-cookies" class="coral-btn coral-btn-close" title="Close">
                            ×
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Add banner to page
        document.body.insertAdjacentHTML('beforeend', bannerHTML);
        this.banner = document.getElementById('coral-cookie-banner');
    }

    showBanner() {
        if (this.banner && !this.isVisible) {
            this.banner.style.display = 'block';
            this.isVisible = true;
            
            // Add entrance animation
            setTimeout(() => {
                this.banner.classList.add('coral-cookie-show');
            }, 10);
        }
    }

    hideBanner() {
        if (this.banner && this.isVisible) {
            this.banner.classList.remove('coral-cookie-show');
            this.isVisible = false;
            
            // Remove from DOM after animation
            setTimeout(() => {
                this.banner.style.display = 'none';
            }, 300);
        }
    }

    attachEventListeners() {
        // Accept button
        const acceptBtn = document.getElementById('coral-accept-cookies');
        if (acceptBtn) {
            acceptBtn.addEventListener('click', () => this.handleConsent('accepted'));
        }

        // Deny button
        const denyBtn = document.getElementById('coral-deny-cookies');
        if (denyBtn) {
            denyBtn.addEventListener('click', () => this.handleConsent('denied'));
        }

        // Close button
        const closeBtn = document.getElementById('coral-close-cookies');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.handleConsent('dismissed'));
        }
    }

    handleConsent(choice) {
        // Store consent with timestamp
        const consentData = {
            choice: choice,
            timestamp: Date.now(),
            version: '2.0'
        };

        try {
            localStorage.setItem(this.COOKIE_NAME, JSON.stringify(consentData));
            
            // Log consent for analytics (if accepted)
            if (choice === 'accepted') {
                this.enableAnalytics();
            } else {
                this.disableAnalytics();
            }

            // Hide banner
            this.hideBanner();

            // Dispatch custom event for other scripts
            window.dispatchEvent(new CustomEvent('cookieConsentChanged', {
                detail: { choice: choice, timestamp: Date.now() }
            }));

        } catch (error) {
            console.error('Error storing cookie consent:', error);
        }
    }

    enableAnalytics() {
        // Enable Google Analytics and other tracking scripts
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'analytics_storage': 'granted',
                'ad_storage': 'granted'
            });
        }

        // Enable other tracking scripts here
        console.log('Analytics enabled');
    }

    disableAnalytics() {
        // Disable Google Analytics and other tracking scripts
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'analytics_storage': 'denied',
                'ad_storage': 'denied'
            });
        }

        // Disable other tracking scripts here
        console.log('Analytics disabled');
    }

    // Public method to check current consent status
    getConsentStatus() {
        try {
            const consentData = localStorage.getItem(this.COOKIE_NAME);
            if (!consentData) return null;

            const { choice, timestamp } = JSON.parse(consentData);
            const now = Date.now();
            const expiryTime = timestamp + (this.EXPIRY_DAYS * 24 * 60 * 60 * 1000);

            if (now >= expiryTime) {
                return null; // Expired
            }

            return {
                choice: choice,
                timestamp: timestamp,
                expiresAt: expiryTime,
                isExpired: false
            };
        } catch (error) {
            console.warn('Error getting consent status:', error);
            return null;
        }
    }

    // Public method to reset consent (for testing)
    resetConsent() {
        localStorage.removeItem(this.COOKIE_NAME);
        console.log('Cookie consent reset');
    }
}

// Add CSS styles
const cookieStyles = `
<style id="coral-cookie-styles">
.coral-cookie-banner {
    position: fixed;
    bottom: 20px;
    right: 20px;
    max-width: 380px;
    background: #ffffff;
    border: 2px solid #b1976b;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(10, 49, 64, 0.15), 0 2px 8px rgba(177, 151, 107, 0.1);
    z-index: 999999;
    font-family: 'Avenir', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    transform: translateY(100px);
    opacity: 0;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.coral-cookie-banner.coral-cookie-show {
    transform: translateY(0);
    opacity: 1;
}

.coral-cookie-content {
    padding: 24px;
    position: relative;
}

.coral-cookie-header {
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 12px;
}

.coral-cookie-icon {
    width: 24px;
    height: 24px;
    object-fit: contain;
}

.coral-cookie-header h3 {
    margin: 0;
    font-size: 18px;
    font-weight: normal;
    color: #0A3140;
    font-family: 'Avenir', sans-serif;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.coral-cookie-message {
    margin-bottom: 20px;
}

.coral-cookie-message p {
    margin: 0;
    font-size: 13px;
    line-height: 1.5;
    color: #555;
    font-family: 'Avenir', sans-serif;
    font-weight: 400;
}

        .coral-cookie-link {
            color: #b1976b;
            text-decoration: underline;
            font-weight: 500;
            border-radius: 4px;
            padding: 2px 4px;
            transition: all 0.3s ease;
        }
        .coral-cookie-link:hover {
            color: #9a7f5a;
            text-decoration: none;
            background-color: rgba(177, 151, 107, 0.1);
        }

.coral-cookie-actions {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    align-items: center;
}

.coral-btn {
    padding: 10px 20px;
    border: 2px solid transparent;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: 'Avenir', sans-serif;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    position: relative;
    overflow: hidden;
}

.coral-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s;
}

.coral-btn:hover::before {
    left: 100%;
}

.coral-btn-accept {
    background: #b1976b;
    color: white;
    flex: 1;
    min-width: 100px;
    border-color: #b1976b;
}

.coral-btn-accept:hover {
    background: #9a7f5a;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(177, 151, 107, 0.3);
}

.coral-btn-deny {
    background: #007CBA;
    color: white;
    flex: 1;
    min-width: 100px;
    border-color: #007CBA;
}

.coral-btn-deny:hover {
    background: #0066a1;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 124, 186, 0.3);
}

.coral-btn-close {
    background: #0A3140;
    color: white;
    width: 40px;
    height: 40px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: bold;
    line-height: 1;
    border-color: #0A3140;
    border-radius: 8px;
}

.coral-btn-close:hover {
    background: #08242f;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(10, 49, 64, 0.3);
}

/* Mobile responsiveness */
@media (max-width: 768px) {
    .coral-cookie-banner {
        bottom: 10px;
        right: 10px;
        left: 10px;
        max-width: none;
        border-radius: 12px;
    }
    
    .coral-cookie-content {
        padding: 20px;
    }
    
    .coral-cookie-actions {
        flex-direction: column;
        gap: 10px;
    }
    
    .coral-btn {
        width: 100%;
        justify-content: center;
        padding: 12px 20px;
    }
    
    .coral-btn-close {
        width: 100%;
        height: 44px;
    }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
    .coral-cookie-banner {
        border-width: 3px;
        background: #ffffff;
        border-radius: 12px;
    }
    
    .coral-btn {
        border: 3px solid currentColor;
        border-radius: 8px;
    }
    
    .coral-cookie-header h3 {
        color: #000000;
    }
    
    .coral-cookie-message p {
        color: #000000;
    }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
    .coral-cookie-banner {
        transition: opacity 0.3s ease;
        transform: none;
    }
    
    .coral-cookie-banner.coral-cookie-show {
        transform: none;
    }
    
    .coral-btn {
        transition: background-color 0.2s ease;
    }
    
    .coral-btn:hover {
        transform: none;
    }
    
    .coral-btn::before {
        display: none;
    }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
    .coral-cookie-banner {
        background: #1a1a1a;
        border-color: #b1976b;
        border-radius: 12px;
    }
    
    .coral-cookie-header h3 {
        color: #ffffff;
    }
    
    .coral-cookie-message p {
        color: #e0e0e0;
    }
}
</style>
`;

// Inject styles
document.head.insertAdjacentHTML('beforeend', cookieStyles);

// Initialize cookie consent when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.coralCookieConsent = new CookieConsentManager();
    });
} else {
    window.coralCookieConsent = new CookieConsentManager();
}

// Export for global access
window.CookieConsentManager = CookieConsentManager;
