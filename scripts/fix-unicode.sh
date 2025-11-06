#!/bin/bash

# Script to replace Unicode characters with LaTeX-compatible alternatives
# This can be run before PDF conversion if you encounter Unicode issues

set -e

DOCS_DIR="$(dirname "$(dirname "$0")")/docs"

echo "Replacing Unicode characters with LaTeX-compatible alternatives..."

# Replace checkmark emoji with text alternative
find "$DOCS_DIR" -name "*.md" -type f | while read file; do
    echo "Processing: $(basename "$file")"
    
    # Replace [✓] with • (bullet) for better compatibility
    sed -i 's/\[✓\]/•/g' "$file"
    
    # Replace standalone ✓ with • (bullet)
    sed -i 's/✓/•/g' "$file"
    
    # Replace any remaining checkmark emojis
    sed -i 's/✅/•/g' "$file"
    
    # Replace other common Unicode characters that might cause issues
    sed -i 's/✗/✕/g' "$file"  # Replace cross mark with alternative
done

echo "Done! All Unicode characters have been replaced with LaTeX-compatible alternatives."
echo "You can now run the PDF conversion script."

