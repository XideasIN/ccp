// Script to add missing contact modal triggers to all pages
const fs = require('fs');
const path = require('path');

// Pages that need the discover button and second contact link
const pagesToFix = [
    'international/indexCopy.html',
    'privacy-policy/indexCopy.html', 
    'terms-and-conditions/indexCopy.html',
    'sectors/business-services/indexCopy.html',
    'sectors/circular-economy/indexCopy.html',
    'sectors/construction-real-estate/indexCopy.html',
    'sectors/consumer-leisure/indexCopy.html',
    'sectors/food-beverage/indexCopy.html',
    'sectors/healthcare/indexCopy.html',
    'sectors/industrials/indexCopy.html'
];

// HTML to add for missing elements
const missingElements = `
<div class="footer-contact-item" style="display: flex; align-items: center; margin-bottom: 10px;">
    <div id="fancy_icon-580-8" class="ct-fancy-icon contact-footer-item" style="margin-right: 10px;">
        <svg id="svg-fancy_icon-580-8"><use xlink:href="#FontAwesomeicon-phone"></use></svg>
    </div>
    <div id="text_block-579-8" class="ct-text-block footer-contact-link-text">+507-836-5886</div>
</div>
<div class="footer-contact-item" style="display: flex; align-items: center; margin-bottom: 10px;">
    <a id="link_button-208-8" class="ct-link-button" href="#" style="background: linear-gradient(135deg, #B1976B 0%, #8B7355 100%); color: white; padding: 12px 24px; border-radius: 5px; text-decoration: none; display: inline-block; font-weight: 600;">Discover More</a>
</div>`;

console.log('🔧 Adding missing contact modal triggers to pages...\n');

pagesToFix.forEach(pagePath => {
    const fullPath = path.join(__dirname, pagePath);
    
    if (!fs.existsSync(fullPath)) {
        console.log(`❌ ${pagePath} - File not found`);
        return;
    }
    
    try {
        let content = fs.readFileSync(fullPath, 'utf8');
        
        // Check if elements already exist
        if (content.includes('text_block-579-8') && content.includes('link_button-208-8')) {
            console.log(`✅ ${pagePath} - Already has all elements`);
            return;
        }
        
        // Find the footer contact section and add missing elements
        const footerContactPattern = /(<div class="footer-contact-item"[^>]*>.*?<\/div>)(\s*<\/div>\s*<\/div>\s*<div id="div_block-202-8")/s;
        const match = content.match(footerContactPattern);
        
        if (match) {
            const replacement = match[1] + missingElements + match[2];
            content = content.replace(footerContactPattern, replacement);
            
            fs.writeFileSync(fullPath, content, 'utf8');
            console.log(`✅ ${pagePath} - Added missing elements`);
        } else {
            console.log(`❌ ${pagePath} - Could not find footer contact section`);
        }
        
    } catch (error) {
        console.log(`❌ ${pagePath} - Error: ${error.message}`);
    }
});

console.log('\n🎯 Missing trigger elements added to all pages!');
