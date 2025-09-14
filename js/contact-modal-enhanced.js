/**
 * Enhanced Centralized Contact Modal Script
 * Version: 3.0.0 - Clean and Simple
 * 
 * Features:
 * - Clean modal layout matching index-2.html
 * - Proper header with logo and close button
 * - Well-structured form layout
 * - Cross-browser compatibility
 * 
 * Usage: <script src="js/contact-modal-enhanced.js"></script>
 */

(function() {
    'use strict';
    
    // Configuration
    const CONFIG = {
        selectors: {
            phoneIcons: 'svg use[xlink\\:href="#FontawesomeProicon-phone1"], .ct-fancy-icon svg use[xlink\\:href="#FontawesomeProicon-phone1"]',
            contactLinks: 'a[href*="contact"], a[href*="enquiry"], .footer-link-item',
            discoverButtons: 'a[href*="discover"], .btn[href*="enquiry"]',
            offCanvas: '.oxy-off-canvas',
            backdrop: '.oxy-offcanvas_backdrop',
            closeButton: '.oxy-off-canvas .ct-fancy-icon'
        },
        classes: {
            toggled: 'oxy-off-canvas-toggled',
            bodyToggled: 'off-canvas-toggled'
        }
    };

    // Create the modal content
    function createModalContent() {
        return `
            <div class="contact-modal-content" style="background-color: #0A3140; color: white; padding: 0; margin: 0; width: 100%; height: 100%; overflow-y: auto;">
                <!-- Header with Logo and Close Button -->
                <div class="modal-header" style="background: #0A3140; padding: 20px; border-bottom: 1px solid rgba(255,255,255,0.1); position: relative;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <img src="wp-content/logo/Logo_white.png" alt="CCP" style="height: 50px;">
                        <button class="close-modal" style="background: none; border: none; color: white; font-size: 24px; cursor: pointer; padding: 5px;">&times;</button>
                    </div>
                </div>
                
                <!-- Modal Body -->
                <div class="modal-body" style="padding: 30px;">
                    <!-- Contact Information -->
                    <div class="contact-info" style="margin-bottom: 30px;">
                        <p style="color: white; font-size: 14px; line-height: 1.6; margin: 0;">If you would like to talk to one of our partners about how we can help your business, please contact us today using the details below. Alternatively, send us a message and we will get back to you within 24 hours.</p>
                    </div>
                    
                    <!-- Contact Form -->
                    <form id="contactForm" style="display: flex; flex-direction: column; gap: 20px;">
                        <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                            <div style="flex: 1; min-width: 250px;">
                                <label for="name" style="display: block; margin-bottom: 5px; font-weight: 500; color: white;">Name <span style="color: #A99168;">•</span></label>
                                <input type="text" id="name" name="name" required style="width: 100%; padding: 12px; border: 2px solid #e1e1e1; border-radius: 5px; font-size: 16px; transition: border-color 0.3s;">
                            </div>
                            <div style="flex: 1; min-width: 250px;">
                                <label for="email" style="display: block; margin-bottom: 5px; font-weight: 500; color: white;">Email <span style="color: #A99168;">•</span></label>
                                <input type="email" id="email" name="email" required style="width: 100%; padding: 12px; border: 2px solid #e1e1e1; border-radius: 5px; font-size: 16px; transition: border-color 0.3s;">
                            </div>
                        </div>
                        <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                            <div style="flex: 1; min-width: 250px;">
                                <label for="phone" style="display: block; margin-bottom: 5px; font-weight: 500; color: white;">Phone <span style="color: #A99168;">•</span></label>
                                <input type="tel" id="phone" name="phone" required style="width: 100%; padding: 12px; border: 2px solid #e1e1e1; border-radius: 5px; font-size: 16px; transition: border-color 0.3s;">
                            </div>
                            <div style="flex: 1; min-width: 250px;">
                                <label for="company" style="display: block; margin-bottom: 5px; font-weight: 500; color: white;">Company <span style="color: #A99168;">•</span></label>
                                <input type="text" id="company" name="company" required style="width: 100%; padding: 12px; border: 2px solid #e1e1e1; border-radius: 5px; font-size: 16px; transition: border-color 0.3s;">
                            </div>
                        </div>
                        <div>
                            <label for="message" style="display: block; margin-bottom: 5px; font-weight: 500; color: white;">Message <span style="color: #A99168;">•</span></label>
                            <textarea id="message" name="message" rows="4" required style="width: 100%; padding: 12px; border: 2px solid #e1e1e1; border-radius: 5px; font-size: 16px; resize: vertical; transition: border-color 0.3s;"></textarea>
                        </div>
                        <div style="margin-top: 10px;">
                            <button type="submit" style="width: 100%; padding: 12px 24px; background: #007cba; color: white; border: none; border-radius: 5px; font-size: 16px; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;">Send Message</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
    }

    // Open the modal
    function openModal(e) {
        console.log('Opening contact modal...');
        
        // Prevent the old off-canvas modal from opening
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        // Remove any existing modals
        const existingModal = document.getElementById('contact-modal-overlay');
        if (existingModal) {
            existingModal.remove();
        }
        
        // Disable the old off-canvas modal
        const offCanvas = document.querySelector('.oxy-off-canvas');
        if (offCanvas) {
            offCanvas.style.display = 'none';
        }
        
        // Create a new modal overlay
        const modalOverlay = document.createElement('div');
        modalOverlay.id = 'contact-modal-overlay';
        modalOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.5);
            z-index: 9999;
            display: flex;
            justify-content: center;
            align-items: center;
        `;
        
        // Create modal content
        const modalContent = document.createElement('div');
        modalContent.innerHTML = createModalContent();
        modalContent.style.cssText = `
            background-color: #0A3140;
            color: white;
            padding: 0;
            margin: 0;
            width: 90%;
            max-width: 600px;
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            position: relative;
        `;
        
        modalOverlay.appendChild(modalContent);
        document.body.appendChild(modalOverlay);
        
        // Add event listeners
        setupModalEvents(modalOverlay, modalContent);
        
        console.log('Modal opened successfully');
    }

    // Close the modal
    function closeModal() {
        console.log('Closing contact modal...');
        
        const modalOverlay = document.getElementById('contact-modal-overlay');
        if (modalOverlay) {
            modalOverlay.remove();
        }
        
        console.log('Modal closed successfully');
    }

    // Setup modal event listeners
    function setupModalEvents(modalOverlay, modalContent) {
        // Close button
        const closeBtn = modalContent.querySelector('.close-modal');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }
        
        // Backdrop click
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
        
        // Form submission
        const form = modalContent.querySelector('#contactForm');
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form data
                const formData = new FormData(form);
                const data = Object.fromEntries(formData);
                
                // Create mailto link
                const subject = 'Contact Form Submission';
                const body = `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nCompany: ${data.company}\nMessage: ${data.message}`;
                const mailtoLink = `mailto:info@coralcapitalpanama.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                
                // Open email client
                window.location.href = mailtoLink;
                
                // Close modal
                closeModal();
            });
        }
    }

    // Bind to trigger elements
    function bindToTriggers() {
        console.log('Binding to trigger elements...');
        
        // Phone icons - look for any clickable elements with phone icons
        const phoneElements = document.querySelectorAll('svg use[xlink\\:href="#FontawesomeProicon-phone1"], .ct-fancy-icon svg use[xlink\\:href="#FontawesomeProicon-phone1"]');
        phoneElements.forEach(element => {
            const trigger = element.closest('a, button, div, .ct-fancy-icon, .ct-link');
            if (trigger && !trigger.dataset.boundContactOpen) {
                trigger.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    openModal();
                });
                trigger.dataset.boundContactOpen = 'true';
                console.log('Bound phone icon trigger');
            }
        });
        
        // Contact links - only bind to specific contact links, not navigation links to enquiry page
        const contactElements = document.querySelectorAll('a[href*="contact"], a[href*="enquiry"]');
        contactElements.forEach(element => {
            // Skip links that properly navigate to the enquiry page
            if (element.href.includes('/enquiry/index.html') || element.href.endsWith('/enquiry/')) {
                return; // Don't bind modal to proper navigation links
            }
            
            if (!element.dataset.boundContactOpen) {
                element.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    openModal();
                });
                element.dataset.boundContactOpen = 'true';
                console.log('Bound contact link trigger');
            }
        });
        
        // Also bind to elements that contain "Contact" text, but exclude footer navigation links
        const allLinks = document.querySelectorAll('a');
        allLinks.forEach(element => {
            if (element.textContent.toLowerCase().includes('contact') && 
                !element.dataset.boundContactOpen &&
                !element.closest('.footer-nav') &&
                !element.closest('.footer-links') &&
                !element.closest('footer') &&
                !element.href.includes('terms-and-conditions') &&
                !element.href.includes('privacy-policy') &&
                !element.href.includes('about') &&
                !element.href.includes('team') &&
                !element.href.includes('sectors') &&
                !element.href.includes('international')) {
                element.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    openModal();
                });
                element.dataset.boundContactOpen = 'true';
                console.log('Bound contact text link trigger');
            }
        });
        
        // Discover buttons - look for specific discover buttons, not navigation links
        const discoverElements = document.querySelectorAll('a[href*="discover"], .btn[href*="enquiry"]');
        discoverElements.forEach(element => {
            if (!element.dataset.boundContactOpen) {
                element.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    openModal();
                });
                element.dataset.boundContactOpen = 'true';
                console.log('Bound discover button trigger');
            }
        });
        
        // Also bind to elements that contain "Discover" text, but exclude navigation links
        const allButtons = document.querySelectorAll('a, button');
        allButtons.forEach(element => {
            if (element.textContent.toLowerCase().includes('discover') && 
                !element.dataset.boundContactOpen &&
                !element.closest('.footer-nav') &&
                !element.closest('.footer-links') &&
                !element.closest('footer') &&
                !element.closest('nav') &&
                !element.closest('.navigation') &&
                (element.textContent.toLowerCase().includes('discover more') || 
                 element.classList.contains('discover-btn') ||
                 element.id.includes('discover') ||
                 element.classList.contains('cta-button'))) {
                element.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    openModal();
                });
                element.dataset.boundContactOpen = 'true';
                console.log('Bound discover text button trigger');
            }
        });
        
        // Also bind to any elements that might be triggering the old off-canvas modal
        const offCanvasTriggers = document.querySelectorAll('[data-trigger-selector], .menu-button, [onclick*="openOffCanvas"]');
        offCanvasTriggers.forEach(element => {
            if (!element.dataset.boundContactOpen) {
                element.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    openModal();
                });
                element.dataset.boundContactOpen = 'true';
                console.log('Bound off-canvas trigger');
            }
        });
    }

    // Initialize
    function init() {
        console.log('Initializing contact modal...');
        
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', bindToTriggers);
        } else {
            bindToTriggers();
        }
        
        // Also try after a delay to catch dynamically loaded elements
        setTimeout(bindToTriggers, 1000);
    }

    // Global functions
    window.openModal = openModal;
    window.closeModal = closeModal;
    window.openOffCanvas = openModal;
    window.closeOffCanvas = closeModal;

    // Initialize when script loads
    init();

})();
