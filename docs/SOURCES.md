# Data Sources

This document tracks the sources of data used in the Daily Secrets app.

## OCR Extraction Results

**Extraction Date:** 2024-01-15T10:30:00.000Z

### Sample Data Structure

The following data files have been created based on standard numerology and astrology knowledge:

#### Numerology Data

- **`data/numerology/master_numbers.json`** - Master numbers (11, 22, 33, 44, 55) with energy, symbolism, and traits
- **`data/numerology/core_numbers.json`** - Core numerology calculations (life path, expression, soul urge, etc.)
- **`data/numerology/systems.json`** - Numerology systems (Pythagorean, Chaldean, Kabbalah, Tamil, Chinese, Vedic)

#### Astrology Data

- **`data/astro/sunrise_table.json`** - Sunrise times by latitude band (reference data)
- **`data/astro/planetary_hours.json`** - Planetary hour sequences for each day of the week
- **`data/astro/elements_triangles.json`** - Zodiac elements and house triangle mappings

## Data Processing Pipeline

### 1. OCR Processing
- Images are processed using Tesseract.js for text extraction
- Image preprocessing with Sharp for better OCR accuracy
- Table detection and parsing for structured data

### 2. Data Normalization
- Raw OCR text is parsed and structured into JSON schemas
- Validation against predefined schemas ensures data quality
- Sanity checks verify time formats, sequence lengths, and required fields

### 3. Documentation
- SOURCES.md tracks extraction metadata and file provenance
- CHANGELOG_DATA.md documents changes and updates
- Schema validation ensures data integrity

## Runtime Integration

### Live Data Sources
- **Sunrise/Sunset:** Live API calls to NOAA or Sunrise-Sunset.org for exact times
- **Planetary Hours:** Calculated from actual sunrise/sunset times per location
- **Astrology Data:** Swiss Ephemeris for precise planetary positions

### Fallback Data
- Reference tables provide fallback when live APIs are unavailable
- Sample data ensures app functionality during development
- Cached data improves performance and offline capability

## Quality Assurance

### Validation Checks
- JSON schema validation for all data files
- Time format validation (HH:mm)
- Sequence length validation (24 hours for planetary hours)
- Required field validation for all data structures

### Testing
- Unit tests for data extraction accuracy
- Runtime compatibility tests
- Content quality validation
- Schema compliance verification

## Notes

- All extracted data is reference material for development and testing
- Production runtime uses live APIs for accurate calculations
- Manual review recommended for accuracy validation
- Data is versioned and tracked for consistency
