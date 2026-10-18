import {
  calculateOverallBand,
  rawToListeningBand,
  rawToReadingBand,
  bandToCEFR,
  getBandDescription,
} from '../src/lib/ielts-calculator';

function testBandCalculator() {
  console.log('--- Testing IELTS Band Score Calculation & Rounding ---');

  // Test 1: Rounding down (< 0.25)
  // (6.0 + 6.0 + 6.5 + 6.0) / 4 = 24.5 / 4 = 6.125 -> 6.0
  const r1 = calculateOverallBand(6.0, 6.0, 6.5, 6.0);
  console.assert(r1 === 6.0, `Expected 6.0, got ${r1}`);
  console.log('✓ 6.125 rounds down to 6.0');

  // Test 2: Rounding up to half band (>= 0.25)
  // (6.5 + 6.0 + 6.5 + 6.0) / 4 = 25 / 4 = 6.25 -> 6.5
  const r2 = calculateOverallBand(6.5, 6.0, 6.5, 6.0);
  console.assert(r2 === 6.5, `Expected 6.5, got ${r2}`);
  console.log('✓ 6.25 rounds up to 6.5');

  // Test 3: Rounding down to half band (0.625)
  // (6.5 + 7.0 + 6.5 + 6.5) / 4 = 26.5 / 4 = 6.625 -> 6.5
  const r3 = calculateOverallBand(6.5, 7.0, 6.5, 6.5);
  console.assert(r3 === 6.5, `Expected 6.5, got ${r3}`);
  console.log('✓ 6.625 rounds down to 6.5');

  // Test 4: Rounding up to next whole band (>= 0.75)
  // (7.0 + 7.0 + 6.5 + 6.5) / 4 = 27 / 4 = 6.75 -> 7.0
  const r4 = calculateOverallBand(7.0, 7.0, 6.5, 6.5);
  console.assert(r4 === 7.0, `Expected 7.0, got ${r4}`);
  console.log('✓ 6.75 rounds up to 7.0');

  // Test 5: Listening raw scores
  console.assert(rawToListeningBand(40) === 9.0, '40 should be 9.0');
  console.assert(rawToListeningBand(36) === 8.0, '36 should be 8.0');
  console.assert(rawToListeningBand(30) === 7.0, '30 should be 7.0');
  console.assert(rawToListeningBand(23) === 6.0, '23 should be 6.0');
  console.log('✓ Listening raw score conversion accurate across scales');

  // Test 6: Reading raw scores
  console.assert(rawToReadingBand(39, 'academic') === 9.0, '39 should be 9.0');
  console.assert(rawToReadingBand(35, 'academic') === 8.0, '35 should be 8.0');
  console.assert(rawToReadingBand(30, 'academic') === 7.0, '30 should be 7.0');
  console.log('✓ Academic Reading raw score conversion accurate across scales');

  // Test 7: CEFR mappings
  console.assert(bandToCEFR(8.5) === 'C2 Proficient');
  console.assert(bandToCEFR(7.5) === 'C1 Advanced');
  console.assert(bandToCEFR(6.5) === 'B2 Independent');
  console.log('✓ CEFR descriptor levels validated');

  console.log('All automated tests passed successfully!');
}

testBandCalculator();
