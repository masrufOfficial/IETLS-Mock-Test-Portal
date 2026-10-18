/**
 * Official IELTS Band Score Calculator
 * Based on Cambridge / British Council / IDP IELTS Assessment Scales
 */

export function rawToListeningBand(raw: number): number {
  if (raw >= 39) return 9.0;
  if (raw >= 37) return 8.5;
  if (raw >= 35) return 8.0;
  if (raw >= 32) return 7.5;
  if (raw >= 30) return 7.0;
  if (raw >= 26) return 6.5;
  if (raw >= 23) return 6.0;
  if (raw >= 18) return 5.5;
  if (raw >= 16) return 5.0;
  if (raw >= 13) return 4.5;
  if (raw >= 10) return 4.0;
  if (raw >= 8) return 3.5;
  if (raw >= 6) return 3.0;
  if (raw >= 4) return 2.5;
  if (raw >= 1) return 2.0;
  return 0.0;
}

export function rawToReadingBand(raw: number, type: 'academic' | 'general' = 'academic'): number {
  if (type === 'general') {
    if (raw >= 40) return 9.0;
    if (raw >= 39) return 8.5;
    if (raw >= 37) return 8.0;
    if (raw >= 36) return 7.5;
    if (raw >= 34) return 7.0;
    if (raw >= 32) return 6.5;
    if (raw >= 30) return 6.0;
    if (raw >= 27) return 5.5;
    if (raw >= 23) return 5.0;
    if (raw >= 19) return 4.5;
    if (raw >= 15) return 4.0;
    if (raw >= 12) return 3.5;
    if (raw >= 9) return 3.0;
    if (raw >= 6) return 2.5;
    if (raw >= 1) return 2.0;
    return 0.0;
  }

  // Academic Reading
  if (raw >= 39) return 9.0;
  if (raw >= 37) return 8.5;
  if (raw >= 35) return 8.0;
  if (raw >= 33) return 7.5;
  if (raw >= 30) return 7.0;
  if (raw >= 27) return 6.5;
  if (raw >= 23) return 6.0;
  if (raw >= 19) return 5.5;
  if (raw >= 15) return 5.0;
  if (raw >= 13) return 4.5;
  if (raw >= 10) return 4.0;
  if (raw >= 8) return 3.5;
  if (raw >= 6) return 3.0;
  if (raw >= 4) return 2.5;
  if (raw >= 1) return 2.0;
  return 0.0;
}

/**
 * Calculates overall IELTS band score using the official IELTS rounding rule:
 * - Average = (L + R + W + S) / 4
 * - If decimal < 0.25 -> rounds down to whole band (e.g. 6.125 -> 6.0)
 * - If decimal >= 0.25 and < 0.75 -> rounds to half band (e.g. 6.25 -> 6.5, 6.625 -> 6.5)
 * - If decimal >= 0.75 -> rounds up to next whole band (e.g. 6.75 -> 7.0)
 */
export function calculateOverallBand(
  listening: number,
  reading: number,
  writing: number,
  speaking: number
): number {
  const avg = (listening + reading + writing + speaking) / 4;
  const base = Math.floor(avg);
  const remainder = avg - base;

  if (remainder < 0.25) {
    return base;
  } else if (remainder < 0.75) {
    return base + 0.5;
  } else {
    return base + 1.0;
  }
}

export function bandToCEFR(band: number): string {
  if (band >= 8.5) return 'C2 Proficient';
  if (band >= 7.0) return 'C1 Advanced';
  if (band >= 5.5) return 'B2 Independent';
  if (band >= 4.0) return 'B1 Moderate';
  return 'A2 Basic';
}

export function getBandDescription(band: number): string {
  if (band >= 9.0) return 'Expert User — Fully operational command of the language: appropriate, accurate and fluent.';
  if (band >= 8.0) return 'Very Good User — Fully operational command with only occasional unsystematic inaccuracies.';
  if (band >= 7.0) return 'Good User — Operational command, though with occasional inaccuracies, inappropriate usage and misunderstandings in some situations.';
  if (band >= 6.0) return 'Competent User — Generally effective command of the language despite some inaccuracies, inappropriate usage and misunderstandings.';
  if (band >= 5.0) return 'Modest User — Partial command of the language, coping with overall meaning in most situations.';
  if (band >= 4.0) return 'Limited User — Basic competence is limited to familiar situations.';
  return 'Intermittent User — Convey and understand only general meaning in very familiar situations.';
}
