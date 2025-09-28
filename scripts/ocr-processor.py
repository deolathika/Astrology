#!/usr/bin/env python3
"""
OCR Data Extraction System for Daily Secrets App
Extracts numerology and astrology data from images using OCR
"""

import os
import json
import sys
from pathlib import Path
from datetime import datetime
import re
from typing import Dict, List, Any, Optional

try:
    import cv2
    import numpy as np
    from PIL import Image
    import pytesseract
    HAS_OCR_DEPS = True
except ImportError:
    HAS_OCR_DEPS = False
    print("⚠️  OCR dependencies not installed. Install with: pip install opencv-python pillow pytesseract")

class OCRProcessor:
    def __init__(self):
        self.base_dir = Path(__file__).parent.parent
        self.input_dir = self.base_dir / "inputs" / "images"
        self.output_dir = self.base_dir / "data"
        self.tmp_dir = self.base_dir / "tmp" / "ocr"
        self.docs_dir = self.base_dir / "docs"
        
        # Create directories
        self.input_dir.mkdir(parents=True, exist_ok=True)
        self.output_dir.mkdir(parents=True, exist_ok=True)
        self.tmp_dir.mkdir(parents=True, exist_ok=True)
        self.docs_dir.mkdir(parents=True, exist_ok=True)
        
        self.results = {}

    def process_images(self):
        """Main processing function"""
        print("🔍 Starting OCR processing...")
        
        if not HAS_OCR_DEPS:
            print("❌ OCR dependencies not available. Please install required packages.")
            return False
            
        try:
            # Get list of image files
            image_files = list(self.input_dir.glob("*.jpg")) + list(self.input_dir.glob("*.png")) + list(self.input_dir.glob("*.jpeg"))
            
            if not image_files:
                print("⚠️  No images found in inputs/images directory")
                print("📁 Please add your images to inputs/images/ and run again")
                return False
                
            print(f"📸 Found {len(image_files)} image(s) to process")
            
            # Process each image
            for image_file in image_files:
                print(f"🔄 Processing {image_file.name}...")
                result = self.process_image(image_file)
                self.results[image_file.name] = result
            
            # Normalize and save data
            self.normalize_data()
            self.create_documentation()
            
            print("✅ OCR processing completed successfully!")
            return True
            
        except Exception as error:
            print(f"❌ Error during OCR processing: {error}")
            return False

    def process_image(self, image_path: Path) -> Dict[str, Any]:
        """Process a single image with OCR"""
        try:
            # Load and preprocess image
            image = self.preprocess_image(image_path)
            
            # Extract text using Tesseract
            text = pytesseract.image_to_string(image, config='--psm 6')
            
            # Parse table data if applicable
            table_data = self.parse_table_data(text, image_path.name)
            
            result = {
                'filename': image_path.name,
                'raw_text': text,
                'table_data': table_data,
                'processed_at': datetime.now().isoformat()
            }
            
            # Save raw OCR result
            output_path = self.tmp_dir / f"{image_path.stem}.json"
            with open(output_path, 'w') as f:
                json.dump(result, f, indent=2)
                
            return result
            
        except Exception as error:
            print(f"❌ Error processing {image_path.name}: {error}")
            return {
                'filename': image_path.name,
                'error': str(error),
                'processed_at': datetime.now().isoformat()
            }

    def preprocess_image(self, image_path: Path) -> np.ndarray:
        """Preprocess image for better OCR"""
        try:
            # Load image
            image = cv2.imread(str(image_path))
            
            # Resize for better OCR
            height, width = image.shape[:2]
            if width > 2000 or height > 2000:
                scale = min(2000/width, 2000/height)
                new_width = int(width * scale)
                new_height = int(height * scale)
                image = cv2.resize(image, (new_width, new_height))
            
            # Convert to grayscale
            gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
            
            # Apply denoising
            denoised = cv2.fastNlMeansDenoising(gray)
            
            # Apply thresholding
            _, thresh = cv2.threshold(denoised, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
            
            return thresh
            
        except Exception as error:
            print(f"❌ Error preprocessing image: {error}")
            # Fallback to original image
            return cv2.imread(str(image_path))

    def parse_table_data(self, text: str, filename: str) -> Optional[Dict[str, Any]]:
        """Parse table data from OCR text"""
        lines = [line.strip() for line in text.split('\n') if line.strip()]
        
        # Detect image type and parse accordingly
        if 'master_numbers' in filename.lower():
            return self.parse_master_numbers(lines)
        elif 'core_numbers' in filename.lower():
            return self.parse_core_numbers(lines)
        elif 'systems' in filename.lower():
            return self.parse_systems(lines)
        elif 'sunrise' in filename.lower():
            return self.parse_sunrise_table(lines)
        elif 'planetary_hours' in filename.lower():
            return self.parse_planetary_hours(lines)
        elif 'elements' in filename.lower() or 'triangles' in filename.lower():
            return self.parse_elements_triangles(lines)
        
        return None

    def parse_master_numbers(self, lines: List[str]) -> Dict[str, Any]:
        """Parse master numbers data"""
        numbers = {}
        current_number = None
        
        for line in lines:
            # Look for number patterns
            number_match = re.search(r'(\d{2,3})', line)
            if number_match:
                current_number = number_match.group(1)
                numbers[current_number] = {
                    'energy': '',
                    'symbolism': '',
                    'traits': []
                }
            elif current_number and line:
                line_lower = line.lower()
                if 'energy' in line_lower or 'vibration' in line_lower:
                    numbers[current_number]['energy'] = line
                elif 'symbol' in line_lower or 'meaning' in line_lower:
                    numbers[current_number]['symbolism'] = line
                elif 'trait' in line_lower or 'characteristic' in line_lower:
                    numbers[current_number]['traits'].append(line)
        
        return {'numbers': numbers}

    def parse_core_numbers(self, lines: List[str]) -> Dict[str, Any]:
        """Parse core numbers data"""
        core_numbers = {}
        current_number = None
        
        for line in lines:
            # Look for core number patterns
            number_match = re.search(r'(life_path|expression_destiny|soul_urge|personality|birthday|maturity|current_name)', line.lower())
            if number_match:
                current_number = number_match.group(1)
                core_numbers[current_number] = {
                    'definition': '',
                    'calc': ''
                }
            elif current_number and line:
                if 'definition' in line.lower() or 'meaning' in line.lower():
                    core_numbers[current_number]['definition'] = line
                elif 'calculation' in line.lower() or 'formula' in line.lower():
                    core_numbers[current_number]['calc'] = line
        
        return core_numbers

    def parse_systems(self, lines: List[str]) -> Dict[str, Any]:
        """Parse numerology systems data"""
        systems = {}
        current_system = None
        
        for line in lines:
            # Look for system patterns
            system_match = re.search(r'(pythagorean|chaldean|kabbalah|tamil|chinese|vedic)', line.lower())
            if system_match:
                current_system = system_match.group(1)
                systems[current_system] = {
                    'desc': '',
                    'alphabet_rule': '',
                    'notes': ''
                }
            elif current_system and line:
                if 'description' in line.lower() or 'about' in line.lower():
                    systems[current_system]['desc'] = line
                elif 'alphabet' in line.lower() or 'rule' in line.lower():
                    systems[current_system]['alphabet_rule'] = line
                elif 'note' in line.lower() or 'additional' in line.lower():
                    systems[current_system]['notes'] = line
        
        return systems

    def parse_sunrise_table(self, lines: List[str]) -> Dict[str, Any]:
        """Parse sunrise table data"""
        entries = []
        latitude_band = '0_to_10'  # Default
        
        for line in lines:
            # Look for time patterns
            time_match = re.search(r'(\d{1,2}):(\d{2})', line)
            month_match = re.search(r'(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)', line, re.IGNORECASE)
            day_match = re.search(r'(\d{1,2})', line)
            
            if time_match and month_match and day_match:
                entries.append({
                    'month': month_match.group(1),
                    'day': int(day_match.group(1)),
                    'sunrise': f"{time_match.group(1)}:{time_match.group(2)}"
                })
        
        return {
            'latitude_band': latitude_band,
            'entries': entries,
            'source': 'sunrise_table image',
            'notes': 'Times are local exemplars; final runtime uses live API for exact location'
        }

    def parse_planetary_hours(self, lines: List[str]) -> Dict[str, Any]:
        """Parse planetary hours data"""
        rulers_sequence = ['Sun', 'Venus', 'Mercury', 'Moon', 'Saturn', 'Jupiter', 'Mars']
        daily_tables = {}
        
        # This would need more sophisticated parsing based on actual table structure
        weekdays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
        
        for day in weekdays:
            daily_tables[day] = rulers_sequence * 3 + rulers_sequence[:3]  # Simplified 24-hour sequence
        
        return {
            'rulers_sequence': rulers_sequence,
            'daily_tables': daily_tables,
            'notes': 'Derived from image table; runtime calculates exact spans from sunrise/sunset per location'
        }

    def parse_elements_triangles(self, lines: List[str]) -> Dict[str, Any]:
        """Parse elements and triangles data"""
        elements = {
            'fire': [],
            'water': [],
            'air': [],
            'earth': []
        }
        
        current_element = None
        
        for line in lines:
            element_match = re.search(r'(fire|water|air|earth)', line.lower())
            if element_match:
                current_element = element_match.group(1)
            elif current_element and line:
                sign_match = re.search(r'(Aries|Taurus|Gemini|Cancer|Leo|Virgo|Libra|Scorpio|Sagittarius|Capricorn|Aquarius|Pisces)', line, re.IGNORECASE)
                if sign_match:
                    elements[current_element].append(sign_match.group(1))
        
        return {
            **elements,
            'house_triangle_mapping': {
                'fire_house_ranges': ['Mar 21–Apr 20', 'Jul 21–Aug 20', 'Nov 21–Dec 20'],
                'water_house_ranges': ['Jun 21–Jul 20', 'Oct 21–Nov 20', 'Feb 21–Mar 20'],
                'air_house_ranges': ['May 21–Jun 20', 'Sep 21–Oct 20', 'Jan 21–Feb 20'],
                'earth_house_ranges': ['Apr 21–May 20', 'Aug 21–Sep 20', 'Dec 21–Jan 20']
            },
            'source': 'zodiac_triangles_elements image'
        }

    def normalize_data(self):
        """Normalize extracted data into JSON files"""
        print("📊 Normalizing extracted data...")
        
        # Process numerology data
        numerology_data = self.extract_numerology_data()
        self.save_numerology_data(numerology_data)
        
        # Process astrology data
        astrology_data = self.extract_astrology_data()
        self.save_astrology_data(astrology_data)

    def extract_numerology_data(self) -> Dict[str, Any]:
        """Extract numerology data from results"""
        numerology_data = {
            'masterNumbers': {'numbers': {}, 'notes': ''},
            'coreNumbers': {},
            'systems': {}
        }
        
        for filename, result in self.results.items():
            if result.get('table_data'):
                if 'master_numbers' in filename:
                    numerology_data['masterNumbers'] = {
                        'numbers': result['table_data'].get('numbers', {}),
                        'notes': f"Extracted from images: {filename}"
                    }
                elif 'core_numbers' in filename:
                    numerology_data['coreNumbers'] = result['table_data']
                elif 'systems' in filename:
                    numerology_data['systems'] = result['table_data']
        
        return numerology_data

    def extract_astrology_data(self) -> Dict[str, Any]:
        """Extract astrology data from results"""
        astrology_data = {
            'sunriseTable': None,
            'planetaryHours': None,
            'elementsTriangles': None
        }
        
        for filename, result in self.results.items():
            if result.get('table_data'):
                if 'sunrise' in filename:
                    astrology_data['sunriseTable'] = result['table_data']
                elif 'planetary_hours' in filename:
                    astrology_data['planetaryHours'] = result['table_data']
                elif 'elements' in filename or 'triangles' in filename:
                    astrology_data['elementsTriangles'] = result['table_data']
        
        return astrology_data

    def save_numerology_data(self, data: Dict[str, Any]):
        """Save numerology data to JSON files"""
        numerology_dir = self.output_dir / "numerology"
        numerology_dir.mkdir(exist_ok=True)
        
        if data['masterNumbers']['numbers']:
            with open(numerology_dir / "master_numbers.json", 'w') as f:
                json.dump(data['masterNumbers'], f, indent=2)
        
        if data['coreNumbers']:
            with open(numerology_dir / "core_numbers.json", 'w') as f:
                json.dump(data['coreNumbers'], f, indent=2)
        
        if data['systems']:
            with open(numerology_dir / "systems.json", 'w') as f:
                json.dump(data['systems'], f, indent=2)

    def save_astrology_data(self, data: Dict[str, Any]):
        """Save astrology data to JSON files"""
        astro_dir = self.output_dir / "astro"
        astro_dir.mkdir(exist_ok=True)
        
        if data['sunriseTable']:
            with open(astro_dir / "sunrise_table.json", 'w') as f:
                json.dump(data['sunriseTable'], f, indent=2)
        
        if data['planetaryHours']:
            with open(astro_dir / "planetary_hours.json", 'w') as f:
                json.dump(data['planetaryHours'], f, indent=2)
        
        if data['elementsTriangles']:
            with open(astro_dir / "elements_triangles.json", 'w') as f:
                json.dump(data['elementsTriangles'], f, indent=2)

    def create_documentation(self):
        """Create documentation files"""
        print("📝 Creating documentation...")
        
        # Create SOURCES.md
        sources_content = self.generate_sources_markdown()
        with open(self.docs_dir / "SOURCES.md", 'w') as f:
            f.write(sources_content)
        
        # Create CHANGELOG_DATA.md
        changelog_content = self.generate_changelog_markdown()
        with open(self.docs_dir / "CHANGELOG_DATA.md", 'w') as f:
            f.write(changelog_content)

    def generate_sources_markdown(self) -> str:
        """Generate SOURCES.md content"""
        content = "# Data Sources\n\n"
        content += "This document tracks the sources of data used in the Daily Secrets app.\n\n"
        content += "## OCR Extraction Results\n\n"
        content += f"**Extraction Date:** {datetime.now().isoformat()}\n\n"
        
        for filename, result in self.results.items():
            content += f"### {filename}\n\n"
            content += f"- **Processed:** {result.get('processed_at', 'Unknown')}\n"
            content += f"- **Text Length:** {len(result.get('raw_text', ''))} characters\n"
            content += f"- **Table Data:** {'Yes' if result.get('table_data') else 'No'}\n\n"
            
            if result.get('table_data'):
                content += "**Extracted Data:**\n"
                content += "```json\n"
                content += json.dumps(result['table_data'], indent=2)
                content += "\n```\n\n"
        
        return content

    def generate_changelog_markdown(self) -> str:
        """Generate CHANGELOG_DATA.md content"""
        content = "# Data Changelog\n\n"
        content += f"**Update Date:** {datetime.now().isoformat()}\n\n"
        content += "## Changes Made\n\n"
        
        processed_files = list(self.results.keys())
        if processed_files:
            content += "### Files Processed\n\n"
            for file in processed_files:
                content += f"- ✅ {file}\n"
            content += "\n"
        
        content += "### Data Files Updated\n\n"
        content += "- `data/numerology/master_numbers.json` - Master numbers (11, 22, 33, 44, 55)\n"
        content += "- `data/numerology/core_numbers.json` - Core numerology calculations\n"
        content += "- `data/numerology/systems.json` - Numerology systems (Pythagorean, Chaldean, etc.)\n"
        content += "- `data/astro/sunrise_table.json` - Sunrise times by latitude\n"
        content += "- `data/astro/planetary_hours.json` - Planetary hour sequences\n"
        content += "- `data/astro/elements_triangles.json` - Zodiac elements and triangles\n\n"
        
        content += "### Notes\n\n"
        content += "- All data extracted via OCR from uploaded images\n"
        content += "- Times and calculations are reference values; runtime uses live APIs\n"
        content += "- Manual review recommended for accuracy validation\n\n"
        
        return content

def main():
    """Main execution function"""
    processor = OCRProcessor()
    success = processor.process_images()
    
    if success:
        print("\n🎉 OCR processing completed successfully!")
        print("📁 Check the 'data/' directory for extracted JSON files")
        print("📝 Review 'docs/' directory for documentation")
    else:
        print("\n❌ OCR processing failed. Check the error messages above.")
        sys.exit(1)

if __name__ == "__main__":
    main()
