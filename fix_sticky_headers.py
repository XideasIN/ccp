#!/usr/bin/env python3
"""
Script to fix sticky header functionality across all pages
"""

import os
import re

# List of all pages to fix
pages = [
    "sectors/circular-economy/index.html",
    "sectors/construction-real-estate/index.html", 
    "sectors/consumer-leisure/index.html",
    "sectors/food-beverage/index.html",
    "sectors/healthcare/index.html",
    "sectors/business-services/index.html",
    "sectors/industrials/index.html",
    "privacy-policy/index.html",
    "terms-and-conditions/index.html"
]

def fix_sticky_header(file_path):
    """Fix sticky header JavaScript and CSS for a single file"""
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        return False
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Fix JavaScript - add logo switching logic
    js_pattern = r'(jQuery\(window\)\.scroll\(function\(\$\)\{\s*var scroll = win\.scrollTop\(\);\s*if \(scroll < headerinnerHeight\) \{\s*header\.removeClass\("sticky"\);\s*\}\s*else \{\s*header\.addClass\("sticky"\);\s*\}\s*\}\);)'
    
    js_replacement = '''jQuery(window).scroll(function($){
    
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

});'''
    
    # Fix CSS - remove content: url() and use display: block
    css_pattern = r'(\s*\.menu-sticky\.sticky \.menu-bar \.logo-area\.sticky-logo img \{\s*content: url\(\'[^\']*\'\) !important;\s*\})'
    
    css_replacement = '''        .menu-sticky.sticky .menu-bar .logo-area.sticky-logo img {
            display: block !important;
        }'''
    
    # Apply fixes
    content = re.sub(js_pattern, js_replacement, content, flags=re.DOTALL)
    content = re.sub(css_pattern, css_replacement, content, flags=re.DOTALL)
    
    # Write back to file
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"Fixed: {file_path}")
    return True

def main():
    """Main function to fix all pages"""
    print("Fixing sticky header functionality across all pages...")
    
    success_count = 0
    for page in pages:
        if fix_sticky_header(page):
            success_count += 1
    
    print(f"\nCompleted! Fixed {success_count} out of {len(pages)} pages.")

if __name__ == "__main__":
    main()
