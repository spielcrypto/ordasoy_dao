#!/bin/bash

# Script to convert Ordasoy DAO markdown documentation to PDF
# Requires: pandoc, LaTeX (texlive-core or similar), and optionally wkhtmltopdf

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Get script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
DOCS_DIR="$PROJECT_ROOT/docs"
OUTPUT_DIR="$PROJECT_ROOT/docs/pdf"

# Create output directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

echo -e "${GREEN}Ordasoy DAO - Markdown to PDF Converter${NC}"
echo "=========================================="
echo ""

# Check if pandoc is installed
if ! command -v pandoc &> /dev/null; then
    echo -e "${RED}Error: pandoc is not installed.${NC}"
    echo "Please install pandoc:"
    echo "  - Ubuntu/Debian: sudo apt-get install pandoc"
    echo "  - macOS: brew install pandoc"
    echo "  - Arch Linux: sudo pacman -S pandoc"
    exit 1
fi

# Check if LaTeX is installed (for PDF generation)
if ! command -v pdflatex &> /dev/null && ! command -v xelatex &> /dev/null; then
    echo -e "${YELLOW}Warning: No LaTeX engine found (pdflatex or xelatex).${NC}"
    echo "PDF generation may not work properly."
    echo "Please install LaTeX:"
    echo "  - Ubuntu/Debian: sudo apt-get install texlive-latex-base texlive-latex-extra texlive-fonts-recommended texlive-xetex"
    echo "  - macOS: brew install --cask mactex"
    echo "  - Arch/Manjaro: sudo pacman -S texlive-core texlive-latexextra texlive-xetex"
    echo ""
    echo "Note: XeLaTeX is recommended for better Unicode/emoji support."
    echo "Alternatively, you can use wkhtmltopdf method (see script comments)."
    echo ""
fi

# Function to convert markdown to PDF using pandoc
convert_to_pdf() {
    local input_file="$1"
    local output_file="$2"
    local language="$3"
    
    echo -e "${GREEN}Converting: $(basename "$input_file")${NC}"
    
    # Check if input file exists
    if [ ! -f "$input_file" ]; then
        echo -e "${RED}Error: Input file not found: $input_file${NC}"
        return 1
    fi
    
    # Try XeLaTeX first (better Unicode support), fall back to pdflatex if needed
    local pdf_engine="xelatex"
    
    if ! command -v xelatex &> /dev/null; then
        pdf_engine="pdflatex"
        echo -e "${YELLOW}Note: XeLaTeX not found, using pdflatex. Unicode support may be limited.${NC}"
    fi
    
    # Get script directory for header files
    local script_dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
    local pagebreak_header="$script_dir/pagebreak-header.tex"
    
    # Build pandoc command
    local pandoc_cmd="pandoc \"$input_file\" -o \"$output_file\" --pdf-engine=$pdf_engine"
    pandoc_cmd="$pandoc_cmd -V geometry:margin=1in -V documentclass=article"
    pandoc_cmd="$pandoc_cmd -V fontsize=11pt -V linestretch=1.2"
    pandoc_cmd="$pandoc_cmd --toc --toc-depth=3"
    pandoc_cmd="$pandoc_cmd -V colorlinks=true -V linkcolor=blue -V urlcolor=blue -V toccolor=black"
    pandoc_cmd="$pandoc_cmd --highlight-style=tango"
    
    # Add page break control header for better layout
    if [ -f "$pagebreak_header" ]; then
        pandoc_cmd="$pandoc_cmd -H \"$pagebreak_header\""
    fi
    
    # Add language-specific settings
    local toc_title="Contents"
    case "$language" in
        ru)
            pandoc_cmd="$pandoc_cmd -V lang=russian"
            toc_title="Содержание"
            ;;
        kk)
            pandoc_cmd="$pandoc_cmd -V lang=kazakh"
            toc_title="Мазмұн"
            ;;
        *)
            pandoc_cmd="$pandoc_cmd -V lang=english"
            ;;
    esac
    pandoc_cmd="$pandoc_cmd -V toc-title=\"$toc_title\""
    
    # For XeLaTeX, add fonts that support Cyrillic
    if [ "$pdf_engine" = "xelatex" ]; then
        local header_file="$script_dir/cyrillic-header.tex"
        
        # Check for available fonts and use the best one for Cyrillic support
        if fc-list | grep -qi "DejaVu Serif" 2>/dev/null; then
            # DejaVu has excellent Cyrillic support
            pandoc_cmd="$pandoc_cmd -V mainfont='DejaVu Serif' -V sansfont='DejaVu Sans' -V monofont='DejaVu Sans Mono'"
        elif fc-list | grep -qi "Liberation Serif" 2>/dev/null; then
            # Liberation also supports Cyrillic
            pandoc_cmd="$pandoc_cmd -V mainfont='Liberation Serif' -V sansfont='Liberation Sans' -V monofont='Liberation Mono'"
        elif fc-list | grep -qi "Noto Serif" 2>/dev/null; then
            # Noto fonts have good Unicode support
            pandoc_cmd="$pandoc_cmd -V mainfont='Noto Serif' -V sansfont='Noto Sans' -V monofont='Noto Sans Mono'"
        else
            # Use system default - may not support Cyrillic well
            echo -e "${YELLOW}Note: Preferred fonts not found. Cyrillic characters may not render correctly.${NC}"
            echo -e "${YELLOW}Consider installing: sudo pacman -S ttf-dejavu${NC}"
        fi
        
        # For Russian and Kazakh, add header to ensure proper Cyrillic font setup
        if [ "$language" = "ru" ] || [ "$language" = "kk" ]; then
            if [ -f "$header_file" ]; then
                pandoc_cmd="$pandoc_cmd -H \"$header_file\""
            fi
        fi
    fi
    
    # Execute pandoc command
    eval "$pandoc_cmd" 2>&1 | grep -v "Warning" || true
    
    if [ -f "$output_file" ]; then
        echo -e "${GREEN}✓ Successfully created: $(basename "$output_file")${NC}"
        return 0
    else
        echo -e "${RED}✗ Failed to create: $(basename "$output_file")${NC}"
        return 1
    fi
}

# Function to convert using wkhtmltopdf (alternative method)
convert_to_pdf_wkhtmltopdf() {
    local input_file="$1"
    local output_file="$2"
    
    echo -e "${GREEN}Converting: $(basename "$input_file") using wkhtmltopdf${NC}"
    
    if ! command -v wkhtmltopdf &> /dev/null; then
        echo -e "${RED}Error: wkhtmltopdf is not installed.${NC}"
        echo "Please install wkhtmltopdf:"
        echo "  - Ubuntu/Debian: sudo apt-get install wkhtmltopdf"
        echo "  - macOS: brew install wkhtmltopdf"
        echo "  - Arch Linux: sudo pacman -S wkhtmltopdf-static"
        return 1
    fi
    
    # First convert markdown to HTML
    local html_file="${output_file%.pdf}.html"
    pandoc "$input_file" -o "$html_file" --standalone --css="$SCRIPT_DIR/pdf-styles.css" 2>&1 | grep -v "Warning" || true
    
    # Then convert HTML to PDF
    wkhtmltopdf \
        --page-size A4 \
        --margin-top 20mm \
        --margin-bottom 20mm \
        --margin-left 15mm \
        --margin-right 15mm \
        --encoding UTF-8 \
        --enable-local-file-access \
        "$html_file" "$output_file" 2>&1 | grep -v "Warning" || true
    
    # Clean up HTML file
    rm -f "$html_file"
    
    if [ -f "$output_file" ]; then
        echo -e "${GREEN}✓ Successfully created: $(basename "$output_file")${NC}"
        return 0
    else
        echo -e "${RED}✗ Failed to create: $(basename "$output_file")${NC}"
        return 1
    fi
}

# Convert all markdown files
echo "Converting markdown files to PDF..."
echo ""

# English version
if [ -f "$DOCS_DIR/ordasoy-dao-en.md" ]; then
    convert_to_pdf "$DOCS_DIR/ordasoy-dao-en.md" "$OUTPUT_DIR/ordasoy-dao-en.pdf" "en"
    echo ""
fi

# Russian version
if [ -f "$DOCS_DIR/ordasoy-dao-ru.md" ]; then
    convert_to_pdf "$DOCS_DIR/ordasoy-dao-ru.md" "$OUTPUT_DIR/ordasoy-dao-ru.pdf" "ru"
    echo ""
fi

# Kazakh version
if [ -f "$DOCS_DIR/ordasoy-dao-kk.md" ]; then
    convert_to_pdf "$DOCS_DIR/ordasoy-dao-kk.md" "$OUTPUT_DIR/ordasoy-dao-kk.pdf" "kk"
    echo ""
fi

echo "=========================================="
echo -e "${GREEN}Conversion complete!${NC}"
echo "PDF files are available in: $OUTPUT_DIR"
echo ""

# List generated files
if [ -d "$OUTPUT_DIR" ]; then
    echo "Generated PDF files:"
    ls -lh "$OUTPUT_DIR"/*.pdf 2>/dev/null || echo "No PDF files found."
fi

echo ""
echo "Note: If you encounter font issues, you may need to install additional fonts:"
echo "  - For Russian/Cyrillic:"
echo "    * Arch/Manjaro: sudo pacman -S texlive-langcyrillic"
echo "    * Ubuntu/Debian: sudo apt-get install texlive-lang-cyrillic"
echo "    * macOS: Included in MacTeX"
echo "  - For Kazakh: Same package (includes Kazakh support)"
echo ""

