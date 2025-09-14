/**
 * Migration Script: Convert Individual Modal Scripts to Centralized Script
 * 
 * This script helps migrate all pages from individual inline scripts
 * to the centralized contact-modal.js script.
 * 
 * Usage: Run this script in Node.js to automatically update all HTML files
 */

const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
    // Directory to search for HTML files
    searchDir: '.',
    
    // Files to exclude from migration
    excludeFiles: [
        'index-2.html', // Reference file
        'indexCopy.html', // Backup files
        '**/indexBackup.html',
        '**/indexCopy.html'
    ],
    
    // Pattern to match the inline script block
    scriptPattern: /<!-- Off-Canvas Trigger Script -->\s*<script>[\s\S]*?<\/script>/g,
    
    // Replacement script tag
    replacementScript: '<!-- Centralized Contact Modal Script -->\n<script src="js/contact-modal.js"></script>'
};

/**
 * Check if file should be excluded
 */
function shouldExcludeFile(filePath) {
    return CONFIG.excludeFiles.some(pattern => {
        if (pattern.includes('**')) {
            const regex = new RegExp(pattern.replace(/\*\*/g, '.*'));
            return regex.test(filePath);
        }
        return filePath.includes(pattern);
    });
}

/**
 * Find all HTML files recursively
 */
function findHtmlFiles(dir) {
    const files = [];
    
    function traverse(currentDir) {
        const items = fs.readdirSync(currentDir);
        
        for (const item of items) {
            const fullPath = path.join(currentDir, item);
            const stat = fs.statSync(fullPath);
            
            if (stat.isDirectory()) {
                traverse(fullPath);
            } else if (item.endsWith('.html') && !shouldExcludeFile(fullPath)) {
                files.push(fullPath);
            }
        }
    }
    
    traverse(dir);
    return files;
}

/**
 * Check if file contains the inline script
 */
function hasInlineScript(content) {
    return CONFIG.scriptPattern.test(content);
}

/**
 * Replace inline script with centralized script reference
 */
function replaceInlineScript(content) {
    return content.replace(CONFIG.scriptPattern, CONFIG.replacementScript);
}

/**
 * Migrate a single file
 */
function migrateFile(filePath) {
    try {
        console.log(`Processing: ${filePath}`);
        
        const content = fs.readFileSync(filePath, 'utf8');
        
        if (!hasInlineScript(content)) {
            console.log(`  ⏭️  Skipped: No inline script found`);
            return { success: false, reason: 'No inline script found' };
        }
        
        const newContent = replaceInlineScript(content);
        
        if (newContent === content) {
            console.log(`  ⏭️  Skipped: No changes needed`);
            return { success: false, reason: 'No changes needed' };
        }
        
        // Create backup
        const backupPath = filePath + '.backup';
        fs.writeFileSync(backupPath, content);
        
        // Write new content
        fs.writeFileSync(filePath, newContent);
        
        console.log(`  ✅ Migrated successfully`);
        console.log(`  📁 Backup created: ${backupPath}`);
        
        return { success: true };
        
    } catch (error) {
        console.error(`  ❌ Error: ${error.message}`);
        return { success: false, reason: error.message };
    }
}

/**
 * Main migration function
 */
function migrate() {
    console.log('🚀 Starting migration to centralized contact modal script...\n');
    
    const htmlFiles = findHtmlFiles(CONFIG.searchDir);
    console.log(`Found ${htmlFiles.length} HTML files to process\n`);
    
    const results = {
        total: htmlFiles.length,
        migrated: 0,
        skipped: 0,
        errors: 0,
        details: []
    };
    
    for (const filePath of htmlFiles) {
        const result = migrateFile(filePath);
        results.details.push({ file: filePath, ...result });
        
        if (result.success) {
            results.migrated++;
        } else if (result.reason === 'No inline script found' || result.reason === 'No changes needed') {
            results.skipped++;
        } else {
            results.errors++;
        }
    }
    
    // Print summary
    console.log('\n📊 Migration Summary:');
    console.log(`  Total files: ${results.total}`);
    console.log(`  ✅ Migrated: ${results.migrated}`);
    console.log(`  ⏭️  Skipped: ${results.skipped}`);
    console.log(`  ❌ Errors: ${results.errors}`);
    
    if (results.errors > 0) {
        console.log('\n❌ Files with errors:');
        results.details
            .filter(d => !d.success && d.reason !== 'No inline script found' && d.reason !== 'No changes needed')
            .forEach(d => console.log(`  - ${d.file}: ${d.reason}`));
    }
    
    console.log('\n🎉 Migration completed!');
    console.log('\nNext steps:');
    console.log('1. Test the migrated pages to ensure they work correctly');
    console.log('2. Remove backup files once you\'re satisfied with the results');
    console.log('3. Update any remaining pages manually if needed');
}

// Run migration if this script is executed directly
if (require.main === module) {
    migrate();
}

module.exports = { migrate, migrateFile, findHtmlFiles };
