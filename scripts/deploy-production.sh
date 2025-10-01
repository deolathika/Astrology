#!/bin/bash

# Deploy to Production Environment
# This script deploys the application to the production environment

set -e

echo "🚀 Starting production deployment..."

# Check if we're on the main branch
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo "❌ Error: Must be on 'main' branch to deploy to production"
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

# Confirm production deployment
echo "⚠️  WARNING: You are about to deploy to PRODUCTION!"
echo "This will affect live users."
read -p "Are you sure you want to continue? (yes/no): " -r
if [[ ! $REPLY =~ ^[Yy][Ee][Ss]$ ]]; then
    echo "❌ Production deployment cancelled"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Run full test suite
echo "🧪 Running full test suite..."
npm run test:all

# Run security audit
echo "🔒 Running security audit..."
npm audit --audit-level=high

# Build application
echo "🔨 Building application for production..."
NODE_ENV=production npm run build

# Check build success
if [ ! -d ".next" ]; then
    echo "❌ Error: Build failed - .next directory not found"
    exit 1
fi

echo "✅ Production build successful"

# Run performance tests
echo "⚡ Running performance tests..."
npm run test:lighthouse

# Deploy to Vercel (production)
echo "🌐 Deploying to Vercel production..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel@latest
fi

# Deploy to production
vercel --prod --confirm

echo "✅ Production deployment completed!"
echo "🌐 Production URL: https://daily-secrets-app.vercel.app"

# Run post-deployment tests
echo "🧪 Running post-deployment tests..."
npm run test:e2e:headless

# Create git tag for release
VERSION=$(date +"%Y.%m.%d.%H%M")
echo "🏷️  Creating release tag: v$VERSION"
git tag -a "v$VERSION" -m "Production release v$VERSION"
git push origin "v$VERSION"

echo "🎉 Production deployment successful!"
echo "📊 Check the production environment at: https://daily-secrets-app.vercel.app"
echo "🏷️  Release tag: v$VERSION"