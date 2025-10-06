# Google Maps Integration Setup Guide

## 🌍 Google Maps Location Picker Integration

This guide will help you set up Google Maps integration for precise birth location selection in the Daily Secrets App.

## 📋 Prerequisites

1. **Google Cloud Console Account**: You need a Google Cloud account
2. **Billing Account**: Google Maps API requires a billing account (but offers free tier)
3. **Domain Verification**: For production use

## 🔧 Setup Steps

### 1. Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable billing for the project

### 2. Enable Required APIs

Enable the following APIs in your Google Cloud project:

- **Maps JavaScript API** - For interactive maps
- **Places API** - For location search and autocomplete
- **Geocoding API** - For converting addresses to coordinates
- **Timezone API** (optional) - For accurate timezone detection

### 3. Create API Key

1. Go to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **API Key**
3. Copy the generated API key
4. **Important**: Restrict the API key for security

### 4. API Key Restrictions (Recommended)

#### Application Restrictions:
- **HTTP referrers (web sites)**: Add your domain(s)
  - `localhost:3000/*` (for development)
  - `yourdomain.com/*` (for production)

#### API Restrictions:
- Select only the APIs you need:
  - Maps JavaScript API
  - Places API
  - Geocoding API

### 5. Environment Configuration

Create a `.env.local` file in your project root:

```bash
# Google Maps API Key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here

# Other environment variables
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here
```

### 6. Install Dependencies

The required package is already installed:
```bash
npm install @googlemaps/js-api-loader
```

## 🚀 Features

### Google Maps Location Picker

- **Interactive Map**: Click to select exact location
- **Search Functionality**: Search for any address worldwide
- **Current Location**: Use GPS to get current location
- **Draggable Marker**: Fine-tune location selection
- **Address Autocomplete**: Smart suggestions as you type
- **Timezone Detection**: Automatic timezone calculation
- **Coordinate Precision**: Exact latitude/longitude coordinates

### Location Selection Options

Users can choose between:

1. **City List**: Pre-defined global cities database (300+ locations)
2. **Google Maps**: Interactive map with precise location selection

## 🎯 Usage

### In Astrology Components

The Google Maps picker is integrated into:

- **Advanced Astrology System** (`/astrology`)
- **Sri Lankan Horoscope Chart** (`/astrology`)

### User Experience

1. **Toggle Options**: Users can switch between "City List" and "Google Maps"
2. **Search**: Type to search for any location worldwide
3. **Map Interaction**: Click on map or drag marker for precise location
4. **Current Location**: Use GPS for automatic location detection
5. **Validation**: Real-time coordinate and timezone validation

## 🔒 Security Considerations

### API Key Security

1. **Restrict API Key**: Always restrict your API key
2. **Domain Restrictions**: Limit to your domains only
3. **API Restrictions**: Enable only required APIs
4. **Usage Limits**: Set daily quotas to prevent abuse

### Environment Variables

- Never commit API keys to version control
- Use environment variables for all sensitive data
- Rotate API keys regularly
- Monitor API usage and costs

## 💰 Pricing

### Google Maps API Pricing (2024)

- **Maps JavaScript API**: $7 per 1,000 loads
- **Places API**: $17 per 1,000 requests
- **Geocoding API**: $5 per 1,000 requests
- **Free Tier**: $200 monthly credit (covers most small-medium apps)

### Cost Optimization

1. **Caching**: Cache geocoding results
2. **Debouncing**: Limit search requests
3. **Usage Monitoring**: Track API usage
4. **Fallback**: Use city list as fallback

## 🛠️ Development

### Local Development

1. Set up `.env.local` with your API key
2. Start development server: `npm run dev`
3. Test location picker functionality
4. Verify API key restrictions

### Production Deployment

1. Add production domain to API key restrictions
2. Set up environment variables in hosting platform
3. Monitor API usage and costs
4. Implement error handling and fallbacks

## 🐛 Troubleshooting

### Common Issues

1. **API Key Not Working**
   - Check if API key is correctly set in environment
   - Verify API restrictions
   - Ensure required APIs are enabled

2. **Maps Not Loading**
   - Check browser console for errors
   - Verify API key permissions
   - Check domain restrictions

3. **Search Not Working**
   - Ensure Places API is enabled
   - Check API key restrictions
   - Verify billing account is active

### Error Handling

The component includes comprehensive error handling:

- **API Key Missing**: Graceful fallback to city list
- **Network Errors**: Retry mechanisms
- **Invalid Locations**: User-friendly error messages
- **Rate Limiting**: Automatic retry with backoff

## 📱 Mobile Support

- **Responsive Design**: Works on all screen sizes
- **Touch Support**: Full touch interaction
- **GPS Integration**: Current location on mobile devices
- **Performance**: Optimized for mobile networks

## 🌟 Advanced Features

### Customization

- **Map Styles**: Dark theme for cosmic aesthetic
- **Custom Markers**: Themed location markers
- **Search Filters**: Filter by location type
- **Timezone Detection**: Automatic timezone calculation

### Integration

- **Astrological Calculations**: Precise coordinates for accurate calculations
- **Timezone Support**: Automatic timezone detection
- **Address Formatting**: Standardized address format
- **Coordinate Precision**: High-precision coordinates

## 📊 Analytics

Track usage and performance:

- **Location Selections**: Most popular locations
- **Search Queries**: Common search terms
- **API Usage**: Monitor API consumption
- **Error Rates**: Track and fix issues

## 🔄 Updates

### Regular Maintenance

1. **API Key Rotation**: Rotate keys every 90 days
2. **Usage Monitoring**: Check API usage monthly
3. **Cost Optimization**: Review and optimize usage
4. **Security Updates**: Keep restrictions updated

### Version Updates

- **Google Maps API**: Keep API version updated
- **Dependencies**: Update npm packages regularly
- **Security Patches**: Apply security updates promptly

## 📞 Support

### Documentation

- [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript)
- [Places API Documentation](https://developers.google.com/maps/documentation/places)
- [Geocoding API Documentation](https://developers.google.com/maps/documentation/geocoding)

### Community

- [Google Maps Platform Community](https://developers.google.com/maps/community)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/google-maps)
- [GitHub Issues](https://github.com/googlemaps/js-api-loader/issues)

---

## 🎉 Ready to Use!

Once set up, users can:

1. **Select Precise Locations**: Click anywhere on the map
2. **Search Any Address**: Type to find any location worldwide
3. **Use Current Location**: GPS integration for mobile users
4. **Get Accurate Coordinates**: Precise latitude/longitude for astrological calculations
5. **Automatic Timezone**: Timezone detection for accurate birth time calculations

The Google Maps integration provides the most accurate and user-friendly location selection experience for astrological calculations! 🌟
