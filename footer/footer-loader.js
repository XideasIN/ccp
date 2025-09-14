/**
 * Centralized Footer Loader Script
 * This script loads the footer.html file into any element with id="footer-container"
 * Usage: Include this script in any page that needs the centralized footer
 */

(function() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadFooter);
    } else {
        loadFooter();
    }

    function loadFooter() {
        const footerContainer = document.getElementById('footer-container');
        if (!footerContainer) {
            console.warn('Footer container not found. Make sure you have <div id="footer-container"></div> in your HTML.');
            return;
        }

        // Determine the correct path to footer.html based on current page location
        const currentPath = window.location.pathname;
        let footerPath = 'footer.html';
        
        // If we're in a subdirectory, adjust the path
        if (currentPath.includes('/')) {
            const pathDepth = (currentPath.match(/\//g) || []).length - 1;
            if (pathDepth > 0) {
                footerPath = '../'.repeat(pathDepth) + 'footer.html';
            }
        }

        // Load the footer
        fetch(footerPath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                footerContainer.innerHTML = html;
                console.log('Footer loaded successfully');
            })
            .catch(error => {
                console.error('Error loading footer:', error);
                // Fallback footer content
                footerContainer.innerHTML = `
                    <footer style="background-color: #17374b; color: white; padding: 40px 0; text-align: center;">
                        <div style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
                            <p>&copy; 2025 Coral Capital Panama. All rights reserved.</p>
                            <p>Torre Inteligente, Pisos 31, Oficina 3101, Calle 50, Panama City, Panama</p>
                            <p>Email: info@coralcapitalpanama.com | Phone: +507-836-5886</p>
                        </div>
                    </footer>
                `;
            });
    }
})();