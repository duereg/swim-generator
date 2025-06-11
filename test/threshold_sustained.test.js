import { THRESHOLD_SUSTAINED } from '../lib/data/mainSets/THRESHOLD_SUSTAINED.js';
import { expect } from 'chai';

describe('THRESHOLD_SUSTAINED', () => {
  it('should randomly select between 500m and 1000m sets when appropriate', () => {
    const energySystem = 'EN2';
    const cssSecondsPer100 = 90; // Example CSS
    // This distance should allow for 4x500 (2000m) or 2x1000 (2000m)
    // Or, for 6x500 (3000m) or 3x1000 (3000m)
    // Let's use a distance that allows both to be chosen with max reps for their pattern
    // Nx500 maxReps: 14 (7000m), Nx1000 maxReps: 6 (6000m)
    // A common distance: 2000m (4x500 or 2x1000)
    // Another common distance: 3000m (6x500 or 3x1000)
    // Let's test with 4000m: 8x500 or 4x1000
    // Let's test with 2000m as it's a simple case.
    const remainingDistanceForMainSet = 2000;
    const iterations = 50; // Number of times to call the function
    let count500s = 0;
    let count1000s = 0;

    for (let i = 0; i < iterations; i++) {
      const result = THRESHOLD_SUSTAINED(energySystem, cssSecondsPer100, remainingDistanceForMainSet);
      if (result.sets && result.sets.length > 0) {
        if (result.sets[0].includes('x500')) {
          count500s++;
        } else if (result.sets[0].includes('x1000')) {
          count1000s++;
        }
      }
    }

    // For the test to pass, both types of sets should have been generated at least once.
    // Given enough iterations, we expect both counts to be > 0.
    // A more robust test might check for a reasonable distribution,
    // but for now, just presence is a good start.
    expect(count500s).to.be.greaterThan(0);
    expect(count1000s).to.be.greaterThan(0);
    console.log(`Test results for ${remainingDistanceForMainSet}m: 500m sets: ${count500s}, 1000m sets: ${count1000s} (out of ${iterations} iterations)`);

    // Test with another distance: 3000m
    count500s = 0;
    count1000s = 0;
    const remainingDistanceForMainSet2 = 3000;
     for (let i = 0; i < iterations; i++) {
      const result = THRESHOLD_SUSTAINED(energySystem, cssSecondsPer100, remainingDistanceForMainSet2);
      if (result.sets && result.sets.length > 0) {
        if (result.sets[0].includes('x500')) {
          count500s++;
        } else if (result.sets[0].includes('x1000')) {
          count1000s++;
        }
      }
    }
    expect(count500s).to.be.greaterThan(0);
    expect(count1000s).to.be.greaterThan(0);
    console.log(`Test results for ${remainingDistanceForMainSet2}m: 500m sets: ${count500s}, 1000m sets: ${count1000s} (out of ${iterations} iterations)`);
  });
});
