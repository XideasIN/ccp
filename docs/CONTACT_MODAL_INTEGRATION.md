# Contact Modal Integration Guide

## Overview
The centralized contact modal script (`js/contact-modal.js`) provides a unified solution for implementing off-canvas contact modals across all pages of your website.

## Quick Integration

### 1. Include the Script
Add this single line to any HTML page where you want the contact modal functionality:

```html
<script src="js/contact-modal.js"></script>
```

### 2. Ensure Required HTML Structure
Make sure your page has the off-canvas modal structure:

```html
<div class="oxy-off-canvas">
    <div class="oxy-offcanvas_backdrop"></div>
    <div class="oxy-off-canvas-content">
        <div class="ct-fancy-icon close-button">×</div>
        <form id="contactFormOffCanvas" class="contact-form-offcanvas" action="contact-form-handler.php" method="POST">
            <!-- Your contact form fields here -->
        </form>
    </div>
</div>
```

### 3. That's It!
The script will automatically:
- Find and attach click events to phone icons in the header
- Connect footer contact links
- Identify and activate "Discover More" buttons
- Convert any existing `onclick="openModal()"` calls
- Handle modal opening/closing with proper animations

## Advanced Usage

### Programmatic Control
```javascript
// Open modal
window.openOffCanvas();

// Close modal
window.closeOffCanvas();

// Toggle modal
window.toggleOffCanvas();

// Check if modal is open
if (window.ContactModal.isOpen()) {
    console.log('Modal is currently open');
}
```

### Custom Events
Listen for modal events:
```javascript
document.addEventListener('modal:opened', function(e) {
    console.log('Contact modal opened');
});

document.addEventListener('modal:closed', function(e) {
    console.log('Contact modal closed');
});
```

### Configuration
Customize the behavior by updating the configuration:
```javascript
window.ContactModal.updateConfig({
    selectors: {
        phoneIcons: '.my-custom-phone-icon',
        discoverButtons: '.my-custom-button'
    },
    discoverKeywords: ['custom', 'action', 'button']
});
```

## Benefits

### ✅ **Centralized Management**
- Single source of truth for all modal logic
- Easy to update and maintain
- Consistent behavior across all pages

### ✅ **Automatic Detection**
- No need to manually specify element IDs
- Works with any page structure
- Handles dynamic content

### ✅ **Backward Compatibility**
- Converts existing `onclick="openModal()"` calls
- Maintains existing global function names
- Gradual migration support

### ✅ **Performance Optimized**
- Lightweight and fast
- Event delegation for efficiency
- Minimal DOM queries

### ✅ **Error Handling**
- Graceful fallbacks if elements don't exist
- Console warnings for debugging
- Robust error recovery

## Migration from Individual Scripts

### Before (Individual Scripts)
Each page had its own script:
```html
<script>
// 50+ lines of duplicate code per page
function openOffCanvas() { /* ... */ }
function closeOffCanvas() { /* ... */ }
// ... more duplicate code
</script>
```

### After (Centralized Script)
Each page just includes:
```html
<script src="js/contact-modal.js"></script>
```

## File Structure
```
your-website/
├── js/
│   └── contact-modal.js          # Centralized script
├── index.html                    # Include script reference
├── about-us/
│   └── index.html               # Include script reference
├── sectors/
│   ├── index.html               # Include script reference
│   └── business-services/
│       └── index.html           # Include script reference
└── ... (all other pages)
```

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- IE11+ (with polyfills if needed)
- Mobile browsers

## Troubleshooting

### Modal Not Opening
1. Check browser console for errors
2. Verify the off-canvas element exists
3. Ensure the script is loaded after the HTML

### Triggers Not Working
1. Check if trigger elements match the selectors
2. Verify CSS classes are correct
3. Use browser dev tools to inspect elements

### Styling Issues
1. Ensure CSS classes match the configuration
2. Check for CSS conflicts
3. Verify the off-canvas structure is correct
