// V3_SCHEMA_UPDATE_MARKER_TESTS
import { expect } from 'chai';
import * as mainSetFunctions from '../lib/data/mainSets.js';
import { ALL_WORKOUT_CONFIGS } from '../lib/data/mainSetConfigs.js';
// Note: Dynamic import is used in some tests to modify config per-case.
// Ensure your test runner and environment support top-level await or handle promises appropriately.

describe('Refactored Main Set Functions', () => {

    describe('ENDURANCE_BASE (EN1)', () => {
        const config = ALL_WORKOUT_CONFIGS.ENDURANCE_BASE;
        const css = 90; // 1:30/100m

        it('should generate a basic EN1 set', () => {
            const remainingDistance = 2000;
            const result = mainSetFunctions.ENDURANCE_BASE('EN1', css, remainingDistance);
            expect(result.sets).to.be.an('array').with.lengthOf(1);
            expect(result.sets[0]).to.match(/4x500 EN1 focus swim\/kick r60"/); // No escaped slash needed in string
            expect(result.mainSetTotalDist).to.equal(2000);
            const paceLowerBound = css + config.paceConfig.offset;
            const paceUpperBound = css + config.paceConfig.offset + config.paceConfig.randomRange;
            expect(result.targetPacePer100).to.be.within(paceLowerBound, paceUpperBound);
            expect(result.descriptiveMessage).to.include('EN1: 4x500 (EN1)');
        });

        it('should prefer 500s then more reps for tie-breaking total yardage', () => {
            const remainingDistance = 3000;
            const result = mainSetFunctions.ENDURANCE_BASE('EN1', css, remainingDistance);
            expect(result.sets[0]).to.match(/6x500 EN1 focus swim\/kick r60"/); // No escaped slash
            expect(result.mainSetTotalDist).to.equal(3000);
        });

        it('should cap reps based on maxRepsPerDistance', () => {
            const remainingDistance = 7000;
            const result = mainSetFunctions.ENDURANCE_BASE('EN1', css, remainingDistance);
            expect(result.sets[0]).to.match(/12x500 EN1 focus swim\/kick r60"/); // No escaped slash
            expect(result.mainSetTotalDist).to.equal(6000);
        });

        it('should return "too short" if remaining < minTotalDistanceForSet', () => {
            const remainingDistance = 400;
            const result = mainSetFunctions.ENDURANCE_BASE('EN1', css, remainingDistance);
            expect(result.mainSetTotalDist).to.equal(0);
            expect(result.descriptiveMessage).to.equal(`EN1: Too short. Min rep distance 500, available: ${remainingDistance}.`);
        });
    });

    describe('GENERAL_ENDURANCE', () => {
        const css = 80;

        it('should prefer larger rep distance for same remainder', () => {
            const result = mainSetFunctions.GENERAL_ENDURANCE('General', css, 1000);
            expect(result.sets[0]).to.match(/2x500 swim \(General focus\) r45"/);
            expect(result.mainSetTotalDist).to.equal(1000);
        });

        it('should make up rep distance (1x50 for 75m remaining)', () => {
            const result = mainSetFunctions.GENERAL_ENDURANCE('General', css, 75);
            expect(result.sets[0]).to.match(/1x50 swim \(General focus\) r15"/);
            expect(result.mainSetTotalDist).to.equal(50);
        });

        it('should make up rep distance (1x25 for 30m remaining)', () => {
            const result = mainSetFunctions.GENERAL_ENDURANCE('General', css, 30);
            expect(result.sets[0]).to.match(/1x25 swim \(General focus\) r15"/);
            expect(result.mainSetTotalDist).to.equal(25);
        });

        it('should apply conservative adjustment (or not, if not applicable)', () => {
            // For 610m: 2x300 (rem 10) is chosen over 3x200 (rem 10) due to larger rep dist.
            // Conservative adj: 2x300. total=600. rem=610. 600 > 610*0.8 (488) TRUE.
            // repDist=300 >= 200 TRUE. numReps=2. Config minReps for adj is 3. So 2 < 3, adj NOT applied.
            // Expect 2x300 r45"
            const result = mainSetFunctions.GENERAL_ENDURANCE('General', css, 610);
            expect(result.sets[0]).to.match(/2x300 swim \(General focus\) r45"/);
            expect(result.mainSetTotalDist).to.equal(600);
        });

        it('should return "too short" if remaining < 25m', () => {
            const result = mainSetFunctions.GENERAL_ENDURANCE('General', css, 20);
            expect(result.mainSetTotalDist).to.equal(0);
            expect(result.descriptiveMessage).to.include("too short");
        });
    });

    describe('MAX_SPRINT (SP2)', () => {
        // const config = ALL_WORKOUT_CONFIGS.MAX_SPRINT; // Removed to address ESLint false positive
        const css = 75;

        const parseRestToSeconds = (restString) => {
            if (!restString) return 0;
            const match = restString.match(/r(?:(\d+)')?(?:(\d+)")?/);
            if (!match) return 0;
            const minutes = parseInt(match[1]) || 0;
            const seconds = parseInt(match[2]) || 0;
            return minutes * 60 + seconds;
        };

        it('should generate 50s when target set yardage allows', () => {
            const result = mainSetFunctions.MAX_SPRINT('SP2', css, 400);
            expect(result.mainSetTotalDist).to.equal(400);
            expect(result.sets[0]).to.include('8x50 UW sprint (SP2 focus, breath at wall)');
            const restInSeconds = parseRestToSeconds(result.sets[0].split(') ')[1]);
            expect(restInSeconds).to.be.within(180, 300);
        });

        it('should generate set based on min target yardage if remaining is low', () => {
            const result = mainSetFunctions.MAX_SPRINT('SP2', css, 50);
            expect(result.mainSetTotalDist).to.equal(300);
            expect(result.sets[0]).to.include('6x50');
            const restInSeconds = parseRestToSeconds(result.sets[0].split(') ')[1]);
            expect(restInSeconds).to.be.within(180, 300);
        });

        it('should generate 25s if target yardage is low and 50s are not preferred (with temp config)', async () => {
            const tempConfig = JSON.parse(JSON.stringify(ALL_WORKOUT_CONFIGS.MAX_SPRINT));
            tempConfig.strategyConfig.targetSetTotalYardageMin = 50;
            tempConfig.strategyConfig.targetSetTotalYardageMaxDefault = 100; // Target yardage will be 75
            // Re-attach the function pointer lost during JSON stringification
            tempConfig.restConfig.customFunction = ALL_WORKOUT_CONFIGS.MAX_SPRINT.restConfig.customFunction;

            const workoutGeneratorModule1 = await import('../lib/workoutGenerator.js'); // Renamed to avoid conflict
            const { generateMainSetFromConfig: generateWithTempConfig1 } = workoutGeneratorModule1; // Renamed
            const result = generateWithTempConfig1('SP2', css, 75, tempConfig);
            expect(result.mainSetTotalDist).to.equal(75); // 3x25
            expect(result.sets[0]).to.include('3x25');
            const restInSeconds = parseRestToSeconds(result.sets[0].split(') ')[1]);
            expect(restInSeconds).to.be.within(60, 180);
        });

        it('should return "too short" if remaining < 25', () => {
            const result = mainSetFunctions.MAX_SPRINT('SP2', css, 20);
            expect(result.mainSetTotalDist).to.equal(0);
            expect(result.descriptiveMessage).to.include("SP2: Too short. Min rep 25");
        });
    });

    describe('SPEED_ENDURANCE (SP1)', () => {
        const config = ALL_WORKOUT_CONFIGS.SPEED_ENDURANCE;
        const css = 85;

        const parseSp1RestToSeconds = (restString) => {
            if (!restString) return 0;
            const match = restString.match(/r(\d+)"/);
            return match ? parseInt(match[1]) : 0;
        };

        it('should generate multiple blocks for sufficient distance', () => {
            const sp1ConfigBeingUsed = ALL_WORKOUT_CONFIGS.SPEED_ENDURANCE;
            expect(sp1ConfigBeingUsed.restConfig.type, "Pre-test check: SP1 restConfig type should be customFunction").to.equal("customFunction");

            const result = mainSetFunctions.SPEED_ENDURANCE('SP1', css, 1000);
            expect(result.mainSetTotalDist).to.be.closeTo(1000, 200);
            expect(result.sets.length).to.be.greaterThanOrEqual(1);

            const setItems = result.sets.filter(s => !s.includes("rest between SP1 blocks"));
            const restItems = result.sets.filter(s => s.includes("rest between SP1 blocks"));

            expect(setItems.length).to.be.gte(1);
            if (setItems.length > 1) {
                expect(restItems.length).to.equal(setItems.length - 1);
            }

            setItems.forEach(setItem => {
                const parts = setItem.match(/(\d+)x(\d+)\s(\w+)\s\(SP1 focus\) (r\d+)/);
                expect(parts).to.be.ok;
                const dist = parseInt(parts[2]);
                const drill = parts[3];
                const rest = parts[4];
                expect(config.strategyConfig.repDistances).to.include(dist);
                expect(config.strategyConfig.drills).to.include(drill);

                const restSec = parseSp1RestToSeconds(rest);
                if (dist === 100) expect(restSec).to.be.oneOf([20, 25, 30]);
                else if (dist === 75) expect(restSec).to.be.oneOf([15, 20, 25]);
                else if (dist === 50) expect(restSec).to.be.oneOf([10, 15]);
                else if (dist === 25) expect(restSec).to.be.oneOf([5, 10]);
            });
        });

        it('should generate a single block if distance is small but sufficient', () => {
            const result = mainSetFunctions.SPEED_ENDURANCE('SP1', css, 400);
            expect(result.mainSetTotalDist).to.be.closeTo(400, 100);
            const setItems = result.sets.filter(s => !s.includes("rest between SP1 blocks"));
            expect(setItems.length).to.equal(1);
        });

        it('should return "too short" if remaining < 25', () => {
            const result = mainSetFunctions.SPEED_ENDURANCE('SP1', css, 20);
            expect(result.mainSetTotalDist).to.equal(0);
            expect(result.descriptiveMessage).to.include("SP1: Too short. Min rep 25");
        });
    });

    describe('THRESHOLD_DEVELOPMENT (EN3)', () => {
        const config = ALL_WORKOUT_CONFIGS.THRESHOLD_DEVELOPMENT;
        const css = 90;

        it('should pick an NxBaseDist pattern that maximizes distance', () => {
            const result = mainSetFunctions.THRESHOLD_DEVELOPMENT('EN3', css, 2000);
            expect(result.mainSetTotalDist).to.equal(2000);
            expect(result.sets[0]).to.match(/^(5x400 EN3 focus swim @ CSS r50"|4x500 EN3 focus swim @ CSS r60")/);
        });

        it('should use fallback if no primary pattern fits (with temp config)', async () => {
            const tempConfig = JSON.parse(JSON.stringify(config));
            // Make primary patterns not fit remainingDistance=550
            tempConfig.strategyConfig.patterns = [{ idFormat: 'Nx600', type: 'dynamicReps', baseDist: 600, rest: 'r90"', maxReps: 10, paceDesc: 'CSS' }];
            tempConfig.minTotalDistanceForSet = 400; // Ensure main function allows fallback check for this distance

            const workoutGeneratorModule2 = await import('../lib/workoutGenerator.js'); // Renamed
            const { generateMainSetFromConfig: generateWithTempConfig2 } = workoutGeneratorModule2; // Renamed
            // Remaining 550. Primary: 1x400=400. Fallback: 1x500 (CSS-1-2s r60) = 500. Fallback wins.
            const resultFallback = generateWithTempConfig2('EN3', css, 550, tempConfig);
            expect(resultFallback.sets[0]).to.match(/1x500 EN3 focus swim @ CSS -1-2s r60"/);
            expect(resultFallback.mainSetTotalDist).to.equal(500);
        });

        it('should return "too short" if remaining < 400', () => {
            const result = mainSetFunctions.THRESHOLD_DEVELOPMENT('EN3', css, 350);
            expect(result.mainSetTotalDist).to.equal(0);
            expect(result.descriptiveMessage).to.include("EN3: Too short for EN3 sets (min rep 400)");
        });
    });

    describe('THRESHOLD_SUSTAINED (EN2)', () => {
        const css = 88;

        it('should pick a pattern that meets required distance, random for ties (1800m)', () => {
            const result = mainSetFunctions.THRESHOLD_SUSTAINED('EN2', css, 1800);
            expect(result.mainSetTotalDist).to.equal(1800);
            // For 1800m, '18x100' (fixed) and '3x600' (dynamic) are valid and max distance.
            expect(result.sets[0]).to.match(/^(18x100 EN2 focus swim @ CSS r10"|3x600 EN2 focus swim @ CSS r60")/);
        });

        it('should pick dynamic NxPattern that maximizes distance, random for ties (2000m)', () => {
            const result = mainSetFunctions.THRESHOLD_SUSTAINED('EN2', css, 2000);
            expect(result.mainSetTotalDist).to.equal(2000);
            // For 2000m, 10x200, 5x400, 4x500, 2x1000 are all valid and max distance
            expect(result.sets[0]).to.match(/^(10x200 EN2 focus swim @ CSS r20"|5x400 EN2 focus swim @ CSS r40"|4x500 EN2 focus swim @ CSS r50"|2x1000 EN2 focus swim @ CSS r90")/);
        });

        it('should use fallback that maximizes yardage if no primary pattern fits', () => {
            // For remaining=300. Fallback options: 1x200 (200yd), 3x100 (300yd). Code picks 3x100.
            const result = mainSetFunctions.THRESHOLD_SUSTAINED('EN2', css, 300);
            expect(result.sets[0]).to.match(/3x100 EN2 focus swim @ CSS r10"/);
            expect(result.mainSetTotalDist).to.equal(300);

            // For remaining=150. Fallback options: 1x100 (100yd). Code picks 1x100.
            const result2 = mainSetFunctions.THRESHOLD_SUSTAINED('EN2', css, 150);
            expect(result2.sets[0]).to.match(/1x100 EN2 focus swim @ CSS r10"/);
            expect(result2.mainSetTotalDist).to.equal(100);
        });

        it('should return "too short" if remaining < 100', () => {
            const result = mainSetFunctions.THRESHOLD_SUSTAINED('EN2', css, 90);
            expect(result.mainSetTotalDist).to.equal(0);
            expect(result.descriptiveMessage).to.include("EN2: Too short for EN2 sets.");
        });
    });
});
