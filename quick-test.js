// Quick Contact Modal Test - No loops to avoid PowerShell issues
const fs = require('fs');

console.log('🔍 Quick Contact Modal Test\n');

// Test main pages
const mainPages = [
    'indexCopy.html',
    'about-us/indexCopy.html', 
    'enquiry/indexCopy.html',
    'international/indexCopy.html',
    'privacy-policy/indexCopy.html',
    'team/indexCopy.html',
    'terms-and-conditions/indexCopy.html',
    'sectors/indexCopy.html'
];

let workingPages = 0;
let totalPages = 0;

mainPages.forEach(page => {
    if (fs.existsSync(page)) {
        totalPages++;
        const content = fs.readFileSync(page, 'utf8');
        
        const hasScript = content.includes('contact-modal-enhanced.js');
        const hasModal = content.includes('contactModal') || content.includes('contact-modal');
        const hasTriggers = content.includes('fancy_icon-27-8') || content.includes('text_block-566-8') || content.includes('link_button-208-8');
        
        if (hasScript && hasModal && hasTriggers) {
            workingPages++;
            console.log(`✅ ${page} - All good`);
        } else {
            console.log(`❌ ${page} - Missing: ${!hasScript ? 'script ' : ''}${!hasModal ? 'modal ' : ''}${!hasTriggers ? 'triggers' : ''}`);
        }
    }
});

console.log(`\n📊 Results: ${workingPages}/${totalPages} main pages working`);

// Test sector pages
const sectorPages = [
    'sectors/business-services/indexCopy.html',
    'sectors/circular-economy/indexCopy.html', 
    'sectors/construction-real-estate/indexCopy.html',
    'sectors/consumer-leisure/indexCopy.html',
    'sectors/food-beverage/indexCopy.html',
    'sectors/healthcare/indexCopy.html',
    'sectors/industrials/indexCopy.html'
];

let workingSectors = 0;
let totalSectors = 0;

sectorPages.forEach(page => {
    if (fs.existsSync(page)) {
        totalSectors++;
        const content = fs.readFileSync(page, 'utf8');
        
        const hasScript = content.includes('contact-modal-enhanced.js');
        const hasTriggers = content.includes('fancy_icon-27-8') || content.includes('text_block-566-8') || content.includes('link_button-208-8');
        
        if (hasScript && hasTriggers) {
            workingSectors++;
            console.log(`✅ ${page} - Script added`);
        } else {
            console.log(`❌ ${page} - Missing: ${!hasScript ? 'script ' : ''}${!hasTriggers ? 'triggers' : ''}`);
        }
    }
});

console.log(`\n📊 Sector Results: ${workingSectors}/${totalSectors} sector pages working`);
console.log(`\n🎯 Total: ${workingPages + workingSectors}/${totalPages + totalSectors} pages ready for testing`);

if (workingPages + workingSectors === totalPages + totalSectors) {
    console.log('\n✅ ALL PAGES READY FOR BROWSER TESTING!');
    console.log('\n🔧 Next: Open pages in browser and test:');
    console.log('   - Phone icon in header');
    console.log('   - Contact link in footer'); 
    console.log('   - Discover more link in footer');
} else {
    console.log('\n❌ Some pages need fixes');
}
