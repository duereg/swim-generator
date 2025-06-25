// lib/data/mainSetConfigs.js

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
    if (minutes > 0) {
        restString += `${minutes}'`;
    }
    if (seconds > 0) {
        restString += `${seconds}"`;
    } else if (minutes === 0 && seconds === 0) { // Unlikely to be 0 total rest
        restString = '10"'; // Default small rest if somehow 0
    }
     if (minutes > 0 && seconds === 0) { // e.g. 3'
        // No need to add 00"
    }
    return `r${restString}`;
};

// Helper function for SP1 Rest (from SPEED_ENDURANCE.js)
const getSp1Rest = (repDist) => {
    let baseRestSeconds;
    if (repDist === 100) baseRestSeconds = 10; // EN2 rest for 100s
    else if (repDist === 75) baseRestSeconds = 7.5; // Proportional
    else if (repDist === 50) baseRestSeconds = 5;   // Proportional
    else if (repDist === 25) baseRestSeconds = 2.5; // Proportional
    else baseRestSeconds = 5; // Default small rest

    // Double or triple EN2 equivalent rest
    const multiplier = 2 + Math.random(); // Randomly between 2x and 3x
    let restSeconds = Math.round((baseRestSeconds * multiplier) / 5) * 5; // Round to nearest 5s
    restSeconds = Math.max(restSeconds, 5); // Minimum 5s
    if (repDist === 100) restSeconds = Math.max(restSeconds, 20); // Ensure 100s get at least 20s

    return `r${restSeconds}"`;
};


export const ENDURANCE_BASE_CONFIG = {
    workoutTypeName: "EN1",
    minTotalDistanceForSet: 500,
    paceConfig: {
        baseMetric: "css",
        offset: 5,
        randomRange: 10,
        operator: "+"
    },
    setGenerationStrategy: "bestFitSingleRepetition",
    strategyConfig: {
        repetitionDistances: [500, 600, 700, 800, 900, 1000], // Standardized
        maxRepsPerDistance: { 500: 12, 600: 10, 700: 8, 800: 7, 900: 6, 1000: 6 },
        selectionPreference: {
            tiebreakYardage: "preferShorterRepIfSameYardageThenMoreReps",
            shorterRepValue: 500
        }
    },
    restConfig: {
        type: "fixed",
        value: 'r60"'
    },
    setFormatting: {
        baseStructure: "{reps}x{dist} {energySystem} focus swim/kick {rest}",
        defaultActivity: "swim/kick"
    },
    descriptiveMessages: {
        success: "EN1: {setSummary} ({energySystem}), CSS +5-15s/100m pace guide, 60\" rest.",
        tooShort: "EN1: Too short. Min rep distance 500, available: {remainingDistance}.",
        fail: "EN1: Could not fit EN1 reps for {energySystem}. Available: {remainingDistance}."
    }
};

export const GENERAL_ENDURANCE_CONFIG = {
    workoutTypeName: "General Endurance",
    minTotalDistanceForSet: 25,
    paceConfig: {
        baseMetric: "css",
        offset: 0,
        operator: "+"
    },
    setGenerationStrategy: "closestFitGeneral",
    strategyConfig: {
        repetitionDistances: [500, 400, 300, 200, 100, 50], // Standardized
        minRepDistanceForFallback: 25,
        conservativeAdjustment: {
            enabled: true,
            usageThresholdFactor: 0.80,
            minRepDistance: 200,
            minReps: 3
        }
    },
    restConfig: {
        type: "distanceBased",
        values: {
            300: 'r45"',
            200: 'r30"',
            100: 'r20"',
            default: 'r15"'
        }
    },
    setFormatting: {
        baseStructure: "{reps}x{dist} swim ({energySystem} focus) {rest}",
        defaultActivity: "swim"
    },
    descriptiveMessages: {
        success: "General Endurance ({energySystem}) default set. {setSummary}",
        tooShort: "General Endurance ({energySystem}) set - too short. Available: {remainingDistance}",
        fail: "General Endurance ({energySystem}): Could not fit set. Available: {remainingDistance}."
    }
};

export const MAX_SPRINT_CONFIG = {
    workoutTypeName: "SP2",
    minTotalDistanceForSet: 25,
    paceConfig: {
        baseMetric: "css",
        offset: 10,
        randomRange: 5,
        operator: "-"
    },
    setGenerationStrategy: "targetYardageWithRepChoice",
    strategyConfig: {
        setTargetDistanceMin: 300, // Standardized
        setTargetDistanceMaxDefault: 600, // Standardized
        setTargetDistanceMaxCap: 4500,    // Standardized
        repetitionDistances: [25, 50], // Standardized
        repChoiceLogic: {
            preferDistance: 50,
            thresholdYardage: 150
        }
    },
    restConfig: {
        type: "customFunction",
        customFunction: getSp2RestString
    },
    setFormatting: {
        baseStructure: "{reps}x{dist} UW sprint ({energySystem} focus, breath at wall) {rest}",
        defaultActivity: "UW sprint"
    },
    descriptiveMessages: {
        success: "SP2: Lactate Production ({energySystem}), Near Max Effort. Set: {setSummary}. Total ~{totalDistance}yds.",
        tooShort: "SP2: Too short. Min rep 25. Available: {remainingDistance}.",
        fail: "SP2: Could not fit SP2 set. Available: {remainingDistance} (target yardage for SP2 is typically 300-600)."
    }
};

export const SPEED_ENDURANCE_CONFIG = {
    workoutTypeName: "SP1",
    minTotalDistanceForSet: 25,
    paceConfig: {
        baseMetric: "css",
        offset: 3,
        randomRange: 2,
        operator: "-"
    },
    setGenerationStrategy: "multiBlock",
    strategyConfig: {
        setTargetDistanceMin: 400, // Standardized
        setTargetDistanceMaxCap: 4500, // Standardized
        targetYardagePerBlockApprox: 800,
        repetitionDistances: [25, 50, 75, 100], // Standardized
        maxRepsInBlock: 16,
        drills: ["swim", "kb", "FU", "HUHO"],
        interBlockRest: {
            minSeconds: 60,
            maxSeconds: 120,
            format: (seconds) => {
                const minutes = Math.floor(seconds / 60);
                const secs = seconds % 60;
                if (minutes > 0 && secs === 0) return `${minutes}min rest between SP1 blocks`;
                if (minutes > 0) return `${minutes}min ${secs}s rest between SP1 blocks`;
                return `${secs}s rest between SP1 blocks`;
            }
        }
    },
    restConfig: {
        type: "customFunction",
        customFunction: getSp1Rest
    },
    setFormatting: {
        baseStructure: "{reps}x{dist} {activity} ({energySystem} focus) {rest}",
    },
    descriptiveMessages: {
        success: "SP1: Lactate Tolerance ({energySystem}), CSS -3-5s. Total ~{totalDistance}yds.",
        tooShort: "SP1: Too short. Min rep 25. Available: {remainingDistance}.",
        fail: "SP1: Could not fit SP1 set. Available: {remainingDistance} (target yardage for SP1 is typically 400-800)."
    }
};

export const THRESHOLD_DEVELOPMENT_CONFIG = {
    workoutTypeName: "EN3",
    minTotalDistanceForSet: 400,
    paceConfig: {
        baseMetric: "css",
        offset: 1,
        randomRange: 1,
        operator: "-"
    },
    setGenerationStrategy: "patternBased",
    strategyConfig: {
        patterns: [
            { idFormat: 'Nx400', type: 'dynamicReps', baseDist: 400, rest: 'r50"', maxReps: 18, paceDesc: 'CSS' },
            { idFormat: 'Nx500', type: 'dynamicReps', baseDist: 500, rest: 'r60"', maxReps: 14, paceDesc: 'CSS' },
            { idFormat: 'Nx600', type: 'dynamicReps', baseDist: 600, rest: 'r90"', maxReps: 12, paceDesc: 'CSS' },
        ],
        selectionLogic: "maxAchievedDistance",
        fallbackStrategy: {
            type: "simpleRepsMaxDistance",
            options: [
                { dist: 600, rest: 'r90"', paceDesc: 'CSS -1-2s', maxReps: 6 },
                { dist: 500, rest: 'r60"', paceDesc: 'CSS -1-2s', maxReps: 6 },
                { dist: 400, rest: 'r45"', paceDesc: 'CSS -1-2s', maxReps: 6 }
            ],
            minRepDistance: 400,
        }
    },
    restConfig: {
        type: "patternDefined"
    },
    setFormatting: {
        baseStructure: "{reps}x{dist} {energySystem} focus swim @ {paceDesc} {rest}",
        defaultActivity: "swim"
    },
    descriptiveMessages: {
        success: "EN3: {setSummary} ({energySystem}) @ {paceDescription}.",
        tooShort: "EN3: Too short for EN3 sets (min rep 400). Available: {remainingDistance}.",
        fail: "EN3: Could not fit standard or fallback EN3 set for {energySystem}. Available: {remainingDistance}."
    }
};

export const THRESHOLD_SUSTAINED_CONFIG = {
    workoutTypeName: "EN2",
    minTotalDistanceForSet: 100,
    paceConfig: {
        baseMetric: "css",
        offset: 0,
        operator: "+"
    },
    setGenerationStrategy: "patternBased",
    strategyConfig: {
        patterns: [
            { id: '18x100', type: 'fixedReps', reps: 18, dist: 100, rest: 'r10"', requiredDist: 1800, paceDesc: 'CSS' },
            { id: '10x200', type: 'fixedReps', reps: 10, dist: 200, rest: 'r20"', requiredDist: 2000, paceDesc: 'CSS' },
            { id: 'Nx400', type: 'dynamicReps', baseDist: 400, rest: 'r40"', maxReps: 18, paceDesc: 'CSS' },
            { id: 'Nx500', type: 'dynamicReps', baseDist: 500, rest: 'r50"', maxReps: 14, paceDesc: 'CSS' },
            { id: 'Nx600', type: 'dynamicReps', baseDist: 600, rest: 'r60"', maxReps: 12, paceDesc: 'CSS' },
            { id: 'Nx800', type: 'dynamicReps', baseDist: 800, rest: 'r90"', maxReps: 8, paceDesc: 'CSS' },
            { id: 'Nx1000', type: 'dynamicReps', baseDist: 1000, rest: 'r90"', maxReps: 6, paceDesc: 'CSS' }
        ],
        selectionLogic: "prioritizeMaxDistanceThenRandom",
        fallbackStrategy: {
            type: "simpleRepsMaxDistance",
            options: [
                { dist: 200, rest: 'r20"', paceDesc: 'CSS', maxReps: 40 },
                { dist: 100, rest: 'r10"', paceDesc: 'CSS', maxReps: 60 }
            ],
            minRepDistance: 100,
        }
    },
    restConfig: {
        type: "patternDefined"
    },
    setFormatting: {
        baseStructure: "{reps}x{dist} {energySystem} focus swim @ {paceDesc} {rest}",
        defaultActivity: "swim"
    },
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
