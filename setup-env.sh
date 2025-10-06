#!/bin/bash

# Daily Secrets App - Environment Setup Script

echo "🌍 Setting up Daily Secrets App Environment..."

# Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local file..."
    cat > .env.local << 'EOF'
# Google Maps API Key
# Get your API key from: https://console.cloud.google.com/
# Enable the following APIs:
# - Maps JavaScript API
# - Places API  
# - Geocoding API
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here
EOF
    echo "✅ .env.local created successfully!"
else
    echo "⚠️  .env.local already exists, skipping creation."
fi

echo ""
echo "🔧 Next Steps:"
echo "1. Get your Google Maps API key from: https://console.cloud.google.com/"
echo "2. Enable the required APIs (Maps JavaScript API, Places API, Geocoding API)"
echo "3. Add your API key to .env.local: NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key_here"
echo "4. Run: npm run dev"
echo ""
echo "📚 For detailed setup instructions, see: GOOGLE_MAPS_SETUP.md"
echo ""
echo "🎉 Setup complete! Happy coding!"
