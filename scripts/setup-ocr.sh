#!/bin/bash

# OCR Data Extraction Setup Script
# Sets up the OCR processing environment for Daily Secrets app

echo "🔧 Setting up OCR Data Extraction System..."

# Check if Python 3 is available
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is required but not installed."
    echo "Please install Python 3 and try again."
    exit 1
fi

# Check if pip is available
if ! command -v pip3 &> /dev/null; then
    echo "❌ pip3 is required but not installed."
    echo "Please install pip3 and try again."
    exit 1
fi

# Install Python dependencies
echo "📦 Installing Python dependencies..."
pip3 install -r requirements.txt

# Check if Tesseract is installed
if ! command -v tesseract &> /dev/null; then
    echo "⚠️  Tesseract OCR engine not found."
    echo "Please install Tesseract OCR:"
    echo "  macOS: brew install tesseract"
    echo "  Ubuntu: sudo apt-get install tesseract-ocr"
    echo "  Windows: Download from https://github.com/UB-Mannheim/tesseract/wiki"
fi

# Create necessary directories
echo "📁 Creating directories..."
mkdir -p inputs/images
mkdir -p data/numerology
mkdir -p data/astro
mkdir -p docs
mkdir -p tmp/ocr

# Make scripts executable
chmod +x scripts/ocr-processor.py

echo "✅ Setup completed!"
echo ""
echo "📋 Next steps:"
echo "1. Add your images to inputs/images/"
echo "2. Run: python3 scripts/ocr-processor.py"
echo "3. Check the data/ directory for extracted JSON files"
echo "4. Review docs/ directory for documentation"
echo ""
echo "📁 Directory structure:"
echo "  inputs/images/     - Place your images here"
echo "  data/numerology/   - Extracted numerology data"
echo "  data/astro/        - Extracted astrology data"
echo "  docs/              - Documentation"
echo "  tmp/ocr/           - Temporary OCR results"
