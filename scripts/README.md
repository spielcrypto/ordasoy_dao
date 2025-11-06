# PDF Conversion Scripts

This directory contains scripts to convert Ordasoy DAO markdown documentation to PDF format.

## Available Scripts

### 1. `convert-to-pdf.sh` (Bash Script - Recommended)

A bash script that uses `pandoc` to convert markdown files to PDF.

**Requirements:**
- `pandoc` - Universal document converter
- `pdflatex` - LaTeX engine for PDF generation
- LaTeX packages (for proper formatting)

**Installation:**

**Ubuntu/Debian:**
```bash
sudo apt-get update
sudo apt-get install pandoc texlive-latex-base texlive-latex-extra texlive-fonts-recommended texlive-lang-cyrillic
```

**macOS:**
```bash
brew install pandoc
brew install --cask mactex
```

**Arch/Manjaro:**
```bash
sudo pacman -S pandoc texlive-core texlive-latexextra texlive-langcyrillic
```

**Usage:**
```bash
chmod +x scripts/convert-to-pdf.sh
./scripts/convert-to-pdf.sh
```

The script will:
- Convert all markdown files in `docs/` directory
- Generate PDF files in `docs/pdf/` directory
- Support English, Russian, and Kazakh languages
- Include table of contents
- Apply proper formatting and styling

### 2. `convert-to-pdf.js` (Node.js Script - Alternative)

A Node.js script that can use either `markdown-pdf` npm package or `pandoc` as a fallback.

**Requirements:**
- Node.js
- Either `markdown-pdf` npm package OR `pandoc` installed

**Installation:**

**Option 1: Using markdown-pdf**
```bash
npm install -g markdown-pdf
```

**Option 2: Using pandoc (see bash script requirements)**

**Usage:**
```bash
chmod +x scripts/convert-to-pdf.js
node scripts/convert-to-pdf.js
# or
./scripts/convert-to-pdf.js
```

## Output

All PDF files will be generated in the `docs/pdf/` directory:
- `ordasoy-dao-en.pdf` - English version
- `ordasoy-dao-ru.pdf` - Russian version
- `ordasoy-dao-kk.pdf` - Kazakh version

## Features

- ✅ Table of contents with 3 levels
- ✅ Proper page margins (1 inch)
- ✅ Professional formatting
- ✅ Support for multiple languages (English, Russian, Kazakh)
- ✅ Syntax highlighting for code blocks
- ✅ Hyperlinks in PDF
- ✅ Cyrillic font support for Russian and Kazakh

## Troubleshooting

### Unicode/Emoji Issues

If you encounter LaTeX errors about Unicode characters (like emojis):

**Solution 1: Use XeLaTeX (Recommended)**
The script now automatically tries to use XeLaTeX which has better Unicode support:
```bash
# Install XeLaTeX
sudo apt-get install texlive-xetex  # Ubuntu/Debian
sudo pacman -S texlive-xetex        # Arch/Manjaro
```

**Solution 2: Replace Emojis**
The markdown files have been updated to use `[✓]` instead of emoji checkmarks. If you still encounter issues, you can manually replace any remaining Unicode characters with LaTeX-compatible alternatives.

**Solution 3: Use wkhtmltopdf**
The script includes an alternative method using wkhtmltopdf which handles Unicode better:
```bash
# Install wkhtmltopdf
sudo apt-get install wkhtmltopdf
# Then modify the script to use convert_to_pdf_wkhtmltopdf function
```

### Font Issues

**Error: "The font 'DejaVu Serif' cannot be found"**

The script has been updated to not require specific fonts. It will use system default fonts which should work on most systems. If you want to use specific fonts:

**Option 1: Install DejaVu fonts (Recommended)**
```bash
# Ubuntu/Debian
sudo apt-get install fonts-dejavu fonts-dejavu-extra

# Arch/Manjaro
sudo pacman -S ttf-dejavu

# macOS (usually pre-installed)
# If not: brew install font-dejavu
```

**Option 2: Use Liberation fonts (Alternative)**
```bash
# Ubuntu/Debian
sudo apt-get install fonts-liberation

# Arch/Manjaro
sudo pacman -S ttf-liberation
```

**Option 3: Let the system use defaults (Current behavior)**
The script now uses system default fonts, which should work without additional installation.

### Cyrillic Font Support

If you encounter font issues with Russian or Kazakh text:

**Ubuntu/Debian:**
```bash
sudo apt-get install texlive-lang-cyrillic fonts-dejavu
```

**Arch/Manjaro:**
```bash
sudo pacman -S texlive-langcyrillic ttf-dejavu
```

### Missing Dependencies

If the script fails, make sure all required dependencies are installed:

```bash
# Check if pandoc is installed
pandoc --version

# Check if pdflatex is installed
pdflatex --version
```

### Alternative: Using Docker

If you have Docker installed, you can use a container with all dependencies:

```bash
docker run --rm -v "$(pwd):/data" pandoc/latex:latest \
  docs/ordasoy-dao-en.md -o docs/pdf/ordasoy-dao-en.pdf \
  --pdf-engine=pdflatex \
  -V geometry:margin=1in \
  --toc
```

## Manual Conversion

If you prefer to convert manually, you can use pandoc directly:

```bash
pandoc docs/ordasoy-dao-en.md -o docs/pdf/ordasoy-dao-en.pdf \
  --pdf-engine=pdflatex \
  -V geometry:margin=1in \
  -V documentclass=article \
  -V fontsize=11pt \
  --toc \
  --toc-depth=3 \
  -V colorlinks=true
```

## Notes

- The scripts automatically create the `docs/pdf/` directory if it doesn't exist
- Generated PDFs are optimized for A4 paper size
- The conversion process may take a few moments depending on document size
- Make sure you have write permissions in the project directory

