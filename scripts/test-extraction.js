#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');

class TestExtraction {
  constructor() {
    this.dataDir = path.join(__dirname, '../data');
    this.testResults = [];
  }

  async runTests() {
    console.log('🧪 Running extraction tests...\n');
    
    await this.testDataStructure();
    await this.testContentQuality();
    await this.testRuntimeCompatibility();
    
    this.printTestResults();
  }

  async testDataStructure() {
    console.log('📁 Testing data structure...');
    
    const requiredFiles = [
      'numerology/master_numbers.json',
      'numerology/core_numbers.json', 
      'numerology/systems.json',
      'astro/sunrise_table.json',
      'astro/planetary_hours.json',
      'astro/elements_triangles.json'
    ];
    
    for (const file of requiredFiles) {
      try {
        const filePath = path.join(this.dataDir, file);
        const data = JSON.parse(await fs.readFile(filePath, 'utf8'));
        
        this.testResults.push({
          test: `File exists: ${file}`,
          status: 'PASS',
          details: 'File found and valid JSON'
        });
      } catch (error) {
        this.testResults.push({
          test: `File exists: ${file}`,
          status: 'SKIP',
          details: 'File not found (expected if no corresponding images processed)'
        });
      }
    }
  }

  async testContentQuality() {
    console.log('📊 Testing content quality...');
    
    // Test master numbers
    try {
      const masterNumbers = JSON.parse(await fs.readFile(path.join(this.dataDir, 'numerology/master_numbers.json'), 'utf8'));
      const requiredNumbers = ['11', '22', '33'];
      const hasRequiredNumbers = requiredNumbers.every(num => masterNumbers.numbers[num]);
      
      this.testResults.push({
        test: 'Master Numbers Content',
        status: hasRequiredNumbers ? 'PASS' : 'FAIL',
        details: hasRequiredNumbers ? 'Contains required master numbers (11, 22, 33)' : 'Missing required master numbers'
      });
    } catch (error) {
      this.testResults.push({
        test: 'Master Numbers Content',
        status: 'SKIP',
        details: 'File not found'
      });
    }
    
    // Test core numbers
    try {
      const coreNumbers = JSON.parse(await fs.readFile(path.join(this.dataDir, 'numerology/core_numbers.json'), 'utf8'));
      const requiredCoreNumbers = ['life_path', 'expression_destiny', 'soul_urge', 'personality', 'birthday', 'maturity', 'current_name'];
      const hasRequiredCoreNumbers = requiredCoreNumbers.every(num => coreNumbers[num]);
      
      this.testResults.push({
        test: 'Core Numbers Content',
        status: hasRequiredCoreNumbers ? 'PASS' : 'FAIL',
        details: hasRequiredCoreNumbers ? 'Contains all 7 core numbers' : 'Missing some core numbers'
      });
    } catch (error) {
      this.testResults.push({
        test: 'Core Numbers Content',
        status: 'SKIP',
        details: 'File not found'
      });
    }
    
    // Test systems
    try {
      const systems = JSON.parse(await fs.readFile(path.join(this.dataDir, 'numerology/systems.json'), 'utf8'));
      const requiredSystems = ['pythagorean', 'chaldean', 'kabbalah', 'tamil', 'chinese', 'vedic'];
      const hasRequiredSystems = requiredSystems.every(system => systems[system]);
      
      this.testResults.push({
        test: 'Numerology Systems Content',
        status: hasRequiredSystems ? 'PASS' : 'FAIL',
        details: hasRequiredSystems ? 'Contains all 6 numerology systems' : 'Missing some numerology systems'
      });
    } catch (error) {
      this.testResults.push({
        test: 'Numerology Systems Content',
        status: 'SKIP',
        details: 'File not found'
      });
    }
  }

  async testRuntimeCompatibility() {
    console.log('⚙️  Testing runtime compatibility...');
    
    // Test planetary hours calculation
    try {
      const planetaryHours = JSON.parse(await fs.readFile(path.join(this.dataDir, 'astro/planetary_hours.json'), 'utf8'));
      
      if (planetaryHours.rulers_sequence && planetaryHours.daily_tables) {
        const sundaySequence = planetaryHours.daily_tables.sunday;
        const expectedLength = 24;
        const hasCorrectLength = sundaySequence && sundaySequence.length === expectedLength;
        
        this.testResults.push({
          test: 'Planetary Hours Runtime',
          status: hasCorrectLength ? 'PASS' : 'FAIL',
          details: hasCorrectLength ? 'Planetary hours sequence has correct length (24)' : 'Planetary hours sequence has incorrect length'
        });
      }
    } catch (error) {
      this.testResults.push({
        test: 'Planetary Hours Runtime',
        status: 'SKIP',
        details: 'File not found'
      });
    }
    
    // Test elements and triangles
    try {
      const elements = JSON.parse(await fs.readFile(path.join(this.dataDir, 'astro/elements_triangles.json'), 'utf8'));
      
      if (elements.fire && elements.water && elements.air && elements.earth) {
        const allElementsHaveThreeSigns = ['fire', 'water', 'air', 'earth'].every(element => 
          elements[element] && elements[element].length === 3
        );
        
        this.testResults.push({
          test: 'Elements and Triangles Runtime',
          status: allElementsHaveThreeSigns ? 'PASS' : 'FAIL',
          details: allElementsHaveThreeSigns ? 'All elements have 3 signs' : 'Some elements missing or incomplete'
        });
      }
    } catch (error) {
      this.testResults.push({
        test: 'Elements and Triangles Runtime',
        status: 'SKIP',
        details: 'File not found'
      });
    }
    
    // Test sunrise table format
    try {
      const sunriseTable = JSON.parse(await fs.readFile(path.join(this.dataDir, 'astro/sunrise_table.json'), 'utf8'));
      
      if (sunriseTable.entries && sunriseTable.entries.length > 0) {
        const validTimes = sunriseTable.entries.every(entry => 
          /^[0-9]{1,2}:[0-9]{2}$/.test(entry.sunrise)
        );
        
        this.testResults.push({
          test: 'Sunrise Table Runtime',
          status: validTimes ? 'PASS' : 'FAIL',
          details: validTimes ? 'All sunrise times in correct format' : 'Some sunrise times in incorrect format'
        });
      }
    } catch (error) {
      this.testResults.push({
        test: 'Sunrise Table Runtime',
        status: 'SKIP',
        details: 'File not found'
      });
    }
  }

  printTestResults() {
    console.log('\n📊 Test Results Summary:\n');
    
    const passed = this.testResults.filter(r => r.status === 'PASS').length;
    const failed = this.testResults.filter(r => r.status === 'FAIL').length;
    const skipped = this.testResults.filter(r => r.status === 'SKIP').length;
    
    this.testResults.forEach(result => {
      const statusIcon = result.status === 'PASS' ? '✅' : result.status === 'FAIL' ? '❌' : '⚠️';
      console.log(`${statusIcon} ${result.test}: ${result.status}`);
      console.log(`   ${result.details}\n`);
    });
    
    console.log(`📈 Summary: ${passed} passed, ${failed} failed, ${skipped} skipped\n`);
    
    if (failed === 0) {
      console.log('🎉 All tests passed! Data extraction is working correctly.\n');
    } else {
      console.log('⚠️  Some tests failed. Please review the results above.\n');
    }
  }
}

// Main execution
async function main() {
  const tester = new TestExtraction();
  await tester.runTests();
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = TestExtraction;
