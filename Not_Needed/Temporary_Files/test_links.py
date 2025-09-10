#!/usr/bin/env python3
"""
Comprehensive Link Testing Script
Tests all internal links on the website to ensure they work properly
"""

import os
import re
import requests
from urllib.parse import urljoin, urlparse
from collections import defaultdict
import time

def find_all_html_files():
    """Find all HTML files in the project"""
    html_files = []
    for root, dirs, files in os.walk('.'):
        # Skip certain directories
        if any(skip in root for skip in ['Not_Needed', '.git']):
            continue
        for file in files:
            if file.endswith('.html'):
                html_files.append(os.path.join(root, file))
    return html_files

def extract_links_from_file(file_path):
    """Extract all internal links from an HTML file"""
    links = []
    try:
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        
        # Patterns to match different types of links
        patterns = [
            r'href="([^"]*\.html[^"]*)"',
            r'href="([^"]*\.php[^"]*)"',
            r'src="([^"]*\.html[^"]*)"',
        ]
        
        for pattern in patterns:
            matches = re.findall(pattern, content, re.IGNORECASE)
            for match in matches:
                # Clean up the link
                link = match.split('?')[0]  # Remove query parameters
                link = link.split('#')[0]   # Remove fragments
                
                # Only process internal links
                if not link.startswith('http') and not link.startswith('mailto:') and not link.startswith('tel:'):
                    links.append(link)
        
        return links
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
        return []

def resolve_relative_path(base_file, relative_path):
    """Resolve a relative path relative to a base file"""
    if relative_path.startswith('/'):
        return relative_path[1:]  # Remove leading slash
    
    # Get the directory of the base file
    base_dir = os.path.dirname(base_file)
    
    if relative_path.startswith('../'):
        # Count the number of ../
        up_levels = relative_path.count('../')
        # Go up the required levels
        for _ in range(up_levels):
            base_dir = os.path.dirname(base_dir)
        # Join with the remaining path
        resolved_path = os.path.join(base_dir, relative_path[up_levels * 3:])
    elif relative_path.startswith('./'):
        resolved_path = os.path.join(base_dir, relative_path[2:])
    else:
        # Relative path from current file's directory
        resolved_path = os.path.join(base_dir, relative_path)
    
    # Normalize the path
    return os.path.normpath(resolved_path)

def test_file_exists(file_path):
    """Test if a file exists"""
    return os.path.exists(file_path)

def main():
    print("Starting comprehensive link testing...")
    
    # Find all HTML files
    html_files = find_all_html_files()
    print(f"Found {len(html_files)} HTML files to test")
    
    # Track results
    broken_links = []
    working_links = []
    total_links = 0
    
    # Test each HTML file
    for html_file in html_files:
        print(f"\nTesting {html_file}...")
        
        # Extract links from the file
        links = extract_links_from_file(html_file)
        print(f"  Found {len(links)} internal links")
        
        for link in links:
            total_links += 1
            
            # Resolve the relative path
            resolved_path = resolve_relative_path(html_file, link)
            
            # Test if the file exists
            if test_file_exists(resolved_path):
                working_links.append((html_file, link, resolved_path))
                print(f"    ✓ {link} -> {resolved_path}")
            else:
                broken_links.append((html_file, link, resolved_path))
                print(f"    ✗ {link} -> {resolved_path} (NOT FOUND)")
    
    # Print summary
    print(f"\n{'='*60}")
    print("LINK TESTING SUMMARY")
    print(f"{'='*60}")
    print(f"Total links tested: {total_links}")
    print(f"Working links: {len(working_links)}")
    print(f"Broken links: {len(broken_links)}")
    
    if broken_links:
        print(f"\nBROKEN LINKS:")
        print("-" * 40)
        for html_file, link, resolved_path in broken_links:
            print(f"File: {html_file}")
            print(f"  Link: {link}")
            print(f"  Resolved to: {resolved_path}")
            print()
    else:
        print("\n🎉 All links are working correctly!")
    
    # Save detailed results
    with open('link_test_results.txt', 'w') as f:
        f.write("LINK TESTING RESULTS\n")
        f.write("=" * 60 + "\n\n")
        f.write(f"Total links tested: {total_links}\n")
        f.write(f"Working links: {len(working_links)}\n")
        f.write(f"Broken links: {len(broken_links)}\n\n")
        
        if broken_links:
            f.write("BROKEN LINKS:\n")
            f.write("-" * 40 + "\n")
            for html_file, link, resolved_path in broken_links:
                f.write(f"File: {html_file}\n")
                f.write(f"  Link: {link}\n")
                f.write(f"  Resolved to: {resolved_path}\n\n")
        
        f.write("\nWORKING LINKS:\n")
        f.write("-" * 40 + "\n")
        for html_file, link, resolved_path in working_links:
            f.write(f"File: {html_file}\n")
            f.write(f"  Link: {link}\n")
            f.write(f"  Resolved to: {resolved_path}\n\n")
    
    print(f"\nDetailed results saved to link_test_results.txt")

if __name__ == "__main__":
    main()
