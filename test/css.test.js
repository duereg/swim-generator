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

// Helper function to extract distance (should be placed at an appropriate scope, e.g., top-level in the file or within the new describe block if not already present)
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

            expect(generatedDist, `Generated distance should not be null (iteration ${i + 1}) for ${workoutType} ${targetDist}yd`).to.be.a('number');
            if (generatedDist === null) {
                console.log(`Failed to parse distance for workout (iter ${i+1}): ${workoutString}`);
                continue; // Skip further checks if null, assertion above will fail test
            }

            const lowerBound = targetDist * (1 - deviationPercent);
            const upperBound = targetDist * (1 + deviationPercent);

            expect(generatedDist, `Workout (iter ${i + 1}):\n${workoutString}\nTarget: ${targetDist}, Generated: ${generatedDist}, Expected: ${lowerBound.toFixed(0)}-${upperBound.toFixed(0)}`)
                .to.be.at.least(lowerBound)
                .and.at.most(upperBound);
        }
    };

    it('should adhere to medium distance for THRESHOLD_SUSTAINED (EN2)', () => {
        runAdherenceTest(2500, 'EN2', '1:30', 'THRESHOLD_SUSTAINED', 0.15);
    });

    it('should adhere to short distance for SPEED_ENDURANCE (SP1)', () => {
        runAdherenceTest(1200, 'SP1', '1:10', 'SPEED_ENDURANCE', 0.20);
    });

    it('should adhere to very short distance for ENDURANCE_BASE (EN1)', () => {
        runAdherenceTest(500, 'EN1', '1:40', 'ENDURANCE_BASE', 0.25);
    });

    it('should handle minimal distance (100 yards) for ENDURANCE_BASE (EN1)', () => {
        runAdherenceTest(100, 'EN1', '2:00', 'ENDURANCE_BASE', 0.75); // Wider tolerance
    });

    it('should adhere to long distance for THRESHOLD_DEVELOPMENT (EN3)', () => {
        runAdherenceTest(4000, 'EN3', '1:20', 'THRESHOLD_DEVELOPMENT', 0.17); // Adjusted deviation
    });

    it('should adhere to medium distance for GENERAL_ENDURANCE (default type)', () => {
        runAdherenceTest(2200, 'EN1', '1:35', 'UNKNOWN_TYPE_FOR_FALLBACK', 0.15);
    });

    it('should adhere to medium distance for MAX_SPRINT (SP2)', () => {
        runAdherenceTest(1500, 'SP2', '1:05', 'MAX_SPRINT', 0.20);
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

        const expectedCssSeconds = 90;
        const expectedRemainingForMainSet = totalDistance - 400; // warmup dist
        expect(generateMainSetStub.calledWith(
            workoutType, // Check workoutType first
            energySystem,
            expectedCssSeconds,
            expectedRemainingForMainSet,
            sinon.match.object // mainSetDefinitions
        )).to.be.true;

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

        const expectedCssSeconds = 75;
        const expectedRemainingForMainSet = totalDistance - 0; // No warmup dist
        expect(generateMainSetStub.calledWith(
            workoutType,
            energySystem,
            expectedCssSeconds,
            expectedRemainingForMainSet,
            sinon.match.object
        )).to.be.true;
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
