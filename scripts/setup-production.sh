#!/bin/bash

# Daily Secrets App - Production Setup Script
# This script helps set up the production environment

echo "🌌 Daily Secrets App - Production Setup"
echo "========================================"

# Check if required tools are installed
check_requirements() {
    echo "📋 Checking requirements..."
    
    if ! command -v node &> /dev/null; then
        echo "❌ Node.js is not installed. Please install Node.js 18+ first."
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        echo "❌ npm is not installed. Please install npm first."
        exit 1
    fi
    
    echo "✅ Node.js and npm are installed"
}

# Install dependencies
install_dependencies() {
    echo "📦 Installing dependencies..."
    npm install
    
    # Install additional production dependencies
    npm install --save next-auth @next-auth/prisma-adapter bcryptjs
    npm install --save swisseph
    npm install --save openai @google/generative-ai
    npm install --save html2canvas
    
    echo "✅ Dependencies installed"
}

# Set up environment variables
setup_environment() {
    echo "🔧 Setting up environment variables..."
    
    if [ ! -f .env.local ]; then
        cp env.production.example .env.local
        echo "✅ Created .env.local from template"
        echo "⚠️  Please edit .env.local with your actual API keys"
    else
        echo "✅ .env.local already exists"
    fi
}

# Set up database
setup_database() {
    echo "🗄️ Setting up database..."
    
    # Generate Prisma client
    npx prisma generate
    
    # Run database migrations
    npx prisma db push
    
    echo "✅ Database setup complete"
}

# Build the application
build_application() {
    echo "🏗️ Building application..."
    
    # Type check
    npm run type-check
    
    # Lint
    npm run lint
    
    # Build
    npm run build
    
    echo "✅ Application built successfully"
}

# Deploy to Vercel
deploy_vercel() {
    echo "🚀 Deploying to Vercel..."
    
    if command -v vercel &> /dev/null; then
        vercel --prod
        echo "✅ Deployed to Vercel"
    else
        echo "⚠️  Vercel CLI not found. Please install it with: npm i -g vercel"
        echo "   Then run: vercel --prod"
    fi
}

# Main setup function
main() {
    echo "Starting production setup..."
    
    check_requirements
    install_dependencies
    setup_environment
    setup_database
    build_application
    
    echo ""
    echo "🎉 Production setup complete!"
    echo ""
    echo "Next steps:"
    echo "1. Edit .env.local with your actual API keys"
    echo "2. Set up your database (PostgreSQL recommended)"
    echo "3. Configure your domain and SSL certificates"
    echo "4. Deploy to Vercel or your preferred platform"
    echo ""
    echo "Required API keys:"
    echo "- OpenAI API key for AI content generation"
    echo "- Google Maps API key for location services"
    echo "- Firebase configuration for notifications"
    echo "- Stripe keys for payments"
    echo "- Database connection string"
    echo ""
    echo "For help, check the DEPLOYMENT_GUIDE.md file"
}

# Run main function
main "$@"
