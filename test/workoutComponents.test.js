import { expect } from 'chai';
import sinon from 'sinon';
import wc from '../lib/workoutComponents.js';
const { selectWarmup, selectCooldown, generateMainSet } = wc;


describe('Workout Components', () => {
    let randomStub;

    beforeEach(() => {
        randomStub = sinon.stub(Math, 'random');
    });

    afterEach(() => {
        randomStub.restore();
    });

    describe('selectWarmup', () => {
        const mockAvailableWarmups = [
            { desc: "Warmup 1", dist: 400, type: "swim" },
            { desc: "Warmup 2", dist: 300, type: "kick" },
        ];
        const mockNoWarmupOption = { desc: "No Warmup", dist: 0, type: "none" };

        it('should select a warmup from availableWarmups if Math.random > 0.1', () => {
            randomStub.returns(0.5);
            const warmup = selectWarmup(mockAvailableWarmups, mockNoWarmupOption);
            expect(mockAvailableWarmups).to.include(warmup);
            expect(warmup).to.have.all.keys('desc', 'dist', 'type');
        });

        it('should select a specific warmup from availableWarmups based on Math.random', () => {
            randomStub.returns(0.5);
            const warmup = selectWarmup(mockAvailableWarmups, mockNoWarmupOption);
            expect(warmup).to.deep.equal(mockAvailableWarmups[1]);
        });

        it('should select noWarmupOption if Math.random <= 0.1', () => {
            randomStub.returns(0.05);
            const warmup = selectWarmup(mockAvailableWarmups, mockNoWarmupOption);
            expect(warmup).to.deep.equal(mockNoWarmupOption);
            expect(warmup).to.have.all.keys('desc', 'dist', 'type');
        });

        it('should return noWarmupOption if availableWarmups is empty and Math.random > 0.1', () => {
            randomStub.returns(0.5);
            const warmup = selectWarmup([], mockNoWarmupOption);
            expect(warmup).to.deep.equal(mockNoWarmupOption);
        });

        it('should return noWarmupOption if availableWarmups is null and Math.random > 0.1', () => {
            randomStub.returns(0.5);
            const warmup = selectWarmup(null, mockNoWarmupOption);
            expect(warmup).to.deep.equal(mockNoWarmupOption);
        });
    });

    describe('selectCooldown', () => {
        const mockAvailableCooldowns = [
            { desc: "Cooldown 1", dist: 200, type: "swim" },
            { desc: "Cooldown 2", dist: 150, type: "pull" },
            { desc: "Cooldown 3", dist: 100, type: "fins" },
        ];

        it('should select a cooldown from availableCooldowns', () => {
            randomStub.returns(0.5);
            const cooldown = selectCooldown(mockAvailableCooldowns);
            expect(cooldown).to.deep.equal(mockAvailableCooldowns[1]);
            expect(cooldown).to.have.all.keys('desc', 'dist', 'type');
        });

        it('should return null if availableCooldowns is empty', () => {
            const cooldown = selectCooldown([]);
            expect(cooldown).to.be.null;
        });

        it('should return null if availableCooldowns is null', () => {
            const cooldown = selectCooldown(null);
            expect(cooldown).to.be.null;
        });
    });

    describe('generateMainSet', () => {
        const mockCssSecondsPer100 = 90;
        const mockRemainingDistance = 2000;
        const mockEnergySystem = 'EN1'; // Pass this through

        // Mock definitions keyed by workoutType
        const mockMainSetDefinitions = {
            'ENDURANCE_BASE': sinon.spy((energySystem, css, dist) => ({
                sets: [`ENDURANCE_BASE (${energySystem}) set: ${dist}m @ ${css}s/100`],
                mainSetTotalDist: dist,
                targetPacePer100: css + 5,
                descriptiveMessage: `Mocked ENDURANCE_BASE for ${energySystem}`
            })),
            'SPEED_ENDURANCE': sinon.spy((energySystem, css, dist) => ({
                sets: [`SPEED_ENDURANCE (${energySystem}) set: ${dist}m @ ${css}s/100`],
                mainSetTotalDist: dist,
                targetPacePer100: css - 10,
                descriptiveMessage: `Mocked SPEED_ENDURANCE for ${energySystem}`
            })),
            'GENERAL_ENDURANCE': sinon.spy((energySystem, css, dist) => ({
                sets: [`GENERAL_ENDURANCE (${energySystem}) default set: ${dist}m @ ${css}s/100`],
                mainSetTotalDist: dist,
                targetPacePer100: css,
                descriptiveMessage: `Mocked GENERAL_ENDURANCE for ${energySystem}`
            })),
        };

        const mockMainSetDefinitionsForFallback = {
            'THRESHOLD_DEVELOPMENT': sinon.spy((energySystem, css, dist) => ({
                sets: [`THRESHOLD_DEVELOPMENT tiny set (${energySystem})`],
                mainSetTotalDist: 50, // very small distance to trigger fallback
                targetPacePer100: css,
                descriptiveMessage: `Mocked THRESHOLD_DEVELOPMENT for ${energySystem}`
            })),
            'GENERAL_ENDURANCE': sinon.spy((energySystem, css, dist) => ({
                sets: [`GENERAL_ENDURANCE fallback set (${energySystem}): ${dist}m @ ${css}s/100`],
                mainSetTotalDist: dist,
                targetPacePer100: css,
                descriptiveMessage: `Mocked GENERAL_ENDURANCE fallback for ${energySystem}`
            })),
        };

        beforeEach(() => {
            mockMainSetDefinitions.ENDURANCE_BASE.resetHistory();
            mockMainSetDefinitions.SPEED_ENDURANCE.resetHistory();
            mockMainSetDefinitions.GENERAL_ENDURANCE.resetHistory();
            mockMainSetDefinitionsForFallback.THRESHOLD_DEVELOPMENT.resetHistory();
            mockMainSetDefinitionsForFallback.GENERAL_ENDURANCE.resetHistory();
        });

        it('should call the correct generator for a known workoutType (ENDURANCE_BASE)', () => {
            const workoutType = 'ENDURANCE_BASE';
            const result = generateMainSet(workoutType, mockEnergySystem, mockCssSecondsPer100, mockRemainingDistance, mockMainSetDefinitions);

            expect(mockMainSetDefinitions.ENDURANCE_BASE.calledOnce).to.be.true;
            expect(mockMainSetDefinitions.ENDURANCE_BASE.calledWith(mockEnergySystem, mockCssSecondsPer100, mockRemainingDistance)).to.be.true;
            expect(mockMainSetDefinitions.GENERAL_ENDURANCE.called).to.be.false;

            expect(result.sets).to.deep.equal([`ENDURANCE_BASE (${mockEnergySystem}) set: ${mockRemainingDistance}m @ ${mockCssSecondsPer100}s/100`]);
            expect(result.mainSetTotalDist).to.equal(mockRemainingDistance);
            expect(result.targetPacePer100).to.equal(mockCssSecondsPer100 + 5);
            expect(result.descriptiveMessage).to.equal(`Mocked ENDURANCE_BASE for ${mockEnergySystem}`);
        });

        it('should call the correct generator for a known workoutType (SPEED_ENDURANCE)', () => {
            const workoutType = 'SPEED_ENDURANCE';
            const specificEnergySystem = 'SP1'; // Example
            generateMainSet(workoutType, specificEnergySystem, mockCssSecondsPer100, mockRemainingDistance, mockMainSetDefinitions);
            expect(mockMainSetDefinitions.SPEED_ENDURANCE.calledOnceWith(specificEnergySystem, mockCssSecondsPer100, mockRemainingDistance)).to.be.true;
        });

        it('should call the GENERAL_ENDURANCE generator for an unknown workoutType', () => {
            const unknownWorkoutType = 'UNKNOWN_TYPE';
            const result = generateMainSet(unknownWorkoutType, mockEnergySystem, mockCssSecondsPer100, mockRemainingDistance, mockMainSetDefinitions);

            expect(mockMainSetDefinitions.GENERAL_ENDURANCE.calledOnce).to.be.true;
            expect(mockMainSetDefinitions.GENERAL_ENDURANCE.calledWith(mockEnergySystem, mockCssSecondsPer100, mockRemainingDistance)).to.be.true;
            expect(mockMainSetDefinitions.ENDURANCE_BASE.called).to.be.false;

            expect(result.sets).to.deep.equal([`GENERAL_ENDURANCE (${mockEnergySystem}) default set: ${mockRemainingDistance}m @ ${mockCssSecondsPer100}s/100`]);
            // Check message construction for unknown type
            expect(result.descriptiveMessage).to.include(`Unknown workout type: ${unknownWorkoutType}`);
            expect(result.descriptiveMessage).to.include(`Original generator message: Mocked GENERAL_ENDURANCE for ${mockEnergySystem}`);

        });

        it('should call the GENERAL_ENDURANCE generator if workoutType is literally "GENERAL_ENDURANCE"', () => {
            const workoutType = 'GENERAL_ENDURANCE';
            const result = generateMainSet(workoutType, mockEnergySystem, mockCssSecondsPer100, mockRemainingDistance, mockMainSetDefinitions);
            expect(mockMainSetDefinitions.GENERAL_ENDURANCE.calledOnceWith(mockEnergySystem, mockCssSecondsPer100, mockRemainingDistance)).to.be.true;
            expect(result.descriptiveMessage).to.equal(`Mocked GENERAL_ENDURANCE for ${mockEnergySystem}`);
        });

        it('should return the expected structure', () => {
            const workoutType = 'ENDURANCE_BASE';
            const result = generateMainSet(workoutType, mockEnergySystem, mockCssSecondsPer100, mockRemainingDistance, mockMainSetDefinitions);
            expect(result).to.have.all.keys('sets', 'mainSetTotalDist', 'targetPacePer100', 'descriptiveMessage');
            expect(result.sets).to.be.an('array');
            expect(result.mainSetTotalDist).to.be.a('number');
            expect(result.targetPacePer100).to.be.a('number');
            expect(result.descriptiveMessage).to.be.a('string');
        });

        it('should fallback to GENERAL_ENDURANCE if specific generator returns too small distance and not already GENERAL_ENDURANCE', () => {
            const workoutType = 'THRESHOLD_DEVELOPMENT';
            let tdCalled = false;
            let geCalled = false;

            // Define expected responses locally without relying on spies from mockMainSetDefinitionsForFallback
            const localTdResponse = (es) => ({
                sets: [`THRESHOLD_DEVELOPMENT tiny set (${es})`],
                mainSetTotalDist: 50,
                targetPacePer100: mockCssSecondsPer100,
                descriptiveMessage: `Mocked THRESHOLD_DEVELOPMENT for ${es}`
            });
            const localGeResponse = (es, dist, css) => ({
                sets: [`GENERAL_ENDURANCE fallback set (${es}): ${dist}m @ ${css}s/100`],
                mainSetTotalDist: dist,
                targetPacePer100: css,
                descriptiveMessage: `Mocked GENERAL_ENDURANCE fallback for ${es}`
            });

            const completelyLocalMockDefs = {
                'THRESHOLD_DEVELOPMENT': (es, css, dist) => {
                    tdCalled = true;
                    return localTdResponse(es);
                },
                'GENERAL_ENDURANCE': (es, css, dist) => {
                    geCalled = true;
                    return localGeResponse(es, dist, css);
                }
            };
            const result = generateMainSet(workoutType, mockEnergySystem, mockRemainingDistance, completelyLocalMockDefs);

            expect(tdCalled).to.be.true;
            expect(geCalled).to.be.true;

            // Assertions based on the localGeResponse, as it's the final output after fallback
            expect(result.sets).to.deep.equal(localGeResponse(mockEnergySystem, mockRemainingDistance, mockCssSecondsPer100).sets);
            // Check combined descriptive message
            expect(result.descriptiveMessage).to.include(`Mocked THRESHOLD_DEVELOPMENT for ${mockEnergySystem}`);
            expect(result.descriptiveMessage).to.include(`(Fallback to general endurance due to low generated distance for selected workout type).`);
            expect(result.descriptiveMessage).to.include(`Mocked GENERAL_ENDURANCE fallback for ${mockEnergySystem}`);
        });

        it('should NOT fallback to GENERAL_ENDURANCE if specific generator is already GENERAL_ENDURANCE and returns small distance', () => {
            const workoutType = 'GENERAL_ENDURANCE';
            let geTinyCalled = false;
            const mockGeTinyDef = {
                'GENERAL_ENDURANCE': (energySystem, css, dist) => {
                    geTinyCalled = true;
                    return {
                        sets: [`GENERAL_ENDURANCE tiny set (${energySystem})`],
                        mainSetTotalDist: 50,
                        targetPacePer100: css,
                        descriptiveMessage: `Mocked tiny GENERAL_ENDURANCE for ${energySystem}`
                    };
                }
            };
            const result = generateMainSet(workoutType, mockEnergySystem, mockRemainingDistance, mockGeTinyDef);

            expect(geTinyCalled).to.be.true;
            expect(result.mainSetTotalDist).to.equal(50);
            expect(result.descriptiveMessage).to.equal(`Mocked tiny GENERAL_ENDURANCE for ${mockEnergySystem}`);
        });
    });
});
