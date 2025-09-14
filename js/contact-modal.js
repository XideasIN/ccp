/**
 * Centralized Contact Modal Script
 * Handles off-canvas modal functionality across all pages
 * Version: 1.0.0
 * 
 * Usage: Simply include this script in your HTML pages:
 * <script src="js/contact-modal.js"></script>
 */

(function() {
    'use strict';
    
    // Configuration object for easy customization
    const CONFIG = {
        // CSS selectors for trigger elements
        selectors: {
            phoneIcons: '.contact-links .ct-fancy-icon[class*="envelope"], .contact-link-parent .ct-fancy-icon[class*="envelope"]',
            contactLinks: '.footer-about a[href*="contact"], .footer-about a[href*="mailto"], .footer-contact-link-text',
            discoverButtons: 'a[href*="services"], .ct-link-button, .btn',
            modalTriggers: '[onclick*="openModal"]',
            offCanvas: '.oxy-off-canvas',
            backdrop: '.oxy-offcanvas_backdrop',
            closeButton: '.oxy-off-canvas .ct-fancy-icon'
        },
        
        // CSS classes for modal state
        classes: {
            toggled: 'oxy-off-canvas-toggled',
            bodyToggled: 'off-canvas-toggled'
        },
        
        // Keywords to identify discover more buttons
        discoverKeywords: ['discover', 'more', 'services', 'contact'],
        
        // Animation settings
        animation: {
            duration: 300, // milliseconds
            easing: 'ease-in-out'
        }
    };
    
    // Main ContactModal class
    class ContactModal {
        constructor() {
            this.offCanvas = null;
            this.isInitialized = false;
            this.eventListeners = [];
            
            this.init();
        }
        
        /**
         * Initialize the contact modal system
         */
        init() {
            // Wait for DOM to be ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.setup());
            } else {
                this.setup();
            }
        }
        
        /**
         * Setup the modal system
         */
        setup() {
            try {
                // Find the off-canvas element
                this.offCanvas = document.querySelector(CONFIG.selectors.offCanvas);
                
                if (!this.offCanvas) {
                    console.warn('ContactModal: Off-canvas element not found');
                    return;
                }
                
                // Add event listeners
                this.addTriggerListeners();
                this.addCloseListeners();
                this.addKeyboardListeners();
                
                // Make functions globally available
                this.exposeGlobalFunctions();
                
                // Convert legacy modal triggers
                this.convertLegacyTriggers();
                
                this.isInitialized = true;
                console.log('ContactModal: Successfully initialized');
                
            } catch (error) {
                console.error('ContactModal: Initialization failed', error);
            }
        }
        
        /**
         * Add event listeners to trigger elements
         */
        addTriggerListeners() {
            // 1. Phone/Contact icons in header
            this.addListenersToElements(
                CONFIG.selectors.phoneIcons,
                (element) => {
                    element.style.cursor = 'pointer';
                    return this.openModal.bind(this);
                }
            );
            
            // 2. Contact links in footer
            this.addListenersToElements(
                CONFIG.selectors.contactLinks,
                () => this.openModal.bind(this)
            );
            
            // 3. Discover More buttons
            this.addListenersToElements(
                CONFIG.selectors.discoverButtons,
                (element) => {
                    const buttonText = element.textContent.toLowerCase();
                    const isDiscoverButton = CONFIG.discoverKeywords.some(keyword => 
                        buttonText.includes(keyword)
                    );
                    
                    return isDiscoverButton ? this.openModal.bind(this) : null;
                }
            );
        }
        
        /**
         * Add event listeners to a set of elements
         */
        addListenersToElements(selector, callbackFactory) {
            const elements = document.querySelectorAll(selector);
            
            elements.forEach(element => {
                const callback = callbackFactory(element);
                if (callback) {
                    const listener = (e) => {
                        e.preventDefault();
                        callback();
                    };
                    
                    element.addEventListener('click', listener);
                    this.eventListeners.push({ element, event: 'click', listener });
                }
            });
        }
        
        /**
         * Add close event listeners
         */
        addCloseListeners() {
            // Backdrop click
            const backdrop = document.querySelector(CONFIG.selectors.backdrop);
            if (backdrop) {
                const listener = () => this.closeModal();
                backdrop.addEventListener('click', listener);
                this.eventListeners.push({ element: backdrop, event: 'click', listener });
            }
            
            // Close button click
            const closeButton = document.querySelector(CONFIG.selectors.closeButton);
            if (closeButton) {
                const listener = () => this.closeModal();
                closeButton.addEventListener('click', listener);
                this.eventListeners.push({ element: closeButton, event: 'click', listener });
            }
        }
        
        /**
         * Add keyboard event listeners
         */
        addKeyboardListeners() {
            const listener = (e) => {
                if (e.key === 'Escape' && this.isOpen()) {
                    this.closeModal();
                }
            };
            
            document.addEventListener('keydown', listener);
            this.eventListeners.push({ element: document, event: 'keydown', listener });
        }
        
        /**
         * Convert legacy modal triggers to off-canvas
         */
        convertLegacyTriggers() {
            const modalTriggers = document.querySelectorAll(CONFIG.selectors.modalTriggers);
            
            modalTriggers.forEach(trigger => {
                // Remove onclick attribute
                trigger.removeAttribute('onclick');
                
                // Add new event listener
                const listener = (e) => {
                    e.preventDefault();
                    this.openModal();
                };
                
                trigger.addEventListener('click', listener);
                this.eventListeners.push({ element: trigger, event: 'click', listener });
            });
        }
        
        /**
         * Open the modal
         */
        openModal() {
            if (!this.offCanvas) return;
            
            try {
                this.offCanvas.classList.add(CONFIG.classes.toggled);
                document.body.classList.add(CONFIG.classes.bodyToggled);
                
                // Trigger custom event
                this.dispatchEvent('modal:opened');
                
            } catch (error) {
                console.error('ContactModal: Failed to open modal', error);
            }
        }
        
        /**
         * Close the modal
         */
        closeModal() {
            if (!this.offCanvas) return;
            
            try {
                this.offCanvas.classList.remove(CONFIG.classes.toggled);
                document.body.classList.remove(CONFIG.classes.bodyToggled);
                
                // Trigger custom event
                this.dispatchEvent('modal:closed');
                
            } catch (error) {
                console.error('ContactModal: Failed to close modal', error);
            }
        }
        
        /**
         * Check if modal is open
         */
        isOpen() {
            return this.offCanvas && this.offCanvas.classList.contains(CONFIG.classes.toggled);
        }
        
        /**
         * Toggle modal state
         */
        toggleModal() {
            if (this.isOpen()) {
                this.closeModal();
            } else {
                this.openModal();
            }
        }
        
        /**
         * Dispatch custom events
         */
        dispatchEvent(eventName, detail = {}) {
            const event = new CustomEvent(eventName, {
                detail: { ...detail, modal: this }
            });
            document.dispatchEvent(event);
        }
        
        /**
         * Expose global functions for backward compatibility
         */
        exposeGlobalFunctions() {
            // Make functions globally available
            window.openOffCanvas = this.openModal.bind(this);
            window.openModal = this.openModal.bind(this); // Backward compatibility
            window.closeOffCanvas = this.closeModal.bind(this);
            window.closeModal = this.closeModal.bind(this); // Backward compatibility
            window.toggleOffCanvas = this.toggleModal.bind(this);
            window.toggleModal = this.toggleModal.bind(this); // Backward compatibility
            
            // Expose the instance for advanced usage
            window.ContactModal = this;
        }
        
        /**
         * Update configuration
         */
        updateConfig(newConfig) {
            Object.assign(CONFIG, newConfig);
        }
        
        /**
         * Get current configuration
         */
        getConfig() {
            return { ...CONFIG };
        }
        
        /**
         * Destroy the modal instance and clean up
         */
        destroy() {
            // Remove all event listeners
            this.eventListeners.forEach(({ element, event, listener }) => {
                element.removeEventListener(event, listener);
            });
            
            // Clear references
            this.eventListeners = [];
            this.offCanvas = null;
            this.isInitialized = false;
            
            // Remove global functions
            delete window.openOffCanvas;
            delete window.openModal;
            delete window.closeOffCanvas;
            delete window.closeModal;
            delete window.toggleOffCanvas;
            delete window.toggleModal;
            delete window.ContactModal;
        }
    }
    
    // Auto-initialize when script loads
    const contactModal = new ContactModal();
    
    // Export for module systems if available
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = ContactModal;
    }
    
    // Export for AMD if available
    if (typeof define === 'function' && define.amd) {
        define([], function() {
            return ContactModal;
        });
    }
    
})();
