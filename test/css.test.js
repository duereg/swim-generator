import { expect } from 'chai';
import sinon from 'sinon';
import { parseCssTimeToSeconds, formatSecondsToMmSs, generateWorkout } from '../lib/css.js';
import workoutComponents from '../lib/workoutComponents.js';
import { mainSetDefinitions as expectedMainSetDefinitions } from '../lib/data/mainSets.js';

describe('CSS Helper Functions', () => {
    describe('parseCssTimeToSeconds', () => {
        it('should correctly parse valid MM:SS strings', () => {
            expect(parseCssTimeToSeconds('1:10')).to.equal(70);
            // ... (other assertions remain the same)
            expect(parseCssTimeToSeconds('0:00')).to.equal(0);
        });

        it('should return null for invalid formats', () => {
            expect(parseCssTimeToSeconds('110')).to.be.null;
            // ... (other assertions remain the same)
            expect(parseCssTimeToSeconds('1:2:3')).to.be.null;
        });

        it('should return null for null or undefined input', () => {
            expect(parseCssTimeToSeconds(null)).to.be.null;
            expect(parseCssTimeToSeconds(undefined)).to.be.null;
        });
    });

    describe('formatSecondsToMmSs', () => {
        it('should correctly format seconds to MM:SS string', () => {
            expect(formatSecondsToMmSs(70)).to.equal('1:10.0');
            // ... (other assertions remain the same)
            expect(formatSecondsToMmSs(3599.9)).to.equal('59:59.9');
        });

        it('should handle single digit seconds correctly with leading zero', () => {
            expect(formatSecondsToMmSs(61.0)).to.equal('1:01.0');
            expect(formatSecondsToMmSs(8.5)).to.equal('0:08.5');
        });
    });
});

// Helper function to extract distance from workout string
function getWorkoutDistance(workoutString) {
    if (typeof workoutString !== 'string') return null;
    const match = workoutString.match(/Total estimated distance: (\d+)/);
    return match ? parseInt(match[1], 10) : null;
}

describe('generateWorkout Distance Adherence Tests', () => {
    const runAdherenceTest = (targetDist, energySystem, cssTime, workoutType, deviationPercent, iterations = 5) => {
        for (let i = 0; i < iterations; i++) {
            const workoutString = generateWorkout(targetDist, energySystem, cssTime, workoutType);
            const generatedDist = getWorkoutDistance(workoutString);

            expect(generatedDist, `Generated distance should not be null (iteration ${i + 1}) for workout:
${workoutString}`).to.be.a('number');
            if (generatedDist === null) continue; // Skip further checks if null

            const lowerBound = targetDist * (1 - deviationPercent);
            const upperBound = targetDist * (1 + deviationPercent);

            // Check if the generated distance is within the expected range
            expect(generatedDist, `Workout (iter ${i + 1}):
${workoutString}
Target: ${targetDist}, Generated: ${generatedDist}, Expected: ${Math.round(lowerBound)}-${Math.round(upperBound)}`)
                .to.be.at.least(lowerBound)
                .and.at.most(upperBound);
        }
    };

    it('should adhere to medium distance for THRESHOLD_SUSTAINED (EN2)', () => {
        runAdherenceTest(2500, 'EN2', '1:30', 'THRESHOLD_SUSTAINED', 0.15); // +/- 15%
    });

    it('should adhere to short distance for SPEED_ENDURANCE (SP1)', () => {
        runAdherenceTest(1200, 'SP1', '1:10', 'SPEED_ENDURANCE', 0.20); // +/- 20% for shorter, more variable sets
    });

    it('should adhere to very short distance for ENDURANCE_BASE (EN1)', () => {
        runAdherenceTest(500, 'EN1', '1:40', 'ENDURANCE_BASE', 0.25); // +/- 25% for very short
    });

    it('should handle minimal distance (100 yards) for ENDURANCE_BASE (EN1)', () => {
        runAdherenceTest(100, 'EN1', '2:00', 'ENDURANCE_BASE', 0.75); // +/- 75% (e.g. 25 to 175 yards)
    });

    it('should adhere to long distance for THRESHOLD_DEVELOPMENT (EN3)', () => {
        runAdherenceTest(4000, 'EN3', '1:20', 'THRESHOLD_DEVELOPMENT', 0.17); // +/- 17%
    });

    it('should adhere to medium distance for GENERAL_ENDURANCE (default type via unknown type)', () => {
        runAdherenceTest(2200, 'EN1', '1:35', 'UNKNOWN_TYPE_FOR_FALLBACK', 0.15); // +/- 15%
    });

    it('should adhere to medium distance for MAX_SPRINT (SP2)', () => {
        runAdherenceTest(1500, 'SP2', '1:05', 'MAX_SPRINT', 0.20); // +/- 20%
    });
});

describe('generateWorkout Integration Tests', () => {
    let selectWarmupStub;
    let generateMainSetStub;
    let selectCooldownStub;

    beforeEach(() => {
        selectWarmupStub = sinon.stub(workoutComponents, 'selectWarmup');
        generateMainSetStub = sinon.stub(workoutComponents, 'generateMainSet');
        selectCooldownStub = sinon.stub(workoutComponents, 'selectCooldown');

        selectWarmupStub.returns({ desc: "Mock Warmup 400yd", dist: 400, type: "swim" });
        generateMainSetStub.returns({
            sets: ["4x100 mock set"],
            mainSetTotalDist: 400,
            targetPacePer100: 90,
            descriptiveMessage: "Mock main set generated"
        });
        selectCooldownStub.returns({ desc: "Mock Cooldown 200yd", dist: 200, type: "swim" });
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should generate a complete workout with valid inputs', () => {
        const totalDistance = 2000;
        const energySystem = 'EN2';
        const cssTime = '1:30'; // 90 seconds
        const workoutType = 'THRESHOLD_SUSTAINED'; // New workoutType

        const result = generateWorkout(totalDistance, energySystem, cssTime, workoutType);

        expect(selectWarmupStub.calledOnce).to.be.true;
        expect(selectWarmupStub.calledOnce).to.be.true;
        expect(generateMainSetStub.calledOnce).to.be.true; // Keep this to ensure it's called
        expect(selectCooldownStub.calledOnce).to.be.true;

        const actualArgs = generateMainSetStub.getCall(0).args;

        // Expected values based on test setup
        const expectedWorkoutType_test = workoutType; // 'THRESHOLD_SUSTAINED' from test scope
        const expectedEnergySystem_test = energySystem; // 'EN2' from test scope
        const expectedCssSeconds_test = parseCssTimeToSeconds(cssTime); // 90 from '1:30' in test scope

        // Simulate generateWorkout's adaptive warmup logic accurately to calculate effectiveWarmupDist_test
        const totalDistance_test = totalDistance; // 2000 from test scope
        const stubbedWarmupObj = { dist: 400, desc: "Mock Warmup 400yd", type: "swim" }; // As per beforeEach stub

        let effectiveWarmupDist_test = stubbedWarmupObj.dist; // Start with stubbed value

        // Mimic the adaptive warmup logic from generateWorkout function in lib/css.js
        if (stubbedWarmupObj.dist > 0) {
            const minMainSetThreshold = 200;
            let maxAllowedWarmupDist = totalDistance_test - minMainSetThreshold; // 2000 - 200 = 1800
            maxAllowedWarmupDist = Math.min(maxAllowedWarmupDist, totalDistance_test * 0.6); // Math.min(1800, 2000 * 0.6 = 1200) => 1200

            if (maxAllowedWarmupDist < 0 && totalDistance_test > 0) { // 1200 < 0 is false
                maxAllowedWarmupDist = totalDistance_test * 0.4;
            }
            if (maxAllowedWarmupDist < 50 && totalDistance_test >= 50) { // 1200 < 50 is false
                maxAllowedWarmupDist = 50;
            }
            if (maxAllowedWarmupDist < 0) { // 1200 < 0 is false
                maxAllowedWarmupDist = 0;
            }

            // Log intermediate calculation for maxAllowedWarmupDist
            console.log(`DEBUG STUB TEST ('complete workout'): totalDistance_test=${totalDistance_test}, stubbedWarmupObj.dist=${stubbedWarmupObj.dist}, calculated maxAllowedWarmupDist=${maxAllowedWarmupDist}`);

            if (stubbedWarmupObj.dist > maxAllowedWarmupDist) { // 400 > 1200 is false
                // This path is NOT taken for this test's values.
                // If it were, the warmup would be overridden, likely to 0 if no suitable shorter warmups were available.
                console.log(`DEBUG STUB TEST ('complete workout'): Stubbed warmup dist (${stubbedWarmupObj.dist}) > maxAllowedWarmupDist (${maxAllowedWarmupDist}). Simulating override to 0.`);
                effectiveWarmupDist_test = 0;
            } else {
                console.log(`DEBUG STUB TEST ('complete workout'): Stubbed warmup dist (${stubbedWarmupObj.dist}) <= maxAllowedWarmupDist (${maxAllowedWarmupDist}). Using stubbed dist.`);
                effectiveWarmupDist_test = stubbedWarmupObj.dist; // Remains 400
            }
        } else if (stubbedWarmupObj.dist === 0) { // This path not taken as stubbedWarmupObj.dist is 400
            effectiveWarmupDist_test = 0;
        }
        // If selectWarmupStub returned null (it doesn't per beforeEach), generateWorkout sets selectedWarmup = noWarmupOption (dist 0)
        // So effectiveWarmupDist_test calculation covers the main paths.

        const calculatedExpectedRemainingForMainSet_test = totalDistance_test - effectiveWarmupDist_test; // 2000 - 400 = 1600

        const testName = 'Generate Complete Workout';
        console.log(`DEBUG STUB TEST (${testName}) Arg 0 WORKOUT_TYPE: Expected='${expectedWorkoutType_test}', Actual='${actualArgs[0]}'`);
        console.log(`DEBUG STUB TEST (${testName}) Arg 1 ENERGY_SYSTEM: Expected='${expectedEnergySystem_test}', Actual='${actualArgs[1]}'`);
        console.log(`DEBUG STUB TEST (${testName}) Arg 2 CSS_SECONDS: Expected='${expectedCssSeconds_test}', Actual='${actualArgs[2]}' (Type Expected: ${typeof expectedCssSeconds_test}, Actual: ${typeof actualArgs[2]})`);
        console.log(`DEBUG STUB TEST (${testName}) Arg 3 REMAINING_DIST: Expected='${calculatedExpectedRemainingForMainSet_test}', Actual='${actualArgs[3]}' (EffectiveWarmupDist_test: ${effectiveWarmupDist_test}, Type Expected: ${typeof calculatedExpectedRemainingForMainSet_test}, Actual: ${typeof actualArgs[3]})`);

        // Argument 4: mainSetDefinitions (object)
        console.log(`DEBUG STUB TEST (${testName}) Arg 4 MAIN_SET_DEFS_TYPE: Actual_Type='${typeof actualArgs[4]}', IsObject=${actualArgs[4] !== null && typeof actualArgs[4] === 'object'}`);
        if (actualArgs[4] && typeof actualArgs[4] === 'object') {
            console.log(`DEBUG STUB TEST (${testName}) Arg 4 Actual Keys: ${Object.keys(actualArgs[4]).sort().join(', ')}`);
        }
        console.log(`DEBUG STUB TEST (${testName}) Arg 4 Expected Keys: ${Object.keys(expectedMainSetDefinitions).sort().join(', ')}`);

        expect(actualArgs[0], `${testName} Argument: workoutType`).to.equal(expectedWorkoutType_test);
        expect(actualArgs[1], `${testName} Argument: energySystem`).to.equal(expectedEnergySystem_test);
        expect(actualArgs[2], `${testName} Argument: cssSeconds`).to.equal(expectedCssSeconds_test);
        expect(actualArgs[3], `${testName} Argument: remainingDistanceForMainSet`).to.equal(calculatedExpectedRemainingForMainSet_test);

        expect(actualArgs[4], `${testName} Argument: mainSetDefinitions should be an object`).to.be.an('object');
        expect(Object.keys(actualArgs[4]).sort(), `${testName} Argument: mainSetDefinitions should have the same keys`).to.deep.equal(Object.keys(expectedMainSetDefinitions).sort());


        expect(result).to.include("WU: Mock Warmup 400yd");
        expect(result).to.include("Main Set: Mock main set generated");
        expect(result).to.include("  - 4x100 mock set");
        expect(result).to.include("CD: Mock Cooldown 200yd");

        const expectedTotalDist = 400 + 400 + 200;
        expect(result).to.include(`Total estimated distance: ${expectedTotalDist} yards`);
        expect(result).to.include(`CSS: ${cssTime}`);
        expect(result).to.include(`Workout Type: ${workoutType}`); // Check for Workout Type line
        expect(result).to.include(`Energy System Focus: ${energySystem.toUpperCase()}`);
        expect(result).to.include(`Estimated AVG pace for main set: ${formatSecondsToMmSs(90)} / 100 yards`);
    });

    it('should return error message for invalid cssTimeMmSs', () => {
        const workoutType = 'ANY_TYPE'; // Still need to pass workoutType
        const result = generateWorkout(2000, 'EN1', 'invalid:time', workoutType);
        expect(result).to.equal("Error: Invalid CSS time format. Please use MM:SS (e.g., '1:10').");
        expect(selectWarmupStub.called).to.be.false;
        expect(generateMainSetStub.called).to.be.false;
        expect(selectCooldownStub.called).to.be.false;
    });

    it('should handle "No warmup" scenario', () => {
        selectWarmupStub.returns({ desc: "No warmup bitches", dist: 0, type: "none" });

        const totalDistance = 1000;
        const energySystem = 'SP1';
        const cssTime = '1:15'; // 75 seconds
        const workoutType = 'SPEED_ENDURANCE'; // Matching workoutType

        const result = generateWorkout(totalDistance, energySystem, cssTime, workoutType);

        expect(selectWarmupStub.calledOnce).to.be.true;
        expect(generateMainSetStub.calledOnce).to.be.true;

        const actualArgs = generateMainSetStub.getCall(0).args;

        // Define expected values for this test
        const testName_noWU = 'No Warmup Scenario';
        const expectedWorkoutType_noWU_test = workoutType; // 'SPEED_ENDURANCE' from test scope
        const expectedEnergySystem_noWU_test = energySystem; // 'SP1' from test scope
        const expectedCssSeconds_noWU_test = parseCssTimeToSeconds(cssTime); // 75 from '1:15' in test scope

        // Simulate generateWorkout's warmup logic to accurately get effectiveWarmupDist
        // For "No warmup" scenario, selectWarmupStub returns { dist: 0 }
        const stubbedWarmupObj_noWU = { desc: "No warmup bitches", dist: 0, type: "none" }; // As per stub
        let effectiveWarmupDist_noWU_test = 0; // Default for no warmup

        // The adaptive warmup logic in generateWorkout:
        // if (selectedWarmup && selectedWarmup.dist > 0) { ... }
        // else if (!selectedWarmup || selectedWarmup.dist === 0) { selectedWarmup = noWarmupOption; }
        // Since stubbedWarmupObj_noWU.dist is 0, the first 'if' is false.
        // The 'else if' condition `!stubbedWarmupObj_noWU || stubbedWarmupObj_noWU.dist === 0` is true.
        // So, generateWorkout uses a warmup with dist 0.
        // Thus, effectiveWarmupDist_noWU_test remains 0.

        const calculatedExpectedRemainingForMainSet_noWU_test = totalDistance - effectiveWarmupDist_noWU_test; // totalDistance is 1000

        // Argument 0: workoutType (string)
        console.log(`ADVANCED DEBUG (${testName_noWU}) Arg 0 WORKOUT_TYPE: Expected='${expectedWorkoutType_noWU_test}', Actual='${actualArgs[0]}'`);
        expect(actualArgs[0], `${testName_noWU} Arg 0 (workoutType)`).to.equal(expectedWorkoutType_noWU_test);

        // Argument 1: energySystem (string)
        console.log(`ADVANCED DEBUG (${testName_noWU}) Arg 1 ENERGY_SYSTEM: Expected='${expectedEnergySystem_noWU_test}', Actual='${actualArgs[1]}'`);
        expect(actualArgs[1], `${testName_noWU} Arg 1 (energySystem)`).to.equal(expectedEnergySystem_noWU_test);

        // Argument 2: cssSeconds (number)
        console.log(`ADVANCED DEBUG (${testName_noWU}) Arg 2 CSS_SECONDS: Expected='${expectedCssSeconds_noWU_test}', Actual='${actualArgs[2]}' (Type Expected: ${typeof expectedCssSeconds_noWU_test}, Actual: ${typeof actualArgs[2]})`);
        expect(actualArgs[2], `${testName_noWU} Arg 2 (cssSeconds)`).to.equal(expectedCssSeconds_noWU_test);

        // Argument 3: remainingDistanceForMainSet (number)
        console.log(`ADVANCED DEBUG (${testName_noWU}) Arg 3 REMAINING_DIST: Expected='${calculatedExpectedRemainingForMainSet_noWU_test}', Actual='${actualArgs[3]}' (Type Expected: ${typeof calculatedExpectedRemainingForMainSet_noWU_test}, Actual: ${typeof actualArgs[3]})`);
        expect(actualArgs[3], `${testName_noWU} Arg 3 (remainingDistance)`).to.equal(calculatedExpectedRemainingForMainSet_noWU_test);

        // Argument 4: mainSetDefinitions (object)
        console.log(`ADVANCED DEBUG (${testName_noWU}) Arg 4 MAIN_SET_DEFS_TYPE: Actual_Type='${typeof actualArgs[4]}', IsObject=${actualArgs[4] !== null && typeof actualArgs[4] === 'object'}`);
        if (actualArgs[4] && typeof actualArgs[4] === 'object') {
            console.log(`ADVANCED DEBUG (${testName_noWU}) Arg 4 Actual Keys: ${Object.keys(actualArgs[4]).sort().join(', ')}`);
        }
        console.log(`ADVANCED DEBUG (${testName_noWU}) Arg 4 Expected Keys: ${Object.keys(expectedMainSetDefinitions).sort().join(', ')}`);

        expect(actualArgs[4], `${testName_noWU} Arg 4 (mainSetDefinitions) should be an object`).to.be.an('object');
        expect(Object.keys(actualArgs[4]).sort(), `${testName_noWU} Arg 4 (mainSetDefinitions) should have the same keys`).to.deep.equal(Object.keys(expectedMainSetDefinitions).sort());

        expect(selectCooldownStub.calledOnce).to.be.true;

        expect(result).to.include("WU: No warmup bitches");
        const expectedTotalDist = 0 + 400 + 200;
        expect(result).to.include(`Total estimated distance: ${expectedTotalDist} yards`);
        expect(result).to.include(`Workout Type: ${workoutType}`);
    });

    it('should correctly pass remaining distance to generateMainSet', () => {
        selectWarmupStub.returns({ desc: "Specific Warmup", dist: 350, type: "swim" });
        // generateMainSetStub default return is fine for this test's focus
        selectCooldownStub.returns({ desc: "Specific Cooldown", dist: 250, type: "swim" });

        const totalDistance = 2000;
        const energySystem = 'EN3';
        const cssTime = '1:20'; // 80 seconds
        const workoutType = 'THRESHOLD_DEVELOPMENT';

        generateWorkout(totalDistance, energySystem, cssTime, workoutType);

        const expectedCssSeconds = 80;
        const expectedRemainingForMainSet = totalDistance - 350;
        expect(generateMainSetStub.calledOnceWith(
            workoutType,
            energySystem,
            expectedCssSeconds,
            expectedRemainingForMainSet,
            sinon.match.object
        )).to.be.true;
    });
});
