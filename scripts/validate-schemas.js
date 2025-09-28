#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const Ajv = require('ajv');

class SchemaValidator {
  constructor() {
    this.ajv = new Ajv();
    this.schemas = this.initializeSchemas();
  }

  initializeSchemas() {
    return {
      masterNumbers: {
        type: 'object',
        properties: {
          numbers: {
            type: 'object',
            patternProperties: {
              '^[0-9]+$': {
                type: 'object',
                properties: {
                  energy: { type: 'string', minLength: 1 },
                  symbolism: { type: 'string', minLength: 1 },
                  traits: { 
                    type: 'array', 
                    items: { type: 'string' },
                    minItems: 1
                  }
                },
                required: ['energy', 'symbolism', 'traits']
              }
            }
          },
          notes: { type: 'string' }
        },
        required: ['numbers', 'notes']
      },
      coreNumbers: {
        type: 'object',
        properties: {
          life_path: { 
            type: 'object', 
            properties: { 
              definition: { type: 'string', minLength: 1 }, 
              calc: { type: 'string', minLength: 1 } 
            },
            required: ['definition', 'calc']
          },
          expression_destiny: { 
            type: 'object', 
            properties: { 
              definition: { type: 'string', minLength: 1 }, 
              calc: { type: 'string', minLength: 1 } 
            },
            required: ['definition', 'calc']
          },
          soul_urge: { 
            type: 'object', 
            properties: { 
              definition: { type: 'string', minLength: 1 }, 
              calc: { type: 'string', minLength: 1 } 
            },
            required: ['definition', 'calc']
          },
          personality: { 
            type: 'object', 
            properties: { 
              definition: { type: 'string', minLength: 1 }, 
              calc: { type: 'string', minLength: 1 } 
            },
            required: ['definition', 'calc']
          },
          birthday: { 
            type: 'object', 
            properties: { 
              definition: { type: 'string', minLength: 1 }, 
              calc: { type: 'string', minLength: 1 } 
            },
            required: ['definition', 'calc']
          },
          maturity: { 
            type: 'object', 
            properties: { 
              definition: { type: 'string', minLength: 1 }, 
              calc: { type: 'string', minLength: 1 } 
            },
            required: ['definition', 'calc']
          },
          current_name: { 
            type: 'object', 
            properties: { 
              definition: { type: 'string', minLength: 1 }, 
              calc: { type: 'string', minLength: 1 } 
            },
            required: ['definition', 'calc']
          }
        }
      },
      systems: {
        type: 'object',
        properties: {
          pythagorean: { 
            type: 'object', 
            properties: { 
              desc: { type: 'string', minLength: 1 }, 
              alphabet_rule: { type: 'string', minLength: 1 }, 
              notes: { type: 'string' } 
            },
            required: ['desc', 'alphabet_rule']
          },
          chaldean: { 
            type: 'object', 
            properties: { 
              desc: { type: 'string', minLength: 1 }, 
              alphabet_rule: { type: 'string', minLength: 1 }, 
              notes: { type: 'string' } 
            },
            required: ['desc', 'alphabet_rule']
          },
          kabbalah: { 
            type: 'object', 
            properties: { 
              desc: { type: 'string', minLength: 1 }, 
              alphabet_rule: { type: 'string', minLength: 1 }, 
              notes: { type: 'string' } 
            },
            required: ['desc', 'alphabet_rule']
          },
          tamil: { 
            type: 'object', 
            properties: { 
              desc: { type: 'string', minLength: 1 }, 
              alphabet_rule: { type: 'string', minLength: 1 }, 
              notes: { type: 'string' } 
            },
            required: ['desc', 'alphabet_rule']
          },
          chinese: { 
            type: 'object', 
            properties: { 
              desc: { type: 'string', minLength: 1 }, 
              alphabet_rule: { type: 'string', minLength: 1 }, 
              notes: { type: 'string' } 
            },
            required: ['desc', 'alphabet_rule']
          },
          vedic: { 
            type: 'object', 
            properties: { 
              desc: { type: 'string', minLength: 1 }, 
              alphabet_rule: { type: 'string', minLength: 1 }, 
              notes: { type: 'string' } 
            },
            required: ['desc', 'alphabet_rule']
          }
        }
      },
      sunriseTable: {
        type: 'object',
        properties: {
          latitude_band: { type: 'string', minLength: 1 },
          entries: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                month: { type: 'string', enum: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] },
                day: { type: 'integer', minimum: 1, maximum: 31 },
                sunrise: { type: 'string', pattern: '^[0-9]{1,2}:[0-9]{2}$' }
              },
              required: ['month', 'day', 'sunrise']
            }
          },
          source: { type: 'string' },
          notes: { type: 'string' }
        },
        required: ['latitude_band', 'entries', 'source', 'notes']
      },
      planetaryHours: {
        type: 'object',
        properties: {
          rulers_sequence: {
            type: 'array',
            items: { type: 'string' },
            minItems: 7,
            maxItems: 7
          },
          daily_tables: {
            type: 'object',
            patternProperties: {
              '^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)$': {
                type: 'array',
                items: { type: 'string' },
                minItems: 24,
                maxItems: 24
              }
            }
          },
          notes: { type: 'string' }
        },
        required: ['rulers_sequence', 'daily_tables', 'notes']
      },
      elementsTriangles: {
        type: 'object',
        properties: {
          fire: {
            type: 'array',
            items: { type: 'string' },
            minItems: 3,
            maxItems: 3
          },
          water: {
            type: 'array',
            items: { type: 'string' },
            minItems: 3,
            maxItems: 3
          },
          air: {
            type: 'array',
            items: { type: 'string' },
            minItems: 3,
            maxItems: 3
          },
          earth: {
            type: 'array',
            items: { type: 'string' },
            minItems: 3,
            maxItems: 3
          },
          house_triangle_mapping: {
            type: 'object',
            properties: {
              fire_house_ranges: { type: 'array', items: { type: 'string' } },
              water_house_ranges: { type: 'array', items: { type: 'string' } },
              air_house_ranges: { type: 'array', items: { type: 'string' } },
              earth_house_ranges: { type: 'array', items: { type: 'string' } }
            }
          },
          source: { type: 'string' }
        },
        required: ['fire', 'water', 'air', 'earth', 'house_triangle_mapping', 'source']
      }
    };
  }

  async validateAll() {
    console.log('🔍 Starting schema validation...');
    
    const dataDir = path.join(__dirname, '../data');
    const validationResults = {};
    
    // Validate numerology files
    const numerologyFiles = [
      { file: 'numerology/master_numbers.json', schema: 'masterNumbers' },
      { file: 'numerology/core_numbers.json', schema: 'coreNumbers' },
      { file: 'numerology/systems.json', schema: 'systems' }
    ];
    
    for (const { file, schema } of numerologyFiles) {
      const result = await this.validateFile(path.join(dataDir, file), schema);
      validationResults[file] = result;
    }
    
    // Validate astrology files
    const astrologyFiles = [
      { file: 'astro/sunrise_table.json', schema: 'sunriseTable' },
      { file: 'astro/planetary_hours.json', schema: 'planetaryHours' },
      { file: 'astro/elements_triangles.json', schema: 'elementsTriangles' }
    ];
    
    for (const { file, schema } of astrologyFiles) {
      const result = await this.validateFile(path.join(dataDir, file), schema);
      validationResults[file] = result;
    }
    
    this.printValidationResults(validationResults);
    return validationResults;
  }

  async validateFile(filePath, schemaName) {
    try {
      const data = JSON.parse(await fs.readFile(filePath, 'utf8'));
      const schema = this.schemas[schemaName];
      const validate = this.ajv.compile(schema);
      const isValid = validate(data);
      
      return {
        exists: true,
        valid: isValid,
        errors: isValid ? null : validate.errors,
        data: data
      };
    } catch (error) {
      if (error.code === 'ENOENT') {
        return {
          exists: false,
          valid: false,
          errors: ['File not found'],
          data: null
        };
      } else {
        return {
          exists: true,
          valid: false,
          errors: [error.message],
          data: null
        };
      }
    }
  }

  printValidationResults(results) {
    console.log('\n📊 Validation Results:\n');
    
    let allValid = true;
    
    for (const [file, result] of Object.entries(results)) {
      if (!result.exists) {
        console.log(`⚠️  ${file}: File not found (expected if no corresponding images were processed)`);
        continue;
      }
      
      if (result.valid) {
        console.log(`✅ ${file}: Valid`);
      } else {
        console.log(`❌ ${file}: Invalid`);
        allValid = false;
        
        if (result.errors) {
          console.log('   Errors:');
          result.errors.forEach(error => {
            console.log(`   - ${error.message || error}`);
          });
        }
      }
    }
    
    console.log(`\n${allValid ? '✅ All existing files are valid!' : '❌ Some files have validation errors.'}\n`);
  }

  async runSanityChecks() {
    console.log('🧪 Running sanity checks...');
    
    const dataDir = path.join(__dirname, '../data');
    const checks = [];
    
    // Check sunrise table times
    try {
      const sunriseData = JSON.parse(await fs.readFile(path.join(dataDir, 'astro/sunrise_table.json'), 'utf8'));
      if (sunriseData.entries) {
        const invalidTimes = sunriseData.entries.filter(entry => 
          !/^[0-9]{1,2}:[0-9]{2}$/.test(entry.sunrise)
        );
        checks.push({
          name: 'Sunrise Table Times',
          status: invalidTimes.length === 0 ? 'PASS' : 'FAIL',
          details: invalidTimes.length === 0 ? 'All times in HH:mm format' : `${invalidTimes.length} invalid time formats`
        });
      }
    } catch (error) {
      checks.push({
        name: 'Sunrise Table Times',
        status: 'SKIP',
        details: 'File not found'
      });
    }
    
    // Check planetary hours sequences
    try {
      const planetaryData = JSON.parse(await fs.readFile(path.join(dataDir, 'astro/planetary_hours.json'), 'utf8'));
      if (planetaryData.daily_tables) {
        const invalidSequences = Object.entries(planetaryData.daily_tables).filter(([day, sequence]) => 
          sequence.length !== 24
        );
        checks.push({
          name: 'Planetary Hours Sequences',
          status: invalidSequences.length === 0 ? 'PASS' : 'FAIL',
          details: invalidSequences.length === 0 ? 'All sequences have 24 hours' : `${invalidSequences.length} sequences with wrong length`
        });
      }
    } catch (error) {
      checks.push({
        name: 'Planetary Hours Sequences',
        status: 'SKIP',
        details: 'File not found'
      });
    }
    
    // Check zodiac elements
    try {
      const elementsData = JSON.parse(await fs.readFile(path.join(dataDir, 'astro/elements_triangles.json'), 'utf8'));
      const expectedElements = ['fire', 'water', 'air', 'earth'];
      const missingElements = expectedElements.filter(element => 
        !elementsData[element] || elementsData[element].length !== 3
      );
      checks.push({
        name: 'Zodiac Elements',
        status: missingElements.length === 0 ? 'PASS' : 'FAIL',
        details: missingElements.length === 0 ? 'All elements have 3 signs' : `Missing or incomplete: ${missingElements.join(', ')}`
      });
    } catch (error) {
      checks.push({
        name: 'Zodiac Elements',
        status: 'SKIP',
        details: 'File not found'
      });
    }
    
    // Print results
    console.log('\n🧪 Sanity Check Results:\n');
    checks.forEach(check => {
      const statusIcon = check.status === 'PASS' ? '✅' : check.status === 'FAIL' ? '❌' : '⚠️';
      console.log(`${statusIcon} ${check.name}: ${check.status}`);
      console.log(`   ${check.details}\n`);
    });
    
    return checks;
  }
}

// Main execution
async function main() {
  const validator = new SchemaValidator();
  await validator.validateAll();
  await validator.runSanityChecks();
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = SchemaValidator;
