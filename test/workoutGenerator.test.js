import { expect } from 'chai';
import sinon from 'sinon';
import _ from 'lodash';

// Import the entire module as wg (workoutGenerator)
import * as wg from '../lib/workoutGenerator.js';

// Mock data that might be needed for strategyConfig etc.
const MOCK_PACE_CONFIG_PLUS = { operator: "+", offset: 5, randomRange: 2 };
const MOCK_PACE_CONFIG_MINUS = { operator: "-", offset: 3, randomRange: 0 };
// const MOCK_PACE_CONFIG_ZERO = { operator: "+", offset: 0, randomRange: 0 }; // Not used currently

const MOCK_SET_FORMATTING = {
    baseStructure: "{reps}x{dist} {activity} @{paceDesc} ({energySystem} focus) {rest} {notes}",
    defaultActivity: "swim"
};

describe('lib/workoutGenerator.js', () => {
    let randomStub;

    beforeEach(() => {
        randomStub = sinon.stub(Math, 'random');
    });

    afterEach(() => {
        randomStub.restore();
        // Ensure any stubs on wg module are restored if created within tests
        if (wg.generateSet && wg.generateSet.restore) {
            wg.generateSet.restore();
        }
    });

    describe('calculateTargetPace', () => {
        describe('when no paceConfig is provided', () => {
            it('should return cssSecondsPer100 for null paceConfig', () => {
                expect(wg.calculateTargetPace(90, null)).to.equal(90);
            });
            it('should return cssSecondsPer100 for undefined paceConfig', () => {
                expect(wg.calculateTargetPace(90, undefined)).to.equal(90);
            });
        });

        describe('when paceConfig is invalid or css is not a number', () => {
            it('should return original css if css is not a number', () => {
                expect(wg.calculateTargetPace("invalid", MOCK_PACE_CONFIG_PLUS)).to.equal("invalid");
            });
            it('should return cssSecondsPer100 for empty paceConfig object', () => {
                expect(wg.calculateTargetPace(90, {})).to.equal(90);
            });
        });

        it('should apply positive offset correctly', () => {
            randomStub.returns(0);
            expect(wg.calculateTargetPace(90, { operator: "+", offset: 5, randomRange: 0 })).to.equal(95);
        });

        it('should apply negative offset correctly', () => {
            randomStub.returns(0);
            expect(wg.calculateTargetPace(90, { operator: "-", offset: 5, randomRange: 0 })).to.equal(85);
        });

        it('should apply positive offset and randomRange correctly (min random)', () => {
            randomStub.returns(0);
            expect(wg.calculateTargetPace(90, MOCK_PACE_CONFIG_PLUS)).to.equal(90 + 5 + 0); // 95
        });

        it('should apply positive offset and randomRange correctly (max random)', () => {
            randomStub.returns(0.99999);
            expect(wg.calculateTargetPace(90, MOCK_PACE_CONFIG_PLUS)).to.be.closeTo(97, 0.01);
        });

        it('should apply negative offset and randomRange correctly (min random)', () => {
            randomStub.returns(0);
            expect(wg.calculateTargetPace(90, MOCK_PACE_CONFIG_MINUS)).to.equal(90 - 3 - 0); // 87
        });
    });

    describe('formatDescriptiveMessage', () => {
        it('should format a message with given parameters', () => {
            const template = "Workout: {workoutTypeName}, Distance: {totalDistance}m, Pace: {paceDescription}.";
            const params = { workoutTypeName: "Sprint", totalDistance: "500", paceDescription: "Fast" };
            expect(wg.formatDescriptiveMessage(template, params)).to.equal("Workout: Sprint, Distance: 500m, Pace: Fast.");
        });

        it('should ignore extra parameters not in the template', () => {
            const template = "Type: {type}";
            const params = { type: "EN1", extra: "ignored" };
            expect(wg.formatDescriptiveMessage(template, params)).to.equal("Type: EN1");
        });

        it('should remove placeholders if corresponding params are missing', () => {
            const template = "Type: {type}, Detail: {detail}";
            const params = { type: "EN2" };
            expect(wg.formatDescriptiveMessage(template, params)).to.equal("Type: EN2, Detail:");
        });

        describe('when template is null or undefined', () => {
            it('should return a default message for null template', () => {
                expect(wg.formatDescriptiveMessage(null, {})).to.equal("No descriptive message template provided.");
            });
            it('should return a default message for undefined template', () => {
                expect(wg.formatDescriptiveMessage(undefined, {})).to.equal("No descriptive message template provided.");
            });
        });
    });

    describe('formatSetString', () => {
        const energySystem = 'EN2';
        const formatConfig = {
            baseStructure: "{reps}x{dist} {activity} ({energySystem}) {rest} {notes}",
            defaultActivity: "swim"
        };

        it('should format a basic set string', () => {
            const setInfo = { reps: 4, dist: 100, activity: "pull", restString: "r30\"", setRest: "rest 10 seconds", notes: "easy" };
            expect(wg.formatSetString(setInfo, energySystem, formatConfig))
                .to.equal("4x100 pull (EN2) r30\" easy\n  - rest 10 seconds");
        });

        it('should use defaultActivity if not provided in setInfo', () => {
            const setInfo = { reps: 2, dist: 200, restString: "r1'", setRest: "rest 15 seconds" };
            expect(wg.formatSetString(setInfo, energySystem, formatConfig))
                .to.equal("2x200 swim (EN2) r1'\n  - rest 15 seconds");
        });

        it('should not append setRest if it is "rest 0 seconds"', () => {
            const setInfo = { reps: 1, dist: 500, activity: "kick", restString: "r0\"", setRest: "rest 0 seconds" };
            expect(wg.formatSetString(setInfo, energySystem, formatConfig))
                .to.equal("1x500 kick (EN2) r0\"");
        });
         it('should handle empty optional fields gracefully', () => {
            const setInfo = { reps: 1, dist: 50, setRest: "rest 5 seconds" };
            const expected = "1x50 swim (EN2)\n  - rest 5 seconds";
            expect(wg.formatSetString(setInfo, energySystem, formatConfig)).to.equal(expected);
        });
    });

    describe('generatePaceSummary', () => {
        describe('when paceConfig is absent or empty', () => {
            it('should return "CSS" if strategyConfig is null', () => {
                expect(wg.generatePaceSummary(null)).to.equal("CSS");
            });
            it('should return "CSS" if strategyConfig is an empty object', () => {
                expect(wg.generatePaceSummary({})).to.equal("CSS");
            });
            it('should return "CSS" if strategyConfig.paceConfig is an empty object', () => {
                expect(wg.generatePaceSummary({ paceConfig: {} })).to.equal("CSS");
            });
        });

        it('should return "CSS" if offset is 0 and no randomRange', () => {
            expect(wg.generatePaceSummary({ paceConfig: { offset: 0 } })).to.equal("CSS");
        });

        it('should format correctly for positive offset', () => {
            expect(wg.generatePaceSummary({ paceConfig: { operator: "+", offset: 5 } })).to.equal("CSS +5s/100m");
        });

        it('should format correctly for negative offset', () => {
            expect(wg.generatePaceSummary({ paceConfig: { operator: "-", offset: 3 } })).to.equal("CSS -3s/100m");
        });

        it('should format correctly for positive offset and positive randomRange', () => {
            expect(wg.generatePaceSummary({ paceConfig: { operator: "+", offset: 5, randomRange: 2 } }))
                .to.equal("CSS +5-7s/100m");
        });

        it('should format correctly for negative offset and positive randomRange', () => {
            expect(wg.generatePaceSummary({ paceConfig: { operator: "-", offset: 3, randomRange: 2 } }))
                .to.equal("CSS -3-5s/100m");
        });
         it('should format correctly for zero offset and positive randomRange', () => {
            expect(wg.generatePaceSummary({ paceConfig: { operator: "+", offset: 0, randomRange: 3 } }))
                .to.equal("CSS +0-3s/100m");
        });
    });

    describe('generateSet', () => {
        const mockStrategyConfig = {
            setDefinitions: [
                { distance: 100, rest: "15\"", repScheme: { type: "dynamic", maxReps: 10 } },
                { distance: 200, rest: "30\"", repScheme: { type: "dynamic", maxReps: 5 } },
                { distance: 50, rest: "10\"", repScheme: { type: "dynamic", maxReps: 10 } }
            ],
            setRest: "60",
            setFormatting: MOCK_SET_FORMATTING
        };
        let shuffleStub; // Declare shuffleStub in the describe scope

        beforeEach(() => {
            shuffleStub = sinon.stub(_, 'shuffle').callsFake(array => [...array]); // Assign here
        });

        afterEach(() => {
            if (shuffleStub) shuffleStub.restore(); // Restore here
        });

        it('should generate sets to meet setDistance using dynamic reps', () => {
            const result = wg.generateSet(mockStrategyConfig, 500);
            expect(result.totalDistance).to.equal(500);
            expect(result.generatedSets.length).to.be.greaterThan(0);
            if (result.totalDistance === 500 && result.generatedSets[0].dist === 100) {
                 expect(result.generatedSets[0].reps).to.equal(5);
            }
        });

        it('should respect maxReps', () => {
            const result = wg.generateSet(mockStrategyConfig, 1200);
            expect(result.totalDistance).to.equal(1200);
            const repsFor100 = result.generatedSets.find(s => s.dist === 100)?.reps;
            if (repsFor100) expect(repsFor100).to.be.at.most(10);
        });

        describe('when no suitable sets are found (e.g., distance too small)', () => {
            let result;
            beforeEach(() => {
                result = wg.generateSet(mockStrategyConfig, 25);
            });

            it('should return totalDistance of 0', () => {
                expect(result.totalDistance).to.equal(0);
            });
            it('should return an empty generatedSets array', () => {
                expect(result.generatedSets.length).to.equal(0);
            });
            it('should return "No suitable reps found." in strategySpecificSummary', () => {
                expect(result.strategySpecificSummary).to.equal("No suitable reps found.");
            });
        });

        describe('when multiple types of sets are needed to meet distance (350m)', () => {
            let result;
            beforeEach(() => {
                 // With no shuffle (order: 100, 200, 50):
                 // 3x100 (300yd), remaining 50. Then 1x50. Total 350.
                result = wg.generateSet(mockStrategyConfig, 350);
            });

            it('should generate a totalDistance of 350', () => {
                expect(result.totalDistance).to.equal(350);
            });
            it('should generate 2 set items', () => {
                expect(result.generatedSets.length).to.equal(2);
            });
            it('should have the first set as 3x100', () => {
                expect(result.generatedSets[0].dist).to.equal(100);
                expect(result.generatedSets[0].reps).to.equal(3);
            });
            it('should have the second set as 1x50', () => {
                expect(result.generatedSets[1].dist).to.equal(50);
                expect(result.generatedSets[1].reps).to.equal(1);
            });
        });
    });

    describe('generateMainSetFromConfig', () => {
        const MOCK_STRATEGY_CONFIG = {
            workoutTypeName: "TestType",
            paceConfig: MOCK_PACE_CONFIG_PLUS,
            setDefinitions: [{ distance: 100, rest: "10s", repScheme: { type: "dynamic", maxReps: 5 } }],
            setRest: "30",
            setFormatting: MOCK_SET_FORMATTING,
            descriptiveMessages: {
                success: "Success: {workoutTypeName} - {setSummary} ({energySystem}) {totalDistance}yds @ {paceDescription}",
                fail: "Fail: {workoutTypeName} ({energySystem}) {totalDistance}yds"
            }
        };
        // No longer stubbing wg.generateSet here. It will run its actual implementation.
        // The tests for wg.generateSet itself cover its detailed logic.
        // Here, we test wg.generateMainSetFromConfig's orchestration.

        // To make tests deterministic for generateMainSetFromConfig when the actual generateSet is called,
        // ensure the MOCK_STRATEGY_CONFIG.setDefinitions and input distances are simple and predictable.
        const SIMPLE_SUCCESS_CONFIG = {
            ...MOCK_STRATEGY_CONFIG,
            setDefinitions: [{ distance: 100, rest: "10s", repScheme: { type: "dynamic", maxReps: 3 } }],
            descriptiveMessages: { // Ensure templates are simple for matching
                success: "OK: {totalDistance}yds {setSummary}",
                fail: "FAIL: {totalDistance}yds target"
            }
        };
         const SIMPLE_FAIL_CONFIG = { // Config that will likely lead to failure for small distances
            ...MOCK_STRATEGY_CONFIG,
            setDefinitions: [{ distance: 1000, rest: "10s", repScheme: { type: "dynamic", maxReps: 1 } }],
             descriptiveMessages: {
                success: "OK: {totalDistance}yds {setSummary}",
                fail: "FAIL: {totalDistance}yds target"
            }
        };


        describe('when generation is successful with actual generateSet call', () => {
            let result;
            let expectedPace;
            const distanceForSuccess = 200; // Should generate 2x100

            beforeEach(() => {
                // _.shuffle is NOT stubbed here anymore.
                // SIMPLE_SUCCESS_CONFIG uses a single setDefinition, so shuffle order is irrelevant.
                // Math.random is stubbed globally for the file.
                randomStub.returns(0); // Set this *before* calling the function that uses Math.random internally
                result = wg.generateMainSetFromConfig("EN1", 90, distanceForSuccess, SIMPLE_SUCCESS_CONFIG);
                expectedPace = wg.calculateTargetPace(90, SIMPLE_SUCCESS_CONFIG.paceConfig); // This call will also use randomStub.returns(0)
            });

            // No afterEach needed here for _.shuffle

            it('should return an object with the correct keys', () => {
                expect(result).to.have.all.keys('sets', 'mainSetTotalDist', 'targetPacePer100', 'descriptiveMessage');
            });
            it('should set mainSetTotalDist correctly based on actual generateSet', () => {
                expect(result.mainSetTotalDist).to.equal(200); // 2x100
            });
            it('should return generated sets as an array of length 1', () => {
                expect(result.sets).to.be.an('array').with.lengthOf(1);
            });
            it('should format the set string correctly', () => {
                expect(result.sets[0]).to.include("2x100"); // Actual formatSetString will be used
            });
            it('should generate a success descriptiveMessage', () => {
                // Based on SIMPLE_SUCCESS_CONFIG.descriptiveMessages.success
                expect(result.descriptiveMessage).to.equal("OK: 200yds 2x100");
            });
            it('should calculate targetPacePer100 correctly', () => {
                expect(result.targetPacePer100).to.equal(expectedPace);
            });
        });

        describe('when actual generateSet returns no sets (generation failure)', () => {
            let result;
            const distanceForFailure = 50; // Too small for setDefinitions in SIMPLE_FAIL_CONFIG (min 1000)

            beforeEach(() => {
                // _.shuffle is NOT stubbed here.
                // SIMPLE_FAIL_CONFIG uses a single setDefinition, shuffle order is irrelevant.
                result = wg.generateMainSetFromConfig("EN1", 90, distanceForFailure, SIMPLE_FAIL_CONFIG);
            });

            // No afterEach needed here for _.shuffle

            it('should set mainSetTotalDist to 0', () => {
                expect(result.mainSetTotalDist).to.equal(0);
            });
            it('should return an empty sets array', () => {
                expect(result.sets.length).to.equal(0);
            });
            it('should generate a failure descriptiveMessage', () => {
                // Based on SIMPLE_FAIL_CONFIG.descriptiveMessages.fail
                expect(result.descriptiveMessage).to.equal(`FAIL: ${distanceForFailure}yds target`);
            });
        });

        describe('when strategyConfig is not provided', () => {
            let result;
            beforeEach(() => {
                result = wg.generateMainSetFromConfig("EN1", 90, 500, null);
            });

            it('should return an error descriptiveMessage', () => {
                expect(result.descriptiveMessage).to.equal("Error: Workout configuration not provided.");
            });
            it('should set mainSetTotalDist to 0', () => {
                expect(result.mainSetTotalDist).to.equal(0);
            });
            it('should return an empty sets array', () => {
                expect(result.sets.length).to.equal(0);
            });
        });
    });
});
