#!/bin/bash

# Daily Secrets App - Node.js Setup Script
echo "🌟 Setting up Node.js for Daily Secrets App 🌟"
echo "=============================================="

# Set up NVM
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Check if NVM is working
if command -v nvm &> /dev/null; then
    echo "✅ NVM is available"
    
    # Install Node.js 18
    echo "📦 Installing Node.js 18..."
    nvm install 18
    nvm use 18
    
    # Verify installation
    echo "🔍 Verifying installation..."
    node --version
    npm --version
    
    echo "✅ Node.js setup complete!"
    echo "🚀 You can now run: npm install"
else
    echo "❌ NVM not found. Please install Node.js manually."
    echo "Visit: https://nodejs.org/"
fi
