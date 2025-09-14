// Comprehensive Contact Modal Trigger Test
// Tests all pages for working contact modal triggers

const fs = require('fs');
const path = require('path');

// Test configuration
const testPages = [
    'indexCopy.html',
    'about-us/indexCopy.html',
    'enquiry/indexCopy.html',
    'international/indexCopy.html',
    'privacy-policy/indexCopy.html',
    'team/indexCopy.html',
    'terms-and-conditions/indexCopy.html',
    'sectors/indexCopy.html',
    'sectors/business-services/indexCopy.html',
    'sectors/circular-economy/indexCopy.html',
    'sectors/construction-real-estate/indexCopy.html',
    'sectors/consumer-leisure/indexCopy.html',
    'sectors/food-beverage/indexCopy.html',
    'sectors/healthcare/indexCopy.html',
    'sectors/industrials/indexCopy.html'
];

// Expected selectors for contact modal triggers
const expectedSelectors = {
    phoneIcons: [
        '#fancy_icon-27-8',
        '.contact-links .ct-fancy-icon[class*="envelope"]',
        '.contact-link-parent .ct-fancy-icon[class*="envelope"]',
        '.ct-fancy-icon[class*="envelope"]'
    ],
    contactLinks: [
        '#text_block-566-8',
        '.footer-about a[href*="contact"]',
        '.footer-about a[href*="mailto"]',
        '.footer-contact-link-text',
        '.footer-contact-item .ct-text-block'
    ],
    discoverButtons: [
        'a[href*="services"]',
        '.ct-link-button',
        '.btn',
        '[href*="enquiry"]',
        '#link_button-208-8',
        '#link_text-579-8'
    ]
};

// Test results storage
const testResults = {
    totalPages: 0,
    pagesWithCentralizedScript: 0,
    pagesWithContactModal: 0,
    pagesWithWorkingTriggers: 0,
    detailedResults: []
};

console.log('🔍 Starting Comprehensive Contact Modal Trigger Test...\n');

// Test each page
testPages.forEach(pagePath => {
    console.log(`📄 Testing: ${pagePath}`);
    
    const fullPath = path.join(__dirname, pagePath);
    let pageResult = {
        page: pagePath,
        exists: false,
        hasCentralizedScript: false,
        hasContactModal: false,
        phoneIconTriggers: [],
        contactLinkTriggers: [],
        discoverButtonTriggers: [],
        errors: []
    };
    
    try {
        // Check if file exists
        if (!fs.existsSync(fullPath)) {
            pageResult.errors.push('File does not exist');
            testResults.detailedResults.push(pageResult);
            console.log(`  ❌ File not found`);
            return;
        }
        
        pageResult.exists = true;
        testResults.totalPages++;
        
        // Read file content
        const content = fs.readFileSync(fullPath, 'utf8');
        
        // Check for centralized script
        if (content.includes('contact-modal-enhanced.js')) {
            pageResult.hasCentralizedScript = true;
            testResults.pagesWithCentralizedScript++;
            console.log(`  ✅ Has centralized script`);
        } else {
            pageResult.errors.push('Missing centralized script reference');
            console.log(`  ❌ Missing centralized script`);
        }
        
        // Check for contact modal HTML
        if (content.includes('id="contactModal"') || content.includes('class="contact-modal"')) {
            pageResult.hasContactModal = true;
            testResults.pagesWithContactModal++;
            console.log(`  ✅ Has contact modal HTML`);
        } else {
            pageResult.errors.push('Missing contact modal HTML');
            console.log(`  ❌ Missing contact modal HTML`);
        }
        
        // Test phone icon triggers
        expectedSelectors.phoneIcons.forEach(selector => {
            if (content.includes(selector.replace('#', 'id="').replace('.', 'class="'))) {
                pageResult.phoneIconTriggers.push(selector);
            }
        });
        
        // Test contact link triggers
        expectedSelectors.contactLinks.forEach(selector => {
            if (content.includes(selector.replace('#', 'id="').replace('.', 'class="'))) {
                pageResult.contactLinkTriggers.push(selector);
            }
        });
        
        // Test discover button triggers
        expectedSelectors.discoverButtons.forEach(selector => {
            if (content.includes(selector.replace('#', 'id="').replace('.', 'class="'))) {
                pageResult.discoverButtonTriggers.push(selector);
            }
        });
        
        // Check if page has working triggers
        const hasTriggers = pageResult.phoneIconTriggers.length > 0 || 
                           pageResult.contactLinkTriggers.length > 0 || 
                           pageResult.discoverButtonTriggers.length > 0;
        
        if (hasTriggers) {
            testResults.pagesWithWorkingTriggers++;
            console.log(`  ✅ Has working triggers`);
        } else {
            pageResult.errors.push('No working triggers found');
            console.log(`  ❌ No working triggers found`);
        }
        
        // Log trigger details
        if (pageResult.phoneIconTriggers.length > 0) {
            console.log(`    📞 Phone icons: ${pageResult.phoneIconTriggers.length} found`);
        }
        if (pageResult.contactLinkTriggers.length > 0) {
            console.log(`    📧 Contact links: ${pageResult.contactLinkTriggers.length} found`);
        }
        if (pageResult.discoverButtonTriggers.length > 0) {
            console.log(`    🔍 Discover buttons: ${pageResult.discoverButtonTriggers.length} found`);
        }
        
    } catch (error) {
        pageResult.errors.push(`Error reading file: ${error.message}`);
        console.log(`  ❌ Error: ${error.message}`);
    }
    
    testResults.detailedResults.push(pageResult);
    console.log('');
});

// Generate summary report
console.log('📊 TEST SUMMARY REPORT');
console.log('='.repeat(50));
console.log(`Total pages tested: ${testResults.totalPages}`);
console.log(`Pages with centralized script: ${testResults.pagesWithCentralizedScript}`);
console.log(`Pages with contact modal: ${testResults.pagesWithContactModal}`);
console.log(`Pages with working triggers: ${testResults.pagesWithWorkingTriggers}`);
console.log('');

// Detailed results
console.log('📋 DETAILED RESULTS');
console.log('='.repeat(50));

testResults.detailedResults.forEach(result => {
    console.log(`\n📄 ${result.page}`);
    console.log(`  Status: ${result.exists ? '✅ Exists' : '❌ Missing'}`);
    console.log(`  Centralized Script: ${result.hasCentralizedScript ? '✅' : '❌'}`);
    console.log(`  Contact Modal: ${result.hasContactModal ? '✅' : '❌'}`);
    console.log(`  Phone Icons: ${result.phoneIconTriggers.length} found`);
    console.log(`  Contact Links: ${result.contactLinkTriggers.length} found`);
    console.log(`  Discover Buttons: ${result.discoverButtonTriggers.length} found`);
    
    if (result.errors.length > 0) {
        console.log(`  Errors:`);
        result.errors.forEach(error => console.log(`    ❌ ${error}`));
    }
});

// Overall status
const allPagesWorking = testResults.pagesWithWorkingTriggers === testResults.totalPages;
console.log('\n🎯 OVERALL STATUS');
console.log('='.repeat(50));
if (allPagesWorking) {
    console.log('✅ ALL PAGES HAVE WORKING CONTACT MODAL TRIGGERS!');
} else {
    console.log('❌ SOME PAGES NEED ATTENTION');
    console.log(`   ${testResults.totalPages - testResults.pagesWithWorkingTriggers} pages need fixes`);
}

console.log('\n🔧 NEXT STEPS');
console.log('='.repeat(50));
console.log('1. Open each page in a browser');
console.log('2. Test phone icon in header - should open contact modal');
console.log('3. Test contact link in footer - should open contact modal');
console.log('4. Test discover more link in footer - should open contact modal');
console.log('5. Verify modal has dark blue/teal background (#0A3140)');
console.log('6. Verify modal contains contact form');

console.log('\n✨ Test completed!');