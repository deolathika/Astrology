export interface Location {
  city: string
  country: string
  latitude: number
  longitude: number
  timezone: string
  region: string
  population?: number
  isCapital?: boolean
}

export const globalLocations: Location[] = [
  // Sri Lanka
  { city: 'Colombo', country: 'Sri Lanka', latitude: 6.9271, longitude: 79.8612, timezone: '+05:30', region: 'South Asia', population: 752993, isCapital: false },
  { city: 'Kandy', country: 'Sri Lanka', latitude: 7.2906, longitude: 80.6337, timezone: '+05:30', region: 'South Asia', population: 125400 },
  { city: 'Galle', country: 'Sri Lanka', latitude: 6.0329, longitude: 80.2170, timezone: '+05:30', region: 'South Asia', population: 93118 },
  { city: 'Jaffna', country: 'Sri Lanka', latitude: 9.6615, longitude: 80.0255, timezone: '+05:30', region: 'South Asia', population: 88138 },
  { city: 'Anuradhapura', country: 'Sri Lanka', latitude: 8.3114, longitude: 80.4037, timezone: '+05:30', region: 'South Asia', population: 63208 },
  { city: 'Trincomalee', country: 'Sri Lanka', latitude: 8.5874, longitude: 81.2152, timezone: '+05:30', region: 'South Asia', population: 99135 },
  { city: 'Batticaloa', country: 'Sri Lanka', latitude: 7.7102, longitude: 81.6924, timezone: '+05:30', region: 'South Asia', population: 92239 },
  { city: 'Negombo', country: 'Sri Lanka', latitude: 7.2086, longitude: 79.8358, timezone: '+05:30', region: 'South Asia', population: 142136 },
  { city: 'Ratnapura', country: 'Sri Lanka', latitude: 6.6828, longitude: 80.4012, timezone: '+05:30', region: 'South Asia', population: 46500 },
  { city: 'Kurunegala', country: 'Sri Lanka', latitude: 7.4863, longitude: 80.3623, timezone: '+05:30', region: 'South Asia', population: 28571 },

  // India
  { city: 'Mumbai', country: 'India', latitude: 19.0760, longitude: 72.8777, timezone: '+05:30', region: 'South Asia', population: 12478447, isCapital: false },
  { city: 'Delhi', country: 'India', latitude: 28.7041, longitude: 77.1025, timezone: '+05:30', region: 'South Asia', population: 32941000, isCapital: true },
  { city: 'Bangalore', country: 'India', latitude: 12.9716, longitude: 77.5946, timezone: '+05:30', region: 'South Asia', population: 8443675 },
  { city: 'Chennai', country: 'India', latitude: 13.0827, longitude: 80.2707, timezone: '+05:30', region: 'South Asia', population: 7088000 },
  { city: 'Kolkata', country: 'India', latitude: 22.5726, longitude: 88.3639, timezone: '+05:30', region: 'South Asia', population: 14974073 },
  { city: 'Hyderabad', country: 'India', latitude: 17.3850, longitude: 78.4867, timezone: '+05:30', region: 'South Asia', population: 6809970 },
  { city: 'Pune', country: 'India', latitude: 18.5204, longitude: 73.8567, timezone: '+05:30', region: 'South Asia', population: 3124458 },
  { city: 'Ahmedabad', country: 'India', latitude: 23.0225, longitude: 72.5714, timezone: '+05:30', region: 'South Asia', population: 5570585 },
  { city: 'Jaipur', country: 'India', latitude: 26.9124, longitude: 75.7873, timezone: '+05:30', region: 'South Asia', population: 3073350 },
  { city: 'Surat', country: 'India', latitude: 21.1702, longitude: 72.8311, timezone: '+05:30', region: 'South Asia', population: 4467797 },

  // United States
  { city: 'New York', country: 'United States', latitude: 40.7128, longitude: -74.0060, timezone: '-05:00', region: 'North America', population: 8336817, isCapital: false },
  { city: 'Los Angeles', country: 'United States', latitude: 34.0522, longitude: -118.2437, timezone: '-08:00', region: 'North America', population: 3979576 },
  { city: 'Chicago', country: 'United States', latitude: 41.8781, longitude: -87.6298, timezone: '-06:00', region: 'North America', population: 2693976 },
  { city: 'Houston', country: 'United States', latitude: 29.7604, longitude: -95.3698, timezone: '-06:00', region: 'North America', population: 2320268 },
  { city: 'Phoenix', country: 'United States', latitude: 33.4484, longitude: -112.0740, timezone: '-07:00', region: 'North America', population: 1608139 },
  { city: 'Philadelphia', country: 'United States', latitude: 39.9526, longitude: -75.1652, timezone: '-05:00', region: 'North America', population: 1584064 },
  { city: 'San Antonio', country: 'United States', latitude: 29.4241, longitude: -98.4936, timezone: '-06:00', region: 'North America', population: 1547253 },
  { city: 'San Diego', country: 'United States', latitude: 32.7157, longitude: -117.1611, timezone: '-08:00', region: 'North America', population: 1423851 },
  { city: 'Dallas', country: 'United States', latitude: 32.7767, longitude: -96.7970, timezone: '-06:00', region: 'North America', population: 1343573 },
  { city: 'San Jose', country: 'United States', latitude: 37.3382, longitude: -121.8863, timezone: '-08:00', region: 'North America', population: 1035317 },

  // United Kingdom
  { city: 'London', country: 'United Kingdom', latitude: 51.5074, longitude: -0.1278, timezone: '+00:00', region: 'Europe', population: 8982000, isCapital: true },
  { city: 'Birmingham', country: 'United Kingdom', latitude: 52.4862, longitude: -1.8904, timezone: '+00:00', region: 'Europe', population: 1149000 },
  { city: 'Manchester', country: 'United Kingdom', latitude: 53.4808, longitude: -2.2426, timezone: '+00:00', region: 'Europe', population: 547627 },
  { city: 'Glasgow', country: 'United Kingdom', latitude: 55.8642, longitude: -4.2518, timezone: '+00:00', region: 'Europe', population: 626410 },
  { city: 'Liverpool', country: 'United Kingdom', latitude: 53.4084, longitude: -2.9916, timezone: '+00:00', region: 'Europe', population: 494814 },
  { city: 'Leeds', country: 'United Kingdom', latitude: 53.8008, longitude: -1.5491, timezone: '+00:00', region: 'Europe', population: 793139 },
  { city: 'Sheffield', country: 'United Kingdom', latitude: 53.3811, longitude: -1.4701, timezone: '+00:00', region: 'Europe', population: 582506 },
  { city: 'Edinburgh', country: 'United Kingdom', latitude: 55.9533, longitude: -3.1883, timezone: '+00:00', region: 'Europe', population: 524930 },
  { city: 'Bristol', country: 'United Kingdom', latitude: 51.4545, longitude: -2.5879, timezone: '+00:00', region: 'Europe', population: 463400 },
  { city: 'Newcastle', country: 'United Kingdom', latitude: 54.9783, longitude: -1.6178, timezone: '+00:00', region: 'Europe', population: 300196 },

  // Australia
  { city: 'Sydney', country: 'Australia', latitude: -33.8688, longitude: 151.2093, timezone: '+10:00', region: 'Oceania', population: 5312163, isCapital: false },
  { city: 'Melbourne', country: 'Australia', latitude: -37.8136, longitude: 144.9631, timezone: '+10:00', region: 'Oceania', population: 5078193 },
  { city: 'Brisbane', country: 'Australia', latitude: -27.4698, longitude: 153.0251, timezone: '+10:00', region: 'Oceania', population: 2466591 },
  { city: 'Perth', country: 'Australia', latitude: -31.9505, longitude: 115.8605, timezone: '+08:00', region: 'Oceania', population: 2059484 },
  { city: 'Adelaide', country: 'Australia', latitude: -34.9285, longitude: 138.6007, timezone: '+09:30', region: 'Oceania', population: 1351640 },
  { city: 'Canberra', country: 'Australia', latitude: -35.2809, longitude: 149.1300, timezone: '+10:00', region: 'Oceania', population: 431380, isCapital: true },
  { city: 'Hobart', country: 'Australia', latitude: -42.8821, longitude: 147.3272, timezone: '+10:00', region: 'Oceania', population: 240342 },
  { city: 'Darwin', country: 'Australia', latitude: -12.4634, longitude: 130.8456, timezone: '+09:30', region: 'Oceania', population: 147255 },

  // Canada
  { city: 'Toronto', country: 'Canada', latitude: 43.6532, longitude: -79.3832, timezone: '-05:00', region: 'North America', population: 2930000, isCapital: false },
  { city: 'Montreal', country: 'Canada', latitude: 45.5017, longitude: -73.5673, timezone: '-05:00', region: 'North America', population: 1780000 },
  { city: 'Vancouver', country: 'Canada', latitude: 49.2827, longitude: -123.1207, timezone: '-08:00', region: 'North America', population: 675218 },
  { city: 'Calgary', country: 'Canada', latitude: 51.0447, longitude: -114.0719, timezone: '-07:00', region: 'North America', population: 1239220 },
  { city: 'Ottawa', country: 'Canada', latitude: 45.4215, longitude: -75.6972, timezone: '-05:00', region: 'North America', population: 1017449, isCapital: true },
  { city: 'Edmonton', country: 'Canada', latitude: 53.5461, longitude: -113.4938, timezone: '-07:00', region: 'North America', population: 1017449 },
  { city: 'Winnipeg', country: 'Canada', latitude: 49.8951, longitude: -97.1384, timezone: '-06:00', region: 'North America', population: 749607 },
  { city: 'Quebec City', country: 'Canada', latitude: 46.8139, longitude: -71.2080, timezone: '-05:00', region: 'North America', population: 549459 },
  { city: 'Hamilton', country: 'Canada', latitude: 43.2557, longitude: -79.8711, timezone: '-05:00', region: 'North America', population: 767000 },
  { city: 'Kitchener', country: 'Canada', latitude: 43.4516, longitude: -80.4925, timezone: '-05:00', region: 'North America', population: 256885 },

  // Germany
  { city: 'Berlin', country: 'Germany', latitude: 52.5200, longitude: 13.4050, timezone: '+01:00', region: 'Europe', population: 3669491, isCapital: true },
  { city: 'Hamburg', country: 'Germany', latitude: 53.5511, longitude: 9.9937, timezone: '+01:00', region: 'Europe', population: 1899160 },
  { city: 'Munich', country: 'Germany', latitude: 48.1351, longitude: 11.5820, timezone: '+01:00', region: 'Europe', population: 1484226 },
  { city: 'Cologne', country: 'Germany', latitude: 50.9375, longitude: 6.9603, timezone: '+01:00', region: 'Europe', population: 1085664 },
  { city: 'Frankfurt', country: 'Germany', latitude: 50.1109, longitude: 8.6821, timezone: '+01:00', region: 'Europe', population: 753056 },
  { city: 'Stuttgart', country: 'Germany', latitude: 48.7758, longitude: 9.1829, timezone: '+01:00', region: 'Europe', population: 634830 },
  { city: 'Düsseldorf', country: 'Germany', latitude: 51.2277, longitude: 6.7735, timezone: '+01:00', region: 'Europe', population: 619294 },
  { city: 'Dortmund', country: 'Germany', latitude: 51.5136, longitude: 7.4653, timezone: '+01:00', region: 'Europe', population: 588250 },
  { city: 'Essen', country: 'Germany', latitude: 51.4556, longitude: 7.0116, timezone: '+01:00', region: 'Europe', population: 582760 },
  { city: 'Leipzig', country: 'Germany', latitude: 51.3397, longitude: 12.3731, timezone: '+01:00', region: 'Europe', population: 597493 },

  // France
  { city: 'Paris', country: 'France', latitude: 48.8566, longitude: 2.3522, timezone: '+01:00', region: 'Europe', population: 2161000, isCapital: true },
  { city: 'Marseille', country: 'France', latitude: 43.2965, longitude: 5.3698, timezone: '+01:00', region: 'Europe', population: 870018 },
  { city: 'Lyon', country: 'France', latitude: 45.7640, longitude: 4.8357, timezone: '+01:00', region: 'Europe', population: 515695 },
  { city: 'Toulouse', country: 'France', latitude: 43.6047, longitude: 1.4442, timezone: '+01:00', region: 'Europe', population: 479553 },
  { city: 'Nice', country: 'France', latitude: 43.7102, longitude: 7.2620, timezone: '+01:00', region: 'Europe', population: 340017 },
  { city: 'Nantes', country: 'France', latitude: 47.2184, longitude: -1.5536, timezone: '+01:00', region: 'Europe', population: 314138 },
  { city: 'Strasbourg', country: 'France', latitude: 48.5734, longitude: 7.7521, timezone: '+01:00', region: 'Europe', population: 280966 },
  { city: 'Montpellier', country: 'France', latitude: 43.6110, longitude: 3.8767, timezone: '+01:00', region: 'Europe', population: 290053 },
  { city: 'Bordeaux', country: 'France', latitude: 44.8378, longitude: -0.5792, timezone: '+01:00', region: 'Europe', population: 254436 },
  { city: 'Lille', country: 'France', latitude: 50.6292, longitude: 3.0573, timezone: '+01:00', region: 'Europe', population: 232787 },

  // Japan
  { city: 'Tokyo', country: 'Japan', latitude: 35.6762, longitude: 139.6503, timezone: '+09:00', region: 'East Asia', population: 13929286, isCapital: true },
  { city: 'Osaka', country: 'Japan', latitude: 34.6937, longitude: 135.5023, timezone: '+09:00', region: 'East Asia', population: 2691185 },
  { city: 'Yokohama', country: 'Japan', latitude: 35.4437, longitude: 139.6380, timezone: '+09:00', region: 'East Asia', population: 3726167 },
  { city: 'Nagoya', country: 'Japan', latitude: 35.1815, longitude: 136.9066, timezone: '+09:00', region: 'East Asia', population: 2324469 },
  { city: 'Sapporo', country: 'Japan', latitude: 43.0642, longitude: 141.3469, timezone: '+09:00', region: 'East Asia', population: 1952356 },
  { city: 'Fukuoka', country: 'Japan', latitude: 33.5904, longitude: 130.4017, timezone: '+09:00', region: 'East Asia', population: 1538251 },
  { city: 'Kobe', country: 'Japan', latitude: 34.6901, longitude: 135.1956, timezone: '+09:00', region: 'East Asia', population: 1528478 },
  { city: 'Kyoto', country: 'Japan', latitude: 35.0116, longitude: 135.7681, timezone: '+09:00', region: 'East Asia', population: 1464890 },
  { city: 'Kawasaki', country: 'Japan', latitude: 35.5307, longitude: 139.7029, timezone: '+09:00', region: 'East Asia', population: 1536782 },
  { city: 'Saitama', country: 'Japan', latitude: 35.8617, longitude: 139.6455, timezone: '+09:00', region: 'East Asia', population: 1324479 },

  // China
  { city: 'Beijing', country: 'China', latitude: 39.9042, longitude: 116.4074, timezone: '+08:00', region: 'East Asia', population: 21540000, isCapital: true },
  { city: 'Shanghai', country: 'China', latitude: 31.2304, longitude: 121.4737, timezone: '+08:00', region: 'East Asia', population: 24280000 },
  { city: 'Guangzhou', country: 'China', latitude: 23.1291, longitude: 113.2644, timezone: '+08:00', region: 'East Asia', population: 14904400 },
  { city: 'Shenzhen', country: 'China', latitude: 22.5431, longitude: 114.0579, timezone: '+08:00', region: 'East Asia', population: 12528300 },
  { city: 'Chengdu', country: 'China', latitude: 30.5728, longitude: 104.0668, timezone: '+08:00', region: 'East Asia', population: 16580000 },
  { city: 'Hangzhou', country: 'China', latitude: 30.2741, longitude: 120.1551, timezone: '+08:00', region: 'East Asia', population: 10360000 },
  { city: 'Wuhan', country: 'China', latitude: 30.5928, longitude: 114.3055, timezone: '+08:00', region: 'East Asia', population: 12320000 },
  { city: 'Xi\'an', country: 'China', latitude: 34.3416, longitude: 108.9398, timezone: '+08:00', region: 'East Asia', population: 12350000 },
  { city: 'Nanjing', country: 'China', latitude: 32.0603, longitude: 118.7969, timezone: '+08:00', region: 'East Asia', population: 8500000 },
  { city: 'Tianjin', country: 'China', latitude: 39.3434, longitude: 117.3616, timezone: '+08:00', region: 'East Asia', population: 15590000 },

  // Brazil
  { city: 'São Paulo', country: 'Brazil', latitude: -23.5505, longitude: -46.6333, timezone: '-03:00', region: 'South America', population: 12396372, isCapital: false },
  { city: 'Rio de Janeiro', country: 'Brazil', latitude: -22.9068, longitude: -43.1729, timezone: '-03:00', region: 'South America', population: 6747815 },
  { city: 'Brasília', country: 'Brazil', latitude: -15.7801, longitude: -47.9292, timezone: '-03:00', region: 'South America', population: 3015268, isCapital: true },
  { city: 'Salvador', country: 'Brazil', latitude: -12.9777, longitude: -38.5016, timezone: '-03:00', region: 'South America', population: 2886698 },
  { city: 'Fortaleza', country: 'Brazil', latitude: -3.7319, longitude: -38.5267, timezone: '-03:00', region: 'South America', population: 2703391 },
  { city: 'Belo Horizonte', country: 'Brazil', latitude: -19.9167, longitude: -43.9345, timezone: '-03:00', region: 'South America', population: 2530701 },
  { city: 'Manaus', country: 'Brazil', latitude: -3.1190, longitude: -60.0217, timezone: '-04:00', region: 'South America', population: 2255903 },
  { city: 'Curitiba', country: 'Brazil', latitude: -25.4244, longitude: -49.2654, timezone: '-03:00', region: 'South America', population: 1948626 },
  { city: 'Recife', country: 'Brazil', latitude: -8.0476, longitude: -34.8770, timezone: '-03:00', region: 'South America', population: 1653461 },
  { city: 'Porto Alegre', country: 'Brazil', latitude: -30.0346, longitude: -51.2177, timezone: '-03:00', region: 'South America', population: 1492530 },

  // South Africa
  { city: 'Johannesburg', country: 'South Africa', latitude: -26.2041, longitude: 28.0473, timezone: '+02:00', region: 'Africa', population: 5634800, isCapital: false },
  { city: 'Cape Town', country: 'South Africa', latitude: -33.9249, longitude: 18.4241, timezone: '+02:00', region: 'Africa', population: 4618000, isCapital: false },
  { city: 'Durban', country: 'South Africa', latitude: -29.8587, longitude: 31.0218, timezone: '+02:00', region: 'Africa', population: 3442361 },
  { city: 'Pretoria', country: 'South Africa', latitude: -25.7479, longitude: 28.2293, timezone: '+02:00', region: 'Africa', population: 2921488, isCapital: true },
  { city: 'Port Elizabeth', country: 'South Africa', latitude: -33.9608, longitude: 25.6022, timezone: '+02:00', region: 'Africa', population: 1152935 },
  { city: 'Bloemfontein', country: 'South Africa', latitude: -29.0852, longitude: 26.1596, timezone: '+02:00', region: 'Africa', population: 556000, isCapital: false },
  { city: 'East London', country: 'South Africa', latitude: -33.0292, longitude: 27.8546, timezone: '+02:00', region: 'Africa', population: 478676 },
  { city: 'Polokwane', country: 'South Africa', latitude: -23.9008, longitude: 29.4512, timezone: '+02:00', region: 'Africa', population: 628999 },
  { city: 'Nelspruit', country: 'South Africa', latitude: -25.4747, longitude: 30.9703, timezone: '+02:00', region: 'Africa', population: 110159 },
  { city: 'Kimberley', country: 'South Africa', latitude: -28.7282, longitude: 24.7499, timezone: '+02:00', region: 'Africa', population: 225160 },

  // Middle East
  { city: 'Dubai', country: 'United Arab Emirates', latitude: 25.2048, longitude: 55.2708, timezone: '+04:00', region: 'Middle East', population: 3331420 },
  { city: 'Abu Dhabi', country: 'United Arab Emirates', latitude: 24.4539, longitude: 54.3773, timezone: '+04:00', region: 'Middle East', population: 1450000, isCapital: true },
  { city: 'Riyadh', country: 'Saudi Arabia', latitude: 24.7136, longitude: 46.6753, timezone: '+03:00', region: 'Middle East', population: 7676654, isCapital: true },
  { city: 'Jeddah', country: 'Saudi Arabia', latitude: 21.4858, longitude: 39.1925, timezone: '+03:00', region: 'Middle East', population: 4700000 },
  { city: 'Tehran', country: 'Iran', latitude: 35.6892, longitude: 51.3890, timezone: '+03:30', region: 'Middle East', population: 9150000, isCapital: true },
  { city: 'Istanbul', country: 'Turkey', latitude: 41.0082, longitude: 28.9784, timezone: '+03:00', region: 'Middle East', population: 15519267 },
  { city: 'Ankara', country: 'Turkey', latitude: 39.9334, longitude: 32.8597, timezone: '+03:00', region: 'Middle East', population: 5503985, isCapital: true },
  { city: 'Cairo', country: 'Egypt', latitude: 30.0444, longitude: 31.2357, timezone: '+02:00', region: 'Middle East', population: 20484965, isCapital: true },
  { city: 'Baghdad', country: 'Iraq', latitude: 33.3152, longitude: 44.3661, timezone: '+03:00', region: 'Middle East', population: 8765000, isCapital: true },
  { city: 'Jerusalem', country: 'Israel', latitude: 31.7683, longitude: 35.2137, timezone: '+02:00', region: 'Middle East', population: 936425, isCapital: true },

  // Southeast Asia
  { city: 'Singapore', country: 'Singapore', latitude: 1.3521, longitude: 103.8198, timezone: '+08:00', region: 'Southeast Asia', population: 5453600, isCapital: true },
  { city: 'Bangkok', country: 'Thailand', latitude: 13.7563, longitude: 100.5018, timezone: '+07:00', region: 'Southeast Asia', population: 10539000, isCapital: true },
  { city: 'Jakarta', country: 'Indonesia', latitude: -6.2088, longitude: 106.8456, timezone: '+07:00', region: 'Southeast Asia', population: 10560000, isCapital: true },
  { city: 'Kuala Lumpur', country: 'Malaysia', latitude: 3.1390, longitude: 101.6869, timezone: '+08:00', region: 'Southeast Asia', population: 1588750, isCapital: true },
  { city: 'Manila', country: 'Philippines', latitude: 14.5995, longitude: 120.9842, timezone: '+08:00', region: 'Southeast Asia', population: 13484425, isCapital: true },
  { city: 'Ho Chi Minh City', country: 'Vietnam', latitude: 10.8231, longitude: 106.6297, timezone: '+07:00', region: 'Southeast Asia', population: 8993000 },
  { city: 'Hanoi', country: 'Vietnam', latitude: 21.0285, longitude: 105.8542, timezone: '+07:00', region: 'Southeast Asia', population: 8053663, isCapital: true },
  { city: 'Yangon', country: 'Myanmar', latitude: 16.8661, longitude: 96.1951, timezone: '+06:30', region: 'Southeast Asia', population: 5200000, isCapital: true },
  { city: 'Phnom Penh', country: 'Cambodia', latitude: 11.5564, longitude: 104.9282, timezone: '+07:00', region: 'Southeast Asia', population: 2129371, isCapital: true },
  { city: 'Vientiane', country: 'Laos', latitude: 17.9757, longitude: 102.6331, timezone: '+07:00', region: 'Southeast Asia', population: 948487, isCapital: true },

  // Additional Major Cities
  { city: 'Moscow', country: 'Russia', latitude: 55.7558, longitude: 37.6176, timezone: '+03:00', region: 'Europe', population: 12615279, isCapital: true },
  { city: 'Rome', country: 'Italy', latitude: 41.9028, longitude: 12.4964, timezone: '+01:00', region: 'Europe', population: 2873000, isCapital: true },
  { city: 'Madrid', country: 'Spain', latitude: 40.4168, longitude: -3.7038, timezone: '+01:00', region: 'Europe', population: 3223334, isCapital: true },
  { city: 'Amsterdam', country: 'Netherlands', latitude: 52.3676, longitude: 4.9041, timezone: '+01:00', region: 'Europe', population: 872680, isCapital: true },
  { city: 'Stockholm', country: 'Sweden', latitude: 59.3293, longitude: 18.0686, timezone: '+01:00', region: 'Europe', population: 975551, isCapital: true },
  { city: 'Copenhagen', country: 'Denmark', latitude: 55.6761, longitude: 12.5683, timezone: '+01:00', region: 'Europe', population: 632340, isCapital: true },
  { city: 'Oslo', country: 'Norway', latitude: 59.9139, longitude: 10.7522, timezone: '+01:00', region: 'Europe', population: 697010, isCapital: true },
  { city: 'Helsinki', country: 'Finland', latitude: 60.1699, longitude: 24.9384, timezone: '+02:00', region: 'Europe', population: 656229, isCapital: true },
  { city: 'Warsaw', country: 'Poland', latitude: 52.2297, longitude: 21.0122, timezone: '+01:00', region: 'Europe', population: 1790658, isCapital: true },
  { city: 'Prague', country: 'Czech Republic', latitude: 50.0755, longitude: 14.4378, timezone: '+01:00', region: 'Europe', population: 1301132, isCapital: true }
]

export const getLocationByCity = (cityName: string): Location | undefined => {
  return globalLocations.find(location => 
    location.city.toLowerCase().includes(cityName.toLowerCase())
  )
}

export const getLocationsByCountry = (countryName: string): Location[] => {
  return globalLocations.filter(location => 
    location.country.toLowerCase().includes(countryName.toLowerCase())
  )
}

export const getLocationsByRegion = (regionName: string): Location[] => {
  return globalLocations.filter(location => 
    location.region.toLowerCase().includes(regionName.toLowerCase())
  )
}

export const searchLocations = (query: string): Location[] => {
  const lowerQuery = query.toLowerCase()
  return globalLocations.filter(location => 
    location.city.toLowerCase().includes(lowerQuery) ||
    location.country.toLowerCase().includes(lowerQuery) ||
    location.region.toLowerCase().includes(lowerQuery)
  )
}
