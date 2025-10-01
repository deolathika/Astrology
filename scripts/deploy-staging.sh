#!/bin/bash

# Deploy to Staging Environment
# This script deploys the application to the staging environment

set -e

echo "🚀 Starting staging deployment..."

# Check if we're on the right branch
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "staging" ] && [ "$CURRENT_BRANCH" != "develop" ]; then
    echo "❌ Error: Must be on 'staging' or 'develop' branch to deploy to staging"
    echo "Current branch: $CURRENT_BRANCH"
    exit 1
fi

echo "📋 Current branch: $CURRENT_BRANCH"

# Check if there are uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    echo "❌ Error: Uncommitted changes detected"
    echo "Please commit or stash your changes before deploying"
    git status --short
    exit 1
fi

echo "✅ No uncommitted changes detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Run tests
echo "🧪 Running test suite..."
npm run test:ci

# Build application
echo "🔨 Building application..."
npm run build

# Check build success
if [ ! -d ".next" ]; then
    echo "❌ Error: Build failed - .next directory not found"
    exit 1
fi

echo "✅ Build successful"

# Deploy to Vercel (staging)
echo "🌐 Deploying to Vercel staging..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel@latest
fi

# Deploy to staging
vercel --prod --confirm

echo "✅ Staging deployment completed!"
echo "🌐 Staging URL: https://daily-secrets-app-staging.vercel.app"

# Run post-deployment tests
echo "🧪 Running post-deployment tests..."
npm run test:e2e:headless

echo "🎉 Staging deployment successful!"
echo "📊 Check the staging environment at: https://daily-secrets-app-staging.vercel.app"