# Contact Modal Implementation Process

## Overview
This document outlines the complete process for implementing the Off-Canvas Contact Modal functionality across website pages, based on the successful implementation in `ReBuild/indexCopy.html`.

## Key Requirements
- **Modal Type**: Off-Canvas Modal with `#0A3140` background
- **Reference Implementation**: `/index-2.html` (working example)
- **Triggers**: Only 3 specific elements should open the modal
- **Navigation**: 1 element should navigate normally (NOT open modal)

## Trigger Elements (Modal Openers)

### 1. Phone Icon in Header
- **Target ID**: `#fancy_icon-189-8`
- **Class**: `ct-fancy-icon menu-button`
- **Icon**: `#FontawesomeProicon-phone1`
- **Location**: Main header navigation bar (far right)

### 2. Contact Link in Footer
- **Target ID**: `#text_block-566-8`
- **Class**: `ct-text-block footer-contact-link-text`
- **Content**: Email address text
- **Location**: Footer contact section

### 3. Discover More Link in Footer
- **Target ID**: `#link_button-208-8`
- **Class**: `ct-link-button btn menu-button`
- **Content**: "Discover More" text
- **Location**: Footer contact section

## Navigation Element (NOT Modal)

### Enquiry Link in Header
- **Target ID**: `#link_text-19-8`
- **Class**: `ct-link-text contact-link`
- **Behavior**: Navigate to `/enquiry/index.html`
- **Location**: Top header bar

## Implementation Process

### Step 1: Identify Elements
1. **Use Browser Console** to inspect elements
2. **Search for specific text** using `grep` or browser dev tools
3. **Verify element IDs** match the reference implementation
4. **Check element classes** for consistency

### Step 2: Create Modal Functions
```javascript
// Global modal functions
function openModal() {
    console.log('🚀 Opening modal...');
    const modal = document.querySelector('.oxy-off-canvas');
    if (modal) {
        modal.classList.add('oxy-off-canvas-toggled');
        document.body.classList.add('off-canvas-toggled');
        console.log('✅ Modal opened');
    } else {
        console.log('❌ Modal not found');
    }
}

function closeModal() {
    console.log('❌ Closing modal...');
    const modal = document.querySelector('.oxy-off-canvas');
    if (modal) {
        modal.classList.remove('oxy-off-canvas-toggled');
        document.body.classList.remove('off-canvas-toggled');
        console.log('✅ Modal closed');
    }
}

// Make functions global
window.openModal = openModal;
window.closeModal = closeModal;
```

### Step 3: Setup Event Listeners
```javascript
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 Page loaded, setting up...');
    
    setTimeout(function() {
        console.log('⏰ Setting up triggers...');
        
        // 1. Phone Icon
        const phoneIcon = document.querySelector('#fancy_icon-189-8');
        if (phoneIcon) {
            phoneIcon.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('📞 Phone clicked');
                openModal();
                return false;
            };
            phoneIcon.style.cursor = 'pointer';
            console.log('✅ Phone icon setup');
        }
        
        // 2. Header Contact Link
        const headerContact = document.querySelector('#link_text-17-8');
        if (headerContact) {
            headerContact.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('📧 Header contact clicked');
                openModal();
            });
            console.log('✅ Header contact setup');
        }
        
        // 3. Enquiry Link (NAVIGATION - NOT MODAL)
        const enquiryLink = document.querySelector('#link_text-19-8');
        if (enquiryLink) {
            // Remove any modal functionality and restore normal navigation
            enquiryLink.onclick = null;
            enquiryLink.removeAttribute('onclick');
            console.log('✅ Enquiry link restored to normal navigation');
        }
        
        // 4. Footer Contact Text
        const footerContact = document.querySelector('#text_block-566-8');
        if (footerContact) {
            footerContact.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('📧 Footer contact clicked');
                openModal();
            });
            footerContact.style.cursor = 'pointer';
            console.log('✅ Footer contact setup');
        }
        
        // 5. Discover More Link
        const discoverMoreLink = document.querySelector('#link_button-208-8');
        if (discoverMoreLink) {
            discoverMoreLink.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('🔍 Discover More clicked');
                openModal();
            });
            discoverMoreLink.style.cursor = 'pointer';
            console.log('✅ Discover More link setup');
        }
        
        // 6. Close Button
        const closeBtn = document.querySelector('#fancy_icon-194-8');
        if (closeBtn) {
            closeBtn.onclick = function(e) {
                e.preventDefault();
                console.log('❌ Close clicked');
                closeModal();
            };
            console.log('✅ Close button setup');
        }
        
        // 7. Backdrop
        const backdrop = document.querySelector('.oxy-offcanvas_backdrop');
        if (backdrop) {
            backdrop.onclick = function(e) {
                e.preventDefault();
                console.log('🖱️ Backdrop clicked');
                closeModal();
            };
            console.log('✅ Backdrop setup');
        }
        
        // 8. Escape Key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const modal = document.querySelector('.oxy-off-canvas');
                if (modal && modal.classList.contains('oxy-off-canvas-toggled')) {
                    console.log('⌨️ Escape pressed');
                    closeModal();
                }
            }
        });
        
        console.log('🎉 Setup complete!');
        
    }, 500); // Wait 500ms for elements to load
});
```

### Step 4: Debugging Process
1. **Add console logging** for each element detection
2. **Test each trigger** individually
3. **Verify element IDs** match the reference
4. **Check for conflicts** with existing JavaScript
5. **Remove test elements** once confirmed working

## Common Issues & Solutions

### Issue 1: Phone Icon Not Found
- **Problem**: Targeting wrong element (e.g., email icon instead of phone icon)
- **Solution**: Use browser console to list all fancy icons and identify the correct one
- **Debug Code**:
```javascript
setTimeout(function() {
    const allIcons = document.querySelectorAll('.ct-fancy-icon');
    console.log('🔍 All fancy icons found:', allIcons.length);
    allIcons.forEach((icon, index) => {
        console.log(`Icon ${index}:`, icon.id, icon.className, icon.querySelector('use')?.getAttribute('xlink:href'));
    });
}, 2000);
```

### Issue 2: Discover More Link Not Found
- **Problem**: Targeting wrong element or link doesn't exist
- **Solution**: Search for "Discover More" text in footer section
- **Debug Code**:
```javascript
// Search for Discover More text
const discoverMoreLink = document.querySelector('a[href*="enquiry"]');
if (discoverMoreLink && discoverMoreLink.textContent.toLowerCase().includes('discover')) {
    // Found the link
}
```

### Issue 3: Enquiry Link Opening Modal
- **Problem**: Enquiry link should navigate, not open modal
- **Solution**: Remove modal functionality and restore normal navigation
- **Fix**:
```javascript
const enquiryLink = document.querySelector('#link_text-19-8');
if (enquiryLink) {
    enquiryLink.onclick = null;
    enquiryLink.removeAttribute('onclick');
    // Let it navigate normally
}
```

### Issue 4: Timing Issues
- **Problem**: Script runs before elements are loaded
- **Solution**: Use `DOMContentLoaded` with `setTimeout` delay
- **Fix**:
```javascript
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        // Setup code here
    }, 500); // Wait 500ms
});
```

## Testing Checklist

### Before Implementation
- [ ] Identify all trigger elements on the page
- [ ] Verify element IDs match reference
- [ ] Check for existing JavaScript conflicts
- [ ] Confirm modal HTML structure exists

### During Implementation
- [ ] Add console logging for debugging
- [ ] Test each trigger individually
- [ ] Verify modal opens and closes correctly
- [ ] Check navigation elements work properly

### After Implementation
- [ ] Remove test elements and debug code
- [ ] Test all triggers work consistently
- [ ] Verify modal appearance matches reference
- [ ] Confirm no JavaScript errors in console

## File Structure
```
ReBuild/
├── indexCopy.html (working implementation)
├── [other backup files]
└── docs/
    └── contact-modal-implementation-process.md (this file)
```

## Next Steps for Other Pages
1. **Copy the working script** from `ReBuild/indexCopy.html`
2. **Identify element IDs** on each target page
3. **Update selectors** to match page-specific IDs
4. **Test thoroughly** before removing debug code
5. **Document any page-specific variations**

## Notes
- **Always backup** original files before making changes
- **Test on one page** before implementing on others
- **Use browser console** extensively for debugging
- **Keep element IDs consistent** across pages when possible
- **Remove debug code** once implementation is confirmed working

---
*Last Updated: [Current Date]*
*Status: Working implementation confirmed in ReBuild/indexCopy.html*
