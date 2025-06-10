import { expect } from 'chai';
import sinon from 'sinon';
import { parseCssTimeToSeconds, formatSecondsToMmSs, generateWorkout } from '../lib/css.js';
import workoutComponents from '../lib/workoutComponents.js';

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
        expect(generateMainSetStub.calledOnce).to.be.true;
        expect(selectCooldownStub.calledOnce).to.be.true;

        const expectedCssSeconds = parseCssTimeToSeconds(cssTime); // Use parseCssTimeToSeconds for consistency

        const actualArgs = generateMainSetStub.getCall(0).args;

        // Simulate generateWorkout's warmup logic to get the *actual* warmup distance used by generateWorkout
        // This is crucial because generateWorkout might override the stubbed warmup.
        let effectiveWarmupDist;
        const initialSelectedWarmup = { dist: 400, type: "swim" }; // From selectWarmupStub.returns in beforeEach

        if (initialSelectedWarmup && initialSelectedWarmup.dist > 0) {
            const minMainSetThreshold = 200;
            let maxAllowedWarmupDist = totalDistance - minMainSetThreshold; // totalDistance = 2000
            maxAllowedWarmupDist = Math.min(maxAllowedWarmupDist, totalDistance * 0.6); // min(1800, 1200) = 1200
            if (maxAllowedWarmupDist < 0 && totalDistance > 0) { // Not true for this test case
                maxAllowedWarmupDist = totalDistance * 0.4;
            }
            if (maxAllowedWarmupDist < 50 && totalDistance >= 50) { // Not true for this test case (1200 < 50 is false)
                maxAllowedWarmupDist = 50;
            }
            // Ensure maxAllowedWarmupDist is not negative if totalDistance was very small
            if (maxAllowedWarmupDist < 0) maxAllowedWarmupDist = 0;


            if (initialSelectedWarmup.dist > maxAllowedWarmupDist) { // 400 > 1200 is false
                // If this were true, the stubbed warmup would be overridden.
                // For this test, it's NOT overridden, so effectiveWarmupDist is initialSelectedWarmup.dist
                effectiveWarmupDist = 0; // This would be the case if overridden to noWarmupOption
                                         // but we need to know what it *would* be overridden to.
                                         // The actual code filters `warmups` array which is not available here.
                                         // For this test, the override path is NOT taken.
                effectiveWarmupDist = initialSelectedWarmup.dist; // Stays as stubbed
            } else {
                effectiveWarmupDist = initialSelectedWarmup.dist; // Stays as stubbed
            }
        } else {
             effectiveWarmupDist = (initialSelectedWarmup && initialSelectedWarmup.dist === 0) ? 0 : 0; // handles noWarmupOption or null
        }

        const calculatedExpectedRemainingForMainSet = totalDistance - effectiveWarmupDist;

        const testName = 'Generate Complete Workout';
        console.log(`DEBUG TEST: ${testName} - Arg 0 WORKOUT_TYPE: Expected='${workoutType}', Actual='${actualArgs[0]}'`);
        console.log(`DEBUG TEST: ${testName} - Arg 1 ENERGY_SYSTEM: Expected='${energySystem}', Actual='${actualArgs[1]}'`);
        console.log(`DEBUG TEST: ${testName} - Arg 2 CSS_SECONDS: Expected='${expectedCssSeconds}', Actual='${actualArgs[2]}'`);
        console.log(`DEBUG TEST: ${testName} - Arg 3 REMAINING_DIST: Expected='${calculatedExpectedRemainingForMainSet}', Actual='${actualArgs[3]}'`);
        console.log(`DEBUG TEST: ${testName} - Arg 4 MAIN_SET_DEFS_TYPE: Expected='object', Actual_Type='${typeof actualArgs[4]}', IsObject=${actualArgs[4] !== null && typeof actualArgs[4] === 'object'}`);

        expect(actualArgs[0], "Argument: workoutType").to.equal(workoutType);
        expect(actualArgs[1], "Argument: energySystem").to.equal(energySystem);
        expect(actualArgs[2], "Argument: cssSeconds").to.equal(expectedCssSeconds);
        expect(actualArgs[3], "Argument: remainingDistanceForMainSet").to.equal(calculatedExpectedRemainingForMainSet);
        expect(actualArgs[4], "Argument: mainSetDefinitions").to.be.an('object');

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

        const expectedCssSeconds = parseCssTimeToSeconds(cssTime); // Use parseCssTimeToSeconds

        const actualArgs = generateMainSetStub.getCall(0).args;

        // Simulate generateWorkout's warmup logic
        let effectiveWarmupDist;
        // const initialSelectedWarmup = { desc: "No warmup bitches", dist: 0, type: "none" }; // From selectWarmupStub.returns

        // The adaptive logic `if (initialSelectedWarmup && initialSelectedWarmup.dist > 0)` will be false.
        // Then `else if (!selectedWarmup || selectedWarmup.dist === 0)` in generateWorkout makes it use this 0 dist.
        effectiveWarmupDist = 0;

        const calculatedExpectedRemainingForMainSet = totalDistance - effectiveWarmupDist;

        const testName_noWU = 'No Warmup Scenario';
        console.log(`DEBUG TEST: ${testName_noWU} - Arg 0 WORKOUT_TYPE: Expected='${workoutType}', Actual='${actualArgs[0]}'`);
        console.log(`DEBUG TEST: ${testName_noWU} - Arg 1 ENERGY_SYSTEM: Expected='${energySystem}', Actual='${actualArgs[1]}'`);
        console.log(`DEBUG TEST: ${testName_noWU} - Arg 2 CSS_SECONDS: Expected='${expectedCssSeconds}', Actual='${actualArgs[2]}'`);
        console.log(`DEBUG TEST: ${testName_noWU} - Arg 3 REMAINING_DIST: Expected='${calculatedExpectedRemainingForMainSet}', Actual='${actualArgs[3]}'`);
        console.log(`DEBUG TEST: ${testName_noWU} - Arg 4 MAIN_SET_DEFS_TYPE: Expected='object', Actual_Type='${typeof actualArgs[4]}', IsObject=${actualArgs[4] !== null && typeof actualArgs[4] === 'object'}`);

        expect(actualArgs[0], "Argument: workoutType").to.equal(workoutType);
        expect(actualArgs[1], "Argument: energySystem").to.equal(energySystem);
        expect(actualArgs[2], "Argument: cssSeconds").to.equal(expectedCssSeconds);
        expect(actualArgs[3], "Argument: remainingDistanceForMainSet").to.equal(calculatedExpectedRemainingForMainSet);
        expect(actualArgs[4], "Argument: mainSetDefinitions").to.be.an('object');

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
