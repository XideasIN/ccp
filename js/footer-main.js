/**
 * Centralized Footer System - Main Script
 * Based on the footer structure with #0A3140 background color
 * This script creates and manages a centralized footer for all pages
 */

(function() {
    'use strict';

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeFooter);
    } else {
        initializeFooter();
    }

    function initializeFooter() {
        const footerContainer = document.getElementById('footer-main-container');
        if (!footerContainer) {
            console.warn('Footer container not found. Make sure you have <div id="footer-main-container"></div> in your HTML.');
            return;
        }

        // Determine the correct path based on current page location
        const currentPath = window.location.pathname;
        let basePath = '';
        
        // Calculate relative path depth
        if (currentPath.includes('/')) {
            const pathDepth = (currentPath.match(/\//g) || []).length - 1;
            if (pathDepth > 0) {
                basePath = '../'.repeat(pathDepth);
            }
        }

        // Create the footer HTML with #0A3140 background
        const footerHTML = createFooterHTML(basePath);
        
        // Insert footer into container
        footerContainer.innerHTML = footerHTML;
        
        // Add footer styles
        addFooterStyles();
        
        // Initialize footer functionality
        initializeFooterFunctionality();
        
        console.log('Centralized footer loaded successfully with #0A3140 background');
    }

    function createFooterHTML(basePath) {
        return `
        <div id="div_block-198-8" class="ct-div-block footer-main" style="background-color: #0A3140 !important;">
            <div id="new_columns-199-8" class="ct-new-columns footer-inner">
                <div id="div_block-200-8" class="ct-div-block footer-column">
                    <div id="div_block-201-8" class="ct-div-block footer-logo-section">
                        <div id="div_block-202-8" class="ct-div-block footer-logo">
                            <a id="link-204-8" class="ct-link" href="${basePath}index.html" target="_self">
                                <img id="image-205-8" alt="CCP Logo" src="${basePath}wp-content/logo/QUERCUS_10thAnniversary-Logo_03.png" class="ct-image footer-logo-img">
                            </a>
                        </div>
                        <div id="div_block-206-8" class="ct-div-block footer-contact-info">
                            <div id="div_block-207-8" class="ct-div-block contact-item">
                                <div id="fancy_icon-208-8" class="ct-fancy-icon contact-icon">
                                    <svg id="svg-fancy_icon-208-8" width="20" height="20" fill="#B1976B" viewBox="0 0 24 24">
                                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                                    </svg>
                                </div>
                                <div id="text_block-209-8" class="ct-text-block contact-text">
                                    <span id="span-324-8" class="ct-span">info@coralcapitalpanama.com</span>
                                </div>
                            </div>
                            <div id="div_block-283-8" class="ct-div-block contact-item">
                                <div id="fancy_icon-284-8" class="ct-fancy-icon contact-icon">
                                    <svg id="svg-fancy_icon-284-8" width="20" height="20" fill="#B1976B" viewBox="0 0 24 24">
                                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                                    </svg>
                                </div>
                                <div id="text_block-286-8" class="ct-text-block contact-text">
                                    <span id="span-325-8" class="ct-span">Torre Inteligente,</span><br>
                                    <span id="span-326-8" class="ct-span">Piso 31, Oficina 3101</span><br>
                                    <span id="span-327-8" class="ct-span">Calle 50, Panama City</span><br>
                                    <span id="span-329-8" class="ct-span">Panama</span>
                                </div>
                            </div>
                            <div id="div_block-287-8" class="ct-div-block contact-item">
                                <div id="fancy_icon-288-8" class="ct-fancy-icon contact-icon">
                                    <svg id="svg-fancy_icon-288-8" width="20" height="20" fill="#B1976B" viewBox="0 0 24 24">
                                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                                    </svg>
                                </div>
                                <div id="text_block-289-8" class="ct-text-block contact-text">
                                    <span id="span-330-8" class="ct-span">+507-836-5886</span>
                                </div>
                            </div>
                            <div id="div_block-290-8" class="ct-div-block footer-cta">
                                <a id="link_text-291-8" class="ct-link-text footer-discover-btn contact-modal-trigger" href="#" target="_self">
                                    <span id="span-331-8" class="ct-span">DISCOVER MORE</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="div_block-212-8" class="ct-div-block footer-column">
                    <div id="div_block-213-8" class="ct-div-block footer-section">
                        <div id="text_block-214-8" class="ct-text-block footer-title">
                            <span id="span-332-8" class="ct-span">Site Pages</span>
                        </div>
                        <div id="div_block-216-8" class="ct-div-block footer-links">
                            <a id="link_text-215-8" class="ct-link-text footer-link" href="${basePath}index.html" target="_self">
                                <span id="span-333-8" class="ct-span">Home</span>
                            </a>
                            <a id="link_text-217-8" class="ct-link-text footer-link" href="${basePath}about-us/index.html" target="_self">
                                <span id="span-334-8" class="ct-span">About</span>
                            </a>
                            <a id="link_text-937-8" class="ct-link-text footer-link" href="${basePath}team/index.html" target="_self">
                                <span id="span-335-8" class="ct-span">Team</span>
                            </a>
                            <a id="link_text-218-8" class="ct-link-text footer-link" href="${basePath}sectors/index.html" target="_self">
                                <span id="span-336-8" class="ct-span">Services</span>
                            </a>
                            <a id="link_text-221-8" class="ct-link-text footer-link" href="${basePath}international/index.html" target="_self">
                                <span id="span-337-8" class="ct-span">International</span>
                            </a>
                            <a id="link_text-222-8" class="ct-link-text footer-link" href="${basePath}privacy-policy/index.html" target="_self">
                                <span id="span-338-8" class="ct-span">Privacy policy</span>
                            </a>
                            <a id="link_text-620-8" class="ct-link-text footer-link" href="${basePath}terms-and-conditions/index.html" target="_self">
                                <span id="span-339-8" class="ct-span">Terms and conditions</span>
                            </a>
                            <a id="link_text-623-8" class="ct-link-text footer-link contact-modal-trigger" href="#" target="_self">
                                <span id="span-340-8" class="ct-span">Contact</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div id="div_block-223-8" class="ct-div-block footer-column">
                    <div id="div_block-224-8" class="ct-div-block footer-section">
                        <div id="text_block-225-8" class="ct-text-block footer-title">
                            <span id="span-341-8" class="ct-span">Latest Posts</span>
                        </div>
                        <div id="div_block-226-8" class="ct-div-block footer-posts">
                            <div id="div_block-227-8" class="ct-div-block footer-post-item">
                                <div id="div_block-228-8" class="ct-div-block post-img">
                                    <a id="link-230-8" class="ct-link footer-post-img-parent" href="#anchor" target="_self">
                                        <img id="image-231-8" alt="" src="${basePath}wp-content/uploads/2024/06/Metalwash.png" class="ct-image footer-post-img">
                                    </a>
                                </div>
                                <div id="div_block-229-8" class="ct-div-block post-item">
                                    <a id="link_text-232-8" class="ct-link-text footer-post-title" href="#anchor" target="_self">
                                        <span id="span-342-8" class="ct-span">Provided Loan facility to Metalcare for equipment importation</span>
                                    </a>
                                    <div id="div_block-236-8" class="ct-div-block footer-post-date">
                                        <div id="fancy_icon-238-8" class="ct-fancy-icon">
                                            <svg id="svg-fancy_icon-238-8" width="16" height="16" fill="#B1976B" viewBox="0 0 24 24">
                                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/>
                                            </svg>
                                        </div>
                                        <div id="text_block-234-8" class="ct-text-block post-date-footer">
                                            <span id="span-343-8" class="ct-span">June 24, 2024</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="div_block-241-8" class="ct-div-block footer-post-item">
                                <div id="div_block-242-8" class="ct-div-block post-img">
                                    <a id="link-244-8" class="ct-link footer-post-img-parent" href="#anchor" target="_self">
                                        <img id="image-245-8" alt="" src="${basePath}wp-content/uploads/2024/05/Amazilia-Aerospace-2.jpg" class="ct-image footer-post-img">
                                    </a>
                                </div>
                                <div id="div_block-243-8" class="ct-div-block post-item">
                                    <a id="link_text-246-8" class="ct-link-text footer-post-title" href="#anchor" target="_self">
                                        <span id="span-344-8" class="ct-span">Support on the sale of Amazilia Aerospace</span>
                                    </a>
                                    <div id="div_block-250-8" class="ct-div-block footer-post-date">
                                        <div id="fancy_icon-252-8" class="ct-fancy-icon">
                                            <svg id="svg-fancy_icon-252-8" width="16" height="16" fill="#B1976B" viewBox="0 0 24 24">
                                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/>
                                            </svg>
                                        </div>
                                        <div id="text_block-248-8" class="ct-text-block post-date-footer">
                                            <span id="span-345-8" class="ct-span">May 29, 2024</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="div_block-285-8" class="ct-div-block footer-post-item">
                                <div id="div_block-271-8" class="ct-div-block post-img">
                                    <a id="link-274-8" class="ct-link footer-post-img-parent" href="#anchor" target="_self">
                                        <img id="image-275-8" alt="" src="${basePath}wp-content/uploads/2021/03/993526_CropCompressImage_1920x550_25_030221-1024x293.jpg" class="ct-image footer-post-img">
                                    </a>
                                </div>
                                <div id="div_block-273-8" class="ct-div-block post-item">
                                    <a id="link_text-276-8" class="ct-link-text footer-post-title" href="#anchor" target="_self">
                                        <span id="span-346-8" class="ct-span">Our Client invests in HRO Solutions Group</span>
                                    </a>
                                    <div id="div_block-280-8" class="ct-div-block footer-post-date">
                                        <div id="fancy_icon-282-8" class="ct-fancy-icon">
                                            <svg id="svg-fancy_icon-282-8" width="16" height="16" fill="#B1976B" viewBox="0 0 24 24">
                                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/>
                                            </svg>
                                        </div>
                                        <div id="text_block-278-8" class="ct-text-block post-date-footer">
                                            <span id="span-347-8" class="ct-span">April 23, 2024</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Footer Bottom -->
            <div id="div_block-210-8" class="ct-div-block footer-bottom">
                <div id="new_columns-256-8" class="ct-new-columns footer-bottom-inner">
                    <div id="div_block-257-8" class="ct-div-block">
                        <p id="text_block-259-8" class="ct-text-block copyright-text">© Copyright 2025 Coral Capital Panama Limited. All Rights Reserved.</p>
                    </div>
                    <div id="div_block-258-8" class="ct-div-block">
                        <div id="div_block-262-8" class="ct-div-block social-link-footer">
                            <a id="link-263-8" class="ct-link footer-social-link" href="#" target="_self">
                                <div id="fancy_icon-264-8" class="ct-fancy-icon">
                                    <svg id="svg-fancy_icon-264-8" width="24" height="24" fill="#B1976B" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                    </svg>
                                </div>
                            </a>
                            <a id="link-265-8" class="ct-link footer-social-link" href="#" onclick="window.scrollTo({top: 0, behavior: 'smooth'}); return false;" target="_self">
                                <div id="fancy_icon-266-8" class="ct-fancy-icon" style="color: #B1976B;">
                                    <svg id="svg-fancy_icon-266-8" width="24" height="24" viewBox="0 0 16 16" fill="currentColor">
                                        <path d="M8 4l-4 4h3v4h2V8h3L8 4z"/>
                                    </svg>
                                </div>
                            </a>
                            <a id="link-267-8" class="ct-link footer-social-link" href="#" target="_self">
                                <div id="fancy_icon-268-8" class="ct-fancy-icon">
                                    <svg id="svg-fancy_icon-268-8" width="24" height="24" fill="#B1976B" viewBox="0 0 24 24">
                                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.221.083.402-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                                    </svg>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    }

    function addFooterStyles() {
        const styles = `
        <style id="footer-main-styles">
        /* Footer Main Styles with #0A3140 background */
        .footer-main {
            background-color: #0A3140 !important;
            padding: 60px 0 0;
            color: white;
        }
        
        .footer-inner {
            display: flex;
            flex-wrap: wrap;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
            gap: 40px;
        }
        
        .footer-column {
            flex: 1;
            min-width: 280px;
        }
        
        .footer-logo-section {
            margin-bottom: 30px;
        }
        
        .footer-logo {
            margin-bottom: 25px;
        }
        
        .footer-logo-img {
            max-width: 180px;
            height: auto;
        }
        
        .footer-contact-info .contact-item {
            display: flex;
            align-items: flex-start;
            margin-bottom: 15px;
            gap: 12px;
        }
        
        .contact-icon {
            color: #B1976B;
            font-size: 16px;
            margin-top: 2px;
            flex-shrink: 0;
        }
        
        .contact-text {
            color: white;
            font-size: 14px;
            line-height: 1.5;
        }
        
        .footer-cta {
            margin-top: 25px;
        }
        
        .footer-discover-btn {
            background-color: #B1976B;
            color: #0A3140 !important;
            padding: 12px 24px;
            border-radius: 4px;
            text-decoration: none;
            font-weight: 600;
            font-size: 14px;
            text-transform: uppercase;
            display: inline-block;
            transition: all 0.3s ease;
        }
        
        .footer-discover-btn:hover {
            background-color: #8a7a5a;
            transform: translateY(-2px);
        }
        
        .footer-title {
            color: white;
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 20px;
            text-transform: uppercase;
        }
        
        .footer-links {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }
        
        .footer-link {
            color: #B0C4DE;
            text-decoration: none;
            font-size: 14px;
            transition: color 0.3s ease;
        }
        
        .footer-link:hover {
            color: #B1976B;
        }
        
        .footer-posts {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
        
        .footer-post-item {
            display: flex;
            gap: 15px;
        }
        
        .post-img {
            flex-shrink: 0;
        }
        
        .footer-post-img {
            width: 80px;
            height: 60px;
            object-fit: cover;
            border-radius: 4px;
        }
        
        .post-item {
            flex: 1;
        }
        
        .footer-post-title {
            color: white;
            text-decoration: none;
            font-size: 13px;
            line-height: 1.4;
            display: block;
            margin-bottom: 8px;
            transition: color 0.3s ease;
        }
        
        .footer-post-title:hover {
            color: #B1976B;
        }
        
        .footer-post-date {
            display: flex;
            align-items: center;
            gap: 6px;
        }
        
        .footer-post-date .ct-fancy-icon {
            color: #B1976B;
            font-size: 12px;
        }
        
        .post-date-footer {
            color: #B0C4DE;
            font-size: 12px;
        }
        
        .footer-bottom {
            background-color: rgba(0, 0, 0, 0.2);
            padding: 20px 0;
            margin-top: 40px;
        }
        
        .footer-bottom-inner {
            display: flex;
            justify-content: space-between;
            align-items: center;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }
        
        .copyright-text {
            color: #B0C4DE;
            font-size: 14px;
            margin: 0;
        }
        
        .social-link-footer {
            display: flex;
            gap: 15px;
        }
        
        .footer-social-link {
            color: #B0C4DE;
            font-size: 18px;
            transition: color 0.3s ease;
            text-decoration: none;
        }
        
        .footer-social-link:hover {
            color: #B1976B;
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
            .footer-inner {
                flex-direction: column;
                gap: 30px;
            }
            
            .footer-column {
                min-width: auto;
            }
            
            .footer-bottom-inner {
                flex-direction: column;
                gap: 15px;
                text-align: center;
            }
            
            .footer-post-item {
                gap: 12px;
            }
            
            .footer-post-img {
                width: 70px;
                height: 50px;
            }
        }
        
        @media (max-width: 480px) {
            .footer-main {
                padding: 40px 0 0;
            }
            
            .footer-inner {
                padding: 0 15px;
            }
            
            .footer-logo-img {
                max-width: 150px;
            }
            
            .footer-discover-btn {
                padding: 10px 20px;
                font-size: 13px;
            }
        }
        </style>
        `;
        
        if (!document.getElementById('footer-main-styles')) {
            document.head.insertAdjacentHTML('beforeend', styles);
        }
    }

    function initializeFooterFunctionality() {
        // Initialize contact modal triggers
        const contactTriggers = document.querySelectorAll('.contact-modal-trigger');
        contactTriggers.forEach(trigger => {
            trigger.addEventListener('click', function(e) {
                e.preventDefault();
                if (typeof window.openModal === 'function') {
                    window.openModal();
                } else {
                    console.warn('Contact modal function not found. Make sure contact-modal-enhanced.js is loaded.');
                }
            });
        });
    }

})();