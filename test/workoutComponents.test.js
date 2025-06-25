import { expect } from 'chai';
import sinon from 'sinon';
import wc from '../lib/workoutComponents.js';
const { generateCooldown, generateMainSet } = wc;

import { cooldowns as actualCooldownsData } from '../lib/data/cooldowns.js'; // Import actual data
// Import the function we want to spy on and the actual configs
import * as workoutGenerator from '../lib/workoutGenerator.js';
import { ALL_WORKOUT_CONFIGS } from '../lib/data/mainSetConfigs.js';

describe('Workout Components', () => {
    let randomStub;

    beforeEach(() => {
        randomStub = sinon.stub(Math, 'random');
    });

    afterEach(() => {
        randomStub.restore();
        // Restore any other spies/stubs created in tests if they are on module-level objects
        // For generateMainSetFromConfigSpy, it's created in a nested beforeEach,
        // but best practice is to restore what you create.
        // If generateMainSetFromConfigSpy is consistently created, it can be restored here.
        // However, it's safer to restore it in its own describe block's afterEach.
        // For now, the spy is on an imported module, sinon should handle it with global restore if needed.
        // Let's assume sinon.restore() in the test runner or a global afterEach handles this for now.
        // The error was "Cannot redefine property", suggesting it wasn't restored.
        // The spy is created in the beforeEach of 'describe('generateMainSet', ...)'
        // It should be restored in an afterEach for that same describe block.
        // Let's add it there.
    });

    describe('generateCooldown', () => {
        // const mockAvailableCooldowns = [ // This is no longer used as generateCooldown doesn't take args
        //     { desc: "Cooldown 1", dist: 200, type: "swim" },
        //     { desc: "Cooldown 2", dist: 150, type: "pull" },
        //     { desc: "Cooldown 3", dist: 100, type: "fins" },
        // ];

        describe('when selecting a cooldown', () => {
            let cooldown;
            let expectedCooldown;

            beforeEach(() => {
                // Control Math.random to select a predictable cooldown from the actual data
                // Example: if actualCooldownsData has 10 items, 0.5 / (1/10) = 5th item (index 4)
                // For simplicity, let's pick the second item (index 1) if available
                const targetIndex = 1;
                if (actualCooldownsData.length > targetIndex) {
                    randomStub.returns(targetIndex / actualCooldownsData.length);
                    expectedCooldown = actualCooldownsData[targetIndex];
                } else {
                    // If not enough items, pick the first one
                    randomStub.returns(0);
                    expectedCooldown = actualCooldownsData[0];
                }
                cooldown = generateCooldown();
            });

            it('should select a cooldown from the actual cooldowns data', () => {
                expect(cooldown).to.deep.equal(expectedCooldown);
            });

            it('should return an object with desc, dist, and type keys', () => {
                expect(cooldown).to.have.all.keys('desc', 'dist', 'type');
            });
        });

        // The following tests are no longer valid as generateCooldown doesn't accept an array
        // and its behavior with empty/null internal `cooldowns` data is to return NO_COOLDOWN.
        // it('should return NO_COOLDOWN if internal cooldowns list is empty', () => { ... });
        // This would require mocking the imported `cooldowns` from `lib/data/cooldowns.js` to be empty.
    });

    describe('generateMainSet', () => {
        let generateMainSetFromConfigSpy;

        const mockCssSecondsPer100 = 90;
        const mockRemainingDistance = 2000;
        const mockEnergySystem = 'EN1';

        // Mock return value for generateMainSetFromConfigSpy
        const MOCK_GENERATOR_OUTPUT = {
            sets: ["mocked set string"],
            mainSetTotalDist: 1500,
            targetPacePer100: 95,
            descriptiveMessage: "Mocked output from generateMainSetFromConfig"
        };

        beforeEach(() => {
            // Spy on generateMainSetFromConfig within its module
            generateMainSetFromConfigSpy = sinon.spy(workoutGenerator, 'generateMainSetFromConfig');
            // Configure the spy to return a default value to prevent errors if called.
            // For tests checking call arguments, the return value might not be critical,
            // but for tests checking behavior based on return (like fallback), it is.
            // We can make it return a default or specific values per test.
            generateMainSetFromConfigSpy.returns(MOCK_GENERATOR_OUTPUT);
        });

        afterEach(() => {
            // Restore the spy created in the beforeEach of this describe block
            if (generateMainSetFromConfigSpy && generateMainSetFromConfigSpy.restore) {
                generateMainSetFromConfigSpy.restore();
            }
        });

        describe('when calling with a known workoutType (ENDURANCE_BASE)', () => {
            const workoutType = 'ENDURANCE_BASE';
            let result;

            beforeEach(() => {
                result = generateMainSet(workoutType, mockEnergySystem, mockCssSecondsPer100, mockRemainingDistance);
            });

            it('should call generateMainSetFromConfig with ENDURANCE_BASE config', () => {
                expect(generateMainSetFromConfigSpy.calledOnce).to.be.true;
                expect(generateMainSetFromConfigSpy.calledWith(
                    mockEnergySystem,
                    mockCssSecondsPer100,
                    mockRemainingDistance,
                    ALL_WORKOUT_CONFIGS.ENDURANCE_BASE
                )).to.be.true;
            });

            it('should return the output of generateMainSetFromConfig', () => {
                expect(result).to.deep.equal(MOCK_GENERATOR_OUTPUT);
            });
        });

        describe('when calling with another known workoutType (SPEED_ENDURANCE)', () => {
            const workoutType = 'SPEED_ENDURANCE';
            const specificEnergySystem = 'SP1';
             beforeEach(() => {
                generateMainSet(workoutType, specificEnergySystem, mockCssSecondsPer100, mockRemainingDistance);
            });

            it('should call generateMainSetFromConfig with SPEED_ENDURANCE config', () => {
                expect(generateMainSetFromConfigSpy.calledOnceWith(
                    specificEnergySystem,
                    mockCssSecondsPer100,
                    mockRemainingDistance,
                    ALL_WORKOUT_CONFIGS.SPEED_ENDURANCE
                )).to.be.true;
            });
        });

        describe('when calling with an unknown workoutType', () => {
            const unknownWorkoutType = 'UNKNOWN_TYPE';
            let result;
            beforeEach(() => {
                result = generateMainSet(unknownWorkoutType, mockEnergySystem, mockCssSecondsPer100, mockRemainingDistance);
            });

            it('should call generateMainSetFromConfig with GENERAL_ENDURANCE config', () => {
                expect(generateMainSetFromConfigSpy.calledOnceWith(
                    mockEnergySystem,
                    mockCssSecondsPer100,
                    mockRemainingDistance,
                    ALL_WORKOUT_CONFIGS.GENERAL_ENDURANCE
                )).to.be.true;
            });

            it('should prepend an "Unknown workout type" message to descriptiveMessage if generator provides one', () => {
                 // Spy returns MOCK_GENERATOR_OUTPUT which has its own message.
                expect(result.descriptiveMessage).to.include(`Unknown workout type: ${unknownWorkoutType}`);
                expect(result.descriptiveMessage).to.include(MOCK_GENERATOR_OUTPUT.descriptiveMessage);
            });

            it('should set "Unknown workout type" message if generator provides no message', () => {
                generateMainSetFromConfigSpy.returns({...MOCK_GENERATOR_OUTPUT, descriptiveMessage: "" }); // No original message
                const localResult = generateMainSet(unknownWorkoutType, mockEnergySystem, mockCssSecondsPer100, mockRemainingDistance);
                expect(localResult.descriptiveMessage).to.equal(`Unknown workout type: ${unknownWorkoutType}. Defaulting to general endurance.`);
            });
        });

        describe('when calling with workoutType "GENERAL_ENDURANCE"', () => {
            const workoutType = 'GENERAL_ENDURANCE';
            beforeEach(() => {
                generateMainSet(workoutType, mockEnergySystem, mockCssSecondsPer100, mockRemainingDistance);
            });

            it('should call generateMainSetFromConfig with GENERAL_ENDURANCE config', () => {
                expect(generateMainSetFromConfigSpy.calledOnceWith(
                    mockEnergySystem,
                    mockCssSecondsPer100,
                    mockRemainingDistance,
                    ALL_WORKOUT_CONFIGS.GENERAL_ENDURANCE
                )).to.be.true;
            });
        });

        it('should return the expected structure', () => { // This test might be fine as is, but uses the spy's return now
            const workoutType = 'ENDURANCE_BASE';
            const result = generateMainSet(workoutType, mockEnergySystem, mockCssSecondsPer100, mockRemainingDistance);
            expect(result).to.have.all.keys('sets', 'mainSetTotalDist', 'targetPacePer100', 'descriptiveMessage');
            expect(result.sets).to.be.an('array');
            expect(result.mainSetTotalDist).to.be.a('number');
            expect(result.targetPacePer100).to.be.a('number');
            expect(result.descriptiveMessage).to.be.a('string');
        });

        describe('fallback logic', () => {
            it('should fallback to GENERAL_ENDURANCE if specific generator returns too small distance and not already GENERAL_ENDURANCE', () => {
                const workoutType = 'THRESHOLD_DEVELOPMENT'; // Not GENERAL_ENDURANCE
                const smallDistanceResponse = {
                    ...MOCK_GENERATOR_OUTPUT,
                    mainSetTotalDist: 50, // Small distance
                    descriptiveMessage: "TD small set"
                };
                const fallbackResponse = {
                    ...MOCK_GENERATOR_OUTPUT,
                    mainSetTotalDist: mockRemainingDistance, // Full distance for fallback
                    descriptiveMessage: "GE fallback set"
                };

                generateMainSetFromConfigSpy
                    .onFirstCall().returns(smallDistanceResponse)
                    .onSecondCall().returns(fallbackResponse);

                const result = generateMainSet(workoutType, mockEnergySystem, mockCssSecondsPer100, mockRemainingDistance);

                expect(generateMainSetFromConfigSpy.calledTwice).to.be.true;
                expect(generateMainSetFromConfigSpy.firstCall.calledWith(
                    mockEnergySystem, mockCssSecondsPer100, mockRemainingDistance, ALL_WORKOUT_CONFIGS.THRESHOLD_DEVELOPMENT
                )).to.be.true;
                expect(generateMainSetFromConfigSpy.secondCall.calledWith(
                    mockEnergySystem, mockCssSecondsPer100, mockRemainingDistance, ALL_WORKOUT_CONFIGS.GENERAL_ENDURANCE
                )).to.be.true;

                expect(result.mainSetTotalDist).to.equal(fallbackResponse.mainSetTotalDist);
                expect(result.descriptiveMessage).to.include("(Fallback to general endurance due to low generated distance for selected workout type).");
                expect(result.descriptiveMessage).to.include(smallDistanceResponse.descriptiveMessage);
                expect(result.descriptiveMessage).to.include(fallbackResponse.descriptiveMessage);
            });

            it('should NOT fallback to GENERAL_ENDURANCE if specific generator is already GENERAL_ENDURANCE and returns small distance', () => {
                const workoutType = 'GENERAL_ENDURANCE'; // Already GENERAL_ENDURANCE
                const smallDistanceResponse = {
                    ...MOCK_GENERATOR_OUTPUT,
                    mainSetTotalDist: 50, // Small distance
                    descriptiveMessage: "GE tiny set"
                };

                generateMainSetFromConfigSpy.returns(smallDistanceResponse); // Only one call expected

                const result = generateMainSet(workoutType, mockEnergySystem, mockCssSecondsPer100, mockRemainingDistance);

                expect(generateMainSetFromConfigSpy.calledOnce).to.be.true;
                expect(generateMainSetFromConfigSpy.calledWith(
                    mockEnergySystem, mockCssSecondsPer100, mockRemainingDistance, ALL_WORKOUT_CONFIGS.GENERAL_ENDURANCE
                )).to.be.true;
                expect(result.mainSetTotalDist).to.equal(smallDistanceResponse.mainSetTotalDist);
                expect(result.descriptiveMessage).to.equal(smallDistanceResponse.descriptiveMessage);
            });
        });
    });
});
