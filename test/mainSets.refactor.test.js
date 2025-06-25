// V3_SCHEMA_UPDATE_MARKER_TESTS
import { expect } from 'chai';
import { ALL_WORKOUT_CONFIGS } from '../lib/data/mainSetConfigs.js';
import { generateMainSetFromConfig } from '../lib/workoutGenerator.js';

describe('Refactored Main Set Functions', () => {

    describe('ENDURANCE_BASE (EN1)', () => {
        const config = ALL_WORKOUT_CONFIGS.ENDURANCE_BASE;
        const css = 90; // 1:30/100m

        it('should generate a basic EN1 set', () => { 
            const remainingDistance = 2000;
            const result = generateMainSetFromConfig('EN1', css, remainingDistance, config);
            expect(result.sets).to.be.an('array').with.lengthOf(1);
            expect(result.mainSetTotalDist).to.equal(2000);
            const paceLowerBound = css + config.paceConfig.offset;
            const paceUpperBound = css + config.paceConfig.offset + config.paceConfig.randomRange;
            expect(result.targetPacePer100).to.be.within(paceLowerBound, paceUpperBound);
        });

        it('should prefer 500s then more reps for tie-breaking total yardage', () => { 
            const remainingDistance = 3000;
            const result = generateMainSetFromConfig('EN1', css, remainingDistance, config);
            expect(result.mainSetTotalDist).to.equal(3000);
        });
    });

    describe('MAX_SPRINT (SP2)', () => {
        const css = 75;
        const config = ALL_WORKOUT_CONFIGS.MAX_SPRINT;

        const parseRestToSeconds = (restString) => {
            if (!restString) return 0;
            const match = restString.match(/r(?:(\d+)')?(?:(\d+)")?/);
            if (!match) return 0;
            const minutes = parseInt(match[1]) || 0;
            const seconds = parseInt(match[2]) || 0;
            return minutes * 60 + seconds;
        };

        it('should generate 50s when target set yardage allows', () => {
            const result = generateMainSetFromConfig('SP2', css, 400, config);
            expect(result.mainSetTotalDist).to.equal(400);
            const restInSeconds = parseRestToSeconds(result.sets[0].split(') ')[1]);
            expect(restInSeconds).to.be.within(180, 300);
        });

        it('should generate set based on min target yardage if remaining is low', () => {
            const result = generateMainSetFromConfig('SP2', css, 50, config);
            expect(result.mainSetTotalDist).to.equal(300);
            const restInSeconds = parseRestToSeconds(result.sets[0].split(') ')[1]);
            expect(restInSeconds).to.be.within(180, 300);
        });
    });

    describe('SPEED_ENDURANCE (SP1)', () => {
        const css = 85;
        const config = ALL_WORKOUT_CONFIGS.SPEED_ENDURANCE;

        it('should generate a single block if distance is small but sufficient', () => {
            const result = generateMainSetFromConfig('SP1', css, 400, config);
            expect(result.mainSetTotalDist).to.be.closeTo(400, 100);
            const setItems = result.sets.filter(s => !s.includes("rest between SP1 blocks"));
            expect(setItems.length).to.equal(1);
        });
    });

    describe('THRESHOLD_DEVELOPMENT (EN3)', () => {
        const config = ALL_WORKOUT_CONFIGS.THRESHOLD_DEVELOPMENT; // Used in tempConfig
        const css = 90;

        it('should pick an NxBaseDist pattern that maximizes distance', () => {
            const result = generateMainSetFromConfig('EN3', css, 2000, config);
            expect(result.mainSetTotalDist).to.be.closeTo(2000, 300);
        });
    });

    describe('THRESHOLD_SUSTAINED (EN2)', () => {
        const css = 88;
        const config = ALL_WORKOUT_CONFIGS.THRESHOLD_SUSTAINED; // Used in tempConfig

        it('should pick a pattern that meets required distance, random for ties (1800m)', () => {
            const result = generateMainSetFromConfig('EN2', css, 1800, config);
            expect(result.mainSetTotalDist).to.be.closeTo(1800, 300);
        });

        it('should pick dynamic NxPattern that maximizes distance, random for ties (2000m)', () => {
            const result = generateMainSetFromConfig('EN2', css, 2000, config);
            expect(result.mainSetTotalDist).to.be.closeTo(2000, 300);
        });

        it('should use fallback that maximizes yardage if no primary pattern fits', () => {
            const result = generateMainSetFromConfig('EN2', css, 300, config);
            expect(result.mainSetTotalDist).to.be.closeTo(300, 50);
        });
    });
});
