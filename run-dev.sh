#!/bin/bash

# Daily Secrets App - Development Runner
# This script sets up the Flutter environment and runs the development server

echo "🌟 Daily Secrets App - Development Setup 🌟"
echo "============================================="

# Set Flutter PATH
export PATH="/Users/lathikadissanayaka/flutter/bin:$PATH"

# Check if Flutter is available
if ! command -v flutter &> /dev/null; then
    echo "❌ Flutter not found. Please install Flutter first."
    echo "   Download from: https://flutter.dev/docs/get-started/install"
    exit 1
fi

echo "✅ Flutter found: $(flutter --version | head -1)"

# Get dependencies
echo "📦 Getting Flutter dependencies..."
flutter pub get

# Check for any issues
echo "🔍 Running Flutter doctor..."
flutter doctor --android-licenses 2>/dev/null || true

# Start development server
echo "🚀 Starting development server on http://localhost:8120"
echo "   Press Ctrl+C to stop the server"
echo ""

flutter run -d web-server --web-port=8120
