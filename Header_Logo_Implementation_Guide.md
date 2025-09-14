footerfooterop # Header Logo Implementation Guide

## Overview
This document outlines the process to implement a scrolling header feature that switches between white and blue logos when scrolling down the page. The blue logo should appear inline with the navigation menu items.

## Problem Solved
- White logo shows when at the top of the page
- Blue logo (Asset-2.png) appears when scrolling down past 100px
- Header becomes sticky when scrolling
- Blue logo is properly aligned with navigation menu items (not below them)

## Implementation Steps

### 1. HTML Structure Requirements
The page must have the following HTML structure in the header:

```html
<div class="ct-div-block header-inner menu-sticky">
    <div class="ct-div-block menu-bar">
        <div class="ct-div-block header-logo">
            <!-- White logo (shown by default) -->
            <div class="ct-div-block logo-area">
                <a href="../index-2.html">
                    <img src="../wp-content/logo/QUERCUS_10thAnniversary-Logo_03.png" class="ct-image">
                </a>
            </div>
            <!-- Blue logo (shown when sticky) -->
            <div class="ct-div-block logo-area sticky-logo">
                <a href="../index-2.html">
                    <img src="../wp-content/logo/Asset-2.png" class="ct-image">
                </a>
            </div>
        </div>
        <div class="ct-div-block menu-responsive">
            <!-- Navigation menu items go here -->
        </div>
    </div>
</div>
```

### 2. CSS Implementation

#### Base Sticky Header CSS
```css
.menu-sticky.sticky {
    position: fixed !important;
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0 0 20px -10px rgba(0, 0, 0, 0.8);
    z-index: 999;
}

.menu-sticky.sticky .header-top {
    display: none;
}

.menu-sticky.sticky .menu-bar {
    background: #FFF !important;
    min-height: 80px !important;
    padding-top: 20px !important;
    padding-bottom: 20px !important;
    position: relative !important;
}
```

#### Logo Switching CSS
```css
/* Hide blue logo by default */
.logo-area.sticky-logo {
    display: none !important;
}

/* Show blue logo when sticky */
.menu-sticky.sticky .logo-area.sticky-logo {
    display: block !important;
    position: absolute !important;
    top: 50% !important;
    left: 20px !important;
    transform: translateY(-50%) !important;
    z-index: 10 !important;
}

.menu-sticky.sticky .logo-area.sticky-logo img {
    display: inline-block !important;
    position: relative !important;
    top: 0 !important;
    left: 0 !important;
    vertical-align: middle !important;
    height: 60px !important;
    width: auto !important;
}

/* Hide white logo when sticky */
.menu-sticky.sticky .menu-bar .logo-area:not(.sticky-logo) {
    display: none;
}

/* Show white logo when not sticky */
.logo-area:not(.sticky-logo) {
    display: block !important;
}
```

### 3. JavaScript Implementation

```javascript
// Variables
var header = jQuery('.menu-sticky');
var win = jQuery(window);
var headerinnerHeight = 100;

// Scroll function
jQuery(window).scroll(function($){
    var scroll = win.scrollTop();
    
    if (scroll < headerinnerHeight) {
        header.removeClass("sticky");
        // Show white logo when not sticky
        jQuery('.logo-area:not(.sticky-logo)').show();
        jQuery('.logo-area.sticky-logo').hide();
        
    } else {
        header.addClass("sticky");
        // Show blue logo when sticky
        jQuery('.logo-area:not(.sticky-logo)').hide();
        jQuery('.logo-area.sticky-logo').show();
    }
});
```

### 4. jQuery Fallback (if needed)
If jQuery fails to load locally, add this fallback:

```html
<script>
// Fallback for jQuery if it fails to load
if (typeof jQuery === 'undefined') {
    document.write('<script src="https://code.jquery.com/jquery-3.6.0.min.js"><\/script>');
}
</script>
```

## Key Points for Success

1. **Absolute Positioning**: The blue logo uses `position: absolute` to appear inline with navigation items
2. **Vertical Centering**: Uses `top: 50%` and `transform: translateY(-50%)` for perfect vertical alignment
3. **Relative Container**: The menu-bar must have `position: relative` for absolute positioning to work
4. **Proper Z-index**: Blue logo has `z-index: 10` to appear above other elements
5. **Logo Sizing**: Blue logo is set to `height: 60px` with `width: auto` to maintain aspect ratio

## Testing Checklist

- [ ] White logo appears when at top of page
- [ ] Blue logo appears when scrolling down past 100px
- [ ] Header becomes sticky when scrolling
- [ ] Blue logo is aligned with navigation menu items (not below them)
- [ ] No console errors in browser developer tools
- [ ] Page accessed via HTTP server (not file:// protocol)

## Common Issues and Solutions

1. **Logo appears below navigation**: Use absolute positioning with proper vertical centering
2. **jQuery not defined errors**: Ensure page is accessed via HTTP server, not file://
3. **Logo too small/large**: Adjust height property in CSS
4. **Header shrinks**: Add min-height and padding to menu-bar

## Files Modified
- `team/index.html` - Complete implementation example
- CSS and JavaScript added to the page's `<style>` and `<script>` sections

## Notes
- The scroll threshold is set to 100px (adjust `headerinnerHeight` variable as needed)
- Logo paths assume the structure: `../wp-content/logo/`
- This implementation works with the existing Oxygen theme structure
