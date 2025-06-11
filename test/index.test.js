import {expect} from 'chai';

import { generateWorkout, generatePattern } from '../lib/index';

describe('::generatePattern', () => {
  let pattern;

  before(() => {
    pattern = generatePattern(1800);
  });

  it('generates a pattern', () => {
    expect(pattern).to.be.ok;
  });
});

describe('::generateWorkout', () => {
  let pattern;

  before(() => {
    pattern = generateWorkout(1800);
  });

  it('generates a pattern', () => {
    expect(pattern).to.be.ok;
  });
});

describe('::generateWorkout scaling', () => {
  const YARDS_TO_SECONDS_ROUGH_FACTOR = 0.8; // 20s per 25yds for "Swim"

  function calculateTotalDistance(pattern) {
    if (!pattern || !pattern.intervals) {
      return 0;
    }
    return pattern.intervals.reduce((total, interval) => {
      // Ensure length and number are valid numbers before multiplying
      const length = typeof interval.length === 'number' ? interval.length : 0;
      const number = typeof interval.number === 'number' ? interval.number : 0;
      return total + (length * number);
    }, 0);
  }

  it('should generate a workout close to 4000 yards', () => {
    const targetDistance = 4000;
    const inputSeconds = targetDistance * YARDS_TO_SECONDS_ROUGH_FACTOR; // Approx 3200s
    const pattern = generateWorkout(inputSeconds);
    const generatedDistance = calculateTotalDistance(pattern);

    console.log(`Test 4000 yards: TargetDist=${targetDistance}, InputSecs=${inputSeconds}, GenDist=${generatedDistance}, GenSecs=${pattern.seconds}`);
    // Allow for some variance, e.g., +/- 20% to be safer initially
    expect(generatedDistance).to.be.closeTo(targetDistance, targetDistance * 0.25);
  });

  it('should generate a workout close to 5000 yards', () => {
    const targetDistance = 5000;
    const inputSeconds = targetDistance * YARDS_TO_SECONDS_ROUGH_FACTOR; // Approx 4000s
    const pattern = generateWorkout(inputSeconds);
    const generatedDistance = calculateTotalDistance(pattern);

    console.log(`Test 5000 yards: TargetDist=${targetDistance}, InputSecs=${inputSeconds}, GenDist=${generatedDistance}, GenSecs=${pattern.seconds}`);
    // Allow for some variance, e.g., +/- 25%
    expect(generatedDistance).to.be.closeTo(targetDistance, targetDistance * 0.25);
  });

  it('should generate a workout for a very long duration (approx 6000 yards)', () => {
    const targetDistance = 6000; // A bit beyond the original request to test upper limits
    const inputSeconds = targetDistance * YARDS_TO_SECONDS_ROUGH_FACTOR; // Approx 4800s
    const pattern = generateWorkout(inputSeconds);
    const generatedDistance = calculateTotalDistance(pattern);

    console.log(`Test 6000 yards: TargetDist=${targetDistance}, InputSecs=${inputSeconds}, GenDist=${generatedDistance}, GenSecs=${pattern.seconds}`);
    expect(generatedDistance).to.be.closeTo(targetDistance, targetDistance * 0.25);
  });
});
