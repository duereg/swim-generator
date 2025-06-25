// lib/data/mainSetConfigs.js - V3_SCHEMA_UPDATE_MARKER_CONFIGS

// Helper function for SP2 Rest (from MAX_SPRINT.js)
const getSp2RestString = (repDist) => {
    let minSec, maxSec;
    if (repDist === 25) {
        minSec = 60; maxSec = 180;
    } else if (repDist === 50) {
        minSec = 180; maxSec = 300;
    } else { // Should not happen
        minSec = 60; maxSec = 120;
    }
    const totalSeconds = minSec + Math.floor(Math.random() * (maxSec - minSec + 1));
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    let restString = "";
    if (minutes > 0) restString += `${minutes}'`;
    if (seconds > 0) restString += `${seconds}"`;
    else if (minutes === 0 && seconds === 0) restString = '10"';
    if (minutes > 0 && seconds === 0) { /* e.g. 3' */ }
    return `r${restString}`;
};

// Helper function for SP1 Rest (from SPEED_ENDURANCE.js)
const getSp1Rest = (repDist) => {
    let baseRestSeconds;
    if (repDist === 100) baseRestSeconds = 10;
    else if (repDist === 75) baseRestSeconds = 7.5;
    else if (repDist === 50) baseRestSeconds = 5;
    else if (repDist === 25) baseRestSeconds = 2.5;
    else baseRestSeconds = 5;
    const multiplier = 2 + Math.random();
    let restSeconds = Math.round((baseRestSeconds * multiplier) / 5) * 5;
    restSeconds = Math.max(restSeconds, 5);
    if (repDist === 100) restSeconds = Math.max(restSeconds, 20);
    return `r${restSeconds}"`;
};

// Unified SetDefinition Schema (for reference in this file)
// {
//     id: String (optional),
//     distance: Number,
//     repScheme: {
//         type: "dynamic" | "fixed",
//         maxReps: Number (if type="dynamic"),
//         fixedReps: Number (if type="fixed"),
//         minReps: Number (optional for "dynamic")
//     },
//     rest: String (optional),
//     paceDescription: String (optional),
//     activity: String (optional, defaults to "swim"),
//     notes: String (optional),
//     totalDistance: Number (optional, for type="fixed")
// }

export const ENDURANCE_BASE_CONFIG = {
    workoutTypeName: "EN1",
    minTotalDistanceForSet: 500,
    paceConfig: { baseMetric: "css", offset: 5, randomRange: 10, operator: "+" },
    setGenerationStrategy: "bestFitSingleRepetition",
    strategyConfig: {
        setDefinitions: [
            { distance: 500, repScheme: { type: "dynamic", maxReps: 12 }, activity: "swim/kick" },
            { distance: 600, repScheme: { type: "dynamic", maxReps: 10 }, activity: "swim/kick" },
            { distance: 700, repScheme: { type: "dynamic", maxReps: 8 }, activity: "swim/kick" },
            { distance: 800, repScheme: { type: "dynamic", maxReps: 7 }, activity: "swim/kick" },
            { distance: 900, repScheme: { type: "dynamic", maxReps: 6 }, activity: "swim/kick" },
            { distance: 1000, repScheme: { type: "dynamic", maxReps: 6 }, activity: "swim/kick" },
        ],
        selectionPreference: {
            tiebreakYardage: "preferShorterRepIfSameYardageThenMoreReps",
            shorterRepValue: 500
        }
    },
    restConfig: { type: "fixed", value: 'r60"' },
    setFormatting: { baseStructure: "{reps}x{dist} {activity} ({energySystem} focus) {rest}", defaultActivity: "swim/kick" },
    descriptiveMessages: {
        success: "EN1: {setSummary} ({energySystem}), CSS +5-15s/100m pace guide, 60\" rest.",
        tooShort: "EN1: Too short. Min rep distance {minRepDistForType}, available: {remainingDistance}.",
        fail: "EN1: Could not fit EN1 reps for {energySystem}. Available: {remainingDistance}."
    }
};

export const GENERAL_ENDURANCE_CONFIG = {
    workoutTypeName: "General Endurance",
    minTotalDistanceForSet: 25,
    paceConfig: { baseMetric: "css", offset: 0, operator: "+" },
    setGenerationStrategy: "closestFitGeneral",
    strategyConfig: {
        setDefinitions: [
            { distance: 500, repScheme: { type: "dynamic", maxReps: Infinity} },
            { distance: 400, repScheme: { type: "dynamic", maxReps: Infinity} },
            { distance: 300, repScheme: { type: "dynamic", maxReps: Infinity} },
            { distance: 200, repScheme: { type: "dynamic", maxReps: Infinity} },
            { distance: 100, repScheme: { type: "dynamic", maxReps: Infinity} },
            { distance: 50, repScheme: { type: "dynamic", maxReps: Infinity} },
        ],
        minRepDistanceForFallback: 25,
        conservativeAdjustment: { enabled: true, usageThresholdFactor: 0.80, minRepDistance: 200, minReps: 3 }
    },
    restConfig: { type: "distanceBased", values: { 300: 'r45"', 200: 'r30"', 100: 'r20"', default: 'r15"' } },
    setFormatting: { baseStructure: "{reps}x{dist} swim ({energySystem} focus) {rest}", defaultActivity: "swim" },
    descriptiveMessages: {
        success: "General Endurance ({energySystem}) default set. {setSummary}",
        tooShort: "General Endurance ({energySystem}) set - too short. Available: {remainingDistance}.",
        fail: "General Endurance ({energySystem}): Could not fit set. Available: {remainingDistance}."
    }
};

export const MAX_SPRINT_CONFIG = {
    workoutTypeName: "SP2",
    minTotalDistanceForSet: 25,
    paceConfig: { baseMetric: "css", offset: 10, randomRange: 5, operator: "-" },
    setGenerationStrategy: "targetYardageWithRepChoice",
    strategyConfig: {
        setTargetDistanceMin: 300,
        setTargetDistanceMaxDefault: 600,
        setTargetDistanceMaxCap: 4500,
        setDefinitions: [
            { distance: 25, repScheme: { type: "dynamic", maxReps: Infinity }, activity: "UW sprint", notes: "breath at wall" },
            { distance: 50, repScheme: { type: "dynamic", maxReps: Infinity }, activity: "UW sprint", notes: "breath at wall" },
        ],
        repChoiceLogic: { preferDistance: 50, thresholdYardage: 150 }
    },
    restConfig: { type: "customFunction", customFunction: getSp2RestString },
    setFormatting: { baseStructure: "{reps}x{dist} {activity} ({energySystem} focus, {notes}) {rest}", defaultActivity: "UW sprint" },
    descriptiveMessages: {
        success: "SP2: Lactate Production ({energySystem}), Near Max Effort. Set: {setSummary}. Total ~{totalDistance}yds.",
        tooShort: "SP2: Too short. Min rep 25. Available: {remainingDistance}.",
        fail: "SP2: Could not fit SP2 set. Available: {remainingDistance} (target yardage for SP2 is typically 300-600)."
    }
};

export const SPEED_ENDURANCE_CONFIG = {
    workoutTypeName: "SP1",
    minTotalDistanceForSet: 25,
    paceConfig: { baseMetric: "css", offset: 3, randomRange: 2, operator: "-" },
    setGenerationStrategy: "multiBlock",
    strategyConfig: {
        setTargetDistanceMin: 400,
        setTargetDistanceMaxCap: 4500,
        targetYardagePerBlockApprox: 800,
        setDefinitions: [
            { distance: 25, repScheme: { type: "dynamic", maxReps: 16 } },
            { distance: 50, repScheme: { type: "dynamic", maxReps: 16 } },
            { distance: 75, repScheme: { type: "dynamic", maxReps: 16 } },
            { distance: 100, repScheme: { type: "dynamic", maxReps: 16 } },
        ],
        drills: ["swim", "kb", "FU", "HUHO"],
        interBlockRest: {
            minSeconds: 60,
            maxSeconds: 120,
            format: (seconds) => {
                const minutes = Math.floor(seconds / 60);
                const secs = seconds % 60;
                let timeStr;
                if (minutes > 0) {
                    timeStr = (secs === 0) ? `${minutes}min` : `${minutes}min ${secs}s`;
                } else {
                    timeStr = `${secs}s`;
                }
                return `${timeStr} rest between SP1 blocks`;
            }
        }
    },
    restConfig: { type: "customFunction", customFunction: getSp1Rest },
    setFormatting: { baseStructure: "{reps}x{dist} {activity} ({energySystem} focus) {rest}" },
    descriptiveMessages: {
        success: "SP1: Lactate Tolerance ({energySystem}), CSS -3-5s. Total ~{totalDistance}yds.",
        tooShort: "SP1: Too short. Min rep 25. Available: {remainingDistance}.",
        fail: "SP1: Could not fit SP1 set. Available: {remainingDistance} (target yardage for SP1 is typically 400-800)."
    }
};

export const THRESHOLD_DEVELOPMENT_CONFIG = {
    workoutTypeName: "EN3",
    minTotalDistanceForSet: 400,
    paceConfig: { baseMetric: "css", offset: 1, randomRange: 1, operator: "-" },
    setGenerationStrategy: "patternBased",
    strategyConfig: {
        setDefinitions: [
            { id: 'Nx400_css_r50', distance: 400, repScheme: { type: "dynamic", maxReps: 18 }, rest: 'r50"', paceDescription: 'CSS' },
            { id: 'Nx500_css_r60', distance: 500, repScheme: { type: "dynamic", maxReps: 14 }, rest: 'r60"', paceDescription: 'CSS' },
            { id: 'Nx600_css_r90', distance: 600, repScheme: { type: "dynamic", maxReps: 12 }, rest: 'r90"', paceDescription: 'CSS' },
        ],
        selectionLogic: "maxAchievedDistance",
        fallbackStrategy: {
            type: "simpleRepsMaxDistance",
            setDefinitions: [
                { distance: 600, repScheme: { type: "dynamic", maxReps: 6 }, rest: 'r90"', paceDescription: 'CSS -1-2s' },
                { distance: 500, repScheme: { type: "dynamic", maxReps: 6 }, rest: 'r60"', paceDescription: 'CSS -1-2s' },
                { distance: 400, repScheme: { type: "dynamic", maxReps: 6 }, rest: 'r45"', paceDescription: 'CSS -1-2s' }
            ],
            minRepDistance: 400,
        }
    },
    restConfig: { type: "patternDefined" },
    setFormatting: { baseStructure: "{reps}x{dist} {energySystem} focus swim @ {paceDesc} {rest}", defaultActivity: "swim" },
    descriptiveMessages: {
        success: "EN3: {setSummary} ({energySystem}) @ {paceDescription}.",
        tooShort: "EN3: Too short for EN3 sets (min rep {minRepDistForType}). Available: {remainingDistance}.",
        fail: "EN3: Could not fit standard or fallback EN3 set for {energySystem}. Available: {remainingDistance}."
    }
};

export const THRESHOLD_SUSTAINED_CONFIG = {
    workoutTypeName: "EN2",
    minTotalDistanceForSet: 100,
    paceConfig: { baseMetric: "css", offset: 0, operator: "+" },
    setGenerationStrategy: "patternBased",
    strategyConfig: {
        setDefinitions: [
            { id: '18x100_css_r10', distance: 100, repScheme: { type: 'fixed', fixedReps: 18 }, totalDistance: 1800, rest: 'r10"', paceDescription: 'CSS' },
            { id: '10x200_css_r20', distance: 200, repScheme: { type: 'fixed', fixedReps: 10 }, totalDistance: 2000, rest: 'r20"', paceDescription: 'CSS' },
            { id: 'Nx400_css_r40', distance: 400, repScheme: { type: 'dynamic', maxReps: 18 }, rest: 'r40"', paceDescription: 'CSS' },
            { id: 'Nx500_css_r50', distance: 500, repScheme: { type: 'dynamic', maxReps: 14 }, rest: 'r50"', paceDescription: 'CSS' },
            { id: 'Nx600_css_r60', distance: 600, repScheme: { type: 'dynamic', maxReps: 12 }, rest: 'r60"', paceDescription: 'CSS' },
            { id: 'Nx800_css_r90', distance: 800, repScheme: { type: 'dynamic', maxReps: 8 }, rest: 'r90"', paceDescription: 'CSS' },
            { id: 'Nx1000_css_r90', distance: 1000, repScheme: { type: 'dynamic', maxReps: 6 }, rest: 'r90"', paceDescription: 'CSS' }
        ],
        selectionLogic: "prioritizeMaxDistanceThenRandom",
        fallbackStrategy: {
            type: "simpleRepsMaxDistance",
            setDefinitions: [
                { distance: 200, repScheme: { type: "dynamic", maxReps: 40 }, rest: 'r20"', paceDescription: 'CSS' },
                { distance: 100, repScheme: { type: "dynamic", maxReps: 60 }, rest: 'r10"', paceDescription: 'CSS' }
            ],
            minRepDistance: 100,
        }
    },
    restConfig: { type: "patternDefined" },
    setFormatting: { baseStructure: "{reps}x{dist} {energySystem} focus swim @ {paceDesc} {rest}", defaultActivity: "swim" },
    descriptiveMessages: {
        success: "EN2: {setSummary} ({energySystem}) @ CSS.",
        tooShort: "EN2: Too short for EN2 sets. Available: {remainingDistance}.",
        fail: "EN2: Could not fit standard EN2 set for {energySystem}. Available: {remainingDistance}."
    }
};

export const ALL_WORKOUT_CONFIGS = {
    ENDURANCE_BASE: ENDURANCE_BASE_CONFIG,
    GENERAL_ENDURANCE: GENERAL_ENDURANCE_CONFIG,
    MAX_SPRINT: MAX_SPRINT_CONFIG,
    SPEED_ENDURANCE: SPEED_ENDURANCE_CONFIG,
    THRESHOLD_DEVELOPMENT: THRESHOLD_DEVELOPMENT_CONFIG,
    THRESHOLD_SUSTAINED: THRESHOLD_SUSTAINED_CONFIG
};

// Further comments removed.
