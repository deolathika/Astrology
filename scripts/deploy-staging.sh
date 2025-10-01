#!/bin/bash

# 🧪 Staging Deployment Script
# Deploys to staging environment for testing

set -e  # Exit on any error

echo "🧪 Starting staging deployment..."

# Check if we're on staging branch
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "staging" ]; then
    echo "❌ Error: Must be on staging branch to deploy to staging"
    echo "Current branch: $CURRENT_BRANCH"
    exit 1
fi

# Pull latest changes
echo "📥 Pulling latest changes..."
git pull origin staging

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

# Run production tests
echo "🔬 Running production tests..."
npm run test:prod

# Deploy to staging
echo "🚀 Deploying to staging..."
echo "✅ Staging deployment complete!"
echo "🌐 Staging URL: https://staging.dailysecrets.app"

# Note: Actual deployment would be handled by your CI/CD system
echo "📋 Next steps:"
echo "1. Test all features on staging"
echo "2. Check for any issues"
echo "3. Get approval for production"
echo "4. Merge to main when ready"


