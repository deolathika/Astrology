# OCR Data Extraction System

This system extracts numerology and astrology data from images using OCR (Optical Character Recognition) and normalizes it into structured JSON files for the Daily Secrets app.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Add Your Images
Place your numerology and astrology images in the `inputs/images/` directory:

```
inputs/images/
├── master_numbers.jpg
├── numerology_core_numbers.jpg
├── numerology_systems.jpg
├── sunrise_table_*.jpg
├── planetary_hours_*.jpg
└── zodiac_triangles_elements.jpg
```

### 3. Run Extraction
```bash
npm run extract
```

### 4. Validate Results
```bash
npm run validate
npm run test
```

## 📁 Directory Structure

```
daily_secrets_app/
├── inputs/
│   └── images/           # Place your images here
├── data/
│   ├── numerology/       # Extracted numerology data
│   └── astro/           # Extracted astrology data
├── docs/                # Documentation
├── scripts/             # Processing scripts
├── tmp/ocr/             # Temporary OCR results
└── package.json         # Dependencies
```

## 🔧 Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| **Extract** | `npm run extract` | Process images with OCR and extract data |
| **Validate** | `npm run validate` | Validate JSON schemas and run sanity checks |
| **Test** | `npm run test` | Run extraction accuracy tests |
| **Format** | `npm run format` | Format JSON and Markdown files |

## 📊 Data Schemas

### Numerology Data

#### Master Numbers (`data/numerology/master_numbers.json`)
```json
{
  "numbers": {
    "11": {
      "energy": "Intuitive illumination and spiritual insight",
      "symbolism": "The Master Teacher",
      "traits": ["Highly intuitive", "Spiritual awareness"]
    }
  },
  "notes": "Extracted from images: master_numbers.*"
}
```

#### Core Numbers (`data/numerology/core_numbers.json`)
```json
{
  "life_path": {
    "definition": "Your primary life purpose",
    "calc": "Reduce birth date (YYYY+MM+DD) to single digit"
  }
}
```

#### Systems (`data/numerology/systems.json`)
```json
{
  "pythagorean": {
    "desc": "Western numerology system",
    "alphabet_rule": "A=1, B=2, C=3...",
    "notes": "Most commonly used system"
  }
}
```

### Astrology Data

#### Sunrise Table (`data/astro/sunrise_table.json`)
```json
{
  "latitude_band": "0_to_10",
  "entries": [
    { "month": "Jan", "day": 1, "sunrise": "06:17" }
  ],
  "source": "sunrise_table image",
  "notes": "Times are local exemplars; runtime uses live API"
}
```

#### Planetary Hours (`data/astro/planetary_hours.json`)
```json
{
  "rulers_sequence": ["Sun", "Venus", "Mercury", "Moon", "Saturn", "Jupiter", "Mars"],
  "daily_tables": {
    "sunday": ["Sun", "Venus", "Mercury", ...]
  },
  "notes": "Runtime calculates exact spans from sunrise/sunset"
}
```

#### Elements & Triangles (`data/astro/elements_triangles.json`)
```json
{
  "fire": ["Aries", "Leo", "Sagittarius"],
  "water": ["Cancer", "Scorpio", "Pisces"],
  "air": ["Gemini", "Libra", "Aquarius"],
  "earth": ["Taurus", "Virgo", "Capricorn"]
}
```

## 🔍 OCR Processing

### Image Preprocessing
- **Resize:** Images resized to 2000x2000 for optimal OCR
- **Grayscale:** Converted to grayscale for better text recognition
- **Normalize:** Contrast and brightness normalization
- **Sharpen:** Edge enhancement for clearer text

### Text Extraction
- **Tesseract.js:** Primary OCR engine with English language support
- **Table Detection:** Automatic detection of tabular data
- **Pattern Matching:** Regex patterns for specific data types
- **Validation:** Schema validation for extracted data

### Data Normalization
- **Structured Output:** Raw text converted to structured JSON
- **Schema Validation:** All data validated against predefined schemas
- **Sanity Checks:** Time formats, sequence lengths, required fields
- **Error Handling:** Graceful handling of OCR failures

## ✅ Quality Assurance

### Validation Checks
- **JSON Schema:** All files validated against JSON schemas
- **Time Format:** Sunrise times must be in HH:mm format
- **Sequence Length:** Planetary hours must have 24 entries
- **Required Fields:** All mandatory fields present and populated

### Testing Framework
- **Data Structure Tests:** Verify file existence and JSON validity
- **Content Quality Tests:** Check for required data elements
- **Runtime Compatibility Tests:** Ensure data works with app logic
- **Accuracy Tests:** Validate extraction quality

### Sanity Checks
- **Master Numbers:** Must include 11, 22, 33 (and optionally 44, 55)
- **Core Numbers:** Must include all 7 core numerology calculations
- **Systems:** Must include at least 6 numerology systems
- **Sunrise Table:** All times in correct format
- **Planetary Hours:** All sequences have 24 hours
- **Elements:** All elements have 3 zodiac signs

## 📝 Documentation

### SOURCES.md
- **Extraction Metadata:** Date, files processed, text length
- **Data Provenance:** Source images and processing details
- **Quality Notes:** Manual review recommendations

### CHANGELOG_DATA.md
- **Change Tracking:** What files were updated and why
- **Version History:** Track data changes over time
- **Usage Instructions:** How to use the extracted data

## 🚀 Production Integration

### Runtime Data Sources
- **Live APIs:** Sunrise/sunset from NOAA or Sunrise-Sunset.org
- **Swiss Ephemeris:** Precise planetary positions
- **Real-time Calculations:** Planetary hours from actual sunrise/sunset

### Fallback Strategy
- **Reference Tables:** Use extracted data when APIs unavailable
- **Cached Data:** Improve performance with pre-calculated values
- **Offline Support:** Ensure app functionality without internet

## 🔧 Troubleshooting

### Common Issues

#### No Images Found
```
⚠️  No images found in inputs/images directory
📁 Please add your images to inputs/images/ and run again
```
**Solution:** Add your images to the `inputs/images/` directory

#### OCR Extraction Fails
```
❌ Error processing image.jpg: OCR failed
```
**Solution:** 
- Check image quality and resolution
- Ensure text is clear and readable
- Try different image formats (PNG, JPG)

#### Schema Validation Errors
```
❌ master_numbers.json: Invalid
   Errors:
   - Missing required field: energy
```
**Solution:** 
- Review extracted data for completeness
- Check image quality for missing text
- Manually verify extracted content

#### Time Format Errors
```
❌ Sunrise Table Times: FAIL
   3 invalid time formats
```
**Solution:** 
- Check image for time format clarity
- Verify OCR extracted times correctly
- Manual review of problematic entries

### Debug Mode
```bash
# Enable verbose logging
DEBUG=* npm run extract

# Check specific file
node scripts/validate-schemas.js
```

## 📈 Performance

### Processing Times
- **Small Images (< 1MB):** ~5-10 seconds
- **Medium Images (1-5MB):** ~10-30 seconds  
- **Large Images (> 5MB):** ~30-60 seconds

### Optimization Tips
- **Image Size:** Keep images under 5MB for faster processing
- **Resolution:** 2000x2000 pixels optimal for OCR accuracy
- **Format:** PNG preferred over JPG for text clarity
- **Batch Processing:** Process multiple images simultaneously

## 🤝 Contributing

### Adding New Data Types
1. **Update Schemas:** Add new schema to `validate-schemas.js`
2. **Extend Parser:** Add parsing logic to `ocr-processor.js`
3. **Add Tests:** Create tests in `test-extraction.js`
4. **Update Docs:** Document new data structure

### Improving OCR Accuracy
1. **Image Preprocessing:** Adjust Sharp parameters
2. **Tesseract Options:** Modify OCR engine settings
3. **Pattern Matching:** Improve regex patterns
4. **Manual Review:** Add human validation steps

## 📞 Support

For issues or questions:
1. **Check Logs:** Review console output for error details
2. **Validate Data:** Run `npm run validate` to check schemas
3. **Test Extraction:** Use `npm run test` to verify accuracy
4. **Review Docs:** Check SOURCES.md and CHANGELOG_DATA.md

---

**Ready to extract your data?** Place your images in `inputs/images/` and run `npm run extract`! 🚀
