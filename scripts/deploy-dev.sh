#!/bin/bash

# 🚀 Development Deployment Script
# Deploys to development environment

set -e  # Exit on any error

echo "🌟 Starting development deployment..."

# Check if we're on develop branch
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "develop" ]; then
    echo "❌ Error: Must be on develop branch to deploy to development"
    echo "Current branch: $CURRENT_BRANCH"
    exit 1
fi

# Pull latest changes
echo "📥 Pulling latest changes..."
git pull origin develop

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Run linting
echo "🔍 Running ESLint..."
npm run lint

# Run tests
echo "🧪 Running tests..."
npm run test

# Build application
echo "🔨 Building application..."
npm run build

# Start development server
echo "🚀 Starting development server..."
echo "✅ Development deployment complete!"
echo "🌐 Application running at: http://localhost:8120"

# Start the server
npm run dev
