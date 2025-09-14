/**
 * Console Test Script for ReBuild/indexCopy.html
 * 
 * Copy and paste this entire script into the browser console
 * when viewing ReBuild/indexCopy.html to test the enhanced modal functionality
 */

console.log('🧪 Starting Enhanced Contact Modal Test...');

// Test 1: Check if enhanced modal is loaded
console.log('\n1. Checking Enhanced Modal Script...');
if (typeof window.EnhancedContactModal !== 'undefined') {
    console.log('✅ Enhanced Contact Modal script is loaded');
    console.log('📊 Performance Metrics:', window.EnhancedContactModal.getPerformanceMetrics());
} else {
    console.log('❌ Enhanced Contact Modal script is NOT loaded');
}

// Test 2: Check if global functions are available
console.log('\n2. Checking Global Functions...');
const functions = ['openOffCanvas', 'closeOffCanvas', 'toggleOffCanvas', 'openModal', 'closeModal', 'toggleModal'];
functions.forEach(func => {
    if (typeof window[func] === 'function') {
        console.log(`✅ ${func} is available`);
    } else {
        console.log(`❌ ${func} is NOT available`);
    }
});

// Test 3: Check off-canvas element
console.log('\n3. Checking Off-Canvas Element...');
const offCanvas = document.querySelector('.oxy-off-canvas');
if (offCanvas) {
    console.log('✅ Off-canvas element found');
    console.log('📋 Element classes:', offCanvas.className);
} else {
    console.log('❌ Off-canvas element NOT found');
}

// Test 4: Check contact form
console.log('\n4. Checking Contact Form...');
const contactForm = document.querySelector('#contactFormOffCanvas');
if (contactForm) {
    console.log('✅ Contact form found in off-canvas');
} else {
    console.log('❌ Contact form NOT found in off-canvas');
}

// Test 5: Check trigger elements
console.log('\n5. Checking Trigger Elements...');

// Phone icon
const phoneIcon = document.querySelector('#fancy_icon-27-8');
if (phoneIcon) {
    console.log('✅ Phone icon found: #fancy_icon-27-8');
    console.log('📋 Phone icon classes:', phoneIcon.className);
} else {
    console.log('❌ Phone icon NOT found: #fancy_icon-27-8');
}

// Footer contact link
const footerContact = document.querySelector('#text_block-566-8');
if (footerContact) {
    console.log('✅ Footer contact link found: #text_block-566-8');
    console.log('📋 Footer contact text:', footerContact.textContent.trim());
} else {
    console.log('❌ Footer contact link NOT found: #text_block-566-8');
}

// Enquiry links
const enquiryLinks = document.querySelectorAll('[href*="enquiry"]');
console.log(`✅ Found ${enquiryLinks.length} enquiry link(s)`);
enquiryLinks.forEach((link, index) => {
    console.log(`  ${index + 1}. ${link.href}`);
});

// Test 6: Test modal functionality
console.log('\n6. Testing Modal Functionality...');

if (typeof window.openOffCanvas === 'function') {
    console.log('🧪 Testing modal open...');
    try {
        window.openOffCanvas();
        console.log('✅ Modal opened successfully');
        
        // Check if modal is visually open
        setTimeout(() => {
            const offCanvas = document.querySelector('.oxy-off-canvas');
            if (offCanvas && offCanvas.classList.contains('oxy-off-canvas-toggled')) {
                console.log('✅ Modal is visually open (has toggled class)');
                
                // Test closing
                console.log('🧪 Testing modal close...');
                window.closeOffCanvas();
                
                setTimeout(() => {
                    if (!offCanvas.classList.contains('oxy-off-canvas-toggled')) {
                        console.log('✅ Modal is visually closed');
                    } else {
                        console.log('❌ Modal closed but still visually open');
                    }
                }, 500);
                
            } else {
                console.log('❌ Modal opened but not visually open');
            }
        }, 100);
        
    } catch (error) {
        console.log('❌ Error testing modal:', error.message);
    }
} else {
    console.log('❌ openOffCanvas function is NOT available');
}

// Test 7: Check for conflicting modals
console.log('\n7. Checking for Conflicting Modals...');
const conflictingModal = document.querySelector('#contactModalOverlay');
if (conflictingModal) {
    console.log('⚠️ Conflicting modal still exists (should be commented out)');
} else {
    console.log('✅ Conflicting modal is properly commented out');
}

// Test 8: Test trigger element clicks
console.log('\n8. Testing Trigger Element Clicks...');

// Test phone icon click
if (phoneIcon) {
    console.log('🧪 Testing phone icon click...');
    phoneIcon.click();
    setTimeout(() => {
        const offCanvas = document.querySelector('.oxy-off-canvas');
        if (offCanvas && offCanvas.classList.contains('oxy-off-canvas-toggled')) {
            console.log('✅ Phone icon click opens modal');
            window.closeOffCanvas(); // Close for next test
        } else {
            console.log('❌ Phone icon click does NOT open modal');
        }
    }, 100);
}

// Test footer contact click
setTimeout(() => {
    if (footerContact) {
        console.log('🧪 Testing footer contact click...');
        footerContact.click();
        setTimeout(() => {
            const offCanvas = document.querySelector('.oxy-off-canvas');
            if (offCanvas && offCanvas.classList.contains('oxy-off-canvas-toggled')) {
                console.log('✅ Footer contact click opens modal');
                window.closeOffCanvas(); // Close for next test
            } else {
                console.log('❌ Footer contact click does NOT open modal');
            }
        }, 100);
    }
}, 1000);

// Test enquiry link click
setTimeout(() => {
    if (enquiryLinks.length > 0) {
        console.log('🧪 Testing enquiry link click...');
        enquiryLinks[0].click();
        setTimeout(() => {
            const offCanvas = document.querySelector('.oxy-off-canvas');
            if (offCanvas && offCanvas.classList.contains('oxy-off-canvas-toggled')) {
                console.log('✅ Enquiry link click opens modal');
                window.closeOffCanvas(); // Close for next test
            } else {
                console.log('❌ Enquiry link click does NOT open modal');
            }
        }, 100);
    }
}, 2000);

// Final summary
setTimeout(() => {
    console.log('\n🎯 Test Summary:');
    console.log('If you see mostly ✅ checkmarks above, the enhanced modal is working correctly!');
    console.log('If you see ❌ errors, there may be issues that need to be fixed.');
    console.log('\n📝 Next steps:');
    console.log('1. Click on the phone icon in the header');
    console.log('2. Click on the contact info in the footer');
    console.log('3. Click on any "enquiry" links');
    console.log('4. All should open the off-canvas modal with the contact form');
}, 3000);

console.log('\n✨ Test script completed! Check the results above.');
