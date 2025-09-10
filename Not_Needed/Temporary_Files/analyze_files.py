#!/usr/bin/env python3
"""
File Usage Analysis Script
Analyzes which files are actually referenced by the website
"""

import os
import re
import glob
from collections import defaultdict

def find_file_references():
    """Find all file references in HTML files"""
    references = set()
    
    # Patterns to match file references
    patterns = [
        r'href="([^"]*\.(html|css|js|png|jpg|jpeg|gif|svg|ico|woff|ttf|php))"',
        r'src="([^"]*\.(html|css|js|png|jpg|jpeg|gif|svg|ico|woff|ttf|php))"',
        r'url\(["\']?([^"\']*\.(html|css|js|png|jpg|jpeg|gif|svg|ico|woff|ttf|php))["\']?\)',
        r'@import\s+["\']([^"\']*\.(css))["\']',
    ]
    
    # Find all HTML files
    html_files = []
    for root, dirs, files in os.walk('.'):
        # Skip certain directories
        if any(skip in root for skip in ['Not_Needed', 'wp-content', 'wp-includes', 'wp-json', 'external-assets', '_http_', '_https_']):
            continue
        for file in files:
            if file.endswith('.html'):
                html_files.append(os.path.join(root, file))
    
    print(f"Analyzing {len(html_files)} HTML files...")
    
    for html_file in html_files:
        try:
            with open(html_file, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
                
            for pattern in patterns:
                matches = re.findall(pattern, content, re.IGNORECASE)
                for match in matches:
                    if isinstance(match, tuple):
                        file_path = match[0]
                    else:
                        file_path = match
                    
                    # Clean up the path
                    file_path = file_path.split('?')[0]  # Remove query parameters
                    file_path = file_path.split('#')[0]  # Remove fragments
                    
                    # Convert relative paths to absolute
                    if file_path.startswith('../'):
                        # Count the number of ../
                        up_levels = file_path.count('../')
                        # Get the directory of the current HTML file
                        html_dir = os.path.dirname(html_file)
                        # Go up the required levels
                        for _ in range(up_levels):
                            html_dir = os.path.dirname(html_dir)
                        # Join with the remaining path
                        file_path = os.path.join(html_dir, file_path[up_levels * 3:])
                    elif file_path.startswith('./'):
                        file_path = file_path[2:]
                    elif not file_path.startswith('/') and not file_path.startswith('http'):
                        # Relative path from current file's directory
                        html_dir = os.path.dirname(html_file)
                        file_path = os.path.join(html_dir, file_path)
                    
                    # Normalize the path
                    file_path = os.path.normpath(file_path)
                    references.add(file_path)
                    
        except Exception as e:
            print(f"Error reading {html_file}: {e}")
    
    return references

def find_all_files():
    """Find all files in the project"""
    all_files = set()
    
    for root, dirs, files in os.walk('.'):
        # Skip certain directories
        if any(skip in root for skip in ['Not_Needed', '.git']):
            continue
        for file in files:
            file_path = os.path.join(root, file)
            all_files.add(os.path.normpath(file_path))
    
    return all_files

def main():
    print("Starting file usage analysis...")
    
    # Find all file references
    referenced_files = find_file_references()
    print(f"Found {len(referenced_files)} referenced files")
    
    # Find all files
    all_files = find_all_files()
    print(f"Found {len(all_files)} total files")
    
    # Find unused files
    unused_files = all_files - referenced_files
    
    # Filter out some files that are typically not referenced but are needed
    essential_patterns = [
        'index.html',
        'cookie-consent.js',
        'favicon',
        'logo.png',
        'apple-touch-icon',
        'safari-pinned-tab',
        'site.html',
        'xmlrpc',
        'contact-form-handler.php'
    ]
    
    truly_unused = []
    for file in unused_files:
        is_essential = any(pattern in file.lower() for pattern in essential_patterns)
        if not is_essential:
            truly_unused.append(file)
    
    print(f"\nFound {len(truly_unused)} potentially unused files:")
    for file in sorted(truly_unused):
        print(f"  {file}")
    
    # Save results
    with open('unused_files.txt', 'w') as f:
        for file in sorted(truly_unused):
            f.write(f"{file}\n")
    
    print(f"\nResults saved to unused_files.txt")

if __name__ == "__main__":
    main()
