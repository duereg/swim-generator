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
        it('should return cssSecondsPer100 if no paceConfig is provided', () => {
            expect(wg.calculateTargetPace(90, null)).to.equal(90);
            expect(wg.calculateTargetPace(90, undefined)).to.equal(90);
        });

        it('should return cssSecondsPer100 if paceConfig is invalid or css is not a number', () => {
            expect(wg.calculateTargetPace("invalid", MOCK_PACE_CONFIG_PLUS)).to.equal("invalid");
            expect(wg.calculateTargetPace(90, {})).to.equal(90);
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

        it('should return a default message if template is null or undefined', () => {
            expect(wg.formatDescriptiveMessage(null, {})).to.equal("No descriptive message template provided.");
            expect(wg.formatDescriptiveMessage(undefined, {})).to.equal("No descriptive message template provided.");
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
        it('should return "CSS" if no paceConfig or empty paceConfig', () => {
            expect(wg.generatePaceSummary(null)).to.equal("CSS");
            expect(wg.generatePaceSummary({})).to.equal("CSS");
            expect(wg.generatePaceSummary({ paceConfig: {} })).to.equal("CSS");
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
        let shuffleStub;

        beforeEach(() => {
            shuffleStub = sinon.stub(_, 'shuffle').callsFake(array => [...array]);
        });

        afterEach(() => {
            shuffleStub.restore();
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

        it('should return empty if no suitable sets found', () => {
            const result = wg.generateSet(mockStrategyConfig, 25);
            expect(result.totalDistance).to.equal(0);
            expect(result.generatedSets.length).to.equal(0);
            expect(result.strategySpecificSummary).to.equal("No suitable reps found.");
        });
         it('should generate multiple types of sets if needed to meet distance', () => {
            const result = wg.generateSet(mockStrategyConfig, 350);
            expect(result.totalDistance).to.equal(350);
            expect(result.generatedSets.length).to.equal(2);
            expect(result.generatedSets[0].dist).to.equal(100);
            expect(result.generatedSets[0].reps).to.equal(3);
            expect(result.generatedSets[1].dist).to.equal(50);
            expect(result.generatedSets[1].reps).to.equal(1);
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
        let generateSetStub;

        beforeEach(() => {
            generateSetStub = sinon.stub(wg, 'generateSet').returns({ // Stubbing wg.generateSet
                generatedSets: [{ reps: 2, dist: 100, restString: "r10\"", activity: "swim", setRest: "rest 30 seconds" }],
                totalDistance: 200,
                strategySpecificSummary: "2x100"
            });
        });

        afterEach(() => {
            generateSetStub.restore(); // wg.generateSet is already restored by global afterEach if needed
        });

        it('should return a correctly structured main set when generation is successful', () => {
            const result = wg.generateMainSetFromConfig("EN1", 90, 500, MOCK_STRATEGY_CONFIG);
            expect(result).to.have.all.keys('sets', 'mainSetTotalDist', 'targetPacePer100', 'descriptiveMessage');
            expect(result.mainSetTotalDist).to.equal(200);
            expect(result.sets).to.be.an('array').with.lengthOf(1);
            expect(result.sets[0]).to.include("2x100 swim");
            expect(result.descriptiveMessage).to.match(/^Success: TestType - 2x100 \(EN1\) 200yds @ CSS \+5-7s\/100m/);
            randomStub.returns(0);
            const expectedPace = wg.calculateTargetPace(90, MOCK_STRATEGY_CONFIG.paceConfig);
            expect(result.targetPacePer100).to.equal(expectedPace);
        });

        it('should handle generation failure from generateSet', () => {
            generateSetStub.returns({ generatedSets: [], totalDistance: 0, strategySpecificSummary: "Failed." });
            const result = wg.generateMainSetFromConfig("EN1", 90, 50, MOCK_STRATEGY_CONFIG);
            expect(result.mainSetTotalDist).to.equal(0);
            expect(result.sets.length).to.equal(0);
            expect(result.descriptiveMessage).to.match(/^Fail: TestType \(EN1\) 50yds/);
        });

        it('should return an error message if strategyConfig is not provided', () => {
            const result = wg.generateMainSetFromConfig("EN1", 90, 500, null);
            expect(result.descriptiveMessage).to.equal("Error: Workout configuration not provided.");
            expect(result.mainSetTotalDist).to.equal(0);
            expect(result.sets.length).to.equal(0);
        });
    });
});
