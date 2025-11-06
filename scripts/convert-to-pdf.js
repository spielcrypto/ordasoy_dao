#!/usr/bin/env node

/**
 * Node.js script to convert Ordasoy DAO markdown documentation to PDF
 * Requires: markdown-pdf or puppeteer with markdown-pdf
 * 
 * Alternative: Use the bash script (convert-to-pdf.sh) which uses pandoc
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Colors for console output
const colors = {
    reset: '\x1b[0m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

// Get directories
const scriptDir = __dirname;
const projectRoot = path.dirname(scriptDir);
const docsDir = path.join(projectRoot, 'docs');
const outputDir = path.join(projectRoot, 'docs', 'pdf');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

log('Ordasoy DAO - Markdown to PDF Converter (Node.js)', 'green');
log('==========================================', 'green');
log('');

// Check if required packages are installed
function checkPackage(packageName) {
    try {
        require.resolve(packageName);
        return true;
    } catch (e) {
        return false;
    }
}

// Try to use markdown-pdf if available
if (checkPackage('markdown-pdf')) {
    const markdownpdf = require('markdown-pdf');
    
    function convertToPDF(inputFile, outputFile) {
        return new Promise((resolve, reject) => {
            log(`Converting: ${path.basename(inputFile)}`, 'green');
            
            const options = {
                paperFormat: 'A4',
                paperOrientation: 'portrait',
                paperBorder: '2cm',
                renderDelay: 1000,
                cssPath: path.join(scriptDir, 'pdf-styles.css'),
            };
            
            markdownpdf(options)
                .from(inputFile)
                .to(outputFile, (err) => {
                    if (err) {
                        log(`✗ Failed to create: ${path.basename(outputFile)}`, 'red');
                        reject(err);
                    } else {
                        log(`✓ Successfully created: ${path.basename(outputFile)}`, 'green');
                        resolve();
                    }
                });
        });
    }
    
    // Convert all markdown files
    const files = [
        { input: 'ordasoy-dao-en.md', output: 'ordasoy-dao-en.pdf', lang: 'en' },
        { input: 'ordasoy-dao-ru.md', output: 'ordasoy-dao-ru.pdf', lang: 'ru' },
        { input: 'ordasoy-dao-kk.md', output: 'ordasoy-dao-kk.pdf', lang: 'kk' },
    ];
    
    Promise.all(
        files.map(file => {
            const inputPath = path.join(docsDir, file.input);
            const outputPath = path.join(outputDir, file.output);
            
            if (fs.existsSync(inputPath)) {
                return convertToPDF(inputPath, outputPath);
            } else {
                log(`Warning: ${file.input} not found, skipping...`, 'yellow');
                return Promise.resolve();
            }
        })
    ).then(() => {
        log('');
        log('==========================================', 'green');
        log('Conversion complete!', 'green');
        log(`PDF files are available in: ${outputDir}`, 'green');
    }).catch(err => {
        log(`Error: ${err.message}`, 'red');
        process.exit(1);
    });
    
} else {
    // Fallback: try using pandoc via command line
    log('markdown-pdf package not found. Trying to use pandoc...', 'yellow');
    log('');
    
    try {
        execSync('which pandoc', { stdio: 'ignore' });
        
        // Use pandoc via command line
        const files = [
            { input: 'ordasoy-dao-en.md', output: 'ordasoy-dao-en.pdf', lang: 'en' },
            { input: 'ordasoy-dao-ru.md', output: 'ordasoy-dao-ru.pdf', lang: 'ru' },
            { input: 'ordasoy-dao-kk.md', output: 'ordasoy-dao-kk.pdf', lang: 'kk' },
        ];
        
        files.forEach(file => {
            const inputPath = path.join(docsDir, file.input);
            const outputPath = path.join(outputDir, file.output);
            
            if (fs.existsSync(inputPath)) {
                log(`Converting: ${file.input}`, 'green');
                
                try {
                    execSync(
                        `pandoc "${inputPath}" -o "${outputPath}" ` +
                        `--pdf-engine=pdflatex ` +
                        `-V geometry:margin=1in ` +
                        `-V documentclass=article ` +
                        `-V fontsize=11pt ` +
                        `-V linestretch=1.2 ` +
                        `-V lang="${file.lang}" ` +
                        `--toc --toc-depth=3 ` +
                        `-V colorlinks=true ` +
                        `-V linkcolor=blue ` +
                        `-V urlcolor=blue ` +
                        `-V toccolor=black ` +
                        `--highlight-style=tango`,
                        { stdio: 'inherit' }
                    );
                    
                    if (fs.existsSync(outputPath)) {
                        log(`✓ Successfully created: ${file.output}`, 'green');
                    }
                } catch (err) {
                    log(`✗ Failed to create: ${file.output}`, 'red');
                }
                
                log('');
            } else {
                log(`Warning: ${file.input} not found, skipping...`, 'yellow');
            }
        });
        
        log('==========================================', 'green');
        log('Conversion complete!', 'green');
        log(`PDF files are available in: ${outputDir}`, 'green');
        
    } catch (err) {
        log('Error: Neither markdown-pdf nor pandoc is available.', 'red');
        log('');
        log('Please install one of the following:', 'yellow');
        log('  1. Install markdown-pdf: npm install -g markdown-pdf', 'yellow');
        log('  2. Install pandoc: https://pandoc.org/installing.html', 'yellow');
        log('  3. Use the bash script: ./scripts/convert-to-pdf.sh', 'yellow');
        process.exit(1);
    }
}

