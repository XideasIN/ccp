/**
 * Automated Test Runner for Enhanced Contact Modal
 * 
 * This script can be run in the browser console to automatically
 * test the enhanced contact modal functionality.
 * 
 * Usage: Copy and paste this script into the browser console
 * when viewing ReBuild/indexCopy.html
 */

(function() {
    'use strict';
    
    console.log('🧪 Starting Enhanced Contact Modal Test Suite...');
    
    const testResults = {
        passed: 0,
        failed: 0,
        total: 0,
        details: []
    };
    
    function runTest(testName, testFunction) {
        testResults.total++;
        try {
            const result = testFunction();
            if (result) {
                testResults.passed++;
                testResults.details.push({ test: testName, status: 'PASS', message: 'Test passed' });
                console.log(`✅ ${testName}: PASS`);
            } else {
                testResults.failed++;
                testResults.details.push({ test: testName, status: 'FAIL', message: 'Test failed' });
                console.log(`❌ ${testName}: FAIL`);
            }
        } catch (error) {
            testResults.failed++;
            testResults.details.push({ test: testName, status: 'ERROR', message: error.message });
            console.log(`❌ ${testName}: ERROR - ${error.message}`);
        }
    }
    
    // Test 1: Check if enhanced modal is initialized
    runTest('Enhanced Modal Initialization', () => {
        return typeof window.EnhancedContactModal !== 'undefined' && 
               window.EnhancedContactModal.isInitialized;
    });
    
    // Test 2: Check if global functions are available
    runTest('Global Functions Available', () => {
        return typeof window.openOffCanvas === 'function' &&
               typeof window.closeOffCanvas === 'function' &&
               typeof window.toggleOffCanvas === 'function' &&
               typeof window.openModal === 'function' &&
               typeof window.closeModal === 'function' &&
               typeof window.toggleModal === 'function';
    });
    
    // Test 3: Check if off-canvas element exists
    runTest('Off-Canvas Element Exists', () => {
        const offCanvas = document.querySelector('.oxy-off-canvas');
        return offCanvas !== null;
    });
    
    // Test 4: Check if contact form exists
    runTest('Contact Form Exists', () => {
        const contactForm = document.querySelector('#contactFormOffCanvas');
        return contactForm !== null;
    });
    
    // Test 5: Check if backdrop exists
    runTest('Backdrop Element Exists', () => {
        const backdrop = document.querySelector('.oxy-offcanvas_backdrop');
        return backdrop !== null;
    });
    
    // Test 6: Check if close button exists
    runTest('Close Button Exists', () => {
        const closeButton = document.querySelector('.oxy-off-canvas .ct-fancy-icon');
        return closeButton !== null;
    });
    
    // Test 7: Test modal opening
    runTest('Modal Opening', () => {
        if (typeof window.openOffCanvas === 'function') {
            window.openOffCanvas();
            const offCanvas = document.querySelector('.oxy-off-canvas');
            return offCanvas && offCanvas.classList.contains('oxy-off-canvas-toggled');
        }
        return false;
    });
    
    // Test 8: Test modal closing
    runTest('Modal Closing', () => {
        if (typeof window.closeOffCanvas === 'function') {
            window.closeOffCanvas();
            const offCanvas = document.querySelector('.oxy-off-canvas');
            return offCanvas && !offCanvas.classList.contains('oxy-off-canvas-toggled');
        }
        return false;
    });
    
    // Test 9: Test toggle functionality
    runTest('Modal Toggle', () => {
        if (typeof window.toggleOffCanvas === 'function') {
            const initialState = window.EnhancedContactModal.isOpen();
            window.toggleOffCanvas();
            const newState = window.EnhancedContactModal.isOpen();
            return newState !== initialState;
        }
        return false;
    });
    
    // Test 10: Check trigger elements
    runTest('Trigger Elements Detection', () => {
        const phoneIcons = document.querySelectorAll('.contact-links .ct-fancy-icon[class*="envelope"], .contact-link-parent .ct-fancy-icon[class*="envelope"]');
        const contactLinks = document.querySelectorAll('.footer-about a[href*="contact"], .footer-about a[href*="mailto"], .footer-contact-link-text');
        const discoverButtons = document.querySelectorAll('a[href*="services"], .ct-link-button, .btn');
        
        return phoneIcons.length > 0 || contactLinks.length > 0 || discoverButtons.length > 0;
    });
    
    // Test 11: Check performance metrics
    runTest('Performance Metrics Available', () => {
        if (window.EnhancedContactModal) {
            const metrics = window.EnhancedContactModal.getPerformanceMetrics();
            return typeof metrics === 'object' && 
                   typeof metrics.initTime === 'number' &&
                   typeof metrics.triggerCount === 'number';
        }
        return false;
    });
    
    // Test 12: Check configuration
    runTest('Configuration Available', () => {
        if (window.EnhancedContactModal) {
            const config = window.EnhancedContactModal.getConfig();
            return typeof config === 'object' && 
                   typeof config.selectors === 'object' &&
                   typeof config.classes === 'object';
        }
        return false;
    });
    
    // Test 13: Test event system
    runTest('Event System Working', () => {
        let eventReceived = false;
        
        const eventListener = (e) => {
            eventReceived = true;
        };
        
        document.addEventListener('modal:opened', eventListener);
        window.openOffCanvas();
        
        setTimeout(() => {
            document.removeEventListener('modal:opened', eventListener);
        }, 100);
        
        return eventReceived;
    });
    
    // Test 14: Test keyboard support
    runTest('Keyboard Support', () => {
        window.openOffCanvas();
        
        // Simulate Escape key press
        const escapeEvent = new KeyboardEvent('keydown', {
            key: 'Escape',
            code: 'Escape',
            keyCode: 27,
            which: 27
        });
        
        document.dispatchEvent(escapeEvent);
        
        // Check if modal is closed
        return !window.EnhancedContactModal.isOpen();
    });
    
    // Test 15: Test backdrop click
    runTest('Backdrop Click Support', () => {
        window.openOffCanvas();
        
        const backdrop = document.querySelector('.oxy-offcanvas_backdrop');
        if (backdrop) {
            backdrop.click();
            return !window.EnhancedContactModal.isOpen();
        }
        return false;
    });
    
    // Display results
    setTimeout(() => {
        console.log('\n📊 Test Results Summary:');
        console.log(`Total Tests: ${testResults.total}`);
        console.log(`Passed: ${testResults.passed}`);
        console.log(`Failed: ${testResults.failed}`);
        console.log(`Success Rate: ${((testResults.passed / testResults.total) * 100).toFixed(1)}%`);
        
        if (testResults.failed > 0) {
            console.log('\n❌ Failed Tests:');
            testResults.details
                .filter(test => test.status !== 'PASS')
                .forEach(test => {
                    console.log(`  - ${test.test}: ${test.status} - ${test.message}`);
                });
        }
        
        if (testResults.passed === testResults.total) {
            console.log('\n🎉 All tests passed! The enhanced contact modal is working correctly.');
        } else {
            console.log('\n⚠️ Some tests failed. Please check the implementation.');
        }
        
        // Display performance metrics
        if (window.EnhancedContactModal) {
            const metrics = window.EnhancedContactModal.getPerformanceMetrics();
            console.log('\n📈 Performance Metrics:');
            console.log(`  Initialization Time: ${metrics.initTime.toFixed(2)}ms`);
            console.log(`  Trigger Elements Found: ${metrics.triggerCount}`);
            console.log(`  Modal Opens: ${metrics.openCount}`);
            console.log(`  Modal Closes: ${metrics.closeCount}`);
        }
        
    }, 1000);
    
    return testResults;
})();